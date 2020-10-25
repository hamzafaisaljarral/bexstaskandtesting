const csv = require('csv-parser')
const fs = require('fs')

function graphNode(name, weight) {
    this.name = name;
    this.weight = weight;
    this.distance = null;
    this.visited = false;
}

const graph = new Map();
const address = [];
let path = [];
let shortest;

const GraphModule = {
    readFile: (req, res) => {

        fs.createReadStream('input-routes.csv')
            .pipe(csv())
            .on('data', function (row) {
                if (graph.has(row.from)) {
                    let list = graph.get(row.from);
                    list.push(new graphNode(row.to, parseInt(row.weight)))
                } else {
                    graph.set(row.from, [new graphNode(row.from, parseInt(row.weight)), new graphNode(row.to, parseInt(row.weight))])
                }

                if (graph.has(row.to)) {
                    let list = graph.get(row.to);
                    list.push(new graphNode(row.from, parseInt(row.weight)))
                } else {
                    graph.set(row.to, [new graphNode(row.to, parseInt(row.weight)), new graphNode(row.from, parseInt(row.weight))])
                }
            })
            .on('end', function () {
                
                
                let startNode = graph.get(req.params.start)
                let endNode = graph.get(req.params.end)

                if (!startNode || !endNode) {
                    console.error("Invalid input")
                } else
                    
                    path = GraphModule.getBestRoute(graph, startNode, endNode)
                res.status(200).send(JSON.stringify(path))
               

            })

    },


    getBestRoute: (graph, startNode, endNode) => {

        let visited = [];
        let unvisited = [];

        let resultSet = new Map();
        for (const [key, value] of graph.entries()) {
            resultSet.set(key, { distance: null, previous: null })
            unvisited.push(key)
        }

        

        let current = startNode[0].name;
        resultSet.set(current, { distance: 0, previous: null })

        while (unvisited.length > 0) {

            

            //mark as visited
            // current.visited = true;
            unvisited.splice(unvisited.indexOf(current), 1)
            visited.push(current);

            //if the goal node is reached, break the loop, no need to visit the remaining unvisited nodes
            if (current == endNode[0].name)
                break;
            //update distance of neighbours
            nlist = graph.get(current)
            currentRes = resultSet.get(current)
            

            for (i in nlist) {
                if (i == 0)
                    continue
                res = resultSet.get(nlist[i].name)

                if (res.distance == null || res.distance > (nlist[i].weight + currentRes.distance)) {
                    let val = (currentRes.distance) ? currentRes.distance : 0;
                    val = val + nlist[i].weight;
                    nlist[i].distance = val;
                    resultSet.set(nlist[i].name, { distance: nlist[i].distance, previous: current })
                }
            }

            

            //move on to shortest distant node in resultant matrix
            let shortest = {
                distance: null
            }
            
            for (name of unvisited) {
                let resultSetEntry = resultSet.get(name)
                if (resultSetEntry.distance != null && (shortest.distance == null || shortest.distance > resultSetEntry.distance)) {
                    shortest = resultSetEntry
                    current = name
                }
            }
        }

       

        let shortestPath = []
        current = resultSet.get(endNode[0].name)
        shortestPath.push(endNode[0].name)
        let cost = current.distance




        while (current.previous != startNode[0].name) {
            shortestPath.push(current.previous);
            current = resultSet.get(current.previous)
                ;
        }

        shortestPath.push(startNode[0].name)
        shortestPath.reverse()
        return { shortestPath, cost }
    },

    insertRouteCall: (req, res) => {
        // insert into csv file
        const filename = "input-routes.csv";
        let writeit = [
            to = req.params.to,
            from = req.params.from,
            weight = req.params.price
        ]
        fs.open(filename, "a", (err, fd) => {
            if (err) {
                console.log(err.message);
            } else {
                fs.write(fd, "\n" + writeit, (err, bytes) => {
                    if (err) {
                        console.log(err.message);
                        res.status(400).send(err.message)
                    } else {
                        res.status(200).send('Saved Successfully')
                    }
                })
            }
        })
    },

    getShortestRoute: (req, res) => {
        // find an object from `data` array match by `id`
        GraphModule.readFile(req, res)
    }
}

module.exports = GraphModule;
