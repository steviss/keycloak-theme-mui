import { resolve } from "path";

export const module = {
  loaders: [
    {
      test: /\.(png|woff|woff2|eot|ttf|svg|otf)$/,
      loaders: ["file-loader"],
      include: resolve(__dirname, "../"),
    },
  ],
};
