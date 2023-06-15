import * as fs from 'fs'
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UploadFileEntity } from './entity/upload.entity';


@Injectable()
export class UploadService {
	constructor(@InjectRepository(UploadFileEntity) private readonly uploadFileRepository: Repository<UploadFileEntity>){}

	public async create(name:string): Promise<UploadFileEntity>{
		const file = new UploadFileEntity();

		file.name = name;

		const createdFile = this.uploadFileRepository.create(file);

		return await this.uploadFileRepository.save(createdFile);
    }

	public async delete(namePhoto:string): Promise<void> {
		const photo = await this.uploadFileRepository.findOne({
			where:{ name: namePhoto}
		})
		
        const filePath = `${process.cwd()}/files/${photo.name}`;
        fs.unlinkSync(filePath);
		
		await this.uploadFileRepository.delete(photo.id);
	}

	public async getAll(): Promise<UploadFileEntity[]> {
		return await this.uploadFileRepository.find();
	}
}
