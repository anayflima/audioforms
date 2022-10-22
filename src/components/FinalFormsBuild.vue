<template>
    <v-form>
          <p> {{ label }}</p>
          <v-text-field 
            background-color="#EBDEF0" 
            height="50"
            :label="this.label"
            v-model="text"
          ></v-text-field>
    </v-form>
</template>

<script>

export default {

    
    props: {
        label: String,
        transcription: String
    },


    computed: {
        text() {
            return this.transcription
        }
    },
    mounted() {
        console.log(this.label)
    },
}
</script>