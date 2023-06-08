import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  TextField,
  Modal,
  Box,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import React, { useState, useEffect } from "react";
import "./Home.css";
import * as PlaylistManagement from "../../roots/GetData";

function Home(songData: any) {
  const [data, setData] = useState<any>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [id, setID] = useState<any>(null);
  const [favourites, setFavourites] = useState<string[]>([]);

  useEffect(() => {
    const getPlaylistData = async () => {
      try {
        //!----HINT HINT HINT------!//
        //!----These variable names are shocking - take some time and find out some better alternatives that should be used------!//
        //!----HINT HINT HINT------!//
        const thingy = await PlaylistManagement.GET_SEARCH(songData.songData);
        const thiny2 = await thingy.json();
        setData(thiny2);
      } catch (e) {
        console.log(e);
      }
    };

    getPlaylistData();
  }, [songData, favourites]);

  const handleFavourite = (id: string) => {
    console.log(id);
    if (favourites.includes(id)) {
      let temp = favourites.filter((val: string) => {
        return val !== id;
      });
      setFavourites(temp);
    } else {
      setFavourites((prevFavourites) => [...prevFavourites, id]);
    }
  };

  //!----HINT HINT HINT------!//
  //!----Create a function to change the songs duration into minutes and seconds here p.s. stackoverflow will help here massively ------!//
  //!----HINT HINT HINT------!//

  const listItems = data?.data.map(({ id, artist, album, title }: any) => (
    <Card
      key={id}
      className="custom-card"

      //!----HINT HINT HINT------!//
      //!----These inline stylings can be useful for certain parts of the code - try adding a hover css to apply shadow changes------!//
      //!----HINT HINT HINT------!//
      // sx={{
      //   maxHeight: 405,
      // }}
    >
      <div className="learn-more-button">
        <Button size="medium" sx={{ color: "#fff" }}>
          Learn More
        </Button>
      </div>
      <CardMedia
        sx={{ height: 240 }}
        //!----HINT HINT HINT------!//
        //!----Check the docs of materialUI to see how CardMedia interacts and uses images------!//
        //!----HINT HINT HINT------!//
        title={artist.name}
      />
      <CardContent sx={{ height: 30 }}>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2">{artist.name}</Typography>
      </CardContent>
      <CardActions sx={{ height: 105, paddingTop: 3 }}>
        <IconButton
          aria-label="add to favorites"
          className="card-icon"
          onClick={() => handleFavourite(id)}
        >
          {!favourites.includes(id) ? (
            <FavoriteBorderOutlinedIcon />
          ) : (
            <FavoriteIcon sx={{ color: "#e91e63" }} />
          )}
        </IconButton>
      </CardActions>
    </Card>
  ));

  return (
    <>
      <div className="full-page">
        {data ? (
          <>
            <div className="output">{listItems}</div>
          </>
        ) : (
          "Loading..."
        )}

        {openModal && id && (
          <Modal
            open={openModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="song-modal"
          >
            <Box className="modal-content">
              <img src={id.artist.picture_xl} className="modal-image" />
              <div className="modal-text">
                <div className="title_favourite">
                  <Typography
                    id="modal-modal-title"
                    variant="h4"
                    component="h4"
                  >
                    {id.title}
                  </Typography>
                  <IconButton
                    aria-label="add to favorites"
                    onClick={() => handleFavourite(id)}
                  >
                    {!favourites.includes(id) ? (
                      <FavoriteBorderOutlinedIcon />
                    ) : (
                      <FavoriteIcon sx={{ color: "#e91e63" }} />
                    )}
                  </IconButton>
                </div>
                <Typography
                  className="modal-album-title"
                  variant="h6"
                  component="h6"
                >
                  {id.album.title}
                </Typography>
                <span className="divider"></span>
                <Typography className="modal-modal-description" sx={{ mt: 2 }}>
                  Artist: <div className="album-info">{id.artist.name}</div>
                </Typography>
                <Typography className="modal-modal-description" sx={{ mt: 2 }}>
                  Album: <div className="album-info">{id.album.title}</div>
                </Typography>
                <Typography className="modal-modal-description" sx={{ mt: 2 }}>
                  Duration: <div className="album-info">{id.duration}</div>
                </Typography>
              </div>
              <audio className="modal-audio" controls src={id.preview} />
            </Box>
          </Modal>
        )}
      </div>
    </>
  );
}

export default Home;
