class Node {
    
    name;
    
    description;
    
    nodes = [];
    
    previousNode;

    isFinalNode;

    constructor(name, description, nodes, previousNode = null, isFinalNode = false)
    {
        this.name = name;
        this.description = description;
        this.nodes = nodes;
        this.previousNode = previousNode;
        this.isFinalNode = isFinalNode;
    }
}

const jsonData = `
{
	"nodes": [
		{
			"name": "Node Type #1",
			"description": "You are in a node type #1."
		},
		{
			"name": "Node Type #2",
			"description": "You are in a node type #2."
		},
        {
			"name": "Node Type #3",
			"description": "You are in a node type #3."
		},
        {
			"name": "Node Type #4",
			"description": "You are in a node type #4."
		},
        {
			"name": "Node Type #5",
			"description": "You are in a node type #5."
		}
	]
}
`;

const nodeData = JSON.parse(jsonData);

class Generator
{
    nodeOptions;

    maxOptions;

    rootNode;

    iteration = 0;

    previousNode = null;

    constructor(nodeData)
    {
        this.nodeOptions = nodeData['nodes'];
    }

    generate = () => {
        if (this.previousNode === null) {
            this.rootNode = this.makeNode();
            this.previousNode = this.rootNode;
        }

        // return the full tree - currently just returning void
        if (this.previousNode.isFinalNode === true) {
            return;
        }

        // change 1 to random
        for (let i = 0; i < 1; i++) {
            let newNode = this.makeNode();
            this.previousNode.nodes.push(newNode);
            this.previousNode = newNode;
            this.generate();
        }
    }

    makeNode = () => {
        const lastKey = this.nodeOptions.length - 1;
        const key = this.getRandomNumber(lastKey);
        const data = this.nodeOptions[key];

        // console.log(key);
        // console.log(this.nodeOptions);

        // Keep this as an empty array for now - possibly a job for recursion
        const nodes = [];
        // again worry about this when recurring
        const previousNode = null;

        // ditto - added limit for testing
        let isFinalNode = false;
        if (this.iteration === 5) {
            isFinalNode = true;
        }

        this.iteration++;

        return new Node(data.name, data.description, nodes, previousNode, isFinalNode)
    }

    getRandomNumber = (maxNumber, precision = 1, multiplier = 10) => {
        const randomInt = Math.round(
            Math.random().toPrecision(precision) * multiplier
        );
        
        return Math.min(randomInt, maxNumber)
    }
}

let gen = new Generator(nodeData);
gen.generate();

console.log(gen.rootNode);