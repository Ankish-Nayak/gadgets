import { Injectable } from '@angular/core';
import { Adapter } from './adpater';

export class Course {
  constructor(
    public id: number,
    public code: string,
    public name: string,
    public created: string,
  ) {}
}

@Injectable({
  providedIn: 'root',
})
export class CourseAdapter implements Adapter<Course> {
  adapt(item: any): Course {
    return new Course(
      item.id,
      item.code,
      item.name,
      new Date(item.created).toString(),
    );
  }
}
