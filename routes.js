const graphBLL = require('./bll/graph');

module.exports = (app) => {
     
    app.get('/:start/:end',  (req, res) => {graphBLL.getShortestRoute(req, res)});
    app.post('/:to/:from/:price', (req, res) => {graphBLL.insertRouteCall(req, res)});
    
}