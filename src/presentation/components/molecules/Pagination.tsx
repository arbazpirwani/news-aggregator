import { Button } from "../atoms/Button";

interface PaginationProps {
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
}

export function Pagination({
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
