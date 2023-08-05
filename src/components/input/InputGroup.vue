<template>
  <div class="form-group" :class="width">
    <div class="label">
      <label for="input">{{ label }}</label>
      <span v-if="isRequired">*</span>
    </div>
    <input
      class="input"
      id="input"
      :type="type"
      :placeholder="placeHolder"
      :class="[errorMessage && 'error']"
      :value="modelValue"
      ref="input"
      @input="updateValue"
    />
    <span class="error-message">{{ errorMessage }}</span>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
const props = defineProps({
  label: { type: String, required: true },
  placeHolder: { type: String, required: true },
  errorMessage: { type: String, required: false },
  isRequired: { type: Boolean, required: true },
  width: { type: String, required: true },
  type: { type: String, required: true },
  modelValue: { type: String, required: true },
});

const emits = defineEmits(["update:modelValue"]);

const updateValue = (e) => {
  emits("update:modelValue", e.target.value);
};
</script>

<style lang="scss">
.form-group {
  display: flex;
  flex-direction: column;
  position: relative;

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
  & .input {
    height: 28px;
    width: 100%;
    outline: none;
    border: 1px solid $border-color;
    border-radius: $border-radius;
    padding: 0 6px;
    margin-bottom: 6px;
    &:focus {
      border-color: $primary-color;
    }
    &.error {
      border-color: red;
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
