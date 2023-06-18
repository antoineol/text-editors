import { OutputBlockData } from "@editorjs/editorjs";

export interface LinkToolMeta {
  title: string;
  site_name: string;
  description: string;
  image: {
    url: string;
  };
}

interface LinkToolData {
  link: string;
  meta: LinkToolMeta;
}

export function linkToolParser(
  block: OutputBlockData<"linkTool", LinkToolData>
) {
  const { link, meta } = block.data || {};
  const { title, site_name, description, image } = meta || {};
  const { url } = image || {};

  return `<a href="${link}" data-preview data-site_name="${site_name}" data-description="${description}" data-image="${url}">${title}</a>`;
}
