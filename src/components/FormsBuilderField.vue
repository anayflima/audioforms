<template>
    <div>
        <v-form @submit.prevent="addField">
          
          <p>Adicione uma label para o campo</p>
          <v-text-field
            label="Label"
            v-model="label"
            background-color="#EBDEF0" 
            height="50"
            required
          ></v-text-field>
  
          <br>
  
          <p>Adicione uma descrição para o campo</p>
          <v-text-field
            label="Descrição"
            v-model="description"
            background-color="#EBDEF0" 
            height="50"
            required
          ></v-text-field>
  
          <v-btn type="submit"> Adicionar campo </v-btn>
        </v-form>
        
    </div>
  </template>
  
  <script>
  export default {
    data: () => ({
        fieldsGenerated: [],
        label: "",
        description: "",
        id: 0
    }),
  
    methods: {
      addField() {
          const newField = { id: this.id, label: this.label, description: this.description}
  
          this.fieldsGenerated.push(newField)
  
          console.log(this.fieldsGenerated.length)
          this.id += 1

          this.$emit('new-fields', this.fieldsGenerated);
      }
    }
 
  }
  </script>