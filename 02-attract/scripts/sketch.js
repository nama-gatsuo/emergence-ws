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
        agent.update();
    });

    agents.forEach(agent => {
        agent.draw();
    });
}
