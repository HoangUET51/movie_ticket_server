import { BaseEntity } from "@/base";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user";
import { Booking } from "./booking";

@Index("notifications_pkey", ["id"], { unique: true })
@Entity("notifications", { schema: "public" })
export class Notification extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column({
    type: "date",
    name: "createdOn",
  })
  createdOn: Date;

  @Column({ type: "integer", name: "userId" })
  userId: number;

  @Column({ type: "integer", name: "bookingId" })
  bookingId: number;

  @ManyToOne(() => User, (user) => user.notifications)
  @JoinColumn([{ name: "userId", referencedColumnName: "id" }])
  user: User;

  @ManyToOne(() => Booking, (booking) => booking.notifications)
  @JoinColumn([{ name: "bookingId", referencedColumnName: "id" }])
  booking: Booking;
}
