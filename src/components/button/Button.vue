<template>
  <div class="btn" :class="type">{{ title }}</div>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps({
  title: { type: String, required: true },
  type: { type: String, required: true },
});
</script>

<style lang="scss">
.btn {
  height: $hight-button;
  padding: 0 15px;
  border-radius: $border-radius;
  display: inline-block;
  line-height: $hight-button;
  color: $text-white;
  cursor: pointer;
  transition: all 0.2s;
  &.primary {
    background-color: $primary-color;
    &:hover {
      background-color: #1a8888;
    }
  }
  &.sub {
    background-color: transparent;
    color: $primary-color;
    border: 1px solid $primary-color;
    &:hover {
      background-color: $primary-color;
      color: #fff;
    }
  }
}
</style>
