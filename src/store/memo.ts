import { defineStore } from "pinia";

export type MemoState = { memoList: Memo[] };

const initialState: MemoState = { memoList: [] };

export const useMemoStore = defineStore("memo", {
  state: (): MemoState => initialState,
  actions: {
    addMemo(payload: Memo) {
      this.memoList = [...this.memoList, payload];
    },
    updateMemoById(id: string, partial: Partial<Memo>) {
      this.memoList = this.memoList.map((memo) => {
        if (memo.id === id) {
          return { ...memo, ...partial };
        }
        return memo;
      });
    },
    deleteMemoById(id: string) {
      this.memoList = this.memoList.filter((memo) => memo.id !== id);
    },
  },
});
