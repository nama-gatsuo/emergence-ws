class Agent {

    position;
    velocity;

    maxSpeed;
    maxForce;

    separationRadius;
    alignRadius;
    cohesionRadius;

    constructor() {

        this.position = createVector(
            random(width), random(height)
        );
        this.velocity = createVector(
            random(-1, 1), random(-1, 1)
        );

        this.maxForce = 0.2;
        this.maxSpeed = 3.0;

        this.separationRadius = 25;
        this.alignRadius = 40;
        this.cohesionRadius = 40;
        
    }

    update() {
        this.velocity.limit(this.maxSpeed);
        this.position.add(this.velocity);
        this.bounceBound();
    }

    draw() {}
    
    attract(target, radius) {
        const V = p5.Vector;
        const dist = V.dist(this.position, target);
        if (dist < radius) {
            const acceleration = p5.Vector.sub(target, this.position);
            acceleration.setMag(radius / dist);
            acceleration.limit(this.maxForce);
            this.velocity.add(acceleration);
        }
    }

    repel(target, radius) {
        const V = p5.Vector;
        const dist = V.dist(this.position, target);
        if (dist < radius) {
            const acceleration = p5.Vector.sub(this.position, target);
            acceleration.setMag(radius / dist);
            acceleration.limit(this.maxForce);
            this.velocity.add(acceleration);
        }
    }

    flock(agents) {
        const sep = this.separate(agents);
        const ali = this.align(agents);
        const coh = this.cohesion(agents);

        sep.mult(1.5);
        ali.mult(1.0);
        coh.mult(1.0);

        this.velocity.add(sep);
        this.velocity.add(ali);
        this.velocity.add(coh);
    }

    separate(agents) {
        const V = p5.Vector;

        let sum = createVector(0, 0);
        let totalCount = 0;

        for (const agent of agents) {
            const dist = V.dist(this.position, agent.position);
            if (dist > 0 && dist < this.separationRadius) {
                const dir = V.sub(this.position, agent.position).normalize();
                dir.div(dist);
                sum.add(dir);
                totalCount++;
            }
        }

        if (totalCount > 0) {
            sum.div(totalCount);
            sum.setMag(this.maxSpeed);
            const steer = V.sub(sum, this.velocity);
            steer.limit(this.maxForce);
            return steer;
        } else {
            return createVector(0, 0);
        }

    }

    align(agents) {
        const V = p5.Vector;
        
        let sum = createVector(0, 0);
        let totalCount = 0;

        for (const agent of agents) {
            const dist = V.dist(this.position, agent.position);
            if (dist > 0 && dist < this.alignRadius) {
                sum.add(agent.velocity);
                totalCount++;
            }
        }

        if (totalCount > 0) {
            sum.div(totalCount);
            sum.setMag(this.maxSpeed);
            const steer = V.sub(sum, this.velocity);
            steer.limit(this.maxForce);
            return steer;
        } else {
            return createVector(0, 0);
        }
    }

    cohesion(agents) {
        const V = p5.Vector;
        
        let center = createVector(0, 0);
        let totalCount = 0;

        for (const agent of agents) {
            const dist = V.dist(this.position, agent.position);
            if (dist > 0 && dist < this.cohesionRadius) {
                center.add(agent.position);
                totalCount++;
            }
        }

        if (totalCount > 0) {
            center.div(totalCount); // center
            const desired = V.sub(center, this.position);
            desired.setMag(this.maxSpeed);
            const steer = V.sub(desired, this.velocity);
            steer.limit(this.maxForce);
            return steer;
        } else {
            return createVector(0, 0);
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

    bounceBound() {
        const pos = this.position; // copy reference
        const vel = this.velocity; // copy reference
        const w = width;
        const h = height;
        const pad = 10.0;

        if (pos.x > w + pad) {
            pos.x = w + pad;
            vel.x *= -1;
        }
        if (pos.x < 0 - pad) {
            pos.x = 0 - pad;
            vel.x *= -1;
        }
        if (pos.y > h + pad) {
            pos.y = h + pad;
            vel.y *= -1;
        }
        if (pos.y < 0 - pad) {
            pos.y = 0 - pad;
            vel.y *= -1;
        }
    }
}