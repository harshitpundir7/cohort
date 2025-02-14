import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";

interface Data {
  _id: string;
  content: string;
  tags: string;
}

function Dashboard({ isAuth }: { isAuth: boolean }) {
  const navigate = useNavigate();
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_LOCAL_API_URL}/content/post`,
          {
            withCredentials: true,
          }
        );
        setData(response.data)
        console.log("API Response:", response.data); 
        console.log(data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-wrap gap-4 p-4">
      {data.length > 0 ? (
        data.map((post) => (
          <>
          <Card contentId={post._id} key={post._id} content={post.content} tags={post.tags} />
          
          </>
        ))
      ) : (
        <p className="text-gray-500">No data available.</p>
      )}
    </div>
  );
}

export default Dashboard;
