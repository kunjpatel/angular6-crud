import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IContact } from './contact.model';

@Component({
  selector: '',
  templateUrl: './contact-delete.component.html',
  styleUrls: ['./contact-delete.component.css']
})
export class ContactDeleteComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private _router: Router) {
  }
 
  contacts: IContact[] = [];

  ngOnInit() {
    const param = this._route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.deleteContact(id);  
    }
  }

  deleteContact(id: number) {
    this.contacts = JSON.parse(localStorage.getItem('contacts'));
    let index = this.contacts.findIndex(function(o){
          return o.contactId === id;
    });
    if (index !== -1) this.contacts.splice(index, 1);

    localStorage.setItem('contacts', JSON.stringify(this.contacts));
    this._router.navigate(['/contacts']);
  }

}
