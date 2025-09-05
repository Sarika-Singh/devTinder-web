import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log("Error while fetching connections", err);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);
  if (!connections) return null;
  if (connections.length === 0) {
    return <p>You have no connections yet.</p>;
  }
  return (
    <>
      <h2 className="text-2xl font-bold flex justify-center text-center my-5">
        My Connections
      </h2>
      {/* Changed wrapper to flex-col + items-center */}
      <div className="flex flex-col items-center m-5">
        {connections.map((connection) => {
          const { firstName, lastName, photoUrl, gender, age, about } =
            connection;
          return (
            <div
              key={connection._id}
              className="card max-w-xl w-full bg-base-200 card-md shadow-sm m-2"
            >
              <div className="card-body">
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
                    <Link to={"/chat/" + connection._id}>
                      <button className="btn btn-sm btn-primary mt-2">
                        Chat
                      </button>
                    </Link>
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
export default Connections;
