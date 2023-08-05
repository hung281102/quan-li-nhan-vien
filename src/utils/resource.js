const resource = {
  API: {
    Employee: "https://localhost:44358/api/Employee",
    Department: "https://localhost:44358/api/Department",
  },
  FORM_MODE: {
    add: 1,
    edit: 2,
  },

  PAGING: [
    {
      text: "10 bản ghi trên trang",
      number: 10,
    },
    {
      text: "20 bản ghi trên trang",
      number: 20,
    },
    {
      text: "30 bản ghi trên trang",
      number: 30,
    },
    {
      text: "50 bản ghi trên trang",
      number: 50,
    },
  ],
  GENDER_OPTION: [
    { label: "Nam", value: 1 },
    { label: "Nữ", value: 0 },
    { label: "Khác", value: 2 },
  ],

  COLUMN_TABLE_EMPLOYEE: [
    {
      id: 1,
      name: "Tên nhân viên",
      attribute: "employeeName",
      width: 250,
      textAlign: "left",
    },
    {
      id: 2,
      name: "Mã nhân viên",
      attribute: "employeeCode",
      width: 200,
      textAlign: "left",
    },
    {
      id: 3,
      name: "Giới tính",
      attribute: "gender",
      width: 120,
      textAlign: "left",
    },
    {
      id: 4,
      name: "Ngày sinh",
      attribute: "dateOfBirth",
      width: 200,
      textAlign: "center",
    },
    {
      id: 5,
      name: "Phòng ban",
      attribute: "departmentName",
      width: 250,
      textAlign: "left",
    },
    {
      id: 6,
      name: "Vị trí công việc",
      attribute: "positionJob",
      width: 400,
      textAlign: "left",
    },
    {
      id: 7,
      name: "Lương",
      attribute: "salary",
      width: 200,
      textAlign: "right",
    },
    {
      id: 8,
      name: "Số điện thoại",
      attribute: "phoneNumber",
      width: 200,
      textAlign: "left",
    },
    {
      id: 9,
      name: "Địa chỉ",
      attribute: "address",
      width: 400,
      textAlign: "left",
    },
  ],
};
export default resource;
