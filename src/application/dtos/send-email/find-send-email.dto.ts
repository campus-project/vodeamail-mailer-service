import { IsOptional, IsUUID } from 'class-validator';

export class FindSendEmailDto {
  @IsOptional()
  @IsUUID('4')
  id?: string;

  @IsOptional()
  @IsUUID('4', { each: true })
  ids?: string[];
}
