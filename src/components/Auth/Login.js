import React from "react";
import PropTypes from "prop-types";

const Login = (props) => {
    return (
        <div className='login-container'>
            <nav className='login'>
                <h2>Авторизація</h2>
                <p>Введіть логін та пароль вашого акунту Github</p>
                <button className='github' onClick={() => props.authenticate()}>Увійти</button>
            </nav>

        </div>
    )
}

Login.propTypes = {
    authenticate: PropTypes.func.isRequired
}

export default Login;