class Agent { 

    index;
    position;
    velocity;

    constructor(index) {        
        this.index = this.padzero(index);
        this.position = createVector(
            random(width), random(height)
        );
        this.velocity = createVector(
            random(-1, 1), random(-1, 1)
        );
    }

    update() {
        const V = p5.Vector;
        this.position.add(V.mult(this.velocity, 2.0));       
        this.wrapBound();
    }

    draw() {
        const V = p5.Vector;
        this.drawArrow(V.normalize(this.velocity));
        circle(this.position.x, this.position.y, 12);
        //text(this.index, this.position.x - 5, this.position.y + 3);
    }

    wrapBound() {
        const pos = this.position; // copy reference
        const w = width;
        const h = height;

        pos.x = pos.x > w ? pos.x - w : pos.x;
        pos.x = pos.x < 0 ? pos.x + w : pos.x;
        pos.y = pos.y > h ? pos.y - h : pos.y;
        pos.y = pos.y < 0 ? pos.y + h : pos.y;
    }

    padzero(n) {
        if (n < 10) {
            return '0' + n;
        } else {
            return '' + n;
        }
    }

    drawArrow(dir) {
        push();
        translate(this.position.x, this.position.y);
        rotate(atan2(dir.y, dir.x));
        line(10, 0, 0, 0);
        line(10, 0, 7, 3);
        line(10, 0, 7, -3);
        pop();
    }

}