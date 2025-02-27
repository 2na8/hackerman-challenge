<template>
    <div class="search-container">
        <div class="search-card" v-if="!loading && !characterData">
            <h3>Agora, digite seu personagem favorito de Star Wars:</h3>
            <input
                type="text"
                v-model="characterName"
                placeholder="Ex: Luke Skywalker, Darth Vader..."
                @input="resetResults"
                :class="{ 'input-error': error && error === 'Personagem inválido' }"
            />
            <div v-if="!characterData && characterName && error" class="error">
                <p>{{ error }}</p>
            </div>
            <CustomButton
                texto="Próximo"
                :desativado="!characterName || loading"
                @clicado="fetchCharacterData"
            />
        </div>
        <div v-if="loading" class="loading-card" :class="{ 'fade-in': loading, 'fade-out': !loading }">
            <h2>Carregando...</h2>
            <img 
                src="/images/IconeStormTrooper.png" 
                alt="Ícone de Carregamento" 
                class="loading-image"
                v-if="loading"
            />

        </div>
    </div>
</template>

<script>
import CustomButton from '../components/CustomButton.vue';

export default {
    components: {
        CustomButton
    },
    data() {
        return {
            characterName: "",
            loading: false,
            error: null,
            characterData: null
        };
    },
    methods: {
        resetResults() {
            this.error = null;
        },
        async fetchCharacterData() {
            this.loading = true;
            this.error = null;

            try {
                console.log("Buscando personagem:", this.characterName);
                const response = await fetch(`https://swapi.dev/api/people/?search=${this.characterName}`);
                const data = await response.json();
                console.log("Resposta da API:", data);

                if (data.count > 0) {
                    const character = data.results[0];
                    const characterData = {
                        name: character.name,
                        films: await this.fetchDetails(character.films),
                        vehicles: await this.fetchDetails(character.vehicles),
                        starships: await this.fetchDetails(character.starships),
                        homeworld: await this.fetchDetail(character.homeworld),
                        species: await this.fetchDetails(character.species),
                    };

                    localStorage.setItem('characterData', JSON.stringify(characterData));
                    this.$router.push({ name: 'result' }); // Redireciona para ResultView

                    
                } else {
                    this.error = "Personagem inválido";
                }
            } catch (err) {
                console.error("Erro ao buscar dados:", err);
                this.error = "Erro ao buscar dados. Tente novamente.";
            } finally {
                setTimeout(() => {
                    this.loading = false; // ✅ Desativa depois de um pequeno delay
                }, 500);
            }
        },
        async fetchDetails(urls) {
            const details = await Promise.all(urls.map(url => fetch(url).then(res => res.json())));
            return details.map(detail => detail.title || detail.name || detail); // Retorna o título ou nome
        },
        async fetchDetail(url) {
            const response = await fetch(url);
            const detail = await response.json();
            return detail.name; // Retorna o nome do planeta
        }
    }
};
</script>

<style scoped> 
.search-container{ 
    height: 100vh; 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    } 

.search-card {
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    width: 410px; 
    height: 224px; 
    padding: 20px; 
    border-radius: 5px; 
    gap: 18px; 
    text-align: left; 
    background-color: var(--cor-background-cards); 

} 

input { 
    width: 370px; 
    padding: 10px;  
    background: var(--cor-background-cards); 
    border: 1px solid var(--cor-borda-input); 
    border-radius: 5px; 
    font-size: 16px; 
    color: var(--cor-textos); 
    margin-bottom: 8px; 
} 

input:focus {
    outline: none; /* Remove a borda de foco */
}

.input-error {
    border: 1px solid var(--cor-error); /* Cor de erro */
}

.loading-card{
    width: 410px;
    height: 149px;
    border-radius: 8px;
    background-color: var(--cor-background-cards);
    display: flex;
    align-items: center;
    flex-direction: column-reverse;
    justify-content: space-around;
    opacity: 1;
    transition: opacity 0.5s ease;
}

@keyframes fadeInOut {
    0% { opacity: 0; }
    50% { opacity: 1; }
    100% { opacity: 0; }
}

.loading-image {
    opacity: 0;
    animation: fadeInOut 1.5s infinite ease-in-out; /* Repete indefinidamente */
}

.error {
    text-align: left; 
    color: var(--cor-error); 
    margin-top: -20px;
    margin-bottom: -10px; 
    width: 100%; 
} 

</style>