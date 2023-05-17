const rules = [
    [ 0.32, 0.17, -0.1],
    [ -0.1, 0.34, 0.15 ],
    [ 0.2, -0.3,  0.3  ]
  ];
  
class Agent {

    constructor(type) {
        this.position = createVector(random(width), random(height));
        this.velocity = createVector(random(-1, 1), random(-1, 1));
        this.type = type;
        this.separationRadius = 20;
        this.interactionRadius = 60;
        this.maxSpeed = 2.0;
        this.maxForce = 0.5;
    }

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

    interact(agents) {
        let sum = createVector(0, 0);
        let count = 0;

        for (const agent of agents) {
            const distance = p5.Vector.dist(this.position, agent.position);
            if (distance > 0 && distance < this.separationRadius) {
                const desiredVelocity = p5.Vector.sub(this.position, agent.position).normalize();
                let g = 1 / distance;
                desiredVelocity.mult(g);
                sum.add(desiredVelocity);
                count++;
            } else if (distance > 0 && distance < this.interactionRadius) {
                let g = this.getPower(this.type, agent.type)
                g /= distance;
                const desiredVelocity = p5.Vector.sub(agent.position, this.position).normalize();
                desiredVelocity.mult(g);
                sum.add(desiredVelocity);
                count++;
            }
        }

        if (count > 0) {
            sum.div(count);
            sum.setMag(this.maxSpeed);
            const steer = p5.Vector.sub(sum, this.veloctiy);
            steer.limit(this.maxForce);

            this.velocity.add(steer);
        }
    }

    update() {
        this.velocity.limit(this.maxSpeed);
        this.position.add(this.velocity);
        this.bounce();
    }

    bounce() {
        if (this.position.x < 0) {
            this.position.x += width;
        } else if (this.position.x > width) {
            this.position.x -= width;
        }
        if (this.position.y < 0) {
            this.position.y += height;
        } else if (this.position.y > height) {
            this.position.y -= height;
        }
    }

    getPower(type0, type1) {
        return rules[type0][type1];
    }

    draw() {
        switch (this.type) {
            case 0: fill(255, 20, 20); break;
            case 1: fill(20, 255, 20); break;
            case 2: fill(20, 20, 255); break;
            default: break;
        }
        circle(this.position.x, this.position.y, 6);
    }

}