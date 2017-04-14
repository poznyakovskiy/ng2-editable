import {
  Component, Input, Output, EventEmitter, ElementRef, ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';

import { EditableComponent } from './editable.component';

@Component({
  moduleId: 'ng2-editable',
  selector: 'ng2-date-editable',
  template: `
    {{isActive ? '' : (date | date:'mediumDate')}}
    <input *ngIf="isActive" type="date" [value]="date | date:'yyyy-MM-dd'" (input)="date=parseDate($event.target.value)">
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateEditableComponent extends EditableComponent {

  @Input() public date = new Date();
  @Output() public dateChange = new EventEmitter<Date>();

  private _originalDate = new Date();

  constructor (
    cdRef: ChangeDetectorRef,
    elem: ElementRef
  ) {
    super(cdRef, elem);
  }

  protected _createToggleEvent = () => ({
    isActive: this.isActive,
    isChanged: ((this.date === undefined || this._originalDate === undefined) && this.date !== this._originalDate) ||
      this.date.getFullYear() !== this._originalDate.getFullYear() ||
      this.date.getMonth() !== this._originalDate.getMonth() ||
      this.date.getDate() !== this._originalDate.getDate()
  })

  protected _handleStateChange = () => {
    if (this.isActive) {
      this._originalDate = this.date;
    } else {
      this.dateChange.emit(this.date);
    }
  }

  public parseDate = (input: string) => {
    const date = new Date(input);
    return isNaN(date.getTime())
      ? undefined
      : date;
  }

}
