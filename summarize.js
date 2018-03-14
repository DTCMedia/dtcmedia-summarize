function init() {
    /**
     * Search for instances and summarize them
     */
    Array.from(document.getElementsByClassName('js-summarize')).forEach(instance => {
        const trigger = instance.getElementsByClassName('js-summarize-trigger')[0];
        const container = instance.getElementsByClassName('js-summarize-container')[0];

        /**
         * Do not initialize without required selectors
         */
        if (!trigger || !container) {
            return;
        }

        /**
         * Check if container needs to be summarized
         */
        const shouldSummarize = () => {
            return container.getBoundingClientRect().height >= parseInt(container.getAttribute('data-summarize-height')) + parseInt(container.getAttribute('data-summarize-overlap')) && !instance.classList.contains('is-active');
        };

        /**
         * Toggle summarized container visibility
         */
        const toggle = () => {
            if (shouldSummarize()) {
                trigger.innerHTML = trigger.getAttribute('data-summarize-more');
                container.style.maxHeight = parseInt(container.getAttribute('data-summarize-height')) + 'px';
                container.style.overflow = 'hidden';
                instance.classList.add('is-summarized');
                instance.classList.add('is-active');
            } else {
                trigger.innerHTML = trigger.getAttribute('data-summarize-less');
                container.style.maxHeight = 'none';
                container.style.overflow = 'visible';
                instance.classList.remove('is-active');
            }
        };

        /**
         * Hide summarized container on page load
         */
        toggle();

        /**
         * Add click event to toggle visibility on summarized containers
         */
        trigger.onclick = () => {
            toggle();
        };
    });
}

export default {init}
