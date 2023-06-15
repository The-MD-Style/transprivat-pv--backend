import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { CreateCardDto } from "../dto/create-card.dto";
import { CardEntity } from "../entity/card.entity";

@Injectable()
export class CardService {
  constructor(@InjectRepository(CardEntity) private readonly cardRepository: Repository<CardEntity>) {}

  public async create(createCardDto: CreateCardDto): Promise<CardEntity> {
    const card = this.cardRepository.create(createCardDto);

    return this.cardRepository.save(card);
  }

  public async createAll(createCardsDto: CreateCardDto[]): Promise<CardEntity[]> {
    const createdCardsDto = createCardsDto.map((card) =>  card && this.cardRepository.create(card) );

    return this.cardRepository.save(createdCardsDto);
  }

  public async getAll(): Promise<CardEntity[]> {
    return await this.cardRepository.find();
  }
}
