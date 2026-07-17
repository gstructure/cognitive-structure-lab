export type LegalSection = {
  title: string;
  body?: string[];
  items?: string[];
};

export type LegalDocument = {
  eyebrow: string;
  title: string;
  subtitle: string;
  effectiveDate: string;
  version: string;
  bindingNotice?: string;
  sections: LegalSection[];
  sourcesTitle: string;
  sources: string[];
  contactLabel: string;
  backLabel: string;
  backPath: string;
};

const esSources = [
  "Ley Orgánica de Protección de Datos Personales, Registro Oficial Quinto Suplemento No. 459, 26 de mayo de 2021.",
  "Reglamento General a la Ley Orgánica de Protección de Datos Personales, Decreto Ejecutivo No. 904, 2023.",
  "Ley Orgánica de Defensa del Consumidor, en especial Art. 45 reformado sobre devolución/cambio en el término de quince (15) días.",
  "Ley de Comercio Electrónico, Firmas Electrónicas y Mensajes de Datos, Ley 67, Registro Oficial Suplemento 557 de 17 de abril de 2002.",
  "Código Orgánico de la Economía Social de los Conocimientos, Creatividad e Innovación (Código Ingenios).",
  "Lineamientos públicos de la Superintendencia de Protección de Datos Personales sobre gestión de riesgos, evaluación de impacto y protección de datos desde el diseño y por defecto.",
];

const enSources = [
  "Ecuador Organic Law on Personal Data Protection, Official Registry Fifth Supplement No. 459, May 26, 2021.",
  "General Regulation to the Organic Law on Personal Data Protection, Executive Decree No. 904, 2023.",
  "Ecuador Organic Consumer Defense Law, especially amended Article 45 on returns/exchanges within fifteen (15) days.",
  "Ecuador Electronic Commerce, Electronic Signatures and Data Messages Law, Law 67, Official Registry Supplement 557, April 17, 2002.",
  "Organic Code of the Social Economy of Knowledge, Creativity and Innovation (Código Ingenios).",
  "Public guidelines from Ecuador's Personal Data Protection Superintendence on risk management, impact assessment, and privacy by design and by default.",
];

