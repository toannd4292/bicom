import PageManager from '../page-manager';
import 'bootstrap';

export default class Home extends PageManager {
    onReady() {
        this.homeBrandSlider();
        this.homePopover();
        this.homeBackgroundShifter();
    }
    homeBrandSlider() {
        const owl = $('.owl-carousel');
        owl.owlCarousel({
            items: 3,
            loop: true,
            margin: 10,
            autoplay: true,
            autoplayTimeout: 4000,
            autoplayHoverPause: true,
            lazyLoad: true,
            nav: false,
            smartSpeed: 1500,
            responsive: {
                0: {
                    items: 2,
                },
                874: {
                    items: 3,
                },
            },
        });
    }
    homePopover() {
        $('[data-toggle="tooltip"]').tooltip({
            container: 'body',
        });
    }

    homeBackgroundShifter() {
        const lFollowX = [0, 0, 0];
        const lFollowY = [0, 0, 0];
        let x = 0;
        let y = 0;
        let x1 = 0;
        let y1 = 0;
        let x2 = 0;
        let y2 = 0;
        const px1 = 'px ';
        // const px2 = 'px';
        const friction = 1 / 100;

        const moveBackground = () => {
            x += (parseInt(lFollowX[0], 10) - x) * friction;
            y += (parseInt(lFollowY[0], 10) - y) * friction;
            x1 += (parseInt(lFollowX[1], 10) - x1) * friction;
            y1 += (parseInt(lFollowY[1], 10) - y1) * friction;
            x2 += (parseInt(lFollowX[2], 10) - x2) * friction;
            y2 += (parseInt(lFollowY[2], 10) - y2) * friction;

            const translate = x + px1;
            const translate1 = x1 + px1;
            const translate2 = x2 + px1;

            $('#homepage-product-1').css({
                'background-position': translate,
            });
            $('#homepage-product-2').css({
                'background-position': translate1,
            });
            $('#homepage-product-3').css({
                'background-position': translate2,
            });

            window.requestAnimationFrame(moveBackground);
        };

        $('#homepage-product-1').mousemove((e) => {
            const lMouseX = Math.max(-100, Math.min(100, $(window).width() / 2 - e.clientX));
            const lMouseY = Math.max(-100, Math.min(100, $(window).height() / 2 - e.clientY));
            lFollowX[0] = (20 * lMouseX) / 100; // 100 : 12 = lMouxeX : lFollow
            lFollowY[0] = (10 * lMouseY) / 100;
        });

        $('#homepage-product-2').mousemove((e) => {
            const lMouseX = Math.max(-100, Math.min(100, $(window).width() / 2 - e.clientX));
            const lMouseY = Math.max(-100, Math.min(100, $(window).height() / 2 - e.clientY));
            lFollowX[1] = (20 * lMouseX) / 100; // 100 : 12 = lMouxeX : lFollow
            lFollowY[1] = (10 * lMouseY) / 100;
        });

        $('#homepage-product-3').mousemove((e) => {
            const lMouseX = Math.max(-100, Math.min(100, $(window).width() / 2 - e.clientX));
            const lMouseY = Math.max(-100, Math.min(100, $(window).height() / 2 - e.clientY));
            lFollowX[2] = (20 * lMouseX) / 100; // 100 : 12 = lMouxeX : lFollow
            lFollowY[2] = (10 * lMouseY) / 100;
        });

        moveBackground();
    }
}
