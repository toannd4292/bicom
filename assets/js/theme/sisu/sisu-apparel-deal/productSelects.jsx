import React from 'react';
import Product from './product';
import ProductTwo from './productTwo';

const ProductSelects = (props) => {
    const {
        resetOptions
    } = props;
    // console.log(props.products[0].productId);
    if (props.products[0].productId === 191) {
        return (
            <div>
                <label className="form-option watchClick" id={props.products[0].size} onClick={() => resetOptions(props.products[0].productId)}>
                    <input className="form-radio" type="radio" />
                    <span className="form-option-variant">{props.products[0].size}</span>
                </label>
            </div>
        );
    }
    if (props.products[0].productId === 234) {
        return (
            <div>
                <label className="form-option watchApparelClicks" id={props.products[0].apparelType} onClick={() => resetOptions(props.products[0].productId)}>
                    <input className="form-radio" type="radio" />
                    <span className="form-option-variant">{props.products[0].apparelName}</span>
                </label>
            </div>
        );
    }

    // return (
    //     <div>{productRows}</div>
    // );
};
export default ProductSelects;
