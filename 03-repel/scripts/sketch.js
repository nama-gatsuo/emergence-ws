const agents = [];
const agentsCount = 100;

setup = () => {
    const canvas = createCanvas(400, 400);
    canvas.parent('#container');
    canvas.id('p5');
    
    textSize(8);
    strokeWeight(0.5);

    for (let i = 0; i < agentsCount; i++) {
        agents.push(new Agent(i));
    }
}
    
draw = () => {
    background(255);
    const mouse = createVector(mouseX, mouseY);
    for (const agent of agents) {
        agent.attract(mouse);
        agent.repel(agents);
        agent.update();

        agent.draw();
    }
}
