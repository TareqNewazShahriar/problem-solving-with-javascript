function Main(canvasSelector)
{
	/* Private Variables */
	var canvasInstance = new Canvas(canvasSelector);
	var colorNumber = 0;
	var travelTaskRef;
	
	/* Public Methods */
	this.init = function()
	{
		setCanvasDimension();
		canvasInstance.getCanvas().addEventListener('click', function(e)
        {
			canvasInstance.drawPointOnClickedLocation(e.clientX, e.clientY);
			if(canvasInstance.getPoints().length > 1)
				travelCountdown();
        });
	}

	/*** Private Methods ***/

	function setCanvasDimension()
	{
		let canvasElem = canvasInstance.getCanvas();
		canvasElem.setAttribute('height', window.innerHeight-70);
		canvasElem.setAttribute('width', window.innerWidth);
	}

	function travelCountdown()
	{
		if(travelTaskRef)
			clearTimeout(travelTaskRef);
		
		travelTaskRef = setTimeout(() => {
			let result = new TravellingSalesman(canvasInstance.getPoints()).start();
			console.log(result);
			canvasInstance.connectTheDots(result.orderedPoints);
		}, 3000);
	}

	function getColor(colorNumber, newColor)
	{
		colorNumber += newColor? 8856 : 0; // 8856 is at least a good amount, adding this will create a differnt color
		return '#' + colorNumber.toString().padStart(6, '0');
	}
}
