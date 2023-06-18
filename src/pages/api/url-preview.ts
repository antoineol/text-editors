import type { NextApiRequest, NextApiResponse } from "next";
import ogs from "open-graph-scraper";
import type {
  ImageObject,
  OgObject,
  TwitterImageObject,
} from "open-graph-scraper/dist/lib/types";

import type { LinkToolMeta } from "../../../../front/src/editor/editorjs/linkToolParser";

type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object | undefined
    ? RecursivePartial<T[P]>
    : T[P];
};

// https://github.com/jshemas/openGraphScraper

type Data =
  | {
      success: 0;
      meta?: never;
    }
  | {
      success: 1;
      meta: RecursivePartial<LinkToolMeta>;
    };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let { url } = req.query;
  if (Array.isArray(url)) url = url[0];
  if (!url) {
    return res.status(400).json({
      success: 0,
    });
  }
  const options = { url };
  ogs(options)
    .then((data: any) => {
      const { error, /* html, */ result /* , response */ } = data;
      if (error) throw result;
      const {
        ogTitle,
        dcTitle,
        twitterTitle,
        ogSiteName,
        ogDescription,
        dcDescription,
        twitterDescription,
        ogImage,
        twitterImage,
        favicon,
      } = result;

      res.status(200).json({
        success: 1,
        meta: {
          title: ogTitle || dcTitle || twitterTitle || ogSiteName,
          site_name: ogSiteName,
          description: ogDescription || dcDescription || twitterDescription,
          image: {
            url: ogToImageUrl(ogImage) || ogToImageUrl(twitterImage) || favicon,
          },
          // And additional fields we want to store?
        },
      });
    })
    .catch((err: any) => {
      console.error(err);
      res.status(500).json({
        success: 0,
      });
    });
}

function ogToImageUrl(ogImage: OgObject["ogImage"] | OgObject["twitterImage"]) {
  if (!ogImage || typeof ogImage === "string") return ogImage;
  if (Array.isArray(ogImage))
    return (ogImage as (ImageObject | TwitterImageObject)[]).find(
      (i) => !!i?.url
    )?.url;
  return ogImage.url;
}
