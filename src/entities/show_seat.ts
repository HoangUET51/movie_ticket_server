import { BaseEntity } from "@/base";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Booking } from "./booking";

@Index("showSeats_pkey", ["id"], { unique: true })
@Entity("showSeats", { schema: "public" })
export class ShowSeat extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column({ type: "boolean", name: "isReserved" })
  isReserved: boolean;

  @Column({ type: "double precision", name: "price" })
  price: number;

  @Column({ type: "integer", name: "bookingId" })
  bookingId: number;

  @ManyToOne(() => Booking, (booking) => booking.seats)
  @JoinColumn([{ name: "bookingId", referencedColumnName: "id" }])
  booking: Booking;
}
