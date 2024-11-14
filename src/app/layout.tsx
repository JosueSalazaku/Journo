import { TopNav } from "~/components/TopNav";
import "~/styles/globals.css";
import { SessionProvider } from "next-auth/react"

export const metadata = {
  title: "Journo",
  description: "Write about your Travel journeys!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-primary font-noto">
        <SessionProvider>
          <div className="max-w-600 mx-auto h-[100vh]">
            <TopNav />
            {children}
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
