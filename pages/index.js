import { useState, useEffect } from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import config from "../aws-exports";
import { listTodos } from "../graphql/queries";

Amplify.configure(config);

const Blog = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await API.graphql(graphqlOperation(listTodos));
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
          data.data.listTodos.items.map((item) => (
            <li key={item.id}>
              {item.name}
            </li>
          ))}
      </ul>
    </>
  );
};

export default Blog;