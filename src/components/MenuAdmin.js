import React from "react";
import AddBurgerForm from "./AddBurgerForm";
import EditBurgerForm from "./EditBurgerForm";
import PropTypes from 'prop-types';
import firebase from "firebase";


class MenuAdmin extends React.Component {

    state = {
        photo: '',
        user: ''
    }

    static propTypes = {
        burgers: PropTypes.shape({
            burger: PropTypes.shape({
                name: PropTypes.string,
                image: PropTypes.string,
                price: PropTypes.number,
                desc: PropTypes.string,
                status: PropTypes.string
            }),
        }),
        updateBurgers: PropTypes.func,
        deleteBurger: PropTypes.func,
        addBurger: PropTypes.func,
        loadSampleBurgers: PropTypes.func,
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged( user => {
            if(user) this.authHandler({user});
        })
    }

    authHandler = async authData => {
        const {email, photoURL} = authData.user;
        this.setState({user: email, photo: photoURL});
    }

    render() {
        return(
            <div className='menu-admin'>
                <div className='login-header'>
                    <div className='avatar'>

                        <img src={this.state.photo ? this.state.photo : '/images/avatar.png'} alt='avatar'/>
                    </div>
                    <button className='buttonLogout' onClick={()=> this.props.handleLogout()}>Вихід</button>
                </div>
                <h2>Керування меню</h2>

                {Object.keys(this.props.burgers).map(key => {
                    return <EditBurgerForm
                        updateBurgers={this.props.updateBurgers}
                        deleteBurger={this.props.deleteBurger}
                        key={key}
                        index={key}
                        burger={this.props.burgers[key]} />
                })}

                <AddBurgerForm addBurger={this.props.addBurger}/>
                <button onClick={this.props.loadSampleBurgers}>Завантажити бургери</button>
            </div>
        )
    }
}

export default MenuAdmin;