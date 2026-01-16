// ============================================
// COMANDO PARA RECARGAR Y CORREGIR cont04
// ============================================
// Copia y pega TODO este código en la consola del navegador (F12 → Console)
// Luego presiona Enter

(function() {
	console.log('=== INICIANDO RECARGA Y CORRECCIÓN DE cont04 ===');
	
	// 1. Recargar el script con cache-busting
	console.log('1. Recargando script/scripts.js...');
	var scriptTag = document.querySelector('script[src*="scripts.js"]');
	if (scriptTag) {
		var oldSrc = scriptTag.src;
		var newSrc = oldSrc.split('?')[0] + '?v=' + Date.now();
		var newScript = document.createElement('script');
		newScript.src = newSrc;
		newScript.onload = function() {
			console.log('✓ Script recargado. Verificando cont04...');
			setTimeout(function() {
				applyCorrectCont04();
			}, 100);
		};
		newScript.onerror = function() {
			console.error('✗ Error al recargar script, aplicando corrección directa...');
			applyCorrectCont04();
		};
		document.head.appendChild(newScript);
	} else {
		console.log('No se encontró tag script, aplicando corrección directa...');
		applyCorrectCont04();
	}
	
	// 2. Función para aplicar la corrección directamente
	function applyCorrectCont04() {
		console.log('2. Aplicando corrección directa a cont04...');
		
		cont04 = function() {
			var locationBox = document.getElementById('locationBox');
			var conts04 = document.getElementById('conts04');
			var cnt04;
			
			console.log('[cont04] Iniciando. cnt04pos:', cnt04pos, 'locationBox:', !!locationBox, 'locationBox.parentNode:', !!locationBox?.parentNode);
			
			if (cnt04pos==1) { 
				console.log('[cont04] Entrando en rama cnt04pos==1 (abrir formulario)');
				if (locationBox && locationBox.parentNode) {
					console.log('[cont04] locationBox y parentNode existen, procediendo a remover...');
					if (!window.locationBoxParent) {
						window.locationBoxParent = locationBox.parentNode;
						window.locationBoxNextSibling = locationBox.nextSibling;
						window.locationBoxElement = locationBox;
						console.log('[cont04] Referencias guardadas');
					}
					try {
						locationBox.parentNode.removeChild(locationBox);
						console.log('[cont04] locationBox removido. Verificando si existe:', !!document.getElementById('locationBox'));
					} catch(e) {
						console.error('[cont04] ERROR al remover locationBox:', e);
					}
				} else {
					console.error('[cont04] ERROR: locationBox o parentNode no existe');
				}
				if (conts04) {
					console.log('[cont04] Configurando formulario conts04...');
					conts04.style.zIndex = '200';
					conts04.style.display = 'block';
					cnt04 = new Tween(conts04.style,'top',Tween.regularEaseOut, 0, -320, .4,'px'); 
					if (cnt04) {
						cnt04.start();
					}
				}
				cnt04pos = 2;
			} else { 
				console.log('[cont04] Cerrando formulario...');
				if (window.locationBoxParent && window.locationBoxElement) {
					console.log('[cont04] Restaurando locationBox al DOM...');
					if (window.locationBoxNextSibling && window.locationBoxNextSibling.parentNode) {
						window.locationBoxParent.insertBefore(window.locationBoxElement, window.locationBoxNextSibling);
					} else {
						window.locationBoxParent.appendChild(window.locationBoxElement);
					}
					console.log('[cont04] locationBox restaurado');
				}
				if (conts04) {
					cnt04 = new Tween(conts04.style,'top',Tween.regularEaseOut, -320, 0, .4,'px'); 
					if (cnt04) {
						cnt04.start();
					}
				}
				cnt04pos = 1;
			}
		};
		
		console.log('✓ Función cont04 corregida y aplicada');
		console.log('3. Verificación final:');
		console.log('   - cont04 es función:', typeof cont04 === 'function');
		console.log('   - cont04 incluye locationBox:', cont04.toString().includes('locationBox'));
		console.log('');
		console.log('=== LISTO: Ahora presiona el botón "CONTACT US" ===');
	}
})();
