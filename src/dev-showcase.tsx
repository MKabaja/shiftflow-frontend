import { Badge } from '@/shared/components/Badge/Badge.tsx';
import { Spinner } from '@/shared/components/Spinner/Spinner.tsx';
import { Avatar } from '@/shared/components/Avatar/Avatar.tsx';
import { Skeleton } from '@/shared/components/Skeleton/Skeleton.tsx';

export function DevShowcase() {
  return (
    <div className="min-h-screen space-y-12 p-8">
      <h1 className="font-display text-accent text-2xl">Dev Showcase</h1>
      <section className="bg-bg-offset flex w-full flex-col items-center justify-center space-y-6 px-2 py-5">
        <h2 className="border-border w-full border-b text-2xl">Badge</h2>
        <Badge variant="default">Default</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="danger">Danger</Badge>
        <Badge
          variant="default"
          size="md"
        >
          default
        </Badge>
        <Badge
          variant="danger"
          size="md"
        >
          Danger
        </Badge>
      </section>

      <section className="bg-bg-offset flex w-full flex-col items-center justify-center space-y-6 px-2 py-5">
        <h2 className="border-border w-full border-b text-2xl">Spinner</h2>
        <div className="flex items-center gap-6">
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
        </div>
      </section>
      <section className="bg-bg-offset flex w-full flex-col items-center justify-center space-y-6 px-2 py-5">
        <h2 className="border-border w-full border-b text-2xl">Avatar</h2>
        <div className="flex items-center gap-6">
          <Avatar
            size="xs"
            name=" Mateusz Kabaja"
          />
          <Avatar
            size="sm"
            name="Katarzyna Kabaja"
          />
          <Avatar
            size="md"
            name=""
          />
          <Avatar
            size="lg"
            name="piotr zator"
          />
          <Avatar
            size="xl"
            name="mirosław gawęda"
            onClick={() => console.log('xd')}
          />
        </div>
      </section>

      <section className="bg-bg-offset flex w-full flex-col items-center justify-center space-y-6 px-2 py-5">
        <h2 className="border-border w-full border-b text-2xl">Skeleton</h2>
        <div className="flex items-center gap-6">
          <Skeleton
            variant="circle"
            width={40}
            height={40}
          />
          <Skeleton
            variant="rect"
            width={80}
            height={40}
          />
          <Skeleton
            variant="text"
            width={40}
            height={40}
          />
          <div
            role="status"
            aria-busy="true"
            aria-label="Ładowanie listy pracowników"
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex gap-2 p-2"
              >
                <Skeleton
                  variant="circle"
                  width={40}
                  height={40}
                />
                <Skeleton
                  variant="text"
                  width={160}
                  height={16}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
