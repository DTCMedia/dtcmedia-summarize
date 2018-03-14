module.exports = function(debug) {
    /**
     * Show notices for debugging purposes
     */
    let notices = debug === true ? true : false;

    if(notices) {
        console.log('Summarize ~ Debug mode');
    }

    /**
     * Search for instances to summarize
     */
    Array.from(document.getElementsByClassName('js-summarize')).forEach(instance => {

        if(notices) {
            console.log('Summarize ~ Instance found');
        }

        /**
         * Obtain elements required to summarize content
         */
        const content = instance.getElementsByClassName('js-summarize-content')[0];
        const trigger = instance.getElementsByClassName('js-summarize-trigger')[0];

        if (!content || !trigger) {

            if(notices) {
                console.log('Summarize ~ Missing class selector');
            }

            return;
        }

        /**
         * Obtain settings required to summarize content
         */
        const contentHeight = parseInt(content.getAttribute('data-summarize-height'));
        const contentOverlap = parseInt(content.getAttribute('data-summarize-overlap'));
        const triggerLess = trigger.getAttribute('data-summarize-less');
        const triggerMore = trigger.getAttribute('data-summarize-more');

        if (!contentHeight || !contentOverlap || !triggerLess || !triggerMore) {

            if(notices) {
                console.log('Summarize ~ Missing data attribute');
            }

            return;
        }

        /**
         * Summarize content if needed
         */
        const summarize = () => {
            if (content.getBoundingClientRect().height >= contentHeight + contentOverlap && !instance.classList.contains('is-active')) {
                content.style.WebkitMaskImage = '-webkit-linear-gradient(top, black 0%, black 33.333%, transparent 100%)';
                content.style.maxHeight = contentHeight + 'px';
                content.style.overflow = 'hidden';
                instance.classList.add('is-summarized');
                instance.classList.add('is-active');
                trigger.innerHTML = triggerMore;

                if (notices) {
                    console.log('Summarize ~ Content hidden');
                }
            } else {
                content.style.WebkitMaskImage = 'none';
                content.style.maxHeight = 'none';
                content.style.overflow = 'visible';
                instance.classList.remove('is-active');
                trigger.innerHTML = triggerLess;

                if (notices) {
                    console.log('Summarize ~ Content visible');
                }
            }
        }

        /**
         * Execute summarize on page load
         */
        summarize();

        /**
         * Execute summarize on click
         */
        trigger.onclick = () => {
            summarize();
        }
    });
}
