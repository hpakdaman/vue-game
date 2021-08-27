import scheme from "./scheme";
import _ from "lodash";

const crops = new Array();
let i = 0;

// getEnemiesInRow=(total,rowNumber)=>{
//   const rowLength=scheme.crops.
// }

let posY = scheme.army.enemy.startY;

getOut: for (let r = 1; r <= scheme.army.rows; r++) {
  let posX = scheme.army.enemy.startX;
  for (let c = 1; c <= scheme.army.cols; c++) {
    if (i >= scheme.army.count) {
      break getOut;
    }

    let mod = 0;
    let max = scheme.army.rows * scheme.army.cols;
    if (r == scheme.army.rows && (mod = max % scheme.army.count) > 0) {
      mod = Math.floor(mod / 2);
    }

    if (c > mod) {
      crops[i] = {
        index: i,
        posX,
        posY,
        W: scheme.army.enemy.width,
        H: scheme.army.enemy.height,
        impactPoint: {
          Y: posY + scheme.army.enemy.height,
          X: {
            from: posX,
            to: posX + scheme.army.enemy.width,
          },
        },
        head: false,
      };

      i++;
    }
    posX += scheme.army.enemy.width + scheme.army.columnDistance;
  }
  posY += scheme.army.enemy.height + scheme.army.columnDistance;
}

// behind enemies
let getHeadEnemies = (crops) => {
  let headEnemies = new Array();
  _.chain(crops)
    .groupBy("posX")
    .map((value) => {
      let enemy = _.maxBy(value, "posY");
      enemy.head = true;
      headEnemies.push(enemy);
    })
    .value();

  return headEnemies;
};

scheme.calcEnemiesFirstImpactPoint(crops);
export { scheme, crops, getHeadEnemies };
