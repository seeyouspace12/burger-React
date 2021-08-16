import React from "react";
import Header from "./Header";
import Order from "./Order";
import MenuAdmin from "./MenuAdmin";
import sampleBurgers from "../sample-burgers";
import Burger from "./Burger";
import base from "../base";
import SignIn from "./Auth/SignIn";
import firebase from "firebase/app";

class App extends React.Component {

    state = {
        burgers: {},
        order: {}
    }

   componentDidMount() {
        const {params} = this.props.match;

        const localStorageRef = localStorage.getItem(params.restaurantId);

        if(localStorageRef) {
            this.setState({order: JSON.parse(localStorageRef)});
        }

        this.ref = base.syncState(`${params.restaurantId}/burgers` , {
            context: this,
            state: 'burgers'
        })
    }

   componentDidUpdate() {
        const {params} = this.props.match;
        localStorage.setItem(params.restaurantId, JSON.stringify(this.state.order))
   }

    componentWillUnmount() {
        base.removeBinding(this.ref);
   }

    addBurger = (burger) => {
        const burgers = {...this.state.burgers};

        burgers[`burger${Date.now()}`] = burger;

        this.setState({ burgers });

        console.log(this.state);
    }

    updateBurgers = (key, updatedBurger) => {

        const burgers = {...this.state.burgers};

        burgers[key] = updatedBurger;

        this.setState({burgers});
    }

    addToOrder = key => {
        const order = {...this.state.order}

        order[key] = order[key] + 1 || 1;

        this.setState({ order : order });
        /*const newOrder = order;
        this.loadSampleOrders(newOrder);*/
    }

    deleteBurger = key => {
        const burgers ={...this.state.burgers};

        burgers[key] = null;

        this.setState({burgers});
    }

    deleteFromOrder = key => {
        const order = {...this.state.order};

        delete order[key];

        this.setState({order});
    }

    loadSampleBurgers = () => {
        this.setState({burgers: sampleBurgers});
    }

    handleLogout = async () => {
        firebase.auth().signOut();
        window.location.reload();
    }

    render() {
        return(
            <div className='burger-paradise'>
                <div className='menu'>
                    <Header title='Very Hot Burgers' />
                    <ul>
                        {Object.keys(this.state.burgers).map(key => <Burger
                            key={key}
                            index={key}
                            addToOrder={this.addToOrder}
                            details={this.state.burgers[key]}
                        />)}
                    </ul>
                </div>
                    <Order
                        burgers={this.state.burgers}
                        order={this.state.order}
                        deleteFromOrder={this.deleteFromOrder}/>
                <SignIn>
                    <MenuAdmin
                            burgers={this.state.burgers}
                            loadSampleBurgers={this.loadSampleBurgers}
                            addBurger={this.addBurger}
                            handleLogout={this.handleLogout}
                            updateBurgers={this.updateBurgers}
                            deleteBurger={this.deleteBurger}
                        />
                </SignIn>
            </div>
        )
    }
}

export default App;