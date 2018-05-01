
var Lang = { Bangla: 0, English: 1 };

function trim(str) // prototype not used, for compatibility issue
{
	return  str.toString().replace(/^\s+|\s+$/g, '');
}
function Num(n)
{
	return vasha == Lang.Bangla ? ToBn(n) : ToEn(n);
}
function ToBn(n)
{
	var s, bn, k, adjust;
	adjust = 2486;
	s = n.toString();
	bn = '';
	for (var i = 0; i < s.length; i++)
	{
		k = s.charCodeAt(i);
		bn += (k >= 48 && k <= 57) ? String.fromCharCode((k + adjust))
											: s.charAt(i);
	}
	return bn;
}
function ToEn(n)
{
	var s, en, k, adjust;
	adjust = 2486;
	s = n.toString();
	en = '';
	for (var i = 0; i < s.length; i++)
	{
		k = s.charCodeAt(i);
		en += (k >= 2534 && k <= 2543) ? String.fromCharCode((k - adjust))
												: s.charAt(i);
	}
	return en;
}
function log(e)
{
	console.log(e);
}

function BindEvent(evnt, elem, func)
{
	if (elem.addEventListener)  // W3C DOM
		elem.addEventListener(evnt, func, false);
	else if (elem.attachEvent)
	{ // IE DOM
		var r = elem.attachEvent("on" + evnt, func);
		return r;
	}
	else window.alert('I\'m sorry lababa, I\'m afraid I can\'t do that.');
}

function queryString(key)
{
	key = key.toLowerCase();
	var query = window.location.search;
	query = query.substring(1);
	var arr = new Array();
	var arr = query.split('&');
	for (var i = 0; i < arr.length; i++)
	{
		var pair = arr[i].split('=');
		if (pair[0].toLowerCase() == key)
		{
			pair[1] = decodeURI(pair[1]); 	// decoded the encoded url
			pair[1] = pair[1].toString().replace(/\+/g, " "); // '+' -> ' '
			return pair[1];
		}
	}
	return null;
}
