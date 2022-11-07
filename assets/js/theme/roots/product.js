import $ from 'jquery';

export default function loaded() {
    if ($('#tab-specifications').text().trim() !== '') {
        $('.tab-heading--specs').show();
    }

    // bulk pricing
    function formatBulkTable() {
        $('.productView-info-bulkPricing li').each(function formatRule() {
            const priceRules = $(this).text().trim().replace(/\r?\n|\r/g, '').split(/(.*)(and get | and pay only)/gi);
            const formattedRule = `<strong>${priceRules[1]}</strong>${priceRules[2]}<strong><span>${priceRules[3]}</span></strong>`;
            $(this).html(formattedRule);
        });
    }
    
    formatBulkTable();
    
    $( document ).ajaxComplete(() => {
        formatBulkTable();
    });

    $('#form-action-addToCart').on('click', () => {
        const formTop = $('.productView-options form').offset().top;
        const headerHeight = $('.header').height();
        $(window).scrollTop(formTop - headerHeight);
    });
}
