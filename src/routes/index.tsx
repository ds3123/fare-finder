import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Flight Price Notifier — 機票降價通知" },
      {
        name: "description",
        content:
          "Watch popular flight routes from Taipei and get an email the moment the cheapest fare drops to your target price.",
      },
      { property: "og:title", content: "Flight Price Notifier — 機票降價通知" },
      {
        property: "og:description",
        content:
          "Set a route and a target price — we email you when the fare drops.",
      },
    ],
  }),
  component: Landing,
});

const features = [
  {
    icon: "✈️",
    title: "盯緊熱門航線",
    subtitle: "Always-on route watching",
    body: "持續監控台北出發的熱門航線（東京、首爾），自動抓最低票價。",
    delay: "animate-fade-up-delay-1",
  },
  {
    icon: "🔔",
    title: "達標自動通知",
    subtitle: "Target-price email alerts",
    body: "低於你設定的目標價，就寄 email 提醒你，附上立即訂購連結。",
    delay: "animate-fade-up-delay-2",
  },
  {
    icon: "🚫",
    title: "隨時取消",
    subtitle: "Cancel anytime",
    body: "月訂閱制，不想用隨時停，沒有綁約。",
    delay: "animate-fade-up-delay-3",
  },
];

function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] glow-violet" />

      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-6">
        <span className="text-sm font-semibold tracking-tight sm:text-base">
          <span className="text-primary">✈</span> Flight Price Notifier
        </span>
        <Link
          to="/auth"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Sign in / 登入
        </Link>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-6xl px-5">
        <section className="animate-fade-up py-20 text-center sm:py-28">
          <span className="inline-flex items-center rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground">
            台北出發 · 東京 / 首爾
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
            Flight Price Notifier
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl font-medium text-foreground/90 sm:text-2xl">
            設定航線與目標價，機票降價就通知你
          </p>
          <p className="mx-auto mt-3 max-w-xl text-base text-muted-foreground">
            Set a route and a target price — we email you when the fare drops.
          </p>
          <div className="mt-10">
            <Link
              to="/auth"
              className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-base font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:scale-[1.02] hover:bg-primary/90"
            >
              Sign in / 登入
            </Link>
          </div>
        </section>

        <section className="grid gap-5 pb-24 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <article
              key={f.title}
              className={`${f.delay} rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40`}
            >
              <div className="text-3xl">{f.icon}</div>
              <h2 className="mt-4 text-lg font-semibold">{f.title}</h2>
              <p className="mt-1 text-sm text-primary">{f.subtitle}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {f.body}
              </p>
            </article>
          ))}
        </section>
      </main>

      <footer className="relative z-10 border-t border-border py-8 text-center text-sm text-muted-foreground">
        © 2026 Flight Price Notifier
      </footer>
    </div>
  );
}
