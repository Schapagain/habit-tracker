import classNames from "classnames";
import { CgSandClock } from "react-icons/cg";
import { WiLightning } from "react-icons/wi";

export default function Block({
  block,
  active,
  title,
  hoverDescription,
  footer,
  description,
  onClick,
}) {
  const mainClass = classNames(
    " relative w-1/3 h-32 min-w-32 md:w-1/4 m-2",
    "cursor-pointer rounded-lg transition-normal",
    "hover:text-white hover:bg-gray-700 bg-gray-300",
    "flex flex-col justify-between"
  );

  const hoverInfoClasses = classNames(
    "transition-opacity duration-500 ease transform opacity-0 hover:opacity-100",
    "absolute inset-0 z-30 "
  );
  return (
    <div onClick={onClick} className={mainClass}>
      <div className="h-1/6 p-1">
        <h1 className="text-sm truncate">{title}</h1>
      </div>
      <div className="relative h-5/6">
        <p className="text-xs text-gray-700 absolute inset-0 z-20">
          {description}
        </p>
        {block && (
          <p className="text-gray-700 absolute bottom-1 left-1/2 transform -translate-x-1/2 w-full text-xs z-20">
            {footer}
          </p>
        )}
        <div className={hoverInfoClasses}>
          <div className="relative w-full h-full">
            <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
              {block ? (
                <>
                  <CgSandClock className="inline-block text-2xl" />
                  <span className="text-xs">{block.donePercentage}%</span>
                </>
              ) : (
                <p className="text-xs">{hoverDescription}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      {active && <WiLightning className="absolute top-0 right-0 text-2xl" />}
    </div>
  );
}

Block.defaultProps = {
  onClick: () => null,
};
