import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {NgStyle} from "@angular/common";
import {Button} from "primeng/button";

@Component({
  selector: 'app-custom-scroll-panel',
  standalone: true,
  imports: [
    NgStyle,
    Button
  ],
  templateUrl: './custom-scroll-panel.component.html',
  styleUrl: './custom-scroll-panel.component.scss'
})
export class CustomScrollPanelComponent implements AfterViewInit {
  @ViewChild('scrollContainer', {static: true}) scrollContainer!: ElementRef;
  @Input() scrollWidth = '100%';  // Allows setting width via input property
  @Input() scrollHeight = '100%'; // Allows setting height via input property

  ngAfterViewInit() {
    setTimeout(() => {
      this.centerScroll();

    }, 500)
  }

  centerScroll() {
    const container = this.scrollContainer.nativeElement;

    // Center the content horizontally and vertically
    container.scrollLeft = (container.scrollWidth - container.clientWidth) / 2;
    container.scrollTop = 0;
  }
}
