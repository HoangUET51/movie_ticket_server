import { User } from "@/entities/user";
import { EntityRepository } from "typeorm";
import BaseRepository from "@/base/base.repository";
import {
  AppError,
  UpdateUserParamsRequest,
  UserModel,
  UserParamsRequest,
} from "@/models";
import {
  checkPassword,
  generatePassword,
  hashPassword,
} from "@/helpers/ulti.helper";
import { sign } from "jsonwebtoken";

@EntityRepository(User)
class UserRepository extends BaseRepository<User> {
  async getAll() {
    return this.find();
  }

  async getByEmail(email: string) {
    const record = await this.findOne({ where: { email } });
    return record;
  }

  async registerUser(params: UserParamsRequest) {
    try {
      const newUser = new User();
      newUser.address = params.address;
      newUser.email = params.email;
      newUser.fullName = params.fullName;
      newUser.phone = params.phone;
      newUser.role = params.role;
      newUser.password = params.password;

      const res = await this.manager
        .createQueryBuilder()
        .insert()
        .into(User)
        .values(newUser)
        .updateEntity(false)
        .execute();
      newUser.id = res.raw.insertId;
      return newUser;
    } catch (e) {
      return null;
    }
  }

  async updateUser(params: UpdateUserParamsRequest) {
    try {
      const oldUser = await this.findOne({ where: { id: params.id } });
      const user = new User();

      if (!oldUser) {
        throw new AppError("Updated failed");
      }
      user.id = params.id;
      user.fullName = params?.fullName ?? oldUser.fullName;
      user.phone = params?.phone ?? oldUser.phone;
      user.address = params?.address ?? oldUser.address;
      user.password = params?.password
        ? hashPassword(params?.password)
        : oldUser.password;

      await this.manager.save(user, { reload: false });
      return this.getById(user.id);
    } catch (e) {
      return null;
    }
  }

  async getById(id: number) {
    return this.createQueryBuilder("users")
      .where("users.id = :id", {
        id,
      })
      .getOne();
  }

  async upLoadAvatar(avatar: string, email: string) {
    try {
      const user = await this.getByEmail(email);
      if (!user) {
        throw new AppError("Email is incorrect");
      }
      user.avatar = avatar;
      const newUser = await this.manager.save(user, { reload: false });
      return newUser;
    } catch (e) {
      return null;
    }
  }

  async login(email: string, password: string) {
    try {
      const user = await this.getByEmail(email);
      if (!user) {
        throw new AppError("Email or password is incorrect");
      }

      const comparePassword = await checkPassword(password, user.password);

      if (!comparePassword) {
        throw new AppError("Email or password is incorrect");
      }

      const token = sign(
        {
          id: user.id,
          email: user.email,
          role: user.role,
          phone: user.phone,
          address: user.address,
          name: user.fullName,
        },
        `${process.env.JWT_SECRET_KEY}`,
        { expiresIn: "1h" },
      );

      const userModel: UserModel = {
        user: {
          id: user.id,
          email: user.email,
          address: user.address,
          phone: user.phone,
          role: user.role,
          avatar: user.avatar,
          name: user.fullName,
        },
        accessToken: token,
      };

      return userModel;
    } catch (e) {
      return null;
    }
  }

  async forgotPassword(email: string) {
    try {
      const user = await this.getByEmail(email);
      if (!user) {
        throw new AppError("Email is incorrect");
      }
      const newPassword = generatePassword();
      user.password = hashPassword(newPassword);
      await this.manager.save(user, { reload: false });
      return { password: newPassword, fullName: user.fullName };
    } catch (e) {
      return null;
    }
  }
}

export default UserRepository;
