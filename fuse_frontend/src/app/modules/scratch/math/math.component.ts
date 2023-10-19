import { Component, OnInit } from '@angular/core';
import { DefaultUrlSerializer } from '@angular/router';
import { MathService } from '../math.service';

@Component({
  selector: 'app-math',
  templateUrl: './math.component.html',
  styleUrls: ['./math.component.scss']
})
export class MathComponent implements OnInit {

  num: number;
  even: boolean = null;

  constructor(private mathService: MathService) { }

  ngOnInit(): void {
  }

  checkEven(): void {
    //console.log('Checking if '+this.num+' is even..');
    if(this.num) {
      this.mathService.checkEven(this.num).subscribe((resp) => {
        //console.log(resp);
        this.even = resp;
      }, (err) => {
        console.error(err);
        this.even = null;
      });
    }
  }

}
