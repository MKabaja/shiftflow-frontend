export function getInitials(fullName: string) {
  const nameAndSurname: string[] = fullName.split(' ').filter(Boolean);
  const [name] = nameAndSurname;
  const surname = nameAndSurname.at(-1);

  if (!name || !surname) return '??';
  return (name.charAt(0) + surname.charAt(0)).toUpperCase();
}
