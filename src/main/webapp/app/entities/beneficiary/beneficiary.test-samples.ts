import { IBeneficiary, NewBeneficiary } from './beneficiary.model';

export const sampleWithRequiredData: IBeneficiary = {
  id: 28635,
};

export const sampleWithPartialData: IBeneficiary = {
  id: 10421,
  name: 'West Northeast International',
};

export const sampleWithFullData: IBeneficiary = {
  id: 26083,
  beneficiaryIdent: 'a8d07eb5-8dd1-4f1d-8f23-79be85c52be2',
  name: 'generating Wisconsin',
  currentBalance: 5773,
};

export const sampleWithNewData: NewBeneficiary = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
