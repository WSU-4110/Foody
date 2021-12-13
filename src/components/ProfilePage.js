import Navigation from './Navigation'
import React, { useState, useEffect } from 'react';
import RecentReviews from './RecentReviews';
import Footer from './Footer';


/*const {
    createPool
} = require('mysql');
const pool = createPool({
    host: "localhost",
    user: "root",
    password: "foody",
    database: "profilepagedata",
    connectionLimit: 10
})
 pool.query(`SELECT * FROM profilepagedata`, (err, result, fields) => {
     if(err){
         return console.log(err);
     }
     return console.log(result);
 })*/

const ProfilePage = () => {

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [profilePic, setProfilePic] = useState(null)
    const [error, setError] = useState(false)


    const handleImageChange = (e) => {
        setError(false);
        const selected = e.target.files[0];
        const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
        if (selected && ALLOWED_TYPES.includes(selected.type)) {
            let reader = new FileReader();
            reader.onloadend = () => {
                setProfilePic(reader.result);
            }
            reader.readAsDataURL(selected);
        } else {
            setError(true);
        }
    }
    return (

        <div class="profile-page">
            <Navigation />

            <div className="profile-page-main-container">
                <h1>Hello, {localStorage.getItem('username')}!</h1>
                {error && <p className="errorMsg">File not supported</p>}
                <div className="imgPreview"
                    style={{ background: profilePic ? `url("${profilePic}") no-repeat left/cover` : "#FFFFFF" }}>
                    {!profilePic && (
                        <>
                            <p>Add a profile image</p>
                            <label htmlFor="fileUpload" className="customFileUpload">
                                Choose file
                            </label>
                            <input type="file" id="fileUpload" onChange={handleImageChange} />
                            <span>(jpg, jpeg or png)</span>
                        </>
                    )}
                    {profilePic && (
                        <button onClick={() => setProfilePic(null)}>Remove Image</button>)}
                </div>


                <div className="update-container">
                    <h2>User Information</h2>
                    <label> Username </label>
                    <input className="show-info-text" type="text" placeholder="Username" disabled value={username} ></input>

                    <label> Email</label>
                    <input className="show-info-text" type="text" placeholder="Email" disabled value={email} ></input>
                </div>

                <div className="review-history">
                    <h2>Review History</h2>
                </div>

                <RecentReviews
                    username={localStorage.getItem('username')}
                />

                <div className="footer-profilepage">
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default ProfilePage
