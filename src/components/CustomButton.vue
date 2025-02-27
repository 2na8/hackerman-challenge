<template>
    <button 
        :class="['botao-padrao', { desativado: desativado }]" 
        @click="clicar" 
        :disabled="desativado"
    >
        {{ texto }}
    </button>
</template>

<script>
    export default {
        name: "CustomButton",
        props: {
            texto: {
                type: String,
                required: true
            },
            desativado: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            clicar() {
                if (!this.desativado) {
                this.$emit('clicado');
                }
            }
        }
    };
</script>
  
<style scoped>
  .botao-padrao {
    background: #FFE81F;
    color: #232323;
    padding: 10px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    width: 362px;
    font-size: 16px;
  }
  
  .botao-padrao.desativado {
    background: #232323;
    cursor: not-allowed;
    border: 1px solid #ccc;
    color: #ccc;
  }
  </style>
  