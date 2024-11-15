"use client"
import { oAuthSignIn } from "./actions";
import { SiNotion } from "react-icons/si";
import { FaGoogle } from "react-icons/fa";


type Provider = "google" | "notion";


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
      icon: <FaGoogle  />,
    },
    {
      name: "notion",
      displayName: "Notion",
      icon: <SiNotion />, 
    }
  ];

  return (
    <>
      {oAuthProviders.map((provider) => (
        <div key={provider.name} className="mb-4">
        <button
          className="flex w-72 h-12 items-center justify-center gap-1 rounded-xl bg-slate-900 p-6 hover:bg-slate-800"
            onClick={async () => {
              await oAuthSignIn(provider.name);
          }}
          >
          <div className="w-6">{provider.icon}</div>  
          <h1>Sign in with</h1>
          {provider.displayName}
        </button>
        </div>
      ))}
    </>
  );
}
