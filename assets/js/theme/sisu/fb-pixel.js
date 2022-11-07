!function (f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments) }; if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = []; t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s) }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js'); // eslint-disable-line

import PageManager from '../../theme/page-manager';

export default class FbPixel extends PageManager {
    onReady() {
        // console.log( 'FbPixel onReady' );
        window.fbq('init', '691187864249921');
        // $( window ).load( () => this.onWindowLoad() );

        this.trackPageView();
        this.trackViewContent();
        this.trackAddToCart();
        this.trackCompleteRegistration();
        this.trackLead();
        this.trackAddToWishlist();
        this.trackSearch();
        this.trackInitiateCheckout();
        this.trackPurchase();
        this.trackSalesLead();
    }

    // onWindowLoad() {
    //     console.log( 'onWindowLoad' );
    // }

    trackPageView() {
        window.fbq('track', 'PageView');
    }

    trackViewContent() {
        // console.log( 'context', this.context );
        if (this.isProductPage()) {
            window.fbq('track', 'ViewContent', {
                content_ids: [this.context.product.id],
                content_type: 'product_group',
                content_name: this.context.product.title,
                value: String(this.context.product.price.without_tax ? this.context.product.price.without_tax.value : this.context.product.price.with_tax.value),
                currency: 'USD',
            });
        }
        // eslint-disable-next-line brace-style
        else if (this.isWebPage()) {
            window.fbq('track', 'ViewContent', {
                content_name: this.context.pageTitle,
            });
        }
        // else if ( this.isCartPage() ) {
        //   window.fbq( 'track', 'ViewContent', {
        //     'content_name': 'Shopping Cart'
        //   });
        // }
        // else if ( this.isMyAccountPage() ) {
        //   window.fbq( 'track', 'ViewContent', {
        //     'content_name': 'My Account'
        //   });
        // }
    }

    trackAddToCart() {
        $('body').on('submit', '[data-cart-item-add]', (event) => {
            // this.emit('cart-item-add', event, event.target);
            window.fbq('track', 'AddToCart', {
                content_ids: [$(event.target).find('[name="product_id"]').val()],
                content_type: 'product_group',
            });
        });
    }

    trackCompleteRegistration() {
        if (this.isRegisteredAccountPage()) {
            window.fbq('track', 'CompleteRegistration', {
                value: 0.00,
                currency: 'USD',
            });
        }
    }

    trackLead() {
        if (this.isNewsletterSubscribePage()) {
            window.fbq('track', 'Lead', {});
        }
    }

    trackSalesLead() {
        if (window.location.pathname.indexOf('/become-a-retailer') !== -1) {
            $('form').on('submit', () => {
                window.fbq('trackCustom', 'Become A Retailer', {});
            });
        }
    }

    trackAddToWishlist() {
        if (this.context.pageType === 'wishlist') {
            const urlParams = decodeURIComponent(window.location.search);
            const matches = /added_product_id=(\d+)/.exec(urlParams);
            if ((window.location.pathname.indexOf('/wishlist.php') !== -1) && (matches !== null)) {
                window.fbq('track', 'AddToWishlist', { content_ids: [matches[1]], content_type: 'product_group' });
            }
        }
    }

    trackSearch() {
        if (this.isSearchPage()) {
            const urlParams = decodeURIComponent(window.location.search);
            const matches = /search_query=([^&]*)/.exec(urlParams);
            if (matches !== null) {
                const productIdsOnPage = [];
                $('.card').each(() => {
                    productIdsOnPage.push($(this).attr('data-product-id'));
                });
                if (productIdsOnPage.length > 0) {
                    window.fbq('track', 'Search', {
                        content_ids: productIdsOnPage,
                        content_type: 'product_group',
                        search_string: matches[1],
                    });
                } else {
                    window.fbq('track', 'Search', {
                        search_string: matches[1],
                    });
                }
            }
        }
    }

    trackInitiateCheckout() {
        if (this.isCheckoutPage()) {
            window.fbq('track', 'InitiateCheckout');
        }
    }


