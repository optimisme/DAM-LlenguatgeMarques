/* Catalan reference notes displayed next to the control they explain. */
const propertyValueExplanations = {
    'animation-name': {
        aparicio: 'Augmenta l’opacitat de 0 a 1 i fa aparèixer l’element gradualment.',
        lliscament: 'Desplaça l’element horitzontalment entre els fotogrames inicial i final.',
        pulsacio: 'Augmenta i redueix la mida amb scale(), conservant l’espai que ocupa.',
        rebot: 'Mou l’element amunt i el retorna a la posició inicial.',
        gir: 'Fa una volta completa amb rotate(). Una repetició infinita crea un indicador de càrrega.',
        sacsejada: 'Alterna desplaçaments petits a esquerra i dreta en diversos fotogrames.'
    },
    'animation-direction': {
        normal: 'Reprodueix cada execució del 0% al 100%.', reverse: 'Reprodueix cada execució del 100% al 0%.',
        alternate: 'Alterna el sentit en cada execució: primer endavant, després enrere.',
        'alternate-reverse': 'Alterna el sentit en cada execució, començant enrere.'
    },
    'animation-fill-mode': {
        none: 'Durant el retard i després d’acabar es mostra l’estat base de l’element.',
        forwards: 'Després d’acabar conserva el darrer fotograma reproduït; el retard mostra l’estat base.',
        backwards: 'Durant el retard aplica el primer fotograma que es reproduirà; després d’acabar torna a l’estat base.',
        both: 'Aplica el primer fotograma durant el retard i conserva el darrer després d’acabar.'
    },
    'Propietat del fotograma': {
        transform: 'Edita el desplaçament, el gir o l’escala del fotograma seleccionat amb funcions com translateX(), rotate() o scale().',
        opacity: 'Edita la transparència del fotograma seleccionat: 0 és invisible i 1 és opac.',
        'background-color': 'Edita el color i l’opacitat del fons del fotograma seleccionat.'
    },
    position: {
        static: 'Participa en el flux normal. top, right, bottom, left i z-index no actuen en aquest exemple; per això els controls estan desactivats.',
        relative: 'Es desplaça respecte de la seva posició normal i conserva l’espai original. El bloc «Després» es queda al mateix lloc.',
        absolute: 'Surt del flux normal i no reserva espai. En aquest exemple, els desplaçaments es mesuren respecte del contenidor amb el contorn gris, que té position: relative.',
        fixed: 'Surt del flux normal i, en aquest exemple, es fixa respecte de la finestra real. La caixa blava apareix al cantó inferior dret; fes scroll a la pàgina per comprovar que no es mou.',
        sticky: 'Conserva el seu espai i s’enganxa quan arriba al límit definit per top, dins del seu contenidor. Fes scroll dins del resultat en viu. Necessita un desplaçament diferent d’auto, contingut que desbordi i espai per moure’s dins del bloc pare.'
    },
    display: {
        initial: 'Valor inicial: inline. L’element participa en la línia de text.',
        block: 'Comença en una línia nova i ocupa l’amplada disponible.',
        inline: 'Flueix amb el text; width i height no en defineixen la mida.',
        'inline-block': 'Flueix amb el text i permet definir width i height.',
        flex: 'El contenidor distribueix els seus fills amb Flexbox.',
        grid: 'El contenidor distribueix els seus fills en una graella de files i columnes.',
        'inline-grid': 'Crea una graella que participa en la línia de text com un element en línia.',
        contents: 'Desapareix la caixa del contenidor; els fills continuen participant en la distribució.',
        none: 'Oculta l’element i elimina l’espai que ocupava. En aquest exemple desapareixen A i C.'
    },
    'flex-direction': {
        initial: 'Valor inicial: row. L’eix principal segueix la direcció del text.',
        row: 'Distribueix els elements d’esquerra a dreta en aquest exemple.',
        column: 'Distribueix els elements de dalt a baix.',
        'row-reverse': 'Inverteix l’ordre visual de la fila: de dreta a esquerra.',
        'column-reverse': 'Inverteix l’ordre visual de la columna: de baix a dalt.'
    },
    'align-items': {
        initial: 'Valor inicial: normal. En aquest exemple de Flexbox els elements s’estiren a l’eix transversal.',
        start: 'Alinea els elements a l’inici de l’eix transversal.',
        center: 'Centra els elements a l’eix transversal.',
        end: 'Alinea els elements al final de l’eix transversal.',
        stretch: 'Estira els elements amb mida automàtica per omplir l’eix transversal.',
        baseline: 'Alinea els elements segons la línia base del seu text.'
    },
    'justify-content': {
        initial: 'Valor inicial: normal. En aquest exemple els elements s’agrupen a l’inici de l’eix principal.',
        start: 'Agrupa els elements a l’inici de l’eix principal.',
        center: 'Centra el conjunt d’elements a l’eix principal.',
        end: 'Agrupa els elements al final de l’eix principal.',
        'space-between': 'Reparteix l’espai sobrant entre els elements, sense afegir espai als extrems.',
        'space-around': 'Assigna el mateix espai a cada costat dels elements; als extrems n’hi ha la meitat que entre elements.',
        'space-evenly': 'Deixa el mateix espai entre elements i als dos extrems.'
    },
    'flex-wrap': {
        initial: 'Valor inicial: nowrap. Tots els elements es mantenen en una única línia.',
        nowrap: 'Manté els elements en una línia; poden encongir-se o desbordar si no hi caben.',
        wrap: 'Crea línies noves quan els elements no caben en l’espai disponible.',
        'wrap-reverse': 'Crea línies noves i inverteix el sentit de l’eix transversal.'
    },
    'align-content': {
        initial: 'Valor inicial: normal. Les línies poden estirar-se per ocupar l’espai transversal disponible.',
        start: 'Agrupa les línies a l’inici de l’eix transversal.',
        center: 'Centra el conjunt de línies a l’eix transversal.',
        end: 'Agrupa les línies al final de l’eix transversal.',
        stretch: 'Estira les línies per ocupar l’espai transversal sobrant.',
        'space-between': 'Reparteix l’espai sobrant entre les línies, sense espai als extrems.',
        'space-around': 'Deixa espai al voltant de cada línia.',
        'space-evenly': 'Deixa el mateix espai entre les línies i als extrems.'
    },
    'box-sizing': {
        initial: 'Valor inicial: content-box. width i height mesuren només el contingut.',
        'content-box': 'width i height mesuren el contingut; padding i border s’afegeixen a la mida total.',
        'border-box': 'width i height inclouen el contingut, el padding i la vora.'
    },
    overflow: {
        initial: 'Valor inicial: visible. El contingut pot sortir dels límits de la caixa.',
        visible: 'Mostra el contingut encara que surti de la caixa.',
        hidden: 'Retalla el contingut que queda fora de la caixa, sense mostrar barres de desplaçament.',
        scroll: 'Permet desplaçar el contingut i demana barres de desplaçament; la seva visibilitat depèn del sistema.',
        auto: 'Permet desplaçar el contingut quan supera l’espai disponible.'
    },
    visibility: {
        initial: 'Valor inicial: visible. L’element es mostra.',
        visible: 'Mostra l’element i conserva el seu espai.',
        hidden: 'Oculta l’element, però conserva l’espai que ocupa.'
    },
    'text-align': {
        initial: 'Valor inicial: start. En aquest exemple el text s’alinea a l’esquerra.',
        left: 'Alinea el text amb el costat esquerre.', center: 'Centra el text dins de cada línia.',
        right: 'Alinea el text amb el costat dret.', justify: 'Ajusta els espais per alinear el text amb els dos costats.'
    },
    'font-style': {
        initial: 'Valor inicial: normal. El text no s’inclina.', normal: 'Mostra el text sense inclinació.',
        italic: 'Utilitza la variant cursiva de la font, si està disponible.',
        oblique: 'Utilitza una variant obliqua o inclina els caràcters.'
    },
    'text-transform': {
        initial: 'Valor inicial: none. Manté les majúscules i les minúscules originals.',
        none: 'Manté les majúscules i les minúscules del text original.',
        capitalize: 'Posa en majúscula la primera lletra de cada paraula.',
        uppercase: 'Mostra totes les lletres en majúscula.', lowercase: 'Mostra totes les lletres en minúscula.',
        'full-width': 'Mostra els caràcters amb l’amplada completa de la seva forma tipogràfica, si existeix.'
    },
    'text-decoration': {
        initial: 'Valor inicial: none. No afegeix decoracions al text.', none: 'No afegeix decoracions al text.',
        underline: 'Dibuixa una línia sota el text.', overline: 'Dibuixa una línia sobre el text.',
        'line-through': 'Dibuixa una línia que travessa el text.'
    },
    'user-select': {
        initial: 'Valor inicial: auto. El navegador decideix com es pot seleccionar el text.',
        auto: 'Utilitza el comportament habitual de selecció de text.', none: 'Impedeix seleccionar el text amb els controls habituals.',
        text: 'Permet seleccionar el text.', all: 'Selecciona tot el contingut de l’element com un sol bloc.',
        contain: 'Limita la selecció als límits de l’element, si el navegador admet aquest valor.'
    },
    direction: {
        initial: 'Valor inicial: ltr. El text flueix d’esquerra a dreta.',
        ltr: 'Estableix la direcció del text d’esquerra a dreta.', rtl: 'Estableix la direcció del text de dreta a esquerra.'
    },
    'text-overflow': {
        initial: 'Valor inicial: clip. Retalla el text que desborda sense afegir cap marca.',
        clip: 'Retalla el text que desborda, sense afegir punts suspensius.',
        ellipsis: 'Indica el text retallat amb punts suspensius. Aquest exemple activa overflow: hidden i white-space: nowrap.'
    },
    'word-break': {
        initial: 'Valor inicial: normal. Utilitza les regles habituals de salt de línia.',
        normal: 'Trenca les línies segons les regles habituals de cada idioma.',
        'break-all': 'Pot dividir les paraules entre caràcters per evitar que desbordin.',
        'keep-all': 'Evita trencar entre caràcters de textos xinès, japonès i coreà; els altres textos segueixen les regles normals.'
    },
    'overflow-wrap': {
        initial: 'Valor inicial: normal. No afegeix salts dins de paraules que no es poden dividir.',
        normal: 'Manté les regles normals; una paraula o URL molt llarga pot desbordar.',
        'break-word': 'Divideix una paraula o URL llarga només quan cal per evitar el desbordament.'
    },
    'white-space': {
        initial: 'Valor inicial: normal. Agrupa els espais consecutius i ajusta el text en línies.',
        normal: 'Agrupa els espais i els salts de línia del text original; crea línies segons l’amplada disponible.',
        nowrap: 'Agrupa els espais i manté el text en una sola línia.',
        pre: 'Conserva els espais i els salts de línia originals, sense ajustar automàticament les línies.',
        'pre-wrap': 'Conserva els espais i els salts de línia originals i ajusta el text quan no hi cap.',
        'pre-line': 'Conserva els salts de línia originals, agrupa els espais consecutius i ajusta el text.'
    },
    'writing-mode': {
        initial: 'Valor inicial: horizontal-tb. Les línies són horitzontals i avancen de dalt a baix.',
        'horizontal-tb': 'Escriu en línies horitzontals, de dalt a baix.',
        'vertical-rl': 'Escriu en línies verticals que avancen de dreta a esquerra.',
        'vertical-lr': 'Escriu en línies verticals que avancen d’esquerra a dreta.'
    },
    'column-span': {
        initial: 'Valor inicial: none. L’element ocupa una sola columna.',
        none: 'El títol participa en el flux d’una sola columna.',
        all: 'El títol travessa totes les columnes. El text anterior i posterior es distribueix en blocs separats.'
    },
    'background-size': {
        cover: 'Omple tota la caixa mantenint les proporcions de la imatge; una part pot quedar retallada.',
        contain: 'Mostra la imatge sencera mantenint les proporcions; pot quedar espai sense imatge.',
        auto: 'Utilitza la mida original de la imatge.', custom: 'Permet escriure una mida amb longituds o percentatges.'
    },
    'background-repeat': {
        'no-repeat': 'Mostra la imatge una sola vegada.', repeat: 'Repeteix la imatge horitzontalment i verticalment.',
        'repeat-x': 'Repeteix la imatge només en horitzontal.', 'repeat-y': 'Repeteix la imatge només en vertical.',
        space: 'Repeteix la imatge sense retallar-la i reparteix l’espai entre les còpies.',
        round: 'Ajusta la mida de les còpies perquè encaixin sense espais.'
    },
    'background-clip': {
        'border-box': 'Pinta el fons fins al límit exterior de la vora.', 'padding-box': 'Pinta el fons fins al padding, sense cobrir la vora.',
        'content-box': 'Pinta el fons només darrere del contingut.', text: 'Retalla el fons amb la forma de les lletres; l’exemple fa transparent el color del text.'
    },
    'background-origin': {
        'border-box': 'Posiciona la imatge del fons des del límit exterior de la vora.',
        'padding-box': 'Posiciona la imatge del fons des del límit del padding.',
        'content-box': 'Posiciona la imatge del fons des del límit del contingut.'
    },
    'background-attachment': {
        scroll: 'El fons acompanya l’element quan es desplaça la pàgina.',
        local: 'El fons es desplaça amb el contingut de l’element.', fixed: 'El fons queda fixat respecte de la finestra del navegador.'
    },
    'Tipus de gradient': {
        linear: 'Distribueix els colors al llarg d’una línia; l’angle determina la direcció.',
        radial: 'Distribueix els colors des d’un centre, amb forma de cercle o el·lipse.',
        conic: 'Distribueix els colors al voltant d’un centre, com una roda de colors.'
    },
    Forma: { circle: 'El gradient radial té forma circular.', ellipse: 'El gradient radial té forma el·líptica.' },
    transform: {
        translate3d: 'Desplaça l’element pels eixos X, Y i Z; conserva el seu espai original en la pàgina.',
        scale3d: 'Escala l’element als eixos X, Y i Z; 1 conserva la mida original.',
        rotate3d: 'Gira l’element al voltant de l’eix definit pels valors X, Y i Z.',
        skew: 'Inclina l’element segons els angles dels eixos X i Y.'
    },
    filter: {
        blur: 'Desenfoca el contingut filtrat; el valor indica el radi de desenfocament.',
        brightness: 'Canvia la brillantor; 100% conserva la brillantor original.',
        contrast: 'Canvia el contrast; 100% conserva el contrast original.',
        grayscale: 'Converteix el contingut filtrat a escala de grisos; 100% elimina tot el color.',
        'hue-rotate': 'Gira els tons del color; 360 graus completa una volta.',
        invert: 'Inverteix els colors; 100% produeix un negatiu.',
        opacity: 'Canvia la transparència del contingut filtrat; 100% és totalment opac.',
        saturate: 'Canvia la saturació; 100% conserva el color original.',
        sepia: 'Aplica tons sèpia; 100% aplica tot l’efecte.'
    },
    'transition-timing-function': {
        linear: 'Manté una velocitat constant durant la transició.', ease: 'Comença a poc a poc, accelera i torna a frenar.',
        'ease-in': 'Comença a poc a poc i accelera.', 'ease-out': 'Comença de pressa i frena al final.',
        'ease-in-out': 'Accelera al començament i frena al final.'
    }
};
const propertyGeneralExplanations = {
    'animation-duration': 'Defineix la durada d’una execució, en segons. Canvia el valor i compara la velocitat.',
    'animation-delay': 'Defineix l’espera abans de començar, en segons. Un valor negatiu comença amb una part de l’animació ja transcorreguda.',
    'animation-play-state': 'Play reprèn la previsualització; Pause l’atura i Reinicia torna al començament. El CSS copiat inicia l’animació en running.',
    '@keyframes': 'Cada percentatge defineix un fotograma. El navegador calcula els valors intermedis entre els fotogrames.',
    top: 'Defineix el desplaçament superior. Amb relative, un valor positiu mou l’element avall; amb absolute o fixed indica la distància al límit superior de la referència. Amb sticky defineix el límit per enganxar-se. auto deixa aquest costat sense desplaçament explícit.',
    right: 'Defineix el desplaçament dret. Amb relative, un valor positiu mou l’element a l’esquerra; amb absolute o fixed indica la distància al límit dret de la referència. auto deixa aquest costat sense desplaçament explícit.',
    bottom: 'Defineix el desplaçament inferior. Amb relative, un valor positiu mou l’element amunt; amb absolute o fixed indica la distància al límit inferior de la referència. auto deixa aquest costat sense desplaçament explícit.',
    left: 'Defineix el desplaçament esquerre. Amb relative, un valor positiu mou l’element a la dreta; amb absolute o fixed indica la distància al límit esquerre de la referència. auto deixa aquest costat sense desplaçament explícit.',
    'z-index': 'Defineix l’ordre de superposició dins del mateix context d’apilament. Un nombre més alt queda al davant. Prova l’exemple «Superposició», on la capa verda té z-index: 1. auto deixa l’ordre automàtic.',
    'grid-template-columns': 'Defineix les columnes explícites. Prova 100px 1fr, repeat(3, 1fr) o repeat(auto-fit, minmax(min(140px, 100%), 1fr)). fr reparteix l’espai disponible.',
    'grid-template-rows': 'Defineix les files explícites. Prova 80px 1fr o repeat(2, 1fr). Les files addicionals utilitzen grid-auto-rows.',
    gap: 'Defineix la separació entre cel·les. Un valor s’aplica als dos eixos; dos valors indiquen la separació entre files i entre columnes, respectivament.',
    'row-gap': 'Defineix la separació vertical entre les files, sense afegir espai als extrems de la graella.',
    'grid-auto-columns': 'Defineix l’amplada de les columnes implícites, creades quan un element queda fora de les columnes explícites.',
    'grid-auto-rows': 'Defineix l’alçada de les files implícites, creades quan els elements necessiten més files de les que has definit.',
    'grid-template-areas': 'Dibuixa cada fila entre cometes i separa els noms amb espais. Repeteix un nom per unir cel·les en un rectangle; un punt deixa una cel·la buida. Totes les files han de tenir el mateix nombre de cel·les.',
    'grid-column': 'Situa aquest element entre línies de columna, com 1 / 3. span 2 ocupa dues columnes; 1 / -1 ocupa totes les columnes explícites. auto deixa la col·locació al navegador.',
    'grid-row': 'Situa aquest element entre línies de fila, com 1 / 3. span 2 ocupa dues files; auto deixa la col·locació al navegador.',
    'grid-area': 'Assigna aquest element a una àrea amb nom, com cap o contingut. També admet fila inicial / columna inicial / fila final / columna final. En editar-la es restableixen grid-row i grid-column.',
    Element: 'Tria l’element que vols editar. El contorn blau al resultat en viu identifica la selecció i no s’inclou al CSS copiat.',
    margin: 'Defineix l’espai exterior entre la caixa i els elements del voltant.',
    padding: 'Defineix l’espai interior entre el contingut i la vora.',
    border: 'Defineix el gruix, l’estil i el color de la vora de la caixa.',
    'border-width': 'Defineix el gruix de la vora. Per veure-la cal un border-style diferent de none.',
    'border-style': 'Defineix el tipus de línia de la vora; none no dibuixa cap vora.',
    'border-color': 'Defineix el color de la vora. L’opacitat només afecta aquest color.',
    'aspect-ratio': 'Manté la proporció entre amplada i alçada quan almenys una de les dues dimensions és auto.',
    'border-radius': 'Arrodoneix els cantons de la caixa.',
    width: 'Defineix l’amplada de la caixa segons el seu box-sizing. Admet px, rem, percentatges, auto i funcions com calc().', height: 'Defineix l’alçada de la caixa segons el seu box-sizing. auto s’adapta al contingut; els percentatges necessiten una referència amb alçada definida.',
    'min-width': 'Estableix l’amplada mínima i pot fer créixer la caixa per sobre de width.',
    'max-width': 'Limita l’amplada màxima de la caixa.', 'min-height': 'Estableix l’alçada mínima de la caixa.', 'max-height': 'Limita l’alçada màxima de la caixa.',
    'box-shadow': 'Afegeix ombres a la caixa. Ajusta el desplaçament horitzontal i vertical, el desenfocament i l’extensió; inset dibuixa l’ombra a dins.',
    'text-shadow': 'Afegeix ombres al text amb desplaçament horitzontal i vertical, desenfocament i color.',
    opacity: 'Canvia l’opacitat de tot l’element, inclosos el fons, el text i els fills: 0 és transparent i 1 és opac.',
    filter: 'Aplica efectes visuals a la imatge. Els filtres es combinen en l’ordre de la llista.',
    'backdrop-filter': 'Filtra el que hi ha darrere de la capa, mantenint el text nítid. El fons de la capa ha de ser transparent o semitransparent per veure l’efecte. Els filtres es combinen en l’ordre de la llista.',
    transform: 'Combina transformacions visuals en l’ordre de la llista, sense redistribuir els elements del voltant.',
    transition: 'Anima els canvis d’una propietat durant un temps determinat. Prem Play per reproduir el canvi.',
    'transition-duration': 'Defineix quant dura el canvi, en segons. Amb 0 s el canvi és immediat.',
    'transition-delay': 'Defineix el temps d’espera abans de començar la transició, en segons.',
    'background-color': 'Defineix el color del fons. La seva transparència deixa veure el que hi ha al darrere, sense fer transparent el text.',
    'color-stop': 'Defineix el color d’aquesta parada del gradient. L’opacitat permet combinar-lo amb el fons o les capes inferiors.',
    'font-size': 'Defineix la mida del text amb unitats com px, em o rem.',
    color: 'Defineix el color del text. L’opacitat del selector només afecta aquest color.',
    'letter-spacing': 'Ajusta la separació entre caràcters; un valor negatiu els apropa.',
    'word-spacing': 'Ajusta la separació entre paraules.', 'line-height': 'Defineix l’alçada de les línies; un nombre sense unitat multiplica la mida de la font.',
    'text-indent': 'Desplaça la primera línia de cada bloc de text.',
    'column-count': 'Indica el nombre de columnes. Calen almenys dues columnes per veure les línies que les separen.',
    'column-width': 'Defineix l’amplada desitjada de les columnes; el navegador en calcula el nombre que hi cap.',
    'column-gap': 'Defineix l’espai entre les columnes.',
    'column-rule-width': 'Defineix el gruix de la línia entre columnes; cal un estil de línia visible.',
    'column-rule-color': 'Defineix el color de la línia entre columnes.',
    'transition-property': 'Selecciona quina propietat anima la transició; all inclou totes les propietats animables que canvien.',
    'Mida manual': 'Admet una amplada i una alçada, com 80px 80px o 50% auto.'
};
function explainProperty(property, value, context = '') {
    if (property === 'Costats de border') return 'Aplica el gruix, l’estil i el color a tots els costats o només al seleccionat.';
    if (property.startsWith('Costats de ')) return 'Selecciona els costats que modifica el valor. Les opcions desplegables permeten escriure cada costat o practicar la forma abreujada.';
    if (property === 'Cantonada') return 'Aplica el radi a totes les cantonades o només a la seleccionada.';
    if (/^(margin|padding)-(top|right|bottom|left)$/.test(property)) return property.startsWith('margin') ? 'Ajusta l’espai exterior d’aquest costat. Admet valors negatius; un camp buit utilitza el valor general.' : 'Ajusta l’espai interior d’aquest costat. No admet valors negatius; un camp buit utilitza el valor general.';
    if (property === 'border-style') return ({ none: 'No dibuixa cap vora, independentment del gruix i el color.', solid: 'Dibuixa una línia contínua.', dashed: 'Dibuixa una línia de guions.', dotted: 'Dibuixa una línia de punts.', double: 'Dibuixa dues línies. Utilitza un gruix suficient per distingir-les.' })[value];
    if (property === 'animation-timing-function') return explainProperty('transition-timing-function', value).replaceAll('transició', 'animació');
    if (property === 'animation-iteration-count') return value === 'infinite' ? 'Repeteix l’animació indefinidament. Pause permet aturar-la en qualsevol moment.' : `Reprodueix l’animació ${value} ${value === '1' ? 'vegada' : 'vegades'}. Després aplica animation-fill-mode.`;
    if (context.startsWith('position:') && ['top', 'right', 'bottom', 'left', 'z-index'].includes(property)) {
        const mode = context.slice('position:'.length);
        if (mode === 'static') return 'No s’aplica amb position: static en aquest exemple.';
        if (property === 'z-index') return 'Defineix l’ordre de superposició dins del mateix context d’apilament. Prova 0 i 2 a «Superposició»: la capa verda té z-index: 1.';
        const side = { top: 'superior', right: 'dret', bottom: 'inferior', left: 'esquerre' }[property];
        if (mode === 'relative') {
            const direction = { top: 'avall', right: 'a l’esquerra', bottom: 'amunt', left: 'a la dreta' }[property];
            return `Un valor positiu desplaça l’element ${direction} respecte de la seva posició normal. auto no afegeix cap desplaçament per aquest costat.`;
        }
        if (mode === 'sticky') return ['top', 'bottom'].includes(property)
            ? `Defineix el límit ${side} per enganxar-se dins de l’àrea amb scroll. auto no activa aquest límit.`
            : `Defineix el límit ${side} per enganxar-se horitzontalment. En aquest exemple el scroll és vertical.`;
        return `Distància al límit ${side} ${mode === 'fixed' ? 'de la finestra' : 'del contenidor amb position: relative'}. Admet px, percentatges o auto.`;
    }
    if (context === 'grid') {
        if (property === 'column-gap') return 'Defineix la separació horitzontal entre les columnes, sense afegir espai als extrems de la graella.';
        if (property === 'grid-template-columns') return ({
            '1fr': 'Una columna ocupa tot l’espai disponible.',
            'repeat(2, 1fr)': 'Dues columnes reparteixen l’espai disponible a parts iguals.',
            'repeat(3, 1fr)': 'Tres columnes reparteixen l’espai disponible a parts iguals.',
            '2fr 1fr': 'La primera columna rep el doble d’espai que la segona, després de restar la separació.',
            '100px 1fr': 'La primera columna fa 100 px; la segona ocupa l’espai restant.',
            'auto-fit': 'Crea les columnes que hi caben i tanca les que queden buides. Amb pocs elements, aquests poden créixer per omplir l’amplada.',
            'auto-fill': 'Crea les columnes que hi caben i manté les que queden buides. Compara’l amb auto-fit amb només dos elements.'
        })[value] || 'Defineix les columnes de la graella. 1fr reparteix l’espai disponible; repeat() repeteix pistes.';
        if (property === 'grid-template-rows') return ({
            'repeat(2, 1fr)': 'Dues files reparteixen l’alçada disponible a parts iguals.',
            'repeat(3, 1fr)': 'Tres files reparteixen l’alçada disponible a parts iguals.',
            '60px 1fr': 'La primera fila fa 60 px; la segona ocupa l’alçada restant.',
            'repeat(2, 70px)': 'Dues files de 70 px deixen espai lliure dins del contenidor.',
            auto: 'Les files tenen mida automàtica segons el contingut i l’espai disponible.'
        })[value] || 'Defineix l’alçada de les files explícites de la graella.';
        if (property === 'grid-auto-flow') return ({
            row: 'Col·loca els elements per files i crea files noves quan cal.',
            column: 'Col·loca els elements per columnes i crea columnes noves quan cal.',
            'row dense': 'Col·loca per files i aprofita buits anteriors. L’ordre visual pot diferir de l’ordre de l’HTML.',
            'column dense': 'Col·loca per columnes i aprofita buits anteriors. L’ordre visual pot diferir de l’ordre de l’HTML.'
        })[value];
        if (['justify-items', 'align-items', 'justify-self', 'align-self'].includes(property)) {
            const axis = property.startsWith('justify') ? 'horitzontalment' : 'verticalment';
            const target = property.endsWith('self') ? 'l’element seleccionat' : 'els elements';
            return ({
                auto: 'Hereta l’alineació definida al contenidor amb justify-items o align-items.',
                start: `Alinea ${target} ${axis} a l’inici de la seva cel·la.`,
                center: `Centra ${target} ${axis} dins de la seva cel·la.`,
                end: `Alinea ${target} ${axis} al final de la seva cel·la.`,
                stretch: `Estira ${target} ${axis} per omplir la seva cel·la quan la mida és automàtica.`,
                baseline: `Alinea ${target} segons la línia base del text.`
            })[value];
        }
        if (['justify-content', 'align-content'].includes(property)) {
            const axis = property === 'justify-content' ? 'horitzontal' : 'vertical';
            const meaning = ({ start: 'Agrupa les pistes a l’inici', center: 'Centra el conjunt de pistes', end: 'Agrupa les pistes al final', stretch: 'Estira les pistes amb mida auto', 'space-between': 'Reparteix l’espai entre les pistes, sense espai als extrems', 'space-around': 'Reparteix espai al voltant de les pistes', 'space-evenly': 'Reparteix el mateix espai entre les pistes i als extrems' })[value];
            return `${meaning} en l’eix ${axis}. Aquest exemple deixa espai lliure per veure l’alineació.`;
        }
    }
    if (property === 'overflow-x' || property === 'overflow-y') {
        return `${propertyValueExplanations.overflow[value] || propertyValueExplanations.overflow.auto} Només afecta l’eix ${property === 'overflow-x' ? 'horitzontal' : 'vertical'}.`;
    }
    const specific = propertyValueExplanations[property]?.[value];
    if (specific) return specific + (property === 'align-content' ? ' Necessita diverses línies amb flex-wrap i espai transversal sobrant.' : property === 'transition-timing-function' ? ' La gràfica mostra el temps (X) i el progrés del canvi (Y).' : '');
    if (property === 'font-family') return value === 'initial' ? 'Utilitza la família tipogràfica inicial del navegador.' : `Mostra el text amb ${value}; si no està disponible, el navegador utilitza una font alternativa.`;
    if (property === 'transition-property' && value !== 'all') return `Anima els canvis de ${value}, sempre que els valors es puguin interpolar.`;
    if (property === 'font-weight') return value === 'initial' || value === 'normal' ? 'Mostra el text amb el pes normal, equivalent a 400.' : value === 'bold' ? 'Mostra el text en negreta, equivalent a 700.' : `Utilitza el pes ${value}, si la font disposa d’aquest gruix.`;
    if (property === 'column-rule-style') {
        return value === 'initial' || value === 'none' ? 'No dibuixa cap línia entre columnes. Tria un estil com solid per veure el gruix i el color.' : ({ solid: 'Dibuixa una línia contínua entre columnes.', dotted: 'Dibuixa una línia de punts entre columnes.', dashed: 'Dibuixa una línia de guions entre columnes.', double: 'Dibuixa una línia doble entre columnes.' })[value];
    }
    if (property === 'cursor') {
        const meanings = { auto: 'el cursor que decideix el navegador', default: 'la fletxa habitual', none: 'cap cursor visible', pointer: 'una mà que indica un element clicable', 'context-menu': 'un menú contextual', help: 'ajuda disponible', progress: 'una operació en curs sense bloquejar la interacció', wait: 'una operació que requereix esperar', cell: 'la selecció de cel·les', crosshair: 'una creu de precisió', text: 'la selecció de text', 'vertical-text': 'la selecció de text vertical', alias: 'la creació d’una referència', copy: 'una operació de còpia', move: 'el moviment d’un element', 'no-drop': 'una zona on no es pot deixar l’element', 'not-allowed': 'una acció no permesa', grab: 'un element que es pot arrossegar', grabbing: 'un element que s’està arrossegant', 'all-scroll': 'el desplaçament en qualsevol direcció', 'zoom-in': 'l’ampliació del contingut', 'zoom-out': 'la reducció del contingut' };
        return `Mostra ${meanings[value] || `un cursor de redimensionament (${value})`}. Passa el ratolí per l’exemple per veure’l.`;
    }
    const base = propertyGeneralExplanations[property] || propertyGeneralExplanations[property.replace(/-(top|right|bottom|left)$/, '')];
    return base ? (value === 'initial' && !['color', 'column-rule-color', 'background-color', 'color-stop'].includes(property) ? `Utilitza el valor inicial. ${base}` : base) : '';
}
function setPropertyExplanation(container, property, value) {
    const context = container.closest('#grid') ? 'grid' : container.closest('#position') ? `position:${document.getElementById('position-mode').value}` : '';
    const text = explainProperty(property, value, context);
    if (!text) return;
    let note = container.querySelector(':scope > .property-explanation');
    if (!note) { note = document.createElement('p'); note.className = 'property-explanation'; container.append(note); }
    if (note.textContent !== text) note.textContent = text;
}
function updatePropertyExplanations(root) {
    root.querySelectorAll('.property-row').forEach(row => {
        const property = row.querySelector('.property-link')?.textContent.replace(':', '').trim();
        if (!property) return;
        const picker = [...row.closest('.controls-pane').querySelectorAll('.property-selector-trigger')].find(trigger => trigger.getAttribute('aria-label') === property);
        if (picker) {
            row.querySelector(':scope > .property-explanation')?.remove();
            return;
        }
        const value = row.querySelector('.property-value')?.textContent.replace(/;$/, '').trim() || row.querySelector('input')?.value || '';
        setPropertyExplanation(row, property, value);
    });
    root.querySelectorAll('.transition-item label').forEach(label => {
        const property = label.textContent.startsWith('Duration:') ? 'transition-duration' : label.textContent.startsWith('Delay:') ? 'transition-delay' : null;
        if (property) setPropertyExplanation(label.parentElement, property, '');
    });
    root.querySelectorAll('.preview-pane .mini-description, .preview-pane .preview-note').forEach(note => {
        if (note.id) {
            note.hidden = true;
            note.closest('.lesson-layout').querySelector('.controls-pane').append(note);
        } else note.remove();
    });
}
