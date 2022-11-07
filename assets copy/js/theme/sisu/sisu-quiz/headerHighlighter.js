export default function headerHighlighter() {
    if ($('.highlighter').length) {
        const highlighter = document.querySelectorAll('.highlighter');
        const images = ['marker-1.png', 'marker-2.png', 'marker-3.png', 'marker-4.png', 'marker-5.png', 'marker-6.png', 'marker-7.png'];
        const pos = 2;
        const neg = -2;
        const transCss = 'translateY(-50%) rotate(';
        const degCss = 'deg)';
        const urlCss = 'url(https://www.sisuguard.com/product_images/0_images/';
        const endCss = ')';
        [].forEach.call(highlighter, (e) => {
            // e.classList.add('addHighlightMask' + Math.floor((Math.random() * 6) + 1));
            const i = $(e);
            const parentOne = $(e).parent();
            const parentTwo = parentOne.parent();
            const randomNum = ((Math.random() * (pos - neg)) - neg - 4);
            // console.log(randomNum);
            // console.log(parentOne);
            // console.log(parentTwo);
            parentTwo.height(i.height());
            e.style.transform = transCss + randomNum + degCss;
            i.css({ 'mask-image': urlCss + images[Math.floor(Math.random() * images.length)] + endCss });
        });
    }
}
