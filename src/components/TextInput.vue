<template>
  <div class="my-4 flex flex-col">
    <label class="mb-1 font-semibold" :for="id">{{ $t(props.label) }}</label>
    <input
      class="border border-gray-500 bg-gray-300 text-black rounded p-2"
      type="text"
      required
      :id="id"
      maxlength="5"
      minlength="5"
      @input="emitUpdate"
    />
  </div>
</template>

<script lang="ts" setup>
const id = `input-${crypto.randomUUID()}`;

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

function emitUpdate(event: Event) {
  const value = (event.target as HTMLInputElement).value ?? "";
  emit("update:modelValue", value);
}
</script>

<style lang="scss" scoped></style>
