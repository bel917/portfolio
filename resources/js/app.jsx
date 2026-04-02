import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';

const navigationItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
];

const emptyForm = {
    name: '',
    email: '',
    message: '',
};

function App() {
    const [portfolio, setPortfolio] = useState({
        profile: null,
        skills: [],
        projects: [],
    });
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState('');
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
    const [formData, setFormData] = useState(emptyForm);
    const [formErrors, setFormErrors] = useState({});
    const [submitMessage, setSubmitMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        const loadPortfolio = async () => {
            try {
                const response = await window.axios.get('/api/portfolio');
                setPortfolio(response.data);
            } catch (error) {
                setLoadError('Unable to load portfolio data right now.');
            } finally {
                setLoading(false);
            }
        };

        loadPortfolio();
    }, []);

    const stats = useMemo(() => {
        const projectCount = portfolio.projects.length;
        const skillCount = portfolio.skills.length;

        return [
            { label: 'Projects built', value: `${projectCount}+` },
            { label: 'Core skills', value: `${skillCount}+` },
            { label: 'Focus', value: 'Clean UX' },
        ];
    }, [portfolio.projects.length, portfolio.skills.length]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((current) => ({
            ...current,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setFormErrors({});
        setSubmitMessage('');

        try {
            const response = await window.axios.post('/api/contact-messages', formData);
            setSubmitMessage(response.data.message);
            setFormData(emptyForm);
        } catch (error) {
            if (error.response?.status === 422) {
                setFormErrors(error.response.data.errors || {});
                setSubmitMessage('Please fix the highlighted fields and try again.');
            } else {
                setSubmitMessage('Something went wrong while sending your message.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return <ShellMessage title="Loading portfolio..." message="Fetching profile, skills, and projects." />;
    }

    if (loadError || !portfolio.profile) {
        return <ShellMessage title="Portfolio unavailable" message={loadError || 'No portfolio profile found.'} />;
    }

    const { profile, skills, projects } = portfolio;
    const themeLabel = theme === 'light' ? 'Dark mode' : 'Light mode';
    const initials = profile.name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

    return (
        <div className="site-shell">
            <div className="ambient ambient-one" />
            <div className="ambient ambient-two" />

            <header className="site-header">
                <a className="brand" href="#home">
                    {profile.name}
                </a>

                <nav className="site-nav" aria-label="Primary">
                    {navigationItems.map((item) => (
                        <a key={item.id} href={`#${item.id}`}>
                            {item.label}
                        </a>
                    ))}
                </nav>

                <button
                    type="button"
                    className="theme-toggle"
                    onClick={() => setTheme((current) => (current === 'light' ? 'dark' : 'light'))}
                    aria-label={`Switch to ${themeLabel}`}
                >
                    {themeLabel}
                </button>
            </header>

            <main className="content-stack">
                <section id="home" className="hero-grid panel">
                    <div className="hero-copy">
                        <p className="eyebrow">{profile.location}</p>
                        <h1>{profile.name}</h1>
                        <p className="hero-title">{profile.title}</p>
                        <p className="lead">{profile.intro}</p>

                        <div className="hero-actions">
                            <a className="button button-primary" href="#projects">
                                View Projects
                            </a>
                            <a className="button button-secondary" href="#contact">
                                Contact Me
                            </a>
                        </div>

                        <div className="stats-grid">
                            {stats.map((stat) => (
                                <article key={stat.label} className="stat-card">
                                    <strong>{stat.value}</strong>
                                    <span>{stat.label}</span>
                                </article>
                            ))}
                        </div>
                    </div>

                    <aside className="profile-card">
                        <div className="profile-photo-wrap">
                            {profile.image ? (
                                <img className="profile-photo" src={profile.image} alt={profile.name} />
                            ) : (
                                <div className="profile-fallback">{initials}</div>
                            )}
                        </div>

                        <div className="profile-card-copy">
                            <p className="eyebrow">Profile</p>
                            <h2>Modern web experiences with simple, dependable code.</h2>
                            <p>{profile.bio}</p>
                            <div className="profile-links">
                                <a href={`mailto:${profile.email}`}>{profile.email}</a>
                                {profile.resume_link ? (
                                    <a href={profile.resume_link} target="_blank" rel="noreferrer">
                                        GitHub / Resume
                                    </a>
                                ) : null}
                            </div>
                        </div>
                    </aside>
                </section>

                <section id="about" className="panel section-grid">
                    <div>
                        <p className="eyebrow">About</p>
                        <h2 className="section-title">A practical portfolio built for clarity, speed, and good first impressions.</h2>
                    </div>

                    <div className="copy-panel">
                        <p>{profile.bio}</p>
                        <p>
                            This portfolio uses Laravel for the backend, React for the frontend, and a small REST API for
                            dynamic content. It stays approachable while still feeling polished and production-ready.
                        </p>
                    </div>
                </section>

                <section id="skills" className="panel">
                    <div className="section-heading">
                        <div>
                            <p className="eyebrow">Skills</p>
                            <h2 className="section-title">Tools I use to ship clean, maintainable work.</h2>
                        </div>
                    </div>

                    <div className="skills-grid">
                        {skills.map((skill) => (
                            <article key={skill.id} className="skill-pill">
                                {skill.name}
                            </article>
                        ))}
                    </div>
                </section>

                <section id="projects" className="panel">
                    <div className="section-heading">
                        <div>
                            <p className="eyebrow">Projects</p>
                            <h2 className="section-title">Featured work rendered straight from the Laravel backend.</h2>
                        </div>
                    </div>

                    <div className="projects-grid">
                        {projects.map((project, index) => (
                            <article key={project.id} className="project-card">
                                <p className="project-index">{String(index + 1).padStart(2, '0')}</p>
                                <h3>{project.title}</h3>
                                <p>{project.description}</p>

                                <div className="tech-stack">
                                    {project.tech_stack.map((item) => (
                                        <span key={item}>{item}</span>
                                    ))}
                                </div>

                                <a href={project.github_link} target="_blank" rel="noreferrer">
                                    View on GitHub
                                </a>
                            </article>
                        ))}
                    </div>
                </section>

                <section id="contact" className="panel contact-grid">
                    <div>
                        <p className="eyebrow">Contact</p>
                        <h2 className="section-title">Let&apos;s build something thoughtful and easy to use.</h2>
                        <p className="section-copy">
                            Send a quick message and it will be validated and stored by the Laravel backend.
                        </p>
                    </div>

                    <form className="contact-form" onSubmit={handleSubmit} noValidate>
                        <label>
                            <span>Name</span>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your name"
                            />
                            {formErrors.name ? <small>{formErrors.name[0]}</small> : null}
                        </label>

                        <label>
                            <span>Email</span>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                            />
                            {formErrors.email ? <small>{formErrors.email[0]}</small> : null}
                        </label>

                        <label>
                            <span>Message</span>
                            <textarea
                                name="message"
                                rows="5"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Tell me a little about your project..."
                            />
                            {formErrors.message ? <small>{formErrors.message[0]}</small> : null}
                        </label>

                        <div className="form-footer">
                            <button type="submit" className="button button-primary" disabled={isSubmitting}>
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                            {submitMessage ? <p className="form-message">{submitMessage}</p> : null}
                        </div>
                    </form>
                </section>
            </main>
        </div>
    );
}

function ShellMessage({ title, message }) {
    return (
        <div className="site-shell">
            <section className="panel status-panel">
                <p className="eyebrow">Portfolio</p>
                <h1 className="status-title">{title}</h1>
                <p className="lead">{message}</p>
            </section>
        </div>
    );
}

const container = document.getElementById('app');

if (container) {
    createRoot(container).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
    );
}
