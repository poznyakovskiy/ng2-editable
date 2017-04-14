import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { editableComponents } from './components';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [...editableComponents],
  exports: [...editableComponents]
})
export class EditableModule { }