export const termsEs: LegalDocument = {
  eyebrow: "SUCOSTRUCT S.A.S. B.I.C. · RUC 0990348675001",
  title: "Términos y Condiciones de Uso",
  subtitle: "KAIRON - producto de SUCOSTRUCT S.A.S. B.I.C.",
  effectiveDate: "16 de julio de 2026",
  version: "1.0",
  bindingNotice:
    "La versión en español de estos Términos es la versión jurídicamente vinculante para consumidores ubicados en Ecuador. Cualquier versión en inglés se publica para comodidad de usuarios internacionales y, salvo disposición expresa distinta o norma imperativa aplicable, no modifica el alcance de la versión en español.",
  contactLabel: "Para notificaciones legales: legal@g-structure.co. Para soporte: support@g-structure.co. Teléfono de soporte: +59398-687-5121.",
  backLabel: "Volver al inicio",
  backPath: "/",
  sourcesTitle: "Fuentes normativas y criterios usados",
  sources: esSources,
  sections: [
    {
      title: "1. Aceptación de los Términos",
      body: [
        "Estos Términos y Condiciones de Uso regulan el acceso y uso de KAIRON, la aplicación web progresiva, el sitio g-structure.co, subdominios, herramientas, contenidos, módulos, funciones beta, canales de soporte y servicios relacionados ofrecidos por SUCOSTRUCT S.A.S. B.I.C., sociedad por acciones simplificada de beneficio e interés colectivo constituida conforme a las leyes de la República del Ecuador, con RUC 0990348675001 y domicilio en Urb. San Sebastián, Torre B, Dpto. 202, La Aurora, Daule, Ecuador.",
        "Al crear una cuenta, acceder, usar el Servicio, iniciar una prueba, aceptar un consentimiento, completar una compra o continuar usando el Servicio, el Usuario declara haber leído, comprendido y aceptado estos Términos, la Política de Privacidad, la Política de Reembolsos, la Política de Cookies y los avisos o consentimientos adicionales aplicables.",
        "Si el Usuario no acepta estos Términos, no debe usar el Servicio.",
      ],
    },
    {
      title: "2. Idioma y versión vinculante",
      body: [
        "La versión en español de estos Términos es la versión jurídicamente vinculante para consumidores ubicados en Ecuador. Cualquier versión en inglés se publica para comodidad de usuarios internacionales y, salvo disposición expresa distinta o norma imperativa aplicable, no modifica el alcance de la versión en español.",
      ],
    },
    {
      title: "3. Naturaleza del Servicio",
      body: [
        "KAIRON es una herramienta digital de autoacompañamiento, coaching cognitivo-conductual no clínico y optimización de ejecución profesional. Utiliza flujos estructurados y asistencia de IA para ayudar al Usuario a identificar, reencuadrar y trabajar patrones de fricción en la ejecución, tales como procrastinación, perfeccionismo, autosabotaje e impostor.",
        "KAIRON no es un servicio médico, psicológico, psiquiátrico, psicoterapéutico, de emergencia, diagnóstico clínico, tratamiento sanitario, telemedicina ni sustituto de atención profesional. El Servicio no crea relación terapeuta-paciente, médico-paciente, psicólogo-paciente, abogado-cliente, asesor financiero-cliente ni ninguna otra relación profesional regulada.",
      ],
    },
    {
      title: "4. Advertencia de crisis y emergencias",
      body: [
        "Si el Usuario atraviesa una emergencia médica, ideación suicida, riesgo de autolesión, violencia, crisis de salud mental o situación que requiera asistencia inmediata, debe dejar de usar el Servicio y contactar servicios de emergencia, líneas de crisis o profesionales calificados en su país. SUCOSTRUCT no asume responsabilidad por el uso del Servicio como sustituto de atención de emergencia o cuidado profesional.",
      ],
    },
    {
      title: "5. Requisitos de edad y capacidad",
      body: [
        "El Servicio está dirigido exclusivamente a personas de 18 años o más, o la mayoría de edad aplicable en su jurisdicción si esta fuera superior. Al usar el Servicio, el Usuario declara tener capacidad legal suficiente para contratar. No recopilamos intencionalmente datos de menores de edad.",
      ],
    },
    {
      title: "6. Cuenta, credenciales y uso personal",
      body: [
        "El Usuario debe proporcionar información exacta, actual y completa al crear su cuenta y mantenerla actualizada.",
        "La cuenta es personal, individual, no transferible y no puede compartirse, sublicenciarse, revenderse o ponerse a disposición de terceros sin autorización escrita de SUCOSTRUCT.",
        "El Usuario es responsable de proteger sus credenciales y de toda actividad realizada desde su cuenta, salvo accesos no autorizados imputables directamente a fallas de seguridad de SUCOSTRUCT.",
      ],
    },
    {
      title: "7. Planes, precios, suscripciones y renovación automática",
      body: [
        "KAIRON puede ofrecer planes gratuitos, pagos, pruebas, versiones beta, planes fundadores, planes Pro, planes Enterprise u otras modalidades publicadas en la página de precios o en una propuesta comercial.",
        "Las suscripciones se facturan por adelantado y se renuevan automáticamente por periodos sucesivos, salvo cancelación antes de la fecha de renovación. El Usuario autoriza el cobro recurrente mediante el proveedor de pagos aplicable.",
        "Cuando corresponda por ley o buena práctica comercial, SUCOSTRUCT podrá enviar recordatorios de renovación, cambios de precio o condiciones materiales con antelación razonable.",
      ],
    },
    {
      title: "8. Proveedor de pagos y Merchant of Record",
      body: [
        "Las compras pueden ser procesadas por Lemon Squeezy, LLC o sus afiliadas como Merchant of Record. Lemon Squeezy, LLC puede actuar como vendedor autorizado, emitir facturas/recibos, cobrar y remitir impuestos aplicables, procesar devoluciones aprobadas y aplicar sus propios términos y políticas al proceso de pago. En caso de conflicto estrictamente relacionado con la mecánica del pago, prevalecerán los términos de Lemon Squeezy, LLC para esa materia; para el Servicio, el contenido, la cuenta, propiedad intelectual, uso aceptable y responsabilidad, prevalecen estos Términos.",
      ],
    },
    {
      title: "9. Cancelación y pagos fallidos",
      body: [
        "El Usuario puede cancelar su suscripción desde la cuenta, portal de facturación o canal indicado por SUCOSTRUCT/Lemon Squeezy, LLC. La cancelación evita cobros futuros y normalmente surte efecto al final del periodo ya pagado.",
        "Si un cobro de renovación falla, el acceso a funciones pagadas puede mantenerse durante un periodo de gracia, limitarse o suspenderse. SUCOSTRUCT o Lemon Squeezy, LLC pueden reintentar el cobro y notificar al Usuario. La falta de pago puede ocasionar suspensión o terminación de la suscripción.",
      ],
    },
    {
      title: "10. Reembolsos",
      body: [
        "Los reembolsos se rigen por la Política de Reembolsos y Cancelaciones. Nada en estos Términos limita derechos irrenunciables del consumidor bajo la Ley Orgánica de Defensa del Consumidor de Ecuador u otra norma imperativa aplicable.",
      ],
    },
    {
      title: "11. Contenido del Usuario y licencia limitada",
      body: [
        "El Usuario conserva la titularidad sobre textos, respuestas, reflexiones, audios, datos y otros materiales que ingrese voluntariamente en el Servicio.",
        "El Usuario otorga a SUCOSTRUCT una licencia limitada, no exclusiva, mundial, revocable en los términos de la Política de Privacidad y necesaria para alojar, procesar, analizar, transformar, generar respuestas, mantener historial, ofrecer memoria entre sesiones, dar soporte, asegurar y mejorar el Servicio para el Usuario.",
        "SUCOSTRUCT no venderá el Contenido del Usuario ni lo usará para entrenar modelos de terceros fuera de la infraestructura y finalidades descritas en la Política de Privacidad sin consentimiento separado, explícito e informado cuando sea requerido.",
      ],
    },
    {
      title: "12. Propiedad intelectual de SUCOSTRUCT",
      body: [
        "El Servicio, software, diseño, interfaces, flujos, marca, logos, textos, prompts, arquitectura conversacional, metodología I-R-O (Identificar, Reencuadrar, Optimizar), Escáner, Filtro, Taller, Programas, Nocturno, Activador Diario, clasificaciones cognitivas, modelos de diagnóstico no clínico, estructura UX, documentación, know-how, secretos empresariales y demás activos son propiedad de SUCOSTRUCT o sus licenciantes.",
        "El Usuario no adquiere derechos sobre dichos activos, salvo una licencia limitada, revocable, no exclusiva e intransferible para usar el Servicio conforme a estos Términos.",
        "Queda prohibido copiar, extraer, reproducir, adaptar, publicar, registrar, explotar comercialmente, entrenar modelos, crear data sets, hacer benchmarking competitivo, hacer ingeniería inversa o desarrollar productos competidores basados en la estructura, metodología, outputs sistemáticos o prompts del Servicio, salvo autorización escrita o derecho imperativo aplicable.",
      ],
    },
    {
      title: "13. Uso aceptable y seguridad",
      body: [
        "El Usuario se obliga a no usar el Servicio para fines ilícitos, abusivos, fraudulentos, discriminatorios, difamatorios, invasivos, de acoso, explotación, daño, desinformación o vulneración de derechos de terceros.",
        "Se prohíbe intentar acceder a sistemas no autorizados, eludir medidas de seguridad, realizar scraping, crawling masivo, automatización abusiva, ataques, carga de malware, prompt injection, jailbreaks, extracción de prompts, pruebas de vulnerabilidad no autorizadas o interferir con la integridad del Servicio.",
        "SUCOSTRUCT puede monitorear patrones de uso y aplicar medidas razonables para prevenir abuso, fraude, riesgos de seguridad o infracciones, respetando la Política de Privacidad y la normativa aplicable.",
      ],
    },
    {
      title: "14. Inteligencia artificial, precisión y decisiones del Usuario",
      body: [
        "Las respuestas generadas por IA son probabilísticas y pueden contener errores, omisiones, sesgos, interpretaciones inadecuadas o información incompleta. No deben tratarse como verdad absoluta ni como asesoramiento profesional.",
        "El Usuario es responsable de evaluar la pertinencia de las sugerencias y de sus propias decisiones, conductas y resultados. KAIRON no garantiza resultados personales, profesionales, emocionales, clínicos, financieros, académicos, comerciales o laborales.",
      ],
    },
    {
      title: "15. Servicios de terceros",
      body: [
        "El Servicio puede depender de proveedores como AWS, Amazon Bedrock u otros modelos sucesores, Lemon Squeezy, LLC, Intercom, servicios de notificaciones push, analítica, hosting, soporte o infraestructura. SUCOSTRUCT no controla todos los actos de terceros independientes, pero procurará usar proveedores reputados y contratos adecuados cuando actúen como encargados del tratamiento.",
      ],
    },
    {
      title: "16. Funciones beta y cambios del Servicio",
      body: [
        "SUCOSTRUCT puede lanzar funciones beta, experimentales, gratuitas o de validación. Estas pueden ser incompletas, contener errores, cambiar, limitarse o retirarse. Ninguna función beta constituye garantía de disponibilidad futura, salvo acuerdo escrito en contrario.",
      ],
    },
    {
      title: "17. Suspensión y terminación",
      body: [
        "SUCOSTRUCT puede suspender o terminar el acceso si existe incumplimiento de estos Términos, riesgo de seguridad, fraude, uso abusivo, obligación legal, falta de pago, solicitud del Usuario o discontinuación del Servicio. Las obligaciones de propiedad intelectual, confidencialidad, limitaciones de responsabilidad, indemnidad, pagos pendientes, privacidad y resolución de disputas sobreviven en la medida necesaria.",
      ],
    },
    {
      title: "18. Exenciones de garantía",
      body: [
        "En la máxima medida permitida por la ley aplicable, el Servicio se ofrece tal como está y según disponibilidad. SUCOSTRUCT no garantiza que el Servicio sea ininterrumpido, libre de errores, libre de vulnerabilidades, compatible con todos los dispositivos, ni que produzca resultados específicos. Nada limita derechos o garantías irrenunciables bajo la Ley Orgánica de Defensa del Consumidor u otra norma imperativa.",
      ],
    },
    {
      title: "19. Limitación de responsabilidad",
      body: [
        "En la máxima medida permitida por la ley, SUCOSTRUCT, sus fundadores, directores, empleados, contratistas y afiliados no serán responsables por daños indirectos, incidentales, especiales, consecuenciales, lucro cesante, pérdida de datos, pérdida de reputación o resultados derivados del uso o imposibilidad de uso del Servicio. La responsabilidad agregada, cuando sea legalmente limitable, no excederá el monto pagado por el Usuario por el Servicio durante los doce (12) meses previos al evento que originó el reclamo. Esta limitación no aplica a responsabilidad que no pueda excluirse o limitarse bajo la ley ecuatoriana, dolo, culpa grave, violaciones a derechos irrenunciables del consumidor o daños a la salud causados directamente por actos propios legalmente imputables.",
      ],
    },
    {
      title: "20. Indemnidad",
      body: [
        "El Usuario mantendrá indemne a SUCOSTRUCT frente a reclamos, sanciones, daños, costos y gastos derivados de su incumplimiento de estos Términos, uso indebido del Servicio, vulneración de derechos de terceros o infracción de ley, en la medida permitida por la normativa aplicable.",
      ],
    },
    {
      title: "21. Comercio electrónico, mensajes de datos y consentimiento",
      body: [
        "El Usuario acepta que contratos, consentimientos, avisos, registros de aceptación, comunicaciones, recibos, actualizaciones, soportes y notificaciones puedan realizarse por medios electrónicos y mensajes de datos, con los efectos reconocidos por la Ley de Comercio Electrónico, Firmas Electrónicas y Mensajes de Datos y demás normativa aplicable.",
      ],
    },
    {
      title: "22. Exportaciones y sanciones",
      body: [
        "El Usuario declara que no se encuentra en jurisdicciones sancionadas, listas restrictivas o situaciones que prohíban el uso del Servicio bajo normas aplicables de comercio internacional, sanciones o control de exportaciones. SUCOSTRUCT puede negar o suspender el acceso cuando razonablemente sea necesario para cumplir obligaciones legales o de proveedores.",
      ],
    },
    {
      title: "23. Fuerza mayor",
      body: [
        "SUCOSTRUCT no será responsable por retrasos, interrupciones o incumplimientos causados por eventos fuera de su control razonable, incluyendo fallas de proveedores de nube, internet, telecomunicaciones, ciberataques, desastres naturales, pandemias, actos gubernamentales, conflictos, huelgas, fallas eléctricas o eventos de fuerza mayor o caso fortuito.",
      ],
    },
    {
      title: "24. Ley aplicable y jurisdicción",
      body: [
        "Estos Términos se rigen por las leyes de la República del Ecuador. Las partes procurarán resolver disputas de buena fe mediante comunicación previa. Si no se resuelve en treinta (30) días, la controversia se someterá a los jueces competentes de Guayaquil, Ecuador, salvo normas imperativas de protección al consumidor que permitan o exijan otra jurisdicción.",
      ],
    },
    {
      title: "25. Contacto",
      body: [
        "Para notificaciones legales: legal@g-structure.co. Para soporte: support@g-structure.co. Teléfono de soporte: +59398-687-5121. Domicilio: Urb. San Sebastián, Torre B, Dpto. 202, La Aurora, Daule, Ecuador.",
      ],
    },
  ],
};

