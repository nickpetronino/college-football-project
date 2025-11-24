import { useParams } from 'react-router-dom';
import Schedule from '../components/Schedule';
import SeasonTimeline from '../components/SeasonTimeline';

export default function SeasonPhase() {
    const { phaseId } = useParams<{ phaseId: string }>();

    const getPhaseContent = (phase: string) => {
        switch (phase) {
            case 'preseason':
                return {
                    title: 'Preseason',
                    description:
                        'Preparation and training for the upcoming season',
                    activities: [
                        'Training Camp',
                        'Scrimmages',
                        'Team Building',
                        'Conditioning',
                    ],
                };
            case 'end-of-season':
                return {
                    title: 'End of Season',
                    description: 'Season wrap-up and evaluation',
                    activities: [
                        'Season Review',
                        'Player Evaluations',
                        'Awards Ceremony',
                        'Team Meeting',
                    ],
                };
            case 'players-leaving':
                return {
                    title: 'Players Leaving',
                    description: 'Graduating seniors and transfers',
                    activities: [
                        'Graduation Ceremony',
                        'Transfer Portal',
                        'NFL Draft Preparation',
                        'Alumni Network',
                    ],
                };
            case 'offseason-recruiting':
                return {
                    title: 'Offseason Recruiting',
                    description: 'Building the future of the program',
                    activities: [
                        'High School Visits',
                        'Recruiting Events',
                        'Scholarship Offers',
                        'Commitment Ceremonies',
                    ],
                };
            case 'signing-day':
                return {
                    title: 'Signing Day',
                    description: 'National Signing Day celebrations',
                    activities: [
                        'Letter of Intent Signing',
                        'Press Conferences',
                        'Recruit Announcements',
                        'Team Building',
                    ],
                };
            case 'training':
                return {
                    title: 'Training',
                    description: 'Offseason conditioning and skill development',
                    activities: [
                        'Weight Training',
                        'Skill Development',
                        'Film Study',
                        'Team Drills',
                    ],
                };
            case 'offseason':
                return {
                    title: 'Offseason',
                    description: 'Rest and recovery period',
                    activities: [
                        'Rest Period',
                        'Injury Recovery',
                        'Academic Focus',
                        'Personal Development',
                    ],
                };
            default:
                return {
                    title: 'Season Phase',
                    description: 'Current phase of the season',
                    activities: [
                        'Activities',
                        'Events',
                        'Training',
                        'Development',
                    ],
                };
        }
    };

    const content = getPhaseContent(phaseId || '');

    const isPreseason = phaseId === 'preseason';

    return (
        <div className="space-y-6 p-6">
            <SeasonTimeline />
            {isPreseason ? (
                <Schedule />
            ) : (
                <div>
                    <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                        {content.title}
                    </h1>

                    <div className="mb-6">
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                            {content.description}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {content.activities.map((activity, index) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                            >
                                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
                                    {activity}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {activity === 'Training Camp' &&
                                        'Intensive preparation and team bonding'}
                                    {activity === 'Scrimmages' &&
                                        'Practice games to test strategies'}
                                    {activity === 'Team Building' &&
                                        'Activities to strengthen team chemistry'}
                                    {activity === 'Conditioning' &&
                                        'Physical fitness and endurance training'}
                                    {activity === 'Season Review' &&
                                        'Analysis of performance and statistics'}
                                    {activity === 'Player Evaluations' &&
                                        'Individual player assessments'}
                                    {activity === 'Awards Ceremony' &&
                                        'Recognition of outstanding performances'}
                                    {activity === 'Team Meeting' &&
                                        'Final team gathering and planning'}
                                    {activity === 'Graduation Ceremony' &&
                                        'Celebrating graduating seniors'}
                                    {activity === 'Transfer Portal' &&
                                        'Players entering transfer portal'}
                                    {activity === 'NFL Draft Preparation' &&
                                        'Preparing eligible players for NFL'}
                                    {activity === 'Alumni Network' &&
                                        'Connecting with former players'}
                                    {activity === 'High School Visits' &&
                                        'Scouting and recruiting visits'}
                                    {activity === 'Recruiting Events' &&
                                        'Organized recruiting activities'}
                                    {activity === 'Scholarship Offers' &&
                                        'Extending scholarship opportunities'}
                                    {activity === 'Commitment Ceremonies' &&
                                        'Celebrating new commitments'}
                                    {activity === 'Letter of Intent Signing' &&
                                        'Official commitment signing'}
                                    {activity === 'Press Conferences' &&
                                        'Media events and announcements'}
                                    {activity === 'Recruit Announcements' &&
                                        'Public commitment announcements'}
                                    {activity === 'Weight Training' &&
                                        'Strength and conditioning program'}
                                    {activity === 'Skill Development' &&
                                        'Position-specific training'}
                                    {activity === 'Film Study' &&
                                        'Game film analysis and strategy'}
                                    {activity === 'Team Drills' &&
                                        'Group practice sessions'}
                                    {activity === 'Rest Period' &&
                                        'Recovery and relaxation time'}
                                    {activity === 'Injury Recovery' &&
                                        'Rehabilitation and healing'}
                                    {activity === 'Academic Focus' &&
                                        'Emphasis on academic performance'}
                                    {activity === 'Personal Development' &&
                                        'Individual growth and improvement'}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
