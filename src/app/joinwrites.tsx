import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";
import AvatarCircles from "@/components/ui/avatar-circles";

const reviews = [
  {
    name: "Sophia Taylor",
    username: "@sophia_t",
    body: "I was skeptical at first, but NoaiGPT exceeded my expectations. My productivity has doubled!",
    img: "/assets/profile pics/jane.png",
  },
  {
    name: "Liam O'Brien",
    username: "@liam.obrien",
    body: "NoaiGPT is a lifesaver! It's like having a personal writing assistant available 24/7.",
    img: "/assets/profile pics/jack.png",
  },
  {
    name: "Emily Chen",
    username: "@emily_chen",
    body: "The output quality is fantastic. My team relies on NoaiGPT for blog drafts and social media content.",
    img: "/assets/profile pics/jill.png",
  },
  {
    name: "Oliver Brooks",
    username: "@oliver.brooks",
    body: "This tool feels like magic! It handles even complex topics with clarity and precision.",
    img: "/assets/profile pics/john.png",
  },
  {
    name: "Maya Patel",
    username: "@maya.patel",
    body: "As a freelance writer, this tool has become my secret weapon. It's a game-changer!",
    img: "/assets/profile pics/jane.png",
  },
  {
    name: "Arjun Khanna",
    username: "@arjun.k",
    body: "I use NoaiGPT daily for creating website copy. It's reliable, fast, and easy to use.",
    img: "/assets/profile pics/jill.png",
  },
  {
    name: "Ava Simmons",
    username: "@ava_simms",
    body: "The ability to tweak the tone and style makes it so versatile. I’m hooked!",
    img: "/assets/profile pics/jack.png",
  },
  {
    name: "Jack Peterson",
    username: "@jack_peterson",
    body: "It’s been a lifesaver for my small business. Our marketing has improved tenfold.",
    img: "/assets/profile pics/john.png",
  },
  {
    name: "Ananya Gupta",
    username: "@ananya.g",
    body: "I love how customizable it is. Every output feels tailored to my needs.",
    img: "/assets/profile pics/jane.png",
  },
  {
    name: "Carlos Rivera",
    username: "@carlos.r",
    body: "As someone who isn’t a natural writer, NoaiGPT has made my life so much easier.",
    img: "/assets/profile pics/jill.png",
  },
  {
    name: "Lucas Martinez",
    username: "@lucas.m",
    body: "NoaiGPT has made content creation so simple and stress-free. I can’t imagine working without it!",
    img: "/assets/profile pics/jack.png",
  },
  {
    name: "Sophia Evans",
    username: "@sophie_evans",
    body: "The quality and speed of NoaiGPT’s output are unmatched. Highly recommended!",
    img: "/assets/profile pics/jill.png",
  },
  {
    name: "Ethan Brown",
    username: "@ethan.b",
    body: "I love how intuitive it is. It’s a joy to use and a must-have for writers.",
    img: "/assets/profile pics/jane.png",
  },
  {
    name: "Charlotte Wilson",
    username: "@charlotte_w",
    body: "Whether it's for emails or reports, NoaiGPT never fails to impress.",
    img: "/assets/profile pics/john.png",
  },
  {
    name: "Isabella Thompson",
    username: "@bella_t",
    body: "NoaiGPT has saved me so much time! My clients love the results.",
    img: "/assets/profile pics/jack.png",
  },
  {
    name: "Amelia Davis",
    username: "@amelia_d",
    body: "This tool is incredible! It’s helped me meet tight deadlines without compromising quality.",
    img: "/assets/profile pics/jill.png",
  },
  {
    name: "Daniel Clark",
    username: "@daniel.c",
    body: "NoaiGPT delivers consistent results every time. It's a writer's dream come true.",
    img: "/assets/profile pics/jane.png",
  },
  {
    name: "Grace Rodriguez",
    username: "@grace.rodriguez",
    body: "I’ve tried many tools, but this one stands out for its reliability and quality.",
    img: "/assets/profile pics/jill.png",
  },
  {
    name: "James Lewis",
    username: "@james.l",
    body: "The versatility of NoaiGPT makes it invaluable for my team’s diverse needs.",
    img: "/assets/profile pics/john.png",
  },
  {
    name: "Victoria White",
    username: "@victoria_w",
    body: "With NoaiGPT, I’ve been able to focus more on strategy and less on content creation.",
    img: "/assets/profile pics/jack.png",
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
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img
          className="rounded-full"
          width="32"
          height="32"
          alt={`${name}'s profile picture`}
          src={img}
        />
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
      <div className="flex h-full flex-col items-center justify-between">
        {/* Center Content */}
        <div className="flex flex-1 flex-col items-center justify-center space-y-6 px-4 text-center sm:space-y-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-100 sm:text-4xl md:text-5xl lg:text-6xl">
            Join Our Growing Community
          </h2>
          <p className="max-w-xl text-base text-gray-300 sm:max-w-2xl sm:text-lg md:text-xl">
            Use NoaiGPT and join with 100,000+ writers crafting the future of
            authentic content
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
