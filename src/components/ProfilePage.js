import Navigation from './Navigation'
import React, { useState, useEffect } from 'react';
import RecentReviews from './RecentReviews';
import Footer from './Footer';


const ProfilePage = () => {

    return (
        <div class="profile-page">
            <Navigation />

            <div className="profile-page-main-container">
                
                <h2>Hello, "Username"!</h2>

                <img className="profile-pic" src="/images/profile-default.svg" alt=""/>

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
