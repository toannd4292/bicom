import utils from '../../../../../node_modules/@bigcommerce/stencil-utils';
import 'select2';
import h2TagHighlighter from './h2TagHighlighter';
import headerHighlighter from './headerHighlighter';

export default function sisuQuiz() {
    const form = $('#quiz-form').serializeArray();
    const sports = $('.select-2-sports').select2('data');
    const resultElement = $('#quiz-result');
    const addOn = $('#quiz-result-contents-container');
    const finalResult = {
        primaryResult: null,
        secondResult: null,
        thirdResult: null,
    };
    const aeroVar = 'aero';
    // const addSizeLink = '?size=';
    const aero = 191;
    const go = 200;
    const threeD = 232;
    const max = 192;
    let productIds = [];
    // let apiResponse = [];
    let heightValue;
    let bracesValue;
    let resultMessage;
    let maxValue = 0;
    let aeroValue = 0;
    let heightResult;

    // console.log(height);
    // console.log(sports);
    // console.log(braces);
    // console.log(form);
    // console.log(sports);
    if (sports.length < 1) {
        if ($('#quiz-result-contents-container').children().length > 0) {
            addOn.html('');
            resultElement.html('Your result will appear here...');
        }
    }
    if (form.length > 1) {
        form.forEach((e) => {
            switch (e.value) {
            case 'h-1':
                heightValue = '1';
                break;
            case 'h-2':
                heightValue = '2';
                break;
            case 'h-3':
                heightValue = '3';
                break;
            case 'b-1':
                bracesValue = 'yes';
                break;
            case 'b-2':
                bracesValue = 'no';
                break;
            default:
            }
        });
        if (heightValue === '1') {
            if (bracesValue === 'yes') {
                heightResult = 'medium';
            } else {
                heightResult = 'small';
            }
        } else if (heightValue === '2') {
            if (bracesValue === 'yes') {
                heightResult = 'large';
            } else {
                heightResult = 'medium';
            }
        } else {
            heightResult = 'large';
        }
    }
    if (sports.length > 0) {
        sports.forEach((e) => {
            switch (e.id) {
            case 'max':
                maxValue++;
                break;
            case 'aero':
                aeroValue++;
                break;
            case 'go':
                break;
            default:
                // console.log('something went wrong');
            }
        });
        if (heightResult) {
            if (heightResult === 'small') {
                finalResult.primaryResult = aeroVar + heightResult;
                finalResult.secondResult = '3d';
                finalResult.thirdResult = 'go';
                productIds = [aero, threeD, go];
                resultMessage = 'Based on your height, we recommend you try out our SISU Aero in the Small size.';
            } else if (maxValue > 0) {
                finalResult.primaryResult = 'max';
                finalResult.secondResult = '3d';
                finalResult.thirdResult = aeroVar + heightResult;
                productIds = [max, threeD, aero];
                resultMessage = 'Momma always said "better safe than sorry!" High impact sports increase your risk of dental injury, so give our SISU Max guard a try.';
            } else if (aeroValue > 0) {
                finalResult.primaryResult = '3d';
                finalResult.secondResult = aeroVar + heightResult;
                finalResult.thirdResult = 'max';
                productIds = [threeD, aero, max];
                resultMessage = "Can't go wrong with a classic! Try our most popular selection, SISU Aero. Based on your height, a " + heightResult + " size will likely fit you best.";
            } else {
                finalResult.primaryResult = 'go';
                finalResult.secondResult = '3d';
                finalResult.thirdResult = aeroVar + heightResult;
                productIds = [go, threeD, aero];
                resultMessage = "Your sport might not require a mouth guard, but that's why we made SISU GO! Essential protection + extreme comfort. Try one of our other models if full coverege is top of mind.";
            }
        }
    }
    if (finalResult.primaryResult && finalResult.secondResult && finalResult.thirdResult) {
        if ($('#pre-quiz').length) {
            $('.quiz-result-container').css('flex-direction', 'column');
            $('.quiz-result-container').html('<h2 class="addGrit">We Recommend</h2><p id="quiz-result">Your result will appear here...</p><ul class="productGrid" id="quiz-result-container"><li class="product" id="quiz-result-contents-container"></li></ul>');
            sisuQuiz();
            h2TagHighlighter();
            headerHighlighter();
            return;
        }
        productIds.forEach((item, index) => {
            let interval;
            const quizCardRec = 'is-recommended quiz-card-';
            const quizCard = 'quiz-card-';
            if (index === 0) { interval = 0; } else { interval = 1000; }
            setTimeout(() => {
                utils.api.product.getById(item, { template: 'sisu/quiz-product-card' }, (err, response) => {
                    if (response === '') return;
                    if ($('#quiz-result-contents-container').children().length > 3) {
                        addOn.html('');
                        sisuQuiz();
                        return;
                    }
                    if (index === 0) {
                        addOn.html(response);
                        resultElement.html(resultMessage);
                        addOn.children().first().addClass(quizCardRec + index);
                        addOn.children().first().css('order', index);
                    } else {
                        addOn.append(response);
                        addOn.children().last().css('order', index);
                        addOn.children().last().addClass(quizCard + index);
                    }
                });
            }, interval);
        });
        setTimeout(() => {
            if (productIds[0] === aero) {
                const firstCard = $('.quiz-card-0 > figure a');
                const url = new URL('https://www.sisuguard.com/sisu-aero-mouth-guard/');
                const searchParams = url.searchParams;
                searchParams.delete('size');
                searchParams.set('size', heightResult);
                url.search = searchParams.toString();
                let newUrl = url.toString();
                newUrl = newUrl.substring(25, newUrl.length);
                firstCard.attr('href', newUrl);
                // const firstCardHref = firstCard.attr('href') + addSizeLink + heightResult;
                // firstCard.attr('href', firstCardHref);
                // console.log('first is aero: ' + firstCardHref);
            }
            if (productIds[1] === aero) {
                const firstCard = $('.quiz-card-1 > figure a');
                const url = new URL('https://www.sisuguard.com/sisu-aero-mouth-guard/');
                const searchParams = url.searchParams;
                searchParams.delete('size');
                searchParams.set('size', heightResult);
                url.search = searchParams.toString();
                let newUrl = url.toString();
                newUrl = newUrl.substring(25, newUrl.length);
                firstCard.attr('href', newUrl);
                // const secondCard = $('.quiz-card-1 > figure a');
                // const secondCardHref = secondCard.attr('href') + addSizeLink + heightResult;
                // secondCard.attr('href', secondCardHref);
                // console.log('second is aero: ' + secondCardHref);
            }
            if (productIds[2] === aero) {
                const firstCard = $('.quiz-card-2 > figure a');
                const url = new URL('https://www.sisuguard.com/sisu-aero-mouth-guard/');
                const searchParams = url.searchParams;
                searchParams.delete('size');
                searchParams.set('size', heightResult);
                url.search = searchParams.toString();
                let newUrl = url.toString();
                newUrl = newUrl.substring(25, newUrl.length);
                firstCard.attr('href', newUrl);
                // const thirdCard = $('.quiz-card-2 > figure a');
                // const thirdCardHref = thirdCard.attr('href') + addSizeLink + heightResult;
                // thirdCard.attr('href', thirdCardHref);
                // console.log('third is aero: ' + thirdCardHref);
            }
        }, 3000);
        if (!addOn.length) { return; }
        addOn.html('');
    }
}
