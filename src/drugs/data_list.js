// 자동 생성: druglist/export_list.py ← CNS Drugs 1-4 약물 리스트(PDF)와 같은 내용
// LIST_SECS: [{t: 단원, s: 부제, r: [{l: 0 분류명 / 1·2 글머리 단계, k: 묶음 이름, b: 빈칸 줄 여부, i: [ {a: 약물(정답), n: 특징, p: 앞 글자, o: 1 = 밑줄·족보(보라) 아닌 약 → 묶음 맨 뒤, 회색 칸} | "," "/" "+" | [그냥 글자] ]}]}]
const LIST_SECS = [
{
"t": "CNS 1",
"s": "진정수면제 · Alcohols · 항경련제",
"r": [
{
"l": 0,
"k": null,
"i": [
[
"진정수면제"
]
],
"b": false
},
{
"l": 1,
"k": null,
"i": [
[
"Benzodiazepine"
]
],
"b": false
},
{
"l": 2,
"k": "long",
"i": [
{
"a": "clorazepate"
},
",",
{
"a": "chlordiazepoxide",
"n": "대사 단계 多 → 김"
},
",",
{
"a": "diazepam",
"n": "근이완, SE"
},
",",
{
"a": "flurazepam"
},
",",
{
"a": "quazepam"
}
],
"b": true
},
{
"l": 2,
"k": "intermediate",
"i": [
{
"a": "alprazolam",
"n": "panic attack"
},
",",
{
"a": "estazolam"
},
",",
{
"a": "lorazepam",
"n": "SE, 간기능↓ 금단"
},
",",
{
"a": "temazepam",
"n": "수면 유지"
}
],
"b": true
},
{
"l": 2,
"k": "short",
"i": [
{
"a": "oxazepam",
"n": "간기능↓ 금단"
},
",",
{
"a": "triazolam",
"n": "수면 유도, 지용성↑"
}
],
"b": true
},
{
"l": 2,
"k": null,
"i": [
{
"a": "midazolam",
"n": "premed, amnesia"
}
],
"b": true
},
{
"l": 1,
"k": "BZD antagonist",
"i": [
{
"a": "flumazenil",
"n": "BZD site 경쟁적 길항"
}
],
"b": true
},
{
"l": 1,
"k": "Barbiturate",
"i": [
{
"a": "phenobarbital",
"n": "항경련, neonatal"
},
",",
{
"a": "pentobarbital"
},
",",
{
"a": "thiopental",
"n": "마취 유도"
},
",",
{
"a": "methohexital",
"n": "ultra-short"
}
],
"b": true
},
{
"l": 1,
"k": "Z-drug",
"i": [
{
"a": "zolpidem",
"n": "유도+유지"
},
",",
{
"a": "zaleplon",
"n": "수면 유도"
},
",",
{
"a": "eszopiclone",
"n": "유도+유지"
}
],
"b": true
},
{
"l": 1,
"k": "melatonin receptor agonist",
"i": [
{
"a": "ramelteon",
"n": "의존 없음"
},
",",
{
"a": "tasimelteon"
}
],
"b": true
},
{
"l": 1,
"k": "orexin receptor antagonist",
"i": [
{
"a": "suvorexant",
"n": "수면 유지"
},
",",
{
"a": "lemborexant"
}
],
"b": true
},
{
"l": 1,
"k": "5-HT1A partial agonist",
"i": [
{
"a": "buspirone",
"n": "항불안만, 1주↑"
}
],
"b": true
},
{
"l": 0,
"k": null,
"i": [
[
"Alcohols"
]
],
"b": false
},
{
"l": 1,
"k": "methanol, ethylene glycol 해독",
"i": [
{
"a": "fomepizole",
"n": "ADH 억제"
},
",",
{
"a": "ethanol",
"n": "ADH 경쟁"
}
],
"b": true
},
{
"l": 1,
"k": "alcoholism 재발 방지",
"i": [
{
"a": "naltrexone",
"n": "μ 길항, 갈망↓"
},
",",
{
"a": "acamprosate",
"n": "NMDA, 신부전 금기"
},
",",
{
"a": "disulfiram",
"n": "ALDH 억제"
}
],
"b": true
},
{
"l": 1,
"k": "금단",
"i": [
{
"a": "chlordiazepoxide"
},
",",
{
"a": "diazepam"
},
",",
{
"a": "lorazepam",
"n": "간기능↓"
},
",",
{
"a": "oxazepam",
"n": "간기능↓"
},
"+",
{
"a": "thiamine",
"n": "WKS 예방"
}
],
"b": true
},
{
"l": 0,
"k": null,
"i": [
[
"항경련제"
]
],
"b": false
},
{
"l": 1,
"k": "voltage-gated Na⁺ 차단",
"i": [
{
"a": "phenytoin",
"n": "잇몸 증식, 다모, 0차 PK"
},
",",
{
"a": "carbamazepine",
"n": "focal 1st, hyponatremia"
},
",",
{
"a": "oxcarbazepine"
},
",",
{
"a": "eslicarbazepine"
},
",",
{
"a": "lamotrigine",
"n": "임신, rash→SJS"
},
",",
{
"a": "lacosamide",
"n": "내약성 좋음"
},
",",
{
"a": "zonisamide",
"n": "신결석"
},
",",
{
"a": "rufinamide",
"n": "LGS"
},
",",
{
"a": "cenobamate",
"n": "QT 단축"
},
",",
{
"a": "fosphenytoin",
"o": 1
}
],
"b": true
},
{
"l": 1,
"k": "T-type Ca²⁺ 차단",
"i": [
{
"a": "ethosuximide",
"n": "absence 1st"
}
],
"b": true
},
{
"l": 1,
"k": "α2δ",
"i": [
{
"a": "gabapentin",
"n": "신경병증 통증"
},
",",
{
"a": "pregabalin",
"n": "섬유근통"
}
],
"b": true
},
{
"l": 1,
"k": "SV2A",
"i": [
{
"a": "levetiracetam",
"n": "임신, 행동 변화"
},
",",
{
"a": "brivaracetam"
}
],
"b": true
},
{
"l": 1,
"k": "NMDA 차단",
"i": [
{
"a": "felbamate",
"n": "재생불량 빈혈, 간염"
}
],
"b": true
},
{
"l": 1,
"k": "AMPA 차단",
"i": [
{
"a": "perampanel",
"n": "aggression"
}
],
"b": true
},
{
"l": 1,
"k": "GABA-T 억제",
"i": [
{
"a": "vigabatrin",
"n": "infantile spasm, 시야결손"
}
],
"b": true
},
{
"l": 1,
"k": "GAT-1 억제",
"i": [
{
"a": "tiagabine",
"n": "confusion"
}
],
"b": true
},
{
"l": 1,
"k": "GABA<sub>A</sub> 강화",
"i": [
{
"a": "diazepam",
"n": "SE 1st"
},
",",
{
"a": "lorazepam",
"n": "SE 1st"
},
",",
{
"a": "clonazepam"
},
",",
{
"a": "clobazam",
"n": "LGS, Dravet"
},
",",
{
"a": "nitrazepam"
},
",",
{
"a": "clorazepate"
},
",",
{
"a": "phenobarbital",
"n": "neonatal 1st"
},
",",
{
"a": "primidone"
},
",",
{
"a": "stiripentol",
"n": "Dravet"
}
],
"b": true
},
{
"l": 1,
"k": "다중 기전",
"i": [
{
"a": "valproic acid",
"n": "generalized 1st, 간독성, spina bifida"
},
",",
{
"a": "topiramate",
"n": "신결석, 근시, 녹내장"
}
],
"b": true
},
{
"l": 1,
"k": "기타",
"i": [
{
"a": "everolimus",
"n": "mTORC1, TSC"
},
",",
{
"a": "acetazolamide",
"n": "월경 발작"
},
",",
{
"a": "cannabidiol",
"n": "Dravet, LGS"
},
",",
{
"a": "fenfluramine",
"n": "Dravet, LGS"
}
],
"b": true
}
]
},
{
"t": "CNS 2",
"s": "골격근 이완제 · 마취제",
"r": [
{
"l": 0,
"k": null,
"i": [
[
"골격근 이완제"
]
],
"b": false
},
{
"l": 1,
"k": null,
"i": [
[
"nondepolarizing NMB"
]
],
"b": false
},
{
"l": 2,
"k": "short",
"i": [
{
"a": "mivacurium",
"n": "histamine → 저혈압"
}
],
"b": true
},
{
"l": 2,
"k": "intermediate",
"i": [
{
"a": "atracurium",
"n": "histamine"
},
",",
{
"a": "cisatracurium",
"n": "심혈관 영향↓"
},
",",
{
"a": "vecuronium",
"n": "심혈관 영향↓"
},
",",
{
"a": "rocuronium",
"n": "삽관, sugammadex"
}
],
"b": true
},
{
"l": 2,
"k": "long",
"i": [
{
"a": "pancuronium",
"n": "빈맥, 고혈압"
},
",",
{
"a": "doxacurium",
"o": 1
},
",",
{
"a": "pipecuronium",
"o": 1
},
"/",
{
"a": "tubocurarine",
"n": "ganglia 차단 + histamine"
},
",",
{
"a": "metocurine"
}
],
"b": true
},
{
"l": 1,
"k": "depolarizing NMB",
"i": [
{
"a": "succinylcholine",
"n": "hyperkalemia, MH, pseudo-ChE"
}
],
"b": true
},
{
"l": 1,
"k": "NMB reversal",
"i": [
{
"a": "neostigmine",
"n": "AChE 억제"
},
",",
{
"a": "pyridostigmine",
"n": "AChE 억제"
},
"/",
{
"a": "sugammadex",
"n": "steroid NMB 결합"
}
],
"b": true
},
{
"l": 1,
"k": "spasmolytic",
"i": [
{
"a": "diazepam",
"n": "GABA_A"
},
",",
{
"a": "baclofen",
"n": "GABA_B"
},
",",
{
"a": "tizanidine",
"n": "α2"
}
],
"b": true
},
{
"l": 1,
"k": "antispasmodic",
"i": [
{
"a": "dantrolene",
"n": "RyR, MH"
},
",",
{
"a": "botulinum toxin",
"n": "ACh 방출↓, 주름"
}
],
"b": true
},
{
"l": 0,
"k": null,
"i": [
[
"흡입마취제"
]
],
"b": false
},
{
"l": 1,
"k": "volatile",
"i": [
{
"a": "halothane",
"n": "간독성, 부정맥, 유지 쉬움"
},
",",
{
"a": "enflurane",
"n": "신독성"
},
",",
{
"a": "isoflurane",
"n": "심부전 가능"
},
",",
{
"a": "desflurane",
"n": "pungent, 빠른 회복"
},
",",
{
"a": "sevoflurane",
"n": "nonpungent"
}
],
"b": true
},
{
"l": 1,
"k": "gaseous",
"i": [
{
"a": "nitrous oxide(N₂O)",
"n": "유도 빠름, megaloblastic"
},
",",
{
"a": "xenon",
"o": 1
}
],
"b": true
},
{
"l": 0,
"k": null,
"i": [
[
"정맥마취제"
]
],
"b": false
},
{
"l": 1,
"k": "정맥마취제",
"i": [
{
"a": "propofol",
"n": "유도, 진정, 유지, 항구토"
},
",",
{
"a": "thiopental",
"n": "유도"
},
",",
{
"a": "methohexital"
},
",",
{
"a": "midazolam",
"n": "flumazenil 반전"
},
",",
{
"a": "etomidate",
"n": "심혈관 안정, 부신억제"
},
",",
{
"a": "ketamine",
"n": "NMDA, 교감자극, 천식"
},
",",
{
"a": "dexmedetomidine",
"n": "α2, ICU 진정"
}
],
"b": true
},
{
"l": 1,
"k": "premedication",
"i": [
{
"a": "midazolam",
"n": "불안↓"
},
",",
{
"a": "fentanyl",
"n": "진통"
},
",",
{
"a": "diphenhydramine",
"n": "알레르기"
},
",",
{
"a": "ondansetron",
"n": "항구토"
},
",",
{
"a": "famotidine",
"n": "H₂",
"o": 1
},
",",
{
"a": "ranitidine",
"n": "H₂",
"o": 1
},
",",
{
"a": "glycopyrrolate",
"n": "서맥, 분비물 예방",
"o": 1
}
],
"b": true
},
{
"l": 0,
"k": null,
"i": [
[
"국소마취제"
]
],
"b": false
},
{
"l": 1,
"k": null,
"i": [
[
"amide"
]
],
"b": false
},
{
"l": 2,
"k": "medium",
"i": [
{
"a": "lidocaine",
"n": "기준 약"
},
",",
{
"a": "mepivacaine"
},
",",
{
"a": "articaine",
"o": 1
},
",",
{
"a": "prilocaine",
"o": 1
}
],
"b": true
},
{
"l": 2,
"k": "long",
"i": [
{
"a": "bupivacaine",
"n": "심독성"
},
",",
{
"a": "ropivacaine"
},
",",
{
"a": "levobupivacaine",
"o": 1
}
],
"b": true
},
{
"l": 1,
"k": null,
"i": [
[
"ester"
]
],
"b": false
},
{
"l": 2,
"k": "short",
"i": [
{
"a": "chloroprocaine",
"n": "초단시간"
},
"/",
{
"a": "procaine"
},
",",
{
"a": "tetracaine"
}
],
"b": true
},
{
"l": 2,
"k": "표면마취",
"i": [
{
"a": "cocaine",
"n": "ENT, 혈관수축"
},
",",
{
"a": "benzocaine",
"n": "methemoglobinemia"
}
],
"b": true
}
]
},
{
"t": "CNS 3",
"s": "PD · AD · 항정신병약 · 양극성 · 항우울제",
"r": [
{
"l": 0,
"k": null,
"i": [
[
"Parkinson’s disease"
]
],
"b": false
},
{
"l": 1,
"k": "DA precursor",
"i": [
{
"a": "levodopa",
"n": "main drug, on-off"
},
"+",
{
"a": "carbidopa",
"n": "말초 decarboxylase 억제"
}
],
"b": true
},
{
"l": 1,
"k": null,
"i": [
[
"DA receptor agonist"
]
],
"b": false
},
{
"l": 2,
"k": "ergot",
"i": [
{
"a": "bromocriptine",
"n": "D2"
}
],
"b": true
},
{
"l": 2,
"k": "non-ergot",
"i": [
{
"a": "pramipexole",
"n": "D3"
},
",",
{
"a": "ropinirole",
"n": "D2"
},
",",
{
"a": "rotigotine",
"n": "patch"
}
],
"b": true
},
{
"l": 1,
"k": "MAO-B inhibitor",
"i": [
{
"a": "selegiline"
},
",",
{
"a": "rasagiline"
},
",",
{
"a": "safinamide"
}
],
"b": true
},
{
"l": 1,
"k": "COMT inhibitor",
"i": [
{
"a": "entacapone",
"n": "Stalevo",
"o": 1
},
",",
{
"a": "opicapone",
"n": "취침 시 1회",
"o": 1
},
"/",
{
"a": "tolcapone",
"n": "간독성"
}
],
"b": true
},
{
"l": 1,
"k": "anticholinergic",
"i": [
{
"a": "benztropine",
"n": "약물유발 PD"
},
",",
{
"a": "trihexyphenidyl"
},
",",
{
"a": "biperiden"
},
",",
{
"a": "orphenadrine"
},
",",
{
"a": "procyclidine"
}
],
"b": true
},
{
"l": 1,
"k": "기타",
"i": [
{
"a": "apomorphine",
"n": "off-period 급속 완화"
},
"+",
{
"a": "trimethobenzamide",
"n": "구역 예방"
},
",",
{
"a": "amantadine",
"n": "livedo reticularis"
},
",",
{
"a": "istradefylline",
"n": "A2A 길항, wearing-off↓"
}
],
"b": true
},
{
"l": 0,
"k": null,
"i": [
[
"Alzheimer’s disease"
]
],
"b": false
},
{
"l": 1,
"k": "AChE inhibitor",
"i": [
{
"a": "donepezil",
"n": "기종평 단골"
},
",",
{
"a": "galantamine",
"n": "PD 치매",
"o": 1
},
",",
{
"a": "rivastigmine",
"o": 1
},
",",
{
"a": "tacrine",
"o": 1
}
],
"b": true
},
{
"l": 1,
"k": "NMDA antagonist",
"i": [
{
"a": "memantine"
}
],
"b": true
},
{
"l": 1,
"k": "anti-amyloid mAb",
"i": [
{
"a": "aducanumab",
"n": "승인 취소"
}
],
"b": true
},
{
"l": 0,
"k": null,
"i": [
[
"항정신병약"
]
],
"b": false
},
{
"l": 1,
"k": null,
"i": [
[
"typical"
]
],
"b": false
},
{
"l": 2,
"k": "low potency",
"i": [
{
"a": "chlorpromazine",
"n": "α1, H1, M 차단"
},
",",
{
"a": "thioridazine",
"n": "QT, 색소망막염"
}
],
"b": true
},
{
"l": 2,
"k": "high potency",
"i": [
{
"a": "fluphenazine",
"n": "α1 차단 적음"
},
",",
{
"a": "perphenazine"
},
",",
{
"a": "trifluoperazine",
"o": 1
},
"/",
{
"a": "haloperidol",
"n": "EPS 최다"
},
"/",
{
"a": "thiothixene",
"o": 1
}
],
"b": true
},
{
"l": 1,
"k": "atypical",
"i": [
{
"a": "clozapine",
"n": "무과립구증, 자살충동 1차"
},
",",
{
"a": "olanzapine",
"n": "체중↑"
},
",",
{
"a": "quetiapine",
"n": "bipolar 우울"
},
",",
{
"a": "risperidone",
"n": "TD, prolactin"
},
",",
{
"a": "paliperidone",
"n": "TD"
},
",",
{
"a": "ziprasidone",
"n": "QT"
},
",",
{
"a": "zotepine"
},
",",
{
"a": "aripiprazole",
"n": "D2 partial"
},
"/",
{
"a": "asenapine",
"o": 1
},
",",
{
"a": "brexpiprazole",
"o": 1
},
",",
{
"a": "cariprazine",
"o": 1
},
",",
{
"a": "droperidol",
"n": "항구토",
"o": 1
},
",",
{
"a": "loxapine",
"o": 1
},
",",
{
"a": "lurasidone",
"o": 1
},
",",
{
"a": "sertindole",
"o": 1
}
],
"b": true
},
{
"l": 1,
"k": "EPS 치료",
"i": [
{
"a": "benztropine"
},
",",
{
"a": "diphenhydramine",
"n": "akathisia, dystonia"
},
",",
{
"a": "amantadine"
}
],
"b": true
},
{
"l": 1,
"k": "TD 치료",
"i": [
{
"a": "valbenazine",
"n": "VMAT 억제"
},
",",
{
"a": "deutetrabenazine",
"n": "VMAT 억제"
}
],
"b": true
},
{
"l": 1,
"k": "항구토로도",
"i": [
{
"a": "chlorpromazine"
},
",",
{
"a": "olanzapine"
},
",",
{
"a": "droperidol",
"o": 1
},
"/",
{
"a": "prochlorperazine",
"o": 1
},
",",
{
"a": "benzquinamide",
"o": 1
}
],
"b": true
},
{
"l": 0,
"k": null,
"i": [
[
"양극성 장애"
]
],
"b": false
},
{
"l": 1,
"k": null,
"i": [
{
"a": "lithium",
"n": "1st, ≤1 mEq/L, 신독성"
}
],
"b": true
},
{
"l": 2,
"k": "tremor 처치",
"i": [
{
"a": "propranolol"
},
",",
{
"a": "atenolol"
}
],
"b": true
},
{
"l": 1,
"k": "mood stabilizer",
"i": [
{
"a": "valproic acid",
"n": "조증"
},
",",
{
"a": "carbamazepine",
"n": "조증"
},
"/",
{
"a": "lamotrigine",
"n": "우울 재발 예방"
}
],
"b": true
},
{
"l": 1,
"k": "antipsychotic",
"i": [
{
"a": "aripiprazole"
},
",",
{
"a": "chlorpromazine"
},
",",
{
"a": "olanzapine"
},
",",
{
"a": "quetiapine"
},
",",
{
"a": "risperidone"
},
",",
{
"a": "ziprasidone"
}
],
"b": true
},
{
"l": 1,
"k": "bipolar depression",
"i": [
{
"a": "quetiapine"
},
",",
{
"a": "olanzapine"
},
"+",
{
"a": "fluoxetine"
}
],
"b": true
},
{
"l": 0,
"k": null,
"i": [
[
"항우울제"
]
],
"b": false
},
{
"l": 1,
"k": "SSRI",
"i": [
{
"a": "fluoxetine",
"n": "불면, PMDD, 폭식증"
},
",",
{
"a": "sertraline",
"n": "불면, PMDD"
},
",",
{
"a": "paroxetine",
"n": "과수면, 체중↑, OCD, category D"
},
",",
{
"a": "fluvoxamine",
"n": "과수면, OCD"
},
",",
{
"a": "citalopram"
},
",",
{
"a": "escitalopram"
}
],
"b": true
},
{
"l": 1,
"k": "SNRI",
"i": [
{
"a": "venlafaxine",
"o": 1
},
",",
{
"a": "desvenlafaxine",
"o": 1
},
",",
{
"a": "milnacipran",
"o": 1
},
",",
{
"a": "levomilnacipran",
"o": 1
},
",",
{
"a": "duloxetine",
"n": "통증 동반 우울",
"o": 1
}
],
"b": true
},
{
"l": 1,
"k": null,
"i": [
[
"TCA"
]
],
"b": false
},
{
"l": 2,
"k": "tricyclic tertiary",
"i": [
{
"a": "clomipramine",
"n": "성기능↓"
},
",",
{
"a": "imipramine",
"n": "기립성 저혈압"
},
",",
{
"a": "doxepin",
"n": "불면"
},
",",
{
"a": "amitriptyline",
"n": "편두통, 만성통증",
"o": 1
},
",",
{
"a": "protriptyline",
"o": 1
}
],
"b": true
},
{
"l": 2,
"k": "tricyclic secondary",
"i": [
{
"a": "desipramine",
"n": "NET 우세"
},
",",
{
"a": "nortriptyline",
"n": "NET 우세"
}
],
"b": true
},
{
"l": 2,
"k": "tetracyclic",
"i": [
{
"a": "amoxapine",
"n": "D2 억제, 조현병+우울"
},
",",
{
"a": "maprotiline",
"n": "NET 우세",
"o": 1
},
",",
{
"a": "vilazodone",
"n": "SERT만",
"o": 1
}
],
"b": true
},
{
"l": 1,
"k": null,
"i": [
[
"MAOI"
]
],
"b": false
},
{
"l": 2,
"k": "nonselective",
"i": [
{
"a": "phenelzine"
},
",",
{
"a": "isocarboxazid"
},
",",
{
"a": "tranylcypromine"
}
],
"b": true
},
{
"l": 2,
"k": "selective",
"i": [
{
"a": "moclobemide",
"n": "MAO-A"
},
",",
{
"a": "selegiline",
"n": "MAO-B → 고용량 A"
}
],
"b": true
},
{
"l": 1,
"k": "5-HT antagonist / reuptake inhibitor",
"i": [
{
"a": "trazodone",
"n": "진정, 지속발기증"
},
",",
{
"a": "nefazodone",
"n": "간독성, 성기능 부작용↓"
},
",",
{
"a": "vortioxetine",
"n": "오심, 성기능장애"
}
],
"b": true
},
{
"l": 1,
"k": "DA / NE reuptake inhibitor",
"i": [
{
"a": "bupropion",
"n": "금연, 성기능 부작용↓, 경련"
}
],
"b": true
},
{
"l": 1,
"k": "α2 autoreceptor antagonist",
"i": [
{
"a": "mirtazapine",
"n": "진정, 불면 동반 우울"
}
],
"b": true
},
{
"l": 1,
"k": "NMDA antagonist",
"i": [
{
"a": "esketamine",
"n": "비강, 2시간 병원 관찰"
}
],
"b": true
},
{
"l": 1,
"k": "GABA<sub>A</sub> positive allosteric modulator",
"i": [
{
"a": "brexanolone",
"n": "산후우울증, IV 60 h"
}
],
"b": true
}
]
},
{
"t": "CNS 4",
"s": "Opioids · Drugs of Abuse",
"r": [
{
"l": 0,
"k": null,
"i": [
[
"Opioid 분류(기원)"
]
],
"b": false
},
{
"l": 1,
"k": "natural",
"i": [
{
"a": "opium"
},
",",
{
"a": "morphine"
},
",",
{
"a": "codeine"
},
",",
{
"a": "thebaine",
"o": 1
}
],
"b": true
},
{
"l": 1,
"k": "semisynthetic",
"i": [
{
"a": "heroin"
},
",",
{
"a": "hydromorphone"
},
",",
{
"a": "hydrocodone"
},
",",
{
"a": "oxycodone"
},
",",
{
"a": "oxymorphone"
}
],
"b": true
},
{
"l": 1,
"k": "synthetic",
"i": [
{
"a": "fentanyl"
},
",",
{
"a": "meperidine"
},
",",
{
"a": "methadone"
},
",",
{
"a": "tapentadol"
},
",",
{
"a": "tramadol"
}
],
"b": true
},
{
"l": 0,
"k": null,
"i": [
[
"Opioid 분류(작용)"
]
],
"b": false
},
{
"l": 1,
"k": "strong agonist",
"i": [
{
"a": "morphine",
"n": "pulmonary edema"
},
",",
{
"a": "hydromorphone"
},
",",
{
"a": "oxymorphone"
},
",",
{
"a": "methadone",
"n": "경구, 24 h, detox"
},
",",
{
"a": "fentanyl",
"n": "morphine 100배, patch"
},
",",
{
"a": "sufentanil"
},
",",
{
"a": "alfentanil"
},
",",
{
"a": "remifentanil"
},
",",
{
"a": "meperidine",
"n": "normeperidine, 빈맥 금기"
},
",",
{
"a": "levorphanol"
}
],
"b": true
},
{
"l": 1,
"k": "mild~moderate agonist",
"i": [
{
"a": "codeine",
"n": "진해"
},
",",
{
"a": "hydrocodone"
},
",",
{
"a": "oxycodone",
"n": "가장 강력"
},
",",
{
"a": "dihydrocodeine",
"o": 1
}
],
"b": true
},
{
"l": 2,
"k": "진해",
"i": [
{
"a": "codeine"
},
",",
{
"a": "dextromethorphan",
"o": 1
}
],
"b": true
},
{
"l": 2,
"k": "지사",
"i": [
{
"a": "diphenoxylate"
},
",",
{
"a": "difenoxin"
},
",",
{
"a": "loperamide",
"n": "BBB 통과 ✗"
}
],
"b": true
},
{
"l": 1,
"k": "mixed agonist-antagonist",
"i": [
{
"a": "nalbuphine",
"n": "naloxone 반전 ✗"
},
",",
{
"a": "butorphanol"
},
",",
{
"a": "pentazocine",
"n": "약함, 피하주사 ✗"
}
],
"b": true
},
{
"l": 1,
"k": "partial agonist",
"i": [
{
"a": "buprenorphine",
"n": "tight binding, detox"
}
],
"b": true
},
{
"l": 1,
"k": "기타",
"i": [
{
"a": "tramadol",
"n": "SERT + weak μ, neuropathic pain"
},
",",
{
"a": "tapentadol",
"n": "NET + μ, ~oxycodone"
}
],
"b": true
},
{
"l": 1,
"k": "antagonist",
"i": [
{
"a": "naloxone",
"n": "IV 30초, 반복 투여"
},
",",
{
"a": "naltrexone",
"n": "경구 48 h, alcoholism"
},
",",
{
"a": "nalmefene",
"n": "반복 overdose 관리"
}
],
"b": true
},
{
"l": 1,
"k": "peripheral antagonist",
"i": [
{
"a": "methylnaltrexone",
"o": 1
},
",",
{
"a": "naloxegol",
"o": 1
},
",",
{
"a": "naldemedine",
"o": 1
},
",",
{
"a": "alvimopan",
"o": 1
}
],
"b": true
},
{
"l": 1,
"k": null,
"i": [
[
"중독 치료"
]
],
"b": false
},
{
"l": 2,
"k": "급성",
"i": [
{
"a": "naloxone"
},
",",
{
"a": "nalmefene"
}
],
"b": true
},
{
"l": 2,
"k": "만성",
"i": [
{
"a": "methadone"
},
",",
{
"a": "buprenorphine"
},
",",
{
"a": "naltrexone"
}
],
"b": true
},
{
"l": 0,
"k": null,
"i": [
[
"Drugs of Abuse"
]
],
"b": false
},
{
"l": 1,
"k": null,
"i": [
[
"Class I (GPCR)"
]
],
"b": false
},
{
"l": 2,
"k": "opioid",
"i": [
{
"a": "morphine"
},
",",
{
"a": "heroin",
"n": "acetyl 2개, 지용성↑"
},
",",
{
"a": "codeine"
},
",",
{
"a": "oxycodone"
},
",",
{
"a": "meperidine"
}
],
"b": true
},
{
"l": 2,
"k": "cannabinoid",
"i": [
{
"a": "marijuana(THC)",
"n": "CB1, DA 방출"
},
"/",
{
"a": "dronabinol",
"n": "식욕 증진",
"p": "의료용",
"o": 1
},
",",
{
"a": "nabilone",
"o": 1
}
],
"b": true
},
{
"l": 2,
"k": "GABA<sub>B</sub>",
"i": [
{
"a": "GHB",
"n": "데이트 강간 약, amnesia"
}
],
"b": true
},
{
"l": 2,
"k": "환각제",
"i": [
{
"a": "LSD",
"n": "교차내성, 의존 ✗"
},
",",
{
"a": "mescaline"
},
",",
{
"a": "psilocybin"
}
],
"b": true
},
{
"l": 1,
"k": null,
"i": [
[
"Class II (ion channel)"
]
],
"b": false
},
{
"l": 2,
"k": "nicotine / 금연 보조",
"i": [
{
"a": "bupropion",
"n": "1주 전 시작"
},
",",
{
"a": "varenicline",
"n": "nAChR partial, 경련"
},
",",
{
"a": "cytisine",
"n": "nAChR partial"
},
",",
{
"a": "nicotine patch",
"o": 1
},
",",
{
"a": "gum",
"o": 1
}
],
"b": true
},
{
"l": 2,
"k": null,
"i": [
[
"alcohol"
],
",",
[
"BZD"
],
",",
[
"barbiturate"
]
],
"b": false
},
{
"l": 2,
"k": "NMDA 길항",
"i": [
{
"a": "ketamine"
},
",",
{
"a": "phencyclidine(PCP)",
"n": "공격성, 무통, 빈맥"
}
],
"b": true
},
{
"l": 1,
"k": null,
"i": [
[
"Class III (transporter)"
]
],
"b": false
},
{
"l": 2,
"k": null,
"i": [
{
"a": "cocaine",
"n": "DAT 직접 억제, 고열"
}
],
"b": true
},
{
"l": 2,
"k": null,
"i": [
{
"a": "amphetamine",
"n": "VMAT, 고혈압 위기, ADHD"
},
",",
{
"a": "methamphetamine",
"n": "필로폰"
},
",",
{
"a": "dextroamphetamine",
"o": 1
}
],
"b": true
},
{
"l": 2,
"k": null,
"i": [
{
"a": "MDMA(ecstasy)",
"n": "SERT 우세, 탈수+고열"
}
],
"b": true
}
]
}
];
