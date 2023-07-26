import { RespostaEncaminhamentoComponent } from './manifestacao/resposta-encaminhamento/resposta-encaminhamento.component';
import { ConsultaManifestacaoComponent } from './manifestacao/consulta-manifestacao/consulta-manifestacao.component';
import { CadastroComponent } from './manifestacao/cadastro/cadastro.component';
import { PesquisaComponent } from './manifestacao/pesquisa/pesquisa.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeplagComponent } from './relatorio/seplag/seplag.component';
import { PesquisaSatisfacaoComponent } from './manifestacao/pesquisa-satisfacao/pesquisa-satisfacao.component';

const routes: Routes = [
  { path: '1/pesquisa', component: PesquisaComponent },
  { path: '2/pesquisa', component: PesquisaComponent },
  { path: '3/pesquisa', component: PesquisaComponent },
  { path: '4/pesquisa', component: PesquisaComponent },
  { path: '5/pesquisa', component: PesquisaComponent },
  { path: '6/pesquisa', component: PesquisaComponent },
  { path: '7/pesquisa', component: PesquisaComponent },
  { path: '8/pesquisa', component: PesquisaComponent },
  { path: '1/cadastro/:id', component: CadastroComponent },
  { path: '2/cadastro/:id', component: CadastroComponent },
  { path: '3/cadastro/:id', component: CadastroComponent },
  { path: '4/cadastro/:id', component: CadastroComponent },
  { path: '5/cadastro/:id', component: CadastroComponent },
  { path: '6/cadastro/:id', component: CadastroComponent },
  { path: '7/cadastro/:id', component: CadastroComponent },
  { path: '8/cadastro/:id', component: CadastroComponent },
  { path: '1/consulta', component: ConsultaManifestacaoComponent },
  { path: '2/consulta', component: ConsultaManifestacaoComponent },
  { path: '3/consulta', component: ConsultaManifestacaoComponent },
  { path: '4/consulta', component: ConsultaManifestacaoComponent },
  { path: '5/consulta', component: ConsultaManifestacaoComponent },
  { path: '6/consulta', component: ConsultaManifestacaoComponent },
  { path: '7/consulta', component: ConsultaManifestacaoComponent },
  { path: '8/consulta', component: ConsultaManifestacaoComponent },
  { path: 'resposta-encaminhamento/:parametro', component: RespostaEncaminhamentoComponent },
  { path: 'pesquisa-satisfacao/:parametro', component: PesquisaSatisfacaoComponent },
  { path: 'relatorio/seplag', component: SeplagComponent },
  { path: '**', redirectTo: 'pagina-nao-encontrada' }
];

@NgModule({
  //imports: [RouterModule.forRoot(routes, {useHash: true})],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
