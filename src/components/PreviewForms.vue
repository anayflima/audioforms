<template>
    <div>
  
        <v-form>
          <p> {{ label }}</p>
          <v-text-field 
            background-color="#EBDEF0" 
            height="50"
            :label="this.label"
          ></v-text-field>
        </v-form>
        
    </div>
  </template>
  
  <script>
  export default {
    props: {
        label: String,
        description: String
    },
  }
  </script>