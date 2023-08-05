<template>
  <div class="toast-message">
    <div class="icon">
      <div></div>
    </div>
    <div class="state">
      {{ state }}
    </div>
    <div class="desc">
      {{ description }}
    </div>
    <div class="close-btn">
      <div></div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
const props = defineProps({
  state: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
});
const emits = defineEmits(["close"]);
</script>

<style lang="scss" scoped>
.toast-message {
  height: 60px;
  width: 400px;
  padding: 0 10px;
  background-color: #fff;
  display: flex;
  align-items: center;
  position: fixed;
  top: 60px;
  right: 40px;
  border-radius: 4px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  z-index: 9999;
  & .icon,
  & .close-btn {
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    & div {
      background: url("@/assets/imgs/Sprites.64af8f61.svg") no-repeat -1602px -258px;
      width: 20px;
      height: 20px;
    }
  }
  & .close-btn {
    margin-left: auto;
    cursor: pointer;
    & div {
      background: url("@/assets/imgs/Sprites.64af8f61.svg") no-repeat -1177px -362px;
      width: 13px;
      height: 12px;
    }
  }
  & .state {
    font-size: 16px;
    color: green;
    padding: 0 6px;
  }
  & .desc {
    font-size: 16px;
    color: $text-color;
  }
}
</style>
