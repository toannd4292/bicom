export default function quickPopUp() {
    function adjustPrpopupHeight() {
        $('.prpopup-inner').css('max-height', $('.prpopup-container').height());
    }

    function closePopup() {
        $('.prpopup, .prpopup-container').fadeOut(400, () => {
            $('.prpopup').remove();
        });
    }

    $('.member-details').on('click', function onMemberDetailsClick(e) {
        e.preventDefault();
        console.log('click');
        const contentSelector = $(this).attr('href');

        $('.prpopup').remove();

        $('<div>', { class: 'prpopup' }).append($('<div>', { class: 'prpopup-container' })
            .append($('<div>', { class: 'prpopup-content' })
                .append($('<div>', { class: 'prpopup-inner' }).html($(contentSelector).outerHTML())))
            .append($('<div>', { class: 'prpopup-close' })))
            .appendTo($('body'));

        $('.prpopup').on('click', '.prpopup-inner', () => {
            e.stopPropagation();
        });

        $('.prpopup, .prpopup-close').on('click', () => {
            e.stopPropagation();
            closePopup();
        });


        adjustPrpopupHeight();
    });

    $(window).resize(adjustPrpopupHeight);

    if (!$.fn.outerHTML) {
        $.fn.outerHTML = function (s) { return s ? this.before(s).remove() : $('<p>').append(this.eq(0).clone()).html(); }
    }
}
