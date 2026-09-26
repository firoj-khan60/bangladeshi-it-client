import { NavSection } from "@/types/dashboard.types";
import { getDefaultDashboardRoute, UserRole } from "./authUtils";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
  const defaultDashboard = getDefaultDashboardRoute(role);
  return [
    {
      items: [
        {
          title: "Home",
          href: "/",
          icon: "Home",
        },
        {
          title: "Dashboard",
          href: defaultDashboard,
          icon: "LayoutDashboard",
        },
      ],
    },
  ];
};

export const userNavItems: NavSection[] = [
  {
    title: "Account",
    items: [
      {
        title: "Profile",
        href: "/dashboard/my-profile",
        icon: "User",
      },
    ],
  },
];

export const adminNavItems: NavSection[] = [
  {
    title: "Sales",
    items: [
      {
        title: "Leads",
        href: "/admin/dashboard/leads",
        icon: "Inbox",
      },
    ],
  },
  {
    title: "User Management",
    items: [
      {
        title: "Users",
        href: "/admin/dashboard/users",
        icon: "Users",
      },
    ],
  },
  {
    title: "Content",
    items: [
      {
        title: "Pages",
        href: "/admin/dashboard/pages",
        icon: "FileText",
      },
      {
        title: "Blog",
        href: "/admin/dashboard/blogs",
        icon: "Newspaper",
      },
      {
        title: "Client Logos",
        href: "/admin/dashboard/client-logos",
        icon: "Images",
      },
    ],
  },
  {
    title: "Settings",
    items: [
      {
        title: "Site Settings",
        href: "/admin/dashboard/site-settings",
        icon: "Building2",
      },
      {
        title: "SMS Settings",
        href: "/admin/dashboard/sms-settings",
        icon: "MessageSquare",
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        title: "Profile",
        href: "/admin/dashboard/my-profile",
        icon: "User",
      },
    ],
  },
];

export const getNavItemsByRole = (role: UserRole): NavSection[] => {
  const commonNavItems = getCommonNavItems(role);

  switch (role) {
    case "SUPER_ADMIN":
    case "ADMIN":
      return [...commonNavItems, ...adminNavItems];

    case "USER":
      return [...commonNavItems, ...userNavItems];

    default:
      return commonNavItems;
  }
};
