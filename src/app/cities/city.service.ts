import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {City} from "./city";

@Injectable({
  providedIn: 'root'
})

export class CityService {
  private apiServerUrl = 'http://localhost:8089/api/v1';

  constructor(private http: HttpClient) {
  }

  public getAmountOfCityPages(): Observable<number>{
    return this.http.get<number>(`${this.apiServerUrl}/cities/max-pages`)
  }
  public getCities(pageNumber: number): Observable<City[]>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("page",pageNumber);
    return this.http.get<City[]>(`${this.apiServerUrl}/cities/`, {params: queryParams})
  }
  public getCitiesByName(name: string): Observable<City[]>{
    return this.http.get<City[]>(`${this.apiServerUrl}/cities/name/${name}`)
  }
  public getCity(cityId: number): Observable<City>{
    return this.http.get<City>(`${this.apiServerUrl}/cities/${cityId}`)
  }

  public addCity(city: City): Observable<City>{
    return this.http.post<City>(`${this.apiServerUrl}/cities`, city)
  }

  public changeCity(id: number, city: City): Observable<any> {
    console.log(city);
    console.log(id);
    return this.http.put<any>(`${this.apiServerUrl}/cities/${id}`, city);
  }
}
