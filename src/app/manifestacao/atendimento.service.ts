import { RespostaEncaminhamentoSetor } from './../core/resposta-encaminhamento-setor.model';
import { PesquisaSatisfacao } from './../core/pesquisa-satisfacao.model';
import { Consulta } from './../core/consulta.model';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Atendimento } from '../core/atendimento.model';

@Injectable({
  providedIn: 'root'
})
export class AtendimentoService {

  atendimentoUrl!: string;
  assuntoUrl!: string;
  bairroUrl!: string;
  tipoDocumentoUrl!: string;
  logotipoUrl!: string;
  pesquisaSatisfacaoUrl!: string;
  modeloDocumentoUrl!: string;
  encaminhamentoUrl!: string;
  encaminhamentoRespostaUrl!: string;
  headers = new HttpHeaders()

  constructor(
    private http: HttpClient
  ) {
    this.atendimentoUrl = `${environment.apiUrl}/atendimentos`;
    this.assuntoUrl = `${environment.apiUrl}/assuntos`;
    this.bairroUrl = `${environment.apiUrl}/bairros`;
    this.tipoDocumentoUrl = `${environment.apiUrl}/tipoDocumentos`;
    this.logotipoUrl = `${environment.apiUrl}/logoTipo`;
    this.pesquisaSatisfacaoUrl = `${environment.apiUrl}/pesquisaSatisfacao`;
    this.modeloDocumentoUrl = `${environment.apiUrl}/modelosDoc`;
    this.encaminhamentoUrl = `${environment.apiUrl}/encaminhamentos`;
    this.encaminhamentoRespostaUrl = `${environment.apiUrl}/encaminhamentosResposta`;
    this.carregaToken();
   }


   carregaToken(){
    this.headers = new HttpHeaders()
    .append('Content-Type', 'application/json')
    .append('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c3VhcmlvIjoxLCJ1c2VyX25hbWUiOiIwMDg5NjUzMzQzMyIsImlkX29yZ2FvIjo3LCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwibm9tZSI6Im11bHRpYWRtaW4iLCJleHAiOjE2OTU0NDI5MjQsImp0aSI6InNNQWRiQ2lfNDFGOU5jdVh1QUtrMVRsajNPWSIsImNsaWVudF9pZCI6ImFuZ3VsYXIifQ.JAAkqs_sdSsUsa8vcqVLZIsGSzCttt8TnVHUf1QaVfc')
   }

   adicionar(atendimento: Atendimento): Promise<any> {
    return this.http.post<any>(`${this.atendimentoUrl}/site`, atendimento, { headers: this.headers })
      .toPromise();
  }

  enviarResposta(respostaEncaminhamentoSetor: RespostaEncaminhamentoSetor): Promise<any> {
    let params = new HttpParams()
    return this.http.post<any>(`${this.encaminhamentoRespostaUrl}/encaminhamentosRespostaSetor`, respostaEncaminhamentoSetor, { headers: this.headers })
      .toPromise();
  }

  salvarPesquisa(pesquisa: PesquisaSatisfacao): Promise<any> {
    console.log(pesquisa);
    return this.http.post<PesquisaSatisfacao>(`${this.pesquisaSatisfacaoUrl}`, pesquisa, {headers: this.headers})
      .toPromise();
  }

  uploadAnexo(): string {
    return `${this.atendimentoUrl}/anexo`;
  }


  listarTiposDocumentos(orgao: string): Promise<any> {
    let params = new HttpParams()
    params = params.set('orgao', orgao);
    return this.http.get<any>(`${this.tipoDocumentoUrl}/listar?`,{headers: this.headers, params})
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.tipoDocumentoDtoList;
     });
  }

  listarBairros(orgao: string): Promise<any> {
    let params = new HttpParams()
    params = params.set('orgao', orgao);
    return this.http.get<any>(`${this.bairroUrl}/listar?`,{headers: this.headers, params})
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.bairroDtoList;
     });
  }

  listarAssuntos(orgao: string): Promise<any> {
    let params = new HttpParams()
    params = params.set('orgao', orgao);
    params = params.set('area', 51);

    return this.http.get<any>(`${this.assuntoUrl}/listar/assuntos?`,{headers: this.headers, params})
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.assuntoDtoList;
     });
  }

  consultaLogotipo(orgao: string): Promise<any>{
    let params = new HttpParams()
    params = params.set('orgao', orgao);
    return this.http.get<any>(`${this.logotipoUrl}/?`, {headers: this.headers, params})
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.logoTipoDto.nome;
     });
  }

  consulta(consulta: any): Promise<any>{
    let params = new HttpParams()
    params = params.set('orgao', consulta.orgao);
    params = params.set('numero', consulta.numero);
    params = params.set('senha', consulta.senha);
    return this.http.get<any>(`${this.atendimentoUrl}/consultaAtendimento`, {headers: this.headers, params})
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.resumoAtendimentoDto;
     });
  }

  consultaParametroPesquisaEmail(parametro: string): Promise<any>{
    let params = new HttpParams()
    params = params.set('parametro', parametro);
    console.log('oieeee');
    return this.http.get<any>(`${this.atendimentoUrl}/pesquisa-satisfacao/`+parametro, {headers: this.headers})
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.resumoAtendimentoDto;
     });
  }

  listarModeloDocumento(orgao: string, codigo: string): Promise<any> {
    let params = new HttpParams()
    params = params.set('orgao', orgao);
    params = params.set('codigo', codigo);
    return this.http.get<any>(`${this.modeloDocumentoUrl}/modeloDocTiposSite?`,{headers: this.headers, params})
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.modeloDocumentoDtoList;
     });
  }


  consultaEncaminhamento(parametro: string): Promise<any>{
    let params = new HttpParams()
    params = params.set('parametro', parametro);
    return this.http.get<any>(`${this.encaminhamentoUrl}/resposta-setor/`+parametro, {headers: this.headers})
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data;
     });
  }


}
