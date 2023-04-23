const agents = [];

setup = () => {
    const canvas = createCanvas(400, 400);
    canvas.parent('#container');
    canvas.id('p5');
    
    textSize(8);
    strokeWeight(0.5);

    for (let i = 0; i < 100; i++) {
        agents.push(new Agent(i));
    }
}

draw = () => {
    background(255);
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

    stroke(255, 0, 0);
    //drawConnectorByDist(agents, 50.0);
    drawConnectorByLinkage(agents);
    //drawConnectorByNearest(agents);
    for (const agent of agents) {
        //agent.draw();
    }
}