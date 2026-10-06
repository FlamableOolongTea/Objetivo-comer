// Base de alimentos: [nombre, kcal cada 100 g, "alias|alias", {unidad: gramos}, porción por defecto en g]
// Unidades: u (unidad), lata, cda, cdita, taza, vaso, feta, plato, copa, bocha, pote, botella
// Valores aproximados de tablas USDA / ARGENFOODS. Carnes y pollo en CRUDO salvo que diga cocido.
const BASE_FOODS = [
  // Pollo y carnes
  ["Pechuga de pollo cruda", 110, "pechuga|pechugas|pollo|suprema|supremas|pechuga de pollo|pollo crudo|pollo a la plancha|pollo al horno|pollo grillado", {}, 250],
  ["Pechuga de pollo cocida", 165, "pechuga cocida|pollo cocido|pechuga de pollo cocida", {}, 190],
  ["Pollo desmenuzado cocido (sin piel)", 170, "pollo desmenuzado|pollo cocido desmenuzado", {}, 165],
  ["Pata-muslo cruda sin piel", 125, "pata muslo|patamuslo|muslo|muslos|pata|patas|contramuslo|contramuslos", { u: 150 }, 220],
  ["Pollo con piel crudo", 215, "pollo con piel|pata muslo con piel|pollo entero", {}, 250],
  ["Alitas de pollo", 220, "alita|alitas", { u: 35 }, 150],
  ["Carne magra cruda (nalga, peceto, cuadrada, lomo)", 130, "carne|carne magra|nalga|peceto|cuadrada|lomo|bola de lomo|cuadril|bife|bife magro|churrasco|roast beef", {}, 200],
  ["Carne picada común cruda", 250, "carne picada|picada|picada comun", {}, 150],
  ["Carne picada especial (magra) cruda", 170, "picada especial|carne picada magra|picada magra|picada especial magra", {}, 150],
  ["Bife de chorizo crudo", 220, "bife de chorizo|entrecot|ojo de bife", {}, 250],
  ["Asado de tira crudo", 300, "asado|tira de asado|asado de tira|costilla", {}, 300],
  ["Vacío crudo", 270, "vacio|matambre", {}, 250],
  ["Chorizo", 330, "chorizo|choripan", { u: 100 }, 100],
  ["Milanesa de carne frita", 270, "milanesa|milanesas|milanesa de carne|milanesa frita", { u: 150 }, 150],
  ["Milanesa de carne al horno", 210, "milanesa al horno|milanesa de carne al horno", { u: 150 }, 150],
  ["Milanesa de pollo al horno", 200, "milanesa de pollo|suprema de pollo al horno|milanesa de pollo al horno", { u: 150 }, 150],
  ["Bondiola de cerdo cruda", 230, "bondiola|cerdo|bondiola de cerdo", {}, 200],
  ["Lomo de cerdo crudo", 140, "lomo de cerdo|solomillo", {}, 200],
  ["Hamburguesa de carne", 250, "hamburguesa|hamburguesas|medallon", { u: 80 }, 80],
  // Pescado
  ["Atún al natural escurrido", 110, "atun|atun al natural|lata de atun", { lata: 120, u: 120 }, 120],
  ["Atún en aceite escurrido", 190, "atun en aceite", { lata: 120, u: 120 }, 120],
  ["Merluza cruda", 80, "merluza|filet de merluza|pescado|filet", { u: 150 }, 200],
  ["Salmón crudo", 200, "salmon", {}, 150],
  // Huevos y lácteos
  ["Huevo", 145, "huevo|huevos|huevo duro|huevos duros|huevo revuelto|huevos revueltos|huevo frito", { u: 50 }, 50],
  ["Clara de huevo", 52, "clara|claras|clara de huevo", { u: 33 }, 33],
  ["Yogur casero natural (leche entera)", 65, "yogur|yogurt|yoghurt|yogur natural|yogur casero", { vaso: 200, taza: 200, pote: 190, cda: 15 }, 200],
  ["Yogur descremado natural", 40, "yogur descremado|yogurt descremado|yogur light", { vaso: 200, pote: 190, cda: 15 }, 200],
  ["Leche entera", 62, "leche|leche entera", { vaso: 200, taza: 250 }, 200],
  ["Leche descremada", 35, "leche descremada|leche light", { vaso: 200, taza: 250 }, 200],
  ["Queso cremoso", 300, "queso|queso cremoso|cremoso|muzzarella|mozzarella|queso fresco", { feta: 30, u: 30 }, 30],
  ["Queso port salut light", 230, "port salut|port salut light|queso light|queso por salut", { feta: 30, u: 30 }, 30],
  ["Queso untable light", 150, "queso untable|queso blanco|casancrem|queso crema|ricota", { cda: 15, cdita: 5 }, 30],
  ["Queso rallado", 400, "queso rallado|rallado", { cda: 6, cdita: 2 }, 12],
  ["Jamón cocido", 120, "jamon|jamon cocido", { feta: 20, u: 20 }, 40],
  // Cereales y harinas
  ["Arroz cocido", 130, "arroz|arroz cocido|arroz blanco|arroz integral", { taza: 160, plato: 250, cda: 15 }, 150],
  ["Arroz crudo", 360, "arroz crudo", { taza: 190, cda: 12 }, 60],
  ["Fideos cocidos", 150, "fideos|fideo|pasta|pastas|tallarines|spaghetti|tirabuzones|mostachol|ravioles|noquis", { plato: 250, taza: 140 }, 250],
  ["Fideos crudos (secos)", 360, "fideos crudos|fideos secos|pasta seca", {}, 80],
  ["Avena", 380, "avena|copos de avena|avena arrollada", { cda: 10, cdita: 4, taza: 80 }, 40],
  ["Pan francés", 270, "pan|pan frances|flauta|miñon|minon|felipe|pancito", { u: 60, feta: 25 }, 60],
  ["Pan integral / lactal", 250, "pan integral|pan lactal|lactal|tostada|tostadas|tostada integral|tostadas integrales", { feta: 25, u: 25 }, 50],
  ["Galletitas de agua", 420, "galletitas|galletitas de agua|criollitas|crackers|galletas de agua", { u: 7 }, 30],
  ["Galletas de arroz", 380, "galleta de arroz|galletas de arroz|tortitas de arroz", { u: 9 }, 18],
  ["Factura / medialuna", 410, "factura|facturas|medialuna|medialunas|bizcocho|bizcochos", { u: 45 }, 45],
  ["Empanada", 280, "empanada|empanadas", { u: 90 }, 90],
  ["Pizza (muzzarella)", 260, "pizza|porcion de pizza|muzza", { u: 120, porcion: 120 }, 120],
  ["Tarta de verdura", 230, "tarta|tarta de verdura|tarta de jamon y queso|tarta de acelga", { u: 150, porcion: 150 }, 150],
  ["Polenta cocida", 70, "polenta", { plato: 250, taza: 240 }, 250],
  ["Lentejas cocidas", 116, "lentejas|lenteja", { taza: 200, plato: 250 }, 200],
  ["Garbanzos cocidos", 164, "garbanzos|garbanzo", { taza: 160 }, 160],
  ["Choclo", 96, "choclo|choclos|granos de choclo|maiz", { u: 150, taza: 150, cda: 15 }, 150],
  ["Arvejas", 80, "arvejas|arveja", { taza: 150, cda: 15 }, 100],
  // Tubérculos
  ["Papa hervida", 85, "papa|papas|papa hervida|papas hervidas|papa al horno|papas al horno", { u: 170 }, 200],
  ["Puré de papa", 100, "pure|pure de papa", { plato: 250, taza: 210 }, 200],
  ["Papas fritas", 312, "papas fritas|papa frita|fritas", {}, 120],
  ["Batata", 90, "batata|batatas|pure de batata", { u: 200 }, 200],
  ["Calabaza / zapallo", 30, "calabaza|zapallo|anco|zapallo anco|pure de calabaza", { taza: 200 }, 200],
  // Verduras
  ["Verduras mixtas (bajas en calorías)", 30, "verdura|verduras|vegetales|verduras al vapor|verduras salteadas|verduras grilladas|wok de verduras", { plato: 300, taza: 150 }, 300],
  ["Ensalada (lechuga, tomate, cebolla)", 20, "ensalada|ensalada mixta|ensalada verde", { plato: 250 }, 250],
  ["Lechuga", 15, "lechuga", { plato: 100 }, 100],
  ["Tomate", 18, "tomate|tomates|tomate perita|tomates cherry|cherry", { u: 120 }, 120],
  ["Pepino", 15, "pepino|pepinos", { u: 200 }, 150],
  ["Zapallito", 17, "zapallito|zapallitos|zucchini", { u: 200 }, 200],
  ["Berenjena", 25, "berenjena|berenjenas", { u: 250 }, 200],
  ["Brócoli", 34, "brocoli", { taza: 90, plato: 200 }, 200],
  ["Coliflor", 25, "coliflor", { taza: 100 }, 200],
  ["Chauchas", 31, "chauchas|chaucha", { taza: 110 }, 150],
  ["Morrón", 26, "morron|morrones|pimiento|aji", { u: 150 }, 100],
  ["Cebolla", 40, "cebolla|cebollas|cebolla de verdeo|verdeo", { u: 120 }, 80],
  ["Zanahoria", 41, "zanahoria|zanahorias|zanahoria rallada", { u: 80, taza: 110 }, 80],
  ["Espinaca", 23, "espinaca|espinacas", { taza: 30, plato: 150 }, 150],
  ["Acelga", 19, "acelga|acelgas", { plato: 200 }, 200],
  ["Rúcula", 25, "rucula", { plato: 60 }, 50],
  ["Champiñones", 22, "champinones|champiñones|hongos", { taza: 90 }, 100],
  ["Apio", 16, "apio", { u: 40 }, 80],
  ["Remolacha", 43, "remolacha|remolachas", { u: 120 }, 120],
  ["Repollo", 25, "repollo|repollo colorado", { taza: 90 }, 100],
  ["Palta", 160, "palta|aguacate|guacamole", { u: 200 }, 100],
  // Frutas
  ["Manzana", 52, "manzana|manzanas", { u: 150 }, 150],
  ["Banana", 89, "banana|bananas|platano", { u: 120 }, 120],
  ["Naranja", 47, "naranja|naranjas", { u: 180 }, 180],
  ["Mandarina", 53, "mandarina|mandarinas", { u: 90 }, 90],
  ["Pera", 57, "pera|peras", { u: 170 }, 170],
  ["Frutillas", 32, "frutilla|frutillas", { taza: 150, u: 12 }, 150],
  ["Kiwi", 61, "kiwi|kiwis", { u: 75 }, 75],
  ["Durazno", 39, "durazno|duraznos", { u: 150 }, 150],
  ["Uvas", 69, "uva|uvas", { taza: 150 }, 150],
  ["Ananá", 50, "anana|piña", { taza: 165, feta: 80 }, 165],
  ["Sandía", 30, "sandia", { feta: 300, taza: 150 }, 300],
  ["Melón", 34, "melon", { feta: 200, taza: 160 }, 200],
  ["Fruta (promedio)", 55, "fruta|frutas|ensalada de frutas", { u: 150, taza: 150 }, 150],
  // Grasas, frutos secos, condimentos
  ["Aceite", 884, "aceite|aceite de oliva|oliva|aceite de girasol", { cda: 9, cdita: 4.5 }, 9],
  ["Manteca", 717, "manteca", { cda: 14, cdita: 5 }, 10],
  ["Mayonesa", 680, "mayonesa|mayo", { cda: 15, cdita: 5 }, 15],
  ["Mayonesa light", 300, "mayonesa light|mayo light", { cda: 15, cdita: 5 }, 15],
  ["Ketchup / mostaza", 100, "ketchup|mostaza|salsa golf", { cda: 15, cdita: 5 }, 15],
  ["Salsa de tomate", 40, "salsa|salsa de tomate|tuco|pure de tomate", { taza: 250, cda: 15 }, 100],
  ["Nueces", 654, "nuez|nueces", { u: 5, cda: 8 }, 15],
  ["Almendras", 580, "almendra|almendras", { u: 1.2, cda: 9 }, 15],
  ["Maní", 570, "mani|manies", { cda: 10 }, 20],
  ["Mantequilla de maní", 590, "pasta de mani|mantequilla de mani", { cda: 16, cdita: 5 }, 16],
  ["Semillas (chía, lino)", 490, "chia|semillas|semillas de chia|lino|semillas de lino", { cda: 10, cdita: 4 }, 10],
  ["Azúcar", 400, "azucar", { cdita: 5, cda: 12 }, 5],
  ["Miel", 304, "miel", { cdita: 7, cda: 21 }, 7],
  ["Dulce de leche", 315, "dulce de leche|ddl", { cda: 20, cdita: 7 }, 20],
  ["Mermelada", 250, "mermelada|dulce", { cda: 20, cdita: 7 }, 20],
  ["Mermelada light", 120, "mermelada light", { cda: 20, cdita: 7 }, 20],
  ["Cacao en polvo azucarado", 380, "cacao|nesquik|chocolatada en polvo", { cda: 10, cdita: 4 }, 10],
  ["Edulcorante / sal / especias", 0, "edulcorante|sal|pimienta|oregano|especias|canela|vainilla|esencia de vainilla|limon|jugo de limon|vinagre|aceto", {}, 5],
  // Bebidas
  ["Café / té / mate (sin azúcar)", 2, "cafe|te|mate|mates|infusion|cafe solo|cafe negro", { taza: 200, u: 200 }, 200],
  ["Café con leche", 40, "cafe con leche|lagrima|cortado", { taza: 250, u: 250 }, 250],
  ["Agua / soda", 0, "agua|soda|agua con gas", { vaso: 250 }, 250],
  ["Gaseosa común", 42, "gaseosa|coca|coca cola|sprite|fanta|pepsi", { vaso: 250, lata: 354, botella: 500 }, 250],
  ["Gaseosa light / zero", 1, "gaseosa light|gaseosa zero|coca zero|coca light|sprite zero|pepsi light", { vaso: 250, lata: 354, botella: 500 }, 250],
  ["Jugo de naranja", 45, "jugo|jugo de naranja|exprimido", { vaso: 200 }, 200],
  ["Jugo en polvo light", 3, "jugo en polvo|clight|tang light", { vaso: 250 }, 250],
  ["Cerveza", 43, "cerveza|birra|cervezas", { vaso: 250, lata: 473, botella: 1000, u: 473 }, 473],
  ["Vino", 85, "vino|vino tinto|vino blanco|copa de vino", { copa: 150, vaso: 200 }, 150],
  ["Fernet con coca", 75, "fernet|fernet con coca", { vaso: 300 }, 300],
  // Dulces y otros
  ["Alfajor", 440, "alfajor|alfajores", { u: 50 }, 50],
  ["Chocolate", 540, "chocolate|chocolates", { u: 10, feta: 10 }, 25],
  ["Helado", 200, "helado|helados", { bocha: 70, u: 70 }, 140],
  ["Galletitas dulces", 470, "galletitas dulces|galletas dulces|oreo|pepitos|rumba", { u: 12 }, 36],
  ["Torta / bizcochuelo", 350, "torta|bizcochuelo|budin|tortas", { feta: 80, porcion: 80, u: 80 }, 80],
];

