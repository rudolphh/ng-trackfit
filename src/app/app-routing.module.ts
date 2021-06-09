import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StorageService } from './services/storage.service';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [StorageService]
})
export class AppRoutingModule { }
