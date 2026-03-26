import { useState } from "react";

const accentColors = ["#FF6B35","#F4A261","#E63946","#9B2226","#6A0572","#FFD60A"];

// ✅ ALL exercises use ONLY: barbell, dumbbell, EZ bar, weight plates,
//    flat/incline/preacher bench, cable station (lat bar, straight bar, rope, v-bar),
//    dip station, pull-up bar, chest press machine, cable crossover,
//    hack squat machine, leg press machine, Smith machine, shoulder machine,
//    curved self-powered treadmill (great for HIIT — you push it yourself)

const gymWeeks = [
  {
    week:1, label:"WEEK 1", subtitle:"Foundation", color:"#FF6B35",
    days:[
      { day:"MON", focus:"Core + Treadmill LISS", tip:"Controlled reps. Learn the movements today. Breathe out on every crunch.",
        exercises:[
          {name:"Curved Treadmill Warm-up",detail:"10 min moderate jog (self-powered — you set the pace)",icon:"🏃",eq:"Curved Treadmill"},
          {name:"Cable Crunches",detail:"3 × 15 reps — kneel, rope behind head",icon:"💪",eq:"Cable Station + Rope"},
          {name:"Hanging Leg Raises",detail:"3 × 12 reps — slow & controlled",icon:"🦵",eq:"Pull-up Bar"},
          {name:"Floor Plank Hold",detail:"3 × 30 sec",icon:"🧱",eq:"Floor"},
          {name:"Treadmill Incline Walk (LISS)",detail:"20 min steady — incline 8, slow pace",icon:"⛰️",eq:"Curved Treadmill"},
        ]},
      { day:"TUE", focus:"Upper Body + Abs", tip:"Keep core tight during every press. Don't arch lower back.",
        exercises:[
          {name:"Treadmill Jog Warm-up",detail:"8 min easy",icon:"🏃",eq:"Curved Treadmill"},
          {name:"Dumbbell Flat Bench Press",detail:"3 × 12 reps",icon:"🏋️",eq:"Dumbbell + Flat Bench"},
          {name:"Lat Pulldown (wide grip)",detail:"3 × 12 reps",icon:"📉",eq:"Cable Station + Lat Bar"},
          {name:"Dumbbell Russian Twists",detail:"3 × 20 reps (10 each side)",icon:"🔄",eq:"Dumbbell"},
          {name:"Hanging Knee Raises",detail:"3 × 12 reps",icon:"🦵",eq:"Pull-up Bar"},
          {name:"Treadmill Incline Walk",detail:"15 min — incline 8",icon:"⛰️",eq:"Curved Treadmill"},
        ]},
      { day:"WED", focus:"Legs + Core", tip:"Squats burn the most calories. Go deep, chest up, knees out.",
        exercises:[
          {name:"Treadmill Jog Warm-up",detail:"8 min easy",icon:"🏃",eq:"Curved Treadmill"},
          {name:"Barbell Squat",detail:"4 × 10 reps",icon:"🏋️",eq:"Barbell + Squat Rack"},
          {name:"Leg Press",detail:"3 × 15 reps — feet shoulder-width",icon:"🦵",eq:"Leg Press Machine"},
          {name:"Cable Crunches",detail:"3 × 15 reps",icon:"💪",eq:"Cable Station + Rope"},
          {name:"Cable Woodchop",detail:"3 × 12 each side — high to low",icon:"🪓",eq:"Cable Station"},
          {name:"Treadmill Incline Walk",detail:"15 min — incline 12",icon:"⛰️",eq:"Curved Treadmill"},
        ]},
      { day:"THU", focus:"Full Body Circuit", tip:"Short rest (45 sec). Keep heart rate up the entire session.",
        exercises:[
          {name:"Dumbbell Thrusters",detail:"4 × 12 reps (squat + press combo)",icon:"🔥",eq:"Dumbbells"},
          {name:"Barbell High Pull",detail:"3 × 12 reps — explosive hip drive",icon:"💣",eq:"Barbell"},
          {name:"Dumbbell Romanian Deadlift",detail:"3 × 12 reps — feel the hamstring stretch",icon:"💪",eq:"Dumbbells"},
          {name:"Flat Bench Step-ups",detail:"3 × 12 each leg — step onto bench, drive knee up",icon:"📦",eq:"Flat Bench"},
          {name:"Cable Oblique Crunch",detail:"3 × 12 each side",icon:"↔️",eq:"Cable Station"},
          {name:"Sprint Intervals (Treadmill)",detail:"6 × 30 sec sprint / 30 sec walk",icon:"⚡",eq:"Curved Treadmill"},
        ]},
    ]
  },
  {
    week:2, label:"WEEK 2", subtitle:"Build Up", color:"#F4A261",
    days:[
      { day:"MON", focus:"Core Strength", tip:"Add slight weight to cable crunches vs last week. Own the movement.",
        exercises:[
          {name:"Treadmill Incline Walk",detail:"12 min — incline 10",icon:"⛰️",eq:"Curved Treadmill"},
          {name:"Incline Bench Reverse Crunch",detail:"4 × 15 reps — sit backwards on incline bench, raise knees to chest",icon:"🏋️",eq:"Incline Bench"},
          {name:"Hanging Leg Raises",detail:"4 × 12 reps",icon:"🦵",eq:"Pull-up Bar"},
          {name:"Floor Plank with Hip Dips",detail:"3 × 35 sec",icon:"〽️",eq:"Floor"},
          {name:"Treadmill Sprint HIIT",detail:"15 min — 30 sec sprint / 30 sec walk",icon:"⚡",eq:"Curved Treadmill"},
        ]},
      { day:"TUE", focus:"Upper Body + Obliques", tip:"Superset press and twist for max fat burn.",
        exercises:[
          {name:"Treadmill Jog Warm-up",detail:"5 min easy",icon:"🏃",eq:"Curved Treadmill"},
          {name:"Incline Dumbbell Press",detail:"3 × 12 reps",icon:"🏋️",eq:"Dumbbell + Incline Bench"},
          {name:"Seated Cable Row (V-bar)",detail:"3 × 12 reps — pull to belly button",icon:"🔗",eq:"Cable Station + V-bar"},
          {name:"Dumbbell Woodchop",detail:"3 × 15 each side",icon:"🪓",eq:"Dumbbell"},
          {name:"Cable Pallof Press",detail:"3 × 12 each side — anti-rotation",icon:"💡",eq:"Cable Station"},
          {name:"Treadmill HIIT",detail:"15 min — 30 sec fast / 30 sec easy",icon:"⚡",eq:"Curved Treadmill"},
        ]},
      { day:"WED", focus:"Lower Body + Core", tip:"More weight on squats. Control the descent — 3 sec down.",
        exercises:[
          {name:"Treadmill Jog Warm-up",detail:"8 min easy",icon:"🏃",eq:"Curved Treadmill"},
          {name:"Barbell Squat",detail:"4 × 10 reps (heavier than W1)",icon:"🏋️",eq:"Barbell + Squat Rack"},
          {name:"Walking Lunges (Dumbbell)",detail:"3 × 12 each leg",icon:"🚶",eq:"Dumbbells"},
          {name:"Cable Crunches (weighted)",detail:"3 × 12 reps — heavier than W1",icon:"💪",eq:"Cable Station + Rope"},
          {name:"Hanging Knee Raises",detail:"3 × 15 reps",icon:"🦵",eq:"Pull-up Bar"},
          {name:"Treadmill Incline Walk",detail:"20 min — incline 12",icon:"⛰️",eq:"Curved Treadmill"},
        ]},
      { day:"THU", focus:"Metabolic Circuit", tip:"No rest between exercises within a round. Rest 60 sec between rounds.",
        exercises:[
          {name:"Cable Pull-throughs",detail:"4 × 20 reps — hip hinge, drive hips forward",icon:"🔗",eq:"Cable Station + Rope"},
          {name:"Dumbbell Farmer Carry",detail:"4 × 30 meters — heavy, walk the gym floor",icon:"💼",eq:"Dumbbells (Heavy)"},
          {name:"Dumbbell Thrusters",detail:"4 × 15 reps — deep squat to overhead press",icon:"🔥",eq:"Dumbbells"},
          {name:"Hanging Knee Raises",detail:"4 × 15 reps",icon:"🦵",eq:"Pull-up Bar"},
          {name:"Floor Plank Hold",detail:"4 × 45 sec",icon:"🧱",eq:"Floor"},
          {name:"Treadmill Sprints",detail:"5 × 1 min hard / 1 min walk",icon:"⚡",eq:"Curved Treadmill"},
        ]},
    ]
  },
  {
    week:3, label:"WEEK 3", subtitle:"Intensity Up", color:"#E63946",
    days:[
      { day:"MON", focus:"Advanced Core + HIIT", tip:"Keep rest under 45 sec. Don't baby yourself.",
        exercises:[
          {name:"Treadmill Warm-up",detail:"10 min jog",icon:"🏃",eq:"Curved Treadmill"},
          {name:"Dragon Flag (or negatives)",detail:"3 × 5–6 reps — flat bench, hold sides",icon:"🐉",eq:"Flat Bench"},
          {name:"Dip Station Leg Raises",detail:"4 × 12 reps — hang from dips, raise legs straight",icon:"📌",eq:"Dip Station"},
          {name:"Cable Twists",detail:"4 × 15 each side",icon:"🔄",eq:"Cable Station"},
          {name:"Treadmill Tabata Sprints",detail:"10 min — 20 sec max effort / 10 sec rest",icon:"⚡",eq:"Curved Treadmill"},
        ]},
      { day:"TUE", focus:"Push + Pull + Abs", tip:"Compound lifts torch fat long after the gym. Go heavy.",
        exercises:[
          {name:"Barbell Bench Press",detail:"4 × 10 reps",icon:"🏋️",eq:"Barbell + Flat Bench Press Rack"},
          {name:"Barbell Bent-over Row",detail:"4 × 10 reps — back parallel to floor",icon:"💪",eq:"Barbell"},
          {name:"Dumbbell Shoulder Press",detail:"3 × 12 reps",icon:"🔝",eq:"Dumbbells"},
          {name:"Cable Crunches (heavy)",detail:"4 × 12 reps",icon:"💪",eq:"Cable Station + Rope"},
          {name:"Russian Twists (weight plate)",detail:"4 × 25 reps",icon:"🔀",eq:"Weight Plate"},
          {name:"Treadmill Sprint Intervals",detail:"8 × 20 sec all-out sprint",icon:"⚡",eq:"Curved Treadmill"},
        ]},
      { day:"WED", focus:"Leg Power + Core Burn", tip:"Heavy squats = massive calorie burn for 48 hrs post-workout.",
        exercises:[
          {name:"Barbell Squat",detail:"5 × 8 reps (heavy)",icon:"🏋️",eq:"Barbell + Squat Rack"},
          {name:"Leg Press",detail:"4 × 15 reps",icon:"🦵",eq:"Leg Press Machine"},
          {name:"Dumbbell Romanian Deadlift",detail:"4 × 12 reps",icon:"💪",eq:"Dumbbells"},
          {name:"Hanging Leg Raises (weighted)",detail:"4 × 15 reps — hold dumbbell between feet",icon:"🦵",eq:"Pull-up Bar + Dumbbell"},
          {name:"Cable Pallof Press",detail:"4 × 12 each side",icon:"💡",eq:"Cable Station"},
          {name:"Treadmill Incline Walk",detail:"20 min — incline 12",icon:"⛰️",eq:"Curved Treadmill"},
        ]},
      { day:"THU", focus:"Full Body Power Circuit", tip:"Superset A and B with 60 sec rest between pairs.",
        exercises:[
          {name:"Superset A1: Deadlift (moderate)",detail:"4 × 10 reps",icon:"🏋️",eq:"Barbell"},
          {name:"Superset A2: Cable Woodchop",detail:"4 × 12 each side",icon:"🪓",eq:"Cable Station"},
          {name:"Superset B1: Bench Step-ups (explosive)",detail:"4 × 10 each leg — drive knee up at top",icon:"📦",eq:"Flat Bench"},
          {name:"Superset B2: Dumbbell Thrusters",detail:"4 × 12 reps — squat + overhead press",icon:"🔥",eq:"Dumbbells"},
          {name:"Treadmill Sprint HIIT",detail:"20 min — 30 sec sprint / 30 sec walk",icon:"⚡",eq:"Curved Treadmill"},
        ]},
    ]
  },
  {
    week:4, label:"WEEK 4", subtitle:"Peak Burn", color:"#9B2226",
    days:[
      { day:"MON", focus:"Core Destruction", tip:"Every set should feel like the last one. No phones between sets.",
        exercises:[
          {name:"Treadmill Incline Walk",detail:"20 min — incline 14 (max burn warm-up)",icon:"⛰️",eq:"Curved Treadmill"},
          {name:"Dragon Flag",detail:"4 × 6 reps",icon:"🐉",eq:"Flat Bench"},
          {name:"Hanging Leg Raises (weighted)",detail:"5 × 15 reps — dumbbell between feet",icon:"🦵",eq:"Pull-up Bar + Dumbbell"},
          {name:"Cable Oblique Crunch",detail:"4 × 15 each side",icon:"↔️",eq:"Cable Station"},
          {name:"Floor Plank with Arm Reach",detail:"4 × 45 sec",icon:"🧱",eq:"Floor"},
          {name:"Treadmill Tabata Sprints",detail:"8 × 20 sec max / 10 sec rest",icon:"🔥",eq:"Curved Treadmill"},
        ]},
      { day:"TUE", focus:"Upper Strength + Fat Burn", tip:"Heavier than Week 3. Push the numbers.",
        exercises:[
          {name:"Barbell Bench Press",detail:"5 × 8 reps (heavier than W3)",icon:"🏋️",eq:"Barbell + Flat Bench Press Rack"},
          {name:"Lat Pulldown / Weighted Pull-ups",detail:"4 × 8 reps",icon:"⬇️",eq:"Pull-up Bar / Cable + Lat Bar"},
          {name:"Dumbbell Lateral Raise",detail:"3 × 15 reps",icon:"↕️",eq:"Dumbbells"},
          {name:"Cable Crunches (heavy)",detail:"4 × 12 reps",icon:"💪",eq:"Cable Station + Rope"},
          {name:"Dumbbell Russian Twists",detail:"4 × 30 reps",icon:"🔄",eq:"Dumbbells"},
          {name:"Sprint Intervals (Treadmill)",detail:"10 × 20 sec all-out",icon:"⚡",eq:"Curved Treadmill"},
        ]},
      { day:"WED", focus:"Heavy Leg + Core", tip:"Legs = biggest muscles = most fat torched. Load it heavy.",
        exercises:[
          {name:"Barbell Squat",detail:"5 × 8 reps (peak weight)",icon:"🏋️",eq:"Barbell + Squat Rack"},
          {name:"Romanian Deadlift (Barbell)",detail:"4 × 10 reps",icon:"💪",eq:"Barbell"},
          {name:"Hack Squat Machine",detail:"3 × 15 reps — feet high for hamstring focus",icon:"🦵",eq:"Hack Squat Machine"},
          {name:"Hanging Leg Raises",detail:"5 × 15 reps",icon:"🦵",eq:"Pull-up Bar"},
          {name:"Cable Pallof Press",detail:"4 × 12 each side",icon:"💡",eq:"Cable Station"},
          {name:"Treadmill Incline Walk",detail:"25 min — incline 12",icon:"⛰️",eq:"Curved Treadmill"},
        ]},
      { day:"THU", focus:"Ultimate Metabolic Circuit", tip:"Record your round count. Beat it next week.",
        exercises:[
          {name:"Dumbbell Thrusters",detail:"5 × 15 reps — no rest within the set",icon:"🔥",eq:"Dumbbells"},
          {name:"Cable Pull-throughs",detail:"5 × 20 reps — explosive hip snap",icon:"🔗",eq:"Cable Station + Rope"},
          {name:"Barbell Farmer Carry",detail:"5 × 30 meters — as heavy as possible",icon:"💼",eq:"Barbell (Loaded)"},
          {name:"Dumbbell Squat + Slam",detail:"4 × 15 reps — squat deep, press up explosively",icon:"💣",eq:"Dumbbells"},
          {name:"Treadmill Sprint Finisher",detail:"8 × 20 sec max / 10 sec rest",icon:"🔥",eq:"Curved Treadmill"},
        ]},
    ]
  },
  {
    week:5, label:"WEEK 5", subtitle:"Max Effort", color:"#6A0572",
    days:[
      { day:"MON", focus:"Core Endurance", tip:"5 min non-stop plank challenge. Break only if needed.",
        exercises:[
          {name:"Seated Cable Row (Straight Bar)",detail:"5 sets warm-up — 15 min controlled pace",icon:"🔗",eq:"Cable Station + Straight Bar"},
          {name:"Non-stop Plank Variations",detail:"5 min total (front plank + side plank each side)",icon:"🧱",eq:"Floor"},
          {name:"Dragon Flag",detail:"4 × 6 reps",icon:"🐉",eq:"Flat Bench"},
          {name:"Cable Crunch (heavy)",detail:"4 × 20 reps",icon:"💪",eq:"Cable Station + Rope"},
          {name:"Dip Station Leg Raises",detail:"4 × 12 reps — straight legs, hold at top",icon:"📌",eq:"Dip Station"},
          {name:"Treadmill Sprint HIIT",detail:"10 × 20 sec sprint / 10 sec rest",icon:"⚡",eq:"Curved Treadmill"},
        ]},
      { day:"TUE", focus:"Supersets — Upper Body", tip:"No rest between superset pairs. Rest 60 sec after each pair.",
        exercises:[
          {name:"SS A1: Barbell Bench Press",detail:"5 × 8 reps",icon:"🏋️",eq:"Barbell + Flat Bench Press Rack"},
          {name:"SS A2: Cable Crunches",detail:"5 × 12 reps",icon:"💪",eq:"Cable Station + Rope"},
          {name:"SS B1: Barbell Row",detail:"4 × 10 reps",icon:"💪",eq:"Barbell"},
          {name:"SS B2: Cable Woodchop",detail:"4 × 12 each side",icon:"🪓",eq:"Cable Station"},
          {name:"Treadmill Sprint Finisher",detail:"10 min max effort",icon:"⚡",eq:"Curved Treadmill"},
        ]},
      { day:"WED", focus:"Barbell Leg Power", tip:"Go heavier than week 4. Track your squat weight — write it down.",
        exercises:[
          {name:"Barbell Squat",detail:"6 × 6 reps (heaviest yet)",icon:"🏋️",eq:"Barbell + Squat Rack"},
          {name:"Barbell Romanian Deadlift",detail:"4 × 10 reps",icon:"💪",eq:"Barbell"},
          {name:"Leg Press (high reps)",detail:"3 × 20 reps — controlled speed",icon:"🦵",eq:"Leg Press Machine"},
          {name:"Hanging Leg Raises (weighted)",detail:"5 × 15 reps",icon:"🦵",eq:"Pull-up Bar + Dumbbell"},
          {name:"Floor Plank Shoulder Tap",detail:"4 × 45 sec",icon:"🧱",eq:"Floor"},
          {name:"Treadmill Incline Walk",detail:"25 min — incline 12",icon:"⛰️",eq:"Curved Treadmill"},
        ]},
      { day:"THU", focus:"Power + Cardio Finisher", tip:"Last Thursday before final week. Go all in.",
        exercises:[
          {name:"Deadlift (heavy)",detail:"5 × 6 reps",icon:"🏋️",eq:"Barbell"},
          {name:"Cable Pull-throughs",detail:"5 × 25 reps — explosive",icon:"🔗",eq:"Cable Station + Rope"},
          {name:"Dumbbell Thrusters",detail:"5 × 15 reps — push pace",icon:"🔥",eq:"Dumbbells"},
          {name:"Hack Squat (explosive)",detail:"4 × 12 reps — drive hard off the platform",icon:"🦵",eq:"Hack Squat Machine"},
          {name:"Treadmill Sprint HIIT",detail:"20 min — 30 sec sprint / 30 sec walk",icon:"🔥",eq:"Curved Treadmill"},
        ]},
    ]
  },
  {
    week:6, label:"WEEK 6", subtitle:"Victory Week 🏆", color:"#FFD60A",
    days:[
      { day:"MON", focus:"Peak Core Session", tip:"You've come far. Finish what you started. No excuses today.",
        exercises:[
          {name:"Treadmill Incline Walk",detail:"20 min — incline 14",icon:"⛰️",eq:"Curved Treadmill"},
          {name:"Dragon Flag",detail:"5 × 6 reps",icon:"🐉",eq:"Flat Bench"},
          {name:"Hanging Leg Raises (weighted)",detail:"5 × 15 reps",icon:"🦵",eq:"Pull-up Bar + Dumbbell"},
          {name:"Cable Oblique Crunch",detail:"4 × 15 each side",icon:"↔️",eq:"Cable Station"},
          {name:"Treadmill Tabata Sprint",detail:"10 × 20 sec max / 10 sec rest",icon:"🔥",eq:"Curved Treadmill"},
        ]},
      { day:"TUE", focus:"Final Upper Body", tip:"Beat your week 5 weights. Last upper session!",
        exercises:[
          {name:"Barbell Bench Press",detail:"5 × 6 reps (max weight)",icon:"🏋️",eq:"Barbell + Flat Bench Press Rack"},
          {name:"Weighted Pull-ups",detail:"4 × 8 reps — add weight belt or dumbbell between legs",icon:"⬇️",eq:"Pull-up Bar"},
          {name:"Cable Crunches",detail:"5 × 12 reps (max weight)",icon:"💪",eq:"Cable Station + Rope"},
          {name:"Russian Twists (heavy dumbbell)",detail:"4 × 30 reps",icon:"🔄",eq:"Dumbbell"},
          {name:"Sprint Finisher",detail:"10 × 20 sec all-out",icon:"⚡",eq:"Curved Treadmill"},
        ]},
      { day:"WED", focus:"Final Leg Day", tip:"Your strongest squat session. Leave nothing left.",
        exercises:[
          {name:"Barbell Squat",detail:"6 × 6 reps (peak weight)",icon:"🏋️",eq:"Barbell + Squat Rack"},
          {name:"Romanian Deadlift",detail:"4 × 10 reps",icon:"💪",eq:"Barbell"},
          {name:"Walking Lunges",detail:"4 × 15 each leg",icon:"🚶",eq:"Dumbbells"},
          {name:"Hanging Leg Raises (weighted)",detail:"5 × 15 reps",icon:"🦵",eq:"Pull-up Bar + Dumbbell"},
          {name:"Treadmill Incline Walk",detail:"30 min — final push!",icon:"⛰️",eq:"Curved Treadmill"},
        ]},
      { day:"THU", focus:"🏆 Final Circuit — VICTORY", tip:"Last workout. Go absolutely all out. Nothing held back.",
        exercises:[
          {name:"Treadmill Warm-up",detail:"5 min jog — get the blood moving",icon:"🏃",eq:"Curved Treadmill"},
          {name:"Cable Pull-throughs",detail:"5 × 25 reps",icon:"🔗",eq:"Cable Station + Rope"},
          {name:"Barbell Farmer Carry",detail:"5 × 30 meters — max weight",icon:"💼",eq:"Barbell (Loaded)"},
          {name:"Dumbbell Thrusters",detail:"5 × 20 reps — squat + overhead press",icon:"🔥",eq:"Dumbbells"},
          {name:"Dumbbell Squat + Press",detail:"4 × 15 reps",icon:"💣",eq:"Dumbbells"},
          {name:"Treadmill Sprint Finisher",detail:"10 × 20 sec max / 10 sec rest",icon:"⚡",eq:"Curved Treadmill"},
        ]},
    ]
  },
];

