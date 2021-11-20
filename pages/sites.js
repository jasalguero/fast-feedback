import React from "react";
import useSWR from "swr";

import DashboardShell from "@/components/DashboardShell";
import EmptyState from "@/components/EmptyState";
import SiteTable from "@/components/SiteTable";
import SiteTableHeader from "@/components/SiteTableHeader";
import SiteTableSkeleton from "@/components/SiteTableSkeleton";
import fetcher from "@/utils/fetcher";

const Dashboard = () => {
  const { data } = useSWR("/api/sites", fetcher);
  const sites = data?.sites;

  if (!data) {
    return (
      <DashboardShell>
        <SiteTableHeader />
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <SiteTableHeader />
      {sites.length ? <SiteTable sites={sites} /> : <EmptyState />}
    </DashboardShell>
  );
};

export default Dashboard;
