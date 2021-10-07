export class Validation {
  public run: (v: string, v2?:string) => boolean;

  public errorMessage: string;

  constructor(run: (v: string, v2?: string) => boolean, errorMessage: string) {
    this.run = run;
    this.errorMessage = errorMessage;
  }
}
