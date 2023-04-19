<template>
  <div class="filter-group bg-gray-1">
    <div class="filter-group__button" @click="isExpanded = !isExpanded">
      {{ props.label }}
      <span class="material-symbols-outlined">
        {{ isExpanded? "expand_less": "expand_more" }}
      </span>
    </div>
    <div class="filter-group__list" :class="!isExpanded || 'filter-group__list_expanded'">
      <el-checkbox-group v-if="props.multiple" v-model="checkList" @change="update">
        <el-checkbox v-for="(item, index) in props.items" :key="index" :label="item + ''" class="filter-group__item" />
      </el-checkbox-group>
      <template v-else>
        <el-radio v-model="radio" v-for="(item, index) in props.items" @change="update" :key="index" :label="item + ''"
          class="filter-group__item">
          {{ item }}
        </el-radio>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
// data
const isExpanded = ref(false);
const checkList = ref<Array<string>>([]);
const radio = ref("");

// props
const props = defineProps({
  modelValue: {
    type: [String, Array],
  },
  items: {
    type: Array,
    default: () => [],
  },
  label: String,
  multiple: Boolean,
});

// emits
const emits = defineEmits(["update:modelValue"]);

// methods
function update(value: any) {
  emits("update:modelValue", value);
}

// watches
watch(
  () => props.modelValue,
  (value) => {
    if (typeof value == "string") {
      radio.value = value;
    } else if (Array.isArray(value)) {
      checkList.value = value as Array<string>;
    }
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.filter-group {
  padding: 6px;
  border-radius: 2px;

  &__button {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
  }

  &__list {
    overflow-y: auto;
    max-height: 0;
    margin-top: 0;
    transition: all 0.5s;

    &_expanded {
      max-height: 400px;
      margin-top: 16px;
    }
  }

  &__item {
    display: block;
  }

  &__item+&__item {
    margin-top: 4px;
  }
}
</style>
