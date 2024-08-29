import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Module({
  providers: [PaymentsService],
  exports: [PaymentsService], // Export the PaymentService to make it available for other modules
})
export class PaymentsModule {}
