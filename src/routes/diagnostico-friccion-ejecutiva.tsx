import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { LIKERT_ITEMS, LIKERT_SCALE, TRIGGERS, EMOTIONS, BEHAVIORS, IMPACT_AREAS, RESPONSIBILITY_LEVELS, MAIN_REASONS, COMPANY_SIZES, SECTORS, DIMENSION_LABEL } from "@/lib/diagnostic/items";
import { computeResults, dimensionLabel, triggerLabel, emotionLabel, behaviorLabel, impactLabel } from "@/lib/diagnostic/scoring";
import { recommendProgram, getMixedProfileForResults, DOMINANT_INTERPRETATIONS, shouldShowEnterprise } from "@/lib/diagnostic/interpretations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/diagnostico-friccion-ejecutiva")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Diagnóstico de Fricción Ejecutiva G-Structure" },
      { name: "description", content: "Diagnóstico privado IGPE V1.1 — Inventario G-Structure de Patrones de Ejecución." },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
});

const WA_INDIVIDUAL = "https://wa.me/593986875121?text=Tom%C3%A9%20el%20Diagn%C3%B3stico%20de%20Fricci%C3%B3n%20Ejecutiva%20y%20deseo%20dar%20el%20siguiente%20paso%20con%20REESTRUCTURA%201%3A1.";
const WA_ENTERPRISE = "https://wa.me/593986875121?text=Tom%C3%A9%20el%20Diagn%C3%B3stico%20de%20Fricci%C3%B3n%20Ejecutiva%20y%20quiero%20conocer%20REESTRUCTURA%20Enterprise%20para%20mi%20empresa.";

type Step = "landing" | "intake" | "likert" | "triggers" | "emotions" | "behaviors" | "impact" | "review" | "loading" | "report" | "error";

interface UserData {
  full_name: string; email: string; phone: string;
  country: string; city: string; company: string; role: string;
  department: string; responsibility_level: string; main_reason: string;
  company_size: string; sector: string; years_experience: string;
  privacy_accepted: boolean; anonymous_research_accepted: boolean;
}
const EMPTY_USER: UserData = {
  full_name: "", email: "", phone: "",
  country: "", city: "", company: "", role: "",
  department: "", responsibility_level: "", main_reason: "",
  company_size: "", sector: "", years_experience: "",
  privacy_accepted: false, anonymous_research_accepted: false,
};

