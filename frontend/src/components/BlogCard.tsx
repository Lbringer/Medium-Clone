import React from "react";
import { useNavigate } from "react-router-dom";

export type BlogCardProps = {
  content: string;
  title: string;
  publishedDate: string;
  id?: string;
};

const BlogCard: React.FC<BlogCardProps> = ({
  content,
  title,
  publishedDate,
  id,
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/blog/${id}`);
  };
  return (
    <div onClick={handleClick} className="mt-10 w-1/2 border-b pb-10">
      <div className="text-3xl mb-3">{title}</div>
      <div className="text-sm font-serif mb-6">
        {content.length > 300 ? content.slice(0, 300) + "..." : content}
      </div>
      <div className="text-xs text-stone-500">{publishedDate.slice(0, 10)}</div>
    </div>
  );
};

export default BlogCard;
