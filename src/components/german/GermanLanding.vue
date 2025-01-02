<template>
    <div class="landing-container">
      <header>
        <h1>Willkommen bei unserem B2B-Marktplatz</h1>
      </header>
  
      <main>
        <section class="user-selection">
          <div class="card supplier">
            <h2>Für Großhändler</h2>
            <p>Sie möchten Ihr Sortiment bei uns listen?</p>
            <button @click="handleFormRedirect('supplier')" class="cta-button">
              Jetzt Sortiment anfragen
            </button>
          </div>
  
          <div class="card buyer">
            <h2>Für Händler</h2>
            <p>Sie suchen nach neuen Produkten für Ihr Geschäft?</p>
            <button @click="handleFormRedirect('buyer')" class="cta-button">
              Jetzt Sortiment entdecken
            </button>
          </div>
        </section>
      </main>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useRouter } from 'vue-router'
  const router = useRouter()
  
  const handleFormRedirect = (type: 'supplier' | 'buyer') => {
    if (type === 'supplier') {
      router.push('/de/validation')
    } else {
      router.push('/de/validation-buyer')
    }
  }
  </script>
  
  <style scoped>
  .landing-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  header {
    text-align: center;
    margin-bottom: 40px;
  }
  
  .user-selection {
    display: flex;
    gap: 30px;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .card {
    background: #ffffff;
    border-radius: 10px;
    padding: 30px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    flex: 1;
    min-width: 300px;
    max-width: 450px;
    text-align: center;
  }
  
  .cta-button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 15px 30px;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .cta-button:hover {
    background-color: #45a049;
  }
  
  h1 {
    color: #333;
    margin-bottom: 20px;
  }
  
  h2 {
    color: #444;
    margin-bottom: 15px;
  }
  
  p {
    color: #666;
    margin-bottom: 20px;
  }
  </style>