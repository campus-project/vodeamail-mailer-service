import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { SendEmailService } from '../../domain/services/send-email.service';
import { CreateSendEmailDto } from '../dtos/send-email/create-send-email.dto';
import { FindSendEmailDto } from '../dtos/send-email/find-send-email.dto';

@Controller()
export class SendEmailController {
  constructor(
    @Inject('SEND_EMAIL_SERVICE')
    private readonly sendEmailService: SendEmailService,
  ) {}

  @MessagePattern('createSendEmail')
  create(
    @Payload('value')
    createSendEmailDto: CreateSendEmailDto,
  ) {
    return this.sendEmailService.create(createSendEmailDto);
  }

  @MessagePattern('findAllSendEmail')
  findAll(@Payload('value') findSendEmail: FindSendEmailDto) {
    return this.sendEmailService.findAll(findSendEmail);
  }

  @MessagePattern('findOneSendEmail')
  findOne(@Payload('value') findSendEmail: FindSendEmailDto) {
    return this.sendEmailService.findOne(findSendEmail);
  }
}
