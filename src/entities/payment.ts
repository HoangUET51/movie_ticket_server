import { BaseEntity } from "@/base";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PaymentStatus, PaymentType } from "@/constants/common.const";
import { Discount } from "./discount";

@Index("payments_pkey", ["id"], { unique: true })
@Entity("payments", { schema: "public" })
export class Payment extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column({
    type: "date",
    name: "createdOn",
  })
  createdOn: Date;

  @Column({ type: "integer", name: "paymentStatus" })
  paymentStatus: PaymentStatus;

  @Column({ type: "integer", name: "paymentType" })
  paymentType: PaymentType;

  @Column({ type: "integer", name: "discountId" })
  discountId: number;

  @ManyToOne(() => Discount, (discount) => discount.payments)
  @JoinColumn([{ name: "discountId", referencedColumnName: "id" }])
  discount: Discount;
}
