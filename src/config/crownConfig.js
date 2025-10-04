/**
 * Crown SVG configuration for Player of the Week indicator
 * Matching DPM design with yellow background and proper positioning
 */

export const CROWN_ICON_SVG = {
  // Crown SVG path data (Lucide crown icon)
  pathData: [
    "M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z",
    "M5 21h14"
  ],
  
  // Crown styling configuration
  containerClasses: "absolute top-2 right-0 p-2 bg-yellow-400/50 border border-black/10 rounded",
  containerClassesFallback: "absolute top-1 right-1 p-1 bg-yellow-400/50 border border-black/10 rounded",
  iconClasses: "text-yellow-600",
  
  // Icon sizes
  sizes: {
    large: { width: 16, height: 16 },
    small: { width: 12, height: 12 }
  },
  
  // SVG properties
  svgProps: {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }
}

/**
 * Generate crown icon JSX element
 * @param {boolean} isLarge - Whether to use large size
 * @param {boolean} isFallback - Whether this is for fallback avatar
 * @returns {JSX.Element} Crown icon element
 */
export function CrownIcon({ isLarge = false, isFallback = false }) {
  const size = isLarge ? CROWN_ICON_SVG.sizes.large : CROWN_ICON_SVG.sizes.small
  const containerClass = isFallback ? CROWN_ICON_SVG.containerClassesFallback : CROWN_ICON_SVG.containerClasses
  
  return (
    <div className={containerClass}>
      <svg 
        {...CROWN_ICON_SVG.svgProps}
        width={size.width}
        height={size.height}
        className={CROWN_ICON_SVG.iconClasses}
      >
        {CROWN_ICON_SVG.pathData.map((path, index) => (
          <path key={index} d={path} />
        ))}
      </svg>
    </div>
  )
}
