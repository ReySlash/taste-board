import { IoLogoYoutube } from "react-icons/io";

type Props = {
  tutorialLink: string;
};

function YoutubeCard(props: Props) {
  const { tutorialLink } = props;
  return (
    <>
      <article className="rounded-xl">
        <div className="flex items-center gap-4 p-2">
          <div>
            <IoLogoYoutube className="w-40 h-auto" />
          </div>

          <div>
            <h3 className="text-xl font-bold"> Youtube Tutorial </h3>

            <p>
              Learn how to prepare this delicious recipe with a step-by-step
              video tutorial.
            </p>
            <a href={tutorialLink} target="_blank" className="text-blue-500">
              Watch Tutorial
            </a>
          </div>
        </div>
      </article>
    </>
  );
}

export default YoutubeCard;
