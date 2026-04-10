class Man {
    constructor(
        x=10, y=10, vx=0, vy=0,
        energy=700, movementEnergyCost=1,
        width=15, height=25, round=5,
        lineWidth=1, fillColor="#8c00a9", strokeColor="#000"
    ) {
        this.isAlive = true;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.energy = energy;
        this.movementEnergyCost = movementEnergyCost;

        this.width = width;
        this.height = height;
        this.round = round;
        this.lineWidth = lineWidth;
        this.fillColor = fillColor;
        this.strokeColor = strokeColor;
    }

    comeIntoTheWorld() {
        population.push(this);
    }

    be() {
        ctxEntity.fillStyle = this.fillColor;
        ctxEntity.strokeStyle = this.strokeColor;
        ctxEntity.lineWidth = this.lineWidth;

        ctxEntity.beginPath();
        ctxEntity.roundRect(this.x, this.y, this.width, this.height, this.round);
        ctxEntity.fill();
        ctxEntity.stroke();
    }

    flight() {
        if (this.x + this.vx - this.lineWidth < 0) {
            this.x = this.lineWidth + 1;
        } else if (this.width + this.x + this.vx + this.lineWidth > entity.width) {
            this.x = entity.width - this.width - this.lineWidth;
        } else {
            this.x += this.vx;
        }

        if (this.y + this.vy - this.lineWidth < 0) {
            this.y = this.lineWidth + 1;
        } else if (this.height + this.y + this.vy + this.lineWidth > entity.height) {
            this.y = entity.height - this.height - this.lineWidth;
        } else {
            this.y += this.vy;
        }

        this.energy -= this.movementEnergyCost;
        if (this.energy < 0) {
            this.goOutOfTheWorld();
        }
    }

    searchForFood() {
        let minDistSq = Infinity;
        let closestFood = -1;

        for (let i = 0; i < foods.length; i++) {
            const dx = this.x - foods[i].x;
            const dy = this.y - foods[i].y;
            const distSq = dx * dx + dy * dy;

            if (distSq < minDistSq) {
                minDistSq = distSq;
                closestFood = i;
            }
        }

        if (closestFood !== -1) {
            const minDist = Math.sqrt(minDistSq);

            if (2 * minDist < this.width + foods[closestFood].width) {
                this.eat(closestFood); 
            }
        }
    }

    eat(index) {
        this.energy += foods[index].foodValue;
        foods.splice(index, 1);
        redrawItems();
    }

    bringIntoTheWorld() {
        return null;
    }

    goOutOfTheWorld() {
        this.isAlive = false;
    }
}
