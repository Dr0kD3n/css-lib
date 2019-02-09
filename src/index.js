import './sass/main.scss'

const animationDuration = 500;
const checkInputs = () => {
    $('input').map(e => {
        const input = $('input').eq(e)[0];
        $(input.nextElementSibling).css({
            top: input.value ? '0' : '20px',
            opacity: '1',
            fontSize: input.value ? '12px' : 'unset',
        })
    })
}
$(document).ready(() => {

    checkInputs()
    $('input').on('keyup', (e) => {
        const input = $(e.target).eq(0)[0];
        $(input.nextElementSibling).css({
            top: input.value ? '0' : '20px',
            opacity: '1',
            fontSize: input.value ? '12px' : 'unset',
        })
    })
    $('input').on('click', (e) => {
        const input = $(e.target).eq(0)[0];
        $(input.nextElementSibling).css({
            top: '0',
            opacity: '1',
            fontSize: '12px',
        })
    })
    $(document).on('click', (e) => {
        const { className, tagName } = $(e).eq(0)[0].target;
        if (tagName !== 'INPUT') checkInputs()
    })

    const popup = (text, className, timeline = false, duration = 1000) => {
        const hash = btoa(Math.random()).replace(/=/g, '');
        let el = null;
        const content = `${text} <div class='time-line ${!timeline && 'hidden'}'></div>`;
        $('.messageBox').eq(0)[0] || $('body').append('<div class="messageBox"></div>');
        $('.messageBox').append(`<div class='message ${hash} ${className}'>${content}</div>`)
            .promise()
            .then(() => el = $(`.message.${hash}`))
            .then(() => el.animate({
                left: `-=${el.width() + 10}px`
            }, 100))
            .then(() =>
                $(`.message.${hash} .time-line`)
                    .eq(0)
                    .animate({ 'width': '0' }, duration, () =>
                        el.animate({
                            marginRight: `-${el.width() + 20}px`,
                        }, animationDuration, () => {
                            el.css('display', 'none')
                        })
                    ))
        $(`.message.${hash}`).eq(0).on('click', () => {
            el = $(`.message.${hash}`);
            el.animate({
                left: `${el.width() + 20}px`,
            }, animationDuration, () =>
                    el.eq(0).css('display', 'none'))
        })
    }
    const tag = () => {
        const hash = btoa(Math.random()).replace(/=/g, '');
        const list = $(`.tag`);
        list.each(e => {
            const el = $(list).eq(e);
            el.prepend('<div class="connector"></div>')
            const parent = $($(el).eq(0)[0].parentElement);
            $('.tag').eq(e).addClass(hash);
            console.log(el.css('background-color'))
            console.log()
            el.css({
                height: parent.height(),
            })
            parent.css({
                border: `1px solid ${el.css('background-color')}`,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: '10px',
            })
        });
    }

})