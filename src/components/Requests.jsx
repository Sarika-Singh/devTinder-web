import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      const res_review = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeRequests(_id));
      console.log(res_review.data);
    } catch (err) {
      console.log("Error while fetching requests", err);
    }
  };
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.log("Error while fetching requests", err);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);
  if (!requests) return null;
  if (requests.length === 0) {
    return <p className="flex justify-center">You have no Requests yet.</p>;
  }
  return (
    <>
      <h2 className="text-2xl font-bold flex justify-center text-center my-5">
        My Requests
      </h2>
      <div className="flex flex-col items-center m-5">
        {requests.map((request) => {
          const { firstName, lastName, photoUrl, gender, age, about } =
            request.fromUserId;
          return (
            <div
              key={request._id}
              className="card max-w-xl w-full bg-base-200 card-md shadow-sm m-2"
            >
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                      <img
                        alt="User photo"
                        src={photoUrl}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">
                        {firstName + " " + lastName}
                      </h3>
                      <h4 className="text-md text-gray-600">
                        {age + ", " + gender}
                      </h4>
                      <p className="text-sm text-gray">{about}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="btn btn-active btn-primary mx-2"
                      onClick={() => reviewRequest("rejected", request._id)}
                    >
                      Reject
                    </button>
                    <button
                      className="btn btn-active btn-secondary mx-2"
                      onClick={() => reviewRequest("accepted", request._id)}
                    >
                      Accept
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Requests;
