import { Request, Response, NextFunction } from "express";
import { BaseController } from "../base";
import { getCustomRepository } from "typeorm";
import UserRepository from "@/repositories/user.repository";
import { generateOTP, hashPassword } from "@/helpers/ulti.helper";
import { Role } from "@/constants/common.const";
import { AppError } from "@/models";
import { sign, verify } from "jsonwebtoken";

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
        throw new AppError("User not found");
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
        },
        `${process.env.JWT_SECRET_KEY}`,
        { expiresIn: "1d" },
      );
      //sendOTP

      console.log(otp);

      this.success(req, res)({ token });
    } catch (e) {
      next(this.getManagedError(e));
    }
  }

  async activateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { token, otp } = req.body;

      if (!token) {
        throw new AppError("Create or updated failed");
      }

      const decoded: any = verify(token, process.env.JWT_SECRET_KEY ?? "");

      if (!decoded) {
        throw new AppError("Create or updated failed");
      }

      const { email, phone, address, fullName, password, otpDecoded } = decoded;

      if (otp !== otpDecoded) {
        throw new AppError("Create or updated failed");
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
        throw new AppError("Create or updated failed");
      }

      this.success(req, res)({ result });
    } catch (e) {
      next(this.getManagedError(e));
    }
  }
}

const AuthController = new _AuthController("AUTH_CONTROLLER");
export default AuthController;
