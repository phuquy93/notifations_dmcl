<template>
  <!--  eslint-disable -->
  <div>
    <el-input
      placeholder="Nhập tên user"
      v-model="search"
      class="input-with-select"
      style="width: 300px; max-width: 100%; margin-bottom: 20px"
    >
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <el-button
      style="margin-left: 20px"
      icon="el-icon-plus"
      type="primary"
      @click="dialogVisible = true"
      >Thêm mới</el-button
    >

    <el-table :data="users.users.items" border style="width: 100%">
      <el-table-column prop="hoTen" label="Hẹ tên" width="180">
      </el-table-column>
      <el-table-column prop="taiKhoan" label="Tài khoản" width="180">
      </el-table-column>
      <el-table-column prop="email" label="Email" width="180">
      </el-table-column>
      <el-table-column prop="soDt" label="Số điện thoại"> </el-table-column>
      <el-table-column
        prop="maLoaiNguoiDung"
        label="Loại người dùng"
        :formatter="formatMaloai"
      />
      <el-table-column fixed="right" label="Thao tác" width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="editRow(scope.$index, users.users.items)"
            type="text"
            size="small"
          >
            Sửa
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- Add -->
    <Adduser :dialogVisible="dialogVisible" />

    <!-- Pagintation -->
    <div class="block" style="margin-top: 10px"></div>
    <MyPagination
      ref="pager"
      :total="users.users.totalCount"
      @pagination="getList"
    />
  </div>
</template>

<script>
import Adduser from "./add";
export default {
  name: "View-user",
  data() {
    return {
      dialogVisible: false,
      search: "",
    };
  },
  components: { Adduser },
  created() {
    this.$store.dispatch("user/getUsers", { page: 1, numitem: 10 });
  },
  computed: {
    users() {
      return this.$store.state.user;
    },
  },
  methods: {
    getList(data) {
      this.$store.dispatch("user/getUsers", {
        page: data.page,
        numitem: data.limit,
      });
    },
    formatMaloai(value) {
      if (value.maLoaiNguoiDung == "QuanTri") {
        return "Quản trị";
      } else {
        return "Khách hàng";
      }
    },
    editRow(index, items) {
      console.log(index, items);
    },
    closeLog(data) {
      this.dialogVisible = data;
    },
  },
};
</script>
