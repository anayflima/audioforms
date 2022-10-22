<template>

    <v-container class="pl-10">
    <v-btn color="primary" elevation="1" small @click="ToggleMic"></v-btn>
    
    <br/>

    <v-form ref="formNames" v-model="validForm" lazy-validation>
    <v-row v-for="(field, index) in forms_field" :key="index">
      <v-col cols="12">
      <v-text-field
        v-model="nome"
        :label="field.label"
        :placeholder="nome"
        :id="field.label.toLowerCase()"
      />
      </v-col>
    </v-row>
    </v-form>
    <v-btn type="submit" @click="submit">
    Submit
    </v-btn>
    </v-container>
</template>

<script>

const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition
const sr = new Recognition()
let i = 0

export default {
    
    data: () => ({

        isRecording: false,
        selectors_array: ['#name', '#age', '#curso'],
        fields_array: ['Nome', 'Idade', 'Curso'],
        forms_field: [
            {
                id: 'nome',
                label: 'Nome',
                description: 'Insira o seu nome completo',
            },
            {
                id: 'idade',
                label: 'Idade',
                description: 'Insira a sua idade em anos',
            },
            {
                id: 'curso',
                label: 'Curso',
                description: 'Insira o seu curso na graduação',
            },
        ],
        nome: "",
        idade: "",
        curso: "",
    }),

    mounted() {
        console.log(sr)
              
        sr.lang = 'pt-BR';
        sr.continuous = false

        sr.interimResults = true

        sr.onstart = () => {
          console.log('SR Started')
          this.isRecording = true
        }

        sr.onend = () => {
          console.log('SR Stopped')
          this.isRecording = false
        }

        sr.onresult = (evt) => {

          for (let i = 0; i < evt.results.length; i++) {
            const result = evt.results[i]

            if (result.isFinal) this.CheckForCommand()
          }

          let evt_results_array = Array.from(evt.results)

          const t = evt_results_array[evt_results_array.length -1][0].transcript

          console.log(t)

          this.nome = t

        }
      },

    methods: {
        submit() {
            console.log("aiosn")
        },
        async speakSentence (sentence) {
          if ('speechSynthesis' in window ) {
            console.log("vou falar: ", sentence)
            var to_speak = new SpeechSynthesisUtterance(sentence);
            to_speak.lang = 'pt-BR'

            window.speechSynthesis.speak(to_speak);

            return new Promise(resolve => {
              to_speak.onend = resolve;
            });
          }

        },
        ToggleMic() {
          this.speakSentence("Olá! Vamos iniciar o preenchimento do forms").then(() => {
            this.speakSentence(this.fields_array[0]).then(() => {
              console.log('FIM SPEECH')
              console.log('sr')
              console.log(sr)
              if (this.isRecording) {
                sr.stop()
              } else {
                sr.start()
              }
            })
          })
          
          
        },
        CheckForCommand () {

          console.log("IF ACABOU FORMS com i = ", i)

          if (i >= this.selectors_array.length - 1) {
                // está no último campo. E já escrevi nele.
                // acabo o forms
                console.log("No ultimo campo")

                console.log("ACABOU O FORMS")

                this.speakSentence("O formulário acabou. Vou submeter").then(() => {
                  alert("SUBMETENDO...")
                })
          }
          else {
            // não é o ultimo campo. Falo o proximo campo

            i = i + 1
            this.speakSentence(this.fields_array[i]).then((result) => {
              console.log('result')
              console.log(result)
              console.log('FIM SPEECH')
              
              sr.start()
            })
          }
        }
        
    }
}

</script>