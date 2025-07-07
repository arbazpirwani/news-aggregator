import { ReactNode } from "react";
import { DependencyContext, defaultDependencies } from "./dependencies";

export function DependencyProvider({ children }: { children: ReactNode }) {
  return (
    <DependencyContext.Provider value={defaultDependencies}>
      {children}
    </DependencyContext.Provider>
  );
}
