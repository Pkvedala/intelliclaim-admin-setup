
import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const BackToHomeButton = () => {
  return (
    <Button variant="outline" asChild className="flex items-center gap-2">
      <Link to="/">
        <Home className="h-4 w-4" />
        Back to Home
      </Link>
    </Button>
  );
};

export default BackToHomeButton;
