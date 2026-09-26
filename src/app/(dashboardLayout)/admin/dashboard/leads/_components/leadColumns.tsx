import DateCell from "@/components/shared/cell/DateCell";
import { ILead } from "@/types/lead.types";
import { ColumnDef } from "@tanstack/react-table";
import { Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import LeadStatusSelect from "./LeadStatusSelect";
import { getSourceLabel } from "./leadConfig";

/** 01XXXXXXXXX → 8801XXXXXXXXX for wa.me links */
export const toWhatsAppNumber = (phone: string) => {
  const digits = phone.replace(/[^\d]/g, "");
  return digits.startsWith("0") ? `88${digits}` : digits;
};

export const leadColumns: ColumnDef<ILead>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "Name",
    enableSorting: false,
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.original.name}</span>
        <span className="text-xs text-muted-foreground">
          {row.original.businessName || row.original.email || "—"}
        </span>
      </div>
    ),
  },
  {
    id: "phone",
    accessorKey: "phone",
    header: "Phone",
    enableSorting: false,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <a href={`tel:${row.original.phone}`} className="flex items-center gap-1.5 text-sm font-medium hover:text-highlight">
          <Phone className="h-3.5 w-3.5" />
          {row.original.phone}
        </a>
        <a
          href={`https://wa.me/${toWhatsAppNumber(row.original.phone)}`}
          target="_blank"
          rel="noreferrer"
          title="WhatsApp"
          className="text-[#25D366] hover:opacity-80"
        >
          <FaWhatsapp className="h-4 w-4" />
        </a>
      </div>
    ),
  },
  {
    id: "service",
    accessorKey: "service",
    header: "Service",
    enableSorting: false,
    cell: ({ row }) => <span className="block max-w-56 truncate text-sm">{row.original.service}</span>,
  },
  {
    id: "source",
    accessorKey: "source",
    header: "Source",
    enableSorting: false,
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-sm">{getSourceLabel(row.original.source)}</span>
        {row.original.utmCampaign && (
          <span className="text-xs text-muted-foreground">{row.original.utmCampaign}</span>
        )}
      </div>
    ),
  },
  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    enableSorting: false,
    cell: ({ row }) => <LeadStatusSelect lead={row.original} />,
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Received",
    cell: ({ row }) => <DateCell date={row.original.createdAt} formatString="MMM dd, yyyy · h:mm a" />,
  },
];
