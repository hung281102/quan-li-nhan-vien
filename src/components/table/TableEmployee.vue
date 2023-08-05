<template>
  <div class="table-container">
    <div class="table">
      <div class="table-head">
        <div class="h-column" style="min-width: 35px">
          <input type="checkbox" />
        </div>
        <div
          v-for="column in columnData"
          :key="column.id"
          class="h-column"
          :style="{ 'min-width': column.width + 'px' }"
        >
          <span :style="{ 'text-align': column.textAlign }">
            {{ column.name }}
          </span>
        </div>
        <div class="h-column" style="min-width: 120px">
          <span>Chức năng</span>
        </div>
      </div>
      <div class="table-body">
        <div class="b-row" v-for="employee in data" :key="employee.employeeID">
          <div class="b-column" style="min-width: 35px">
            <input type="checkbox" />
          </div>
          <div
            class="b-column"
            v-for="column in columnData"
            :key="column.id"
            :style="{ 'min-width': column.width + 'px' }"
          >
            <span :style="{ 'text-align': column.textAlign }">
              {{ employee[column.attribute] }}
            </span>
          </div>
          <div class="b-column" style="min-width: 120px">
            <div class="block-function">
              <span @click="openFormEdit(employee)">Sửa</span>
              <div
                class="icon-function"
                :class="{
                  border:
                    isShowOptionList && employee.employeeID === idEmployeeClick,
                }"
                @click="openOptionList($event, employee)"
              >
                <div class="div-icon-function"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <teleport to="body">
    <ul
      class="option-list"
      :style="{ top: `${posOptionY}px`, right: '45px' }"
      v-show="isShowOptionList"
    >
      <li class="option-item" @click="warningDelete">Xoá</li>
      <li class="option-item">Nhân bản</li>
    </ul>
  </teleport>
  <Dialog
    title="Xoá nhân viên"
    description="Bạn có chắc chắn muốn xoá không"
    type="delete"
    v-if="isShowDialog"
    @close="isShowDialog = false"
    @delete="deleteEmployee"
  ></Dialog>
</template>

<script setup>
import Loading from "@/components/loading/Loading.vue";
import Dialog from "@/components/dialog/Dialog.vue";
import { defineProps, defineEmits, ref, watch, inject } from "vue";
import functions from "@/utils/functions.js";
import resource from "@/utils/resource.js";
import axios from "axios";

const props = defineProps({
  columnData: { type: Array, required: true },
  data: { type: Array, required: true },
});

const emits = defineEmits(["reload"]);

const isShowOptionList = ref(false);
const posOptionY = ref(null);
const isShowDialog = ref(false);

let idEmployeeClick = inject("employeeId");
let isShowFormEdit = inject("isShowFormEmployee");
let formMode = inject("formMode");
let isShowLoading = inject("isShowLoading");

const openFormEdit = (employee) => {
  isShowFormEdit.value = true;
  idEmployeeClick.value = employee.employeeID;
  formMode.value = resource.FORM_MODE.edit;
};

const openOptionList = (event, employee) => {
  // console.log(employee);
  idEmployeeClick.value = employee.employeeID;

  isShowOptionList.value = !isShowOptionList.value;
  let heightContent = 165;
  if (window.innerHeight - event.clientY < heightContent) {
    posOptionY.value = event.clientY - 15 - 170;
  } else {
    posOptionY.value = event.clientY + 15;
  }
};

const clickOutSide = (e) => {
  if (
    !e.target.classList.contains("option-item") &&
    !e.target.classList.contains("option-list") &&
    !e.target.classList.contains("icon-function") &&
    !e.target.classList.contains("div-icon-function")
  ) {
    isShowOptionList.value = false;
  }
};
watch(isShowOptionList, () => {
  if (isShowOptionList.value) {
    document.addEventListener("click", clickOutSide);
  } else {
    document.removeEventListener("click", clickOutSide);
  }
});

const warningDelete = () => {
  isShowDialog.value = true;
};

const deleteEmployee = () => {
  // console.log(idEmployeeClick.value);
  isShowOptionList.value = false;
  isShowLoading.value = true;
  isShowDialog.value = false;

  axios
    .delete(`${resource.API.Employee}/${idEmployeeClick.value}`)
    .then((response) => {
      console.log(response);
      isShowLoading.value = false;
      emits("reload");
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>

<style lang="scss">
.table {
  width: 100%;
  height: 100%;
  /* border: 1px solid #b9b9b9; */
  position: relative;
  /* overflow-x: auto; */
  &-head {
    width: 100%;
    display: flex;
    height: 28px;
    position: sticky;
    top: 0;
    z-index: 3;

    & .h-column {
      background-color: #e9e8e8;
      border-right: 1px solid $border-color-table;
      /* border-bottom: 1px solid $border-color-table; */

      height: 100%;
      display: flex;
      align-items: center;
      padding: 0 12px;
      z-index: 1;
      text-transform: uppercase;
      &:nth-child(10) {
        border-right: 1px solid transparent;
      }
      &:last-child {
        border-right: 1px solid transparent;
        border-left: 1px solid $border-color-table;
        position: sticky;
        right: 0;
        top: 0;
        z-index: 2;
      }
      &:first-child {
        position: sticky;
        left: 0;
        top: 0;
        z-index: 2;
      }
      & span {
        font-size: 12px;
        font-weight: 600;
        color: $text-color;
        width: 100%;
      }
    }
  }
  &-body {
    & .b-row {
      height: 30px;
      display: flex;
      &:last-child {
        & .b-column {
          border-bottom: 1px solid $border-color-table;
        }
      }
      & .b-column {
        border-right: 1px solid $border-color-table;
        border-top: 1px solid $border-color-table;
        background-color: #fff;

        height: 100%;
        display: flex;
        align-items: center;
        padding: 0 12px;
        z-index: 1;
        &:nth-child(10) {
          border-right: 1px solid transparent;
        }
        &:last-child {
          border-right: 1px solid transparent;
          border-left: 1px solid $border-color-table;
          position: sticky;
          right: 0;
          top: 0;
          z-index: 2;
          display: flex;
          justify-content: center;
          align-items: center;
          /* border-bottom: 1px solid $border-color-table; */
        }
        &:first-child {
          position: sticky;
          left: 0;
          top: 0;
          z-index: 2;
          /* border-bottom: 1px solid $border-color-table; */
        }
        & span {
          font-size: 13px;
          color: $text-color;
          width: 100%;
        }
        & .block-function {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          & span {
            color: rgba(1, 117, 193, 1);
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
          }
          & .icon-function {
            width: 26px;
            height: 14px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            &.border {
              border: 1px solid rgba(1, 117, 193, 1);
            }
            & div {
              background: url("@/assets/imgs/Sprites.64af8f61.svg") no-repeat -900px -365px;
              width: 8px;
              height: 5px;
            }
          }
        }
      }
    }
  }
}
.option-list {
  position: absolute;
  z-index: 9999;
  background-color: #fff;
  border: 1px solid $border-color;
  & .option-item {
    height: 24px;
    font-size: 13px;
    line-height: 24px;
    cursor: pointer;
    padding: 0 10px;
    color: $text-color;
    transition: all 0.2s;
    &:hover {
      background-color: $primary-color;
      color: #fff;
    }
  }
}
</style>