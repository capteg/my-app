<script setup lang="ts">
import { ref } from 'vue'

// Typdefinitionen
interface Content {
  nav: {
    [key: string]: string
  }
  hero: {
    title: string
    subtitle: string
    ctaSupplier: string
    ctaBuyer: string
  }
  supplier: {
    title: string
    benefits: string[]
  }
  buyer: {
    title: string
    benefits: string[]
  }
}

// State
const activeSection = ref('home')

// Content Object
const content: Content = {
  nav: {
    home: "Start",
    supplier: "Verkaufen",
    buyer: "Einkaufen",
    about: "Über uns"
  },
  hero: {
    title: "Kosmetik-Überbestände clever handeln",
    subtitle: "Von Einzelhändlern für Einzelhändler",
    ctaSupplier: "Überbestände verkaufen",
    ctaBuyer: "Unter EK einkaufen"
  },
  supplier: {
    title: "Für Einzelhändler mit Überbeständen",
    benefits: [
      "✓ 24h Preiszusage",
      "✓ Sofortige Barzahlung",
      "✓ Komplette Abholung"
    ]
  },
  buyer: {
    title: "Für Einzelhändler auf Einkauf",
    benefits: [
      "✓ 25-40% unter EK",
      "✓ Original Retailware",
      "✓ 48h Lieferung"
    ]
  }
}

// Methods
const handleFormRedirect = (type: 'supplier' | 'buyer') => {
  window.location.href = type === 'supplier' 
    ? '/validation.html' 
    : '/validation-buyer.html'
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-lg">
      <div class="max-w-6xl mx-auto px-4">
        <div class="flex justify-between">
          <div class="flex items-center py-4">
            <span class="font-bold text-xl">PureStock</span>
          </div>
          <div class="flex items-center space-x-4">
            <button
              v-for="(value, key) in content.nav"
              :key="key"
              @click="activeSection = key"
              class="py-2 px-3 hover:text-blue-600"
            >
              {{ value }}
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <div class="bg-blue-600 text-white py-16">
      <div class="max-w-6xl mx-auto px-4 text-center">
        <h1 class="text-4xl font-bold mb-4">{{ content.hero.title }}</h1>
        <p class="text-xl mb-8">{{ content.hero.subtitle }}</p>
        <div class="flex justify-center space-x-4">
          <button
            @click="handleFormRedirect('supplier')"
            class="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
          >
            {{ content.hero.ctaSupplier }}
          </button>
          <button
            @click="handleFormRedirect('buyer')"
            class="bg-transparent border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            {{ content.hero.ctaBuyer }}
          </button>
        </div>
      </div>
    </div>

    <!-- Two Columns: Supplier & Buyer -->
    <div class="py-16 bg-white">
      <div class="max-w-6xl mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Supplier Column -->
          <div class="text-center p-6 bg-gray-50 rounded-lg">
            <h2 class="text-2xl font-bold mb-6">{{ content.supplier.title }}</h2>
            <ul class="space-y-4">
              <li 
                v-for="(benefit, index) in content.supplier.benefits" 
                :key="index"
                class="text-lg"
              >
                {{ benefit }}
              </li>
            </ul>
            <button
              @click="handleFormRedirect('supplier')"
              class="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg"
            >
              Jetzt Bestand melden
            </button>
          </div>

          <!-- Buyer Column -->
          <div class="text-center p-6 bg-gray-50 rounded-lg">
            <h2 class="text-2xl font-bold mb-6">{{ content.buyer.title }}</h2>
            <ul class="space-y-4">
              <li 
                v-for="(benefit, index) in content.buyer.benefits" 
                :key="index"
                class="text-lg"
              >
                {{ benefit }}
              </li>
            </ul>
            <button
              @click="handleFormRedirect('buyer')"
              class="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg"
            >
              Angebote erhalten
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>