const warmupRoutine = [
  {name:"Light Jog / Brisk Walk",detail:"5–8 min",icon:"🚶"},
  {name:"Arm Circles (Forward + Backward)",detail:"2 × 20 reps",icon:"🔄"},
  {name:"Hip Rotations",detail:"2 × 20 reps",icon:"🔁"},
  {name:"Leg Swings (front/back)",detail:"2 × 15 each leg",icon:"🦵"},
  {name:"Cat-Cow Stretch",detail:"2 × 10 reps",icon:"🐈"},
  {name:"World's Greatest Stretch",detail:"3 reps each side",icon:"🌍"},
  {name:"Hip Flexor Stretch",detail:"2 × 30 sec each side",icon:"🧎"},
  {name:"Child's Pose + Deep Breathing",detail:"2 min",icon:"🌬️"},
];

const weekSchedule = ["MON","TUE","WED","THU","FRI","SAT","SUN"];

export default function App() {
  const [tab, setTab] = useState("gym");
  const [activeWeek, setActiveWeek] = useState(0);
  const [expandedDay, setExpandedDay] = useState(null);

  const week = gymWeeks[activeWeek];

  return (
    <div style={{minHeight:"100vh",background:"#080808",fontFamily:"'Segoe UI',Tahoma,sans-serif",color:"#eee",paddingBottom:60}}>

      {/* HEADER */}
      <div style={{
        background:"linear-gradient(160deg,#100800 0%,#1a0f00 60%,#080808 100%)",
        padding:"34px 20px 24px",textAlign:"center",
        borderBottom:`3px solid ${tab==="gym" ? week.color : "#4CC9F0"}`,
      }}>
        <div style={{fontSize:11,letterSpacing:6,color:tab==="gym"?week.color:"#4CC9F0",marginBottom:8,textTransform:"uppercase"}}>
          University Gym Plan · 6 Weeks
        </div>
        <h1 style={{
          margin:0,fontSize:"clamp(24px,6vw,46px)",fontWeight:900,letterSpacing:-1,
          background:`linear-gradient(90deg,${tab==="gym"?week.color:"#4CC9F0"},#fff,${tab==="gym"?week.color:"#4CC9F0"})`,
          WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
        }}>BELLY FAT DESTROYER</h1>
        <p style={{margin:"8px 0 0",color:"#555",fontSize:12,letterSpacing:3}}>
          MON–THU: GYM WITH EQUIPMENT &nbsp;·&nbsp; FRI–SUN: WARMUP ONLY
        </p>

        {/* Equipment badge */}
        <div style={{
          display:"inline-block",marginTop:10,
          background:"#1a1a1a",border:"1px solid #333",borderRadius:20,
          padding:"4px 14px",fontSize:10,color:"#666",letterSpacing:1,
        }}>
          ✅ CUSTOMISED FOR YOUR GYM EQUIPMENT
        </div>

        {/* SCHEDULE ROW */}
        <div style={{display:"flex",justifyContent:"center",gap:6,marginTop:14,flexWrap:"wrap"}}>
          {weekSchedule.map(d=>{
            const isGym=["MON","TUE","WED","THU"].includes(d);
            const col=isGym?(tab==="gym"?week.color:"#FF6B35"):"#4CC9F0";
            return(
              <div key={d} style={{
                width:44,height:48,borderRadius:8,
                background:`${col}18`,border:`1.5px solid ${col}44`,
                display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
                fontSize:10,fontWeight:800,color:col,gap:2,
              }}>
                {d}
                <span style={{fontSize:14}}>{isGym?"🏋️":"🧘"}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* MAIN TABS */}
      <div style={{display:"flex",maxWidth:500,margin:"0 auto",padding:"16px 14px 4px",gap:8}}>
        {[
          {key:"gym",label:"💪 Mon–Thu (Gym)",col:week.color},
          {key:"warmup",label:"🧘 Fri–Sun (Warmup)",col:"#4CC9F0"},
        ].map(t=>(
          <button key={t.key} onClick={()=>{setTab(t.key);setExpandedDay(null);}} style={{
            flex:1,padding:"12px 8px",borderRadius:10,fontWeight:800,fontSize:13,cursor:"pointer",
            border:`2px solid ${tab===t.key?t.col:"#222"}`,
            background:tab===t.key?`${t.col}18`:"#111",
            color:tab===t.key?t.col:"#555",letterSpacing:0.5,
          }}>{t.label}</button>
        ))}
      </div>

      {/* === GYM SECTION === */}
      {tab==="gym" && (
        <div>
          {/* Week Selector */}
          <div style={{display:"flex",justifyContent:"center",gap:6,padding:"10px 14px 4px",flexWrap:"wrap"}}>
            {gymWeeks.map((w,i)=>(
              <button key={i} onClick={()=>{setActiveWeek(i);setExpandedDay(null);}} style={{
                padding:"7px 14px",borderRadius:8,border:`2px solid ${i===activeWeek?w.color:"#222"}`,
                background:i===activeWeek?`${w.color}22`:"#111",
                color:i===activeWeek?w.color:"#555",
                fontWeight:800,fontSize:12,cursor:"pointer",
              }}>W{i+1}</button>
            ))}
          </div>

          <div style={{textAlign:"center",padding:"10px 16px 4px"}}>
            <span style={{fontSize:18,fontWeight:900,color:week.color}}>{week.label}</span>
            <span style={{fontSize:12,color:"#555",marginLeft:10,letterSpacing:2}}>{week.subtitle.toUpperCase()}</span>
          </div>

          <div style={{maxWidth:860,margin:"0 auto",padding:"8px 14px"}}>
            {week.days.map((d)=>{
              const isOpen=expandedDay===d.day+week.week;
              const dayColors={"MON":"#FF6B35","TUE":"#F4A261","WED":"#E63946","THU":"#9B2226"};
              const dc=dayColors[d.day]||week.color;
              return(
                <div key={d.day} style={{
                  background:isOpen?"#141414":"#0e0e0e",
                  border:`1px solid ${isOpen?week.color:"#1e1e1e"}`,
                  borderRadius:12,marginBottom:10,overflow:"hidden",
                }}>
                  <div onClick={()=>setExpandedDay(isOpen?null:d.day+week.week)}
                    style={{display:"flex",alignItems:"center",padding:"15px 18px",cursor:"pointer",gap:14}}>
                    <div style={{
                      minWidth:54,height:54,borderRadius:10,
                      background:`${dc}18`,border:`2px solid ${dc}`,
                      display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
                      color:dc,fontWeight:900,
                    }}>
                      <span style={{fontSize:10,letterSpacing:1}}>{d.day}</span>
                      <span style={{fontSize:18}}>🏋️</span>
                    </div>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:700,fontSize:15}}>{d.focus}</div>
                      <div style={{fontSize:11,color:"#444",marginTop:3}}>{d.exercises.length} exercises · Your equipment only</div>
                    </div>
                    <span style={{color:week.color,fontSize:18,transform:isOpen?"rotate(180deg)":"none",transition:"transform 0.2s"}}>▾</span>
                  </div>

                  {isOpen&&(
                    <div style={{borderTop:"1px solid #1a1a1a",padding:"14px 18px 18px"}}>
                      <div style={{
                        fontSize:12,color:"#888",background:"#0a0a0a",
                        borderLeft:`3px solid ${week.color}`,padding:"8px 12px",
                        borderRadius:"0 6px 6px 0",marginBottom:14,
                      }}>💡 {d.tip}</div>
                      <div style={{display:"flex",flexDirection:"column",gap:8}}>
                        {d.exercises.map((ex,j)=>(
                          <div key={j} style={{
                            display:"flex",alignItems:"center",gap:12,
                            background:"#090909",borderRadius:8,padding:"11px 14px",
                            borderLeft:`3px solid ${week.color}55`,
                          }}> 
                            <span style={{fontSize:22}}>{ex.icon}</span>
                            <div style={{flex:1}}>
                              <div style={{fontWeight:600,fontSize:14}}>{ex.name}</div>
                              <div style={{fontSize:12,color:"#555",marginTop:1}}>{ex.detail}</div>
                            </div>
                            <div style={{
                              fontSize:10,color:"#FF6B35",background:"#FF6B3518",
                              padding:"3px 8px",borderRadius:6,border:"1px solid #FF6B3533",
                              whiteSpace:"nowrap",
                            }}>{ex.eq}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* === WARMUP SECTION === */}
      {tab==="warmup" && (
        <div style={{maxWidth:860,margin:"16px auto 0",padding:"0 14px"}}>
          <div style={{
            textAlign:"center",padding:"10px 0 20px",
          }}>
            <div style={{fontSize:18,fontWeight:900,color:"#4CC9F0"}}>FRI · SAT · SUN</div>
            <div style={{fontSize:12,color:"#555",marginTop:4,letterSpacing:2}}>ACTIVE RECOVERY — NO EQUIPMENT NEEDED</div>
          </div>

          <div style={{
            background:"#0d1a1f",border:"1px solid #4CC9F022",borderRadius:14,
            padding:"18px",marginBottom:16,
          }}>
            <div style={{fontSize:13,color:"#4CC9F0",fontWeight:700,marginBottom:4}}>⚡ Why warmup on rest days?</div>
            <div style={{fontSize:13,color:"#666",lineHeight:1.6}}>
              Light movement on recovery days keeps blood flowing to muscles, reduces soreness, and prevents stiffness — so you hit Monday harder. Do this routine once daily on Fri, Sat, Sun. Takes only <strong style={{color:"#aaa"}}>15–20 minutes</strong>.
            </div>
          </div>

          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {warmupRoutine.map((ex,j)=>(
              <div key={j} style={{
                display:"flex",alignItems:"center",gap:14,
                background:"#0e0e0e",borderRadius:10,padding:"14px 16px",
                border:"1px solid #1a1a1a",borderLeft:"3px solid #4CC9F055",
              }}>
                <span style={{fontSize:26}}>{ex.icon}</span>
                <div style={{flex:1}}>
                  <div style={{fontWeight:600,fontSize:14}}>{ex.name}</div>
                  <div style={{fontSize:12,color:"#555",marginTop:2}}>{ex.detail}</div>
                </div>
                <div style={{
                  fontSize:10,color:"#4CC9F0",background:"#4CC9F018",
                  padding:"3px 8px",borderRadius:6,border:"1px solid #4CC9F033",
                  whiteSpace:"nowrap",
                }}>No Equip</div>
              </div>
            ))}
          </div>

          <div style={{
            marginTop:16,background:"#0a120a",border:"1px solid #2a3a2a",
            borderRadius:12,padding:"16px 18px",
          }}>
            <div style={{fontSize:13,fontWeight:700,color:"#4ade80",marginBottom:8}}>🌿 Bonus: Weekend Recovery Tips</div>
            {[
              ["💧","Drink extra water — muscles repair faster when hydrated."],
              ["😴","Sleep 8+ hrs Friday & Saturday night — peak fat burning happens during sleep."],
              ["🥗","Keep diet clean on weekends — most people ruin progress here."],
              ["🚶","Optional 20-min walk on any of the 3 days adds extra fat burn."],
            ].map(([icon,text],i)=>(
              <div key={i} style={{display:"flex",gap:10,marginBottom:8,alignItems:"flex-start"}}>
                <span style={{fontSize:16}}>{icon}</span>
                <span style={{fontSize:13,color:"#666",lineHeight:1.5}}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <div style={{textAlign:"center",marginTop:40,padding:"0 16px"}}>
        <div style={{fontSize:28}}>🔥</div>
        <div style={{fontWeight:900,fontSize:15,color:tab==="gym"?week.color:"#4CC9F0",marginTop:6}}>
          4 DAYS GYM · 3 DAYS RECOVERY · 6 WEEKS
        </div>
        <div style={{color:"#444",fontSize:12,marginTop:6}}>University gym se shuru karo. Ghar par rest karo. Results aayenge. 💪</div>
      </div>
    </div>
  );
}
