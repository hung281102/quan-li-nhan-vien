<template>
  <div class="combo-box" :class="width">
    <label for="" v-if="label">{{ label }}</label>
    <div class="combo-box-container" :class="[width ? 'width-full' : '']">
      <div class="combo-box-main" @click="toggleShowListItem">
        <div class="display-select">{{ displayText }}</div>
        <div class="select-icon">
          <div :class="{ rotate: isRotateIcon }"></div>
        </div>
      </div>
      <div class="combo-box-list" v-show="isShowListItem" :class="position">
        <div
          v-for="item in data"
          :key="item"
          class="item"
          @click="selectItem(item)"
        >
          {{ item[attributeDisplay] }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  defineProps,
  defineEmits,
  ref,
  watch,
  onMounted,
  onBeforeUpdate,
} from "vue";
const props = defineProps({
  data: { type: Array, required: true },
  modelValue: { type: Number, required: true },
  position: { type: String, required: true },
  label: { type: String, required: false },
  width: { type: String, required: false },
  attributeDisplay: { type: String, required: true },
  attributeBinding: { type: String, required: true },
  textDisplay: { type: String, required: false },
});

const emits = defineEmits(["update:modelValue"]);

const isShowListItem = ref(false);
const isRotateIcon = ref(false);
const displayText = ref(props.textDisplay);

// console.log(props.modelValue);
// console.log(props.data);

onMounted(() => {
  if (props.modelValue) {
    displayText.value = props.data.filter(
      (item) => item[props.attributeBinding] === props.modelValue
    )[0][props.attributeDisplay];
  }
});
onBeforeUpdate(() => {
  if (props.modelValue) {
    displayText.value = props.data.filter(
      (item) => item[props.attributeBinding] === props.modelValue
    )[0][props.attributeDisplay];
  }
});

const toggleShowListItem = () => {
  isShowListItem.value = !isShowListItem.value;
};

watch(isShowListItem, (newValue) => {
  if (newValue) {
    isRotateIcon.value = true;
  } else {
    isRotateIcon.value = false;
  }
});

const selectItem = (item) => {
  isShowListItem.value = false;
  displayText.value = props.data.filter(
    (i) => i[props.attributeBinding] === item[props.attributeBinding]
  )[0][props.attributeDisplay];

  emits("update:modelValue", item[props.attributeBinding]);
};
</script>

<style lang="scss">
.combo-box {
  display: flex;
  flex-direction: column;
  &.width-50 {
    width: 50%;
  }

  & label {
    margin-bottom: 6px;
    font-size: 14px;
    font-weight: 600;
  }
  &-container {
    position: relative;
    height: 28px;
    width: 200px;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid $border-color;
    &.width-full {
      width: 100%;
    }

    .combo-box-main {
      width: 100%;
      height: 100%;
      cursor: pointer;
      padding: 0 15px;
      .display-select {
        line-height: 28px;
        font-size: 13px;
        color: $text-color;
        user-select: none;
      }
      .select-icon {
        width: 24px;
        height: 28px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        right: 0;
        top: 0;
        & .rotate {
          transform: rotate(180deg);
        }
        & div {
          background: url("@/assets/imgs/Sprites.64af8f61.svg") no-repeat -467px -414px;
          width: 10px;
          height: 5px;
        }
      }
    }
    .combo-box-list {
      position: absolute;
      width: 100%;
      left: 0;

      border: 1px solid $border-color;
      z-index: 10;
      &.top {
        bottom: 28px;
      }
      &.bottom {
        top: 28px;
      }
      & .item {
        line-height: 24px;
        user-select: none;

        height: 24px;
        cursor: pointer;
        padding: 0 10px;
        transition: all 0.2s;
        background-color: #fff;
        font-size: 13px;
        color: $text-color;
        &:hover {
          background-color: $primary-color;
          color: #fff;
        }
      }
    }
  }
}
</style>
