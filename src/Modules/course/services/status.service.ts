import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { CreateStatusDto } from "../dto/create-status.dto";
import { StatusEntity } from "../entity/status.entity";


@Injectable()
export class StatusService {
  constructor(@InjectRepository(StatusEntity) private readonly statusRepository: Repository<StatusEntity>) {}

  public async create(createStatusDto: CreateStatusDto): Promise<StatusEntity> {
    const status = this.statusRepository.create(createStatusDto);

    return this.statusRepository.save(status);
  }

  public async getAll(): Promise<StatusEntity[]> {
    return await this.statusRepository.find();
  }
}
