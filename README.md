# Poppins.js
Additional relevant information, intelligiently positioned based on click event.

## Installation
To install poppins just use the JSDelivr link to this repo. Or fork it and do your own thing. Follow your heart.
```JavaScript
import { buildPoppin } from 'https://cdn.jsdelivr.net/gh/mzebley/poppins@main/dist/poppins.min.js';
```

<em>Poppins</em> will automatically append its relevant dark and light mode styles for you at runtime. At this time, <em>Poppins</em> is a pretty exclusively used for my personal projects so it has shortcuts for styling that assumes your project is using SVG <defs> for your icons

## Basic Usage
### List Menu Template
  To build a <em>poppin</em> based on the <b>list menu</b> template, you'll need any array of data objects. Make 'em look like this.
```JavaScript
let list_menu_data_array = [{
  content: 'string', // Required - The list item's visible text
  function: 'string', // Optional - The functions and their parameters you want clicking this item to trigger
  svg_id: 'string', // Optional - The <def> id for your desired icon. If none provided, defaults to an arrow
  color_class: 'string', // Optional - Classes applied to the icon, Poppins provides "color-green," "color-blue," "color-red," and "color-orange" - you can add any other's from your projects CSS you'd like though
  large_icon: 'boolean', // Optional - Increases the size of your displayed icon
},...]
```
Now that you have that, you need an HTML element to bind your call to.
```html
<button id="list-menu-btn">Show Poppin</button>
```
Your call to build a <em>poppin</em> will be structured like this:  
  ```javascript
buildPoppin(id, reference, show, event, data)
  ```
  For this <b>list menu</b> example, you'll pass in data like this:
  ```html
<button id="list-menu-btn" onclick="buildPoppin('list_menu', 'list-menu-btn', true, event, list_menu_data_array)">Show Poppin</button>
```
  
  ### Additional Info Template
  To create a <em>poppin</em> based on the <b>additional info</b> template, you'll structure the data you pass in differently. For starters, it'll need to be an object rather than an array.
  ```JavaScript
let additional_info_data = {
  content: 'string', // Required - The poppin's visible content beneath the header
  title: 'string', // Optional - Header syntax opening text
  photo_link: 'string', // Optional - URL for dynamically positioned image
  photo_layout: 'string', // Optional - accepts 'square' or 'landscape', defaults to 'square'
  function: 'string', // Optional - The functions and their parameters you want triggered when the optional 'dive deeper' button is clicked
  
}
```
