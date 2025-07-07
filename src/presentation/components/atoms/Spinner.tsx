import * as React from "react";

export function Spinner() {
  return (
    <div className="flex justify-center py-4">
      <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  );
}
