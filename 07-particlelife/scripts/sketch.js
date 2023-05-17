const agents = [];
let subdiv;

setup = () => {
    const canvas = createCanvas(400, 400);
    canvas.parent('#container');
    canvas.id('p5');
    
    textSize(8);
    strokeWeight(0.5);

    for (let i = 0; i < 200; i++) {
        const type = i % 3;
        agents.push(new Agent(type));
    }

    subdiv = new Subdiv();

}

draw = () => {
    background(0);
    const mouse = createVector(mouseX, mouseY);
    
    noStroke();

    for (const agent of agents) {
        agent.interact(agents);
        if (mouseIsPressed) {
            agent.attract(mouse, 200);
        }
        agent.update();
        agent.draw();
    }

    stroke(255, 100, 100);
    const group0 = agents.filter(agent => agent.type === 0);
    subdiv.compute(group0);
    subdiv.drawDelaunay();
    
    stroke(100, 255, 100);
    const group1 = agents.filter(agent => agent.type === 1);
    subdiv.compute(group1);
    subdiv.drawDelaunay();

    stroke(100, 100, 255);
    const group2 = agents.filter(agent => agent.type === 2);
    subdiv.compute(group2);
    subdiv.drawDelaunay();
    

    // for (const agent of agents) {
    //     agent.draw();
    // }
}