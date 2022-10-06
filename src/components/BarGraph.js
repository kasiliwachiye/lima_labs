import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useTooltipContext } from "./CustomTooltip";

export default function BarGraph() {
  const [movies, setMovies] = useState([]);
  const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=abf37bbb225e465dd2788c7ed4453361`;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        const data = json.results;
        setMovies(data);
      })
      .catch((err) => console.error(err));
  }, [url]);

  const [dataKey, setDataKey] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleClick = (e) => {
    setDataKey("popularity");
    setButtonClicked(true);
  };

  const { openTooltip, closeTooltip } = useTooltipContext();

  // Content to go inside of the tooltip
  const tooltipContent = (e) => {
    return <div>{"Vote Average: " + e.vote_average}</div>;
  };

  // Styling the tooltip wrapper
  const tooltipStyle = {
    backgroundColor: "white",
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: "5%",
    fontSize: "16px",
    padding: ".5%",
    color: "black",
  };

  return (
    <>
      <div className="container mx-auto my-2">
        <h1 className="flex justify-center normal-case text-xl font-bold">Click the button to fetch the data</h1>
        <div className="flex justify-center m-4">
          <button className="btn" onClick={handleClick}>
            Fetch
          </button>
        </div>
        <div className="container mx-auto">
          <ResponsiveContainer width="100%" aspect={2.5}>
            <BarChart
              width={500}
              height={300}
              data={movies}
              margin={{ top: 0, right: 50, left: 20, bottom: 0 }}
              layout="vertical"
              barCategoryGap={3}
            >
              <CartesianGrid strokeDasharray="5 5" />
              <XAxis type="number" />
              {buttonClicked ? (
                <YAxis
                  dataKey="title"
                  type="category"
                  width={150}
                  padding={{ left: 20 }}
                  interval={0}
                  fontSize={10}
                  fontWeight={800}
                />
              ) : (
                <YAxis
                  hide
                />
              )}
              <Bar
                dataKey={dataKey}
                fill="#8884d8"
                onMouseEnter={(e) =>
                  openTooltip({
                    content: tooltipContent(e),
                    style: tooltipStyle,
                  })
                }
                onMouseLeave={() => closeTooltip()}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}