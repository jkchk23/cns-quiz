// ───── T/F 함정 문항 — 요약본 28–36쪽 그대로 (자동 추출)
// [단원, 번호, 문항, 정답(true=T), 해설]
const TF = [
 [
"s1",
1,
"NMDA receptor는 glutamate만 결합하면 열리며, 세 ionotropic glutamate receptor 중 Ca²⁺ 투과성이 가장 낮다.",
false,
"glutamate + glycine + 막 탈분극(Mg²⁺ 해제) 필요, Ca²⁺ 투과성 최고. Ca²⁺ ✗는 AMPA."
],
 [
"s1",
2,
"VTA → nucleus accumbens 경로는 nigrostriatal 경로로, 손상 시 EPS와 Parkinson 증상이 나타난다.",
false,
"VTA → NAc = mesolimbic(보상·중독, dopamine). 운동·EPS = nigrostriatal."
],
 [
"s1",
3,
"Benzodiazepine, barbiturate, zolpidem은 모두 GABAA agonist이지만, barbiturate만 BZD와 완전히 다른 multiple subunit 부위에 결합한다.",
true,
"BZD α1·γ2 / Z-drug α·γ(일부 공유) / barbiturate multiple subunit."
],
 [
"s1",
4,
"Barbiturate와 alcohol은 용량-반응 곡선이 평평해져 마취 이상으로 진행하지 않으므로 BZD보다 안전하다.",
false,
"평평한 곡선 = Drug B = BZD. Barbiturate·alcohol(Drug A)은 coma·호흡억제· 사망까지."
],
 [
"s1",
5,
"진정수면제는 공통적으로 CYP2E1에 의해 대사되며 만성 투여 시 이 효소가 유도된다.",
false,
"공통 대사 = CYP3A4. CYP2E1은 alcohol의 MEOS."
],
 [
"s1",
6,
"Diazepam은 chlordiazepoxide보다 대사 단계가 많아 작용시간이 더 길다.",
false,
"반대 — chlordiazepoxide가 단계가 더 많아 더 김(active metabolite)."
],
 [
"s1",
7,
"Triazolam은 lipid solubility가 높아 빠르게 흡수·작용하며 단시간 작용하므로 수면 유도에 쓰인다.",
true,
"Alprazolam은 낮아 서서히·길게(교수님 말실수 정정 포인트)."
],
 [
"s1",
8,
"작용시간이 짧은 BZD는 하루에 여러 번 복용할 수 있어 언제 올지 모르는 불안에 대비하는 진정제로 적합하다.",
false,
"진정제 = 긴 BZD(1일 1회, 농도 변화↓, 금단↓). 짧은 약 = 수면제."
],
 [
"s1",
9,
"수면 중 2–3시간마다 깨는 환자에게는 triazolam이나 zaleplon이 가장 적합하다.",
false,
"수면 유지 → temazepam(t½ 8.8 h), suvorexant, zolpidem·eszopiclone. Triazolam·zaleplon = 유도."
],
 [
"s1",
10,
"Midazolam은 진정과 함께 투여 이전의 일을 잊게 하는 retrograde amnesia 때문에 premedication에 쓰인다.",
false,
"Anterograde amnesia(투여 이후를 기억 못 함)."
],
 [
"s1",
11,
"Flumazenil은 GABAA receptor antagonist이므로 alcohol·barbiturate에 의한 호흡억제도 반전시킨다.",
false,
"BZD 결합부위 competitive antagonist = “benzodiazepine antagonist”. BZD·Z- drug만 반전."
],
 [
"s1",
12,
"음주 후 수면제(BZD)를 과량 복용해 호흡곤란으로 내원한 환자에게 flumazenil을 투여한다.",
true,
"Alcohol + BZD additive 호흡억제 → flumazenil(매년 출제)."
],
 [
"s1",
13,
"Phenobarbital 과량 시 해독제가 없으므로 소변을 산성화해 약물 배설을 촉진한다.",
false,
"약산 → 소변 알칼리화(NaHCO₃) → 이온화 → 재흡수↓."
],
 [
"s1",
14,
"Phenobarbital은 CYP inhibitor로 다른 약물의 대사를 억제한다.",
false,
"대표적 CYP inducer(자기 자신 포함)."
],
 [
"s1",
15,
"Thiopental·methohexital은 ultra-short-acting barbiturate로 IV 마취 유도에, phenobarbital은 long-acting으로 항경련에 쓰인다.",
true,
""
],
 [
"s1",
16,
"Z-drug는 진정 효과가 강하고 반감기가 길어 불안장애에도 널리 쓰인다.",
false,
"너무 빨라 진정을 건너뛰고 바로 수면 + 반감기 짧음 → 수면제로만."
],
 [
"s1",
17,
"Zaleplon은 수면 유도와 유지가 모두 어려운 환자에게, zolpidem은 수면 유도만 어려운 환자에게 쓴다.",
false,
"반대. Zaleplon(t½ 1 h) = 유도만, zolpidem·eszopiclone = 유도+유지."
],
 [
"s1",
18,
"불면증에서 anterograde amnesia와 다음 날 졸림은 Z-drug가 BZD보다 크다.",
false,
"BZD > Z-drug → Z-drug가 더 널리."
],
 [
"s1",
19,
"노인에서 BZD 복용 후 나타나는 치매 유사 증상은 비가역적 신경세포 손상 때문이다.",
false,
"active metabolite 축적에 의한 가성 증상 → 중단 시 회복."
],
 [
"s1",
20,
"Buspirone은 5-HT1A full agonist로 작용이 빨라 panic attack에 즉시 효과적이다.",
false,
"5-HT1A partial agonist, 발현 1주↑ → 급성 ✗."
],
 [
"s1",
21,
"Tasimelteon은 melatonin receptor antagonist이고, lemborexant는 orexin receptor agonist이다.",
false,
"Tasimelteon = melatonin agonist / lemborexant·suvorexant = orexin antagonist."
],
 [
"s1",
22,
"Ramelteon은 GABAA에 작용하지 않아 의존성·금단이 없지만 효과는 marginal하고 개인차가 크다.",
true,
""
],
 [
"s1",
23,
"Suvorexant는 의존성이 없고 특별한 부작용이 없어 널리 쓰인다.",
false,
"Day-after sedation, narcolepsy, 우울 악화, 자살 충동 → 널리 못 씀."
],
 [
"s1",
24,
"불안장애의 first-line은 BZD이고, SSRI·SNRI는 BZD 무효 시 사용한다.",
false,
"First-line = SSRI·SNRI(4주↑). BZD = 급성·panic·악화 시 보조, 2–4주."
],
 [
"s1",
25,
"Spasticity 등 근이완 목적으로 쓰는 BZD는 midazolam이다.",
false,
"Diazepam. Midazolam = premedication."
],
 [
"s2",
26,
"Ethanol → acetaldehyde의 주 경로는 MEOS이고, 다량 음주 시 ADH 경로가 추가로 동원된다.",
false,
"주 경로 = ADH(NAD⁺). 다량·만성 = MEOS(CYP2E1·1A2·3A4, NADPH)."
],
 [
"s2",
27,
"만성 음주는 MEOS를 억제하여 CYP로 대사되는 다른 약물의 혈중농도를 높인다.",
false,
"MEOS induction → 다른 약 제거↑(“술은 마시면 는다”)."
],
 [
"s2",
28,
"Disulfiram은 ADH를, fomepizole은 ALDH를 억제한다.",
false,
"반대. Disulfiram ⊣ ALDH, fomepizole ⊣ ADH."
],
 [
"s2",
29,
"ALDH heterozygote는 아시아인의 약 10%, inactive homozygote는 약 40%이다.",
false,
"Heterozygote 40%(flushing), inactive homozygote 10%(severe)."
],
 [
"s2",
30,
"Alcohol은 지용성이 높아 CNS로 분포하며 주로 신장으로만 배설된다.",
false,
"작은 수용성 분자(크기로 통과). 배설 = 폐·소변."
],
 [
"s2",
31,
"Alcohol에 의한 blackout은 hippocampus의 GABAA 억제 때문이다.",
false,
"hippocampus NMDA 억제 → 학습·기억 손상. GABAA는 활성화."
],
 [
"s2",
32,
"BAC 100–200 mg/dL에서 호흡억제가, 400 mg/dL 이상에서 slurred speech·ataxia가 나타난다.",
false,
"100–200 = 운동장애·slurred speech·ataxia / >400 = 호흡억제·사망."
],
 [
"s2",
33,
"Wernicke-Korsakoff syndrome은 vitamin B12 결핍이 원인이며, 초기에 기억장애가 나타난다.",
false,
"Thiamine(B1) 결핍. 초기 = 진전·ataxia·의식장애, 후기 = 기억장애."
],
 [
"s2",
34,
"만성 음주의 CNS 영향 중 가장 흔한 것은 말초신경 손상(손발 저림)이다.",
true,
""
],
 [
"s2",
35,
"급성 알코올 중독 시 저혈당·케톤산증에는 insulin, 심한 구토에는 sodium을 대량 투여한다.",
false,
"Glucose · thiamine · 전해질 · 심한 구토 → potassium."
],
 [
"s2",
36,
"Thiamine은 알코올 금단증상이 심한 환자에게만 선택적으로 투여하는 금단 완화제이다.",
false,
"모든 환자, 목적은 WKS 예방(금단 완화제 아님)."
],
 [
"s2",
37,
"간기능이 심하게 저하된 알코올 금단 환자에게는 long-acting인 chlordiazepoxide를 우선 투여한다.",
false,
"간기능↓ → lorazepam·oxazepam(축적 방지)."
],
 [
"s2",
38,
"Delirium tremens는 음주 중단 후 수 시간 내 가장 먼저 나타나는 금단 증상이다.",
false,
"8 h 시작 → 2–3일 peak → DT는 3일 이후 늦게."
],
 [
"s2",
39,
"Naltrexone은 short-acting μ-opioid agonist로, 급성 opioid 중독 해독에도 같은 목적으로 쓰인다.",
false,
"Long-acting μ antagonist(갈망↓). 급성 opioid 해독 = naloxone."
],
 [
"s2",
40,
"Acamprosate는 weak NMDA antagonist + GABAA activator로 alcohol과 같은 기전이며, severe renal impairment에 금기이다.",
true,
""
],
 [
"s2",
41,
"Disulfiram은 알코올에 대한 갈망 자체를 감소시켜 금주를 돕는다.",
false,
"갈망↓가 아니라 음주 시 acetaldehyde 불쾌감으로 금주 유도."
],
 [
"s2",
42,
"Methanol 중독의 “눈보라 속” 시력장애와 대사성 산증은 formaldehyde 때문이다.",
false,
"Formate(formic acid)."
],
 [
"s2",
43,
"Methanol 중독에 ethanol을 주는 이유는 ethanol이 formate를 빠르게 대사시키기 때문이다.",
false,
"ADH에 더 높은 affinity로 경쟁 → methanol 대사 자체를 막음."
],
 [
"s2",
44,
"Ethylene glycol 중독은 처음 CNS 억제 후 흥분, 이후 대사성 산증과 oxalate 침착에 의한 신부전을 일으킨다.",
false,
"처음 흥분 → 억제 순서."
],
 [
"s2",
45,
"Methanol과 ethylene glycol 중독은 독성 대사물은 다르지만 fomepizole/ethanol + 혈액투석 + bicarbonate로 동일하게 치료한다.",
true,
""
],
 [
"s3",
46,
"Focal로 시작해 양측 강직-간대 발작으로 진행했다면 generalized onset으로 분류해 valproic acid를 1차로 쓴다.",
false,
"분류는 onset 기준 → focal → carbamazepine."
],
 [
"s3",
47,
"Focal impaired awareness seizure에서는 의식장애로 환자가 쓰러지므로 주변에서 쉽게 알아챈다.",
false,
"쓰러지지 않음 — 눈 뜨고 자동증 반복 → 주변이 모름."
],
 [
"s3",
48,
"Absence seizure는 전조증상 후 30초–1분 지속되며 남아에서 2배 많다.",
false,
"전조 ✗, 5–15초, 여아 2:1, 4–12세, 눈 깜빡임."
],
 [
"s3",
49,
"Juvenile myoclonic seizure는 주로 잠들기 직전에 발생한다.",
false,
"기상 후 1–2시간 내(칫솔·젓가락)."
],
 [
"s3",
50,
"Atonic seizure는 Dravet syndrome에서, febrile seizure로 시작하는 것은 Lennox-Gastaut syndrome의 특징이다.",
false,
"Atonic → LGS. Febrile seizure 시작·생후 6개월·SCN1A → Dravet."
],
 [
"s3",
51,
"Infantile spasm은 2세 미만에 발생하며 50% 이상이 Lennox-Gastaut syndrome으로 진행한다.",
true,
"85% 정신지체."
],
 [
"s3",
52,
"항경련제는 unprovoked seizure 1회 후 바로 시작하며, 효과를 높이기 위해 2–3제 병용이 원칙이다.",
false,
"2회 후 시작, 단일 약물(부작용 현저), 2년↑, 3–5년 무발작 → 서서히."
],
 [
"s3",
53,
"대부분의 항경련제가 표적으로 하는 것은 voltage-gated Ca²⁺ channel이다.",
false,
"Na⁺ channel — “모르면 Na⁺”."
],
 [
"s3",
54,
"Ethosuximide와 gabapentin은 모두 Ca²⁺ channel에 작용하며, 둘 다 presynaptic vesicle 융합을 억제한다.",
false,
"Ethosuximide = T-type voltage-gated → 탈분극 억제 / gabapentin = presynaptic α2δ → 방출 억제."
],
 [
"s3",
55,
"Gabapentin·pregabalin은 GABA analog이므로 GABAA 수용체를 직접 활성화한다.",
false,
"GABA와 무관 — α2δ Ca²⁺ 억제."
],
 [
"s3",
56,
"Levetiracetam은 SV2A에 결합해 vesicle의 glutamate 저장을 줄이며, 공격성·우울 같은 행동 변화를 일으킬 수 있다.",
true,
""
],
 [
"s3",
57,
"Perampanel은 NMDA antagonist로 acute myopia를 일으키고, felbamate는 AMPA antagonist이다.",
false,
"Perampanel = AMPA, aggression / acute myopia = topiramate / felbamate = NMDA."
],
 [
"s3",
58,
"Tiagabine은 GABA transaminase를 억제하고, vigabatrin은 GAT-1을 억제한다.",
false,
"반대. Tiagabine = GAT-1 / vigabatrin = GABA-T."
],
 [
"s3",
59,
"Carbamazepine은 resting 상태의 Na⁺ channel에 결합해 채널 개방을 막는다.",
false,
"Inactivated state에 결합해 안정화."
],
 [
"s3",
60,
"Carbamazepine의 대표 부작용은 gingival hyperplasia와 hirsutism이다.",
false,
"그건 phenytoin. CBZ = rash, hyponatremia, aplastic anemia, agranulocytosis, SJS."
],
 [
"s3",
61,
"Carbamazepine 복용 중 rash가 생긴 focal seizure 환자에게는 lacosamide로 교체할 수 있다.",
true,
"25중간 객65 — 내약성 좋은 focal 1st-line."
],
 [
"s3",
62,
"Phenytoin은 albumin 결합률이 낮아 valproic acid와 병용해도 혈중농도 변화가 없다.",
false,
"90% 결합 → VPA·sulfonamide가 치환 → PHT↑."
],
 [
"s3",
63,
"Agranulocytosis는 phenytoin의 대표 부작용이다.",
false,
"CBZ 슬라이드 독성(“PHT 부작용 아닌 것” 단골)."
],
 [
"s3",
64,
"Ethosuximide 복용 환자는 말초신경병증 확인을 위해 주기적으로 심부건반사 검사를 받아야 한다.",
false,
"DTR 이상 = phenytoin. Ethosuximide = GI distress."
],
 [
"s3",
65,
"Cenobamate는 QT interval을 연장시켜 부정맥 위험이 있다.",
false,
"QT 단축."
],
 [
"s3",
66,
"Pregabalin은 대상포진후신경통, gabapentin은 섬유근통에 대표적으로 쓰인다.",
false,
"Gabapentin = 대상포진후·당뇨 신경병증 / pregabalin = 섬유근통."
],
 [
"s3",
67,
"Lamotrigine은 absence에서 ethosuximide보다 효과가 우수해 absence의 1차 약이다.",
false,
"1차 = ethosuximide. LTG는 덜하지만 임신(계획) 여성에서 선택."
],
 [
"s3",
68,
"Lamotrigine은 내약성이 좋지만 skin rash가 생기면 SJS로 진행할 수 있어 즉시 중단한다.",
true,
""
],
 [
"s3",
69,
"Valproic acid는 focal seizure에서 carbamazepine보다 효과가 우수하다.",
false,
"Focal은 CBZ·PHT보다 열세. Generalized 전반의 1st."
],
 [
"s3",
70,
"Valproic acid의 idiosyncratic hepatotoxicity는 성인 단독요법 환자에서 가장 위험하다.",
false,
"2세 이하 영유아·다약제 복용 환자."
],
 [
"s3",
71,
"Valproic acid는 체중 감소를, topiramate는 체중 증가를 일으킨다.",
false,
"반대. VPA = 체중↑·식욕↑·탈모 / TPM = 체중↓."
],
 [
"s3",
72,
"Valproic acid는 CYP inducer이므로 복용 여성은 경구피임약 외 다른 피임법을 병행해야 한다.",
false,
"VPA는 유일한 inhibitor. 피임약 대사↑ = PHT·PB·CBZ·TPM·rufinamide·clobazam·perampanel."
],
 [
"s3",
73,
"Ethosuximide는 valproic acid와 병용하면 대사가 억제되어 혈중농도가 증가한다.",
true,
"Absence + GTC 공존이면 VPA 선택."
],
 [
"s3",
74,
"Topiramate와 zonisamide는 carbonic anhydrase를 억제해 신결석과 대사성 산증을 일으킬 수 있다.",
true,
""
],
 [
"s3",
75,
"Topiramate 복용 중 급성 근시·녹내장이 생기면 용량을 줄여 계속 복용한다.",
false,
"시력 상실 위험 → 즉시 중단."
],
 [
"s3",
76,
"Vigabatrin의 시야결손은 중단하면 회복되는 가역적 부작용이므로 시력검사는 필요 없다.",
false,
"Irreversible → 지속적 시력검사(영유아라 어려움)."
],
 [
"s3",
77,
"Felbamate는 내약성이 좋아 focal seizure의 first-line으로 널리 쓰인다.",
false,
"Aplastic anemia·severe hepatitis → refractory에만(3rd)."
],
 [
"s3",
78,
"Phenobarbital은 sedation이 적어 학교에 다니는 소아의 유지요법으로 선호된다.",
false,
"Sedation이 최대 부작용 → 신생아 seizure 1st에만."
],
 [
"s3",
79,
"Clobazam은 1,4-benzodiazepine이며 2세 미만 Lennox-Gastaut에 쓴다.",
false,
"1,5-BZD, 2세 이상 LGS."
],
 [
"s3",
80,
"Cannabidiol은 CB receptor 결합을 통해 효과를 내며 Dravet syndrome에 단독요법으로 쓴다.",
false,
"CB 결합 때문이 아닌 것으로 생각, VPA·clobazam과 병용, 간독성 주의."
],
 [
"s3",
81,
"Fenfluramine은 amphetamine 유도체로 원래 식욕억제제였으며 Dravet·LGS에 병용한다.",
true,
""
],
 [
"s3",
82,
"Everolimus는 TSC 단백질을 억제해 mTOR 과활성을 막는다.",
false,
"TSC 단백질은 원래 mTOR 억제자 → 결손 시 mTOR↑ → everolimus가 mTORC1 억제."
],
 [
"s3",
83,
"Acetazolamide는 내성이 잘 생기지 않아 장기 유지요법에 적합하다.",
false,
"1주 내 내성 → 월경 중 발작 악화 시에만."
],
 [
"s3",
84,
"Status epilepticus는 30분 이상이 정의이므로 tonic-clonic seizure가 시작되면 30분을 기다린 뒤 약물을 투여한다.",
false,
"TC 5분↑, focal 10분↑이면 바로."
],
 [
"s3",
85,
"Status epilepticus의 first-line은 phenytoin IV이며, diazepam은 2nd-line이다.",
false,
"1st = diazepam·lorazepam(IV·rectal). PHT·VPA·LEV·PB = 2nd."
],
 [
"s3",
86,
"Status epilepticus로 의식이 없는 환자에게 valproic acid를 경구 투여하는 것이 적절하다.",
false,
"경구 ✗(흡인) → diazepam IV."
],
 [
"s3",
87,
"Diazepam·lorazepam은 SE를 멈추는 데, clonazepam·nitrazepam·clorazepate·clobazam은 경구 유지에 쓴다.",
true,
""
],
 [
"s3",
88,
"임신 중에는 최기형성 때문에 항경련제를 중단하는 것이 원칙이다.",
false,
"중단 ✗(발작 → 태아 저산소). LTG·LEV로 교체."
],
 [
"s3",
89,
"Valproate–척추갈림증, phenobarbital–구순구개열, topiramate–심장기형, phenytoin–hydantoin syndrome이다.",
false,
"Phenobarbital = cardiac defect, topiramate = oral cleft."
],
 [
"s3",
90,
"Carbamazepine, valproic acid, lamotrigine은 bipolar disorder에도 쓰이며, carbamazepine은 삼차신경통에도 쓴다.",
true,
""
],
 [
"s3",
91,
"Perampanel은 levonorgestrel 함유 피임약의 효과는 떨어뜨리지만 자궁 내 장치(IUD)에는 영향이 없다.",
false,
"Levonorgestrel IUD 효과도 ↓ → 다른 피임법 추가."
],
 [
"s4",
92,
"Neuromuscular blocker는 spasticity를 치료하는 약으로, 척수에서 upper–lower motor neuron 간 전달을 억제한다.",
false,
"NMB는 치료제가 아님 — end plate NM 차단, 마취 중 근이완·삽관. 척수 작용 = spasmolytic."
],
 [
"s4",
93,
"Nondepolarizing NMB 투여 중 neostigmine을 주면 ACh가 늘어 근이완이 감소(반전)한다.",
true,
""
],
 [
"s4",
94,
"Succinylcholine phase I block에 AChE inhibitor를 투여하면 blocking이 억제된다.",
false,
"Phase I에선 탈분극 증폭. Blocking 억제는 phase II(nondepol처럼)."
],
 [
"s4",
95,
"Succinylcholine은 synapse의 acetylcholinesterase에 의해 빠르게 대사되어 5–10분만 작용한다.",
false,
"AChE로 대사 ✗ → plasma butyrylcholinesterase(pseudo-ChE)."
],
 [
"s4",
96,
"Pseudocholinesterase 결핍 환자에서는 succinylcholine의 근마비가 오래 지속되어 자발호흡 회복이 지연된다.",
true,
""
],
 [
"s4",
97,
"NMB는 지용성이 높아 BBB를 통과하므로 진통과 의식소실 효과도 함께 나타난다.",
false,
"highly polar → 주사, BBB·태반 ✗ → 진통·의식소실 없음."
],
 [
"s4",
98,
"Mivacurium·atracurium의 hypotension은 cardiac muscarinic receptor 차단 때문이다.",
false,
"histamine release. Cardiac M 차단 = pancuronium → 빈맥·고혈압."
],
 [
"s4",
99,
"Rocuronium은 심혈관 영향이 거의 없고 sugammadex로 반전할 수 있어 기관내삽관에 널리 쓰인다.",
true,
""
],
 [
"s4",
100,
"Sugammadex는 모든 nondepolarizing NMB와 succinylcholine을 반전시킨다.",
false,
"steroid형(rocuronium·vecuronium)만. Succinylcholine은 반전약 불필요."
],
 [
"s4",
101,
"Succinylcholine은 녹내장을 유발하므로 금기이다.",
false,
"안압만 증가(녹내장은 아님 — 녹음 정정). 대표 독성 = hyperkalemia → cardiac arrest."
],
 [
"s4",
102,
"Malignant hyperthermia는 RyR1 변이 환자에서 volatile anesthetic + succinylcholine으로 유발되며 dantrolene이 RyR에 결합해 SR Ca²⁺ 방출을 억제한다.",
true,
""
],
 [
"s4",
103,
"Baclofen은 GABAA receptor agonist로 Cl⁻ 유입을 증가시킨다.",
false,
"GABAB(GPCR): pre Ca²⁺ ↓ / post K⁺ ↑."
],
 [
"s4",
104,
"Tizanidine은 clonidine 유사 α2 agonist로 upper motor neuron의 glutamate 방출을 줄인다.",
true,
""
],
 [
"s4",
105,
"모든 benzodiazepine은 spasmolytic으로 임상 효과가 있다.",
false,
"diazepam만."
],
 [
"s4",
106,
"Botulinum toxin은 ryanodine receptor에 결합해 근수축을 억제한다.",
false,
"vesicle docking 방해 → ACh release ↓. RyR = dantrolene."
],
 [
"s5",
107,
"전신마취의 다섯 목표(의식소실·amnesia·진통·자율반사 억제·근이완)는 propofol 단독으로 모두 달성된다.",
false,
"한 약으로 불가 → combination. Propofol은 진통 ✗."
],
 [
"s5",
108,
"Blood:gas 분배계수가 높을수록 혈액에 잘 녹아 폐포분압이 빨리 올라 마취 유도가 빠르다.",
false,
"계수 낮을수록 유도·회복 빠름(N₂O 0.47 > halothane 2.3)."
],
 [
"s5",
109,
"Halothane은 환기를 늘려도 FA/FI 변화가 작지만 N₂O는 크게 증가한다.",
false,
"반대 — halothane이 크게 증가(환기 확대 중요)."
],
 [
"s5",
110,
"Cardiac output(폐혈류)이 증가하면 흡입마취 유도가 빨라진다.",
false,
"혈액에 더 녹아 지연."
],
 [
"s5",
111,
"N₂O는 MAC가 105%로 유도는 빠르지만 유지를 위해 많은 양이 필요하고, halothane은 MAC 0.75%로 유지가 쉽다.",
true,
""
],
 [
"s5",
112,
"MAC가 클수록 potency가 크다.",
false,
"MAC = 50% immobility 농도 → 작을수록 강력."
],
 [
"s5",
113,
"Halothane은 간 대사가 거의 없어 enflurane보다 훨씬 늦게 회복된다.",
false,
">40% 간 대사 → 회복 속도 enflurane과 거의 같음(간독성의 이유)."
],
 [
"s5",
114,
"심부전 환자에게는 myocardial depression이 적고 vasodilation이 주된 isoflurane·desflurane·sevoflurane을 쓴다.",
true,
""
],
 [
"s5",
115,
"Bronchospasm 환자에게는 pungent한 desflurane·isoflurane이 적합하다.",
false,
"nonpungent(halothane, sevoflurane, N₂O)가 적합."
],
 [
"s5",
116,
"Pheochromocytoma 수술에 halothane을 쓰면 catecholamine에 대한 심근 sensitization으로 부정맥 위험이 있다.",
true,
""
],
 [
"s5",
117,
"Enflurane 장기 노출은 megaloblastic anemia, N₂O 장기 노출은 nephrotoxicity를 일으킨다.",
false,
"반대: enflurane = 신독성, N₂O = megaloblastic anemia."
],
 [
"s5",
118,
"정맥마취제 중 마취 유지에 continuous infusion으로 쓸 수 있는 것은 propofol뿐이다.",
true,
""
],
 [
"s5",
119,
"Propofol은 강력한 진통 효과가 있어 opioid 병용이 필요 없다.",
false,
"진통 ✗ → opioid 병용. 장점은 antiemetic, 상기도 반사 ↓."
],
 [
"s5",
120,
"Etomidate는 cardiovascular stability가 뛰어나 장시간 지속주입하는 ICU 진정제로 쓰인다.",
false,
"adrenocortical suppression(11β-hydroxylase) → 지속주입 금지. ICU 단기 진정 = dexmedetomidine."
],
 [
"s5",
121,
"Ketamine은 GABAA를 강화하는 해리성 마취제로 교감신경을 억제해 혈압을 낮춘다.",
false,
"NMDA 억제, 교감 자극(혈압 유지)."
],
 [
"s5",
122,
"천식이 있고 혈압이 낮은 환자, opioid 내성 암환자에게 ketamine이 유용하다.",
true,
""
],
 [
"s5",
123,
"Dexmedetomidine은 α2 agonist로 호흡억제가 심하지만 서맥은 없다.",
false,
"호흡억제 없음, 부작용 = heart block·심한 서맥·asystole."
],
 [
"s5",
124,
"Midazolam 진정 중 호흡억제에는 naloxone을 투여한다.",
false,
"Flumazenil."
],
 [
"s5",
125,
"국소마취제는 Na⁺ channel의 바깥쪽에 결합하므로 이온형이 많을수록 효과가 빠르다.",
false,
"채널 안쪽 → 비이온형이 막을 통과해야. 이온형이 안에서 결합."
],
 [
"s5",
126,
"염증 부위는 산성이라 국소마취제의 비이온형 비율이 감소해 효과가 떨어진다.",
true,
""
],
 [
"s5",
127,
"Epinephrine 병용은 국소마취제의 peak blood level을 높여 전신독성을 증가시킨다.",
false,
"흡수 지연 → peak ↓ → 전신독성 ↓, 작용 연장."
],
 [
"s5",
128,
"Ester형 국소마취제는 간 CYP450으로 대사되어 작용이 길다.",
false,
"Ester = plasma butyrylcholinesterase → 짧음. Amide = 간 CYP → 김."
],
 [
"s5",
129,
"Bupivacaine은 심독성이 가장 우려되는 long-acting amide이다.",
true,
""
],
 [
"s5",
130,
"Benzocaine의 대표 독성은 methemoglobinemia이다.",
true,
""
],
 [
"s6",
131,
"PD에서는 SN의 DA neuron 소실로 striatum GABA output이 감소하여 direct pathway가 과활성된다.",
false,
"GABA 과활성 → indirect pathway 과활성 → 운동 억제."
],
 [
"s6",
132,
"Dopamine은 BBB의 DA transporter를 통해 뇌로 들어가지만 말초 분해가 빨라 L-DOPA를 쓴다.",
false,
"DA는 극성 ↑ + transporter 없음. L-DOPA는 LAT로 진입."
],
 [
"s6",
133,
"Carbidopa는 중추 DOPA decarboxylase를 억제해 뇌에서 DA 생성을 조절한다.",
false,
"BBB ✗ → 말초에서만 억제 → L-DOPA 용량 ↓·말초 부작용 ↓."
],
 [
"s6",
134,
"Carbidopa는 levodopa의 wearing-off를 늦춘다.",
false,
"용량·말초 부작용 ↓. Wearing-off ↓ = istradefylline, COMT inh."
],
 [
"s6",
135,
"Levodopa의 환각·망상 부작용은 nigrostriatal pathway 과활성 때문이다.",
false,
"mesolimbic DA ↑ → psychosis 환자 금기."
],
 [
"s6",
136,
"Levodopa + phenelzine 병용은 hypertensive crisis를 일으킬 수 있다.",
true,
""
],
 [
"s6",
137,
"초기의 경미한 젊은 PD 환자는 가장 강력한 levodopa로 시작한다.",
false,
"DA agonist(first-line) — levodopa는 나중을 위해 남겨둠. 고령이면 levodopa."
],
 [
"s6",
138,
"Entacapone은 levodopa 없이 단독으로도 PD 증상을 개선한다.",
false,
"levodopa-carbidopa 병용 시에만 효과(말초 COMT)."
],
 [
"s6",
139,
"Opicapone은 levodopa-carbidopa와 흡수 경쟁을 피하기 위해 취침 시 1일 1회 복용한다.",
true,
""
],
 [
"s6",
140,
"항정신병약 유발 parkinsonism은 DA agonist로 치료한다.",
false,
"anticholinergic(benztropine) — DA 약은 항정신병 효과를 없앰."
],
 [
"s6",
141,
"Apomorphine은 μ-opioid agonist로 off-period를 급속히 완화한다.",
false,
"potent D2 agonist(SC·SL). 구역 → trimethobenzamide 3일 전부터."
],
 [
"s6",
142,
"Istradefylline은 adenosine A2A agonist로 wearing-off를 줄인다.",
false,
"A2A antagonist(caffeine 유사)."
],
 [
"s6",
143,
"Amantadine은 장기 유지에 효과적이며 livedo reticularis를 일으킬 수 있다.",
false,
"효과는 몇 주만 → 급속 완화용. Livedo는 맞음."
],
 [
"s6",
144,
"Tolcapone은 말초와 중추 COMT를 모두 억제하며 간독성이 있다.",
true,
""
],
 [
"s6",
145,
"Memantine은 AChE inhibitor이고 donepezil은 NMDA antagonist이다.",
false,
"반대: donepezil = AChE inh, memantine = NMDA antag."
],
 [
"s7",
146,
"조현병 양성 증상은 mesocortical DA hypoactivity, 음성 증상은 mesolimbic DA hyperactivity와 관련된다.",
false,
"양성 = mesolimbic hyper, 음성 = mesocortical hypo."
],
 [
"s7",
147,
"Mesocortical DA neuron의 5-HT2 receptor 차단은 DA release를 늘려 음성 증상을 개선한다.",
true,
""
],
 [
"s7",
148,
"Typical 항정신병약은 D2 점유 30–50%에서 효과가 나타나 EPS가 적다.",
false,
"Typical ≥60%, severe EPS. 30–50% = atypical."
],
 [
"s7",
149,
"Haloperidol과 fluphenazine은 음성 증상도 개선하는 atypical 약물이다.",
false,
"typical(high potency)."
],
 [
"s7",
150,
"Clozapine과 olanzapine은 D4 억제가 D2보다 현저하여 5-HT2A antagonist로 분류된다.",
true,
""
],
 [
"s7",
151,
"항정신병약에 의한 hyperprolactinemia는 tuberoinfundibular DA가 prolactin 분비를 촉진하기 때문이다.",
false,
"DA는 prolactin을 억제 → 차단 시 억제가 풀림."
],
 [
"s7",
152,
"복용 초기 akathisia·급성 dystonia에는 diphenhydramine 같은 항콜린성 진정 항히스타민제를 쓸 수 있다.",
true,
""
],
 [
"s7",
153,
"Tardive dyskinesia는 D2 receptor 수 감소로 생기며 용량을 늘리면 개선된다.",
false,
"수용체 수 ↑·supersensitivity → 용량 ↓, quetiapine·clozapine 교체, valbenazine."
],
 [
"s7",
154,
"Valbenazine은 D2 receptor antagonist로 TD를 치료한다.",
false,
"VMAT inhibitor."
],
 [
"s7",
155,
"Clozapine의 agranulocytosis는 용량 의존적 독성이다.",
false,
"특이체질성(용량 비의존), 초기 6–8주 → 혈액검사."
],
 [
"s7",
156,
"Chlorpromazine으로 기립성 저혈압이 생기면 α 차단이 적은 haloperidol·ziprasidone으로 바꾼다.",
true,
""
],
 [
"s7",
157,
"QT 연장 위험이 큰 항정신병약은 haloperidol과 clozapine이다.",
false,
"thioridazine, ziprasidone."
],
 [
"s7",
158,
"NMS는 volatile anesthetic으로 유발되며 dantrolene이 1차 치료이다.",
false,
"NMS = D2 차단 항정신병약 → diphenhydramine·diazepam. Volatile → MH."
],
 [
"s7",
159,
"Clozapine은 3rd line이지만 자살 충동 조현병 환자에게는 1차 선택이다.",
true,
""
],
 [
"s7",
160,
"Lithium은 혈중 농도를 2 mEq/L 이상으로 유지해야 효과가 있다.",
false,
"≤1 mEq/L 유지·모니터링."
],
 [
"s7",
161,
"Bipolar depression에는 SSRI 단독 투여가 1차이다.",
false,
"조증 유발 → quetiapine, olanzapine + fluoxetine 병용."
],
 [
"s7",
162,
"Lamotrigine은 급성 조증 치료에 쓰인다.",
false,
"재발 예방(특히 우울)만."
],
 [
"s8",
163,
"Monoamine 가설에서 우울증과 가장 관련 깊은 monoamine은 dopamine이다.",
false,
"5-HT·NE."
],
 [
"s8",
164,
"SSRI는 복용 2–3일 내 최대 효과가 나타난다.",
false,
"최소 2주, 최대 12주↑ — 모든 항우울제."
],
 [
"s8",
165,
"SSRI는 NE 관련 부작용이 없어 부작용이 적고 overdose에도 비교적 안전해 1st line이다.",
true,
""
],
 [
"s8",
166,
"Fluoxetine·sertraline은 과수면, paroxetine·fluvoxamine은 불면을 유발한다.",
false,
"반대: fluoxetine·sertraline = insomnia."
],
 [
"s8",
167,
"Paroxetine은 임신 category C로 임산부에게 비교적 안전하다.",
false,
"category D."
],
 [
"s8",
168,
"Serotonin syndrome 치료에는 dantrolene과 cooling이 1차이다.",
false,
"BZD 진정 + 삽관·환기(cyproheptadine)."
],
 [
"s8",
169,
"Desipramine과 nortriptyline은 NET보다 SERT를 더 강하게 억제하는 3급 amine이다.",
false,
"2급 amine, NET > SERT."
],
 [
"s8",
170,
"Amoxapine은 D2 억제 작용이 있어 조현병에 동반된 우울증에 쓰일 수 있지만 parkinsonism을 일으킬 수 있다.",
true,
""
],
 [
"s8",
171,
"Mirtazapine은 SERT와 NET을 모두 억제한다.",
false,
"SERT/NET 억제 없음 — α2 autoreceptor antagonist."
],
 [
"s8",
172,
"TCA overdose 시 항콜린 증상을 반전시키기 위해 physostigmine 같은 AChE inhibitor를 준다.",
false,
"✗ — 심장 더 억제. NaHCO₃, diazepam, lidocaine."
],
 [
"s8",
173,
"Imipramine의 구갈·시야흐림·변비는 muscarinic receptor 차단 때문이다.",
true,
""
],
 [
"s8",
174,
"Moclobemide는 비선택적 irreversible MAOI이다.",
false,
"MAO-A selective, reversible."
],
 [
"s8",
175,
"MAOI에서 fluoxetine으로 바꿀 때는 2주, fluoxetine에서 MAOI로 바꿀 때는 6주 이상 washout이 필요하다.",
true,
""
],
 [
"s8",
176,
"MAOI 복용 중 치즈·레드와인 섭취 시 tyramine이 NET로 유입되어 NE 방출을 늘려 hypertensive crisis가 온다.",
true,
""
],
 [
"s8",
177,
"Vortioxetine은 성기능 부작용이 낮아 SSRI 성불감증 환자의 교체약이다.",
false,
"vortioxetine = 구역·성기능 장애. 교체 = bupropion·mirtazapine·nefazodone."
],
 [
"s8",
178,
"Trazodone은 priapism, nefazodone은 치명적 간독성이 드물게 나타난다.",
true,
""
],
 [
"s8",
179,
"Bupropion은 serotonin 재흡수를 억제하는 금연 보조제이다.",
false,
"weak DA/NE reuptake inh, 5-HT ✗ → 성기능 부작용 ✗. 부작용 경련."
],
 [
"s8",
180,
"Esketamine은 IV로 투여하는 GABAA PAM으로 산후우울증에 쓴다.",
false,
"Esketamine = intranasal NMDA antag(치료저항·자살사고). 산후우울 = brexanolone(IV 60 h)."
],
 [
"s8",
181,
"통증을 동반한 우울증에는 SSRI보다 SNRI·TCA가 효과적이다.",
true,
""
],
 [
"s9",
182,
"Codeine과 thebaine은 semisynthetic opioid이다.",
false,
"natural. Semisynthetic = heroin, hydromorphone, oxycodone…"
],
 [
"s9",
183,
"κ receptor가 가장 강력한 analgesia·euphoria·호흡억제를 매개한다.",
false,
"μ. κ = 환각."
],
 [
"s9",
184,
"Opioid receptor는 presynapse Ca²⁺ channel을 열고 postsynapse K⁺ channel을 닫는다.",
false,
"Ca²⁺ 억제, K⁺ open(IPSP)."
],
 [
"s9",
185,
"Opioid 장기 복용 시 miosis와 변비에도 빠르게 내성이 생긴다.",
false,
"내성 거의 없음 → 지속."
],
 [
"s9",
186,
"Morphine 같은 full μ agonist는 천장효과가 있어 증량해도 진통이 늘지 않는다.",
false,
"천장효과 없음. 천장효과 = mixed agonist-antagonist."
],
 [
"s9",
187,
"Oxycodone은 strong agonist로 hydromorphone보다 강하다.",
false,
"Oxycodone = mild–moderate(그중 최강)."
],
 [
"s9",
188,
"Tramadol 실패 시 한 단계 위 약물은 methadone이다.",
false,
"oxycodone/APAP(WHO 3단계 진입). Methadone은 두 단계."
],
 [
"s9",
189,
"Fentanyl은 morphine의 100배 진통 효력, rapid onset·short duration이며 패치제가 있다.",
true,
""
],
 [
"s9",
190,
"Methadone은 작용이 빠르고 짧아 heroin 급성 overdose에 쓴다.",
false,
"서서히·24 h·경구 → 만성 중독 detox. 급성 = naloxone."
],
 [
"s9",
191,
"Nalbuphine에 의한 호흡억제는 naloxone으로 쉽게 반전된다.",
false,
"이미 μ antag → 반전 ✗."
],
 [
"s9",
192,
"Buprenorphine은 intrinsic activity가 낮아 진통이 약하고 짧다.",
false,
"μ tight binding → high efficacy·long, naloxone 해독 어려움."
],
 [
"s9",
193,
"Tramadol은 SERT 억제 + 매우 약한 μ agonist이며 호흡억제가 거의 없다.",
true,
""
],
 [
"s9",
194,
"Tapentadol은 SERT 억제 + μ agonist로 morphine보다 강하다.",
false,
"NET 억제, ~oxycodone(< morphine)."
],
 [
"s9",
195,
"Naltrexone은 IV로 30초 내 효과가 나타나 응급 overdose에 1차로 쓴다.",
false,
"그건 naloxone. Naltrexone = 경구 48 h detox(동기 높은 환자)."
],
 [
"s9",
196,
"Nalmefene은 효과까지 5–10분 걸려 응급보다 반복 overdose 관리에 쓴다.",
true,
""
],
 [
"s9",
197,
"Heroin 투약 12시간 후 산동·과호흡·오한·근육통을 보이면 naloxone을 준다.",
false,
"금단 → methadone. Naloxone은 금단 유발."
],
 [
"s9",
198,
"Meperidine은 normeperidine 축적과 항무스카린 작용 때문에 1차 진통제에서 제외되었다.",
true,
""
],
 [
"s10",
199,
"Dependence는 정신적, addiction은 신체적 의존이다.",
false,
"dependence = 신체적, addiction = 정신적."
],
 [
"s10",
200,
"지용성이 낮고 작용이 긴 약일수록 중독이 잘 된다.",
false,
"지용성 ↑·작용 짧음."
],
 [
"s10",
201,
"Reward pathway는 SN → striatum이다.",
false,
"VTA → nucleus accumbens(mesolimbic)."
],
 [
"s10",
202,
"Heroin은 VTA dopamine neuron의 μ receptor를 직접 흥분시켜 DA를 올린다.",
false,
"GABA neuron 억제 → disinhibition."
],
 [
"s10",
203,
"Nicotine은 DA neuron의 nAChR에 작용해 직접 흥분(excitation)시킨다.",
true,
""
],
 [
"s10",
204,
"LSD·mescaline은 DA를 올려 강한 의존성을 일으킨다.",
false,
"serotonin analog, DA ✗ → 의존·중독 ✗, 교차내성."
],
 [
"s10",
205,
"THC는 DA를 releasing하므로 전형적 환각제와 달리 의존·중독을 일으킨다.",
true,
""
],
 [
"s10",
206,
"GHB는 GABAA 강력 agonist이다.",
false,
"GABAB weak agonist, amnesia."
],
 [
"s10",
207,
"Varenicline은 nAChR full agonist로 금연 당일부터 복용한다.",
false,
"partial, 1주 전부터, 부작용 경련."
],
 [
"s10",
208,
"Ketamine과 PCP는 competitive NMDA antagonist이며 강한 의존을 유발한다.",
false,
"noncompetitive, DA ✗ → 의존·중독 ✗."
],
 [
"s10",
209,
"PCP 과량 시 서맥과 저혈압이 특징이다.",
false,
"빈맥·BP ↑, 고열, 안구진탕, 공격성, 무통."
],
 [
"s10",
210,
"Cocaine은 DAT를 통해 유입되어 VMAT를 억제한다.",
false,
"그건 amphetamine. Cocaine = DAT 직접 억제."
],
 [
"s10",
211,
"Cocaine overdose에서 나타나지 않는 것은 서맥과 호흡억제이다.",
true,
""
],
 [
"s10",
212,
"Amphetamine의 catecholamine ↑ 효과는 환각·식욕억제, serotonin ↑ 효과는 각성·수면감소이다.",
false,
"반대: CA → 각성·수면↓ / 5-HT → 환각·식욕↓·고열."
],
 [
"s10",
213,
"MDMA는 DAT > SERT이며 탈수 동반 고열이 특징이다.",
false,
"SERT > DAT. 고열은 맞음."
],
 [
"s10",
214,
"환각제를 제외한 모든 남용 약물은 DA를 증가시킨다.",
true,
""
],
 [
"x",
215,
"Malignant hyperthermia, NMS, serotonin syndrome의 1차 치료는 모두 dantrolene이다.",
false,
"MH = dantrolene / NMS = diphenhydramine·diazepam / serotonin = BZD + 기도 확보."
],
 [
"x",
216,
"Flumazenil은 BZD뿐 아니라 barbiturate·alcohol에 의한 호흡억제도 반전시킨다.",
false,
"BZD(일부 Z-drug)만."
],
 [
"x",
217,
"Baclofen과 GHB는 모두 GABAB agonist이다.",
true,
""
],
 [
"x",
218,
"Tizanidine과 dexmedetomidine은 모두 α2 agonist이다.",
true,
""
],
 [
"x",
219,
"Memantine, ketamine, esketamine, PCP는 모두 GABAA 작용 약물이다.",
false,
"모두 NMDA antagonist."
],
 [
"x",
220,
"Brexanolone과 propofol·etomidate는 GABAA를 강화한다.",
true,
""
],
 [
"x",
221,
"Valbenazine과 amphetamine은 VMAT에 작용한다는 공통점이 있다.",
true,
"valbenazine = VMAT inh(TD), amphetamine = VMAT 억제 → DA 역유출."
],
 [
"x",
222,
"Apomorphine의 구역을 막기 위해 ondansetron을 미리 준다.",
false,
"trimethobenzamide(D2 antag) 3일 전부터 (25중간 객73 함정)."
],
 [
"x",
223,
"Ondansetron은 serotonin syndrome을 유발할 수 있는 약에 포함된다.",
true,
""
],
 [
"x",
224,
"Lidocaine은 국소마취제이면서 TCA overdose의 부정맥 치료에도 쓰인다.",
true,
""
],
 [
"x",
225,
"Bupropion과 varenicline은 둘 다 금연에 쓰이며 공통 부작용으로 경련이 있다.",
true,
""
],
 [
"x",
226,
"Cocaine은 남용 약물이지만 amide형 국소마취제로 이비인후과 표면마취에 쓰인다.",
false,
"ester형."
]
];
