import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { CreateSectionDataDto } from "../dto/create-sectionData.dto";
import { SectionDataEntity } from "../entity/sectionData.entity";


@Injectable()
export class SectionDataService {
  constructor(@InjectRepository(SectionDataEntity) private readonly sectionDataRepository: Repository<SectionDataEntity>) {}

  public async create(createSectionDataDto: CreateSectionDataDto): Promise<SectionDataEntity> {
    const sectionData = this.sectionDataRepository.create(createSectionDataDto);

    return this.sectionDataRepository.save(sectionData);
  }

  public async createAll(createSectionDataDto: CreateSectionDataDto[]): Promise<SectionDataEntity[]> {
    const createdSectionDataDto = createSectionDataDto.map((sectionData) => this.sectionDataRepository.create(sectionData));

    return this.sectionDataRepository.save(createdSectionDataDto);
  }

  public async getAll(): Promise<SectionDataEntity[]> {
    return await this.sectionDataRepository.find();
  }
}
