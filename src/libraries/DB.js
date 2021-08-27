export default {
  LS_KEY: "attack-the-enemy-game",
  save(topScore) {
    console.log("saving score :" + topScore);
    localStorage.setItem(this.LS_KEY, JSON.stringify(topScore));
  },
  load() {
    let score = JSON.parse(localStorage.getItem(this.LS_KEY));
    console.log("loading score :" + score);
    return score;
  },
};
