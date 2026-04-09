function resizeCanvases() {
    field.width = window.innerWidth;
    field.height = window.innerHeight;

    items.width = window.innerWidth;
    items.height = window.innerHeight;

    entity.width = window.innerWidth;
    entity.height = window.innerHeight;
}

const field = document.getElementById('field');
const ctxField = field.getContext("2d");

const items = document.getElementById('items');
const ctxItems = items.getContext("2d");

const entity = document.getElementById('entity');
const ctxEntity = entity.getContext("2d");

resizeCanvases();
window.addEventListener('resize', resizeCanvases);


function redrawItems() {
    ctxItems.clearRect(0, 0, items.width, items.height);
    foods.forEach(food => {
        food.be();
    })
}

function startThePassageOfTime() {
    ctxEntity.clearRect(0, 0, entity.width, entity.height);

    population.forEach(man => {
        man.flight();
        man.searchForFood();
        man.be();
    })

    requestAnimationFrame(startThePassageOfTime);
}

const population = [];
const foods = [];

startThePassageOfTime();