export const privacyEs: LegalDocument = {
  eyebrow: "SUCOSTRUCT S.A.S. B.I.C. · RUC 0990348675001",
  title: "Política de Privacidad y Protección de Datos Personales",
  subtitle: "KAIRON - producto de SUCOSTRUCT S.A.S. B.I.C.",
  effectiveDate: "16 de julio de 2026",
  version: "1.0",
  contactLabel: "Privacidad y derechos de datos: privacy@g-structure.co. Teléfono de soporte: +59398-687-5121.",
  backLabel: "Volver al inicio",
  backPath: "/",
  sourcesTitle: "Fuentes normativas y criterios usados",
  sources: esSources,
  sections: [
    {
      title: "1. Responsable del tratamiento",
      body: [
        "SUCOSTRUCT S.A.S. B.I.C., RUC 0990348675001, domiciliada en Urb. San Sebastián, La Aurora, Daule, Ecuador, es responsable del tratamiento de los datos personales procesados mediante KAIRON, el sitio g-structure.co y servicios relacionados, conforme a la Ley Orgánica de Protección de Datos Personales de Ecuador y su Reglamento.",
      ],
    },
    {
      title: "2. Datos que tratamos",
      items: [
        "Datos de identificación y cuenta: nombre, email, contraseña cifrada/hasheada, número de contacto, país, idioma, región de facturación y comunicaciones de soporte.",
        "Datos de uso: módulos completados, fechas, frecuencia, sesiones, preferencias, eventos técnicos, interacciones con Escáner, Filtro, Taller, Programas y Nocturno.",
        "Datos proporcionados por el Usuario: textos, respuestas, reflexiones, metas, fricciones, patrones de ejecución, contexto profesional y otros contenidos ingresados voluntariamente.",
        "Datos sensibles: información que pueda revelar aspectos del estado emocional, psicológico, mental, patrones conductuales, voz/audio o datos inferidos de interacciones. Se tratan solo con consentimiento explícito, libre, específico, informado e independiente.",
        "Datos de pago: no almacenamos números completos de tarjeta. Lemon Squeezy, LLC procesa pagos como Merchant of Record y nos entrega metadatos necesarios de suscripción, plan, estado, recibos y región fiscal.",
        "Datos técnicos: IP, dispositivo, navegador, sistema operativo, logs, identificadores de sesión, tokens de notificación, cookies y datos de diagnóstico.",
      ],
    },
    {
      title: "3. Finalidades",
      body: [
        "Crear y administrar cuentas; prestar el Servicio; generar respuestas y reencuadres; mantener memoria entre sesiones cuando el Usuario lo active; procesar pagos; prevenir fraude; brindar soporte; enviar comunicaciones operativas; mejorar el Servicio en forma agregada o anonimizada; cumplir obligaciones legales, tributarias, contables y de consumidor; gestionar seguridad; y cumplir solicitudes de derechos de titulares.",
      ],
    },
    {
      title: "4. Bases de legitimación",
      body: [
        "Usamos consentimiento para datos sensibles, voz, memoria personalizada, comunicaciones no esenciales y analítica no estrictamente necesaria cuando corresponda.",
        "Usamos ejecución contractual para crear cuenta, prestar el Servicio y gestionar suscripciones.",
        "Usamos obligación legal para conservación tributaria, contable, defensa de consumidores, requerimientos de autoridad y cumplimiento normativo.",
        "Usamos interés legítimo de manera limitada para seguridad, prevención de fraude, logs técnicos, mejora agregada y defensa de derechos, sin aplicarlo como base principal para datos sensibles.",
      ],
    },
    {
      title: "5. Datos sensibles y consentimiento separado",
      body: [
        "El Usuario debe aceptar un consentimiento separado antes de que KAIRON trate datos sensibles, memoria entre sesiones o voz. El rechazo o retiro de ese consentimiento puede limitar funciones esenciales de personalización, pero no afectará la licitud del tratamiento anterior al retiro.",
      ],
    },
    {
      title: "6. IA y procesamiento automatizado",
      body: [
        "KAIRON usa modelos de IA para generar respuestas, reencuadres y clasificaciones no clínicas. Estos outputs no producen efectos legales, no determinan derechos, beneficios, empleo, crédito, seguros ni acceso a servicios esenciales. El Usuario puede ignorarlos y solicitar información o revisión humana razonable sobre el tratamiento de sus datos.",
      ],
    },
    {
      title: "7. Encargados, proveedores y terceros",
      body: [
        "Compartimos datos solo cuando es necesario con proveedores de infraestructura, IA, pagos, soporte, notificaciones, analítica, asesores profesionales, autoridades o sucesores corporativos.",
        "Proveedores previstos: AWS/Amazon Bedrock o tecnologías sucesoras; Lemon Squeezy, LLC para pagos; Intercom para soporte; servicios de notificaciones push mediante Web Push (VAPID) y, cuando esté activo, WhatsApp Business; herramientas de analítica si son activadas y consentidas cuando corresponda.",
        "Exigiremos acuerdos, condiciones o medidas razonables para que los encargados traten datos conforme a instrucciones, confidencialidad, seguridad y finalidades autorizadas.",
      ],
    },
    {
      title: "8. Transferencias internacionales",
      body: [
        "Los datos pueden tratarse fuera de Ecuador, incluyendo Estados Unidos u otras jurisdicciones donde operen los proveedores. SUCOSTRUCT aplicará mecanismos permitidos por la LOPDP y su Reglamento, tales como decisiones de adecuación, garantías adecuadas, cláusulas contractuales, contratos de encargado, consentimiento explícito cuando sea necesario o excepciones legales aplicables.",
      ],
    },
    {
      title: "9. Conservación",
      body: [
        "Conservamos datos mientras la cuenta esté activa y por el tiempo necesario para prestar el Servicio, cumplir obligaciones legales, resolver disputas, prevenir fraude y defender derechos. Los registros de facturación pueden conservarse por plazos tributarios/contables aplicables. Los datos sensibles se eliminarán o anonimizarán cuando el Usuario elimine la cuenta o retire el consentimiento, salvo retención legal superior.",
      ],
    },
    {
      title: "10. Seguridad",
      body: [
        "Aplicamos medidas técnicas y organizativas proporcionales al riesgo: cifrado en tránsito, controles de acceso, segregación de funciones, proveedores reputados, registros de seguridad, minimización, copias y monitoreo razonable. Ningún sistema es absolutamente seguro. En caso de vulneración que genere riesgo relevante, notificaremos a la autoridad competente y titulares afectados según la LOPDP.",
      ],
    },
    {
      title: "11. Derechos del titular",
      body: [
        "El Usuario puede ejercer derechos de acceso, rectificación, actualización, eliminación, oposición, portabilidad, suspensión, limitación, retiro del consentimiento y otros reconocidos por la LOPDP y la Constitución. Para ejercerlos, escribir a privacy@g-structure.co. SUCOSTRUCT verificará identidad y responderá en los plazos legales aplicables.",
      ],
    },
    {
      title: "12. Menores de edad",
      body: [
        "El Servicio no está dirigido a menores de 18 años. Si detectamos tratamiento accidental de datos de un menor, eliminaremos la cuenta y datos asociados en la medida posible, salvo obligación legal.",
      ],
    },
    {
      title: "13. Cookies",
      body: [
        "El uso de cookies y tecnologías similares se describe en la Política de Cookies. No usamos cookies para publicidad conductual de terceros salvo que se publique y obtenga consentimiento válido cuando corresponda.",
      ],
    },
    {
      title: "14. Reclamaciones",
      body: [
        "El Usuario puede presentar reclamos ante la Superintendencia de Protección de Datos Personales de Ecuador, sin perjuicio de otros recursos administrativos, constitucionales o judiciales.",
      ],
    },
    {
      title: "15. Contacto",
      body: [
        "Privacidad y derechos de datos: privacy@g-structure.co. Teléfono de soporte: +59398-687-5121. Responsable: SUCOSTRUCT S.A.S. B.I.C., RUC 0990348675001, Urb. San Sebastián, Torre B, Dpto. 202, La Aurora, Daule, Ecuador.",
      ],
    },
  ],
};

