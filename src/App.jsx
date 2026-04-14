import { useState, useEffect, useMemo } from "react";

// ─── WORKOUT DATA ───────────────────────────────────────────
const WORKOUTS = {
  A: {
    name: "Treino A", subtitle: "Empurrar + Puxar + Ombro", color: "#0d9488",
    sections: [
      { name: "Ativação", rest: "30s", exercises: [
        { id:"a1", name:"Dead Bug", sets:3, reps:"8/lado", noWeight:true, desc:"Deitar de costas, braços e pernas no ar. Descer braço e perna oposta sem mover lombar." },
        { id:"a2", name:"Rotação ext. ombro", sets:2, reps:"15/lado", noWeight:true, desc:"Elástico, cotovelo colado a 90°. Girar antebraço pra fora. Lento." },
        { id:"a3", name:"Band Pull Apart", sets:2, reps:"15", noWeight:true, desc:"Elástico à frente, abrir braços até encostar no peito." },
      ]},
      { name: "Principal", rest: "60-90s", exercises: [
        { id:"a4", name:"Supino reto hammer", sets:3, reps:"6-4-3 *CS", compound:true, desc:"Cluster set: 8RM. 6 reps, 15s, 4 reps, 15s, 3 reps." },
        { id:"a5", name:"Remada curvada c/ barra", sets:3, reps:"6 a 8", compound:true, desc:"Tronco a 45°, puxar na direção do umbigo. Lombar neutra." },
        { id:"a6", name:"Supino inclinado hammer", sets:3, reps:"6-4-3 *CS", compound:true, desc:"Cluster set. Porção superior do peitoral." },
        { id:"a7", name:"Puxador aberto polia", sets:3, reps:"6-4-3 *CS", compound:true, desc:"Pegada aberta, puxar até peito. Contrair escápulas." },
        { id:"a8", name:"Elevação lateral halter", sets:3, reps:"8 a 12", compound:false, desc:"Em pé, levantar até linha do ombro. Deltóide lateral." },
        { id:"a9", name:"Crucifixo inv. máquina", sets:3, reps:"10 a 12", compound:false, desc:"Peck deck invertido. Deltóide posterior." },
        { id:"a10", name:"Face Pull polia", sets:3, reps:"15", compound:false, desc:"Polia alta, corda. Puxar na direção dos olhos." },
        { id:"a11", name:"Crucifixo polia", sets:2, reps:"6 a 8", compound:false, desc:"Alternar semanas pra cima/baixo." },
      ]},
      { name: "Finalização", rest: "30-45s", exercises: [
        { id:"a12", name:"Pallof Press polia", sets:2, reps:"10/lado", noWeight:true, desc:"De lado, empurrar mãos pra frente. Anti-rotação de core." },
        { id:"a13", name:"Hang passivo barra", sets:2, reps:"30s", noWeight:true, desc:"Pendurar relaxado. Descomprime coluna." },
      ]},
    ],
  },
  B: {
    name: "Treino B", subtitle: "Pernas + Core + Ombro", color: "#059669",
    sections: [
      { name: "Ativação", rest: "30s", exercises: [
        { id:"b1", name:"Glúteo Bridge unilat.", sets:3, reps:"10/lado", noWeight:true, desc:"Uma perna apoiada, outra estendida. Subir quadril." },
        { id:"b2", name:"Clamshell c/ elástico", sets:2, reps:"15/lado", noWeight:true, desc:"Deitado de lado, abrir joelho de cima. Glúteo médio." },
        { id:"b3", name:"Mobilidade tornozelo", sets:2, reps:"10/lado", noWeight:true, desc:"Joelho em direção à parede, calcanhar no chão." },
      ]},
      { name: "Principal", rest: "60-90s", exercises: [
        { id:"b4", name:"Agachamento livre barra", sets:4, reps:"6 a 8", compound:true, desc:"Barra nas costas, descer abaixo do paralelo." },
        { id:"b5", name:"Cadeira flexora", sets:3, reps:"6 a 8", compound:false, desc:"Isquiotibiais. Excêntrica lenta (3s)." },
        { id:"b6", name:"Leg press unilateral", sets:3, reps:"10/lado", compound:true, desc:"Uma perna por vez. Excêntrica controlada." },
        { id:"b7", name:"Afundo na máquina", sets:3, reps:"8 a 10", compound:true, desc:"Passo longo = glúteo. Passo curto = quadríceps." },
        { id:"b8", name:"Elevação frontal halter", sets:3, reps:"10 a 12", compound:false, desc:"Levantar à frente até altura do ombro." },
        { id:"b9", name:"Cadeira adutora", sets:3, reps:"10 a 15", compound:false, desc:"Estabiliza quadril." },
        { id:"b10", name:"Cadeira abdutora", sets:3, reps:"10 a 15", compound:false, desc:"Complementa glúteo médio." },
        { id:"b11", name:"Panturrilha em pé", sets:3, reps:"10 a 15", compound:false, desc:"Subir, segurar 1s, descer lento." },
      ]},
      { name: "Finalização", rest: "30s", exercises: [
        { id:"b12", name:"Prancha toque ombro", sets:3, reps:"8/lado", noWeight:true, desc:"Posição de flexão, tocar ombro oposto sem rotacionar." },
        { id:"b13", name:"90/90 stretch quadril", sets:2, reps:"30s/lado", noWeight:true, desc:"Sentado, pernas a 90°. Rotação do quadril." },
      ]},
    ],
  },
  C: {
    name: "Treino C", subtitle: "Full Body + Braços", color: "#2563eb",
    sections: [
      { name: "Ativação", rest: "30s", exercises: [
        { id:"c1", name:"Cat-Cow", sets:2, reps:"10", noWeight:true, desc:"4 apoios, alternar arquear e estender a coluna." },
        { id:"c2", name:"Inchworm", sets:2, reps:"6", noWeight:true, desc:"Em pé, mãos ao chão, caminhar até prancha e voltar." },
        { id:"c3", name:"Rotação ext. ombro", sets:2, reps:"12/lado", noWeight:true, desc:"Elástico. Prepara manguito." },
      ]},
      { name: "Principal", rest: "60-90s", exercises: [
        { id:"c4", name:"Stiff c/ barra", sets:3, reps:"6 a 10", compound:true, desc:"Quadril pra trás, barra perto do corpo, lombar neutra." },
        { id:"c5", name:"Supino reto hammer", sets:3, reps:"6 a 8", compound:true, desc:"Sem cluster set. Volume de peito." },
        { id:"c6", name:"Desenvolvimento hammer", sets:3, reps:"6 a 8", compound:true, desc:"Press ombro na máquina." },
        { id:"c7", name:"Remada unilat. halter", sets:3, reps:"8-10/lado", compound:true, desc:"Apoiar mão e joelho no banco, puxar halter." },
        { id:"c8", name:"Elevação lateral polia", sets:3, reps:"10-12/lado", compound:false, desc:"Polia baixa, mão oposta. Tensão constante." },
        { id:"c9", name:"Rosca direta polia", sets:3, reps:"6 a 8", compound:false, desc:"Barra reta ou W. Cotovelos fixos." },
        { id:"c10", name:"Tríceps polia", sets:3, reps:"6 a 8", compound:false, desc:"Corda ou barra. Cotovelos fixos." },
      ]},
      { name: "Finalização", rest: "30s", exercises: [
        { id:"c11", name:"Prancha frontal", sets:3, reps:"30-45s", noWeight:true, desc:"Antebraços no chão, corpo reto. Glúteo contraído." },
        { id:"c12", name:"World's Greatest Stretch", sets:2, reps:"5/lado", noWeight:true, desc:"Lunge + rotação torácica. Mobilidade completa." },
      ]},
    ],
  },
};

