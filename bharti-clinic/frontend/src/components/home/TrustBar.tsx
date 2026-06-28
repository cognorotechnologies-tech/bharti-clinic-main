import React, { useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';


interface StatCounterProps {
    value: number;
    suffix?: string;
    label: string;
    icon?: string;
}

const StatCounter: React.FC<StatCounterProps> = ({ value, suffix = "", label, icon }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const spring = useSpring(0, {
        mass: 1,
        stiffness: 70,
        damping: 30,
    });

    const displayValue = useTransform(spring, (current) =>
        Math.round(current).toLocaleString()
    );

    useEffect(() => {
        if (isInView) {
            spring.set(value);
        }
    }, [isInView, value, spring]);

    return (
        <motion.div 
            ref={ref} 
            className="flex flex-col items-center text-center group cursor-default"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.3 }}
        >
            {icon && (
                <motion.div 
                    className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300"
                    animate={{ rotate: [0, -5, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                    {icon}
                </motion.div>
            )}
            <div className="flex items-baseline text-4xl md:text-5xl font-display font-bold text-maroon mb-2">
                <motion.span>{displayValue}</motion.span>
                {suffix && <span className="text-lotus ml-0.5">{suffix}</span>}
            </div>
            <p className="text-xs md:text-sm font-body font-semibold uppercase tracking-widest text-charcoal/60 group-hover:text-charcoal/80 transition-colors">
                {label}
            </p>
        </motion.div>
    );
};

export const TrustBar: React.FC = () => {
    const stats = [
        { value: 15, suffix: "+", label: "Years Experience", icon: "🏆" },
        { value: 5000, suffix: "+", label: "Patients Healed", icon: "❤️" },
        { value: 20, suffix: "+", label: "Therapies", icon: "🌿" },
        { value: 100, suffix: "%", label: "Natural", icon: "✨" },
    ];

    return (
        <section className="bg-white border-b border-lotus/10 py-12 md:py-16 relative overflow-hidden">
            {/* Decorative divider line top */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-lotus/30 to-transparent" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    {stats.map((stat, index) => (
                        <StatCounter
                            key={index}
                            value={stat.value}
                            suffix={stat.suffix}
                            label={stat.label}
                            icon={stat.icon}
                        />
                    ))}
                </div>
            </div>

            {/* Decorative divider line bottom */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-lotus/30 to-transparent" />
        </section>
    );
};
