

import React from "react";
import { Link } from "react-router-dom";

const Tags = ({ tags }) => {
  return (
    <div>
      <div className="tags">
        {tags?.map((tag, index) => (
          <p className="tag" key={index}>
            <Link
              to={`/tag/${tag}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              {tag}
            </Link>
          </p>
        ))}
      </div>
    </div>
  );
};

export default Tags;







// gyro .red CSSFontFeatureValuesRule   2x same    3x 185   4x 177  6x 100
// camera .red 75                        2x same   3x 40    4x 11   12

