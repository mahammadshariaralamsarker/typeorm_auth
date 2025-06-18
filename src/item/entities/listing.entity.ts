import { AbstractEntity } from "src/database/abstrct.entity";
import { Column, Entity } from "typeorm"; 

@Entity()
export class Listing extends AbstractEntity<Listing>{
   
  @Column()
  description: string;

  @Column()
  rating: number;
 
  
}