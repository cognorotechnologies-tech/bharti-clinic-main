import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CountdownProps {
    targetDate: Date | string;
    onExpire?: () => void;
    showLabels?: boolean;
    compact?: boolean;
    className?: string;
}

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    expired: boolean;
}

function calculateTimeLeft(targetDate: Date): TimeLeft {
    const now = new Date().getTime();
    const target = targetDate.getTime();
    const difference = target - now;

    if (difference <= 0) {
        return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            expired: true,
        };
    }

    return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
        expired: false,
    };
}

export function Countdown({
    targetDate,
    onExpire,
    showLabels = true,
    compact = false,
    className = '',
}: CountdownProps) {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
        calculateTimeLeft(new Date(targetDate))
    );

    useEffect(() => {
        const target = new Date(targetDate);

        const timer = setInterval(() => {
            const newTimeLeft = calculateTimeLeft(target);
            setTimeLeft(newTimeLeft);

            if (newTimeLeft.expired && onExpire) {
                onExpire();
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate, onExpire]);

    if (timeLeft.expired) {
        return (
            <div className={`flex items-center gap-2 text-charcoal/60 ${className}`}>
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">Expired</span>
            </div>
        );
    }

    if (compact) {
        return (
            <div className={`flex items-center gap-2 ${className}`}>
                <Clock className="w-4 h-4 text-gold" />
                <span className="text-sm font-bold text-maroon">
                    {timeLeft.days > 0 && `${timeLeft.days}d `}
                    {String(timeLeft.hours).padStart(2, '0')}:
                    {String(timeLeft.minutes).padStart(2, '0')}:
                    {String(timeLeft.seconds).padStart(2, '0')}
                </span>
            </div>
        );
    }

    const timeUnits = [
        { value: timeLeft.days, label: 'Days', shortLabel: 'D' },
        { value: timeLeft.hours, label: 'Hours', shortLabel: 'H' },
        { value: timeLeft.minutes, label: 'Minutes', shortLabel: 'M' },
        { value: timeLeft.seconds, label: 'Seconds', shortLabel: 'S' },
    ];

    return (
        <div className={`flex items-center gap-3 ${className}`}>
            {timeUnits.map((unit, index) => (
                <div key={unit.label} className="flex flex-col items-center">
                    <div className="bg-maroon text-white rounded-lg px-3 py-2 min-w-[60px] text-center">
                        <span className="text-2xl font-bold font-display">
                            {String(unit.value).padStart(2, '0')}
                        </span>
                    </div>
                    {showLabels && (
                        <span className="text-xs text-charcoal/60 mt-1 font-medium">
                            {unit.label}
                        </span>
                    )}
                    {!showLabels && (
                        <span className="text-xs text-charcoal/60 mt-1 font-bold">
                            {unit.shortLabel}
                        </span>
                    )}
                </div>
            ))}
        </div>
    );
}

// Variant for inline display
export function CountdownInline({
    targetDate,
    onExpire,
    className = '',
}: Omit<CountdownProps, 'showLabels' | 'compact'>) {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
        calculateTimeLeft(new Date(targetDate))
    );

    useEffect(() => {
        const target = new Date(targetDate);

        const timer = setInterval(() => {
            const newTimeLeft = calculateTimeLeft(target);
            setTimeLeft(newTimeLeft);

            if (newTimeLeft.expired && onExpire) {
                onExpire();
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate, onExpire]);

    if (timeLeft.expired) {
        return (
            <span className={`text-charcoal/60 text-sm ${className}`}>
                Expired
            </span>
        );
    }

    const parts = [];
    if (timeLeft.days > 0) parts.push(`${timeLeft.days}d`);
    if (timeLeft.hours > 0 || timeLeft.days > 0) parts.push(`${timeLeft.hours}h`);
    if (timeLeft.minutes > 0 || timeLeft.hours > 0 || timeLeft.days > 0) {
        parts.push(`${timeLeft.minutes}m`);
    }
    parts.push(`${timeLeft.seconds}s`);

    return (
        <span className={`font-bold text-maroon ${className}`}>
            {parts.join(' ')}
        </span>
    );
}
