import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Modal,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import "./Favourites.css";
import * as DataManagement from "../../roots/GetData";

function Favourites() {
  const [data, setData] = useState<any>(null);

  return (
    <>
      <div className="full-page">
        {data ? (
          <>
            <div className="output">{data}</div>
          </>
        ) : (
          "Loading..."
        )}
      </div>
    </>
  );
}

export default Favourites;
