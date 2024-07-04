import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../../css/CardPosts.css";
import backgroundImage from "./background.jpg"; // Import the image
import { apiServiceGetEventData } from "../../services/api.service.getEventData";

// Define the structure of the Location object
interface Location {
  id: string;
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

// Define the structure of the Post object
interface Post {
  _id: {
    $oid: string;
  };
  id: string;
  image: string;
  createdAt: string;
  updatedAt: {
    $date: string;
  };
  author: string;
  location: Location;
  caption: string;
  title: string;
  __v: number;
}

// Define the CardPosts component
const CardPosts: React.FC = () => {
  // Initialize posts as an array of Post objects
  const [posts, setPosts] = useState<Post[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [atLeftmost, setAtLeftmost] = useState(true);
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);

  // Fetch posts from the API when the component mounts
  useEffect(() => {
    apiServiceGetEventData().then((data) => {
      // Update the posts state with the fetched data
      setPosts(data);
    });
  }, []);

  // Function to scroll right
  const scrollRight = () => {
    const currentScroll = containerRef.current?.scrollLeft || 0;
    const cardWidth = 360; // Including margin and padding
    containerRef.current?.scrollTo({
      left: currentScroll + cardWidth,
      behavior: "smooth",
    });
  };

  // Function to scroll left
  const scrollLeft = () => {
    const currentScroll = containerRef.current?.scrollLeft || 0;
    const cardWidth = 360; // Including margin and padding
    containerRef.current?.scrollTo({
      left: currentScroll - cardWidth,
      behavior: "smooth",
    });
  };

  // Function to check if the scroll is at the leftmost position
  const checkAtLeftmost = () => {
    const currentScroll = containerRef.current?.scrollLeft || 0;
    setAtLeftmost(currentScroll === 0);
  };

  // Add an event listener to check if the scroll is at the leftmost position
  useEffect(() => {
    const container = containerRef.current;
    container?.addEventListener("scroll", checkAtLeftmost);
    return () => {
      container?.removeEventListener("scroll", checkAtLeftmost);
    };
  }, []);

  // Render the CardPosts component
  return (
    <div className="card-posts-container">
      <h1>Upcoming Events</h1>
      <div ref={containerRef} className="card-posts">
        {posts.map((post) => (
          <div key={post.id} className="card">
            <img src={post.image} alt={post.title} className="card-image" />
            <h3 className="card-title">{post.title}</h3>
            <button
              className="card-toggle-button"
              onClick={() => {
                setExpandedPostId(expandedPostId === post.id ? null : post.id);
              }}
            >
              {expandedPostId === post.id ? "▴" : "▾"}
            </button>
            {expandedPostId === post.id && (
              <div className="card-details">
                <p className="card-detail">
                  <span className="card-detail-title">Description:</span>{" "}
                  {post.caption} {/* Show caption */}
                </p>
                <p className="card-detail">
                  <span className="card-detail-title">Location:</span>{" "}
                  {post.location.streetName}, {post.location.area},{" "}
                  {post.location.city}, {post.location.pinCode},{" "}
                  {post.location.state} {/* Show location */}
                </p>
                <p className="card-detail">
                  <span className="card-detail-title">Created At:</span>{" "}
                  {new Date(post.createdAt).toLocaleString()}{" "}
                  {/* Show createdAt date */}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      {!atLeftmost && (
        <button onClick={scrollLeft} className="round-arrow-left">
          ←
        </button>
      )}
      <button onClick={scrollRight} className="round-arrow">
        →
      </button>
    </div>
  );
};

export default CardPosts;
