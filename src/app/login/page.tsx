import { OAuthButtons } from "./oauth-signin";

export default function LoginPage() {
  return (
      <main className="h-[900px] w-full flex flex-col items-center justify-center text-white sm:p-8">
          <OAuthButtons />
      </main>
  );
}
 