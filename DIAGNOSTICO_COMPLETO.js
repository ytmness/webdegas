// ============================================
// DIAGNÓSTICO COMPLETO - Ejecutar en consola del navegador
// ============================================

console.log('=== DIAGNÓSTICO COMPLETO DEL PROBLEMA ===\n');

// 1. Ver qué script se cargó
console.log('1. SCRIPTS CARGADOS:');
Array.from(document.scripts).forEach(s => {
    if (s.src && s.src.includes('scripts.js')) {
        console.log('   📍', s.src);
    }
});

// 2. Verificar si cont04 existe y qué versión tiene
console.log('\n2. VERIFICAR FUNCIÓN cont04:');
if (typeof cont04 === 'function') {
    var funcStr = cont04.toString();
    console.log('   ✓ cont04 es una función');
    console.log('   Longitud:', funcStr.length, 'caracteres');
    console.log('   ¿Tiene locationBox?', funcStr.includes('locationBox'));
    console.log('   ¿Tiene locationBox.parentNode?', funcStr.includes('locationBox.parentNode'));
    console.log('   ¿Tiene "Versión correcta forzada"?', funcStr.includes('Versión correcta forzada'));
    
    // Mostrar primeras líneas
    var firstLines = funcStr.split('\n').slice(0, 10).join('\n');
    console.log('\n   Primeras líneas de la función:');
    console.log('   ' + firstLines.replace(/\n/g, '\n   '));
} else {
    console.log('   ❌ cont04 NO es una función o no existe');
    console.log('   Tipo:', typeof cont04);
}

// 3. Verificar elementos del DOM
console.log('\n3. VERIFICAR ELEMENTOS DEL DOM:');
var locationBox = document.getElementById('locationBox');
var conts04 = document.getElementById('conts04');
console.log('   locationBox existe:', !!locationBox);
if (locationBox) {
    console.log('   locationBox.parentNode:', locationBox.parentNode ? locationBox.parentNode.nodeName : 'null');
    console.log('   locationBox.style.display:', locationBox.style.display || 'no definido');
    console.log('   locationBox.style.visibility:', locationBox.style.visibility || 'no definido');
}
console.log('   conts04 existe:', !!conts04);

// 4. Verificar si hay código de auto-corrección ejecutándose
console.log('\n4. VERIFICAR CÓDIGO DE AUTO-CORRECCIÓN:');
console.log('   window.locationBoxParent:', !!window.locationBoxParent);
console.log('   window.locationBoxElement:', !!window.locationBoxElement);

// 5. Intentar cargar el script directamente desde el servidor con cache-busting
console.log('\n5. VERIFICAR CONTENIDO DEL SCRIPT EN EL SERVIDOR:');
fetch('script/scripts.js?v=' + Date.now())
    .then(r => r.text())
    .then(text => {
        console.log('   ✓ Script cargado desde servidor');
        console.log('   Longitud del archivo:', text.length, 'caracteres');
        console.log('   ¿Tiene "Versión correcta forzada"?', text.includes('Versión correcta forzada'));
        console.log('   ¿Tiene "locationBox.parentNode"?', text.includes('locationBox.parentNode'));
        console.log('   ¿Tiene "logData5" o "logData6"?', text.includes('logData5') || text.includes('logData6'));
        
        // Buscar la función cont04 en el texto
        var cont04Match = text.match(/function cont04\(\)[^}]+}/s);
        if (cont04Match) {
            console.log('\n   Función cont04 encontrada en el archivo del servidor:');
            var cont04InFile = cont04Match[0];
            console.log('   Longitud:', cont04InFile.length);
            console.log('   ¿Tiene locationBox?', cont04InFile.includes('locationBox'));
            console.log('   ¿Tiene locationBox.parentNode?', cont04InFile.includes('locationBox.parentNode'));
        }
    })
    .catch(e => {
        console.error('   ❌ Error al cargar script:', e);
    });

// 6. Aplicar corrección inmediata
console.log('\n6. APLICANDO CORRECCIÓN INMEDIATA...');
(function() {
    function forceCorrectCont04() {
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
        console.log('   ✓ Función cont04 sobrescrita con versión correcta');
    }
    forceCorrectCont04();
})();

console.log('\n=== FIN DEL DIAGNÓSTICO ===');
console.log('\n🔧 Ahora prueba presionar el botón "CONTACT US"');
console.log('💡 Si funciona, el problema es que el servidor no tiene la última versión del archivo');
