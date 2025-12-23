import {
    Outlet
} from "react-router-dom";

import { Menu } from "./Menu";


export const MainTemplate = () => {
    return (
        <div>
            <header>
                <Menu/>
            </header>
            <main>
                <Outlet/>
            </main>
        </div>
    );
}