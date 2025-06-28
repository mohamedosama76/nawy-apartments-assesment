interface ErrorDisplayProps {
  message: string;
}

export function ErrorDisplay({ message }: ErrorDisplayProps) {
  return (
    <div className="bg-red-50 dark:bg-red-900 p-4 rounded text-red-700 dark:text-red-200">
      {message}
    </div>
  );
}
