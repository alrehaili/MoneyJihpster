import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ITransaction, NewTransaction } from '../transaction.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITransaction for edit and NewTransactionFormGroupInput for create.
 */
type TransactionFormGroupInput = ITransaction | PartialWithRequiredKeyOf<NewTransaction>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ITransaction | NewTransaction> = Omit<T, 'transactionDate'> & {
  transactionDate?: string | null;
};

type TransactionFormRawValue = FormValueOf<ITransaction>;

type NewTransactionFormRawValue = FormValueOf<NewTransaction>;

type TransactionFormDefaults = Pick<NewTransaction, 'id' | 'transactionDate'>;

type TransactionFormGroupContent = {
  id: FormControl<TransactionFormRawValue['id'] | NewTransaction['id']>;
  transactionIdent: FormControl<TransactionFormRawValue['transactionIdent']>;
  type: FormControl<TransactionFormRawValue['type']>;
  how: FormControl<TransactionFormRawValue['how']>;
  reason: FormControl<TransactionFormRawValue['reason']>;
  note: FormControl<TransactionFormRawValue['note']>;
  amount: FormControl<TransactionFormRawValue['amount']>;
  transactionDate: FormControl<TransactionFormRawValue['transactionDate']>;
  beneficiary: FormControl<TransactionFormRawValue['beneficiary']>;
};

export type TransactionFormGroup = FormGroup<TransactionFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TransactionFormService {
  createTransactionFormGroup(transaction: TransactionFormGroupInput = { id: null }): TransactionFormGroup {
    const transactionRawValue = this.convertTransactionToTransactionRawValue({
      ...this.getFormDefaults(),
      ...transaction,
    });
    return new FormGroup<TransactionFormGroupContent>({
      id: new FormControl(
        { value: transactionRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      transactionIdent: new FormControl(transactionRawValue.transactionIdent),
      type: new FormControl(transactionRawValue.type),
      how: new FormControl(transactionRawValue.how),
      reason: new FormControl(transactionRawValue.reason),
      note: new FormControl(transactionRawValue.note),
      amount: new FormControl(transactionRawValue.amount),
      transactionDate: new FormControl(transactionRawValue.transactionDate),
      beneficiary: new FormControl(transactionRawValue.beneficiary),
    });
  }

  getTransaction(form: TransactionFormGroup): ITransaction | NewTransaction {
    return this.convertTransactionRawValueToTransaction(form.getRawValue() as TransactionFormRawValue | NewTransactionFormRawValue);
  }

  resetForm(form: TransactionFormGroup, transaction: TransactionFormGroupInput): void {
    const transactionRawValue = this.convertTransactionToTransactionRawValue({ ...this.getFormDefaults(), ...transaction });
    form.reset(
      {
        ...transactionRawValue,
        id: { value: transactionRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): TransactionFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      transactionDate: currentTime,
    };
  }

  private convertTransactionRawValueToTransaction(
    rawTransaction: TransactionFormRawValue | NewTransactionFormRawValue
  ): ITransaction | NewTransaction {
    return {
      ...rawTransaction,
      transactionDate: dayjs(rawTransaction.transactionDate, DATE_TIME_FORMAT),
    };
  }

  private convertTransactionToTransactionRawValue(
    transaction: ITransaction | (Partial<NewTransaction> & TransactionFormDefaults)
  ): TransactionFormRawValue | PartialWithRequiredKeyOf<NewTransactionFormRawValue> {
    return {
      ...transaction,
      transactionDate: transaction.transactionDate ? transaction.transactionDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
