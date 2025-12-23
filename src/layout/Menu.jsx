import { Link } from "react-router";
import { HOME_ROUTE, NEW_POST_ROUTE } from "../rout/routes";

export const Menu = ()=>{
    return (
        <>
        <Link className="menu__link" to="/">Главная</Link>
        <Link className="menu__link" to={HOME_ROUTE}>Посты</Link>
        <Link className="menu__link" to={NEW_POST_ROUTE}>Создать пост</Link>
        </>
    )
}