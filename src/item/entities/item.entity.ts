import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Listing } from "./listing.entity";
import { AbstractEntity } from "src/database/abstrct.entity";
import { Comment } from "./comment.entity";
import { User } from "src/user/entities/user.entity";

@Entity()
export class Item extends AbstractEntity<Item> {

  @Column()
  name: string

  @Column({ default: true })
  public: boolean

  @OneToOne(() => Listing, { cascade: true })
  @JoinColumn()
  listing: Listing

  @OneToMany(() => Comment, comment => comment.item, { cascade: true })
  comments: Comment[];
  @ManyToOne(() => User, user => user.items)
  user: User;
}
