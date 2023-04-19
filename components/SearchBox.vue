<template>
  <div class="search-box bg-gray-1" @click="focus">
    <span class="material-symbols-outlined text-gray-6">
      search
    </span>
    <input v-model="query" @input="updateInput" ref="input" type="text" placeholder="Search the product you are looking for then hit Enter..."/>
    <span @click="clear" class="material-symbols-outlined subtitle-3 search-box__clear-btn">
      close
    </span>
  </div>
</template>

<script setup>
// data
const input = ref(null)
const query = ref('')

// props
const props = defineProps({
  modelValue: String
})

// events 
const emits = defineEmits(['update:modelValue'])

// methods
function focus() {
  input.value.focus()
}
function clear() {
  query.value = ''
  emits('update:modelValue', '')
}
function updateInput(e) {
  emits('update:modelValue', e.target.value)
}
</script>

<style scoped lang="scss">
.search-box {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  padding: 4px 8px;
  & input {
    flex: 1;
    border: none;
    background: inherit;
  }
  & input:focus {
    outline: none;
  }
  &__clear-btn {
    cursor: pointer;
  }
}
</style>
