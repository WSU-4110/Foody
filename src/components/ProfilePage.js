import Navigation from './Navigation'
import React, { useState, useEffect } from 'react';
import RecentReviews from './RecentReviews';
import Footer from './Footer';
import Login from './Login';



const ProfilePage = () => {

    const[email, setEmail] = useState('')
    const[username, setUsername] = useState('')

    return (
        <div class="profile-page">
            <Navigation />

            <div className="profile-page-main-container">
                
                <h2>Hello, Username!</h2>

                <img className="profile-pic" src="/images/profile-default.svg" alt=""/>
                <div className="update-container">
                        
                        <div className="update-form">
                            <label> Username </label>
                            <input className="show-info-text" type="text" placeholder="Username" value={email} ></input>

                            <label> Email</label>
                            <input className="show-info-text" type="text" placeholder="Email" value={username} ></input>

                            <label> Profile Image </label>
                            <input className="custom-file-upload" type="file"  ></input>


                            <input className="update-info-submit-button" type="submit" ></input>
                        </div>
                
                </div>
                <h2>Review History</h2>
            </div>

           
            <RecentReviews
                name={"Pizza"}
                city={"Hazel Park, MI"}
                website={"Pizza.com"}
            />
            <RecentReviews
                name={"Pizza"}
                city={"Hazel Park, MI"}
                website={"Pizza.com"}
            />
            <RecentReviews
                name={"Pizza"}
                city={"Hazel Park, MI"}
                website={"Pizza.com"}
            />

            <div className="footer-profilepage">
                <Footer />
            </div>
        </div>
    )
}

export default ProfilePage
