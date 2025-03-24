type postMediaType = {
  name: string;
  href: string;
};

type postMediaTypeList = postMediaType[];

export const postMedia: postMediaTypeList = [
  { name: "Qiita", href: "https://qiita.com/" },
  { name: "Zenn", href: "https://zenn.dev/" },
];
