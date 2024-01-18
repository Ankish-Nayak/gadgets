import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course, CourseAdapter } from '../models/course.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private baseUrl = 'http://api.myapp.com/courses';

  constructor(
    private http: HttpClient,
    private adapter: CourseAdapter,
  ) {}

  list(): Observable<Course[]> {
    const url = `${this.baseUrl}/`;
    return this.http
      .get(url)
      .pipe(
        map((data: any[]) => data.map((item: any) => this.adapter.adapt(item))),
      );
  }
}
