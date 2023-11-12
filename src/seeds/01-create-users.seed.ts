import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import { User } from "@/entities/user";
import { Role } from "@/constants/common.const";

export default class CreateCategory implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([{ email: "admin", password: "admin", role: Role.Admin }])
      .updateEntity(false)
      .execute();
  }
}
