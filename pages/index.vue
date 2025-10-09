<template>
  <div>
    <img
      src="/img/LogoStarWars.png"
      alt="Star Wars Logo"
      class="w-full max-w-[410px] mx-auto mb-12"
    />

    <div class="bg-surface1 rounded-lg shadow-card p-6 flex flex-col gap-8">
      <div class="flex flex-col gap-6">
        <div class="flex flex-col gap-2">
          <h1 class="text-text-onBackground font-bold text-3xl">Olá!</h1>
          <p class="text-text-onBackground text-xl">
            Para começar seu teste, digite um e-mail:
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref("");
const emailState = ref<"enabled" | "focused" | "success" | "error">("enabled");
const emailError = ref("");

const isEmailValid = computed(() => {
  if (!email.value) return false;
  const emailRegex = /^[^\s@]{3,}@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.value);
});

const validateEmail = () => {
  if (!email.value) {
    emailState.value = "enabled";
    emailError.value = "";
    return;
  }
  if (isEmailValid.value) {
    emailState.value = "success";
    emailError.value = "";
  } else {
    emailState.value = "error";
    emailError.value = "E-mail inválido. Mínimo 3 caracteres antes do @.";
  }
};

const nextStep = () => {
  validateEmail();
  if (isEmailValid.value) {
    router.push("/search");
  }
};
</script>
