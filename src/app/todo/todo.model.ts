export const enum Mode {
  ALL,
  ACTIVE,
  COMPLETED,
}

export type Todo = {
  id: number;
  content: string;
  isComplete: boolean;
};
