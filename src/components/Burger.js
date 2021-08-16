import React from 'react';
import PropTypes from 'prop-types';


class Burger extends React.Component {

    static propTypes = {
        details: PropTypes.shape({
            name: PropTypes.string,
            image: PropTypes.string,
            price: PropTypes.number,
            desc: PropTypes.string,
            status: PropTypes.string
        }),
        index: PropTypes.string,
        addToOrder: PropTypes.func
    }

    render() {

        const {name, image, price, desc, status} = this.props.details;

        let isAvailable = status === 'available';
        return(
            <li className='menu-burger'>
                <div className='image-container'>
                    <img src={image} alt={name}/>
                </div>

                <div className='burger-details'>
                    <h3 className='burger-name'>
                        {name}
                        <span className='price'>{price}₴</span>
                    </h3>
                    {desc}
                    <button className='button-order' disabled={!isAvailable} onClick={() => this.props.addToOrder(this.props.index)}>
                        {isAvailable ? 'Замовити' : 'Немає у наявності'}
                    </button>
                </div>
            </li>
        )
    }
}

export default Burger;