export interface FinancialReport {
  reportPeriod: string; // e.g., "Term 1 2026", "June 2026"
  totalInflow: number;
  totalOutflow: number;
  netProfit: number;
  breakdownByCategory: Record<string, number>;
}

export interface TransactionSummary {
  id: number;
  transactionType: 'INFLOW' | 'OUTFLOW';
  category: string;
  amount: number;
  transactionDate: string;
  paymentMethod: 'CASH' | 'BANK_TRANSFER' | 'CARD';
  referenceNumber?: string;
  description?: string;
}