import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilesApiService } from 'src/app/api/files-api/files-api.service';
import { SubmissionApiService } from 'src/app/api/submission-api/submission-api.service';
import { Assignment } from 'src/app/models/assignment-model';
import {
  Submission,
  SubmissionFilePair,
  UploadModel,
} from 'src/app/models/submission-model';
import { UserServiceService } from '../user-service/user-service.service';

@Injectable({
  providedIn: 'root',
})
export class SubmissionService {
  constructor(
    private submissionApi: SubmissionApiService,
    private userService: UserServiceService,
    private fileApi: FilesApiService
  ) {}

  public buySubmissions(
    assignment: Assignment,
    noOfSubmissions: number
  ): Observable<Submission[]> {
    return this.submissionApi.buySubmissions(
      this.userService.userLoggedIn.personalNumber,
      assignment.assignmentId,
      noOfSubmissions
    );
  }

  public getDetailedSubmission(submission: Submission): Observable<Submission> {
    return this.submissionApi.getSubmissionDetails(
      this.userService.userLoggedIn.personalNumber,
      submission.submissionId
    );
  }

  public uploadFiles(
    uploadPairs: SubmissionFilePair[],
    assignment: Assignment
  ): Observable<Assignment> {
    return this.fileApi.uploadFiles(
      uploadPairs,
      this.userService.userLoggedIn.personalNumber,
      assignment.assignmentId
    );
  }

  public downloadMySubmissions(assignment: Assignment): void {
    this.fileApi.downloadMySubmissions(
      this.userService.userLoggedIn.personalNumber,
      assignment.assignmentId
    );
  }

  public downloadSubmission(submission: Submission): void {
    this.fileApi.downloadSubmission(
      this.userService.userLoggedIn.personalNumber,
      submission.submissionId
    );
  }

  public getAllSubmissionsOfAssignment(
    assignment: Assignment
  ): Observable<Submission[]> {
    return this.submissionApi.getAllSubmissionsOfAssignment(
      this.userService.userLoggedIn.personalNumber,
      assignment.assignmentId
    );
  }
}