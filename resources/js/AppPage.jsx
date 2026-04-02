import { useMemo } from 'react';
import { ShellMessage } from './components/common/ShellMessage';
import { Header } from './components/layout/Header';
import { AboutSection } from './components/sections/AboutSection';
import { ContactSection } from './components/sections/ContactSection';
import { HeroSection } from './components/sections/HeroSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { useContactForm } from './hooks/useContactForm';
import { usePortfolio } from './hooks/usePortfolio';
import { useTheme } from './hooks/useTheme';

export default function AppPage() {
    const { portfolio, loading, loadError } = usePortfolio();
    const { theme, toggleTheme } = useTheme();
    const {
        formData,
        formErrors,
        submitMessage,
        isSubmitting,
        handleChange,
        handleSubmit,
    } = useContactForm();

    const stats = useMemo(() => {
        const projectCount = portfolio.projects.length;
        const skillCount = portfolio.skills.length;

        return [
            { label: 'Projects built', value: `${projectCount}+` },
            { label: 'Core skills', value: `${skillCount}+` },
            { label: 'Focus', value: 'Clean UX' },
        ];
    }, [portfolio.projects.length, portfolio.skills.length]);

    if (loading) {
        return <ShellMessage title="Loading portfolio..." message="Fetching profile, skills, and projects." />;
    }

    if (loadError || !portfolio.profile) {
        return <ShellMessage title="Portfolio unavailable" message={loadError || 'No portfolio profile found.'} />;
    }

    const { profile, skills, projects } = portfolio;

    return (
        <div className="site-shell">
            <Header name={profile.name} theme={theme} onToggleTheme={toggleTheme} />

            <main className="content-stack">
                <HeroSection profile={profile} skills={skills} stats={stats} />
                <AboutSection bio={profile.bio} />
                <SkillsSection skills={skills} />
                <ProjectsSection projects={projects} />
                <ContactSection
                    formData={formData}
                    formErrors={formErrors}
                    submitMessage={submitMessage}
                    isSubmitting={isSubmitting}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                />
            </main>
        </div>
    );
}
