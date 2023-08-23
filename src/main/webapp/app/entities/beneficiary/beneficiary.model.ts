export interface IBeneficiary {
  id: number;
  beneficiaryIdent?: string | null;
  name?: string | null;
  currentBalance?: number | null;
}

export type NewBeneficiary = Omit<IBeneficiary, 'id'> & { id: null };
