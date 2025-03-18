import { REGIONS } from "@/helpers/regions";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const RatingRegions = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const { data } = await axios.get("/api/blog/countbytags");
        if (data) setData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRating();
  }, []);

  return (
    <div>
      <div className="marck-script-regular text-blue-500 text-2xl text-center">
        По количеству новостей:
      </div>
      {data.map((item, index) => {
        const region = REGIONS.find((r) => r.name === item._id);
        if (!region) return null;

        let textStyle = "text-gray-700";
        if (index === 0) textStyle = "text-blue-800 font-bold text-[20px]";
        else if (index === 1)
          textStyle = "text-blue-600 font-semibold text-[18px]";
        else if (index === 2)
          textStyle = "text-blue-500 font-semibold text-[16px]";

        return (
          <div key={item._id}>
            <Link
              className="hover:underline"
              to={`/blog/regions/${region.slug}`}
            >
              <span className={textStyle}>
                {index + 1}. {item._id} - {item.count}
              </span>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(RatingRegions);
