export type LeadStatus = "NEW" | "CONTACTED" | "CONVERTED" | "CLOSED";

export interface ILead {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  service: string;
  businessName: string | null;
  websiteUrl: string | null;
  note: string | null;
  source: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  status: LeadStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateLeadPayload {
  name: string;
  phone: string;
  email?: string;
  service: string;
  businessName?: string;
  websiteUrl?: string;
  note?: string;
  source?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}
