import { useParams } from "react-router-dom";

export const Blog = () => {
  const { id } = useParams();
  return <div>{id}</div>;
};
