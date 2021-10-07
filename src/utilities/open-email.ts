import { isiPhon14_6Safari } from './user-agent';

/* eslint-disable no-irregular-whitespace */
const lineFeed = '%0D%0A';

export type EmailProps = {
  address: string;
  bcc?: string[];
  cc?: string[];
  subject?: string;
  body?: string[];
};

/**
 * メーラー起動
 * @param param
 * @returns
 */
export const openEmail = (param: EmailProps) => {
  const mailTo = `mailto:${param.address}`;
  const cc = param.cc ? `?cc=${param.cc.reduce((v, stack) => `${stack + v},`)}` : '';
  const bcc = param.bcc ? `${cc ? '&' : '?'}cc=${param.bcc.reduce((v, stack) => `${stack + v},`)}` : '';
  const subject = param.subject ? `${cc || bcc ? '&' : '?'}subject=${param.subject}` : '';
  let body = '';
  if (param.body) {
    if (param.body.length === 1) {
      body += param.body[0];
    } else {
      param.body.forEach((v) => {
        body += `${v}${lineFeed}`;
      });
    }
    body = `${cc || bcc || subject ? '&' : '?'}body=${body}`;
  }

  const a = document.createElement('a');
  a.href = `${mailTo}${cc}${bcc}${subject}${body}`;
  document.body.appendChild(a);
  a.click();
  a.remove();
};

type EmailTempProps = {
  emailAddress: string;
  name: string;
  companyName: string;
  postNo: string;
  fax: string;
  tel: string;
  message: string[];
  address: string;
}

export const emailTemp = (props: EmailTempProps) => {
  const {
    emailAddress, name, companyName, postNo, fax, tel, address, message,
  } = props;

  const body = isiPhon14_6Safari
    ? [
      `${name}様`,
    ] : [
      `${name}様`,
      ...message,
      '-----',
      companyName || '',
      `〒${postNo || ''}　${address || ''}`,
      `TEL:${tel || ''}`,
      `FAX:${fax || ''}`,
    ];

  openEmail({
    address: emailAddress,
    subject: `【${name}様】`,
    body,
  });
};
