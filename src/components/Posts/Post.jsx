import './Post.css'
import ava from '../../assets/avatar.jpeg';
import like from '../../assets/like.png';
import message from '../../assets/message.png';
import { useNavigate } from 'react-router';
import { POSTS_DETAIL_ROUTE } from '../../rout/routes';
import { useLocation } from 'react-router-dom';

export function Post({post, delPost}) {
    const navigator = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;
    const isDetail = currentPath == POSTS_DETAIL_ROUTE(post.id)

    const textClickHandler = () => {
        const detailRoute = POSTS_DETAIL_ROUTE(post.id)
        navigator(detailRoute);
    }
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
                {post.content}
            </div>
            <div className='post__action'>
                <img src={like} width={32}/>
                <img src={message} width={32}/>
            </div>
            { isDetail &&
                <div className='post__action__detail'>
                    <button className='menu__link'>изменить</button>
                    <button onClick={delPost} className='menu__link' style={{ backgroundColor: "red" }}>Удалить</button>
                </div>
            }
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