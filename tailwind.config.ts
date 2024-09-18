import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
          graySmall: {
            100: '#F5F5F7',
            200: '#FAFAFA'
          },
          blueSmall: {
            100: '#546FFF'
          },
          purpleSmall: {
            100: '#8E92BC'
          },
          blackSmall: {
            100: '#141522'
          }
        },
        screens: {
          xs: '0px', 
        },
    },
  },
  plugins: [],
};
export default config;
