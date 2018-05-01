
var nums, sums, row_sum;

var MyApp = MyApp || {};
MyApp.MaxSum = MyApp.MaxSum || {};
MyApp.MaxSum = function ()
{
    bindEvent('btnCreateInput', 'click', createInputBoxes);
    bindEvent('btnCreateInputWithRandom', 'click', createInputBoxes);
    bindEvent('btnSolve', 'click', Solve);
}
MyApp.MaxSum();

function bindEvent(id, eventName_withoutOn, callback)
{
    if (window.addEventListener)
        document.getElementById(id).addEventListener(eventName_withoutOn, callback);
    else
        document.getElementById(id).attachEvent('on' + eventName_withoutOn, callback);
}

function createInputBoxes(e)
{
    var n = parseInt(document.getElementById('txtN').value);
    if (isNaN(n) || n > 150)
    {
        document.getElementById('txtN').style.border = '1px red solid';
        return;
    }
    else
        document.getElementById('txtN').style.border = '';

    document.getElementById('solutionLabel').innerHTML = '';
    var tbl = document.getElementById('matrix');
    tbl.innerHTML = '';
    var rnd = e.srcElement.getAttribute('data-random') == 'true';
    for (var i = 1; i <= n; i++)
    {
        var tr = document.createElement('tr');
        for (var j = 1; j <= n; j++)
        {
            var txt = document.createElement('input');
            txt.id = 'cell_' + i + '_' + j;
            txt.type = 'text';
            txt.style.width = '30px';
            txt.value = (rnd ? genRandom() : '');
            var td = document.createElement('td');
            td.appendChild(txt);
            tr.appendChild(td);
        }
        tbl.appendChild(tr);
    }
    document.getElementById('spoilerPanel').style.display = 'block';
}

function genRandom()
{
    var x  = parseInt(Math.random() * 100) % 128; // should be less than or equal 127
    if(x%2==1)
        x  = -x;
    return x;
}

function Solve()
{
    var n = parseInt(document.getElementById('txtN').value);
    init2dArrays(n);
    input(n);
    var rect = find_max_rectangle(n);
    document.getElementById('solutionLabel').innerHTML = 'Maximum Sum: ' + rect.max;
        //' | Max sub-rectangle: (' + rect.x1 + ', ' + rect.y1 + ') (' + rect.x2 + ', ' + rect.y2 + ')';
    drawMaxRectangle(rect, 'black');
}

function init2dArrays(n)
{
    nums = null;
    sums = null;
    row_sum = null;

    // init the 2d arrays
    nums = new Array(n + 2);
    sums = new Array(n + 2);
    row_sum = new Array(n + 2);
    for (var i = 0; i <= n; i++)
    {
        nums[i] = new Array(n + 2);
        sums[i] = new Array(n + 2);
        row_sum[i] = new Array(n + 2);
        for (var j = 0; j <= n; j++)
        {
            sums[i][j] = 0;
            row_sum[i][j] = 0;
        }
    }
}

function input(n)
{
    var i, j;
    for (i = 1; i <= n; i++)
    {
        for (j = 1; j <= n; j++)
        {
            nums[i][j] = parseInt(document.getElementById('cell_' + i + '_' + j).value);
        }
    }
}

function find_max_rectangle(n)
{
    var a, b, i, j, rect;
    rect = { max: nums[1][1], x1: 1, y1: 1, x2: 1, y2: 1 };
    for (a = 1; a <= n; a++)
    {
        for (b = 1; b <= n; b++)	// i, j is top-left point of current rectangle
        {
            for (j = b, i = a - 1; j <= n; j++) // blank the all row_sum that going to
                row_sum[i][j] = 0;              // be evaluated in next i,j loops
            for (i = a; i <= n; i++) // increase the height of rectengle
            {   
                sums[i][b - 1] = 0;
                for (j = b; j <= n; j++) // increase the width of the rectangle
                {
                    row_sum[i][j] = row_sum[i - 1][j] + nums[i][j];
                    sums[i][j] = sums[i][j - 1] + row_sum[i][j];

                    if (sums[i][j] > rect.max)
                    {
                        rect.max = sums[i][j];
                        rect.x1 = a; rect.y1 = b;
                        rect.x2 = i; rect.y2 = j;
                    }
                }
            }
        }
    }
    return rect;
}

function drawMaxRectangle(rect, color)
{
    for (var i = rect.x1; i <= rect.x2; i++)
    {
        var td1 = document.getElementById('cell_' + i + '_' + rect.y1).parentElement;
        var td2 = document.getElementById('cell_' + i + '_' + rect.y2).parentElement;
        td1.style.borderLeft = '2px ' + color + ' dashed';
        td2.style.borderRight = '2px ' + color + ' dashed';
    }

    for (var i = rect.y1; i <= rect.y2; i++)
    {
        var td1 = document.getElementById('cell_' + rect.x1 + '_' + i).parentElement;
        var td2 = document.getElementById('cell_' + rect.x2 + '_' + i).parentElement;
        td1.style.borderTop = '2px ' + color + ' dashed';
        td2.style.borderBottom = '2px ' + color + ' dashed';
    }

}
