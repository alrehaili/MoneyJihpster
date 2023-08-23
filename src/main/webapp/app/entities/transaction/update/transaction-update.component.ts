import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TransactionFormService, TransactionFormGroup } from './transaction-form.service';
import { ITransaction } from '../transaction.model';
import { TransactionService } from '../service/transaction.service';
import { IBeneficiary } from 'app/entities/beneficiary/beneficiary.model';
import { BeneficiaryService } from 'app/entities/beneficiary/service/beneficiary.service';

@Component({
  standalone: true,
  selector: 'jhi-transaction-update',
  templateUrl: './transaction-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class TransactionUpdateComponent implements OnInit {
  isSaving = false;
  transaction: ITransaction | null = null;

  beneficiariesSharedCollection: IBeneficiary[] = [];

  editForm: TransactionFormGroup = this.transactionFormService.createTransactionFormGroup();

  constructor(
    protected transactionService: TransactionService,
    protected transactionFormService: TransactionFormService,
    protected beneficiaryService: BeneficiaryService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareBeneficiary = (o1: IBeneficiary | null, o2: IBeneficiary | null): boolean => this.beneficiaryService.compareBeneficiary(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ transaction }) => {
      this.transaction = transaction;
      if (transaction) {
        this.updateForm(transaction);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const transaction = this.transactionFormService.getTransaction(this.editForm);
    if (transaction.id !== null) {
      this.subscribeToSaveResponse(this.transactionService.update(transaction));
    } else {
      this.subscribeToSaveResponse(this.transactionService.create(transaction));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITransaction>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(transaction: ITransaction): void {
    this.transaction = transaction;
    this.transactionFormService.resetForm(this.editForm, transaction);

    this.beneficiariesSharedCollection = this.beneficiaryService.addBeneficiaryToCollectionIfMissing<IBeneficiary>(
      this.beneficiariesSharedCollection,
      transaction.beneficiary
    );
  }

  protected loadRelationshipsOptions(): void {
    this.beneficiaryService
      .query()
      .pipe(map((res: HttpResponse<IBeneficiary[]>) => res.body ?? []))
      .pipe(
        map((beneficiaries: IBeneficiary[]) =>
          this.beneficiaryService.addBeneficiaryToCollectionIfMissing<IBeneficiary>(beneficiaries, this.transaction?.beneficiary)
        )
      )
      .subscribe((beneficiaries: IBeneficiary[]) => (this.beneficiariesSharedCollection = beneficiaries));
  }
}
