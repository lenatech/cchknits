import React, { useEffect, useRef } from "react";
import { makeStyles } from "@mui/styles";

import data from "../api/data.json";
import { useSearchTags } from "../providers/SearchTags";
import { Item as ItemTypes } from "../types";
import { filterBySearchTags } from "../utils/commons";

import Card from "./Card";

const useStyles = makeStyles({
  scrollableContent: {
    overflowY: "auto",
    "& > *": {
      marginBottom: "0.25rem",
    },
  },
});

export default function PatternList() {
  const classes = useStyles();
  const { searchTags } = useSearchTags();
  const scrollableContentRef = useRef<HTMLDivElement>(null);

  const items: ItemTypes[] = data.items;
  const filteredItems = filterBySearchTags(items, searchTags);

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
    <div ref={scrollableContentRef} className={classes.scrollableContent}>
      {filteredItems.map((filteredItem, index) => (
        <Card key={index} item={filteredItem} />
      ))}
    </div>
  );
}
