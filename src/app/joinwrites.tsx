import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";
import AvatarCircles from "@/components/ui/avatar-circles";

const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "NoaiGPT has transformed the way I create content. My blog posts are more engaging than ever!",
    img: "/assets/profile pics/jack.png",
  },
  {
    name: "Emily Chen",
    username: "@emily.11",
    body: "As a digital marketer, NoaiGPT helps me produce high-quality content quickly, boosting my SEO efforts significantly.",
    img: "/assets/profile pics/jill.png",
  },
  {
    name: "Anish Poudel",
    username: "@poudel.anish",
    body: "The customizable outputs allow me to tailor content precisely to my audience's needs. It's a game-changer!",
    img: "/assets/profile pics/john.png",
  },
  {
    name: "Rama Sharma",
    username: "@ram.sharma",
    body: "NoaiGPT has completely changed how we approach content creation. The AI-generated text is indistinguishable from human writing!",
    img: "/assets/profile pics/jane.png",
  },
  {
    name: "Michael L.",
    username: "@michael",
    body: "As a marketer, I need content that connects with people. NoaiGPT helps me achieve that effortlessly.",
    img: "/assets/profile pics/jenny.png",
  },
  {
    name: "Sarah J.",
    username: "@sarah",
    body: "NoaiGPT has revolutionized my content creation process. My articles now have a truly authentic voice.",
    img: "/assets/profile pics/james.png",
  },
];

const avatarUrls = [
  "/assets/profile pics/16860528.png",
  "/assets/profile pics/20110627.jpeg",
  "/assets/profile pics/59228569.png",
  "/assets/profile pics/106103625.png",
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        "border-gray-700 bg-neutral-800 hover:bg-neutral-700",
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm text-white">{body}</blockquote>
    </figure>
  );
};

export default function CommunitySection() {
  return (
<section className="relative min-h-[70vh] w-full overflow-hidden bg-black sm:h-[90vh]">
{/* <section className="relative min-h-[70vh] w-full overflow-hidden bg-black sm:min-h-[0vh] h-[90vh]"> */}

  <div className="flex h-full flex-col items-center justify-between">
    {/* Center Content */}
    <div className="flex flex-1 flex-col items-center justify-center space-y-6 px-4 text-center sm:space-y-8">
      <h2 className="text-3xl font-bold tracking-tight text-gray-100 sm:text-4xl md:text-5xl lg:text-6xl">
        Join Our Growing Community
      </h2>
      <p className="max-w-xl text-base text-gray-300 sm:max-w-2xl sm:text-lg md:text-xl">
        Use NoaiGPT and join with 100,000+ writers crafting the future of authentic content
      </p>

    </div>
    <div className="m-4 sm:mb-8">
    <div className="transform scale-90 sm:scale-100 md:scale-110 lg:scale-125">
        <AvatarCircles numPeople={99} avatarUrls={avatarUrls} />
      </div>
    </div>

    {/* Bottom Marquee Cards */}
    <div className="relative w-full px-2 sm:px-4">
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-neutral-800 md:shadow-xl border-neutral-700">
        <Marquee pauseOnHover className="[--duration:20s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]">
          {secondRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-black"></div>
      </div>
    </div>
  </div>
</section>


  );
}
