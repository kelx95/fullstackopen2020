import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { logOut } from '../reducers/userReducer'

const NavBar = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.user)

    const padding = {
      paddingRight: 5,
    };

    if(!user) return null

    return (
    <div>
      <div style={{backgroundColor: 'lightgrey', marginTop: '5px'}}>
        <Link to="/" style={padding}>
          blogs
        </Link>
        <Link to="/users" style={padding}>
          users
        </Link>
        {user && `${user.name} logged in `}
          <button
            onClick={() => {
              history.push("/");
              return dispatch(logOut());
            }}
          >
            logout
        </button>
      </div>
      <br/>
      <br/>
      <h2>blog app</h2>
    </div>
    );
  };

  export default NavBar

 