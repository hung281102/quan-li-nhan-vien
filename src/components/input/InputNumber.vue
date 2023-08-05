<template>
  <div class="form-group" :class="width">
    <div class="label">
      <label for="input">{{ label }}</label>
      <span v-if="isRequired">*</span>
    </div>
    <input
      class="input"
      id="input"
      type="text"
      :placeholder="placeHolder"
      :class="[errorMessage && 'error']"
      :value="formattedValue"
      @keyup="handleInput"
      @keypress="allowOnlyNumbers"
      @input="updateValue"
    />
    <span class="error-message">{{ errorMessage }}</span>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch, onBeforeUpdate } from "vue";
import functions from "@/utils/functions";
const props = defineProps({
  label: { type: String, required: true },
  placeHolder: { type: String, required: true },
  errorMessage: { type: String, required: false },
  isRequired: { type: Boolean, required: true },
  width: { type: String, required: true },
  modelValue: { type: Number, required: true },
});
const emits = defineEmits(["update:modelValue"]);

const formattedValue = ref(0);

onBeforeUpdate(() => {
  // console.log(props.modelValue);
  formattedValue.value = functions.formatMoney(props.modelValue);
});
const arrayKey = ref([]);
// Xử lý khi có sự kiện nhập vào trường input
function handleInput(event) {
  if (event.keyCode >= 48 && event.keyCode <= 57) {
    arrayKey.value.push(event.key);
  } else if (event.keyCode === 8) {
    arrayKey.value.pop();
  }

  formattedValue.value = arrayKey.value
    .join("")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const updateValue = (event) => {
  emits("update:modelValue", Number(event.target.value.replace(/\./g, "")));
};

// Xử lý khi có sự kiện keypress trên trường input
function allowOnlyNumbers(event) {
  // Lấy mã ký tự từ sự kiện
  const charCode = event.charCode;

  // Kiểm tra nếu ký tự không phải là số thì ngăn không cho nhập
  if (charCode < 48 || charCode > 57) {
    event.preventDefault();
  }
}
</script>

<style lang="scss" scoped>
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
    text-align: right;
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
