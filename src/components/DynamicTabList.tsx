import { useState } from 'react';

interface ButtonItem {
    id: string;
    label: string;
    abbreviation: string;
}

interface ButtonGroupConfig {
    id: string;
    label: string;
    abbreviation: string;
    items: ButtonItem[];
    expandable?: boolean; // If false, always shows as a single button
}

interface DynamicTabListProps {
    groups: ButtonGroupConfig[];
    activeId?: string | null;
    onItemClick?: (itemId: string, groupId: string) => void;
}

export default function DynamicTabList({
    groups,
    activeId = null,
    onItemClick,
}: DynamicTabListProps) {
    const [expandedGroupId, setExpandedGroupId] = useState<string | null>(null);

    const handleGroupClick = (groupId: string, hasMultipleItems: boolean) => {
        const group = groups.find((g) => g.id === groupId);

        if (!group) return;

        // Always select the first item in the group
        if (group.items.length > 0) {
            onItemClick?.(group.items[0].id, groupId);
        }

        // If it has multiple items, toggle expansion
        if (hasMultipleItems) {
            if (expandedGroupId === groupId) {
                setExpandedGroupId(null);
            } else {
                setExpandedGroupId(groupId);
            }
        }
    };

    const handleChildClick = (
        itemId: string,
        groupId: string,
        e: React.MouseEvent
    ) => {
        e.stopPropagation();
        onItemClick?.(itemId, groupId);
    };

    const isGroupActive = (group: ButtonGroupConfig) => {
        return group.items.some((item) => item.id === activeId);
    };

    return (
        <div className="flex flex-row gap-0 overflow-x-auto overflow-y-hidden py-2 px-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800">
            <div className="flex flex-row w-full">
                {groups.map((group) => {
                    const isExpanded = expandedGroupId === group.id;
                    const hasMultipleItems =
                        group.items.length > 1 && group.expandable !== false;
                    const isActive = isGroupActive(group);

                    return (
                        <div
                            key={group.id}
                            className={`
                                flex flex-row flex-1
                                transition-all duration-300 ease-in-out
                                ${
                                    isExpanded || isActive
                                        ? 'border-2 border-blue-400 dark:border-blue-500 rounded'
                                        : ''
                                }
                            `}
                        >
                            {!isExpanded ? (
                                // Collapsed state: show group button
                                <div
                                    className={`
                                        flex-1 px-3 py-2 cursor-pointer
                                        transition-all duration-300 ease-in-out
                                        text-center font-medium text-sm
                                        border-l border-gray-300 dark:border-gray-600
                                        first:border-l-0
                                        hover:bg-gray-100 dark:hover:bg-gray-700
                                        select-none
                                        ${
                                            isActive
                                                ? 'bg-blue-500 text-white hover:bg-blue-600 font-semibold'
                                                : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200'
                                        }
                                    `}
                                    onClick={() =>
                                        handleGroupClick(
                                            group.id,
                                            hasMultipleItems
                                        )
                                    }
                                >
                                    {group.abbreviation}
                                </div>
                            ) : (
                                // Expanded state: show all child buttons
                                <>
                                    {group.items.map((item) => {
                                        const isChildActive =
                                            item.id === activeId;

                                        return (
                                            <div
                                                key={item.id}
                                                className={`
                                                    flex-1 px-3 py-2 cursor-pointer
                                                    transition-all duration-300 ease-in-out
                                                    text-center text-sm whitespace-nowrap
                                                    border-l border-gray-300 dark:border-gray-600
                                                    first:border-l-0
                                                // hover:bg-gray-200 dark:hover:bg-gray-600
                                                select-none
                                                    ${
                                                        isChildActive
                                                            ? 'bg-blue-500 text-white hover:bg-blue-600 font-semibold'
                                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                                                    }
                                                `}
                                                onClick={(e) =>
                                                    handleChildClick(
                                                        item.id,
                                                        group.id,
                                                        e
                                                    )
                                                }
                                            >
                                                {item.label}
                                            </div>
                                        );
                                    })}
                                </>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
