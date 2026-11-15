type AuthVariant = "login" | "register";

/** Field labels per variant, matching the real forms. */
const FIELDS: Record<AuthVariant, Array<{ width: string; trailing?: boolean; hint?: boolean }>> = {
  login: [{ width: "w-16" }, { width: "w-20", trailing: true }],
  register: [
    { width: "w-12" },
    { width: "w-16" },
    { width: "w-20" },
    { width: "w-20", hint: true },
  ],
};

const COPY: Record<AuthVariant, { title: string; description: string; intro: boolean }> = {
  login: {
    title: "Welcome back",
    description: "Login with your Google account",
    intro: false,
  },
  register: {
    title: "Create an account",
    description: "Register with Google to get started with BookNook",
    intro: true,
  },
};

/**
 * Placeholder for the login/register cards — real headings and card chrome
 * with the form fields pulsing in place, exactly as the page renders them.
 */
export default function AuthCardSkeleton({ variant }: { variant: AuthVariant }) {
  const { title, description, intro } = COPY[variant];
  const fields = FIELDS[variant];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 rounded-xl border bg-card py-4 shadow-sm ring-0">
        {/* Card header */}
        <div className="grid auto-rows-min items-start gap-1 px-4 text-center">
          <div className="text-xl font-bold text-[#1F3864]">{title}</div>
          <div className="text-sm text-muted-foreground">{description}</div>
        </div>

        {/* Form fields */}
        <div className="flex flex-col gap-5 px-4">
          <div aria-hidden="true" className="flex min-h-11 items-center justify-center rounded-lg border border-[#E5E5E5] bg-white">
            <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />
          </div>

          <div aria-hidden="true" className="relative -my-2 flex h-5 items-center">
            <span className="absolute inset-x-0 top-1/2 h-px bg-gray-200" />
            <span className="relative mx-auto h-4 w-28 animate-pulse rounded bg-gray-200" />
          </div>

          {intro && (
            <div
              aria-hidden="true"
              className="h-4 w-72 max-w-full animate-pulse rounded bg-gray-200"
            />
          )}

          {fields.map(({ width, trailing, hint }, i) => (
            <div key={i} className="grid gap-2" aria-hidden="true">
              <div className="flex items-center justify-between gap-4">
                <div className={`h-4 ${width} animate-pulse rounded bg-gray-200`} />
                {trailing && (
                  <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                )}
              </div>
              <div className="h-8 animate-pulse rounded-lg border border-input bg-white" />
              {hint && (
                <div className="h-4 w-64 max-w-full animate-pulse rounded bg-gray-200" />
              )}
            </div>
          ))}

          <div className="grid gap-2" aria-hidden="true">
            <div className="h-11 animate-pulse rounded-md bg-[#8C2B22]" />
            <div className="mx-auto h-4 w-52 animate-pulse rounded bg-gray-200" />
          </div>
        </div>
      </div>

      {/* Terms note below the card */}
      <div aria-hidden="true" className="flex flex-col items-center gap-2 px-6">
        <div className="h-4 w-72 max-w-full animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-56 animate-pulse rounded bg-gray-200" />
      </div>
    </div>
  );
}
