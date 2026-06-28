import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, HeartPulse, Sparkles, Award, Quote, Users } from 'lucide-react';
import { HeroSplit } from '../components/hero/HeroSplit';
import { Button } from '../components/ui/Button';
import { SEO, SEO_CONFIGS } from '../components/SEO';

const TEAM = [
    { name: 'Dr. Ramesh Bharti', role: 'Head Physician', specialty: 'Panchakarma Expert' },
    { name: 'Dr. Anjali Bharti', role: 'Senior Consultant', specialty: 'Women Health & Skin' },
    { name: 'Dr. Vivek Sharma', role: 'Ayurveda Specialist', specialty: 'Chronic Disorders' },
];

const MILESTONES = [
    { year: '2009', title: 'The Foundation', detail: 'Bharti Clinic founded with a vision to bring pure Ayurveda to Mohali.' },
    { year: '2012', title: 'Global Centre', detail: 'Opened the region\'s first full-scale Panchakarma detoxification centre.' },
    { year: '2015', title: '10,000 Lives', detail: 'Crossed the milestone of 10,000+ satisfied patients worldwide.' },
    { year: '2019', title: 'Digital Wellness', detail: 'Launched online consultations and shipping of authentic products.' },
    { year: '2024', title: 'Modern Healing', detail: 'Voted #1 Ayurvedic Clinic for holistic healing and patient care.' },
];

