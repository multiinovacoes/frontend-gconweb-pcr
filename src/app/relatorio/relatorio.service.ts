import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';




export class RelatorioFiltro {
  dataInicial!: any;
  dataFinal!: any;
  area!: any;
}


@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

  relatorioUrl: string;
  headers = new HttpHeaders();

  constructor(
    private http: HttpClient

  ) {
    this.relatorioUrl = `${environment.apiUrl}/relatorio`;
    this.carregaToken();
 }

 carregaToken(){
  this.headers = new HttpHeaders()
  .append('Content-Type', 'application/json')
  .append('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c3VhcmlvIjoxLCJ1c2VyX25hbWUiOiIwMDg5NjUzMzQzMyIsImlkX29yZ2FvIjo3LCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwibm9tZSI6Im11bHRpYWRtaW4iLCJleHAiOjE2OTU0NDI5MjQsImp0aSI6InNNQWRiQ2lfNDFGOU5jdVh1QUtrMVRsajNPWSIsImNsaWVudF9pZCI6ImFuZ3VsYXIifQ.JAAkqs_sdSsUsa8vcqVLZIsGSzCttt8TnVHUf1QaVfc')
 }


 pesquisar(filtro: RelatorioFiltro): Promise<any> {
  let params = new HttpParams()
  params = params.set('dataInicial', filtro.dataInicial);
  params = params.set('dataFinal', filtro.dataFinal);
  params = params.set('orgao', "2");
//  params = params.set('area', "2");

  return this.http.get(`${this.relatorioUrl}/seplag?`, { headers: this.headers, params })
      .toPromise()
   .then(res => <any>res)
       .then(data => {
         return data;
   });
  }


  atendimentoAreaPDF(filtro: RelatorioFiltro) {
    let params = new HttpParams()
    params = params.set('dataInicial', filtro.dataInicial);
    params = params.set('dataFinal', filtro.dataFinal);
    params = params.set('orgao', "2");
    params = params.set('area', "");
    params = params.set('status', "");
    console.log('entrei');
  return this.http.get<Blob>(`${this.relatorioUrl}/atendimento-area/impressao`, { headers: this.headers, params, responseType: 'blob' as 'json' }).subscribe(res => {
     //const data = 'some text';
     const file = new Blob([res], { type: 'application/pdf' });
        console.log(file);
          var url = URL.createObjectURL(file);
          window.open(url);
  });
  }  


}
