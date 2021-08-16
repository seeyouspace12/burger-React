import React from "react";
import Shipment from "./Shipment";
import {TransitionGroup, CSSTransition} from "react-transition-group";
import PropTypes from 'prop-types';

class Order extends React.Component {

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
        order: PropTypes.object,
        deleteFromOrder: PropTypes.func
    }

    renderOrder = (key) => {
        const burger = this.props.burgers[key];
        const count = this.props.order[key];

        if(!burger) return null;

        const isAvailable = burger && burger.status === 'available';
        if (!isAvailable) {
            return (
                <CSSTransition classNames='order' timeout={{enter: 500 , exit : 500}}>
                    <li className='unavailable' key={key}>
                        Вибачте, {burger ? burger.name : 'бургер'} тимчасово недоступний
                    </li>
                </CSSTransition>
            );
        }

        return (
            <CSSTransition classNames='order' key={key} timeout={{enter: 500 , exit : 500}}>
                <li>
                <span>
                    <TransitionGroup component='span' className='count'>
                        <CSSTransition classNames='count' key={count} timeout={{enter: 500 , exit : 500}}>
                            <span>{count}</span>
                        </CSSTransition>
                    </TransitionGroup>
                    шт. {burger.name}
                    <span> {count * burger.price} </span>uah
                    <button className='cancellItem' onClick={() => this.props.deleteFromOrder(key)}> &times; </button>
                </span>
                </li>
            </CSSTransition>
        );
    }

    render() {
        const OrderIds = Object.keys(this.props.order);

        const total = OrderIds.reduce((prevTotal, key) => {
            const burger = this.props.burgers[key];
            const count = this.props.order[key];

            const isAvailable = burger && burger.status === 'available';

            if (isAvailable) return prevTotal + burger.price * count;

            return prevTotal;
        }, 0)
        return(
            <div className='order-wrap'>
                <h2>Ваше замовлення</h2>
                <TransitionGroup component='ul' className='order'>
                    {OrderIds.map(this.renderOrder)}
                </TransitionGroup>
                {total ?
                    <Shipment total={total} /> :
                    <div className='nothingSelected'>Оберіть бургери</div>
                }

            </div>
        )
    }
}

export default Order;