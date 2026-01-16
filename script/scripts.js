// JavaScript Document

<!-- ajax -->
<!-- ajax -->
<!-- ajax -->

var xmlhttp;
var urlVar;
var urlDest;
function loadXMLDoc(url, dest)
{
	sec02=1;
	sec02=1;
urlVar=url;
urlDest=dest;
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
  xmlhttp.onreadystatechange=state_Change;
  xmlhttp.open("GET",url,true);
  xmlhttp.send(null);
  }
else
  {
  alert("Your browser does not support XMLHTTP.");
  }
}

function state_Change()
{
if (xmlhttp.readyState==4)
  {// 4 = "loaded"
  if (xmlhttp.status==200)
    {// 200 = "OK"
    document.getElementById(urlDest).innerHTML=xmlhttp.responseText;
	setTimeout("endTrans()",500);
    }
  else
    {
    alert("Problem retrieving data:" + xmlhttp.statusText);
    }
  }
}


	function cambiaSec(url, dest) {
		var loadingCapa = new OpacityTween(document.getElementById('infoLoader'),Tween.regularEaseOut, 0, 100, .4);
		document.getElementById('infoLoader').style.display="block";
		loadingCapa.onMotionFinished = function(){ loadXMLDoc(url, 'info'); };
		loadingCapa.start();
		}
	
	function endTrans() {
		if (urlVar=="info01.html") { gal01(); }
		var loadingCapa = new OpacityTween(document.getElementById('infoLoader'),Tween.regularEaseOut, 100, 0, .4);
		loadingCapa.onMotionFinished = function(){ document.getElementById('infoLoader').style.display="none"; };
		loadingCapa.start();
	}
	
<!-- /ajax -->
<!-- /ajax -->
<!-- /ajax -->

<!-- mail -->
<!-- mail -->
<!-- mail -->
    
