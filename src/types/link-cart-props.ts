export type LinkCardProps = {
  title: string;
  description: string;
  image:
    | {
        url: string;
      }
    | {
        url?: undefined;
      };
};
