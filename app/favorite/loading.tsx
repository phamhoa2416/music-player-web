"use client"

import Box from "@/components/Box"
import { BounceLoader } from "react-spinners";

const Loading = () => {
    return (  
        <Box className="h-full flex items-center justify-center">
            <BounceLoader color="#cc6ce7" size={40}/>
            Đang tải...
        </Box>
    );
}
 
export default Loading;