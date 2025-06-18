import { AbstractEntity } from "src/database/abstrct.entity";
import { Column, ManyToOne } from "typeorm";
import { Item } from "./item.entity";

export class Comment extends AbstractEntity<Comment> {
  @Column()
  content:string

  @ManyToOne(()=> Item)
  item :Item
}