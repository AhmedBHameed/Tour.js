# 📸 Tour.js

Tour is like bootstrap carousel with additional powerfull features. No need for JQuery library.

# Demo
See live [Demo](http://codepen.io/Ahmed_B_Hameed/full/QdJBgN/)

## Version
* Version 2.0

## 🔨 Getting Started

1. Take a copy from the project.
2. take a copy of both files tour.js and tour.css then paste them inside your project.
3. append your project with the following tags which are:
```HTML
	<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
	<link rel="stylesheet" href="yourPath/tour.css">
	<script src="yourPath/tour.js" type="text/javascript"></script>
```
4. I used fontawesome library to bring the shape of arrows so if you want to do the same or ignore the first tag and use your own shape.
5. Don't forget to execute Tour function by writing those codes:

```JS
	document.addEventListener('DOMContentLoaded', function (){
	document.removeEventListener('DOMContentLoaded', arguments.calee);
		tour('.tour').apply();
	});
```
If you are running JQuery library then you need just to write this code below inside the ready function.

```JS
tour('.tour').apply();
```

## 🔬 Features and why Tour.js

I was searching for a slider or carousel as they call it today for making my own specefic slider according to my properties. I did not find some thing special so i decided to build my own slider that can accept any developer requirement.

Lets go with Tour.js features:
When you run Tour function you can pass an object to do some controlls, the whole object is like this.
```JS
tour('.tour').apply({
	"delay": 6000,
	"startCycle": true,
	"showArrows": true,
	"slideEffect": 'sliding',
	"returnAPI": false
});
```

```JS
"delay": 6000
```
It is the time that slider will holds in ms = 6 seconds.
```js
"startCycle": true
```
Starting Tour automatice sliding.
```js
"showArrows": true
```
To show the two aside arrows as you wish.
```js
"SlideEffect": 'sliding'
```
There are 3 slide transition effects which are 'sliding', 'fading', 'rolling'
```js
"returnAPI": true
```
It will return API methods that can controll Tour in another places in your code. This is a very important feature should assigne to "true" if you want to controll your own slider with your own programm methods.

The return API will be the following methods:
```js
{
	"element": will return the current element,
	"next": function can be execut to go to the next slide,
	"prev": the previous of next function,
	"indeicators": will return the current element indeicator's elements
	"transition": Here you can see or change your slide transition in respect of 3 slide transition effects explained above.
};

```



## Browser Compatibilities

I develop the project from time to time so for the moment i thing that IE is not supported but working on it.
Any other intiligent browser will just work fine.

### Built With

* [Brackets IDE](http://brackets.io/).
* [Fontawesome](http://fontawesome.io/).

### License

This project is licensed under the MIT License.
In words it is free to use and develope.

### Contact
* All information about me in [X-REF](http://x-ref.geer.netai.net/index.html)
* [Github](https://github.com/AhmedBHameed)
* [ahmedbazy@gmail.com](emailto:ahmedbazy@gmail.com)
* [Codepen.io](http://codepen.io/Ahmed_B_Hameed/)

### Acknowledgments

* HTML/CSS
* Javascript/JQuery
* SASS
* Bootstrap
* PHP
* MySQL
* Angular 2

### Want to support me!

Please make a feedback if any issue happen to you.
Thank you... Enjoy.