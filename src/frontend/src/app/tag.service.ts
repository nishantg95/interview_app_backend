import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Tag } from './interfaces/tag';
import { JsonPipe } from '@angular/common';

const endpoint = 'http://localhost:8080/api/tags';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TagService {
  tags: Observable<Tag[]>;

  constructor(private http: HttpClient) {}

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(operation, error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);
      // console.error('Error completing operation', operation);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  listAllTags(): Observable<Tag[]> {
    this.tags = this.http
      .get<Tag[]>(endpoint + '/getAllTags')
      .pipe(catchError(this.handleError<Tag[]>('listAllTags', [])));
    return this.tags;
  }

  deleteTag(tag: Tag): Observable<{}> {
    const response = this.http
      .request('delete', endpoint + '/deleteTag', { body: tag })
      .pipe(
        // tap(_ => this.log(`deleted item id=${item.id}`)),
        catchError(this.handleError<Tag>('deleteTag'))
      );
    return response;
  }

  addTag(tag: Tag): Observable<Tag> {
    const response = this.http
      .post<Tag>(endpoint + '/createTag', tag, httpOptions)
      .pipe(
        // tap(_ => this.log(`deleted item id=${item.id}`)),
        catchError(this.handleError<Tag>('addTag'))
      );
    console.log('Adding Tag');
    // console.log('Response', response);
    return response;
  }

  // updateTag(tag: Tag) {
  //   const response = this.http
  //     .put(endpoint + 'INSERT STRING HERE', tag, httpOptions)
  //     .pipe(
  //       // tap(_ => this.log(`deleted item id=${item.id}`)),
  //       catchError(this.handleError<Tag>('updateTag'))
  //     );
  //   return response;
  // }

  getTagById(id: number): Observable<Tag> {
    const response = this.http
      .get<Tag>(endpoint + '/getTag/' + id, httpOptions)
      .pipe(
        // tap(_ => this.log(`deleted item id=${item.id}`)),
        catchError(this.handleError<Tag>('getTagById'))
      );
    return response;
  }

  getTagByName(name: string): Observable<Tag> {
    const response = this.http
      .get<Tag>(endpoint + '/getTag/name/' + name, httpOptions)
      .pipe(
        // tap(_ => this.log(`deleted item id=${item.id}`)),
        catchError(this.handleError<Tag>('getTagByName'))
      );
    return response;
  }
}
