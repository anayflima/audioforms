<template>

  <!-- <p>OLAAAA</p>

   <form action="/action_page.php">
			<label for="name">Nome:</label><br>
			<input type="text" id="name" name="name" value=""><br><br>

			<label for="age">Idade:</label><br>
			<input type="text" id="age" name="age" value=""><br><br>

			<label for="curso">Curso:</label><br>
			<input type="text" id="curso" name="curso" value=""><br><br>
			<input type="submit" value="Submit">
		</form>  -->

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

// import { ref } from 'vue'

const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition
// const Synthesis = window.speechSynthesis;
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
        console.log("ola")
        // const field = document.querySelector(this.selectors_array[0])
        // let field = this.$el.querySelector("#Name").value;
        // console.dir(field)
        // console.log("field")
        // console.log(field)

        console.log('this')
        console.log(this)

        // this.Recognition = window.SpeechRecognition || window.webkitSpeechRecognition

        console.log(sr)

        
        // sr =  new Recognition()
        
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

          // console.log('evt.results')
          // console.log(evt.results)

          for (let i = 0; i < evt.results.length; i++) {
            const result = evt.results[i]

            if (result.isFinal) this.CheckForCommand()
          }

          let evt_results_array = Array.from(evt.results)

          const t = evt_results_array[evt_results_array.length -1][0].transcript

          console.log(t)

          // console.log("i = ", i)

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
          // Vamos iniciar o preenchimento do forms
          this.speakSentence("Olá!").then(() => {
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
          // await speakSentence("Olá! Vamos iniciar o preenchimento do forms")
          // console.log('FIM SPEECH')
          
          
        },
        CheckForCommand () {
            
          //   const t = result[0].transcript;
          //   if (t.includes('stop recording')) {
          //     console.log('STOP RECORDING')
          //     sr.stop()
          //   } else if (
          //     t.includes('what is the time') ||
          //     t.includes('what\'s the time')
          //   ) {
          //     sr.stop()
          //     alert(new Date().toLocaleTimeString())
          //     setTimeout(() => sr.start(), 100)
          //   }
          // }

          // console.log('result')
          // console.log(result)

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