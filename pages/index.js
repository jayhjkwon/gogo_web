import { useState, useEffect } from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import config from "../aws-exports";
import { listBlogs } from "../graphql/queries";

Amplify.configure(config);

const Blog = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await API.graphql(graphqlOperation(listBlogs));
      console.log(result);
      setData(result);
    };
    fetchData();
  }, []);
  
  return (
    <>
      <div>Todos...</div>
      <ul>
        {data &&
          data.data.listBlogs.items.map((item) => (
            <li key={item.id}>
              {item.title} - {item.contents}
            </li>
          ))}
      </ul>
    </>
  );
};

export default Blog;