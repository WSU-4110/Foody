// CSC4110 Assignment: 4
// Author: Nnamdi Monwe 
// Date: 11/18/2021 
// Logout component that renders a button that when clicked,
// clears the token and redirects the user to the homepage 
// Uses singleton design pattern,as there is only one instance of the Logout component.
 
import React from 'react'
import  {Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router'
import Footer from './Footer';
import { useMediaQuery } from 'react-responsive'

const Logout = () => {
    const [token, setToken] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [invalidUsername, setInvalidUsername] = useState(false);

    const logout = () => {
        setToken(null);
        setUsername(null);
        setPassword(null);
        setInvalidUsername(false);
        window.location.href = "/";
    };

    return (
        <div>
            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default Logout;
         