<script setup lang="ts">
import { ref } from "vue";

interface Props {
  memo: Memo;
}

const props = defineProps<Props>();
const editorRef = ref(null);

// stop propagation (no bubbling)
const onDoubleClick = (e: MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();
};
</script>

<template>
  <div
    class="postit__container"
    @dblclick="onDoubleClick"
    :style="{ top: memo.position.y + 'px', left: memo.position.x + 'px' }"
  >
    <textarea
      ref="editorRef"
      placeholder="✍️ Write here..."
      :value="props.memo.content"
      :style="{
        width: memo.boundingRect.width + 'px',
        height: memo.boundingRect.height + 'px',
      }"
    />
  </div>
</template>

<style scoped>
.postit__container {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
}

.postit__container > textarea {
  width: 100%;
  flex-grow: 1;
  min-width: 196px;
  min-height: 64px;
}
</style>
