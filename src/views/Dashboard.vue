<script setup lang="ts">
import { v4 as uuid } from "uuid";
import { storeToRefs } from "pinia";
import { useMemoStore } from "../store/memo";
import PostIt from "../components/PostIt.vue";
import Toolbar from "../components/Toolbar.vue";

const memoStore = useMemoStore();

const { memoList } = storeToRefs(memoStore);

const handlDashboardDblClick = (e: MouseEvent) => {
  const mousePosition = {
    x: e.pageX,
    y: e.pageY,
  };
  const defaultBoundingRect = {
    width: 256,
    height: 128,
  };
  const now = Date.now();

  memoStore.addMemo({
    id: uuid(),
    content: "",
    boundingRect: defaultBoundingRect,
    position: mousePosition,
    createdAt: now,
    updatedAt: now,
  });
};
</script>

<template>
  <div class="dashboard__container" @dblclick="handlDashboardDblClick">
    <PostIt v-for="memo in memoList" :key="memo.id" :memo="memo" />
    <Toolbar />
  </div>
</template>

<style>
.dashboard__container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
