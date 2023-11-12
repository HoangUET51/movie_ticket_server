import { BaseEntity } from "@/base";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Notification } from "./notification";
import { BookingStatus } from "@/constants/common.const";
import { Show } from "./show";
import { ShowSeat } from "./show_seat";
import { Payment } from "./payment";

@Index("bookings_pkey", ["id"], { unique: true })
@Entity("bookings", { schema: "public" })
export class Booking extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column({
    type: "enum",
    name: "status",
    enum: BookingStatus,
    default: BookingStatus.Requested,
  })
  status: BookingStatus;

  @Column({ type: "integer", name: "showId" })
  showId: number;

  @Column({ type: "integer", name: "paymentId" })
  paymentId: number;

  @OneToMany(() => Notification, (notification) => notification.booking)
  notifications: Notification[];

  @OneToMany(() => ShowSeat, (showSeat) => showSeat.booking)
  seats: ShowSeat[];

  @ManyToOne(() => Show, (show) => show.bookings)
  @JoinColumn([{ name: "showId", referencedColumnName: "id" }])
  show: Show[];

  @OneToOne(() => Payment)
  @JoinColumn([{ name: "paymentId", referencedColumnName: "id" }])
  payment: Payment;
}
