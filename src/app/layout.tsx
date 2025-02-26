import { Nav } from "~/components/Nav";
import { SessionProvider } from "~/components/SessionProvider";
import { ThemeProvider } from "~/components/theme-provider";
import "~/styles/globals.css";

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
      <ThemeProvider>
        <SessionProvider>
          <body className="max-w-600 mx-auto h-[100vh] bg-primary font-noto ">
            <Nav />
            {children}
          </body>
        </SessionProvider>
      </ThemeProvider>
    </html>
  );
}
