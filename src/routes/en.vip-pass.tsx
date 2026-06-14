import { createFileRoute } from "@tanstack/react-router";
import { VipPassPage } from "@/components/pages/VipPassPage";

export const Route = createFileRoute("/en/vip-pass")({
  head: () => ({
    meta: [
      { title: "VIP Pass · KAIRON Founding Cohort" },
      { name: "robots", content: "noindex, nofollow" },
      {
        name: "description",
        content: "VIP Architecture Pass for the KAIRON Founding Cohort.",
      },
    ],
  }),
  component: () => <VipPassPage locale="en" />,
});
