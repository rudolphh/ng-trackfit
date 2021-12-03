import { CommonModule } from '@angular/common';
import { EnvServiceProvider } from './services/env.service.provider';
import { NavComponent } from './components/nav/nav.component';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { errorInterceptorProviders } from './_helpers/error.interceptor';

@NgModule({
  declarations: [
    NavComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    EnvServiceProvider,
    authInterceptorProviders,
    errorInterceptorProviders
  ],
  exports: [
    NavComponent
  ],
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule has already been loaded. You should only import Core modules in the AppModule only.');
    }
  }
}
