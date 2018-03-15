# Summarize
Summarize content with the ability to toggle visibility.

## Install
Install with Yarn:
```javascript
$ yarn add dtcmedia-summarize
```

Import module:
```javascript
import summarize from 'dtcmedia-summarize';
```

Summarize with defaults:
```javascript
summarize();
```

## Settings
Summarize with settings:

Option | Type | Default
------ | ---- | -------
debug | boolean | false
defaultStyles |  boolean | true
parentSelector |  String | '.js-summarize'
contentSelector |  String | '.js-summarize-content'
triggerSelector |  String | '.js-summarize-trigger'

```javascript
summarize({
    debug: false,
    defaultStyles: true,
    selector: '.js-summarize',
    contentSelector: '.js-summarize-content',
    triggerSelector: '.js-summarize-trigger'
});
```

## Usage
Setup the correct markup with data attributes:

Attribute | Type | Description
--------- | ---- | -----------
height | Number | Maximum height for the summary.
overlap |  Number | Minimum overlap before the content gets summarized.
more |  String | Button text for when content is hidden.
less |  String | Button text for when content is visible.

Use the following code example to get you started:
```html
<article class="js-summarize">
   <div class="js-summarize-content" data-summarize-height="200" data-summarize-overlap="80">Lorem ipsum...</div>
   <button class="js-summarize-trigger" data-summarize-more="Show more" data-summarize-more="Show less">Show more</button>
</article>
```
