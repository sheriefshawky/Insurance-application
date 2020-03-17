export interface IInsurance {
  id?: number;
  comment?: string;
  pictureContentType?: string;
  picture?: any;
}

export class Insurance implements IInsurance {
  constructor(public id?: number, public comment?: string, public pictureContentType?: string, public picture?: any) {}
}
