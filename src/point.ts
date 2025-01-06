export type Point = Readonly<{
  x: number;
  y: number;
}>;

export const createPoint = (x: number, y: number): Point => ({ x, y });