const EFFORT_OPTS = [
  { value:"leve", label:"Leve", hint:"4+ reps sobrando", color:"#10b981" },
  { value:"moderado", label:"Moderado", hint:"2-3 sobrando", color:"#0d9488" },
  { value:"pesado", label:"Pesado", hint:"1 sobrando", color:"#f59e0b" },
  { value:"maximo", label:"Máximo", hint:"0 sobrando", color:"#ef4444" },
  { value:"falha", label:"Falha", hint:"Não completou", color:"#991b1b" },
];

// ─── STORAGE ────────────────────────────────────────────────
const SK = "treino_func_v2";
const load = () => { try { return JSON.parse(localStorage.getItem(SK)) || {}; } catch { return {}; } };
const save = (d) => { try { localStorage.setItem(SK, JSON.stringify(d)); } catch {} };
const getHist = (id) => (load()[id] || []).sort((a, b) => new Date(b.date) - new Date(a.date));
const getLast = (id) => { const h = getHist(id); return h[0] || null; };
const saveEntry = (id, e) => { const d = load(); if (!d[id]) d[id] = []; d[id].push({ ...e, date: new Date().toISOString() }); save(d); };

function getAllWeighted() {
  const list = [];
  Object.values(WORKOUTS).forEach(w => w.sections.forEach(s => s.exercises.forEach(e => { if (!e.noWeight) list.push(e); })));
  return list;
}
function getAllExercises(k) {
  const l = [];
  WORKOUTS[k].sections.forEach(s => s.exercises.forEach(e => l.push({ ...e, section: s.name, rest: s.rest })));
  return l;
}
function getSuggestion(last, compound) {
  if (!last?.weight) return null;
  const w = parseFloat(last.weight), inc = compound ? 5 : 2.5, sm = compound ? 2.5 : 1;
  const map = { leve: [w+inc, "Leve — subir"], moderado: [w+sm, "Moderado — subir pouco"], pesado: [w, "Zona ideal — manter"], maximo: [w, "Limite — manter"], falha: [Math.max(0, w-inc), "Falha — reduzir"] };
  const r = map[last.effort] || [w, "Manter"];
  return { weight: r[0], reason: r[1] };
}
function getConsHeavy(id) { const h = getHist(id); let c = 0; for (const x of h) { if (x.effort === "pesado") c++; else break; } return c; }

