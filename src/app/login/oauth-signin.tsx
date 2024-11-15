import type { Provider } from "@supabase/supabase-js";
import Image from "next/image";

type OAuthProvider = {
  name: Provider;
  displayName: string;
  icon?: JSX.Element;
};

export function OAuthButtons() {
  const oAuthProviders: OAuthProvider[] = [
    {
      name: "google",
      displayName: "Google",
      icon: <Image src="google.svg" alt="Google" height={20} width={20} />,
    },
  ];

  return (
    <>
      {oAuthProviders.map((provider) => (
        <button
          key={provider.name}
          className="flex w-72 h-12 items-center justify-center gap-1 rounded-xl bg-slate-900 p-4 hover:bg-slate-800"
          >
          {provider.icon}    
          <h1>Sign in with</h1>
          {provider.displayName}
          
        </button>
      ))}
    </>
  );
}
