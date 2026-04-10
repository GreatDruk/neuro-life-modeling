const field = document.getElementById('field');
const items = document.getElementById('items');
const entity = document.getElementById('entity');

const ctxField = field.getContext("2d");
const ctxItems = items.getContext("2d");
const ctxEntity = entity.getContext("2d");


let population = [];
const foods = [];

const initPopulationSize = 5;
const initNumFoods = 50;
const margin = 20;
const initMinFoodValue = 300;
const initMaxFoodValue = 1000;
