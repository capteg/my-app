// src/components/ValidationForm.vue
<template>
  <div class="validation-form">
    <h3>Quick Capture</h3>
    <form @submit.prevent="handleSubmit" class="form-container">
      <select v-model="formData.type" required class="form-field">
        <option value="supplier">Lieferant</option>
        <option value="buyer">Käufer</option>
      </select>

      <input 
        v-model="formData.company" 
        type="text" 
        placeholder="Firmenname" 
        required
        class="form-field"
      >

      <input 
        v-model="formData.contact" 
        type="text" 
        placeholder="Kontakt (Name + Telefon)" 
        required
        class="form-field"
      >

      <select v-model="formData.status" required class="form-field">
        <option value="new">Neu</option>
        <option value="interested">Interessiert</option>
        <option value="active">Aktiv</option>
      </select>

      <textarea 
        v-model="formData.notes" 
        placeholder="Wichtige Details"
        class="form-field"
        rows="3"
      ></textarea>

      <button type="submit" class="submit-button">
        {{ isSubmitting ? 'Speichere...' : 'Speichern' }}
      </button>

      <div v-if="showSuccess" class="success-message">
        ✓ Gespeichert!
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const formData = ref({
  type: 'supplier',
  company: '',
  contact: '',
  status: 'new',
  notes: ''
})

const isSubmitting = ref(false)
const showSuccess = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true
  
  // Später Google Sheets Integration
  console.log('Captured:', formData.value)
  
  // Success simulation
  await new Promise(resolve => setTimeout(resolve, 500))
  
  showSuccess.value = true
  isSubmitting.value = false
  
  // Reset form
  setTimeout(() => {
    formData.value = {
      type: 'supplier',
      company: '',
      contact: '',
      status: 'new',
      notes: ''
    }
    showSuccess.value = false
  }, 2000)
}
</script>

<style scoped>
.validation-form {
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
}

.form-container {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.form-field {
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
}

.submit-button {
  width: 100%;
  padding: 12px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 16px;
}

.submit-button:hover {
  background: #45a049;
}

.submit-button:disabled {
  background: #cccccc;
}

.success-message {
  color: #4CAF50;
  text-align: center;
  margin-top: 16px;
  font-weight: bold;
}

h3 {
  margin: 0 0 20px 0;
  color: #333;
}
</style>