import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
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
}
