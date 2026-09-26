import { Metadata } from "next";
import ClientLogoManager from "./_components/ClientLogoManager";

export const metadata: Metadata = {
  title: "Client Logos | Admin Dashboard",
  description: "Manage the client logos shown on the home page",
};

export default function ClientLogosPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="space-y-1">
        <h2 className="text-3xl font-bold tracking-tight">Client Logos</h2>
        <p className="text-muted-foreground">
          Logos shown in the scrolling brand section on the home page.
        </p>
      </div>

      <ClientLogoManager />
    </div>
  );
}
