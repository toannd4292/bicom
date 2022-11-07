import React, { Component } from 'react';
import ProductGroup from './product-group.jsx';
// import '../../../../scss/sisu/theme/_bulk-order-form.scss';

export default class BulkOrderForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
        };

        this.updateQuantity = (quantity, id) => {
            const products = [...this.state.products];
            // console.log(products);
            quantity = parseInt(quantity);
            // console.log(quantity);
            if (quantity >= 0) {
                products.forEach(product => {
                    product.id === id ? product.quantity = quantity : null
                });
            } else {
                products.forEach(product => {
                    product.id === id ? product.quantity = 0 : null
                });
            }
            this.setState({
                products,
                message: '',
            });
        };

        this.addToCart = (e) => {
            const button = e.target;
            const lineItems = this.state.products.map(product => {
                if (product.quantity > 0) {
                    return {
                        productId: product.productId,
                        quantity: product.quantity,
                        variantId: product.id,
                    };
                }
            }).filter(item => item != null);
            async function createNewCart() {
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
                self.setState({
                    message,
                });
                return buttonNode.disabled = false;
            }

            if (lineItems.length > 0) {
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
                this.setState({ message: 'Please select a quantity for at least 1 item' });
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
        const productIds = [232, 191, 192, 200, 189, 209, 240, 235, 236, 237, 238, 212, 198];
        // const sovaIds = [186];
        const products = [...this.state.products];
        // console.log(products);
        const filteredProducts = [];
        const filteredSova = [];
        productIds.forEach((productId, index) => {
            let filteredProduct;
            if (productId === 191) {
                const sizes = ['Small', 'Medium', 'Large'];
                filteredProduct = products.filter(product => product.productId === productId);
                sizes.forEach((size) => {
                    const aeroFilteredProduct = filteredProduct.filter(product => product.size === size);
                    aeroFilteredProduct.sort((a, b) => b.size.localeCompare(a.size));
                    // console.log(aeroFilteredProduct);
                    if (aeroFilteredProduct.length > 0) {
                        filteredProducts.push(aeroFilteredProduct);
                    }
                });
            }
            if (productId === 240 || productId === 235 || productId === 236 || productId === 237 || productId === 238 || productId === 212 || productId === 198) {
                // console.log('HELLO!');
                filteredProduct = products.filter(product => product.productId === productId);
                if (filteredProduct.length > 0) {
                    filteredSova.push(filteredProduct);
                }
            }
            if (productId !== 240 && productId !== 235 && productId !== 236 && productId !== 237 && productId !== 238 && productId !== 191) {
                filteredProduct = products.filter(product => product.productId === productId);
                if (filteredProduct.length > 0) {
                    filteredProducts.push(filteredProduct);
                }
            }
            // console.log(filteredProducts);
            // console.log(filteredSova);
        });

        return (
            <div id="flexor">
                <div>
                    <h2>SISU Mouthguard Products</h2>
                    {filteredProducts.map((filteredProductNow, index) => {
                        if (filteredProductNow[0].productId === 191) {
                            return (
                                <div key={index + index}>
                                    <div className="accordion">{filteredProductNow[0].name} - {filteredProductNow[0].size}</div>
                                    <div className="panel">
                                        <ProductGroup
                                            products={filteredProductNow}
                                            updateQuantity={this.updateQuantity}
                                            addToCart={this.addToCart}
                                            message={this.state.message}
                                            key={index}
                                        />
                                    </div>
                                </div>
                            );
                        }
                        return (
                            <div key={index + index}>
                                <div className="accordion">{filteredProductNow[0].name}</div>
                                <div className="panel">
                                    <ProductGroup
                                        products={filteredProductNow}
                                        updateQuantity={this.updateQuantity}
                                        addToCart={this.addToCart}
                                        message={this.state.message}
                                        key={index}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div>
                    <h2>SOVA Nightguard Products</h2>
                    {filteredSova.map((filteredProductNow, index) => {
                        return (
                            <div key={index + index}>
                                <div className="accordion">{filteredProductNow[0].name}</div>
                                <div className="panel">
                                    <ProductGroup
                                        products={filteredProductNow}
                                        updateQuantity={this.updateQuantity}
                                        addToCart={this.addToCart}
                                        message={this.state.message}
                                        key={index}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

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
            <div>{ this.renderMethod() }</div>
        );
    }
}
