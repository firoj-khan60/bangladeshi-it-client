"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ILead } from "@/types/lead.types";
import { format } from "date-fns";
import LeadStatusSelect from "./LeadStatusSelect";
import { toWhatsAppNumber } from "./leadColumns";
import { getSourceLabel } from "./leadConfig";

interface LeadDetailsDialogProps {
  lead: ILead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-3 gap-3 py-2.5 text-sm">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="col-span-2 font-medium break-words">{children || "—"}</dd>
    </div>
  );
}

const LeadDetailsDialog = ({ lead, open, onOpenChange }: LeadDetailsDialogProps) => {
  if (!lead) return null;

  const campaign = [lead.utmSource, lead.utmMedium, lead.utmCampaign].filter(Boolean).join(" / ");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{lead.name}</DialogTitle>
          <DialogDescription>
            Received {format(new Date(lead.createdAt), "MMM dd, yyyy · h:mm a")}
          </DialogDescription>
        </DialogHeader>

        <dl className="divide-y">
          <Row label="Phone">
            <span className="flex flex-wrap gap-3">
              <a href={`tel:${lead.phone}`} className="hover:text-highlight">{lead.phone}</a>
              <a
                href={`https://wa.me/${toWhatsAppNumber(lead.phone)}`}
                target="_blank"
                rel="noreferrer"
                className="text-[#25D366] hover:underline"
              >
                WhatsApp
              </a>
            </span>
          </Row>
          <Row label="Email">
            {lead.email && <a href={`mailto:${lead.email}`} className="hover:text-highlight">{lead.email}</a>}
          </Row>
          <Row label="Service">{lead.service}</Row>
          <Row label="Business">{lead.businessName}</Row>
          <Row label="Website">
            {lead.websiteUrl && (
              <a
                href={/^https?:\/\//.test(lead.websiteUrl) ? lead.websiteUrl : `https://${lead.websiteUrl}`}
                target="_blank"
                rel="noreferrer"
                className="text-highlight hover:underline"
              >
                {lead.websiteUrl}
              </a>
            )}
          </Row>
          <Row label="Note">{lead.note && <span className="whitespace-pre-wrap">{lead.note}</span>}</Row>
          <Row label="Landing page">{getSourceLabel(lead.source)}</Row>
          <Row label="Campaign">{campaign}</Row>
          <Row label="Status">
            <LeadStatusSelect lead={lead} />
          </Row>
        </dl>
      </DialogContent>
    </Dialog>
  );
};

export default LeadDetailsDialog;
