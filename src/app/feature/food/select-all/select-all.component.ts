import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: 'app-select-all',
  template: `
    <div class="d-flex">
      <button
        mat-flat-button
        *ngIf="anySelected"
        class="bg-danger mx-2"
        style="min-width: 100px"
        (click)="deleteClicked()"
      >
        <i class="fas fa-2x fa-trash-alt"></i>
      </button>

      <mat-selection-list
        (selectionChange)="selectionChanged()"
        id="select-all-foods"
        style="min-width: 64px; padding-top: 0px"
      >
        <mat-list-option
          color="warn"
          style="max-width: 64px; height: 51px"
          [selected]="allSelected"
        >
        </mat-list-option>
      </mat-selection-list>
    </div>
  `
})
export class SelectAllComponent {

  @Output() delete: EventEmitter<void> = new EventEmitter<void>();
  @Output() selectAll: EventEmitter<void> = new EventEmitter<void>();

  @Input() allSelected = false;
  @Input() anySelected = false;

  deleteClicked(): void {
    this.delete.emit();
  }

  selectionChanged(): void {
    this.selectAll.emit();
  }
}
