// // /** @type {import('tailwindcss').Config} */
// // module.exports = {
// //   content: [
// //     './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
// //     './src/components/**/*.{js,ts,jsx,tsx,mdx}',
// //     './src/app/**/*.{js,ts,jsx,tsx,mdx}',
// //   ],
// //   theme: {
// //     extend: {
// //       backgroundImage: {
// //         'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
// //         'gradient-conic':
// //           'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
// //       },
// //     },
// //   },
// //   plugins: [require("daisyui")],
// //   daisyui: {
// //     themes: [
// //       {
// //         light: {
// //           ...require("daisyui/src/theming/themes")["[data-theme=light]"],
// //           "neutral": "#cfd8e3",
// //           "neutral-focus": "#3e4854",
// //           "neutral-content": "white",
// //         },
// //       },
// //       {
// //         dark: {
// //           ...require("daisyui/src/theming/themes")["[data-theme=dark]"],
// //           "neutral-content": "bg-gray-600",
// //         },
// //       },
// //     ],
// //   },
// // }


// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
//     './src/components/**/*.{js,ts,jsx,tsx,mdx}',
//     './src/app/**/*.{js,ts,jsx,tsx,mdx}',
//   ],
//   theme: {
//     extend: {
//       backgroundImage: {
//         'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
//         'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
//       },
//     },
//   },
//   plugins: [require("daisyui")],
//   daisyui: {
//     themes: [
//       {
//         light: {
//           ...require("daisyui/src/theming/themes")["[data-theme=light]"],
//           "primary": "#000000",
//           "primary-focus": "#1a1a1a",
//           "primary-content": "#ffffff",
//           "secondary": "#ffffff",
//           "secondary-focus": "#f2f2f2",
//           "secondary-content": "#000000",
//           "accent": "#000000",
//           "accent-focus": "#1a1a1a",
//           "accent-content": "#ffffff",
//           "neutral": "#f2f2f2",
//           "neutral-focus": "#e6e6e6",
//           "neutral-content": "#000000",
//           "base-100": "rgba(255, 255, 255, 0.7)",
//           "base-200": "rgba(255, 255, 255, 0.6)",
//           "base-300": "rgba(255, 255, 255, 0.5)",
//           "base-content": "#000000",
//         },
//       },
//       {
//         dark: {
//           ...require("daisyui/src/theming/themes")["[data-theme=dark]"],
//           "primary": "#ffffff",
//           "primary-focus": "#f2f2f2",
//           "primary-content": "#000000",
//           "secondary": "#000000",
//           "secondary-focus": "#1a1a1a",
//           "secondary-content": "#ffffff",
//           "accent": "#ffffff",
//           "accent-focus": "#f2f2f2",
//           "accent-content": "#000000",
//           "neutral": "#1a1a1a",
//           "neutral-focus": "#000000",
//           "neutral-content": "#ffffff",
//           "base-100": "rgba(0, 0, 0, 0.7)",
//           "base-200": "rgba(0, 0, 0, 0.6)",
//           "base-300": "rgba(0, 0, 0, 0.5)",
//           "base-content": "#ffffff",
//         },
//       },
//     ],
//   },
// }

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["[data-theme=light]"],
          "primary": "#000000",
          "primary-focus": "#1a1a1a",
          "primary-content": "#f5f5f5", // Off-white
          "secondary": "#f5f5f5", // Off-white
          "secondary-focus": "#ebebeb", // Off-white
          "secondary-content": "#000000",
          "accent": "#000000",
          "accent-focus": "#1a1a1a",
          "accent-content": "#f5f5f5", // Off-white
          "neutral": "#ebebeb", // Off-white
          "neutral-focus": "#d9d9d9", // Off-white
          "neutral-content": "#000000",
          "base-100": "rgba(245, 245, 245, 0.7)", // Off-white with transparency
          "base-200": "rgba(245, 245, 245, 0.6)", // Off-white with transparency
          "base-300": "rgba(245, 245, 245, 0.5)", // Off-white with transparency
          "base-content": "#000000",
        },
      },
      {
        dark: {
          ...require("daisyui/src/theming/themes")["[data-theme=dark]"],
          "primary": "#f5f5f5", // Off-white
          "primary-focus": "#ebebeb", // Off-white
          "primary-content": "#000000",
          "secondary": "#000000",
          "secondary-focus": "#1a1a1a",
          "secondary-content": "#f5f5f5", // Off-white
          "accent": "#f5f5f5", // Off-white
          "accent-focus": "#ebebeb", // Off-white
          "accent-content": "#000000",
          "neutral": "#1a1a1a",
          "neutral-focus": "#000000",
          "neutral-content": "#f5f5f5", // Off-white
          "base-100": "rgba(0, 0, 0, 0.7)",
          "base-200": "rgba(0, 0, 0, 0.6)",
          "base-300": "rgba(0, 0, 0, 0.5)",
          "base-content": "#f5f5f5", // Off-white
        },
      },
    ],
  },
}