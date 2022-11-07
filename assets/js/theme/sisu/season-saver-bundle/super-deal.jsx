import React, { Component } from 'react';
import ProductGroup from './product-group.jsx';
import ProductSelects from './productSelects.jsx';

export default class SuperDeal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            message: '',
        };
        // console.log(this.state);

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
            // console.log(this.state);
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
            // console.log(this.state);
        };

        this.selectOptionOne = (e) => {
            e.preventDefault();
            const el = e.target.id;
            // $('.apparel-mg-colors').hide();
            $('.watchClick').attr('data-selected', 'false');
            $('.watchClick#' + el).attr('data-selected', 'true');
            $('mg-colors#' + el).show();
            $('.mgColor').removeClass('grayout');
            $('.bulk-add-cart').addClass('grayout');
        };

        this.addToCart = (e) => {
            // console.log('break1');
            e.preventDefault();
            const button = e.target;
            const lineItems = this.state.products.map(product => {
                if (product.quantity > 0) {
                    // console.log('break2');
                    return {
                        productId: product.productId,
                        quantity: product.quantity,
                        variantId: product.id,
                    };
                }
            }).filter(item => item != null);
            async function createNewCart() {
                // console.log('break3');
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
                // console.log('break4');
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
                // console.log('break5');
                self.setState({
                    message,
                });
                return buttonNode.disabled = false;
            }

            if (lineItems.length > 1) {
                // console.log('break6');
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
                // console.log('break7');
                console.log(this);
                this.setState({ message: 'Please select both mouthguard options, then try again!' });
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
        const productIds = [122, 126];
        const products = [...this.state.products];
        const filteredProducts = [];
        const filteredApparelProducts = [];
        let finalFiltProd;
        let finalFiltApparelProd;
        productIds.forEach((productId) => {
            // console.log(products);
            // console.log(productIds);
            let filteredProduct;
            let filteredProductApparel;
            if (productId === 122) {
                const size = '3D';
                filteredProduct = products.filter(product => product.productId === productId);
                const aeroFilteredProduct = filteredProduct.filter(product => product.size === size);
                aeroFilteredProduct.sort((a, b) => b.size.localeCompare(a.size));
                // console.log(aeroFilteredProduct);
                if (aeroFilteredProduct.length > 0) {
                    filteredProducts.push(aeroFilteredProduct);
                }
            }
            if (productId === 126) {
                const apparelOptions = ['Medium', 'Large'];
                filteredProductApparel = products.filter(product => product.productId === productId);
                // console.log(filteredProductApparel);
                apparelOptions.forEach((size) => {
                    const apparelFilteredProduct = filteredProductApparel.filter(product => product.size === size);
                    // apparelFilteredProduct.sort((a, b) => b.option.localeCompare(a.option));
                    if (apparelFilteredProduct.length > 0) {
                        filteredApparelProducts.push(apparelFilteredProduct);
                    }
                });
            }
        });
        if (filteredProducts[0] !== undefined) {
            finalFiltProd = filteredProducts[0][0].productId;
            // console.log(finalFiltProd);
        }
        if (filteredApparelProducts[0] !== undefined) {
            finalFiltApparelProd = filteredApparelProducts[0][0].productId;
            // console.log(finalFiltApparelProd);
        }
        // console.log(finalFiltProd);
        // console.log(finalFiltApparelProd);
        // console.log(filteredApparelProducts);
        // <p id="limitedTime">LIMITED TIME OFFER: <span id="apparelTimer"></span></p>
        return (
            <div>
                <br/>
                <br/>
                <div style={{
                    textAlign: 'center', width: '100%', margin: '0 auto', maxWidth: '1000px',
                }}>
                    <img src="https://www.sisuguard.com/product_images/uploaded_images/super-bundle-main.jpg" alt="SISU Season Saver Bundle"></img>
                </div>
                <br/>
                <h1 style={{ textAlign: 'center', marginTop: 0 }}>Season Saver Bundle - <del>$49.99</del> <span data-product-price-without-tax="" className="price price--withoutTax">$39.99 USD</span></h1>
                <p style={{ textAlign: 'center', paddingBottom: '3rem' }}>Select your Mouthguard options to create your bundle! We will add a fresh spray, case and heatpack to your cart for you!</p>
                <div className="productView">
                    <section className="productView-images" data-image-gallery>
                        <figure className="productView-image is-ready" data-image-gallery-main="" data-zoom-image="https://cdn11.bigcommerce.com/s-nh4zo/images/stencil/760x760/products/232/1049/sisu-3d-rb__91926.1614778368.jpg?c=2">
                            <div className="productView-img-container">
                                <img src="https://cdn11.bigcommerce.com/s-nh4zo/images/stencil/760x760/products/232/1049/sisu-3d-rb__91926.1614778368.jpg?c=2" alt="SISU 3D Mouth Guard" title="SISU 3D Mouth Guard" data-sizes="auto" className="productView-image--default lazyautosizes lazyloaded" id="apparelGuardImage"/>
                            </div>
                        </figure>
                    </section>
                    <section className="productView-details product-data">
                        <div className="productView-product">
                            <div>
                                <div>
                                    <h1 className="productView-title main-heading">Choose your 3D guard color</h1>
                                </div>
                            </div>
                        </div>
                        <div className="productView-warranty">
                            The most unique feature of the SISU 3D is its superior comfort and easy fitting.
                        </div>
                        <div className="productView-featureTags">
                            <div className="featureTags-container">
                                <div className="featureTags-check-container">
                                    <img src="https://www.sisuguard.com/product_images/uploaded_images/product-checkmark.svg" />
                                </div>
                                <div className="featureTags-info-container">
                                    <span style={{ fontWeight: '900' }}>Up to $50,000</span> - <span><a href="/warranties-disclaimer/">limited dental warranty</a></span>
                                </div>
                            </div>
                            <div className="featureTags-container">
                                <div className="featureTags-check-container">
                                    <img src="https://www.sisuguard.com/product_images/uploaded_images/product-checkmark.svg" />
                                </div>
                                <div className="featureTags-info-container">
                                    <span style={{ fontWeight: '900' }}>Works With Braces</span> <span><a href="/fitting/3d/braces/">(Must be fit by a dental professional)</a></span>
                                </div>
                            </div>
                        </div>
                        <div className="productView-options" id={'productView-options-' + finalFiltProd}>
                            <form className="form">
                                <div className="productView-options-wrap">
                                    <div className="productView-options-inner">
                                        <div className="form-field" data-product-attribute="set-rectangle" role="radiogroup">
                                            <label className="form-label form-label--alternate form-label--inlineSmall" id="rectangle-group-label">
                                                Mouthguard Size:
                                                <small className="is-required">Required</small>
                                            </label>
                                            {filteredProducts.map((filteredProductNow, index) => {
                                                return (
                                                    <div className="form-option-wrapper" key={index}>
                                                        <ProductSelects
                                                            products={filteredProductNow}
                                                            resetOptions={this.resetOptions}
                                                            selectOptionOne={this.selectOptionOne}
                                                            key={index}
                                                        />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div className="form-field mgColor grayout" data-product-attribute="swatch" role="radiogroup">
                                            <label className="form-label form-label--alternate form-label--inlineSmall" id="rectangle-group-label">
                                                Mouthguard Color:
                                                <small className="is-required">Required</small>
                                            </label>
                                            {filteredProducts.map((filteredProductNow, index) => {
                                                return (
                                                    <div className="mg-colors" id={filteredProductNow[0].size} key={index + 100} selectedsection={filteredProductNow[0].selectedSection}>
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
                                    <h1 className="productView-title main-heading">Choose your AERO guard size and color</h1>
                                </div>
                            </div>
                        </div>
                        <div className="productView-warranty">
                            The classic super-slim, ultralight design that SISU is known for.
                        </div>
                        <div className="productView-featureTags">
                            <div className="featureTags-container">
                                <div className="featureTags-check-container">
                                    <img src="https://www.sisuguard.com/product_images/uploaded_images/product-checkmark.svg" />
                                </div>
                                <div className="featureTags-info-container">
                                    <span style={{ fontWeight: '900' }}>Up to $50,000</span> - <span><a href="/warranties-disclaimer/">limited dental warranty</a></span>
                                </div>
                            </div>
                            <div className="featureTags-container">
                                <div className="featureTags-check-container">
                                    <img src="https://www.sisuguard.com/product_images/uploaded_images/product-checkmark.svg" />
                                </div>
                                <div className="featureTags-info-container">
                                    <span style={{ fontWeight: '900' }}>Works With Braces</span> <span><a href="/fitting/3d/braces/">(Must be fit by a dental professional)</a></span>
                                </div>
                            </div>
                            <div className="featureTags-container">
                                <div className="featureTags-check-container">
                                    <img src="https://www.sisuguard.com/product_images/uploaded_images/product-checkmark.svg" />
                                </div>
                                <div className="featureTags-info-container">
                                    <span style={{ fontWeight: '900' }}>See aero fitting guide</span> <span><a href="/sisu-aero-mouth-guard/" target="_blank">here</a></span>
                                </div>
                            </div>
                        </div>
                        <div className="productView-options" id={'productView-options-' + finalFiltApparelProd}>
                            <form className="form">
                                <div className="productView-options-wrap">
                                    <div className="productView-options-inner">
                                        <div className="form-field" data-product-attribute="set-rectangle" role="radiogroup">
                                            <label className="form-label form-label--alternate form-label--inlineSmall" id="rectangle-group-label">
                                                Mouthguard Size:
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
                                        <div className="form-field apparelSizes grayout" data-product-attribute="swatch" role="radiogroup">
                                            <label className="form-label form-label--alternate form-label--inlineSmall" id="rectangle-group-label">
                                                Mouthguard Color:
                                                <small className="is-required">Required</small>
                                            </label>
                                            {filteredApparelProducts.map((filteredProductNow, index) => {
                                                return (
                                                    <div className="apparel-item-selections" id={filteredProductNow[0].size} key={index + 1000} selectedsection={filteredProductNow[0].selectedSection}>
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
