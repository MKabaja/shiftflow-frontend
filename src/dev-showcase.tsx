import { useState } from 'react';
import { Badge } from '@/shared/components/Badge/Badge.tsx';
import { Spinner } from '@/shared/components/Spinner/Spinner.tsx';
import { Avatar } from '@/shared/components/Avatar/Avatar.tsx';
import { Skeleton } from '@/shared/components/Skeleton/Skeleton.tsx';
import { Toggle } from '@/shared/components/Toggle/Toggle.tsx';
import { Button } from '@/shared/components/Button/Button.tsx';
import { Input } from '@/shared/components/Input/Input.tsx';
import { Card } from '@/shared/components/Card/Card.tsx';
import { PinInput } from '@/shared/components/PinInput/PinInput.tsx';
import { ColorPicker } from '@/shared/components/ColorPicker/ColorPicker.tsx';
import { Eye, EyeOff, Search } from 'lucide-react';

function ToggleDemo() {
  const [a, setA] = useState(false);
  const [b, setB] = useState(true);
  const [c, setC] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <Toggle
        checked={a}
        onChange={setA}
        label="Powiadomienia"
        description="Otrzymuj alerty o zmianach w grafiku"
        size="md"
      />
      <Toggle
        checked={b}
        onChange={setB}
        label="Pokaż weekendy"
        size="md"
      />
      <Toggle
        checked={c}
        onChange={setC}
        label="Tylko ja"
        size="sm"
      />
      <Toggle
        checked={true}
        onChange={() => {}}
        label="Zablokowany (disabled)"
        disabled
      />
    </div>
  );
}

function PinInputDemo() {
  const [pin, setPin] = useState('');
  const [completed, setCompleted] = useState('');

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <span className="text-body-sm text-text-muted">Domyślny (4, maskowany)</span>
        <PinInput
          autoFocus={false}
          onChange={setPin}
          onComplete={setCompleted}
        />
        <span className="text-body-sm text-text-muted">
          value: {pin || '—'} · complete: {completed || '—'}
        </span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-body-sm text-text-muted">Błąd (error)</span>
        <PinInput
          autoFocus={false}
          error
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-body-sm text-text-muted">Wyłączony (disabled)</span>
        <PinInput
          autoFocus={false}
          disabled
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-body-sm text-text-muted">Dłuższy (length=6)</span>
        <PinInput
          autoFocus={false}
          length={6}
        />
      </div>
    </div>
  );
}

function ColorPickerDemo() {
  const [color, setColor] = useState('#C9A347');

  return (
    <div className="grid w-full max-w-3xl grid-cols-2 gap-8">
      <div className="flex flex-col items-center gap-2">
        <span className="text-body-sm text-text-muted">Domyślny (controlled)</span>
        <ColorPicker
          label="Kolor pozycji"
          value={color}
          onChange={setColor}
        />
        <span className="text-body-sm text-text-muted">value: {color}</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-body-sm text-text-muted">Błąd (error)</span>
        <ColorPicker
          label="Kolor pozycji"
          value={color}
          onChange={setColor}
          error="Wybierz kolor"
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-body-sm text-text-muted">Wyłączony (disabled)</span>
        <ColorPicker
          label="Kolor pozycji"
          value={color}
          onChange={setColor}
          disabled
        />
      </div>
    </div>
  );
}

