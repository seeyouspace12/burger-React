import React, {Component} from "react";
import PropTypes from "prop-types";

class Shipment extends Component {

    static propTypes = {
        total: PropTypes.number
    }

    render() {
        const {total} = this.props;
        const shipping = total > 0 && total < 500 ? 350 : 90;

        const shippingNeon = shipping === 90 ?
            (<span className='font-effect-neon total_wrap-cheap'>{shipping} uah</span>) :
            (<span>{shipping} uah</span>);

        return (
            <div className='total'>
                <div>
                    <div>Доставка: {total > 0 ? shippingNeon : null}</div>
                    <div className='total_wrap-free'>{total < 500 ? `Замовте ще на ${500 - total} гривень, щоб доставка коштувала 90 гривень` : null}</div>
                </div>
                <div className='total_wrap'>
                    <div className='total_wrap-final'>Всього: {total + shipping} uah</div>
                </div>
            </div>
        )
    }
}

export default Shipment;