import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Character, CharacterApi, Episode} from "../interfaces/interfaces";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  public getData(page: number = 1): Observable<CharacterApi> {
    return this.http.get<CharacterApi>(`https://rickandmortyapi.com/api/character/?page=${page}`)
  }

  public getSingleCh(id?: number): Observable<Character> {
    return this.http.get<Character>(`https://rickandmortyapi.com/api/character/${id}`);
  }

  public getEpisodes(url: string): Observable<Episode> {
    return this.http.get<Episode>(url);
  }

}
