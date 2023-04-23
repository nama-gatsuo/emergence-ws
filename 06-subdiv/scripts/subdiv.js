class Subdiv {

    voronoi;
    bbox;
    diagram;

    constructor() {
        this.voronoi = new Voronoi();
        this.bbox = { xl: 0, xr: width, yt: 0, yb: height };
    }

    compute(agents) {
        this.voronoi.recycle(this.diagram);
        const sites = agents.map(agent => agent.position);
        this.diagram = this.voronoi.compute(sites, this.bbox);
    }

    drawVoronoi() {
        for (const edge of this.diagram.edges) {
            line(edge.va.x, edge.va.y, edge.vb.x, edge.vb.y);
        }
    }

    drawDelaunay() {
        for (const cell of this.diagram.cells) {
            for (const he of cell.halfedges) {
                const p0 = he.edge.lSite;
                const p1 = he.edge.rSite;
                if (p0 && p1) {
                    if (p0.dist(p1) < 50) {
                        line(p0.x, p0.y, p1.x, p1.y);
                    }
                }
            }
        }
    }

}

