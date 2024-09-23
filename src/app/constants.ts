// constants.ts

// List of logo image paths
export const logos = [
    "/assets/Writer.png",
    "/assets/Gptzero.png",
    "/assets/Crossplag.png",
    "/assets/copyleaks.png",
    "/assets/turnitin.png",
  ];
  
  // Slider settings for logo carousel
  export const logoSettings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  // List of logo image paths
export const bypassScreenshot = [
  "/assets/bypassexample1.png",
  "/assets/bypassexample2.png",
  "/assets/bypassexample3.png",
  "/assets/bypassexample4.png",
  "/assets/bypassexample5.jpg",
  "/assets/bypassexample6.png",

];
  // Text for the Kathmandu example
  export const kathmanduText = `Kathmandu, the capital city of Nepal, is a vibrant and culturally rich metropolis nestled in the Kathmandu Valley. Known for its ancient temples, historical sites, and lively markets, Kathmandu is the heart of Nepal's cultural and political life. The city is home to UNESCO World Heritage Sites like Swayambhunath (the Monkey Temple), Boudhanath Stupa, Pashupatinath Temple, and Durbar Square, each showcasing the country's unique blend of Hindu and Buddhist traditions.
  
  Kathmandu is also a gateway for trekkers and adventurers heading to the Himalayas, including the famous Everest Base Camp. Despite its rapid urbanization, Kathmandu retains its traditional charm, with narrow streets, old wooden houses, and a rich tapestry of festivals and rituals celebrated year-round.`;
  
  // Utility function to count words in a string
  export function countWords(str: string): number {
    return str.trim().split(/\s+/).filter(Boolean).length;
  }