/* gmbh placeholder image */
import Image from "next/image";
import gmbhPlaceholder from "@assets/landing/gmbh-placeholder.jpeg";
import { bento } from "@components/projects/bentoGrid";

/* Product thumbnails */
import industrialLightingThumbnail from "@assets/landing/industrial-lighting-thumbnail.jpeg";
import commercialLightingThumbnail from "@assets/landing/commercial-lighting-thumbnail.jpeg";
import landscapeLightingThumbnail from "@assets/landing/landscape-lighting-thumbnail.jpeg";

/* Industries placeholder images */
import heroPlaceholder from "@assets/landing/hero-placeholder.jpeg";

export const placeholderImages = {
  bento:
    "https://s3-alpha-sig.figma.com/img/4f46/c426/f5ad01f044078edd99945e8bab0f2acc?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XqFXumeLs3RblOTDKJQqAx5yalwXwlVARkkik798K0f~DmrgHfmlf5A0t2ArVdI1yU3snpbByB6v8GUcVXhHrkkircKtl3Z96ZgFXb3jqy~GYL3UrrENPTT1Ee529GN4~sEdWFMS25qGKgvXTv4R0aA97ETAQbxAX4e9cDVQof1wNr94ohEd3Ewy73ky-geukoU1fDtn7-rYJM~MDkIkjPKomGJt50uMJAIk-C3XLHHTHNCdrHW0bzHfIYbTJdouvATOTi5837lJz82Y-8b~RDgc6yJcd2uHJrrfpDxSxIYueIO7Dx05BSBw7tjX35XBMK9hRpIMJD8Z9g~4zoKYeQ__",
  about: gmbhPlaceholder,
  industries: heroPlaceholder,
  commercial: commercialLightingThumbnail,
  industrial: industrialLightingThumbnail,
  landscape: landscapeLightingThumbnail,
  hero: "https://s3-alpha-sig.figma.com/img/10db/3c57/428de29a05785ed5cfad3479dbea94c8?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=lsKruhpVCSansftppflScKqH4GzB5q914r5moWzpflPot6DOKdTY8cYWoaDRAoZyp6bReTdCMYDTJcci--c6L0M1Bp-kYAYBJjMkg7KrY9NJRqPAIyCpTHSLVGDddcplOsa~tJlaIf14Gr5wnZ8cC5B6ZlgNkSt5abb9OWFxcXlM~hZXRzFrY41GQFKRkepsI75YtP5zHuI5Vr11Ow67fmBe6zGHkqHmh7Vgyiaep7AzbDGIQBfeDwQl6DkA6WvE-p6rXE8-TS502O3bgWnTOLLH1miEpoNcaEg26L1E-eNlsp6dVopgg5A5sogAJv9IHG6pMdASx4Mg6yIyvrWxMQ__",
};

/* data */
export const projectsData = {
  overviewSection: {
    title: "Projects",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat.",
  },

  projects: [
    {
      tag: "commercial",
      title: "Commercial Projects",
      cta: {
        name: "Load More",
        href: "#",
      },
      projects: [
        {
          name: "Forum Showroom",
          location: "Dubai, UAE",
          image: {
            src: placeholderImages.bento,
            alt: "Dubai, UAE",
          },
          href: "#",
          className: bento.lg,
        },
        {
          name: "Beach Bar Restaurant",
          location: "Jumeirah, UAE",
          image: {
            src: placeholderImages.bento,
            alt: "Dubai, UAE",
          },
          href: "#",
          className: bento.sm,
        },
        {
          name: "Cafe Capuchino",
          location: "New York, USA",
          image: {
            src: placeholderImages.bento,
            alt: "New York, USA",
          },
          href: "#",
          className: bento.sm,
        },
        {
          name: "Glicerin Bay Office",
          location: "London, UK",
          image: {
            src: placeholderImages.bento,
            alt: "London, UK",
          },
          href: "#",
          className: bento.lg,
        },
        {
          name: "Dune Conference Hall",
          location: "Dubai, UAE",
          image: {
            src: placeholderImages.bento,
            alt: "Dubai, UAE",
          },
          href: "#",
          className: bento.sm,
        },
        {
          name: "Sea Restaurant",
          location: "Tokyo, Japan",
          image: {
            src: placeholderImages.bento,
            alt: "Tokyo, Japan",
          },
          href: "#",
          className: bento.sm,
        },
      ],
    },

    {
      tag: "industrial",
      title: "Industrial Projects",
      cta: {
        name: "Load More",
        href: "#",
      },
      projects: [
        {
          name: "Forum Showroom",
          location: "Dubai, UAE",
          image: {
            src: placeholderImages.bento,
            alt: "Dubai, UAE",
          },
          href: "#",
          className: bento.sm,
        },
        {
          name: "Beach Bar Restaurant",
          location: "Jumeirah, UAE",
          image: {
            src: placeholderImages.bento,
            alt: "Dubai, UAE",
          },
          href: "#",
          className: bento.sm,
        },
        {
          name: "Cafe Capuchino",
          location: "New York, USA",
          image: {
            src: placeholderImages.bento,
            alt: "New York, USA",
          },
          href: "#",
          className: bento.lg,
        },
        {
          name: "Glicerin Bay Office",
          location: "London, UK",
          image: {
            src: placeholderImages.bento,
            alt: "London, UK",
          },
          href: "#",
          className: bento.lg,
        },
        {
          name: "Dune Conference Hall",
          location: "Dubai, UAE",
          image: {
            src: placeholderImages.bento,
            alt: "Dubai, UAE",
          },
          href: "#",
          className: bento.md,
        },
      ],
    },

    {
      tag: "landscape",
      title: "Landscape Projects",
      cta: {
        name: "Load More",
        href: "#",
      },
      projects: [
        {
          name: "Forum Showroom",
          location: "Dubai, UAE",
          image: {
            src: placeholderImages.bento,
            alt: "Dubai, UAE",
          },
          href: "#",
          className: bento.lg,
        },
        {
          name: "Beach Bar Restaurant",
          location: "Jumeirah, UAE",
          image: {
            src: placeholderImages.bento,
            alt: "Dubai, UAE",
          },
          href: "#",
          className: bento.sm,
        },
        {
          name: "Cafe Capuchino",
          location: "New York, USA",
          image: {
            src: placeholderImages.bento,
            alt: "New York, USA",
          },
          href: "#",
          className: bento.sm,
        },
        {
          name: "Glicerin Bay Office",
          location: "London, UK",
          image: {
            src: placeholderImages.bento,
            alt: "London, UK",
          },
          href: "#",
          className: bento.lg,
        },

        {
          name: "Dune Conference Hall",
          location: "Dubai, UAE",
          image: {
            src: placeholderImages.bento,
            alt: "Dubai, UAE",
          },
          href: "#",
          className: bento.md,
        },
      ],
    },
  ],
};

