export interface Product {
  name: string;
  gender: "For Men" | "For Women";
  price: string;
  image: string;
  slug: string;
  chapter: string;
}

export const products: Product[] = [
  {
    name: "NB THOUSAND",
    gender: "For Men",
    price: "AED 1,000",
    image: "/bossitiviti/nb-thousand.jpg",
    slug: "nb-thousand",
    chapter: "01",
  },
  {
    name: "NB MILLION",
    gender: "For Women",
    price: "AED 900",
    image: "/bossitiviti/nb-million.jpg",
    slug: "nb-million",
    chapter: "02",
  },
  {
    name: "NB BILLION",
    gender: "For Men",
    price: "AED 800",
    image: "/bossitiviti/nb-billion.jpg",
    slug: "nb-billion",
    chapter: "03",
  },
  {
    name: "NB TRILLION",
    gender: "For Women",
    price: "AED 800",
    image: "/bossitiviti/nb-trillion.jpg",
    slug: "nb-trillion",
    chapter: "04",
  },
  {
    name: "NB OCTILLION",
    gender: "For Women",
    price: "AED 800",
    image: "/bossitiviti/nb-octillion.jpg",
    slug: "nb-octillion",
    chapter: "05",
  },
  {
    name: "NB DECILLION",
    gender: "For Men",
    price: "AED 800",
    image: "/bossitiviti/nb-decillion.jpg",
    slug: "nb-decillion",
    chapter: "06",
  },
];

export const heroProduct = {
  name: "NB TRILLION",
  gender: "For Women",
  price: "AED 800",
  image: "/bossitiviti/nb-trillion-hero.jpg",
};
