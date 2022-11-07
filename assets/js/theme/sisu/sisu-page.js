import PageManager from '../page-manager';
import fullpage from 'fullpage.js';
import _ from 'lodash';


export default class WebPage extends PageManager {
    onReady() {
        if ($('.page-template-fullpage-scroll').length) {
            this.handleFullpageScrollTemplate();
        }
    }

    handleFullpageScrollTemplate() {
        $('body').addClass('body-fullpage-scroll-template');
        fullpage('#fullpage', {
            licenseKey: '3361F237-D8B64AB6-BE95B293-BA527588',
            fitToSection: true,
            fitToSectionDelay: 100,
            navigation: true,
            responsiveWidth: 801,
            parallax: true,
            afterRender: () => {
                $('.fullpage-section.active').find('.wipe').addClass('in');
                $('.fullpage-section.active').find('.start-state').removeClass('start-state').addClass('end-state');
            },
            onLeave: (origin, destination) => {
                // const $fromSection = $(origin.item);
                const $toSection = $(destination.item);
                // $fromSection.find('.wipe').removeClass('in');
                $toSection.find('.wipe').addClass('in');
                // $fromSection.find('.end-state').removeClass('end-state').addClass('start-state');
                $toSection.find('.start-state').removeClass('start-state').addClass('end-state');
            },
            sectionSelector: '.fullpage-section',
        });

        const fullpageResize = _.debounce(() => {
            window.fullpage_api.reBuild();
        }, 500);
        $(window).resize(() => {
            if ($(window).width() > 800) {
                fullpageResize();
            }
        });
    }
}
