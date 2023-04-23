class Agent {

    index;
    position;
    velocity;

    desiredSeparation;

    constructor(index) {
        this.index = this.padzero(index);
        this.position = createVector(
            random(10, width - 10), random(10, height - 10)
        );
        this.velocity = createVector(
            random(-1, 1), random(-1, 1)
        );
        
        this.desiredSeparation = 30.0;
    }

    update(agents) {

        const V = p5.Vector;
        this.repel(agents);

        this.position.add(V.mult(this.velocity, 1.0));
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
            sum.normalize();
            sum.mult(0.5);

            const steer = V.sub(sum, this.velocity);
            steer.limit(1.0);

            this.velocity.add(steer);
            //this.velocity.limit(1.0);
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
        line(10, 0, 0, 0);
        line(10, 0, 7, 3);
        line(10, 0, 7, -3);
        pop();
    }

}