import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddComponent } from './components/task/add/add.component';
import { ListfilesComponent } from './components/files/listfiles/listfiles.component';
import { AddfilesComponent } from './components/files/addfiles/addfiles.component';
import { ShowComponent } from './components/task/show/show.component';

const routes: Routes = [
  {
  path:'',
  component:HomeComponent,
},
{
  path:'file',
  component:ListfilesComponent,
},
{
  path:'home',
  redirectTo:'/',
  pathMatch:'full',
},

{
  path:'task',
  children:[
  {
    path:'add',
    component:AddComponent,
  },
  {
    path:'',
    redirectTo:'/',
    pathMatch:'full',
  },
],
},
{
  path:'**',
  redirectTo:'/',
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
