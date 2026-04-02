export function SkillsSection({ skills }) {
    return (
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
    );
}
