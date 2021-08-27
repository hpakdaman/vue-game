<template>
  <i
    class="enemy"
    :style="{
      'background-image': 'url(' + image + ')',
      left: this.posX + 'px',
      top: this.posY + 'px',
      width: this.W + 'px',
      height: this.H + 'px',
    }"
  ></i>
</template>

<script>
import image from '../assets/objects/enemy-spider.gif'
export default {
  name: 'enemy',
  data() {
    return {
      image
    }
  },
  props: {
    index: {
      type: Number
    },
    posX: {
      type: Number
    },
    posY: {
      type: Number
    },
    W: {
      type: Number
    },
    H: {
      type: Number
    }
  }
}
</script>

<style scope>
.enemy {
  position: absolute;
  /* background: black; */
  background-size: cover;
}
</style>