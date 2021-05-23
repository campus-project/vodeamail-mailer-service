import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { SendEmailService } from './services/send-email.service';
import { SendEmail } from './entities/send-email.entity';

const providers: Provider[] = [
  {
    provide: 'SEND_EMAIL_SERVICE',
    useClass: SendEmailService,
  },
];

@Module({
  imports: [InfrastructureModule, TypeOrmModule.forFeature([SendEmail])],
  providers: [...providers],
  exports: [...providers],
})
export class DomainModule {}
