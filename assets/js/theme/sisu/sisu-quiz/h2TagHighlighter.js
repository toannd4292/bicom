export default function h2TagHighlighter() {
    const h2Tag = $('.addGrit');
    if (h2Tag.length) {
        h2Tag.wrap('<div class="highlighterContainer"></div>');
        h2Tag.addClass('highlightedText');
        h2Tag.append('<div class="highlighter"></div>');
    }
}
