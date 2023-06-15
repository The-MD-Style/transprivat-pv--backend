import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { CreateDateDto } from "../dto/create-date.dto";
import { DateEntity } from "../entity/date.entity";

@Injectable()
export class DateService {
  constructor(@InjectRepository(DateEntity) private readonly dateRepository: Repository<DateEntity>) {}

  public async create(createDateDto: CreateDateDto): Promise<DateEntity> {
    const date = this.dateRepository.create(createDateDto);

    return this.dateRepository.save(date);
  }

  public async getAll(): Promise<DateEntity[]> {
    return await this.dateRepository.find();
  }
}
