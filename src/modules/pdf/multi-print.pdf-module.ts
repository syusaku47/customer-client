import { PdfModule } from './pdf-module';

export class MultiPrintPdfModule {
  public pdfModules: PdfModule<any>[];

  constructor(
    ...pdfModules: PdfModule<any>[]
  ) {
    this.pdfModules = pdfModules;
  }

  async run(...params: any[]) {
    if (this.pdfModules.length !== params.length) {
      throw new Error('PDFモジュールとパラメータの個数が一致しません !!');
    }
    if (!this.pdfModules.length) {
      throw new Error('PdfModule を constructor で登録してください !!');
    }
    let svgList: string[] = [];
    for (let i = 0; i < this.pdfModules.length; i += 1) {
      const pdfModule = this.pdfModules[i];
      const param = params[i];
      svgList = [...svgList, ...await pdfModule.createSvgList(param)];
    }
    this.pdfModules[0].showPdf(await this.pdfModules[0].createPdf(svgList));
  }

  async createSvgList(...params: any[]) {
    if (this.pdfModules.length !== params.length) {
      throw new Error('PDFモジュールとパラメータの個数が一致しません !!');
    }
    if (!this.pdfModules.length) {
      throw new Error('PdfModule を constructor で登録してください !!');
    }
    let svgList: string[] = [];
    for (let i = 0; i < this.pdfModules.length; i += 1) {
      const pdfModule = this.pdfModules[i];
      const param = params[i];
      svgList = [...svgList, ...await pdfModule.createSvgList(param)];
    }
    return svgList;
  }
}
