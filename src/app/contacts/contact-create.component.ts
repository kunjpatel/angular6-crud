import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IContact } from './contact.model';

@Component({
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.css']
})

export class ContactCreateComponent {

  constructor(private _router: Router) { 
    window.onbeforeunload = function() {
      localStorage.removeItem('contacts');
      return '';
    };
  }

  contacts: IContact[] = [];
  model: any = {};

  onSubmit() {

    // get contacts list from localStorage
    this.contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    // generate dynamic contactId
    this.model.contactId = this.contacts.length == 0 ? 6 : this.contacts.length + 5;
    // create new contact
    this.contacts.push(this.model);
    // set updated contacts list in localStorage
    localStorage.setItem('contacts', JSON.stringify(this.contacts));

    // redirected to contacts list
    this._router.navigate(['/contacts']);
  }

}
