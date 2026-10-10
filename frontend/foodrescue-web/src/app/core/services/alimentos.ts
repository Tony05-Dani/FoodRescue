import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Alimentos {

  private apiUrl = 'http://localhost:5221/api/Alimentos';

  constructor(private http: HttpClient) {}

  obtenerAlimentos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  crearAlimento(alimento: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, alimento);
  }

  obtenerAlimentoPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  actualizarAlimento(id: number, alimento: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, alimento);
  }
  eliminarAlimento(id: number): Observable<any> {
  return this.http.delete<any>(`${this.apiUrl}/${id}`);
 }
}