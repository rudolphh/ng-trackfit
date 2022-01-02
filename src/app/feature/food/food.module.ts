import { FoodInputComponent } from './food-input/food-input.component';
import { FoodService } from './food.service';
import { MacroInputComponent } from './shared/macro-input/macro-input.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    FoodInputComponent,
    MacroInputComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
  ],
  providers: [FoodService],
  exports: [
    FoodInputComponent, MacroInputComponent
  ]
})
export class FoodModule {}
