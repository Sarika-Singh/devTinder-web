import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.log("Error while fetching feed data", err);
    }
  };
  useEffect(() => {
    getFeed();
  }, []);
  if(!feed) return null;
  if (feed.length <= 0) return <p className="flex justify-center">No more users in feed.</p>;
  return (
    feed && (
      <div className="flex justify-center items-center m-10">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};
export default Feed;
