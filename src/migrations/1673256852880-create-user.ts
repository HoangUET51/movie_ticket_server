import { commonFields } from "@/constants/migrations.const";
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from "typeorm";

export class createUser1673256852880 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          ...commonFields,
          {
            name: "fullName",
            type: "varchar",
            isNullable: false,
            length: "50",
          },
          {
            name: "address",
            type: "varchar",
            isNullable: false,
            length: "50",
          },
          {
            name: "email",
            type: "varchar",
            isNullable: false,
            length: "100",
          },
          {
            name: "phone",
            type: "varchar",
            isNullable: false,
            length: "15",
          },
          {
            name: "password",
            type: "varchar",
            isNullable: false,
            length: "256",
          },
          {
            name: "avatar",
            type: "varchar",
            isNullable: true,
            length: "2000000",
          },
          {
            name: "role",
            type: "varchar",
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: "discounts",
        columns: [
          ...commonFields,
          {
            name: "balance",
            type: "int",
            isNullable: false,
          },
          {
            name: "expiryDate",
            type: "datetime",
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: "citys",
        columns: [
          ...commonFields,
          {
            name: "name",
            type: "varchar",
            isNullable: false,
            length: "50",
          },
          {
            name: "zipCode",
            type: "varchar",
            isNullable: false,
            length: "50",
          },
          {
            name: "state",
            type: "varchar",
            isNullable: false,
            length: "50",
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: "movies",
        columns: [
          ...commonFields,
          {
            name: "title",
            type: "varchar",
            isNullable: false,
            length: "100",
          },
          {
            name: "description",
            type: "varchar",
            isNullable: false,
            length: "2000",
          },
          {
            name: "durationInMins",
            type: "int",
            isNullable: false,
          },
          {
            name: "language",
            type: "varchar",
            isNullable: false,
            length: "50",
          },
          {
            name: "releaseDate",
            type: "datetime",
            isNullable: false,
          },
          {
            name: "country",
            type: "varchar",
            isNullable: false,
            length: "50",
          },
          {
            name: "genre",
            type: "varchar",
            isNullable: false,
            length: "50",
          },
          {
            name: "userId",
            type: "int",
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      "movies",
      new TableForeignKey({
        name: "FK_movies_users",
        columnNames: ["userId"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: "payments",
        columns: [
          ...commonFields,
          {
            name: "createdOn",
            type: "datetime",
            isNullable: false,
          },
          {
            name: "paymentStatus",
            type: "int",
            isNullable: false,
            default: 0,
          },
          {
            name: "paymentType",
            type: "int",
            isNullable: false,
          },
          {
            name: "discountId",
            type: "int",
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      "payments",
      new TableForeignKey({
        name: "FK_payments_discounts",
        columnNames: ["discountId"],
        referencedColumnNames: ["id"],
        referencedTableName: "discounts",
        onDelete: "CASCADE",
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: "cinemas",
        columns: [
          ...commonFields,
          {
            name: "name",
            type: "varchar",
            isNullable: false,
            length: "50",
          },
          {
            name: "location",
            type: "varchar",
            isNullable: false,
            length: "50",
          },
          {
            name: "totalCinemaHalls",
            type: "int",
            isNullable: false,
          },
          {
            name: "cityId",
            type: "int",
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      "cinemas",
      new TableForeignKey({
        name: "FK_cinemas_citys",
        columnNames: ["cityId"],
        referencedColumnNames: ["id"],
        referencedTableName: "citys",
        onDelete: "CASCADE",
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: "cinemaHalls",
        columns: [
          ...commonFields,
          {
            name: "name",
            type: "varchar",
            isNullable: false,
            length: "50",
          },
          {
            name: "totalSeats",
            type: "int",
            isNullable: false,
          },
          {
            name: "cinemaId",
            type: "int",
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      "cinemaHalls",
      new TableForeignKey({
        name: "FK_cinemaHalls_cinemas",
        columnNames: ["cinemaId"],
        referencedColumnNames: ["id"],
        referencedTableName: "cinemas",
        onDelete: "CASCADE",
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: "cinemaHallSeats",
        columns: [
          ...commonFields,
          {
            name: "seatRow",
            type: "int",
            isNullable: false,
          },
          {
            name: "seatColumn",
            type: "int",
            isNullable: false,
          },
          {
            name: "seatType",
            type: "int",
            isNullable: false,
          },
          {
            name: "cinemaHallId",
            type: "int",
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      "cinemaHallSeats",
      new TableForeignKey({
        name: "FK_cinemaHallSeat_cinemaHalls",
        columnNames: ["cinemaHallId"],
        referencedColumnNames: ["id"],
        referencedTableName: "cinemaHalls",
        onDelete: "CASCADE",
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: "shows",
        columns: [
          ...commonFields,
          {
            name: "createdOn",
            type: "datetime",
            isNullable: false,
          },
          {
            name: "startTime",
            type: "datetime",
            isNullable: false,
          },
          {
            name: "endTime",
            type: "datetime",
            isNullable: false,
          },
          {
            name: "cinemaHallId",
            type: "int",
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      "shows",
      new TableForeignKey({
        name: "FK_shows_cinemaHalls",
        columnNames: ["cinemaHallId"],
        referencedColumnNames: ["id"],
        referencedTableName: "cinemaHalls",
        onDelete: "CASCADE",
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: "bookings",
        columns: [
          ...commonFields,
          {
            name: "status",
            type: "int",
            isNullable: false,
            default: 0,
          },
          {
            name: "showId",
            type: "int",
            isNullable: false,
          },
          {
            name: "paymentId",
            type: "int",
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      "bookings",
      new TableForeignKey({
        name: "FK_bookings_shows",
        columnNames: ["showId"],
        referencedColumnNames: ["id"],
        referencedTableName: "shows",
        onDelete: "CASCADE",
      }),
    );

    await queryRunner.createForeignKey(
      "bookings",
      new TableForeignKey({
        name: "FK_bookings_payments",
        columnNames: ["paymentId"],
        referencedColumnNames: ["id"],
        referencedTableName: "payments",
        onDelete: "CASCADE",
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: "showSeats",
        columns: [
          ...commonFields,
          {
            name: "isReserved",
            type: "boolean",
            isNullable: false,
          },
          {
            name: "price",
            type: "decimal",
            isNullable: false,
          },
          {
            name: "bookingId",
            type: "int",
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      "showSeats",
      new TableForeignKey({
        name: "FK_showSeats_bookings",
        columnNames: ["bookingId"],
        referencedColumnNames: ["id"],
        referencedTableName: "bookings",
        onDelete: "CASCADE",
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: "notifications",
        columns: [
          ...commonFields,
          {
            name: "createdOn",
            type: "datetime",
            isNullable: false,
          },
          {
            name: "userId",
            type: "int",
            isNullable: false,
          },
          {
            name: "bookingId",
            type: "int",
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      "notifications",
      new TableForeignKey({
        name: "FK_notifications_users",
        columnNames: ["userId"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
      }),
    );

    await queryRunner.createForeignKey(
      "notifications",
      new TableForeignKey({
        name: "FK_notifications_bookings",
        columnNames: ["bookingId"],
        referencedColumnNames: ["id"],
        referencedTableName: "bookings",
        onDelete: "CASCADE",
      }),
    );

    await queryRunner.createIndex(
      "movies",
      new TableIndex({
        name: "IX_movies_userId",
        columnNames: ["userId"],
      }),
    );

    await queryRunner.createIndex(
      "payments",
      new TableIndex({
        name: "IX_payments_discountId",
        columnNames: ["discountId"],
      }),
    );

    await queryRunner.createIndex(
      "cinemas",
      new TableIndex({
        name: "IX_cinemas_cityId",
        columnNames: ["cityId"],
      }),
    );

    await queryRunner.createIndex(
      "cinemaHalls",
      new TableIndex({
        name: "IX_cinemaHalls_cinemaId",
        columnNames: ["cinemaId"],
      }),
    );

    await queryRunner.createIndex(
      "cinemaHallSeats",
      new TableIndex({
        name: "IX_cinemaHallSeats_cinemaHallId",
        columnNames: ["cinemaHallId"],
      }),
    );

    await queryRunner.createIndex(
      "shows",
      new TableIndex({
        name: "IX_shows_cinemaHallId",
        columnNames: ["cinemaHallId"],
      }),
    );

    await queryRunner.createIndex(
      "bookings",
      new TableIndex({
        name: "IX_bookings_showId",
        columnNames: ["showId"],
      }),
    );

    await queryRunner.createIndex(
      "bookings",
      new TableIndex({
        name: "IX_bookings_paymentId",
        columnNames: ["paymentId"],
      }),
    );

    await queryRunner.createIndex(
      "showSeats",
      new TableIndex({
        name: "IX_showSeats_bookingId",
        columnNames: ["bookingId"],
      }),
    );

    await queryRunner.createIndex(
      "notifications",
      new TableIndex({
        name: "IX_notifications_userId",
        columnNames: ["userId"],
      }),
    );

    await queryRunner.createIndex(
      "notifications",
      new TableIndex({
        name: "IX_notifications_bookingId",
        columnNames: ["bookingId"],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("notifications");
    await queryRunner.dropTable("showSeats");
    await queryRunner.dropTable("bookings");
    await queryRunner.dropTable("shows");
    await queryRunner.dropTable("cinemaHallSeats");
    await queryRunner.dropTable("cinemaHalls");
    await queryRunner.dropTable("cinemas");
    await queryRunner.dropTable("payments");
    await queryRunner.dropTable("movies");
    await queryRunner.dropTable("citys");
    await queryRunner.dropTable("discounts");
    await queryRunner.dropTable("users");
  }
}
