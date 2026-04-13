const field = document.getElementById('field');
const items = document.getElementById('items');
const entity = document.getElementById('entity');

const ctxField = field.getContext("2d");
const ctxItems = items.getContext("2d");
const ctxEntity = entity.getContext("2d");


let population = [];
const foods = [];

const initPopulationSize = 10;
const initNumFoods = 150;
const margin = 20;
const initMinFoodValue = 300;
const initMaxFoodValue = 1200;

let minFoodValue = initMinFoodValue;
let maxFoodValue = initMaxFoodValue;

let frameCnt = 0;
const foodSpawnPeriod = 60;

const minMaxVx = 0.5;
const maxMaxVx = 5;
const minMaxVy = 0.5;
const maxMaxVy = 5;
const minMovementEnergyCost = 0.2;
const minThreshold = 500;
const minMutationRate = 0.01;
const rateMutationRate = 0.1;

const reproductionCost = 0.6;
