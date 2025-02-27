<template>
  <div class="login-container">
    <img src="/images/LogoStarWars.png" alt="Logo" class="logo">
    <div class="login-card">
      <h1>Olá!</h1>
      <h3>Para começar seu teste, digite um e-mail:</h3>
      <input 
        type="email" 
        v-model="email" 
        placeholder="exemplo@email.com" 
        @input="validarEmail"
        :class="{'campo-valido': emailValido, 'campo-invalido': email !== '' && !emailValido}"
      >
      <!-- Usando o componente de botão -->
      <CustomButton 
        texto="Próximo" 
        :desativado="!emailValido"
        @clicado="irParaProximaPagina"
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
      email: "",
      emailValido: false,
    };
  },
  methods: {
      validarEmail() {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.emailValido = regex.test(this.email);
    },
    irParaProximaPagina() {
      if (this.emailValido) {
        this.$router.push("/busca");
      }
    }
  }
};
</script>

<style scoped>
/* Estilização do container */
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 50px;
}

/* Card do login */
.login-card {
  background: var(--cor-background-cards);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: left;
  width: 410px;
  height: 244px;
}

/* Input */
input {
  width: 362px;
  padding: 10px;
  margin: 10px 0;
  background: var(--cor-background-cards);
  border: 1px solid var(--cor-borda-input);
  border-radius: 5px;
  font-size: 16px;
  color: var(--cor-textos);
}

input:focus {
    outline: none; /* Remove a borda de foco */
}

/* Borda quando inválido */
.invalid-input {
  border: 1px solid red;
}

/* Botão */
button {
  background: var(--cor-backgorund-botoes);
  color: var(--cor-background-cards);
  padding: 10px;
  border: var(--cor-textos);
  border-radius: 8px;
  cursor: pointer;
  width: 362px;
  font-size: 16px;
}

button:disabled {
  background: #232323;
  cursor: not-allowed;
  border: 1px solid var(--cor-textos);
  color: var(--cor-textos);
}
</style>
