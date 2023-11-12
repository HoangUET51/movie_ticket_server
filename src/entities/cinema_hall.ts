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
import { Show } from "./show";
import { CinemaHallSeat } from "./cinema_hall_seat";
import { Cinema } from "./cinema";

@Index("cinemaHalls_pkey", ["id"], { unique: true })
@Entity("cinemaHalls", { schema: "public" })
export class CinemaHall extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column({ type: "character varying", length: 50, name: "name" })
  name: string;

  @Column({ type: "integer", name: "totalSeats" })
  totalSeats: number;

  @Column({ type: "integer", name: "cinemaId" })
  cinemaId: number;

  @OneToMany(() => Show, (show) => show.cinemaHall)
  shows: Show[];

  @OneToMany(
    () => CinemaHallSeat,
    (cinemaHallSeat) => cinemaHallSeat.cinemaHall,
  )
  cinemaHallSeats: CinemaHallSeat[];

  @ManyToOne(() => Cinema, (cinema) => cinema.cinemaHalls)
  @JoinColumn([{ name: "cinemaId", referencedColumnName: "id" }])
  cinema: Cinema;
}
