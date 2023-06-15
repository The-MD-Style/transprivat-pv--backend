import { Column, Entity, ManyToOne } from "typeorm";

import { SectionDataEntity } from "./sectionData.entity";
import { BaseEntity } from "src/Entity/base.entity";

@Entity('ContentEntity')
export class ContentEntity extends BaseEntity{

    @ManyToOne(() => SectionDataEntity, (sectionData) => sectionData.content, {onDelete: 'CASCADE'})
	sectionData: SectionDataEntity;

    @Column({default:false})
    isList?: boolean;
    
    @Column({type: 'varchar', length:1000, array: true})
	text: string[];
    
}

