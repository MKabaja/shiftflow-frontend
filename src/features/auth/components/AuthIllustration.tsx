type AuthIllustrationProps = {
  src: string;
};

/**
 * Decorative illustration slot above the auth forms.
 *
 * Reserves a fixed-height area regardless of the artwork's aspect ratio, so
 * `/login` and `/login-pin` start their forms at the same vertical position and
 * the card does not jump when switching between them. The image is bounded by
 * both axes and never stretched — it scales down to fit whichever limit it hits
 * first.
 */
function AuthIllustration({ src }: AuthIllustrationProps) {
  return (
    <div className="flex h-32 items-center justify-center md:h-36">
      <img
        src={src}
        alt=""
        aria-hidden={true}
        className="block h-auto max-h-28 w-auto max-w-36 object-contain md:max-h-32 md:max-w-40"
      />
    </div>
  );
}

export { AuthIllustration };
