interface ContactAction {
  label: string;
  hint: string;
  href: string;
  icon: "phone" | "mail";
}

interface ContactSectionProps {
  actions: ContactAction[];
}

export function ContactSection({ actions }: ContactSectionProps) {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="rounded-[2rem] bg-white/75 px-6 py-8 shadow-sm ring-1 ring-rose-200/30 sm:px-8 sm:py-9"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-rose-600">
            Liên hệ
          </p>
          <h2
            id="contact-heading"
            className="text-2xl font-semibold tracking-tight text-rose-950 sm:text-3xl"
          >
            Liên hệ với gia đình
          </h2>
        </div>

        <div className="space-y-4">
          {actions.map((action) => {
            return (
              <div
                key={action.href}
                className="flex items-center gap-3 text-rose-800"
              >
                {action.icon === "phone" ? (
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="shrink-0 text-rose-500"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                ) : (
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="shrink-0 text-rose-500"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                )}
                <a
                  href={action.href}
                  className="text-base font-medium underline decoration-rose-300 decoration-1 underline-offset-4 transition hover:decoration-rose-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:ring-offset-2"
                >
                  {action.hint}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
