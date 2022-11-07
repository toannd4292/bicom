export default function dealApp() {
    var $app = $('#cardArea');
    if (!$app.length) return;
    console.log("dealapp running")
    var contentful = require('contentful');
    var client = contentful.createClient({
        space: "dxepiv1crktu",
        accessToken: "5UKZvSSCmOsFbODkeuTIiDWsdk4Z5D-57o_WhTkIfl0"
    });
    $(function () {
        $('[data-toggle="popover"]').popover()
    });
    var card = []
        , cardContainer = []
        , image = []
        , specialOffer = []
        , title = []
        , description = []
        , detailContainer = []
        , termsContainer = []
        , terms = []
        , date = []
        , modalOuter = []
        , modalDialog = []
        , modalContent = []
        , modalHeader = []
        , closeButton = []
        , closeButtonSpan = []
        , modalTitle = []
        , modalBody = []
        , modalText = []
        , modalFooter = []
        , dismissButton = []
        , specialOfferContent = []
        , button = []
        , now = new Date
        , app = document.getElementById("cardArea")
        , modalsContainer = document.getElementById("dealCard__modalsContainer")
        , specialOfferPresets = ["3kzjIdr5rSC7u0w5LyC09r", "1NnxEbhFWuiMR6sfg5VHOy", "2Gt5p4pX2rfSgUXkwRrLf7"]
        , noDealMessage = document.createElement("div")
        , noDealMessageText = "There are no active deals.";
    const options = {
        year: "numeric",
        month: "short",
        day: "numeric"
    };
    client.getEntries({
        content_type: "dealsList"
    }).then(function (e) {
        void 0 === e.items[0].fields.listOrder || void 0 === e.items[0].fields.listOrder[0].fields ? (noDealMessage.className = "dealPage__noDealsMessage",
            noDealMessage.textContent = noDealMessageText,
            app.appendChild(noDealMessage)) : e.items[0].fields.listOrder.forEach(function (e, t) {
                if (void 0 !== e.fields && e.fields.dealTitle) {
                    if (e.fields.startDateAndTime)
                        if (new Date(e.fields.startDateAndTime).getTime() > now.getTime())
                            return;
                    if (e.fields.endDateAndTime)
                        if ((n = new Date(e.fields.endDateAndTime)).getTime() < now.getTime())
                            return;
                    if (card[t] = document.createElement("div"),
                        card[t].className = "dealCard__card",
                        card[t].id = "dealCard" + t,
                        cardContainer[t] = document.createElement("div"),
                        cardContainer[t].className = "dealCard__container",
                        image[t] = document.createElement("div"),
                        image[t].className = "dealCard__image",
                        image[t].id = "dealImage" + t,
                        e.fields.image && (image[t].style.backgroundImage = "url(" + e.fields.image.fields.file.url + ")"),
                        cardContainer[t].appendChild(image[t]),
                        specialOffer[t] = document.createElement("div"),
                        e.fields.specialOffer ? (specialOfferContent = e.fields.specialOffer.sys.id,
                            0 === specialOfferPresets.indexOf(specialOfferContent) ? (specialOffer[t].className = "dealCard__offer exclusiveOffer",
                                specialOffer[t].textContent = "Exclusive Offer") : 1 === specialOfferPresets.indexOf(specialOfferContent) ? (specialOffer[t].className = "dealCard__offer trendingOffer",
                                    specialOffer[t].textContent = "Trending") : 2 === specialOfferPresets.indexOf(specialOfferContent) && (specialOffer[t].className = "dealCard__offer featuredOffer",
                                        specialOffer[t].textContent = "Featured")) : specialOffer[t].className = "dealCard__offer noOffer",
                        cardContainer[t].appendChild(specialOffer[t]),
                        title[t] = document.createElement("h2"),
                        title[t].className = "dealCard__title",
                        title[t].textContent = e.fields.dealTitle,
                        cardContainer[t].appendChild(title[t]),
                        description[t] = document.createElement("p"),
                        description[t].className = "dealCard__description",
                        description[t].textContent = e.fields.description,
                        cardContainer[t].appendChild(description[t]),
                        detailContainer[t] = document.createElement("div"),
                        detailContainer[t].className = "dealCard__detailContainer",
                        terms[t] = document.createElement("p"),
                        terms[t].className = "dealCard__terms",
                        termsContainer[t] = document.createElement("a"),
                        e.fields.termsAndConditions) {
                        var a = document.createElementNS("http://www.w3.org/2000/svg", "svg")
                            , d = document.createElementNS("http://www.w3.org/2000/svg", "path");
                        a.setAttribute("width", "1em"),
                            a.setAttribute("height", "1em"),
                            a.setAttribute("viewBox", "0 0 16 16"),
                            a.setAttribute("class", "bi bi-text-right"),
                            a.setAttribute("fill", "currentColor"),
                            a.setAttribute("class", "dealCard__termsSvg"),
                            d.setAttribute("fill-rule", "evenodd"),
                            d.setAttribute("d", "M6 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm4-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"),
                            a.appendChild(d),
                            termsContainer[t].appendChild(a),
                            termsContainer[t].setAttribute("data-content", e.fields.termsAndConditions),
                            termsContainer[t].setAttribute("data-toggle", "modal"),
                            termsContainer[t].setAttribute("data-target", "#modal" + t),
                            termsContainer[t].className = "dealCard_termsContainer",
                            termsContainer[t].href = "javascript:void(0)",
                            modalOuter[t] = document.createElement("div"),
                            modalOuter[t].id = "modal" + t,
                            modalOuter[t].className = "modal fade",
                            modalOuter[t].setAttribute("tabindex", "-1"),
                            modalOuter[t].setAttribute("aria-hidden", "true"),
                            modalDialog[t] = document.createElement("div"),
                            modalDialog[t].className = "modal-dialog modal-dialog-centered",
                            modalOuter[t].appendChild(modalDialog[t]),
                            modalContent[t] = document.createElement("div"),
                            modalContent[t].className = "modal-content",
                            modalDialog[t].appendChild(modalContent[t]),
                            modalHeader[t] = document.createElement("div"),
                            modalHeader[t].className = "modal-header",
                            modalContent[t].appendChild(modalHeader[t]),
                            modalTitle[t] = document.createElement("h5"),
                            modalTitle[t].className = "modal-title",
                            modalTitle[t].textContent = "Terms and Conditions",
                            modalHeader[t].appendChild(modalTitle[t]),
                            closeButton[t] = document.createElement("button"),
                            closeButton[t].className = "close",
                            closeButton[t].setAttribute("type", "button"),
                            closeButton[t].setAttribute("data-dismiss", "modal"),
                            closeButton[t].setAttribute("aria-label", "Close"),
                            closeButtonSpan[t] = document.createElement("span"),
                            closeButtonSpan[t].setAttribute("aria-hidden", "true"),
                            closeButtonSpan[t].innerHTML = "&times;",
                            closeButton[t].appendChild(closeButtonSpan[t]),
                            modalHeader[t].appendChild(closeButton[t]),
                            modalBody[t] = document.createElement("div"),
                            modalBody[t].className = "modal-body",
                            modalText[t] = document.createElement("p"),
                            modalText[t].textContent = e.fields.termsAndConditions,
                            modalBody[t].appendChild(modalText[t]),
                            modalContent[t].appendChild(modalBody[t]),
                            modalFooter[t] = document.createElement("div"),
                            modalFooter[t].className = "modal-footer",
                            dismissButton[t] = document.createElement("button"),
                            dismissButton[t].className = "btn btn-dark",
                            dismissButton[t].setAttribute("data-dismiss", "modal"),
                            dismissButton[t].textContent = "Dismiss",
                            modalFooter[t].appendChild(dismissButton[t]),
                            modalContent[t].appendChild(modalFooter[t]),
                            modalsContainer.appendChild(modalOuter[t]),
                            terms[t].textContent = " Terms"
                    }
                    if (termsContainer[t].appendChild(terms[t]),
                        detailContainer[t].appendChild(termsContainer[t]),
                        date[t] = document.createElement("p"),
                        date[t].className = "dealCard__date",
                        e.fields.endDateAndTime) {
                        var n = new Date(e.fields.endDateAndTime);
                        date[t].textContent = "Expires: " + n.toLocaleDateString("en-US", options)
                    } else
                        date[t].textContent = "No Expiration";
                    detailContainer[t].appendChild(date[t]),
                        cardContainer[t].appendChild(detailContainer[t]),
                        button[t] = document.createElement("a"),
                        button[t].className = "dealCard__button btn btn-dark",
                        e.fields.buttonText ? button[t].textContent = e.fields.buttonText : button[t].textContent = "Shop Now",
                        button[t].href = e.fields.buttonUrl,
                        button[t].setAttribute("onclick", 'ga("send", "event", "sisuDealApp", "ClickedThrough","' + e.fields.dealTitle.replace(/[^a-zA-Z0-9-_]/g, "") + "-" + e.sys.id + '");'),
                        cardContainer[t].appendChild(button[t]),
                        card[t].appendChild(cardContainer[t]),
                        app.appendChild(card[t])
                }
            })
    });
}
