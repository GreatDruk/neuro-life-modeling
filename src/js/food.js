class Food {
    constructor(
        x=10, y=10, width=15, height=15, round=10,
        lineWidth=1, fillColor="#f10c0c", strokeColor="#000"
    ) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.round = round;
        this.lineWidth = lineWidth;
        this.fillColor = fillColor;
        this.strokeColor = strokeColor;
    }

    spawn() {
        foods.push(this);
        redrawItems();
    }

    be() {
        ctxItems.fillStyle = this.fillColor;
        ctxItems.strokeStyle = this.strokeColor;
        ctxItems.lineWidth = this.lineWidth;

        ctxItems.beginPath();
        ctxItems.roundRect(this.x, this.y, this.width, this.height, this.round);
        ctxItems.fill();
        ctxItems.stroke();
    }
}
