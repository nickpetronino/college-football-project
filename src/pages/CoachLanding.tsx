import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCoachPlaythroughId } from '../utils/coachPlaythrough';

export default function CoachLanding() {
    const [showCareerOptions, setShowCareerOptions] = useState(false);
    const navigate = useNavigate();

    const handleCreateNew = () => {
        setShowCareerOptions(true);
        const coachId = createCoachPlaythroughId();
        navigate(`/${coachId}/setup`);
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center px-6 py-10">
            <div className="w-full max-w-4xl rounded-[32px] border border-amber-400/40 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 px-10 py-12 shadow-[0_30px_60px_rgba(15,23,42,0.7)]">
                <div className="space-y-4 text-center text-slate-100">
                    <p className="text-xs font-semibold uppercase tracking-[0.5em] text-amber-300">
                        COACHING CAREER
                    </p>
                    <h1 className="text-4xl font-extrabold">Coach Mode</h1>
                    <p className="text-base text-slate-300">
                        Choose how you want to enter the sideline: launch a new journey
                        or resume a previous dynasty. For now the new career path is wired
                        up.
                    </p>
                </div>

                <div className="mt-10 flex flex-col gap-6 md:flex-row">
                    <div className="flex flex-col flex-1 items-stretch gap-4 rounded-3xl border border-amber-500/40 bg-gradient-to-br from-amber-500/20 via-amber-400/20 to-transparent p-6 shadow-[0_25px_50px_rgba(234,179,8,0.25)]">
                        <h2 className="text-lg font-semibold text-white">Create New Career</h2>
                        <p className="text-sm leading-relaxed text-slate-200">
                            Start fresh with a new program, build depth charts, craft a
                            signing class, and carry your legacy across seasons.
                        </p>
                        <button
                            onClick={handleCreateNew}
                            className="mt-4 rounded-full border border-white/30 bg-white text-sm font-semibold uppercase tracking-wide text-slate-900 shadow-lg transition hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(255,255,255,0.35)]"
                        >
                            Begin New Dynasty
                        </button>
                    </div>

                    <div className="flex flex-1 overflow-hidden">
                        <div
                            className={`flex flex-1 flex-col gap-4 transition-transform duration-500 ease-out ${
                                showCareerOptions
                                    ? 'translate-x-0 opacity-100'
                                    : 'translate-x-full opacity-0 pointer-events-none'
                            }`}
                        >
                            <div className="flex-1 rounded-3xl border border-dashed border-slate-600 bg-slate-800/50 p-5 text-slate-400">
                                <p className="text-lg font-semibold text-slate-100">
                                    Continue Last Career
                                </p>
                                <p className="text-sm text-slate-400">
                                    Slot reserved here for a quick continue card once we track the
                                    most recent save state.
                                </p>
                            </div>
                            <div className="flex-1 rounded-3xl border border-dashed border-slate-600 bg-slate-800/50 p-5 text-slate-400">
                                <p className="text-lg font-semibold text-slate-100">Load Career</p>
                                <p className="text-sm text-slate-400">
                                    Placeholder for selecting an existing coaching save file.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

