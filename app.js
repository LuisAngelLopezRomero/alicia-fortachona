(() => {
  'use strict';

  const STORAGE_KEY = 'aliciaFortachonaDataV1';
  const APP_VERSION = '1.0.0';

  const defaultState = {
    version: APP_VERSION,
    introSeen: false,
    profile: {
      height: 166,
      startWeight: 67.7,
      goalWeight: 59.2,
      age: '',
      activity: '',
      deficit: 350,
      meals: 4,
      bands: false
    },
    weights: [],
    completedWorkouts: [],
    generatedMenu: []
  };

  const jokes = [
    'Pablo no recoge los juguetes. Tú sí recoges repeticiones.',
    'Ángel quizá vuelva a despertarte. Tus glúteos no tienen la culpa.',
    'La paciencia no siempre llega. Los bíceps se entrenan.',
    'Hoy no hace falta ser perfecta. Hace falta presentarse.',
    'El caos doméstico cuenta como calentamiento emocional.',
    'Respira. Exhala. Y piensa que nadie ha dejado migas en el sofá.',
    'Tres entrenos. Cero dramas. Bueno… cero dramas deportivos.',
    'Si la vida aprieta, Alicia aprende a apretar mejor.'
  ];

  const workouts = [
    {
      id: 'base-a', phase: 'Fase 1 · sin material', title: 'Fortachona Base', duration: '30 min', level: 'Suave–medio', emoji: '🦵',
      blurb: 'Piernas, empuje y core controlado para empezar fuerte sin hacer locuras.',
      exercises: [
        ['Respiración 360º', '2 × 5 respiraciones', 'Tumbada o sentada. Inhala expandiendo costillas; al exhalar activa suavemente la parte baja del abdomen.', 'Exhala como si fueras a decir: “Pablo, los juguetes”.'],
        ['Sentadilla a silla', '3 × 10', 'Baja hasta tocar la silla y vuelve a subir. Rodillas siguiendo la línea de los pies.', 'La silla está ahí para ayudarte, no para negociar.'],
        ['Flexión en pared', '3 × 8–12', 'Cuerpo alineado, manos a la altura del pecho. Acerca el pecho a la pared y empuja.', 'Empuja el caos a otra dimensión.'],
        ['Puente de glúteos', '3 × 10–12', 'Tumbada con rodillas flexionadas. Exhala al elevar la pelvis sin arquear la zona lumbar.', 'Glúteos de acero; paciencia todavía en beta.'],
        ['Abducción de cadera de pie', '2 × 12/lado', 'Sujétate a una silla. Lleva la pierna hacia un lado sin inclinar el tronco.', 'Equilibrio: porque en casa alguien tiene que tenerlo.'],
        ['Deslizamiento de talón', '2 × 8/lado', 'Tumbada, exhala y desliza un talón alejándolo; vuelve sin que el abdomen se abombe.', 'Lento y controlado, justo lo contrario de una mañana escolar.'],
        ['Marcha rápida en el sitio', '3 × 45 s', 'Ritmo cómodo-vivo, sin saltos.', 'Muévete como si acabases de oír “mamáaaaa”.']
      ]
    },
    {
      id: 'base-b', phase: 'Fase 1 · sin material', title: 'Madre Coraje', duration: '28 min', level: 'Medio', emoji: '🛡️',
      blurb: 'Tren inferior, postura y control abdominal con movimientos fáciles de adaptar.',
      exercises: [
        ['Respiración + activación', '2 × 5 respiraciones', 'Inhala relajando; exhala y activa suavemente abdomen profundo sin “meter tripa” a lo bestia.', 'Respira antes de responder. Estrategia premium de madre.'],
        ['Zancada atrás asistida', '3 × 8/lado', 'Sujétate a una silla o pared. Da un paso atrás corto y baja solo hasta donde controles.', 'Paso atrás para coger impulso. También sirve en la vida.'],
        ['Bisagra de cadera', '3 × 12', 'Empuja la cadera atrás con espalda neutra y vuelve apretando glúteos.', 'Como buscar un juguete bajo el sofá, pero con técnica.'],
        ['Flexión inclinada en encimera', '3 × 8–12', 'Manos en una superficie estable. Mantén cuerpo alineado y exhala al empujar.', 'La encimera por fin sirve para algo que no sea acumular cosas.'],
        ['Cuadrupedia: brazo al frente', '2 × 8/lado', 'A cuatro apoyos, exhala y eleva un brazo sin girar el tronco. Vuelve con control.', 'Estabilidad: palabra desconocida cuando hay niños.'],
        ['Elevación de gemelos', '3 × 15', 'Sube talones lentamente, pausa arriba y baja con control.', 'Para llegar más alta cuando toque poner orden.'],
        ['Clamshell lateral', '2 × 12/lado', 'De lado, rodillas flexionadas. Abre la rodilla superior sin girar la pelvis.', 'Pequeño movimiento, gran intención. Como cerrar una puerta sin despertar a Ángel.']
      ]
    },
    {
      id: 'base-c', phase: 'Fase 1 · sin material', title: 'Caos bajo control', duration: '32 min', level: 'Medio', emoji: '⚡',
      blurb: 'Full body sencillo, con un final algo más activo para terminar la semana.',
      exercises: [
        ['Respiración 360º', '2 × 5 respiraciones', 'Exhala en el esfuerzo y evita contener la respiración.', 'Grito interior. Abdomen exterior bajo control.'],
        ['Sentadilla a silla', '3 × 12', 'Usa una silla estable como referencia y mantén el control al subir y bajar.', 'Doce oportunidades de demostrar quién manda.'],
        ['Flexión en pared o encimera', '3 × 10', 'Elige la inclinación que puedas mantener sin abombamiento abdominal.', 'Más inclinada si hace falta. Aquí no se viene a presumir.'],
        ['Puente isométrico', '3 × 20 s', 'Sube la pelvis y mantén respirando con normalidad. Baja si pierdes la postura.', 'Veinte segundos de paz. Aprovecha.'],
        ['Retracción escapular en W', '3 × 12', 'De pie, codos pegados al cuerpo. Lleva hombros atrás y abajo sin arquear la espalda.', 'Postura de “yo no he sido”, pero fuerte.'],
        ['Apertura de rodilla tumbada', '2 × 10/lado', 'Tumbada con rodillas flexionadas. Deja caer una rodilla al lado sin mover la pelvis.', 'Movimiento pequeño. Control enorme.'],
        ['Marcha rápida', '4 × 45 s', 'Marcha en el sitio con brazos activos; descansa 30 s.', 'Como si Pablo hubiera dicho “ahora voy” por quinta vez.']
      ]
    }
  ];

  const bandWorkouts = [
    {
      id: 'band-a', phase: 'Fase 2 · bandas', title: 'Fortachona con banda A', duration: '32 min', level: 'Medio', emoji: '🎀',
      blurb: 'Piernas, espalda y brazos con una banda larga en buen estado.',
      exercises: [
        ['Sentadilla pisando banda', '3 × 10–12', 'Pisa la banda y sujeta los extremos a la altura de hombros. Ajusta la tensión para controlar todo el recorrido.', 'La resistencia esta vez viene de una goma, no de los niños.'],
        ['Remo sentado con banda en pies', '3 × 10–12', 'Sentada con piernas extendidas suaves, pasa la banda por las plantas y rema hacia las costillas.', 'Trae la banda hacia ti. A Pablo, mejor no arrastrarlo.'],
        ['Peso muerto con banda', '3 × 10', 'Pisa la banda, bisagra de cadera y sube apretando glúteos. Espalda neutra.', 'Cadera atrás. Drama fuera.'],
        ['Curl de bíceps', '3 × 12', 'Pisa la banda y flexiona codos sin mover los hombros.', 'Aquí empieza el argumento visual de la portada.'],
        ['Pallof sin anclaje: sustitución', '2 × 8/lado', 'En esta versión no usamos anclajes improvisados. Haz respiración + marcha lenta con banda suave alrededor de muslos.', 'Nada de convertir una puerta en catapulta. Seguridad primero.']
      ]
    },
    {
      id: 'band-b', phase: 'Fase 2 · bandas', title: 'Fortachona con banda B', duration: '30 min', level: 'Medio', emoji: '🔥',
      blurb: 'Glúteo, hombro y espalda con variantes sin necesidad de anclar la banda.',
      exercises: [
        ['Paseos laterales con minibanda', '3 × 10 pasos/lado', 'Banda sobre rodillas o tobillos según nivel. Pasos cortos manteniendo tensión.', 'Diez pasos para alejarte mentalmente del salón.'],
        ['Puente con minibanda', '3 × 12', 'Banda sobre rodillas. Eleva pelvis y empuja suavemente rodillas hacia fuera.', 'Glúteos trabajando; negociaciones familiares, luego.'],
        ['Remo sentado', '3 × 12', 'Banda alrededor de los pies; hombros lejos de las orejas.', 'Tira con espalda, no con rabia.'],
        ['Press de hombro pisando banda', '2 × 8–10', 'Solo si puedes mantener costillas y abdomen controlados. Tensión ligera.', 'Sube sin arquear. La épica no necesita lumbar.'],
        ['Curl de bíceps + pausa', '2 × 12', 'Pausa un segundo arriba, baja lento.', 'Fotograma oficial de “Alicia Fortachona”.']
      ]
    },
    {
      id: 'band-c', phase: 'Fase 2 · bandas', title: 'Fortachona con banda C', duration: '30 min', level: 'Medio', emoji: '🚀',
      blurb: 'Sesión mixta con progresión prudente y foco en técnica.',
      exercises: [
        ['Sentadilla con minibanda', '3 × 12', 'Banda por encima de rodillas; mantén rodillas alineadas con los pies.', 'Doce repeticiones. Doce “recoge eso” menos.'],
        ['Peso muerto rumano con banda', '3 × 10–12', 'Banda bajo ambos pies. Bisagra de cadera, tensión continua y respiración fluida.', 'Controlada, fuerte y sin hacer teatro lumbar.'],
        ['Remo sentado', '3 × 10–12', 'Tira de los extremos hacia el tronco manteniendo cuello relajado.', 'Espalda fuerte para cargar con el mundo… figuradamente.'],
        ['Abducción de cadera con minibanda', '2 × 12/lado', 'De pie con apoyo. Abre una pierna sin inclinarte.', 'Si tiembla un poco, cuenta como efectos especiales.'],
        ['Marcha con minibanda', '3 × 40 s', 'Banda sobre rodillas, pasos controlados sin perder la respiración.', 'Final de temporada. Sobrevive con estilo.']
      ]
    }
  ];

  const recipes = [
    {id:'r1',title:'Tostada Fortachona',emoji:'🥑',tags:['breakfast','quick'],time:8,kcal:390,protein:25,
      ingredients:['Pan integral 70 g','Atún al natural escurrido 70 g','Aguacate 50 g','Tomate 100 g','Mostaza y especias'],
      steps:['Tuesta el pan.','Machaca el aguacate con mostaza y especias.','Añade tomate y atún por encima.'],note:'Perfecta para cuando cocinar parece un ataque personal.'},
    {id:'r2',title:'Bol de queso fresco y fruta',emoji:'🍓',tags:['breakfast','quick'],time:5,kcal:345,protein:23,
      ingredients:['Queso fresco desnatado 200 g','Fruta 200 g','Pan de trigo sarraceno 50 g','Café con leche desnatada'],
      steps:['Corta la fruta y mézclala con el queso fresco.','Acompaña con el pan y café con leche.'],note:'Cinco minutos. Cero excusas creativas.'},
    {id:'r3',title:'Garbanzos Madre Coraje',emoji:'🥗',tags:['lunch'],time:12,kcal:495,protein:38,
      ingredients:['Garbanzos cocidos 150 g','Atún escurrido 80 g','Huevo 1 ud','Tomate 100 g','Cebolla 30 g','Pimiento 50 g','Aceite de oliva 10 g','Vinagre y especias'],
      steps:['Enjuaga y escurre los garbanzos.','Corta las verduras y mezcla todo.','Añade huevo, atún y aliño al final.'],note:'Pablo puede no recoger. Este bol sí queda recogido.'},
    {id:'r4',title:'Arroz “Pablo, los juguetes”',emoji:'🍚',tags:['lunch'],time:25,kcal:610,protein:50,
      ingredients:['Arroz basmati cocido 180 g','Pechuga de pollo 150 g','Calabacín 100 g','Pimiento 100 g','Cebolla 50 g','Aceite de oliva 10 g','Especias y tabasco'],
      steps:['Saltea pollo y verduras con el aceite.','Añade el arroz cocido.','Sazona y termina con tabasco si apetece.'],note:'La comida seria con nombre poco serio.'},
    {id:'r5',title:'Macarrones del grito final',emoji:'🍝',tags:['lunch'],time:25,kcal:585,protein:37,
      ingredients:['Macarrones integrales cocidos 180 g','Carne picada de cerdo 100 g','Tomate frito 100 g','Berenjena o calabacín 150 g','Aceite de oliva 5 g'],
      steps:['Dora la carne.','Añade la verdura y cocina hasta ablandar.','Incorpora tomate y pasta y mezcla bien.'],note:'Ideal para usar la energía del grito en remover la sartén.'},
    {id:'r6',title:'Lentejas de supervivencia',emoji:'🥣',tags:['lunch','dinner'],time:20,kcal:510,protein:31,
      ingredients:['Lentejas cocidas 220 g','Tacos de jamón 40 g','Zanahoria 80 g','Cebolla 50 g','Pimiento 80 g','Tomate 100 g','Aceite de oliva 8 g'],
      steps:['Pocha verduras con el aceite.','Añade jamón y lentejas.','Cubre con un poco de agua, especias y cocina 8–10 min.'],note:'Una olla, mucha fibra y poco teatro.'},
    {id:'r7',title:'Patata con sardinas y tomate',emoji:'🐟',tags:['dinner','quick'],time:10,kcal:470,protein:30,
      ingredients:['Patata cocida 220 g','Sardinas en lata escurridas 90 g','Tomate 150 g','Cebolla tierna 30 g','Aceite de oliva 5 g','Vinagre de Módena'],
      steps:['Corta la patata ya cocida y el tomate.','Añade sardinas y cebolla.','Aliña y listo.'],note:'Si la patata ya está cocida, esto tarda menos que una discusión.'},
    {id:'r8',title:'Quinoa con huevo y espinacas',emoji:'🍳',tags:['dinner'],time:18,kcal:455,protein:26,
      ingredients:['Quinoa cocida 160 g','Huevos 2 ud','Espinacas 120 g','Tomate 100 g','Aceite de oliva 5 g','Especias'],
      steps:['Saltea espinacas y tomate.','Añade quinoa.','Corona con dos huevos a la plancha o revueltos.'],note:'Cena de persona organizada, aunque sea ficción.'},
    {id:'r9',title:'Alubias con mejillones',emoji:'🫘',tags:['lunch','quick'],time:10,kcal:430,protein:34,
      ingredients:['Alubias cocidas 180 g','Mejillones en lata escurridos 80 g','Pimiento morrón 60 g','Maíz 50 g','Cebolla 30 g','Aceite de oliva 5 g','Vinagre'],
      steps:['Enjuaga las alubias.','Mezcla con el resto de ingredientes.','Aliña justo antes de comer.'],note:'Diez minutos y parece que habías hecho un plan.'},
    {id:'r10',title:'Cous cous con pollo y verduras',emoji:'🍲',tags:['lunch'],time:20,kcal:550,protein:45,
      ingredients:['Cous cous cocido 180 g','Solomillo de pollo 140 g','Calabacín 100 g','Pimiento 100 g','Cebolla 50 g','Aceite de oliva 8 g'],
      steps:['Cocina el pollo en dados.','Saltea verduras.','Mezcla con el cous cous ya hidratado y sazona.'],note:'Mucho volumen en el plato. Poco volumen de quejas.'},
    {id:'r11',title:'Tortilla verde de emergencia',emoji:'🥚',tags:['dinner','quick'],time:10,kcal:430,protein:28,
      ingredients:['Huevos 2 ud','Espinacas 120 g','Queso fresco desnatado 80 g','Pan integral 60 g','Tomate 100 g','Aceite de oliva 5 g'],
      steps:['Saltea espinacas.','Añade huevos batidos y cuaja.','Sirve con queso fresco, pan y tomate.'],note:'Cuando “¿qué cenamos?” llega sin previo aviso.'},
    {id:'r12',title:'Pollo, brócoli y patata sin drama',emoji:'🥦',tags:['dinner'],time:25,kcal:485,protein:49,
      ingredients:['Pechuga de pollo 150 g','Patata 200 g','Brócoli 180 g','Aceite de oliva 8 g','Mostaza, ajo y especias'],
      steps:['Cuece o cocina al microondas patata y brócoli.','Haz el pollo a la plancha.','Mezcla mostaza, ajo y especias como salsa ligera.'],note:'Básico, sí. Eficaz, también.'}
  ];

  const mealSlots = {
    4: [
      {name:'Desayuno', pct:.25, tags:['breakfast']},
      {name:'Comida', pct:.35, tags:['lunch']},
      {name:'Merienda', pct:.10, tags:['breakfast','quick']},
      {name:'Cena', pct:.30, tags:['dinner']}
    ],
    3: [
      {name:'Desayuno', pct:.30, tags:['breakfast']},
      {name:'Comida', pct:.40, tags:['lunch']},
      {name:'Cena', pct:.30, tags:['dinner']}
    ]
  };

  let state = loadState();
  let currentWorkoutId = null;
  let deferredInstallPrompt = null;
  let recipeFilter = 'all';

  function clone(obj){ return JSON.parse(JSON.stringify(obj)); }
  function mergeState(raw){
    const base = clone(defaultState);
    if (!raw || typeof raw !== 'object') return base;
    base.introSeen = Boolean(raw.introSeen);
    base.profile = Object.assign(base.profile, raw.profile || {});
    base.weights = Array.isArray(raw.weights) ? raw.weights : [];
    base.completedWorkouts = Array.isArray(raw.completedWorkouts) ? raw.completedWorkouts : [];
    base.generatedMenu = Array.isArray(raw.generatedMenu) ? raw.generatedMenu : [];
    return base;
  }
  function loadState(){
    try { return mergeState(JSON.parse(localStorage.getItem(STORAGE_KEY))); }
    catch { return clone(defaultState); }
  }
  function saveState(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
  function todayISO(){ return new Date().toISOString().slice(0,10); }
  function fmtKg(v){ return `${Number(v).toFixed(1).replace('.', ',')} kg`; }
  function clamp(v,min,max){ return Math.min(max,Math.max(min,v)); }
  function qs(sel,root=document){ return root.querySelector(sel); }
  function qsa(sel,root=document){ return Array.from(root.querySelectorAll(sel)); }
  function showToast(msg){
    const t=qs('#toast'); t.textContent=msg; t.classList.add('is-visible');
    clearTimeout(showToast.timer); showToast.timer=setTimeout(()=>t.classList.remove('is-visible'),2200);
  }

  function startOfWeek(date=new Date()){
    const d=new Date(date); const day=(d.getDay()+6)%7; d.setHours(0,0,0,0); d.setDate(d.getDate()-day); return d;
  }
  function workoutsThisWeek(){
    const start=startOfWeek().getTime();
    return state.completedWorkouts.filter(w=>new Date(`${w.date}T12:00:00`).getTime()>=start).length;
  }
  function latestWeight(){
    if (!state.weights.length) return Number(state.profile.startWeight);
    const sorted=[...state.weights].sort((a,b)=>a.date.localeCompare(b.date));
    return Number(sorted[sorted.length-1].weight);
  }
  function weightProgress(){
    const start=Number(state.profile.startWeight), goal=Number(state.profile.goalWeight), current=latestWeight();
    const total=start-goal;
    if (!Number.isFinite(total) || total<=0) return 0;
    return clamp(((start-current)/total)*100,0,100);
  }
  function calculateCalories(){
    const p=state.profile;
    const age=Number(p.age), weight=latestWeight(), height=Number(p.height), activity=Number(p.activity), deficit=Number(p.deficit);
    if (!age || !activity || !weight || !height) return null;
    const bmr = 10*weight + 6.25*height - 5*age - 161;
    const maintenance = Math.round(bmr*activity/10)*10;
    const target = Math.max(1200, Math.round((maintenance-deficit)/10)*10);
    return {bmr:Math.round(bmr),maintenance,target,capped:maintenance-deficit<1200};
  }

  function showScreen(name){
    qsa('[data-screen]').forEach(s=>{ const on=s.dataset.screen===name; s.hidden=!on; s.classList.toggle('screen--active',on); });
    window.scrollTo({top:0,behavior:'instant'});
  }
  function showView(name){
    const titles={home:'Hoy',training:'Entrenamiento',diet:'Mi dieta',recipes:'Recetas',progress:'Objetivo y progreso',settings:'Más'};
    qsa('[data-view]').forEach(v=>{ const on=v.dataset.view===name; v.hidden=!on; v.classList.toggle('view--active',on); });
    qsa('[data-nav]').forEach(b=>b.classList.toggle('is-active',b.dataset.nav===name && b.classList.contains('nav-item')));
    qs('#section-title').textContent=titles[name]||'Alicia Fortachona';
    if(name==='home') renderHome();
    if(name==='training') renderTraining();
    if(name==='diet') renderDiet();
    if(name==='recipes') renderRecipes();
    if(name==='progress') renderProgress();
    if(name==='settings') renderSettings();
    window.scrollTo({top:0,behavior:'smooth'});
  }

  function workoutCard(w){
    const thisWeek = state.completedWorkouts.some(x=>x.id===w.id && new Date(`${x.date}T12:00:00`)>=startOfWeek());
    return `<article class="workout-card ${thisWeek?'is-done':''}">
      <div><span class="eyebrow">${w.emoji} ${escapeHtml(w.phase)}</span><h4>${escapeHtml(w.title)}</h4><p>${escapeHtml(w.blurb)}</p>
      <div class="workout-card__meta"><span class="mini-pill">${w.duration}</span><span class="mini-pill">${w.level}</span></div></div>
      <button class="icon-btn workout-open" data-workout="${w.id}" type="button" aria-label="Abrir ${escapeHtml(w.title)}">${thisWeek?'✓':'›'}</button>
    </article>`;
  }
  function renderHome(){
    qs('#daily-joke').textContent=jokes[new Date().getDate()%jokes.length];
    qs('#stat-workouts').textContent=`${Math.min(workoutsThisWeek(),3)}/3`;
    qs('#stat-weight').textContent=fmtKg(latestWeight());
    qs('#stat-progress').textContent=`${Math.round(weightProgress())}%`;
    qs('#home-workouts').innerHTML=workouts.map(workoutCard).join('');
    bindWorkoutButtons();
  }
  function renderTraining(){
    qs('#training-list').innerHTML=workouts.map(workoutCard).join('');
    qs('#bands-phase-card').classList.toggle('is-unlocked',Boolean(state.profile.bands));
    qs('#bands-toggle').textContent=state.profile.bands?'Ocultar fase con bandas':'Ya tengo bandas';
    const bw=qs('#band-workouts');
    bw.hidden=!state.profile.bands;
    bw.innerHTML=bandWorkouts.map(workoutCard).join('');
    bindWorkoutButtons();
  }
  function bindWorkoutButtons(){
    qsa('.workout-open').forEach(btn=>btn.onclick=()=>openWorkout(btn.dataset.workout));
  }
  function getWorkout(id){ return workouts.concat(bandWorkouts).find(w=>w.id===id); }
  function openWorkout(id){
    const w=getWorkout(id); if(!w) return;
    currentWorkoutId=id;
    qs('#workout-phase').textContent=w.phase;
    qs('#workout-title').textContent=`${w.emoji} ${w.title}`;
    qs('#workout-exercises').innerHTML=w.exercises.map((e,i)=>`<article class="exercise"><div class="exercise__top"><h4>${i+1}. ${escapeHtml(e[0])}</h4><strong>${escapeHtml(e[1])}</strong></div><p>${escapeHtml(e[2])}</p><p class="joke">${escapeHtml(e[3])}</p></article>`).join('');
    qs('#workout-dialog').showModal();
  }

  function renderDiet(){
    const cal=calculateCalories();
    if(cal){
      qs('#maintenance-kcal').textContent=cal.maintenance;
      qs('#target-kcal').textContent=cal.target;
      qs('#calorie-note').textContent=cal.capped?'El cálculo aplicó un suelo de 1.200 kcal/día. Conviene individualizarlo con un profesional si se necesita bajar más.':'Estimación con Mifflin-St Jeor + nivel de actividad. Se revisa según la tendencia real.';
    } else {
      qs('#maintenance-kcal').textContent='—'; qs('#target-kcal').textContent='—';
      qs('#calorie-note').textContent='Falta completar edad y actividad en Ajustes para calcular una estimación.';
    }
    const meals=Number(state.profile.meals)||4;
    qs('#meal-plan-title').textContent=meals===4?'3 comidas + 1 merienda opcional':'3 comidas principales';
    const slots=mealSlots[meals];
    qs('#meal-distribution').innerHTML=slots.map(s=>`<article class="meal-item"><strong>${s.name}</strong><span>${Math.round(s.pct*100)}% del día${cal?` · ~${Math.round(cal.target*s.pct)} kcal`:''}</span></article>`).join('');
    renderGeneratedMenu();
  }

  function recipeCandidatesForSlot(slot){
    return recipes.filter(r=>r.tags.some(t=>slot.tags.includes(t)));
  }
  function chooseClosest(candidates,target,excluded=[]){
    const available=candidates.filter(r=>!excluded.includes(r.id));
    const arr=available.length?available:candidates;
    return arr.slice().sort((a,b)=>Math.abs(a.kcal-target)-Math.abs(b.kcal-target))[0];
  }
  function generateDailyMenu(){
    const cal=calculateCalories();
    const total=cal?cal.target:1600;
    const slots=mealSlots[Number(state.profile.meals)||4];
    const used=[];
    const menu=slots.map(slot=>{
      const r=chooseClosest(recipeCandidatesForSlot(slot),total*slot.pct,used); used.push(r.id);
      return {slot:slot.name,recipeId:r.id};
    });
    state.generatedMenu=menu; saveState(); renderGeneratedMenu(); showToast('Menú generado. Alicia no tuvo que pensar.');
  }
  function renderGeneratedMenu(){
    const wrap=qs('#daily-menu'); if(!wrap) return;
    if(!state.generatedMenu.length){ wrap.innerHTML='<div class="menu-card"><div><strong>Sin menú generado todavía</strong><p>Pulsa “Generar” y la app elegirá opciones de las recetas disponibles.</p></div></div>'; return; }
    const total=state.generatedMenu.reduce((sum,m)=>{const r=recipes.find(x=>x.id===m.recipeId);return sum+(r?r.kcal:0)},0);
    wrap.innerHTML=state.generatedMenu.map(m=>{const r=recipes.find(x=>x.id===m.recipeId); if(!r)return''; return `<article class="workout-card"><div><span class="eyebrow">${m.slot}</span><h4>${r.emoji} ${escapeHtml(r.title)}</h4><p>${r.kcal} kcal · ${r.protein} g proteína · ${r.time} min</p></div><button class="icon-btn menu-recipe-open" data-recipe="${r.id}" type="button">›</button></article>`}).join('')+`<div class="menu-card"><div><strong>Total aproximado del menú: ${total} kcal</strong><p>Las cifras varían según marcas, escurrido y cantidades reales.</p></div></div>`;
    qsa('.menu-recipe-open').forEach(b=>b.onclick=()=>openRecipe(b.dataset.recipe));
  }

  function renderRecipes(){
    const filtered=recipeFilter==='all'?recipes:recipes.filter(r=>recipeFilter==='quick'?r.time<=10:r.tags.includes(recipeFilter));
    qs('#recipes-list').innerHTML=filtered.map(r=>`<button class="recipe-card recipe-open" data-recipe="${r.id}" type="button"><div><div class="recipe-card__emoji">${r.emoji}</div><h4>${escapeHtml(r.title)}</h4><p>${r.time} min · 1 ración</p></div><div class="recipe-card__macro"><span>${r.kcal} kcal</span><span>${r.protein} g proteína</span></div></button>`).join('');
    qsa('.recipe-open').forEach(b=>b.onclick=()=>openRecipe(b.dataset.recipe));
    qsa('.filter-btn').forEach(b=>b.classList.toggle('is-active',b.dataset.filter===recipeFilter));
  }
  function openRecipe(id){
    const r=recipes.find(x=>x.id===id); if(!r)return;
    qs('#recipe-title').textContent=`${r.emoji} ${r.title}`;
    qs('#recipe-content').innerHTML=`<div class="menu-card"><div><strong>${r.kcal} kcal · ${r.protein} g proteína</strong><p>${r.time} min · valores aproximados por ración</p></div></div><h4>Ingredientes</h4><ul>${r.ingredients.map(x=>`<li>${escapeHtml(x)}</li>`).join('')}</ul><h4>Preparación</h4><ol>${r.steps.map(x=>`<li>${escapeHtml(x)}</li>`).join('')}</ol><div class="safety-card"><strong>${escapeHtml(r.note)}</strong><p>Ajusta sal y cantidades a tus necesidades. Conservas, embutidos y quesos pueden aportar bastante sodio.</p></div>`;
    qs('#recipe-dialog').showModal();
  }

  function renderProgress(){
    const current=latestWeight(), goal=Number(state.profile.goalWeight), progress=weightProgress();
    qs('#goal-current').textContent=fmtKg(current); qs('#goal-target').textContent=fmtKg(goal);
    qs('#goal-progress-bar').style.width=`${progress}%`; qs('#goal-progress-text').textContent=`${Math.round(progress)}%`;
    qs('#goal-remaining').textContent=fmtKg(Math.max(0,current-goal));
    renderWeightChart(); renderWeightList(); renderAchievements();
  }
  function ensureInitialWeight(){
    if(!state.weights.length){ state.weights=[{date:todayISO(),weight:Number(state.profile.startWeight)}]; saveState(); }
  }
  function renderWeightList(){
    ensureInitialWeight();
    const list=[...state.weights].sort((a,b)=>b.date.localeCompare(a.date));
    qs('#weight-list').innerHTML=list.slice(0,8).map(w=>`<div class="weight-row"><div><strong>${fmtKg(w.weight)}</strong><small>${formatDate(w.date)}</small></div><button class="icon-btn delete-weight" data-date="${w.date}" type="button" aria-label="Eliminar registro">×</button></div>`).join('');
    qsa('.delete-weight').forEach(b=>b.onclick=()=>{
      if(state.weights.length<=1){showToast('Debe quedar al menos un registro.');return;}
      state.weights=state.weights.filter(w=>w.date!==b.dataset.date); saveState(); renderProgress(); renderHome();
    });
  }
  function renderWeightChart(){
    ensureInitialWeight();
    const svg=qs('#weight-chart');
    const data=[...state.weights].sort((a,b)=>a.date.localeCompare(b.date)).slice(-12);
    const W=640,H=260,pad=38;
    const vals=data.map(d=>Number(d.weight)); const goal=Number(state.profile.goalWeight);
    let min=Math.min(...vals,goal)-1, max=Math.max(...vals,Number(state.profile.startWeight))+1; if(max-min<4){max+=2;min-=2;}
    const x=i=>data.length===1?W/2:pad+(i*(W-2*pad)/(data.length-1));
    const y=v=>pad+((max-v)/(max-min))*(H-2*pad);
    const points=data.map((d,i)=>`${x(i)},${y(Number(d.weight))}`).join(' ');
    let out=`<rect x="0" y="0" width="${W}" height="${H}" rx="18" fill="transparent"/>`;
    for(let i=0;i<4;i++){const yy=pad+i*(H-2*pad)/3;const val=max-i*(max-min)/3;out+=`<line x1="${pad}" y1="${yy}" x2="${W-pad}" y2="${yy}" stroke="rgba(255,255,255,.10)"/><text x="4" y="${yy+4}" fill="#bbaacb" font-size="14">${val.toFixed(1)}</text>`;}
    out+=`<line x1="${pad}" y1="${y(goal)}" x2="${W-pad}" y2="${y(goal)}" stroke="#ffcf5c" stroke-dasharray="8 8"/><text x="${W-pad-60}" y="${y(goal)-8}" fill="#ffcf5c" font-size="14">objetivo</text>`;
    if(data.length>1) out+=`<polyline points="${points}" fill="none" stroke="#ff77b8" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`;
    data.forEach((d,i)=>{out+=`<circle cx="${x(i)}" cy="${y(Number(d.weight))}" r="7" fill="#fff" stroke="#e94d9c" stroke-width="4"/>`;});
    svg.innerHTML=out;
  }
  function renderAchievements(){
    const count=state.completedWorkouts.length, weekly=workoutsThisWeek(), weightCount=state.weights.length;
    const items=[
      ['🚪','Cruzó la puerta','Activar el modo Fortachona',state.introSeen],
      ['💪','Primer grito canalizado','Completar 1 entrenamiento',count>=1],
      ['🔥','Semana Fortachona','Completar 3 entrenos en una semana',weekly>=3],
      ['⚖️','Sin dramas con la báscula','Registrar 2 pesos',weightCount>=2],
      ['🎀','Contra las bandas','Desbloquear fase 2',state.profile.bands],
      ['🏆','Constancia seria','Completar 10 entrenos',count>=10]
    ];
    qs('#achievements').innerHTML=items.map(a=>`<article class="achievement ${a[3]?'is-unlocked':''}"><span>${a[0]}</span><strong>${a[1]}</strong><small>${a[2]}</small></article>`).join('');
  }

  function renderSettings(){
    const p=state.profile;
    qs('#profile-height').value=p.height; qs('#profile-start-weight').value=p.startWeight; qs('#profile-goal-weight').value=p.goalWeight;
    qs('#profile-age').value=p.age; qs('#profile-activity').value=p.activity; qs('#profile-deficit').value=String(p.deficit); qs('#profile-meals').value=String(p.meals);
  }

  function formatDate(iso){
    try{return new Intl.DateTimeFormat('es-ES',{day:'2-digit',month:'short',year:'numeric'}).format(new Date(`${iso}T12:00:00`));}catch{return iso;}
  }
  function escapeHtml(str){return String(str).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}

  function bindEvents(){
    qs('#btn-fortachona').addEventListener('click',()=>showScreen('transform'));
    qs('#btn-enter-app').addEventListener('click',()=>{state.introSeen=true;saveState();showScreen('main');showView('home');});
    qsa('[data-nav]').forEach(b=>b.addEventListener('click',()=>showView(b.dataset.nav)));
    qsa('[data-close-dialog]').forEach(b=>b.addEventListener('click',()=>qs(`#${b.dataset.closeDialog}`).close()));
    qsa('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d)d.close();}));

    qs('#complete-workout').addEventListener('click',()=>{
      if(!currentWorkoutId)return;
      const date=todayISO();
      const exists=state.completedWorkouts.some(w=>w.id===currentWorkoutId&&w.date===date);
      if(!exists) state.completedWorkouts.push({id:currentWorkoutId,date});
      saveState(); qs('#workout-dialog').close(); renderHome(); renderTraining(); showToast(exists?'Ya estaba marcado hoy.':'Entreno completado. Modo Fortachona +1.');
    });

    qs('#bands-toggle').addEventListener('click',()=>{state.profile.bands=!state.profile.bands;saveState();renderTraining();showToast(state.profile.bands?'Fase 2 desbloqueada.':'Fase 2 guardada para más adelante.');});
    qs('#generate-menu').addEventListener('click',generateDailyMenu);
    qsa('.filter-btn').forEach(b=>b.addEventListener('click',()=>{recipeFilter=b.dataset.filter;renderRecipes();}));

    qs('#add-weight-button').addEventListener('click',()=>{qs('#weight-date').value=todayISO();qs('#weight-value').value=latestWeight().toFixed(1);qs('#weight-dialog').showModal();});
    qs('#weight-form').addEventListener('submit',e=>{
      e.preventDefault(); const date=qs('#weight-date').value, weight=Number(qs('#weight-value').value);
      if(!date||!Number.isFinite(weight)){showToast('Revisa fecha y peso.');return;}
      const idx=state.weights.findIndex(w=>w.date===date); if(idx>=0)state.weights[idx]={date,weight};else state.weights.push({date,weight});
      saveState();qs('#weight-dialog').close();renderProgress();renderHome();showToast('Peso guardado. Tendencia, no drama.');
    });

    qs('#profile-form').addEventListener('submit',e=>{
      e.preventDefault();
      const next={
        height:Number(qs('#profile-height').value), startWeight:Number(qs('#profile-start-weight').value), goalWeight:Number(qs('#profile-goal-weight').value),
        age:qs('#profile-age').value?Number(qs('#profile-age').value):'', activity:qs('#profile-activity').value, deficit:Number(qs('#profile-deficit').value), meals:Number(qs('#profile-meals').value), bands:state.profile.bands
      };
      if(next.goalWeight>=next.startWeight){showToast('El objetivo debe ser menor que el peso inicial en este plan.');return;}
      state.profile=next; saveState(); renderHome(); showToast('Perfil guardado.');
    });

    qs('#export-data').addEventListener('click',()=>{
      const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'}); const url=URL.createObjectURL(blob); const a=document.createElement('a');
      a.href=url;a.download=`alicia-fortachona-backup-${todayISO()}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
    });
    qs('#import-data').addEventListener('change',async e=>{
      const file=e.target.files&&e.target.files[0]; if(!file)return;
      try{const raw=JSON.parse(await file.text());state=mergeState(raw);saveState();renderSettings();renderHome();showToast('Copia importada.');}catch{showToast('No pude leer esa copia.');}
      e.target.value='';
    });
    qs('#reset-data').addEventListener('click',()=>{
      if(!confirm('¿Restablecer Alicia Fortachona y borrar el progreso guardado en este dispositivo?'))return;
      state=clone(defaultState);saveState();showScreen('splash');showToast('App restablecida.');
    });

    window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredInstallPrompt=e;qs('#install-button').hidden=false;});
    qs('#install-button').addEventListener('click',async()=>{
      if(deferredInstallPrompt){deferredInstallPrompt.prompt();await deferredInstallPrompt.userChoice;deferredInstallPrompt=null;return;}
      const isiOS=/iphone|ipad|ipod/i.test(navigator.userAgent);
      showToast(isiOS?'Safari → Compartir → Añadir a pantalla de inicio':'Usa el menú del navegador → Instalar aplicación');
    });
  }

  function initServiceWorker(){
    if('serviceWorker' in navigator && location.protocol.startsWith('http')){
      window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
    }
  }
  function init(){
    bindEvents(); initServiceWorker(); ensureInitialWeight();
    if(state.introSeen){showScreen('main');showView('home');} else {showScreen('splash');}
  }

  init();
})();
