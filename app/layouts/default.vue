<template>
  <div
    class="min-h-screen flex flex-col bg-slate-50 font-sans antialiased text-gray-900 selection:bg-blue-600 selection:text-white"
  >
    <!-- Sticky Glassmorphic Header Navbar -->
    <AppNavbar />

    <!-- Main Dynamic Content Slot -->
    <main class="grow">
      <slot />
    </main>

    <!-- Global State-driven Purchase Form Modal -->
    <PurchaseModal />

    <!-- Toast Notifications -->
    <UToaster />

    <!-- Global Responsive Footer -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
// Components in Nuxt are auto-imported
</script>
