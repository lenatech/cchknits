import React, { useEffect, useRef } from "react";

import data from "../api/data.json";
import { useSearchTags } from "../providers/SearchTags";
import { Item as ItemTypes } from "../types";
import { filterBySearchTags } from "../utils/commons";

import Card from "./Card";

export default function PatternList() {
  const { searchTags, needles } = useSearchTags();
  const scrollableContentRef = useRef<HTMLDivElement>(null);

  const items: ItemTypes[] = data.items;
  const filteredItems = filterBySearchTags(items, searchTags, needles);

  useEffect(() => {
    const resizeHandler = () => {
      if (scrollableContentRef.current) {
        const searchBarHeight =
          scrollableContentRef.current.getBoundingClientRect().height;
        const windowHeight = window.innerHeight;
        const scrollableContentHeight = windowHeight - searchBarHeight;
        scrollableContentRef.current.style.height = `${scrollableContentHeight}px`;
      }
    };

    resizeHandler();
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  useEffect(() => {
    if (scrollableContentRef.current) {
      scrollableContentRef.current.scrollTop = 0;
    }
  }, [searchTags]);

  return (
    <div
      ref={scrollableContentRef}
      style={{
        overflowY: "auto",
      }}
    >
      {filteredItems.map((filteredItem, index) => (
        <div
          key={index}
          style={{
            marginBottom: "0.25rem",
          }}
        >
          <Card item={filteredItem} />
        </div>
      ))}
    </div>
  );
}
