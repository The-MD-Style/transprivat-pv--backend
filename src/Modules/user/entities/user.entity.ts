import { Entity, Column } from "typeorm";

import { BaseEntity } from "../../../entity/base.entity";

@Entity("UserEntity")
export class UserEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: "text", nullable: true })
  refreshToken: string | null;
}
