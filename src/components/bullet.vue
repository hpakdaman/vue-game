<template>
  <div>
    <div
      className="bullet"
      :style="{
        width: this.caliber + 'px',
        left: this.X + 'px',
        top: this.Y + 'px',
      }"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'bullet',
  $emit: ['destroy', 'move'],
  data() {
    return {
      Y: this.startY,
      timer: null,
    }
  },
  props: {
    index: {
      type: Number
    },
    fromEnemy: {
      type: Boolean
    },
    startY: {
      type: Number,
      required: true
    },
    startX: {
      type: Number,
      required: true
    },
    caliber: {
      type: Number,
      default: 2
    },
    speed: {
      type: Number,
      default: 20
    }
  },
  created() {
    this.timer = setInterval(() => {
      this.Y -= 70
      this.$emit('move', { X: this.X, Y: this.Y, index: this.index })
    }, 70)
  },
  beforeUnmount() {
    clearInterval(this.timer)
  },
  computed: {
    X() {
      return this.startX - this.caliber / 2
    },

    direction() {
      return this.fromEnemy ? "top" : "bottom"
    }

  },
  methods: {
    destroy() {
      this.$emit('destroy')
    }
  },
  watch: {
    Y(val) {
      if (val < 0) {
        this.destroy()
      }
    }
  }
}
</script>

<style>
.bullet {
  height: 8px;
  background: red;
  position: absolute;
  transition: all 70ms;
}
</style>