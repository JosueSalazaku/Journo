import { Button } from './ui/button';
import axios from 'axios';

export default function DeletePostButton() {

  return (
    <Button className="bg-red-800 hover:bg-primary">
      Delete
    </Button>
  );
}
