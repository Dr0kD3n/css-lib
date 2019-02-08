import './sass/main.scss'
import { tag } from 'postcss-selector-parser';

const animationDuration = 300;

$(document).ready(() => {
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
        const content = `${text} <div class='time-line ${!timeline && 'hidden'}'></div>`
        $('body').append(`<div class='message ${hash} ${className}'>${content}</div>`)
            .promise()
            .then(() => el = $(`.message.${hash}`))
            .then(() => {
                el.animate({
                    left: `-=${el.width() + 10}px`
                }, 100)
            })
            .then(() =>
                $(`.message.${hash} .time-line`)
                    .eq(0)
                    .animate({ 'width': '0' }, duration, () =>
                        el.animate({
                            marginLeft: `${el.width() + 20}px`,
                        }, animationDuration, () => {
                            el.css('display', 'none')
                        })
                    ))
        $(`.message.${hash}`).eq(0).on('click', () => {
            el = $(`.message.${hash}`);
            el.animate({
                marginLeft: `${el.width() + 20}px`,
            }, animationDuration, () =>
                    el.eq(0).css('display', 'none'))
        })
    }
    popup('123')
    popup('123', 'primary')
})