"use client";

import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "@/services/dashboard.services";
import { Card, CardContent } from "@/components/ui/card";
import { Users, ShieldCheck, UserCog } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export default function AdminDashboardContent() {
  const { data: response, isLoading } = useQuery({
    queryKey: ["admin-dashboard-stats"],
    queryFn: () => getDashboardData(),
  });

  if (isLoading) {
    return (
      <div className="space-y-8 p-6">
        <div className="space-y-2">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-4 w-full max-w-md" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-[2rem]" />
          ))}
        </div>
      </div>
    );
  }

  const data = response?.success ? response.data : null;

  const stats = [
    {
      title: "Total Users",
      value: data?.userCount ?? 0,
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Admins",
      value: data?.adminCount ?? 0,
      icon: UserCog,
      color: "bg-orange-500",
    },
    {
      title: "Super Admins",
      value: data?.superAdminCount ?? 0,
      icon: ShieldCheck,
      color: "bg-rose-500",
    },
  ];

  return (
    <div className="space-y-8 p-6 pb-20">
      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground font-medium mt-1">
          Overview of your team and platform users.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <Card
            key={i}
            className="border-none shadow-md shadow-black/5 rounded-[2rem] overflow-hidden group hover:shadow-xl transition-all duration-300"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`${stat.color} h-12 w-12 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <stat.icon className="h-6 w-6" />
                </div>
                <Badge
                  variant="secondary"
                  className="bg-muted text-muted-foreground font-black border-none px-2 py-0.5 rounded-lg text-[10px]"
                >
                  PLATFORM
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                  {stat.title}
                </p>
                <h3 className="text-2xl font-black text-foreground">
                  {stat.value}
                </h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
