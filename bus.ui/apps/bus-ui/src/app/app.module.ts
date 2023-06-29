import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModules } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateTourComponent } from './shared/create-tour/create-tour.component';
import { AddDialogComponent } from './shared/add-dialog/add-dialog.component';
import { CreateStationComponent } from './shared/create-station/create-station.component';

@NgModule({
	declarations: [AppComponent, CreateTourComponent, AddDialogComponent, CreateStationComponent],
	imports: [
		BrowserModule,
		HttpClientModule,
		MaterialModules,
		BrowserAnimationsModule,
		RouterModule.forRoot(appRoutes, {
			initialNavigation: 'enabledBlocking',
		}),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
