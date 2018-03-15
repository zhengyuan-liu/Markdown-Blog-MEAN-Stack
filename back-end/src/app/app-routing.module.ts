import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { PreviewComponent } from './preview/preview.component';
import { PageNotFoundComponent } from './not-found.component'


const routes: Routes = [
	{ path: 'edit/:id', component: EditComponent },
	{ path: 'preview/:id', component: PreviewComponent },
	{ path: '', children: [] },
	{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes, {useHash: true}) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule { }
