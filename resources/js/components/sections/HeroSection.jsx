import { splitName } from '../../utils/profile';

export function HeroSection({ profile, skills, stats }) {
    const { firstName, lastName } = splitName(profile.name);
    const heroSkills = skills.slice(0, 4);
    const socialLinks = [
        { label: 'GH', href: profile.resume_link || '#projects' },
        { label: 'EM', href: `mailto:${profile.email}` },
        { label: 'PR', href: '#projects' },
    ];

    return (
        <section id="home" className="hero-panel">
            <div className="hero-copy">
                <div className="status-pill">
                    <span className="status-dot" />
                    Available for projects
                </div>

                <div className="hero-name-lockup">
                    <h1 className="hero-name hero-name-primary">{firstName}</h1>
                    <h1 className="hero-name hero-name-secondary">{lastName}</h1>
                </div>

                <div className="hero-meta">
                    <div className="hero-role-line">
                        <span className="hero-role-rule" />
                        <p className="hero-role">{profile.title}</p>
                    </div>

                    <p className="hero-summary">
                        {profile.intro} Based in {profile.location}, focused on minimal interfaces and clean architecture.
                    </p>
                </div>

                <div className="hero-actions">
                    <a className="button button-primary" href="#contact">
                        Collaborate
                    </a>
                    <a className="button button-secondary" href={profile.resume_link || '#projects'}>
                        Resume
                    </a>
                </div>

                <div className="hero-footer">
                    <div className="hero-skill-preview">
                        {heroSkills.map((skill) => (
                            <span key={skill.id}>{skill.name}</span>
                        ))}
                    </div>

                    <div className="hero-stats">
                        {stats.map((stat) => (
                            <article key={stat.label} className="stat-card">
                                <strong>{stat.value}</strong>
                                <span>{stat.label}</span>
                            </article>
                        ))}
                    </div>
                </div>
            </div>

            <aside className="social-rail" aria-label="Social links">
                {socialLinks.map((link) => (
                    <a
                        key={link.label}
                        href={link.href}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel="noreferrer"
                    >
                        {link.label}
                    </a>
                ))}
                <span className="social-rail-line" />
            </aside>
        </section>
    );
}
