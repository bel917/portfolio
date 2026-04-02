export function AboutSection({ bio }) {
    return (
        <section id="about" className="panel section-grid">
            <div>
                <p className="eyebrow">About</p>
                <h2 className="section-title">A portfolio with a quieter aesthetic and a stronger first impression.</h2>
            </div>

            <div className="copy-panel">
                <p>{bio}</p>
                <p>
                    This portfolio uses Laravel for the backend, React for the frontend, and a small REST API for dynamic
                    content. It stays approachable while still feeling polished and production-ready.
                </p>
            </div>
        </section>
    );
}
