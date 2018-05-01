
function flipTheText()
{
	try
	{
	    var text = document.getElementById('ctl00_ctl00_cphContent_cphContent_txtText').value;
		var result = flipString(text);
		var res = result.split('\n');
		var flipTxt = "";
		for (var i = res.length - 1; i >= 0; i--)
		{
			flipTxt += res[i] + '\n';
		}
		if (flipTxt == "\n")
			flipTxt = "";
		
		document.getElementById('ctl00_ctl00_cphContent_cphContent_txtFlipped').value = flipTxt;
		showHideSelectButton(flipTxt.length);

		setFlash();		
	}
	catch (e)
	{
	}
}

function bookmark()
{
	var favUrl = window.location;
	var favTitle = document.title;
	if (navigator.userAgent.indexOf('MSIE') >= 0 && navigator.userAgent.indexOf('Opera') < 0)
	{	//i.e: if ie and not opera (may be opera useragent text has the word 'msie')
		window.external.AddFavorite(favUrl, favTitle);
	}
	else	// for non-ie
	{
		window.sidebar.addPanel(favTitle, favUrl, "");
	}
}


var start = false;
function setFlash()
{
	if (start == true)
		return;
	start = true;
	//console.log('add'); ////////
	var fls = document.getElementById('flashDiv');
	fls.classList.add('flashContainer');
	setTimeout(flashOut, 1500);
}

function flashOut()
{
	//console.log('rem'); ///////
	var fls = document.getElementById('flashDiv');
	fls.classList.remove('flashContainer');
	start = false;
}

function showHideSelectButton(len)
{
	var btn = document.getElementById('sel');
	if (len > 0)
	{
		btn.style.display = 'block';
	}
	else
	{
		btn.style.display = 'none';
	}
}

function flipString(text)
{
	text = text.toLowerCase();
	var result = "";
	var i = text.length - 1;
	for (; i >= 0; --i)
	{
		result += flipChar(text.charAt(i))
	}	
	return result;
}

function flipChar(c)
{
	if (c == 'a')
	{
		return '\u0250' // ɐ  V  Ѷ      ∀:'u2200'
	}
	else if (c == 'b')
	{
		return 'q'
	}
	else if (c == 'c')
	{
		return '\u0254'
	}
	else if (c == 'd')
	{
		return 'p'
	}
	else if (c == 'e')
	{
		return '\u01DD' // ∃
	}
	else if (c == 'f')
	{
		return '\u025F'  // Ⅎ
	}
	else if (c == 'g')
	{
		return 'ƃ'		// 6 | b   ƃ
	}
	else if (c == 'h')
	{
		return '\u0265'
	}
	else if (c == 'i')
	{
		return 'ı'		// !   '\u0131\u0323'  'u1D4E' 
	}
	else if (c == 'j')
	{
		return 'ɾ' // ɾ   Ր  |  £ | \u0638 (Arabic toa) 
	}
	else if (c == 'k')
	{
		return '\u029E'
	}
	else if (c == 'l')
	{
		return 'l'  // l | \u05DF (Arabic 2 or 6)  ﾡ :'uFFA1'
	}
	else if (c == 'm')
	{
		return '\u026F'	// səƃɐssəɯ
	}
	else if (c == 'n')
	{
		return 'u'
	}
	else if (c == 'o')
	{
		return 'o'
	}
	else if (c == 'p')
	{
		return 'd'
	}
	else if (c == 'q')
	{
		return 'b'
	}
	else if (c == 'r')
	{
		return '\u0279'
	}
	else if (c == 's')
	{
		return 's'
	}
	else if (c == 't')
	{
		return '\u0287'
	}
	else if (c == 'u')
	{
		return 'n'		// Ո
	}
	else if (c == 'v')
	{
		return '\u028C' // ⋀
	}
	else if (c == 'w')
	{
		return '\u028D'
	}
	else if (c == 'x')
	{
		return 'x'
	}
	else if (c == 'y')
	{
		return '\u028E'  // ⑃ -'u2443'
	}
	else if (c == 'z')
	{
		return 'z'
	}
	else if (c == '[')
	{
		return ']'
	}
	else if (c == ']')
	{
		return '['
	}
	else if (c == '(')
	{
		return ')'
	}
	else if (c == ')')
	{
		return '('
	}
	else if (c == '{')
	{
		return '}'
	}
	else if (c == '}')
	{
		return '{'
	}
	else if (c == '?')
	{
		return '\u00BF'
	}
	else if (c == '\u00BF')
	{
		return '?'
	}
	else if (c == '!')
	{
		return '\u00A1'
	}
	else if (c == "\'")
	{
		return ','
	}
	else if (c == ',')
	{
		return "\'"
	}
	else if (c == '.')
	{
		return '\u02D9'
	}
	else if (c == '_')
	{
		return '\u203E'
	}
	else if (c == ';')
	{
		return '\u061B'
	}
	//	else if (c == '\n') { 
	//		return '<br/>' 
	//	}
	return c;
}

function selectText()
{
    document.getElementById('ctl00_ctl00_cphContent_cphContent_txtFlipped').select();
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
			pair[1] = decodeURI(pair[1]);
			pair[1] = pair[1].toString().replace(/\+/g, " ");
			return pair[1];
		}
	}
	return "";
}
