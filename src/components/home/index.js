import React, { useEffect } from "react";
import { useAuth } from "../../contexts/authContext";

import AllFeedbacks from "../feedback/allFeedbacks";

const Home = () => {
  const { currentUser } = useAuth();
  useEffect(() => {
    const data = {
      displayName: currentUser.displayName,
      email: currentUser.email,
    };
    localStorage.setItem("userData", JSON.stringify(data));
  }, []);
  return (
    <div className="container">
      <div className="d-flex justify-content-center">
        Hello{" "}
        <h4>
          {currentUser.displayName
            ? currentUser.displayName
            : currentUser.email}
        </h4>
        you are now logged in.
      </div>
      
      <div className="mt-4 d-flex justify-content-center">
 
        <AllFeedbacks/>
        {/* <Link to="/feedback">
          <button>All feedbacks</button>
        </Link> */}
      </div>
    </div>
  );
};

export default Home;
