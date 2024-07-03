import React, { useEffect, useState } from "react";
import "../../../css/GraphicalData.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Constants from "../../AppConstants";

// Define the GraphicalData component
const GraphicalData: React.FC = () => {
  const [data, setData] = useState([]);

  // Fetch the graphical data from the server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${Constants.API_URL}/graphicalDatas`);
        const fetchedData = await response.json();
        setData(fetchedData);
      } catch (error) {
        console.error(`Failed to fetch graphical data: ${error}`);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="graphical-data-container">
      <h1>Our Statistics</h1>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{
            top: 50,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend
            verticalAlign="bottom"
            wrapperStyle={{ paddingTop: "20px" }}
          />
          <Bar dataKey="MealsDelivered" stackId="a" fill="#8884d8" />
          <Bar dataKey="Partners" stackId="a" fill="#82ca9d" />
          <Bar dataKey="NGO" stackId="a" fill="#ffc658" />
          <Bar dataKey="Workers" stackId="a" fill="#0088FE" />
          <Bar dataKey="EventsHosted" stackId="a" fill="#FF8042" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
export default GraphicalData;
