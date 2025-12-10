import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCoachPlaythroughId } from '../utils/coachPlaythrough';
import { getMostRecentCoach, type Coach } from '../utils/coachApi';
import type { School } from '../utils/schoolApi';

export default function Home() {
    const [showCoachPanel, setShowCoachPanel] = useState(false);
    const playerPanelRef = useRef<HTMLDivElement>(null);
    const coachPanelRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const [panelHeight, setPanelHeight] = useState(0);
    const [mostRecentCoach, setMostRecentCoach] = useState<Coach | null>(null);
    const [loadingCoach, setLoadingCoach] = useState(false);
    const verticalPadding = showCoachPanel ? 56 : 40;
    const cardStyle = {
        maxWidth: showCoachPanel ? 'min(1040px,100%)' : 'min(780px,100%)',
        paddingBlock: `${verticalPadding}px`,
        height: panelHeight ? `${panelHeight + verticalPadding * 2}px` : 'auto',
        transitionProperty: 'max-width,height',
    };
    const startNewDynasty = () => {
        const coachId = createCoachPlaythroughId();
        navigate(`/${coachId}/setup`);
    };

    // Load most recent coach when coach panel is shown
    useEffect(() => {
        const loadMostRecentCoach = async () => {
            if (showCoachPanel) {
                setLoadingCoach(true);
                try {
                    const coach = await getMostRecentCoach();
                    setMostRecentCoach(coach);
                } catch (err) {
                    console.error('Error loading most recent coach:', err);
                    setMostRecentCoach(null);
                } finally {
                    setLoadingCoach(false);
                }
            }
        };

        loadMostRecentCoach();
    }, [showCoachPanel]);

    const handleContinueCareer = () => {
        if (mostRecentCoach) {
            navigate(`/${mostRecentCoach.playthroughId}`);
        }
    };

    // Helper to check if school is populated
    const isSchoolPopulated = (
        school: School | string
    ): school is School => {
        return typeof school === 'object' && school !== null && '_id' in school;
    };

    useLayoutEffect(() => {
        const activeRef = showCoachPanel ? coachPanelRef : playerPanelRef;
        const node = activeRef.current;
        if (!node) {
            return;
        }

        const measure = () => {
            const height = node.scrollHeight;
            setPanelHeight((prev) =>
                Math.abs(prev - height) < 1 ? prev : height
            );
        };

        measure();
        let observer: ResizeObserver | null = null;
        if (typeof ResizeObserver !== 'undefined') {
            observer = new ResizeObserver(measure);
            observer.observe(node);
        }

        return () => {
            observer?.disconnect();
        };
    }, [showCoachPanel]);

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-6 py-12">
            <div
                className={`relative w-full rounded-[32px] border px-8 shadow-2xl transition-all duration-500 ease-out overflow-hidden ${
                    showCoachPanel
                        ? 'border-amber-400/80 bg-gradient-to-br from-amber-100 via-amber-200 to-amber-300'
                        : 'border-green-300 bg-gradient-to-br from-white via-emerald-50 to-slate-50'
                }`}
                style={cardStyle}
            >
                <div className="absolute inset-0 pointer-events-none">
                    <div
                        className={`absolute inset-x-8 top-6 h-0.5 transition-colors duration-500 ${
                            showCoachPanel
                                ? 'bg-gradient-to-r from-amber-500/80 to-transparent'
                                : 'bg-gradient-to-r from-slate-900/70 to-transparent'
                        }`}
                    />
                    <div
                        className={`absolute inset-x-8 bottom-6 h-0.5 transition-colors duration-500 ${
                            showCoachPanel
                                ? 'bg-gradient-to-r from-transparent to-amber-500/80'
                                : 'bg-gradient-to-r from-transparent to-slate-900/70'
                        }`}
                    />
                </div>

                <div className="relative w-full">
                    <div
                        ref={playerPanelRef}
                        aria-hidden={showCoachPanel}
                        className={`absolute inset-x-0 top-0 z-10 flex flex-col items-center justify-center gap-6 text-center transition-all duration-600 ease-in-out will-change-transform ${
                            showCoachPanel
                                ? 'opacity-0 scale-[0.96] -translate-y-4 blur-sm pointer-events-none'
                                : 'opacity-100 scale-100 translate-y-0 blur-0 pointer-events-auto'
                        }`}
                    >
                        <p className="text-sm font-semibold tracking-[0.5em] text-green-700">
                            COLLEGE FOOTBALL
                        </p>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">
                            Select Your Role
                        </h1>

                        <div className="mt-8 flex w-full flex-col gap-5 md:flex-row">
                            <button className="flex flex-1 flex-col items-center justify-center gap-1 rounded-full border border-emerald-500 bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-500 px-8 py-6 text-lg font-bold uppercase tracking-wide text-white shadow-[0_20px_45px_rgba(16,185,129,0.4)] transition duration-300 hover:scale-[1.04] hover:shadow-[0_25px_60px_rgba(16,185,129,0.45)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300/60">
                                <span className="text-xl leading-none">
                                    Player
                                </span>
                                <small className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-900 opacity-80">
                                    ROAD TO GLORY
                                </small>
                            </button>
                                            <button
                                                className="flex flex-1 flex-col items-center justify-center gap-1 rounded-full border border-amber-500 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-500 px-8 py-6 text-lg font-bold uppercase tracking-wide text-white shadow-[0_20px_45px_rgba(234,179,8,0.4)] transition duration-300 hover:scale-[1.04] hover:shadow-[0_25px_60px_rgba(234,179,8,0.45)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-200/60"
                                onClick={() => setShowCoachPanel(true)}
                            >
                                <span className="text-xl leading-none">
                                    Coach
                                </span>
                                <small className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-900 opacity-80">
                                    DYNASTY
                                </small>
                            </button>
                        </div>
                    </div>

                    <div
                        ref={coachPanelRef}
                        aria-hidden={!showCoachPanel}
                        className={`absolute inset-x-0 top-0 z-20 transition-all duration-600 ease-in-out will-change-transform ${
                            showCoachPanel
                                ? 'opacity-100 scale-100 translate-y-0 blur-0 pointer-events-auto'
                                : 'opacity-0 scale-[0.96] translate-y-4 blur-sm pointer-events-none'
                        }`}
                    >
                        <div
                            className={`flex flex-col gap-8 transition-[transform,opacity] duration-500 ease-out ${
                                showCoachPanel
                                    ? 'translate-x-0 opacity-100'
                                    : 'translate-x-full opacity-0'
                            }`}
                        >
                            <div className="space-y-4 text-center text-slate-900">
                                <p className="text-xs font-semibold uppercase tracking-[0.5em] text-amber-800">
                                    COACHING CAREER
                                </p>
                                <h1 className="text-4xl font-extrabold">
                                    Coach Mode
                                </h1>
                                <p className="text-base text-slate-800">
                                    Choose how you want to enter the sideline:
                                    launch a new journey or resume a previous
                                    dynasty.
                                </p>
                            </div>

                            <div className="flex flex-col gap-6 md:flex-row">
                                <div className="flex flex-col gap-6 md:flex-row">
                                    <div
                                        onClick={mostRecentCoach ? handleContinueCareer : undefined}
                                        className={`flex flex-col flex-1 items-stretch gap-4 rounded-3xl border p-6 shadow-[0_25px_50px_rgba(15,23,42,0.08)] ${
                                            mostRecentCoach
                                                ? 'border-amber-500/60 bg-gradient-to-br from-amber-500/20 via-amber-400/20 to-transparent cursor-pointer transition hover:scale-[1.02] hover:shadow-[0_30px_60px_rgba(234,179,8,0.3)]'
                                                : 'border-dashed border-slate-600 bg-slate-800/10'
                                        }`}
                                    >
                                        <p className="text-lg font-semibold text-slate-900">
                                            Continue Last Career
                                        </p>
                                        {loadingCoach ? (
                                            <p className="text-sm text-slate-800">
                                                Loading...
                                            </p>
                                        ) : mostRecentCoach ? (
                                            <div className="flex items-center gap-4">
                                                {isSchoolPopulated(mostRecentCoach.selectedTeam) &&
                                                    mostRecentCoach.selectedTeam.icon && (
                                                        <img
                                                            src={mostRecentCoach.selectedTeam.icon}
                                                            alt={mostRecentCoach.selectedTeam.name}
                                                            className="w-40 h-40 rounded flex-shrink-0"
                                                        />
                                                    )}
                                                <div className="flex flex-col justify-center">
                                                    <p className="text-lg font-semibold text-slate-900">
                                                        {mostRecentCoach.firstName}{' '}
                                                        {mostRecentCoach.lastName}
                                                    </p>
                                                    {isSchoolPopulated(mostRecentCoach.selectedTeam) && (
                                                        <p className="text-sm text-slate-700">
                                                            {mostRecentCoach.selectedTeam.name}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="text-sm text-slate-800">
                                                No previous career found. Start a new one!
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex flex-1 flex-col gap-4">
                                        <div className="flex-1 rounded-3xl border border-amber-500/40 bg-gradient-to-br from-amber-500/20 via-amber-400/20 to-transparent p-6 shadow-[0_25px_50px_rgba(234,179,8,0.25)]">
                                            <h2 className="text-lg font-semibold text-slate-900">
                                                Create New Career
                                            </h2>
                                            <p className="text-sm leading-relaxed text-slate-900">
                                                Start fresh with a new program,
                                                build depth charts, craft a
                                                signing class, and carry your
                                                legacy across seasons.
                                            </p>
                                                <button
                                                    onClick={startNewDynasty}
                                                    className="mt-4 rounded-full border w-full border-white/30 bg-white text-sm font-semibold uppercase tracking-wide text-slate-900 shadow-lg transition hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.25)]"
                                                >
                                                    Begin New Dynasty
                                                </button>
                                        </div>
                                        <div className="flex-1 rounded-3xl border border-dashed border-slate-600 bg-slate-800/10 p-5 text-slate-800">
                                            <p className="text-lg font-semibold text-slate-900">
                                                Load Career
                                            </p>
                                            <p className="text-sm text-slate-800">
                                                Placeholder for selecting an
                                                existing coaching save file.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="text-center">
                                <button
                                    onClick={() => setShowCoachPanel(false)}
                                    className="text-sm font-semibold uppercase tracking-[0.5em] text-slate-900 underline-offset-4 hover:underline"
                                >
                                    Back
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
