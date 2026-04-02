import { splitName } from '../../utils/profile';

export function HeroSection({ profile, skills, stats }) {
    const { firstName, lastName } = splitName(profile.name);
    const heroSkills = skills.slice(0, 4);
    const socialLinks = [
        {
            label: 'LinkedIn',
            href: profile.linkedin_link,
            icon: <LinkedInIcon />,
        },
        {
            label: 'GitHub',
            href: profile.github_link || profile.resume_link,
            icon: <GitHubIcon />,
        },
    ].filter((link) => link.href);

    return (
        <section id="home" className="hero-panel">
            <div className="hero-copy">
                {/* <div className="status-pill">
                    <span className="status-dot" />
                    Available for projects
                </div> */}

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
                    <a className="button button-secondary" href={profile.resume_download_url || '#projects'} download>
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
                        target="_blank"
                        rel="noreferrer"
                        aria-label={link.label}
                        title={link.label}
                    >
                        {link.icon}
                    </a>
                ))}
                <span className="social-rail-line" />
            </aside>
        </section>
    );
}

function LinkedInIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
                d="M6.94 8.5A1.56 1.56 0 1 1 6.94 5.38a1.56 1.56 0 0 1 0 3.12Zm1.3 2.02v8.1H5.64v-8.1h2.6Zm4.1 0h-2.5v8.1h2.6v-4.25c0-2.37 3.05-2.56 3.05 0v4.25h2.6v-5.15c0-4-4.57-3.86-5.75-1.89v-1.06Z"
                fill="currentColor"
            />
        </svg>
    );
}

function GitHubIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
                d="M12 2C6.48 2 2 6.6 2 12.26c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.5 0-.24-.01-1.04-.01-1.88-2.78.62-3.37-1.21-3.37-1.21-.46-1.18-1.12-1.5-1.12-1.5-.92-.64.07-.63.07-.63 1.01.08 1.55 1.07 1.55 1.07.9 1.58 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.55-1.15-4.55-5.1 0-1.13.39-2.05 1.03-2.77-.1-.26-.45-1.32.1-2.74 0 0 .84-.28 2.75 1.06A9.23 9.23 0 0 1 12 7.8c.85 0 1.7.12 2.5.35 1.9-1.34 2.74-1.06 2.74-1.06.55 1.42.2 2.48.1 2.74.64.72 1.03 1.64 1.03 2.77 0 3.96-2.34 4.83-4.57 5.08.36.32.68.94.68 1.9 0 1.38-.01 2.48-.01 2.82 0 .27.18.6.69.49A10.29 10.29 0 0 0 22 12.26C22 6.6 17.52 2 12 2Z"
                fill="currentColor"
            />
        </svg>
    );
}
