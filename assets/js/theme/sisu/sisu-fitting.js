export default function sisuFitting() {
    const url = new URL(window.location.href);
    const searchParams = url.searchParams;
    const fittingParam = searchParams.get('fitting');
    let fittingLink = $('#fittingLink').attr('href');
    let fittingLink2 = $('#fittingLink2').attr('href');
    const fittingLink3 = $('#fittingLink3').attr('href');
    let paramString = null;
    if (fittingParam) {
        switch (fittingParam) {
        case 'aero':
            paramString = '?fitting=aero';
            $('#fittingLink').attr('href', fittingLink + paramString);
            $('#fittingLink2').attr('href', fittingLink2 + paramString);
            $('#fittingLink3').attr('href', fittingLink3 + paramString);
            $('.fitting-select-product').removeClass('active');
            $('#fitting-prod-1').addClass('active');
            break;
        case 'max':
            paramString = '?fitting=max';
            $('#fittingLink').attr('href', fittingLink + paramString);
            $('#fittingLink2').attr('href', fittingLink2 + paramString);
            $('#fittingLink3').attr('href', fittingLink3 + paramString);
            $('.fitting-select-product').removeClass('active');
            $('#fitting-prod-2').addClass('active');
            break;
        case 'go':
            paramString = '?fitting=go';
            $('#fittingLink').attr('href', fittingLink + paramString);
            $('#fittingLink2').attr('href', fittingLink2 + paramString);
            $('#fittingLink3').attr('href', fittingLink3 + paramString);
            $('.fitting-select-product').removeClass('active');
            $('#fitting-prod-3').addClass('active');
            break;
        case '3d':
            paramString = '?fitting=3d';
            $('[href="/fitting/classic/"]').attr('href', '/fitting/3d/');
            $('[href="/fitting/classic/braces/"]').attr('href', '/fitting/3d/braces/');
            fittingLink = $('#fittingLink').attr('href');
            fittingLink2 = $('#fittingLink2').attr('href');
            $('#fittingLink').attr('href', fittingLink + paramString);
            $('#fittingLink2').attr('href', fittingLink2 + paramString);
            $('#fittingLink3').attr('href', fittingLink3 + paramString);
            $('.fitting-select-product').removeClass('active');
            $('#fitting-prod-4').addClass('active');
            break;
        case 'sense':
            paramString = '?fitting=sense';
            $('#fittingLink').attr('href', fittingLink + paramString);
            $('#fittingLink2').attr('href', fittingLink2 + paramString);
            $('#fittingLink3').attr('href', fittingLink3 + paramString);
            $('.fitting-select-product').removeClass('active');
            $('#fitting-prod-5').addClass('active');
            break;
        case 'junior':
            paramString = '?fitting=junior';
            $('#fittingLink').attr('href', fittingLink + paramString);
            $('#fittingLink2').attr('href', fittingLink2 + paramString);
            $('#fittingLink3').attr('href', fittingLink3 + paramString);
            $('.fitting-select-product').removeClass('active');
            $('#fitting-prod-6').addClass('active');
            break;
        default:
            $('.fitting-select-product').removeClass('active');
            $('#fitting-prod-1').addClass('active');
            break;
        }
    } else if (window.location.href.indexOf('/fitting/3d') >= 0) {
        $('.fitting-select-product').removeClass('active');
        $('#fitting-prod-4').addClass('active');
    } else {
        $('.fitting-select-product').removeClass('active');
        $('#fitting-prod-1').addClass('active');
    }
}
