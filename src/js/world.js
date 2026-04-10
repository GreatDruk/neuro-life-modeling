function resizeCanvases() {
    field.width = window.innerWidth;
    field.height = window.innerHeight;

    items.width = window.innerWidth;
    items.height = window.innerHeight;

    entity.width = window.innerWidth;
    entity.height = window.innerHeight;

    redrawItems();
}

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

function generateWorld(
    populationSize, numFoods, minFoodValue, maxFoodValue
) {
    for (let i = 0; i < populationSize; i++) {
        let x = getRandomInt(margin, entity.width - margin);
        let y = getRandomInt(margin, entity.height - margin);

        let man = new Man(x, y);
        man.comeIntoTheWorld();
    }

    for (let i = 0; i < numFoods; i++) {
        let x = getRandomInt(margin, items.width - margin);
        let y = getRandomInt(margin, items.height - margin);
        let foodValue = getRandomInt(minFoodValue, maxFoodValue);

        let food = new Food(x, y, foodValue);
        foods.push(food);
    }

    redrawItems();
}

generateWorld(
    initPopulationSize, initNumFoods,
    initMinFoodValue, initMaxFoodValue
);


function startThePassageOfTime() {
    ctxEntity.clearRect(0, 0, entity.width, entity.height);

    frameCnt++;
    if (frameCnt == foodSpawnPeriod) {
        frameCnt = 0;
        spawnFood(minFoodValue, maxFoodValue);
    }

    population = population.filter(man => man.isAlive);

    population.forEach(man => {
        man.flight();
        man.searchForFood();
        man.be();
    })

    requestAnimationFrame(startThePassageOfTime);
}

startThePassageOfTime();
