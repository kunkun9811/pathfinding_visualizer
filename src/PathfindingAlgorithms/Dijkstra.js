export function Dijkstra(grid, startNode, finishNode) {
    console.log("Starting Dijkstra's Algorithm...");

    // list to return
    const visitedNodesInOrder = [];
    // initlialize the distance of first node to 0
    startNode.distance = 0;
    // get all the nodes for easy access
    const allNodes = getAllNodes(grid);

    while (allNodes.length !== 0) {
        // Get the node with smallest distance
        sortNodeByDistance(allNodes);
        let curNode = allNodes.shift();

        if (curNode.isWall === true) continue;

        // (1) if we current node has a distance of inifinity that means no open path
        // (2) If current node is the finish node, return
        if (curNode.distance === Infinity) return visitedNodesInOrder;

        // mark current node as visited
        curNode.isVisited = true;

        // Push current node to visitedNodesInOrder
        visitedNodesInOrder.push(curNode);

        if (curNode === finishNode) return visitedNodesInOrder;
        // update neighbor and add neighbor to queue
        updateNeighbors(startNode, curNode, grid);
    }
}

function sortNodeByDistance(allNodes) {
    allNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function getAllNodes(grid) {
    const allNodes = [];
    for (const row of grid) {
        for (const node of row) {
            allNodes.push(node);
        }
    }
    return allNodes;
}

function updateNeighbors(startNode, curNode, grid) {
    const neighbors = getAllNeighbors(curNode, grid);
    for (const n of neighbors) {
        n.distance = curNode.distance + 1;
        n.prevNode = curNode;
    }
}

function getAllNeighbors(curNode, grid) {
    const row = curNode.row;
    const col = curNode.col;
    const rowLength = grid.length;
    const colLength = grid[0].length;
    const neighbors = [];
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (col < colLength - 1) neighbors.push(grid[row][col + 1]);
    if (row < rowLength - 1) neighbors.push(grid[row + 1][col]);
    return neighbors.filter((neighbor) => !neighbor.isVisited); // return list of nodes that aren't visited
}

/* Get all the nodes in the shortest path */
export function getNodesInShortestPath(finishNode) {
    console.log("Getting nodes in the Shortest Path for Dijkstra...");
    let curNode = finishNode;

    const nodesInShortestPath = [];

    while (curNode !== null) {
        console.log(curNode);

        nodesInShortestPath.push(curNode);
        curNode = curNode.prevNode;
    }
    // setIsAnimated(false);
    return nodesInShortestPath;
}
