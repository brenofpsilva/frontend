import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Collaborator } from '../interfaces/collaborator';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorService {
  baseUrl = "http://localhost/api/collaborators";

  constructor(private http: HttpClient) { };

  list(): Observable<Collaborator[]> {
    return this.http.get<Collaborator[]>(this.baseUrl)
  }
}
