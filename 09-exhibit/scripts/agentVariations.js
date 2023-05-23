class TailAgent extends Agent {

    t;
    f;
    segments;
    segLength;

    constructor() {
        super();

        this.t = 0;
        this.f = random(0, TWO_PI);

        this.segments = [];
        for (let i = 0; i < 3; i++) {
            this.segments.push(createVector(0, 0));
        }
        this.segLength = 10.0;
        
    }

    update() {
        super.update();

        this.updateSegments();

        this.t += this.velocity.mag() * 5.0;
        this.t = this.t % 360;

        this.f += 0.01;
        
        this.cohesionRadius = map(sin(this.f), -1, 1, 10, 40);
        this.alignRadius = map(sin(this.f), -1, 1, 10, 40);
    }

    draw() {
        noStroke();
        const c = map(sin(radians(this.t)), -1, 1, 0, 255);
        fill(c);
        circle(this.position.x, this.position.y, 4);
        fill(255);
        for (const s of this.segments) {
            circle(s.x, s.y, 2);
        }
        noFill();
        stroke(255);
        this.drawArrow(this.velocity);
        stroke(128);
        for (let i = 0; i < this.segments.length - 1; i++) {
            line(this.segments[i].x, this.segments[i].y, this.segments[i + 1].x, this.segments[i + 1].y);
        }
        circle(this.position.x, this.position.y, 8);
    }

    drawArrow(dir) {
        push();
        translate(this.position.x, this.position.y);
        rotate(atan2(dir.y, dir.x));
        line(10, 0, 7, 3);
        line(10, 0, 7, -3);
        pop();
    }

    updateSegments() {
        this.drawgSegments(0, this.position);
        for (let i = 1; i < this.segments.length; i++) {
            this.drawgSegments(i, this.segments[i - 1]);
        }
    }

    drawgSegments(index, pPrev) {
        const p = this.segments[index];
        const dx = pPrev.x - p.x;
        const dy = pPrev.y - p.y;
        const angle = atan2(dy, dx);
        p.x = pPrev.x - cos(angle) * this.segLength;
        p.y = pPrev.y - sin(angle) * this.segLength;
    }
}

class BlobAgent extends Agent {

    t;

    constructor() {
        super();

        this.t = random(360);
        this.maxSpeed = 2.0;
        this.separationRadius = 30;
        this.cohesionRadius = 0;
        this.alignRadius = 0;
    }

    update() {
        super.update();

        this.t += 1.0;
        this.t = this.t % 360;

        this.separationRadius = map(sin(radians(this.t)), -1, 1, 10, 40);
    }

    draw() {
        fill(128);
        circle(this.position.x, this.position.y, 4);
        
        noFill();
        stroke(128);

        push();
        translate(this.position.x, this.position.y);
        rotate(radians(this.t));
        const ratio = map(sin(radians(this.t)), -1, 1, 0.1, 0.7);
        this.drawDashedCircle(this.separationRadius / 2, ratio);
        pop();
    }

    drawDashedCircle(radius, ratio) {
        const angle = 360 / 10;
        for (let i = 0; i < 10; i++) {
            const x0 = cos(radians(angle * i)) * radius;
            const y0 = sin(radians(angle * i)) * radius;
            
            const x1 = cos(radians(angle * (i + ratio))) * radius;
            const y1 = sin(radians(angle * (i + ratio))) * radius;
            line(x0, y0, x1, y1);
        }
    }
}