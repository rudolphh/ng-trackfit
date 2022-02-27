import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { VitalsComponent } from './vitals.component';


@NgModule({
  declarations: [
    VitalsComponent
  ],
  imports: [
    SharedModule,
  ],
  exports: [VitalsComponent]
})
export class VitalsModule {}