// ─── UTILS ──────────────────────────────────────────────────
function getWeekKey(date) {
  const d = new Date(date);
  const jan1 = new Date(d.getFullYear(), 0, 1);
  const days = Math.floor((d - jan1) / 86400000);
  return `${d.getFullYear()}-W${Math.ceil((days + jan1.getDay() + 1) / 7)}`;
}
function getWeekLabel(wk) {
  const [y, w] = wk.split("-W");
  return `Sem ${w}`;
}
function getPR(id) {
  const h = getHist(id);
  if (!h.length) return null;
  return h.reduce((max, e) => (parseFloat(e.weight) || 0) > (parseFloat(max.weight) || 0) ? e : max, h[0]);
}
function isNewPR(id, weight) {
  const pr = getPR(id);
  if (!pr) return true;
  return parseFloat(weight) > parseFloat(pr.weight);
}
function getStreak() {
  const data = load();
  const allDates = new Set();
  Object.values(data).forEach(arr => arr.forEach(e => { if (e.date) allDates.add(getWeekKey(e.date)); }));
  const weeks = [...allDates].sort().reverse();
  const current = getWeekKey(new Date());
  let streak = 0;
  for (let i = 0; i < weeks.length; i++) {
    if (i === 0 && weeks[0] !== current) {
      const prev = getWeekKey(new Date(Date.now() - 7 * 86400000));
      if (weeks[0] !== prev) break;
    }
    if (i > 0) {
      const [y1, w1] = weeks[i-1].split("-W").map(Number);
      const [y2, w2] = weeks[i].split("-W").map(Number);
      if (!(y1 === y2 && w1 - w2 === 1) && !(y1 > y2 && w2 >= 50 && w1 <= 2)) break;
    }
    streak++;
  }
  return streak;
}

// ─── CHART COMPONENT ────────────────────────────────────────
function Chart({ data, label, color = "#0d9488", valueKey = "weight", formatter }) {
  if (!data || data.length < 2) return <p style={{ fontSize: 12, color: "#9ca3af", textAlign: "center", padding: 16 }}>Dados insuficientes para gráfico</p>;
  const vals = data.map(p => parseFloat(p[valueKey]) || 0);
  const max = Math.max(...vals), min = Math.min(...vals), range = max - min || 1;
  const W = 300, H = 90, pad = 10;
  const pts = vals.map((v, i) => ({
    x: pad + (i / (vals.length - 1)) * (W - pad * 2),
    y: H - pad - ((v - min) / range) * (H - pad * 2),
    v
  }));
  const trend = vals[vals.length - 1] - vals[0];
  const fmt = formatter || (v => `${v}`);
  return (
    <div style={{ margin: "12px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 12, color: "#6b7280" }}>{label}</span>
        <span style={{ fontSize: 12, fontWeight: 500, color: trend > 0 ? "#059669" : trend < 0 ? "#dc2626" : "#6b7280" }}>
          {trend > 0 ? "+" : ""}{trend.toFixed(1)} {valueKey === "weight" ? "kg" : ""}
        </span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: 90, background: "#f9fafb", borderRadius: 8 }}>
        <polyline fill="none" stroke={color} strokeWidth="2" points={pts.map(p => `${p.x},${p.y}`).join(" ")} />
        {pts.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="3" fill={color} />)}
        <text x={pts[0].x} y={H - 1} fontSize="9" fill="#9ca3af">{fmt(vals[0])}</text>
        <text x={pts[pts.length-1].x} y={H - 1} fontSize="9" fill="#9ca3af" textAnchor="end">{fmt(vals[vals.length-1])}</text>
      </svg>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#9ca3af", marginTop: 2 }}>
        <span>{data[0]?.date ? new Date(data[0].date).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }) : ""}</span>
        <span>{data[data.length-1]?.date ? new Date(data[data.length-1].date).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }) : ""}</span>
      </div>
    </div>
  );
}

