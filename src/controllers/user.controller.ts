import { Request, Response, NextFunction } from "express";
import { BaseController } from "../base";
import { getCustomRepository } from "typeorm";
import UserRepository from "@/repositories/user.repository";
import { AppError, UserResponse } from "@/models";
import { MailInfo, sendEmails } from "@/services/mail.service";
import { MAIL_ACTION } from "@/constants/mail.const";

class _UserController extends BaseController {
  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userRequested: UserResponse = req.body.user;

      const { fullName, address, password, phone } = req.body;

      const userRepository = getCustomRepository(UserRepository);

      const result = await userRepository.updateUser({
        id: userRequested.id,
        address: address,
        fullName: fullName,
        password: password,
        phone: phone,
      });

      if (!result) {
        throw new AppError("Updated failed");
      }

      this.success(req, res)(result);
    } catch (e) {
      next(this.getManagedError(e));
    }
  }

  async upLoadAvatar(req: Request, res: Response, next: NextFunction) {
    try {
      const userRequested: UserResponse = req.body.user;
      const { avatar } = req.body;

      const userRepository = getCustomRepository(UserRepository);

      const result = await userRepository.upLoadAvatar(
        avatar,
        userRequested.email,
      );

      if (!result) {
        throw new AppError("Uploaded failed");
      }

      this.success(req, res)({ avatar: result });
    } catch (e) {
      next(this.getManagedError(e));
    }
  }

  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const userRepository = getCustomRepository(UserRepository);
      const result = await userRepository.forgotPassword(email);

      if (!result) {
        throw new AppError("Updated failed");
      }

      const mailInfo: MailInfo = {
        mailAction: MAIL_ACTION.FORGOT_PASSWORD,
        toEmail: email,
        password: result.password,
        toUser: result.fullName,
      };

      //sendPassword
      sendEmails([mailInfo]);

      this.success(req, res)({ isUpdated: true });
    } catch (e) {
      next(this.getManagedError(e));
    }
  }

  async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const userRequested: UserResponse = req.body.user;
      const { password } = req.body;
      const userRepository = getCustomRepository(UserRepository);
      const result = await userRepository.changePassword(
        userRequested.email,
        password,
      );

      this.success(req, res)(result);
    } catch (e) {
      next(this.getManagedError(e));
    }
  }
}

const UserController = new _UserController("USER_CONTROLLER");
export default UserController;
