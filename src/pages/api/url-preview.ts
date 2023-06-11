// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import ogs from "open-graph-scraper";
import { LinkToolMeta } from "../../components/editors/editorjs/linkToolParser";

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
  // const options = { url: "http://ogp.me/" };
  const options = { url };
  ogs(options)
    .then((data) => {
      const { error, /* html, */ result /* , response */ } = data;
      // console.log("error:", error); // This returns true or false. True if there was an error. The error itself is inside the result object.
      // console.log("html:", html); // This contains the HTML of page
      // console.log("result:", result); // This contains all of the Open Graph results
      // console.log("response:", response); // This contains response from the Fetch API
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
      console.log("ogSiteName", ogSiteName);

      res.status(200).json({
        success: 1,
        meta: {
          title: ogTitle || dcTitle || twitterTitle || ogSiteName,
          site_name: ogSiteName,
          description: ogDescription || dcDescription || twitterDescription,
          image: {
            url:
              ogImage?.find((i) => !!i?.url)?.url ||
              twitterImage?.find((i) => !!i?.url)?.url ||
              favicon,
          },
          // And additional fields we want to store?
        },
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        success: 0,
      });
    });
}