export const landingData = {
  heroSection: {
    title: (
      <>
        World class range of <br /> lighting solutions
      </>
    ),
    cta: {
      name: "View More",
      href: "#", // TODO: Update this link
    },
  },

  aboutSection: {
    title: ["Innovative technologies", "with care for people"],
    description:
      "Driven by the increasing demand for energy efficient lighting, Lyte Master GmbH has, Since the late 2000s been in the LED lighting market and more recently taking advantage of the rapid developments in LED technology to bring you a world class range of LED Lighting Solutions.",
    cta: {
      text: "About us",
      href: "#",
    },
    images: [
      placeholderImages.about,
      placeholderImages.about,
      placeholderImages.about,
    ],
  },

  productsSection: {
    title: "What we offer",
    description:
      "Lorem ipsum dolor sit amet consectetur. Mi molestie amet sed eget nunc blandit. Convallis dui tincidunt venenatis aenean vitae dictum.",
    products: [
      {
        title: "Commercial Lighting",
        description:
          "Lorem ipsum dolor sit amet consectetur. Mi molestie amet sed eget nunc blandit. Convallis dui tincidunt venenatis aenean vitae dictum.",
        cta: {
          text: "See More",
          href: "#",
        },
        thumbnail: placeholderImages.commercial,
        number_of_products: 23,
        highlight: {
          href: "#",
          text: "See More",
        },
      },
      {
        title: "Industrial Lighting",
        description:
          "Lorem ipsum dolor sit amet consectetur. Mi molestie amet sed eget nunc blandit. Convallis dui tincidunt venenatis aenean vitae dictum.",
        cta: {
          text: "See More",
          href: "#",
        },
        thumbnail: placeholderImages.industrial,
        number_of_products: 15,
      },
      {
        title: "Landscape Lighting",
        description:
          "Lorem ipsum dolor sit amet consectetur. Mi molestie amet sed eget nunc blandit. Convallis dui tincidunt venenatis aenean vitae dictum.",
        cta: {
          text: "See More",
          href: "#",
        },
        thumbnail: placeholderImages.landscape,
        number_of_products: 14,
      },
    ],
    productsScroll: [
      { text: "Lighting Solutions" },
      { text: "Lighting Solutions" },
      { text: "Lighting Solutions" },
      { text: "Lighting Solutions" },
      { text: "Lighting Solutions" },
      { text: "Lighting Solutions" },
      { text: "Lighting Solutions" },
      { text: "Lighting Solutions" },
    ],
  },

  howWeWorkSection: {
    title: "How we work",
    description:
      "We work with absolute professionalism to deliver you lights with the perfect quality",
    cta: {
      text: "Order now",
      href: "#",
    },
    highlights: [
      {
        text: "Lorem ipsum dolor sit amet consectetur. Mi molestie amet sed eget nunc blandit",
      },
      {
        text: "Lorem ipsum dolor sit amet consectetur. Mi molestie amet sed eget nunc blandit",
      },
      {
        text: "Lorem ipsum dolor sit amet consectetur. Mi molestie amet sed eget nunc blandit",
      },
      {
        text: "Lorem ipsum dolor sit amet consectetur. Mi molestie amet sed eget nunc blandit",
      },
    ],
  },
  recentWorksSection: {
    title: "Our recent works",
    projects: projectsData.projects[0].projects,
  },

  newsletterSection: {
    title: (
      <span>
        Join our newsletter to stay up to date with <b>all things lighting</b>.
      </span>
    ),
    cta: {
      text: "Subscribe",
    },
  },

  contactSection: {
    title: "Would you like to discuss a project?",
    description:
      "Driven by the increasing demand for energy efficient lighting, Lyte Master GmbH has, Since the late 2000s been in the LED lighting.",
    cta: {
      text: "Contact Us",
      href: "#",
    },
  },
};
