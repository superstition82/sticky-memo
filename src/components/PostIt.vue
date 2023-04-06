<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useMemoStore } from "../store/memo";

interface Props {
  memo: Memo;
}

const props = defineProps<Props>();
const memoStore = useMemoStore();

const editorRef = ref<HTMLTextAreaElement>();
const resizeObserver = ref<ResizeObserver>();

onMounted(() => {
  if (!editorRef.value) {
    return;
  }
  resizeObserver.value = new window.ResizeObserver(() => {
    if (!editorRef.value) {
      return;
    }
    memoStore.updateMemoById(props.memo.id, {
      boundingRect: {
        width: editorRef.value.parentElement?.clientWidth as number,
        height: editorRef.value.clientHeight,
      },
      updatedAt: new Date(),
    });
  });
  resizeObserver.value.observe(editorRef.value);
});

onBeforeUnmount(() => {
  if (resizeObserver.value) {
    resizeObserver.value.disconnect();
  }
});

const handlePostItDblClick = (event: MouseEvent) => {
  event.preventDefault();
  event.stopPropagation();
};

const handleContentChange = (event: Event) => {
  const node = event.target as HTMLTextAreaElement;
  memoStore.updateMemoById(props.memo.id, {
    content: node.value,
    updatedAt: new Date(),
  });
};

const handlePostItMouseDown = (event: MouseEvent) => {
  const node = event.target as HTMLDivElement;
  const { left, top } = node.getBoundingClientRect();

  const dx = event.clientX - left;
  const dy = event.clientY - top;

  const handlePostItMove = (e: MouseEvent) => {
    memoStore.updateMemoById(props.memo.id, {
      position: {
        x: e.pageX - dx,
        y: e.pageY - dy,
      },
      updatedAt: new Date(),
    });
  };

  document.addEventListener("mousemove", handlePostItMove);
  document.addEventListener(
    "mouseup",
    () => {
      document.removeEventListener("mousemove", handlePostItMove);
    },
    {
      once: true,
    }
  );
};
</script>

<template>
  <div
    class="postit__container"
    :style="{ top: memo.position.y + 'px', left: memo.position.x + 'px' }"
    @dblclick="handlePostItDblClick"
  >
    <div class="postit__header" @mousedown="handlePostItMouseDown"></div>
    <textarea
      class="postit__editor"
      ref="editorRef"
      :value="props.memo.content"
      :style="{
        width: memo.boundingRect.width + 'px',
        height: memo.boundingRect.height + 'px',
      }"
      @change="handleContentChange"
    />
  </div>
</template>

<style>
.postit__container {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
}

.postit__container > .postit__header {
  width: 100%;
  height: 8px;
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  cursor: move;
}

.postit__container > .postit__editor {
  box-sizing: border-box;
  padding: 16px;
  background-color: #ffff99;
  border: none;
  outline: none;
  width: 100%;
  flex-grow: 1;
  min-width: 196px;
  min-height: 124px;
}
</style>
