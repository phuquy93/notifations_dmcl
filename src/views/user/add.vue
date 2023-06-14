<template>
  <!--  eslint-disable -->
  <el-dialog
    title="Thêm mới user"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose"
  >
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="Họ tên" prop="hoTen">
        <el-input v-model="ruleForm.hoTen"></el-input>
      </el-form-item>
      <el-form-item label="Tài khoản" prop="taiKhoan">
        <el-input v-model="ruleForm.taiKhoan"></el-input>
      </el-form-item>
      <el-form-item label="Mật khẩu" prop="matKhau">
        <el-input type="password" v-model="ruleForm.matKhau"></el-input>
      </el-form-item>
      <el-form-item label="Email" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="Số điện thoại" prop="soDt">
        <el-input v-model="ruleForm.soDt"></el-input>
      </el-form-item>
      <el-form-item label="Mã nhóm" prop="maNhom">
        <el-input v-model="ruleForm.maNhom"></el-input>
      </el-form-item>
      <el-form-item label="Loại người dùng" prop="maLoaiNguoiDung">
        <el-radio-group v-model="ruleForm.maLoaiNguoiDung">
          <el-radio label="01">Khách hàng</el-radio>
          <el-radio label="02">Quản trị</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="resetForm('ruleForm')">Hủy</el-button>
      <el-button
        type="primary"
        @click="submitForm('ruleForm')"
        :loading="loading"
        >Thêm</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "AddUser",
  data() {
    return {
      loading: false,
      ruleForm: {
        taiKhoan: "",
        matKhau: "",
        email: "",
        maNhom: "",
        hoTen: "",
        maLoaiNguoiDung: "01",
        soDt: "",
      },
      rules: {
        hoTen: [
          {
            required: true,
            message: "Họ tên không để trống",
            trigger: "blur",
          },
        ],
        taiKhoan: [
          {
            required: true,
            message: "Tài khoản không để trống",
            trigger: "blur",
          },
        ],
        matKhau: [
          {
            required: true,
            message: "Mật khẩu không để trống",
            trigger: "blur",
          },
        ],
        email: [
          {
            type: "email",
            message: "Email không đúng định dạng",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  props: ["dialogVisible"],
  methods: {
    handleClose() {
      this.$confirm("Bạn có chắc chắn muốn thoát?")
        .then(() => {
          this.resetForm("ruleForm");
        })
        .catch(() => {});
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/addUsers", this.ruleForm)
            .then(() => {
              this.resetForm(formName);
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        }
      });
    },
    resetForm(formName) {
      this.$parent.closeLog(false);
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style>
</style>