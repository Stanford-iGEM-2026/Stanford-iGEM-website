export default function HelixIndicator({ className = '' }) {
  return (
    <span className={`helix-indicator ${className}`.trim()} aria-hidden="true">
      <svg viewBox="0 0 80 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          className="helix-indicator__strand helix-indicator__strand--a"
          d="M0 7 C8 3.5, 12 10.5, 20 7 S36 3.5, 44 7 S60 10.5, 68 7 S76 3.5, 80 7"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          className="helix-indicator__strand helix-indicator__strand--b"
          d="M0 7 C8 10.5, 12 3.5, 20 7 S36 10.5, 44 7 S60 3.5, 68 7 S76 10.5, 80 7"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  )
}
