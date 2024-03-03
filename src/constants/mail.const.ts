export enum MAIL_ACTION {
  ACTIVATE_USER = 1,
  FORGOT_PASSWORD = 2,
}

export const ACTIVAT_USER = (toUser: string | null, otp?: string) => {
  return (
    "<div>" +
    "<p>" +
    `    Dear ${toUser},` +
    "</p>" +
    "<p>" +
    "    Thank you for choosing CENIMA +. Use the following OTP to complete your Sign Up procedures OTP is valid for 1 minutes" +
    "<h2 style=`background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;`>" +
    `    ${otp}` +
    "</h2>" +
    "    CENIMA +" +
    "</div>"
  );
};

export const FORGOT_PASSWORD = (toUser: string | null, password?: string) => {
  return (
    "<div>" +
    "<p>" +
    `    Dear ${toUser},` +
    "</p>" +
    "<p>" +
    "    Thank you for choosing CENIMA +. Do not give your password to others. Your password" +
    "<h2 style=`background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;`>" +
    `    ${password}` +
    "</h2>" +
    "    CENIMA +" +
    "</div>"
  );
};