// ─── SCREENS ────────────────────────────────────────────────
function Home({ onStart, onHistory }) {
  const streak = getStreak();
  const allW = getAllWeighted();
  const recentPRs = allW.filter(ex => {
    const h = getHist(ex.id);
    if (h.length < 2) return false;
    const pr = getPR(ex.id);
    const daysSince = (Date.now() - new Date(pr.date)) / 86400000;
    return daysSince < 14;
  });

  return (
    <div style={{ padding: "24px 16px", maxWidth: 420, margin: "0 auto" }}>
      <h1 style={{ fontSize: 22, fontWeight: 600, margin: "0 0 4px" }}>Treino Funcional</h1>
      <p style={{ fontSize: 13, color: "#6b7280", margin: "0 0 24px" }}>Segunda Força + Musculação</p>

      {streak > 0 && (
        <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, padding: "12px 14px", marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 13, color: "#166534" }}>{streak} {streak === 1 ? "semana" : "semanas"} consecutivas</span>
          <span style={{ fontSize: 18 }}>{'🔥'.repeat(Math.min(streak, 5))}</span>
        </div>
      )}

      {recentPRs.length > 0 && (
        <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 10, padding: "12px 14px", marginBottom: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#92400e", marginBottom: 6 }}>PRs recentes</div>
          {recentPRs.slice(0, 3).map(ex => {
            const pr = getPR(ex.id);
            return (
              <div key={ex.id} style={{ fontSize: 12, color: "#78350f", marginBottom: 2 }}>
                {ex.name}: {pr.weight}kg
              </div>
            );
          })}
        </div>
      )}

      {Object.entries(WORKOUTS).map(([k, w]) => (
        <button key={k} onClick={() => onStart(k)} style={{
          display: "block", width: "100%", padding: "20px 16px", marginBottom: 12,
          background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12,
          cursor: "pointer", textAlign: "left", borderLeft: `4px solid ${w.color}`, boxSizing: "border-box",
        }}>
          <div style={{ fontSize: 16, fontWeight: 600 }}>{w.name}</div>
          <div style={{ fontSize: 13, color: "#6b7280", marginTop: 2 }}>{w.subtitle}</div>
          <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 4 }}>
            {w.sections.reduce((a, s) => a + s.exercises.length, 0)} exercícios
          </div>
        </button>
      ))}

      <button onClick={onHistory} style={{
        display: "block", width: "100%", padding: "16px", marginTop: 20,
        background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 12,
        cursor: "pointer", fontSize: 14, color: "#374151", fontWeight: 500,
      }}>
        Histórico e Evolução
      </button>
    </div>
  );
}

