'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '~/utils/supabase/server'
import { Provider } from '@supabase/supabase-js'
import { getURL } from 'next/dist/shared/lib/utils'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function oAuthSignIn(provider: "google" | "notion") {
  if (!provider) {
    return redirect("/login?message=No Provider Selected");
  }

  try {
    // Ensure environment variables are properly set
    if (!process.env.NEXT_PUBLIC_BASE_URL) {
      console.error("NEXT_PUBLIC_BASE_URL is not defined.");
      throw new Error("Base URL is missing");
    }

    const supabase = await createClient();
    const redirectUrls = {
      google: "/auth/callback/google",
      notion: "/auth/callback/notion",
    };

    const redirectUrl = redirectUrls[provider];

    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider as Provider,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}${redirectUrl}`,
      },
    });

    if (error) {
      console.error("OAuth Sign-In Error:", error.message);
      return redirect("/login?message=Could not authenticate user");
    }
  } catch (err) {
    console.error("Unexpected Error during OAuth:", err);
    return redirect("/login?message=An unexpected error occurred");
  }
}