import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { Eyebrow } from "@/components/site/Eyebrow";
import { buildSeo, canonicalLink, jsonLdScript, breadcrumbSchema } from "@/lib/seo";
import { AlertTriangle } from "lucide-react";

const LAST_UPDATED = "9 de mayo de 2026";

export const Route = createFileRoute("/politicas-legales")({
  head: () => ({
    meta: buildSeo({
      path: "/politicas-legales",
      title: "Políticas Legales | G-Structure",
      description:
        "Política de Privacidad, Tratamiento de Datos Personales, Términos y Condiciones, Cookies y Disclaimers de G-Structure y G-Struct, bajo legislación ecuatoriana.",
    }),
    links: canonicalLink("/politicas-legales"),
    scripts: [
      jsonLdScript(
        breadcrumbSchema([
          { name: "Inicio", path: "/" },
          { name: "Políticas Legales", path: "/politicas-legales" },
        ]),
      ),
    ],
  }),
  component: Page,
});

const TOC: { id: string; label: string }[] = [
  { id: "introduccion", label: "1. Introducción" },
  { id: "responsable", label: "2. Responsable del tratamiento" },
  { id: "datos", label: "3. Datos personales que recopilamos" },
  { id: "sensibles", label: "4. Datos sensibles" },
  { id: "finalidades", label: "5. Finalidades del tratamiento" },
  { id: "legitimacion", label: "6. Base de legitimación" },
  { id: "conservacion", label: "7. Conservación de datos" },
  { id: "derechos", label: "8. Derechos del titular" },
  { id: "seguridad", label: "9. Seguridad de la información" },
  { id: "encargados", label: "10. Encargados y proveedores" },
  { id: "transferencias", label: "11. Transferencias internacionales" },
  { id: "cookies", label: "12. Cookies y tecnologías similares" },
  { id: "comunicaciones", label: "13. Comunicaciones comerciales" },
  { id: "whatsapp", label: "14. Uso de WhatsApp" },
  { id: "reservas", label: "15. Reservas, pagos y comprobantes" },
  { id: "cancelaciones", label: "16. Cancelaciones y reprogramaciones" },
  { id: "terminos", label: "17. Términos de uso del sitio" },
  { id: "propiedad", label: "18. Propiedad intelectual" },
  { id: "disclaimer", label: "19. Disclaimer: coaching, no terapia" },
  { id: "g-struct", label: "20. Disclaimer G-Struct" },
  { id: "responsabilidad", label: "21. Limitación de responsabilidad" },
  { id: "testimonios", label: "22. Testimonios y resultados" },
  { id: "enlaces", label: "23. Enlaces externos" },
  { id: "menores", label: "24. Menores de edad" },
  { id: "cambios", label: "25. Cambios en las políticas" },
  { id: "ley", label: "26. Legislación aplicable y jurisdicción" },
  { id: "contacto", label: "27. Contacto legal" },
];

