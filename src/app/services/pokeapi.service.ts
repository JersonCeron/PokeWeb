import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {
  private Url = 'https://pokeapi.co/api/v2'

  constructor(private http: HttpClient) { }

  getAllPokemons(limit: number = 30, offset: number = 0): Observable<any>{
    return this.http.get(`${this.Url}/pokemon?limit=${limit}&offset=${offset}`);
  }

  getPokemon(name: string): Observable<any>{
    return this.http.get(`${this.Url}/pokemon/${name}`);
  }
}
