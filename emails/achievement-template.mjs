const COLORS = {
  black: '#010202',
  pink: '#ff1471',
  cyan: '#02eccc',
  yellow: '#fcd902',
  paper: '#f5f4ef',
  white: '#ffffff',
  muted: '#676b6a',
}

export const SUBJECT = 'شهادة المشاركة في DCC 2026 💎'
export const TEST_SUBJECT = `[TEST] ${SUBJECT}`
const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61588726680610'
const LINKEDIN_URL = 'https://www.linkedin.com/company/dcc-con/posts/?feedView=all'
const WEBSITE_URL = 'https://www.dcchub.xyz'
const LOGO_URL = `${WEBSITE_URL}/logo.svg`
const CSKILLED_LOGO_URL = `${WEBSITE_URL}/cskilled.webp`

const arabicParagraphs = [
  'شكرًا لكم على مشاركتكم في Damietta Competitive Contest (DCC) 2026، وكونكم جزءًا من رحلتنا في البحث عن جوهرة الألفية. 💎',
  'نقدّر ما قدمتموه من جهد وروح تنافسية خلال المسابقة، ونأمل أن تكون هذه التجربة قد أضافت لكم تحديًا جديدًا وذكرى مميزة.',
  'نرفق لكم شهادة المشاركة في DCC 2026 تقديرًا لمشاركتكم.',
  'نتمنى لكم أداءً أفضل ونجاحات أكبر في المرات القادمة، ونأمل أن نراكم مجددًا في تحديات ورحلات قادمة. 🏆',
]

