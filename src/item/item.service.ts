import { BadRequestException, FileValidator, Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing } from './entities/listing.entity';
import { Comment } from './entities/comment.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
    @InjectRepository(Listing)
    private readonly listingRepository: Repository<Listing>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly dataSource: DataSource,
  ) { }
  async create(createItemDto: CreateItemDto) {
    try {
      return await this.dataSource.transaction(async (manager) => {
        // 1. Save Listing
        const listing = manager.create(Listing, createItemDto.listing);
        await manager.save(Listing, listing);

        // 2. Save Comments
        const commentEntities = createItemDto.comment.map((c) =>
          manager.create(Comment, c),
        );
        await manager.save(Comment, commentEntities);

        // 3. Save Item with relations
        const item = manager.create(Item, {
          name: createItemDto.name,
          public: createItemDto.public,
          listing: listing,
          comments: commentEntities,
        }); 
        const savedItem = await manager.save(Item, item);

        return {
          message: 'This action adds a new item (transactional)',
          savedItem,
        };

      })
    } catch (error) {
      console.error('Transaction failed:', error);
      throw new BadRequestException('Failed to create item');
    }


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
      relations: { listing: true, comments: true }
    })
    return { message: `This action returns a #${id} item`, item };
  }

  async update(id: string, updateItemDto: UpdateItemDto) {
    console.log(updateItemDto);
    const item = await this.itemsRepository.findOneBy({ id })
    if (!item) {
      throw new BadRequestException(`Item with id ${id} not found`);
    }
 
    item.name = updateItemDto.name ?? item.name;
    item.public = updateItemDto.public ?? item.public;
    if (updateItemDto.listing) {
    if (!item.listing) {
      item.listing = this.listingRepository.create(updateItemDto.listing);
    } else {
      item.listing.description = updateItemDto.listing.description ?? item.listing.description;
      item.listing.rating = updateItemDto.listing.rating ?? item.listing.rating;
    }
    await this.listingRepository.save(item.listing);
  }
  if(updateItemDto.comment){
     const newComments = updateItemDto.comment.map(c => this.commentRepository.create(c));
      item.comments = newComments;
      return await this.itemsRepository.save(item);
  }
    const savedItem = await this.itemsRepository.save(item);

    return {
      message: `This action updates item #${id}`,
      updatedItem: savedItem,
    };

  }
}
