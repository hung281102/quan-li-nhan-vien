<template>
  <div class="form">
    <div class="form-overlay"></div>
    <div class="form-container">
      <div class="form-title">{{ titleForm }}</div>
      <div class="form-main">
        <div class="form-row">
          <InputGroup
            label="Mã nhân viên"
            ref="employeeCodeElm"
            :isRequired="true"
            placeHolder="Nhập mã nhân viên"
            width="width-50"
            type="text"
            :blur="validateEmployeeCode"
            :errorMessage="errorMessage.employeeCode"
            v-model="employeeObject.employeeCode"
          ></InputGroup>
          <InputGroup
            label="Tên nhân viên"
            :isRequired="true"
            placeHolder="Nhập tên"
            width="width-50"
            type="text"
            :blur="validateEmployeeName"
            v-model="employeeObject.employeeName"
            :errorMessage="errorMessage.employeeName"
          ></InputGroup>
        </div>
        <div class="form-row">
          <InputGroup
            label="Ngày sinh"
            :isRequired="false"
            width="width-50"
            type="date"
            v-model="employeeObject.dateOfBirth"
          ></InputGroup>
          <InputGender
            label="Giới tính"
            :isRequired="false"
            width="width-50"
            :options="resource.GENDER_OPTION"
            v-model="employeeObject.gender"
          ></InputGender>
        </div>
        <div class="form-row">
          <ComboBoxBasic
            :data="departmentData"
            position="bottom"
            label="Phòng ban"
            width="width-50"
            attributeDisplay="departmentName"
            attributeBinding="departmentID"
            textDisplay="-Chọn phòng ban-"
            v-model="employeeObject.departmentID"
            :errorMessage="errorMessage.department"
            :blur="validateDepartment"
          ></ComboBoxBasic>
          <InputGroup
            label="Số điện thoại"
            :isRequired="false"
            placeHolder="Nhập số điện thoại"
            width="width-50"
            type="text"
            v-model="employeeObject.phoneNumber"
          ></InputGroup>
        </div>
        <div class="form-row">
          <InputGroup
            label="Vị trí công việc"
            placeHolder="Nhập vị trí công việc"
            :isRequired="false"
            width="width-100"
            type="text"
            v-model="employeeObject.positionJob"
          ></InputGroup>
        </div>
        <div class="form-row">
          <InputGroup
            label="Địa chỉ"
            placeHolder="Nhập địa chỉ"
            :isRequired="false"
            width="width-100"
            type="text"
            v-model="employeeObject.address"
          ></InputGroup>
        </div>
        <div class="form-row">
          <InputNumber
            label="Lương"
            placeHolder="0"
            :isRequired="false"
            width="width-50"
            type="number"
            v-model="employeeObject.salary"
          ></InputNumber>
        </div>
      </div>
      <div class="form-footer">
        <Button title="Huỷ" type="sub" @click="closeFormEmployee"></Button>
        <div class="button-right">
          <Button :title="titleButton" type="primary" @click="submit"></Button>
        </div>
      </div>
      <div class="close-button" @click="closeFormEmployee">
        <div></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import InputGroup from "@/components/input/InputGroup.vue";
import InputGender from "@/components/input/InputGender.vue";
import InputNumber from "@/components/input/InputNumber.vue";
import Button from "@/components/button/Button.vue";
import ComboBoxBasic from "@/components/combo-box/ComboBoxBasic.vue";
import { defineEmits, defineProps, inject, onMounted, ref } from "vue";
import axios from "axios";
import resource from "@/utils/resource.js";
import functions from "@/utils/functions.js";

const props = defineProps({
  data: { type: String, required: false },
  mode: { type: String, required: true },
});
const emits = defineEmits(["closeForm", "reload"]);

const employeeCodeElm = ref(null);
const employeeObject = ref({
  employeeName: "",
  employeeCode: "",
  gender: 1,
  dateOfBirth: "",
  departmentID: "",
  address: "",
  phoneNumber: "",
  positionJob: "",
  salary: 0,
});
const titleForm = ref("");
const titleButton = ref("");
const errorMessage = ref({
  employeeCode: "",
  employeeName: "",
  department: "",
});

let departmentData = inject("departmentData");
let idEmployee = inject("employeeId");
let isShowFormEmployee = inject("isShowFormEmployee");
let formMode = inject("formMode");
let isShowLoading = inject("isShowLoading");
let isShowToastMessage = inject("isShowToastMessage");
let messageToast = inject("messageToast");

