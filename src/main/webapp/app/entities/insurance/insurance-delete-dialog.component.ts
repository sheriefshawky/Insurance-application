import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IInsurance } from 'app/shared/model/insurance.model';
import { InsuranceService } from './insurance.service';

@Component({
  templateUrl: './insurance-delete-dialog.component.html'
})
export class InsuranceDeleteDialogComponent {
  insurance?: IInsurance;

  constructor(protected insuranceService: InsuranceService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.insuranceService.delete(id).subscribe(() => {
      this.eventManager.broadcast('insuranceListModification');
      this.activeModal.close();
    });
  }
}
