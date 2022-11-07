import React from 'react';
import Product from './product';

const ProductGroup = (props) => {
    const productRows = props.products.map((product, index) => (
        <Product
            key={product.id}
            title={product.title}
            name={product.name}
            product_id={product.id}
            image={product.image}
            color={product.color}
            size={product.size}
            quantity={product.quantity}
            updateQuantity={props.updateQuantity}
            inStock={product.inStock}
            stockMessage={product.stockMessage}
        />
    ));

    return (
        <div className='bulk-form-field'>
            <div className='bulk-form-row'>
                <div className='bulk-form-col'></div>
                <div className='bulk-form-col'><strong>Product</strong></div>
                <div className='bulk-form-col'><strong>Quantity</strong></div>
            </div>
            {productRows}
            <div className='bulk-form-row'>
                <div></div>
                <div className='bulk-form-col message'><strong>{props.message}</strong></div>
                <div></div>
                <div><button className='button button--primary bulk-add-cart' onClick={props.addToCart}>Add to Cart</button></div>
            </div>
        </div>
    );
};
export default ProductGroup;
