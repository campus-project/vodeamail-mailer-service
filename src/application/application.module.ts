import { Module } from '@nestjs/common';
import { SendEmailController } from './controllers/send-email.controller';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { DomainModule } from '../domain/domain.module';

@Module({
  imports: [InfrastructureModule, DomainModule],
  controllers: [SendEmailController],
  exports: [InfrastructureModule, DomainModule],
})
export class ApplicationModule {}
