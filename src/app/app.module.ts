import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClient,HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AproposComponent } from './apropos/apropos.component';
import { RegionsComponent } from './regions/regions.component';
import { SousRegionsComponent } from './sous-regions/sous-regions.component';
import { PaysComponent } from './pays/pays.component';
import { ToastrModule } from 'ngx-toastr';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AcceuilComponent,
    AproposComponent,
    RegionsComponent,
    SousRegionsComponent,
    PaysComponent,
    
    
   
  ],
  imports: [BrowserModule, AppRoutingModule,HttpClientModule, BrowserAnimationsModule,
    PaginationModule.forRoot(),  ToastrModule.forRoot(), FormsModule],
  providers: [HttpClient],
  bootstrap: [AppComponent],
})
export class AppModule {}
