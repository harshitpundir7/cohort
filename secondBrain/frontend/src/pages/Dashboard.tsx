import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Input from "../components/Input";

interface Data {
  _id: string;
  content: string;
  tags: string;
}

function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState<Data[]>([]);

  const fetchData = async () => {
    try {
      await axios.get(
        `${import.meta.env.VITE_LOCAL_API_URL}/content/check-auth`,
        { withCredentials: true }
      );
      
      const response = await axios.get(
        `${import.meta.env.VITE_LOCAL_API_URL}/content/post`,
        { withCredentials: true }
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-wrap gap-4 p-4">
      <Input onContentAdded={fetchData}/>
      {data.length > 0 ? (
        data.map((post) => (
          <Card 
            key={post._id}
            contentId={post._id} 
            content={post.content} 
            tags={post.tags} 
          />
        ))
      ) : (
        <p className="text-gray-500">No data available.</p>
      )}
    </div>
  );
}

export default Dashboard;