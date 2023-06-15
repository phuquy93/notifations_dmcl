<template>
  <div>
    <!-- <form class="el-form ad-form-query el-form--inline">
      <div class="el-form-item el-form-item--mini">
        <div class="el-form-item__content">
          <div class="el-input el-input--mini">
            <input
              type="text"
              autocomplete="off"
              placeholder="Vị trí"
              class="el-input__inner"
            />
          </div>
        </div>
      </div>
      <div class="el-form-item el-form-item--mini">
        <div class="el-form-item__content">
          <button
            type="button"
            class="el-button el-button--primary el-button--mini"
            @click="handleSend"
          >
            <span>Xác nhận</span>
          </button>
        </div>
      </div>
    </form> -->
  </div>
</template>

<script>
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBybXVFqAgaUaVQFAzmMURY2Vr8chUmDPw",
  appId: "1:338654189304:web:06207aa1b23282f4c9cd0d",
  messagingSenderId: "338654189304",
  projectId: "dmclmobileapp",
  authDomain: "dmclmobileapp.firebaseapp.com",
  databaseURL: "https://dmclmobileapp.firebaseio.com",
  storageBucket: "dmclmobileapp.appspot.com",
  measurementId: "G-LG7B1Q7LJ4",
};
// eslint-disable-next-line
const app = initializeApp(firebaseConfig);
let statusDk = localStorage.getItem("vue_admin_status_dk");
let datamew = localStorage.getItem("vue_admin_token").split(",");
let index = 0;
datamew = [...datamew, "all"];

const messaging = getMessaging();

onMessage(messaging, (payload) => {
  console.log("Message received. ", payload);
  // ...
});

getToken(messaging, {
  vapidKey:
    "BMaESjdyXISGbQmjrtM5MqXOYRPgHh__zCrXYDylQiGdKcweWkaP4WbzPK8f9tAIfVVJPXRLevThyWV9x2-bV2Q",
})
  .then((currentToken) => {
    if (currentToken) {
      console.log("Token started: " + currentToken);
      localStorage.setItem("tokenNoti", currentToken);
      if (!statusDk && statusDk == null) {
        dangky(currentToken);
      }
    } else {
      // Show permission request UI
      console.log(
        "No registration token available. Request permission to generate one."
      );
    }
  })
  .catch((err) => {
    console.log("An error occurred while retrieving token. ", err);
  });
function dangky(token) {
  if (index < datamew.length) {
    actiondangky(token);
  }
}
function actiondangky(token) {
  fetch(
    "https://iid.googleapis.com/iid/v1/" +
      token +
      "/rel/topics/" +
      datamew[index],
    {
      method: "POST",
      headers: new Headers({
        Authorization:
          "key=AAAATtlc1vg:APA91bEkJBDCwl08yElFgZcJJd9BC-ZYcWi-NO55LThSv0Io4WKtm_sTE0kxQ4ySj2E7Oj1_UN0R7WuAkYNtffjX3oXqYuMeq17Ujyin1xVtZ5QJKgEEjuETTldTfZ4JwIp6znrUmLu9",
      }),
    }
  )
    .then((response) => {
      if (response.status < 200 || response.status >= 400) {
        throw (
          "Error subscribing to topic: " +
          response.status +
          " - " +
          response.text()
        );
      }
      console.log('Subscribed to "' + datamew[index] + '"');
      localStorage.setItem("vue_admin_status_dk", true);
      index++;
      dangky(token);
    })
    .catch((error) => {
      console.error(error);
    });
}

export default {
  name: "View-so-immediate",
  computed: {
    store() {
      return this.$store.state.user.store;
    },
    token() {
      return this.$store.state.user.token;
    },
  },
};
</script>

