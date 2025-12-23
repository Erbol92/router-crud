import { Posts } from "../components/Posts/Posts";
import { usePosts } from "../context/PostsContext";

export const PostsPage = () => {
    const { posts, loading } = usePosts();
    if (loading) {
        return <div>Загрузка...</div>;
    }
    return <Posts items={posts} />;
};