function Workout({ wk, onFinish, onBack }) {
  const exercises = useMemo(() => getAllExercises(wk), [wk]);
  const workout = WORKOUTS[wk];
  const [idx, setIdx] = useState(0);
  const [entries, setEntries] = useState({});
  const [showDesc, setShowDesc] = useState(false);
  const [newPR, setNewPR] = useState(false);

  const ex = exercises[idx];
  const last = getLast(ex.id);
  const sug = !ex.noWeight ? getSuggestion(last, ex.compound) : null;
  const ch = getConsHeavy(ex.id);
  const adjSug = sug && ch >= 3 && last?.effort === "pesado"
    ? { weight: sug.weight + (ex.compound ? 2.5 : 1), reason: "3x pesado — tentar subir" } : sug;
  const entry = entries[ex.id] || { weight: "", reps: "", effort: "" };
  const upd = (f, v) => {
    setEntries(p => ({ ...p, [ex.id]: { ...p[ex.id], [f]: v } }));
    if (f === "weight" && v && isNewPR(ex.id, v)) setNewPR(true);
    else if (f === "weight") setNewPR(false);
  };
  const secIdx = exercises.filter((e, i) => i <= idx && e.section === ex.section).length;
  const secTot = exercises.filter(e => e.section === ex.section).length;

  const nav = (dir) => { setShowDesc(false); setNewPR(false); setIdx(idx + dir); };
  const finish = () => {
    Object.entries(entries).forEach(([id, e]) => { if (e.weight || e.reps || e.effort) saveEntry(id, e); });
    onFinish(entries);
  };

  return (
    <div style={{ padding: "16px", maxWidth: 420, margin: "0 auto", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "#6b7280" }}>← Voltar</button>
        <span style={{ fontSize: 13, color: "#9ca3af" }}>{idx + 1}/{exercises.length}</span>
      </div>

      <div style={{ height: 3, background: "#e5e7eb", borderRadius: 2, marginBottom: 16 }}>
        <div style={{ height: 3, background: workout.color, borderRadius: 2, width: `${((idx + 1) / exercises.length) * 100}%`, transition: "width 0.3s" }} />
      </div>

      <div style={{ marginBottom: 12 }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: workout.color, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          {ex.section} — {secIdx}/{secTot}
        </span>
        <span style={{ fontSize: 11, color: "#9ca3af", marginLeft: 12 }}>Descanso: {ex.rest}</span>
      </div>

      <h2 style={{ fontSize: 20, fontWeight: 600, margin: "0 0 4px" }}>{ex.name}</h2>
      <p style={{ fontSize: 13, color: "#6b7280", margin: "0 0 12px" }}>{ex.sets} séries × {ex.reps}</p>

      <button onClick={() => setShowDesc(!showDesc)} style={{
        background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 8, padding: "8px 12px",
        cursor: "pointer", fontSize: 12, color: "#374151", width: "100%", textAlign: "left", marginBottom: 12, boxSizing: "border-box",
      }}>
        {showDesc ? "Esconder ↑" : "Como executar ↓"}
      </button>
      {showDesc && <div style={{ background: "#f9fafb", borderRadius: 8, padding: 12, fontSize: 13, color: "#374151", marginBottom: 12, lineHeight: 1.5 }}>{ex.desc}</div>}

      {last && (
        <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 12 }}>
          Último: {last.weight ? `${last.weight}kg` : "—"} × {last.reps || "—"}
          {last.effort && ` — ${EFFORT_OPTS.find(e => e.value === last.effort)?.label}`}
        </div>
      )}

      {adjSug && !ex.noWeight && (
        <div style={{ background: "#f0fdfa", border: "1px solid #99f6e4", borderRadius: 8, padding: "10px 12px", marginBottom: 12, fontSize: 13 }}>
          <span style={{ fontWeight: 600, color: "#0d9488" }}>Sugestão: {adjSug.weight}kg</span>
          <span style={{ color: "#6b7280", marginLeft: 8 }}>{adjSug.reason}</span>
        </div>
      )}

      {newPR && !ex.noWeight && (
        <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 8, padding: "8px 12px", marginBottom: 12, fontSize: 13, fontWeight: 600, color: "#92400e", textAlign: "center" }}>
          Novo recorde de carga nesse exercício!
        </div>
      )}

      <div style={{ flex: 1 }}>
        {!ex.noWeight ? (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
              <div>
                <label style={{ fontSize: 12, color: "#6b7280", display: "block", marginBottom: 4 }}>Peso (kg)</label>
                <input type="number" inputMode="decimal" value={entry.weight} onChange={e => upd("weight", e.target.value)}
                  placeholder={adjSug ? String(adjSug.weight) : "—"}
                  style={{ width: "100%", padding: 12, fontSize: 18, fontWeight: 600, border: "1px solid #d1d5db", borderRadius: 8, textAlign: "center", boxSizing: "border-box", outline: "none" }} />
              </div>
              <div>
                <label style={{ fontSize: 12, color: "#6b7280", display: "block", marginBottom: 4 }}>Reps feitas</label>
                <input type="number" inputMode="numeric" value={entry.reps} onChange={e => upd("reps", e.target.value)}
                  placeholder={ex.reps.split(" ")[0]}
                  style={{ width: "100%", padding: 12, fontSize: 18, fontWeight: 600, border: "1px solid #d1d5db", borderRadius: 8, textAlign: "center", boxSizing: "border-box", outline: "none" }} />
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, color: "#6b7280", display: "block", marginBottom: 8 }}>Esforço</label>
              <div style={{ display: "flex", gap: 4 }}>
                {EFFORT_OPTS.map(o => (
                  <button key={o.value} onClick={() => upd("effort", o.value)} style={{
                    flex: 1, padding: "10px 2px", borderRadius: 8, cursor: "pointer", fontSize: 10, fontWeight: 500,
                    border: entry.effort === o.value ? `2px solid ${o.color}` : "1px solid #e5e7eb",
                    background: entry.effort === o.value ? `${o.color}15` : "#fff",
                    color: entry.effort === o.value ? o.color : "#6b7280",
                  }}>
                    {o.label}
                  </button>
                ))}
              </div>
              {entry.effort && <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 4, textAlign: "center" }}>{EFFORT_OPTS.find(e => e.value === entry.effort)?.hint}</p>}
            </div>
          </>
        ) : (
          <div style={{ background: "#f9fafb", borderRadius: 8, padding: 16, textAlign: "center", color: "#6b7280", fontSize: 13 }}>
            Exercício de ativação — foco no controle
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: 12, marginTop: 20, paddingBottom: 16 }}>
        <button disabled={idx === 0} onClick={() => nav(-1)} style={{
          flex: 1, padding: 14, borderRadius: 10, border: "1px solid #e5e7eb", background: "#fff",
          cursor: idx === 0 ? "default" : "pointer", color: idx === 0 ? "#d1d5db" : "#374151", fontSize: 14, fontWeight: 500,
        }}>Anterior</button>
        {idx < exercises.length - 1 ? (
          <button onClick={() => nav(1)} style={{
            flex: 1, padding: 14, borderRadius: 10, border: "none", background: workout.color,
            cursor: "pointer", color: "#fff", fontSize: 14, fontWeight: 500,
          }}>Próximo</button>
        ) : (
          <button onClick={finish} style={{
            flex: 1, padding: 14, borderRadius: 10, border: "none", background: "#111827",
            cursor: "pointer", color: "#fff", fontSize: 14, fontWeight: 600,
          }}>Concluir</button>
        )}
      </div>
    </div>
  );
}

