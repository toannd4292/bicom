export default function membershipPage() {
    let mainCartId;
    let location;
    const couponsText = '/coupons/';

    function getCart(url) {
        return fetch(url, {
            method: 'GET',
            credentials: 'same-origin',
        })
            .then(response => response.json());
    }

    function deleteCoupon(url, cartId, couponCode) {
        return fetch(url + cartId + couponsText + couponCode, {
            method: 'DELETE',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json());
    }

    function waitForElementToDisplay(selector, callback, checkFrequencyInMs, timeoutInMs) {
        const startTimeInMs = Date.now();
        (function loopSearch() {
            if (document.querySelector(selector) != null) {
                callback();
                return;
            }
            else {
                setTimeout(function () {
                    if (timeoutInMs && Date.now() - startTimeInMs > timeoutInMs)
                        return;
                    loopSearch();
                }, checkFrequencyInMs);
            }
        })();
    }

    function checkVipClickStatus() {
        getCart('/api/storefront/carts?include=lineItems.digitalItems.options,lineItems.physicalItems.options')
            .then((data) => {
                const theData = data;
                let vip = false;
                let vipCoupon = false;
                let otherItems = false;
                let existingCoupon;
                const otherItemsArray = [];
                let groupId = document.getElementById('loginGroup').textContent;
                if (theData[0].lineItems.digitalItems[0] !== undefined) { theData[0].lineItems.digitalItems[0].sku === "SISUVIP" ? vip = true : vip = false; }
                theData[0].lineItems.physicalItems.length > 0 ? otherItems = true : otherItems = false;
                if (theData[0].coupons[0] !== undefined) { theData[0].coupons[0].code === "SISUVIP20" ? vipCoupon = true : vipCoupon = false; existingCoupon = theData[0].coupons[0].code; }
                mainCartId = theData[0].id;
                if (groupId.length < 1) {
                    groupId = 'notSubbed';
                }
                // console.log("vip product " + vip);
                // console.log("vip coupon " + vipCoupon);
                // console.log("other items " + otherItems);
                // console.log("sub status " + groupId);
                if (vip && !vipCoupon) {
                    if (location === 'cart') {
                        if (groupId !== 'SISU-Plus-Subscribed') {
                            if (otherItems) {
                                document.getElementById('couponcode').value = 'SISUVIP20';
                                document.querySelector('div.cart-form.coupon-code > form > input.button.button--primary.button--small').click();
                                if (!alert('SISUVIP20 coupon added for 20% off. Please continue to checkout!')) { window.location.href = '/checkout'; }
                            } else {
                                window.location.href = '/checkout';
                            }
                        } else {
                            alert('You already have VIP status, please remove the VIP Membership from your cart, then continue to checkout.');
                        }
                    }
                }
                if (vip && vipCoupon) {
                    if (location === 'cart') {
                        if (groupId !== 'SISU-Plus-Subscribed') {
                            window.location.href = '/checkout';
                        } else {
                            alert('You already have VIP status, please remove the VIP Membership from your cart, then continue to checkout.');
                        }
                    }
                }
                if (!vip && !vipCoupon) {
                    theData[0].lineItems.physicalItems.forEach((e) => { otherItemsArray.push(e.productId); });
                    window.location.href = '/checkout';
                    // if (otherItemsArray.indexOf(233) > -1) {
                    //     $('.redeemable-entry').hide();
                    //     $('.redeemable-label').hide();
                    //     if (existingCoupon !== undefined) {
                    //         deleteCoupon('/api/storefront/checkouts/', mainCartId, existingCoupon)
                    //             .catch(error => console.log(error));
                    //         // console.log("couponDeleted");
                    //         if (!alert('Cannot combine coupon with Case Bundle sale... Removing coupon.')) { window.location.reload(); }
                    //     } else { window.location.href = '/checkout'; }
                    // } else {
                    //     window.location.href = '/checkout';
                    // }
                }
                if (!vip && vipCoupon) {
                    if (location === 'cart') {
                        deleteCoupon('/api/storefront/checkouts/', mainCartId, 'SISUVIP20')
                            .catch(error => console.log(error));
                        // console.log('couponDeleted');
                        if (!alert('Cannot use SISUVIP20 without membership in cart. Removing coupon.')) { window.location.reload(); }
                    }
                }
            })
            .catch(error => console.error(error));
    }

    function checkWholesaleCoupons() {
        getCart('/api/storefront/carts?include=lineItems.digitalItems.options,lineItems.physicalItems.options')
            .then((data) => {
                const theData = data;
                let cartCoupon;
                mainCartId = theData[0].id;
                // console.log(cartCoupon);
                if (theData[0].coupons[0] !== undefined) {
                    cartCoupon = theData[0].coupons[0].code;
                }
                if (cartCoupon !== undefined) {
                    deleteCoupon('/api/storefront/checkouts/', mainCartId, cartCoupon)
                        .catch(error => console.log(error));
                    if (!alert('Cannot use a coupon as a retail/wholsale customer. Removing coupon.')) { window.location.reload(); }
                } else { window.location.href = '/checkout'; }
            });
    }

    function checkBundleContent() {
        getCart('/api/storefront/carts?include=lineItems.digitalItems.options,lineItems.physicalItems.options')
            .then((data) => {
                const theData = data;
                const groupId = document.getElementById('loginGroup').textContent;
                console.log(theData[0].lineItems.physicalItems);
                const physicalItems = theData[0].lineItems.physicalItems;
                const hpVariants = [3208, 3209, 3210, 3211, 3212, 323, 324, 3215, 326, 3217, 3218, 3219, 3220, 3221, 3222, 3223, 3237, 3238, 3239, 3240, 3241, 3242];
                const bundleVariants = [3367, 3368, 3369, 3370, 3371];
                const anyBundleVariants = [211, 199, 233];
                let hpExists = false;
                let bundleExists = false;
                let anyBundles = false;
                physicalItems.forEach((e) => {
                    if (hpVariants.includes(e.variantId)) {
                        hpExists = true;
                    }
                    if (bundleVariants.includes(e.variantId)) {
                        bundleExists = true;
                    }
                    if (anyBundleVariants.includes(e.productId)) {
                        anyBundles = true;
                    }
                });
                if (hpExists && bundleExists) {
                    const messageSpot = document.getElementById('cart-messages-here');
                    const messageDiv = document.createElement('div');
                    const iconDiv = document.createElement('div');
                    const icon = document.createElement('icon');
                    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    const messageP = document.createElement('p');
                    const message = document.createElement('span');
                    path.setAttribute('d', 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z');
                    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
                    svg.setAttribute('width', '24');
                    svg.setAttribute('height', '24');
                    svg.setAttribute('viewBox', '0 0 24 24');
                    svg.appendChild(path);
                    icon.setAttribute('glyph', 'ic-success');
                    icon.className = 'icon';
                    icon.setAttribute('aria-hidden', 'true');
                    icon.appendChild(svg);
                    iconDiv.className = 'alertBox-column alertBox-icon';
                    iconDiv.appendChild(icon);
                    messageDiv.className = 'alertBox alertBox--info';
                    messageP.className = 'alertBox-column alertBox-message';
                    if (groupId === 'SISU-Plus-Subscribed') {
                        message.innerText = 'Season Saver discount has been added to your cart! You get an Aero guard, 3D guard, Heatpack, Fresh Spray, and Case all for $31.99!';
                    } else {
                        message.innerText = 'Season Saver discount has been added to your cart! You get an Aero guard, 3D guard, Heatpack, Fresh Spray, and Case all for $39.99!';
                    }
                    messageP.appendChild(message);
                    messageDiv.appendChild(iconDiv);
                    messageDiv.appendChild(messageP);
                    messageSpot.appendChild(messageDiv);
                }
                if (anyBundles) {
                    const messageSpot = document.getElementById('cart-messages-here');
                    const messageDiv = document.createElement('div');
                    const iconDiv = document.createElement('div');
                    const icon = document.createElement('icon');
                    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    const messageP = document.createElement('p');
                    const message = document.createElement('span');
                    path.setAttribute('d', 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z');
                    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
                    svg.setAttribute('width', '24');
                    svg.setAttribute('height', '24');
                    svg.setAttribute('viewBox', '0 0 24 24');
                    svg.appendChild(path);
                    icon.setAttribute('glyph', 'ic-success');
                    icon.className = 'icon';
                    icon.setAttribute('aria-hidden', 'true');
                    icon.appendChild(svg);
                    iconDiv.className = 'alertBox-column alertBox-icon';
                    iconDiv.appendChild(icon);
                    messageDiv.className = 'alertBox alertBox--info';
                    messageP.className = 'alertBox-column alertBox-message';
                    message.innerText = 'A free SISU Rain Poncho will be included with your shipment! *While supplies last';
                    messageP.appendChild(message);
                    messageDiv.appendChild(iconDiv);
                    messageDiv.appendChild(messageP);
                    messageSpot.appendChild(messageDiv);
                }
                mainCartId = theData[0].id;
            });
    }

    if (window.location.href.indexOf('/cart.php') > -1) {
        location = 'cart';
        const groupId = document.getElementById('loginGroup').textContent;
        const checkoutButton = document.querySelector('div.cart-actions > a');
        if (!groupId.includes('Wholesale')) {
            checkoutButton.addEventListener('click', (e) => { e.preventDefault(); checkVipClickStatus(); });
            checkBundleContent();
            waitForElementToDisplay('div.previewCartAction-checkout > a', () => {
                const topCheckoutButton = document.querySelector('div.previewCartAction-checkout > a');
                topCheckoutButton.addEventListener('click', (e) => { e.preventDefault(); checkVipClickStatus(); });
            });
        } else {
            checkoutButton.addEventListener('click', (e) => { e.preventDefault(); checkWholesaleCoupons(); });
            waitForElementToDisplay('div.previewCartAction-checkout > a', () => {
                const topCheckoutButton = document.querySelector('div.previewCartAction-checkout > a');
                topCheckoutButton.addEventListener('click', (e) => { e.preventDefault(); checkWholesaleCoupons(); });
            });
        }
    }

    function checkWholesaleCouponsCheckout(checkoutGroupId) {
        getCart('/api/storefront/carts?include=lineItems.digitalItems.options,lineItems.physicalItems.options')
            .then((data) => {
                const theData = data;
                console.log(data);
                let coupon = false;
                if (theData[0].coupons[0] !== undefined) { theData[0].coupons[0].code ? coupon = true : coupon = false; }
                mainCartId = theData[0].id;
                console.log(theData[0]);
                if (coupon) {
                    const couponCode = theData[0].coupons[0].code;
                    deleteCoupon('/api/storefront/checkouts/', mainCartId, couponCode)
                        .catch(error => console.log(error));
                    // console.log("couponDeleted");
                    if (!alert('Sorry, you cannot use a coupon as a retail/wholsale customer. Removing coupon.')) { window.location.reload(); }
                }
                if (theData[0].lineItems.physicalItems.length > 0) {
                    const physicalArray = theData[0].lineItems.physicalItems;
                    const counterGroupId = checkoutGroupId;
                    const placeOrder = document.querySelector('#continue-with-rebillia');
                    let mouthguardCounter = 0;
                    const mouthguardOptions = [191, 232, 192, 200, 240, 235, 236, 237];
                    physicalArray.forEach((physicalItem) => {
                        if (mouthguardOptions.includes(physicalItem.productId)) {
                            const itemQty = physicalItem.quantity;
                            mouthguardCounter += itemQty;
                        }
                    });
                    console.log(counterGroupId);
                    switch (counterGroupId) {
                    case 'Wholesale-TeamSale-25':
                        if (mouthguardCounter < 25) {
                            if (!alert('Your minimum order quantity is 25 mouthguards. Please add more mouthguards, or contact your account administrator for help.')) { window.location.href = '/cart.php'; }
                            placeOrder.disabled = true;
                        }
                        break;
                    case 'Wholesale-Distributor-500':
                        if (mouthguardCounter < 500) {
                            if (!alert('Your minimum order quantity is 500 mouthguards. Please add more mouthguards, or contact your account administrator for help.')) { window.location.href = '/cart.php'; }
                        }
                        break;
                    case 'Wholesale-Retail-25':
                        if (mouthguardCounter < 25) {
                            if (!alert('Your minimum order quantity is 25 mouthguards. Please add more mouthguards, or contact your account administrator for help.')) { window.location.href = '/cart.php'; }
                        }
                        break;
                    case 'Wholesale-Distributor-1500':
                        if (mouthguardCounter < 1500) {
                            if (!alert('Your minimum order quantity is 1500 mouthguards. Please add more mouthguards, or contact your account administrator for help.')) { window.location.href = '/cart.php'; }
                        }
                        break;
                    case 'SOVA-Wholesale-Distributor-500':
                        if (mouthguardCounter < 500) {
                            if (!alert('Your minimum order quantity is 500 mouthguards. Please add more mouthguards, or contact your account administrator for help.')) { window.location.href = '/cart.php'; }
                        }
                        break;
                    case 'SOVA-Wholesale-Retail-25':
                        if (mouthguardCounter < 25) {
                            if (!alert('Your minimum order quantity is 25 mouthguards. Please add more mouthguards, or contact your account administrator for help.')) { window.location.href = '/cart.php'; }
                        }
                        break;
                    case 'SOVA-Wholesale-Distributor-1500':
                        if (mouthguardCounter < 1500) {
                            if (!alert('Your minimum order quantity is 1500 mouthguards. Please add more mouthguards, or contact your account administrator for help.')) { window.location.href = '/cart.php'; }
                        }
                        break;
                    default:
                    }
                }
            });
    }

    function checkVipStatusSubbedCheckout() {
        getCart('/api/storefront/carts?include=lineItems.digitalItems.options,lineItems.physicalItems.options')
            .then((data) => {
                const theData = data;
                let vip = false;
                let coupon = false;
                if (theData[0].lineItems.digitalItems[0] !== undefined) { theData[0].lineItems.digitalItems[0].sku === "SISUVIP" ? vip = true : vip = false; }
                if (theData[0].coupons[0] !== undefined) { theData[0].coupons[0].code ? coupon = true : coupon = false; }
                mainCartId = theData[0].id;
                // console.log("vip item" + vip);
                // console.log("vip coupon" + vipCoupon);
                // console.log("other items" + otherItems);
                // console.log("copupon" + coupon)
                if (coupon) {
                    const couponCode = theData[0].coupons[0].code;
                    deleteCoupon('/api/storefront/checkouts/', mainCartId, couponCode)
                        .catch(error => console.log(error));
                    // console.log("couponDeleted");
                    if (!alert('Sorry, you cannot combine coupon codes with your VIP discount right now. Removing coupon code.')) { window.location.reload(); }
                }
                if (vip) {
                    if (!alert('You already have VIP status, please remove the VIP product from your cart, then return to checkout.')) { window.location.href = '/cart.php'; }
                }
            });
    }

    function checkVipStatusUnsubbedCheckout() {
        getCart('/api/storefront/carts?include=lineItems.digitalItems.options,lineItems.physicalItems.options')
            .then((dataTwo) => {
                const theData = dataTwo;
                let vip = false;
                let vipCoupon = false;
                let otherItems = false;
                let existingCoupon;
                const otherItemsArray = [];
                if (theData[0].lineItems.digitalItems[0] !== undefined) { theData[0].lineItems.digitalItems[0].sku === "SISUVIP" ? vip = true : vip = false; }
                theData[0].lineItems.physicalItems.length > 0 ? otherItems = true : otherItems = false;
                if (theData[0].coupons[0] !== undefined) { theData[0].coupons[0].code === "SISUVIP20" ? vipCoupon = true : vipCoupon = false; }
                if (theData[0].coupons[0] !== undefined) { existingCoupon = theData[0].coupons[0].code; }
                mainCartId = theData[0].id;
                // console.log("vip item" + vip);
                // console.log("vip coupon" + vipCoupon);
                // console.log("other items" + otherItems);
                // console.log("copupon" + coupon)
                if (!vip && vipCoupon) {
                    deleteCoupon('/api/storefront/checkouts/', mainCartId, 'SISUVIP20')
                        .catch(error => console.log(error));
                    console.log('couponDeleted');
                    if (!alert('Cannot use SISUVIP20 without membership in cart. Removing coupon.')) { window.location.reload(); }
                }
                if (vip && !vipCoupon) {
                    if (otherItems) {
                        const data = JSON.stringify({
                            couponCode: 'SISUVIP20',
                        });

                        const xhr = new XMLHttpRequest();
                        xhr.withCredentials = true;

                        xhr.addEventListener('readystatechange', () => {
                            if (this.readyState === this.DONE) {
                                console.log(this.responseText);
                            }
                        });
                        const postStringOne = 'https://www.sisuguard.com/api/storefront/checkouts/';
                        const postStringTwo = '/coupons';

                        xhr.open('POST', postStringOne + mainCartId + postStringTwo);
                        xhr.setRequestHeader('content-type', 'application/json');

                        xhr.send(data);
                        if (!alert('Applying 20% member discount. Please continue.')) { window.location.reload(); }
                    }
                }
                if (!vip && !vipCoupon) {
                    // console.log('running');
                    theData[0].lineItems.physicalItems.forEach((e) => { otherItemsArray.push(e.productId); });
                    // window.location.href = '/checkout';
                    // if (otherItemsArray.indexOf(233) > -1) {
                    //     $('.redeemable-entry').hide();
                    //     $('.redeemable-label').hide();
                    //     if (existingCoupon !== undefined) {
                    //         deleteCoupon('/api/storefront/checkouts/', mainCartId, existingCoupon)
                    //             .catch(error => console.log(error));
                    //         // console.log("couponDeleted");
                    //         if (!alert('Cannot combine coupon with Case Bundle sale... Removing coupon.')) { window.location.reload(); }
                    //     }
                    // }
                }
            });
    }

    // function removeShippingMethods() {
    //     const spans = document.getElementsByTagName('span');
    //     const searchOne = 'Free Shipping';
    //     const searchTwo = 'USPS (Priority Mail)';
    //     const searchThree = 'USPS (Priority Mail Express)';
    //     let foundUsps;
    //     let foundPriority;
    //     let foundExpress;
    //     // console.log('running');
    //     for (let i = 0; i < spans.length; i++) {
    //         if (spans[i].textContent === searchOne) {
    //             foundUsps = spans[i];
    //             foundUsps.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.style.display = 'none';
    //             // console.log(foundUsps);
    //         }
    //         if (spans[i].textContent === searchTwo) {
    //             foundPriority = spans[i];
    //             foundPriority.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.style.display = 'none';
    //             // console.log(foundPriority);
    //         }
    //         if (spans[i].textContent === searchThree) {
    //             foundExpress = spans[i];
    //             foundExpress.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.style.display = 'none';
    //             // console.log(foundPriority);
    //         }
    //         if ((foundUsps !== undefined) && (foundPriority !== undefined) && (foundExpress !== undefined)) {
    //             // console.log('done');
    //             break;
    //         }
    //     }
    // }

    if (window.location.href.indexOf('/checkout') > -1) {
        waitForElementToDisplay('#checkout-customer-continue', () => {
            let groupId = document.getElementById('loginGroup').textContent;
            if (groupId.length < 1) {
                groupId = 'notLoggedIn';
            }
            if (groupId !== 'SISU-Plus-Subscribed') {
                checkVipStatusUnsubbedCheckout();
            }
        });
        waitForElementToDisplay('#continue-with-rebillia', () => {
            let groupId = document.getElementById('loginGroup').textContent;
            if (groupId.length < 1) {
                groupId = 'notLoggedIn';
            }
            if (groupId === 'SISU-Plus-Subscribed') {
                checkVipStatusSubbedCheckout();
            } else if (groupId.includes('Wholesale')) {
                $('.redeemable-entry').hide();
                $('.redeemable-label').hide();
                checkWholesaleCouponsCheckout(groupId);
            } else {
                checkVipStatusUnsubbedCheckout();
            }
        });
        waitForElementToDisplay('#checkout-shipping-options', () => {
            const groupId = document.getElementById('loginGroup').textContent;
            if (groupId.length > 0) {
                if (groupId.includes('Wholesale')) {
                    $('.redeemable-entry').hide();
                    $('.redeemable-label').hide();
                    checkWholesaleCouponsCheckout(groupId);
                    // removeShippingMethods();
                }
            }
        });
    }
}
