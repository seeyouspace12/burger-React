import React from "react";
import PropTypes from 'prop-types';

const Header = (props) => {
    return(
        <header className='top'>
            <div className='wrap'>
                <div className='header-content'>

                    <div className='header-rating'>
                        <div className='header-rating_tag'>Рейтинг:</div>
                        <div className='header-rating_icon'>★★★★★</div>
                    </div>

                    <div className='header-divider'>
                        <h1 className='font-effect-fire-animation'>{props.title}</h1>
                        <h3>
                            Швидка доставка гарячих
                            <span className='sub-header'>#бургерів</span>
                        </h3>
                    </div>
                </div>
            </div>
        </header>
    )
}

Header.propTypes = {
    title: PropTypes.string
}

export default Header;