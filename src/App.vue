<template>
  <p>OLA</p>
  <div>
      <FinalFormsBuild 
          v-for="f in allFields"
          :key="f.id"
          :label="f.label"
          :transcription="audioResult"
      >
      </FinalFormsBuild>
  </div>
</template>

<script>
import FinalFormsBuild from '@/components/FinalFormsBuild.vue';

const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition
const sr = new Recognition()
let i = 0

console.log("APP")

export default {
  components: { 
      FinalFormsBuild 
  },

  props: {
      allFields: Array
  },

  data: () => ({
      audioResult: "",
      isRecording: false,
  }),

  methods: {
      async speakSentence(sentence) {
          if ('speechSynthesis' in window) {
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
              this.speakSentence(this.allFields[0].description).then(() => {
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
        if (i >= this.allFields.length - 1) {
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
          this.speakSentence(this.allFields[i].description).then((result) => {
            console.log('result')
            console.log(result)
            console.log('FIM SPEECH')
            
            sr.start()
          })
        }
      }
  },

  mounted() {
      // setup
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
        this.audioResult = t
      }
  }

}
</script>