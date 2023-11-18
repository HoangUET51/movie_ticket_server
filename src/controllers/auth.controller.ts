import { Request, Response, NextFunction } from "express";
import { BaseController } from "../base";
import { getCustomRepository } from "typeorm";
import UserRepository from "@/repositories/user.repository";
import { generateOTP, hashPassword } from "@/helpers/ulti.helper";
import { Role } from "@/constants/common.const";
import { AppError } from "@/models";
import { sign, verify } from "jsonwebtoken";
import { MailInfo, sendEmails } from "@/services/mail.service";
import { MAIL_ACTION } from "@/constants/mail.const";

class _AuthController extends BaseController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const userRepository = getCustomRepository(UserRepository);

      const result = await userRepository.login(email, password);
      if (!result) {
        throw new AppError("Login failed");
      }

      this.success(req, res)(result);
    } catch (e) {
      next(this.getManagedError(e));
    }
  }

  async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { fullName, address, email, password, phone } = req.body;
      const userRepository = getCustomRepository(UserRepository);
      const checkUser = await userRepository.getByEmail(email);

      if (checkUser) {
        throw new AppError("User already exists");
      }

      const otp = generateOTP();
      const token = sign(
        {
          email,
          phone,
          address,
          fullName,
          password,
          otpDecoded: otp,
          lastDate: new Date().getTime(),
        },
        `${process.env.JWT_SECRET_KEY}`,
        { expiresIn: "1d" },
      );

      const mailInfo: MailInfo = {
        mailAction: MAIL_ACTION.ACTIVATE_USER,
        toEmail: email,
        toUser: fullName,
        otp,
      };
      //sendOTP
      sendEmails([mailInfo]);

      this.success(req, res)({ token });
    } catch (e) {
      next(this.getManagedError(e));
    }
  }

  async activateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { token, otp } = req.body;

      if (!token) {
        throw new AppError("create failed");
      }

      const decoded: any = verify(token, process.env.JWT_SECRET_KEY ?? "");

      if (!decoded) {
        throw new AppError("create failed");
      }

      const {
        email,
        phone,
        address,
        fullName,
        password,
        otpDecoded,
        lastDate,
      } = decoded;

      if (new Date().getTime() - lastDate >= 60000) {
        throw new AppError("OTP expired. Please receive new code");
      }

      if (otp !== otpDecoded) {
        throw new AppError("OTP code is not valid");
      }

      const userRepository = getCustomRepository(UserRepository);

      const result = await userRepository.registerUser({
        fullName: fullName ?? null,
        address: address ?? null,
        email: email ?? null,
        password: hashPassword(password),
        phone: phone ?? null,
        role: Role.Customer,
      });

      if (!result) {
        throw new AppError("create failed");
      }

      this.success(req, res)({ result });
    } catch (e) {
      next(this.getManagedError(e));
    }
  }
}

const AuthController = new _AuthController("AUTH_CONTROLLER");
export default AuthController;
