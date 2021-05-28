import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Inject, Injectable } from '@nestjs/common';
import { SendEmailService } from '../../domain/services/send-email.service';

@ValidatorConstraint({ name: 'SendEmailExternalUniqueRule', async: true })
@Injectable()
export class SendEmailExternalUniqueRule
  implements ValidatorConstraintInterface
{
  constructor(
    @Inject('SEND_EMAIL_SERVICE')
    private sendEmailService: SendEmailService,
  ) {}

  async validate(value: string, args: ValidationArguments) {
    if (value === undefined) {
      return true;
    }

    return !(await this.sendEmailService.externalIdExists({
      external_id: value,
      organization_id: (args.object as any)['organization_id'],
    }));
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} is invalid.`;
  }
}
