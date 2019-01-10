const defaultImages: string[] = ['https://static.boredpanda.com/blog/wp-content/uploads/2016/09/animals-' +
'dressed-like-humans-zoo-porraits-yago-partal-100-57d65dad6f9d8__880.jpg',
'https://static.boredpanda.com/blog/wp-content/uploads/2016/09/animals-dressed' +
'-like-humans-zoo-porraits-yago-partal-45-57d65d1fb7565__880.jpg',
'https://static.boredpanda.com/blog/wp-content/uploads/2016/09/animals-'
+ 'dressed-like-humans-zoo-porraits-yago-partal-99-57d65dab6a931__880.jpg',
'https://static.boredpanda.com/blog/wp-content/uploads/2016/09/animals-dressed-' +
'like-humans-zoo-porraits-yago-partal-76-57d65d7d1451f__880.jpg',
'https://static.boredpanda.com/blog/wp-content/uploads/2016/09/animals-dressed' +
'-like-humans-zoo-porraits-yago-partal-60-57d65d400ef27__880.jpg',
'https://static.boredpanda.com/blog/wp-content/uploads/2016/09/animals-dressed' +
'-like-humans-zoo-porraits-yago-partal-43-57d65d1c8252b__880.jpg',
'https://static.boredpanda.com/blog/wp-content/uploads/2016/09/animals-' +
 'dressed-like-humans-zoo-porraits-yago-partal-55-57d65d360deca__880.jpg'
];


function getRandomNumber(max: number): number {
  return Math.floor(Math.random() * max);
}

export function takeRandomProfilePic(): string {
  return defaultImages[getRandomNumber(defaultImages.length)];
}