// Objetivo Comer — lógica y pantallas compartidas por la versión en Claude y la versión offline.
// Necesita BASE_FOODS (foods.js) y un "Store" (adaptador de datos) que se pasa a startApp().
function startApp(Store) {
  "use strict";
  const $ = (s) => document.querySelector(s);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const pad = (n) => String(n).padStart(2, "0");
  const ymd = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const parse = (s) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d, 12); };
  const addDays = (s, n) => { const d = parse(s); d.setDate(d.getDate() + n); return ymd(d); };
  const today = () => ymd(new Date());
  const fmt = (n) => Math.round(n).toLocaleString("es-AR");
  const fmt1 = (n) => (Math.round(n * 10) / 10).toLocaleString("es-AR");
  const clone = (o) => JSON.parse(JSON.stringify(o ?? null));
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  const DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  const MEALS = ["Desayuno", "Almuerzo", "Merienda", "Cena", "Postre", "Colación"];
  const EXAMPLES = [
    "250 g de pechuga, ensalada de tomate y lechuga, 1 cda de aceite",
    "200 g de yogur, 2 cdas de avena y una manzana",
    "2 latas de atún con zapallitos y 1 cda de aceite",
  ];
  const MED = [
    { k: "piernas", n: "Pierna", c: "var(--lilac)" },
    { k: "panza", n: "Panza", c: "var(--accent)" },
    { k: "pecho", n: "Pecho", c: "var(--good)" },
  ];
  const UNIT_LABEL = { u: "1 unidad", lata: "1 lata", cda: "1 cda", cdita: "1 cdita", taza: "1 taza", vaso: "1 vaso", feta: "1 feta", plato: "1 plato", copa: "1 copa", bocha: "1 bocha", pote: "1 pote", botella: "1 botella", porcion: "1 porción" };

  const S = { goal: 1600, days: {}, totals: {}, medidas: [], foods: [], tab: "hoy", day: today(), weekOffset: 0, pending: null, busy: false, backToHoy: false };

  // ---------- base de alimentos y lectura del texto ----------
  const norm = (s) => String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9./ ]+/g, " ").replace(/\s+/g, " ").trim();
  const sing = (s) => s.split(" ").map((w) => (w.length > 4 && /[rlndzj]es$/.test(w) ? w.slice(0, -2) : w.length > 3 && /[aeiou]s$/.test(w) ? w.slice(0, -1) : w)).join(" ");
  const escRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const UNITS = {
    g: "g", gr: "g", grs: "g", gramo: "g", gramos: "g", kg: "kg", kilo: "kg", kilos: "kg", ml: "ml", cc: "ml",
    lata: "lata", latas: "lata", cda: "cda", cdas: "cda", cucharada: "cda", cucharadas: "cda", cuchara: "cda", cucharas: "cda",
    cdita: "cdita", cditas: "cdita", cucharadita: "cdita", cucharaditas: "cdita", taza: "taza", tazas: "taza", vaso: "vaso", vasos: "vaso",
    feta: "feta", fetas: "feta", rebanada: "feta", rebanadas: "feta", porcion: "porcion", porciones: "porcion", plato: "plato", platos: "plato",
    unidad: "u", unidades: "u", copa: "copa", copas: "copa", bocha: "bocha", bochas: "bocha", punado: "punado", punados: "punado",
    pote: "pote", potes: "pote", botella: "botella", botellas: "botella",
  };
  const GENERIC = { cda: 15, cdita: 5, taza: 200, vaso: 200, plato: 250, copa: 150, bocha: 70, punado: 30, pote: 190, botella: 500, feta: 20, lata: 120 };
  const NUMW = { un: 1, una: 1, uno: 1, dos: 2, tres: 3, cuatro: 4, cinco: 5, seis: 6, siete: 7, ocho: 8, nueve: 9, diez: 10, media: 0.5, medio: 0.5, mitad: 0.5 };
  const UNIT_ALT = Object.keys(UNITS).sort((a, b) => b.length - a.length).join("|");
  const QTY_RE = new RegExp(`(?:^| )(\\d+(?:[.,]\\d+)?|\\d+/\\d+|${Object.keys(NUMW).join("|")}) ?(${UNIT_ALT})?(?= |$)`);
  const STOP = new Set("de del la el los las a al en con sin y o un una unos unas poco poca algo mas plancha horno hervido hervida hervidos asado asada grillado grillada salteado salteada salteados vapor frito frita casero casera natural rico rica comi tome cocido cocida crudo cruda chico chica grande mediano mediana porcion".split(" "));
  let INDEX = [], PROTECT = [];

  function rebuildIndex() {
    const list = [];
    for (const f of BASE_FOODS) {
      const food = { n: f[0], k: f[1], u: f[3] || {}, d: f[4] };
      for (const a of f[2].split("|")) list.push({ a: norm(a), f: food, mine: false });
      list.push({ a: norm(f[0]), f: food, mine: false });
    }
    for (const p of S.foods) {
      const food = p.mode === "porcion"
        ? { n: p.n, portion: true, kp: Number(p.kp) || 0, pg: Number(p.pg) || 0, u: {}, d: Number(p.pg) || 100, mine: true }
        : { n: p.n, k: Number(p.k) || 0, u: p.u ? { u: Number(p.u), porcion: Number(p.u) } : {}, d: Number(p.u) || 100, mine: true };
      list.push({ a: sing(norm(p.n)), f: food, mine: true });
    }
    list.sort((x, y) => y.a.length - x.a.length || (y.mine ? 1 : 0) - (x.mine ? 1 : 0));
    PROTECT = [...new Set(list.map((e) => e.a).filter((a) => / (con|y|e|mas) /.test(a)))].sort((a, b) => b.length - a.length);
    INDEX = list.filter((e) => e.a).map((e) => ({ ...e, re: new RegExp(`(?:^| )${e.a.split(" ").map((w) => escRe(w) + "(?:s|es)?").join(" ")}(?= |$)`) }));
  }
  function toNum(t) {
    if (t in NUMW) return NUMW[t];
    if (t.includes("/")) { const [a, b] = t.split("/").map(Number); return b ? a / b : null; }
    return parseFloat(t.replace(",", "."));
  }
  function gramsFor(food, qty, unit) {
    if (unit === "g" || unit === "ml") return { g: qty };
    if (unit === "kg") return { g: qty * 1000 };
    if (unit === "porcion") return { g: qty * (food.u.porcion || food.d) };
    if (unit) {
      if (food.u[unit]) return { g: qty * food.u[unit] };
      if (unit === "u") return { g: qty * (food.u.u || food.d) };
      return { g: qty * (GENERIC[unit] || food.d), est: true };
    }
    if (qty == null) return { g: food.d, est: true };
    if (food.u.u) return { g: qty * food.u.u };
    if (qty >= 15) return { g: qty };
    return { g: qty * food.d, est: true };
  }
  function parseMeal(text) {
    let t = String(text || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    t = t.replace(/(\d),(\d)/g, "$1.$2").replace(/sin piel/g, "");
    for (const ph of PROTECT) if (t.includes(ph)) t = t.split(ph).join(ph.replace(/ /g, "_"));
    const chunks = t.split(/,(?!\d)|;|\+|\n|\.(?!\d)| y | e | con | mas | junto a /);
    const items = [], unknown = [];
    for (let raw of chunks) {
      const c = norm(raw.replace(/_/g, " "));
      if (!c) continue;
      const hit = INDEX.find((e) => e.re.test(c));
      if (!hit) {
        const rest = c.split(" ").filter((w) => !STOP.has(w) && !(w in UNITS) && !(w in NUMW) && !/^\d/.test(w));
        if (rest.length) {
          const m = QTY_RE.exec(c);
          const q = m && (!m[2] || ["u", "porcion"].includes(UNITS[m[2]])) ? toNum(m[1]) : 1;
          unknown.push({ t: raw.trim(), kcal: "", q: q > 0 ? q : 1, save: false });
        }
        continue;
      }
      const m = QTY_RE.exec(c);
      let qty = null, unit = null;
      if (m) { qty = toNum(m[1]); unit = m[2] ? UNITS[m[2]] : null; }
      if (qty != null && !(qty > 0)) qty = null;
      if (hit.f.portion) {
        let p, est = false;
        if (qty != null && (unit === "g" || unit === "ml" || unit === "kg") && hit.f.pg) p = (qty * (unit === "kg" ? 1000 : 1)) / hit.f.pg;
        else if (qty != null) p = qty;
        else { p = 1; est = true; }
        items.push({ n: hit.f.n, portion: true, p: Math.round(p * 100) / 100, kp: hit.f.kp, est, mine: true });
        continue;
      }
      const r = gramsFor(hit.f, qty, unit);
      items.push({ n: hit.f.n, g: Math.max(1, Math.round(r.g)), k100: hit.f.k, est: !!r.est, mine: hit.f.mine });
    }
    return { items, unknown };
  }
  const itemKcal = (i) => Math.round(i.portion ? i.p * i.kp : (i.g * i.k100) / 100);
  const cleanName = (t) => sing(norm(t).split(" ").filter((w) => !STOP.has(w) && !(w in UNITS) && !(w in NUMW) && !/^\d/.test(w)).join(" "));
  const pendingTotal = (p) => p.items.reduce((a, i) => a + itemKcal(i), 0) + p.unknown.reduce((a, u) => a + (Number(u.kcal) || 0), 0) + (p.manual || 0);

  // ---------- datos ----------
  function dayItems(d) { return Array.isArray(S.days[d]) ? S.days[d] : []; }
  function totalFor(d) {
    if (Array.isArray(S.days[d])) return S.days[d].reduce((a, i) => a + (Number(i.kcal) || 0), 0);
    return Number(S.totals[d]) || 0;
  }
  function recomputeTotal(d) {
    const t = dayItems(d).reduce((a, i) => a + (Number(i.kcal) || 0), 0);
    if (t > 0) S.totals[d] = t; else { delete S.totals[d]; if (!dayItems(d).length) delete S.days[d]; }
  }
  function exportData() {
    return { app: "objetivo-comer", version: 1, exported: new Date().toISOString(), goal: S.goal, days: clone(S.days), totals: clone(S.totals), medidas: clone(S.medidas), foods: clone(S.foods) };
  }
  function importData(o) {
    if (!o || o.app !== "objetivo-comer") throw new Error("El archivo no es un respaldo de Objetivo Comer.");
    const changed = new Set();
    for (const [d, list] of Object.entries(o.days || {})) {
      if (!Array.isArray(list)) continue;
      const have = new Set(dayItems(d).map((i) => i.id));
      const add = list.filter((i) => i && !have.has(i.id));
      if (add.length) { S.days[d] = [...dayItems(d), ...add]; recomputeTotal(d); changed.add(d); }
    }
    for (const [d, k] of Object.entries(o.totals || {})) if (!S.days[d] && !S.totals[d] && k > 0) { S.totals[d] = k; changed.add(d); }
    for (const e of o.medidas || []) { if (e && e.d && !S.medidas.some((x) => x.d === e.d)) S.medidas.push(e); }
    for (const f of o.foods || []) { if (f && f.n && !S.foods.some((x) => norm(x.n) === norm(f.n))) S.foods.push(f); }
    if (o.goal && !Object.keys(S.totals).length) S.goal = o.goal;
    rebuildIndex();
    return [...changed];
  }

  // ---------- utilidades de pantalla ----------
  function weekStart(offset) { const d = new Date(); d.setHours(12, 0, 0, 0); d.setDate(d.getDate() - ((d.getDay() + 6) % 7) + offset * 7); return ymd(d); }
  function longDate(s) { const d = parse(s); return `${DIAS[d.getDay()]} ${d.getDate()} de ${MESES[d.getMonth()]}`; }
  function shortDate(s) { const d = parse(s); return `${d.getDate()}/${d.getMonth() + 1}`; }
  function defaultMeal() { const h = new Date().getHours(); return h < 11 ? "Desayuno" : h < 15 ? "Almuerzo" : h < 19 ? "Merienda" : "Cena"; }
  let toastT;
  function toast(t) { const el = $("#toast"); el.textContent = t; el.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => (el.hidden = true), 3200); }
  function notice(t) { const el = $("#notice"); el.textContent = t || ""; el.hidden = !t; }

  // ---------- HOY ----------
  function renderHoy() {
    const d = S.day, t = today();
    $("#dayLabel").innerHTML = `${d === t ? "Hoy" : d === addDays(t, -1) ? "Ayer" : esc(longDate(d).split(" ")[0])}<small>${esc(longDate(d))}</small>`;
    $("#nextDay").disabled = d >= t;
    $("#goalVal").textContent = fmt(S.goal);
    const items = dayItems(d);
    const total = totalFor(d);
    const over = total > S.goal;
    const R = 56, C = 2 * Math.PI * R, frac = Math.min(total / S.goal, 1);
    const left = S.goal - total;
    const byMeal = MEALS.map((m) => [m, items.filter((i) => i.meal === m).reduce((a, i) => a + i.kcal, 0)]).filter((x) => x[1] > 0);
    $("#summary").innerHTML = `
      <div class="ring">
        <svg viewBox="0 0 132 132" aria-hidden="true">
          <circle cx="66" cy="66" r="${R}" fill="none" stroke="var(--surface-2)" stroke-width="12"/>
          ${total > 0 ? `<circle cx="66" cy="66" r="${R}" fill="none" stroke="${over ? "var(--bad)" : "var(--good)"}" stroke-width="12" stroke-linecap="round" stroke-dasharray="${(C * frac).toFixed(1)} ${C.toFixed(1)}"/>` : ""}
        </svg>
        <div class="center"><div class="big">${fmt(total)}</div><small>de ${fmt(S.goal)} kcal</small></div>
      </div>
      <div class="sumtext">
        <div class="left-big ${over ? "bad" : "good"}">${over ? `Te pasaste ${fmt(-left)} kcal` : `Te quedan ${fmt(left)} kcal`}</div>
        ${byMeal.length ? `<div class="mealmini">${byMeal.map(([m, k]) => `<span>${m}</span><span>${fmt(k)}</span>`).join("")}</div>` : `<p class="hint">Todavía no cargaste nada ${d === t ? "hoy" : "este día"}.</p>`}
      </div>`;
    renderPending();
    const box = $("#meals");
    if (!items.length) {
      box.innerHTML = `<div class="empty">Escribí arriba lo que comiste con las cantidades (250 g, 2 huevos, 1 cda, una lata) y la app calcula las calorías con su base de alimentos. Usá las flechas para cargar un día anterior.</div>`;
      return;
    }
    box.innerHTML = MEALS.map((m) => {
      const list = items.filter((i) => i.meal === m);
      if (!list.length) return "";
      const sub = list.reduce((a, i) => a + i.kcal, 0);
      return `<div class="meal-group"><div class="meal-head"><h3>${m}</h3><span>${fmt(sub)} kcal</span></div>
        ${list.map((i) => `<div class="item"><div class="body"><div class="desc">${esc(i.desc)}</div>${
          i.items && i.items.length ? `<div class="det">${i.items.map((x) => `${esc(x.n)}${x.q ? " " + esc(x.q) : ""} · ${fmt(x.k)}`).join(" — ")}</div>` : ""
        }</div><div class="kc">${fmt(i.kcal)}</div><button class="del" type="button" data-del="${esc(i.id)}" aria-label="Borrar">×</button></div>`).join("")}
      </div>`;
    }).join("");
  }

  function renderPending() {
    const p = S.pending, box = $("#pending");
    if (!p) { box.innerHTML = ""; return; }
    const canAsk = Store.canAsk && Store.canAsk();
    box.innerHTML = `<div class="card pending">
      <h3>${esc(p.meal)} · revisá y corregí las cantidades</h3>
      ${p.items.map((i, ix) => `<div class="pi"><div class="n">${esc(i.n)}<small>${i.portion ? `${fmt(i.kp)} kcal por porción · cantidad de porciones${i.est ? " (supuse 1)" : ""}` : `${i.k100} kcal/100 g${i.est ? " · porción estimada" : ""}`}${i.src ? " · " + esc(i.src) : ""}</small></div>
        ${i.portion ? `<input type="number" inputmode="decimal" min="0" step="0.5" value="${i.p}" data-pp="${ix}" aria-label="Porciones de ${esc(i.n)}">` : `<input type="number" inputmode="decimal" min="0" value="${i.g}" data-pg="${ix}" aria-label="Gramos de ${esc(i.n)}">`}<div class="k" data-pk="${ix}">${fmt(itemKcal(i))}</div>
        <button class="del" type="button" data-prm="${ix}" aria-label="Quitar">×</button></div>`).join("")}
      ${p.manual ? `<div class="pi"><div class="n">Calorías cargadas a mano</div><span></span><div class="k">${fmt(p.manual)}</div><span></span></div>` : ""}
      ${p.unknown.length ? `<div class="stack">${p.unknown.map((u, ix) => `<div class="unk"><div class="n">“${esc(u.t)}”<small>No está en la base. Poné las kcal${u.q !== 1 ? ` de ${fmt1(u.q)} porciones` : " de la porción"}, o <button type="button" class="linkbtn" data-addfood="${ix}">cargalo cada 100 g</button>.</small></div>
        <input type="number" inputmode="numeric" min="0" placeholder="kcal" value="${esc(u.kcal)}" data-uk="${ix}" aria-label="kcal de ${esc(u.t)}"><button class="del" type="button" data-urm="${ix}" aria-label="Quitar">×</button>
        ${cleanName(u.t) ? `<label class="save" for="usv${ix}"><input type="checkbox" id="usv${ix}" data-us="${ix}" ${u.save ? "checked" : ""}>Guardar “${esc(cleanName(u.t))}” en mis alimentos (${u.q !== 1 ? "kcal ÷ " + fmt1(u.q) + " = 1 porción" : "kcal por porción"})</label>` : ""}</div>`).join("")}
        ${canAsk ? `<button type="button" class="ghost" id="askClaude">Preguntarle a Claude por ${p.unknown.length === 1 ? "este alimento" : "estos alimentos"}</button>` : ""}</div>` : ""}
      ${!p.items.length && !p.unknown.length && !p.manual ? `<p class="hint">No reconocí ningún alimento. Probá escribirlo distinto o cargá las kcal a mano.</p>` : ""}
      ${p.nota ? `<p class="hint">${esc(p.nota)}</p>` : ""}
      <div class="pend-total"><span class="f">Total</span><span class="big" id="pendTotal" style="font-size:32px">${fmt(pendingTotal(p))}</span><span class="hint">kcal</span></div>
      <div class="row"><button class="primary" type="button" id="pendSave">Guardar</button><button class="ghost" type="button" id="pendCancel">Descartar</button></div>
    </div>`;
  }
  function refreshPendingTotals() {
    const p = S.pending; if (!p) return;
    p.items.forEach((i, ix) => { const el = document.querySelector(`[data-pk="${ix}"]`); if (el) el.textContent = fmt(itemKcal(i)); });
    const el = $("#pendTotal"); if (el) el.textContent = fmt(pendingTotal(p));
  }

  function calcular(ev) {
    ev.preventDefault();
    const text = $("#food").value.trim();
    const manual = parseFloat($("#kcalManual").value);
    const meal = $("#meal").value;
    const msg = $("#formMsg");
    msg.hidden = true;
    if (!text && !(manual > 0)) { msg.textContent = "Escribí qué comiste o las calorías."; msg.hidden = false; return; }
    const r = text ? parseMeal(text) : { items: [], unknown: [] };
    S.pending = { meal, desc: text || "Calorías cargadas a mano", items: r.items, unknown: r.unknown, manual: manual > 0 ? Math.round(manual) : 0, nota: "" };
    renderPending();
    $("#pending").scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  async function askClaude() {
    const p = S.pending; if (!p || !p.unknown.length || S.busy) return;
    const btn = $("#askClaude");
    S.busy = true; if (btn) { btn.disabled = true; btn.innerHTML = `<span class="spin"></span>Consultando…`; }
    const list = p.unknown.map((u) => u.t);
    const prompt = `Sos nutricionista en Argentina. Para cada alimento de la lista, estimá cuántos gramos comió la persona (si no lo dice, una porción típica argentina) y las kcal cada 100 g según tablas estándar (USDA o ARGENFOODS). Carnes y pollo crudos salvo que diga cocido.
Respondé solo con JSON: {"items":[{"nombre":"Nombre corto","gramos":150,"kcal100":120}],"nota":"supuestos en una frase corta, o vacío"}
Alimentos: ${JSON.stringify(list).slice(0, 1500)}`;
    try {
      const r = await Store.ask(prompt);
      const got = (Array.isArray(r && r.items) ? r.items : []).map((i) => ({ n: String(i.nombre || "").slice(0, 60), g: Math.max(1, Math.round(Number(i.gramos) || 0)), k100: Math.max(0, Math.round(Number(i.kcal100) || 0)), src: "Claude" })).filter((i) => i.n && i.g);
      if (!got.length) throw { code: "invalid_json" };
      if (S.pending === p) { p.items.push(...got); p.unknown = []; p.nota = String((r && r.nota) || "").slice(0, 200); }
    } catch (e) {
      toast(e && e.code === "not_granted" ? "No se permitió usar Claude. Cargá las kcal a mano." : e && e.code === "rate_limited" ? "Muchas consultas seguidas. Probá más tarde." : "No pude consultar. Cargá las kcal a mano.");
    } finally { S.busy = false; renderPending(); }
  }

  function savePending() {
    const p = S.pending; if (!p) return;
    const total = pendingTotal(p);
    const det = [...p.items.map((i) => ({ n: i.n, q: i.portion ? `${fmt1(i.p)} porc.` : `${i.g} g`, k: itemKcal(i) })), ...p.unknown.filter((u) => Number(u.kcal) > 0).map((u) => ({ n: u.t.slice(0, 60), q: "", k: Math.round(Number(u.kcal)) }))];
    if (p.manual) det.push({ n: "A mano", q: "", k: p.manual });
    const item = { id: uid(), meal: p.meal, desc: p.desc.slice(0, 300), kcal: total, items: det, at: Date.now() };
    const remember = p.unknown.filter((u) => u.save && Number(u.kcal) > 0 && cleanName(u.t));
    if (remember.length) {
      for (const u of remember) {
        const n = cleanName(u.t).slice(0, 60);
        S.foods = [...S.foods.filter((f) => norm(f.n) !== norm(n)), { id: uid(), mode: "porcion", n, kp: Math.round(Number(u.kcal) / (u.q || 1)), pg: 0 }];
      }
      rebuildIndex();
      Store.save("foods");
    }
    const d = S.day;
    S.days[d] = [...dayItems(d), item];
    recomputeTotal(d);
    S.pending = null;
    $("#food").value = ""; $("#kcalManual").value = "";
    renderAll();
    Store.save("log", d);
    toast(`Guardado: ${fmt(total)} kcal`);
  }
  function deleteItem(id) {
    const d = S.day;
    S.days[d] = dayItems(d).filter((i) => i.id !== id);
    recomputeTotal(d);
    renderAll();
    Store.save("log", d);
  }

  // ---------- SEMANA ----------
  function niceStep(max) { return max > 4000 ? 1000 : max > 2000 ? 500 : 250; }
  function barChart(labels, vals, opts) {
    const W = 340, H = 210, L = 36, Rr = 8, T = 18, B = 30, iw = W - L - Rr, ih = H - T - B;
    const goal = S.goal;
    let max = Math.max(goal * 1.15, ...vals.map((v) => v || 0)) * 1.05;
    const step = niceStep(max); max = Math.ceil(max / step) * step;
    const y = (v) => T + ih - (v / max) * ih;
    const n = labels.length, slot = iw / n, bw = Math.min(30, slot * 0.6);
    let s = `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(opts.aria)}">`;
    for (let v = 0; v <= max; v += step) s += `<line class="grid" x1="${L}" x2="${W - Rr}" y1="${y(v)}" y2="${y(v)}"/><text class="ax" x="${L - 6}" y="${y(v) + 3}" text-anchor="end">${v >= 1000 ? fmt1(v / 1000) + "k" : v}</text>`;
    vals.forEach((v, i) => {
      const cx = L + slot * (i + 0.5);
      if (v > 0) {
        const top = y(v);
        s += `<rect x="${cx - bw / 2}" y="${top}" width="${bw}" height="${T + ih - top}" rx="4" fill="${v > goal ? "var(--bad)" : "var(--good)"}" ${opts.hi === i ? "" : 'fill-opacity=".85"'}/>`;
        s += `<text class="val" x="${cx}" y="${top - 4}" text-anchor="middle">${fmt(v)}</text>`;
      }
      const lab = labels[i];
      s += `<text class="${opts.hi === i ? "ax-strong" : "ax"}" x="${cx}" y="${H - B + 14}" text-anchor="middle">${esc(lab[0])}</text>`;
      if (lab[1]) s += `<text class="ax" x="${cx}" y="${H - B + 26}" text-anchor="middle">${esc(lab[1])}</text>`;
    });
    s += `<line class="goal-line" x1="${L}" x2="${W - Rr}" y1="${y(goal)}" y2="${y(goal)}"/><text class="goal-txt" x="${W - Rr}" y="${y(goal) - 4}" text-anchor="end">Meta ${fmt(goal)}</text>`;
    return s + `</svg>`;
  }
  function renderSemana() {
    const ws = weekStart(S.weekOffset), t = today();
    const dates = Array.from({ length: 7 }, (_, i) => addDays(ws, i));
    const vals = dates.map(totalFor);
    $("#weekLabel").innerHTML = `${S.weekOffset === 0 ? "Esta semana" : S.weekOffset === -1 ? "Semana pasada" : "Semana del " + shortDate(ws)}<small>${shortDate(dates[0])} al ${shortDate(dates[6])}</small>`;
    $("#nextWeek").disabled = S.weekOffset >= 0;
    $("#weekChart").innerHTML = barChart(dates.map((d, i) => ["LMMJVSD"[i], String(parse(d).getDate())]), vals, { hi: dates.indexOf(t), aria: "Calorías por día de la semana" });
    const withData = vals.filter((v) => v > 0);
    const avg = withData.length ? withData.reduce((a, b) => a + b, 0) / withData.length : 0;
    const under = withData.filter((v) => v <= S.goal).length;
    const sum = withData.reduce((a, b) => a + b, 0);
    const budget = withData.length * S.goal - sum;
    $("#weekStats").innerHTML = `
      <div class="stat"><div class="v">${withData.length ? fmt(avg) : "–"}</div><div class="k">promedio por día cargado</div></div>
      <div class="stat"><div class="v">${under}/${withData.length}</div><div class="k">días dentro de la meta</div></div>
      <div class="stat"><div class="v">${fmt(sum)}</div><div class="k">kcal en la semana</div></div>
      <div class="stat"><div class="v" style="color:${budget >= 0 ? "var(--good)" : "var(--bad)"}">${budget >= 0 ? "−" : "+"}${fmt(Math.abs(budget))}</div><div class="k">${budget >= 0 ? "kcal por debajo" : "kcal por encima"} de la meta</div></div>`;
    const weeks = Array.from({ length: 8 }, (_, i) => weekStart(i - 7));
    const avgs = weeks.map((w) => { const v = Array.from({ length: 7 }, (_, j) => totalFor(addDays(w, j))).filter((x) => x > 0); return v.length ? v.reduce((a, b) => a + b, 0) / v.length : 0; });
    $("#trendChart").innerHTML = barChart(weeks.map((w) => [shortDate(w), ""]), avgs, { hi: 7, aria: "Promedio diario por semana" });
  }

  // ---------- MEDIDAS ----------
  function renderMedidas() {
    const list = [...S.medidas].sort((a, b) => (a.d < b.d ? -1 : 1));
    $("#medDeltas").innerHTML = MED.map((m) => {
      const pts = list.filter((e) => e[m.k] > 0);
      if (!pts.length) return `<div class="delta"><div class="k">${m.n}</div><div class="v">–</div><div class="d flat">sin datos</div></div>`;
      const first = pts[0][m.k], last = pts[pts.length - 1][m.k], diff = last - first;
      const cls = pts.length < 2 || Math.abs(diff) < 0.05 ? "flat" : diff < 0 ? "good" : "bad";
      const txt = pts.length < 2 ? "primera medida" : `${diff > 0 ? "+" : diff < 0 ? "−" : ""}${fmt1(Math.abs(diff))} cm desde ${shortDate(pts[0].d)}`;
      return `<div class="delta"><div class="k">${m.n}</div><div class="v">${fmt1(last)}</div><div class="d ${cls}">${txt}</div></div>`;
    }).join("");
    $("#medLegend").innerHTML = MED.map((m) => `<span><i style="background:${m.c}"></i>${m.n}</span>`).join("");
    const box = $("#medChart");
    if (!list.length) {
      box.innerHTML = `<div class="empty">Cargá tus primeras medidas arriba. Con dos o más vas a ver la línea de cómo bajan.</div>`;
    } else {
      const W = 340, H = 200, L = 34, Rr = 12, T = 12, B = 24, iw = W - L - Rr, ih = H - T - B;
      const all = list.flatMap((e) => MED.map((m) => e[m.k]).filter((v) => v > 0));
      const lo = Math.floor((Math.min(...all) - 3) / 5) * 5, hi = Math.ceil((Math.max(...all) + 3) / 5) * 5;
      const step = hi - lo > 60 ? 20 : 10;
      const t0 = parse(list[0].d).getTime(), t1 = parse(list[list.length - 1].d).getTime();
      const x = (d) => (t1 === t0 ? L + iw / 2 : L + ((parse(d).getTime() - t0) / (t1 - t0)) * iw);
      const y = (v) => T + ih - ((v - lo) / (hi - lo)) * ih;
      let s = `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Evolución de medidas en centímetros">`;
      for (let v = Math.ceil(lo / step) * step; v <= hi; v += step) s += `<line class="grid" x1="${L}" x2="${W - Rr}" y1="${y(v)}" y2="${y(v)}"/><text class="ax" x="${L - 6}" y="${y(v) + 3}" text-anchor="end">${v}</text>`;
      s += `<text class="ax" x="${L}" y="${H - 6}">${shortDate(list[0].d)}</text>`;
      if (list.length > 1) s += `<text class="ax" x="${W - Rr}" y="${H - 6}" text-anchor="end">${shortDate(list[list.length - 1].d)}</text>`;
      for (const m of MED) {
        const pts = list.filter((e) => e[m.k] > 0);
        if (!pts.length) continue;
        if (pts.length > 1) s += `<polyline fill="none" stroke="${m.c}" stroke-width="2" stroke-linejoin="round" points="${pts.map((e) => `${x(e.d).toFixed(1)},${y(e[m.k]).toFixed(1)}`).join(" ")}"/>`;
        pts.forEach((e, i) => { s += `<circle cx="${x(e.d)}" cy="${y(e[m.k])}" r="${i === pts.length - 1 ? 4 : 2.5}" fill="${m.c}"/>`; });
      }
      box.innerHTML = s + `</svg>`;
    }
    const rows = [...list].reverse();
    $("#medList").innerHTML = rows.length
      ? `<table><thead><tr><th>Fecha</th><th>Pierna</th><th>Panza</th><th>Pecho</th><th></th></tr></thead><tbody>${rows.map((e) => `<tr><td>${shortDate(e.d)}/${e.d.slice(2, 4)}</td>${MED.map((m) => `<td>${e[m.k] > 0 ? fmt1(e[m.k]) : "–"}</td>`).join("")}<td><button class="del" type="button" data-meddel="${esc(e.d)}" aria-label="Borrar">×</button></td></tr>`).join("")}</tbody></table>`
      : `<p class="hint">Todavía no hay medidas.</p>`;
  }
  function saveMed(ev) {
    ev.preventDefault();
    const d = $("#medDate").value || today();
    const e = { d };
    let any = false;
    for (const [k, id] of [["piernas", "#mPiernas"], ["panza", "#mPanza"], ["pecho", "#mPecho"]]) {
      const v = parseFloat($(id).value);
      if (v > 0) { e[k] = Math.round(v * 10) / 10; any = true; }
    }
    if (!any) { toast("Cargá al menos una medida."); return; }
    const prev = S.medidas.find((x) => x.d === d) || {};
    S.medidas = [...S.medidas.filter((x) => x.d !== d), { ...prev, ...e }];
    ["#mPiernas", "#mPanza", "#mPecho"].forEach((id) => ($(id).value = ""));
    renderMedidas(); Store.save("med");
    toast("Medidas guardadas");
  }

  // ---------- ALIMENTOS ----------
  function unitsText(u) { return Object.entries(u || {}).filter(([k]) => UNIT_LABEL[k]).map(([k, g]) => `${UNIT_LABEL[k]} = ${fmt1(g)} g`).join(" · "); }
  function renderAlimentos() {
    const mine = [...S.foods].sort((a, b) => a.n.localeCompare(b.n));
    $("#myFoods").innerHTML = mine.length
      ? mine.map((f) => `<div class="frow"><div class="n">${esc(f.n)}${f.mode === "porcion" ? (f.pg ? `<small>1 porción = ${fmt1(f.pg)} g</small>` : "") : f.u ? `<small>1 unidad = ${fmt1(f.u)} g</small>` : ""}</div><div class="k">${f.mode === "porcion" ? `${fmt(f.kp)} kcal/porción` : `${fmt(f.k)} kcal/100 g`}</div><button class="del" type="button" data-fdel="${esc(f.id)}" aria-label="Borrar">×</button></div>`).join("")
      : `<p class="hint">Todavía no agregaste alimentos. Sirve para comidas caseras o productos que la base no tiene.</p>`;
    renderBase();
    if (Store.renderBackup) Store.renderBackup($("#backup"), api); else $("#backupCard").hidden = true;
  }
  function renderBase() {
    const q = norm($("#foodSearch").value);
    const rows = BASE_FOODS.filter((f) => !q || norm(f[0]).includes(q) || norm(f[2]).split("|").some((a) => a.includes(q)));
    $("#baseFoods").innerHTML = rows.length
      ? rows.map((f) => { const u = unitsText(f[3]); return `<div class="frow"><div class="n">${esc(f[0])}${u ? `<small>${esc(u)}</small>` : ""}</div><div class="k">${fmt(f[1])} kcal/100 g</div></div>`; }).join("")
      : `<p class="hint">No está en la base. Agregalo arriba como alimento propio.</p>`;
  }
  let foodMode = "porcion";
  function setFoodMode(m) {
    foodMode = m;
    document.querySelectorAll("[data-fmode]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.fmode === m)));
    const por = m === "porcion";
    $("#fKcalLbl").textContent = por ? "kcal de 1 porción" : "kcal cada 100 g";
    $("#fUnitLbl").textContent = por ? "La porción pesa (g)" : "1 unidad pesa (g)";
    $("#fKcal").max = por ? 5000 : 950;
    $("#fHint").textContent = por
      ? 'Para productos que traen las kcal por unidad o porción (barritas, alfajores, un plato casero). Después escribís "2 barritas de cereal" y la app multiplica.'
      : "Las kcal cada 100 g están en la tabla nutricional del envase. Después escribís los gramos que comiste y la app hace la cuenta.";
  }
  function saveFood(ev) {
    ev.preventDefault();
    const n = $("#fName").value.trim().slice(0, 60);
    const k = parseFloat($("#fKcal").value);
    const u = parseFloat($("#fUnit").value);
    if (!n || !norm(n)) { toast("Poné un nombre."); return; }
    if (foodMode === "porcion") {
      if (!(k >= 0 && k <= 5000)) { toast("Poné las kcal de una porción."); return; }
      S.foods = [...S.foods.filter((f) => norm(f.n) !== norm(n)), { id: uid(), mode: "porcion", n, kp: Math.round(k), pg: u > 0 ? Math.round(u * 10) / 10 : 0 }];
    } else {
      if (!(k >= 0 && k <= 950)) { toast("Las kcal cada 100 g van de 0 a 950."); return; }
      S.foods = [...S.foods.filter((f) => norm(f.n) !== norm(n)), { id: uid(), n, k: Math.round(k), u: u > 0 ? Math.round(u * 10) / 10 : 0 }];
    }
    rebuildIndex();
    $("#fName").value = ""; $("#fKcal").value = ""; $("#fUnit").value = "";
    Store.save("foods");
    if (S.pending) {
      const r = parseMeal(S.pending.desc);
      S.pending.items = [...r.items, ...S.pending.items.filter((i) => i.src)];
      S.pending.unknown = r.unknown;
    }
    renderAlimentos();
    toast(`Guardado: ${n}`);
    if (S.backToHoy) { S.backToHoy = false; setTab("hoy"); renderHoy(); }
  }

  // ---------- AMIGOS ----------
  let friendsSeq = 0;
  async function renderFriends() {
    const seq = ++friendsSeq;
    if (Store.renderAccount) Store.renderAccount($("#acct"), api);
    const box = $("#friends");
    let people = [];
    try { people = (await Store.friends()) || []; } catch (e) { people = []; }
    if (seq !== friendsSeq) return;
    people = people.filter((p) => p.totals && Object.keys(p.totals).length);
    if (!people.length) {
      box.innerHTML = `<div class="empty">${esc(Store.friendsEmpty || "Cuando vos u otras personas carguen comidas, acá aparecen sus totales del día.")}</div>`;
      return;
    }
    const t = today();
    const last7 = Array.from({ length: 7 }, (_, i) => addDays(t, i - 6));
    people.sort((a, b) => (a.me ? -1 : b.me ? 1 : (a.name || "").localeCompare(b.name || "")));
    box.innerHTML = people.map((p) => {
      const goal = Number(p.goal) || 1600;
      const tk = Number(p.totals[t]) || 0;
      const v = last7.map((d) => Number(p.totals[d]) || 0).filter((x) => x > 0);
      const avg = v.length ? v.reduce((a, b) => a + b, 0) / v.length : 0;
      const ok = v.filter((x) => x <= goal).length;
      const pct = Math.min(tk / goal, 1) * 100;
      const initials = (p.name || "?").trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
      const avatar = p.avatar ? `<img alt="" src="${esc(p.avatar)}">` : `<svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true" style="grid-row:span 2"><circle cx="20" cy="20" r="20" fill="var(--surface-2)"/><text x="20" y="25" text-anchor="middle" font-size="14" font-weight="700" fill="var(--fg)">${esc(initials)}</text></svg>`;
      return `<div class="friend">${avatar}
        <div class="nm">${esc(p.name || (p.me ? "Vos" : "Alguien"))}${p.me ? "<em>vos</em>" : ""}</div>
        <div class="num"><div class="big" style="color:${tk > goal ? "var(--bad)" : "var(--fg)"}">${fmt(tk)}</div><small>hoy / ${fmt(goal)}</small></div>
        <div class="sub">7 días: prom. ${v.length ? fmt(avg) : "–"} · ${ok}/${v.length} en meta</div>
        <div class="bar"><span style="width:${pct}%;background:${tk > goal ? "var(--bad)" : "var(--good)"}"></span></div>
      </div>`;
    }).join("");
  }

  // ---------- general ----------
  function renderAll() { renderHoy(); renderSemana(); renderMedidas(); renderAlimentos(); renderFriends(); }
  const TABS = ["hoy", "semana", "medidas", "alimentos", "amigos"];
  function setTab(t) {
    S.tab = t;
    for (const id of TABS) $("#tab-" + id).hidden = id !== t;
    document.querySelectorAll(".tabbar button").forEach((b) => b.setAttribute("aria-selected", String(b.dataset.tab === t)));
    try { localStorage.setItem("oc-tab", t); } catch (e) {}
    window.scrollTo(0, 0);
  }

  function bind() {
    $("#meal").innerHTML = MEALS.map((m) => `<option ${m === defaultMeal() ? "selected" : ""}>${m}</option>`).join("");
    $("#examples").innerHTML = EXAMPLES.map((e, i) => `<button type="button" class="chip" data-ex="${i}">${esc(e)}</button>`).join("");
    $("#examples").addEventListener("click", (e) => { const b = e.target.closest("[data-ex]"); if (b) { $("#food").value = EXAMPLES[+b.dataset.ex]; $("#food").focus(); } });
    $("#addForm").addEventListener("submit", calcular);
    const pend = $("#pending");
    pend.addEventListener("click", (e) => {
      const p = S.pending; if (!p) return;
      const t = e.target;
      if (t.id === "pendSave") savePending();
      else if (t.id === "pendCancel") { S.pending = null; renderPending(); }
      else if (t.id === "askClaude") askClaude();
      else if (t.dataset.prm != null) { p.items.splice(+t.dataset.prm, 1); renderPending(); }
      else if (t.dataset.urm != null) { p.unknown.splice(+t.dataset.urm, 1); renderPending(); }
      else if (t.dataset.addfood != null) {
        const u = p.unknown[+t.dataset.addfood];
        $("#fName").value = cleanName(u.t);
        setFoodMode("100");
        S.backToHoy = true; setTab("alimentos"); $("#fKcal").focus();
      }
    });
    pend.addEventListener("input", (e) => {
      const p = S.pending; if (!p) return;
      const t = e.target;
      if (t.dataset.pg != null) { p.items[+t.dataset.pg].g = Math.max(0, Number(t.value) || 0); refreshPendingTotals(); }
      if (t.dataset.pp != null) { p.items[+t.dataset.pp].p = Math.max(0, Number(t.value) || 0); refreshPendingTotals(); }
      if (t.dataset.uk != null) { p.unknown[+t.dataset.uk].kcal = t.value; refreshPendingTotals(); }
      if (t.dataset.us != null) p.unknown[+t.dataset.us].save = t.checked;
    });
    $("#meals").addEventListener("click", (e) => { const b = e.target.closest("[data-del]"); if (b) deleteItem(b.dataset.del); });
    $("#prevDay").addEventListener("click", () => { S.day = addDays(S.day, -1); S.pending = null; renderHoy(); });
    $("#nextDay").addEventListener("click", () => { if (S.day < today()) { S.day = addDays(S.day, 1); S.pending = null; renderHoy(); } });
    $("#prevWeek").addEventListener("click", () => { S.weekOffset--; renderSemana(); });
    $("#nextWeek").addEventListener("click", () => { if (S.weekOffset < 0) { S.weekOffset++; renderSemana(); } });
    $("#medDate").value = today();
    $("#medForm").addEventListener("submit", saveMed);
    $("#medList").addEventListener("click", (e) => {
      const b = e.target.closest("[data-meddel]");
      if (b) { S.medidas = S.medidas.filter((x) => x.d !== b.dataset.meddel); renderMedidas(); Store.save("med"); }
    });
    $("#foodForm").addEventListener("submit", saveFood);
    document.querySelectorAll("[data-fmode]").forEach((b) => b.addEventListener("click", () => setFoodMode(b.dataset.fmode)));
    $("#foodSearch").addEventListener("input", renderBase);
    $("#myFoods").addEventListener("click", (e) => {
      const b = e.target.closest("[data-fdel]");
      if (b) { S.foods = S.foods.filter((f) => f.id !== b.dataset.fdel); rebuildIndex(); renderAlimentos(); Store.save("foods"); }
    });
    $("#goalBtn").addEventListener("click", () => { $("#goalInput").value = S.goal; $("#goalPanel").hidden = false; $("#goalInput").focus(); });
    $("#goalCancel").addEventListener("click", () => ($("#goalPanel").hidden = true));
    $("#goalPanel").addEventListener("submit", (e) => {
      e.preventDefault();
      const v = Math.round(Number($("#goalInput").value));
      if (!(v >= 800 && v <= 5000)) { toast("Elegí una meta entre 800 y 5000 kcal."); return; }
      S.goal = v; $("#goalPanel").hidden = true; renderAll(); Store.save("goal"); toast(`Meta: ${fmt(v)} kcal`);
    });
    document.querySelector(".tabbar").addEventListener("click", (e) => { const b = e.target.closest("[data-tab]"); if (b) { S.backToHoy = false; setTab(b.dataset.tab); } });
    let saved = null; try { saved = localStorage.getItem("oc-tab"); } catch (e) {}
    if (saved && TABS.includes(saved)) setTab(saved);
    let lastToday = today();
    setInterval(() => { const t = today(); if (t !== lastToday) { if (S.day === lastToday) S.day = t; lastToday = t; renderAll(); } }, 60000);
  }

  const api = {
    S, today, addDays, totalFor, clone, toast, notice, exportData, importData, rebuildIndex, parseMeal,
    render: (what) => {
      if (!what) return renderAll();
      if (what === "foods") rebuildIndex();
      ({ hoy: renderHoy, semana: renderSemana, medidas: renderMedidas, alimentos: renderAlimentos, friends: renderFriends, foods: renderAlimentos, log: () => { renderHoy(); renderSemana(); } })[what]?.();
    },
  };
  rebuildIndex();
  bind();
  Promise.resolve(Store.init(api)).catch(() => {}).then(() => { rebuildIndex(); renderAll(); });
  renderAll();
  return api;
}

// Adaptador para la versión instalable (offline): todo se guarda en el teléfono.
// Internet solo se usa para compartir los totales diarios con tus amigos (Supabase).
const PwaStore = (function () {
  let api, sb = null, session = null, syncing = false, syncTimer = null;
  const KD = "oc-data-v1", KM = "oc-meta-v1";
  let M = { dirty: [], profileDirty: true, nombre: "", friends: [], lastSync: 0, myId: null, lastError: "" };

  function load() {
    try {
      const d = JSON.parse(localStorage.getItem(KD) || "null");
      if (d) Object.assign(api.S, { days: d.days || {}, totals: d.totals || {}, medidas: d.medidas || [], foods: d.foods || [], goal: d.goal || 1600 });
      const m = JSON.parse(localStorage.getItem(KM) || "null");
      if (m) M = Object.assign(M, m);
    } catch (e) {}
  }
  function persist() {
    const S = api.S;
    try {
      localStorage.setItem(KD, JSON.stringify({ days: S.days, totals: S.totals, medidas: S.medidas, foods: S.foods, goal: S.goal }));
      localStorage.setItem(KM, JSON.stringify(M));
    } catch (e) { api.toast("El teléfono no dejó guardar. Descargá un respaldo desde Alimentos."); }
  }
  function markDirty(d) { if (!M.dirty.includes(d)) M.dirty.push(d); }
  function scheduleSync() { clearTimeout(syncTimer); syncTimer = setTimeout(sync, 1500); }

  async function init(a) {
    api = a;
    load();
    api.rebuildIndex();
    api.render();
    if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(() => {});
    if ("storage" in navigator && navigator.storage.persist) navigator.storage.persist().catch(() => {});
    window.addEventListener("online", () => { api.render("friends"); sync(); });
    window.addEventListener("offline", () => api.render("friends"));
    const cfg = window.OC_CONFIG || {};
    if (cfg.supabaseUrl && cfg.supabaseKey && window.supabase) {
      sb = window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseKey, { auth: { persistSession: true, autoRefreshToken: true } });
      try { const { data } = await sb.auth.getSession(); session = data.session; } catch (e) { session = null; }
      sb.auth.onAuthStateChange((_ev, s) => { const was = session; session = s; if (s && (!was || was.user.id !== s.user.id)) onLogin(); api.render("friends"); });
      if (session) onLogin();
    }
    setInterval(sync, 5 * 60 * 1000);
  }

  function onLogin() {
    if (M.myId !== session.user.id) {
      M.myId = session.user.id;
      const cutoff = api.addDays(api.today(), -120);
      for (const d of Object.keys(api.S.totals)) if (d >= cutoff) markDirty(d);
      M.profileDirty = true;
      persist();
    }
    sync();
  }

  async function sync() {
    if (!sb || !session || syncing || !navigator.onLine) return;
    syncing = true; api.render("friends");
    const uidv = session.user.id;
    try {
      if (!M.nombre) {
        const { data } = await sb.from("perfiles").select("nombre").eq("id", uidv).maybeSingle();
        M.nombre = (data && data.nombre) || (session.user.user_metadata && session.user.user_metadata.nombre) || session.user.email.split("@")[0];
        M.profileDirty = true;
      }
      if (M.profileDirty) {
        const { error } = await sb.from("perfiles").upsert({ id: uidv, nombre: M.nombre, meta: api.S.goal, actualizado: new Date().toISOString() });
        if (error) throw error;
        M.profileDirty = false;
      }
      const dates = [...M.dirty];
      const up = dates.filter((d) => api.totalFor(d) > 0).map((d) => ({ user_id: uidv, fecha: d, kcal: Math.round(api.totalFor(d)) }));
      const del = dates.filter((d) => !(api.totalFor(d) > 0));
      if (up.length) { const { error } = await sb.from("totales").upsert(up); if (error) throw error; }
      if (del.length) { const { error } = await sb.from("totales").delete().eq("user_id", uidv).in("fecha", del); if (error) throw error; }
      M.dirty = M.dirty.filter((d) => !dates.includes(d));
      const desde = api.addDays(api.today(), -13);
      const [p, t] = await Promise.all([
        sb.from("perfiles").select("id,nombre,meta"),
        sb.from("totales").select("user_id,fecha,kcal").gte("fecha", desde),
      ]);
      if (p.error) throw p.error;
      if (t.error) throw t.error;
      M.friends = (p.data || []).map((r) => ({ id: r.id, name: r.nombre, goal: r.meta, totals: {} }));
      for (const r of t.data || []) { const f = M.friends.find((x) => x.id === r.user_id); if (f) f.totals[r.fecha] = r.kcal; }
      M.lastSync = Date.now(); M.lastError = "";
    } catch (e) {
      M.lastError = (e && e.message) || "error";
    } finally {
      syncing = false; persist(); api.render("friends");
    }
  }

  function save(kind, d) {
    if (kind === "log" && d) markDirty(d);
    if (kind === "goal") M.profileDirty = true;
    if (kind === "all") { for (const k of Object.keys(api.S.totals)) markDirty(k); M.profileDirty = true; }
    persist();
    if (kind === "log" || kind === "goal" || kind === "all") scheduleSync();
  }

  function friends() {
    const S = api.S;
    const others = M.friends.filter((f) => f.id !== M.myId);
    return [{ id: "me", me: true, name: M.nombre || "Vos", goal: S.goal, totals: S.totals }, ...others];
  }

  function hhmm(ts) { const d = new Date(ts); return `${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`; }
  function statusLine() {
    const online = navigator.onLine;
    let txt;
    if (syncing) txt = "Sincronizando…";
    else if (!online) txt = M.dirty.length ? "Sin internet. Tus amigos ven lo nuevo cuando vuelva la conexión." : "Sin internet. Ves los datos de tus amigos de la última vez.";
    else if (M.lastError) txt = "No se pudo compartir: " + M.lastError;
    else txt = M.lastSync ? `Compartido. Última actualización ${hhmm(M.lastSync)}.` : "Conectado.";
    return `<div class="sync"><span class="dot ${online && !M.lastError ? "on" : "off"}"></span><span>${txt.replace(/[<>&]/g, "")}</span></div>`;
  }

  function renderAccount(el) {
    const state = !sb ? "nocfg" : !session ? "out" : "in";
    if (state === "out" && el.dataset.state === "out") return; // no borrar lo que está escribiendo
    el.dataset.state = state;
    if (state === "nocfg") {
      el.innerHTML = `<div class="card"><h3>Compartir con amigos</h3><p class="hint">Para compartir falta completar <b>config.js</b> con los datos de Supabase (ver LEEME.md). La app funciona igual sin esto.</p></div>`;
      return;
    }
    if (state === "out") {
      el.innerHTML = `<form class="card stack" id="authForm">
        <h3>Entrá para compartir</h3>
        <p class="hint">Solo hace falta para que tus amigos vean tus totales. Todo lo demás funciona sin cuenta y sin internet.</p>
        <label for="aNombre">Tu nombre (para crear la cuenta)<input id="aNombre" type="text" maxlength="40" autocomplete="name"></label>
        <label for="aEmail">Email<input id="aEmail" type="email" autocomplete="email" required></label>
        <label for="aPass">Contraseña (mínimo 6)<input id="aPass" type="password" minlength="6" autocomplete="current-password" required></label>
        <div class="row"><button class="primary" type="submit" data-mode="in">Entrar</button><button class="ghost" type="submit" data-mode="up">Crear cuenta</button></div>
        <p class="msg" id="aMsg" hidden></p>
      </form>`;
      const form = el.querySelector("#authForm");
      let mode = "in";
      form.querySelectorAll("button[type=submit]").forEach((b) => b.addEventListener("click", () => (mode = b.dataset.mode)));
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const msg = el.querySelector("#aMsg"); msg.hidden = true;
        const email = el.querySelector("#aEmail").value.trim(), password = el.querySelector("#aPass").value, nombre = el.querySelector("#aNombre").value.trim();
        if (!navigator.onLine) { msg.textContent = "Necesitás internet para entrar la primera vez."; msg.hidden = false; return; }
        try {
          if (mode === "up") {
            if (!nombre) { msg.textContent = "Poné tu nombre para crear la cuenta."; msg.hidden = false; return; }
            M.nombre = nombre; M.profileDirty = true; persist();
            const { data, error } = await sb.auth.signUp({ email, password, options: { data: { nombre } } });
            if (error) throw error;
            if (!data.session) { msg.style.color = "var(--good)"; msg.textContent = "Te mandamos un mail para confirmar la cuenta. Confirmala y después tocá Entrar."; msg.hidden = false; }
          } else {
            if (nombre) { M.nombre = nombre; M.profileDirty = true; persist(); }
            const { error } = await sb.auth.signInWithPassword({ email, password });
            if (error) throw error;
          }
        } catch (err) {
          msg.style.color = ""; msg.textContent = /invalid login/i.test(err.message) ? "Email o contraseña incorrectos." : /confirm/i.test(err.message) ? "Primero confirmá tu cuenta desde el mail que te llegó." : /fetch|network/i.test(err.message) ? "No se pudo conectar con Supabase. Revisá internet y los datos de config.js." : /registered/i.test(err.message) ? "Ese email ya tiene cuenta. Tocá Entrar." : err.message; msg.hidden = false;
        }
      });
      return;
    }
    el.innerHTML = `<div class="card stack"><h3>Compartiendo como ${(M.nombre || session.user.email).replace(/[<>&]/g, "")}</h3>${statusLine()}
      <div class="row"><button class="ghost" type="button" id="aSync">Actualizar ahora</button><button class="ghost" type="button" id="aOut">Salir</button></div></div>`;
    el.querySelector("#aSync").addEventListener("click", () => { M.lastError = ""; sync(); });
    el.querySelector("#aOut").addEventListener("click", async () => { try { await sb.auth.signOut(); } catch (e) {} M.friends = []; persist(); el.dataset.state = ""; api.render("friends"); });
  }

  function renderBackup(el) {
    if (el.dataset.ready) return;
    el.dataset.ready = "1";
    el.innerHTML = `<p class="hint">Todo se guarda en este teléfono. Descargá un respaldo cada tanto, o para pasar tus datos a otro teléfono. También sirve para traer lo que cargaste en la versión de Claude.</p>
      <div class="row"><button type="button" class="ghost" id="bkExport">Descargar respaldo</button><label class="ghost" style="text-align:center;cursor:pointer" for="bkImport">Importar respaldo</label></div>
      <input id="bkImport" type="file" accept=".json,application/json" hidden>`;
    el.querySelector("#bkExport").addEventListener("click", async () => {
      const name = `objetivo-comer-${api.today()}.json`;
      const blob = new Blob([JSON.stringify(api.exportData(), null, 1)], { type: "application/json" });
      try {
        const file = new File([blob], name, { type: "application/json" });
        if (navigator.canShare && navigator.canShare({ files: [file] })) { await navigator.share({ files: [file], title: "Respaldo Objetivo Comer" }); return; }
      } catch (e) { if (e && e.name === "AbortError") return; }
      const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click();
      setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
    });
    el.querySelector("#bkImport").addEventListener("change", async (ev) => {
      const f = ev.target.files && ev.target.files[0]; ev.target.value = "";
      if (!f) return;
      try { api.importData(JSON.parse(await f.text())); save("all"); api.render(); api.toast("Respaldo importado."); }
      catch (e) { api.toast(e.message || "No se pudo leer el archivo."); }
    });
  }

  return { init, save, friends, renderAccount, renderBackup, canAsk: () => false, friendsEmpty: "Cuando cargues comidas, acá aparecen tus totales del día y los de tus amigos." };
})();

window.OC = startApp(PwaStore);
