import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  concatMap,
  exhaustMap,
  forkJoin,
  from,
  mergeMap,
  Observable,
  switchMap,
} from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  filesArray = ['file1.json', 'file2.json', 'file3.json'];

  filesObservable = from(this.filesArray);

  constructor(private http: HttpClient) {}

  ngOnInit() {
  }

  public getJSON(fileName: String): Observable<any> {
    return this.http.get('./assets/' + fileName);
  }

  concatMapFunc() {
    console.info("concatMap");
    this.filesObservable
      .pipe(concatMap((file) => this.getJSON(file)))
      .subscribe((data) => console.log(data));
  }

  mergeMapFunc() {
    console.info("mergeMap");
    this.filesObservable
      .pipe(mergeMap((file) => this.getJSON(file)))
      .subscribe((data) => console.log(data));
  }

  exhaustMapFunc() {
    console.info("exhaustMap");
    this.filesObservable
      .pipe(exhaustMap((file) => this.getJSON(file)))
      .subscribe((data) => console.log(data));
  }

  switchMapFunc() {
    console.info("switchMap");
    this.filesObservable
      .pipe(switchMap((file) => this.getJSON(file)))
      .subscribe((data) => console.log(data));
  }

  forkJoinFunc() {
    console.info("forkJoin");
    forkJoin(this.filesArray.map((file) => this.getJSON(file))).subscribe(
      (data) => console.log(data)
    );
  }
}
