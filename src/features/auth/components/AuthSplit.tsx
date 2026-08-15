import type { ReactNode } from 'react';
import { Card } from '@/shared/components/Card';

type AuthSplitProps = {
  image: string;
  children: ReactNode;
};

function AuthSplit({ image, children }: AuthSplitProps) {
  return (
    <Card
      variant="auth"
      className="grid w-full overflow-hidden p-0 lg:min-h-[30rem] lg:grid-cols-2"
    >
      <div
        aria-hidden
        style={{ backgroundImage: `url(${image})` }}
        className="h-[26vh] min-h-32 mask-[linear-gradient(to_bottom,black_65%,transparent)] bg-cover bg-center lg:h-auto lg:mask-[linear-gradient(to_right,black_85%,transparent)]"
      />

      <div className="flex flex-col justify-center p-8 lg:px-16 lg:py-12">{children}</div>
    </Card>
  );
}

export { AuthSplit };
