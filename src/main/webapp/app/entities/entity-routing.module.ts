import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'beneficiary',
        data: { pageTitle: 'moneyApp.beneficiary.home.title' },
        loadChildren: () => import('./beneficiary/beneficiary.routes'),
      },
      {
        path: 'transaction',
        data: { pageTitle: 'moneyApp.transaction.home.title' },
        loadChildren: () => import('./transaction/transaction.routes'),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
