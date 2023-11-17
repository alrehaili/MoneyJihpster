import dayjs from 'dayjs/esm';

import { ITransaction, NewTransaction } from './transaction.model';

export const sampleWithRequiredData: ITransaction = {
  id: 12618,
};

export const sampleWithPartialData: ITransaction = {
  id: 11397,
  transactionIdent: 'c16cae26-43f1-4a98-8b86-a6ff44385921',
  reason: 'Buckinghamshire budgetary',
  amount: 30190,
  transactionDate: dayjs('2023-08-20T23:54'),
};

export const sampleWithFullData: ITransaction = {
  id: 18161,
  transactionIdent: '8d39e342-9ddf-4946-b54b-7753b329adaa',
  type: 'vero',
  how: 'bypass Shoes Avon',
  reason: 'Cab',
  note: 'Van',
  amount: 668,
  transactionDate: dayjs('2023-08-21T03:12'),
};

export const sampleWithNewData: NewTransaction = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
