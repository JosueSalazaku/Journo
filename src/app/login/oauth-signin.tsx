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
    {
      name: "notion",
      displayName: "Notion",
      icon: <Image src="notion.svg" alt="Notion" height={20} width={20} />, 
    }
  ];

  return (
    <>
      {oAuthProviders.map((provider) => (
        <div key={provider.name} className="mb-4">
        <button
          className="flex w-72 h-12 items-center justify-center gap-1 rounded-xl bg-slate-900 p-6 hover:bg-slate-800"
          >
          {provider.icon}    
          <h1>Sign in with</h1>
          {provider.displayName}
        </button>
        </div>
      ))}
    </>
  );
}
