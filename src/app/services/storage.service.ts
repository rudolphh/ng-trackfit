import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class StorageService {

  private storageSub= new Subject<String>();


  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }

  setItem(key: string, data: any) {
    localStorage.setItem(key, data);
    this.storageSub.next('changed');
  }

  removeItem(key : string) {
    localStorage.removeItem(key);
    this.storageSub.next('changed');
  }
}
