import { BsHouse, BsGrid3X3GapFill, BsTranslate, BsFillHouseDownFill, BsGearFill } from 'react-icons/bs';

const size = 30;

export const NAVBAR_LINKS = [
    {
        to: '/',
        title: 'Home',
        icon: <BsHouse size={size} />,
    },
    {
        to: '/structure',
        title: 'Structure',
        icon: <BsGrid3X3GapFill size={size} />,
    },
    {
        to: '/translation',
        title: 'Translation',
        icon: <BsTranslate size={size} />,
    },
    {
        to: '/export',
        title: 'Export',
        icon: <BsFillHouseDownFill size={size} />,
    },
    {
        to: '/settings',
        title: 'Settings',
        icon: <BsGearFill size={size} />,
    },
];