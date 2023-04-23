class Agent {

    index;
    position;
    velocity;

    maxSpeed;
    maxForce;
    desiredSeparation;

    constructor(index) {
        this.index = this.padzero(index);
        this.position = createVector(
            random(width), random(height)
        );
        this.velocity = createVector(
            random(-1, 1), random(-1, 1)
        );
        this.maxForce = 0.2;
        this.maxSpeed = 3.0;
        this.desiredSeparation = 30;
    }

    update() {
        this.velocity.limit(this.maxSpeed);
        this.position.add(this.velocity);
        this.wrapBound();
    }

    draw() {
        const V = p5.Vector;
        
        stroke(200);
        noFill();
        circle(this.position.x, this.position.y, this.desiredSeparation);
        
        stroke(0);
        this.drawArrow(V.normalize(this.velocity));
        
        fill(255);
        circle(this.position.x, this.position.y, 12);

        // noStroke();
        // fill(0);
        // text(this.index, this.position.x - 5, this.position.y + 3);
    }
    
    attract(target) {
        const acceleration = p5.Vector.sub(target, this.position);
        acceleration.setMag(0.1);
        acceleration.limit(this.maxForce);
        this.velocity.add(acceleration);
    }

    repel(agents) {
        const V = p5.Vector;

        let sum = createVector(0, 0);
        let totalCount = 0;

        agents.forEach(agent => {
            if (this.index !== agent.index) {

                const dist = V.dist(this.position, agent.position);
                if (dist > 0 && dist < this.desiredSeparation) {
                    const dir = V.sub(this.position, agent.position).normalize();
                    dir.div(dist);
                    sum.add(dir);
                    totalCount++;
                }

            }
        });

        if (totalCount > 0) {
            sum.div(totalCount);
            sum.setMag(this.maxSpeed);

            const steer = V.sub(sum, this.velocity);
            steer.limit(this.maxForce);

            this.velocity.add(steer);
        }

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