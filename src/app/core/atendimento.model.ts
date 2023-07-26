export class Atendimento {
  id!: number;
  descricao!: string;
  orgao!: any;
  numeroProtocolo!: string;
  sequencialOrgao!: number;
  anoAtendimento!: number;
  protocoloOrigem!: string;
  sigilo!: boolean;
  assunto!: number;
  nomeSolicitante!: string;
  tipoDocumento!: number;
  numeroDocumento!: string;
  bairroOcorrencia!: string;
  email!: string;
  dddCelular!: string;
  foneCelular!: string;
  origemManifestacao!: any;
  descricaoOque!: string;
  natureza!: any;
  captcha!: number;
  captchaInformado!: number;
  atendimentoDto!: Atendimento;
  senhaManifestante!: string;
  identificado = '';
  logotipo!: string;
  listaAnexoDto: any[] = [];

}
