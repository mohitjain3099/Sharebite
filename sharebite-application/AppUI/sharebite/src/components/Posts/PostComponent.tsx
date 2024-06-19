import React, { useEffect } from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AddLocation } from "@mui/icons-material";
import FormGroup from "@mui/material/FormGroup";
import Box from "@mui/material/Box";
import { getpost } from "../../services/api.service.getpost";
import { apiServiceGetFilterPost } from "../../services/api.service.getFilterPost";
import Media from "../../models/Media";
import Grid from "@mui/material/Grid";
import ListItemIcon from "@mui/material/ListItemIcon";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import "../../dist/main.css";
import { format } from "date-fns";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/user-slice";
import { User } from "../../models/User";
import patchPostData from "../../services/api.service.patchPostData";
import postDelete from "../../services/api.service.postDelete";
import Constants from '../../AppConstants';

// ExpandMore Props Type
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}
// ExpandMore Styling
const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
// PostComponent Props Type
interface PostComponentProps {
  searchKeyWord?: string;
  isDashboard?: boolean;
  postPerRow: number;
}
// PostComponent Function
function PostComponent({
  searchKeyWord,
  postPerRow,
  isDashboard,
}: PostComponentProps) {
  // PostComponent State
  const [postData, setPostData] = useState([] as Media[]);
  const [expanded, setExpanded] = useState<boolean[]>([]);
  const [isExpanded, setIsExpanded] = useState<Record<number, boolean>>({});
  const user: User | null = useSelector(selectUser());
  // PostComponent useEffect Hook
  useEffect(() => {
    console.log("Search Key Word:" + searchKeyWord);
    if (searchKeyWord !== undefined) {
      console.log("Search Key Word:" + searchKeyWord);
      if (searchKeyWord) {
        apiServiceGetFilterPost(searchKeyWord).then((data) => {
          console.log("Post Data:" + JSON.stringify(data));
          setPostData(data);
          setExpanded(new Array(data.length).fill(false));
        });
      } else if (isDashboard) {
        searchKeyWord = user?.id;
        apiServiceGetFilterPost(searchKeyWord ?? "").then((data) => {
          console.log("Post Data:" + JSON.stringify(data));
          // Filter the data where isDelivered is 0
          const filteredData = data.filter((post: { isDelivered: number; }) => post.isDelivered === 0);
          setPostData(filteredData);
          setExpanded(new Array(filteredData.length).fill(false));
        });
      } else {
        getpost().then((data) => {
          console.log("Post Data:" + JSON.stringify(data));
          setPostData(data);
          setExpanded(new Array(data.length).fill(false));
        });
      }
    }
  }, [searchKeyWord]);

  const updateMealsDelivered = () => {
    console.log("updateMealsDelivered is called");

    const currentYear = new Date().getFullYear().toString();

    fetch(`${Constants.API_URL}/graphicalDatas`)
      .then((response) => response.json())
      .then((data) => {
        const currentYearPost = data.find(
          (post: { _id: string; year: string; MealsDelivered: number }) =>
            post.year === currentYear
        );

        if (currentYearPost) {
          const updatedMealsDelivered = currentYearPost.MealsDelivered + 1;

          fetch(`${Constants.API_URL}/graphicalDatas/${currentYearPost._id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              MealsDelivered: updatedMealsDelivered,
            }),
          }).then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            console.log("Update successful");
          });
        } else {
          console.log("No post found for the current year");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  // handleExpandClickDescription Function for Description Expand
  const handleExpandClickDescription = (postId: number) => {
    setIsExpanded((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };
  // patchPostDatas Function for Patch Data
  const patchPostDatas = async (postData: any, id: any) => {
    console.log("Patch Data:" + JSON.stringify(postData));
    await patchPostData(postData, id);
    // Add a delay before refreshing the page
    setTimeout(async () => {
      const data = await getpost();
      console.log("Post Data:" + JSON.stringify(data));
      setPostData(data);
      setExpanded(new Array(data.length).fill(false));
    }, 1000); // Delay for 1 second
  };
  // handleExpandClick Function for Expand
  const handleExpandClick = (index: number) => {
    setExpanded((prevExpanded) => {
      const newExpanded = [...prevExpanded];
      newExpanded[index] = !newExpanded[index];
      return newExpanded;
    });
  };
  // openGoogleMap Function for Open Google Map
  const openGoogleMap = (lat: any, lng: any) => {
    const latlng = encodeURIComponent(`${lat}, ${lng}`);
    const url = `https://www.google.com/maps/search/?api=1&query=${latlng}`;
    console.log("URL Map:" + url);
    window.open(url);
  };
  // deletePost Function for Delete Post
  const deletePost = async (id: any) => {
    console.log("Delete Post Id:" + id);
    await postDelete(id);
  };
  return (
    <>
      <Grid
        container
        spacing={2}
        key={postData.map((post) => post.id).join("_")}
      >
        {postData.map((post, index) => (
          <Grid item xs={12} sm={6} md={12 / postPerRow}>
            <Card sx={{ width: "400px", margin: "auto", borderRadius: "10px" }}>
              <CardMedia
                component="img"
                height="250px"
                image={post.image}
                alt="Post image"
              />
              <CardContent
                sx={{
                  paddingBottom: "0px",
                  paddingRight: "10px",
                  marginRight: "10px",
                  marginLeft: "10px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#FD514E",
                  }}
                  variant="body2"
                  color="text.secondary"
                >
                  {post.title}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      marginTop: "10px",
                      overflow: isExpanded[post.id] ? "visible" : "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: isExpanded[post.id] ? "none" : 2,
                      WebkitBoxOrient: "vertical",
                    }}
                    variant="body2"
                    color="text.secondary"
                  >
                    {post.caption}
                  </Typography>
                  {post.caption.length > 100 && (
                    <IconButton
                      sx={{ color: "#FD514E" }}
                      onClick={() => handleExpandClickDescription(post.id)}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  )}
                </Box>
                <Typography
                  sx={{ fontSize: "16px", marginTop: "10px" }}
                  variant="body2"
                  color="text.secondary"
                >
                  <IconButton
                    aria-label="add location"
                    sx={{ padding: "0px", color: "#FD514E" }}
                    onClick={() => {
                      const coordinates =
                        typeof post.location.coordinates === "string"
                          ? JSON.parse(post.location.coordinates)
                          : post.location.coordinates;
                      openGoogleMap(coordinates.lat, coordinates.lng);
                    }}
                  >
                    <AddLocation />
                  </IconButton>
                  {post.location.city}, {post.location.state}
                </Typography>
              </CardContent>
              <CardActions disableSpacing sx={{ justifyContent: "center" }}>
                <ExpandMore
                  expand={expanded[index]}
                  onClick={() => handleExpandClick(index)}
                  aria-expanded={expanded[index]}
                  aria-label="show more"
                  sx={{
                    paddingTop: "0px",
                    paddingBottom: "0px",
                    marginLeft: "0",
                    marginRight: "0",
                    color: "#FD514E",
                  }}
                >
                  <ExpandMoreIcon sx={{ padding: "0px", margin: "0px" }} />
                </ExpandMore>
              </CardActions>
              <Collapse in={expanded[index]} timeout="auto" unmountOnExit>
                <CardContent
                  sx={{
                    marginRight: "10px",
                    marginLeft: "10px",
                    paddingBottom: "5px",
                  }}
                >
                  {post.postType === "FoodAvailabilityPost" && (
                    <>
                      <div className="flex-row">
                        <Typography
                          sx={{
                            fontSize: "16px",
                            fontWeight: "bold",
                            color: "#FD514E",
                            padding: "0px",
                          }}
                          variant="body2"
                        >
                          Shelf Life
                        </Typography>
                        <Typography
                          sx={{ fontSize: "16px", padding: "0px" }}
                          variant="body2"
                          color="text.secondary"
                        >
                          {post.mediaDetails.shelfLife}
                        </Typography>
                      </div>
                      <Typography
                        sx={{
                          fontSize: "16px",
                          marginTop: "10px",
                          color: "#FD514E",
                          fontWeight: "bold",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                        variant="body2"
                        color="text.secondary"
                      >
                        <label htmlFor="isVeg">Is Veg</label>
                        <input
                          type="checkbox"
                          id="isVeg"
                          name="isVeg"
                          value="isVeg"
                          checked={post.mediaDetails.isVeg}
                        />
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          color: "#FD514E",
                          marginTop: "10px",
                        }}
                        variant="body2"
                      >
                        Allergens
                      </Typography>
                      <FormGroup>
                        {post.mediaDetails.allergens?.map((allergen) => (
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <ListItemIcon>
                              <FiberManualRecordIcon
                                sx={{
                                  color: "#FD514E",
                                  fontSize: "small",
                                  marginLeft: "20px",
                                }}
                              />
                            </ListItemIcon>
                            <Typography
                              sx={{ fontSize: "16px", marginTop: "10px" }}
                              variant="body2"
                              color="text.secondary"
                            >
                              {allergen}
                            </Typography>
                          </div>
                        ))}
                      </FormGroup>
                    </>
                  )}
                  {post.postType === "RawMaterialPost" && (
                    <>
                      <div className="flex-row">
                        <Typography
                          sx={{
                            fontSize: "16px",
                            fontWeight: "bold",
                            color: "#FD514E",
                            padding: "0px",
                          }}
                          variant="body2"
                        >
                          Shelf Life
                        </Typography>
                        <Typography
                          sx={{ fontSize: "16px", padding: "0px" }}
                          variant="body2"
                          color="text.secondary"
                        >
                          {post.mediaDetails.shelfLife}
                        </Typography>
                      </div>
                      <div className="flex-row">
                        <Typography
                          sx={{
                            fontSize: "16px",
                            fontWeight: "bold",
                            color: "#FD514E",
                            padding: "0px",
                          }}
                          variant="body2"
                        >
                          Quantity
                        </Typography>
                        <Typography
                          sx={{ fontSize: "16px", padding: "0px" }}
                          variant="body2"
                          color="text.secondary"
                        >
                          {post.mediaDetails.quantity} {post.mediaDetails.unit}
                        </Typography>
                      </div>
                    </>
                  )}
                  {user?.role === "delivery" && (
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Button
                        onClick={() => {
                          const postData = {
                            isPickedUp: 1,
                            deliveryId: user.id
                          };
                          patchPostDatas(postData, post.id);
                        }}
                        sx={{
                          backgroundColor: "black",
                          marginTop: "10px",
                          borderRadius: "20px",
                          marginBottom: "0px",
                          "&:hover": {
                            backgroundColor: "#FD514E",
                          },
                        }}
                        variant="contained"
                        color="primary"
                        disabled={post.isPickedUp !== 0}
                      >
                        PickUp
                      </Button>
                    </Box>
                  )}
                  {post.isPickedUp === 1 && (
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Button
                        onClick={() => {
                          const postData = {
                            isDeliveryDone: 1,
                          };
                          patchPostDatas(postData, post.id);
                          updateMealsDelivered();
                          window.location.reload();
                        }}
                        sx={{
                          backgroundColor: "black",
                          marginTop: "10px",
                          borderRadius: "20px",
                          marginBottom: "0px",
                          "&:hover": {
                            backgroundColor: "#FD514E",
                          },
                        }}
                        variant="contained"
                        color="primary"
                        disabled={post.isDeliveryDone !== 0}
                      >
                        Delivered
                      </Button>
                    </Box>
                  )}
                </CardContent>
              </Collapse>
              <CardContent
                sx={{
                  paddingTop: "0px",
                  paddingBottom: "0px",
                  display: "flex",
                  justifyContent: "space-between",
                  marginRight: "10px",
                  marginLeft: "10px",
                }}
              >
                <Typography
                  sx={{ fontSize: "16px", marginTop: "10px", color: "#FD514E" }}
                  variant="body2"
                  color="text.secondary"
                >
                  {format(new Date(post.updatedAt), "yyyy-MM-dd HH:mm")}
                </Typography>
                <Typography
                  sx={{ fontSize: "16px", marginTop: "10px", color: "#FD514E" }}
                  variant="body2"
                  color="text.secondary"
                >
                  {post.author}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
export default PostComponent;
