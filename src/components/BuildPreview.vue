<template>
    <div>
        <PreviewForms 
            v-for="f in fields"
            :key="f.id"
            :label="f.label" 
            :description="f.description"> 
        </PreviewForms>
        <v-btn v-if="show" color="#239B56" type="submit"> Submeter </v-btn>
    </div>
</template>

<script>
import PreviewForms from "@/components/PreviewForms.vue"

export default {
    components: { 
        PreviewForms 
    },

    props: {
        fields: Array
    },

    computed: {
    show() {
      return this.fields.length > 0 
    }
  }
}
</script>