import { profile } from '@/lib/profile'

const escape = (value: string) => value.replace(/\\/g, '\\\\').replace(/\r?\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;')

export function GET() {
  const card = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:Kim;Kwanho;;;',
    `FN:${escape(profile.name)}`,
    `TITLE:${escape(profile.role)}`,
    'ORG:KLA;ICOS Division;Zeta team',
    `EMAIL;TYPE=INTERNET,WORK:${profile.contact}`,
    'ADR;TYPE=WORK:;;;Leuven;;;Belgium',
    'URL:https://kwanho.dev/about',
    `X-SOCIALPROFILE;TYPE=linkedin:${profile.linkedin}`,
    'END:VCARD',
    '',
  ].join('\r\n')
  return new Response(card, {
    headers: {
      'Content-Type': 'text/vcard; charset=utf-8',
      'Content-Disposition': 'attachment; filename="Kwanho_Kim.vcf"',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}
