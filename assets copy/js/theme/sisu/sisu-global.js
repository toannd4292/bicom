// import './sisu-chatNow';
import './sisu-page';
import 'jquery';
import 'owl.carousel';
import './sisu-quiz/sisu-quiz';
import sisuFitting from './sisu-fitting';
import select2quiz from './sisu-quiz/select2quiz';
import h2TagHighlighter from './sisu-quiz/h2TagHighlighter';
import headerHighlighter from './sisu-quiz/headerHighlighter';
import quickPopUp from './sisu-quickPopUp';
import sisuVip from './sisu-vip';
import sisuDeals from './sisu-dealApp';
import handleVendorCheck from './sisu-vendorCheck';

export default function sisuLoaded() {
    function scrollTrigger() {
        window.addEventListener('load', () => {
            const top = window.pageYOffset + window.innerHeight;
            const elementNodeList = document.querySelectorAll('.animateMe');
            const element = Array.prototype.slice.call(elementNodeList);
            element.forEach(i => {
                const isVisible = top > (i.offsetTop);
                if (isVisible) {
                    i.classList.add('slideItUp');
                    setTimeout(() => { i.classList.add('loaded'); }, 3000);
                }
            });
        });
        document.addEventListener('scroll', () => {
            const top = window.pageYOffset + window.innerHeight;
            const elementNodeList = document.querySelectorAll('.animateMe');
            const element = Array.prototype.slice.call(elementNodeList);
            element.forEach(i => {
                const isVisible = top > (i.offsetTop);
                if (isVisible) {
                    i.classList.add('slideItUp');
                    setTimeout(() => { i.classList.add('loaded'); }, 3000);
                }
            });
        });
    }

    if ($(document).width() < 993) {
        $('.priceDiv').each((e, el) => {
            $(el).replaceWith($('<br />'));
            // console.log($(document).width());
        });
    }

    const headerWhiteHover = () => {
        $('.navPages-item').hover(() => {
            $('.header-logo--wrap').css('background', 'white');
        }, () => {
            $('.header-logo--wrap').css('background', 'rgba(255, 255, 255, 0.75)');
        });
    };

    const bannerSlider = () => {
        const owl = $('.owl-carousel.owl-banner');
        owl.owlCarousel({
            items: 1,
            loop: true,
            margin: 10,
            autoplay: true,
            autoplayTimeout: 6000,
            autoplayHoverPause: true,
            lazyLoad: true,
            nav: false,
            smartSpeed: 1500,
        });
    };

    const fittingSidebarWidth = () => {
        if (document.querySelectorAll('.fittingSidenav').length > 0) {
            const sideNavHeight = $('.fittingSidenav').outerHeight();
            $('.fitting-instructions').css('margin-top', -sideNavHeight);
            $('.sidenavTab.active').click((e) => {
                e.preventDefault();
            });
        }
    };

    const aeroSizeSelector = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const size = urlParams.get('size');
        const bodyClass = $('body').attr('class');
        if (bodyClass === undefined) { return; }
        if (bodyClass.indexOf('prod-191') >= 0) {
            switch (size) {
            case 'small':
                setTimeout(() => {
                    $('#attribute_rectangle__289_380').click();
                }, 1000);
                break;
            case 'medium':
                setTimeout(() => {
                    $('#attribute_rectangle__289_381').click();
                }, 1000);
                break;
            case 'large':
                setTimeout(() => {
                    $('#attribute_rectangle__289_382').click();
                }, 1000);
                break;
            default:
            }
        }
    };

    const handleFAQs = () => {
        const $faqs = $('#faqs');
        if (!$faqs.length) return;
        $faqs.on('click', '.question', (e) => {
            e.preventDefault();
            $(e.currentTarget).next('.answer').slideToggle();
        });
    };

    const senseReplace = () => {
        if (document.querySelector('#productView-options-209')) {
            document.querySelector('#productView-options-209 > form > div.productView-options-wrap > div > div:nth-child(3) > label').innerHTML = 'Do you understand and agree with <a class="member-details" href="#moreinfo">this statement</a>?<div style="display:none;"><p id="moreinfo">CAUTION: The SISU Sense™ Mouthguard is not a medical or diagnostic device. The SISU Sense™ Mouthguard detects impacts and does not replace concussion detection protocols. The SISU Sense™ Hit Sense™ Technology does not diagnose concussion. The data should be used to identify if an impact has occurred and the level of impact. The SISU Sense™ accurately detects low (15 Gs) and high (40 Gs) thresholds of impact when it is securely worn on the teeth. It is possible that false positive readings will trigger an alert. For this reason, we recommend that athletes be observed in addition to relying on the data from the SISU Sense™ Mouthguard carefully. The SISU Sense™ IOS app only works in the US and in Canada.</p></div>';
            document.querySelector('#productView-options-209 > form > div.productView-options-wrap > div > div:nth-child(2) > label').innerHTML = 'iPhone<br/>(sign up for android release notification <a href="/sisu-sense-android-notification/">here</a>)';
        }
    };

    const whiteWarning = () => {
        $('.form-radio').click(() => {
            if (($('#attribute_swatch_350_367').is(':checked')) || ($('#attribute_swatch_290_367').is(':checked')) || ($('#attribute_rectangle__288_230').is(':checked')) || ($('#attribute_swatch_298_367').is(':checked')) || ($('#attribute_swatch_299_367').is(':checked')) || ($('#attribute_swatch_295_367').is(':checked')) || ($('#attribute_swatch_297_367').is(':checked')) || ($('#attribute_swatch_341_367').is(':checked'))) {
                $('[data-product-attribute="swatch"]').addClass('with-after-element');
            } else {
                $('[data-product-attribute="swatch"]').removeClass('with-after-element');
            }
        });
    };

    const bracesWarning = () => {
        $('.form-radio').click(() => {
            if ($('#attribute_rectangle__289_380').is(':checked')) {
                $('[data-product-attribute="set-rectangle"]').addClass('with-after-element');
            } else {
                $('[data-product-attribute="set-rectangle"]').removeClass('with-after-element');
            }
        });
    };

    // const becomeRetailer = () => {
    //     const $theForm = $('#hsForm_70cc1594-af37-4019-ade6-35873c56b790');
    //     if (!$theForm.length) return;
    //     $theForm.onsubmit = () => { ga('send', 'event', 'become-a-retailer', 'Submitted-Form'); };
    // };

    sisuFitting();
    bracesWarning();
    whiteWarning();
    senseReplace();
    handleFAQs();
    select2quiz();
    aeroSizeSelector();
    fittingSidebarWidth();
    h2TagHighlighter();
    headerHighlighter();
    scrollTrigger();
    headerWhiteHover();
    bannerSlider();
    quickPopUp();
    sisuVip();
    sisuDeals();
    handleVendorCheck();
    // becomeRetailer();
}
