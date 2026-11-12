import { useState } from "react";
import Input from "../../Components/Input/Input";
import {
  DEMO_LABTECH_EMAIL,
  DEMO_PASSWORD,
  DEMO_SCIENTIST_EMAIL,
} from "../../constants/demoAccounts";

type LoginInterface = {
  onLogin: (email: string, password: string) => Promise<void>;
  error: string | null;
  submitting: boolean;
};

export default function Login({ onLogin, error, submitting }: LoginInterface) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onLogin(email, password);
  }
  return (
    <>
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-sm">
          {/* Brand */}
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-blue-600">🧪 ClearBench</h1>
            <p className="mt-2 text-gray-600">Sample tracking for lab teams</p>
          </div>

          {/* Card */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <Input
                id="email"
                name="email"
                type="email"
                label="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <Input
                id="password"
                name="password"
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error && (
                <p role="alert" className="mb-4 text-sm text-red-600">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Logging in…" : "Log in"}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3 text-sm text-gray-500">
              <span className="h-px flex-1 bg-gray-200" />
              or try the demo
              <span className="h-px flex-1 bg-gray-200" />
            </div>

            {/* Demo buttons */}
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                disabled={submitting}
                onClick={() => onLogin(DEMO_SCIENTIST_EMAIL, DEMO_PASSWORD)}
                className="rounded border border-blue-600 px-4 py-2 font-semibold text-blue-600 hover:bg-blue-50 disabled:opacity-60"
              >
                Try as a scientist
              </button>
              <button
                type="button"
                disabled={submitting}
                onClick={() => onLogin(DEMO_LABTECH_EMAIL, DEMO_PASSWORD)}
                className="rounded border border-blue-600 px-4 py-2 font-semibold text-blue-600 hover:bg-blue-50 disabled:opacity-60"
              >
                Try as a lab tech
              </button>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-gray-500">
            No sign-up needed. The demo buttons log you in as Dr. Alice Nguyen or Sarah Lin.
          </p>
        </div>
      </main>
    </>
  );
}
