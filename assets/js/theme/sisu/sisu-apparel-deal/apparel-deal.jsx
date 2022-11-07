import React, { Component } from 'react';
import ProductGroup from './product-group.jsx';
import ProductSelects from './productSelects.jsx';

export default class ApparelDeal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            message: '',
        };
        console.log(this.state);

        this.selectOption = (id, main) => {
            // console.log(swatch);
            const products = [...this.state.products];
            products.forEach(product => {
                if (product.id === id) {
                    product.quantity = 1;
                    product.selected = 'true';
                } else if (product.productId === main) {
                    product.quantity = 0;
                    product.selected = 'false';
                }
            });
            this.setState({
                products,
                message: '',
            });
            console.log(this.state);
        };

        this.resetOptions = (main) => {
            // console.log(swatch);
            const products = [...this.state.products];
            products.forEach(product => {
                if (product.productId === main) {
                    product.quantity = 0;
                    product.selected = 'false';
                }
            });
            this.setState({
                products,
                message: '',
            });
            console.log(this.state);
        };

        this.addToCart = (e) => {
            console.log('break1');
            e.preventDefault();
            const button = e.target;
            const lineItems = this.state.products.map(product => {
                if (product.quantity > 0) {
                    console.log('break2');
                    return {
                        productId: product.productId,
                        quantity: product.quantity,
                        variantId: product.id,
                    };
                }
            }).filter(item => item != null);
            async function createNewCart() {
                console.log('break3');
                const response = await fetch('/api/storefront/carts', {
                    credentials: 'include',
                    method: 'POST',
                    body: JSON.stringify({ lineItems }),
                });
                const data = await response.json();
                if (!response.ok) {
                    console.log(data.detail);
                    return Promise.reject('There was an issue adding items to your cart. Please try again.')
                } console.log(data);
            }

            async function addToExistingCart(cartId) {
                console.log('break4');
                const response = await fetch(`/api/storefront/carts/${cartId}/items`, {
                    credentials: 'include',
                    method: 'POST',
                    body: JSON.stringify({ lineItems }),
                });
                const data = await response.json();
                if (!response.ok) {
                    console.log(data.detail);
                    return Promise.reject('There was an issue adding items to your existing cart. Please try again.')
                } console.log(data);
            }

            function handleFailedAddToCart(message, self, buttonNode) {
                console.log('break5');
                self.setState({
                    message,
                });
                return buttonNode.disabled = false;
            }

            if (lineItems.length > 1) {
                console.log('break6');
                button.disabled = true;
                this.setState({ message: 'Adding items to your cart...' });
                fetch('/api/storefront/cart')
                    .then(response => response.json())
                    .then(cart => {
                        if (cart.length > 0) {
                            return addToExistingCart(cart[0].id);
                        } return createNewCart();
                    })
                    .then(() => window.location = "/cart.php")
                    .catch(err => handleFailedAddToCart(err, this, button));
            } else {
                console.log('break7');
                console.log(this);
                this.setState({ message: 'Please select both a mouthguard AND an apparel item!' });
            }
        };
    }

    componentDidMount() {
        const keys = Object.keys(this.props);
        const categoryProducts = [];
        keys.forEach(key => {
            key != 'children' ? categoryProducts.push(this.props[key]) : null;
        });
        this.setState({ products: categoryProducts });
    }

    renderMethod() {
        const productIds = [191, 234];
        const products = [...this.state.products];
        const filteredProducts = [];
        const filteredApparelProducts = [];
        let finalFiltProd;
        let finalFiltApparelProd;
        productIds.forEach((productId) => {
            let filteredProduct;
            let filteredProductApparel;
            if (productId === 191) {
                const sizes = ['Small', 'Medium', 'Large'];
                filteredProduct = products.filter(product => product.productId === productId);
                sizes.forEach((size) => {
                    const aeroFilteredProduct = filteredProduct.filter(product => product.size === size);
                    aeroFilteredProduct.sort((a, b) => b.size.localeCompare(a.size));
                    console.log(aeroFilteredProduct);
                    if (aeroFilteredProduct.length > 0) {
                        filteredProducts.push(aeroFilteredProduct);
                    }
                });
            }
            if (productId === 234) {
                const apparelOptions = ['"I Got Your Back" Hoodie', '"LAX TO THE MAX" Boonie Hat', '"SISU Logo" Boonie Hat'];
                filteredProductApparel = products.filter(product => product.productId === productId);
                apparelOptions.forEach((option) => {
                    const apparelFilteredProduct = filteredProductApparel.filter(product => product.apparelName === option);
                    // apparelFilteredProduct.sort((a, b) => b.option.localeCompare(a.option));
                    if (apparelFilteredProduct.length > 0) {
                        filteredApparelProducts.push(apparelFilteredProduct);
                    }
                });
            }
        });
        if (filteredProducts[0] !== undefined) {
            finalFiltProd = filteredProducts[0][0].productId;
            console.log(finalFiltProd);
        }
        if (filteredApparelProducts[0] !== undefined) {
            finalFiltApparelProd = filteredApparelProducts[0][0].productId;
            console.log(finalFiltApparelProd);
        }
        console.log(finalFiltProd);
        console.log(finalFiltApparelProd);
        console.log(filteredApparelProducts);
        // <p id="limitedTime">LIMITED TIME OFFER: <span id="apparelTimer"></span></p>
        return (
            <div>
                <br/>
                <h1 style={{ textAlign: 'center', marginTop: 0}}>SISU Aero + Apparel Item for <del>$50.00</del> $<ins>34.99</ins>!</h1>
                <p style={{ textAlign: 'center', paddingBottom: '3rem' }}>Add both a SISU Aero and a SISU Apparel item to your cart to receive special pricing!</p>
                <div className="productView">
                    <section className="productView-images" data-image-gallery>
                        <figure className="productView-image is-ready" data-image-gallery-main="" data-zoom-image="https://cdn11.bigcommerce.com/s-nh4zo/images/stencil/1280x1280/products/191/655/Aero-IntenseRed-web__10584.1633545203.jpg?c=2">
                            <div className="productView-img-container">
                                <img src="https://cdn11.bigcommerce.com/s-nh4zo/images/stencil/760x760/products/191/655/Aero-IntenseRed-web__10584.1633545203.jpg?c=2" alt="SISU Aero Mouth Guard" title="SISU Aero Mouth Guard" data-sizes="auto" className="productView-image--default lazyautosizes lazyloaded" id="apparelGuardImage"/>
                            </div>
                        </figure>
                    </section>
                    <section className="productView-details product-data">
                        <div className="productView-product">
                            <div>
                                <div>
                                    <h1 className="productView-title main-heading">STEP 1: Aero Guard</h1>
                                </div>
                            </div>
                        </div>
                        <div className="productView-warranty">
                            The most unique feature of the SISU Aero is its super-slim, ultralight design.
                        </div>
                        <div className="productView-featureTags">
                            <div className="featureTags-container">
                                <div className="featureTags-check-container">
                                    <img src="https://cdn11.bigcommerce.com/s-nh4zo/stencil/54bc4980-04f2-013a-7a84-1e68058273e0/e/f4d65280-0b1c-0139-0c58-0242ac11000d/img/sisu/theme/product/SVG/product-checkmark.svg" />
                                </div>
                                <div className="featureTags-info-container">
                                    <span style={{ fontWeight: '900' }}>Up to $50,000</span> - <span><a href="/warranties-disclaimer/">limited dental warranty</a></span>
                                </div>
                            </div>
                            <div className="featureTags-container">
                                <div className="featureTags-check-container">
                                    <img src="https://cdn11.bigcommerce.com/s-nh4zo/stencil/54bc4980-04f2-013a-7a84-1e68058273e0/e/f4d65280-0b1c-0139-0c58-0242ac11000d/img/sisu/theme/product/SVG/product-checkmark.svg" />
                                </div>
                                <div className="featureTags-info-container">
                                    <span style={{ fontWeight: '900' }}>Works With Braces</span> <span><a href="/fitting/classic/braces/">Medium and Large only</a></span>
                                </div>
                            </div>
                        </div>
                        <div className="productView-options" id={'productView-options-' + finalFiltProd}>
                            <form className="form">
                                <div className="productView-options-wrap">
                                    <div className="productView-options-inner">
                                        <div className="form-field" data-product-attribute="set-rectangle" role="radiogroup">
                                            <label className="form-label form-label--alternate form-label--inlineSmall rwx" id="rectangle-group-label">
                                                Mouthguard Size:: 
                                                <small className="is-required">Required</small>
                                            </label>
                                            {filteredProducts.map((filteredProductNow, index) => {
                                                return (
                                                    <div className="form-option-wrapper" key={index}>
                                                        <ProductSelects
                                                            products={filteredProductNow}
                                                            resetOptions={this.resetOptions}
                                                            key={index}
                                                        />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div className="form-field mgColor grayout" data-product-attribute="swatch" role="radiogroup">
                                            <label className="form-label form-label--alternate form-label--inlineSmall  wer" id="rectangle-group-label">
                                                Mouthguard Color::
                                                <small className="is-required">Required</small>
                                            </label>
                                            {filteredProducts.map((filteredProductNow, index) => {
                                                return (
                                                    <div className="apparel-mg-colors" id={filteredProductNow[0].size} key={index + 100} selectedsection={filteredProductNow[0].selectedSection}>
                                                        <ProductGroup
                                                            products={filteredProductNow}
                                                            selectOption={this.selectOption}
                                                            key={index}
                                                        />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
                <div className="productView">
                    <section className="productView-images" data-image-gallery>
                        <figure className="productView-image is-ready" data-image-gallery-main="" data-zoom-image="https://www.sisuguard.com/product_images/uploaded_images/apparel-deal/deal-hoodie.jpg">
                            <div className="productView-img-container">
                                <img src="https://www.sisuguard.com/product_images/uploaded_images/apparel-deal/apparel-all.jpg" alt="SISU Apparel Items" title="SISU Apparel Items" data-sizes="auto" className="productView-image--default lazyautosizes lazyloaded apparelHover" id="apparelImageAll"/>
                                <img src="https://www.sisuguard.com/product_images/uploaded_images/apparel-deal/deal-hoodie.jpg" alt="SISU Apparel Items" title="SISU Apparel Items" data-sizes="auto" className="productView-image--default lazyautosizes lazyloaded apparelHover" id="apparelImage" style={{display: 'none'}}/>
                                <img src="https://www.sisuguard.com/product_images/uploaded_images/apparel-deal/deal-boonieOne.jpg" alt="SISU Apparel Items" title="SISU Apparel Items" data-sizes="auto" className="productView-image--default lazyautosizes lazyloaded" id="boonieImageOne" style={{display: 'none'}}/>
                                <img src="https://www.sisuguard.com/product_images/uploaded_images/apparel-deal/deal-boonieTwo.jpg" alt="SISU Apparel Items" title="SISU Apparel Items" data-sizes="auto" className="productView-image--default lazyautosizes lazyloaded" id="boonieImageTwo" style={{display: 'none'}}/>
                            </div>
                        </figure>
                    </section>
                    <section className="productView-details product-data">
                        <div className="productView-product">
                            <div>
                                <div>
                                    <h1 className="productView-title main-heading">STEP 2: Apparel Item</h1>
                                </div>
                            </div>
                        </div>
                        <div className="productView-warranty" style={{ fontWeight: '900' }} id="apparel-short-description">
                            Make a selection to see product details...
                        </div>
                        <div className="productView-featureTags" id="apparel-features">
                        </div>
                        <div className="productView-options" id={'productView-options-' + finalFiltApparelProd}>
                            <form className="form">
                                <div className="productView-options-wrap">
                                    <div className="productView-options-inner">
                                        <div className="form-field" data-product-attribute="set-rectangle" role="radiogroup">
                                            <label className="form-label form-label--alternate form-label--inlineSmall" id="rectangle-group-label">
                                                Apparel Type:
                                                <small className="is-required">Required</small>
                                            </label>
                                            {filteredApparelProducts.map((filteredProductNow, index) => {
                                                return (
                                                    <div className="form-option-wrapper" key={index}>
                                                        <ProductSelects
                                                            products={filteredProductNow}
                                                            resetOptions={this.resetOptions}
                                                            key={index}
                                                        />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div className="form-field apparelSizes grayout" data-product-attribute="set-rectangle" role="radiogroup">
                                            <label className="form-label form-label--alternate form-label--inlineSmall" id="rectangle-group-label">
                                                Apparel Size:
                                                <small className="is-required">Required</small>
                                            </label>
                                            {filteredApparelProducts.map((filteredProductNow, index) => {
                                                return (
                                                    <div className={'apparel-item-selections ' + filteredProductNow[0].apparelType} key={index + 1000}>
                                                        <ProductGroup
                                                            products={filteredProductNow}
                                                            selectOption={this.selectOption}
                                                            addToCart={this.addToCart}
                                                            message={this.state.message}
                                                            key={index}
                                                        />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
                <h2 style={{textAlign: 'center'}}>Return Policy</h2>
                <p style={{textAlign: 'center'}}>We want you to love your purchase and understand if you are not completely satisfied. We will gladly accept most returns.<br/>Returned items must be unworn, unwashed, undamaged (hoodies and hats), and unopened (mouthguards). If you would like to exchange your purchase, contact us to set aside your correct size.<br/>For the holiday season, we are extending our return acceptance timeframe to allow for holiday shopping. Orders placed from November 15 through December 25, 2021, can be returned until January 31, 2022.<br/>Return shipping is not provided.
                </p>
            </div>
        );
    }


    // <div className="apparel-item-selections" id={filteredProductNow[0].size} key={index + 1000}>
    //                                                     <ProductGroup
    //                                                         products={filteredProductNow}
    //                                                         selectMg={this.selectMg}
    //                                                         // selected={this.filteredProductNow[0].selected}
    //                                                         addToCart={this.addToCart}
    //                                                         message={this.state.message}
    //                                                         key={index}
    //                                                     />

    render() {
        // return (
        //     <div>
        //         <div className="accordion">Filler</div>
        //         <div className="panel">
        //             <ProductGroup
        //                 products={this.state.products}
        //                 updateQuantity={this.updateQuantity}
        //                 addToCart={this.addToCart}
        //                 key="1"
        //             />
        //         </div>
        //     </div>
        // );
        return (
            <div>{this.renderMethod()}</div>
        );
    }
}
