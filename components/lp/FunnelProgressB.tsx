/**
 * 3-step progress bar for the `/lp/somn-b` funnel (Studiu de caz → Aplicație →
 * Confirmare), matching the client's `aplicatie`/`multumim` HTML. The index
 * page carries no progress bar (same as the source markup) — only steps 2 & 3.
 */
export function FunnelProgressB({ step }: { step: 2 | 3 }) {
  return (
    <div className="progress">
      <div className="progress-inner">
        <div className="pstep done">
          <div className="pdot">✓</div>
          <span className="plabel">Studiu de caz</span>
          <span className="pline" />
        </div>
        <div className={`pstep ${step === 2 ? "active" : "done"}`}>
          <div className="pdot">{step === 2 ? "2" : "✓"}</div>
          <span className="plabel">Aplicație</span>
          <span className="pline" />
        </div>
        <div className={`pstep ${step === 3 ? "active" : ""}`}>
          <div className="pdot">3</div>
          <span className="plabel">Confirmare</span>
        </div>
      </div>
    </div>
  );
}
