import "./spin-loading.css";
interface SpinLoadingProps {
  color: string;
  width: number;
  height: number;
}
const SpinLoading = ({ color, width, height }: SpinLoadingProps) => {
  return (
    <>
      <svg
        className="spinner"
        viewBox="0 0 50 50"
        stroke={color}
        width={width}
        height={height}
      >
        <circle
          className="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke-width="5"
        ></circle>
      </svg>
    </>
  );
};

export default SpinLoading;
