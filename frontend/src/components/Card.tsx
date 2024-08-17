import * as React from "react";
import {
  ButtonBase,
  Chip,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system"; // Change to @mui/system

import { useSearchTags } from "../providers/SearchTags";
import { Item as ItemTypes } from "../types";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function Card({ item }: { item: ItemTypes }) {
  const { searchTags, handleTagAddition } = useSearchTags();
  const MAX_LENGTH = 200;
  const { name, materials_desc, materials, link, imgSrc, needle_sizes, gauge } =
    item;
  const prefix = "https://www.petiteknit.com/";

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const [yarn, brand] =
      event.currentTarget.textContent?.split(" - ").map((tag) => tag.trim()) ||
      [];

    if (yarn && brand) {
      handleTagAddition([yarn]);
    }
  };

  return (
    <Paper
      sx={{
        p: 2,
        margin: "auto",
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      }}
      style={{ marginBottom: "1rem" }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase
            sx={{ width: 128, height: 128 }}
            href={`${prefix}${link}`}
            target="_blank"
          >
            {/* <Skeleton variant="rectangular" width={128} height={128} /> */}
            <Img alt="complex" src={`${prefix}${imgSrc}`} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                {name}
              </Typography>
              <Typography variant="body2">
                {`${gauge.sts} sts x ${gauge.rows} rows [${gauge.needle_size}mm]`}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {`${needle_sizes.sort().join(" mm, ")} mm`}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {materials_desc.length > MAX_LENGTH
                  ? `${materials_desc.slice(0, MAX_LENGTH)}...`
                  : materials_desc}
              </Typography>
            </Grid>
            <Grid item>
              <Stack
                spacing={{ xs: 1, sm: 2 }}
                direction="row"
                useFlexGap
                flexWrap="wrap"
              >
                {materials.map((material, index) => {
                  const isTagSelected =
                    searchTags.includes(material.name) ||
                    searchTags.includes(material.brand);

                  const label = `${material.name} - ${material.brand}`;

                  return (
                    <Chip
                      key={index}
                      label={label}
                      style={{
                        backgroundColor: isTagSelected ? "#6fc276" : undefined,
                        color: isTagSelected ? "white" : undefined,
                      }}
                      {...(isTagSelected ? { clickable: false } : {})}
                      {...(isTagSelected ? {} : { onClick: handleClick })}
                      size="small"
                    />
                  );
                })}
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
