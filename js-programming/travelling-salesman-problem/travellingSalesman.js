function TravellingSalesman(allPoints)
{
    /*** Private Variables ***/
    const _allPoints = allPoints;
    let _memo;
    var _routes = {};    // TODO: turn it into memo dictionary for memoization; 
                        // like: { "0_2_1_3": 234.54, ... }

    /*** Public Methods ***/
    this.start = function(memo)
    {
        _memo = memo;
        setDistances();
        let startingPoint = _allPoints.shift();
        return findOptimizedRoute(_allPoints, startingPoint);
    }

    /*** Private Methods ***/
    function setDistances()
    {
        for (let i = 0; i < _allPoints.length; i++) 
        {
            for (let j = i; j < _allPoints.length; j++)
            {
                _routes[`${i}_${j}`] = { totalDistance: calcDistance(_allPoints[i], _allPoints[j]), orderedPoints: [_allPoints[i], _allPoints[j]] };
                _routes[`${j}_${i}`] = { totalDistance: _routes[`${i}_${j}`].totalDistance, orderedPoints: [_allPoints[j], _allPoints[i]] };
            }
        }
    }

    function calcDistance(p1, p2)
    {
        var a = p1.x - p2.x;
        var b = p1.y - p2.y;

        return Math.sqrt(a * a + b * b); // Math.hypot
    }

    function findOptimizedRoute(points, parentPoint)
    {
        let routing = checkRoutes(points, parentPoint);

        if(routing.result)
            return routing.result;

        let result = { totalDistance: Infinity, orderedPoints: [] };

        if(points.length > 1)
        {
            for (let i = 0; i < points.length; i++)
            {
                let pointsCloned = points.slice();
                pointsCloned.splice(i, 1);
                let currentResult = findOptimizedRoute(pointsCloned, points[i]);
                currentResult.totalDistance = currentResult.totalDistance + _routes[`${parentPoint.sl}_${currentResult.orderedPoints[0].sl}`].totalDistance;
                if (currentResult.totalDistance < result.totalDistance)
                {
                    currentResult.orderedPoints.unshift(parentPoint);
                    result = JSON.parse(JSON.stringify(currentResult));
                }
            }
            // add the resultant route to the routes dictionary
            _routes[routing.paths] = result;
        }
        else
        {
            result = _routes[routing.paths];
        }

        return result;
    }

    function checkRoutes(points, parentPoint)
    {
        points = points.slice();
        points.unshift(parentPoint);
        let paths = points.length === 2 ? points.map(x => x.sl).join('_') : points.map(x => x.sl).sort((a,b)=>a-b).join('_');
        if(_memo && _routes.hasOwnProperty(paths))
            return {paths: paths, result: _routes[paths]};
        
        return { paths: paths, result: null};
    }
}