window.onload = function()
{
	document.getElementById('num').onkeypress = inword;
	document.getElementById('ddlCode').onchange = displayCode;
	document.getElementById('code').onclick = showCode;
}

function inword()
{
	setTimeout(inword_delayStart, 50);
}

function inword_delayStart()
{
	var val = ToEn(document.getElementById('num').value);
	document.getElementById('wordBn').value = NumberInWord_Bn(val);
	document.getElementById('wordEn').value = NumberInWord_En(val);
}
function showCode()
{
	document.getElementById("code").style.display = 'none';
	document.getElementsByTagName('fieldset').item(0).style.display = 'block';
}
function displayCode(e)
{
	var x = document.getElementById("ddlCode");
	
	document.getElementById("jsBn").style.display = 'none';
	document.getElementById("jsEn").style.display = 'none';
	document.getElementById("csBn").style.display = 'none';
	document.getElementById("csEn").style.display = 'none';

	switch(x.selectedIndex)
	{
		case 1: document.getElementById("jsBn").style.display = 'block'; break;
		case 2: document.getElementById("jsEn").style.display = 'block'; break;
		case 3: document.getElementById("csBn").style.display = 'block'; break;
		case 4: document.getElementById("csEn").style.display = 'block'; break;
	}
}


//-----------------Number In-word functions-------------------

function NumberInWord_Bn(number)
{
	/***code_of_tns***/
	
	number = trim(number);
	if (isNaN(parseFloat(number)) == true)
		return "";
	else if (parseFloat(number) == 0)
		return "Zero";

	number = number.toString().replace( ',', '' );
	
	if (number == null || number == '' || parseFloat(number) == null)
		return '';
	
	var num = number.split('.');
	number = trim(num[0]).replace(/^0+/g, ''); ;

	var word1 = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight",
					"Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen",
					"Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
	var word2 = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
	var word3 = ["", "", "Thousand", "Lac", "Crore"];
	
	var i3, len, n1, n2,
		CompleteWord, tmp;

	CompleteWord = "";

	var d = number
	i3 = 0;
	len = d.length - 1;

	for (; len >= 0; len--, i3 = (i3 % 4) + 1)	// for i3, cycle, 1 through 4
	{
		n1 = d.charCodeAt(len) - 48; // converting char to int. eg. '2' -> 2

		if (i3 != 1)		// if not the term of hundred
		{
			if (len > 0)	// making tow-digit word
			{
				len--;
				n2 = d.charCodeAt(len) - 48;
				if (n2 * 10 + n1 < 20)	// if 10 to 19, then copy predifined digitWord num1[10..19]
					tmp = word1[n2 * 10 + n1];
				else				// making two digits inWord  >19
					tmp = word2[n2] + (word1[n1] == "" ? "" : " " + word1[n1]);

			}
			else tmp = word1[n1];

			// creating Quantity-in-Word---
			if (i3 == 4)		// always place crore, though zero
				CompleteWord = (tmp==""? "" : tmp+" ") + word3[4] + " " + CompleteWord;
			else if (tmp != "")
			{
				var t = word3[i3] == "" ? "" : " " + word3[i3];
				var s = CompleteWord == "" ? "" : " " + CompleteWord;
				CompleteWord = tmp + t + s;
			}
		}
		else if (n1 != 0)		// it is now the term to be hundred
			CompleteWord = word1[n1] + " Hundred " + CompleteWord;

	} // for loop

	CompleteWord = trim(CompleteWord);

	if (num.length > 1 && isNaN(parseInt(num[1])) == false && parseInt(num[1]) != 0)
	{
		var points = num[1].replace(/0+$/g, ''); ;
		CompleteWord += " (point)";
		for (var k, i = 0; i < points.length; i++)
		{
			k = points.charCodeAt(i) - 48;
			CompleteWord += k ==0? " Zero" : " " + word1[k];
		}
	}
	
	return CompleteWord;
} // NumberInWord_Bn

//--------------English version----------------
function NumberInWord_En( number )
{
	/***code_of_tns***/
	
	number = trim(number);
	if (isNaN(parseFloat(number)) == true)
		return "";
	else if (parseFloat(number) == 0)
		return "Zero";

	number = number.toString().replace(',','');

	if (number == null || number == '' || parseFloat(number) == null)
		return '';

	var num = number.split('.');
	number = trim(num[0]).replace(/^0+/g, ''); ;

	var word1 = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
					"Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
					"Seventeen", "Eighteen", "Nineteen"];
	var word2 = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
	var word3 = ["Hundred", "", "Thousand", "Million", "Billion", "Trillion", "Quadrillion", "Quintrillion"];

	var f1, f2;   // flags
	var i3, len, n1, n2;
	var CompleteWord, tmp;

	len = number.length - 1;
	f1 = true;		// to denote - term of hundred
	f2 = false;		// to denote - digit zero
	i3 = 0;
	CompleteWord = "";

	for( ; len >= 0; len--, f1 = !f1 )
	{
		if( f1 == true )
		{
			i3++;
			n1 = number.charCodeAt(len) - 48;		// converting char to int. eg. '2' -> 2

			if( len > 0 )			// making tow-digit word
			{
				len--;
				n2 = number.charCodeAt(len) - 48;
				if (n2 * 10 + n1 < 20)	// if 10 to 19, then copy predifined digitWord num1[10..19]
					tmp = word1[n2 * 10 + n1];
				else				// making two digits inWord  >19
				{
					var t = word2[n2] != "" && word1[n1] != "" ? " " : "";
					tmp = word2[n2] + t + word1[n1];
				}
			}
			else tmp = word1[n1];

			if( tmp != "" )		// creating Quantity-in-Word
			{
				var t = word3[i3] == "" ? "" : " " + word3[i3];
				var s = CompleteWord == "" ? "" : " " + CompleteWord;
				CompleteWord = tmp + t + s;
				f2 = false;
			}
			else f2 = true;		// remember! empty word created.
		}
		else
		{					// it is now the term to be hundred
			n1 = number.charCodeAt(len) - 48;
			tmp = word1[n1];
			if( tmp != "" )
			{
				if (f2 == true && i3 > 1)
				{
					var t = word3[i3] == "" ? "" : word3[i3] + " ";
					CompleteWord = tmp + " Hundred " + t + CompleteWord;
				}
				else
					CompleteWord = tmp + " Hundred " + CompleteWord;
			}
		}
	} // for loop
	CompleteWord = trim(CompleteWord);
	if (num.length > 1 && isNaN(parseInt(num[1])) == false && parseInt(num[1]) != 0)
	{
		var points = num[1].replace(/0+$/g, ''); ;
		CompleteWord += " (point)";
		for( var k, i = 0; i < points.length; i++ )
		{
			k = points.charCodeAt(i) - 48;
			CompleteWord +=  (k==0? " Zero": " " + word1[k]);
		}
	}
	
	return CompleteWord;

} // NumberInWord_En


/*
string[] samples = { "", "", "0000000000000000000000000000000000000", "0","12", "34", "123", "1234", "12345", "123456", "1234567", "12345678", "123456789", "1234567891", "12345678912",  "123456789123", "1234567891234",	"12345678912345", "123456789123456", "1234567891234567",	
"101", "152", "1001", "2375", "15972", "234753", // <-- from bangla academy's dictionary, Appendix-4, p.18
	"10","30","103","1004","10005", "0000000100006", "100000", "1000007", "10000008", "103406709", "1000000091", "12045078012",  "100456089000", "1230067890034", "12345670000000", "023400789003400", "1034000000004500"  };
*/


