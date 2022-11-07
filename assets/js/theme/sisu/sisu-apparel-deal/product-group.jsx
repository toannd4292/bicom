import React from 'react';
import Product from './product';
import ProductTwo from './productTwo';

const ProductGroup = (props) => {
    const productRows = props.products.map((product, index) => (
        <Product
            key={product.id}
            title={product.title}
            name={product.name}
            product_id={product.id}
            productMain={product.productId}
            image={product.image}
            color={product.color}
            size={product.size}
            swatch={product.swatch}
            quantity={product.quantity}
            selectOption={props.selectOption}
            inStock={product.inStock}
            stockMessage={product.stockMessage}
            selected={product.selected}
        />
    ));

    const productTwoRows = props.products.map((product, index) => (
        <ProductTwo
            key={product.id}
            title={product.title}
            name={product.name}
            product_id={product.id}
            productMain={product.productId}
            image={product.image}
            color={product.color}
            size={product.size}
            swatch={product.swatch}
            quantity={product.quantity}
            selectOption={props.selectOption}
            inStock={product.inStock}
            stockMessage={product.stockMessage}
            selected={product.selected}
            apparelName={product.apparelName}
        />
    ));
    if (props.products[0].productId === 191) {
        return (
            <div>{productRows}</div>
        );
    }
    if (props.products[0].productId === 234) {
        return (
            <div>
                {productTwoRows}
                <div className='apparel-feedback message' style={{textAlign: 'center'}}><strong>{props.message}</strong></div>
                <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                    <span class="price-section price-section--withoutTax non-sale-price--withoutTax">
                        <span style={{fontSize: '21px'}} data-product-non-sale-price-without-tax="" class="price price--non-sale">
                            USD $50.00 
                        </span>
                    </span>
                    <span style={{fontSize: '21px'}} data-product-price-without-tax="" class="price price--withoutTax">USD $34.99</span>
                    <button style={{margin: '0'}} className='button button--primary bulk-add-cart' onClick={props.addToCart}>Add to Cart</button>
                </div>
            </div>
        );
    }

    // return (
    //     <div>{productRows}</div>
    // );
};
export default ProductGroup;
