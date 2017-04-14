import { Output, EventEmitter, ElementRef, ChangeDetectorRef, HostListener } from '@angular/core';

import { ToggleEvent } from './models';

export abstract class EditableComponent {

  @Output() public toggled = new EventEmitter<ToggleEvent>();

  public get isActive() {
    return this._isActive;
  }

  public set isActive(v: boolean) {
    this._isActive = v;
    this._cdRef.markForCheck();

    this._handleStateChange();

    this.toggled.emit(this._createToggleEvent());
  }

  private _isActive = false;

  protected abstract _createToggleEvent: () => ToggleEvent;

  protected abstract _handleStateChange: () => void;

  constructor (
    private _cdRef: ChangeDetectorRef,
    private _elem: ElementRef
  ) { }

  @HostListener('click') public onClick() {
    if (!this.isActive) {
      this.isActive = true;
    }
  }

  @HostListener('document:click', ['$event']) public onClickAnywhere (event: Event) {
    if (this.isActive && !this._elem.nativeElement.contains(event.target)) {
      event.preventDefault();
      this.isActive = false;
    }
  }

}
