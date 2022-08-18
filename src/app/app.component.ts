import { Component, OnInit,Injectable  } from '@angular/core';
import * as myData from '../data/data.json'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  datas = myData.data;
  dataArray = [];
  offset = 0;
  pageNumber = 0;
  isPreDisabled = true;
  isNextDisabled= false;
  ngOnInit(): void {
       if(this.datas.length%6 == 0){
        this.pageNumber = this.datas.length/6;
       }else{
        this.pageNumber = Math.round(this.datas.length/6) + 1;
       }
  }

  onNext(){
    this.offset++;
    this.isPreDisabled = false;
    console.log(this.offset,this.pageNumber)
    if(this.offset >= this.pageNumber - 1){
      this.isNextDisabled = true;
    }
  }
  onPre(){
    this.offset--;
    this.isNextDisabled = false;
    if(this.offset == 0){
      this.isPreDisabled = true;
    }
  }

  title = 'universal-proc';
}
