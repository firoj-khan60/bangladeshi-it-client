import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function UserDashboardPage() {
  return (
    <div className="space-y-8 p-6 pb-20">
      <div>
        <h1 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
          My Dashboard
        </h1>
        <p className="text-muted-foreground font-medium mt-1">
          Welcome back! Manage your account from here.
        </p>
      </div>

      <Card className="border-none shadow-xl shadow-black/5 rounded-[2.5rem] overflow-hidden bg-card">
        <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center">
              <User className="h-7 w-7 text-highlight" />
            </div>
            <div>
              <h3 className="font-black text-foreground text-lg">
                Keep your profile up to date
              </h3>
              <p className="text-muted-foreground text-sm font-medium">
                Update your name, photo, and account details.
              </p>
            </div>
          </div>
          <Link href="/dashboard/my-profile">
            <Button className="rounded-xl font-bold">
              Go to Profile <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
