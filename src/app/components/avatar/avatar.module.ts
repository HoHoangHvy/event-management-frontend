import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarUploadComponent } from './avatar.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';

import { ImageCropperComponent } from './image-cropper/image-cropper.component';

@NgModule({
  declarations: [
    AvatarUploadComponent,
    ImageCropperComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    AvatarUploadComponent
  ]
})
export class AvatarModule { }
