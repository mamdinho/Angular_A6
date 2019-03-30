import { Component, OnInit } from '@angular/core';
import { Position } from '../data/positions';
import { ActivatedRoute } from '@angular/router';
import { PositionService } from '../data/position.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {
  paramSubscription: any;
  positionSubscription: any;
  savePositionSubscription: any;
  position: Position;
  successMessage: boolean = false;
  failMessage: boolean = false;
  

  constructor(private activeRoute: ActivatedRoute, private posS: PositionService) { }

  ngOnInit() {
    this.paramSubscription = this.activeRoute.params.subscribe((params) => {

      this.positionSubscription = this.posS.getPosition(params['_id']).subscribe((position) => {
             this.position = position[0];
      });
    });
  }

  onSubmit(f: NgForm) : void{
    this.savePositionSubscription = this.posS.savePosition(this.position).subscribe(()=>{
      this.successMessage = true;
      setTimeout(() => this.successMessage = false, 2500);  //automatically set the successMessage property to false after 2500 ms
    },
    ()=>{
      this.failMessage = true;
      setTimeout(() => this.failMessage = false, 2500);  //automatically set the failMessage property to false after 2500 ms
    });
  }

  ngOnDestroy(){
    if(this.paramSubscription) this.paramSubscription.unsubscribe();
    if(this.positionSubscription) this.positionSubscription.unsubscribe();
    if(this.savePositionSubscription) this.savePositionSubscription.unsubscribe();
    
  }

}
