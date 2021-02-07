import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { AssignmentStatus } from 'src/app/models/assignment-model';

@Pipe({
  name: 'assignmentStatus',
})
export class AssignmentStatusPipe implements PipeTransform {
  transform(
    assignmentStatus: AssignmentStatus,
    startDate: Date,
    endDate: Date | null
  ): string {
    if (assignmentStatus == AssignmentStatus.ARCHIVED) return 'arhivirano';

    const today = new Date().getTime();
    const startTime = startDate.getTime();
    const endTime = endDate == null ? null : endDate.getTime();
    
    if (today < startTime) return 'aktivno od ' + this.dateToString(startDate);
    else if (endTime == null) return 'aktivno';
    else if (today > endTime) return 'zaključeno';
    else return 'aktivno do ' + this.dateToString(endDate);
  }

  private dateToString(date: Date | null): string {
    if (date == null) return '';
    return (
      date.getDate() + '. ' + (date.getMonth() + 1) + '. ' + date.getFullYear()
    );
  }
}