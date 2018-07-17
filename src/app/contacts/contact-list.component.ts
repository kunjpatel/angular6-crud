import { Component, OnInit } from '@angular/core';

import { IContact } from './contact.model';
import { ContactService } from './contact.service';

@Component({
    templateUrl: './contact-list.component.html',
    styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
    pageTitle: string = 'Contact details';
    errorMessage: string;
    _listFilter: string;

    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredContacts = this.listFilter ? this.performFilter(this.listFilter) : this.contacts;
    }

    filteredContacts: IContact[];
    contacts: IContact[] = [];

    constructor(private _contactService: ContactService) {
        window.onbeforeunload = function() {
            localStorage.removeItem('contacts');
            return ''; 
        };
    }

    performFilter(filterBy: string): IContact[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.contacts.filter((contact: IContact) =>
                (contact.firstName.toLocaleLowerCase().indexOf(filterBy) !== -1) || 
                (contact.lastName.toLocaleLowerCase().indexOf(filterBy) !== -1) ||
                (contact.email.toLocaleLowerCase().indexOf(filterBy) !== -1) ||
                (contact.phoneNumber.toString().indexOf(filterBy) !== -1) ||
                (contact.status.toLocaleLowerCase().indexOf(filterBy) !== -1) 
            );
    }

    ngOnInit(): void {
        
        this.contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        this.filteredContacts = this.contacts;
        if(this.contacts.length == 0){
            this._contactService.getContacts()
                .subscribe(contacts => {
                    this.contacts = contacts;
                    this.filteredContacts = this.contacts;
                    localStorage.setItem('contacts', JSON.stringify(this.contacts));
                },
                    error => this.errorMessage = <any>error
                );
        }
        
    }
}
