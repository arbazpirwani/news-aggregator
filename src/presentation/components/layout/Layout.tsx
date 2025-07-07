import * as React from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import { PageHeader } from "../molecules/PageHeader";

const headerConfig: Record<
  string,
  { title: string; actionLabel: string; actionLink: string }
> = {
  "/": { title: "Top Headlines", actionLabel: "Search", actionLink: "/search" },
  "/search": { title: "Search Articles", actionLabel: "Home", actionLink: "/" },
};

export function Layout() {
  const location = useLocation();
  const config = headerConfig[location.pathname] || {
    title: "",
    actionLabel: "",
    actionLink: "/",
  };

  return (
    <>
      <PageHeader
        title={config.title}
        actionLabel={config.actionLabel}
        actionLink={config.actionLink}
      />
      <Outlet />
    </>
  );
}
