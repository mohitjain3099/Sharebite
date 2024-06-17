import React, {useState} from "react";
import EventPageHeader from "../components/event/EventPageHeader";
import EventComponent from "../components/event/EventComponent";
import NavbarComponent from "../components/Navbar/NavbarComponent";
function EventPage() {
    const [searchKeyWord, setSearchKeyWord] = useState('');
    return (
        <>
            <NavbarComponent/>
            <EventPageHeader setSearchKeyword={setSearchKeyWord}/>
            <EventComponent searchKeyWord={searchKeyWord}/>
        </>
    );
}
export default EventPage;