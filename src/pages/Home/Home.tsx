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
  ButtonBase
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import React, { useState, useEffect } from "react";
import "./Home.css";
import * as PlaylistManagement from "../../roots/GetData";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Margin, MarginOutlined } from "@mui/icons-material";

// import '@fontsource/roboto/300.css';
// import '@fontsource/oswald/300.css';



function Home(songData: any) {
  // const searchData = songData();
  const [data, setData] = useState<any>(null);
  const [openModal, setOpenModal] = useState<boolean>(true);
  const [id, setID] = useState<any>(null);
  const [favourites, setFavourites] = useState<string[]>([]);
  const theme = createTheme({
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Oswald"'
      ].join(','),
      body2: {
        // fontWeight: 500,
        textAlign: 'left',
        fontFamily: "Oswald",
        fontSize: 32,
        fontWeight: 700,
        lineHeight: 47,
        letterSpacing:0,
      },
    },
  });


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

  // const openDetails = (id: string) => {
  //   console.log(id);
  //   setOpenModal(true);
  // };

  const toggleModal = (id: string) => {
    console.log('clicked on toggle modal');
    console.log(id);
    setOpenModal(true);
  }

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
      sx={{
        maxHeight: 405,
        borderRadius: 16,
        ':hover': {
            boxShadow: 20,
            
            // .learn-more-button{
            //   display: inline;
            // }
             // theme.shadows[20]
          },
          width: 330,
          // p: 2,
          // ml: 2,
          // mr: 2
          // marginRight: 50, 
          // marginLeft: 50,
          // marginInline: 100,
          // marginBlock: 5,
          // marginLeft 10,
          // ml: 5,
          // mr: 5,
          // pl: 2, 
          // pr: 2
      }}
    >
      <div className="learn-more-button">
        {/* <Button size="medium" sx={{ color: "#fff" }} onClick={toggleModal(id)}> */}
        <Button size="medium" sx={{ color: "#fff" }} onClick={() => toggleModal(id)}>
          Learn More
        </Button>
      </div>

      <CardMedia
        sx={{ height: 240 }}
        //!----HINT HINT HINT------!//
        //!----Check the docs of materialUI to see how CardMedia interacts and uses images------!//
        //!----HINT HINT HINT------!//
        title={artist.name}
        component="img"
        height="330"
        // image="/static/images/cards/paella.jpg"
        image={album.cover_big}
        alt={album.title}
      
      />
      <CardContent sx={{ height: 30 }}>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2">{artist.name}</Typography>
      </CardContent>
      {/* ---- heart icon ---- */}

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
      {/* ---- heart icon ---- */}
      {/* <div className="modal" id="modal">
        <h1>{searchCriteria}</h1>
        <button className="button close-button"></button>
      </div> */}

    </Card>
  ));

  return (
    <>
              <div>
          <p className="text-search"> {songData.songData} </p>
          </div>
      <div className="full-page">
      <div><p className="text-navbar">{}</p></div>
            <div>
          <p className="text-search"> {} </p>
          </div>
        {data ? (
          <>
            <div className="output">{listItems}</div>
          </>
        ) : (
          "Loading..."
        )}

        {openModal && id && (
          // ---- the pop up::??
          <Modal
            open={openModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="song-modal"
            sx={{p:20, m:20, border: '20px pink'}}
            
          >
            <Box className="modal-content" sx={{ p:2, border: '5px pink', margin:50, justifyContent: 'flex-start',
             ml:20, mr: 200, pl: 200, pr:200, 
             
             }}>
              {/* <ButtonBase onClick={() => openPopUp()}> */}
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
              {/* </ButtonBase> */}
            </Box> 
            
          </Modal>
        )}
      </div>
    </>
  );
                    }

export default Home;
