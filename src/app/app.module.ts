import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { GeneratorComponent } from './generator/generator.component';
import { ConfigSettingComponent } from './config-setting/config-setting.component';
import { DisplayCodeComponent } from './display-code/display-code.component';

registerLocaleData(zh);


// import * as hljs from 'highlight.js';
// import { HighlightJsModule, HIGHLIGHT_JS } from 'angular-highlight-js';
 



// export function highlightJsFactory() {
//   return hljs;
// }

@NgModule({
  declarations: [
    AppComponent,
    GeneratorComponent,
    ConfigSettingComponent,
    DisplayCodeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule, 
    NgZorroAntdModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
