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
import { CinemaHall } from "./cinema_hall";
import { City } from "./city";

@Index("cinemas_pkey", ["id"], { unique: true })
@Entity("cinemas", { schema: "public" })
export class Cinema extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column({ type: "character varying", length: 50, name: "name" })
  name: string;

  @Column({ type: "character varying", length: 50, name: "location" })
  location: string;

  @Column({ type: "integer", name: "totalCinemaHalls" })
  totalCinemaHalls: number;

  @Column({ type: "integer", name: "cityId" })
  cityId: number;

  @OneToMany(() => CinemaHall, (cinemaHall) => cinemaHall.cinema)
  cinemaHalls: CinemaHall[];

  @ManyToOne(() => City, (city) => city.cinemas)
  @JoinColumn([{ name: "cityId", referencedColumnName: "id" }])
  city: City;
}
