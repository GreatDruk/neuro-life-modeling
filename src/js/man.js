class Man {
    constructor(
        x=10, y=10, vx=0, vy=0, maxVx=1, maxVy=1,
        weights=null, energy=800, movementEnergyCost=1, threshold=1500,
        width=15, height=25, round=5,
        lineWidth=1, fillColor="#8c00a9", strokeColor="#000"
    ) {
        this.isAlive = true;
        this.closestFoodX = 0;
        this.closestFoodY = 0;

        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.maxVx = maxVx;
        this.maxVy = maxVy;
        this.weights = weights || [
            [Math.random() * 10 - 5, Math.random() * 10 - 5],
            [Math.random() * 10 - 5, Math.random() * 10 - 5],
            [Math.random() * 2 - 1, Math.random() * 2 - 1]
        ];
        this.energy = energy;
        this.movementEnergyCost = movementEnergyCost;
        this.threshold = threshold;

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

    think() {
        this.searchForFood();

        const decision = this.decide();

        this.vx = decision[0] * this.maxVx;
        this.vy = decision[1] * this.maxVy;

        this.flight();
    }

    decide() {
        let decideX = 0;
        let decideY = 0;

        const info = [
            this.closestFoodX / entity.width,
            this.closestFoodY / entity.height,
            this.energy / this.threshold
        ];

        for (let i = 0; i < info.length; i++) {
            decideX += this.weights[i][0] * info[i];
            decideY += this.weights[i][1] * info[i];
        }

        return [Math.tanh(decideX), Math.tanh(decideY)]
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
        this.closestFoodX = 0;
        this.closestFoodY = 0;

        let minDistSq = Infinity;
        let closestFoodX = 0;
        let closestFoodY = 0;
        let closestFoodInd = -1;

        for (let i = 0; i < foods.length; i++) {
            const dx = (foods[i].x + foods[i].width / 2) - (this.x + this.width / 2);
            const dy = (foods[i].y + foods[i].height / 2) - (this.y + this.height / 2);
            const distSq = dx * dx + dy * dy;

            if (distSq < minDistSq) {
                minDistSq = distSq;
                closestFoodInd = i;
                closestFoodX = dx;
                closestFoodY = dy;
            }
        }

        if (closestFoodInd !== -1) {
            const minDist = Math.sqrt(minDistSq);

            this.closestFoodX = closestFoodX;
            this.closestFoodY = closestFoodY;

            if (minDist < 1.5 * foods[closestFoodInd].width) {
                this.eat(closestFoodInd); 
            }
        }
    }

    eat(index) {
        this.energy += foods[index].foodValue;
        this.closestFoodX = 0;
        this.closestFoodY = 0;

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
