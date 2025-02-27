<template>
    <div class="card">
        <h2>{{ title }}</h2>
        <p><strong>Filmes:</strong> {{ films.join(', ') }}</p>
        <p><strong>Veículos:</strong> {{ vehicles.join(', ') }}</p>
        <p><strong>Naves:</strong> {{ starships.join(', ') }}</p>
        <p><strong>Planeta:</strong> {{ homeworld }}</p>
        <p><strong>Espécies:</strong> {{ species.join(', ') }}</p>
    </div>
</template>

<script>
export default {
name: "Card",
props: {
    title: {
        type: String,
        required: true
    },
    films: {
        type: Array,
        default: () => []
    },
    vehicles: {
        type: Array,
        default: () => []
    },
    starships: {
        type: Array,
        default: () => []
    },
    homeworld: {
        type: String,
        default: ""
    },
    species: {
        type: Array,
        default: () => []
    }
}
};
</script>

<style scoped>
.card {
background: #232323; /* Cor de fundo do card */
color: #CECECE; /* Cor do texto */
padding: 20px;
border-radius: 8px;
box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
margin: 10px 0;
width: 100%; /* Largura total do card */
}
</style>