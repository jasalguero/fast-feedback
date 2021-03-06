import React from "react";
import useSWR from "swr";

import DashboardShell from "@/components/DashboardShell";
import EmptyState from "@/components/sites/EmptyState";
import SiteTable from "@/components/sites/SiteTable";
import SiteTableHeader from "@/components/sites/SiteTableHeader";
import SiteTableSkeleton from "@/components/sites/SiteTableSkeleton";
import fetcher from "@/utils/fetcher";
import { useAuth } from "@/lib/auth";

const Dashboard = () => {
  const { user } = useAuth();
  const { data } = useSWR(user ? ["/api/sites", user?.token] : null, fetcher);
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