function Page() {
  const [step, setStep] = useState<Step>("landing");
  const [user, setUser] = useState<UserData>(EMPTY_USER);
  const [likert, setLikert] = useState<Record<string, number>>({});
  const [likertIdx, setLikertIdx] = useState(0);
  const [triggers, setTriggers] = useState<{ id: string; intensity: number }[]>([]);
  const [emotions, setEmotions] = useState<{ id: string; intensity: number }[]>([]);
  const [behaviors, setBehaviors] = useState<{ id: string; frequency: number }[]>([]);
  const [impact, setImpact] = useState<Record<string, number>>({});
  const [serverResp, setServerResp] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const totalSteps = 6;
  const stepIndex = ({ landing: 0, intake: 1, likert: 2, triggers: 3, emotions: 4, behaviors: 5, impact: 6, review: 6, loading: 6, report: 6, error: 6 }[step]) || 0;

  const validateIntake = (): boolean => {
    const required: (keyof UserData)[] = ["full_name", "email", "country", "city", "company", "role", "department", "responsibility_level", "main_reason"];
    return required.every((k) => String(user[k]).trim().length > 0)
      && /^\S+@\S+\.\S+$/.test(user.email)
      && user.privacy_accepted;
  };

  async function submit() {
    setStep("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/public/diagnostico-submit", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, likert, triggers, emotions, behaviors, impact }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setErrorMsg(json.error || "Error desconocido");
        setStep("error");
        return;
      }
      setServerResp(json);
      setStep("report");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e: any) {
      setErrorMsg(e?.message || "Error de red");
      setStep("error");
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f8f8f4" }}>
      <header className="border-b" style={{ backgroundColor: "#05325a" }}>
        <div className="max-w-4xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="text-white font-semibold tracking-wide">G-STRUCTURE</div>
          <div className="text-xs" style={{ color: "#cfd8e2" }}>Diagnóstico de Fricción Ejecutiva</div>
        </div>
      </header>

      {step !== "landing" && step !== "report" && step !== "loading" && step !== "error" ? (
        <div className="max-w-3xl mx-auto px-6 pt-6">
          <Progress value={(stepIndex / totalSteps) * 100} />
          <div className="mt-2 text-xs" style={{ color: "#697783" }}>Paso {stepIndex} de {totalSteps}</div>
        </div>
      ) : null}

      <main className="max-w-3xl mx-auto px-6 py-10">
        {step === "landing" && <Landing onStart={() => setStep("intake")} />}
        {step === "intake" && (
          <Intake user={user} setUser={setUser} canContinue={validateIntake()} onNext={() => { setLikertIdx(0); setStep("likert"); }} />
        )}
        {step === "likert" && (
          <LikertStep
            idx={likertIdx} setIdx={setLikertIdx}
            value={likert} setValue={setLikert}
            onBack={() => setStep("intake")}
            onDone={() => setStep("triggers")}
          />
        )}
        {step === "triggers" && (
          <TriggersStep value={triggers} setValue={setTriggers} onBack={() => setStep("likert")} onNext={() => setStep("emotions")} />
        )}
        {step === "emotions" && (
          <EmotionsStep value={emotions} setValue={setEmotions} onBack={() => setStep("triggers")} onNext={() => setStep("behaviors")} />
        )}
        {step === "behaviors" && (
          <BehaviorsStep value={behaviors} setValue={setBehaviors} onBack={() => setStep("emotions")} onNext={() => setStep("impact")} />
        )}
        {step === "impact" && (
          <ImpactStep value={impact} setValue={setImpact} onBack={() => setStep("behaviors")} onNext={() => setStep("review")} />
        )}
        {step === "review" && (
          <Review user={user} likert={likert} triggers={triggers} emotions={emotions} behaviors={behaviors} impact={impact}
            onBack={() => setStep("impact")} onSubmit={submit} />
        )}
        {step === "loading" && <Loading />}
        {step === "error" && <ErrorView msg={errorMsg} onRetry={submit} />}
        {step === "report" && serverResp && <Report resp={serverResp} user={user} />}
      </main>

      <footer className="border-t mt-16" style={{ borderColor: "#e5e7eb" }}>
        <div className="max-w-4xl mx-auto px-6 py-6 text-xs" style={{ color: "#697783" }}>
          <p>
            Este diagnóstico no constituye evaluación clínica, diagnóstico psicológico ni tratamiento.
            Su propósito es orientar procesos de coaching cognitivo-conductual aplicados a productividad
            y ejecución profesional. © G-Structure
          </p>
        </div>
      </footer>
    </div>
  );
}

// ---------------- Landing ----------------
function Landing({ onStart }: { onStart: () => void }) {
  return (
    <article className="space-y-8">
      <section className="bg-white rounded-lg p-8 shadow-sm border" style={{ borderColor: "#e5e7eb" }}>
        <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#697783" }}>IGPE V1.1</p>
        <h1 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: "#05325a" }}>
          Diagnóstico de Fricción Ejecutiva G-Structure
        </h1>
        <p className="mt-4 text-lg" style={{ color: "#3f3f46" }}>
          Identifica el patrón cognitivo-conductual que puede estar bloqueando tu productividad,
          claridad y capacidad de ejecución.
        </p>
        <p className="mt-4" style={{ color: "#697783" }}>
          En menos de 15 minutos recibirás una lectura personalizada sobre tu patrón dominante de
          ejecución, tus principales triggers, emociones asociadas, conductas de respuesta, impacto
          productivo y una vía inicial recomendada para reestructurar tu forma de ejecutar.
        </p>
        <div className="mt-6">
          <Button onClick={onStart} size="lg" style={{ backgroundColor: "#05325a", color: "#ffffff" }}>
            Iniciar diagnóstico
          </Button>
        </div>
      </section>

      <section className="bg-white rounded-lg p-8 shadow-sm border" style={{ borderColor: "#e5e7eb" }}>
        <h2 className="text-xl font-semibold mb-4" style={{ color: "#05325a" }}>Qué mide este diagnóstico</h2>
        <ul className="grid sm:grid-cols-2 gap-2 text-sm" style={{ color: "#3f3f46" }}>
          {[
            "Patrón dominante de ejecución",
            "Patrón secundario",
            "Perfil mixto",
            "Triggers de activación",
            "Emociones asociadas",
            "Conductas de respuesta",
            "Impacto productivo",
            "Índice de Fricción Ejecutiva G-Structure (IFE-GS)",
            "Ruta recomendada de intervención",
          ].map((x) => (
            <li key={x} className="flex gap-2"><span style={{ color: "#05325a" }}>•</span>{x}</li>
          ))}
        </ul>
      </section>

      <section className="rounded-lg p-6 border-l-4" style={{ borderLeftColor: "#05325a", backgroundColor: "#ffffff" }}>
        <h3 className="font-semibold mb-2" style={{ color: "#05325a" }}>Importante</h3>
        <p className="text-sm" style={{ color: "#3f3f46" }}>
          Este diagnóstico no es una evaluación clínica ni psicológica. No diagnostica trastornos
          mentales. Su finalidad es ofrecer una lectura funcional de patrones de ejecución desde
          una metodología de coaching cognitivo-conductual aplicada a productividad.
        </p>
      </section>
    </article>
  );
}

