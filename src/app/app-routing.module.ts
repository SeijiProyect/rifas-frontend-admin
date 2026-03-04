import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthRoutingModule } from './auth/auth-routing.module';
import { PagesRoutingModule } from './pages/pages-routing.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard/rifas',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/dashboard/rifas',
  },
];

@NgModule({
  imports: [
    AuthRoutingModule,
    PagesRoutingModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