export const refundsEs: LegalDocument = {
  eyebrow: "SUCOSTRUCT S.A.S. B.I.C. · RUC 0990348675001",
  title: "Política de Reembolsos y Cancelaciones",
  subtitle: "KAIRON - producto de SUCOSTRUCT S.A.S. B.I.C.",
  effectiveDate: "16 de julio de 2026",
  version: "1.0",
  contactLabel: "Soporte y solicitudes: support@g-structure.co. Teléfono de soporte: +59398-687-5121.",
  backLabel: "Volver al inicio",
  backPath: "/",
  sourcesTitle: "Fuentes normativas y criterios usados",
  sources: esSources,
  sections: [
    {
      title: "1. Ámbito",
      body: [
        "Esta política aplica a suscripciones, pruebas pagadas, planes Pro y otros planes digitales de KAIRON comprados mediante el sitio, aplicación o Lemon Squeezy, LLC. No aplica a servicios personalizados REESTRUCTURA 1:1, Enterprise, consultoría, talleres o contratos B2B, salvo que el acuerdo respectivo lo incorpore.",
      ],
    },
    {
      title: "2. Merchant of Record",
      body: [
        "Lemon Squeezy, LLC puede actuar como Merchant of Record y procesar cobros, impuestos, facturas y devoluciones al método de pago original. SUCOSTRUCT define criterios comerciales de elegibilidad sin limitar derechos irrenunciables del consumidor.",
      ],
    },
    {
      title: "3. Derecho de devolución/cambio en Ecuador",
      body: [
        "Para consumidores en Ecuador, esta política reconoce el derecho de devolución o cambio conforme al Art. 45 de la Ley Orgánica de Defensa del Consumidor, dentro del término de quince (15) días posteriores a la recepción del bien o servicio, siempre que lo permita su naturaleza.",
      ],
    },
    {
      title: "4. Garantía comercial para primera compra",
      body: [
        "Si es la primera vez que el Usuario compra KAIRON Pro, puede solicitar reembolso total dentro de los quince (15) días posteriores al cobro inicial. Esta garantía se aplica una vez por persona, cuenta, método de pago u hogar, y exige una solicitud de buena fe.",
      ],
    },
    {
      title: "5. Renovaciones",
      body: [
        "Las renovaciones mensuales ya iniciadas normalmente no son reembolsables, salvo que: (i) el Usuario no haya usado el Servicio en ese periodo y solicite reembolso dentro de siete (7) días del cobro; (ii) exista error de facturación; (iii) exista cobro no autorizado comprobado; (iv) la ley aplicable exija reembolso; o (v) SUCOSTRUCT decida otorgarlo por equidad comercial.",
      ],
    },
    {
      title: "6. Precio fundador",
      body: [
        "Si el Usuario recibe reembolso de la primera compra, la suscripción se cancela. Al reactivar posteriormente, no se garantiza mantener el precio fundador salvo decisión expresa de SUCOSTRUCT o ventana de gracia publicada.",
      ],
    },
    {
      title: "7. Cancelación",
      body: [
        "Cancelar evita cobros futuros, pero no implica automáticamente reembolso de periodos ya pagados. El Usuario conserva acceso hasta el final del periodo vigente salvo terminación por incumplimiento grave o fraude.",
      ],
    },
    {
      title: "8. Casos no reembolsables",
      items: [
        "Uso sustancial del Servicio durante el periodo facturado, fuera de ventanas de garantía o derechos legales.",
        "Incumplimiento de Términos, abuso, fraude, chargeback indebido o cuenta terminada por uso prohibido.",
        "Servicios personalizados, consultoría o Enterprise sujetos a contrato separado.",
        "Solicitudes fuera de plazo, salvo derecho legal imperativo.",
      ],
    },
    {
      title: "9. Cómo solicitar",
      body: [
        "Enviar solicitud a support@g-structure.co, o llamar al +59398-687-5121, con email de cuenta, recibo o datos de compra, motivo y fecha del cobro. También puede usarse el enlace de soporte/reembolso de Lemon Squeezy, LLC. Responderemos en un plazo comercial razonable, procurando hacerlo dentro de cinco (5) días hábiles.",
      ],
    },
    {
      title: "10. Tiempos de procesamiento",
      body: [
        "Los reembolsos aprobados son procesados por Lemon Squeezy, LLC o el proveedor de pago. El reflejo bancario puede tardar entre cinco (5) y diez (10) días hábiles, o más según banco/emisor.",
      ],
    },
    {
      title: "11. Chargebacks",
      body: [
        "Antes de iniciar contracargo, pedimos contactar a soporte. Un contracargo sin intento de resolución puede ocasionar suspensión temporal mientras se investiga, sin afectar derechos irrenunciables del consumidor.",
      ],
    },
  ],
};

