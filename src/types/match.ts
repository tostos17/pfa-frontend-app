export interface MatchFixture {
  id: number;
  opponentName: string;
  matchDate: string;
  venue: 'Home' | 'Away';
  status: 'SCHEDULED' | 'PLAYED' | 'CANCELLED';
  academyScore: number;
  opponentScore: number;
  notes?: string;
}

export interface GoldenBootNominee {
  playerProfileId: number;
  firstName: string;
  lastName: string;
  totalGoals: number;
  totalAssists: number;
  matchesPlayed: number;
  averageCoachRating: number;
}