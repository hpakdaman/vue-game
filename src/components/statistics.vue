<template>
  <div class="statistics">
    <div class="container">
      <!-- <span class="lifes">
        <font-awesome-icon
          class="heart"
          icon="heart"
          size="1x"
          :style="{ color: 'red' }"
          v-for="(heart, index) in lifes"
          :key="index"
        />
      </span> -->

      <span class="score">
        <font-awesome-icon icon="burn" size="1x" :style="{ color: 'green' }" />
        <small> SCORE : </small>
        <i>{{ presentScore }}</i>
        <template v-if="topScore">
          | &nbsp; &nbsp; &nbsp;

          <font-awesome-icon
            icon="trophy"
            size="1x"
            :style="{ color: 'blue' }"
          />
          <small> TOP : </small>{{ topScore }}
        </template>
      </span>

      <span class="count-down">
        <font-awesome-icon
          icon="stopwatch"
          size="1x"
          :style="{ color: 'red' }"
        />
        <small> TIMER : </small><i class="sec">{{ time }}</i>
      </span>
    </div>
  </div>
</template>

<script>
// import anumber from "./anumber"
export default {
  name: 'statistics',
  components: {
    // 'anumber': anumber
  },
  data() {
    return {
      presentScore: 0,
      interval: false
    }
  },
  props: {
    score: {
      type: Number,
      default: 0
    },
    topScore: {
      type: Number,
      default: 0
    },
    start: {
      type: Boolean,
      default: null
    },
    time: {
      type: Number,
      default: 0
    },
  },
  mounted() {
    this.presentScore = this.score ? this.score : 0;
  },
  watch: {
    score() {
      clearInterval(this.interval);

      if (this.score == this.presentScore) {
        return;
      }

      this.interval = window.setInterval(() => {
        if (this.presentScore != this.score) {
          var change = (this.score - this.presentScore) / 10;
          change = change >= 0 ? Math.ceil(change) : Math.floor(change);
          this.presentScore = this.presentScore + change;
        }
      }, 20);
    }
  }
}
</script>

<style scoped>
.statistics {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  background: #fff;
}

.statistics .container {
  padding: 10px;
}

.lifes {
  min-width: 75px;
  display: inline-block;
}
.heart {
  margin-left: 5px;
}
.score {
  margin-left: 10px;
  min-width: 230px;
  display: inline-block;
  text-align: left;
}

.score i {
  min-width: 45px;
  display: inline-block;
}

.count-down {
  margin-left: 20px;
}
</style>