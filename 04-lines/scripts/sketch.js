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
    agents.forEach(agent => {
        agent.attract(mouse);
        agent.repel(agents);
        agent.update();
    });

    stroke(255, 0, 0);
    //drawConnectorByDist(agents, 50.0);        
    drawConnectorByLinkage(agents);
    //drawConnectorByNearest(agents);
    agents.forEach(agent => {
        agent.draw();
    });
}