import React from 'react';
const ProductTwo = (props) => {
    const {
        name, product_id, image, selectOption, inStock, selected, size, productMain,
    } = props;
    return (
        <div className="form-option-wrapper" disabled={!inStock}>
            <input className="form-radio" type="radio"/>
            <label className="form-option" data-selected={selected} id={product_id} onClick={() => selectOption(product_id, productMain)}>
                <span className="form-option-variant">{size}</span>
            </label>
        </div>
        
    );
};
export default ProductTwo;
