import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { CreateTableRowDto } from "../dto/create-tableRow.dto";
import { TableRowEntity } from "../entity/tableRow.entity";


@Injectable()
export class TableRowService {
  constructor(@InjectRepository(TableRowEntity) private readonly tableRowRepository: Repository<TableRowEntity>) {}

  public async create(createTableRowDto: CreateTableRowDto): Promise<TableRowEntity> {
    
    const tableRow = this.tableRowRepository.create(createTableRowDto);

    return this.tableRowRepository.save(tableRow);
  }

  public async createAll(createTableRowDto: CreateTableRowDto[]): Promise<TableRowEntity[]> {
    const createdTableDto = createTableRowDto.map((table) => this.tableRowRepository.create(table));

    return this.tableRowRepository.save(createdTableDto);
  }

  public async getAll(): Promise<TableRowEntity[]> {
    return await this.tableRowRepository.find();
  }
}
