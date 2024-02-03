import { BsHouse, BsGrid3X3GapFill, BsTranslate, BsFillHouseDownFill, BsGearFill } from 'react-icons/bs';

import Home from '../../pages/Home';
import Structure from '../../pages/Structure';
import Translation from '../../pages/Translation';
import Export from '../../pages/Export';
import Settings from '../../pages/Settings';

const size = 30;

export const NAVBAR_LINKS = [
    {
        title: 'Home',
        icon: <BsHouse size={size} />,
        content: <Home />,
    },
    {
        title: 'Structure',
        icon: <BsGrid3X3GapFill size={size} />,
        content: <Structure />,
    },
    {
        title: 'Translation',
        icon: <BsTranslate size={size} />,
        content: <Translation />,
    },
    {
        title: 'Export',
        icon: <BsFillHouseDownFill size={size} />,
        content: <Export />,
    },
    {
        title: 'Settings',
        icon: <BsGearFill size={size} />,
        content: <Settings />,
        separator: true,
    },
];