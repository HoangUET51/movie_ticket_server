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

@Index("movies_pkey", ["id"], { unique: true })
@Index("IX_movies_userId", ["userId"])
@Entity("movies", { schema: "public" })
export class Movie extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column({ type: "character varying", length: 100, name: "title" })
  title: string;

  @Column({
    type: "character varying",
    length: 2000,
    name: "description",
  })
  description: string;

  @Column({ type: "integer", name: "durationInMins" })
  durationInMins: number;

  @Column({ type: "character varying", length: 50, name: "language" })
  language: string;

  @Column({
    type: "date",
    name: "releaseDate",
  })
  releaseDate: Date;

  @Column({ type: "character varying", length: 50, name: "country" })
  country: string;

  @Column({ type: "character varying", length: 50, name: "genre" })
  genre: string;

  @Column({ type: "integer", name: "userId" })
  userId: number;

  @ManyToOne(() => User, (user) => user.movies)
  @JoinColumn([{ name: "userId", referencedColumnName: "id" }])
  user: User;
}
