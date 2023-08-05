<template>
  <div class="container-loading">
    <div class="loading"></div>
  </div>
</template>
<script>
export default {};
</script>
<style>
.container-loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.15);
  width: 100%;
  height: 100%;
  z-index: 99999;
}
.loading {
  width: 32px;
  height: 32px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-image: url("@/assets/imgs/loading.svg");
  background-repeat: no-repeat;
  animation: loading-spin infinite 2s linear;
  display: flex;
  justify-content: center;
  align-items: center;
}
@keyframes loading-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
