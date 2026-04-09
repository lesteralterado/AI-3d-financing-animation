"use client";

const items = [
  "OpenAI",
  "Stripe",
  "Plaid",
  "Alpaca",
  "Polygon.io",
  "AWS",
  "Kubernetes",
  "PostgreSQL",
  "Redis",
  "Kafka",
] as const;

export function TechMarquee() {
  const row = [...items, ...items];

  return (
    <section className="relative overflow-hidden bg-bg-void py-10">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(5,10,20,1),rgba(5,10,20,0)_18%,rgba(5,10,20,0)_82%,rgba(5,10,20,1))]" />
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/10 bg-white/5 py-5 backdrop-blur">
          <div className="relative overflow-hidden">
            <div className="flex w-[200%] animate-marquee select-none items-center gap-6 px-6 font-mono text-xs uppercase tracking-[0.22em] text-text-muted">
              {row.map((name, idx) => (
                <div key={`${name}-${idx}`} className="flex items-center gap-6">
                  <span className="whitespace-nowrap">{name}</span>
                  <span className="text-text-muted/50">•</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

