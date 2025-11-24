import { useParams } from 'react-router-dom';
import SeasonTimeline from '../components/SeasonTimeline';

export default function GameWeek() {
    const { weekId } = useParams<{ weekId: string }>();

    return (
        <div className="space-y-6 p-6">
            <SeasonTimeline />
            <div className="space-y-6">
                <h1 className="text-2xl font-bold mb-4">
                    {weekId === 'conf-championship'
                        ? 'Conference Championship'
                        : weekId?.startsWith('bowl-week')
                        ? weekId
                              .replace('-', ' ')
                              .replace(/\b\w/g, (l) => l.toUpperCase())
                        : weekId?.replace('week', 'Week ')}
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Games Section */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                            Games
                        </h2>
                        <div className="space-y-3">
                            <div className="border-l-4 border-blue-500 pl-4 py-2">
                                <p className="font-medium text-gray-700 dark:text-gray-300">
                                    Alabama vs Georgia
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Saturday 3:30 PM
                                </p>
                            </div>
                            <div className="border-l-4 border-red-500 pl-4 py-2">
                                <p className="font-medium text-gray-700 dark:text-gray-300">
                                    Ohio State vs Michigan
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Saturday 7:00 PM
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                            Team Stats
                        </h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 dark:text-gray-400">
                                    Wins
                                </span>
                                <span className="font-semibold text-gray-800 dark:text-gray-200">
                                    8-2
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 dark:text-gray-400">
                                    Points For
                                </span>
                                <span className="font-semibold text-gray-800 dark:text-gray-200">
                                    285
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 dark:text-gray-400">
                                    Points Against
                                </span>
                                <span className="font-semibold text-gray-800 dark:text-gray-200">
                                    198
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Schedule Section */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                            Upcoming
                        </h2>
                        <div className="space-y-2">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Next:{' '}
                                {weekId === 'conf-championship'
                                    ? 'Bowl Season'
                                    : weekId?.startsWith('week')
                                    ? `Week ${
                                          parseInt(
                                              weekId.replace('week', '')
                                          ) + 1
                                      }`
                                    : 'Next Phase'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
