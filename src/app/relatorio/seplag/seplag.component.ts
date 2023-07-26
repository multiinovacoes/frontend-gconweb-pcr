import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ExcelServiceService } from 'src/app/core/excel-service.service';
import { RelatorioFiltro, RelatorioService } from '../relatorio.service';

import * as moment from 'moment';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-seplag',
  templateUrl: './seplag.component.html',
  styleUrls: ['./seplag.component.css']
})
export class SeplagComponent implements OnInit {
  [x: string]: any;

  filtro = new RelatorioFiltro();
  atendimentoArea = [];
  rowGroupMetadata: any;
  areas!: any;
  buttonsImpressao = true;

  constructor(
    private relatorioService: RelatorioService,
    private errorHandler: ErrorHandlerService,
    private excelService: ExcelServiceService,
    private ngxLoader: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.buttonsImpressao = true;
    this.filtro.dataInicial = new Date(moment(new Date(), "YYYY-MM-DD").startOf('month').toString());
    this.filtro.dataFinal = new Date(moment(new Date(), "YYYY-MM-DD").endOf('month').toString());
  }

  pesquisa() {
    this.ngxLoader.start();
    this.relatorioService.pesquisar(this.filtro)
   .then(data =>{
    this.ngxLoader.stop();
     this.atendimentoArea = data;
     console.log(this.atendimentoArea);
     this.buttonsImpressao = false;
   }
   )
   .catch(erro => {
    this.ngxLoader.stop();
    this.errorHandler.handle(erro);
   });
}

showPDF(){
  console.log('oieeeeeeeeee');
  this.relatorioService.atendimentoAreaPDF(this.filtro);
 }

 exportAsXLSX():void {
  this.excelService.exportAsExcelFile(this.atendimentoArea, 'relatorio_area');
}

}
