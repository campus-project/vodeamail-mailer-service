import { Injectable } from '@nestjs/common';
import { Brackets, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import * as _ from 'lodash';

import { SendEmail } from '../entities/send-email.entity';
import { CreateSendEmailDto } from '../../application/dtos/send-email/create-send-email.dto';
import { FindSendEmailDto } from '../../application/dtos/send-email/find-send-email.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class SendEmailService {
  constructor(
    private readonly mailer: MailerService,
    @InjectRepository(SendEmail)
    private readonly sendEmailRepository: Repository<SendEmail>,
  ) {}

  async create(createSendEmailDto: CreateSendEmailDto): Promise<SendEmail> {
    const { organization_id, from, from_name, to, to_name, subject, html } =
      createSendEmailDto;

    const data = await this.sendEmailRepository.save({
      organization_id,
      from,
      from_name,
      to,
      to_name,
      subject,
      html,
    });

    await this.mailer
      .sendMail({
        from: from_name ? `${from_name} <${from}>` : from,
        to: to ? `${to_name} <${to}>` : to,
        subject: subject,
        html: html,
        headers: {},
      })
      .catch(async (e) => {
        console.log(e);
        await this.sendEmailRepository.save({
          ...data,
          is_failed: true,
        });
      });

    return await this.findOne({ id: data.id });
  }

  async findAll(findAllSendEmailDto: FindSendEmailDto): Promise<SendEmail[]> {
    const { id, ids } = findAllSendEmailDto;
    const qb = this.sendEmailRepository
      .createQueryBuilder('send_emails')
      .select('send_emails.*')
      .where(
        new Brackets((q) => {
          if (id !== undefined) {
            q.where('send_emails.id = :id', { id });
          }

          if (Array.isArray(ids) && ids.length) {
            q.andWhere('send_emails.id IN (:...ids)', { ids });
          }
        }),
      );

    return await qb.execute();
  }

  async findOne(findOneSendEmailDto: FindSendEmailDto): Promise<SendEmail> {
    const data = await this.findAll(findOneSendEmailDto);
    return _.head(data);
  }
}
