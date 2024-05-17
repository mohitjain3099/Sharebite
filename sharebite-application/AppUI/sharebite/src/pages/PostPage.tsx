import React, {useState} from "react";
import PostComponent from "../components/Posts/PostComponent";
import PostPageHeader from "../components/Posts/PostPageHeader";
import NavbarComponent from "../components/Navbar/NavbarComponent";
// PostPage
function PostPage() {
    // State for search keyword
    const [searchKeyWord, setSearchKeyWord] = useState('');
    console.log('Search Key Word:', searchKeyWord);
    return (
        <>
            {/* Navbar component */}
            <NavbarComponent />
            {/* PostPageHeader component */}
            <PostPageHeader setSearchKeyword={setSearchKeyWord}/>
            {/* PostComponent component */}
            <PostComponent searchKeyWord={searchKeyWord} postPerRow={3}/>
        </>
    );
}
export default PostPage;