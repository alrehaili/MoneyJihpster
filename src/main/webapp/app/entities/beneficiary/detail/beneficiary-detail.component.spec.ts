import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { BeneficiaryDetailComponent } from './beneficiary-detail.component';

describe('Beneficiary Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeneficiaryDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: BeneficiaryDetailComponent,
              resolve: { beneficiary: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding()
        ),
      ],
    })
      .overrideTemplate(BeneficiaryDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load beneficiary on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', BeneficiaryDetailComponent);

      // THEN
      expect(instance.beneficiary).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
