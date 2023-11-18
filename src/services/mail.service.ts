import { BaseHttpService } from "@/base";
import nodemailer from "nodemailer";

export interface MailInfo {
  toEmail: string;
  subject?: string;
  content?: string;
}

export class MailService extends BaseHttpService<any> {
  public subject?: string;
  public content?: string;
  public toEmail: string;

  constructor({ subject, content, toEmail }: MailInfo) {
    super();
    this.subject = subject;
    this.content = content;
    this.toEmail = toEmail;
  }

  sendMail() {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const subject = this.subject;
    const content = this.content;

    const mailOptions = {
      from: {
        name: String(process.env.MAIL_FROM_NAME),
        address: String(process.env.MAIL_ADDRESS),
      },
      to: this.toEmail,
      subject,
      html: content,
    };

    transporter.sendMail(
      mailOptions,
      function (error: any, info: { response: string }) {
        if (error) {
          return error;
        }
        return info.response;
      },
    );
  }
}

export const sendEmails = (mailInfos: MailInfo[]) => {
  if (mailInfos.length) {
    mailInfos.forEach((item) => {
      new MailService(item).sendMail();
    });
  }
};
