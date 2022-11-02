import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Character, CharacterApi, Episode} from "../interfaces/interfaces";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  public getData(page: number = 1): Observable<CharacterApi> {
    return this.http.get<CharacterApi>(`${environment.API}/?page=${page}`)
  }

  public getSingleCh(id?: number): Observable<Character> {
    return this.http.get<Character>(`${environment.API}/${id}`);
  }

  public getEpisodes(url: string): Observable<Episode> {
    return this.http.get<Episode>(url);
  }

}
