import type { ReactNode } from "react";
import ActivityTracker from "@/components/analytics/ActivityTracker";

type Props = {
  children: ReactNode;
};

export default function ActivityTrackingLayout({ children }: Props) {
  return (
    <>
      <ActivityTracker eventName="downloads_open" />
      {children}
    </>
  );
}
