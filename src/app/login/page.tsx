import { Input } from "~/components/ui/input";
import { login, signup } from "./actions";
import { Button } from "~/components/ui/button";
import { OAuthButtons } from "./oauth-signin";

export default function LoginPage() {
  return (
      <main className="h-screen flex flex-col items-center justify-start text-white p-4 sm:p-8">
          <OAuthButtons />
      <form className="w-96">
        <label htmlFor="email">Email:</label>
        <Input id="email" name="email" type="email" required />
        <label htmlFor="password">Password:</label>
        <Input id="password" name="password" type="password" required />
        <Button formAction={login}>Log in</Button>
        <Button formAction={signup}>Sign up</Button>
      </form>
    </main>
  );
}
 