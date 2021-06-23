import { Test, TestingModule } from '@nestjs/testing';
import { SendEmailService } from '../services/send-email.service';
import { InfrastructureModule } from '../../infrastructure/infrastructure.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SendEmail } from '../entities/send-email.entity';

describe('SendEmailService', () => {
  let service: SendEmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [InfrastructureModule, TypeOrmModule.forFeature([SendEmail])],
      providers: [SendEmailService],
    }).compile();

    service = module.get<SendEmailService>(SendEmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
