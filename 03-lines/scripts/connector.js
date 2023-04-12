const drawConnectorByDist = (p, agents, dist) => {
    for (let i = 0; i < agents.length - 1; i++) {
        const current = agents[i].position;
        for (let j = i + 1; j < agents.length; j++) {
            const other = agents[j].position;
            const d = p5.Vector.dist(current, other);
            if (d < dist) {
                p.line(current.x, current.y, other.x, other.y);
            }
        }
    }
}

// 鋭角をつくらない
const drawConnectorByLinkage = (p, agents) => {
    const V = p5.Vector;

    for (let i = 0; i < agents.length - 1; i++) {
        const current = agents[i].position;
        for (let j = i; j < agents.length; j++) {
            const other = agents[j].position;
            const dist = V.dist(current, other);
            const hasNearerAgent = agents.some(any => 
                dist > V.dist(any.position, current) &&
                dist > V.dist(any.position, other)
            );
            const bDraw = !hasNearerAgent;
            if (bDraw) {
                p.line(current.x, current.y, other.x, other.y);
            }
        }
    }
}

const drawConnectorByNearest = (p, agents) => {
    const V = p5.Vector;

    for (let i = 0; i < agents.length - 1; i++) {
        const current = agents[i].position;
        const nearest = agents.sort((a, b) => {
            const d_a = V.dist(current, a.position);
            const d_b = V.dist(current, b.position);
            return d_a - d_b;
        })[1].position;
        p.line(current.x, current.y, nearest.x, nearest.y);
    }
}