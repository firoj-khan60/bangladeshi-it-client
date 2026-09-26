"use client";

import DataTable from "@/components/shared/table/DataTable";
import { useRowActionModalState } from "@/hooks/useRowActionModalState";
import { useServerManagedDataTable } from "@/hooks/useServerManagedDataTable";
import {
  serverManagedFilter,
  useServerManagedDataTableFilters,
} from "@/hooks/useServerManagedDataTableFilters";
import { useServerManagedDataTableSearch } from "@/hooks/useServerManagedDatatableSearch";
import { getLeads } from "@/services/lead.services";
import { PaginationMeta } from "@/types/api.types";
import { ILead } from "@/types/lead.types";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import DeleteLeadConfirmationDialog from "./DeleteLeadConfirmationDialog";
import LeadDetailsDialog from "./LeadDetailsDialog";
import { leadColumns } from "./leadColumns";
import { LEAD_SOURCE_OPTIONS, LEAD_STATUS_OPTIONS } from "./leadConfig";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;

const FILTER_DEFINITIONS = [
  serverManagedFilter.single("status"),
  serverManagedFilter.single("source"),
];

const FILTER_CONFIGS = [
  {
    id: "status",
    label: "Status",
    type: "single-select" as const,
    options: LEAD_STATUS_OPTIONS.map(({ value, label }) => ({ value, label })),
  },
  {
    id: "source",
    label: "Landing page",
    type: "single-select" as const,
    options: LEAD_SOURCE_OPTIONS,
  },
];

const LeadTable = ({ initialQueryString }: { initialQueryString: string }) => {
  const searchParams = useSearchParams();
  const {
    viewingItem,
    isViewDialogOpen,
    onViewOpenChange,
    deletingItem,
    isDeleteDialogOpen,
    onDeleteOpenChange,
    tableActions,
  } = useRowActionModalState<ILead>({ enableEdit: false });

  const {
    queryStringFromUrl,
    optimisticSortingState,
    optimisticPaginationState,
    isRouteRefreshPending,
    updateParams,
    handleSortingChange,
    handlePaginationChange,
  } = useServerManagedDataTable({
    searchParams,
    defaultPage: DEFAULT_PAGE,
    defaultLimit: DEFAULT_LIMIT,
  });

  const queryString = queryStringFromUrl || initialQueryString;

  const { searchTermFromUrl, handleDebouncedSearchChange } =
    useServerManagedDataTableSearch({ searchParams, updateParams });

  const { filterValues, handleFilterChange, clearAllFilters } =
    useServerManagedDataTableFilters({
      searchParams,
      definitions: FILTER_DEFINITIONS,
      updateParams,
    });

  const { data: leadResponse, isLoading, isFetching } = useQuery({
    queryKey: ["leads", queryString],
    queryFn: () => {
      const params = Object.fromEntries(new URLSearchParams(queryString));
      return getLeads(params);
    },
  });

  const leads = leadResponse?.data ?? [];
  const meta: PaginationMeta | undefined = leadResponse?.meta;

  // Read the open lead from the latest list so a status change shows up in the dialog
  const viewingLead = viewingItem
    ? (leads.find((lead) => lead.id === viewingItem.id) ?? viewingItem)
    : null;

  return (
    <>
      <DataTable
        data={leads}
        columns={leadColumns}
        isLoading={isLoading || isFetching || isRouteRefreshPending}
        emptyMessage="No leads yet."
        sorting={{
          state: optimisticSortingState,
          onSortingChange: handleSortingChange,
        }}
        pagination={{
          state: optimisticPaginationState,
          onPaginationChange: handlePaginationChange,
        }}
        search={{
          initialValue: searchTermFromUrl,
          placeholder: "Search by name, phone, email or business...",
          debounceMs: 700,
          onDebouncedChange: handleDebouncedSearchChange,
        }}
        filters={{
          configs: FILTER_CONFIGS,
          values: filterValues,
          onFilterChange: handleFilterChange,
          onClearAll: clearAllFilters,
        }}
        meta={meta}
        actions={{ onView: tableActions.onView, onDelete: tableActions.onDelete }}
      />

      <LeadDetailsDialog
        lead={viewingLead}
        open={isViewDialogOpen}
        onOpenChange={onViewOpenChange}
      />

      <DeleteLeadConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={onDeleteOpenChange}
        lead={deletingItem}
      />
    </>
  );
};

export default LeadTable;
