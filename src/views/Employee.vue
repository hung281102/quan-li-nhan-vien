<template>
  <div class="employee-container">
    <div class="container-title">
      <h1>Nhân viên</h1>
      <Button
        title="Thêm mới nhân viên"
        type="primary"
        @click="showFormEmployee"
      ></Button>
    </div>
    <div class="container-grid">
      <div class="container-grid-header">
        <div class="action-left"></div>
        <div class="action-right">
          <InputSearch v-model="searchKeyword" />
          <div class="icon reload-button" @click="reload">
            <div></div>
          </div>
          <div class="icon export-excel">
            <div></div>
          </div>
          <div class="icon setting-button">
            <div></div>
          </div>
        </div>
      </div>
      <div class="container-grid-table">
        <TableEmployee
          :data="dataEmployee"
          :columnData="resource.COLUMN_TABLE_EMPLOYEE"
          @reload="reload"
        ></TableEmployee>
      </div>
      <div class="container-grid-footer">
        <div class="some-employee">
          <span
            >Tổng số: <b>{{ sumRecord }}</b></span
          >
        </div>
        <div class="paging">
          <ComboBoxBasic
            :data="resource.PAGING"
            v-model="pageSize"
            position="top"
            attributeDisplay="text"
            attributeBinding="number"
          ></ComboBoxBasic>
          <Paging
            :totalRecord="sumRecord"
            :totalPage="totalPage"
            v-model="currentPage"
          ></Paging>
        </div>
      </div>
      <Loading v-if="isShowLoading"></Loading>
    </div>
  </div>
  <FormEmployee
    v-if="isShowFormEmployee"
    @closeForm="isShowFormEmployee = false"
    :data="employeeIdEdit"
    @reload="reload"
  ></FormEmployee>
  <ToastMessage
    state="Thành công"
    :description="messageToast"
    type="success"
    v-if="isShowToastMessage"
  ></ToastMessage>
</template>

<script setup>
import Button from "@/components/button/Button.vue";
import InputSearch from "@/components/input/InputSearch.vue";
import TableEmployee from "@/components/table/TableEmployee.vue";
import Paging from "@/components/paging/Paging.vue";
import ComboBoxBasic from "@/components/combo-box/ComboBoxBasic.vue";
import FormEmployee from "@/components/form/FormEmployee.vue";
import Loading from "@/components/loading/Loading.vue";
import ToastMessage from "@/components/toast-message/ToastMessage.vue";

import resource from "@/utils/resource.js";
import enums from "@/utils/enums.js";
import functions from "@/utils/functions.js";
import axios from "axios";
import { onMounted, reactive, ref, watch, provide } from "vue";

const dataEmployee = ref([]);

const pageIndex = ref(1);
const pageSize = ref(10);
const sumRecord = ref(0);
const currentPage = ref(1);
const totalPage = ref(null);
const recordPerPage = ref(10);
const isShowFormEmployee = ref(false);
const employeeIdEdit = ref("");
const formMode = ref("");
const departmentData = ref([]);
const isShowLoading = ref(false);
const searchKeyword = ref("");
const isShowToastMessage = ref(false);
const messageToast = ref("");
provide("isShowLoading", isShowLoading);
provide("employeeId", employeeIdEdit);
provide("isShowFormEmployee", isShowFormEmployee);
provide("formMode", formMode);
provide("departmentData", departmentData);
provide("isShowToastMessage", isShowToastMessage);
provide("messageToast", messageToast);

const getEmployee = async (pageIndex, pageSize, keyWord = "") => {
  isShowLoading.value = true;
  let api;
  if (!keyWord) {
    api = `${resource.API.Employee}/paging-and-search?pageIndex=${pageIndex}&pageSize=${pageSize}`;
  } else {
    api = `${resource.API.Employee}/paging-and-search?pageIndex=${pageIndex}&pageSize=${pageSize}&keyword=${keyWord}`;
  }
  await axios
    .get(api)
    .then((response) => {
      isShowLoading.value = false;

      dataEmployee.value = response.data.data.result;
      sumRecord.value = response.data.data.total;

      totalPage.value = Math.ceil(sumRecord.value / pageSize);
      // format
      dataEmployee.value = dataEmployee.value.map((employee) => {
        employee.gender = enums.GENDER[employee.gender];
        employee.dateOfBirth = functions.formatDate(
          employee.dateOfBirth,
          "dd-mm-yyyy"
        );
        employee.salary = functions.formatMoney(employee.salary);

        return {
          ...employee,
          gender: employee.gender,
          dateOfBirth: employee.dateOfBirth,
          salary: employee.salary,
        };
      });

      // currentPage.value = 1;
    })
    .catch((error) => {
      console.log(error);
    });
};
getEmployee(pageIndex.value, pageSize.value);

const reload = () => {
  getEmployee(pageIndex.value, pageSize.value);
};

watch(pageSize, (newValue) => {
  // console.log(newValue);
  getEmployee(1, newValue);
  currentPage.value = 1;
});

watch(currentPage, (newValue) => {
  // call api tăng page index

  getEmployee(newValue, pageSize.value);
});

//search
watch(searchKeyword, (newValue) => {
  console.log(newValue);
});

// form

const showFormEmployee = () => {
  formMode.value = resource.FORM_MODE.add;
  isShowFormEmployee.value = true;
  employeeIdEdit.value = "";
};

const getDepartment = async () => {
  await axios
    .get(`${resource.API.Department}/GetAll`)
    .then((response) => {
      departmentData.value = response.data.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
getDepartment();
</script>

<style lang="scss">
.employee-container {
  height: calc(100vh - 50px);

  padding: 0 15px 15px;
  background-color: #f1efef;

  & .container-title {
    height: 50px;
    align-items: center;
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #eee;
    & h1 {
      font-size: 26px;
    }
  }
  & .container-grid {
    width: 100%;
    height: calc(100% - 50px);
    background-color: #fff;
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    position: relative;
    &-header {
      height: 50px;
      width: 100%;
      padding: 0 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      & .action-right {
        display: flex;
        gap: 10px;
        & .icon {
          width: 30px;
          height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }
        & .reload-button {
          & div {
            width: 20px;
            height: 21px;
            background: url("@/assets/imgs/Sprites.64af8f61.svg") no-repeat -1098px -90px;
          }
        }
        & .export-excel {
          & div {
            background: url("@/assets/imgs/Sprites.64af8f61.svg") no-repeat -1265px -90px;
            width: 23px;
            height: 20px;
          }
        }
        & .setting-button {
          & div {
            background: url("@/assets/imgs/Sprites.64af8f61.svg") no-repeat -1378px -89px;
            width: 20px;
            height: 22px;
          }
        }
      }
    }
    &-table {
      width: 100%;
      max-height: calc(100% - 90px);
      border: 1px solid $border-color-table;
      border-bottom-color: transparent;
      border-right-color: transparent;
      border-left-color: transparent;

      &::-webkit-scrollbar {
        width: 0;
      }
      &::-webkit-scrollbar-thumb {
        background-color: transparent;
      }
      &::-webkit-scrollbar:horizontal {
        height: 10px;
      }
      &::-webkit-scrollbar-thumb:horizontal {
        background-color: #a5a5a5;
        border-radius: 4px;
      }
      overflow: auto;
    }
    &-footer {
      width: 100%;
      height: 40px;
      margin-top: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      border-top: 1px solid $border-color-table;
    }
  }
}
</style>
