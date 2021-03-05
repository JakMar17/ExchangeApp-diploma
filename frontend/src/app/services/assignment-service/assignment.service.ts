import { Injectable } from '@angular/core';
import { interval, Observable, Subject } from 'rxjs';
import { AssignmentsApiService } from 'src/app/api/assignments-api/assignments-api.service';
import { Assignment } from 'src/app/models/assignment-model';
import { Course } from 'src/app/models/class-model';
import { UserServiceService } from '../user-service/user-service.service';

@Injectable({
  providedIn: 'root',
})
export class AssignmentService {
  constructor(
    private userService: UserServiceService,
    private assignmentApi: AssignmentsApiService
  ) {}

  public getCourseAssignments(course: Course): Observable<Assignment[]> {
    return this.assignmentApi.getAssignments(
      course.courseId,
      this.userService.bearer
    );
  }

  public inverseAssignmentVisibility(
    assignment: Assignment
  ): Observable<Assignment> {
    return this.assignmentApi.setAssignmentsVisibility(
      assignment.assignmentId,
      this.userService.bearer,
      !assignment.visible
    );
  }

  public getAssignment(assignment: Assignment): Observable<Assignment> {
    return this.assignmentApi.getAssignmentById(
      assignment.assignmentId,
      this.userService.bearer
    );
  }

  public getAssignmentWithSubmissions(
    assignment: Assignment
  ): Observable<Assignment> {
    return this.assignmentApi.getAssignmentWithSubmissions(
      assignment.assignmentId,
      this.userService.bearer
    );
  }

  public saveAssignment(
    assignment: Assignment,
    courseId: number
  ): Observable<Assignment> {
    return this.assignmentApi.postAssignment(
      courseId,
      assignment,
      this.userService.bearer
    );
  }

  public archiveAssignment(assignment: Assignment): Observable<Assignment> {
    return this.assignmentApi.archiveAssignment(
      assignment,
      this.userService.bearer
    );
  }

  public deleteAssignment(assignment: Assignment): Observable<boolean> {
    return this.assignmentApi.deleteAssignment(
      assignment.assignmentId,
      this.userService.bearer
    );
  }
}
