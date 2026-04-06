function resizeField() {
    field.width = window.innerWidth;
    field.height = window.innerHeight;
}

const field = document.getElementById('field');
const ctx = field.getContext("2d");

resizeField();
window.addEventListener('resize', resizeField);


function startThePassageOfTime() {
    ctx.clearRect(0, 0, field.width, field.height);

    population.forEach(man => {
        man.flight();
        man.be();
    })

    requestAnimationFrame(startThePassageOfTime);
}

const population = [];
startThePassageOfTime();
