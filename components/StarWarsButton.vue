<template>
  <button
    :disabled="disabled"
    :class="[
      'flex h-10 w-full justify-center items-center gap-6 rounded-lg font-lato text-base font-bold leading-7 transition-all',
      disabled
        ? 'border border-disabled text-text-onDisabled cursor-not-allowed'
        : 'bg-primary text-text-onPrimary shadow-button hover:brightness-110 active:brightness-90',
    ]"
    @click="$emit('click')"
  >
    <slot>Próximo</slot>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  disabled?: boolean;
}>();

defineEmits<{
  click: [];
}>();
</script>
