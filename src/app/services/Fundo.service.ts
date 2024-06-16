import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { IHttpModel, IoptionModel } from '../models/IHttp.Model';
import { Validators } from '../utils/Validators';
import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class FundoService {
  public params = new HttpParams();
  public basePatch = environment.gatewayUrlFundo;
  public headers$: HttpHeaders | undefined;
  public token: string = '';

  constructor(private _http: HttpClient, private Auth$: AuthService) {
    this.tokenSuscribe();
    this.init();
  }

  get<T>(url: string, params?: HttpParams, endpoint?: string): Observable<any> {
    let path$ = `${this.basePatch}${url}`;

    const headers = {
      headers: this.headers$,
      params,
    };

    if (!Validators.isNullOrUndefined<string>(endpoint)) {
      path$ = `${endpoint}${url}`;
    }

    return this._http.get(path$, headers).pipe(
      map((res) => {
        return res;
      }),

      catchError(this.handleError)
    );
  }

  buffer(
    method: string,
    url: string,
    options: IoptionModel,
    endpoint?: string
  ): Observable<ArrayBuffer> {
    let path$ = `${this.basePatch}${url}`;

    if (!Validators.isNullOrUndefined<string>(endpoint)) {
      path$ = `${endpoint}${url}`;
    }

    return this._http
      .request(method, path$, {
        headers: options.headers ?? this.headers$,
        responseType: 'arraybuffer',
      })
      .pipe(
        map((res) => {
          return res;
        }),
        // eslint-disable-next-line @typescript-eslint/unbound-method
        catchError(this.handleError)
      );
  }
  
  generic({ url, method, options, endpoint }: IHttpModel): Observable<any> {
    let path$ = `${this.basePatch}${url}`;

    if (!Validators.isNullOrUndefined<string>(endpoint)) {
      path$ = `${endpoint}${url}`;
    }

    return this._http
      .request(method, path$, {
        body: options.body,
        headers: options.headers ?? this.headers$,
        responseType: options.responseType,
        observe: options.observe,
      })
      .pipe(
        // eslint-disable-next-line @typescript-eslint/unbound-method
        catchError(this.handleError)
      );
  }

  post<T>(
    url: string,
    data?: any,
    endpoint?: string,
    responseType?: string
  ): Observable<T> {
    let path$ = `${this.basePatch}${url}`;

    const requestOptions: { [x: string]: string | any } = {
      headers: this.headers$,
      responseType: responseType ? responseType : null,
    };

    if (!Validators.isNullOrUndefined<string>(endpoint)) {
      path$ = `${endpoint}${url}`;
    }
    return this._http.post<T>(path$, data, requestOptions).pipe(
      map((res) => {
        return res;
      }),
      // eslint-disable-next-line @typescript-eslint/unbound-method
      catchError(this.handleError)
    );
  }

  put<T>(url: string, data: any, endpoint?: string): Observable<any> {
    let path$ = `${this.basePatch}${url}`;
    const headers = {
      headers: this.headers$,
    };

    if (!Validators.isNullOrUndefined<string>(endpoint)) {
      path$ = `${endpoint}${url}`;
    }
    return this._http.put(path$, data, headers).pipe(
      map((res) => {
        return res;
      }),
      // eslint-disable-next-line @typescript-eslint/unbound-method
      catchError(this.handleError)
    );
  }

  delete<T>(url: string, endpoint?: string): Observable<any> {
    let path$ = `${this.basePatch}${url}`;
    const headers = {
      headers: this.headers$,
    };

    if (!Validators.isNullOrUndefined<string>(endpoint)) {
      path$ = `${endpoint}${url}`;
    }
    return this._http.delete(path$, headers).pipe(
      map((res) => {
        return res;
      }),
      // eslint-disable-next-line @typescript-eslint/unbound-method
      catchError(this.handleError)
    );
  }

  public handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError(error);
  }


  init(): void {
    this.headers$ = this.httpOptions();
  }

  private httpOptions(): HttpHeaders {
    if (this.token) {
      return this.jsonAuth();
    }
    if (!this.token) {
      return this.notAuth();
    }
    return new HttpHeaders();
  }
  tokenSuscribe(): void {
    this.Auth$.getToken.subscribe((response: string) => {
      this.token = response;
      this.init();
    });
  }

  private jsonAuth = (): HttpHeaders =>
    new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${this.token}`);

  private notAuth = () =>
    new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
}
