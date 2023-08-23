import { IBeneficiary } from 'app/entities/beneficiary/beneficiary.model';

export interface ITransaction {
  id: number;
  transactionIdent?: string | null;
  type?: string | null;
  how?: string | null;
  reason?: string | null;
  note?: string | null;
  amount?: number | null;
  beneficiary?: Pick<IBeneficiary, 'id'> | null;
}

export type NewTransaction = Omit<ITransaction, 'id'> & { id: null };
