import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { DatePipe } from '@angular/common';
import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial/ngx';
import { Device } from '@ionic-native/device/ngx';
//import { Printer, PrintOptions } from '@awesome-cordova-plugins/printer/ngx';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    HttpClientModule, BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule],
  providers: [BluetoothSerial, Network, DatePipe, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

  ],


  bootstrap: [AppComponent],
})
export class AppModule { }