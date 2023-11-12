import { BaseEntity } from "@/base";
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cinema } from "./cinema";

@Index("citys_pkey", ["id"], { unique: true })
@Entity("citys", { schema: "public" })
export class City extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column({ type: "character varying", length: 50, name: "name" })
  name: string;

  @Column({ type: "character varying", length: 50, name: "zipCode" })
  zipCode: string;

  @Column({ type: "character varying", length: 50, name: "state" })
  state: string;

  @OneToMany(() => Cinema, (cinema) => cinema.city)
  cinemas: Cinema[];
}
