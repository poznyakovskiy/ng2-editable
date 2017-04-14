import {
  Component, Input, Output, EventEmitter, ElementRef, ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';

import { EditableComponent } from './editable.component';

@Component({
  moduleId: 'ng2-editable',
  selector: 'ng2-selectable',
  template: `
    {{isActive ? '' : currentLabel}}
    <select *ngIf="isActive" [(ngModel)]="value">
      <option *ngFor="let option of options" [value]="getValue(option)">
        {{getLabel(option)}}
      </option>
    </select>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectableComponent<T> extends EditableComponent {

  @Input() public value: any;
  @Output() public valueChange = new EventEmitter<any>();

  @Input() public options: T[] = [];
  @Input() public valueProperty = 'id';
  @Input() public labelProperty = 'label';
  @Input() public valueAccessor: ((e: T) => any) | undefined;
  @Input() public labelAccessor: ((e: T) => string) | undefined;

  public get currentLabel() {
    const v = this.options.find(e => this.getValue(e) === this.value);
    if (v === undefined) return '';
    return this.getLabel(v);
  }

  private _originalValue: any;

  constructor (
    cdRef: ChangeDetectorRef,
    elem: ElementRef
  ) {
    super(cdRef, elem);
  }

  public getValue = (e: T) => {
    if (this.valueAccessor !== undefined) return this.valueAccessor(e);
    if (this.valueProperty !== undefined) return e[this.valueProperty];
    return e;
  }

  public getLabel = (e: T) => {
    if (this.labelAccessor !== undefined) return this.labelAccessor(e);
    if (this.labelProperty !== undefined) return e[this.labelProperty];
    return e;
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
