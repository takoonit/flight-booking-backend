// Extracted constants for better reusability
export type PaymentChannels = 'CreditCard' | 'PayPal' | 'BankTransfer';
export type PaymentStatus = 'Pending' | 'Completed' | 'Failed';

export interface PaymentInfo {
  paymentChannel: PaymentChannels; // Payment channels
  paymentReferenceId: string; // A reference ID for the payment, like a transaction ID
  status: PaymentStatus;  // Payment status
  amount: number; // The amount to be paid
}