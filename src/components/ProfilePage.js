import Navigation from './Navigation'
import React, { useState, useEffect } from 'react';
import Footer from './Footer';


const ProfilePage = () => {
    
    return (
        <div class="profile-page">
            <Navigation />

            <div className="profile-page-main-container">
                
                <h2>FirstName LastName</h2>

                <img className="profile-pic" src="/images/profile-default.svg" alt=""/>
            </div>
           
            <div className="footer-profilepage">
                 <Footer />
            </div>
        </div>
    )
}

export default ProfilePage
