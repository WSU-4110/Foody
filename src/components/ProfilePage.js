import Navigation from './Navigation'
import React, { useState, useEffect } from 'react';
import RecentReviews from './RecentReviews';
import Footer from './Footer';
import Login from './Login';
import {Row, Col, Button, Form} from "react-boostrap"



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
                        

                <Row>
                    <Col className="UserProfile">
                        <Form onsubmit={submitHandler}>
                            <Form.Group controlId="username"> 
                            <Form.Label>Username </Form.Label>
                            <Form.Control type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}> 
                            </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="email"> 
                            <Form.Label> Email </Form.Label>
                            <Form.Control type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}> 
                            </Form.Control> 
                            </Form.Group>
                            <Form.Group controlId="password"> 
                            <Form.Label> Password </Form.Label>
                            <Form.Control type="text" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)}> 
                            </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="pic"> 
                            <Form.Label>Change Profile Picture</Form.Label>
                            <Form.File type="image/png" id="custom-file" label="upload Profile Picture" custom onChange={(e) => postDetails(e.target.value)}> 
                            </Form.File>
                            </Form.Group>
                            <Button type="submit" varient="primary">Update</Button>

                            </Form>
                        </Col>
                    <Col className="ProfilePic">Profile Picture <img src={pic} />
                    </Col>

                </Row>

                        
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
