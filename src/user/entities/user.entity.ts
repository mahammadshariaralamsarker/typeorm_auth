 
import { Item } from 'src/item/entities/item.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

   @OneToMany(() => Item, item => item.user, { cascade: true })
  items: Item[];
}
