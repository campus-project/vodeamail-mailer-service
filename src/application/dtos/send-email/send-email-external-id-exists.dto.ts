import { IsNotEmpty, IsUUID } from 'class-validator';

export class SendEmailExternalIdExistsDto {
  @IsNotEmpty()
  @IsUUID('4')
  external_id: string;

  @IsNotEmpty()
  @IsUUID('4')
  organization_id: string;
}
