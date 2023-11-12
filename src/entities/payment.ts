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

  @Column({
    type: "enum",
    name: "paymentStatus",
    enum: PaymentStatus,
    default: PaymentStatus.Unpaid,
  })
  paymentStatus: PaymentStatus;

  @Column({ type: "enum", name: "paymentType", enum: PaymentType })
  paymentType: PaymentType;

  @Column({ type: "integer", name: "discountId", nullable: true })
  discountId: number | null;

  @ManyToOne(() => Discount, (discount) => discount.payments)
  @JoinColumn([{ name: "discountId", referencedColumnName: "id" }])
  discount: Discount;
}
