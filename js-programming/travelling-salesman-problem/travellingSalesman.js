function TravellingSalesman(allPoints)
{
    /*** Private Variables ***/
    const _allPoints = allPoints;
    var distances2D = [];   // TODO: turn it into memo dictionary for memoization; 
                            // like: { "0_2_1_3": 234.54, ... }  

    /*** Public Methods ***/
    this.start = function()
    {
        setDistances();
        let startingPoint = _allPoints.shift();
        return recursion(_allPoints, startingPoint);
    }

    /*** Private Methods ***/
    function setDistances()
    {
        for (let i = 0; i < _allPoints.length; i++)
            distances2D.push(new Array(allPoints.length));
        
        for (let i = 0; i < _allPoints.length; i++) 
        {
            for (let j = 0; j < _allPoints.length; j++) {
                if(!distances2D[i][j])
                    distances2D[i][j] = calcDistance(_allPoints[i], _allPoints[j])
            }
        }
    }

    function calcDistance(p1, p2)
    {
        var a = p1.x - p2.x;
        var b = p1.y - p2.y;

        return Math.sqrt(a * a + b * b); // Math.hypot
    }

    function recursion(points, parentPoint)
    {
        let result = { totalDistance: Infinity, orderedPoints: [] };
        if(points.length > 1)
        {
            for (let i = 0; i < points.length; i++)
            {
                let pointsCloned = points.slice();
                pointsCloned.splice(i, 1);
                let currentResult = recursion(pointsCloned, points[i]);
                currentResult.totalDistance = currentResult.totalDistance + distances2D[parentPoint.sl][currentResult.orderedPoints[0].sl];
                if (currentResult.totalDistance < result.totalDistance)
                {
                    currentResult.orderedPoints.unshift(parentPoint);
                    result = JSON.parse(JSON.stringify(currentResult));
                }
            }
        }
        else
        {
            result.totalDistance = distances2D[parentPoint.sl][points[0].sl];
            result.orderedPoints = [parentPoint, points[0]];
        }

        return result;
    }
}