import sisuQuiz from './sisu-quiz';

export default function select2quiz() {
    const list = $('.select-2-sports');
    const target = $('.quiz-target');
    list.select2({
        placeholder: 'Select your sports',
        closeOnSelect: false,
    });
    target.change(() => {
        sisuQuiz();
    });
}