export const AboutPage: React.FC = () => {
    return (
        <div className="bg-ivory/30 pb-24 font-body">
            <SEO {...SEO_CONFIGS.about} />
            {/* Hero Split */}
            <HeroSplit
                title="Healing Through Ancient Wisdom"
                subtitle="Our Story"
                description="At Bharti Clinic, we don't just treat illnesses; we restore the delicate harmony between body, mind, and spirit using the ancient wisdom of Veda."
                leftContent={
                    <div className="space-y-6">
                        <div className="inline-block px-6 py-2 rounded-full border border-maroon/20 bg-white/50 backdrop-blur-sm shadow-sm mb-4">
                            <span className="text-maroon text-xs font-bold tracking-[0.2em] uppercase">15+ Years of Authenticity</span>
                        </div>
                        <p className="text-charcoal/70 leading-relaxed text-lg">
                            Bharti Clinic was born from a deep-rooted passion to provide authentic, results-oriented Ayurvedic healthcare. We believe in treating the root cause, not just the symptoms.
                        </p>
                        <div className="grid grid-cols-3 gap-6 pt-6">
                            {[
                                { icon: Sparkles, title: 'Natural', color: 'text-lotus' },
                                { icon: HeartPulse, title: 'Holistic', color: 'text-maroon' },
                                { icon: ShieldCheck, title: 'Compassionate', color: 'text-charcoal' }
                            ].map((val, i) => (
                                <div key={i} className="text-center group">
                                    <div className={`w-12 h-12 ${val.color} bg-ivory rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                                        <val.icon className="w-6 h-6" />
                                    </div>
                                    <p className="font-bold text-xs tracking-widest uppercase">{val.title}</p>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-4 pt-4">
                            <Button variant="primary" size="lg">
                                <Users className="mr-2" size={20} />
                                Meet Our Team
                            </Button>
                            <Button variant="secondary" size="lg">
                                <Award className="mr-2" size={20} />
                                Our Credentials
                            </Button>
                        </div>
                    </div>
                }
                rightContent={
                    <div className="relative">
                        <div className="aspect-square rounded-[40px] bg-ivory overflow-hidden border-8 border-white shadow-xl">
                            <img
                                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000"
                                alt="Treatment Room"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-lotus rounded-full p-8 flex items-center justify-center text-white text-center shadow-2xl">
                            <div>
                                <p className="text-4xl font-display leading-none mb-1">15k+</p>
                                <p className="text-[10px] font-bold uppercase tracking-widest">Happy Patients</p>
                            </div>
                        </div>
                    </div>
                }
                reverse={false}
            />

            {/* Philosophy Section */}
            <section className="py-24 max-w-7xl mx-auto px-4">
                <div className="bg-white rounded-[60px] shadow-2xl shadow-maroon/5 border border-maroon/5 p-12 lg:p-24 relative overflow-hidden">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <h2 className="font-display text-4xl text-maroon mb-8 leading-tight">Authentic Ayurveda for the Modern Soul</h2>
                            <p className="text-charcoal/70 mb-8 leading-relaxed text-lg">
                                Bharti Clinic was born from a deep-rooted passion to provide authentic, results-oriented Ayurvedic healthcare. We believe in treating the root cause, not just the symptoms, ensuring long-lasting health and vitality.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                                {[
                                    { icon: Sparkles, title: 'Natural', color: 'text-lotus' },
                                    { icon: HeartPulse, title: 'Holistic', color: 'text-maroon' },
                                    { icon: ShieldCheck, title: 'Compassionate', color: 'text-charcoal' }
                                ].map((val, i) => (
                                    <div key={i} className="text-center group">
                                        <div className={`w-12 h-12 ${val.color} bg-ivory rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                                            <val.icon className="w-6 h-6" />
                                        </div>
                                        <p className="font-bold text-sm tracking-widest uppercase">{val.title}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-square rounded-[40px] bg-ivory overflow-hidden border-8 border-white shadow-xl">
                                <img
                                    src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000"
                                    alt="Treatment Room"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-lotus rounded-full p-8 flex items-center justify-center text-white text-center shadow-2xl animate-float">
                                <div>
                                    <p className="text-4xl font-display leading-none mb-1">15k+</p>
                                    <p className="text-[10px] font-bold uppercase tracking-widest">Happy Patients</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Dr. Profile */}
            <section className="py-24 bg-maroon text-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="aspect-[4/5] rounded-[50px] overflow-hidden border-4 border-white/10 relative z-10">
                            {/* Placeholder for Dr. Profile Image */}
                            <div className="bg-ivory/20 w-full h-full flex items-center justify-center">
                                <Quote className="w-32 h-32 text-white/10" />
                            </div>
                        </div>
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-lotus/20 blur-3xl rounded-full"></div>
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 blur-3xl rounded-full"></div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="font-display text-5xl mb-6">Dr. Ramesh Bharti</h2>
                        <div className="flex gap-4 mb-8">
                            <span className="px-4 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest">BAMS, MD Ayurveda</span>
                            <span className="px-4 py-1 bg-lotus rounded-full text-xs font-bold uppercase tracking-widest">Lead Physician</span>
                        </div>
                        <p className="text-white/80 text-lg leading-relaxed mb-8 italic font-display text-2xl">
                            "Ayurveda is not just medicine; it's the science of longevity and the art of living in harmony with nature's rhythm."
                        </p>
                        <div className="space-y-6">
                            {[
                                { label: 'Experience', val: '15+ Years in Clinical Ayurveda' },
                                { label: 'Specialty', val: 'Panchakarma & Chronic Disease Management' },
                                { label: 'Vision', val: 'Making authentic Ayurveda accessible to the modern world.' }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-6 border-b border-white/10 pb-4">
                                    <p className="w-32 text-lotus font-bold uppercase tracking-widest text-[10px] pt-1">{item.label}</p>
                                    <p className="text-white/90">{item.val}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-32 max-w-7xl mx-auto px-4">
                <div className="text-center mb-20">
                    <h2 className="font-display text-5xl text-maroon mb-6">The Wellness Team</h2>
                    <p className="text-charcoal/50 max-w-xl mx-auto">Our dedicated experts committed to your holistic well-being.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-12">
                    {TEAM.map((member, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="group bg-white rounded-[40px] p-8 text-center border border-maroon/5 shadow-sm hover:shadow-2xl transition-all duration-500"
                        >
                            <div className="w-32 h-32 bg-ivory rounded-full mx-auto mb-6 flex items-center justify-center border-4 border-white shadow-inner group-hover:scale-110 transition-transform">
                                <HeartPulse className="w-12 h-12 text-maroon/20" />
                            </div>
                            <h3 className="font-display text-2xl text-maroon mb-1">{member.name}</h3>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-lotus mb-4">{member.role}</p>
                            <p className="text-charcoal/60 text-sm">{member.specialty}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Timeline Section */}
            <section className="py-24 bg-ivory/50">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-20">
                        <h2 className="font-display text-5xl text-maroon mb-4">Our Journey</h2>
                        <div className="w-24 h-1 bg-lotus mx-auto rounded-full"></div>
                    </div>
                    <div className="relative border-l-2 border-maroon/10 ml-8 space-y-16">
                        {MILESTONES.map((stone, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="relative pl-12"
                            >
                                <div className="absolute -left-3 top-0 w-6 h-6 bg-maroon rounded-full border-4 border-white shadow-md"></div>
                                <span className="text-lotus font-bold text-lg mb-2 block">{stone.year}</span>
                                <h4 className="font-display text-2xl text-maroon mb-2">{stone.title}</h4>
                                <p className="text-charcoal/60 leading-relaxed">{stone.detail}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Certifications */}
            <section className="py-32 max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-maroon/40 mb-12">Trusted & Registered By</h3>
                    <div className="flex flex-wrap justify-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                        {[1, 2, 3, 4].map((id) => (
                            <div key={id} className="w-40 h-20 bg-white rounded-2xl border border-maroon/10 flex items-center justify-center p-4">
                                <Award className="w-12 h-12 text-charcoal/30" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};
