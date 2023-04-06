import { defineStore } from "pinia";

type MemoState = { memoList: Memo[] };

const initialState: MemoState = { memoList: [] };

export const useMemoStore = defineStore("memo", {
  state: (): MemoState => initialState,
  persist: true,
  actions: {
    addMemo(payload: Memo) {
      this.memoList = [...this.memoList, payload].sort(
        (a, b) => a.updatedAt - b.updatedAt
      );
    },
    updateMemoById(id: string, partial: Partial<Memo>) {
      const memoIndex = this.memoList.findIndex((memo) => memo.id === id);
      if (memoIndex !== -1) {
        this.memoList[memoIndex] = {
          ...this.memoList[memoIndex],
          ...partial,
        };
      }
      this.memoList = [...this.memoList].sort(
        (a, b) => a.updatedAt - b.updatedAt
      );
    },
    deleteMemoById(id: string) {
      this.memoList = this.memoList.filter((memo) => memo.id !== id);
    },
  },
});
