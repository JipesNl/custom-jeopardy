export interface GameState {
  players: Player[];
  currentPlayer: string;
  currentQuestion: {
    board: string;
    categoryName: string;
    questionValue: number;
  } | null;
  currentPhase: Phases;
  phase: {
    board1: Board;
    board2: Board; // Empty object
    final: Question;
  };
}

export interface Board {
  categories: {
    name: string;
    questions: Question[];
  }[];
}

export interface Question {
  value: number;
  question: string;
  answer: string;
  available: boolean;
}

export interface Player {
  name: string;
  bank: number;
}

export type Phases = "board1" | "board2" | "final" | "leaderboard";
