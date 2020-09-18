<template>
  <div id="app">
    <p> vue-interpolate demo </p>
    <svg width="500" height="500">
      <Interpolate :attrs="{
        height: { value: height, duration: 2000, delay: 4000, ease: 'easeQuad' },
        y: { value: (500 - height) / 2, duration: 2000, delay: 2000, ease: 'easeQuad' },
        fill: { value: fill }
      }">
        <rect width="500"/>
      </Interpolate>
    </svg>
  </div>
</template>

<script>
import Interpolate from './Interpolate'
export default {
  name: 'App',
  data () {
    return {
      height: 250,
      fill: 'black',
      timeout: null
    }
  },
  components: {
    Interpolate
  },
  mounted () {
    setTimeout(this.update, 1000)
  },
  beforeDestroy () {
    clearTimeout(this.timeout)
  },
  methods: {
    update () {
      this.height = Math.random() * 500
      this.fill = ['#8500FF', 'rgb(255,221,0)', 'black'][Math.floor(Math.random() * 3)]
      this.timeout = setTimeout(this.update, 1000)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
