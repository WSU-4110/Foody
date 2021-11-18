// CSC4110 Assignment: 4
// Author: Nnamdi Monwe 
// Date: 11/18/2021 
// Logout Class that renders a button that when clicked,
// clears the token and redirects the user to the homepage 
// Uses singleton design pattern,as there is only one instance of the Logout component.
 
import React from 'react' 
 
class Logout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: null,
            username: null,
            password: null,
            invalidUsername: false
        };
        this.logout = this.logout.bind(this);
    } 
    static getInstance() {
      if (!Logout.instance) {
        Logout.instance = new Logout();
      }
      
      return Logout.instance;

    }
    componentDidMount() {
        this.setState({
            token: localStorage.getItem("token"),
            username: localStorage.getItem("username"),
            password: localStorage.getItem("password")
        });
    }

    logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("password");
        window.location.href = "/";
    }

    render() {
        return (
            <div>
                <button onClick={this.logout}>Logout</button>
            </div>
        );
    }
}

export default Logout;
