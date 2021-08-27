<template>
  <i
    class="ship"
    :style="{
      'background-image': 'url(' + image + ')',
      left: left,
      bottom: '10px',
      width: size + 'px',
      height: size * 1.29 + 'px',
    }"
  ></i>
</template>

<script>
import image from '../assets/objects/ship1.png'
import scheme from '../libraries/scheme'
export default {
  name: 'ship',
  $emit: ['fire', 'move'],
  data() {
    return {
      image,
      clientX: 0,
      clientY: 0,
      deltaX: 0,
      deltaY: 0,
      clicked: false,
      movingMargin: scheme.sideMargin,
      posX: document.documentElement.clientWidth / 2,
    }
  },
  props: {
    size: {
      type: Number,
      default: 100
    },
    start: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    touch(event) {
      event = event || window.event
      let clientX
      try {
        switch (event.type) {
          case "touchstart":
            clientX = event.touches[0].clientX
            // clientY = event.touches[0].clientY
            break
          case "touchend":
            clientX = event.changedTouches[0].clientX
            // clientY = event.changedTouches[0].clientY
            break
          case "touchmove":
            clientX = event.touches[0].clientX
            // clientY = event.touches[0].clientY
            break
        }
        this.move(clientX)
        // this.fire()
      } catch (e) {
        return
      }
    },
    move(mouseX) {
      const leftPos = this.shipLeftPosition(mouseX)
      const rightPos = this.shipRightPosition(mouseX)
      const maxMove = document.documentElement.clientWidth - this.movingMargin

      if (!this.start) {
        throw Error('first click to start!')
      }

      if (leftPos < this.movingMargin) {
        throw Error('out of range!')
      }

      if (rightPos > maxMove) {
        throw Error('out of range!')
      }


      this.posX = mouseX
      this.$emit('move', this.posX)
    },
    fire() {
      if (!this.start) return false
      // make a delay
      if (!this.timeout) {
        this.timeout = setTimeout(() => {
          this.timeout = null
          this.clicked = false
        }, 250)

      }

      if (!this.clicked) {
        this.clicked = true
        const posY = this.$el.offsetTop
        this.$emit('fire', this.posX, posY)
      }
    },
    shipLeftPosition(position) {
      return position - this.size / 2
    },
    shipRightPosition(position) {
      return position + this.size / 2
    }
  },
  computed: {
    left: {
      get() {
        return this.shipLeftPosition(this.posX) + 'px'
      }
    }
  },
  mounted() {
    if (scheme.isMobile) {
      document.addEventListener('touchstart', this.touch, false)
      document.addEventListener('touchmove', this.touch, false)
      document.addEventListener('touchend', this.touch, false)
    } else {
      document.addEventListener("mousemove", (e) => {
        try {
          this.move(e.clientX)
        } catch (e) {
          return
        }
      })
    }

    // fire
    document.addEventListener("mouseup", (e) => {
      e.stopPropagation()
      this.fire()
    })


  }
}
</script>

<style scoped>
.ship {
  position: absolute;
  width: 100px;
  background-size: cover;
}
#source {
  position: absolute;
  width: 100%;
  height: 100px;
  bottom: 0px;
  left: 0px;
  background-color: rgba(168, 200, 238, 0.096);
  z-index: -1;
}
</style>
