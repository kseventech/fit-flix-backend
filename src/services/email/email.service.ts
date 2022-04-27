import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';

@Injectable()
export class EmailService {
  constructor() {}

  transporter = createTransport({
    host: 'webmail.k7tech.agency',
    port: 465,
    secure: true,
    tls: {
      rejectUnauthorized: false,
    },
    auth: {
      user: 'novine@k7tech.agency',
      pass: 'H3syD56Kyf2t5Z3',
    },
  });

  async sendEmail(email: string, message: string, issue: string) {
    await this.transporter.sendMail({
      from: 'novine@k7tech.agency', // sender address
      to: 'damir@k7tech.agency', // list of receivers
      subject: issue, // Subject line
      text: message, // plain text body
      html: `<b>userEmail: ${email}</b><br><br><b>${message}</b>`, // html body
    });
    return true;
  }
}
