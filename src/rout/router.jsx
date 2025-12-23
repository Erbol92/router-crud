import { MainTemplate } from "../layout/MainTemplate";
import { createBrowserRouter } from "react-router";
import * as R from './routes'
import { NewPostPage } from "../pages/NewPostPage";
import { PostsPage } from "../pages/PostsPage";
import { PostDetailPage } from "../pages/PostDetailPage";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainTemplate/>,
        children: [
            {
                path: R.HOME_ROUTE,
                exact: true,
                element: <PostsPage/>
                    
            },
            {
                path: R.NEW_POST_ROUTE,
                exact: true,
                element: <NewPostPage/>,
            },
            {
                path: R.POSTS_DETAIL_ROUTE(':id'),
                exact: true,
                element: <PostDetailPage/>,
            },
        ]
            
    },
    
]);