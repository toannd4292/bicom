import React from 'react';
import Product from './product';
import ProductTwo from './productTwo';

const ProductSelects = (props) => {
    const {
        resetOptions,
        selectOptionOne,
    } = props;
    // console.log(props.products[0].productId);
    if (props.products[0].productId === 199) {
        return (
            <div>
                <label className="form-option watchClick" id={props.products[0].size} onClick={ (e) => { resetOptions(props.products[0].productId); selectOptionOne(e); }}>
                    <input className="form-radio" type="radio" />
                    <span className="form-option-variant">{props.products[0].size}</span>
                </label>
            </div>
        );
    }
    if (props.products[0].productId === 211) {
        return (
            <div>
                <label className="form-option watchApparelClicks" id={props.products[0].size} onClick={() => resetOptions(props.products[0].productId)}>
                    <input className="form-radio" type="radio" />
                    <span className="form-option-variant">{props.products[0].size}</span>
                </label>
            </div>
        );
    }

    // return (
    //     <div>{productRows}</div>
    // );
};
export default ProductSelects;
