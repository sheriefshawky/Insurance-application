import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IInsurance } from 'app/shared/model/insurance.model';

type EntityResponseType = HttpResponse<IInsurance>;
type EntityArrayResponseType = HttpResponse<IInsurance[]>;

@Injectable({ providedIn: 'root' })
export class InsuranceService {
  public resourceUrl = SERVER_API_URL + 'api/insurances';

  constructor(protected http: HttpClient) {}

  create(insurance: IInsurance): Observable<EntityResponseType> {
    return this.http.post<IInsurance>(this.resourceUrl, insurance, { observe: 'response' });
  }

  update(insurance: IInsurance): Observable<EntityResponseType> {
    return this.http.put<IInsurance>(this.resourceUrl, insurance, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IInsurance>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IInsurance[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
