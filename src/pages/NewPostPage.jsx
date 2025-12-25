import { NewPost } from "../components/NewPost/NewPost";
import { usePosts } from "../context/PostsContext";
import { useNavigate } from "react-router";
import { HOME_ROUTE } from "../rout/routes";

export const NewPostPage = () => {
  const {submitHandler } = usePosts();
  const navigate = useNavigate();
  const handleSubmit = async (newPostText) => {
        await submitHandler(newPostText);
        navigate(HOME_ROUTE);
    };
  return <NewPost submitHandler={handleSubmit} />;
};