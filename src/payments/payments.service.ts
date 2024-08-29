import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PaymentChannels, PaymentInfo, PaymentStatus } from './interfaces/payment.interface';
import { v4 as uuidv4 } from 'uuid'; // Importing UUID package

@Injectable()
export class PaymentService {
  async processPayment(amount: number, paymentChannel: PaymentChannels): Promise<PaymentInfo> {
    try {
      const paymentReferenceId = this.createPaymentReferenceId(); // Generate a more robust unique payment reference ID
      const paymentStatus: PaymentStatus = 'Completed'; // Mock payment status

      return {
        paymentChannel,
        paymentReferenceId,
        status: paymentStatus,
        amount,
      }; // Return the payment info without storing sensitive data
    } catch (error) {
      console.error('Error processing payment:', error);
      throw new InternalServerErrorException('Payment processing failed');
    }
  }

  private createPaymentReferenceId(): string {
    return `PAY-${uuidv4()}`; // Using UUID for generating unique payment reference ID
  }
}