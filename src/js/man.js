class Man {
    constructor(
        x=10, y=10, vx=0, vy=0, width=15, height=25, round=5,
        lineWidth=1, fillColor="#8c00a9", strokeColor="#000"
    ) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;

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
        ctx.fillStyle = this.fillColor;
        ctx.strokeStyle = this.strokeColor;
        ctx.lineWidth = this.lineWidth;

        ctx.beginPath();
        ctx.roundRect(this.x, this.y, this.width, this.height, this.round);
        ctx.fill();
        ctx.stroke();
    }

    flight() {
        if ((0 < this.x + this.vx) && (this.width + this.x + this.vx < field.width)) {
            this.x += this.vx;
        }
        if ((0 < this.y + this.vy) && (this.height + this.y + this.vy < field.height)) {
            this.y += this.vy;
        }
    }

    bringIntoTheWorld() {
        return null;
    }
}
