<script setup>
import { ref, onMounted } from 'vue'
// import { useSpeechSynthesis } from '@vueuse/core'

const isRecording = ref(false)
// const transcript = ref('')
let selectors_array = ['#name', '#age', '#curso']
let fields_array = ['Nome', 'Idade', 'Curso']

let forms_field = [
    {
        label: 'Nome',
        description: 'Insira o seu nome completo',
    },
    {
        label: 'Idade',
        description: 'Insira a sua idade em anos',
    },
    {
        label: 'Curso',
        description: 'Insira o seu curso na graduação',
    },
]

let i = 0

const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition
// const Synthesis = window.speechSynthesis;
const sr = new Recognition()
// const voice = ref<SpeechSynthesisVoice>(undefined as unknown as SpeechSynthesisVoice)
// const text = ref('Hello, everyone! Good morning!')
// const speech = useSpeechSynthesis(text, {
//   voice,
// })

sr.lang = 'pt-BR';

onMounted(() => {
  const field = document.querySelector(selectors_array[0])
  // console.dir(field)
  console.log("field")
  console.log(field)
  // field.value = "OLAAAAAAA"
	// if you stop talking, it will continue there listening it
	sr.continuous = true

	sr.interimResults = false

	sr.onstart = () => {
		console.log('SR Started')
		isRecording.value = true
	}

	sr.onend = () => {
		console.log('SR Stopped')
		isRecording.value = false
	}

	sr.onresult = (evt) => {
		// speech.speak()
    // let inputEl = this.$refs.input.$el.querySelector('#Name')
    // console.log("inputEl")
    // console.log(inputEl)

		console.log('evt.results')
		console.log(evt.results)
		for (let i = 0; i < evt.results.length; i++) {
			const result = evt.results[i]

			if (result.isFinal) CheckForCommand(result)
		}

		// const t = Array.from(evt.results)
		// 	.map(result => result[0])
		// 	.map(result => result.transcript)
		// 	.join('')

		let evt_results_array = Array.from(evt.results)

		// console.log('evt_results_array')
		// console.log(evt_results_array)
		// console.log("evt_results_array.length -1")
		// console.log(evt_results_array.length -1)

		// console.log(evt_results_array[evt_results_array.length -1])
		// console.log(evt_results_array[evt_results_array.length -1][0].transcript)

		const t = evt_results_array[evt_results_array.length -1][0].transcript

		console.log(t)

		console.log("i = ", i)

		// if(this) {
		// 	console.log('ok')
		// 	let inputEl = this.$refs.input.$el.querySelector('input')
		// 	console.dir(inputEl)
		// 	this.input = t
		// }
		// console.dir(transcript)

		// transcript.value = t
		// console.log('depois')
		// console.dir(transcript)

		if (i < selectors_array.length) {

			const field = document.querySelector(selectors_array[i])
			// console.dir(field)
			field.value = t
			i = i + 1
			speakSentence(fields_array[i]).then((result) => {
        console.log(result)
				console.log('FIM SPEECH')
				console.log("IF ACABOU FORMS com i = ", i)
				if (i >= selectors_array.length) {
					console.log("ACABOU O FORMS")
					alert("ACABOU O FORMS")
					// sr.stop()
				}
			})
		}
		// console.dir(field)

	}
})

const CheckForCommand = (result) => {
	const t = result[0].transcript;
	if (t.includes('stop recording')) {
		console.log('STOP RECORDING')
		sr.stop()
	} else if (
		t.includes('what is the time') ||
		t.includes('what\'s the time')
	) {
		sr.stop()
		alert(new Date().toLocaleTimeString())
		setTimeout(() => sr.start(), 100)
	}
}

async function speakSentence (sentence) {
	if ('speechSynthesis' in window ) {
		console.log("vou falar: ", sentence)
		var to_speak = new SpeechSynthesisUtterance(sentence);
		to_speak.lang = 'pt-BR'

		window.speechSynthesis.speak(to_speak);

		return new Promise(resolve => {
			to_speak.onend = resolve;
		});
	}

}

const ToggleMic = () => {
	speakSentence("Olá! Vamos iniciar o preenchimento do forms").then(() => {
		speakSentence(fields_array[0]).then(() => {
			console.log('FIM SPEECH')
			if (isRecording.value) {
				sr.stop()
			} else {
				sr.start()
			}
		})
	})
	// await speakSentence("Olá! Vamos iniciar o preenchimento do forms")
	// console.log('FIM SPEECH')


}
</script>

<template>

    <v-container class="pl-10">
    <v-btn color="primary" elevation="1" small @click="ToggleMic"></v-btn>
    
    <br/>

    <!-- <v-btn type="submit" @click="ToggleMic">
    Iniciar forms
    </v-btn> -->
    <v-form ref="formNames" v-model="validForm" lazy-validation>
    <v-row v-for="(field, index) in forms_field" :key="index">
      <v-col cols="12">
      <v-text-field
        v-model="field.label"
        :label="field.label"
        :id="field.label.toLowerCase()"
      />
      </v-col>
    </v-row>
    </v-form>
    <v-btn type="submit" @click="Submit" :disabled="!validForm">
    Submit
    </v-btn>
    </v-container>
</template>

<!-- <style>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: 'Fira sans', sans-serif;
}

body {
	background: #281936;
	color: #FFF;
}
</style> -->
