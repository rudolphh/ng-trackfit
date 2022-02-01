import {DragDropModule} from '@angular/cdk/drag-drop';
import { FoodBFDListComponent } from './food-bfd-list/food-bfd-list.component';
import { FoodListComponent } from './food-list.component';
import { FoodModule } from '../food.module';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { SelectAllComponent } from './select-all/select-all.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    SelectAllComponent,
    FoodListComponent,
    FoodBFDListComponent
  ],
  imports: [
    SharedModule,
    DragDropModule,
    FoodModule,
    MatButtonModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule
  ],
  providers: [],
  exports: [FoodListComponent],
})
export class FoodListModule {}
