import {
  REGEX_DEFAULT_EMAIL_FORMAT,
  REGEX_PHONE_NUMBER_FORMAT,
} from "@/constants/regex.const";
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

export const generatePassword = () => {
  return Math.random().toString(36).slice(-8);
};

export const isValidEmail = (
  value: any,
  emailFormat = REGEX_DEFAULT_EMAIL_FORMAT,
) => {
  return emailFormat.test(value);
};

export const isValidPhoneNumber = (
  value: any,
  phoneNumberFormat = REGEX_PHONE_NUMBER_FORMAT,
) => {
  return phoneNumberFormat.test(value);
};
