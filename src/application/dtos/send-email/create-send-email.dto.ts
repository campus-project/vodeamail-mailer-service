import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Validate,
} from 'class-validator';
import { SendEmailExternalUniqueRule } from '../../rules/send-email-external-unique.rule';

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

  @IsOptional()
  @IsUUID()
  @IsString()
  @Validate(SendEmailExternalUniqueRule)
  external_id?: string;
}
