import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { Forbiden } from '../Forbiden';
import { AdminServisai } from './AdminServisai';
import { UserServisai } from './UserServisai';

export function Servisai() {
    const { role } = useContext(GlobalContext);

    if (role === 'admin') {
        return <AdminServisai />;
    }

    if (role === 'user') {
        return <UserServisai />;
    }

    return <Forbiden />;
}