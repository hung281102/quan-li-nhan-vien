<template>
  <div class="form-group" :class="width">
    <div class="label">
      <label for="input">{{ label }}</label>
      <span v-if="isRequired">*</span>
    </div>
    <div class="gender-block">
      <div class="gender-item" v-for="option in options" :key="option">
        <input
          type="radio"
          name="gender"
          :id="option.value"
          :value="option.value"
          @input="updateValue"
          :checked="modelValue === option.value"
        />
        <label :for="option.value">{{ option.label }}</label>
      </div>
    </div>
    <span class="error-message">{{ errorMessage }}</span>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
const props = defineProps({
  label: { type: String, required: true },
  errorMessage: { type: String, required: false },
  isRequired: { type: Boolean, required: true },
  width: { type: String, required: true },
  modelValue: { type: Number, required: true },
  options: { type: Array, required: true },
});
const emits = defineEmits(["update:modelValue"]);

const updateValue = (event) => {
  // console.log(event.target.value);
  emits("update:modelValue", event.target.value);
};
</script>

<style lang="scss">
.form-group {
  display: flex;
  flex-direction: column;

  & .label {
    display: flex;
    gap: 4px;
    padding-bottom: 6px;
    & label {
      font-size: 14px;
      font-weight: 600;
    }
    & span {
      color: red;
    }
  }
  & .error-message {
    font-size: 13px;
    color: red;
    position: absolute;
    left: 0;
    bottom: -15px;
  }
  & .gender-block {
    display: flex;
    height: 28px;
    align-items: center;
    gap: 15px;
    & .gender-item {
      display: flex;
      align-items: center;
      gap: 4px;
      & label {
        font-size: 14px;
      }
    }
  }

  &.width-50 {
    width: 50%;
  }
  &.width-30 {
    width: 30%;
  }
  &.width-100 {
    width: 100%;
  }
}
</style>
