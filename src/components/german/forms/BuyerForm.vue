<template>
    <div class="form-container">
      <h2>Sortiments-Anfrage für Händler</h2>
      <form id="validationForm" @submit.prevent="handleSubmit">
          <div class="form-group">
              <label for="company">Firmenname</label>
              <input type="text" id="company" v-model="formData.company" required autocomplete="organization">
          </div>
          <div class="form-group">
              <label for="contact">Kontakt (Name)</label>
              <input type="text" id="contact" v-model="formData.contact" required autocomplete="name">
          </div>
          <div class="form-group">
              <label for="phone">Telefon</label>
              <input type="tel" id="phone" v-model="formData.phone" required autocomplete="tel">
          </div>
          <div class="form-group">
              <label for="interest">Interessierte Kategorien</label>
              <input type="text" id="interest" v-model="formData.interest" required>
          </div>
          <button type="submit" id="submitBtn" :disabled="isSubmitting">
              {{ isSubmitting ? 'Wird gespeichert...' : 'Speichern' }}
          </button>
      </form>
      <div id="status" v-if="status.show" :class="status.type">
          {{ status.message }}
      </div>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive } from 'vue'
  
  const SHEET_URL = 'https://script.google.com/macros/s/AKfycby0xQk3HTzieR4Eg40m3aNZ5dxoiCZv1t60mA6EUipVB6qCkTtwL-QjO37zgj9DgPRqOQ/exec'
  
  const isSubmitting = ref(false)
  const formData = reactive({
      company: '',
      contact: '',
      phone: '',
      interest: ''
  })
  
  const status = reactive({
      show: false,
      message: '',
      type: ''
  })
  
  const handleSubmit = async () => {
      isSubmitting.value = true
      status.show = true
      status.message = 'Übertrage Daten...'
      
      const submitData = {
          timestamp: new Date().toLocaleString('de-DE'),
          ...formData,
          type: 'buyer'
      }
  
      try {
          await fetch(SHEET_URL, {
              method: 'POST',
              body: JSON.stringify(submitData),
              mode: 'no-cors'
          })
          
          status.type = 'success'
          status.message = '✓ Erfolgreich gespeichert!'
          
          // Reset form
          Object.keys(formData).forEach(key => formData[key] = '')
          
          setTimeout(() => {
              status.show = false
          }, 3000)
      } catch (error) {
          status.type = 'error'
          status.message = '⚠️ Fehler beim Speichern. Bitte erneut versuchen.'
          console.error('Submission error:', error)
      } finally {
          isSubmitting.value = false
      }
  }
  </script>
  
  <style scoped>
  .form-container {
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      background: #f5f5f5;
  }
  
  .form-group {
      margin-bottom: 20px;
      background: white;
      padding: 15px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
  }
  
  input {
      width: 100%;
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 16px;
      box-sizing: border-box;
  }
  
  button {
      width: 100%;
      background-color: #4CAF50;
      color: white;
      padding: 15px;
      border: none;
      border-radius: 6px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
  }
  
  button:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
  }
  
  button:not(:disabled):hover {
      background-color: #45a049;
  }
  
  #status {
      margin-top: 20px;
      padding: 15px;
      border-radius: 6px;
      text-align: center;
      font-weight: 500;
  }
  
  .success {
      background-color: #d4edda;
      color: #155724;
  }
  
  .error {
      background-color: #f8d7da;
      color: #721c24;
  }
  </style>
