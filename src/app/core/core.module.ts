import { CommonModule } from '@angular/common';
import { EnvServiceProvider } from './services/env.service.provider';
import { NavComponent } from './components/nav/nav.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule,
    CommonModule
  ],
  providers: [
    EnvServiceProvider
  ],
  declarations: [
    NavComponent
  ],
  exports: [
    NavComponent
  ],
})
export class CoreModule {}
