import { BaseEntity } from "@/base";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Booking } from "./booking";
import { CinemaHall } from "./cinema_hall";

@Index("shows_pkey", ["id"], { unique: true })
@Index("IX_shows_cinemaHallId", ["cinemaHallId"])
@Entity("shows", { schema: "public" })
export class Show extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column({
    type: "date",
    name: "createdOn",
  })
  createdOn: Date;

  @Column({
    type: "date",
    name: "startDate",
  })
  startDate: Date;

  @Column({
    type: "date",
    name: "endDate",
  })
  endDate: Date;

  @Column({ type: "integer", name: "cinemaHallId" })
  cinemaHallId: number;

  @OneToMany(() => Booking, (booking) => booking.show)
  bookings: Booking[];

  @ManyToOne(() => CinemaHall, (cinemaHall) => cinemaHall.shows)
  @JoinColumn([{ name: "cinemaHallId", referencedColumnName: "id" }])
  cinemaHall: CinemaHall;
}
