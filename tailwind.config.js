/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"], // Enables dark mode based on the presence of a class
	content: [
	  './pages/**/*.{ts,tsx}',
	  './components/**/*.{ts,tsx}',
	  './app/**/*.{ts,tsx}',
	  './src/**/*.{ts,tsx}',
	],
	prefix: "",
	theme: {
	  container: {
		center: true, // Changed 'true' to true for boolean
		padding: '2rem',
		screens: {
		  '2xl': '1400px'
		}
	  },
	  extend: {
		keyframes: {
		  'accordion-down': {
			from: { height: '0' },
			to: { height: 'var(--radix-accordion-content-height)' }
		  },
		  'accordion-up': {
			from: { height: 'var(--radix-accordion-content-height)' },
			to: { height: '0' }
		  },
		  gradient: {
			to: {
			  backgroundPosition: 'var(--bg-size) 0'
			}
		  },
		  rainbow: {
			'0%': { 'background-position': '0%' },
			'100%': { 'background-position': '200%' }
		  },
		  'border-beam': {
			'100%': { 'offset-distance': '100%' }
		  },
		  shine: {
			'0%': { 'background-position': '0% 0%' },
			'50%': { 'background-position': '100% 100%' },
			to: { 'background-position': '0% 0%' }
		  },
		  marquee: {
			from: { transform: 'translateX(0)' },
			to: { transform: 'translateX(calc(-100% - var(--gap)))' }
		  },
		  'marquee-vertical': {
			from: { transform: 'translateY(0)' },
			to: { transform: 'translateY(calc(-100% - var(--gap)))' }
		  },
		  'shimmer-slide': {
			to: { transform: 'translate(calc(100cqw - 100%), 0)' }
		  },
		  'spin-around': {
			'0%': { transform: 'translateZ(0) rotate(0)' },
			'15%, 35%': { transform: 'translateZ(0) rotate(90deg)' },
			'65%, 85%': { transform: 'translateZ(0) rotate(270deg)' },
			'100%': { transform: 'translateZ(0) rotate(360deg)' }
		  }
		},
		animation: {
		  'accordion-down': 'accordion-down 0.2s ease-out',
		  'accordion-up': 'accordion-up 0.2s ease-out',
		  gradient: 'gradient 8s linear infinite',
		  rainbow: 'rainbow var(--speed, 2s) infinite linear',
		  'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
		  shine: 'shine var(--duration) infinite linear',
		  marquee: 'marquee var(--duration) infinite linear',
		  'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
		  'shimmer-slide': 'shimmer-slide var(--speed) ease-in-out infinite alternate',
		  'spin-around': 'spin-around calc(var(--speed) * 2) infinite linear'
		},
		borderRadius: {
		  lg: '0.75rem', // Set custom border radius for lg
		  md: 'calc(var(--radius) - 2px)',
		  sm: 'calc(var(--radius) - 4px)'
		},
		colors: {
		  'color-1': 'hsl(var(--color-1))',
		  'color-2': 'hsl(var(--color-2))',
		  'color-3': 'hsl(var(--color-3))',
		  'color-4': 'hsl(var(--color-4))',
		  'color-5': 'hsl(var(--color-5))',
		  // Add specific colors for dark mode
		  'dark-bg': '#000000', // Pure black background
		  'dark-text': '#ffffff', // White text for dark mode
		  'dark-muted': '#A0A0A0', // Muted color for other elements
		},
	  }
	},
	plugins: [
	  require("tailwindcss-animate"),
	  require('daisyui'),
	  require('tailwind-scrollbar-hide')
	],
  }
  