// Hàm lấy mã nhân viên mơí
const getNewEmployeeCode = async () => {
  await axios
    .get(`${resource.API.Employee}/new-employee-code`)
    .then((response) => {
      // console.log(response);
      employeeObject.value.employeeCode = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

// Thực hiện hành động theo từng mode
if (formMode.value === resource.FORM_MODE.add) {
  titleForm.value = "Thêm mới nhân viên";
  titleButton.value = "Thêm mới";
  getNewEmployeeCode();
} else if (formMode.value === resource.FORM_MODE.edit) {
  titleForm.value = "Sửa nhân viên";
  titleButton.value = "Cập nhật";
}
// Hàm thêm mới nhân viên
const save = async () => {
  isShowLoading.value = true;

  // Với mode add
  if (formMode.value === resource.FORM_MODE.add) {
    await axios
      .post(`${resource.API.Employee}`, employeeObject.value)
      .then((response) => {
        messageToast.value = "Thêm thành công";
        isShowToastMessage.value = true;
        setTimeout(() => {
          isShowToastMessage.value = false;
        }, 2000);
        isShowLoading.value = false;
        isShowFormEmployee.value = false;
        emits("reload");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Với mode sửa
  else if (formMode.value === resource.FORM_MODE.edit) {
    console.log("call api sua");
    await axios
      .put(`${resource.API.Employee}/${idEmployee.value}`, employeeObject.value)
      .then((response) => {
        messageToast.value = "Cập nhật thành công";
        isShowToastMessage.value = true;
        setTimeout(() => {
          isShowToastMessage.value = false;
        }, 2000);
        isShowLoading.value = false;
        isShowFormEmployee.value = false;
        emits("reload");
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
// Hàm lấy thông tin nhân viên theo id (mode edit)
const getEmployeeById = async (id) => {
  await axios
    .get(`${resource.API.Employee}/${id}`)
    .then((response) => {
      employeeObject.value = response.data.data;
      employeeObject.value.dateOfBirth =
        employeeObject.value.dateOfBirth.split("T")[0];
    })
    .catch((error) => {
      console.log(error);
    });
};

// Nếu có id truyền vào thì mới gọi hàm lấy thông tin theo id
if (idEmployee.value) {
  getEmployeeById(idEmployee.value);
}

// Focus vào input mã nhân viên
onMounted(() => {
  employeeCodeElm.value.$refs.input.focus();
});

// Hàm đóng form
const closeFormEmployee = () => {
  emits("closeForm");
};

// Validate
// Validate mã nhân viên
const validateEmployeeCode = () => {
  try {
    if (
      employeeObject.value.employeeCode.trim() === "" &&
      employeeObject.value.employeeCode !== null
    ) {
      errorMessage.value.employeeCode = "Mã nhân viên không được trống";
    } else {
      errorMessage.value.employeeCode = "";
    }
  } catch (err) {
    console.log(err);
  }
};
// Validate tên
const validateEmployeeName = () => {
  try {
    if (
      employeeObject.value.employeeName.trim() === "" &&
      employeeObject.value.employeeName !== null
    ) {
      errorMessage.value.employeeName = "Tên nhân viên không được để trống";
    } else {
      errorMessage.value.employeeName = "";
    }
  } catch (err) {
    console.log(err);
  }
};

// Validate phòng ban
const validateDepartment = () => {
  try {
    if (!employeeObject.value.departmentID) {
      errorMessage.value.department = "Phòng ban không để trống";
    } else {
      errorMessage.value.department = "";
    }
  } catch (err) {
    console.log(err);
  }
};

// Kiểm tra
const validate = () => {
  try {
    validateEmployeeCode();
    validateEmployeeName();
    validateDepartment();

    if (
      !errorMessage.value.employeeName &&
      !errorMessage.value.employeeCode &&
      !errorMessage.value.department
    ) {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
  }
};

//
const submit = () => {
  if (validate()) {
    save();
  }
};
</script>

<style lang="scss">
.form {
  &-overlay {
    z-index: 99;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
  }
  &-container {
    z-index: 100;
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 40vw;
    background-color: #fff;
    padding: 20px;
    display: flex;
    flex-direction: column;
    & .close-button {
      position: absolute;
      top: 20px;
      right: 20px;

      width: 20px;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      & div {
        background: url("@/assets/imgs/Sprites.64af8f61.svg") no-repeat -147px -147px;
        width: 18px;
        height: 18px;
      }
    }
    & .form-title {
      font-size: 25px;
      font-weight: 600;
      padding-bottom: 20px;
    }
    & .form-main {
      & .form-row {
        display: flex;
        gap: 20px;
        margin-bottom: 20px;
      }
    }
    & .form-footer {
      height: 40px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: auto;
      & .button-right {
        display: flex;
        gap: 20px;
      }
    }
  }
}
</style>
