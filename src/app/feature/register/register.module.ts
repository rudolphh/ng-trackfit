import { NgModule } from '@angular/core';
import { RegisterComponent } from './register.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    SharedModule
  ],

})
export class RegisterModule { }
