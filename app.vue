<template>
  <div
    class="min-h-screen flex items-center justify-center bg-[rgba(18,18,18,0.97)] font-lato relative overflow-hidden"
  >
    <img
      src="/img/StarWarsBackground.png"
      alt="Imagem de fundo do espaço"
      class="absolute inset-0 w-full h-full object-cover opacity-20"
    />

    <div class="relative z-10 w-full max-w-md px-4">
      <NuxtPage />
    </div>
  </div>
</template>
