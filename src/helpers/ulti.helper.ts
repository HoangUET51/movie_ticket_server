import bcrypt from "bcryptjs";
import otpGenerator from "otp-generator";

export const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(10);

  return bcrypt.hashSync(password, salt);
};

export const checkPassword = (inputPassword: string, hashPassword: string) => {
  return bcrypt.compare(inputPassword, hashPassword);
};

export const generateOTP = () => {
  const otp = otpGenerator.generate(4, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  return otp;
};
