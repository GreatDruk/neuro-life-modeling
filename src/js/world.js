function resizeCanvases() {
    field.width = window.innerWidth;
    field.height = window.innerHeight;

    items.width = window.innerWidth;
    items.height = window.innerHeight;

    entity.width = window.innerWidth;
    entity.height = window.innerHeight;

    redrawItems();
}

const field = document.getElementById('field');
const ctxField = field.getContext("2d");

const items = document.getElementById('items');
const ctxItems = items.getContext("2d");

const entity = document.getElementById('entity');
const ctxEntity = entity.getContext("2d");

let population = [];
const foods = [];

resizeCanvases();
window.addEventListener('resize', resizeCanvases);


function redrawItems() {
    ctxItems.clearRect(0, 0, items.width, items.height);
    foods.forEach(food => {
        food.be();
    })
}


function getRandomInt(a, b) {
    return Math.floor(a + Math.random() * (b - a + 1)); 
}

function generateWorld(populationSize, numFoods) {
    for (let i = 0; i < populationSize; i++) {
        let x = getRandomInt(20, entity.width - 20);
        let y = getRandomInt(20, entity.height - 20);

        let man = new Man(x, y);
        man.comeIntoTheWorld();
    }

    for (let i = 0; i < numFoods; i++) {
        let x = getRandomInt(20, entity.width - 20);
        let y = getRandomInt(20, entity.height - 20);
        let foodValue = getRandomInt(300, 1000);

        let food = new Food(x, y, foodValue);
        foods.push(food);
    }

    redrawItems();
}

generateWorld(5, 50);


function startThePassageOfTime() {
    ctxEntity.clearRect(0, 0, entity.width, entity.height);

    population = population.filter(man => man.isAlive);

    population.forEach(man => {
        man.flight();
        man.searchForFood();
        man.be();
    })

    requestAnimationFrame(startThePassageOfTime);
}

startThePassageOfTime();
