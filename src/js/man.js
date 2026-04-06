class Man {
    constructor(
        width=15, height=25, round=5, lineWidth=2,
        fillColor="#8c00a9", strokeColor="#000"
    ) {
        this.width = width
        this.height = height
        this.round = round
        this.lineWidth = lineWidth
        this.fillColor = fillColor
        this.strokeColor = strokeColor
    }

    comeIntoTheWorld(x, y, ctx) {
        var man = new Path2D();

        ctx.fillStyle = this.fillColor;
        ctx.strokeStyle = this.strokeColor;
        ctx.lineWidth = this.lineWidth;

        man.roundRect(x, y, this.width, this.height, this.round)
        ctx.stroke(man);
        ctx.fill(man);
    }

    bringIntoTheWorld() {
        return null;
    }
}
