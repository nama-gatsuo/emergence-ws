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
    agents.forEach(agent => {
        agent.update(agents);
    });

    stroke(255, 0, 0);
    //drawConnectorByDist(agents, 50.0);        
    drawConnectorByLinkage(agents);
    //drawConnectorByNearest(agents);
    agents.forEach(agent => {
        agent.draw();
    });
}