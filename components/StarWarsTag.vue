<template>
  <div
    :class="[
      'inline-flex px-2 items-start gap-2.5 rounded font-lato text-base leading-7',
      available
        ? 'bg-surface2 text-text-onSurface'
        : 'border border-disabled text-text-onDisabled',
    ]"
  >
    {{ label }}
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  available?: boolean;
}>();
</script>
