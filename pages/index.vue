<template>
  <img
    v-if="step === 'email'"
    src="/public/img/LogoStarWars.png"
    alt="Star Wars Logo"
    class="w-full max-w-s mx-auto mb-10 transition-opacity duration-500"
  />

  <div class="bg-surface1 rounded-lg shadow-card p-6 flex flex-col gap-8">
    <div v-if="step === 'email'" class="flex flex-col gap-8">
      <div class="flex flex-col gap-6">
        <div class="flex flex-col gap-2">
          <h1 class="text-text-onBackground font-bold text-3xl">Olá!</h1>
          <p class="text-text-onBackground text-xl">
            Para começar seu teste, digite um e-mail:
          </p>
        </div>
        <StarWarsInput
          v-model="email"
          placeholder="exemplo@email.com"
          type="email"
          :state="emailState"
          :error="emailError"
          @focus="emailState = 'focused'"
          @blur="validateEmail"
          @input="validateEmail"
        />
      </div>
      <StarWarsButton :disabled="!isEmailValid" @click="nextStep">
        Próximo
      </StarWarsButton>
    </div>

    <div v-else-if="step === 'search'" class="flex flex-col gap-8">
      <div class="flex flex-col gap-6">
        <p class="text-text-onBackground text-xl text-left">
          Digite o nome de um personagem de Star Wars para buscar:
        </p>
        <StarWarsInput
          v-model="characterName"
          placeholder="Darth Vader"
          :state="characterState"
          :error="characterError"
          @focus="characterState = 'focused'"
          @blur="characterState = 'enabled'"
        />
      </div>
      <StarWarsButton
        :disabled="!characterName.trim()"
        @click="searchCharacter"
      >
        Pesquisar
      </StarWarsButton>
    </div>

    <div
      v-else-if="step === 'loading'"
      class="flex flex-col items-center justify-center gap-6 py-4 flex-grow"
    >
      <img
        src="/img/IconeStormTrooper.png"
        alt="Ícone de loading"
        class="w-12 h-12 animate-pulse"
      />
      <p class="text-text-onBackground text-2xl font-semibold">Carregando...</p>
    </div>

    <div
      v-else-if="step === 'results' && characterData"
      class="flex flex-col gap-8 text-left"
    >
      <div class="flex flex-col gap-6">
        <h2 class="text-text-onBackground font-bold text-3xl leading-normal">
          Informações sobre<br />{{ characterData.name }}:
        </h2>
        <div class="flex flex-col gap-2">
          <div class="flex flex-col gap-2 py-2">
            <p class="text-text-onBackground text-xl">Filmes:</p>
            <div v-if="characterData.films.length" class="flex flex-wrap gap-2">
              <StarWarsTag
                v-for="(film, i) in characterData.films"
                :key="`film-${i}`"
                :label="film"
                :available="true"
              />
            </div>
            <StarWarsTag v-else label="N/A" :available="false" />
          </div>
        </div>
      </div>
      <StarWarsButton @click="resetApp"> Pesquisar Novamente </StarWarsButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

// Variável para controlar qual etapa mostrar
const step = ref<"email" | "search" | "loading" | "results">("email");

// --- Lógica do E-mail ---
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
    step.value = "search";
  }
};

// --- Lógica da Busca ---
interface CharacterData {
  name: string;
  films: string[];
}
const characterName = ref("");
const characterState = ref<"enabled" | "focused" | "success" | "error">(
  "enabled"
);
const characterError = ref("");
const characterData = ref<CharacterData | null>(null);

const searchCharacter = async () => {
  if (!characterName.value.trim()) return;

  step.value = "loading"; // Mostra o loading
  characterError.value = "";
  characterState.value = "enabled";

  try {
    // API!!
    const { data, error } = await useFetch(
      `https://swapi.dev/api/people/?search=${encodeURIComponent(
        characterName.value
      )}`
    );

    if (error.value || !data.value || data.value?.results?.length === 0) {
      throw new Error("Character not found");
    }

    const character = data.value.results[0];
    const fetchFilmTitles = async (urls: string[]) => {
      const filmPromises = urls.map((url) =>
        useFetch(url).then((res) => res.data.value.title)
      );
      return await Promise.all(filmPromises);
    };

    const films = await fetchFilmTitles(character.films);

    characterData.value = {
      name: character.name,
      films,
    };

    step.value = "results";
  } catch (err) {
    characterState.value = "error";
    characterError.value = "Personagem não encontrado.";
    step.value = "search"; // volta para a busca
  }
};

// --- lógica para resetar ---
const resetApp = () => {
  email.value = "";
  emailState.value = "enabled";
  emailError.value = "";
  characterName.value = "";
  characterData.value = null;
  step.value = "email";
};
</script>
