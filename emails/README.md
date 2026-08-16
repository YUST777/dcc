# DCC 2026 achievement email

The campaign reads the contestant CSV and attaches the matching certificate PDF. It refuses to run unless the data remains exactly:

- 72 CSV rows
- 63 ranked finalists
- 9 excluded non-attendees (`Rank` is `--`)
- 63 certificate PDFs with a one-to-one filename match

The test command sends one message to `yousefmsm@hotmail.com` by default. The only other approved test recipient is `belal.m.elbably@gmail.com`; use `-- --to belal.m.elbably@gmail.com`. It uses a sample certificate and marks both the subject and message as a test.

## Commands

```bash
npm run email:validate
npm run email:preview
RESEND_API_KEY=... npm run email:test
```

Bulk sending remains locked until the exact confirmation phrase is supplied:

```bash
RESEND_API_KEY=... npm run email:send-all -- --confirm SEND-63-FINALISTS
```

Do not run the bulk command until the test recipient has approved the final message. The default sender is `DCC 2026 <noreply@dcchub.xyz>`; override it with `RESEND_FROM` only if needed.
