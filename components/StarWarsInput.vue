<template>
  <div class="w-full">
    <div class="relative h-8 w-full">
      <input
        :value="modelValue"
        :placeholder="placeholder"
        :type="type"
        :class="[
          'w-full h-8 px-2 rounded-lg bg-surface2 font-lato text-sm outline-none transition-all',
          state === 'error'
            ? 'border border-error text-text-onSurface'
            : state === 'success'
            ? 'border border-success text-text-onSurface'
            : state === 'focused'
            ? 'border border-focused text-text-onSurface'
            : 'border border-enabled text-text-onDisabled placeholder:text-text-onDisabled',
        ]"
        @input="
          $emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
        @focus="$emit('focus')"
        @blur="$emit('blur')"
      />
    </div>
    <div v-if="error" class="mt-1 text-sm font-lato text-error">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string;
  placeholder?: string;
  type?: string;
  state?: "enabled" | "focused" | "success" | "error";
  error?: string;
}>();

defineEmits<{
  "update:modelValue": [value: string];
  focus: [];
  blur: [];
}>();
</script>
