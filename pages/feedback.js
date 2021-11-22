import React from "react";
import useSWR from "swr";

import DashboardShell from "@/components/DashboardShell";
import EmptyState from "@/components/feedback/EmptyState";
import FeedbackTable from "@/components/feedback/FeedbackTable";
import FeedbackTableHeader from "@/components/feedback/FeedbackTableHeader";
import SiteTableSkeleton from "@/components/sites/SiteTableSkeleton";
import fetcher from "@/utils/fetcher";
import { useAuth } from "@/lib/auth";

const Dashboard = () => {
  const { user } = useAuth();
  const { data } = useSWR(user ? ["/api/feedback", user?.token] : null, fetcher);
  const feedbacks = data?.feedbacks;

  if (!data) {
    return (
      <DashboardShell>
        <FeedbackTableHeader />
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <FeedbackTableHeader />
      {feedbacks.length ? <FeedbackTable feedbacks={feedbacks} /> : <EmptyState />}
    </DashboardShell>
  );
};

export default Dashboard;
