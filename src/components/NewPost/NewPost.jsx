import './NewPost.css'

export const NewPost =({submitHandler}) => {
    const onSubmitEv = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const newPostText = formData.get('newPost__text');
        submitHandler(newPostText)
    }
    return (
        <form className="NewPost" method='POST' onSubmit={onSubmitEv}>
            <label htmlFor="newPost">Текст поста</label>
            <textarea name='newPost__text' id="newPost" type="text" />
            <div>
                <button className="menu__link">Опубликовать</button>
            </div>
        </form>
    )
}

