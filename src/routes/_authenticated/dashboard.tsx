import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Flight Price Notifier" },
      {
        name: "description",
        content: "Your Flight Price Notifier dashboard for fare alerts.",
      },
      { property: "og:title", content: "Dashboard — Flight Price Notifier" },
      {
        property: "og:description",
        content: "Your Flight Price Notifier dashboard for fare alerts.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = Route.useRouteContext();

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[360px] glow-violet" />

      <header className="relative z-10 mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-6">
        <span className="text-sm font-semibold tracking-tight">
          <span className="text-primary">✈</span> Flight Price Notifier
        </span>
        <button
          onClick={handleSignOut}
          className="rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
        >
          Sign out / 登出
        </button>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-5xl px-5 py-12">
        <div className="animate-fade-up">
          <h1 className="text-3xl font-semibold tracking-tight">
            Dashboard．儀表板
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Signed in as {user?.email}
          </p>
        </div>

        <div className="animate-fade-up-delay-1 mt-8 rounded-2xl border border-dashed border-border bg-card p-10 text-center">
          <div className="text-3xl">🛫</div>
          <h2 className="mt-4 text-lg font-semibold">尚未設定航線提醒</h2>
          <p className="mt-1 text-sm text-primary">No fare alerts yet</p>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            航線訂閱與目標價設定即將推出，敬請期待。Route subscriptions and
            target prices are coming soon.
          </p>
        </div>
      </main>
    </div>
  );
}
