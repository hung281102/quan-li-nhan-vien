<template>
  <div class="dialog">
    <div class="overlay"></div>
    <div class="dialog-container">
      <h3 class="title">{{ title }}</h3>
      <p class="desc">{{ description }}</p>
      <div class="footer">
        <Button type="sub" title="Huỷ" @click="close"></Button>
        <Button type="primary" title="Xoá" @click="action"></Button>
      </div>
      <div class="close-button" @click="close">
        <div></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from "@/components/button/Button.vue";
import { defineProps, defineEmits } from "vue";
const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
});
const emits = defineEmits(["close"]);

const close = () => {
  emits("close");
};
const action = () => {
  if (props.type === "delete") {
    emits("delete");
  }
};
</script>

<style lang="scss" scoped>
.dialog {
  position: relative;
  & .overlay {
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.15);
    z-index: 99;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  &-container {
    z-index: 100;
    position: fixed;
    top: 50%;
    left: 50%;
    width: 350px;
    height: 160px;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 10px;
    display: flex;
    flex-direction: column;
    & .title {
      font-size: 24px;
      padding: 10px 0;
    }
    & .footer {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: auto;
    }
    & .close-button {
      width: 20px;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 20px;
      right: 20px;
      & div {
        background: url("@/assets/imgs/Sprites.64af8f61.svg") no-repeat -147px -147px;
        width: 18px;
        height: 18px;
      }
    }
  }
}
</style>
