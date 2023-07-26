import { Anexo } from './../../core/anexo.model';
import { NgForm } from '@angular/forms';

import { AtendimentoService } from './../atendimento.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import {MenuItem, MessageService} from 'primeng/api';
import { Atendimento } from 'src/app/core/atendimento.model';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { HttpClient } from '@angular/common/http';


import Swal from 'sweetalert2'
import { cpf } from 'cpf-cnpj-validator';




export class Address {
  cep!: string;
  logradouro!: string;
  complemento!: string;
  bairro!: string;
  localidade!: string;
  uf!: string;
  unidade!: string;
  ibge!: string;
  gia!: string;



  erro!: boolean;
}

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpClient,
    private atendimentoService: AtendimentoService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private ngxLoader: NgxUiLoaderService
  ) { }

  atendimento = new Atendimento();
  fileName = '';
  cep!: Address;
  cpfInvalido = false;
  uploadedFiles: any[] = [];
  imagemLogo!: string;

  fileSelected?: File;
  base64: string = "Base64...";
  campos = false;
  anexo = new Anexo();

  tipoManifestacao!: string;

  items!: MenuItem[];
  submitted: boolean = false;
  index = 0;
  abaDisabled0 = false;
  abaDisabled1 = true;
  abaDisabled2 = true;
  abaDisabled3 = true;
  tipoDocumentos!: any;
  tipoUsuarios!: any;
  numeroAnexo = 0;
  bairros!: any;
  assuntos!: any;
  styleTipo!: string;

  ngOnInit() {
    this.atendimentoService.consultaLogotipo(this.router.url.substring(1,2))
    .then((data: any) => {
      this.imagemLogo = "assets/image/" + data;
      this.atendimento.logotipo = this.imagemLogo;
      this.activatedRoute.params.subscribe(params => {
        this.atendimento.natureza = params['id'];
        this.tipoManifestacao = this.tipoManif(params['id']);
      });
      this.atendimento.captcha = (Math.round(Math.random()*11240));
      this.atendimento.orgao = this.router.url.substring(1,2);
      this.atendimento.identificado = '1';
      this.carregarTiposDocumento();
      this.carregarBairros();
      this.carregarAssuntos();
    })
    .catch(erro => {
      this.ngxLoader.stop();
      setTimeout(() => {
        this.errorHandler.handle(erro);
      }, 1000);
  });
  }

  tipoManif(tipo: any) {
    if (tipo == '1'){
      this.styleTipo = "background-color:#000080; color: white";
      console.log(this.styleTipo);
       return 'Faça seu Elogio'
    }else if (tipo == '2'){
      this.styleTipo = "background-color:DeepSkyBlue; color: white";
      return 'Faça sua Sugestão'
    }else if (tipo == '3'){
      this.styleTipo = "background-color:Sienna; color: white";
      return 'Faça sua Reclamação'
    }else if (tipo == '4'){
      this.styleTipo = "background-color:DarkRed; color: white";
      return 'Faça sua Denúncia'
    }else if (tipo == '5'){
      this.styleTipo = "background-color:MediumSeaGreen; color: white";
      return 'Faça sua Solicitação'
    }else if (tipo == '7'){
      this.styleTipo = "background-color:DarkOrange; color: white";
      return 'Faça seu Pedido de Informação'
    }else
    return '';
  }

  anonimo(){
    this.campos = true;
  }

  identificado(){
    this.campos = false;
  }


   nextPage() {

      if (this.atendimento.captcha == this.atendimento.captchaInformado){
        this.index = 1;
        this.abaDisabled0 = true;
        this.abaDisabled1 = false;
        this.abaDisabled2 = true;
        this.abaDisabled3 = true;
      }else{
        Swal.fire('Valor do capcha informado diferente!')
      }
  }

   /**
   * Convert File To Base64
   */
    convertFileToBase64(file: File, index: number, anexo: Anexo) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        anexo.stringBase64 = reader.result as string;
        anexo.nomeArquivo = file.name;
        this.atendimento.listaAnexoDto[index] = anexo;
      }
    }

  carregaArquivo(event: { target: { files: File[]; }; files: any; }) {

    for (let index = 0; index < event.files.length; index++) {
      let anexo = new Anexo();
      const file:File = event.files[index];
      if (file) {
        this.convertFileToBase64(file, index, anexo);
      }
    }
  }

  nextPageAnexo(){
      this.index = 2;
      this.abaDisabled0 = true;
      this.abaDisabled1 = true;
      this.abaDisabled2 = false;
      this.abaDisabled3 = true;
  }

  previewAnexo(){
    this.index = 0;
    this.abaDisabled0 = false;
    this.abaDisabled1 = true;
    this.abaDisabled2 = true;
    this.abaDisabled3 = true;
  }

  concluir(form: NgForm){
    this.ngxLoader.start();
    this.atendimentoService.adicionar(this.atendimento)
      .then(response => {
        this.atendimento = response.atendimentoDto;
        this.ngxLoader.stop();
        })
      .then(res => {
        setTimeout(() => {
          this.index = 3;
          this.abaDisabled0 = true;
          this.abaDisabled1 = true;
          this.abaDisabled2 = true;
          this.abaDisabled3 = false;
          this.messageService.add({ severity: 'success', detail: 'Manifestação enviada com sucesso!' });
            }, 1000);
      })
      .catch(erro => {
        this.ngxLoader.stop();
        setTimeout(() => {
          this.errorHandler.handle(erro);
            }, 1000);
      });


  }

  previewRevisao(){
    this.index = 1;
    this.abaDisabled0 = true;
    this.abaDisabled1 = false;
    this.abaDisabled2 = true;
    this.abaDisabled3 = true;
  }

  previewConclusao(){
    this.index = 2;
    this.abaDisabled0 = true;
    this.abaDisabled1 = true;
    this.abaDisabled2 = false;
    this.abaDisabled3 = true;
  }

  voltarInicio(){
    this.router.navigate([this.router.url.substring(1,2) + '/pesquisa']);
  }


  validaCpf(){
    if (this.atendimento.tipoDocumento == 1) {
      if (!cpf.isValid(this.atendimento.numeroDocumento)) {
        this.cpfInvalido = true;
        //Swal.fire('CPF Inválido', 'Informe um cpf válido!', 'warning');
      }else{
        this.cpfInvalido = false;
      }
    }else{
      this.cpfInvalido = false;
    }
  }

  carregarTiposDocumento() {
    this.atendimentoService.listarTiposDocumentos(this.atendimento.orgao)
      .then(tipoDocumentos => {
        this.tipoDocumentos = tipoDocumentos.
          map((o: { descricao: any; id: any; }) => ({ label: o.descricao, value: o.id }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarBairros() {
    this.atendimentoService.listarBairros(this.atendimento.orgao)
      .then(bairros => {
        this.bairros = bairros.
          map((o: { descricao: any; id: any; }) => ({ label: o.descricao, value: o.id }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarAssuntos() {
    this.atendimentoService.listarAssuntos(this.atendimento.orgao)
      .then(assuntos => {
        this.assuntos = assuntos.
          map((o: { descricao: any; id: any; }) => ({ label: o.descricao, value: o.id }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


}
