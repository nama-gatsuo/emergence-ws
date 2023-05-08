class Agent {

    index;
    position;
    velocity;

    maxSpeed;
    maxForce;

    constructor(index) {
        this.index = this.padzero(index);
        this.position = createVector(
            random(width), random(height)
        );
        this.velocity = createVector(
            random(-1, 1), random(-1, 1)
        );
        this.maxForce = 0.2;
        this.maxSpeed = 5.0;
    }

    attract(target) {
        const desiredVelocity = p5.Vector.sub(target, this.position);
        desiredVelocity.setMag(this.maxSpeed);
        const distance = p5.Vector.dist(target, this.position);
        if (distance < radius) {
            const steeringForce = p5.Vector.sub(desiredVelocity, this.velocity);
            steeringForce.div(distance / radius);
            steeringForce.limit(this.maxForce);
            this.velocity.add(steeringForce);
        }
    }

    update() {
        this.velocity.limit(this.maxSpeed);
        this.position.add(this.velocity);
        this.wrapBound();
    }

    draw() {
        
        stroke(200);
        noFill();
        circle(this.position.x, this.position.y, this.desiredSeparation);
        
        stroke(0);
        this.drawArrow(this.velocity);
        
        fill(255);
        circle(this.position.x, this.position.y, 12);

        // noStroke();
        // fill(0);
        // text(this.index, this.position.x - 5, this.position.y + 3);
    }

    wrapBound() {
        const pos = this.position; // copy reference
        const w = width;
        const h = height;
        const pad = 10.0;

        pos.x = pos.x > w + pad ? 0 - pad : pos.x;
        pos.x = pos.x < 0 - pad ? w + pad : pos.x;
        pos.y = pos.y > h + pad ? 0 - pad : pos.y;
        pos.y = pos.y < 0 - pad ? h + pad : pos.y;
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
        line(10, 0, 7, 3);
        line(10, 0, 7, -3);
        pop();
    }

}