function Page() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg opacity-50" aria-hidden />
        <div className="container-x relative py-16 md:py-24">
          <Eyebrow>POLÍTICAS LEGALES</Eyebrow>
          <h1 className="mt-6 max-w-3xl font-display text-3xl md:text-5xl leading-[1.05]">
            Políticas legales de G-Structure y G-Struct
          </h1>
          <p className="mt-6 max-w-3xl text-base md:text-lg text-muted-foreground leading-relaxed">
            Esta página reúne la Política de Privacidad, Política de Tratamiento de Datos
            Personales, Términos y Condiciones, Disclaimer profesional, Política de Cookies y
            condiciones de uso de los servicios digitales de G-Structure y G-Struct.
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            Última actualización: {LAST_UPDATED}.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* TOC */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <p className="eyebrow mb-4">Índice</p>
              <nav className="border border-border bg-[color:var(--color-surface)] divide-y divide-border">
                {TOC.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="block px-4 py-2.5 text-[13px] text-foreground/85 hover:bg-[color:var(--color-brand-soft)]/40"
                  >
                    {s.label}
                  </a>
                ))}
              </nav>

              <div className="mt-6 border border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/10 p-4 text-xs text-foreground/80">
                <div className="flex items-start gap-2">
                  <AlertTriangle size={14} className="mt-0.5 text-amber-700 shrink-0" />
                  <p>
                    Este documento tiene fines informativos y operativos para el sitio web de
                    G-Structure. Para validación jurídica definitiva, se recomienda revisión por
                    un profesional del derecho habilitado en Ecuador.
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* Content */}
          <article className="lg:col-span-8 space-y-14 text-[15px] leading-relaxed text-foreground/90">
            <Block id="introduccion" title="1. Introducción">
              <p>
                Al utilizar este sitio web, enviar formularios, solicitar información, realizar
                reservas, comunicarse por WhatsApp o correo electrónico, o interactuar con los
                servicios de G-Structure, el usuario declara haber leído y aceptado estas políticas
                en lo que corresponda.
              </p>
              <p>
                Estas políticas se redactan principalmente bajo legislación ecuatoriana —en
                particular la Constitución de la República del Ecuador, la Ley Orgánica de
                Protección de Datos Personales (LOPDP) y su Reglamento, la Ley de Comercio
                Electrónico, Firmas Electrónicas y Mensajes de Datos, y la Ley Orgánica de Defensa
                del Consumidor— y, de forma complementaria, considerando estándares
                internacionales como el Reglamento General de Protección de Datos (GDPR) cuando
                resulte aplicable.
              </p>
            </Block>

            <Block id="responsable" title="2. Responsable del tratamiento">
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Responsable:</strong> G-Structure</li>
                <li><strong>Titular:</strong> José Guillermo Suco Gómez</li>
                <li><strong>País:</strong> Ecuador</li>
                <li><strong>Email:</strong> <a className="underline" href="mailto:guillermo@g-structure.co">guillermo@g-structure.co</a></li>
                <li><strong>WhatsApp:</strong> <a className="underline" href="https://wa.me/593986875121">+593 98 687 5121</a></li>
                <li><strong>Website:</strong> www.g-structure.co</li>
              </ul>
            </Block>

            <Block id="datos" title="3. Datos personales que podemos recopilar">
              <p>Según el canal y el servicio, podremos recopilar:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Nombre y apellido.</li>
                <li>Correo electrónico.</li>
                <li>Teléfono o WhatsApp.</li>
                <li>Empresa o institución, cargo y país/ciudad.</li>
                <li>Datos de facturación (cédula/RUC, dirección, razón social).</li>
                <li>Información ingresada en formularios y mensajes enviados por email o WhatsApp.</li>
                <li>Datos de reserva: fecha, hora, paquete, notas voluntarias.</li>
                <li>Comprobantes de pago y referencias bancarias.</li>
                <li>Preferencias de contacto.</li>
                <li>Información técnica: navegador, dispositivo, dirección IP, cookies, páginas visitadas, métricas de analytics.</li>
                <li>Datos ingresados al interactuar con G-Struct, cuando esté disponible.</li>
              </ul>
            </Block>

            <Block id="sensibles" title="4. Datos sensibles">
              <p>
                G-Structure no solicita deliberadamente datos sensibles. Se recomienda no enviar
                información médica, diagnósticos, datos clínicos, historial psicológico,
                información psiquiátrica u otros datos sensibles a través de formularios generales
                del sitio.
              </p>
              <p>
                Si el usuario comparte información sensible voluntariamente, será tratada con
                confidencialidad, minimización y únicamente para el contexto de comunicación o
                servicio solicitado, salvo obligación legal.
              </p>
            </Block>

            <Block id="finalidades" title="5. Finalidades del tratamiento">
              <ul className="list-disc pl-5 space-y-1">
                <li>Responder consultas y gestionar reservas.</li>
                <li>Coordinar sesiones, workshops o programas.</li>
                <li>Enviar información comercial solicitada y comunicaciones administrativas (confirmaciones, recordatorios).</li>
                <li>Emitir facturas y gestionar pagos por transferencia bancaria.</li>
                <li>Validar comprobantes de pago.</li>
                <li>Mejorar el sitio web y analizar tráfico y comportamiento de navegación.</li>
                <li>Gestionar la lista de espera de G-Struct.</li>
                <li>Gestionar postulaciones de colaboradores voluntarios, alianzas y sponsors.</li>
                <li>Cumplir obligaciones legales y proteger derechos e intereses legítimos.</li>
              </ul>
            </Block>

            <Block id="legitimacion" title="6. Base de legitimación">
              <p>
                El tratamiento se basa, según el caso, en: el consentimiento del titular; la
                ejecución de medidas precontractuales o contractuales solicitadas; el cumplimiento
                de obligaciones legales aplicables; el interés legítimo del responsable cuando
                corresponda; y la protección de derechos del titular o del responsable.
              </p>
            </Block>

            <Block id="conservacion" title="7. Conservación de datos">
              <p>
                Los datos se conservarán durante el tiempo necesario para cumplir las finalidades
                informadas, así como las obligaciones legales, fiscales, contables, contractuales o
                de defensa ante reclamaciones. El usuario puede solicitar la eliminación cuando
                legalmente corresponda.
              </p>
            </Block>

            <Block id="derechos" title="8. Derechos del titular de datos">
              <p>De conformidad con la LOPDP, el titular podrá ejercer los derechos de:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Acceso.</li>
                <li>Rectificación y actualización.</li>
                <li>Eliminación.</li>
                <li>Oposición.</li>
                <li>Portabilidad.</li>
                <li>Suspensión o limitación del tratamiento, cuando corresponda.</li>
                <li>Revocatoria del consentimiento.</li>
                <li>No ser objeto de decisiones automatizadas sin garantías adecuadas, cuando aplique.</li>
              </ul>
              <p>
                Para ejercer estos derechos: enviar solicitud a{" "}
                <a className="underline" href="mailto:guillermo@g-structure.co">guillermo@g-structure.co</a>{" "}
                con asunto <em>“Solicitud de derechos de datos personales”</em>. La solicitud
                deberá permitir verificar la identidad del titular y especificar el derecho que
                desea ejercer.
              </p>
            </Block>

            <Block id="seguridad" title="9. Seguridad de la información">
              <p>
                G-Structure adopta medidas razonables —técnicas, organizativas y administrativas—
                para proteger la información contra acceso no autorizado, pérdida, alteración, uso
                indebido o divulgación no autorizada. Ningún sistema es completamente infalible,
                por lo que no se puede garantizar seguridad absoluta.
              </p>
            </Block>

            <Block id="encargados" title="10. Encargados y proveedores tecnológicos">
              <p>
                Para operar el sitio y los servicios pueden utilizarse herramientas externas como:
                hosting y plataforma de despliegue (Lovable Cloud), proveedores de email,
                WhatsApp/Meta, Google Calendar, herramientas de analytics, herramientas de
                automatización, herramientas de video y, en el futuro, herramientas de pago o
                facturación electrónica.
              </p>
              <p>
                Estos proveedores pueden tratar datos como encargados o terceros tecnológicos bajo
                sus propias políticas y medidas de seguridad.
              </p>
            </Block>

            <Block id="transferencias" title="11. Transferencias internacionales">
              <p>
                Algunos proveedores tecnológicos pueden alojar o procesar información fuera de
                Ecuador. Al utilizar el sitio y los servicios digitales, el usuario entiende que
                ciertos datos pueden ser transferidos internacionalmente cuando sea necesario para
                la prestación del servicio. Se procurará usar proveedores con estándares
                razonables de seguridad y privacidad.
              </p>
            </Block>

            <Block id="cookies" title="12. Cookies y tecnologías similares">
              <p>
                El sitio puede usar cookies técnicas, funcionales, analíticas y de rendimiento.
                Las cookies son pequeños archivos que se almacenan en el navegador del usuario y
                permiten reconocer al visitante, recordar preferencias o medir el comportamiento
                de navegación.
              </p>
              <p>
                El usuario puede desactivar o eliminar cookies desde la configuración de su
                navegador. Algunas cookies son necesarias para el correcto funcionamiento del
                sitio; deshabilitarlas puede afectar la experiencia de uso.
              </p>
            </Block>

            <Block id="comunicaciones" title="13. Comunicaciones comerciales">
              <p>
                El usuario puede recibir comunicaciones cuando solicita información, se registra
                en una lista, agenda una reserva, envía un formulario o acepta recibir novedades.
                Puede solicitar dejar de recibir comunicaciones escribiendo a{" "}
                <a className="underline" href="mailto:guillermo@g-structure.co">guillermo@g-structure.co</a>.
              </p>
            </Block>

            <Block id="whatsapp" title="14. Uso de WhatsApp">
              <p>
                Al contactar por WhatsApp, el usuario acepta que la comunicación se realice
                mediante esa plataforma, sujeta también a las políticas de WhatsApp / Meta. No se
                recomienda enviar datos sensibles por WhatsApp salvo que sea estrictamente
                necesario para la solicitud.
              </p>
            </Block>

            <Block id="reservas" title="15. Reservas, pagos y comprobantes">
              <p>
                Las reservas se gestionan mediante el calendario o formulario del sitio. Cuando se
                solicita pago, la reserva se confirma únicamente cuando G-Structure haya recibido y
                validado el pago del anticipo o del valor correspondiente.
              </p>
              <div className="border border-border bg-[color:var(--color-surface)] p-4 text-sm">
                <p className="eyebrow mb-2">Datos para transferencia bancaria</p>
                <ul className="space-y-1">
                  <li>Banco: Banco Bolivariano</li>
                  <li>Tipo: Cuenta de ahorros</li>
                  <li>Número: 1821134449</li>
                  <li>Titular: José Guillermo Suco Gómez</li>
                  <li>Identificación: 0918718834</li>
                </ul>
              </div>
              <p>
                El usuario deberá enviar comprobante por email o WhatsApp junto con datos para
                factura: nombre o razón social, cédula o RUC, dirección, teléfono, email y
                servicio reservado.
              </p>
              <p>
                <strong>Importante:</strong> el envío de una solicitud de reserva no garantiza
                confirmación automática.
              </p>
            </Block>

            <Block id="cancelaciones" title="16. Cancelaciones y reprogramaciones">
              <p>
                Las condiciones específicas de cancelación, reprogramación, anticipos, no
                asistencia o devoluciones serán informadas al momento de la reserva o
                contratación del servicio.
              </p>
              <p>Política general orientativa:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Solicitudes de reprogramación con al menos 24 a 48 horas de anticipación.</li>
                <li>El no-show puede implicar la pérdida del anticipo.</li>
                <li>Las excepciones se evaluarán caso por caso.</li>
              </ul>
            </Block>

            <Block id="terminos" title="17. Términos de uso del sitio">
              <p>El usuario se compromete a:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Usar el sitio de forma lícita.</li>
                <li>No dañar sistemas ni intentar acceder a áreas no autorizadas.</li>
                <li>No copiar contenido sin autorización.</li>
                <li>No usar la marca sin permiso.</li>
                <li>No enviar información falsa.</li>
                <li>No usar formularios para spam.</li>
              </ul>
            </Block>

            <Block id="propiedad" title="18. Propiedad intelectual">
              <p>
                Todos los contenidos del sitio —marca, logos, textos, metodología, nombres
                comerciales, materiales, PDF, presentaciones, diseños, estructura del método I-R-O,
                G-Structure, G-Struct y REESTRUCTURA— son propiedad de su titular o se usan con
                autorización.
              </p>
              <p>
                Queda prohibida su copia, reproducción, distribución, modificación, uso comercial
                no autorizado o uso de marca sin permiso.
              </p>
            </Block>

            <Block id="disclaimer" title="19. G-Structure ofrece coaching, no terapia">
              <div className="border-l-4 border-amber-500 bg-amber-50/40 dark:bg-amber-950/10 p-4 space-y-3">
                <p>
                  G-Structure ofrece servicios de coaching, formación y acompañamiento
                  cognitivo-conductual aplicado a la ejecución. Los servicios{" "}
                  <strong>no constituyen psicoterapia, diagnóstico psicológico, tratamiento
                  médico, tratamiento psiquiátrico ni atención de emergencia</strong>.
                </p>
                <p>
                  G-Structure no sustituye la consulta con profesionales de salud mental, médicos,
                  psicólogos clínicos o psiquiatras.
                </p>
                <p>
                  Si el usuario atraviesa una crisis emocional, ideación suicida, riesgo de daño,
                  emergencia médica o situación clínica que requiera atención especializada, debe
                  buscar ayuda profesional inmediata o acudir a los servicios de emergencia de su
                  país.
                </p>
              </div>
            </Block>

            <Block id="g-struct" title="20. G-Struct no es una herramienta clínica">
              <div className="border-l-4 border-amber-500 bg-amber-50/40 dark:bg-amber-950/10 p-4 space-y-3">
                <p>
                  G-Struct es una herramienta digital en desarrollo con fines educativos,
                  formativos y de coaching. Sus ejercicios, registros, métricas, indicadores o
                  sugerencias <strong>no constituyen diagnóstico, tratamiento ni evaluación
                  clínica</strong>.
                </p>
                <p>
                  Cualquier resultado, indicador o sugerencia debe entenderse como apoyo
                  funcional para reflexión, claridad y ejecución, no como conclusión profesional
                  de salud.
                </p>
              </div>
            </Block>

            <Block id="responsabilidad" title="21. Limitación de responsabilidad">
              <p>
                G-Structure no garantiza resultados específicos. El avance depende de múltiples
                factores, incluyendo participación activa del usuario, contexto, consistencia,
                condiciones externas y naturaleza del problema.
              </p>
              <p>
                G-Structure no será responsable por decisiones tomadas por el usuario con base en
                información general del sitio sin acompañamiento adecuado.
              </p>
            </Block>

            <Block id="testimonios" title="22. Testimonios, resultados y casos">
              <p>
                Cualquier testimonio o caso presentado tendrá fines informativos y no garantiza
                resultados idénticos para otros usuarios.
              </p>
            </Block>

            <Block id="enlaces" title="23. Enlaces externos">
              <p>
                El sitio puede contener enlaces a plataformas externas como Luma, WhatsApp,
                LinkedIn, Instagram, Facebook, Google Calendar u otras. G-Structure no controla
                las políticas de privacidad, términos o prácticas de dichos terceros.
              </p>
            </Block>

            <Block id="menores" title="24. Menores de edad">
              <p>
                Los servicios están dirigidos principalmente a adultos, profesionales, líderes,
                emprendedores, equipos y organizaciones. Si en algún momento se presta servicio a
                menores de edad, se requerirá autorización del representante legal y se aplicarán
                condiciones específicas.
              </p>
            </Block>

            <Block id="cambios" title="25. Cambios en las políticas">
              <p>
                G-Structure podrá actualizar estas políticas. La versión vigente será la
                publicada en este sitio web. Se recomienda revisar esta página periódicamente.
              </p>
            </Block>

            <Block id="ley" title="26. Legislación aplicable y jurisdicción">
              <p>
                Estas políticas se rigen principalmente por las leyes de la República del Ecuador.
                En caso de controversia, las partes procurarán resolverla de buena fe. De no ser
                posible, se sujetarán a los mecanismos y jurisdicción competente conforme a la
                normativa ecuatoriana aplicable.
              </p>
            </Block>

            <Block id="contacto" title="27. Contacto legal">
              <p>
                Para consultas sobre privacidad, datos personales o estas políticas, escribir a:{" "}
                <a className="underline" href="mailto:guillermo@g-structure.co">
                  guillermo@g-structure.co
                </a>
                <br />
                Asunto sugerido: <em>Consulta legal / privacidad G-Structure</em>.
              </p>
              <p className="mt-6 text-xs text-muted-foreground">
                Este documento tiene fines informativos y operativos para el sitio web de
                G-Structure. Para validación jurídica definitiva, se recomienda revisión por un
                profesional del derecho habilitado en Ecuador.
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                <Link to="/" className="underline">Volver al inicio</Link>
              </p>
            </Block>
          </article>
        </div>
      </Section>
    </>
  );
}

function Block({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-4">
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
