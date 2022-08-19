import { Component, OnInit,Injectable,AfterViewInit  } from '@angular/core';
import * as myData from '../data/data.json'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit,AfterViewInit{
  datas = myData.data;
  dataArray = [];
  offset = 0;
  pageNumber = 0;
  isPreDisabled = true;
  isNextDisabled= false;
  isUpDown = false;
  isDownDis = true;
  isUpDis = false;
  longPage = [];
  ngOnInit(): void {
       if(this.datas.length%6 == 0){
        this.pageNumber = this.datas.length/6;
       }else{
        this.pageNumber = Math.round(this.datas.length/6) + 1;
       }
       for(let i = 0; i < this.datas.length; i++){
        if(this.datas[i].items.length > 5){
          let a = {isUpDown:true}
          this.dataArray.push({...a,...this.datas[i]})
          this.longPage.push(i);
        }else{
          let a = {isUpDown:false}
          this.dataArray.push({...a,...this.datas[i]})
        }
       }
       console.log(this.dataArray);
  }

  ngAfterViewInit():void{
    let out = document.getElementById("card1");
    let cardC = document.getElementById("card-contain1");
    console.log(out);
    console.log(cardC);
    console.log(this.longPage);
     console.log('after');
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
  marginTop:number = 0;
  onUp(index:number){
    let out = document.getElementById("card"+index).getBoundingClientRect();
    let cardC = document.getElementById("card-contain"+index).getBoundingClientRect();
    this.marginTop = this.marginTop - 15;
    document.getElementById("card-contain"+index).style.marginTop = this.marginTop + "px";
    if(cardC.height <= out.height - this.marginTop - 25){
      this.isUpDis = true;
    }
    this.isDownDis = false;
    console.log(index);
    console.log('up');
  }

  onDown(index:number){
    console.log(index);
    console.log('down');
    this.marginTop = this.marginTop + 15;
    if(this.marginTop >= 0){
      this.isDownDis = true;
    }
    this.isUpDis = false;
    document.getElementById("card-contain"+index).style.marginTop = this.marginTop + "px";
  }

  title = 'universal-proc';
}
