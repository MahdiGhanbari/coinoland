<template>
  <article class="card">
    <div class="card__image-cover">
      <img :src="getImage(props.data.image)"/>
    </div>
    <h2 class="subtitle-2 text-black-1 card__title">{{ props.data.name }}</h2>
    <p class="card__desc content-2 text-black-1">{{ props.data.description }}</p>
    <div class="card__price-wrapper">
      <div class="card__price">{{ props.data.price }} $</div>
      <template v-if="props.data.off">
        <el-tag v-if="isCool" size="small" type="danger">Cool deal!</el-tag>
        <el-tag v-else size="small" type="success">{{ props.data.off }}% Off</el-tag>
      </template>
    </div>
    <div class="card__actions">
      <el-rate class="col-auto" allow-half :model-value="props.data.rate" disabled show-score />
      <el-button v-if="!props.bought" @click="addToMyCart(props.data)" size="small" class="col-2 text-primary-1">Add</el-button>
    </div>
  </article>  
</template>

<script setup lang="ts">
import { Product } from '@/utils/classes'
import { storeToRefs } from 'pinia';
import { useSystemStore } from '@/stores';


// props 
const props = defineProps<{
  data: Product
  bought?: Boolean
}>()

// data 
const { addToMyCart } = useSystemStore()

// computeds
const isCool = computed(()=> props.data.off >= 50)

// methods
function getImage(id: string) {
  const path = `../assets/images/product/product-${id}.png`
  return new URL(path, import.meta.url).href
}
</script>

<style scoped lang="scss">
.card {
  padding: 6px;
  &__title {
    text-transform: capitalize;
  }
  &__desc {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-height: 1.5;
  }
  &__image-cover {
    position: relative;
    overflow: hidden;
    padding-top: 130%;
    & img {
      width: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  &__price-wrapper {
    margin-block: 16px 4px;
  }
  &__price {
    font-size: 12px;
    font-weight: bold;
  }
  :is(&__actions, &__price-wrapper){
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

}
p,h2 {
  margin: 0;
}
</style>
<style>
.card .el-rate .el-rate__text {
  font-size: 10px;
  font-weight: bold;
}
.card .el-rate .el-rate__icon {
  font-size: 14px;
  margin-inline-end: 2px;
}
</style>