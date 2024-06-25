import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  constructor() { }

  getDomain(): string {
    return window.location.hostname;
  }
}
