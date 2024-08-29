import { Test, TestingModule } from '@nestjs/testing';
import { InternalServerErrorException } from '@nestjs/common';
import { PaymentsService } from './payments.service';

describe('PaymentService', () => {
  let paymentService: PaymentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentsService],
    }).compile();

    paymentService = module.get<PaymentsService>(PaymentsService);
  });

  it('should be defined', () => {
    expect(paymentService).toBeDefined();
  });

  it('should process payment successfully', async () => {
    const paymentChannel = 'CreditCard';
    const amount = 300;

    const result = await paymentService.processPayment(amount, paymentChannel);

    expect(result).toBeDefined();
    expect(result.paymentChannel).toBe(paymentChannel);
    expect(result.amount).toBe(amount);
    expect(result.status).toBe('Completed');
    expect(result.paymentReferenceId).toMatch(/^PAY-\d{6}$/); // Check if the reference ID follows the pattern
  });

  it('should handle payment processing error', async () => {
    // Mock an error scenario in the payment processing method
    jest.spyOn(paymentService, 'processPayment').mockRejectedValueOnce(new Error('Payment failed'));

    const paymentChannel = 'CreditCard';
    const amount = 300;

    await expect(paymentService.processPayment(amount, paymentChannel)).rejects.toThrow(
      InternalServerErrorException,
    );
  });

  it('should generate a unique payment reference ID', () => {
    const referenceId = (paymentService as any).generatePaymentReferenceId(); // Access private method

    expect(referenceId).toBeDefined();
    expect(referenceId).toMatch(/^PAY-\d{6}$/); // Check if the reference ID follows the pattern
  });
});
