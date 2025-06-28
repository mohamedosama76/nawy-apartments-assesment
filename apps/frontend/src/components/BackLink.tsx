import Link from 'next/link';

interface BackLinkProps {
  href: string;
  label: string;
}

export function BackLink({ href, label }: BackLinkProps) {
  return (
    <div className="mb-6">
      <Link href={href} className="text-primary-600 dark:text-primary-400 hover:underline">
        &larr; {label}
      </Link>
    </div>
  );
}
