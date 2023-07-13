import * as React from "react";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import Chip from "@mui/material/Chip";
import Skeleton from "@mui/material/Skeleton";

import { Item as ItemTypes } from "../types";

const useStyles = makeStyles({
  chipContainer: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: "0.25rem",
    },
  },
});

export default function Card({
  item,
  searchTags,
}: {
  item: ItemTypes;
  searchTags: string[];
}) {
  const classes = useStyles();
  const MAX_LENGTH = 200;
  const { name, collection, materials_desc, materials, link } = item;
  const prefix = "https://www.petiteknit.com/";

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
            <Skeleton variant="rectangular" width={128} height={128} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                {name}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {collection}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {materials_desc.length > MAX_LENGTH
                  ? `${materials_desc.slice(0, MAX_LENGTH)}...`
                  : materials_desc}
              </Typography>
            </Grid>
            <Grid item>
              <div className={classes.chipContainer}>
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
                      size="small"
                    />
                  );
                })}
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
