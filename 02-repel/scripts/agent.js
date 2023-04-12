class Agent {

    index;
    position;
    velocity;

    desiredSeparation;

    constructor(p, index) {
        this.index = this.padzero(index);
        this.position = p.createVector(
            p.random(10, p.width-10), p.random(10, p.height-10)
        );
        this.velocity = p.createVector(
            p.random(-1, 1), p.random(-1, 1)
        );

        this.desiredSeparation = 30.0;
    }

    update(p, agents) {

        const V = p5.Vector;
        this.repel(p, agents);

        this.position.add(V.mult(this.velocity, 1.0));
        this.wrapBound(p);
    }

    draw(p) {
        const V = p5.Vector;
        
        p.stroke(200);
        p.noFill();
        p.circle(this.position.x, this.position.y, this.desiredSeparation);
        
        p.stroke(0);
        this.drawArrow(p, V.normalize(this.velocity));
        
        p.fill(255);
        p.circle(this.position.x, this.position.y, 12);

        // p.noStroke();
        // p.fill(0);
        // p.text(this.index, this.position.x - 5, this.position.y + 3);
    }

    repel(p, agents) {
        const V = p5.Vector;

        let sum = p.createVector(0, 0);
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

    wrapBound(p) {
        const pos = this.position; // copy reference
        const w = p.width;
        const h = p.height;
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