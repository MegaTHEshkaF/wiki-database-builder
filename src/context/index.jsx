import { createContext } from "react";

export const StatusBarContext = createContext({
    now: 0,
    max: 100,
    text: 'Ready to go',
});