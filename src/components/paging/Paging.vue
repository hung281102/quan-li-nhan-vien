<template>
  <div class="paging">
    <div class="paging-index">
      <div
        class="prev"
        @click="setCurrentPage(selectedPage - 1)"
        :class="{ disablePaging: selectedPage == 1 }"
      >
        Trước
      </div>
      <!-- Trường hợp số page > 5  -->
      <div class="index" v-if="totalPage > 5">
        <div
          @click="setCurrentPage(1)"
          class="number-index"
          :class="{
            selected: selectedPage == 1,
          }"
        >
          {{ 1 }}
        </div>
        <div
          v-for="index in 5"
          :key="index"
          @click="setCurrentPage(selectedPage + index - 3)"
          class="number-index"
          :class="{
            selected: selectedPage == selectedPage + index - 3,
            hidden:
              totalPage < selectedPage + index - 3 ||
              1 > selectedPage + index - 3 ||
              selectedPage + index - 3 == 1 ||
              selectedPage + index - 3 == totalPage,
          }"
        >
          {{
            selectedPage + index - 3 == selectedPage + 2 ||
            selectedPage + index - 3 == selectedPage - 2
              ? "..."
              : selectedPage + index - 3
          }}
        </div>
        <div
          @click="setCurrentPage(totalPage)"
          class="number-index"
          :class="{
            selected: selectedPage == totalPage,
          }"
        >
          {{ totalPage }}
        </div>
      </div>
      <!-- Trường hợp tổng số page < 5 thì hiện hết -->
      <div class="index" v-if="totalPage <= 5">
        <div
          @click="setCurrentPage(index)"
          class="number-index"
          :class="{
            selected: selectedPage == index,
          }"
          v-for="index in totalPage"
          :key="index"
        >
          {{ index }}
        </div>
      </div>
      <div
        class="next"
        @click="setCurrentPage(selectedPage + 1)"
        :class="{ disablePaging: selectedPage == totalPage }"
      >
        Sau
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from "vue";

const props = defineProps({
  totalRecord: { type: Number, required: true, default: 0 },
  totalPage: { type: Number, required: true, default: 0 },
  modelValue: { type: Number, required: true, default: 1 },
});
const emits = defineEmits(["update:modelValue"]);
const selectedPage = ref(props.modelValue);

const setCurrentPage = (page) => {
  try {
    if (page > 0 && page <= props.totalPage) {
      //emit data
      emits("update:modelValue", page);
      //hiển thị page đc chọn
      selectedPage.value = page;
    }
  } catch (error) {
    console.log(error);
  }
};

watch(
  () => props.modelValue,
  (newValue, oldValue) => {
    selectedPage.value = newValue;
  }
);
</script>
<style lang="scss">
.paging {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  & .select-max-row {
    min-width: 200px;
  }
  &-index {
    height: 20px;
    display: flex;
    align-items: center;
    width: 100%;
    margin-left: 5px;
    cursor: pointer;
    & .index {
      height: 20px;
      margin-left: 5px;
      display: flex;
      align-items: center;
      & .number-index {
        height: 20px;
        margin-left: 5px;
        display: flex;
        align-items: center;
        padding: 0 6.5px;
        &.selected {
          border: 1px solid #00000021;
          color: #000;
          font-weight: 600;
        }
        &.hidden {
          display: none !important;
        }
      }
    }

    & .next,
    & .prev {
      height: 20px;
      margin-left: 5px;
      display: flex;
      align-items: center;
    }
  }
}

.disablePaging {
  cursor: not-allowed;
  color: #9e9e9e;
}
</style>