function Summary({ wk, entries, onBack }) {
  const workout = WORKOUTS[wk];
  const exercises = getAllExercises(wk);
  const filled = exercises.filter(ex => entries[ex.id] && (entries[ex.id].weight || entries[ex.id].reps));
  const prs = filled.filter(ex => entries[ex.id].weight && isNewPR(ex.id, entries[ex.id].weight));
  const totalVol = filled.reduce((sum, ex) => sum + (parseFloat(entries[ex.id].weight) || 0) * (parseFloat(entries[ex.id].reps) || 0), 0);

  return (
    <div style={{ padding: "24px 16px", maxWidth: 420, margin: "0 auto" }}>
      <h2 style={{ fontSize: 20, fontWeight: 600, margin: "0 0 4px" }}>{workout.name} concluído</h2>
      <p style={{ fontSize: 13, color: "#6b7280", margin: "0 0 20px" }}>
        {new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long" })}
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
        <div style={{ background: "#f9fafb", borderRadius: 10, padding: "14px 12px" }}>
          <div style={{ fontSize: 11, color: "#6b7280" }}>Exercícios</div>
          <div style={{ fontSize: 22, fontWeight: 600 }}>{filled.length}</div>
        </div>
        <div style={{ background: "#f9fafb", borderRadius: 10, padding: "14px 12px" }}>
          <div style={{ fontSize: 11, color: "#6b7280" }}>Volume total</div>
          <div style={{ fontSize: 22, fontWeight: 600 }}>{Math.round(totalVol).toLocaleString()}kg</div>
        </div>
      </div>

      {prs.length > 0 && (
        <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 10, padding: "12px 14px", marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#92400e", marginBottom: 6 }}>Novos recordes!</div>
          {prs.map(ex => (
            <div key={ex.id} style={{ fontSize: 12, color: "#78350f", marginBottom: 2 }}>
              {ex.name}: {entries[ex.id].weight}kg
            </div>
          ))}
        </div>
      )}

      {filled.map(ex => {
        const e = entries[ex.id];
        const eff = EFFORT_OPTS.find(o => o.value === e.effort);
        return (
          <div key={ex.id} style={{ padding: "10px 0", borderBottom: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 13 }}>{ex.name}</span>
            <div style={{ textAlign: "right" }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>{e.weight}kg × {e.reps}</span>
              {eff && <span style={{ fontSize: 11, color: eff.color, marginLeft: 8 }}>{eff.label}</span>}
            </div>
          </div>
        );
      })}

      <button onClick={onBack} style={{
        display: "block", width: "100%", padding: 14, marginTop: 32, background: "#111827",
        border: "none", borderRadius: 10, color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer",
      }}>Voltar ao início</button>
    </div>
  );
}

function History({ onBack }) {
  const [sel, setSel] = useState(null);
  const allW = useMemo(() => {
    const l = [];
    Object.entries(WORKOUTS).forEach(([k, w]) => w.sections.forEach(s => s.exercises.forEach(e => {
      if (!e.noWeight) l.push({ ...e, wk: k, wName: w.name, color: w.color });
    })));
    return l;
  }, []);

  // Dashboard
  const data = load();
  const allEntries = [];
  Object.entries(data).forEach(([id, arr]) => arr.forEach(e => allEntries.push({ ...e, id })));
  const thisWeek = getWeekKey(new Date());
  const lastWeek = getWeekKey(new Date(Date.now() - 7 * 86400000));
  const thisWeekEntries = allEntries.filter(e => getWeekKey(e.date) === thisWeek);
  const lastWeekEntries = allEntries.filter(e => getWeekKey(e.date) === lastWeek);
  const thisVol = thisWeekEntries.reduce((s, e) => s + (parseFloat(e.weight) || 0) * (parseFloat(e.reps) || 0), 0);
  const lastVol = lastWeekEntries.reduce((s, e) => s + (parseFloat(e.weight) || 0) * (parseFloat(e.reps) || 0), 0);
  const volDiff = lastVol > 0 ? ((thisVol - lastVol) / lastVol * 100) : 0;
  const streak = getStreak();

  // Weekly volume chart
  const weekMap = {};
  allEntries.forEach(e => {
    const wk = getWeekKey(e.date);
    if (!weekMap[wk]) weekMap[wk] = 0;
    weekMap[wk] += (parseFloat(e.weight) || 0) * (parseFloat(e.reps) || 0);
  });
  const weeklyData = Object.entries(weekMap).sort((a, b) => a[0].localeCompare(b[0])).slice(-8).map(([wk, vol]) => ({ date: wk, volume: Math.round(vol) }));

  if (sel) {
    const hist = getHist(sel.id);
    const withW = hist.filter(h => h.weight);
    const pr = getPR(sel.id);
    const volData = withW.slice(0, 20).reverse().map(h => ({ ...h, volume: Math.round((parseFloat(h.weight) || 0) * (parseFloat(h.reps) || 0)) }));

    return (
      <div style={{ padding: "16px", maxWidth: 420, margin: "0 auto" }}>
        <button onClick={() => setSel(null)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "#6b7280", marginBottom: 16 }}>← Voltar</button>
        <h2 style={{ fontSize: 18, fontWeight: 600, margin: "0 0 4px" }}>{sel.name}</h2>
        <p style={{ fontSize: 12, color: sel.color, margin: "0 0 16px" }}>{sel.wName}</p>

        {pr && (
          <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 8, padding: "10px 12px", marginBottom: 16, display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 13, color: "#92400e", fontWeight: 600 }}>PR: {pr.weight}kg</span>
            <span style={{ fontSize: 11, color: "#b45309" }}>{new Date(pr.date).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "2-digit" })}</span>
          </div>
        )}

        {withW.length >= 2 && <Chart data={withW.slice(0, 20).reverse()} label="Evolução de carga (kg)" color={sel.color} valueKey="weight" formatter={v => `${v}kg`} />}
        {volData.length >= 2 && <Chart data={volData} label="Volume (peso × reps)" color="#6366f1" valueKey="volume" formatter={v => `${v}`} />}

        <h3 style={{ fontSize: 14, fontWeight: 600, margin: "20px 0 8px" }}>Sessões</h3>
        {hist.length === 0 ? <p style={{ fontSize: 13, color: "#9ca3af" }}>Nenhum registro</p> :
          hist.slice(0, 20).map((h, i) => {
            const eff = EFFORT_OPTS.find(o => o.value === h.effort);
            const isPR = pr && h.weight === pr.weight && h.date === pr.date;
            return (
              <div key={i} style={{ padding: "10px 0", borderBottom: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <span style={{ fontSize: 12, color: "#9ca3af" }}>{new Date(h.date).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "2-digit" })}</span>
                  {isPR && <span style={{ fontSize: 10, color: "#f59e0b", marginLeft: 6, fontWeight: 600 }}>PR</span>}
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{h.weight ? `${h.weight}kg` : "—"} × {h.reps || "—"}</span>
                  {eff && <span style={{ fontSize: 11, color: eff.color, marginLeft: 8 }}>{eff.label}</span>}
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }

  return (
    <div style={{ padding: "16px", maxWidth: 420, margin: "0 auto" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "#6b7280", marginBottom: 16 }}>← Voltar</button>
      <h2 style={{ fontSize: 18, fontWeight: 600, margin: "0 0 20px" }}>Histórico e Evolução</h2>

      {/* Dashboard */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 20 }}>
        <div style={{ background: "#f9fafb", borderRadius: 10, padding: "12px 10px", textAlign: "center" }}>
          <div style={{ fontSize: 10, color: "#6b7280" }}>Semana atual</div>
          <div style={{ fontSize: 16, fontWeight: 600 }}>{Math.round(thisVol).toLocaleString()}</div>
          <div style={{ fontSize: 10, color: "#9ca3af" }}>kg volume</div>
        </div>
        <div style={{ background: "#f9fafb", borderRadius: 10, padding: "12px 10px", textAlign: "center" }}>
          <div style={{ fontSize: 10, color: "#6b7280" }}>vs anterior</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: volDiff > 0 ? "#059669" : volDiff < 0 ? "#dc2626" : "#6b7280" }}>
            {volDiff > 0 ? "+" : ""}{Math.round(volDiff)}%
          </div>
          <div style={{ fontSize: 10, color: "#9ca3af" }}>variação</div>
        </div>
        <div style={{ background: "#f9fafb", borderRadius: 10, padding: "12px 10px", textAlign: "center" }}>
          <div style={{ fontSize: 10, color: "#6b7280" }}>Sequência</div>
          <div style={{ fontSize: 16, fontWeight: 600 }}>{streak}</div>
          <div style={{ fontSize: 10, color: "#9ca3af" }}>semanas</div>
        </div>
      </div>

      {/* Weekly volume chart */}
      {weeklyData.length >= 2 && (
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>Volume semanal</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 80, background: "#f9fafb", borderRadius: 8, padding: "8px 4px" }}>
            {weeklyData.map((w, i) => {
              const maxV = Math.max(...weeklyData.map(x => x.volume));
              const h = maxV > 0 ? (w.volume / maxV) * 60 : 0;
              const isCurrent = w.date === thisWeek;
              return (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ width: "100%", height: h, background: isCurrent ? "#0d9488" : "#d1d5db", borderRadius: 4, minHeight: 2 }} />
                  <span style={{ fontSize: 8, color: "#9ca3af", marginTop: 2 }}>{getWeekLabel(w.date)}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Exercise list */}
      {Object.entries(WORKOUTS).map(([k, w]) => (
        <div key={k} style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: w.color, margin: "0 0 8px" }}>{w.name}</h3>
          {allW.filter(e => e.wk === k).map(ex => {
            const last = getLast(ex.id);
            const pr = getPR(ex.id);
            const isPR = last && pr && last.weight === pr.weight && last.date === pr.date;
            return (
              <button key={ex.id} onClick={() => setSel(ex)} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                width: "100%", padding: "10px 12px", marginBottom: 4,
                background: "#fff", border: "1px solid #f3f4f6", borderRadius: 8,
                cursor: "pointer", textAlign: "left", boxSizing: "border-box",
              }}>
                <div>
                  <span style={{ fontSize: 13, color: "#374151" }}>{ex.name}</span>
                  {isPR && <span style={{ fontSize: 9, color: "#f59e0b", marginLeft: 6, fontWeight: 600 }}>PR</span>}
                </div>
                <span style={{ fontSize: 12, color: "#9ca3af" }}>{last ? `${last.weight || "—"}kg` : "—"}</span>
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

// ─── APP ────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("home");
  const [wk, setWk] = useState(null);
  const [done, setDone] = useState(null);

  return (
    <div style={{ fontFamily: "'SF Pro Text', -apple-system, system-ui, sans-serif", background: "#fff", minHeight: "100vh" }}>
      {screen === "home" && <Home onStart={k => { setWk(k); setScreen("workout"); }} onHistory={() => setScreen("history")} />}
      {screen === "workout" && wk && <Workout wk={wk} onBack={() => setScreen("home")} onFinish={e => { setDone(e); setScreen("summary"); }} />}
      {screen === "summary" && wk && <Summary wk={wk} entries={done || {}} onBack={() => { setWk(null); setDone(null); setScreen("home"); }} />}
      {screen === "history" && <History onBack={() => setScreen("home")} />}
    </div>
  );
}
