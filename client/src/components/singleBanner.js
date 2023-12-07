import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Booking from "../api/Booking";

export const SingleBanner = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    Booking.get(`/banner/post/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      {data && (
        <div className="container">
          <div className="px-[15px]">
            <div className="font-jambonoMedium uppercase mb-5 mt-5 ">
              {data.post.title}
            </div>
            <div className="w-full flex justify-center">
              <img src={data.post.image.url} alt="" />
            </div>
            <p className="mt-5">{data.post.content}</p>
          </div>
        </div>
      )}
    </>
  );
};
