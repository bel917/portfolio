export function ShellMessage({ title, message }) {
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
