<template>
  <div
    class="bg-background font-lato text-text-onBackground relative min-h-screen flex items-center justify-center overflow-hidden"
  >
    <img
      src="/img/StarWarsBackground.png"
      alt="Imagem de fundo do espaço"
      class="absolute inset-0 w-full h-full object-cover opacity-10"
    />

    <div class="relative z-10 w-full max-w-md px-4">
      <NuxtPage />
    </div>
  </div>
</template>
