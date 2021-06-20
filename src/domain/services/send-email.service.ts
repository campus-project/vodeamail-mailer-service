import { Injectable } from '@nestjs/common';
import { In, LessThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron } from '@nestjs/schedule';

import * as _ from 'lodash';

import { SendEmail } from '../entities/send-email.entity';
import { CreateSendEmailDto } from '../../application/dtos/send-email/create-send-email.dto';
import { FindSendEmailDto } from '../../application/dtos/send-email/find-send-email.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { SendEmailExternalIdExistsDto } from '../../application/dtos/send-email/send-email-external-id-exists.dto';

@Injectable()
export class SendEmailService {
  constructor(
    private readonly mailer: MailerService,
    @InjectRepository(SendEmail)
    private readonly sendEmailRepository: Repository<SendEmail>,
  ) {}

  async create(createSendEmailDto: CreateSendEmailDto): Promise<SendEmail> {
    const {
      organization_id,
      from,
      from_name,
      to,
      to_name,
      subject,
      html,
      external_id,
    } = createSendEmailDto;

    const data = await this.sendEmailRepository.save({
      organization_id,
      from,
      from_name,
      to,
      to_name,
      subject,
      html,
      external_id,
    });

    return await this.findOne({
      id: data.id,
      organization_id: data.organization_id,
    });
  }

  async findAll(findAllSendEmailDto: FindSendEmailDto): Promise<SendEmail[]> {
    const { id, ids, organization_id } = findAllSendEmailDto;

    const filteredIds = ids === undefined ? [] : ids;
    if (id !== undefined) {
      filteredIds.push(id);
    }

    return await this.sendEmailRepository.find({
      where: {
        organization_id: organization_id,
        ...(id || ids ? { id: In(filteredIds) } : {}),
      },
    });
  }

  async findOne(findOneSendEmailDto: FindSendEmailDto): Promise<SendEmail> {
    const data = await this.findAll(findOneSendEmailDto);
    return _.head(data);
  }

  @Cron('*/3 * * * * *')
  async sendEmail() {
    const pendingSendEmails = await this.sendEmailRepository.find({
      where: {
        is_delivered: 0,
        retry: LessThan(3),
      },
    });

    for (const data of pendingSendEmails) {
      await this.mailer
        .sendMail({
          from: data.from_name ? `${data.from_name} <${data.from}>` : data.from,
          to: data.to ? `${data.to_name} <${data.to}>` : data.to,
          subject: data.subject,
          html: data.html,
          headers: {},
        })
        .then(async () => {
          await this.sendEmailRepository.save({
            ...data,
            is_delivered: true,
          });
        })
        .catch(async () => {
          await this.sendEmailRepository.save({
            ...data,
            retry: data.retry++,
          });
        });
    }
  }

  async externalIdExists(
    sendEmailExternalIdExistsDto: SendEmailExternalIdExistsDto,
  ): Promise<boolean> {
    const { external_id, organization_id } = sendEmailExternalIdExistsDto;
    return (
      (await this.sendEmailRepository.count({
        where: { external_id, organization_id },
      })) > 0
    );
  }
}
