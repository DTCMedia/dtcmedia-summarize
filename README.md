# Summarize
Summarize content with the ability to toggle visibility.

## Install
Install with Yarn:
```
$ yarn add dtcmedia-summarize
```

Import to module:
```javascript
import summarize from 'dtcmedia-summarize';
```

Initialize Summarize:
```javascript
summarize.init();
```

## Usage
Set these data attributes for Summarize to use:

Attribute | Element | Type | Description
--------- | ------- | ---- | -----------
data-summarize-height | `js-summarize-content` | Number | Maximum height for the summary.
data-summarize-overlap | `js-summarize-content` |  Number | Minimum overlap before the content gets summarized.
data-summarize-more | `js-summarize-trigger` |  String | Button text for when content is hidden.
data-summarize-less | `js-summarize-trigger` |  String | Button text for when content is visible.

Use the following code example to get you started:
```html
<article class="js-summarize">
   <div class="js-summarize-content" data-summarize-height="200" data-summarize-overlap="80">
       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum rutrum euismod lacinia. Aliquam euismod
       diam eu est aliquet porta. Praesent tincidunt purus non leo scelerisque mattis. Duis vitae sagittis risus. Phasellus
       pharetra tortor sed tortor mattis, a tempor nisl tristique. Cras in interdum eros. Duis commodo sollicitudin mattis.
       Aenean eu euismod augue. Morbi hendrerit aliquet pharetra. Cras vitae accumsan massa, ut vulputate lorem. Sed
       scelerisque mauris iaculis, molestie est at, venenatis eros.</p>
   </div>
   <button class="js-summarize-trigger" data-summarize-more="Show more" data-summarize-more="Show less">Show more</button>
</article>
```
