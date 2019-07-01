

function Canvas(canvasSelector)
{
    var canvas = document.querySelector(canvasSelector);
    var that = this;

    /*** Public methods ***/
    this.DrawPointOnClick = function()
    {
        canvas.addEventListener('click', function(e)
        {
            let point = that.getClickedPosition(e.clientX, e.clientY);
            console.log(point);
            that.drawPoint(point);
        });
    }

    this.calcDistance = function()
    {
        var a = x1 - x2;
        var b = y1 - y2;

        return Math.sqrt(a * a + b * b); // Math.hypot
    }

    this.drawPoint = function(point)
    {
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = '#5555dd'; // Red color
        ctx.beginPath();
        ctx.arc(point.x, point.y, 4, 0, Math.PI*2, false);

        ctx.fill();
    }

    this.getClickedPosition = function(mouseX, mouseY)
    {
        var rect = canvas.getBoundingClientRect();
        var x = mouseX - rect.left;
        var y = mouseY - rect.top;

        return { x: x, y: y };
    }

    /*** Private methods ***/
    
}
