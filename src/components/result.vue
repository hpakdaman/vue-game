<template>
  <div>
    <div class="gameover" v-if="lose">
      <b>GAME OVER</b><br />
      <span>
        <ul>
          <li>
            points you've earned from hitting the enemies :
            {{ presentScoreOfKilling }}
          </li>
          <li>
            points you've earned of elapsed time :
            {{ presentScoreOfRemainingTime }}
            <small>({{ info.elapsedTime }} seconds)</small>
          </li>

          <li>
            Top Score :
            {{ info.topScore }}
          </li>
        </ul>
      </span>
      <div class="total-score">
        Your Total Score : <i>{{ presentTotalScore }}</i>
      </div>
      <button @click="this.$emit('playAgain')">Play Again</button>
    </div>

    <div class="win" v-if="win">
      <b>YOU WIN</b><br />
      <span>
        <ul>
          <li>
            points you've earned from hitting the enemies :
            {{ presentScoreOfKilling }}
          </li>
          <li>
            points you've earned of elapsed time :
            {{ presentScoreOfRemainingTime }}
            <small>({{ info.elapsedTime }} seconds)</small>
          </li>

          <li>
            Top Score :
            {{ info.topScore }}
          </li>
        </ul>
      </span>
      <div class="score">
        Your Score : <i>{{ presentTotalScore }}</i>
      </div>
      <button @click="this.$emit('playAgain')">Play Again</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'result',
  props: {
    info: {
      type: Object,
    },
    win: {
      type: Boolean,
      default: false,
    },
    lose: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    presentScoreOfRemainingTime() {
      return this.info.scoreOfRemainingTime.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    },
    presentScoreOfKilling() {
      return this.info.scoreOfKilling.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    },
    presentTotalScore() {
      return this.info.totalScore.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
  }
}
</script>

<style>
.click-to-start {
  color: #fff;
  position: absolute;
  bottom: 50px;
  width: 100%;
  background: #f95a5a;
}
.gameover,
.win {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;

  font-weight: bold;
  font-size: 52px;
  padding-top: 20%;
  z-index: 1;
}
.gameover {
  background: #6d0a0adb;
  color: #fff;
}
.win {
  background: #0177249f;
  color: #fff;
}
.gameover button,
.win button {
  background: #fff;
  border: none;
  padding: 10px 15px;
  font-size: 22px;
}

ul {
  margin: 0;
  font-size: 15px;
  display: inline-block;
}
ul li {
  text-align: left;
}

.total-score {
  font-size: 30px;
}

.gameover .total-score {
  color: #ffe100;
}
.win .total-score {
  color: #1f522e;
}
</style>