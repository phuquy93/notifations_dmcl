<template>
  <section class="page_404">
    <div class="container">
      <div class="text-center">
        <div class="four_zero_four_bg">
          <h1 class="text-center">404</h1>
        </div>

        <div class="contant_box_404">
          <h3 class="h2">Look like you're lost</h3>

          <p>the page you are looking for not avaible!</p>

          <router-link to="/location" class="link_404">Go to Home</router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "View-404",
};
</script>

<style>
.container {
  max-width: 700px;
  margin: 0 auto;
}
.text-center {
  text-align: center;
}
.page_404 {
  padding: 40px 0;
  background: #fff;
  font-family: "Arvo", serif;
}

.page_404 img {
  width: 100%;
}

.four_zero_four_bg {
  background-image: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif);
  background-repeat: no-repeat;
  height: 400px;
  background-position: center;
}

.four_zero_four_bg h1 {
  font-size: 80px;
}

.four_zero_four_bg h3 {
  font-size: 80px;
}

.link_404 {
  color: #fff !important;
  padding: 10px 20px;
  background: #39ac31;
  margin: 20px 0;
  display: inline-block;
}
.contant_box_404 {
  margin-top: -50px;
}
</style>