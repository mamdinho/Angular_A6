import { Component, OnInit } from '@angular/core';
import { PositionService } from '../data/position.service'; //importing the PositionService
import { Position } from '../data/positions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css']
})
export class PositionsComponent implements OnInit {
  positions: Position[];
  getPositionsSub: any; //for holding the reference of the subscription
  loadingError: boolean = false; //default is false

  constructor(private posService: PositionService, private router: Router) { } //injecting the service PositionService for my component to use

  ngOnInit() {
    this.getPositionsSub = this.posService.getPositions().subscribe(positions => this.positions = positions,
      err => this.loadingError = true); //NOT SURE!!
  }

  ngOnDestroy(){
    if(this.getPositionsSub) this.getPositionsSub.unsubscribe(); //unsubscribing when the components is no longer loaded "a.k is destroyed"
  }

  routePosition(id: string){
    this.router.navigate(['/position', id]); //navigate to this specific position
  }
}
