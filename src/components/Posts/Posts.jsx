import { Post } from "./Post";


export function Posts({items}) {

    if (!items || items.length === 0) {
        return <div>No posts available</div>;
    }
    return (
        <div className="posts-list">
            {items.slice().reverse().map((item) => (
                <Post key={item.id} post={item}/>
            ))}
        </div>
    )
}

