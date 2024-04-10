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

    DEVIATION_LIMIT = 3;

    constructor(nodeData)
    {
        this.nodeOptions = nodeData['nodes'];
    }

    /**
     * @param {boolean} isCorrectPath a boolean for tracking if current path should terminate with a victory
     * @param {Number} depth how many levels deep we are
     * @param {Number} deviation increments only when not on successful path
     * 
     * @returns {void}
     */
    generate = (isCorrectPath = true, depth = 0, deviation = 0) => {
        if (this.previousNode === null) {
            this.rootNode = this.makeNode();
            this.previousNode = this.rootNode;
        }

        if (deviation > this.DEVIATION_LIMIT) {
            return;
        }

        if (this.previousNode.isFinalNode === true) {
            return;
        }

        let pathNumber = this.getNumberOfPaths();

        // choose the route which is 'toward the objective' 
        // All others must result in dead-ends after a small number of nodes
        const successfulPathIndex = this.getRandomNumber(pathNumber) - 1;

        for (let i = 0; i < pathNumber; i++) {
            if (i !== successfulPathIndex) {
                deviation++;
                isCorrectPath = false;
            }


            
            let newNode = this.makeNode();
            this.previousNode.nodes.push(newNode);
            this.previousNode = newNode;
            this.generate(isCorrectPath, depth, deviation);
        }
    }

    /**
     * 
     * @returns {Node}
     */
    makeNode = () => {
        const lastKey = this.nodeOptions.length - 1;
        const key = this.getRandomNumber(lastKey);
        const data = this.nodeOptions[key];

        // Keep this as an empty array for now - possibly a job for recursion
        const nodes = [];
        // again worry about this when recurring
        const previousNode = null;

        let isFinalNode = false;
        if (this.iteration === 5) {
            isFinalNode = true;
        }

        this.iteration++;

        return new Node(data.name, data.description, nodes, previousNode, isFinalNode)
    }

    /**
     * @description returns possible number of paths weighted towards 1
     * 
     * @returns {Number}
     */
    getNumberOfPaths = () => {
        const randomInt = this.getRandomNumber(10);

        console.log(`getNumberOfPaths randomInt - ${randomInt}`)

        if (randomInt <= 6) {
            return 1;
        }

        if (randomInt <= 9) {
            return 2;
        }

        return 3;
    }

    /**
     * @description returns a random number between 0 and 'maxNumber'
     * 
     * @param {Number} maxNumber 
     * @param {Number} precision 
     * @param {Number} multiplier 
     * 
     * @returns {Number}
     */
    getRandomNumber = (maxNumber, precision = 1, multiplier = 10) => {
        const randomInt = Math.ceil(
            Math.random().toPrecision(precision) * multiplier
        );
        
        return Math.min(randomInt, maxNumber)
    }
}

let gen = new Generator(nodeData);
gen.generate();
console.log(gen.rootNode);