
//-------------Global Variables----------------
var person, cows, milk, limit, totalMilk, eachMilk,
	count, sonLabel, colorChange, colorCode,
	opac, timeOut, interval;
var allotCellId, allot, pInterval, pTimeout, cell; 	// arrays, function Pointer

//---------------Constants------------------
limit = 100;
colorChange = 8865;

//------------Starting Initialization------------
var vasha = Lang.Bangla;
var calcYet = 0;

//-----------------Central Function-------------------
function main()
{
	if (validation() == 0)
		return;
	Initialization();
	ResultText();
	CreateTable();
	CowAllotement();
	FireAnimation();
}

//--------------Main Process : Cow Allotement-----------
function CowAllotement()
{
	var count = 1;
	for (var k = 1; k <= person; k++)
	{
		for (var i = 1, j = k; i <= person; i++, j++)
		{
			if (j > person)
				j = 1;
			allotCellId[count] = 'td_' + i + '_' + j;
			allot[count] = (person * (i - 1)) + j;
			++count;
		}
	}
}

//-------------Other Auxiliary Functions--------------
function validation()
{
	var status = 1;
	person = ToEn(document.getElementById('person').value);
	person = parseFloat(person);
	//console.log(person); //x
	if (person == null || person == 0)
		status = 0;
	else if (person > limit)
	{
		document.getElementById('person').value = limit;
		status = 0;
	}
	return status;
}
function Initialization()
{
	try
	{
		clearInterval(pInterval);
		clearTimeout(pTimeout);
	}
	catch (e) { }

	opac = 0.05;
	timeOut = 1000.0 / person;
	interval = timeOut / (1 / opac);
	timeOut += 100;

	count = 1;
	colorCode = 0;

	cows = person * person;
	milk = ((cows * (cows + 1)) / 2) / person;
	
	allotCellId = new Array(cows + 1);
	allot = new Array(cows + 1);

	document.getElementById('list').innerHTML = '';
	calcYet = 1;
}
function ResultText()
{
	var text = '';
	var person2 = person * person;
	totalMilk = (person2 * (person2 + 1)) / 2;
	eachMilk = totalMilk / person;
	if (vasha == Lang.Bangla)
	{
		text = '<p>' + 'গরু ও দুধ ' + ToBn(person) + ' জনের মধ্যে সমান ভাগে ভাগ করতে হলে অবশ্যই গরুর সংখ্যা (' +
						ToBn(person) + 'x' + ToBn(person) +
						') = ' + ToBn((person2)) + ' হতে হবে।<br/>' +
						' মোট দুধের পরিমাণ হবে ' + ToBn(totalMilk) + ' কেজি।' +
						' প্রত্যেকে মোট ' + ToBn(person) + 'টি করে গরু এবং মোট ' + ToBn(eachMilk) +
						' কেজি করে দুধ পাবে। নীচের টেবিলে একই লোকের গরুগুলোকে একই রঙ দ্বারা চিহ্নিত করা হল।<br/>' +
						' গরুগুলোকে একটা ' + ToBn(person) + 'x' + ToBn(person) +
						' টেবিলে সাজানো যাক। এবং এই সমস্যার সমাধান সংখ্যাগুলোকে এভাবে সাজানোর মধ্যেই নিহিত।' +
						'</p>';
	}
	else if (vasha == Lang.English)
	{
		text = '<p>' + 'The number of cows must be ' + person + 'x' + person + '=' +
						(person2) + ', to divide the cows and milk equally.' +
						' Total amount of milk is ' + totalMilk + ' KG.' +
						' Each son will get ' + person + ' cows and ' +
						eachMilk + ' KGs of milk.<br/>' +
						' In the table below, each son\'s cows colored with ' + 
						' the same color.' +
						' Let arrange the cows in a ' + person + 'x' + person +
						' table; and the key to solve this problem is in arranging the' +
						' cows is in that way.' +
						'</p>';
	}
	document.getElementById('text').innerHTML = text;
}
function CreateTable()
{
	var html = '', k = 1;
	for (var i = 1; i <= person; i++)
	{
		html += '<tr>';
		for (var j = 1; j <= person; j++)
		{
			// row-column separate ID is necessary to separate '1 11' and '11 1'
			html += '<td id=td' + ('_' + i + '_' + j) + '>' + Num(k) + '</td>';
			k++;
		}
		html += '</tr>';
	}
	document.getElementById('tbl').innerHTML = html;
}
function FireAnimation()
{
	if (count > cows)
		return;

	//console.log( 't--' +  new Date().getMilliseconds() + '  ' + count);
	cell = document.getElementById(allotCellId[count]);
	cell.style.opacity = 0.0;
	if (count % person == 1)
	{
		sonLabel = vasha == Lang.Bangla ? 'ছেলে' : 'Son';
		cell.style.backgroundColor = GetColor(true);
		var list = document.getElementById('list');
		var cowsNum = getCows(ToEn(cell.innerHTML));
		list.innerHTML += '<li style="background-color:' +
								cell.style.backgroundColor + '"><span> &nbsp;' +
								sonLabel + ' ' + cell.innerHTML + ': ' + cowsNum +
								 '</span></li>';
	}
	else
	{
		cell.style.backgroundColor = GetColor(false);
	}
	pInterval = setInterval(Animate, interval);
	pTimeout = setTimeout(FireAnimation, timeOut);
	count++;
}
function getCows(son)
{
	var cowsNum = ' &nbsp; ';
	var j = person * son;
	var i = j - person + 1;

	for (; i <= j; i++)
	{
		cowsNum += Num(allot[i]) + ' + ';
	}
	var x = cowsNum.lastIndexOf('+');
	if (x != -1)
	{
		cowsNum = cowsNum.substring(0, x);
		cowsNum += ' = ' + Num( eachMilk);
	}
	return cowsNum;
}
function Animate()
{
	cell.style.opacity = parseFloat(cell.style.opacity) + opac;
	if (cell.style.opacity >= 1.0)
	{
		//console.log('i...fPoint: ' + pInterval + ',  opc: ' + cell.style.opacity );	///
		clearInterval(pInterval);
	}
}
function GetColor(newColor)
{
	colorCode += newColor == true? colorChange : 0;

	if (colorCode.toString().length == 4)
		return '#00' + colorCode;
	else if (colorCode.toString().length == 5)
		return '#0' + colorCode;
	else if (colorCode.toString().length == 6)
		return '#' + colorCode;
}
function cellLanguage(vasha)
{
	for (var i = 1; i < allotCellId.length; i++)
	{
		cell = document.getElementById(allotCellId[i]);
		//console.log(cell);
		cell.innerHTML = vasha == Lang.Bangla ? ToBn(cell.innerHTML) : ToEn(cell.innerHTML);
	}
}
function sonLabelLanguage(vasha)
{
	var ul = document.getElementById('list');
	var html = '';
	for (var i = 0; i < ul.childNodes.length; i++)
	{
		html = ul.childNodes.item(i).innerHTML;
		if (vasha == Lang.Bangla)
		{
			html = ToBn(html);
			html = html.replace('Son', 'ছেলে');
			ul.childNodes.item(i).innerHTML = html;
		}
		else
		{
			html = ToEn(html);
			html = html.replace('ছেলে', 'Son');
			ul.childNodes.item(i).innerHTML = html;
		}
		//console.log(ul.childNodes.item(i));
	}
}
function changeLanguage(dom)
{
	if (dom.currentTarget.innerText.indexOf('English')>=0)
	{
	    vasha = Lang.English;
	    document.getElementById('calculate').value = 'Solve';
	    document.getElementsByTagName('body').item(0).setAttribute('class', 'en');
	}
	else
	{   
	    vasha = Lang.Bangla;
	    document.getElementById('calculate').value = 'সমাধান';
	    document.getElementsByTagName('body').item(0).setAttribute('class', 'bn');
	}
	if (calcYet == 1)
	{
		ResultText();
		cellLanguage(vasha);
		sonLabelLanguage(vasha);
	}
	else	//if calcYet = 1, that means the panel showed already.
	{		//though there has a case, panel shown, but not calc yet.
		var sol = document.getElementById('solution');
		sol.innerHTML = vasha == Lang.Bangla ? 'সমাধান প্যানেল দেখান' : 'Show solution panel';
	}
	return false;
}
function ShowSolutionPanel()
{
	document.getElementById('solution').style.display = 'none';
	document.getElementById('solutionPanel').removeAttribute('class');
	return false;
}
//-----------------On Load function-------------------
window.onload = function()
{
	document.getElementById('calculate').onclick = main;
	document.getElementById('lang').onclick = changeLanguage;
	document.getElementById('solution').onclick = ShowSolutionPanel;
	document.getElementsByTagName('body').item(0).setAttribute('class', 'bn');
}
