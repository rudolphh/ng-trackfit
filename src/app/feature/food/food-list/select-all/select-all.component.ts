import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select-all',
  template: `
    <div class="d-flex" style="height: 51px">
      <button
        mat-flat-button
        *ngIf="anySelected"
        class="bg-danger mx-2"
        style="min-width: 90px"
        (click)="deleteClicked()"
      >
        <i class="fas fa-2x fa-trash-alt"></i>
      </button>

      <mat-selection-list

        (selectionChange)="selectionChanged()"
        id="select-all-foods"
        style="min-width: 30px; padding-top: 0px"
      >
        <mat-list-option
          *ngIf="listLength > 1"
          color="warn"
          [selected]="allSelected"
        >
        </mat-list-option>
      </mat-selection-list>
    </div>
  `
})
export class SelectAllComponent {

  @Input() listLength = 0;
  @Input() allSelected = false;
  @Input() anySelected = false;

  @Output() delete: EventEmitter<void> = new EventEmitter<void>();
  @Output() selectAll: EventEmitter<void> = new EventEmitter<void>();

  deleteClicked(): void {
    this.delete.emit();
  }

  selectionChanged(): void {
    this.selectAll.emit();
  }
}
