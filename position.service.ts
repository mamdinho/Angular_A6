import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Position } from './positions';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(private http: HttpClient) { }

  getPositions(): Observable<Position[]>{
    return this.http.get<Position[]>("https://thawing-wildwood-69422.herokuapp.com/positions"); //fetch data from the route and return an Observable array of Position objects when invoked
  }

  savePosition(position: Position): Observable<any>{
     var posId = position._id;
     return this.http.put<any>(`https://thawing-wildwood-69422.herokuapp.com/position/${posId}`, position);
  }

  getPosition(id): Observable<Position[]>{
    return this.http.get<Position[]>(`https://thawing-wildwood-69422.herokuapp.com/position/${id}`);
  }
}
