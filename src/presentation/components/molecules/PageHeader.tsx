import { Link } from "react-router-dom";
import { Button } from "../atoms/Button";

interface PageHeaderProps {
  title: string;
  actionLabel: string;
  actionLink: string;
}

export function PageHeader({
  title,
  actionLabel,
  actionLink,
}: PageHeaderProps) {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        <Link to={actionLink}>
          <Button variant="outline" size="sm">
            {actionLabel}
          </Button>
        </Link>
      </div>
    </header>
  );
}