export const termsEn: LegalDocument = {
  eyebrow: "SUCOSTRUCT S.A.S. B.I.C. · RUC 0990348675001",
  title: "Terms and Conditions of Use",
  subtitle: "KAIRON - a product of SUCOSTRUCT S.A.S. B.I.C.",
  effectiveDate: "July 16, 2026",
  version: "1.0",
  bindingNotice:
    "The Spanish version of these Terms is the legally binding version for consumers located in Ecuador. This English version is provided for the convenience of international users and, unless expressly stated otherwise or required by mandatory law, does not modify the scope of the Spanish version.",
  contactLabel: "Legal notices: legal@g-structure.co. Support: support@g-structure.co. Support phone: +59398-687-5121.",
  backLabel: "Back to home",
  backPath: "/en",
  sourcesTitle: "Legal sources and criteria used",
  sources: enSources,
  sections: [
    {
      title: "1. Acceptance of the Terms",
      body: [
        "These Terms and Conditions of Use govern access to and use of KAIRON, the progressive web application, the g-structure.co website, subdomains, tools, content, modules, beta features, support channels, and related services offered by SUCOSTRUCT S.A.S. B.I.C., a simplified stock company of benefit and collective interest incorporated under the laws of the Republic of Ecuador, with RUC 0990348675001 and address at Urb. San Sebastián, Torre B, Dpto. 202, La Aurora, Daule, Ecuador.",
        "By creating an account, accessing, using the Service, starting a trial, accepting a consent, completing a purchase, or continuing to use the Service, the User declares that they have read, understood, and accepted these Terms, the Privacy Policy, the Refund Policy, the Cookie Policy, and any applicable additional notices or consents.",
        "If the User does not accept these Terms, the User must not use the Service.",
      ],
    },
    {
      title: "2. Language and binding version",
      body: [
        "The Spanish version of these Terms is the legally binding version for consumers located in Ecuador. This English version is provided for the convenience of international users and, unless expressly stated otherwise or required by mandatory law, does not modify the scope of the Spanish version.",
      ],
    },
    {
      title: "3. Nature of the Service",
      body: [
        "KAIRON is a digital tool for self-guided support, non-clinical cognitive-behavioral coaching, and professional execution optimization. It uses structured flows and AI assistance to help the User identify, reframe, and work through execution-friction patterns such as procrastination, perfectionism, self-sabotage, and impostor thoughts.",
        "KAIRON is not a medical, psychological, psychiatric, psychotherapeutic, emergency, clinical diagnostic, healthcare, telemedicine, or professional-care substitute service. The Service does not create a therapist-patient, doctor-patient, psychologist-patient, lawyer-client, financial-advisor-client, or any other regulated professional relationship.",
      ],
    },
    {
      title: "4. Crisis and emergency warning",
      body: [
        "If the User is experiencing a medical emergency, suicidal ideation, risk of self-harm, violence, mental-health crisis, or any situation requiring immediate assistance, the User must stop using the Service and contact emergency services, crisis lines, or qualified professionals in their country. SUCOSTRUCT assumes no responsibility for use of the Service as a substitute for emergency assistance or professional care.",
      ],
    },
    {
      title: "5. Age and legal capacity requirements",
      body: [
        "The Service is intended exclusively for people who are 18 years of age or older, or the applicable age of majority in their jurisdiction if higher. By using the Service, the User declares that they have sufficient legal capacity to contract. We do not intentionally collect data from minors.",
      ],
    },
    {
      title: "6. Account, credentials, and personal use",
      body: [
        "The User must provide accurate, current, and complete information when creating an account and must keep it updated.",
        "The account is personal, individual, non-transferable, and may not be shared, sublicensed, resold, or made available to third parties without written authorization from SUCOSTRUCT.",
        "The User is responsible for protecting their credentials and for all activity performed from their account, except unauthorized access directly attributable to SUCOSTRUCT security failures.",
      ],
    },
    {
      title: "7. Plans, pricing, subscriptions, and automatic renewal",
      body: [
        "KAIRON may offer free plans, paid plans, trials, beta versions, founder plans, Pro plans, Enterprise plans, or other modalities published on the pricing page or in a commercial proposal.",
        "Subscriptions are billed in advance and renew automatically for successive periods unless cancelled before the renewal date. The User authorizes recurring charges through the applicable payment provider.",
        "When required by law or good commercial practice, SUCOSTRUCT may send renewal reminders, price changes, or material-condition notices with reasonable advance notice.",
      ],
    },
    {
      title: "8. Payment provider and Merchant of Record",
      body: [
        "Purchases may be processed by Lemon Squeezy, LLC or its affiliates as Merchant of Record. Lemon Squeezy, LLC may act as authorized seller, issue invoices/receipts, collect and remit applicable taxes, process approved refunds, and apply its own terms and policies to the payment process. In the event of a conflict strictly related to payment mechanics, Lemon Squeezy, LLC's terms will prevail for that matter; for the Service, content, account, intellectual property, acceptable use, and liability, these Terms prevail.",
      ],
    },
    {
      title: "9. Cancellation and failed payments",
      body: [
        "The User may cancel the subscription from the account, billing portal, or channel indicated by SUCOSTRUCT/Lemon Squeezy, LLC. Cancellation prevents future charges and normally takes effect at the end of the already-paid period.",
        "If a renewal charge fails, access to paid features may be maintained during a grace period, limited, or suspended. SUCOSTRUCT or Lemon Squeezy, LLC may retry the charge and notify the User. Non-payment may result in suspension or termination of the subscription.",
      ],
    },
    {
      title: "10. Refunds",
      body: [
        "Refunds are governed by the Refunds and Cancellations Policy. Nothing in these Terms limits non-waivable consumer rights under Ecuador's Organic Consumer Defense Law or any other applicable mandatory rule.",
      ],
    },
    {
      title: "11. User Content and limited license",
      body: [
        "The User retains ownership of texts, responses, reflections, audio, data, and other materials voluntarily entered into the Service.",
        "The User grants SUCOSTRUCT a limited, non-exclusive, worldwide license, revocable under the terms of the Privacy Policy and necessary to host, process, analyze, transform, generate responses, maintain history, offer memory between sessions, provide support, secure, and improve the Service for the User.",
        "SUCOSTRUCT will not sell User Content or use it to train third-party models outside the infrastructure and purposes described in the Privacy Policy without separate, explicit, and informed consent when required.",
      ],
    },
    {
      title: "12. SUCOSTRUCT intellectual property",
      body: [
        "The Service, software, design, interfaces, flows, brand, logos, texts, prompts, conversational architecture, I-R-O methodology (Identify, Reframe, Optimize), Scanner, Filter, Workshop, Programs, Night Mode, Daily Activator, cognitive classifications, non-clinical diagnostic models, UX structure, documentation, know-how, trade secrets, and other assets are owned by SUCOSTRUCT or its licensors.",
        "The User does not acquire rights over those assets, except for a limited, revocable, non-exclusive, non-transferable license to use the Service in accordance with these Terms.",
        "It is prohibited to copy, extract, reproduce, adapt, publish, register, commercially exploit, train models, create datasets, perform competitive benchmarking, reverse engineer, or develop competing products based on the Service's structure, methodology, systematic outputs, or prompts, unless authorized in writing or permitted by mandatory law.",
      ],
    },
    {
      title: "13. Acceptable use and security",
      body: [
        "The User agrees not to use the Service for unlawful, abusive, fraudulent, discriminatory, defamatory, invasive, harassing, exploitative, harmful, disinformation, or rights-violating purposes.",
        "The User is prohibited from attempting to access unauthorized systems, bypassing security measures, performing scraping, massive crawling, abusive automation, attacks, malware uploads, prompt injection, jailbreaks, prompt extraction, unauthorized vulnerability testing, or interfering with the integrity of the Service.",
        "SUCOSTRUCT may monitor usage patterns and apply reasonable measures to prevent abuse, fraud, security risks, or violations, respecting the Privacy Policy and applicable regulations.",
      ],
    },
    {
      title: "14. Artificial intelligence, accuracy, and User decisions",
      body: [
        "AI-generated responses are probabilistic and may contain errors, omissions, biases, inadequate interpretations, or incomplete information. They should not be treated as absolute truth or professional advice.",
        "The User is responsible for evaluating the relevance of suggestions and for their own decisions, conduct, and results. KAIRON does not guarantee personal, professional, emotional, clinical, financial, academic, commercial, or employment outcomes.",
      ],
    },
    {
      title: "15. Third-party services",
      body: [
        "The Service may depend on providers such as AWS, Amazon Bedrock or successor models, Lemon Squeezy, LLC, Intercom, push-notification services, analytics, hosting, support, or infrastructure. SUCOSTRUCT does not control all actions of independent third parties, but will seek to use reputable providers and appropriate contracts when they act as processors.",
      ],
    },
    {
      title: "16. Beta features and Service changes",
      body: [
        "SUCOSTRUCT may launch beta, experimental, free, or validation features. These may be incomplete, contain errors, change, be limited, or be withdrawn. No beta feature constitutes a guarantee of future availability unless otherwise agreed in writing.",
      ],
    },
    {
      title: "17. Suspension and termination",
      body: [
        "SUCOSTRUCT may suspend or terminate access if there is a breach of these Terms, security risk, fraud, abusive use, legal obligation, non-payment, User request, or discontinuation of the Service. Intellectual property, confidentiality, liability limitations, indemnity, pending payments, privacy, and dispute-resolution obligations survive to the extent necessary.",
      ],
    },
    {
      title: "18. Warranty disclaimers",
      body: [
        "To the maximum extent permitted by applicable law, the Service is provided as is and as available. SUCOSTRUCT does not guarantee that the Service will be uninterrupted, error-free, free of vulnerabilities, compatible with all devices, or produce specific results. Nothing limits non-waivable rights or warranties under Ecuador's Organic Consumer Defense Law or any other mandatory rule.",
      ],
    },
    {
      title: "19. Limitation of liability",
      body: [
        "To the maximum extent permitted by law, SUCOSTRUCT, its founders, directors, employees, contractors, and affiliates will not be liable for indirect, incidental, special, consequential damages, lost profits, data loss, reputation loss, or results arising from use or inability to use the Service. Aggregate liability, where legally limitable, will not exceed the amount paid by the User for the Service during the twelve (12) months prior to the event giving rise to the claim. This limitation does not apply to liability that cannot be excluded or limited under Ecuadorian law, willful misconduct, gross negligence, violations of non-waivable consumer rights, or harm to health caused directly by legally attributable acts.",
      ],
    },
    {
      title: "20. Indemnity",
      body: [
        "The User will hold SUCOSTRUCT harmless against claims, penalties, damages, costs, and expenses arising from breach of these Terms, misuse of the Service, violation of third-party rights, or violation of law, to the extent permitted by applicable regulations.",
      ],
    },
    {
      title: "21. Electronic commerce, data messages, and consent",
      body: [
        "The User agrees that contracts, consents, notices, acceptance records, communications, receipts, updates, support, and notifications may be made by electronic means and data messages, with the effects recognized by Ecuador's Electronic Commerce, Electronic Signatures and Data Messages Law and other applicable regulations.",
      ],
    },
    {
      title: "22. Exports and sanctions",
      body: [
        "The User declares that they are not located in sanctioned jurisdictions, restricted lists, or situations that prohibit use of the Service under applicable international trade, sanctions, or export-control rules. SUCOSTRUCT may deny or suspend access when reasonably necessary to comply with legal or provider obligations.",
      ],
    },
    {
      title: "23. Force majeure",
      body: [
        "SUCOSTRUCT will not be liable for delays, interruptions, or failures caused by events outside its reasonable control, including failures of cloud providers, internet, telecommunications, cyberattacks, natural disasters, pandemics, governmental acts, conflicts, strikes, electrical failures, or events of force majeure or acts of God.",
      ],
    },
    {
      title: "24. Governing law and jurisdiction",
      body: [
        "These Terms are governed by the laws of the Republic of Ecuador. The parties will seek to resolve disputes in good faith through prior communication. If not resolved within thirty (30) days, the dispute will be submitted to the competent judges of Guayaquil, Ecuador, except where mandatory consumer-protection rules allow or require another jurisdiction.",
      ],
    },
    {
      title: "25. Contact",
      body: [
        "Legal notices: legal@g-structure.co. Support: support@g-structure.co. Support phone: +59398-687-5121. Address: Urb. San Sebastián, Torre B, Dpto. 202, La Aurora, Daule, Ecuador.",
      ],
    },
  ],
};

