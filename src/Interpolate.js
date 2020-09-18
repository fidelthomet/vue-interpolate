
import { timer } from 'd3-timer'
import { interpolate } from 'd3-interpolate'
import * as ease from 'd3-ease'

export default {
  name: 'object-sphere',
  data () {
    return {
      timers: {},
      interpolatedAttrs: {},
      slot: null
    }
  },
  render (h) {
    const attrs = { ...this.$slots.default[0].data.attrs, ...this.interpolatedAttrs }
    const vNode = this.$slots.default[0]
    return h(vNode.tag, { ...vNode.data, attrs }, vNode.children || vNode.text)
  },
  props: ['attrs'],
  created () {
    this.slot = { ...this.$slots.default[0] }
  },
  watch: {
    attrs: {
      handler (attrs, oldAttrs) {
        if (oldAttrs == null) {
          this.interpolatedAttrs = Object.fromEntries(Object.keys(attrs).map(key => {
            return [key, attrs[key].value]
          }))
          this.$slots.default[0].data.attrs = Object.assign({}, { ...this.$slots.default[0].data.attrs, ...this.interpolatedAttrs })
          return
        }
        this.timers = Object.fromEntries(Object.keys(attrs).map(key => {
          const attr = { duration: 1000, delay: 0, ease: 'easeLinear', ...attrs[key] }
          let interpolation
          let firstRun = true
          const t = timer((elapsed) => {
            if (firstRun) {
              interpolation = interpolate(this.interpolatedAttrs[key], attrs[key].value)
              firstRun = false
            }
            const progress = elapsed / attr.duration
            this.interpolatedAttrs[key] = interpolation(ease[attr.ease](Math.min(progress, 1)))
            this.$slots.default[0].data.attrs[key] = this.interpolatedAttrs[key]
            if (elapsed > attr.duration) t.stop()
          }, attr.delay)
          return [key, t]
        }))
      },
      deep: true,
      immediate: true
    }
  }
}
