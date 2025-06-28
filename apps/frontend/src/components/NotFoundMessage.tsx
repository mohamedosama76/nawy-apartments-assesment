interface NotFoundMessageProps {
  message: string;
}

export function NotFoundMessage({ message }: NotFoundMessageProps) {
  return <div className="text-center py-10 text-gray-500 dark:text-gray-400">{message}</div>;
}
