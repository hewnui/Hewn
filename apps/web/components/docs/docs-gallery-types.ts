export type GalleryItem = {
  name: string;
  href: string;
  description: string;
  badge?: "new";
};

export type GalleryCategory = {
  title: string;
  blurb: string;
  items: GalleryItem[];
};
