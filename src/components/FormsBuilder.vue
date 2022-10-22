<template>
    <div>
    <v-container>
        <v-row>
            <v-col cols="6">
                <FormsBuilderField @newFields="getFields"></FormsBuilderField>
            </v-col>

            <v-col cols="6">
                <BuildPreview :fields="fields"></BuildPreview>
            </v-col>
        </v-row>
    </v-container>

    </div>
</template>


<script>

import FormsBuilderField from './FormsBuilderField.vue';
import BuildPreview from './BuildPreview.vue';

export default {
    components: {
    FormsBuilderField,
    BuildPreview
},

    data: () => ({
        fields: []
    }),

    methods: {
        getFields(value) {
            this.fields = value
        }
    }

}
</script>