import buyHouse from "../../assets/categoryImage/buyHouse.svg";
import rentHouse from "../../assets/categoryImage/rentHouse.svg";
import sellHouse from "../../assets/categoryImage/sellHouse.svg";
export const categoryData = [
  {
    heading: "Buy a house ",
    subHeading: "Apartments, Townhomes, and Houses for Every Taste and Budget!",
    image: buyHouse,
    browseButton: "Browse houses",
    link: "properties/sale?property-category=buy",
  },
  {
    heading: "Sell a house",
    subHeading: "Experience the Easiest Way to Sell Your Home!",
    image: sellHouse,
    browseButton: "See options",
    link: "properties/sell",
  },
  {
    heading: "Rent a house",
    subHeading: "Apartments and Houses for Every Lifestyle and Budget!",
    image: rentHouse,
    browseButton: "Find rentals",
    link: "properties/sale?property-category=rent",
  },
];
