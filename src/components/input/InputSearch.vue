<template>
  <div class="input-block">
    <input
      type="text"
      class="input"
      placeholder="Search..."
      @input="updateValue"
    />
    <div class="search-icon">
      <div></div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
const props = defineProps({
  modelValue: { type: String, required: true },
});
const emits = defineEmits(["update:modelValue"]);

const updateValue = (e) => {
  emits("update:modelValue", e.target.value);
};
</script>

<style lang="scss">
.input-block {
  position: relative;
  width: 200px;
  height: 28px;

  & .input {
    width: 100%;
    height: 100%;
    outline: none;
    border-radius: $border-radius;
    border: 1px solid $border-color;
    padding: 0 10px;
    &:focus {
      border: 1px solid $primary-color;
    }
  }
  & .search-icon {
    width: 26px;
    height: 26px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 1px;
    bottom: 1px;
    cursor: pointer;

    & div {
      background: url("@/assets/imgs/Sprites.64af8f61.svg") no-repeat -992px -360px;
      width: 16px;
      height: 16px;
    }
  }
}
</style>
