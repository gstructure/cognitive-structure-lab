import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/admin/")({
  component: AdminHome,
});

const sections = [
  {
    to: "/admin/waitlist",
    title: "Lista de espera",
    description: "Registros de G-Struct waitlist con exportación CSV.",
  },
  {
    to: "/admin/diagnosticos",
    title: "Diagnósticos",
    description: "Resultados del test de fricción ejecutiva.",
  },
  {
    to: "/admin/reservas",
    title: "Reservas",
    description: "Reservas de Reestructura 1:1, Workshop y otros paquetes.",
  },
  {
    to: "/admin/comentarios",
    title: "Comentarios",
    description: "Moderación de comentarios enviados en los artículos.",
  },
  {
    to: "/admin/supporters",
    title: "Supporters",
    description: "Aportes de apoyo temprano, emails y rendición de cuentas.",
  },
];

function AdminHome() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold">Panel de administración</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Acceso interno · G-Structure
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((s) => (
            <Link
              key={s.to}
              to={s.to}
              className="group block rounded-lg border bg-card p-5 hover:border-foreground/30 transition-colors"
            >
              <h2 className="font-medium group-hover:underline">{s.title}</h2>
              <p className="text-sm text-muted-foreground mt-2">
                {s.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
