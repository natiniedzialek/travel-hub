import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Filter } from '../models/filter';

@Injectable({
  providedIn: 'root',
})

export class FilterService {
  private filter = new Filter();
  private filterSubject = new BehaviorSubject<Filter>(this.filter);
  public filter$ = this.filterSubject.asObservable();

  applyFilters(filter: Filter) {
    this.filterSubject.next(filter);
  }
}
