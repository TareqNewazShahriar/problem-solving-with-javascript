/// <reference path="../../Scripts/common.js" />

//-----------------On Load function-------------------
window.onload = function ()
{
	BindEvent('click', document.getElementById('lang'), changeLanguage);
	BindEvent('click', document.getElementById('solution'), ShowSolutionPanel);

	document.getElementsByTagName('body').item(0).setAttribute('class', 'bn');
	checkQueryString();
}

//---------------Constants------------------
var Lang = { Bangla: 0, English: 1 };

//------------Starting Initialization------------
var vasha = Lang.Bangla;
var calcYet = 0;

//-------------Global Variables----------------
var v, timerPointer;
function delay(a)
{
	v = a;
	timerPointer = setTimeout(solve, 50);
}
function solve()
{
	calcYet = 1;
	var hand, put, t;
	if (v == 1)
	{
		hand = parseFloat( ToEn(document.getElementById('txtInHand').value));
		//console.log('sdaf');		///
		t = hand / 15;
		put = t * 16;
		document.getElementById('txtPut').value = Num( put);
	}
	else
	{
		put = parseFloat(ToEn(document.getElementById('txtPut').value));
		t = put / 16;
		hand = t * 15;
		document.getElementById('txtInHand').value = Num( hand);
	}
	//console.log( v + ' ## ' + hand + ' ## ' + put + ' ## ' + t);	///
	calculate(hand, put);
}

function calculate(hand, put)
{
	var q = 2;
	var html = '', last, handValue;
	var stepText = vasha == Lang.Bangla ? 'ধাপ' : 'Step';
	var firstChild = document.getElementById('tblResult').rows[0];
	
	for (var i = 1; i <= 4; i++)
	{
		handValue = (hand * 2) - put;
		last = handValue.toFixed(q);
		last = last.replace('-', '');
		html += '<tr><td>' + stepText + ' ' + Num(i) +
				'</td><td>' + Num(hand.toFixed(q)) +
				'</td><td>' + Num((hand * 2).toFixed(q)) +
				'</td><td>' + Num(put.toFixed(q)) +
				'</td><td>' + Num(last) +
				'</td></tr>';
		hand = handValue;
	}
	document.getElementById('tblResult').innerHTML = firstChild.innerHTML + html;
}
function changeLanguage(dom)
{
	if(dom.currentTarget.innerHTML == 'English')
	{
		vasha = Lang.English;
		dom.currentTarget.innerHTML = 'বাংলা';
		document.getElementsByTagName('body').item(0).setAttribute('class', 'en');
	}
	else
	{
		vasha = Lang.Bangla;
		dom.currentTarget.innerHTML = 'English';
		document.getElementsByTagName('body').item(0).setAttribute('class', 'bn');
	}
	if (calcYet == 1)
	{
		tableLanguage();
		document.getElementById('txtPut').value =
			Num(document.getElementById('txtPut').value);
		document.getElementById('txtInHand').value =
			Num(document.getElementById('txtInHand').value);
	}
	else	//if calcYet = 1, that means the panel showed already.
	{		//though there has a case, panel shown, but not calc yet.
		var sol = document.getElementById('solution');
		sol.innerHTML = vasha == Lang.Bangla ? 'সমাধান প্যানেল দেখান' : 'Show solution panel';
	}
	return false;
}
function tableLanguage()
{
	var tbl = document.getElementById('tblResult');
	var html = tbl.innerHTML;
	if(vasha == Lang.Bangla)
	{
		html = ToBn(html);
		html = html.replace(/Step/g, 'ধাপ');
	}
	else
	{
		html = ToEn(html);
		html = html.replace(/ধাপ/g, 'Step');
	}
	tbl.innerHTML = html;
}
function Num(n)
{
	return vasha == Lang.Bangla ? ToBn(n) : ToEn(n);
}
function ShowSolutionPanel()
{
	document.getElementById('solution').style.display = 'none';
	document.getElementById('solutionPanel').removeAttribute('class');
	return false;
}
function checkQueryString()
{
	var val = queryString('proof');
	if (val)
	{
		var proofdiv = document.getElementById('proof');
		proofdiv.style.display = 'block';
		proofdiv.innerHTML = "It's N00. This is the proof to the ppl, who think im a kid.";
		document.getElementById('lang').click();
	}
}