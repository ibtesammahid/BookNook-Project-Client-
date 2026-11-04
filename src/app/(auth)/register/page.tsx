"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default function RegisterPage() {
    const handleEmailRegister = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault(); 
        const formData = new FormData(event.target)
        const user = Object.fromEntries(formData.entries()) as { name: string; email: string; photoUrl?: string; password: string }; 
        console.log(user);

        const {data, error} = await authClient.signUp.email({
            ...user
        })

        if (data){
            console.log(data);
            redirect("/login")
        }
        if (error){
            console.error(error);
        }
    }

              const handleGoogleSignUp = async () => {
        const { error } = await authClient.signIn.social({
          provider: "google",
          callbackURL: "/",
        });
    
        if (error) {
          alert(error.message ?? "Sign In failed");
        }
      };

  return (
    <div className="flex flex-col gap-6">
      <Card className="border shadow-sm ring-0">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-bold text-[#1F3864]">
            Create an account
          </CardTitle>
          <CardDescription>
            Register with Google to get started with BookNook
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEmailRegister}>
            <FieldGroup>
              <Field>
                 <button
              onClick={handleGoogleSignUp}
              type="button"
              className="flex min-h-11 min-w-0 items-center justify-center gap-2 rounded-lg border border-[#E5E5E5] bg-white px-3 py-2.5 text-xs font-medium text-gray-800 transition hover:bg-gray-50 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8C2B22] sm:text-sm"
            >
              <svg
                aria-label="Google logo"
                role="img"
                width="16"
                height="16"
                viewBox="0 0 48 48"
                className="shrink-0"
              >
                <path
                  fill="#4285F4"
                  d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.8 6.1-15Z"
                />
                <path
                  fill="#34A853"
                  d="M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.6-5.1c-1.8 1.2-4.1 2-6.9 2-5.3 0-9.8-3.6-11.4-8.4H5.8v5.3A20 20 0 0 0 24 44Z"
                />
                <path
                  fill="#FBBC05"
                  d="M12.6 27.6a12 12 0 0 1 0-7.2v-5.3H5.8a20 20 0 0 0 0 17.8l6.8-5.3Z"
                />
                <path
                  fill="#EA4335"
                  d="M24 12c3 0 5.7 1 7.8 3.1l5.8-5.8C34.1 5.9 29.5 4 24 4A20 20 0 0 0 5.8 15.1l6.8 5.3C14.2 15.6 18.7 12 24 12Z"
                />
              </svg>

              <span>Continue with Google</span>
            </button>

                          <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>

              <CardDescription>
            Enter your information to register for BookNook
          </CardDescription>
                <FieldLabel
                  htmlFor="name"
                  className="font-semibold text-[#1F3864]"
                >
                  Name
                </FieldLabel>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  autoComplete="name"
                  required
                />
              </Field>

              <Field>
                <FieldLabel
                  htmlFor="email"
                  className="font-semibold text-[#1F3864]"
                >
                  Email
                </FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  autoComplete="email"
                  required
                />
              </Field>

              <Field>
                <FieldLabel
                  htmlFor="photoUrl"
                  className="font-semibold text-[#1F3864]"
                >
                  Photo URL
                </FieldLabel>
                <Input
                  id="photoUrl"
                  name="photoUrl"
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                />
              </Field>

              <Field>
                <FieldLabel
                  htmlFor="password"
                  className="font-semibold text-[#1F3864]"
                >
                  Password
                </FieldLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  minLength={6}
                  required
                />
                <FieldDescription>
                  Use at least 6 characters, including uppercase and lowercase
                  letters.
                </FieldDescription>
              </Field>

              <Field>
                <Button
                  type="submit"
                  className="h-11 rounded-md bg-[#8C2B22] text-sm font-semibold text-white hover:bg-[#B3372B]/90"
                >
                  Register
                </Button>
                <FieldDescription className="text-center">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-semibold text-[#8C2B22] underline underline-offset-4"
                  >
                    Login
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      <FieldDescription className="px-6 text-center">
        By registering, you agree to our{" "}
        <Link
          href="/terms"
          className="font-medium text-[#8C2B22] underline underline-offset-4"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="/privacy"
          className="font-medium text-[#8C2B22] underline underline-offset-4"
        >
          Privacy Policy
        </Link>
        .
      </FieldDescription>
    </div>
  );
}