import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Post } from '../components/Posts/Post';
import { useNavigate } from 'react-router';
import { HOME_ROUTE } from '../rout/routes';
import { usePosts } from '../context/PostsContext';

export const PostDetailPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState();
    const [loading, setLoading] = useState(true);
    const navigator = useNavigate();
    const {posts,setPosts, setFlag, changeFlag} = usePosts();

    useEffect(()=>{
        const getPost = async ()=>{
                try {
                    const response = await fetch(`http://localhost:7070/posts/${id}`);
                    if (!response.ok) {
                        throw new Error('Что-то пошло не так');
                    }
                    const data = await response.json();
                    setPost(data.post);
                    setFlag(!changeFlag)
                } catch (error) {
                    console.error('Проблемы с выполнением запроса:', error);
                } finally {
                    setLoading(false); 
                }
            };
        getPost()
        },[id, changeFlag]);
    
    const delPost = async ()=>{
            try {
                const response = await fetch(`http://localhost:7070/posts/${id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error('Что-то пошло не так');
                }
                if (response.status==204) {
                    setPosts(prevPosts => prevPosts.filter(p => p.id !== id));
                    setFlag()
                    navigator(HOME_ROUTE)
                }
                } catch (error) {
                    console.error('Проблемы с выполнением запроса:', error);
                }
        };

    if (loading) {
        return <div>Загрузка...</div>;
    }
    return (
        <Post post={post} delPost={delPost}/>
    )
};