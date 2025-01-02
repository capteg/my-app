<template>
    <div class="buyer-form">
      <h2>Käufer Validierungsformular</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="company">Firmenname:</label>
          <input type="text" id="company" v-model="formData.company" required>
        </div>
        <div class="form-group">
          <label for="contact">Kontakt:</label>
          <input type="text" id="contact" v-model="formData.contact" required>
        </div>
        <div class="form-group">
          <label for="phone">Telefon:</label>
          <input type="tel" id="phone" v-model="formData.phone" required>
        </div>
        <div class="form-group">
          <label for="volume">Bestandsvolumen (€):</label>
          <input type="number" id="volume" v-model="formData.volume" required>
        </div>
        <button type="submit">Speichern</button>
      </form>
      <div id="status" :class="statusClass" v-if="showStatus">{{ statusMessage }}</div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'BuyerForm',
    data() {
      return {
        formData: {
          company: '',
          contact: '',
          phone: '',
          volume: ''
        },
        showStatus: false,
        statusMessage: '',
        statusClass: ''
      }
    },
    methods: {
      async submitForm() {
        this.showStatus = true;
        this.statusMessage = 'Wird gespeichert...';
        
        try {
          const response = await fetch('https://script.google.com/macros/s/AKfycby0xQk3HTzieR4Eg40m3aNZ5dxoiCZv1t60mA6EUipVB6qCkTtwL-QjO37zgj9DgPRqOQ/exec', {
            method: 'POST',
            body: JSON.stringify(this.formData),
            mode: 'no-cors'
          });
  
          this.statusClass = 'success';
          this.statusMessage = 'Erfolgreich gespeichert!';
          this.formData = {
            company: '',
            contact: '',
            phone: '',
            volume: ''
          };
  
          setTimeout(() => {
            this.showStatus = false;
          }, 3000);
        } catch (error) {
          this.statusClass = 'error';
          this.statusMessage = 'Fehler beim Speichern. Bitte erneut versuchen.';
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .buyer-form {
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
  
  button {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  #status {
    margin-top: 20px;
    padding: 10px;
  }
  
  .success {
    background-color: #dff0d8;
    color: #3c763d;
  }
  
  .error {
    background-color: #f2dede;
    color: #a94442;
  }
  </style>