import { Box,  useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Navbar from "../navbar/index.jsx"
import UserWidget from "../widgets/UserWidget.jsx"
import MyPostWidget from "../widgets/MyPostWidget.jsx"
import PostsWidget from "../widgets/PostsWidget.jsx"
import FriendListWidget from "../widgets/FriendListWidget";
import FlexBetween from "../../componenets/FlexBetween.jsx";
// import PostWidget from "../widgets/PostWidget.jsx";

import { FavoriteOutlined} from "@mui/icons-material"
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useTheme } from "@mui/material";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  // const posts = useSelector((state) => state.posts);
  // console.log(posts)
  

  const { palette } = useTheme();
  // const main = palette.neutral.main;
  const primary = palette.primary.main;

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
     
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <FriendListWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <PostsWidget userId={userId} isProfile />

          <Box>
          <FlexBetween sx={{paddingTop:"1rem",paddingBottom:"1rem"}}>
            {/* <FavoriteOutlined  sx={{ color: primary }}/> 
            <BookmarkIcon sx={{ color: primary }}/>  */}
          </FlexBetween>

          {/* {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          saved,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            saved={saved}
            comments={comments}
          />
        ) */}
      {/* )} */}

        </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;