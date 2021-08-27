import { isMobile } from "mobile-device-detect";
import DB from "../libraries/DB";

let topMargin;
let armyMargin;
let sideMargin;

if (isMobile) {
  topMargin = 40;
  sideMargin = 20;
  armyMargin = 10;
} else {
  topMargin = 60;
  sideMargin = 50;
  armyMargin = 30;
}

const pageWidth = document.documentElement.clientWidth;
const armySpace = pageWidth - sideMargin * 2 - armyMargin * 2;

let scheme = {
  isMobile,
  pageWidth,
  topMargin,
  sideMargin, // ship movement margin
  gameDuration: 50, // secound
  remainingSecondPoints: 30, // per secound
  killingPoints: 50, // per secound
  army: {
    count: 60,
    space: armySpace,
    columnDistance: 10,
    rows: null,
    cols: null,
    firstImpactPoint: null,
    enemy: {
      width: 50,
      height: 45,
      startX: sideMargin + armyMargin,
      startY: topMargin,
    },
  },
  calcEnemiesFirstImpactPoint(crops) {
    let frontEnemy = crops[crops.length - 1];
    this.army.firstImpactPoint = frontEnemy.impactPoint.Y;
  },
  topscore: {
    save(score) {
      DB.save(score);
    },
    fetch() {
      return DB.load();
    },
  },
};

if (pageWidth < 700) {
  const ratio = (pageWidth * 100) / 700 / 100;

  scheme.army.columnDistance *= ratio;
  scheme.army.enemy.width *= ratio;
  scheme.army.enemy.height *= ratio;
}

//
scheme.army.cols = Math.floor(
  scheme.army.space / (scheme.army.enemy.width + scheme.army.columnDistance)
);

//
scheme.army.rows = Math.ceil(scheme.army.count / scheme.army.cols);

//
let shouldBeAddedToDistance = scheme.army.columnDistance / scheme.army.cols;

//
scheme.army.columnDistance =
  (scheme.army.space - scheme.army.cols * scheme.army.enemy.width) /
    scheme.army.cols +
  shouldBeAddedToDistance;

export default scheme;
