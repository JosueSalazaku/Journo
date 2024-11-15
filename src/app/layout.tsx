import { TopNav } from "~/components/TopNav";
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
      <body className="max-w-600 mx-auto h-[100vh] bg-primary font-noto ">
            <TopNav />
            {children}
      </body>
    </html>
  );
}
