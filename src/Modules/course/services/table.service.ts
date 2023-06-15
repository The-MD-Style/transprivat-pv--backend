import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { CreateTableDto } from "../dto/create-table.dto";
import { TableEntity } from "../entity/table.entity";


@Injectable()
export class TableService {
  constructor(@InjectRepository(TableEntity) private readonly tableRepository: Repository<TableEntity>) {}

  public async create(createTableDto: CreateTableDto): Promise<TableEntity> {
    // const tableEntity = new TableEntity();
    // tableEntity.head = createTableDto.head;
    // // tableEntity.footer = createTableDto.footer;
    // tableEntity.rows = 

    const table = this.tableRepository.create(createTableDto);

    return this.tableRepository.save(table);
  }

  public async createAll(createTableDto: CreateTableDto[]): Promise<TableEntity[]> {
    const createdTableDto = createTableDto.map((table) => this.tableRepository.create(table));

    return this.tableRepository.save(createdTableDto);
  }

  public async getAll(): Promise<TableEntity[]> {
    return await this.tableRepository.find({
      relations: ['rows']
    });
  }
}
