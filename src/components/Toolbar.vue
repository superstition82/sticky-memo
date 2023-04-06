<script setup lang="ts">
const handleStopPropagation = (event: MouseEvent) => {
  event.stopPropagation();
};
</script>

<template>
  <footer class="toolbar__container" @dblclick="handleStopPropagation"></footer>
</template>

<style>
.toolbar__container {
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 7px 14px rgba(0, 0, 0, 0.05),
    0px 0px 3.12708px rgba(0, 0, 0, 0.08),
    0px 0px 0.931014px rgba(0, 0, 0, 0.17);
}

.toolbar__content {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
}
</style>