function enviaForma() {
				document.getElementById('loadBar').style.display='block'; 
				
							urlVar='scripts/form/form2.php';
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

<!-- /mail -->
<!-- /mail -->
<!-- /mail -->

<!-- intro -->
<!-- intro -->
<!-- intro -->

function intro() {

		var introLinea = new Tween(document.getElementById('img_line').style,'width',Tween.regularEaseIn, 0, 950,0.8,'px');
		var introLogo = new Tween(document.getElementById('img_logo1').style,'top',Tween.regularEaseInOut, 100, 4,0.6,'px');
		var introLogoL = new Tween(document.getElementById('img_logo1_legend').style,'bottom',Tween.regularEaseInOut, 35, 0,0.6,'px');

	introLinea.onMotionFinished = function(){ 
									introLogo.start();
									introLogoL.start();
									};
	 
									
	introLinea.start();

}

function contIntro() {
		document.getElementById('menuEs').style.display = "none";
		document.getElementById('menuEsAct').style.display = "block";
		var introHeader = new Tween(document.getElementById('header').style,'top',Tween.regularEaseInOut, 200, 0,1,'px');
		var introMenu = new OpacityTween(document.getElementById('menu'),Tween.regularEaseOut, 0, 100, .8);
		var introFooter = new OpacityTween(document.getElementById('footer'),Tween.regularEaseOut, 0, 100, .8);
	introHeader.onMotionFinished = function(){ 
									introMenu.start(); 
									introFooter.start(); 
									};
	introMenu.onMotionFinished = function(){ cambiaSec('info01.html', 'info'); 	setInterval("shapeLine()",15000); shapeLine(); };
	introHeader.start();
}

<!-- /intro -->
<!-- /intro -->
<!-- /intro -->

<!-- shape -->
<!-- shape -->
<!-- shape -->

function shapeLine() {
	var shapeLine = new Tween(document.getElementById('img_line_shape').style,'left',Tween.regularEaseInOut, -400, 950, 3,'px');
//	shapeLine.onMotionFinished = function(){ setInterval("shapeLine()",15000); };
	shapeLine.start();
}

<!-- /shape -->
<!-- /shape -->
<!-- /shape -->

<!-- core -->
<!-- core -->
<!-- core -->

<!--
function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_nbGroup(event, grpName) { //v6.0
  var i,img,nbArr,args=MM_nbGroup.arguments;
  if (event == "init" && args.length > 2) {
    if ((img = MM_findObj(args[2])) != null && !img.MM_init) {
      img.MM_init = true; img.MM_up = args[3]; img.MM_dn = img.src;
      if ((nbArr = document[grpName]) == null) nbArr = document[grpName] = new Array();
      nbArr[nbArr.length] = img;
      for (i=4; i < args.length-1; i+=2) if ((img = MM_findObj(args[i])) != null) {
        if (!img.MM_up) img.MM_up = img.src;
        img.src = img.MM_dn = args[i+1];
        nbArr[nbArr.length] = img;
    } }
  } else if (event == "over") {
    document.MM_nbOver = nbArr = new Array();
    for (i=1; i < args.length-1; i+=3) if ((img = MM_findObj(args[i])) != null) {
      if (!img.MM_up) img.MM_up = img.src;
      img.src = (img.MM_dn && args[i+2]) ? args[i+2] : ((args[i+1])? args[i+1] : img.MM_up);
      nbArr[nbArr.length] = img;
    }
  } else if (event == "out" ) {
    for (i=0; i < document.MM_nbOver.length; i++) {
      img = document.MM_nbOver[i]; img.src = (img.MM_dn) ? img.MM_dn : img.MM_up; }
  } else if (event == "down") {
    nbArr = document[grpName];
    if (nbArr)
      for (i=0; i < nbArr.length; i++) { img=nbArr[i]; img.src = img.MM_up; img.MM_dn = 0; }
    document[grpName] = nbArr = new Array();
    for (i=2; i < args.length-1; i+=2) if ((img = MM_findObj(args[i])) != null) {
      if (!img.MM_up) img.MM_up = img.src;
      img.src = img.MM_dn = (args[i+1])? args[i+1] : img.MM_up;
      nbArr[nbArr.length] = img;
  } }
}
//-->
<!-- /core -->
<!-- /core -->
<!-- /core -->

<!-- submenus -->
<!-- submenus -->
<!-- submenus -->

var sec02 = 1;
function submenu02(op) {
	if (op!=sec02) {
		for (i=1; i<5; i++) {
			document.getElementById('submenu020'+i).className = "s02";
		}
var s02imgOut = new OpacityTween(document.getElementById('imgs02'),Tween.regularEaseOut, 100, 0, .2);
var s02imgIn = new OpacityTween(document.getElementById('imgs02'),Tween.regularEaseOut, 0, 100, .4);
		s02imgOut.onMotionFinished = function(){ 
					document.getElementById('imgs02').src = "img/submenu02/our_team0"+op+".gif";
					document.getElementById('submenu020'+op).className = "s02active";
					sec02 = op;
					s02imgIn.start();
		};
		s02imgOut.start();
	}
}
			
var sec03 = 1;
function submenu03(op) {
	if (op!=sec03) {
		for (i=1; i<10; i++) {
			document.getElementById('submenu030'+i).className = "s03";
		}
var s03txtOut = new OpacityTween(document.getElementById('conts03info0'+sec03),Tween.regularEaseOut, 100, 0, .2);
var s03txtIn = new OpacityTween(document.getElementById('conts03info0'+op),Tween.regularEaseOut, 0, 100, .4);
		s03txtOut.onMotionFinished = function(){ 
					document.getElementById('submenu030'+op).className = "s03active";
					document.getElementById('conts03info0'+sec03).style.display = "none";
					document.getElementById('conts03info0'+op).style.display = "block";
					sec03 = op;
					s03txtIn.start();
		};
		s03txtOut.start();
	}
}
t0303 = 1;
function txt0303() {
	if (t0303 == 1) { 
		var txtMove = new Tween(document.getElementById('text03img03').style,'top',Tween.strongEaseOut, 0, -282, .6,'px'); 
		t0303 = 2; 
		class03 = "conts03btnA"; 
	} else { 
		var txtMove = new Tween(document.getElementById('text03img03').style,'top',Tween.strongEaseOut, -282, 0, .6,'px'); 
		t0303 = 1;
		class03 = "conts03btn";
	}
	txtMove.onMotionFinished = function(){ document.getElementById('txt0303btn').className = class03; };
	txtMove.start();
}

t0308 = 1;
function txt0308() {
	if (t0308 == 1) { 
		var txtMove = new Tween(document.getElementById('text03img08').style,'top',Tween.strongEaseOut, 0, -282, .6,'px'); 
		t0308 = 2; 
		class08 = "conts03btnA"; 
	} else { 
		var txtMove = new Tween(document.getElementById('text03img08').style,'top',Tween.strongEaseOut, -282, 0, .6,'px'); 
		t0308 = 1;
		class08 = "conts03btn";
	}
	txtMove.onMotionFinished = function(){ document.getElementById('txt0308btn').className = class08; };
	txtMove.start();
}

ini04=0;
dest04=0;
last04op=1;
function text04(op) {
	document.getElementById('submenu040'+last04op).className = "";
	document.getElementById('submenu040'+(op+1)).className = "submenu040"+(op+1)+"act";
	dest04=op*-340;
	var txt04 = new Tween(document.getElementById('img04').style,'left',Tween.regularEaseOut, ini04, dest04, .4,'px'); 
	txt04.start();
	ini04=dest04;
	last04op=(op+1);
}

cnt04pos=1;
function cont04() {
	// #region agent log
	var logData = {location:'scripts.js:329',message:'cont04 called',data:{cnt04pos:cnt04pos},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'};
	console.log('[DEBUG]', logData);
	fetch('debug_log.php',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(logData)}).catch(function(e){console.log('[DEBUG] Log error:',e);});
	fetch('http://127.0.0.1:7243/ingest/ef9c2ad9-d9c2-4d7b-876d-2da61a7f9dda',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(logData)}).catch(()=>{});
	// #endregion
	var locationBox = document.getElementById('locationBox');
	var conts04 = document.getElementById('conts04');
	var cnt04;
	
	// #region agent log
	var logData2 = {location:'scripts.js:333',message:'Elements check',data:{locationBoxExists:!!locationBox,conts04Exists:!!conts04,TweenExists:typeof Tween!=='undefined'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'};
	console.log('[DEBUG]', logData2);
	fetch('debug_log.php',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(logData2)}).catch(function(e){console.log('[DEBUG] Log error:',e);});
	fetch('http://127.0.0.1:7243/ingest/ef9c2ad9-d9c2-4d7b-876d-2da61a7f9dda',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(logData2)}).catch(()=>{});
	// #endregion
	
	if (cnt04pos==1) { 
		// #region agent log
		var logData3 = {location:'scripts.js:337',message:'Opening form branch',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'};
		console.log('[DEBUG]', logData3);
		fetch('debug_log.php',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(logData3)}).catch(function(e){console.log('[DEBUG] Log error:',e);});
		fetch('http://127.0.0.1:7243/ingest/ef9c2ad9-d9c2-4d7b-876d-2da61a7f9dda',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(logData3)}).catch(()=>{});
		// #endregion
		// Abrir formulario - ocultar el recuadro de direcciones completamente
		// Ocultar ANTES de mostrar el formulario para evitar superposición
		if (locationBox) {
			// Guardar los estilos originales si no están guardados
			if (!locationBox.dataset.originalStyle) {
				locationBox.dataset.originalStyle = locationBox.getAttribute('style');
			}
			// Eliminar completamente el atributo style y aplicar nuevos estilos
			locationBox.removeAttribute('style');
			// Aplicar estilos de ocultamiento usando setProperty con important
			locationBox.style.cssText = 'position: absolute !important; left: -9999px !important; top: 15px !important; width: 420px !important; height: 250px !important; background-color: #394a58 !important; z-index: -1 !important; padding: 18px !important; box-sizing: border-box !important; opacity: 0 !important; visibility: hidden !important; display: none !important; pointer-events: none !important;';
		}
		if (conts04) {
			// #region agent log
			var beforeTop = conts04.style.top || window.getComputedStyle(conts04).top;
			var beforeZIndex = conts04.style.zIndex || window.getComputedStyle(conts04).zIndex;
			var logData4 = {location:'scripts.js:345',message:'Before form animation',data:{beforeTop:beforeTop,beforeZIndex:beforeZIndex,computedTop:window.getComputedStyle(conts04).top,computedZIndex:window.getComputedStyle(conts04).zIndex},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'};
			console.log('[DEBUG]', logData4);
			fetch('debug_log.php',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(logData4)}).catch(function(e){console.log('[DEBUG] Log error:',e);});
			fetch('http://127.0.0.1:7243/ingest/ef9c2ad9-d9c2-4d7b-876d-2da61a7f9dda',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(logData4)}).catch(()=>{});
			// #endregion
			// Asegurar que el formulario está visible y tiene z-index alto
			conts04.style.zIndex = '200';
			conts04.style.display = 'block';
			// Crear la animación para subir el formulario
			cnt04 = new Tween(conts04.style,'top',Tween.regularEaseOut, 0, -320, .4,'px'); 
			// #region agent log
			var logData5 = {location:'scripts.js:348',message:'Tween created',data:{tweenCreated:!!cnt04,tweenType:typeof cnt04,hasStart:!!(cnt04&&cnt04.start)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'};
			console.log('[DEBUG]', logData5);
			fetch('debug_log.php',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(logData5)}).catch(function(e){console.log('[DEBUG] Log error:',e);});
			fetch('http://127.0.0.1:7243/ingest/ef9c2ad9-d9c2-4d7b-876d-2da61a7f9dda',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(logData5)}).catch(()=>{});
			// #endregion
			if (cnt04) {
				cnt04.start();
				// #region agent log
				setTimeout(function(){
					var afterTop = conts04.style.top || window.getComputedStyle(conts04).top;
					var logData6 = {location:'scripts.js:351',message:'After animation start',data:{afterTop:afterTop,computedTop:window.getComputedStyle(conts04).top,animationStarted:true},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'};
					console.log('[DEBUG]', logData6);
					fetch('debug_log.php',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(logData6)}).catch(function(e){console.log('[DEBUG] Log error:',e);});
					fetch('http://127.0.0.1:7243/ingest/ef9c2ad9-d9c2-4d7b-876d-2da61a7f9dda',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(logData6)}).catch(()=>{});
				},100);
				// #endregion
			}
		}
		cnt04pos = 2;
	}
	else { 
		// #region agent log
		fetch('http://127.0.0.1:7243/ingest/ef9c2ad9-d9c2-4d7b-876d-2da61a7f9dda',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'scripts.js:360',message:'Closing form branch',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
		// #endregion
		// Cerrar formulario - mostrar nuevamente el recuadro de direcciones
		if (locationBox) {
			// Restaurar los estilos originales guardados
			if (locationBox.dataset.originalStyle) {
				locationBox.setAttribute('style', locationBox.dataset.originalStyle);
				locationBox.removeAttribute('data-original-style');
			} else {
				// Si no hay estilos guardados, restaurar manualmente
				locationBox.setAttribute('style', 'position: absolute; left: 560px; top: 15px; width: 420px; height: 250px; background-color: #394a58 !important; z-index: 150 !important; padding: 18px; box-sizing: border-box; opacity: 1 !important;');
			}
		}
		if (conts04) {
			cnt04 = new Tween(conts04.style,'top',Tween.regularEaseOut, -320, 0, .4,'px'); 
			if (cnt04) {
				cnt04.start();
			}
		}
		cnt04pos = 1;
	}
}

<!-- /submenus -->
<!-- /submenus -->
<!-- /submenus -->
