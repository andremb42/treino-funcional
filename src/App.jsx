import { useState, useEffect, useMemo } from "react";

/* ═══════════ WORKOUT DATA ═══════════ */
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
        { id:"b12", name:"Prancha c/ toque no ombro", sets:3, reps:"8/lado", noWeight:true, desc:"Posição de flexão, tocar ombro oposto sem rotacionar." },
        { id:"b13", name:"90/90 stretch quadril", sets:2, reps:"30s/lado", noWeight:true, desc:"Sentado, pernas a 90°. Rotação do quadril." },
      ]},
    ],
  },
  C: {
    name: "Treino C", subtitle: "Full Body + Braços", color: "#2563eb",
    sections: [
      { name: "Ativação", rest: "30s", exercises: [
        { id:"c1", name:"Cat-Cow", sets:2, reps:"10", noWeight:true, desc:"4 apoios. Alternar arquear e estender a coluna." },
        { id:"c2", name:"Inchworm", sets:2, reps:"6", noWeight:true, desc:"Em pé, mãos ao chão, caminhar até prancha e voltar." },
        { id:"c3", name:"Rotação ext. ombro", sets:2, reps:"12/lado", noWeight:true, desc:"Elástico, prepara manguito pro desenvolvimento." },
      ]},
      { name: "Principal", rest: "60-90s", exercises: [
        { id:"c4", name:"Stiff c/ barra", sets:3, reps:"6 a 10", compound:true, desc:"Quadril pra trás, barra perto do corpo, lombar neutra." },
        { id:"c5", name:"Supino reto hammer", sets:3, reps:"6 a 8", compound:true, desc:"Sem cluster set. Volume adicional de peito." },
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

/* Activity types */
const ACTIVITY_TYPES = {
  muscA: { label: "Musculação A", short: "A", color: "#0d9488", kind: "workout", workoutKey: "A" },
  muscB: { label: "Musculação B", short: "B", color: "#059669", kind: "workout", workoutKey: "B" },
  muscC: { label: "Musculação C", short: "C", color: "#2563eb", kind: "workout", workoutKey: "C" },
  corrida: { label: "Corrida", short: "R", color: "#ea580c", kind: "check" },
  yoga: { label: "Yoga", short: "Y", color: "#7c3aed", kind: "check" },
  ativacao: { label: "Ativação", short: "A+", color: "#0891b2", kind: "check" },
  descanso: { label: "Descanso", short: "Z", color: "#6b7280", kind: "rest" },
};

const DAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const DAYS_FULL = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

/* ═══════════ STORAGE ═══════════ */
const SK = "treino_func_v3";
const SCHEDULE_KEY = "treino_schedule_v1";
const CHECKS_KEY = "treino_checks_v1";

const load = () => { try { return JSON.parse(localStorage.getItem(SK)) || {}; } catch { return {}; } };
const save = d => { try { localStorage.setItem(SK, JSON.stringify(d)); } catch {} };
const getHist = id => (load()[id] || []).sort((a,b) => new Date(b.date) - new Date(a.date));
const getLast = id => { const h = getHist(id); return h[0] || null; };
const saveEntry = (id, e) => { const d = load(); if (!d[id]) d[id] = []; d[id].push({ ...e, date: new Date().toISOString() }); save(d); };

const loadSchedule = () => {
  try { return JSON.parse(localStorage.getItem(SCHEDULE_KEY)) || getDefaultSchedule(); }
  catch { return getDefaultSchedule(); }
};
const saveSchedule = s => { try { localStorage.setItem(SCHEDULE_KEY, JSON.stringify(s)); } catch {} };

const loadChecks = () => { try { return JSON.parse(localStorage.getItem(CHECKS_KEY)) || {}; } catch { return {}; } };
const saveChecks = c => { try { localStorage.setItem(CHECKS_KEY, JSON.stringify(c)); } catch {} };

function getDefaultSchedule() {
  return {
    0: [], // Dom
    1: ["ativacao", "muscA"],
    2: ["yoga"],
    3: ["corrida", "muscB"],
    4: ["yoga"],
    5: ["ativacao", "muscC"],
    6: ["corrida", "yoga"],
  };
}

function getDateKey(date) {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}

function isChecked(date, activityKey) {
  const checks = loadChecks();
  const key = getDateKey(date);
  return !!(checks[key] && checks[key][activityKey]);
}

function toggleCheck(date, activityKey) {
  const checks = loadChecks();
  const key = getDateKey(date);
  if (!checks[key]) checks[key] = {};
  checks[key][activityKey] = !checks[key][activityKey];
  if (!checks[key][activityKey]) delete checks[key][activityKey];
  if (Object.keys(checks[key]).length === 0) delete checks[key];
  saveChecks(checks);
}

function isWorkoutCompleted(date, workoutKey) {
  const dateKey = getDateKey(date);
  const data = load();
  const start = new Date(dateKey).getTime();
  const end = start + 86400000;
  return Object.values(data).some(entries =>
    entries.some(e => {
      const t = new Date(e.date).getTime();
      return t >= start && t < end;
    })
  );
}

/* Per-day overrides: changes to today's schedule without altering the template */
const OVERRIDES_KEY = "treino_overrides_v1";
const loadOverrides = () => { try { return JSON.parse(localStorage.getItem(OVERRIDES_KEY)) || {}; } catch { return {}; } };
const saveOverrides = o => { try { localStorage.setItem(OVERRIDES_KEY, JSON.stringify(o)); } catch {} };

function getActivitiesForDate(date) {
  const dateKey = getDateKey(date);
  const overrides = loadOverrides();
  if (overrides[dateKey]) return overrides[dateKey];
  const schedule = loadSchedule();
  return schedule[date.getDay()] || [];
}

function setActivitiesForDate(date, activities) {
  const overrides = loadOverrides();
  overrides[getDateKey(date)] = activities;
  saveOverrides(overrides);
}

function resetActivitiesForDate(date) {
  const overrides = loadOverrides();
  delete overrides[getDateKey(date)];
  saveOverrides(overrides);
}

/* ═══════════ HELPERS ═══════════ */
function getAllExercises(k) {
  const l = [];
  WORKOUTS[k].sections.forEach(s => s.exercises.forEach(e => l.push({ ...e, section: s.name, rest: s.rest })));
  return l;
}
function getAllWeighted() {
  const list = [];
  Object.values(WORKOUTS).forEach(w => w.sections.forEach(s => s.exercises.forEach(e => { if (!e.noWeight) list.push(e); })));
  return list;
}
function getSuggestion(last, compound) {
  if (!last?.weight) return null;
  const w = parseFloat(last.weight), inc = compound ? 5 : 2.5, sm = compound ? 2.5 : 1;
  const map = { leve: [w+inc, "Leve — subir"], moderado: [w+sm, "Moderado — subir pouco"], pesado: [w, "Zona ideal — manter"], maximo: [w, "Limite — manter"], falha: [Math.max(0, w-inc), "Falha — reduzir"] };
  const r = map[last.effort] || [w, "Manter"];
  return { weight: r[0], reason: r[1] };
}
function getConsHeavy(id) {
  const h = getHist(id); let c = 0;
  for (const x of h) { if (x.effort === "pesado") c++; else break; }
  return c;
}
function getWeekKey(date) {
  const d = new Date(date);
  const jan1 = new Date(d.getFullYear(), 0, 1);
  const days = Math.floor((d - jan1) / 86400000);
  return `${d.getFullYear()}-W${Math.ceil((days + jan1.getDay() + 1) / 7)}`;
}
function getPR(id) {
  const h = getHist(id);
  if (!h.length) return null;
  return h.reduce((m, e) => (parseFloat(e.weight)||0) > (parseFloat(m.weight)||0) ? e : m, h[0]);
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
      const prev = getWeekKey(new Date(Date.now() - 7*86400000));
      if (weeks[0] !== prev) break;
    }
    if (i > 0) {
      const [y1,w1] = weeks[i-1].split("-W").map(Number);
      const [y2,w2] = weeks[i].split("-W").map(Number);
      if (!(y1===y2 && w1-w2===1) && !(y1>y2 && w2>=50 && w1<=2)) break;
    }
    streak++;
  }
  return streak;
}
function getWeekDates(offset = 0) {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1) + offset * 7);
  monday.setHours(0, 0, 0, 0);
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    dates.push(d);
  }
  return dates;
}

