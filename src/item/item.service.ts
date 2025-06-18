import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { EntityManager, Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing } from './entities/listing.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
    @InjectRepository(Listing)
    private readonly listing: Repository<Listing>,
    private readonly entityManager: EntityManager
  ) { }
  async create(createItemDto: CreateItemDto) {
    const listing = this.listing.create({
      ...createItemDto.listing,
      rating: 0
    })
    const item = this.itemsRepository.create({
      ...createItemDto
    })

    item.listing = listing;
    const data = await this.entityManager.save(item)
    return { message: 'This action adds a new item', data };
  }

  async findAll() {
    const item = await this.itemsRepository.find()
    return { message: `This action returns all item`, item };
  }

  async findOne(id: string) {
    const item = await this.itemsRepository.findOne({
      where: {
        id
      },
      relations: { listing: true }
    })
    return { message: `This action returns a #${id} item`, item };
  }

  async update(id: string, updateItemDto: UpdateItemDto) {
    console.log(updateItemDto);
    const item = await this.itemsRepository.findOneBy({ id })
    if (!item) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }

    item.public = updateItemDto.public
    const savedItem = await this.itemsRepository.save(item);

    return {
      message: `This action updates item #${id}`,
      updatedItem: savedItem,
    };

  }
}
