const sketch = p => {

    const agents = [];

    p.setup = () => {
        const canvas = p.createCanvas(400, 400);
        canvas.parent('#container');
        canvas.id('p5');
        
        p.textSize(8);
        p.strokeWeight(0.5);
    
        for (let i = 0; i < 100; i++) {
            agents.push(new Agent(p, i));
        }
    }
    
    p.draw = () => {
        p.background(255);
        agents.forEach(agent => {
            agent.update(p, agents);
        });

        agents.forEach(agent => {
            agent.draw(p);
        });
    }
    
}

new p5(sketch);