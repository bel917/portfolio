export function ProjectsSection({ projects }) {
    return (
        <section id="projects" className="panel">
            <div className="section-heading">
                <div>
                    <p className="eyebrow">Projects</p>
                    <h2 className="section-title">Selected work rendered straight from the Laravel backend.</h2>
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
    );
}
