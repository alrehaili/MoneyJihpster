import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { BeneficiaryService } from '../service/beneficiary.service';

import { BeneficiaryComponent } from './beneficiary.component';

describe('Beneficiary Management Component', () => {
  let comp: BeneficiaryComponent;
  let fixture: ComponentFixture<BeneficiaryComponent>;
  let service: BeneficiaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'beneficiary', component: BeneficiaryComponent }]),
        HttpClientTestingModule,
        BeneficiaryComponent,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              })
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(BeneficiaryComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(BeneficiaryComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(BeneficiaryService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.beneficiaries?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to beneficiaryService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getBeneficiaryIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getBeneficiaryIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
