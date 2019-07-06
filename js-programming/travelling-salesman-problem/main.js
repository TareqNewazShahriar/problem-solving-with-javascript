function Main(canvasSelector)
{
	/* Private Variables */
	var canvasObj = new Canvas(canvasSelector);
	var colorNumber = 0;
	var travelTaskRef;
	
	/* Public Methods */
	this.init = function()
	{
		canvasObj.getCanvas().addEventListener('click', function(e)
        {
			canvasObj.drawPointOnClickedLocation(e.clientX, e.clientY);
			if(canvasObj.getPoints().length > 1)
				travelCountdown();
        });
	}

	/* Private Methods */
	function travelCountdown()
	{
		if(travelTaskRef)
			clearTimeout(travelTaskRef);
		
		travelTaskRef = setTimeout(() => {
			console.log(new TravellingSalesman(canvasObj.getPoints().slice()).start());
		}, 3500);
	}

	function getColor(colorNumber, newColor)
	{
		colorNumber += newColor? 8856 : 0; // 8856 is at least a good amount, adding this will create a differnt color
		return '#' + colorNumber.toString().padStart(6, '0');
	}
}
