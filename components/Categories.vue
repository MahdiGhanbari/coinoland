<template>
  <div class="categories">
    <el-button v-for="item in items" :key="item.name" @click="changeCategory(item.name)"
      class="categories__radio-button" size="small" text :type="selected == item.name ? 'primary' : 'default'">
      <span class="material-symbols-outlined">
        {{ item.icon }}
      </span>
      <div class="categories__name">{{ item.name }}</div>
    </el-button>
  </div>
</template>
<script setup lang="ts">
const items = [
  { name: "All", icon: "all_inclusive" },
  { name: "Clothing & Shoes", icon: "checkroom" },
  { name: "Entertainment", icon: "theaters" },
  { name: "Music", icon: "music_note" },
  { name: "Sport & Lifestyle", icon: "fitness_center"},
  { name: "Pets", icon: "pets"},
  { name: "Kitchen Accessories", icon: "restaurant_menu"},
  { name: "Travel Equipment", icon: "flight"},
  { name: "Growing & Garden", icon: "local_florist"},
  { name: "Electrical Tools", icon: "flash_on"},
  { name: "Mother Care", icon: "stroller"},
  { name: "Toys & Entertainment", icon: "toys"},
  { name: "Vintage", icon: "filter_vintage"}
]

// props
const props = defineProps({
  modelValue: {
    type: String,
    default: 'All'
  }
})

// data
const selected: Ref<String> = ref('All')

// events
const emit = defineEmits(['update:modelValue'])

// methods
function changeCategory(name: String) {
  selected.value = name
  emit('update:modelValue', name)
}

// watches
watch(
  () => props.modelValue, 
  v => changeCategory(v || 'All'),
  {immediate: true}
)
</script>

<style scoped lang="scss">
.categories {
  display: flex;
  justify-content: center;
  overflow-x: auto;
  padding: 4px;
  &__radio-button {
    height: 50px;
  }
  &__name {
    margin-top: 6px;
  }
}
</style>

<style lang="scss">
.categories {
  &__radio-button > span {
    flex-direction: column !important;
  }
}
</style>