import './Post.css'
import ava from '../../assets/avatar.jpeg';
import like from '../../assets/like.png';
import message from '../../assets/message.png';
import { useNavigate } from 'react-router';
import { POSTS_DETAIL_ROUTE } from '../../rout/routes';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { usePosts } from '../../context/PostsContext';

export function Post({post, delPost}) {
    const navigator = useNavigate();
    const location = useLocation();
    const [edit, setEdit] = useState(false);
    const [content, setContent] = useState(post.content);
    const currentPath = location.pathname;
    const isDetail = currentPath == POSTS_DETAIL_ROUTE(post.id)
    const {changeFlag, setFlag, setPosts} = usePosts();

    const textClickHandler = () => {
        const detailRoute = POSTS_DETAIL_ROUTE(post.id)
        navigator(detailRoute);
    }

    const editClickHandler = () => {
        setEdit(true);
    };

    const saveEditHandler = async () => {
        try {
            const response = await fetch(`http://localhost:7070/posts/${post.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: content }),
            });

            if (!response.ok) {
            throw new Error('Не удалось добавить пост');
            }

            setEdit(false);
            setFlag(!changeFlag);
        } catch (error) {
            console.error('Ошибка при добавлении поста:', error);
        }
    };

    const cancelEditHandler = () => {
        setEdit(false);
    };
    return (
        <div className="post">
            <div className="post__info">
                <div>
                    <img className="post__user__img" src={ava} />
                </div>
                <div>
                    <div className="post__user__name">Ilnaz Gilyazov</div>
                    <div className="post__time">{timeAgo(post.created)}</div>
                </div>
            </div>
            <div className="post__content" onClick={textClickHandler}>
                {
                    edit? (
                    <form className="NewPost" onSubmit={(e) => { e.preventDefault(); saveEditHandler(); }}>
                        <textarea 
                            style={{width:'100%', backgroundColor:'white', color:'black'}} 
                            value={content} 
                            onChange={(e) => setContent(e.target.value)} 
                            name='newPost__text'
                        />
                    </form>
                    ) : post.content
                }
            </div>
            <div className='post__action'>
                <img src={like} width={32}/>
                <img src={message} width={32}/>
            </div>
            {isDetail && (
                <div className='post__action__detail'>
                    {edit ? (
                        <>
                            <button onClick={saveEditHandler} className='menu__link'>Сохранить</button>
                            <button onClick={cancelEditHandler} className='menu__link' style={{ backgroundColor: "gray" }}>Отмена</button>
                        </>
                    ) : (
                        <>
                            <button onClick={editClickHandler} className='menu__link'>изменить</button>
                            <button onClick={delPost} className='menu__link' style={{ backgroundColor: "red" }}>Удалить</button>
                        </>
                    )}
                </div>
            )}
        </div>
    )
}


function timeAgo(createdTimestamp) {
    const now = Date.now();
    const secondsAgo = Math.floor((now - createdTimestamp) / 1000);

    // Определяем, сколько времени прошло
    let interval = Math.floor(secondsAgo / 31536000); // Время в годах
    if (interval >= 1) return `${interval} г.`;

    interval = Math.floor(secondsAgo / 2592000); // Время в месяцах
    if (interval >= 1) return `${interval} мес.`;

    interval = Math.floor(secondsAgo / 86400); // Время в днях
    if (interval >= 1) return `${interval} д. `;

    interval = Math.floor(secondsAgo / 3600); // Время в часах
    if (interval >= 1) return `${interval} ч.`;

    interval = Math.floor(secondsAgo / 60); // Время в минутах
    if (interval >= 1) return `${interval} мин.`;

    return 'только что';
}