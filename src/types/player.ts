export interface AgeGroup {
  id: number;
  name: string; // "U10", "U13", "U15"
  minAge: number;
  maxAge: number;
}

export interface PlayerProfileSummary {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  jerseyNumber: number;
  dateOfBirth: string;
  dominantFoot: 'Left' | 'Right' | 'Ambidextrous';
  ageGroups: AgeGroup[];
}