#!/usr/bin/env node

import { readFile, readdir, mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Resend } from 'resend'
import {
  SUBJECT,
  TEST_SUBJECT,
  achievementEmailHtml,
  achievementEmailText,
} from '../emails/achievement-template.mjs'

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = path.resolve(SCRIPT_DIR, '..')
const ACHIEVEMENTS_DIR = path.join(ROOT_DIR, 'acheamvnts')
const CSV_PATH = path.join(ACHIEVEMENTS_DIR, 'Final Constestants 2026 - Sheet1.csv')
const CERTIFICATES_DIR = path.join(ACHIEVEMENTS_DIR, 'output')
const DEFAULT_TEST_RECIPIENT = 'yousefmsm@hotmail.com'
const APPROVED_TEST_RECIPIENTS = new Set([
  DEFAULT_TEST_RECIPIENT,
  'belal.m.elbably@gmail.com',
])
const DEFAULT_FROM = 'DCC 2026 <noreply@dcchub.xyz>'
const BULK_CONFIRMATION = 'SEND-63-FINALISTS'
const EXPECTED_TOTAL = 72
const EXPECTED_FINALISTS = 63
const EXPECTED_NON_ATTENDEES = 9

function parseCsv(source) {
  const rows = []
  let row = []
  let field = ''
  let quoted = false

  for (let index = 0; index < source.length; index += 1) {
    const character = source[index]

    if (character === '"') {
      if (quoted && source[index + 1] === '"') {
        field += '"'
        index += 1
      } else {
        quoted = !quoted
      }
    } else if (character === ',' && !quoted) {
      row.push(field)
      field = ''
    } else if ((character === '\n' || character === '\r') && !quoted) {
      if (character === '\r' && source[index + 1] === '\n') index += 1
      row.push(field)
      if (row.some((value) => value.length > 0)) rows.push(row)
      row = []
      field = ''
    } else {
      field += character
    }
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field)
    rows.push(row)
  }

  const [header, ...data] = rows
  return data.map((values) =>
    Object.fromEntries(header.map((column, index) => [column.replace(/^\uFEFF/, ''), values[index] ?? ''])),
  )
}

function sanitizeFilename(value) {
  return value
    .replace(/[\\/:*?"<>|]/g, '_')
    .replace(/__+/g, '_')
    .trim()
    .replace(/^_+|_+$/g, '')
}

function certificateFilename(contestant) {
  const name = sanitizeFilename(contestant.name.replaceAll(' ', '_'))
  const team = sanitizeFilename(contestant.team.replaceAll(' ', '_'))
  return `${name}_${team}.pdf`
}

async function loadAndValidateCampaign() {
  const csv = await readFile(CSV_PATH, 'utf8')
  const rows = parseCsv(csv).map((row) => ({
    name: row['English Name'].trim(),
    team: row['Team Name'].trim(),
    rank: row.Rank.trim(),
    email: row.Email.trim(),
  }))
  const finalists = rows.filter((contestant) => contestant.rank !== '--')
  const nonAttendees = rows.filter((contestant) => contestant.rank === '--')

  if (
    rows.length !== EXPECTED_TOTAL ||
    finalists.length !== EXPECTED_FINALISTS ||
    nonAttendees.length !== EXPECTED_NON_ATTENDEES
  ) {
    throw new Error(
      `Safety check failed: expected ${EXPECTED_TOTAL} rows = ${EXPECTED_FINALISTS} finalists + ${EXPECTED_NON_ATTENDEES} non-attendees; found ${rows.length} = ${finalists.length} + ${nonAttendees.length}.`,
    )
  }

  const duplicateEmails = finalists
    .map((contestant) => contestant.email.toLowerCase())
    .filter((email, index, emails) => emails.indexOf(email) !== index)
  if (duplicateEmails.length > 0) {
    throw new Error(`Safety check failed: duplicate finalist email(s): ${[...new Set(duplicateEmails)].join(', ')}`)
  }

  const actualPdfNames = new Set((await readdir(CERTIFICATES_DIR)).filter((name) => name.endsWith('.pdf')))
  const expectedPdfNames = new Set(finalists.map(certificateFilename))
  const missing = [...expectedPdfNames].filter((name) => !actualPdfNames.has(name))
  const unexpected = [...actualPdfNames].filter((name) => !expectedPdfNames.has(name))

  if (missing.length > 0 || unexpected.length > 0) {
    throw new Error(
      `Certificate mapping failed: ${missing.length} missing and ${unexpected.length} unexpected PDF(s).`,
    )
  }

  return { finalists, nonAttendees }
}

function getArgumentValue(flag) {
  const index = process.argv.indexOf(flag)
  return index >= 0 ? process.argv[index + 1] : undefined
}

function createResendClient() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is required. Keep it in the environment; never commit it.')
  }
  return new Resend(process.env.RESEND_API_KEY)
}

