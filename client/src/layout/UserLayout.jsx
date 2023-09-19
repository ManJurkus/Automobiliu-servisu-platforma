import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Login } from "../page/Login";
import { Header } from "../components/Header";


export function UserLayout() {
    const { role } = useContext(GlobalContext);
    const content = ['admin', 'user'].includes(role) ? <Outlet /> : <Login />;

    return (
        <>
            <Header />
            <main className="pb-5">{content}</main>
        </>
    )
}