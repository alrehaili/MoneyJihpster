import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { TransactionFormService } from './transaction-form.service';
import { TransactionService } from '../service/transaction.service';
import { ITransaction } from '../transaction.model';
import { IBeneficiary } from 'app/entities/beneficiary/beneficiary.model';
import { BeneficiaryService } from 'app/entities/beneficiary/service/beneficiary.service';

import { TransactionUpdateComponent } from './transaction-update.component';

describe('Transaction Management Update Component', () => {
  let comp: TransactionUpdateComponent;
  let fixture: ComponentFixture<TransactionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let transactionFormService: TransactionFormService;
  let transactionService: TransactionService;
  let beneficiaryService: BeneficiaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), TransactionUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(TransactionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TransactionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    transactionFormService = TestBed.inject(TransactionFormService);
    transactionService = TestBed.inject(TransactionService);
    beneficiaryService = TestBed.inject(BeneficiaryService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Beneficiary query and add missing value', () => {
      const transaction: ITransaction = { id: 456 };
      const beneficiary: IBeneficiary = { id: 16849 };
      transaction.beneficiary = beneficiary;

      const beneficiaryCollection: IBeneficiary[] = [{ id: 23732 }];
      jest.spyOn(beneficiaryService, 'query').mockReturnValue(of(new HttpResponse({ body: beneficiaryCollection })));
      const additionalBeneficiaries = [beneficiary];
      const expectedCollection: IBeneficiary[] = [...additionalBeneficiaries, ...beneficiaryCollection];
      jest.spyOn(beneficiaryService, 'addBeneficiaryToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ transaction });
      comp.ngOnInit();

      expect(beneficiaryService.query).toHaveBeenCalled();
      expect(beneficiaryService.addBeneficiaryToCollectionIfMissing).toHaveBeenCalledWith(
        beneficiaryCollection,
        ...additionalBeneficiaries.map(expect.objectContaining)
      );
      expect(comp.beneficiariesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const transaction: ITransaction = { id: 456 };
      const beneficiary: IBeneficiary = { id: 23808 };
      transaction.beneficiary = beneficiary;

      activatedRoute.data = of({ transaction });
      comp.ngOnInit();

      expect(comp.beneficiariesSharedCollection).toContain(beneficiary);
      expect(comp.transaction).toEqual(transaction);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITransaction>>();
      const transaction = { id: 123 };
      jest.spyOn(transactionFormService, 'getTransaction').mockReturnValue(transaction);
      jest.spyOn(transactionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ transaction });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: transaction }));
      saveSubject.complete();

      // THEN
      expect(transactionFormService.getTransaction).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(transactionService.update).toHaveBeenCalledWith(expect.objectContaining(transaction));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITransaction>>();
      const transaction = { id: 123 };
      jest.spyOn(transactionFormService, 'getTransaction').mockReturnValue({ id: null });
      jest.spyOn(transactionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ transaction: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: transaction }));
      saveSubject.complete();

      // THEN
      expect(transactionFormService.getTransaction).toHaveBeenCalled();
      expect(transactionService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITransaction>>();
      const transaction = { id: 123 };
      jest.spyOn(transactionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ transaction });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(transactionService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareBeneficiary', () => {
      it('Should forward to beneficiaryService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(beneficiaryService, 'compareBeneficiary');
        comp.compareBeneficiary(entity, entity2);
        expect(beneficiaryService.compareBeneficiary).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
