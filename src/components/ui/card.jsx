
import React from "react";
import classNames from "classnames";

export function Card({ children, className }) {
  return (
    <div
      className={classNames("bg-white rounded-2xl shadow-md p-4", className)}
    >
      {children}
    </div>
  );
}

export function CardContent({ children }) {
  return <div className="text-center text-xl">{children}</div>;
}
