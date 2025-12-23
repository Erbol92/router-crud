import React, { createContext, useContext, useState, useEffect } from 'react';
const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
    
    const [posts,setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const submitHandler = async (newPostText) => {
        try {
            const response = await fetch('http://localhost:7070/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: newPostText }),
            });

            if (!response.ok) {
            throw new Error('Не удалось добавить пост');
            }

        } catch (error) {
            console.error('Ошибка при добавлении поста:', error);
        }
    };

    useEffect(()=>{
    const getAllPosts = async ()=>{
        try {
            const response = await fetch('http://localhost:7070/posts');
            if (!response.ok) {
                throw new Error('Что-то пошло не так');
            }
            const data = await response.json();
            setPosts(data);
            setLoading(false);
            } catch (error) {
                console.error('Проблемы с выполнением запроса:', error);
            }
        };
    getAllPosts()
    },[])

    

    return (
        <PostsContext.Provider value={{ posts, submitHandler, loading, setPosts }}>
            {children}
        </PostsContext.Provider>
    );
};

export const usePosts = () => useContext(PostsContext);
