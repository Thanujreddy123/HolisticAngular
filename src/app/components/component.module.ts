import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './task/list/list.component';
import { MaterialsModule } from '../materials/materials.module'
import { NgxApexchartsModule } from 'ngx-apexcharts';
import { NavigationComponent } from '../navigation/navigation.component';
import { AppRoutingModule } from '../app-routing.module';
import { AddComponent } from './task/add/add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowComponent } from './task/show/show.component';
import { AddfilesComponent } from './files/addfiles/addfiles.component';
import { ListfilesComponent } from './files/listfiles/listfiles.component';
import { ShowfilesComponent } from './files/showfiles/showfiles.component';
@NgModule({
  declarations: [HomeComponent, ListComponent,NavigationComponent, AddComponent, ShowComponent, AddfilesComponent, ListfilesComponent, ShowfilesComponent],
  imports: [
    CommonModule,MaterialsModule,NgxApexchartsModule,AppRoutingModule,ReactiveFormsModule
  ],
  exports:[HomeComponent,NavigationComponent,AppRoutingModule,ReactiveFormsModule]
})
export class ComponentModule { }

