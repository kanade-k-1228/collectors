import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import * as React from "react";

export function CollectionFooter(props: { viewTipe: string; onChange: (value: "map" | "list" | "photo") => void }) {
  return (
    <>
      <Paper
        sx={{
          position: "fixed",
          display: "static",
          bottom: 0,
          left: 0,
          right: 0,
        }}
        elevation={3}
      >
        <BottomNavigation value={props.viewTipe} onChange={(_, v) => props.onChange(v)}>
          <BottomNavigationAction label="List" value="list" icon={<FormatListBulletedIcon />} />
          <BottomNavigationAction label="Photo" value="photo" icon={<InsertPhotoIcon />} />
          <BottomNavigationAction label="Map" value="map" icon={<LocationOnIcon />} />
        </BottomNavigation>
      </Paper>
      <Paper
        sx={{
          display: "static",
          bottom: 0,
          left: 0,
          right: 0,
        }}
        elevation={3}
      >
        <BottomNavigation />
      </Paper>
    </>
  );
}
