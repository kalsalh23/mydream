export function Icon({ name, size = 24, className = '' }) {
  const paths = {
    fingerprint: (
      <>
        <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4" />
        <path d="M14 12a2 2 0 0 1 2 2c0 1.02.1 2.51.26 4" />
        <path d="M10 8a5 5 0 0 1 4 0" />
        <path d="M8 10a8 8 0 0 1 8 0" />
        <path d="M6 13c0-1.6.5-3.1 1.4-4.3" />
        <path d="M18 13c0 1.6-.5 3.1-1.4 4.3" />
        <path d="M8 18c.5 2 1.5 3.5 4 3.5 1.5 0 2.6-.6 3.4-1.6" />
        <path d="M12 15a2 2 0 0 1 2 2c0 1.5-.2 3-.4 4" />
      </>
    ),
    chip: (
      <>
        <rect x="5" y="5" width="14" height="14" rx="2" />
        <rect x="10" y="10" width="4" height="4" />
        <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
      </>
    ),
    bluetooth: (
      <>
        <path d="m7 7 10 10-5 5V2l5 5L7 17" />
      </>
    ),
    gear: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z" />
      </>
    ),
    hand: (
      <>
        <path d="M18 11V6a2 2 0 0 0-4 0v5" />
        <path d="M14 10V4a2 2 0 0 0-4 0v6" />
        <path d="M10 10V6a2 2 0 0 0-4 0v8" />
        <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
      </>
    ),
    growth: (
      <>
        <path d="M22 7 13.5 15.5l-5-5L2 17" />
        <path d="M16 7h6v6" />
      </>
    ),
    plus: (
      <>
        <path d="M12 5v14M5 12h14" />
      </>
    ),
    cost: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M15.5 9.5a3.5 3.5 0 0 0-3.5-2.5c-1.93 0-3.5 1.12-3.5 2.5s1.57 2.5 3.5 2.5 3.5 1.12 3.5 2.5-1.57 2.5-3.5 2.5a3.5 3.5 0 0 1-3.5-2.5" />
        <path d="M12 5v1M12 18v1" />
      </>
    ),
    integrate: (
      <>
        <rect x="3" y="10" width="14" height="10" rx="2" />
        <rect x="9" y="4" width="14" height="10" rx="2" />
      </>
    ),
    lock: (
      <>
        <rect x="4" y="11" width="16" height="10" rx="2" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      </>
    ),
    unlock: (
      <>
        <rect x="4" y="11" width="16" height="10" rx="2" />
        <path d="M8 11V7a4 4 0 0 1 7.87-1" />
      </>
    ),
    mic: (
      <>
        <rect x="9" y="2" width="6" height="12" rx="3" />
        <path d="M5 10a7 7 0 0 0 14 0" />
        <path d="M12 19v3" />
      </>
    ),
    arrowDown: (
      <>
        <path d="M12 5v14M19 12l-7 7-7-7" />
      </>
    ),
    file: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M9 13h6M9 17h6" />
      </>
    ),
    video: (
      <>
        <rect x="2" y="6" width="13" height="12" rx="2" />
        <path d="m15 10 6-3v10l-6-3" />
      </>
    ),
    image: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="m21 15-5-5L5 21" />
      </>
    ),
    check: <path d="M20 6 9 17l-5-5" />,
    logout: (
      <>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <path d="m16 17 5-5-5-5M21 12H9" />
      </>
    ),
    users: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
    edit: (
      <>
        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      </>
    ),
    trash: (
      <>
        <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
      </>
    ),
    upload: (
      <>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
      </>
    ),
    shield: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      </>
    ),
    save: (
      <>
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z" />
        <path d="M17 21v-8H7v8M7 3v5h8" />
      </>
    ),
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name] || paths.shield}
    </svg>
  )
}