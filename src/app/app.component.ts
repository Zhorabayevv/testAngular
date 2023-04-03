import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('element') elementRef: ElementRef;

  showContextMenu = false;
  contextMenuPosition: { top: number; left: number };
  selectedItem: string;

  onRightClick(event: MouseEvent): void {
    event.preventDefault();
    this.showContextMenu = true;
    this.contextMenuPosition = { top: event.clientY, left: event.clientX };
  }

  onMenuItemClick(value: string): void {
    const el = this.elementRef.nativeElement;
    el.focus();
    const selection = window.getSelection();
    if (!selection) return;

    const range = selection.getRangeAt(0);
    const node = document.createElement('span');
    node.innerHTML = value;
    range.insertNode(node);

    el.textContent = el.innerHTML;

    selection.removeAllRanges();
    selection.addRange(range);
  }

  insertHtmlAtCursor(html: string): void {
    const el = this.elementRef.nativeElement;
    const selection = window.getSelection();
    if (selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const node = range.createContextualFragment(html);

    range.deleteContents();
    range.insertNode(node);
    selection.removeAllRanges();
    selection.addRange(range);
  }
  constructor() {}

  ngOnInit(): void {
  }
}
