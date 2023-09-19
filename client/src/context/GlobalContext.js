import { createContext, useEffect, useState } from 'react';

export const initialContext = {
    loginStatus: false,
    updateLoginStatus: () => { },
    role: 'public',
    updateRole: () => { },
    username: '',
    updateUsername: () => { },
    email: '',
    updateEmail: () => { },
    deleteServisa: () => { },
    servisai: [],
    updateServisai: () => { },
    servisaiPublic: [],
    upadateServisaiPublic: () => { },
};

export const GlobalContext = createContext(initialContext);

export const ContextWrapper = (props) => {
    const [loginStatus, setLoginStatus] = useState(initialContext.loginStatus);
    const [role, setRole] = useState(initialContext.role);
    const [username, setUsername] = useState(initialContext.username);
    const [email, setEmail] = useState(initialContext.email);
    const [servisai, setServisai] = useState(initialContext.servisai);
    const [servisaiPublic, setServisaiPublic] = useState(initialContext.servisaiPublic);


    // User busena: role, email, ....
    useEffect(() => {
        fetch('http://localhost:3001/api/login', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok' && data.user) {
                    setLoginStatus(true);
                    setRole(data.user.role);
                    setUsername(data.user.username);
                    setEmail(data.user.email);
                }
            })
            .catch(console.error);
    }, []);



    function updateLoginStatus(status) {
        setLoginStatus(status);
    }

    function updateRole(role) {
        const allowedRoles = ['public', 'admin', 'user'];
        if (allowedRoles.includes(role)) {
            setRole(role);
        }
    }

    function updateUsername(username) {
        setUsername(username);
    }

    function updateEmail(email) {
        setEmail(email);
    }



    function deleteServisas(servisas) {
        setServisai(pre => pre.filter(title => title !== servisas));
    }


    function updateServisai(servisai) {
        setServisai(servisai);
    }

    function updateServisaiPublic(servisai) {
        setServisaiPublic(servisai);
    }

    const value = {
        loginStatus,
        updateLoginStatus,
        role,
        updateRole,
        username,
        updateUsername,
        email,
        updateEmail,
        deleteServisas,
        servisai,
        updateServisai,
        servisaiPublic,
        updateServisaiPublic,
    };

    return (
        <GlobalContext.Provider value={value}>
            {props.children}
        </GlobalContext.Provider>
    );
};