// ---------------- Intake ----------------
function Intake({ user, setUser, canContinue, onNext }: { user: UserData; setUser: (u: UserData) => void; canContinue: boolean; onNext: () => void }) {
  const set = (k: keyof UserData, v: any) => setUser({ ...user, [k]: v });
  const [showError, setShowError] = useState(false);

  return (
    <form onSubmit={(e) => { e.preventDefault(); if (canContinue) onNext(); else setShowError(true); }} className="space-y-6">
      <Card title="Datos del participante" sub="Campos obligatorios">
        <Grid>
          <Field label="Nombre completo *"><Input value={user.full_name} onChange={(e) => set("full_name", e.target.value)} required /></Field>
          <Field label="Email *"><Input type="email" value={user.email} onChange={(e) => set("email", e.target.value)} required /></Field>
          <Field label="País *"><Input value={user.country} onChange={(e) => set("country", e.target.value)} required /></Field>
          <Field label="Ciudad *"><Input value={user.city} onChange={(e) => set("city", e.target.value)} required /></Field>
          <Field label="Empresa u organización *"><Input value={user.company} onChange={(e) => set("company", e.target.value)} required /></Field>
          <Field label="Cargo / rol actual *"><Input value={user.role} onChange={(e) => set("role", e.target.value)} required /></Field>
          <Field label="Área o departamento *"><Input value={user.department} onChange={(e) => set("department", e.target.value)} required /></Field>
          <Field label="Nivel de responsabilidad *">
            <SelectNative value={user.responsibility_level} onChange={(v) => set("responsibility_level", v)} options={RESPONSIBILITY_LEVELS} />
          </Field>
          <Field label="Principal motivo *" full>
            <SelectNative value={user.main_reason} onChange={(v) => set("main_reason", v)} options={MAIN_REASONS} />
          </Field>
        </Grid>
      </Card>

      <Card title="Datos opcionales">
        <Grid>
          <Field label="Teléfono / WhatsApp"><Input value={user.phone} onChange={(e) => set("phone", e.target.value)} /></Field>
          <Field label="Tamaño de empresa"><SelectNative value={user.company_size} onChange={(v) => set("company_size", v)} options={["", ...COMPANY_SIZES]} /></Field>
          <Field label="Sector"><SelectNative value={user.sector} onChange={(v) => set("sector", v)} options={["", ...SECTORS]} /></Field>
          <Field label="Años de experiencia profesional"><Input value={user.years_experience} onChange={(e) => set("years_experience", e.target.value)} /></Field>
        </Grid>
      </Card>

      <Card title="Consentimiento y privacidad">
        <div className="space-y-3 text-sm" style={{ color: "#3f3f46" }}>
          <label className="flex gap-3 items-start">
            <Checkbox checked={user.privacy_accepted} onCheckedChange={(v) => set("privacy_accepted", !!v)} />
            <span>
              Acepto recibir mi reporte personalizado por email y autorizo a G-Structure a procesar mis
              respuestas para generar la lectura de resultados del Diagnóstico de Fricción Ejecutiva.
            </span>
          </label>
          <label className="flex gap-3 items-start">
            <Checkbox checked={user.anonymous_research_accepted} onCheckedChange={(v) => set("anonymous_research_accepted", !!v)} />
            <span>
              Acepto que mis respuestas puedan ser utilizadas de forma anónima y agregada para mejorar
              la metodología y fortalecer futuras investigaciones aplicadas. Estos datos no serán
              utilizados para diagnóstico clínico.
            </span>
          </label>
          <p className="text-xs" style={{ color: "#697783" }}>
            Consulta nuestra <a href="/politicas-legales" target="_blank" className="underline">política de privacidad</a>.
          </p>
        </div>
      </Card>

      {showError && !canContinue && (
        <p className="text-sm text-red-600">
          Para continuar, debes completar los campos obligatorios y aceptar las condiciones de uso y privacidad.
        </p>
      )}

      <div className="flex justify-end">
        <Button type="submit" style={{ backgroundColor: "#05325a", color: "#fff" }}>Continuar</Button>
      </div>
    </form>
  );
}

