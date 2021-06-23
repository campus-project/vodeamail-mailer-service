import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { SendEmailService } from '../../domain/services/send-email.service';
import { CreateSendEmailDto } from '../dtos/send-email/create-send-email.dto';
import { FindSendEmailDto } from '../dtos/send-email/find-send-email.dto';

import { SendEmail } from '../../domain/entities/send-email.entity';

@Controller()
export class SendEmailController {
  constructor(
    @Inject('SEND_EMAIL_SERVICE')
    private readonly sendEmailService: SendEmailService,
  ) {}

  @MessagePattern('createSendEmail')
  async create(
    @Payload()
    createSendEmailDto: CreateSendEmailDto,
  ): Promise<SendEmail> {
    return await this.sendEmailService.create(createSendEmailDto);
  }

  @MessagePattern('findAllSendEmail')
  async findAll(
    @Payload() findSendEmail: FindSendEmailDto,
  ): Promise<SendEmail[]> {
    return await this.sendEmailService.findAll(findSendEmail);
  }

  @MessagePattern('findOneSendEmail')
  async findOne(
    @Payload() findSendEmail: FindSendEmailDto,
  ): Promise<SendEmail> {
    return await this.sendEmailService.findOne(findSendEmail);
  }
}
