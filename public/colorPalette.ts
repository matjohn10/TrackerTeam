export const colorPalette: Palette = {
  default: {
    bg: "bg-gray-900",
    fg: "text-white",
  },
};

type Palette = {
  [key: string]: {
    bg: string;
    fg: string;
  };
};
