const agents = [];

setup = () => {
    const canvas = createCanvas(400, 400);
    canvas.parent('#container');
    canvas.id('p5');
    
    blendMode(ADD);
    textSize(8);
    strokeWeight(0.5);

    for (let i = 0; i < 100; i++) {
        agents.push(new Agent(i));
    }
}

draw = () => {
    clear();
    background(0);
    const mouse = createVector(mouseX, mouseY);
    for (const agent of agents) {
        agent.attract(mouse);
        agent.repel(agents);
        agent.update();
    }

    stroke(255, 100, 100);
    drawConnectorByDist(agents, 50.0);        
    //drawConnectorByLinkage(agents);
    //drawConnectorByNearest(agents);
    // agents.forEach(agent => {
    //     agent.draw();
    // });
}