export function achievementEmailHtml({ isTest = false, logoSrc = LOGO_URL } = {}) {
  const paragraphs = arabicParagraphs
    .map(
      (paragraph) =>
        `<p class="email-copy email-ink" style="margin:0 0 12px;color:${COLORS.black};font:400 15px/1.75 Tahoma,Arial,sans-serif;text-align:right;direction:rtl;">${paragraph}</p>`,
    )
    .join('')

  return `<!doctype html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="x-apple-disable-message-reformatting">
    <meta name="color-scheme" content="light only">
    <meta name="supported-color-schemes" content="light only">
    <title>${isTest ? TEST_SUBJECT : SUBJECT}</title>
    <style>
      :root { color-scheme: light only; supported-color-schemes: light only; }
      @media only screen and (max-width: 520px) {
        .email-wrap { padding: 8px 5px !important; }
        .email-shell { border-width: 2px !important; }
        .email-pad { padding-left: 18px !important; padding-right: 18px !important; }
        .email-title { font-size: 27px !important; }
        .email-copy { font-size: 14px !important; line-height: 1.75 !important; }
      }
      @media (prefers-color-scheme: dark) {
        body, .email-page { background: ${COLORS.paper} !important; }
        .email-shell, .email-light { background: ${COLORS.white} !important; }
        .email-ink { color: ${COLORS.black} !important; }
      }
    </style>
  </head>
  <body style="margin:0;padding:0;background:${COLORS.paper};color-scheme:light only;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
      شهادة مشاركتكم في DCC 2026 مرفقة بهذه الرسالة.
    </div>
    <table class="email-page" role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="${COLORS.paper}" style="width:100%;background:${COLORS.paper};">
      <tr>
        <td class="email-wrap" align="center" style="padding:20px 8px;">
          <table class="email-shell" role="presentation" width="640" cellspacing="0" cellpadding="0" border="0" bgcolor="${COLORS.white}" style="width:100%;max-width:640px;background:${COLORS.white};border:3px solid ${COLORS.black};">
            <tr>
              <td style="height:8px;background:linear-gradient(90deg,${COLORS.pink} 0 34%,${COLORS.yellow} 34% 67%,${COLORS.cyan} 67% 100%);font-size:0;line-height:0;">&nbsp;</td>
            </tr>
            <tr>
              <td class="email-light email-pad" align="center" bgcolor="${COLORS.white}" style="padding:18px 24px 10px;background:${COLORS.white};">
                <img src="${logoSrc}" width="132" height="68" alt="DCC" style="display:block;width:132px;max-width:100%;height:auto;margin:0 auto;border:0;color:${COLORS.black};font:900 26px/1 Arial,sans-serif;text-align:center;">
              </td>
            </tr>
            <tr>
              <td class="email-light email-pad" dir="rtl" align="right" bgcolor="${COLORS.white}" style="padding:16px 24px 10px;background:${COLORS.white};">
                <div style="display:inline-block;margin:0 0 12px;padding:6px 10px;background:${COLORS.pink};color:${COLORS.white};font:700 11px/1.2 Tahoma,Arial,sans-serif;border:2px solid ${COLORS.black};">
                  ACHIEVEMENT UNLOCKED ★
                </div>
                <h1 class="email-title email-ink" style="margin:0;color:${COLORS.black};font:900 30px/1.3 Tahoma,Arial,sans-serif;text-align:right;">
                  أنتم جزء من<br><span style="color:${COLORS.pink};">رحلة DCC 2026.</span>
                </h1>
              </td>
            </tr>
            <tr>
              <td class="email-light email-pad" dir="rtl" align="right" bgcolor="${COLORS.white}" style="padding:12px 24px 6px;background:${COLORS.white};">
                ${paragraphs}
              </td>
            </tr>
            <tr>
              <td style="padding:6px 24px 20px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:${COLORS.yellow};border:2px solid ${COLORS.black};box-shadow:6px 6px 0 ${COLORS.black};">
                  <tr>
                    <td width="48" align="center" valign="middle" style="padding:12px 0 12px 10px;color:${COLORS.pink};font:900 24px/1 Arial,sans-serif;">↙</td>
                    <td dir="rtl" align="right" valign="middle" style="padding:12px 14px;color:${COLORS.black};">
                      <strong style="display:block;font:800 14px/1.45 Tahoma,Arial,sans-serif;">شهادة المشاركة مرفقة</strong>
                      <span style="display:block;font:400 12px/1.45 Tahoma,Arial,sans-serif;">ستجدون ملف الشهادة بصيغة PDF مع هذه الرسالة.</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td class="email-light email-pad" dir="rtl" align="right" bgcolor="${COLORS.white}" style="padding:8px 24px 20px;background:${COLORS.white};">
                <p style="margin:0 0 2px;color:${COLORS.muted};font:400 13px/1.6 Tahoma,Arial,sans-serif;">مع خالص التحية،</p>
                <p style="margin:0;color:${COLORS.black};font:800 14px/1.6 Tahoma,Arial,sans-serif;">DCC 2026 Organizing Team</p>
              </td>
            </tr>
            <tr>
              <td class="email-pad" align="center" bgcolor="#f0efe9" style="padding:12px 20px;background:#f0efe9;border-top:1px solid #ddddd7;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" dir="ltr">
                  <tr>
                    <td align="left" valign="middle" style="font-size:0;line-height:0;">
                      <img src="${CSKILLED_LOGO_URL}" width="96" height="28" alt="CSkilled" style="display:block;width:96px;max-width:100%;height:auto;border:0;">
                    </td>
                    <td align="right" valign="middle" style="white-space:nowrap;">
                      <a href="${FACEBOOK_URL}" aria-label="DCC on Facebook" title="Facebook" style="display:inline-block;width:30px;height:30px;margin:0 4px;border:1px solid #d5d5cf;border-radius:50%;background:${COLORS.black};color:${COLORS.white};font:700 14px/30px Arial,sans-serif;text-align:center;text-decoration:none;direction:ltr;">f</a>
                      <a href="${LINKEDIN_URL}" aria-label="DCC on LinkedIn" title="LinkedIn" style="display:inline-block;width:30px;height:30px;margin:0 4px;border:1px solid #d5d5cf;border-radius:50%;background:${COLORS.black};color:${COLORS.white};font:700 11px/30px Arial,sans-serif;text-align:center;text-decoration:none;direction:ltr;">in</a>
                      <a href="${WEBSITE_URL}" aria-label="DCC website" title="DCC website" style="display:inline-block;width:30px;height:30px;margin:0 4px;border:1px solid #d5d5cf;border-radius:50%;background:${COLORS.black};color:${COLORS.white};font:700 16px/28px Arial,sans-serif;text-align:center;text-decoration:none;direction:ltr;">↗</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
}

export function achievementEmailText() {
  return [
    ...arabicParagraphs.flatMap((paragraph) => [paragraph, '']),
    'شهادة المشاركة بصيغة PDF مرفقة بهذه الرسالة.',
    '',
    'مع خالص التحية،',
    'DCC 2026 Organizing Team',
    'https://dcchub.xyz',
  ].join('\n')
}
