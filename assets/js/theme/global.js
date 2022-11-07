import 'focus-within-polyfill';

import './global/jquery-migrate';
import './common/select-option-plugin';
import PageManager from './page-manager';
import quickSearch from './global/quick-search';
import currencySelector from './global/currency-selector';
import mobileMenuToggle from './global/mobile-menu-toggle';
import menu from './global/menu';
import foundation from './global/foundation';
import quickView from './global/quick-view';
import cartPreview from './global/cart-preview';
import privacyCookieNotification from './global/cookieNotification';
import adminBar from './global/adminBar';
import carousel from './common/carousel';
import loadingProgressBar from './global/loading-progress-bar';
import svgInjector from './global/svg-injector';
import rootsLoaded from './roots/global';
import sisuGlobal from './sisu/sisu-global';
import React from 'react';
import ReactDOM from 'react-dom';
import BulkOrderForm from './sisu/bulk-order-form/bulk-order-form.jsx';
import BulkOrderSignIn from './sisu/bulk-order-form/bulk-order-sign-in.jsx';
import ApparelDeal from './sisu/sisu-apparel-deal/apparel-deal.jsx';
import SuperDeal from './sisu/season-saver-bundle/super-deal.jsx';

export default class Global extends PageManager {
    onReady() {
        const {
            channelId, cartId, productId, categoryId, secureBaseUrl, maintenanceModeSettings, adminBarLanguage, showAdminBar,
        } = this.context;
        cartPreview(secureBaseUrl, cartId);
        quickSearch();
        currencySelector(cartId);
        foundation($(document));
        quickView(this.context);
        carousel();
        menu();
        mobileMenuToggle();
        privacyCookieNotification();
        if (showAdminBar) {
            adminBar(secureBaseUrl, channelId, maintenanceModeSettings, JSON.parse(adminBarLanguage), productId, categoryId);
        }
        loadingProgressBar();
        svgInjector();
        rootsLoaded();
        sisuGlobal();
    }
}

window.initBulkOrderForm = function initBulkOrderForm(productOneData) {
    const acc = document.getElementsByClassName("accordion");
    let i;
    ReactDOM.render(
        React.createElement(BulkOrderForm, productOneData, null),
        document.getElementById('bulk-order-form'),
    );

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    }
};

window.initBulkOrderSignIn = function initBulkOrderSignIn() {
    ReactDOM.render(
        React.createElement(BulkOrderSignIn, null, null),
        document.getElementById('bulk-order-form'),
    );
};

window.initApparelDeal = function initApparelDeal(productOneData) {
    ReactDOM.render(
        React.createElement(ApparelDeal, productOneData, null),
        document.getElementById('apparel-deal'),
    );
};

window.initSuperDeal = function initSuperDeal(productOneData) {
    ReactDOM.render(
        React.createElement(SuperDeal, productOneData, null),
        document.getElementById('season-saver'),
    );
};