export const privacyEn: LegalDocument = {
  eyebrow: "SUCOSTRUCT S.A.S. B.I.C. · RUC 0990348675001",
  title: "Privacy and Personal Data Protection Policy",
  subtitle: "KAIRON - a product of SUCOSTRUCT S.A.S. B.I.C.",
  effectiveDate: "July 16, 2026",
  version: "1.0",
  contactLabel: "Privacy and data-rights requests: privacy@g-structure.co. Support phone: +59398-687-5121.",
  backLabel: "Back to home",
  backPath: "/en",
  sourcesTitle: "Legal sources and criteria used",
  sources: enSources,
  sections: [
    {
      title: "1. Controller",
      body: [
        "SUCOSTRUCT S.A.S. B.I.C., RUC 0990348675001, domiciled at Urb. San Sebastián, La Aurora, Daule, Ecuador, is the controller of personal data processed through KAIRON, the g-structure.co website, and related services, in accordance with Ecuador's Organic Law on Personal Data Protection and its Regulation.",
      ],
    },
    {
      title: "2. Data we process",
      items: [
        "Identification and account data: name, email, encrypted/hashed password, contact number, country, language, billing region, and support communications.",
        "Usage data: completed modules, dates, frequency, sessions, preferences, technical events, interactions with Scanner, Filter, Workshop, Programs, and Night Mode.",
        "Data provided by the User: texts, responses, reflections, goals, frictions, execution patterns, professional context, and other content entered voluntarily.",
        "Sensitive data: information that may reveal aspects of emotional, psychological, or mental state, behavioral patterns, voice/audio, or data inferred from interactions. This data is processed only with explicit, free, specific, informed, and independent consent.",
        "Payment data: we do not store full card numbers. Lemon Squeezy, LLC processes payments as Merchant of Record and provides us with necessary subscription, plan, status, receipt, and tax-region metadata.",
        "Technical data: IP, device, browser, operating system, logs, session identifiers, notification tokens, cookies, and diagnostic data.",
      ],
    },
    {
      title: "3. Purposes",
      body: [
        "To create and administer accounts; provide the Service; generate responses and reframes; maintain memory between sessions when enabled by the User; process payments; prevent fraud; provide support; send operational communications; improve the Service in aggregated or anonymized form; comply with legal, tax, accounting, and consumer obligations; manage security; and respond to data-subject rights requests.",
      ],
    },
    {
      title: "4. Legal bases",
      body: [
        "We use consent for sensitive data, voice, personalized memory, non-essential communications, and analytics that are not strictly necessary when applicable.",
        "We use contractual necessity to create accounts, provide the Service, and manage subscriptions.",
        "We use legal obligation for tax and accounting retention, consumer defense, authority requests, and regulatory compliance.",
        "We use legitimate interest in a limited manner for security, fraud prevention, technical logs, aggregated improvement, and rights defense, without using it as the main basis for sensitive data.",
      ],
    },
    {
      title: "5. Sensitive data and separate consent",
      body: [
        "The User must accept a separate consent before KAIRON processes sensitive data, memory between sessions, or voice. Refusing or withdrawing that consent may limit essential personalization features, but it will not affect the lawfulness of processing carried out before withdrawal.",
      ],
    },
    {
      title: "6. AI and automated processing",
      body: [
        "KAIRON uses AI models to generate responses, reframes, and non-clinical classifications. These outputs do not produce legal effects and do not determine rights, benefits, employment, credit, insurance, or access to essential services. The User may ignore them and request reasonable information or human review regarding the processing of their data.",
      ],
    },
    {
      title: "7. Processors, providers, and third parties",
      body: [
        "We share data only when necessary with infrastructure, AI, payment, support, notification, analytics providers, professional advisors, authorities, or corporate successors.",
        "Expected providers include AWS/Amazon Bedrock or successor technologies; Lemon Squeezy, LLC for payments; Intercom for support; push-notification services through Web Push (VAPID) and, when active, WhatsApp Business; and analytics tools if activated and consented to when applicable.",
        "We will require agreements, conditions, or reasonable measures so processors process data according to instructions, confidentiality, security, and authorized purposes.",
      ],
    },
    {
      title: "8. International transfers",
      body: [
        "Data may be processed outside Ecuador, including in the United States or other jurisdictions where providers operate. SUCOSTRUCT will apply mechanisms permitted by the LOPDP and its Regulation, such as adequacy decisions, appropriate safeguards, contractual clauses, processor agreements, explicit consent when necessary, or applicable legal exceptions.",
      ],
    },
    {
      title: "9. Retention",
      body: [
        "We retain data while the account is active and for the time necessary to provide the Service, comply with legal obligations, resolve disputes, prevent fraud, and defend rights. Billing records may be retained for applicable tax/accounting periods. Sensitive data will be deleted or anonymized when the User deletes the account or withdraws consent, unless a superior legal retention obligation applies.",
      ],
    },
    {
      title: "10. Security",
      body: [
        "We apply technical and organizational measures proportionate to risk: encryption in transit, access controls, segregation of duties, reputable providers, security records, minimization, backups, and reasonable monitoring. No system is absolutely secure. In case of a breach that creates relevant risk, we will notify the competent authority and affected data subjects according to the LOPDP.",
      ],
    },
    {
      title: "11. Data-subject rights",
      body: [
        "The User may exercise rights of access, rectification, update, deletion, objection, portability, suspension, limitation, withdrawal of consent, and other rights recognized by the LOPDP and the Constitution. To exercise them, write to privacy@g-structure.co. SUCOSTRUCT will verify identity and respond within the applicable legal deadlines.",
      ],
    },
    {
      title: "12. Minors",
      body: [
        "The Service is not directed to people under 18 years old. If we detect accidental processing of a minor's data, we will delete the account and associated data to the extent possible, unless a legal obligation applies.",
      ],
    },
    {
      title: "13. Cookies",
      body: [
        "The use of cookies and similar technologies is described in the Cookie Policy. We do not use cookies for third-party behavioral advertising unless published and valid consent is obtained when applicable.",
      ],
    },
    {
      title: "14. Complaints",
      body: [
        "The User may file complaints with Ecuador's Personal Data Protection Superintendence, without prejudice to other administrative, constitutional, or judicial remedies.",
      ],
    },
    {
      title: "15. Contact",
      body: [
        "Privacy and data rights: privacy@g-structure.co. Support phone: +59398-687-5121. Controller: SUCOSTRUCT S.A.S. B.I.C., RUC 0990348675001, Urb. San Sebastián, Torre B, Dpto. 202, La Aurora, Daule, Ecuador.",
      ],
    },
  ],
};

