import * as React from 'react';
import { createRoot } from 'react-dom/client';
import Landing from '@/modules/landing';
import { Provider } from '@/store';

createRoot(document.getElementById("root")).render(<Provider><Landing /></Provider>);