// ---------------- Likert ----------------
function LikertStep({ idx, setIdx, value, setValue, onBack, onDone }: {
  idx: number; setIdx: (n: number) => void;
  value: Record<string, number>; setValue: (v: Record<string, number>) => void;
  onBack: () => void; onDone: () => void;
}) {
  const item = LIKERT_ITEMS[idx];
  const total = LIKERT_ITEMS.length;
  const answered = value[item.id];

  return (
    <Card title={`Sección A · Patrones de Ejecución`} sub={`Pregunta ${idx + 1} de ${total} · ${DIMENSION_LABEL[item.dimension]}`}>
      <p className="text-xs mb-4" style={{ color: "#697783" }}>
        Responde pensando en tu comportamiento profesional durante los últimos 30 días.
      </p>
      <p className="text-lg mb-6" style={{ color: "#05325a" }}>{item.text}</p>
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
        {LIKERT_SCALE.map((s) => (
          <button
            key={s.value}
            type="button"
            onClick={() => setValue({ ...value, [item.id]: s.value })}
            className="rounded-md border px-3 py-3 text-sm transition"
            style={{
              borderColor: answered === s.value ? "#05325a" : "#e5e7eb",
              backgroundColor: answered === s.value ? "#05325a" : "#ffffff",
              color: answered === s.value ? "#ffffff" : "#3f3f46",
            }}
          >
            <div className="font-semibold">{s.value}</div>
            <div className="text-[11px] mt-1">{s.label}</div>
          </button>
        ))}
      </div>
      <div className="flex justify-between mt-8">
        <Button type="button" variant="outline" onClick={() => idx === 0 ? onBack() : setIdx(idx - 1)}>Atrás</Button>
        <Button type="button" disabled={!answered} onClick={() => idx + 1 === total ? onDone() : setIdx(idx + 1)} style={{ backgroundColor: "#05325a", color: "#fff" }}>
          {idx + 1 === total ? "Continuar" : "Siguiente"}
        </Button>
      </div>
    </Card>
  );
}

