import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
  } from "@mui/icons-material";
  import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
  import BookmarkIcon from '@mui/icons-material/Bookmark';
  import { Box, Divider, IconButton, Typography, useTheme,InputBase,Button } from "@mui/material";
  import FlexBetween from "../../componenets/FlexBetween";
  import Friend from "../../componenets/Friend";
  import WidgetWrapper from "../../componenets/WidgetWrapper";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setPost } from "../../state/index";
  
  const PostWidget = ({
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    saved,
    comments,
  }) => {
    const [isComments, setIsComments] = useState(false);
    const [comment,setComment] = useState("");
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const isLiked = Boolean(likes[loggedInUserId]);
    const isSaved = Boolean(saved[loggedInUserId]);
    const likeCount = Object.keys(likes).length;
    
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;
  
    const patchLike = async () => {
      const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      });
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
    };

    const patchSave = async () => {
      const response = await fetch(`http://localhost:3001/posts/${postId}/save`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      });
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
    };

    const handlePostComment = async() => {
      const response = await fetch(`http://localhost:3001/posts/add-comment`,{
        method : "POST",
        headers : {
          Authorization:`Bearer ${token}`,
          "Content-Type" : "application/json",
        },
        body : JSON.stringify({id : postId,comment})
      });
      const updatedPost = await response.json();
      dispatch(setPost({post:updatedPost}));
      setComment("")
    }
  
    return (
      <WidgetWrapper m="2rem 0">
        <Friend
          friendId={postUserId}
          name={name}
          subtitle={location}
          userPicturePath={userPicturePath}
        />
        <Typography color={main} sx={{ mt: "1rem" }}>
          {description}
        </Typography>
        {picturePath && (
          <img
            width="100%"
            height="auto"
            alt="post"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            src={`http://localhost:3001/assets/${picturePath}`}
          />
        )}
        <FlexBetween mt="0.25rem">
          <FlexBetween gap="1rem">
            <FlexBetween gap="0.3rem">
              <IconButton onClick={patchLike}>
                {isLiked ? (
                  <FavoriteOutlined sx={{ color: primary }} />
                ) : (
                  <FavoriteBorderOutlined />
                )}
              </IconButton>
              <Typography>{likeCount}</Typography>
            </FlexBetween>
  
            <FlexBetween gap="0.3rem">
              <IconButton onClick={() => setIsComments(!isComments)}>
                <ChatBubbleOutlineOutlined />
              </IconButton>
              <Typography>{comments.length}</Typography>
            </FlexBetween>
          </FlexBetween>

          <FlexBetween>
            <IconButton onClick={patchSave} >
                {
                  isSaved ? <BookmarkIcon sx={{ color: primary }}/> : <BookmarkBorderIcon/>
                }
            </IconButton>
    
            <IconButton>
              <ShareOutlined />
            </IconButton>
          </FlexBetween>
        </FlexBetween>
        {isComments && (
          <Box mt="0.5rem" >
            <FlexBetween 
            backgroundColor={palette.background.neutral}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            <InputBase value={comment} onChange={e => setComment(e.target.value)} placeholder="Comment it..." />
            <Button
            // disabled={!post}
            onClick={() => handlePostComment()}
            sx={{
              color: palette.background.alt,
              backgroundColor: palette.primary.main,
              borderRadius: "3rem",
              cursor:"pointer"
            }}
          >
            POST
          </Button>
          </FlexBetween>
            <Box sx={{maxHeight:"200px",overflowY:"scroll"}}>
            {comments.map((comment, i) => (
              <Box  key={`${name}-${i}`}>
                <Divider />
                <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                  {comment}
                </Typography>
              </Box>
            ))}
            <Divider />
            </Box>
            
            
          </Box>
        )}
      </WidgetWrapper>
    );
  };
  
  export default PostWidget;