import { useState } from 'react';
import DynamicTabList from './DynamicTabList';

export default function SeasonTimeline() {
    const [activeId, setActiveId] = useState<string | null>(null);

    const seasonGroups = [
        {
            id: 'preseason-group',
            label: 'Preseason',
            abbreviation: 'Preseason',
            items: [
                {
                    id: 'preseason',
                    label: 'Preseason',
                    abbreviation: 'Preseason',
                },
            ],
            expandable: false, // Single item, don't expand
        },
        {
            id: 'regular-season-group',
            label: 'Regular Season',
            abbreviation: 'Reg',
            items: [
                ...Array.from({ length: 16 }, (_, i) => ({
                    id: `week${i}`,
                    label: `Week ${i}`,
                    abbreviation: `W${i}`,
                })),
                {
                    id: 'conf-championship',
                    label: 'Conf Champ',
                    abbreviation: 'CC',
                },
            ],
        },
        {
            id: 'bowl-season-group',
            label: 'Bowl Season',
            abbreviation: 'Bowl',
            items: [
                { id: 'bowl-week-1', label: 'Bowl Week 1', abbreviation: 'B1' },
                { id: 'bowl-week-2', label: 'Bowl Week 2', abbreviation: 'B2' },
                { id: 'bowl-week-3', label: 'Bowl Week 3', abbreviation: 'B3' },
                { id: 'bowl-week-4', label: 'Bowl Week 4', abbreviation: 'B4' },
                {
                    id: 'national-championship',
                    label: 'National Championship',
                    abbreviation: 'NC',
                },
            ],
        },
        {
            id: 'post-season-group',
            label: 'Post Season',
            abbreviation: 'Post',
            items: [
                {
                    id: 'end-of-season',
                    label: 'End of Season',
                    abbreviation: 'End',
                },
                {
                    id: 'players-leaving',
                    label: 'Players Leaving',
                    abbreviation: 'PL',
                },
            ],
        },
        {
            id: 'offseason-group',
            label: 'Offseason',
            abbreviation: 'Off',
            items: [
                {
                    id: 'offseason-recruiting',
                    label: 'Offseason Recruiting',
                    abbreviation: 'Rec',
                },
                {
                    id: 'signing-day',
                    label: 'Signing Day',
                    abbreviation: 'Sign',
                },
                { id: 'training', label: 'Training', abbreviation: 'Train' },
                { id: 'offseason', label: 'Offseason', abbreviation: 'Off' },
            ],
        },
    ];

    const handleItemClick = (itemId: string, groupId: string) => {
        setActiveId(itemId);
        console.log(`Selected item: ${itemId} from group: ${groupId}`);
    };

    return (
        <div className="w-full">
            <DynamicTabList
                groups={seasonGroups}
                activeId={activeId}
                onItemClick={handleItemClick}
            />
        </div>
    );
}
