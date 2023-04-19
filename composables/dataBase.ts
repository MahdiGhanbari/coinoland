import { Product } from '@/utils/classes'

// Hardcoded data
const DESCRIPTIONS = [
  'Touting “quick and simple image placeholders,” Placeholder.com is easy to remember, and easy to use. Just grab their image URL, modify with your size parameters, and voila!',
  "It's high time we had a celeb appear on this list, and who better than Fill Murray. Now you can add a little offbeat humor and comedic charm to every website design or layout.",
  "This placeholder image generator offers a lot of options, including width and height, ratios, background and foreground color, and our favorite—common preset screen and ad sizes.",
  "A fun twist on the popular photo sharing site, LoremFlickr surfaces Creative Commons licensed Flickr photos for use as placeholder images. Plug in some dimensions and off you go!,",
  "With nearly 3000 mockup templates, Placeit has it all. iPhones, Samsungs, desktops, laptops, tablets, you name it, they've got it, and in nearly every position imaginable!",
  "With nearly 3000 mockup templates, Placeit has it all. iPhones, Samsungs, desktops, laptops, tablets, you name it, they've got it, and in nearly every position imaginable!",
  "I can has placeholder imagez? Yes, yes you can. Our list wouldn't be complete without the requisite feline-inspired image generator, bursting with cute and fluffy friends.",
  "Yep, it exists. The even meatier complement to Bacon Ipsum, make every client salivate over your designs with juicy, red placeholder images of, you guessed it, bacon.",
  "Built as a foil to placekitten, PlaceBeard.it offers something more earthy, more manly. Choose color or grayscale placeholder beards in every proportion for your next project.",
  "One of the originals, lorempixel (formerly lorempixum) is a no nonsense placeholder image generator, with a simple interface featuring size, categories and color options."
]
const CATEGORIES = [
  "Clothing & Shoes",
  "Entertainment",
  "Music",
  "Sport & Lifestyle",
  "Pets",
  "Kitchen Accessories",
  "Travel Equipment",
  "Growing & Garden",
  "Electrical Tools",
  "Mother Care",
  "Toys & Entertainment",
  "Vintage"
]

export function useDataBase() {


  function getRandomList(count: number): Array<Product> {
    const result: Array<Product> = []
    const { getRandom } = useUtilities()

    while(count > 0) {
      let index = Math.round(getRandom(1, 10))
      const name = `Product ${index}`
      const image = getRandom(1, 7).toFixed()
      const description = DESCRIPTIONS[index - 1]
      index = Math.round(getRandom(1, CATEGORIES.length))
      const category = CATEGORIES[index - 1]
      const price = +getRandom(10, 1000).toFixed(2)
      const rate = +getRandom(1, 5).toFixed(1)
      const hasOff = !!Math.round(Math.random())
      const off = hasOff ? Math.round(getRandom(1, 100)) : 0

      const product = new Product(image, name, description, category, price, rate, off)
      result.push(product)
      count--
    }
    return result
  }

  return {
    getRandomList
  }
}