async function loadSharedAttachments(certificatePath, certificateName) {
  const certificate = await readFile(certificatePath)
  return [
    {
      filename: certificateName,
      content: certificate,
      content_type: 'application/pdf',
    },
  ]
}

async function sendTest(resend, finalists) {
  const recipient = (getArgumentValue('--to') || DEFAULT_TEST_RECIPIENT).trim().toLowerCase()
  if (!APPROVED_TEST_RECIPIENTS.has(recipient)) {
    throw new Error(`Test recipient is not approved: ${recipient}`)
  }

  const sample = finalists[0]
  const sourceFilename = certificateFilename(sample)
  const attachments = await loadSharedAttachments(
    path.join(CERTIFICATES_DIR, sourceFilename),
    'DCC_2026_TEST_Certificate.pdf',
  )
  const from = process.env.RESEND_FROM || DEFAULT_FROM

  const { data, error } = await resend.emails.send(
    {
      from,
      to: recipient,
      subject: TEST_SUBJECT,
      html: achievementEmailHtml({ isTest: true }),
      text: achievementEmailText(),
      attachments,
      tags: [
        { name: 'campaign', value: 'dcc-2026-achievements' },
        { name: 'mode', value: 'test' },
      ],
    },
    { idempotencyKey: `dcc-2026-achievement-test-v5-${recipient.replace(/[^a-z0-9]+/g, '-')}` },
  )

  if (error) throw new Error(`${error.name}: ${error.message}`)
  console.log(`Test email sent only to ${recipient}. Resend ID: ${data.id}`)
}

async function sendAll(resend, finalists) {
  const confirmation = getArgumentValue('--confirm')
  if (confirmation !== BULK_CONFIRMATION) {
    throw new Error(
      `Bulk sending is locked. After the test is approved, run again with --confirm ${BULK_CONFIRMATION}.`,
    )
  }

  const from = process.env.RESEND_FROM || DEFAULT_FROM
  console.log(`Bulk approval accepted. Sending to exactly ${finalists.length} ranked finalists.`)

  for (const [index, contestant] of finalists.entries()) {
    const sourceFilename = certificateFilename(contestant)
    const attachments = await loadSharedAttachments(
      path.join(CERTIFICATES_DIR, sourceFilename),
      `DCC_2026_Certificate_${sanitizeFilename(contestant.name.replaceAll(' ', '_'))}.pdf`,
    )
    const { data, error } = await resend.emails.send(
      {
        from,
        to: contestant.email,
        subject: SUBJECT,
        html: achievementEmailHtml(),
        text: achievementEmailText(),
        attachments,
        tags: [
          { name: 'campaign', value: 'dcc-2026-achievements' },
          { name: 'mode', value: 'finalist' },
        ],
      },
      { idempotencyKey: `dcc-2026-achievement-${contestant.email.toLowerCase()}` },
    )

    if (error) {
      throw new Error(`Stopped at ${index + 1}/${finalists.length} (${contestant.email}): ${error.message}`)
    }
    console.log(`${index + 1}/${finalists.length} sent to ${contestant.email}. Resend ID: ${data.id}`)

    if (index < finalists.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 650))
    }
  }
}

async function main() {
  const { finalists, nonAttendees } = await loadAndValidateCampaign()
  console.log(
    `Validated ${finalists.length} finalists, ${nonAttendees.length} excluded non-attendees, and ${finalists.length} certificate PDFs.`,
  )

  if (process.argv.includes('--validate')) return

  if (process.argv.includes('--preview')) {
    const outputDirectory = path.join(ROOT_DIR, 'tmp')
    const outputPath = path.join(outputDirectory, 'dcc-achievement-email-preview.html')
    await mkdir(outputDirectory, { recursive: true })
    await writeFile(
      outputPath,
      achievementEmailHtml({ isTest: true }),
    )
    console.log(`Preview written to ${outputPath}`)
    return
  }

  const wantsTest = process.argv.includes('--test')
  const wantsBulk = process.argv.includes('--send-all')
  if (wantsTest === wantsBulk) {
    throw new Error('Choose exactly one sending mode: --test or --send-all.')
  }

  const resend = createResendClient()
  if (wantsTest) {
    await sendTest(resend, finalists)
  } else {
    await sendAll(resend, finalists)
  }
}

main().catch((error) => {
  console.error(error.message)
  process.exitCode = 1
})
