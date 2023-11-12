import { BaseEntity } from "@/base";
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Payment } from "./payment";

@Index("discounts_pkey", ["id"], { unique: true })
@Entity("discounts", { schema: "public" })
export class Discount extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column({ type: "double precision", name: "balance" })
  balance: number;

  @Column({
    type: "date",
    name: "expiryDate",
  })
  expiryDate: Date;

  @OneToMany(() => Payment, (payment) => payment.discount)
  payments: Payment[];
}
