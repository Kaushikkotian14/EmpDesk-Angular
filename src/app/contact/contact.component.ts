import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  msg =''
  feedback() {
   this.msg = 'Thank you for your feedback! We will get back to you soon.';
  }
}
