import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AtendimentoService } from './../atendimento.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.css']
})
export class PesquisaComponent  {

  nomeLogotipo!: any;
  imagemLogo!: string;
  backendForaAr!: boolean;
  backendNoAr!: boolean;

  constructor(
    private router: Router,
    private atendimentoService: AtendimentoService,
    private errorHandler: ErrorHandlerService,
    private ngxLoader: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.backendForaAr = true;
    this.backendNoAr = false;
    this.ngxLoader.start();
      this.atendimentoService.consultaLogotipo(this.router.url.substring(1,2))
        .then((data: any) => {
          this.ngxLoader.stop();
          this.nomeLogotipo = data;
          this.imagemLogo = "assets/image/" + this.nomeLogotipo;
          this.backendForaAr = true;
          this.backendNoAr = false;
        })
        .catch(erro => {
          this.ngxLoader.stop();
          this.backendForaAr = false;
          this.backendNoAr = true;
            this.errorHandler.handle(erro);
          });
  }

  elogio() {
    this.router.navigate([this.router.url.substring(1,2) + '/cadastro/1']);
  }

  sugestao() {
    this.router.navigate([this.router.url.substring(1,2) + '/cadastro/2']);
  }

  reclamacao() {
    this.router.navigate([this.router.url.substring(1,2) + '/cadastro/3']);
  }

  denuncia() {
    this.router.navigate([this.router.url.substring(1,2) + '/cadastro/4']);
  }

  solicitacao() {
    this.router.navigate([this.router.url.substring(1,2) + '/cadastro/5']);
  }

  informacao() {
    this.router.navigate([this.router.url.substring(1,2) + '/cadastro/7']);
  }

  consulta() {
    this.router.navigate([this.router.url.substring(1,2) + '/consulta']);
  }


}
