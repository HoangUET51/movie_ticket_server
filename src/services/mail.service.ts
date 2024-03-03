import { BaseHttpService } from "@/base";
import {
  ACTIVAT_USER,
  FORGOT_PASSWORD,
  MAIL_ACTION,
} from "@/constants/mail.const";
import nodemailer from "nodemailer";

export interface MailInfo {
  mailAction: MAIL_ACTION;
  toEmail: string;
  toUser: string;
  subject?: string;
  content?: string;
  otp?: string;
  password?: string;
}

export class MailService extends BaseHttpService<any> {
  public subject?: string;
  public content?: string;
  public toEmail: string;
  public toUser: string;
  public mailAction: MAIL_ACTION;
  public otp?: string;
  public password?: string;

  constructor({
    subject,
    content,
    toEmail,
    mailAction,
    toUser,
    otp,
    password,
  }: MailInfo) {
    super();
    this.subject = subject;
    this.content = content;
    this.toEmail = toEmail;
    this.mailAction = mailAction;
    this.toUser = toUser;
    this.otp = otp;
    this.password = password;
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

    let subject = this.subject;
    let content = this.content;

    switch (this.mailAction) {
      case MAIL_ACTION.ACTIVATE_USER:
        subject = "Verification OTP";
        content = ACTIVAT_USER(this.toUser, this.otp);
        break;
      case MAIL_ACTION.FORGOT_PASSWORD:
        subject = "Forgot Password";
        content = FORGOT_PASSWORD(this.toUser, this.password);
        break;
    }

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
