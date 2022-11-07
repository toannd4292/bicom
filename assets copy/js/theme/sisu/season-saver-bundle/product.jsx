import React from 'react';
const Product = (props) => {
    const {
        name, product_id, image, selectOption, color, inStock, swatch, selected, productMain,
    } = props;
    // console.log(productMain);
    return (
        <div className="form-option-wrapper" disabled={!inStock}>
            <input className="form-radio" type="radio"/>
            <label className="form-option form-option-swatch" data-selected={selected} onClick={() => selectOption(product_id, productMain)} id={product_id}>
                <span className="form-option-variant form-option-variant--color" title={color} style={{backgroundColor: swatch}}></span>
            </label>
        </div>
    );
};
export default Product;
