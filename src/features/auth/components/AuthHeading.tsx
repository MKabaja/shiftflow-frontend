type AuthHeadingProps = {
	title: string;
	subtitle: string;
};

function AuthHeading({ title, subtitle }: AuthHeadingProps) {
	return (
		<hgroup className="mb-8 flex flex-col gap-1">
			<h1 className="text-display-lg lg:text-display-xl">{title}</h1>
			<p className="text-body-md text-text-muted">{subtitle}</p>
		</hgroup>
	);
}

export { AuthHeading };
