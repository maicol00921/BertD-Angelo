import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TvmazeService {
  private readonly baseUrl = 'https://api.tvmaze.com';
  private readonly showId = 35814; 

  constructor(private http: HttpClient) {}

 
  getShowInfo(): Observable<any> {
    return this.http.get(`${this.baseUrl}/shows/${this.showId}`);
  }

  getCast(): Observable<any> {
    return this.http.get(`${this.baseUrl}/shows/${this.showId}/cast`);
  }

  getEpisodes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/shows/${this.showId}/episodes`);
  }

  getImages(): Observable<any> {
    return this.http.get(`${this.baseUrl}/shows/${this.showId}/images`);
  }
}