    trackPurchase() {
        if (!this.isCheckoutCompletePage()) return;

        // Get Order Number
        const orderNumber = $('.orderConfirmation-section p[data-test="order-confirmation-order-number-text"] strong').text();
        if (!orderNumber) {
            return setTimeout(() => { this.trackPurchase(); }, 100);
        }

        // Get order Data
        $.ajax({
            type: 'GET',
            async: true,
            // url: 'https://www.sisuguard.com/account.php?action=view_order&order_id=' + orderNumber
            // url: 'https://www.sisuguard.com/api/storefront/orders/' + orderNumber + '?include=payments%2ClineItems.physicalItems.socialMedia%2ClineItems.physicalItems.options%2ClineItems.digitalItems.socialMedia%2ClineItems.digitalItems.options'
            // url: '/api/storefront/orders/' + orderNumber + '?include=payments%2ClineItems.physicalItems.socialMedia%2ClineItems.physicalItems.options%2ClineItems.digitalItems.socialMedia%2ClineItems.digitalItems.options',
            url: `/api/storefront/orders/${orderNumber}?include=payments%2ClineItems.physicalItems.socialMedia%2ClineItems.physicalItems.options%2ClineItems.digitalItems.socialMedia%2ClineItems.digitalItems.options`,
        })
            // `${ANR}`
            .done((data) => {
                if (data) {
                    // Get order items
                    const productIDs = [];

                    // Physical Items
                    // data.lineItems.giftCertificates,  data.lineItems.digitalItems
                    if (data.lineItems && data.lineItems.physicalItems) {
                        $.each(data.lineItems.physicalItems, (index, item) => {
                            productIDs.push(item.productId);
                        });
                    }

                    // Order amount
                    const orderAmount = data.baseAmount;

                    // Currency
                    const currencyCode = data.currency && data.currency.code ? data.currency.code : '';

                    // Track if we have all data
                    if (orderAmount && productIDs.length && currencyCode) {
                        // Track Payment Info event
                        window.fbq('track', 'AddPaymentInfo', {
                            content_ids: productIDs,
                            content_type: 'product_group',
                        });

                        // Track Purchase event
                        window.fbq('track', 'Purchase', {
                            content_ids: productIDs,
                            content_type: 'product_group',
                            value: orderAmount,
                            currency: currencyCode,
                        });
                    }
                }
            })
            .fail((...args) => {
                console.log('onOrderDetailsLoadFail', args); // eslint-disable no-console
            });
    }

    isHomePage() {
        // console.log('HOME!');
        // console.log(this.context.pageType);
        return this.context.pageType === 'default';
    }

    isCartPage() {
        // console.log('CART!');
        // console.log(this.context.pageType);
        return this.context.pageType === 'cart';
    }

    isSearchPage() {
        // console.log('SEARCH!');
        // console.log(this.context.pageType);
        return this.context.pageType === 'search';
    }

    isCheckoutPage() {
        // console.log('CHECKOUT!');
        // console.log(this.context.pageType);
        return this.context.pageType === 'checkout';
    }

    isCheckoutCompletePage() {
        // console.log('CHECKOUT COMPLETE!');
        // console.log(this.context.pageType);
        return this.context.pageType === 'orderconfirmation';
    }

    isProductPage() {
        // console.log('PRODUCT!');
        // console.log(this.context.pageType);
        return this.context.pageType === 'product';
    }

    isWebPage() {
        // console.log('JUST A PAGE!');
        // console.log(this.context.pageType);
        return this.context.pageType === 'page';
    }

    isRegisteredAccountPage() {
        // console.log('CREATE ACCOUNT PAGE!');
        // console.log(this.context.pageType);
        return this.context.pageType === 'createaccount_thanks';
    }

    isNewsletterSubscribePage() {
        // console.log('NEWS SUB PAGE!');
        // console.log(this.context.page_type);
        return this.context.pageType === 'newsletter_subscribe';
    }

    isMyAccountPage() {
        // console.log('MY ACCOUNT!');
        // console.log(this.context.pageType);
        // https://developer.bigcommerce.com/stencil-docs/stencil-object-model-reference/stencil-objects/global-objects/page-type-property
        const myAccountPages = ['createaccount', 'account_orderstatus', 'account_inbox', 'account_addressbook', 'shippingaddressform', 'account_paymentmethods', 'wishlists', 'account_recentitems', 'editaccount', 'account_saved_return', 'add-wishlist', 'getnewpassword', 'account_downloaditem', 'account_order', 'account_returns', 'wishlist', 'account_orders'];
        return myAccountPages.indexOf(this.context.pageType) !== -1;
    }
}
