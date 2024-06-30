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
		canvasElem.setAttribute('height', getScreenHeight()-150);
		canvasElem.setAttribute('width', getScreenWidth()-40);
	}

	function getScreenHeight()
	{
		return Math.min(window.screen.availHeight, window.screen.height, window.innerHeight, window.outerHeight);
	}

	function getScreenWidth()
	{
		return Math.min(window.screen.availWidth, window.screen.width, window.innerWidth, window.outerWidth);
	}

	function travelCountdown()
	{
		if(travelTaskRef)
		{
			clearTimeout(travelTaskRef);
			travelTaskRef = null;
		}
		
		travelTaskRef = setTimeout(() => {
			// show loader message
			// Note: this DOM changes doesn't reflect on the UI untill the entire
			//      js processing finished. Wrapping the prossing into another setTimeout 
			// 		didn't work in Firefox.v127, even with 1000ms delay.
			let panel = document.querySelector('#distance');
			panel.style.visibility = 'visible';
			panel.querySelector('#total-distance').innerHTML = '(processing...)';

			// start processing.
			setTimeout(() => {
				let result = new TravellingSalesman(canvasInstance.getPoints()).start();
				console.log(result);
				canvasInstance.connectTheDots(result.orderedPoints);
				showResult(result.totalDistance);
			}, 500);
		}, 2500);
	}

	function showResult(totalDistance)
	{
		let panel = document.querySelector('#distance');
		panel.querySelector('#total-distance').innerHTML = totalDistance.toFixed(2);
	}

	function getColor(colorNumber, newColor)
	{
		colorNumber += newColor? 8856 : 0; // 8856 is at least a good amount, adding this will create a differnt color
		return '#' + colorNumber.toString().padStart(6, '0');
	}
}
