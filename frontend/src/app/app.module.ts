import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExplorerComponent } from './components/explorer/explorer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TableComponent } from './components/table/table.component';

@NgModule({
  declarations: [
    AppComponent,
    ExplorerComponent,
    NavbarComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
