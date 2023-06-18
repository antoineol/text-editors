// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

// https://github.com/jshemas/openGraphScraper

type Data =
  | {
      success: 0;
      meta?: never;
    }
  | {
      success: 1;
      file: {
        url: string | undefined;
      };
    };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // let { url } = req.query;
  // if (Array.isArray(url)) url = url[0];
  // if (!url) {
  //   return res.status(400).json({
  //     success: 0,
  //   });
  // }
  res.status(200).json({
    success: 1,
    file: {
      url: "https://www.tesla.com/tesla_theme/assets/img/_vehicle_redesign/roadster_and_semi/roadster/hero.jpg",
      // ... and any additional fields you want to store, such as width, height, color, extension, etc
    },
  });
}