export const refundsEn: LegalDocument = {
  eyebrow: "SUCOSTRUCT S.A.S. B.I.C. · RUC 0990348675001",
  title: "Refunds and Cancellations Policy",
  subtitle: "KAIRON - a product of SUCOSTRUCT S.A.S. B.I.C.",
  effectiveDate: "July 16, 2026",
  version: "1.0",
  contactLabel: "Support and requests: support@g-structure.co. Support phone: +59398-687-5121.",
  backLabel: "Back to home",
  backPath: "/en",
  sourcesTitle: "Legal sources and criteria used",
  sources: enSources,
  sections: [
    {
      title: "1. Scope",
      body: [
        "This policy applies to subscriptions, paid trials, Pro plans, and other digital KAIRON plans purchased through the website, application, or Lemon Squeezy, LLC. It does not apply to personalized REESTRUCTURA 1:1 services, Enterprise, consulting, workshops, or B2B contracts unless the respective agreement incorporates it.",
      ],
    },
    {
      title: "2. Merchant of Record",
      body: [
        "Lemon Squeezy, LLC may act as Merchant of Record and process charges, taxes, invoices, and refunds to the original payment method. SUCOSTRUCT defines commercial eligibility criteria without limiting non-waivable consumer rights.",
      ],
    },
    {
      title: "3. Return/exchange right in Ecuador",
      body: [
        "For consumers in Ecuador, this policy recognizes the right of return or exchange under Article 45 of Ecuador's Organic Consumer Defense Law, within fifteen (15) days after receipt of the good or service, provided its nature allows it.",
      ],
    },
    {
      title: "4. Commercial guarantee for first purchase",
      body: [
        "If this is the first time the User purchases KAIRON Pro, the User may request a full refund within fifteen (15) days after the initial charge. This guarantee applies once per person, account, payment method, or household, and requires a good-faith request.",
      ],
    },
    {
      title: "5. Renewals",
      body: [
        "Monthly renewals already started are normally non-refundable, unless: (i) the User has not used the Service during that period and requests a refund within seven (7) days of the charge; (ii) there is a billing error; (iii) there is a proven unauthorized charge; (iv) applicable law requires a refund; or (v) SUCOSTRUCT decides to grant it as a matter of commercial equity.",
      ],
    },
    {
      title: "6. Founder price",
      body: [
        "If the User receives a refund for the first purchase, the subscription is cancelled. Upon later reactivation, the founder price is not guaranteed unless expressly decided by SUCOSTRUCT or a grace window is published.",
      ],
    },
    {
      title: "7. Cancellation",
      body: [
        "Cancellation prevents future charges, but does not automatically imply a refund for already-paid periods. The User retains access until the end of the current period unless terminated for serious breach or fraud.",
      ],
    },
    {
      title: "8. Non-refundable cases",
      items: [
        "Substantial use of the Service during the billed period, outside guarantee windows or legal rights.",
        "Breach of Terms, abuse, fraud, improper chargeback, or account terminated for prohibited use.",
        "Personalized services, consulting, or Enterprise subject to separate contract.",
        "Requests outside the applicable deadline, except for mandatory legal rights.",
      ],
    },
    {
      title: "9. How to request",
      body: [
        "Send a request to support@g-structure.co, or call +59398-687-5121, with the account email, receipt or purchase details, reason, and charge date. The Lemon Squeezy, LLC support/refund link may also be used. We will respond within a commercially reasonable time, seeking to do so within five (5) business days.",
      ],
    },
    {
      title: "10. Processing times",
      body: [
        "Approved refunds are processed by Lemon Squeezy, LLC or the payment provider. Bank reflection may take between five (5) and ten (10) business days, or longer depending on the bank/card issuer.",
      ],
    },
    {
      title: "11. Chargebacks",
      body: [
        "Before initiating a chargeback, we ask Users to contact support. A chargeback without an attempt to resolve may cause temporary suspension while investigated, without affecting non-waivable consumer rights.",
      ],
    },
  ],
};
