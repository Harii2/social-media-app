import FlexBetween from "./FlexBetween"
import UserImage from "./UserImage"
import { Typography ,useTheme} from "@mui/material"

const Conversation = () => {
    const { palette } = useTheme();
    const primaryLight = palette.primary.light;
    const medium = palette.neutral.medium;
    return(
        <FlexBetween sx={{paddingTop:"10px",justifyContent:"flex-start",cursor:"pointer",marginTop:"1rem",
        "&:hover":{
            color:{primaryLight}
        }

        }}>
            <UserImage image={"p4.jpeg"} size="40px"/>
            <Typography color={medium} fontSize="1rem" fontWeight={"500"} paddingLeft={"10px"}>John Doe</Typography>
        </FlexBetween>
    )
}

export default Conversation