import { Module } from '@nestjs/common';
import { PaymentService } from './payments.service';

@Module({
  providers: [PaymentService],
  exports: [PaymentService], // Export the PaymentService to make it available for other modules
})
export class PaymentsModule {}
