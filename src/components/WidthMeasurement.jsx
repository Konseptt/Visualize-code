/**
 * WidthMeasurement component displays the width of the code editor in pixels.
 * It shows a visual representation of the width with lines and a text label.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.showWidth - Flag to show or hide the width measurement.
 * @param {number} props.width - The width of the code editor in pixels.
 * @returns {JSX.Element} The WidthMeasurement component.
 */
export default function WidthMeasurement({ showWidth, width }) {
  return (
    <div
      className={`"w-full flex gap-2 items-center text-white transition-opacity ${showWidth ? "visible opacity-100" : "invisible opacity-0"}`}
    >
      <div className="flex-1 flex items-center">
        <div className="h-4 w-0.5 bg-white/20" />
        <div className="h-px w-full bg-white/20" />
      </div>
      <span className="text-neutral-500 text-sm">{width} px</span>
      <div className="flex-1 flex items-center">
        <div className="h-px w-full bg-white/20" />
        <div className="h-4 w-0.5 bg-white/20" />
      </div>
    </div>
  )
}
