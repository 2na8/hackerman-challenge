<template>
  <img
    v-if="step === 'email'"
    src="/img/LogoStarWars.png"
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
          @blur="emailState = email ? 'success' : 'enabled'"
          @keyup.enter="nextStep"
        />
      </div>
      <StarWarsButton :disabled="!isEmailValid" @click="nextStep"
        >Próximo
      </StarWarsButton>
    </div>

    <div v-else-if="step === 'character'" class="flex flex-col gap-8">
      <div class="flex flex-col gap-6">
        <p class="text-text-onBackground text-xl">
          Agora, digite seu personagem favorito de Star Wars
        </p>
        <StarWarsInput
          v-model="characterName"
          placeholder="Darth Vader"
          :state="characterState"
          :error="characterError"
          @focus="characterState = 'focused'"
          @blur="characterState = characterName ? 'success' : 'enabled'"
          @keyup.enter="searchCharacter"
        />
      </div>
      <StarWarsButton
        :disabled="!characterName.trim()"
        @click="searchCharacter"
      >
        Próximo
      </StarWarsButton>
    </div>

    <div
      v-else-if="step === 'loading'"
      class="flex flex-col items-center items-center gap-6 py-4"
    >
      <img
        v-if="showLoadingIcon"
        src="/img/IconeStormTrooper.png"
        alt="Ícone de loading"
        class="w-12 h-12 animate-spin"
      />
      <p class="text-text-onBackground text-2xl font-semibold">Carregando...</p>
    </div>

    <div
      v-else-if="step === 'results' && characterData"
      class="flex flex-col gap-8"
    >
      <div class="flex flex-col gap-6">
        <h2 class="text-text-onBackground font-bold text-3xl leading-normal">
          Informações sobre<br />{{ characterData.name }}:
        </h2>
        <div class="flex flex-col gap-2">
          <div class="flex flex-col gap-2 py-2 rounded-lg shadow-tag">
            <p class="text-text-onBackground text-xl">Filmes:</p>
            <div v-if="characterData.films.length" class="flex flex-wrap gap-2">
              <StarWarsTag
                v-for="(film, i) in characterData.films"
                :key="i"
                :label="film"
                :available="true"
              />
            </div>
            <StarWarsTag v-else label="N/A" :available="false" />
          </div>

          <div class="flex flex-col gap-2 py-2 rounded-lg shadow-tag">
            <p class="text-text-onBackground text-xl">Naves:</p>
            <div
              v-if="characterData.starships.length"
              class="flex flex-wrap gap-2"
            >
              <StarWarsTag
                v-for="(ship, index) in characterData.starships"
                :key="index"
                :label="ship"
                :available="true"
              />
            </div>
            <StarWarsTag v-else label="N/A" :available="false" />
          </div>

          <div class="flex flex-col gap-2 py-2 rounded-lg shadow-tag">
            <p class="text-text-onBackground text-xl">Veículos:</p>
            <div
              v-if="characterData.vehicles.length"
              class="flex flex-wrap gap-2"
            >
              <StarWarsTag
                v-for="(vehicle, index) in characterData.vehicles"
                :key="index"
                :label="vehicle"
                :available="true"
              />
            </div>
            <StarWarsTag v-else label="N/A" :available="false" />
          </div>

          <div class="flex flex-col gap-2 py-2 rounded-lg shadow-tag">
            <p class="text-text-onBackground text-xl">Espécie:</p>
            <div
              v-if="characterData.species.length"
              class="flex flex-wrap gap-2"
            >
              <StarWarsTag
                v-for="(species, index) in characterData.species"
                :key="index"
                :label="species"
                :available="true"
              />
            </div>
            <StarWarsTag v-else label="N/A" :available="false" />
          </div>

          <div class="flex flex-col gap-2 py-2 rounded-lg shadow-tag">
            <p class="text-text-onBackground text-xl">Planeta:</p>
            <div v-if="characterData.homeworld" class="flex flex-wrap gap-2">
              <StarWarsTag :label="characterData.homeworld" :available="true" />
            </div>
            <StarWarsTag v-else label="N/A" :available="false" />
          </div>
        </div>
      </div>
      <StarWarsButton @click="resetForNewSearch">
        Pesquisar Novamente
      </StarWarsButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

type Step = "email" | "character" | "loading" | "results";

interface CharacterData {
  name: string;
  films: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  homeworld: string;
}

const step = ref<Step>("email");
const email = ref("");
const emailState = ref<"enabled" | "focused" | "success" | "error">("enabled");
const emailError = ref("");
const characterName = ref("");
const characterState = ref<"enabled" | "focused" | "success" | "error">(
  "enabled"
);
const characterError = ref("");
const characterData = ref<CharacterData | null>(null);
const showLoadingIcon = ref(false);

const isEmailValid = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.value) && email.value.length >= 3;
});

const nextStep = () => {
  if (isEmailValid.value) {
    emailError.value = "";
    localStorage.setItem("userEmail", email.value);

    // SOMENTE depois de clicar em "Próximo", verificamos o localStorage
    const storedCharacterData = localStorage.getItem(
      `characterData_${email.value}`
    );

    if (storedCharacterData) {
      // Se encontrar dados para este e-mail, carrega e vai para os resultados.
      characterData.value = JSON.parse(storedCharacterData);
      step.value = "results";
    } else {
      // Se não encontrar, é o primeiro acesso, então vai para a busca.
      step.value = "character";
    }
  } else {
    emailState.value = "error";
    emailError.value = "O e-mail deve ter no mínimo 3 caracteres e conter '@'.";
  }
};

const searchCharacter = async () => {
  if (!characterName.value.trim()) return;

  step.value = "loading";
  showLoadingIcon.value = false;

  setTimeout(() => {
    showLoadingIcon.value = true;
  }, 500);

  try {
    const response = await fetch(
      `https://swapi.dev/api/people/?search=${encodeURIComponent(
        characterName.value
      )}`
    );
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const character = data.results[0];

      const fetchName = async (url: string) => {
        if (!url) return "N/A";
        const res = await fetch(url);
        const data = await res.json();
        return data.title || data.name;
      };

      const [films, starships, vehicles, species, homeworld] =
        await Promise.all([
          Promise.all(character.films.map(fetchName)),
          Promise.all(character.starships.map(fetchName)),
          Promise.all(character.vehicles.map(fetchName)),
          Promise.all(character.species.map(fetchName)),
          fetchName(character.homeworld),
        ]);

      characterData.value = {
        name: character.name,
        films,
        starships,
        vehicles,
        species,
        homeworld,
      };

      localStorage.setItem(
        `characterData_${email.value}`,
        JSON.stringify(characterData.value)
      );
      step.value = "results";
    } else {
      characterState.value = "error";
      characterError.value = "Personagem inválido";
      step.value = "character";
    }
  } catch (error) {
    characterState.value = "error";
    characterError.value = "Erro ao buscar personagem";
    step.value = "character";
  }
};

const resetForNewSearch = () => {
  step.value = "character";
  characterName.value = "";
  characterState.value = "enabled";
  characterError.value = "";
};
</script>
