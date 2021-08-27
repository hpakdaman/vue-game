<template>
  <div>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
    />

    <result
      :win="!start && win === true"
      :lose="!start && win === false"
      :info="{
        elapsedTime,
        scoreOfRemainingTime,
        scoreOfKilling,
        totalScore,
        topScore,
      }"
      @playAgain="begin"
    ></result>

    <h1 class="click-to-start" v-if="!start">
      <span v-if="isMobile">TAP TO START</span>
      <span v-else>CLICK TO START</span>
    </h1>

    <div :class="{ blur: !start }">
      <statistics
        :start="start"
        :time="remainingTime"
        :score="scoreOfKilling"
        :topScore="topScore"
      ></statistics>

      <ship :size="50" @fire="shipFire" :start="start"></ship>

      <bullet
        v-for="bullet in bullets"
        :key="bullet.index"
        :index="bullet.index"
        :fromEnemy="bullet.isEnemy"
        :startY="bullet.startY"
        :startX="bullet.startX"
        @move="moveBullet($event)"
        @destroy="destroyBullet(bullet.index)"
      ></bullet>

      <enemy
        v-for="enemy in enemies"
        :key="enemy.index"
        :index="enemy.index"
        :posX="enemy.posX"
        :posY="enemy.posY"
        :W="enemy.W"
        :H="enemy.H"
      ></enemy>
    </div>
  </div>
</template>

<script> 
import result from './components/result.vue'
import statistics from './components/statistics.vue'
import ship from './components/ship.vue'
import enemy from './components/enemy.vue'
import bullet from './components/bullet.vue'
import { scheme, crops, getHeadEnemies } from './libraries/crops'
import playSound from './libraries/playsound'
import explosion from './libraries/explosion'
import _ from 'lodash'

import mp3explosion from './assets/1911-.45-ACP-Close-Single-Gunshot.mp3'


export default {
  name: 'App',
  components: {
    statistics,
    result,
    ship,
    enemy,
    bullet,
  },
  data() {
    return {
      isMobile: scheme.isMobile,
      start: false,
      round: 0,
      duration: scheme.gameDuration,
      elapsedTime: 0,
      killedEnemies: 0,
      win: null,
      lastIndex: 0,
      bullets: [],
      enemies: crops,
      headEnemies: [],
      tmpTopScore: null,
    }
  },
  methods: {
    newIndex() {
      return ++this.lastIndex
    },
    resetGame() {
      // reset game status
      this.killedEnemies = 0
      this.elapsedTime = 0
      this.win = null
      this.enemies = crops // it also fills the headEnemies  variable due to watching
    },
    begin() {
      if (!this.start) {
        console.log(":: GAME STARTED ::")
        this.round++
        this.start = true

        this.resetGame()

        this.elapsedTime += 1
        this.timeInterval = setInterval(() => {
          this.elapsedTime += 1
          if (this.elapsedTime >= this.duration) {
            this.finished()
          }
        }, 1000)

      }
    },
    finished() {
      this.start = false
      this.win = this.wonTheGame(this.totalScore)
      clearInterval(this.timeInterval)
    },
    wonTheGame(score) {
      let maxScore = parseInt(this.topScore) || 0

      if (score < 1000) return false // not enough score to win

      if (score > maxScore) {
        this.topScore = score
        return true
      }
      return false
    },
    shipFire(posX, posY) {
      this.bullets.push({
        index: this.newIndex(),
        isEnemy: false,
        startX: posX,
        startY: posY,
      })
    },
    moveBullet({ X, Y, index: bulletIndex }) {
      if (!this.start)
        return
      // if it reaches the front impact point of the army 
      if (Y <= scheme.army.firstImpactPoint) {
        let enemy = _.find(this.headEnemies, (data) => {
          return X >= data.impactPoint.X.from && X <= data.impactPoint.X.to && data.head == true
        })
        // the bullet is going to strike the enemy\

        if (enemy) {

          if (Y <= enemy.impactPoint.Y) {
            // striked enemy (remove enemy)
            let enemyIndex = enemy.index
            this.enemies = this.enemies.filter((enemy) => {
              return enemy.index !== enemyIndex
            })

            this.destroyBullet(bulletIndex)

            // show explosion instade of enemy  
            explosion(X, Y)
            playSound(mp3explosion, 50)

            this.killedEnemies++
            if (this.killedEnemies == scheme.army.count) {
              this.finished()
            }
          }
        }
      }
    },
    destroyBullet(index) {
      // console.log('removing ' + index)
      this.bullets = this.bullets.filter((bullet) => {
        return bullet.index !== index
      })
    },
  },
  mounted() {
    this.tmpTopScore = scheme.topscore.fetch()
    document.addEventListener("mouseup", () => {
      if (this.round == 0)
        this.begin()
    })

    window.audio = new Audio()
  },
  computed: {
    remainingTime() {
      return this.duration - this.elapsedTime
    },
    scoreOfRemainingTime() {
      return this.remainingTime * scheme.remainingSecondPoints
    },
    scoreOfKilling() {
      return this.killedEnemies * scheme.killingPoints
    },
    totalScore() {
      return this.scoreOfRemainingTime + this.scoreOfKilling
    },
    topScore: {
      get() {
        return this.tmpTopScore
      },
      set(val) {
        scheme.topscore.save(val)
        this.tmpTopScore = val
      }
    }
  },
  watch: {
    enemies: {
      immediate: true,
      handler(val) {
        this.headEnemies = getHeadEnemies(val)
      }
    }
  }
}

</script>

<style>
html,
body {
  overflow: hidden;
}
body {
  margin: 0;
  padding: 0;
  background-color: #99f9f6bf;
  touch-action: manipulation;
}
.blur {
  filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius='3');
  -webkit-filter: url(#blur-filter);
  filter: url(#blur-filter);
  -webkit-filter: blur(4px);
  filter: blur(4px);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
