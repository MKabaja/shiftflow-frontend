import { Badge } from '@/shared/components/Badge/Badge.tsx';

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
    </div>
  );
}
