import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Column } from 'typeorm';

export class CreateSendEmailDto {
  @IsNotEmpty()
  @IsUUID('4')
  organization_id: string;

  @IsNotEmpty()
  @IsEmail()
  from: string;

  @IsOptional()
  @IsString()
  from_name?: string;

  @IsNotEmpty()
  @IsEmail()
  to: string;

  @IsOptional()
  @IsString()
  to_name?: string;

  @IsNotEmpty()
  @IsString()
  subject: string;

  @IsNotEmpty()
  @IsString()
  html: string;

  @Column({ type: 'tinyint', default: 0 })
  is_failed?: boolean;

  @Column({ type: 'text', nullable: true })
  failed_message?: string;
}
