<template>
  <div>
    <Categories v-model="filter.category" class="categories" />
    <div class="row">
      <div class="aside col col-md-3 col-lg-2">
        <div class="title-3">
          Filters By:
          <el-button v-show="filter.brands.length" @click="clearAllFilters" type="text">Clear filters</el-button>
        </div>
        <div>
          <el-tag v-for="(brand, index) in filter.brands" :key="brand" closable size="large" type="info"
            @close="removeBrand(index)" class="aside__tag">
            {{ brand }}
          </el-tag>
        </div>
        <select-item v-model="filter.brands" :items="brands" label="Brand" multiple />
        <select-item v-model="filter.priceRange" :items="prices" label="Price" />
      </div>
      <div class=" col-12 col-md-9 col-lg-10 content">
        <div class="content__search-box-warpper">
          <search-box v-model="filter.query" />
          <div class="caption text-gray-3 content__products-count">Products count: {{ filteredList.length }}</div>
        </div>
        <div v-show="filteredList.length" class="row">
          <div v-for="(item, index) in filteredList" :key="index" class="col col-sm-4 col-md-3 col-lg-2">
            <product-card :data="item" />
          </div>
        </div>
        <el-empty v-if="!filteredList.length"/>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Filter, Product } from '@/utils/classes'
import { throttle } from 'lodash';

// data
const brands = new Array(10).fill('Product ').map((v, i) => v + (i + 1))
const prices = ['0$ - 10$', '10$ - 50$', '50$ - 100$', '100$ - 200$', '200$ - 300$', '300$ - 400$', '400$ - 500$', '500$ and higher', ]
const filteredList = ref<Array<Product>>([])
const orginalList = ref<Array<Product>>([])
const { getRandomList } = useDataBase()
const filter = ref<Filter>(new Filter)

// methods
function removeBrand(index: number) {
  filter.value.brands.splice(index, 1)
}
function clearAllFilters() {
  filter.value.brands = []
  filter.value.priceRange = ''
}
function matchRange(priceRange: string, price: number) {
  const range = priceRange.match(/\d+/gm)
  if(range) {
    const [min, max] = range
    if(min && max) {
      return +min <= price && price <= +max
    }
    return price >= +max
  }
  return true
}
function updateList(newFilter: Filter) {
  let { query, category: batch, brands, priceRange } = newFilter
  query = query.toLowerCase().trim()
  batch = batch.toLocaleLowerCase()

  const reg = new RegExp(`\w*${query}\w*`,'gm')
  

  filteredList.value = orginalList.value
    .filter(product => {
      const { name, description, category, price }  = product
       
      const isNameMatch =  reg.test(name.toLowerCase()) 
      const isDescMatch =  reg.test(description.toLowerCase())
      const isCategoryMatch = category.toLowerCase() == batch || batch == 'all'
      const isBrandMatch = !brands.length || brands.includes(name)
      const isPriceMatch = matchRange(priceRange, price)

      return (isNameMatch || isDescMatch) && isCategoryMatch && isBrandMatch && isPriceMatch
    })
}

// watches
watch(
  filter,
  throttle(updateList, 1000),
  { deep: true }
)

// hooks
onBeforeMount(() => {
  // generate a random count between 10 to 100
  const count = useUtilities().getRandom(10, 100)
  const list = getRandomList(count)
  orginalList.value = list
  filteredList.value = list
})
</script>

<style scoped lang="scss">
.categories {
  margin-bottom: 48px;
}

.aside {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 12px;
  align-content: baseline;
  margin-bottom: 1rem;
  &__tag {
    margin: 2px;
    border-radius: 30px;
  }
}

.content {
  min-height: 500px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 4px, rgba(0, 0, 0, 0.04) 0px 0px 6px;

  &__search-box-warpper {
    margin-block: 16px;
  }

  &__products-count {
    margin-top: 6px;
  }
}
</style>