export function DevShowcase() {
  return (
    <div className="min-h-screen space-y-12 p-8">
      <h1 className="font-display text-accent text-2xl">Dev Showcase</h1>
      <section className="bg-bg-offset flex w-full flex-col items-center justify-center space-y-6 px-2 py-5">
        <h2 className="border-border w-full border-b text-2xl">Badge</h2>
        <div className="flex flex-row flex-wrap items-center gap-3">
          <Badge variant="default">Default</Badge>
          <Badge variant="accent">Accent</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="danger">Danger</Badge>
          <Badge variant="info">Info</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
        <div className="flex flex-row flex-wrap items-center gap-3">
          <Badge
            variant="default"
            size="md"
          >
            Default
          </Badge>
          <Badge
            variant="accent"
            size="md"
          >
            Accent
          </Badge>
          <Badge
            variant="success"
            size="md"
          >
            Success
          </Badge>
          <Badge
            variant="warning"
            size="md"
          >
            Warning
          </Badge>
          <Badge
            variant="danger"
            size="md"
          >
            Danger
          </Badge>
          <Badge
            variant="info"
            size="md"
          >
            Info
          </Badge>
          <Badge
            variant="outline"
            size="md"
          >
            Outline
          </Badge>
        </div>
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
                  className="h-10 w-10"
                />
                <Skeleton
                  variant="text"
                  className="h-10 w-20"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg-offset flex w-full flex-col items-center justify-center space-y-6 px-2 py-5">
        <h2 className="border-border w-full border-b text-2xl">Toggle</h2>
        <ToggleDemo />
      </section>
      <section className="bg-bg-offset flex w-full flex-col items-center justify-center space-y-6 px-2 py-5">
        <h2 className="border-border w-full border-b text-2xl">Button</h2>
        <Button>Acent</Button>
        <Button
          variant="danger"
          size="md"
        >
          Danger
        </Button>
        <Button
          variant="ghost"
          size="lg"
        >
          Ghost
        </Button>
        <Button variant="secondary">Secondaryz</Button>
        <Button
          variant="secondary"
          isLoading={true}
        >
          Spinner
        </Button>
      </section>
      <section className="bg-bg-offset flex w-full flex-col items-center justify-center space-y-6 px-2 py-5">
        <h2 className="border-border w-full border-b text-2xl">Skeleton</h2>
        <div className="grid grid-cols-2 gap-6">
          <Input
            label="normal"
            placeholder=" Wpisz tekst"
          />
          <Input
            label="error"
            error={'Nieprawiłowe dane logowania'}
            // helperText={'musisz podac prawidłowe dane logowania'}
            placeholder=" Wpisz tekst"
          />
          <Input
            label="Left Icon"
            leftIcon={<Search size={16} />}
            placeholder=" szukaj..."
          />
          <Input
            label="Password (ukryte)"
            type="password"
            rightIcon={<Eye size={16} />}
            defaultValue="tajnehaslo"
          />
          <Input
            label="Password (widoczne)"
            type="text"
            rightIcon={<EyeOff size={16} />}
            defaultValue="tajnehaslo"
          />
        </div>
      </section>

      <section className="bg-bg-offset flex w-full flex-col items-center justify-center space-y-6 px-2 py-5">
        <h2 className="border-border w-full border-b text-2xl">PinInput</h2>
        <PinInputDemo />
      </section>

      <section className="bg-bg-offset flex w-full flex-col items-center justify-center space-y-6 px-2 py-5">
        <h2 className="border-border w-full border-b text-2xl">ColorPicker</h2>
        <ColorPickerDemo />
      </section>

      <section className="bg-bg-offset flex w-full flex-col items-center justify-center space-y-6 px-2 py-5">
        <h2 className="border-border w-full border-b text-2xl">Card</h2>
        <div className="grid w-full grid-cols-3 gap-6">
          <Card variant="elevated">
            <div className="flex flex-col items-start gap-4">
              <Avatar
                size="lg"
                name="Jan Kowalski"
              />
              <div className="flex flex-col gap-1">
                <h3 className="font-display text-display-sm text-text-primary">
                  Jestem pracownikiem
                </h3>
                <p className="text-body-sm text-text-muted">
                  Zaloguj się PIN-em, żeby sprawdzić swój grafik i złożyć dyspozycję.
                </p>
              </div>
              <div className="flex flex-row flex-wrap gap-2">
                <Badge variant="default">Employee</Badge>
                <Badge variant="success">Aktywny</Badge>
              </div>
              <Button variant="ghost">zaloguj jako pracownika</Button>
            </div>
          </Card>
          <Card variant="default">
            <div className="flex flex-col items-start gap-4">
              <Avatar
                size="lg"
                name="Anna Nowak"
              />
              <div className="flex flex-col gap-1">
                <h3 className="font-display text-display-sm text-text-primary">
                  Jestem przełożonym
                </h3>
                <p className="text-body-sm text-text-muted">
                  Zaloguj się loginem i hasłem, żeby zarządzać grafikiem i pracownikami.
                </p>
              </div>
              <div className="flex flex-row flex-wrap gap-2">
                <Badge variant="accent">Manager</Badge>
                <Badge variant="outline">Admin</Badge>
              </div>
              <Button variant="primary">zaloguj jako przełożony</Button>
            </div>
          </Card>
          <Card
            variant="default"
            interactive
            className="w-full"
          >
            <div className="flex flex-row items-center justify-between gap-4">
              <div className="flex flex-row items-center gap-3">
                <Avatar
                  size="md"
                  name="Piotr Zator"
                />
                <div className="flex flex-col">
                  <span className="text-body-md text-text-primary font-medium">Piotr Zator</span>
                  <span className="text-body-sm text-text-muted">
                    Magazynier · zmiana 6:00-14:00
                  </span>
                </div>
              </div>
              <Badge variant="warning">Oczekuje</Badge>
              <Button
                variant="secondary"
                className="w-40"
              >
                Szczegóły zmiany
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
