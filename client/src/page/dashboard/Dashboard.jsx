import { useContext } from 'react';
import { Forbiden } from '../Forbiden';
import { AdminDashboard } from './AdminDashboard';
import { UserDashboard } from './UserDashboard';
import { GlobalContext } from '../../context/GlobalContext';



export function Dashboard() {
    const { role } = useContext(GlobalContext);

    if (role === 'admin') {
        return <AdminDashboard />;
    }

    if (role === 'user') {
        return <UserDashboard />;
    }

    return <Forbiden />;
}