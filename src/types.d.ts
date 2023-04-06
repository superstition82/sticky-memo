type Position = {
  x: number;
  y: number;
};

type BoundingRect = {
  width: number;
  height: number;
};

type Memo = {
  id: string;
  content: string;
  boundingRect: BoundingRect;
  position: Position;
  createdAt: number;
  updatedAt: number;
};
