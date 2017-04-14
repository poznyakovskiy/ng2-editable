import { Component, ElementRef, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { EditableComponent } from './editable.component';

@Component({
  moduleId: 'ng2-editable',
  selector: 'ng2-toggleable',
  template: `
    {{isActive ? '' : (value ? '\u2713' : (showFalse ? '\u2717' : ''))}}
    <input *ngIf="isActive" type="checkbox" [(ngModel)]="value"
      style="margin-left: auto; margin-right: auto;">
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleableComponent extends EditableComponent {

  @Input() public value: boolean;
  @Output() public valueChange = new EventEmitter<boolean>();

  @Input() public showFalse = true;

  private _originalValue: boolean | undefined = undefined;

  constructor (
    cdRef: ChangeDetectorRef,
    elem: ElementRef
  ) {
    super(cdRef, elem);
  }

  protected _createToggleEvent = () => ({
    isActive: this.isActive,
    isChanged: this.value !== this._originalValue
  })

  protected _handleStateChange = () => {
    if (this.isActive) {
      this._originalValue = this.value;
    } else {
      this.valueChange.emit(this.value);
    }
  }

}