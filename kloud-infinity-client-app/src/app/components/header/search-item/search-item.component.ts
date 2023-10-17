import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

export interface FileDrop {
  fileName: string;
  thumbnail: string;
  starred:boolean;
}


@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.css']
})
export class SearchItemComponent implements OnInit {

  constructor() { }


  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<string[]>;

  filteredFiles!:Observable<FileDrop[]>
  fileDrop:FileDrop[]=[]
  tempFile:any

  ngOnInit() {

    localStorage.getItem("files")
    this.tempFile=JSON.parse(localStorage.getItem("files")!)
    this.tempFile.forEach((q:any)=>{
      this.fileDrop.push({
        fileName:q.fileName,
        thumbnail:q.thumbnail, 
        starred:q.starred,
      })
    })
    
    this.filteredFiles = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => value?this._filter(value):this.fileDrop.slice() ),
    );

  }

  private _filter(value: string): FileDrop[] {
    const filterValue = value.toLowerCase();

    return this.fileDrop.filter(option => option.fileName.toLowerCase().includes(filterValue));
  }


}
