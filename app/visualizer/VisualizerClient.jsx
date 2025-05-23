"use client";
import { useState } from "react";
import SearchBar from "@/app/components/ui/SearchBar";
import SectionsDisplay from "@/app/components/SectionsDisplay";

const VisualizerClient = ({ initialSections }) => {
  const [filteredSections, setFilteredSections] = useState(initialSections);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
     { /* search bar display */ }
      <div className="mb-10">
        <SearchBar
          sections={initialSections}
          onSearchResults={setFilteredSections}
          setSearchQuery={setSearchQuery}
        />
      </div>

      { /* section display */ }
      <div>
        <SectionsDisplay
          sections={filteredSections}
          searchQuery={searchQuery}
        />
      </div>
    </>
  );
};

export default VisualizerClient;
