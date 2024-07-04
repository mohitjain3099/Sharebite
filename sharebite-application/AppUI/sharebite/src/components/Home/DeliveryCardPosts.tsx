import React, { useRef, useState, useEffect } from "react";
import "../../../css/CardPosts.css";
import { getpost } from "../../services/api.service.getpost";
import Constants from "../../AppConstants";
// Define the structure of the Location object
interface Location {
  id: number;
  streetName: string;
  area: string;
  city: string;
  pinCode: string;
  state: string;
  coordinates: string;
  _id: {
    $oid: string;
  };
}

// Define the structure of the MediaDetails object
interface MediaDetails {
  shelfLife: string;
  isVeg: boolean;
  allergens: string[];
  quantity: number;
  unit: string;
}

// Define the structure of the Post object
interface Post {
  _id: {
    $oid: string;
  };
  id: number;
  image: string;
  title: string;
  description: string;
  location: Location;
  mediaDetails: MediaDetails;
  // Add other properties as needed
}

// Define the CardPosts component
const DeliveryCardPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]); // Initialize posts as an array of Post objects
  const [isPickedUp, setIsPickedUp] = useState<number[]>([]);
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null); // Track which post is currently expanded

  useEffect(() => {
    // Fetch posts from the API when the component mounts
    getpost().then((data) => {
      setPosts(data); // Update the posts state with the fetched data
      setIsPickedUp(new Array(data.length).fill(false)); // Update isPickedUp based on the fetched data
    });
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const [atLeftmost, setAtLeftmost] = useState(true);
  const [pickedUpPostIndex, setPickedUpPostIndex] = useState<null | number>(
    null
  );

  // Function to handle the Pickup button click
  const handlePickupClick = async (index: number) => {
    const newIsPickedUp = [...isPickedUp];
    newIsPickedUp[index] = 1;
    setIsPickedUp(newIsPickedUp);

    const post = posts[index];
    const resp = await fetch(`${Constants.API_URL}/posts/${post._id.$oid}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...post,
        isPickedUp: "1",
      }),
    });

    if (!resp.ok) {
      console.error("Failed to update post");
    }
    const response = await fetch(`${Constants.API_URL}/send-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: "amit.s.tomar805@gmail.com",
        subject: "Hello",
        text: "Hello world",
      }),
    });

    if (!response.ok) {
      console.error("Failed to send email");
    }
  };

  // const handleDeliveryDoneClick = (index: number) => {
  //   setPickedUpPostIndex(null);
  //   const newIsPickedUp = [...isPickedUp];
  //   newIsPickedUp[index] = false;
  //   setIsPickedUp(newIsPickedUp);
  // };

  type MapLocationProps = {
    latitude: number;
    longitude: number;
  };

  // Define the MapLocation component
  const MapLocation: React.FC<MapLocationProps> = ({ latitude, longitude }) => {
    const mapUrl = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=13/${latitude}/${longitude}`;

    return (
      <a href={mapUrl} target="_blank" rel="noopener noreferrer">
        Click here for directions
      </a>
    );
  };

  const scrollRight = () => {
    const currentScroll = containerRef.current?.scrollLeft || 0;
    const cardWidth = 360; // Including margin and padding
    containerRef.current?.scrollTo({
      left: currentScroll + cardWidth,
      behavior: "smooth",
    });
  };

  const scrollLeft = () => {
    const currentScroll = containerRef.current?.scrollLeft || 0;
    const cardWidth = 360; // Including margin and padding
    containerRef.current?.scrollTo({
      left: currentScroll - cardWidth,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const checkAtLeftmost = () => {
      const currentScroll = containerRef.current?.scrollLeft || 0;
      setAtLeftmost(currentScroll === 0);
    };

    const container = containerRef.current;
    container?.addEventListener("scroll", checkAtLeftmost);

    // Initial check
    checkAtLeftmost();

    return () => {
      container?.removeEventListener("scroll", checkAtLeftmost);
    };
  }, []);

  return (
    <div className="card-posts-container">
      <h1>Posts</h1>
      <div
        ref={containerRef}
        className={`card-posts ${pickedUpPostIndex !== null ? "centered" : ""}`}
      >
        {posts.map((post, index) => {
          // If a post is picked up and this post is not the picked up post, don't render it
          if (pickedUpPostIndex !== null && pickedUpPostIndex !== index) {
            return null;
          }
          return (
            <div
              key={post.id}
              className={`card ${
                pickedUpPostIndex === index ? "selected" : ""
              }`}
            >
              <img src={post.image} alt={post.title} />
              <h2>{post.title}</h2>
              <p>{post.description}</p>
              {!isPickedUp[index] ? (
                <div className="pickup-button">
                  <button
                    className="card-toggle-button"
                    onClick={() =>
                      setExpandedPostId(
                        post._id.$oid === expandedPostId ? null : post._id.$oid
                      )
                    }
                  >
                    {expandedPostId === post._id.$oid ? "▲" : "Pickup"}
                  </button>
                  {expandedPostId === post._id.$oid && (
                    <div className="card-details">
                      <p className="card-detail">
                        <span className="card-detail-title">Location:</span>{" "}
                        {post.location.streetName}, {post.location.area},{" "}
                        {post.location.city}, {post.location.pinCode},{" "}
                        {post.location.state}
                      </p>
                      <p className="card-detail">
                        <span className="card-detail-title">Shelf Life:</span>{" "}
                        {post.mediaDetails.shelfLife}
                      </p>
                      <p className="card-detail">
                        <span className="card-detail-title">Is Veg:</span>{" "}
                        {post.mediaDetails.isVeg ? "Yes" : "No"}
                      </p>
                      <p className="card-detail">
                        <span className="card-detail-title">Allergens:</span>{" "}
                        {post.mediaDetails.allergens.join(", ")}
                      </p>
                      <p className="card-detail">
                        <span className="card-detail-title">Quantity:</span>{" "}
                        {post.mediaDetails.quantity} {post.mediaDetails.unit}
                      </p>
                      <button
                        className="pickup-done"
                        onClick={() => handlePickupClick(index)}
                      >
                        Pickup Done
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <MapLocation latitude={42.3399} longitude={-71.0899} />
                  <div className="pickup-button">
                    <button>Delivery Done</button>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
      {pickedUpPostIndex === null && !atLeftmost && (
        <button onClick={scrollLeft} className="round-arrow-left">
          ←
        </button>
      )}
      {pickedUpPostIndex === null && (
        <button onClick={scrollRight} className="round-arrow">
          →
        </button>
      )}
    </div>
  );
};

export default DeliveryCardPosts;
