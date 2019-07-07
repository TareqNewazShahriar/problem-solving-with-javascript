function Canvas(canvasSelector)
{
    /* Private variables */
    var canvas = document.querySelector(canvasSelector);
    var originalPoints = [];
    var _orderedPoints = [];
    
    /*** Public methods ***/

    this.drawPointOnClickedLocation = function(clickedX, clickedY)
    {
        let point = getClickedPosition(clickedX, clickedY, originalPoints.length);
        originalPoints.push(point);
        drawPoints([point], originalPoints.length === 1);
    }

    this.getCanvas = function()
    {
        return canvas;
    }

    this.getPoints = function()
    {
        return originalPoints.slice();
    }

    this.connectTheDots = function(_points)
    {
        if(_orderedPoints.length)
            connectPoints(_orderedPoints, '#fff', 2);
        
        connectPoints(_points, '#c2c2c2');

        _orderedPoints = _points;
        drawPoints(originalPoints, 1);
    }



    /*** Private methods ***/

    function connectPoints(_points, color, lineWidth)
    {
        let cContext = canvas.getContext('2d');
        cContext.strokeStyle = color;
        cContext.lineWidth = lineWidth ? lineWidth : 1;
        for (let i = 1; i < _points.length; i++) {
            let p1 = _points[i-1];
            let p2 = _points[i];
            cContext.beginPath();
            cContext.moveTo(p1.x, p1.y);
            cContext.lineTo(p2.x, p2.y);
            cContext.stroke();
        }
    }

    function drawPoints(pointsToDraw, firstPointIsZero)
    {
        let cContext = canvas.getContext('2d');
        for (let i = 0; i < pointsToDraw.length; i++)
        {
            const p = pointsToDraw[i];

            // draw the point
            cContext.fillStyle = firstPointIsZero && i === 0 ? '#4499dd' : '#5555dd';
            cContext.beginPath();
            cContext.arc(p.x, p.y, 7, 0, Math.PI*2, false);
            cContext.fill();
            
            // add number
            cContext.fillStyle = '#fff';
            cContext.font = "10px Arial";
            cContext.fillText(p.sl.toString(), p.x-(p.sl<10?3:6), p.y+3);
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
