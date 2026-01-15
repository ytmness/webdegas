// JavaScript Document

<!-- mail -->
    
function enviaForma() {
				document.getElementById('loadBar').style.display='block'; 
				
							urlVar='form/form2.php';
							urlVar=urlVar+'?posName=' + document.cForm.posName.value; 
							urlVar=urlVar+'&posEmail='+document.cForm.posEmail.value; 
							urlVar=urlVar+'&posJob='+document.cForm.posJob.value;
							urlVar=urlVar+'&posCity='+document.cForm.posCity.value;
							urlVar=urlVar+'&posCountry='+document.cForm.posCountry.value;
							urlVar=urlVar+'&posText='+document.cForm.posText.value;
							urlDest='destNone';
							xmlhttp=null;
							if (window.XMLHttpRequest)
							  {// code for Firefox, Opera, IE7, etc.
							  xmlhttp=new XMLHttpRequest();
							  }
							else if (window.ActiveXObject)
							  {// code for IE6, IE5
							  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
							  }
							if (xmlhttp!=null)
							  {
							  xmlhttp.onreadystatechange=state_ChangeForma;
							  xmlhttp.open("GET",urlVar,true);
							  xmlhttp.send(null);
							  }
							else
							  {
							  alert("Your browser does not support XMLHTTP.");
							  }
						
				
				//loadXMLDoc('form/form2.php?posName=tig&posEmail=mail&posEmp=jale&posText=texto', 'destNone');
				
	}
	function state_ChangeForma()
{
if (xmlhttp.readyState==4)
{// 4 = "loaded"
if (xmlhttp.status==200)
{// 200 = "OK"
document.getElementById(urlDest).innerHTML=xmlhttp.responseText;
setTimeout('formaEnviada()', 1000);
}
else
{
alert("Problem retrieving data:" + xmlhttp.statusText);
}
}
}

function formaEnviada() {
				document.getElementById('loadBar').style.display='none'; 
				document.getElementById('emailSuccess').style.display='block'; 
	}    
<!-- mail -->