# nHentai-js

## Install
```
$ npm install nhentai-js
```

## Usage
```js
const nhentai = require('nhentai-js')
(async () => {
    if(nhentai.exists('147476')) { // checks if doujin exists
        const dojin = await nhentai.getDoujin('147476')
        console.log(dojin);
        /*
{
	title: '(Reitaisai 12) [Kuma-tan Flash! (Yamu)] Tanetsuke Oji-san Hazard | Jizz Geezer Hazard (Touhou Project) [English]',
	details: {
		parodies: [ 'touhou project (10,479)' ],
		characters: [ 'satori komeiji (536)' ],
		tags: [ 'nakadashi (19,279)',
			'impregnation (8,836)',
			'dilf (6,935)',
			'bbm (5,469)',
			'unusual pupils (2,189)'
		],
		artists: [ 'yamu (77)' ],
		groups: [ 'kuma-tan flash (84)', 'reverse noise (69)' ],
		languages: [ 'translated (60,245)', 'english (45,046)' ],
		categories: [ 'doujinshi (138,514)' ] },
		pages: [ 'https://i.nhentai.net/galleries/865683/1.png',
			'https://i.nhentai.net/galleries/865683/2.png',
			'https://i.nhentai.net/galleries/865683/3.png',
			'https://i.nhentai.net/galleries/865683/4.png',
			'https://i.nhentai.net/galleries/865683/5.png',
			'https://i.nhentai.net/galleries/865683/6.png'
		]
	},
	link: 'https://nhentai.net/g/147476/'
}
		*/
    }
})();
```

## API

The ID of a doujin can be found can be found at after the `/g/` in the search bar or a URL.

`https://nhentai.net/g/248121` in this case `248121` is the ID.

### nhentai.exists(id)

Checks if a doujin exists.

Returns a `boolean`

### nhentai.getDoujin(id)

Gets a doujin's data.

Returns an `Object` See above for more details

### nhentai.getHomepage(page)

Gets available doujins' data from the homepage.

Returns an `Object` See examples below for more details

### nhentai.search(query, [page, sortBy])

- `page` must be an `integer`
- `sortBy` can only be `"date"` or `"popular"` and must be a `string`

Searches for doujin data according to the options passed.
The options with brackets means optional.

Returns an `Object` See examples below for more details

## Examples

### Gets a doujin's data

```js
const nhentai = require('nhentai-js')

async function getDoujin(id){
	try{ // try/catch is the equivalent of Promise.catch() in async/await
		const val = await nhentai.getDoujin(id)
		return val
	}catch(err){
		console.error(err);
	}
}

getDoujin('148936') // Object {...}
```

### Check if a doujin exists

```js
const nhentai = require('nhentai-js')

async function doujinExists(id){
	const val = await nhentai.exists(id)
	return val
}

console.log(doujinExists('147476')) // true
```

### Get doujins from homepage

```js

(async () => {
    console.log(await nhentai.getHomepage(1))
})()
/*
{
  results: [ { bookId: '262542',
       thumbnail: 'https://t.nhentai.net/galleries/1361883/thumb.jpg',
       title: '[Suto] 百合えっち本再録' },
     { bookId: '262541',
       thumbnail: 'https://t.nhentai.net/galleries/1361912/thumb.jpg',
       title: '『俺の愛しの脇』 by KANEKO Ako' },
     { bookId: '262540',
       thumbnail: 'https://t.nhentai.net/galleries/1361873/thumb.jpg',
       title: 'Armpit Job~ Mastrubating With Elder Brother\'s Arnpit' }
       ...
  ],
  lastPage: '10308'
}
*/
```

### Search doujins by tags, parodies, etc...

```js
(async () => {
    console.log(await nhentai.search('stockings'))
})()

/*
{
  results: [ { bookId: '262532',
       thumbnail: 'https://t.nhentai.net/galleries/1361834/thumb.jpg',
       title:
        '[Hadairo Rooibos Tea (Pandain)] Taimanin Satori 3 | 对魔忍觉3 (Touhou Project) [Chinese] [布洛基个人汉化] [Digital]' },
     { bookId: '262528',
       thumbnail: 'https://t.nhentai.net/galleries/1361777/thumb.jpg',
       title: '[Takeda Hiromitsu] Sister Breeder Bonus Chapters [English]' },
     { bookId: '262512',
       thumbnail: 'https://t.nhentai.net/galleries/1361732/thumb.jpg',
       title:
        '(C95) [Kaiyuu Kikaku (Suzui Narumi)] Torokechau Hodo Issho ni Isasete (Kantai Collection -KanColle-)' }
        ...
  ],
  lastPage: '2162'
}
 */
```