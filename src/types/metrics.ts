export interface IronManNominee {
  playerProfileId: number;
  firstName: string;
  lastName: string;
  totalSessions: number;
  sessionsAttended: number;
  punctualityCount: number;
  attendancePercentage: number;
}

export interface AttendanceSubmission {
  playerProfileId: number;
  status: 'PRESENT' | 'ABSENT' | 'EXCUSED';
  isPunctual: boolean;
  notes?: string;
}