import { ITransaction, NewTransaction } from './transaction.model';

export const sampleWithRequiredData: ITransaction = {
  id: 7779,
};

export const sampleWithPartialData: ITransaction = {
  id: 14834,
  transactionIdent: '6919dde5-f18d-4b99-8629-c0a765c16cae',
  how: 'enhance broadside',
  reason: 'Soul male payment',
  note: 'vice empower',
};

export const sampleWithFullData: ITransaction = {
  id: 7687,
  transactionIdent: '85921350-b524-4ec8-98d3-9e3429ddf946',
  type: 'Xenon',
  how: 'cohesive female',
  reason: 'similique',
  note: 'Investor Cab trustworthy',
  amount: 17488,
};

export const sampleWithNewData: NewTransaction = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
