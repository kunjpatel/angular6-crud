import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IContact } from './contact.model';
import { ContactService } from './contact.service';

@Component({
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css'] 
})
export class ContactDetailComponent implements OnInit {
  pageTitle: string = 'Contact Detail';
  errorMessage: string;
  contact: IContact; 

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _contactService: ContactService) {
  }

  ngOnInit() {
    const param = this._route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getContact(id);
    }
  }

  getContact(id: number) {
    this._contactService.getContact(id).subscribe(
      contact => this.contact = contact,
      error => this.errorMessage = <any>error);
  }

  onBack(): void {
    this._router.navigate(['/contacts']);
  }

}
