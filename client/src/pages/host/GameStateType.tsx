export interface GameState {
  players: {
    name: string;
    bank: number;
  }[];
  currentPlayer: string;
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