/* ═══════════ COMPONENTS ═══════════ */
function ActivityBadge({ activityKey, size = "md" }) {
  const act = ACTIVITY_TYPES[activityKey];
  if (!act) return null;
  const sizes = {
    sm: { w: 22, h: 22, fs: 10 },
    md: { w: 28, h: 28, fs: 11 },
    lg: { w: 36, h: 36, fs: 13 },
  };
  const s = sizes[size];
  return (
    <div style={{
      width: s.w, height: s.h, borderRadius: 6, background: act.color,
      color: "#fff", fontSize: s.fs, fontWeight: 600,
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0,
    }}>{act.short}</div>
  );
}

/* ═══════════ TODAY SCREEN ═══════════ */
function TodayScreen({ onStartWorkout, onOpenCalendar, onOpenConfig, onOpenHistory }) {
  const [, forceUpdate] = useState({});
  const [openMenu, setOpenMenu] = useState(null); // index of card with open menu
  const [showAdd, setShowAdd] = useState(false);
  const today = new Date();
  const schedule = loadSchedule();
  const suggestedActivities = schedule[today.getDay()] || [];
  const todayActivities = getActivitiesForDate(today);
  const isCustomized = JSON.stringify(suggestedActivities) !== JSON.stringify(todayActivities);
  const st = getStreak();

  const handleCheck = (activityKey) => {
    toggleCheck(today, activityKey);
    forceUpdate({});
  };

  const replaceActivity = (idx, newKey) => {
    const next = [...todayActivities];
    next[idx] = newKey;
    setActivitiesForDate(today, next);
    setOpenMenu(null);
    forceUpdate({});
  };

  const removeActivity = (idx) => {
    const next = todayActivities.filter((_, i) => i !== idx);
    setActivitiesForDate(today, next);
    setOpenMenu(null);
    forceUpdate({});
  };

  const addActivity = (newKey) => {
    const next = [...todayActivities, newKey];
    setActivitiesForDate(today, next);
    setShowAdd(false);
    forceUpdate({});
  };

  const resetToSuggestion = () => {
    resetActivitiesForDate(today);
    setOpenMenu(null);
    forceUpdate({});
  };

  const completed = todayActivities.filter(ak => {
    const act = ACTIVITY_TYPES[ak];
    if (!act) return false;
    if (act.kind === "workout") return isWorkoutCompleted(today, act.workoutKey);
    return isChecked(today, ak);
  }).length;

  const otherActivities = Object.entries(ACTIVITY_TYPES).filter(([k]) => k !== "descanso");

  return (
    <div style={{ padding: "24px 16px", maxWidth: 420, margin: "0 auto", paddingBottom: 80 }}>
      <div style={{ fontSize: 11, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>
        {today.toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long" })}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, margin: 0 }}>Hoje</h1>
        {isCustomized && (
          <button onClick={resetToSuggestion} style={{
            background: "none", border: "none", cursor: "pointer",
            fontSize: 11, color: "#0d9488", textDecoration: "underline", padding: 4,
          }}>Voltar à sugestão</button>
        )}
      </div>

      {st > 0 && (
        <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, padding: "10px 14px", marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "#166534" }}>{st} {st===1?"semana":"semanas"} consecutivas</span>
          <span style={{ fontSize: 16 }}>{"🔥".repeat(Math.min(st, 5))}</span>
        </div>
      )}

      {!isCustomized && suggestedActivities.length > 0 && (
        <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 12, fontStyle: "italic" }}>
          Sugestão do dia — toque em ⋯ pra personalizar
        </div>
      )}

      {todayActivities.length === 0 ? (
        <div style={{ background: "#f9fafb", borderRadius: 12, padding: 24, textAlign: "center", marginBottom: 16 }}>
          <div style={{ fontSize: 14, color: "#6b7280", marginBottom: 8 }}>Dia livre</div>
          <div style={{ fontSize: 12, color: "#9ca3af" }}>Nenhuma atividade — toque abaixo pra adicionar</div>
        </div>
      ) : (
        <>
          <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 12 }}>
            {completed} de {todayActivities.length} concluído{todayActivities.length > 1 ? "s" : ""}
          </div>
          {todayActivities.map((ak, idx) => {
            const act = ACTIVITY_TYPES[ak];
            if (!act) return null;
            const isComplete = act.kind === "workout"
              ? isWorkoutCompleted(today, act.workoutKey)
              : isChecked(today, ak);
            const menuOpen = openMenu === idx;

            return (
              <div key={idx} style={{ position: "relative", marginBottom: 10 }}>
                <div style={{
                  background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12,
                  padding: 14, display: "flex", alignItems: "center", gap: 10,
                  borderLeft: `4px solid ${act.color}`,
                  opacity: isComplete ? 0.6 : 1,
                }}>
                  <ActivityBadge activityKey={ak} size="lg" />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: "#111827", textDecoration: isComplete ? "line-through" : "none" }}>
                      {act.label}
                    </div>
                    {act.kind === "workout" && (
                      <div style={{ fontSize: 12, color: "#6b7280" }}>
                        {WORKOUTS[act.workoutKey].subtitle}
                      </div>
                    )}
                  </div>
                  {act.kind === "workout" ? (
                    <button onClick={() => onStartWorkout(act.workoutKey)} style={{
                      padding: "7px 12px", background: isComplete ? "#f3f4f6" : act.color,
                      color: isComplete ? "#6b7280" : "#fff", border: "none", borderRadius: 8,
                      fontSize: 13, fontWeight: 500, cursor: "pointer",
                    }}>
                      {isComplete ? "Refazer" : "Iniciar"}
                    </button>
                  ) : act.kind === "check" ? (
                    <button onClick={() => handleCheck(ak)} style={{
                      padding: "7px 12px", background: isComplete ? "#10b981" : "#fff",
                      color: isComplete ? "#fff" : "#6b7280",
                      border: isComplete ? "none" : "1px solid #d1d5db", borderRadius: 8,
                      fontSize: 13, fontWeight: 500, cursor: "pointer",
                    }}>
                      {isComplete ? "✓ Feito" : "Marcar"}
                    </button>
                  ) : null}
                  <button
                    onClick={() => setOpenMenu(menuOpen ? null : idx)}
                    style={{
                      padding: "6px 8px", background: menuOpen ? "#f3f4f6" : "transparent",
                      border: "none", cursor: "pointer", fontSize: 16, color: "#9ca3af",
                      borderRadius: 6,
                    }}
                    aria-label="Opções"
                  >⋯</button>
                </div>

                {menuOpen && (
                  <div style={{
                    position: "absolute", top: "100%", right: 0, marginTop: 4,
                    background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    zIndex: 10, minWidth: 220, padding: 6,
                  }}>
                    <div style={{ fontSize: 10, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.05em", padding: "6px 10px 4px" }}>
                      Trocar por
                    </div>
                    {otherActivities.filter(([k]) => k !== ak).map(([k, a]) => (
                      <button key={k} onClick={() => replaceActivity(idx, k)} style={{
                        display: "flex", alignItems: "center", gap: 10,
                        width: "100%", padding: "8px 10px", background: "none",
                        border: "none", cursor: "pointer", textAlign: "left",
                        borderRadius: 6,
                      }}>
                        <ActivityBadge activityKey={k} size="sm" />
                        <span style={{ fontSize: 13, color: "#374151" }}>{a.label}</span>
                      </button>
                    ))}
                    <div style={{ borderTop: "1px solid #f3f4f6", marginTop: 4, paddingTop: 4 }}>
                      <button onClick={() => removeActivity(idx)} style={{
                        display: "block", width: "100%", padding: "8px 10px",
                        background: "none", border: "none", cursor: "pointer",
                        textAlign: "left", fontSize: 13, color: "#dc2626", borderRadius: 6,
                      }}>
                        Remover do dia
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </>
      )}

      {/* Add activity button + panel */}
      {!showAdd ? (
        <button onClick={() => setShowAdd(true)} style={{
          display: "block", width: "100%", padding: 12, marginTop: 8,
          background: "#fff", border: "1px dashed #d1d5db", borderRadius: 10,
          cursor: "pointer", fontSize: 13, color: "#6b7280", fontWeight: 500,
        }}>
          + Adicionar atividade
        </button>
      ) : (
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: 10, marginTop: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 6px 8px" }}>
            <span style={{ fontSize: 12, color: "#6b7280", fontWeight: 500 }}>Escolher atividade</span>
            <button onClick={() => setShowAdd(false)} style={{
              background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#9ca3af", padding: 2,
            }}>×</button>
          </div>
          {otherActivities.map(([k, a]) => (
            <button key={k} onClick={() => addActivity(k)} style={{
              display: "flex", alignItems: "center", gap: 10,
              width: "100%", padding: "10px", background: "none",
              border: "none", cursor: "pointer", textAlign: "left",
              borderRadius: 6,
            }}>
              <ActivityBadge activityKey={k} size="md" />
              <span style={{ fontSize: 13, color: "#374151" }}>{a.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Bottom nav */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: "#fff", borderTop: "1px solid #e5e7eb",
        display: "flex", justifyContent: "space-around",
        padding: "8px 0", maxWidth: 420, margin: "0 auto",
      }}>
        <NavBtn label="Hoje" active />
        <NavBtn label="Calendário" onClick={onOpenCalendar} />
        <NavBtn label="Config" onClick={onOpenConfig} />
        <NavBtn label="Histórico" onClick={onOpenHistory} />
      </div>
    </div>
  );
}

function NavBtn({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      flex: 1, padding: "8px 4px", background: "none", border: "none",
      cursor: "pointer", fontSize: 11, fontWeight: active ? 600 : 500,
      color: active ? "#0d9488" : "#6b7280",
    }}>{label}</button>
  );
}

/* ═══════════ CALENDAR SCREEN ═══════════ */
function CalendarScreen({ onBack, onStartWorkout }) {
  const [weekOffset, setWeekOffset] = useState(0);
  const [, forceUpdate] = useState({});
  const weekDates = getWeekDates(weekOffset);
  const schedule = loadSchedule();

  return (
    <div style={{ padding: "16px", maxWidth: 420, margin: "0 auto", paddingBottom: 24 }}>
      <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "#6b7280", padding: 4, marginBottom: 12 }}>← Voltar</button>
      <h2 style={{ fontSize: 20, fontWeight: 600, margin: "0 0 16px" }}>Calendário</h2>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <button onClick={() => setWeekOffset(weekOffset - 1)} style={{ background: "#f3f4f6", border: "none", borderRadius: 6, padding: "6px 12px", cursor: "pointer", fontSize: 12 }}>← Anterior</button>
        <span style={{ fontSize: 13, color: "#374151", fontWeight: 500 }}>
          {weekOffset === 0 ? "Esta semana" : weekOffset === -1 ? "Semana passada" : weekOffset === 1 ? "Próxima semana" : `${Math.abs(weekOffset)} semanas ${weekOffset < 0 ? "atrás" : "à frente"}`}
        </span>
        <button onClick={() => setWeekOffset(weekOffset + 1)} style={{ background: "#f3f4f6", border: "none", borderRadius: 6, padding: "6px 12px", cursor: "pointer", fontSize: 12 }}>Próxima →</button>
      </div>

      {weekDates.map((d, idx) => {
        const dayIdx = d.getDay();
        const activities = getActivitiesForDate(d);
        const isToday = getDateKey(d) === getDateKey(new Date());

        return (
          <div key={idx} style={{
            padding: "12px 14px", marginBottom: 8,
            background: isToday ? "#f0fdfa" : "#fff",
            border: isToday ? "1px solid #99f6e4" : "1px solid #e5e7eb",
            borderRadius: 10,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: activities.length > 0 ? 8 : 0 }}>
              <div>
                <span style={{ fontSize: 11, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  {DAYS_FULL[dayIdx]}
                </span>
                <span style={{ fontSize: 13, color: "#374151", fontWeight: 500, marginLeft: 8 }}>
                  {d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })}
                </span>
                {isToday && <span style={{ fontSize: 10, color: "#0d9488", marginLeft: 8, fontWeight: 600 }}>HOJE</span>}
              </div>
            </div>
            {activities.length === 0 ? (
              <div style={{ fontSize: 12, color: "#9ca3af" }}>Descanso</div>
            ) : (
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {activities.map((ak, i) => {
                  const act = ACTIVITY_TYPES[ak];
                  if (!act) return null;
                  const isComplete = act.kind === "workout"
                    ? isWorkoutCompleted(d, act.workoutKey)
                    : isChecked(d, ak);
                  return (
                    <div key={i} style={{
                      display: "flex", alignItems: "center", gap: 6,
                      background: isComplete ? "#f0fdf4" : "#f9fafb",
                      padding: "4px 8px 4px 4px", borderRadius: 6,
                      border: isComplete ? "1px solid #bbf7d0" : "1px solid #e5e7eb",
                    }}>
                      <ActivityBadge activityKey={ak} size="sm" />
                      <span style={{ fontSize: 12, color: "#374151" }}>{act.label}</span>
                      {isComplete && <span style={{ fontSize: 11, color: "#10b981", marginLeft: 2 }}>✓</span>}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ═══════════ CONFIG SCREEN ═══════════ */
function ConfigScreen({ onBack }) {
  const [schedule, setSchedule] = useState(loadSchedule());
  const [selectedDay, setSelectedDay] = useState(null);

  const save = (newSchedule) => {
    setSchedule(newSchedule);
    saveSchedule(newSchedule);
  };

  const toggleActivity = (dayIdx, activityKey) => {
    const newSchedule = { ...schedule };
    const current = newSchedule[dayIdx] || [];
    if (current.includes(activityKey)) {
      newSchedule[dayIdx] = current.filter(a => a !== activityKey);
    } else {
      newSchedule[dayIdx] = [...current, activityKey];
    }
    save(newSchedule);
  };

  const resetToDefault = () => {
    if (confirm("Restaurar agenda padrão? As configurações atuais serão perdidas.")) {
      const def = getDefaultSchedule();
      save(def);
    }
  };

  return (
    <div style={{ padding: "16px", maxWidth: 420, margin: "0 auto", paddingBottom: 24 }}>
      <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "#6b7280", padding: 4, marginBottom: 12 }}>← Voltar</button>
      <h2 style={{ fontSize: 20, fontWeight: 600, margin: "0 0 4px" }}>Configurar semana</h2>
      <p style={{ fontSize: 12, color: "#6b7280", margin: "0 0 20px" }}>Toque pra adicionar/remover atividades</p>

      {DAYS_FULL.map((dayName, dayIdx) => {
        const activities = schedule[dayIdx] || [];
        const isExpanded = selectedDay === dayIdx;

        return (
          <div key={dayIdx} style={{
            background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10,
            marginBottom: 8, overflow: "hidden",
          }}>
            <button onClick={() => setSelectedDay(isExpanded ? null : dayIdx)} style={{
              width: "100%", padding: "12px 14px", background: "none",
              border: "none", cursor: "pointer", textAlign: "left",
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <div>
                <span style={{ fontSize: 14, fontWeight: 500, color: "#111827" }}>{dayName}</span>
                {activities.length > 0 && (
                  <span style={{ fontSize: 11, color: "#6b7280", marginLeft: 8 }}>
                    ({activities.length} {activities.length === 1 ? "atividade" : "atividades"})
                  </span>
                )}
              </div>
              <span style={{ fontSize: 12, color: "#9ca3af" }}>{isExpanded ? "↑" : "↓"}</span>
            </button>

            {!isExpanded && activities.length > 0 && (
              <div style={{ padding: "0 14px 12px", display: "flex", gap: 6, flexWrap: "wrap" }}>
                {activities.map((ak, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <ActivityBadge activityKey={ak} size="sm" />
                    <span style={{ fontSize: 11, color: "#6b7280" }}>{ACTIVITY_TYPES[ak].label}</span>
                  </div>
                ))}
              </div>
            )}

            {isExpanded && (
              <div style={{ padding: "8px 14px 14px", borderTop: "1px solid #f3f4f6" }}>
                {Object.entries(ACTIVITY_TYPES).filter(([k]) => k !== "descanso").map(([ak, act]) => {
                  const selected = activities.includes(ak);
                  return (
                    <button key={ak} onClick={() => toggleActivity(dayIdx, ak)} style={{
                      display: "flex", alignItems: "center", gap: 10,
                      width: "100%", padding: "8px 10px", marginBottom: 4,
                      background: selected ? `${act.color}11` : "#fff",
                      border: selected ? `1px solid ${act.color}66` : "1px solid #e5e7eb",
                      borderRadius: 8, cursor: "pointer", textAlign: "left",
                    }}>
                      <ActivityBadge activityKey={ak} size="sm" />
                      <span style={{ fontSize: 13, color: "#374151", flex: 1 }}>{act.label}</span>
                      {selected && <span style={{ fontSize: 14, color: act.color }}>✓</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      <button onClick={resetToDefault} style={{
        display: "block", width: "100%", padding: "12px", marginTop: 16,
        background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 10,
        cursor: "pointer", fontSize: 13, color: "#6b7280",
      }}>
        Restaurar agenda padrão
      </button>
    </div>
  );
}

/* ═══════════ WORKOUT SCREEN (existing) ═══════════ */
function WorkoutScreen({ wk, onFinish, onBack }) {
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

  const nav = dir => { setShowDesc(false); setNewPR(false); setIdx(idx + dir); };
  const finish = () => {
    Object.entries(entries).forEach(([id, e]) => { if (e.weight || e.reps || e.effort) saveEntry(id, e); });
    onFinish(entries);
  };

  return (
    <div style={{ padding: "16px", maxWidth: 420, margin: "0 auto", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "#6b7280" }}>← Voltar</button>
        <span style={{ fontSize: 13, color: "#9ca3af" }}>{idx+1}/{exercises.length}</span>
      </div>

      <div style={{ height: 3, background: "#e5e7eb", borderRadius: 2, marginBottom: 16 }}>
        <div style={{ height: 3, background: workout.color, borderRadius: 2, width: `${((idx+1)/exercises.length)*100}%`, transition: "width 0.3s" }} />
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
      }}>{showDesc ? "Esconder ↑" : "Como executar ↓"}</button>
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
          Novo recorde!
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
                  style={{ width: "100%", padding: 12, fontSize: 18, fontWeight: 600, border: "1px solid #d1d5db", borderRadius: 8, textAlign: "center", boxSizing: "border-box", outline: "none" }}/>
              </div>
              <div>
                <label style={{ fontSize: 12, color: "#6b7280", display: "block", marginBottom: 4 }}>Reps</label>
                <input type="number" inputMode="numeric" value={entry.reps} onChange={e => upd("reps", e.target.value)}
                  placeholder={ex.reps.split(" ")[0]}
                  style={{ width: "100%", padding: 12, fontSize: 18, fontWeight: 600, border: "1px solid #d1d5db", borderRadius: 8, textAlign: "center", boxSizing: "border-box", outline: "none" }}/>
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

function SummaryScreen({ wk, entries, onBack }) {
  const workout = WORKOUTS[wk];
  const exercises = getAllExercises(wk);
  const filled = exercises.filter(ex => entries[ex.id] && (entries[ex.id].weight || entries[ex.id].reps));
  const prs = filled.filter(ex => entries[ex.id].weight && isNewPR(ex.id, entries[ex.id].weight));
  const totalVol = filled.reduce((s, ex) => s + (parseFloat(entries[ex.id].weight)||0) * (parseFloat(entries[ex.id].reps)||0), 0);

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
            <div>
              <span style={{ fontSize: 13, fontWeight: 600 }}>{e.weight}kg × {e.reps}</span>
              {eff && <span style={{ fontSize: 11, color: eff.color, marginLeft: 8 }}>{eff.label}</span>}
            </div>
          </div>
        );
      })}

      <button onClick={onBack} style={{
        display: "block", width: "100%", padding: 14, marginTop: 32, background: "#111827",
        border: "none", borderRadius: 10, color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer",
      }}>Voltar</button>
    </div>
  );
}

/* ═══════════ HISTORY SCREEN (simplified) ═══════════ */
function HistoryScreen({ onBack }) {
  const [sel, setSel] = useState(null);
  const allW = useMemo(() => {
    const l = [];
    Object.entries(WORKOUTS).forEach(([k, w]) => w.sections.forEach(s => s.exercises.forEach(e => {
      if (!e.noWeight) l.push({ ...e, wk: k, wName: w.name, color: w.color });
    })));
    return l;
  }, []);

  const data = load();
  const allEntries = [];
  Object.entries(data).forEach(([id, arr]) => arr.forEach(e => allEntries.push({ ...e, id })));
  const thisWeek = getWeekKey(new Date());
  const lastWeek = getWeekKey(new Date(Date.now() - 7*86400000));
  const thisVol = allEntries.filter(e => getWeekKey(e.date) === thisWeek).reduce((s,e) => s + (parseFloat(e.weight)||0)*(parseFloat(e.reps)||0), 0);
  const lastVol = allEntries.filter(e => getWeekKey(e.date) === lastWeek).reduce((s,e) => s + (parseFloat(e.weight)||0)*(parseFloat(e.reps)||0), 0);
  const volDiff = lastVol > 0 ? ((thisVol - lastVol) / lastVol * 100) : 0;
  const streak = getStreak();

  if (sel) {
    const hist = getHist(sel.id);
    const pr = getPR(sel.id);
    return (
      <div style={{ padding: "16px", maxWidth: 420, margin: "0 auto" }}>
        <button onClick={() => setSel(null)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "#6b7280", marginBottom: 16 }}>← Voltar</button>
        <h2 style={{ fontSize: 18, fontWeight: 600, margin: "0 0 4px" }}>{sel.name}</h2>
        <p style={{ fontSize: 12, color: sel.color, margin: "0 0 20px" }}>{sel.wName}</p>
        {pr && (
          <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 8, padding: "10px 12px", marginBottom: 16 }}>
            <span style={{ fontSize: 13, color: "#92400e", fontWeight: 600 }}>PR: {pr.weight}kg</span>
          </div>
        )}
        {hist.length === 0 ? <p style={{ fontSize: 13, color: "#9ca3af" }}>Nenhum registro</p> :
          hist.slice(0, 20).map((h, i) => {
            const eff = EFFORT_OPTS.find(o => o.value === h.effort);
            return (
              <div key={i} style={{ padding: "10px 0", borderBottom: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 12, color: "#9ca3af" }}>
                  {new Date(h.date).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "2-digit" })}
                </span>
                <div>
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
      <h2 style={{ fontSize: 18, fontWeight: 600, margin: "0 0 20px" }}>Histórico</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 20 }}>
        <div style={{ background: "#f9fafb", borderRadius: 10, padding: "12px 10px", textAlign: "center" }}>
          <div style={{ fontSize: 10, color: "#6b7280" }}>Semana</div>
          <div style={{ fontSize: 16, fontWeight: 600 }}>{Math.round(thisVol).toLocaleString()}</div>
        </div>
        <div style={{ background: "#f9fafb", borderRadius: 10, padding: "12px 10px", textAlign: "center" }}>
          <div style={{ fontSize: 10, color: "#6b7280" }}>vs anterior</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: volDiff > 0 ? "#059669" : volDiff < 0 ? "#dc2626" : "#6b7280" }}>
            {volDiff > 0 ? "+" : ""}{Math.round(volDiff)}%
          </div>
        </div>
        <div style={{ background: "#f9fafb", borderRadius: 10, padding: "12px 10px", textAlign: "center" }}>
          <div style={{ fontSize: 10, color: "#6b7280" }}>Streak</div>
          <div style={{ fontSize: 16, fontWeight: 600 }}>{streak}</div>
        </div>
      </div>
      {Object.entries(WORKOUTS).map(([k, w]) => (
        <div key={k} style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: w.color, margin: "0 0 8px" }}>{w.name}</h3>
          {allW.filter(e => e.wk === k).map(ex => {
            const last = getLast(ex.id);
            return (
              <button key={ex.id} onClick={() => setSel(ex)} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                width: "100%", padding: "10px 12px", marginBottom: 4,
                background: "#fff", border: "1px solid #f3f4f6", borderRadius: 8,
                cursor: "pointer", textAlign: "left", boxSizing: "border-box",
              }}>
                <span style={{ fontSize: 13 }}>{ex.name}</span>
                <span style={{ fontSize: 12, color: "#9ca3af" }}>{last ? `${last.weight || "—"}kg` : "—"}</span>
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

/* ═══════════ APP ═══════════ */
export default function App() {
  const [screen, setScreen] = useState("today");
  const [wk, setWk] = useState(null);
  const [done, setDone] = useState(null);

  return (
    <div style={{ fontFamily: "'SF Pro Text', -apple-system, system-ui, sans-serif", background: "#fff", minHeight: "100vh" }}>
      {screen === "today" && (
        <TodayScreen
          onStartWorkout={k => { setWk(k); setScreen("workout"); }}
          onOpenCalendar={() => setScreen("calendar")}
          onOpenConfig={() => setScreen("config")}
          onOpenHistory={() => setScreen("history")}
        />
      )}
      {screen === "calendar" && <CalendarScreen onBack={() => setScreen("today")} onStartWorkout={k => { setWk(k); setScreen("workout"); }} />}
      {screen === "config" && <ConfigScreen onBack={() => setScreen("today")} />}
      {screen === "workout" && wk && <WorkoutScreen wk={wk} onBack={() => setScreen("today")} onFinish={e => { setDone(e); setScreen("summary"); }} />}
      {screen === "summary" && wk && <SummaryScreen wk={wk} entries={done || {}} onBack={() => { setWk(null); setDone(null); setScreen("today"); }} />}
      {screen === "history" && <HistoryScreen onBack={() => setScreen("today")} />}
    </div>
  );
}
