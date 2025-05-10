import { Button } from "../ui/button";

export default function HomeSelectionButton({ icon, name, onClick }) {
  return (
    <Button
      variant="ghost2"
      className="flex w-full flex-row justify-start space-x-2"
      onClick={onClick}
    >
      {icon}
      <div className="text-sm leading-none font-medium">{name}</div>
    </Button>
  );
}
