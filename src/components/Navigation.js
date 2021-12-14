import React from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'

const Navigation = () => {

    const history = useHistory()

    const onLogOut = () => {
        history.push('/')

        const logOutUser = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', },
        }

        logOutUserRequest(logOutUser)
   
    }


    const logOutUserRequest = async (logOutUser) => {
        const res = await fetch('http://localhost:80/api/index.php?action=logout', logOutUser)
         console.log(res);
        //  const data = await res.json()

    }

    return (
        <div>
            <nav className="navbar">

            <h2 className="navbar-logo"><Link to="/components/HomePage.js"><i class='bx bxs-pizza'></i> Foody</Link></h2>
                <ul className="navbar-list">
                    <li className="navbar-links">
                        <Link to="/components/ProfilePage.js">Profile</Link>
                    </li>
            
                    <li className="navbar-links">
                        Post a review! 
                    </li>
                </ul>

                <form className="search-resturant-form">
                    <input className="search-resturant-input" type="text" placeholder="Search for a resturant!"></input>
                    <button className="search-button"><i class='bx bx-search-alt search-icon'></i></button>
                </form>

                <button onClick={onLogOut} className="logout-button">Logout</button>
            </nav>
            
        </div>
    )
}

export default Navigation
