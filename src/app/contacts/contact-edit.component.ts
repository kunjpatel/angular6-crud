import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IContact } from './contact.model';

@Component({
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private _router: Router) {

  }

  contacts: IContact[] = [];
  model: any = {};

  ngOnInit() {
    const param = this._route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getContact(id);  
    }
  }

  getContact(id: number) {
    this.contacts = JSON.parse(localStorage.getItem('contacts'));
    this.model = this.contacts.find(p => p.contactId === id);
  }

  onSubmit() {
    // set updated contacts list in localStorage
    localStorage.setItem('contacts', JSON.stringify(this.contacts));

    // redirected to contacts list
    this._router.navigate(['/contacts']);
  }
}
