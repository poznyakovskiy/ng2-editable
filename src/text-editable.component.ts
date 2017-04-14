import {
  Component, Input, Output, EventEmitter, ElementRef, ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';

import { EditableComponent } from './editable.component';

@Component({
  moduleId: 'ng2-editable',
  selector: 'ng2-text-editable',
  template: `
    {{isActive ? '' : text}}
    <textarea *ngIf="isActive" [(ngModel)]="text"></textarea>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextEditableComponent extends EditableComponent {

  @Input() public text = '';
  @Output() public textChange = new EventEmitter<string>();

  private _originalText = '';

  constructor (
    cdRef: ChangeDetectorRef,
    elem: ElementRef
  ) {
    super(cdRef, elem);
  }

  protected _createToggleEvent = () => ({
    isActive: this.isActive,
    isChanged: this.text !== this._originalText
  })

  protected _handleStateChange = () => {
    if (this.isActive) {
      this._originalText = this.text;
    } else {
      this.textChange.emit(this.text);
    }
  }

}
