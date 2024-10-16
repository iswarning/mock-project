import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getListUser } from "../../store/actions/userAction";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListUser());
  }, []);

  return (
    <div>
      <h2>Home Page</h2>
    </div>
  );
};

export default Home;
