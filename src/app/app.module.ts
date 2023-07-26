import { CadastroComponent } from './manifestacao/cadastro/cadastro.component';
import { PesquisaComponent } from './manifestacao/pesquisa/pesquisa.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { NgxUiLoaderModule, NgxUiLoaderRouterModule } from "ngx-ui-loader";
import {AccordionModule} from 'primeng/accordion';
import {ToastModule} from 'primeng/toast';
import {CheckboxModule} from 'primeng/checkbox';
import { EditorModule } from 'primeng/editor';
import { TableModule } from 'primeng/table';

import { CalendarModule } from 'primeng/calendar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {CardModule} from 'primeng/card';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {DropdownModule} from 'primeng/dropdown';
import {PanelModule} from 'primeng/panel';
import {ButtonModule} from 'primeng/button';
import {DividerModule} from 'primeng/divider';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {StepsModule} from 'primeng/steps';
import {TabViewModule} from 'primeng/tabview';
import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';
import { MessageService } from 'primeng/api';
import {InputMaskModule} from 'primeng/inputmask';
import { ConsultaManifestacaoComponent } from './manifestacao/consulta-manifestacao/consulta-manifestacao.component';
import { RespostaEncaminhamentoComponent } from './manifestacao/resposta-encaminhamento/resposta-encaminhamento.component';
import { SeplagComponent } from './relatorio/seplag/seplag.component';
import { PesquisaSatisfacaoComponent } from './manifestacao/pesquisa-satisfacao/pesquisa-satisfacao.component';





@NgModule({
  declarations: [
    AppComponent,
    PesquisaComponent,
    CadastroComponent,
    ConsultaManifestacaoComponent,
    RespostaEncaminhamentoComponent,
    SeplagComponent,
    PesquisaSatisfacaoComponent

  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CardModule,
    InputTextModule,
    PanelModule,
    DropdownModule,
    InputTextareaModule,
    DividerModule,
    BrowserAnimationsModule,
    StepsModule,
    ButtonModule,
    TabViewModule,
    FileUploadModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    InputMaskModule,
    ProgressSpinnerModule,
    NgxUiLoaderModule,
    NgxUiLoaderRouterModule,
    RadioButtonModule,
    AccordionModule,
    ToastModule,
    CheckboxModule,
    EditorModule,
    CalendarModule,
    TableModule
    

  ],
  providers: [
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
