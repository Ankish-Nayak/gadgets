import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  getToKnowUs: string[] = [
    'About Us',
    'Careers',
    'Press Releases',
    'Amazon Science',
  ];
  connectWithUs: string[] = ['Facebook', 'Twitter', 'Instagram'];
  makeMoneyWithUs: string[] = [
    'Sell on Amazon',
    'Sell under Amazon Accelerator',
    'Protect and Build Your Brand',
    'Amazon Global Selling',
    'Become an Affiliate',
    'Fulfilment by Amazon',
    'Advertise Your Products',
    'Amazon Pay on Merchants',
  ];
  backToTop() {
    // scroll to the top.
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}
