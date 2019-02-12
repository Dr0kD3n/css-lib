import './scss/main.scss'
import variables from './scss/_variables.scss'
const animationDuration = 500;
const checkInputs = () => {
    $('input').map(e => {
        const input = $('input').eq(e)[0];
        $(input.nextElementSibling).css({
            top: input.value ? '0' : '20px',
            opacity: input.value ? '1' : '0.5',
            fontSize: input.value ? '12px' : 'unset',
        })
    })
}
const dropdown = () => {
    $('.dropdown').each(e => {
        const hash = `hash${btoa(Math.random()).replace(/=/g, '')}`;
        const el = $('.dropdown').eq(e);
        const header = el.find('.header').eq(0);
        const inNav = el.parent().parent().has('.nav');
        const content = el.find('.content').eq(0);
        el.addClass(hash);
        el.hasClass('center') && !inNav && header.html(`<div></div><div class="text">${header.html()}</div>`);
        if (inNav) {
            el.on('mouseenter', (e) => content.slideDown(animationDuration));
            el.offset().left - $(window).width() < 0 && content.css('right', 0);
            $(document).on('mousemove', (e) => {
                const { className } = $(e).eq(0)[0].target;
                const condition = className.includes('header') || className.includes('dropdown-item')
                !condition && content.slideUp(animationDuration);
            })
        } else {
            header.append(`<i class="fa fa-angle-down"></i>`)
            header.on('click', () => {
                content.animate({
                    height: 'toggle'
                }, animationDuration)
                header.find('.fa.rotated').eq(0)[0] ?
                    $(header.find('.fa')).removeClass('rotated').addClass('rotate') :
                    $(header.find('.fa')).removeClass('rotate').addClass('rotated')
            })
        }

    })
}
const popup = (text, className, timeline = false, duration = 1000) => {
    const hash = btoa(Math.random()).replace(/=/g, '');
    let el = null;
    const content = `${text} <div class='time-line ${!timeline && 'hidden'}'></div>`;
    $('.message-box').eq(0)[0] || $('body').append('<div class="message-box"></div>');
    $('.message-box').append(`<div class='message ${hash} ${className}'>${content}</div>`)
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
const breadcrumbs = () => {
    const breadcrumbs = $('.breadcrumbs');
    breadcrumbs.each(e => {
        const isHorizontal = breadcrumbs.eq(e)[0].className.includes('horizontal');
        const child = breadcrumbs.eq(e).children();
        let margin = 0;
        child.each(e => {
            const el = child.eq(e);
            const divider = variables.breadcrumbDivider[0].replace(/ /g, '&nbsp;');
            e !== child.length - 1 &&
                el.append(`<div class="divider">${variables.breadcrumbDivider.split(divider)[1]}</div>`);
            isHorizontal && $(el[0]).css('marginLeft', `${margin}px`);
            margin += el.width();
        })
    })

}
const dropdownGroup = () => {
    $('.dropdown-group').each(e => {
        const dropdownGroup = $('.dropdown-group').eq(e);
        const dropdown = dropdownGroup.find('.dropdown');
        dropdown.each(e => {
            const hash = `hash${btoa(Math.random()).replace(/=/g, '')}`;
            Object.values($(dropdown).eq(e)[0].classList)
                .filter(e => e.includes('hash'))[0] ||
                $(dropdown).eq(e).addClass(hash)
        });
        const header = dropdown.find('.header');
        header.off('click').on('click', e => {
            const content = dropdown.find('.content')
            const el = $(e.target.parentElement);
            let result = false;
            dropdown.each(e => {
                const hash = Object.values(el.eq(0)[0].classList).filter(e => e.includes('hash'))[0];
                if (dropdown.eq(e).hasClass(hash)) {
                    dropdown.eq(e).find('.content').css('display') === 'none' ?
                        content.eq(e).slideDown(animationDuration) :
                        content.eq(e).slideUp(animationDuration);
                } else {
                    content.eq(e).slideUp(animationDuration);
                }
            })
        })
    })
}
$(document).ready(() => {
    $('input').on('keyup', (e) => {
        const input = $(e.target).eq(0)[0];
        const condition = input.value || $(e.target).eq(0).is(':focus');
        $(input.nextElementSibling).css({
            top: condition ? '0' : '20px',
            opacity: condition ? '1' : '0.5',
            fontSize: condition ? '12px' : 'unset',
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
    dropdown()
    dropdownGroup()
    checkInputs()
    breadcrumbs()
})