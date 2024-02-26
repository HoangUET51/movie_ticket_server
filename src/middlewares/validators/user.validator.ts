import { REGEX_OTP_FORMAT } from "@/constants/regex.const";
import { isValidEmail, isValidPhoneNumber } from "@/helpers/ulti.helper";
import { body } from "express-validator";

export const validateLogin = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isString()
      .withMessage("Email is invalid")
      .trim()
      .custom((value) => {
        if (!value || isValidEmail(value)) {
          return true;
        }
        return false;
      })
      .withMessage("Email is invalid"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .trim()
      .isString()
      .withMessage("Password is invalid"),
  ];
};

export const validateRegisterUser = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("email is required")
      .isString()
      .withMessage("email is invalid")
      .trim()
      .custom((value) => {
        if (!value || isValidEmail(value)) {
          return true;
        }
        return false;
      })
      .withMessage("email is invalid"),
    body("phone")
      .notEmpty()
      .withMessage("phone is required")
      .isString()
      .withMessage("phone is invalid")
      .trim()
      .custom((value) => {
        if (!value || isValidPhoneNumber(value)) {
          return true;
        }
        return false;
      })
      .withMessage("phone is invalid"),
    body("address")
      .notEmpty()
      .withMessage("address is required")
      .trim()
      .isString()
      .withMessage("address is invalid"),
    body("fullName")
      .notEmpty()
      .withMessage("fullName is required")
      .trim()
      .isString()
      .withMessage("fullName is invalid"),
    body("password")
      .notEmpty()
      .withMessage("password is required")
      .trim()
      .isString()
      .withMessage("password is invalid"),
  ];
};

export const validateActivateUser = () => {
  return [
    body("token")
      .notEmpty()
      .withMessage("token is required")
      .isString()
      .withMessage("token is invalid")
      .trim(),
    body("otp")
      .notEmpty()
      .withMessage("otp is required")
      .isString()
      .withMessage("otp is invalid")
      .trim()
      .custom((value) => {
        if (!value || REGEX_OTP_FORMAT.test(value)) {
          return true;
        }
        return false;
      })
      .withMessage("otp is invalid"),
  ];
};
