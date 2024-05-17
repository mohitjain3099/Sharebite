import React, {useState} from "react";
import PostComponent from "../components/Posts/PostComponent";
// PostPageForProfile
function PostPageForProfile() {
    // State for search keyword
    const [searchKeyWord, setSearchKeyWord] = useState('');
    return (
        <>
            {/* PostComponent component */}
            <PostComponent searchKeyWord={searchKeyWord} postPerRow={2} isDashboard={true}/>
        </>
    );  
}
export default PostPageForProfile; 