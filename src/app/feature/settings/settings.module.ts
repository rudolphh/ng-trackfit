import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SettingsComponent } from './settings.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    SharedModule
  ],
  providers: [],
  exports: [SettingsComponent]
})
export class SettingsModule { }
