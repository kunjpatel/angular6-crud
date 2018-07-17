import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ContactListComponent } from './contact-list.component';
import { ContactDetailComponent } from './contact-detail.component';
import { ContactCreateComponent } from './contact-create.component';
import { ContactDeleteComponent } from './contact-delete.component';
import { ContactEditComponent } from './contact-edit.component';

import { ContactService } from './contact.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
        { path: 'contacts', component: ContactListComponent },
        { path: 'contacts/create', component: ContactCreateComponent },
        { path: 'contacts/:id', component: ContactDetailComponent },  
        { path: 'contacts/edit/:id', component: ContactEditComponent },
        { path: 'contacts/delete/:id', component: ContactDeleteComponent }
    ])
  ],
  declarations: [
    ContactListComponent,
    ContactDetailComponent,
    ContactCreateComponent,
    ContactDeleteComponent,
    ContactEditComponent
  ],
  providers: [
    ContactService
  ]
})

export class ContactModule {

}
