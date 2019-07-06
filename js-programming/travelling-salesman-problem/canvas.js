function Canvas(canvasSelector)
{
    /* Private variables */
    var canvas = document.querySelector(canvasSelector);
    var points = [];
    
    /*** Public methods ***/

    this.drawPointOnClickedLocation = function(clickedX, clickedY)
    {
        let point = getClickedPosition(clickedX, clickedY, points.length);
        points.push(point);
        drawPoints([point], points.length);
    }

    this.getCanvas = function()
    {
        return canvas;
    }

    this.getPoints = function()
    {
        return points;
    }

    /*** Private methods ***/

    function drawPoints(pointsToDraw, totalPoints)
    {
        let cContext = canvas.getContext('2d');
        for (let i = 0; i < pointsToDraw.length; i++)
        {
            const p = pointsToDraw[i];
            cContext.fillStyle = totalPoints === 1? '#55dd55' : '#5555dd';
            cContext.beginPath();
            cContext.arc(p.x, p.y, 7, 0, Math.PI*2, false);
            cContext.fill();
            
            cContext.fillStyle = '#fff';
            cContext.font = "10px Arial";
            cContext.fillText(p.sl.toString(), p.x-3, p.y+3);
        }
    }

    function getClickedPosition(mouseX, mouseY, totalPoints)
    {
        var rect = canvas.getBoundingClientRect();
        var x = mouseX - rect.left;
        var y = mouseY - rect.top;

        return { x: x, y: y, sl: totalPoints };
    }
}
