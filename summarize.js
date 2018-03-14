function init() {
    /**
     * Search for instances and summarize them
     */
    Array.from(document.getElementsByClassName('js-summarize')).forEach(instance => {
        const trigger = instance.getElementsByClassName('js-summarize-trigger')[0];
        const content = instance.getElementsByClassName('js-summarize-content')[0];

        /**
         * Do not initialize without required selectors
         */
        if (!trigger || !content) {
            return;
        }

        /**
         * Check if content needs to be summarized
         */
        const shouldSummarize = () => {
            return content.getBoundingClientRect().height >= parseInt(content.getAttribute('data-summarize-height')) + parseInt(content.getAttribute('data-summarize-overlap')) && !instance.classList.contains('is-active');
        };

        /**
         * Toggle summarized content visibility
         */
        const toggle = () => {
            if (shouldSummarize()) {
                trigger.innerHTML = trigger.getAttribute('data-summarize-more');
                content.style.maxHeight = parseInt(content.getAttribute('data-summarize-height')) + 'px';
                content.style.overflow = 'hidden';
                instance.classList.add('is-summarized');
                instance.classList.add('is-active');
            } else {
                trigger.innerHTML = trigger.getAttribute('data-summarize-less');
                content.style.maxHeight = 'none';
                content.style.overflow = 'visible';
                instance.classList.remove('is-active');
            }
        };

        /**
         * Toggle visibility for summarized content on page load
         */
        toggle();

        /**
         * Toggle visibility for summarized content on click
         */
        trigger.onclick = () => {
            toggle();
        };
    });
}

export default {init}
