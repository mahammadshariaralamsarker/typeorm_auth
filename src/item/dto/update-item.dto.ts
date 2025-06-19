import { IsOptional, IsString, IsBoolean, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

class UpdateListingDto {
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  rating?: number;
}

class UpdateCommentDto {
  @IsOptional()
  @IsString()
  content?: string;
}

export class UpdateItemDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsBoolean()
  public?: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateListingDto)
  listing?: UpdateListingDto;

  @IsOptional()
  comment?: { content: string }[]; 
}
