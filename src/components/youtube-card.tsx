import Image from "next/image";

import { IoLogoYoutube } from "react-icons/io";

type Props = {
  tutorialLink: string;
  youtubeThumbnail?: string | null;
};

function YoutubeCard(props: Props) {
  const { tutorialLink, youtubeThumbnail } = props;
  console.log(youtubeThumbnail);
  return (
    <>
      <a href={tutorialLink} target="_blank" className="border rounded-xl">
        <article className="rounded-xl">
          <div className="flex items-center gap-4">
            <div className="relative w-30 h-30">
              {youtubeThumbnail && (
                <Image
                  className="rounded-xl"
                  src={youtubeThumbnail}
                  alt="YouTube Thumbnail"
                  fill={true}
                  sizes="120px"
                  unoptimized
                />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <IoLogoYoutube className="text-2xl" />
                <h3 className="text-xl font-bold"> Youtube Tutorial </h3>
              </div>

              <p>
                Learn how to prepare this delicious recipe with a step-by-step
                video tutorial.
              </p>
            </div>
          </div>
        </article>
      </a>
    </>
  );
}

export default YoutubeCard;
