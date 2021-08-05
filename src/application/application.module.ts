import { Module } from '@nestjs/common';

import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { DomainModule } from '../domain/domain.module';
import { SendEmailController } from './controllers/send-email.controller';

@Module({
  imports: [InfrastructureModule, DomainModule],
  controllers: [SendEmailController],
  providers: [],
  exports: [InfrastructureModule, DomainModule],
})
export class ApplicationModule {}
