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
  createdAt: Date;
  updatedAt: Date;
};
