<template>
  <!-- eslint-disable -->
  <div class="navbar">
    <div class="loaders" v-if="loading">
      <div class="loader"></div>
    </div>

    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <div class="right-menu">
      {{ user }}&nbsp;
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img
            src="/f778738c-e4f8-4870-b634-56703b4acafe.gif"
            class="user-avatar"
          />
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item> Home </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">Thoát</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import Hamburger from "@/components/Hamburger";
export default {
  name: "NavbarHead",
  data() {
    return {
      datamew: localStorage.getItem("vue_admin_token").split(","),
      index: 0,
      loading: false,
    };
  },
  components: {
    Hamburger,
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    user() {
      return this.$store.state.user.user;
    },
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    logout() {
      this.$confirm("Bạn có muốn thoát?", {
        confirmButtonText: "Chấp nhận",
        cancelButtonText: "Hủy",
        type: "warning",
      }).then(() => {
        this.datamew = [...this.datamew, "all"];
        this.loading = true;
        this.dangky();
      });
    },
    dangky() {
      let token = localStorage.getItem("tokenNoti");

      if (this.index < this.datamew.length) {
        this.actiondangky(token);
      }
    },
    actiondangky(token) {
      fetch("https://apiat.stdmcl.com:11443/api/v1/notice/removetopicgroup", {
        method: "post",
        body: JSON.stringify({
          tokens: token,
          topic: this.datamew[this.index],
        }),
      })
        .then((response) => response.json())
        .then(() => {
          this.index = this.index + 1;
          this.dangky(token);
          if (this.index == this.datamew.length) {
            this.loading = false;
            this.$store.dispatch("user/logout").then(() => {
              window.location.href = `/login?redirect=${this.$route.fullPath}`;
            });
          }
        })
        .catch(() => {
          this.index = this.index + 1;
          this.dangky(token);
          if (this.index == this.datamew.length) {
            this.loading = false;
            this.$store.dispatch("user/logout").then(() => {
              window.location.href = `/login?redirect=${this.$route.fullPath}`;
            });
          }
        });
      // fetch(
      //   "https://iid.googleapis.com/iid/v1/" +
      //     token +
      //     "/rel/topics/" +
      //     this.datamew[this.index],
      //   {
      //     method: "DELETE",
      //     headers: new Headers({
      //       Authorization:
      //         "key=AAAATtlc1vg:APA91bEkJBDCwl08yElFgZcJJd9BC-ZYcWi-NO55LThSv0Io4WKtm_sTE0kxQ4ySj2E7Oj1_UN0R7WuAkYNtffjX3oXqYuMeq17Ujyin1xVtZ5QJKgEEjuETTldTfZ4JwIp6znrUmLu9",
      //     }),
      //   }
      // )
      //   .then((response) => {
      //     if (response.status < 200 || response.status >= 400) {
      //       throw (
      //         "Error subscribing to topic: " +
      //         response.status +
      //         " - " +
      //         response.text()
      //       );
      //     }
      //     console.log('Subscribed to "' + this.datamew[this.index] + '"');
      //     localStorage.setItem("vue_admin_status_dk", true);
      //     this.index = this.index + 1;
      //     this.dangky(token);
      //     if (this.index == this.datamew.length) {
      //       this.loading = false;
      //       this.$store.dispatch("user/logout").then(() => {
      //         window.location.href = `/login?redirect=${this.$route.fullPath}`;
      //         // this.$router.push(`/login?redirect=${this.$route.fullPath}`);
      //       });
      //     }
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}

.loaders {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #fff;
  opacity: 0.7;
  z-index: 999;
  .loader {
    border: 16px solid #f3f3f3; /* Light grey */
    border-top: 16px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>


