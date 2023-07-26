import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFullScreen]'
})
export class FullScreenDirective implements OnInit {

  constructor(private renderer: Renderer2, private element: ElementRef) { }

  ngOnInit(): void {
    this.renderer.addClass(this.element.nativeElement, "full-screen");
    const div = this.renderer.createElement('div');
    this.renderer.addClass(div, 'col-span-full');
    const button = this.renderer.createElement('button');
    const img = this.renderer.createElement('img'); // create image element
    this.renderer.setAttribute(img, 'height', '17');
    this.renderer.setAttribute(img, 'src', 'assets/images/full-screen_img.png'); // set image source
    this.renderer.addClass(button, 'float-right');
    button.addEventListener('click', () => {
      this.fullscreen();
    });
    this.renderer.appendChild(button, img); // append image to button
    this.renderer.appendChild(div, button);
    this.renderer.insertBefore(this.element.nativeElement.parentNode, div, this.element.nativeElement);   
    this.renderer.setAttribute(button, 'id', 'fullscreen-button');

  }
  fullscreen(): void {
    if (this.element.nativeElement.requestFullscreen) {
      this.element.nativeElement.requestFullscreen();
    } else if (this.element.nativeElement.webkitRequestFullscreen) {
      this.element.nativeElement.webkitRequestFullscreen();
    } else if ((this.element.nativeElement as any).mozRequestFullScreen) {
      (this.element.nativeElement as any).mozRequestFullScreen();
    }
  }

}
