
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Lotes {
  private apiUrl = 'http://localhost:5221/api/Lotes';

  constructor(private http: HttpClient) {}

  obtenerLotes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  obtenerLotePorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  crearLote(lote: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, lote);
  }

  actualizarLote(id: number, lote: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, lote);
  }

  eliminarLote(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}