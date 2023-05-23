const agents = [];
let t = 0;

setup = () => {
    const canvas = createCanvas(400, 400);
    canvas.parent('#container');
    canvas.id('p5');
    
    textSize(8);
    strokeWeight(0.5);

    for (let i = 0; i < 100; i++) {
        if (i % 3 === 0) {
            agents.push(new BlobAgent());
        } else {
            agents.push(new TailAgent());
        }

    }

}

draw = () => {
    background(0);
    const mouse = createVector(mouseX, mouseY);
    
    for (const agent of agents) {

        if (mouseIsPressed) {
            agent.attract(mouse, 200);
        } else {
            agent.repel(mouse, 100);
        }

        agent.flock(agents);
        agent.update();
    }

    t += 2;
    t %= 360;
    const c = map(sin(radians(t)), -1, 1, 100, 0);
    stroke(c);

    for (const agent of agents) {
        agent.draw();
    }
}