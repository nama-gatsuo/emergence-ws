class Agent { 

    index;
    position;
    velocity;

    constructor(p, index) {        
        this.index = this.padzero(index);
        this.position = p.createVector(
            p.random(0, p.width), p.random(0, p.height)
        );
        this.velocity = p.createVector(
            p.random(-1, 1), p.random(-1, 1)
        );
    }

    update(p) {
        const V = p5.Vector;
        this.position.add(V.mult(this.velocity, 2.0));       
        this.wrapBound(p);
    }

    draw(p) {
        const V = p5.Vector;
        this.drawArrow(p, V.normalize(this.velocity));
        p.circle(this.position.x, this.position.y, 12);
        //p.text(this.index, this.position.x - 5, this.position.y + 3);
    }

    wrapBound(p) {
        const pos = this.position; // copy reference
        const w = p.width;
        const h = p.height;

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

    drawArrow(p, dir) {
        p.push();
        p.translate(this.position.x, this.position.y);
        p.rotate(p.atan2(dir.y, dir.x));
        p.line(10, 0, 0, 0);
        p.line(10, 0, 7, 3);
        p.line(10, 0, 7, -3);
        p.pop();
    }

}