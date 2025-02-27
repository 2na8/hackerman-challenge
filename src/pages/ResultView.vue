<template>
  <div class="result-body">
    <div class="result-container">
      <h2>Informações sobre {{ characterData?.name }}:</h2>
      <div class="info-group">
        <h3>Filmes:</h3>
        <div class="tag-container">
          <span v-for="film in characterData?.films" :key="film" class="tag">
            {{ film }}
          </span>
        </div>
      </div>
      <div class="info-group">
        <h3>Naves:</h3>
        <div class="tag-container">
          <div v-if="characterData?.starships.length > 0">
            <span v-for="starship in characterData.starships" :key="starship" class="tag">
              {{ starship }}
            </span>
          </div>
          <span v-else class="tag disabled">N/A</span>
        </div>
      </div>
      <div class="info-group">
        <h3>Veículos:</h3>
        <div class="tag-container">
          <div v-if="characterData?.vehicles.length > 0">
            <span v-for="vehicle in characterData.vehicles" :key="vehicle" class="tag">
              {{ vehicle }}
            </span>
          </div>
          <span v-else class="tag disabled">N/A</span>
        </div>
      </div>
      <div class="info-group">
        <h3>Espécie:</h3>
        <div class="tag-container">
          <div v-if="characterData?.species.length > 0">
            <span v-for="specie in characterData.species" :key="specie" class="tag">
              {{ specie }}
            </span>
          </div>
          <span v-else class="tag disabled">N/A</span>
        </div>
      </div>
      <div class="info-group">
        <h3>Planeta:</h3>
        <div class="tag-container">
          <span class="tag">{{ characterData?.homeworld || "N/A" }}</span>
        </div>
      </div>
      <button @click="goBack" class="yellow-button">Pesquisar Novamente</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      characterData: null,
    };
  },
  created() {
    const characterData = JSON.parse(localStorage.getItem("characterData"));
    if (characterData) {
      this.characterData = characterData;
    } else {
      this.$router.push({ name: "search" });
    }
  },
  methods: {
    goBack() {
      this.$router.push("/busca");
    },
  },
};
</script>

<style scoped>

.result-body{
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  
}

.result-container {
  background-color: var(--cor-background-cards);
  color: var(--cor-textos);
  border-radius: 10px;
  padding: 20px;
  width: 400px;
  text-align: left;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 15px;
}

.info-group {
  margin-bottom: 15px;
}

h3 {
  font-size: 1.2rem;
  margin-bottom: 5px;
}

.tag-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  background-color: #353535;
  color: var(--cor-textos);
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.9rem;
}

.tag.disabled {
  background-color: #555;
  color: var(--cor-textos);
}

.yellow-button {
  background-color: var(--cor-backgorund-botoes);
  color: #000;
  font-weight: bold;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  margin-top: 20px;
}

</style>