function TravellingSalesman(_memo)
{
	/*** Private Variables ***/
	let memo = _memo;
	var routes = {};    // TODO: turn it into memo dictionary for memoization; 
						// like: { "0_2_1_3": 234.54, ... }

	/*** Public Methods ***/
	this.start = function (allPoints)
	{
		setDistances(allPoints);
		let startingPoint = allPoints.shift();
		return findOptimizedRoute(startingPoint, allPoints);
	}

	/*** Private Methods ***/
	function setDistances(allPoints)
	{
		for (let i = 0; i < allPoints.length; i++) 
		{
			for (let j = i; j < allPoints.length; j++)
			{
				routes[`${i}_${j}`] = { totalDistance: calcDistance(allPoints[i], allPoints[j]), orderedPoints: [allPoints[i], allPoints[j]] };
				routes[`${j}_${i}`] = { totalDistance: routes[`${i}_${j}`].totalDistance, orderedPoints: [ allPoints[j], allPoints[i] ] };
			}
		}
	}

	function calcDistance(p1, p2)
	{
		var a = p1.x - p2.x;
		var b = p1.y - p2.y;

		return Math.sqrt(a * a + b * b); // Math.hypot
	}

	function findOptimizedRoute(parentPoint, points)
	{
		let result = { totalDistance: Infinity, orderedPoints: [] };

		if (points.length > 1)
		{
			for (let i = 0; i < points.length; i++)
			{
				let pointsCloned = points.slice();
				pointsCloned.splice(i, 1);

				let routing = checkEvaluatedRoutes(points[i], pointsCloned);
				if (routing.result == null)
				{
					let currentResult = findOptimizedRoute(points[i], pointsCloned);
					currentResult.orderedPoints.unshift(parentPoint);
					let firstTwo = `${currentResult.orderedPoints[0].sl}_${currentResult.orderedPoints[1].sl}`;
					currentResult.totalDistance = routes[firstTwo].totalDistance + currentResult.totalDistance;
					
					routes[currentResult.orderedPoints.map(x=>x.sl).join('_')] = currentResult;

					if (currentResult.totalDistance < result.totalDistance)
					{
						result = JSON.parse(JSON.stringify(currentResult));
					}
				}
				else
				{
					routing.result;
				}
			}
		}
		else
		{
			result = routes[routing.paths];
		}

		return result;
	}

	function checkEvaluatedRoutes(parentPoint, points)
	{
		points.unshift(parentPoint);
		let paths = points.map(x => x.sl).join('_');
		if (memo && routes.hasOwnProperty(paths))
			return { paths: paths, result: routes[paths] };

		return { paths: paths, result: null };
	}
}