import './sass/main.scss'

const animationDuration = 300;

$(document).ready(() => {
    const popup = (text, className, timeline = false, duration = 1000) => {
        const hash = btoa(Math.random()).replace(/=/g, '');
        let el = null;
        const content = `${text} <div class='time-line ${!timeline && 'hidden'}'></div>`
        $('body').append(`
        <div class='message ${hash} ${className}'>${content}
        </div>
        `)
            .promise()
            .then(() => {
                el = $(`.message.${hash}`);
                el.animate({
                    left: `-=${el.width() + 10}px`
                }, 100)
            })
            .then(() =>
                $(`.message.${hash} .time-line`)
                    .eq(0)
                    .animate({ 'width': '0' }, duration, () =>
                        el.animate({
                            marginTop: `-${el.height()}px`,
                            opacity: '0'
                        }, animationDuration)
                    ))
        el && el.on('click', () =>
            el.animate({
                marginTop: `${el.height()}px`,
                opacity: '0'
            }, animationDuration))
    }
    popup('123', 'success', true)
    popup('123', 'primary')
    popup('123123123123132131123123112312312312313213112312311231231231231321311231231', 'warning')
    popup('123', 'danger')
})