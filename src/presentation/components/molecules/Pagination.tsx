import { Button } from "../atoms/Button";

interface PaginationProps {
  page: number;
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
}

export function Pagination({
  page,
  hasPrev,
  hasNext,
  onPrev,
  onNext,
}: PaginationProps) {
  return (
    <div className="flex justify-between">
      <Button disabled={!hasPrev} onClick={onPrev}>
        Previous
      </Button>
      <Button disabled={!hasNext} onClick={onNext}>
        Next
      </Button>
    </div>
  );
}
