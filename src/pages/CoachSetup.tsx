import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SchoolAutocomplete from '../components/inputs/SchoolAutocomplete';
import type { School } from '../utils/schoolApi';
import { createCoach } from '../utils/coachApi';

export default function CoachSetup() {
    const { coachId } = useParams<{ coachId: string }>();
    const navigate = useNavigate();
    const [selectedTeam, setSelectedTeam] = useState<School | null>(null);
    const [style, setStyle] = useState<'Motivator' | 'Recruiter' | 'Tactician'>(
        'Motivator'
    );
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [almaMater, setAlmaMater] = useState<School | null>(null);
    const [pipeline, setPipeline] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const styleOptions = ['Motivator', 'Recruiter', 'Tactician'] as const;

    console.log('Selected Team', selectedTeam);

    const isFormComplete =
        selectedTeam !== null &&
        firstName.trim() !== '' &&
        lastName.trim() !== '' &&
        almaMater !== null &&
        pipeline.trim() !== '';

    console.log(
        'Is form Complete?',

        selectedTeam !== null,
        firstName.trim() !== '',
        lastName.trim() !== '',
        almaMater !== null,
        pipeline.trim() !== ''
    );

    const handleBeginPlaythrough = async () => {
        if (!isFormComplete || !coachId || !selectedTeam || !almaMater) {
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            await createCoach({
                playthroughId: coachId,
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                style,
                selectedTeam: selectedTeam._id,
                almaMater: almaMater._id,
                pipeline: pipeline.trim(),
            });

            // Navigate to home page after successful creation
            // TODO: Navigate to coach dashboard/landing page when available
            navigate('/');
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Failed to create playthrough. Please try again.'
            );
            console.error('Error creating playthrough:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center gap-3">
            <button
                type="button"
                className="w-full rounded-full h-3 border-amber-200"
            >
                Custom Conferences (placeholder)
            </button>
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                Playthrough key: {coachId ?? 'Pending'}
            </p>
            <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-16 md:gap-12">
                <section className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/40 backdrop-blur-lg">
                    <div className="mt-8 space-y-6">
                        <SchoolAutocomplete
                            value={selectedTeam}
                            onChange={setSelectedTeam}
                        />

                        <div className="rounded-[28px] border border-white/10 bg-slate-900/40 p-6 backdrop-blur">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-white">
                                    Coach Details
                                </h2>
                                <span className="text-xs uppercase tracking-[0.4em] text-white/60">
                                    {style}
                                </span>
                            </div>

                            <div className="mt-6 grid gap-4 md:grid-cols-2">
                                <label className="space-y-2 text-xs uppercase tracking-[0.4em] text-white/60">
                                    <span>First Name</span>
                                    <input
                                        data-lpignore="true"
                                        type="text"
                                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40"
                                        placeholder="First name"
                                        value={firstName}
                                        onChange={(event) =>
                                            setFirstName(event.target.value)
                                        }
                                    />
                                </label>

                                <label className="space-y-2 text-xs uppercase tracking-[0.4em] text-white/60">
                                    <span>Last Name</span>
                                    <input
                                        data-lpignore="true"
                                        type="text"
                                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40"
                                        placeholder="Last name"
                                        value={lastName}
                                        onChange={(event) =>
                                            setLastName(event.target.value)
                                        }
                                    />
                                </label>
                                <label className="space-y-2 text-xs uppercase tracking-[0.4em] text-white/60">
                                    <span>Style</span>
                                    <select
                                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"
                                        value={style}
                                        onChange={(event) =>
                                            setStyle(
                                                event.target.value as
                                                    | 'Motivator'
                                                    | 'Recruiter'
                                                    | 'Tactician'
                                            )
                                        }
                                    >
                                        {styleOptions.map((option) => (
                                            <option
                                                key={option}
                                                value={option}
                                            >
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                                <label className="space-y-2 text-xs uppercase tracking-[0.4em] text-white/60">
                                    <span>Alma Mater</span>

                                    <SchoolAutocomplete
                                        value={almaMater}
                                        onChange={setAlmaMater}
                                    />
                                </label>
                            </div>

                            <label className="mt-6 space-y-2 text-xs uppercase tracking-[0.4em] text-white/60">
                                <span>Pipeline</span>
                                <input
                                    type="text"
                                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40"
                                    placeholder="Describe your recruiting pipeline"
                                    value={pipeline}
                                    onChange={(event) =>
                                        setPipeline(event.target.value)
                                    }
                                />
                            </label>
                        </div>
                    </div>
                </section>
            </div>
            {error && (
                <div className="w-1/3 max-w-5xl mx-auto rounded-lg border-2 border-red-500 bg-red-500/20 px-4 py-3 text-center text-sm text-red-200">
                    {error}
                </div>
            )}
            <button
                type="button"
                disabled={!isFormComplete || isLoading}
                onClick={handleBeginPlaythrough}
                className="w-1/3 max-w-5xl mx-auto rounded-full border-2 border-red-600 bg-red-600 px-6 py-4 text-center text-base font-semibold uppercase tracking-[0.4em] text-white transition duration-300 hover:bg-red-700 hover:border-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? 'Creating...' : 'Begin Playthrough'}
            </button>
        </div>
    );
}
