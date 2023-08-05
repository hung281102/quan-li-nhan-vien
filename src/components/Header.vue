<template>
  <div class="header">
    <div class="header-left">
      <div class="icon">
        <div></div>
      </div>
      <div class="name-company">
        CÔNG TY TNHH SẢN XUẤT - THƯƠNG MẠI - DỊCH VỤ
      </div>
    </div>
    <div class="header-right">
      <div class="icon notification">
        <div class=""></div>
      </div>
      <div class="account">
        <div class="icon-account">
          <div></div>
        </div>
        <div class="account-name">Trần Quang Hưng</div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss">
.header {
  height: 50px;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 0 20px;
  justify-content: space-between;
  &-left {
    display: flex;
    gap: 15px;
    & .icon {
      width: 20px;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      & div {
        background: url("@/assets/imgs/Sprites.64af8f61.svg") no-repeat -847px -35px;
        width: 16px;
        height: 14px;
      }
    }
    & .name-company {
      font-size: 15px;
      line-height: 20px;
      color: #6c6666;
    }
  }
  &-right {
    display: flex;
    gap: 25px;
    align-items: center;
    & .notification {
      width: 25px;
      height: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      & div {
        background: url("@/assets/imgs/Sprites.64af8f61.svg") no-repeat -788px -30px;
        width: 22px;
        height: 25px;
      }
    }
    & .account {
      display: flex;
      align-items: center;
      gap: 10px;
      & .icon-account {
        & div {
          /* overflow: hidden; */
          border-radius: 50%;
          background: url("@/assets/imgs/Sprites.64af8f61.svg") no-repeat -352px -894px;
          width: 32px;
          height: 32px;
        }
      }
      &-name {
        font-size: 15px;
        font-weight: 600;
      }
    }
  }
}
</style>
