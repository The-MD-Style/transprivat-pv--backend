import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { ContentEntity } from "../entity/content.entity";
import { CreateContentDto } from "../dto/create-content.dto";

@Injectable()
export class ContentService {
  constructor(@InjectRepository(ContentEntity) private readonly contentRepository: Repository<ContentEntity>) {}

  public async create(createContentDto: CreateContentDto): Promise<ContentEntity> {
    const content = this.contentRepository.create(createContentDto);

    return this.contentRepository.save(content);
  }

  public async getAll(): Promise<ContentEntity[]> {
    return await this.contentRepository.find();
  }
}
