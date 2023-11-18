export enum MAIL_ACTION {
  ACTIVATE_USER = 1,
}

export const ACTIVAT_USER = (toUser: string | null, otp?: string) => {
  return (
    "<div>" +
    "<p>" +
    `    Dear ${toUser},` +
    "</p>" +
    "<p>" +
    "    Thank you for choosing Your Brand. Use the following OTP to complete your Sign Up procedures OTP is valid for 2 minutes" +
    "<h2 style=`background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;`>" +
    `    ${otp}` +
    "</h2>" +
    "    CENIMA +" +
    "</div>"
  );
};
