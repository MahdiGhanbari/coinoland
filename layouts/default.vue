<template>
  <el-container>
    <el-header class="row header">
      <div class="col-1"><img src="@/assets/images/logo.png" height="32" /></div>
      <div class="col"></div>
      <div class="col-4">
        <div class="header__buttons-wrapper">
          <el-button type="primary">فا</el-button>
          <el-button plain class="text-primary-1 content-3">Sign in</el-button>
          <el-badge :value="cartItemsCount" :hidden="!cartItemsCount" class="item">
            <el-button @click="dialogVisible = true" class="text-primary-1 content-3" plain>My Cart</el-button>
          </el-badge>
          <el-avatar :size="50">
            <img src="@/assets/images/user-profile.jpg" />
          </el-avatar>
        </div>
      </div>
    </el-header>
    <el-main class="main">
      <router-view />
    </el-main>
    <!-- dialog -->
  </el-container>
  <el-dialog title="My Cart" v-model="dialogVisible" width="40%" custom-class="custom-dialog">
    <div v-if="cartItemsCount" class="row dialog__content">
      <div class="col-auto col-sm-4  col-md-4"  v-for="(item, index) in myCart" :key="index">
        <product-card :data="item.product" :bought="true"/>
        <div class="dialog__actions">
          <el-input-number v-model="item.count" :min="1" :max="10" size="small"></el-input-number>
          <el-button @click="removeFromMyCart(index)" type="danger" size="small">Delete</el-button>
        </div>
      </div>
    </div>
    <el-empty v-else/>
  </el-dialog>
</template>

<script setup lang="ts">
import { useSystemStore } from '@/stores';
import { storeToRefs } from 'pinia';

const { dialogVisible, myCart, cartItemsCount} = storeToRefs(useSystemStore())

// methods
function removeFromMyCart(index: number) {
  myCart.value.splice(index, 1)
}

</script>

<style scoped lang="scss">
.header {
  align-items: center;

  &__buttons-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    & *+* {
      margin-inline-start: 12px;
    }
  }
}
.main {
  margin-inline: auto;
  max-width: 1600px;
}
.dialog {
  &__content {
    height: 300px;
    overflow-y: auto;
    padding: 2px;
  }
  &__actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
@media(max-width: 1600px) {
  .main {
    margin-inline: 5%;
  }
}
@media(max-width: 1200px) {
  .main {
    margin-inline: 8px;
  }
}
@media(max-width: 700px) {
  .main {
    margin-inline: 0;
  }
}
</style>
<style>
@media(max-width: 1200px) {
  .custom-dialog {
    width: 70%;
  }
}
@media(max-width: 700px) {
  .custom-dialog {
    width: 90%;
  }
}
@media (max-width: 600px) {
  .custom-dialog {
    margin: 0;
    width: 100%;
    height: 100%;
  }
}
</style>