import { BaseEntity } from "@/base";
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Notification } from "./notification";
import { Movie } from "./movie";
import { Role } from "@/constants/common.const";

@Index("users_pkey", ["id"], { unique: true })
@Entity("users", { schema: "public" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column({ type: "character varying", length: 50, name: "fullName" })
  fullName: string;

  @Column({ type: "character varying", length: 50, name: "address" })
  address: string;

  @Column({ type: "character varying", length: 100, name: "email" })
  email: string;

  @Column({ type: "character varying", length: 15, name: "phone" })
  phone: string;

  @Column({ type: "character varying", name: "password", length: 256 })
  password: string;

  @Column({
    type: "character varying",
    length: 2000,
    name: "avatar",
    nullable: true,
  })
  avatar: string | null;

  @Column({ type: "integer", name: "role" })
  role: Role;

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];

  @OneToMany(() => Movie, (movie) => movie.user)
  movies: Movie[];
}
