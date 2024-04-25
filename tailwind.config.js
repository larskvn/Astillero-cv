// tailwind.config.js
const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        490: "490px",
        999: "999px",
        100: "100%"
      },
      height:{
        35:"35rem"
      }
    },
    colors: {
      'COLOR-CV-F2F4F3':'#F2F4F3',
      'COLOR-CV-F7B801':'#F7B801',
      'COLOR-CV-F64740':'#F64740',
      'COLOR-CV-292F36':'#292F36',
      'COLOR-CV-595959':'#595959',
      'COLOR-CV-INPUT': '#F4F4F5'
    

    }
  },
  darkMode: "class",
  plugins: [nextui()],
  purge: {
    options: {
      safelist: ['react-pdf__Page__annotations.annotationLayer'],
    },
  },
};

