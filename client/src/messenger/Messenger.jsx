import Navbar from "../scenes/navbar"
import FlexBetween from "../componenets/FlexBetween"
import { Search } from "@mui/icons-material"
import { Box, IconButton ,InputBase,useTheme} from "@mui/material"
import Conversation from "../componenets/Conversation"
import WidgetWrapper from "../componenets/WidgetWrapper"

const Messenger = () => {
    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const primaryLight = theme.palette.primary;
    return (
        <Box>
            <Navbar/>
            <FlexBetween gap={2}>
                <WidgetWrapper  >
                    <FlexBetween
                            backgroundColor={neutralLight}
                            borderRadius="9px"
                            gap="3rem"
                            padding="0.1rem 1.5rem"
                        >
                            <InputBase placeholder="Search Friends" />
                            <IconButton>
                                <Search />
                            </IconButton>
                    </FlexBetween>
                    <Conversation/>
                    <Conversation/>
                    <Conversation/>
                    <Conversation/>
                </WidgetWrapper>

                <Box width={"60%"}>
                    ChatBox
                </Box>


                <FlexBetween width={"20%"}>
                    ChatOnline
                </FlexBetween>
            </FlexBetween>
        </Box>
    )
}
export  default Messenger