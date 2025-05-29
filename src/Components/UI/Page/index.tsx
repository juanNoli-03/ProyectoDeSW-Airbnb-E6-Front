import React, { ReactNode } from "react";
import Header from "../Header";
import { useLocation } from "react-router-dom";
import { AccommodationFilters } from "../../../model/AccommodationFilters";

interface Props {
  setFilters: (filtersValue: AccommodationFilters) => void;
  children: ReactNode;
}

export default function Page({ children, setFilters }: Props) {
  const location = useLocation();
  const ocultarHeader = ["/signUp", "/login", "/accommodationDetails/"].includes(location.pathname);

  return (
    <div>
      {!ocultarHeader && <Header setFilters={setFilters} />}
      <main style={{ minHeight: "80.9vh", background: "white" }}>
        {children}
      </main>
    </div>
  );
}
