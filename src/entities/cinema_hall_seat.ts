import { BaseEntity } from "@/base";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CinemaHall } from "./cinema_hall";
import { SeatType } from "@/constants/common.const";

@Index("cinemaHallSeats_pkey", ["id"], { unique: true })
@Index("IX_cinemaHallSeats_cinemaHallId", ["cinemaHallId"])
@Entity("cinemaHallSeats", { schema: "public" })
export class CinemaHallSeat extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column({ type: "integer", name: "seatRow" })
  seatRow: number;

  @Column({ type: "integer", name: "seatColumn" })
  seatColumn: number;

  @Column({ type: "enum", name: "seatType", enum: SeatType })
  seatType: SeatType;

  @Column({ type: "integer", name: "cinemaHallId" })
  cinemaHallId: number;

  @ManyToOne(() => CinemaHall, (cinemaHall) => cinemaHall.cinemaHallSeats)
  @JoinColumn([{ name: "cinemaHallId", referencedColumnName: "id" }])
  cinemaHall: CinemaHall;
}
