import { SITE_NAME, SITE_URL } from "@/lib/seo";

export type ArticleCategory = "Founder Notes" | "G-Struct Build Notes" | "I-R-O™ Method";

export type ArticleBlock = {
  type: "p" | "h2" | "quote";
  text: string;
};

export type Article = {
  slug: string;
  title: string;
  subtitle?: string;
  category: ArticleCategory;
  excerpt: string;
  author: string;
  publishedAt: string;
  readMinutes: number;
  featured: boolean;
  tags: string[];
  blocks: ArticleBlock[];
};

export const ARTICLES: Article[] = [
  {
    slug: "g-struct-product-update-q3",
    title: "G-Struct Product Update: lo que estamos construyendo para Q3",
    category: "G-Struct Build Notes",
    excerpt:
      "Una mirada al prototipo de G-Struct, la lógica I-R-O™ que lo sostiene y lo que estamos validando antes del lanzamiento Q3.",
    author: "Guillermo Suco",
    publishedAt: "2026-05-19",
    readMinutes: 8,
    featured: true,
    tags: ["G-Struct", "Product Update", "Q3", "Execution"],
    blocks: [
      { type: "p", text: "Hay una pregunta que nos ha acompañado desde el inicio de G-Struct: ¿qué pasaría si una app no solo ayudara a organizar tareas, sino a entender el patrón mental que impide ejecutarlas?" },
      { type: "p", text: "Esa pregunta sigue guiando el producto. No estamos construyendo otra app de productividad. Tampoco una app de journaling, seguimiento emocional o motivación diaria. G-Struct nace de una premisa distinta: muchas personas no se bloquean porque no sepan qué tienen que hacer, sino porque el costo mental de hacerlo se vuelve demasiado alto." },
      { type: "p", text: "Ese costo no siempre es visible. A veces aparece como procrastinación. A veces como perfeccionismo. A veces como autosabotaje, saturación mental, miedo a exponerse o una necesidad excesiva de control. Desde afuera, todo eso puede parecer falta de disciplina, mala organización o poca constancia. Pero cuando uno mira con más cuidado, muchas veces encuentra algo más profundo: una forma repetida de interpretar la acción." },
      { type: "p", text: "Esa es la tesis central detrás de G-Struct. La ejecución no es solo gestión del tiempo. También es interpretación, emoción, creencia y respuesta conductual. Una persona puede tener una agenda ordenada, una lista de tareas clara y una meta importante frente a sí, pero si su sistema interno interpreta la acción como amenaza, juicio, riesgo o insuficiencia, la organización por sí sola no alcanza." },
      { type: "p", text: "Por eso G-Struct se está construyendo como un sistema de coaching cognitivo-conductual aplicado a la ejecución. Su objetivo no es decirle al usuario simplemente “haz más” o “organízate mejor”. El objetivo es ayudarle a identificar qué está pasando internamente, reencuadrarlo con método y convertir esa nueva lectura en una acción pequeña, concreta y ejecutable." },
      { type: "p", text: "El método que sostiene el producto se llama I-R-O™: Identificar, Reencuadrar y Optimizar. Identificar significa observar pensamientos, emociones, creencias, situaciones activadoras y patrones que elevan el costo de actuar. Reencuadrar implica trabajar esos patrones desde herramientas inspiradas en la metodología cognitivo-conductual de Aaron Beck, Judith Beck y Albert Ellis. Optimizar significa convertir una interpretación más funcional en una acción concreta, no en una reflexión bonita que se queda en el aire." },
      { type: "p", text: "El producto está tomando forma alrededor de esa lógica. El Calibrador busca ofrecer una primera lectura del patrón de ejecución del usuario: procrastinación, perfeccionismo, autosabotaje, impostor o saturación mental. Quick Reframe está pensado para los momentos de fricción inmediata, cuando el usuario necesita procesar un pensamiento intrusivo, un bloqueo puntual o una emoción que le está cortando el movimiento. Restructure Lab, en cambio, va hacia un trabajo más profundo: patrones que se repiten, creencias que vuelven, respuestas que ya no se explican por una situación aislada." },
      { type: "p", text: "Una de las decisiones más importantes del prototipo ha sido entender que estas herramientas no pueden sentirse como módulos separados tirados dentro de una app. Tienen que sentirse como una ruta. Cuando alguien está saturado, bloqueado o evitando una tarea importante, no necesita abrir una plataforma y tener que descifrarla. Necesita saber por dónde empezar, qué hacer primero y por qué eso tiene sentido." },
      { type: "p", text: "Ese ha sido uno de los aprendizajes principales del prototipo. La claridad no es un detalle de diseño; es parte de la intervención. Si el usuario llega confundido y la app le agrega más carga cognitiva, el producto falla. Por eso hemos empezado a mover la experiencia hacia menos ruido visual, rutas más guiadas, una primera acción recomendada y una explicación más simple del método I-R-O™." },
      { type: "p", text: "También aprendimos que la diferencia entre Quick Reframe y Restructure Lab debía ser mucho más clara. Quick Reframe es para el momento. Restructure Lab es para el patrón. Esa distinción parece pequeña, pero cambia la experiencia completa. No todo bloqueo necesita una exploración profunda. A veces el usuario solo necesita bajar la intensidad emocional, ordenar el pensamiento y dar el siguiente paso. Otras veces, el bloqueo no es puntual: es una forma repetida de responder ante la exigencia, la incertidumbre o la posibilidad de fallar." },
      { type: "p", text: "Sobre esta estructura estamos integrando una capa de IA: Guillermo, el coach virtual de G-Struct. Esta parte requiere especial cuidado. La IA no puede ser una decoración del producto ni una voz genérica que entrega frases correctas pero vacías. Tiene que entender el método, respetar límites de seguridad, usar un lenguaje claro y ayudar al usuario a pasar de pensamiento a acción. Tampoco puede presentarse como terapeuta, diagnosticar ni reemplazar apoyo profesional. G-Struct no es terapia. Es coaching cognitivo-conductual aplicado a ejecución, y esa frontera debe estar clara dentro del producto, no solo en los textos legales." },
      { type: "p", text: "Ahora estamos preparando una prueba inicial con un grupo pequeño de testers. No buscamos una validación superficial ni una ronda de comentarios amables. Buscamos fricción real. Queremos observar si las personas entienden qué es G-Struct en los primeros minutos, si saben por dónde empezar, si el Calibrador les entrega una lectura útil, si Quick Reframe funciona en un bloqueo real y si Restructure Lab se siente suficientemente profundo sin volverse pesado." },
      { type: "p", text: "Ese test tampoco busca demostrar que el producto está terminado. Sería absurdo. Lo que buscamos es identificar qué partes ya tienen energía, qué partes deben simplificarse y qué necesita reconstruirse antes de abrirlo a más usuarios. En esta etapa, aprender dónde el producto falla es tan importante como confirmar dónde funciona." },
      { type: "p", text: "Para Q3, el foco es convertir el prototipo en una experiencia más completa, clara y confiable. Eso implica mejorar la guía del usuario, fortalecer la IA como coach, reducir carga cognitiva y preparar infraestructura real: base de datos, autenticación, persistencia de sesiones, historial del usuario y una arquitectura que pueda crecer. Pero el reto no es solamente técnico. El reto principal es lograr que la experiencia se sienta coherente con la tesis del producto." },
      { type: "quote", text: "G-Struct no quiere ayudar a las personas simplemente a hacer más. Quiere ayudarles a entender qué patrón está elevando el costo de actuar." },
      { type: "p", text: "A veces no procrastinas porque eres desorganizado. A veces no avanzas porque una parte de tu sistema interpreta la acción como riesgo. A veces no terminas porque tu estándar interno convirtió calidad en control. A veces no te expones porque tu mente traduce visibilidad como amenaza. Y si ese patrón no se identifica, cualquier herramienta de productividad termina trabajando solo sobre la superficie." },
      { type: "p", text: "Ahí es donde estamos construyendo." },
      { type: "p", text: "En las próximas semanas estaremos probando, ajustando y reconstruyendo partes del prototipo con una obsesión concreta: que abrir G-Struct se sienta como entrar a una ruta clara para desbloquearte, no como otra app que tienes que descifrar." },
      { type: "p", text: "Ese es el foco para Q3: construir una primera versión capaz de ayudar a las personas a identificar sus bloqueos, reencuadrarlos y convertir claridad mental en acción concreta." },
    ],
  },
  {
    slug: "la-crisis-de-la-ejecucion",
    title: "La crisis de la ejecución",
    subtitle: "¿Por qué el método I-R-O™?",
    category: "I-R-O™ Method",
    excerpt:
      "La ejecución no falla solo por falta de tiempo o disciplina. Muchas veces falla por la interpretación que vuelve más pesada la acción.",
    author: "Guillermo Suco",
    publishedAt: "2026-05-19",
    readMinutes: 7,
    featured: true,
    tags: ["I-R-O™", "Execution", "Cognitive Behavioral Coaching"],
    blocks: [
      { type: "p", text: "Vivimos en una era en la que tenemos más herramientas que nunca para organizarnos, aprender, automatizar y producir. Hay aplicaciones para gestionar tareas, calendarios inteligentes, notas, inteligencia artificial, metodologías, frameworks, cursos y contenido para casi cualquier problema. Sin embargo, una gran cantidad de profesionales y emprendedores sigue atrapada en el mismo punto: saben lo que tienen que hacer, pero no logran ejecutarlo con la consistencia que necesitan." },
      { type: "p", text: "En G-Structure llamamos a esto la crisis de la ejecución. No es simplemente falta de tiempo, ni falta de información, ni falta de capacidad. En muchos casos, la persona tiene visión, estrategia, conocimiento y recursos suficientes. El problema aparece en otro lugar: en la fricción mental que se activa antes de actuar. Esa fricción puede tomar la forma de perfeccionismo, duda, sobreanálisis, miedo al error, saturación o necesidad de control. Desde afuera, todo eso puede verse como desorganización o falta de disciplina. Pero muchas veces la persona no está evitando la tarea en sí; está evitando lo que esa tarea significa para ella." },
      { type: "p", text: "Por eso los consejos tradicionales suelen quedarse cortos. Decirle a alguien que se motive, que se organice mejor o que simplemente empiece puede sonar razonable, pero no toca el problema de fondo. Si una persona interpreta cada entrega como una prueba de valor personal, no basta con darle una agenda. Si cada decisión se siente como un riesgo demasiado grande, no basta con recomendarle que priorice. Si empezar una tarea activa miedo al juicio, al error o a la exposición, el bloqueo no se resuelve únicamente con técnicas de productividad. La ejecución no depende solo de ordenar acciones; depende también de cómo la mente interpreta esas acciones." },
      { type: "p", text: "G-Structure nace desde esa premisa. No estamos construyendo una propuesta para decirle a la gente que haga más. Ya existe demasiado ruido alrededor de la productividad. Lo que estamos construyendo es un sistema para intervenir el proceso previo a la acción: la manera en que una persona interpreta, procesa y responde ante una tarea, una decisión o una situación de exigencia. Nuestro método se llama I-R-O: Identificar, Reencuadrar y Optimizar." },
      { type: "h2", text: "Identificar" },
      { type: "p", text: "Identificar es el primer paso porque nadie puede intervenir con precisión un patrón que todavía no ha observado. La mayoría intenta resolver sus bloqueos desde la superficie. Cambia de aplicación, reorganiza su agenda, compra otro curso, empieza otra rutina o se culpa por procrastinar. Pero si el patrón interno sigue intacto, el bloqueo vuelve con otra cara. Identificar significa mirar qué pensamiento aparece antes de postergar, qué emoción se activa antes de evitar, qué interpretación convierte una tarea concreta en una amenaza y qué respuesta se repite cuando la persona se acerca a algo importante." },
      { type: "p", text: "Este punto es clave porque “no puedo avanzar” todavía no dice mucho. Puede significar muchas cosas. Puede significar que la persona no se siente lista, que cree que debe hacerlo perfecto, que anticipa crítica, que no sabe por dónde empezar, que está saturada o que convirtió una decisión normal en una prueba de identidad. Mientras el bloqueo se mantenga como una sensación general, cualquier consejo será genérico. Cuando se identifica el patrón, la conversación cambia. Ya no estamos hablando de una nube de malestar, sino de un sistema que puede observarse." },
      { type: "h2", text: "Reencuadrar" },
      { type: "p", text: "El segundo paso es reencuadrar. Esta palabra se usa mucho, y muchas veces se usa mal. Reencuadrar no significa pensar positivo ni maquillarse la realidad. No significa decir “todo va a salir bien” ni fabricar una versión cómoda de los hechos. Reencuadrar significa revisar si la interpretación que la persona está usando le permite actuar o la está bloqueando. A veces el problema no es la tarea, sino la lectura mental de la tarea. Una entrega puede ser solo una entrega, pero para alguien atrapado en perfeccionismo puede convertirse en una prueba de valor personal. Una llamada puede ser solo una llamada, pero para alguien que teme exponerse puede sentirse como una amenaza. Una decisión puede ser solo el siguiente paso, pero para alguien atrapado en sobreanálisis puede convertirse en un riesgo imposible de tolerar." },
      { type: "p", text: "Ahí es donde entra el trabajo cognitivo-conductual. La persona no responde únicamente al hecho; responde al significado que le dio al hecho. Si ese significado está cargado de amenaza, insuficiencia o control, la acción se vuelve más pesada de lo que debería ser. Reencuadrar es revisar esa lógica. No para suavizar la realidad, sino para verla con más precisión. Si el pensamiento dominante es “si esto no sale perfecto, fracaso”, el trabajo no es reemplazarlo por una frase bonita. El trabajo es cuestionar esa estructura y construir una lectura más funcional: “necesito una primera versión útil, no una versión perfecta”. Esa diferencia parece pequeña, pero puede cambiar completamente la salida conductual." },
      { type: "h2", text: "Optimizar" },
      { type: "p", text: "El tercer paso es optimizar, y para nosotros este paso es indispensable. G-Structure no se queda en reflexión. Entender un bloqueo puede ser útil, pero también puede convertirse en otra forma de postergar. Hay personas que se analizan demasiado y actúan muy poco. Por eso I-R-O no termina en insight; termina en acción. Optimizar significa convertir el reencuadre en una salida concreta. No una gran transformación, no una promesa enorme, no una declaración inspiradora. Una acción específica: abrir el documento, enviar el mensaje, definir el siguiente paso, hacer una primera versión imperfecta, tomar la decisión pendiente o reducir una tarea a una unidad ejecutable." },
      { type: "p", text: "Ese es el centro del método. Identificar el patrón, reencuadrar la interpretación y optimizar la salida hacia la acción. No como teoría decorativa, sino como una forma práctica de procesar la fricción mental que impide ejecutar. G-Struct, nuestra app, está siendo construida alrededor de esa lógica. Herramientas como Quick Reframe existen para intervenir bloqueos del momento. Restructure Lab está pensado para trabajar patrones más repetidos. La capa de IA que estamos integrando no busca ser un chatbot genérico ni una voz motivacional. Tiene que funcionar como una guía que ayude al usuario a pensar con más claridad y cerrar el ciclo en una acción concreta." },
      { type: "p", text: "Esto también define lo que G-Structure no es. No es terapia. No diagnostica. No reemplaza apoyo profesional. Tampoco es una app de bienestar en el sentido tradicional. Es coaching cognitivo-conductual aplicado a ejecución. Su medida real no es que el usuario pase más tiempo dentro de la app, sino que salga de ella con una acción más clara que antes. Si la herramienta solo ayuda a describir mejor el bloqueo, no es suficiente. Tiene que ayudar a procesarlo y convertirlo en movimiento." },
      { type: "p", text: "Estamos construyendo para personas que operan en contextos donde la exigencia no desaparece. Profesionales, emprendedores y líderes que tienen que decidir, crear, priorizar y sostener ejecución incluso cuando hay ruido. Para ese perfil, la fricción mental no es un tema secundario. Puede definir si una idea avanza o se queda en intención, si una decisión se toma o se posterga, si una oportunidad se ejecuta o se pierde en análisis." },
      { type: "p", text: "La ejecución no empieza únicamente cuando alguien abre una agenda o marca una tarea como completada. Empieza antes, en la forma en que interpreta lo que tiene delante. Si esa interpretación está distorsionada por miedo, perfeccionismo, control o saturación, la acción se encarece. Ahí trabaja G-Structure: no en la superficie de la productividad, sino en el sistema que decide si una persona actúa, evita, posterga o avanza." },
      { type: "quote", text: "Ese es el método I-R-O™. Identificar lo que está operando. Reencuadrar la interpretación que bloquea. Optimizar la salida hacia una acción concreta." },
    ],
  },
  {
    slug: "la-infraestructura-invisible-del-habito",
    title: "La infraestructura invisible del hábito",
    subtitle: "Parte 1",
    category: "Founder Notes",
    excerpt:
      "No somos solamente criaturas de hábitos. Somos criaturas de patrones, significados y rutas cognitivas repetidas hasta volverse automáticas.",
    author: "Guillermo Suco",
    publishedAt: "2026-05-19",
    readMinutes: 9,
    featured: true,
    tags: ["Founder Notes", "Habits", "Cognition", "Behavior"],
    blocks: [
      { type: "p", text: "“Somos criaturas de hábitos.” La frase parece tan evidente que rara vez la discutimos. La repetimos en aulas, libros de productividad, conferencias motivacionales y conversaciones cotidianas como si explicara por sí sola por qué una persona avanza, se estanca, mejora o fracasa. Desde la ética aristotélica hasta la psicología contemporánea, la idea del hábito ha sido usada para explicar la formación del carácter, la disciplina y la excelencia. Incluso la famosa frase “Somos lo que hacemos repetidamente; la excelencia, entonces, no es un acto, sino un hábito”, aunque suele atribuirse a Aristóteles, es en realidad una formulación moderna de Will Durant inspirada en la visión aristotélica de la virtud como práctica repetida." },
      { type: "p", text: "Pero aquí aparece un problema: ¿qué llamamos realmente “hábito”? ¿La acción repetida? ¿La rutina externa? ¿La conducta observable? ¿O el patrón interno que hace que una persona repita ciertas acciones incluso cuando dice querer cambiarlas?" },
      { type: "p", text: "En este ensayo quiero sostener una tesis distinta: no somos simplemente criaturas de hábitos; somos criaturas de patrones. Los hábitos son la parte visible del sistema, pero no necesariamente su causa. Antes de una conducta repetida suele existir una forma repetida de interpretar, anticipar, justificar, evitar o decidir. Una persona no procrastina únicamente porque “tiene el hábito” de postergar; muchas veces posterga porque ha construido un patrón cognitivo en el que iniciar se asocia con amenaza, error, insuficiencia o pérdida de control. La conducta se repite porque la mente ya recorrió antes el mismo camino." },
      { type: "p", text: "Por eso, hablar de hábitos sin hablar de cognición es quedarse en la superficie. La rutina diaria importa, por supuesto, pero la rutina no nace en el vacío. Detrás de cada acción automatizada hay una red de creencias, emociones, expectativas y recompensas que la hacen probable. El hábito no es solo lo que hacemos repetidamente; es también la consecuencia de lo que pensamos repetidamente, de lo que tememos repetidamente y de lo que evitamos repetidamente." },
      { type: "h2", text: "La infraestructura invisible" },
      { type: "p", text: "Si el hábito es la consecuencia de lo que pensamos, repetimos y evitamos, entonces su definición no puede limitarse a la simple acumulación de conductas. Desde la neurociencia y la psicología del comportamiento, un hábito suele entenderse como un patrón automatizado que se activa ante señales específicas del entorno y permite al cerebro operar con mayor eficiencia. Lo que en la superficie aparece como una simple costumbre es, en realidad, una estrategia de ahorro cognitivo: una ruta conductual que el sistema nervioso aprende, consolida y ejecuta con menor demanda deliberativa." },
      { type: "p", text: "En este proceso, los ganglios basales cumplen un papel central. Diversos estudios los han vinculado con la formación de hábitos, especialmente cuando una conducta que inicialmente era dirigida a una meta se vuelve progresivamente más dependiente de señales del entorno y menos sensible a la evaluación consciente de sus consecuencias. En términos simples: lo que al principio requiere decisión, con el tiempo puede convertirse en una respuesta casi automática." },
      { type: "p", text: "Esta automatización implica una forma de descentralización cognitiva. La corteza prefrontal, asociada con funciones como planificación, control inhibitorio y toma de decisiones, deja de cargar con todo el peso de la conducta. El cerebro no necesita deliberar cada paso de una acción ya consolidada. Por eso podemos conducir una ruta conocida, revisar el celular sin darnos cuenta o responder de la misma manera ante una situación emocionalmente incómoda. La mente busca eficiencia; y para lograrla, automatiza caminos." },
      { type: "p", text: "La psicología del comportamiento ha descrito este proceso mediante el conocido bucle de señal, rutina y recompensa. La señal funciona como detonante; la rutina es la respuesta conductual o mental que se ejecuta; y la recompensa es el beneficio que el sistema registra después de la acción. Ese beneficio no siempre es placer. A veces es alivio. A veces es control. A veces es la reducción momentánea de ansiedad. Esta distinción es crucial, porque muchos hábitos que sabotean la ejecución no se sostienen porque hagan bien, sino porque alivian algo que la persona no quiere sentir." },
      { type: "p", text: "Así, procrastinar puede funcionar como una recompensa negativa: no produce necesariamente satisfacción, pero reduce momentáneamente la tensión de enfrentar una tarea. Evitar una conversación difícil puede no resolver el problema, pero ofrece alivio inmediato. Revisar compulsivamente el teléfono puede no aportar nada significativo, pero interrumpe por unos segundos el malestar interno. El cerebro aprende: “Cuando aparece esta incomodidad, esta respuesta me alivia”. Y lo que alivia, aunque destruya a largo plazo, puede repetirse." },
      { type: "p", text: "Hasta aquí, la neurociencia y la psicología del comportamiento explican una parte esencial del hábito: su base de aprendizaje, automatización y recompensa. Sin embargo, todavía queda una pregunta más profunda: ¿por qué una señal se vuelve señal? ¿Por qué una tarea activa amenaza en una persona y desafío en otra? ¿Por qué el silencio de alguien puede interpretarse como rechazo, indiferencia o simple cansancio, dependiendo de quien lo percibe?" },
      { type: "h2", text: "La base de la interpretación" },
      { type: "p", text: "Para Aaron T. Beck, las personas no reaccionan únicamente a los eventos, sino al significado que les atribuyen. Su modelo cognitivo sostiene que las situaciones activan pensamientos automáticos, creencias intermedias y esquemas profundos que influyen en la respuesta emocional y conductual. En otras palabras, entre el estímulo y la acción no hay un vacío: hay una lectura mental de la realidad." },
      { type: "p", text: "Esa lectura no siempre es lenta, consciente o racional. Muchas veces ocurre en milisegundos. La mente interpreta antes de que la persona pueda explicar qué interpretó. Una tarea pendiente puede ser leída como responsabilidad, oportunidad, amenaza, juicio, carga o evidencia de insuficiencia. La situación externa puede ser la misma, pero el significado interno cambia completamente la respuesta." },
      { type: "p", text: "Cuando este sistema de interpretación opera de forma rígida, aparecen distorsiones cognitivas: sesgos sistemáticos que deforman la manera en que una persona procesa la información. La catastrofización convierte una dificultad en desastre anticipado. La sobregeneralización transforma un error puntual en una identidad defectuosa. El pensamiento dicotómico reduce la experiencia a éxito total o fracaso absoluto. Desde ahí, la conducta deja de ser una reacción libre ante el entorno y se convierte en una defensa automatizada ante el significado que la mente ha construido." },
      { type: "p", text: "Por eso, el hábito no puede entenderse únicamente como repetición de conducta. Antes de la rutina visible, hay una interpretación invisible. Antes del piloto automático conductual, hay un piloto automático cognitivo. Y antes de cambiar lo que una persona hace, muchas veces es necesario identificar qué significado está defendiendo, evitando o confirmando a través de esa conducta." },
      { type: "p", text: "La secuencia, entonces, no sería simplemente señal, rutina y recompensa. En los hábitos humanos complejos, especialmente aquellos vinculados con procrastinación, perfeccionismo, evitación o autosabotaje, el circuito es más profundo:" },
      { type: "quote", text: "Situación → interpretación → respuesta → alivio o recompensa → automatización" },
      { type: "p", text: "Ese es el punto clave. No somos solamente criaturas de hábitos. Somos criaturas de significados repetidos hasta volverse automáticos." },
      { type: "p", text: "Esta distinción cambia el punto de partida. Si el hábito fuera solo una conducta repetida, bastaría con repetir otra conducta hasta reemplazarla. Pero si el hábito es también una interpretación automatizada, entonces cambiar no significa únicamente hacer algo diferente; significa aprender a leer la realidad de otra manera." },
      { type: "p", text: "En el siguiente artículo continuaremos esta tesis desde una pregunta incómoda: ¿cuántos de nuestros hábitos no son defectos de disciplina, sino defensas cognitivas que alguna vez tuvieron sentido?" },
    ],
  },
];

export const featuredArticles = ARTICLES.filter((article) => article.featured);

export function getArticleBySlug(slug: string) {
  return ARTICLES.find((article) => article.slug === slug);
}

export function formatArticleDate(date: string) {
  return new Intl.DateTimeFormat("es-EC", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00-05:00`));
}

export function articleUrl(article: Article) {
  return `${SITE_URL}/articulos/${article.slug}`;
}

export function articleSchema(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    inLanguage: "es-EC",
    mainEntityOfPage: articleUrl(article),
    author: {
      "@type": "Person",
      name: article.author,
      url: `${SITE_URL}/sobre-guillermo`,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    keywords: article.tags.join(", "),
  };
}