// ---------------- Triggers ----------------
function TriggersStep({ value, setValue, onBack, onNext }: { value: { id: string; intensity: number }[]; setValue: (v: any) => void; onBack: () => void; onNext: () => void }) {
  const toggle = (id: string) => {
    const exists = value.find((t) => t.id === id);
    if (exists) setValue(value.filter((t) => t.id !== id));
    else if (value.length < 3) setValue([...value, { id, intensity: 3 }]);
  };
  const setIntensity = (id: string, n: number) => setValue(value.map((t) => t.id === id ? { ...t, intensity: n } : t));
  return (
    <Card title="Sección B · Triggers de Ejecución" sub="Selecciona hasta 3 situaciones y califica intensidad 1–5">
      <div className="grid sm:grid-cols-2 gap-2">
        {TRIGGERS.map((t) => {
          const sel = value.find((x) => x.id === t.id);
          return (
            <div key={t.id} className="border rounded-md p-3" style={{ borderColor: sel ? "#05325a" : "#e5e7eb", backgroundColor: "#fff" }}>
              <label className="flex gap-2 items-center cursor-pointer">
                <Checkbox checked={!!sel} onCheckedChange={() => toggle(t.id)} disabled={!sel && value.length >= 3} />
                <span className="text-sm">{t.label}</span>
              </label>
              {sel && (
                <div className="mt-2 flex gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button key={n} type="button" onClick={() => setIntensity(t.id, n)} className="rounded px-2 py-1 text-xs border"
                      style={{ borderColor: sel.intensity === n ? "#05325a" : "#e5e7eb", backgroundColor: sel.intensity === n ? "#05325a" : "#fff", color: sel.intensity === n ? "#fff" : "#3f3f46" }}>
                      {n}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <NavRow onBack={onBack} onNext={onNext} disabled={value.length === 0} />
    </Card>
  );
}

// ---------------- Emotions ----------------
function EmotionsStep({ value, setValue, onBack, onNext }: { value: { id: string; intensity: number }[]; setValue: (v: any) => void; onBack: () => void; onNext: () => void }) {
  const toggle = (id: string) => {
    const exists = value.find((t) => t.id === id);
    if (exists) setValue(value.filter((t) => t.id !== id));
    else setValue([...value, { id, intensity: 5 }]);
  };
  const setI = (id: string, n: number) => setValue(value.map((t) => t.id === id ? { ...t, intensity: n } : t));
  return (
    <Card title="Sección C · Emociones de Ejecución" sub="Selecciona las que apliquen (intensidad 0–10)">
      <div className="grid sm:grid-cols-2 gap-2">
        {EMOTIONS.map((e) => {
          const sel = value.find((x) => x.id === e.id);
          return (
            <div key={e.id} className="border rounded-md p-3" style={{ borderColor: sel ? "#05325a" : "#e5e7eb", backgroundColor: "#fff" }}>
              <label className="flex gap-2 items-center cursor-pointer">
                <Checkbox checked={!!sel} onCheckedChange={() => toggle(e.id)} />
                <span className="text-sm">{e.label}</span>
              </label>
              {sel && (
                <input type="range" min={0} max={10} value={sel.intensity} onChange={(ev) => setI(e.id, Number(ev.target.value))} className="w-full mt-2" />
              )}
              {sel && <div className="text-xs" style={{ color: "#697783" }}>Intensidad: {sel.intensity}</div>}
            </div>
          );
        })}
      </div>
      <NavRow onBack={onBack} onNext={onNext} disabled={value.length === 0} />
    </Card>
  );
}

// ---------------- Behaviors ----------------
function BehaviorsStep({ value, setValue, onBack, onNext }: { value: { id: string; frequency: number }[]; setValue: (v: any) => void; onBack: () => void; onNext: () => void }) {
  const toggle = (id: string) => {
    const exists = value.find((t) => t.id === id);
    if (exists) setValue(value.filter((t) => t.id !== id));
    else if (value.length < 3) setValue([...value, { id, frequency: 3 }]);
  };
  const setF = (id: string, n: number) => setValue(value.map((t) => t.id === id ? { ...t, frequency: n } : t));
  return (
    <Card title="Sección D · Conductas de Respuesta" sub="Hasta 3 conductas, frecuencia 1–5">
      <div className="grid sm:grid-cols-2 gap-2">
        {BEHAVIORS.map((b) => {
          const sel = value.find((x) => x.id === b.id);
          return (
            <div key={b.id} className="border rounded-md p-3" style={{ borderColor: sel ? "#05325a" : "#e5e7eb", backgroundColor: "#fff" }}>
              <label className="flex gap-2 items-center cursor-pointer">
                <Checkbox checked={!!sel} onCheckedChange={() => toggle(b.id)} disabled={!sel && value.length >= 3} />
                <span className="text-sm">{b.label}</span>
              </label>
              {sel && (
                <div className="mt-2 flex gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button key={n} type="button" onClick={() => setF(b.id, n)} className="rounded px-2 py-1 text-xs border"
                      style={{ borderColor: sel.frequency === n ? "#05325a" : "#e5e7eb", backgroundColor: sel.frequency === n ? "#05325a" : "#fff", color: sel.frequency === n ? "#fff" : "#3f3f46" }}>
                      {n}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <NavRow onBack={onBack} onNext={onNext} disabled={value.length === 0} />
    </Card>
  );
}

// ---------------- Impact ----------------
function ImpactStep({ value, setValue, onBack, onNext }: { value: Record<string, number>; setValue: (v: any) => void; onBack: () => void; onNext: () => void }) {
  const allDone = IMPACT_AREAS.every((a) => value[a.id] >= 1);
  return (
    <Card title="Sección E · Impacto Productivo" sub="Cuánto afecta este patrón cada área (1–5)">
      <div className="space-y-3">
        {IMPACT_AREAS.map((a) => (
          <div key={a.id} className="border rounded-md p-3 bg-white" style={{ borderColor: "#e5e7eb" }}>
            <div className="text-sm mb-2" style={{ color: "#05325a" }}>{a.label}</div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} type="button" onClick={() => setValue({ ...value, [a.id]: n })} className="rounded px-3 py-2 text-xs border flex-1"
                  style={{ borderColor: value[a.id] === n ? "#05325a" : "#e5e7eb", backgroundColor: value[a.id] === n ? "#05325a" : "#fff", color: value[a.id] === n ? "#fff" : "#3f3f46" }}>
                  {n}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <NavRow onBack={onBack} onNext={onNext} disabled={!allDone} />
    </Card>
  );
}

// ---------------- Review ----------------
function Review({ user, likert, triggers, emotions, behaviors, impact, onBack, onSubmit }: any) {
  const preview = useMemo(() => computeResults({ likert, triggers, emotions, behaviors, impact }), [likert, triggers, emotions, behaviors, impact]);
  const allLikert = LIKERT_ITEMS.every((i) => likert[i.id]);
  const allImpact = IMPACT_AREAS.every((a) => impact[a.id]);
  const ready = allLikert && allImpact && triggers.length && emotions.length && behaviors.length;
  return (
    <Card title="Revisión" sub="Confirma para generar tu reporte">
      <div className="space-y-2 text-sm" style={{ color: "#3f3f46" }}>
        <div><strong>Participante:</strong> {user.full_name} · {user.email}</div>
        <div><strong>Empresa:</strong> {user.company} — {user.role}</div>
        <div><strong>Respuestas Likert:</strong> {Object.keys(likert).length}/40</div>
        <div><strong>Triggers seleccionados:</strong> {triggers.length}</div>
        <div><strong>Emociones:</strong> {emotions.length}</div>
        <div><strong>Conductas:</strong> {behaviors.length}</div>
        <div><strong>Impacto productivo:</strong> {Object.keys(impact).length}/10</div>
        {ready && <div className="mt-2"><strong>Vista previa IFE-GS:</strong> {preview.ifeGs.toFixed(0)} ({preview.frictionLevel})</div>}
      </div>
      <p className="text-xs mt-4" style={{ color: "#697783" }}>
        Este diagnóstico no constituye evaluación clínica.
      </p>
      <div className="flex justify-between mt-6">
        <Button type="button" variant="outline" onClick={onBack}>Atrás</Button>
        <Button type="button" disabled={!ready} onClick={onSubmit} style={{ backgroundColor: "#05325a", color: "#fff" }}>
          Enviar diagnóstico
        </Button>
      </div>
    </Card>
  );
}

function Loading() {
  return (
    <div className="bg-white border rounded-lg p-12 text-center" style={{ borderColor: "#e5e7eb" }}>
      <div className="text-lg mb-2" style={{ color: "#05325a" }}>Estamos procesando tu mapa de ejecución...</div>
      <div className="text-xs" style={{ color: "#697783" }}>Esto suele tomar unos segundos.</div>
    </div>
  );
}

function ErrorView({ msg: _msg, onRetry }: { msg: string; onRetry: () => void }) {
  return (
    <div className="bg-white border rounded-lg p-8" style={{ borderColor: "#e5e7eb" }}>
      <h2 className="font-semibold mb-2" style={{ color: "#05325a" }}>No pudimos enviar tu diagnóstico</h2>
      <p className="text-sm mb-4 whitespace-pre-line" style={{ color: "#3f3f46" }}>
        {"Algo salió mal al enviar tu diagnóstico.\nPor favor intenta de nuevo o escríbenos directamente:\nhola@g-structure.co"}
      </p>
      <Button onClick={onRetry} style={{ backgroundColor: "#05325a", color: "#fff" }}>Reintentar</Button>
    </div>
  );
}

// ---------------- Report ----------------
function Report({ resp, user }: { resp: any; user: UserData }) {
  const r = resp.results;
  const rec = resp.recommendation;
  const mixed = resp.mixed;
  const dom = DOMINANT_INTERPRETATIONS[r.dominant as "P" | "PE" | "AS" | "PI"];
  const fecha = new Intl.DateTimeFormat("es-EC", { dateStyle: "long" }).format(new Date());

  return (
    <article className="space-y-6">
      <section className="bg-white rounded-lg p-8 shadow-sm border" style={{ borderColor: "#e5e7eb" }}>
        <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "#697783" }}>Reporte personal</p>
        <h1 className="text-3xl font-bold" style={{ color: "#05325a" }}>Tu Reporte de Fricción Ejecutiva G-Structure</h1>
        <div className="mt-4 grid sm:grid-cols-2 gap-2 text-sm" style={{ color: "#3f3f46" }}>
          <div><strong>Nombre:</strong> {user.full_name}</div>
          <div><strong>Empresa:</strong> {user.company}</div>
          <div><strong>Cargo:</strong> {user.role}</div>
          <div><strong>Fecha:</strong> {fecha}</div>
        </div>
      </section>

      <section className="bg-white rounded-lg p-6 border" style={{ borderColor: "#e5e7eb" }}>
        <h2 className="font-semibold text-lg mb-4" style={{ color: "#05325a" }}>1 · Resumen ejecutivo</h2>
        <div className="grid sm:grid-cols-2 gap-3 text-sm" style={{ color: "#3f3f46" }}>
          <SumRow label="Patrón dominante" value={dimensionLabel(r.dominant)} />
          <SumRow label="Patrón secundario" value={dimensionLabel(r.secondary)} />
          <SumRow label="Perfil mixto" value={r.mixedProfileType + (mixed ? ` — ${mixed.name}` : "")} />
          <SumRow label="IFE-GS" value={`${r.ifeGs.toFixed(0)} (${r.frictionLevel})`} />
          <SumRow label="Trigger dominante" value={triggerLabel(r.dominantTrigger)} />
          <SumRow label="Emoción dominante" value={emotionLabel(r.dominantEmotion)} />
          <SumRow label="Conducta principal" value={behaviorLabel(r.dominantBehavior)} />
          <SumRow label="Área productiva más afectada" value={r.topImpactAreas[0] ? impactLabel(r.topImpactAreas[0]) : "—"} />
          <SumRow label="Recomendación" value={`${rec.program} — ${rec.duration}`} />
        </div>
      </section>

      <section className="bg-white rounded-lg p-6 border" style={{ borderColor: "#e5e7eb" }}>
        <h2 className="font-semibold text-lg mb-4" style={{ color: "#05325a" }}>2 · Resultados numéricos</h2>
        <div className="space-y-3">
          <Bar label="Procrastinación de Ejecución" pct={r.pctByDim.P} />
          <Bar label="Perfeccionismo de Ejecución" pct={r.pctByDim.PE} />
          <Bar label="Autosabotaje de Ejecución" pct={r.pctByDim.AS} />
          <Bar label="Patrón del Impostor en Ejecución" pct={r.pctByDim.PI} />
          <div className="pt-4 border-t mt-4" style={{ borderColor: "#e5e7eb" }} />
          <Bar label="Impacto Productivo" pct={r.ipPercent} />
          <Bar label="Activación Emocional" pct={r.iae} />
          <Bar label="Conducta de Respuesta" pct={r.icr} />
          <Bar label="IFE-GS (Índice de Fricción Ejecutiva)" pct={r.ifeGs} highlight />
        </div>
      </section>

      <section className="bg-white rounded-lg p-6 border" style={{ borderColor: "#e5e7eb" }}>
        <h2 className="font-semibold text-lg mb-3" style={{ color: "#05325a" }}>3 · Lectura funcional</h2>
        <p className="text-sm mb-3" style={{ color: "#3f3f46" }}>{dom.reading}</p>
        {mixed && (
          <>
            <h3 className="font-semibold mt-4 mb-2" style={{ color: "#05325a" }}>{mixed.name}</h3>
            <p className="text-sm" style={{ color: "#3f3f46" }}>{mixed.reading}</p>
          </>
        )}
      </section>

      <section className="bg-white rounded-lg p-6 border" style={{ borderColor: "#e5e7eb" }}>
        <h2 className="font-semibold text-lg mb-3" style={{ color: "#05325a" }}>4 · Cómo esto puede afectar tu productividad</h2>
        <p className="text-sm mb-3" style={{ color: "#3f3f46" }}>{dom.productivityImpact}</p>
        {r.topImpactAreas.length > 0 && (
          <p className="text-sm" style={{ color: "#3f3f46" }}>
            Áreas con mayor impacto reportado: <strong>{r.topImpactAreas.map(impactLabel).join(", ")}</strong>.
          </p>
        )}
      </section>

      <section className="bg-white rounded-lg p-6 border" style={{ borderColor: "#e5e7eb" }}>
        <h2 className="font-semibold text-lg mb-3" style={{ color: "#05325a" }}>5 · Pronóstico funcional no clínico</h2>
        <p className="text-sm" style={{ color: "#3f3f46" }}>
          Si este patrón no se trabaja, es probable que continúe generando costos de ejecución en las
          áreas más afectadas. Sin embargo, al ser un patrón funcional de pensamiento, emoción y
          conducta, puede ser identificado, reestructurado y optimizado mediante un proceso guiado.
        </p>
      </section>

      <section className="rounded-lg p-6" style={{ backgroundColor: "#05325a", color: "#fff" }}>
        <h2 className="font-semibold text-lg mb-2">6 · Ruta recomendada</h2>
        <p className="text-base font-semibold">{rec.program} — {rec.duration}</p>
        <p className="text-sm mt-2" style={{ color: "#cfd8e2" }}>{rec.message}</p>
        {resp.showEnterprise && (
          <p className="text-sm mt-3" style={{ color: "#cfd8e2" }}>
            También puedes llevar el Workshop de Diagnóstico de Ejecución a tu empresa a través de REESTRUCTURA Enterprise.
          </p>
        )}
      </section>

      <section className="bg-white rounded-lg p-6 border" style={{ borderColor: "#e5e7eb" }}>
        <h2 className="font-semibold text-lg mb-4" style={{ color: "#05325a" }}>7 · Próximo paso</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <a href={WA_INDIVIDUAL} target="_blank" rel="noopener noreferrer">
            <Button style={{ backgroundColor: "#05325a", color: "#fff" }} className="w-full">
              Quiero trabajar mi patrón de ejecución
            </Button>
          </a>
          {resp.showEnterprise && (
            <a href={WA_ENTERPRISE} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="w-full">Quiero llevar este diagnóstico a mi empresa</Button>
            </a>
          )}
          <a href="mailto:guillermo@g-structure.co">
            <Button variant="outline" className="w-full">Contactar por email</Button>
          </a>
        </div>
        <p className="text-xs mt-6" style={{ color: "#697783" }}>
          Recibirás también una copia de este reporte por email a {user.email}.
        </p>
      </section>
    </article>
  );
}

// ---------------- Helpers ----------------
function Card({ title, sub, children }: { title: string; sub?: string; children: any }) {
  return (
    <section className="bg-white rounded-lg p-6 border" style={{ borderColor: "#e5e7eb" }}>
      <h2 className="font-semibold text-lg" style={{ color: "#05325a" }}>{title}</h2>
      {sub && <p className="text-xs mb-4" style={{ color: "#697783" }}>{sub}</p>}
      <div className={sub ? "" : "mt-4"}>{children}</div>
    </section>
  );
}
function Grid({ children }: { children: any }) { return <div className="grid sm:grid-cols-2 gap-4">{children}</div>; }
function Field({ label, full, children }: { label: string; full?: boolean; children: any }) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <Label className="text-xs mb-1 block" style={{ color: "#697783" }}>{label}</Label>
      {children}
    </div>
  );
}
function SelectNative({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full h-10 rounded-md border bg-white px-3 text-sm" style={{ borderColor: "#e5e7eb", color: "#3f3f46" }}>
      {options.map((o) => <option key={o} value={o}>{o || "Selecciona…"}</option>)}
    </select>
  );
}
function NavRow({ onBack, onNext, disabled }: { onBack: () => void; onNext: () => void; disabled?: boolean }) {
  return (
    <div className="flex justify-between mt-6">
      <Button type="button" variant="outline" onClick={onBack}>Atrás</Button>
      <Button type="button" onClick={onNext} disabled={disabled} style={{ backgroundColor: "#05325a", color: "#fff" }}>Siguiente</Button>
    </div>
  );
}
function Bar({ label, pct, highlight }: { label: string; pct: number; highlight?: boolean }) {
  const v = Math.max(0, Math.min(100, pct));
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span style={{ color: "#3f3f46" }}>{label}</span>
        <span style={{ color: "#05325a", fontWeight: 600 }}>{v.toFixed(0)}%</span>
      </div>
      <div className="h-2 rounded-full" style={{ backgroundColor: "#e5e7eb" }}>
        <div className="h-2 rounded-full" style={{ width: `${v}%`, backgroundColor: highlight ? "#05325a" : "#697783" }} />
      </div>
    </div>
  );
}
function SumRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wide" style={{ color: "#697783" }}>{label}</div>
      <div className="text-sm font-semibold" style={{ color: "#05325a" }}>{value}</div>
    </div>
  );
}
