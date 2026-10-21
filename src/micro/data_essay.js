// ───── 단원 (조정제 교수님 강의)
const UNITS = { 17: "Papilloma·Adeno", 18: "Herpesvirus", 19: "Pox·Parvo", 20: "Ortho·Paramyxo" };

// ───── 서술형 문항 — 2025 기말 족보 + 2025 강의록 기반
// rubric k: [[대안…],[대안…]] → 각 묶음에서 하나 이상 답안에 있으면 그 항목 인정 (AND of OR)
// w: 가중치 · model: 모범답안 HTML · tip: 족보 해설/교수님 강조
const ESSAYS = [
  {
    id:'hpv', lec:17, lecName:'Papilloma·Polyoma·Adeno', no:'주1', pts:5,
    stem:'사람 유두종 바이러스에 대한 백신에 대해 설명하시오.',
    jokbo:'짤족 · 2024 주1, 2023 주1, 2021 주1', tip:'백신 3종의 포함 type과 adjuvant, 예방 질환 범위를 표로 외워 두면 됩니다. 매년 같은 문제가 나와요.',
    rubric:[
      {t:'2가 Cervarix(서바릭스) = HPV 16·18형', w:2, k:[['2가','서바릭스','cervarix','2価'],['16'],['18']]},
      {t:'2가 adjuvant = AS04', w:1, k:[['as04']]},
      {t:'4가 Gardasil(가다실) = HPV 6·11·16·18형', w:2, k:[['4가','가다실','gardasil'],['6'],['11']]},
      {t:'6·11형에 의한 생식기 사마귀(condyloma acuminatum)까지 예방', w:1.5, k:[['사마귀','condyloma','콘딜로마','곤지름','wart']]},
      {t:'9가 Gardasil9 = 6·11·16·18 + 31·33·45·52·58형', w:2, k:[['9가','가다실9','gardasil9'],['31','33','45','52','58']]},
      {t:'4가·9가 adjuvant = 알루미늄염', w:1, k:[['알루미늄','aluminum','aluminium','alum','알럼']]},
      {t:'예방 질환: 자궁경부암 + 질암·외음부암·항문암', w:1, k:[['자궁경부암','cervicalcancer'],['항문암','외음부암','질암','anal','vulvar','vaginal']]},
      {t:'L1 capsid 단백으로 만든 VLP(재조합, 효모 생산) — 감염성 없음', w:1, k:[['l1','vlp','바이러스유사입자','viruslikeparticle']]},
      {t:'접종 대상: 성 경험 전 9–12세 여아, 만 12세 무료(2가·4가), 9가는 유료', w:1, k:[['12세','9~12','9-12','성경험','성접촉전','무료']]},
    ],
    model:`
      <p><b>HPV</b>는 dsDNA circular, naked papillomavirus로 자궁경부암의 원인이며 <b>16·18형이 자궁경부암의 약 70%</b>를 일으킨다. 백신은 HPV의 <b>L1 major capsid protein</b>을 재조합(효모 <i>Saccharomyces cerevisiae</i>)으로 만들어 스스로 조립된 <b>VLP(virus-like particle)</b>로, 바이러스 DNA가 없어 감염성이 없다. 현재 3종이 있다.</p>
      <div class="tbl"><table>
        <tr><th></th><th>2가 서바릭스 (Cervarix)</th><th>4가 가다실 (Gardasil)</th><th>9가 가다실9 (Gardasil 9)</th></tr>
        <tr><th>포함 type</th><td>16, 18</td><td>6, 11, 16, 18</td><td>6, 11, 16, 18, 31, 33, 45, 52, 58</td></tr>
        <tr><th>Adjuvant</th><td><b>AS04</b></td><td>알루미늄염</td><td>알루미늄염</td></tr>
        <tr><th>여성 예방 범위</th><td>16·18형 자궁경부암, 외음부암, 질암, 항문암</td><td>좌동 + 6·11형 <b>생식기 사마귀</b></td><td>9개 type의 자궁경부암·외음부암·질암·항문암 + 생식기 사마귀</td></tr>
        <tr><th>남성 예방 범위</th><td>16·18형 항문암</td><td>항문암 + 생식기 사마귀</td><td>항문암 + 생식기 사마귀</td></tr>
      </table></div>
      <ul>
        <li>2가는 예방 범위는 좁지만 AS04 덕분에 면역 기억이 더 강하고 오래 유지된다. 4가는 6·11형(condyloma acuminatum, laryngeal papilloma 원인)까지 막아 범위가 넓다.</li>
        <li>접종 대상은 <b>성 경험이 없는 9–12세 여아</b>다. 국내에서는 2016년부터 만 12세 여아에게 2가·4가를 무료 접종하고, 9가는 유료다.</li>
        <li>예방 효과(질병관리본부): 2가 92–100%, 4가 97–100%. WHO(2016)는 2가·4가·9가의 예방 효과가 비슷하다고 평가했다.</li>
      </ul>
      <p class="src">근거: 17강 Box 41.3(Modes of control: vaccine for HPV 6, 11, 16, 18, 31, 33, 45, 52, 58), 서바릭스/가다실/가다실9 비교표, 가다실9 허가사항(L1 단백·효모), 자궁경부암 백신 기사 슬라이드</p>`
  },
  {
    id:'vzv', lec:18, lecName:'Human Herpesvirus', no:'주1', pts:null,
    stem:'수두 대상포진 바이러스의 발병기전을 설명하시오.',
    jokbo:'유사족 · 2018 주2 (강의록 필기 ♥2018, 2017, 2013, 2008, 2007)', tip:'초기감염(수두) → 잠복 → 재활성화(대상포진) 3단계로 나눠 쓰고, Box 43.6의 문장을 빠짐없이 넣는 것이 핵심입니다.',
    rubric:[
      {t:'호흡기 비말(droplet)로 전파, 초기 복제는 호흡기(respiratory tract)', w:1.5, k:[['호흡기','respiratory','비말','droplet']]},
      {t:'림프절 → 1차 viremia → 간·비장·RES → 2차 viremia(T cell)로 피부 도달', w:1.5, k:[['viremia','바이러스혈증','혈류']]},
      {t:'감염 세포: epithelial cell, fibroblast, T cell, neuron', w:1, k:[['tcell','t세포','t림프구','t-cell']]},
      {t:'syncytia 형성, cell-to-cell spread', w:1.5, k:[['syncyt','합포체','celltocell','cell-to-cell','세포간','세포-세포','세포대세포']]},
      {t:'항체 회피 → cell-mediated immunity(CMI)가 감염 조절에 필수', w:1.5, k:[['세포매개','cellmediated','cell-mediated','cmi']]},
      {t:'피부에 successive crops: macule → papule → vesicle → pustule → crust가 한 시점에 공존', w:1.5, k:[['successive','crop','multiplestage','여러단계','다양한단계','동시','macule','반점','구진','papule']]},
      {t:'성인 초감염: 강한 염증반응으로 life-threatening pneumonia', w:0.5, k:[['폐렴','pneumonia']]},
      {t:'면역저하자: 파종성(disseminated) 치명적 질환', w:0.5, k:[['면역저하','immunocompromised','파종','disseminat']]},
      {t:'신경 따라 이동해 dorsal root ganglia·cranial nerve ganglia(neuron)에 잠복', w:2, k:[['ganglia','ganglion','신경절','drg','dorsalroot','후근']]},
      {t:'CMI 저하(노화·면역저하) 시 재활성화 → herpes zoster', w:1.5, k:[['재활성','reactiv','재발','recurren'],['zoster','대상포진','shingles']]},
      {t:'해당 신경의 dermatome 전체를 따라 병변', w:1.5, k:[['dermatome','피부분절','피절','더마톰']]},
    ],
    model:`
      <p>VZV(HHV-3, alphaherpesvirus)의 발병기전은 <b>초기 감염(수두) → 잠복 → 재활성화(대상포진)</b>의 3단계로 나뉜다.</p>
      <h4>1. 초기 감염 · 전파 (Varicella, 수두)</h4>
      <ol>
        <li>주로 <b>호흡기 비말(respiratory droplet)</b>로, 일부는 직접 접촉으로 전파되며 전파력이 매우 높다. <b>초기 복제는 호흡기(상기도 점막)</b>에서 일어난다.</li>
        <li>국소 림프절에서 증식 → <b>1차 viremia</b> → 간·비장·reticuloendothelial system에서 증식 → <b>T cell을 통한 2차(cell-associated) viremia</b>로 피부·점막에 도달한다(잠복기 약 14일).</li>
        <li>epithelial cell, fibroblast, <b>T cell, neuron</b>을 감염시킨다.</li>
        <li><b>syncytia</b>를 형성하며 <b>cell-to-cell</b>로 직접 퍼지므로 antibody clearance를 회피한다. 따라서 감염 조절에는 <b>cell-mediated immunity(CMI)가 필수</b>다.</li>
        <li>피부에 <b>"successive crops"</b>로 병변이 생겨 <b>macule → papule → vesicle → pustule → crust</b>가 한 시점에 함께 관찰된다(multiple stage).</li>
        <li>성인 초감염 시 강한 염증반응으로 <b>life-threatening pneumonia</b>가 생길 수 있고, 면역저하자·신생아에서는 <b>disseminated</b> 치명적 질환이 생길 수 있다.</li>
      </ol>
      <h4>2. 잠복 (Latency)</h4>
      <p>피부 병변에서 감각신경을 타고 올라가 <b>dorsal root ganglia, cranial nerve ganglia</b>의 neuron에 평생 잠복한다.</p>
      <h4>3. 재활성화 (Herpes zoster, 대상포진)</h4>
      <p>노화·면역저하 등으로 <b>CMI가 떨어지면</b> 잠복 바이러스가 재활성화되어 신경을 따라 내려오고, 그 신경이 지배하는 <b>dermatome 전체를 따라</b> 통증성 수포를 만든다. 재발은 드물고(보통 1회), zoster 병변도 전염원이 된다.</p>
      <p class="src">근거: 18강 Box 43.6 Disease Mechanisms of VZV, Fig. 43.8 Mechanism of spread, Fig. 43.9 Time course, Fig. 30-4 Latent infections, Box 43.7 Epidemiology</p>`
  },
  {
    id:'cmv', lec:18, lecName:'Human Herpesvirus', no:'주2', pts:null,
    stem:'CMV의 infection sources를 열거하시오.',
    jokbo:'짤족 · 2019, 2015, 2013', tip:'교수님이 수업 중 "중요하다"고 강조한 표(Table 43.5)가 그대로 출제됐어요. 연령대별로 나눠 쓰면 안전합니다.',
    rubric:[
      {t:'신생아: 태반(transplacental)·자궁내(intrauterine) 감염', w:1.5, k:[['태반','transplacental','placent','자궁내','intrauterine','수직']]},
      {t:'신생아: 자궁경부 분비물(cervical secretions)', w:1, k:[['자궁경부','cervical','산도']]},
      {t:'소아: 모유(breast milk)', w:1, k:[['모유','breastmilk','수유','젖']]},
      {t:'소아: 침(saliva)', w:1, k:[['타액','saliva','침']]},
      {t:'소아: 눈물(tears)', w:1, k:[['눈물','tear']]},
      {t:'소아: 소변(urine)', w:1, k:[['소변','urine','오줌']]},
      {t:'성인: 성접촉(semen)', w:1, k:[['정액','semen','성접촉','성관계','sexual','성적']]},
      {t:'성인: 수혈(blood transfusion)', w:1, k:[['수혈','transfusion']]},
      {t:'성인: 장기이식(organ graft)', w:1, k:[['이식','transplant','graft']]},
      {t:'연령대별(신생아·소아·성인)로 구분해 서술', w:0.5, k:[['신생아','neonate','태아'],['성인','adult']]},
    ],
    model:`
      <div class="tbl"><table>
        <tr><th>연령대</th><th>감염원 (Table 43.5 Sources of CMV infection)</th></tr>
        <tr><td><b>Neonate</b> (신생아)</td><td>Transplacental transmission(태반), intrauterine infection(자궁내 감염), cervical secretions(분만 시 자궁경부 분비물)</td></tr>
        <tr><td><b>Baby or child</b> (영유아·소아)</td><td>Body secretions: breast milk(모유), saliva(침), tears(눈물), urine(소변)</td></tr>
        <tr><td><b>Adult</b> (성인)</td><td>Sexual transmission(semen), blood transfusion(수혈), organ graft(장기이식)</td></tr>
      </table></div>
      <ul>
        <li>CMV는 혈액·조직·거의 모든 체액(urine, saliva, semen, cervical secretions, breast milk, tears)으로 전파된다.</li>
        <li><b>가장 흔한 선천성 감염</b>의 원인이다. 임신 중 seroconversion(초감염)한 산모의 아기가 선천성 기형의 고위험군이다.</li>
        <li>CMV는 hematopoietic stem cell·monocyte(교과서에 따라 T cell·macrophage)에 잠복한다. 수혈·장기 기증자를 선별 검사하면 전파를 줄일 수 있다.</li>
      </ul>
      <div class="callout">채점 기준은 공개되지 않았어요. 연령대별 구분이 필수인지는 불분명하니 표 형태 그대로 쓰는 것이 가장 안전합니다.</div>
      <p class="src">근거: 18강 CMV 슬라이드 "Sources of Cytomegalovirus Infection", Table 43.5, Box 43.11, Box 43.12</p>`
  },
  {
    id:'exanthem', lec:18, lecName:'Human Herpesvirus', no:'주3', pts:5,
    stem:'흔히 childhood viral exanthem을 보이는 질병들과 그 원인바이러스를 열거하시오.',
    jokbo:'짤족 · 2022 주11, 2019 주4', tip:'질병과 바이러스를 짝지어 5쌍을 쓰는 문제로, 1쌍에 1점씩입니다. 질병명과 바이러스(과) 이름을 함께 써야 인정돼요.',
    rubric:[
      {t:'Chickenpox(varicella, 수두) → herpesvirus (VZV)', w:2, k:[['수두','chickenpox','varicella'],['vzv','herpes','헤르페스','hhv3','hhv-3','대상포진바이러스','zoster']]},
      {t:'Erythema infectiosum(fifth disease, 전염성 홍반) → parvovirus (B19)', w:2, k:[['전염성홍반','erythema','fifth','5번째','제5','다섯번째','5병'],['parvo','파보','b19']]},
      {t:'Measles(rubeola, 홍역) → paramyxovirus', w:2, k:[['홍역','rubeola','measles'],['paramyxo','파라믹소','morbilli']]},
      {t:'Roseola(exanthem subitum, 돌발진) → herpesvirus (HHV-6)', w:2, k:[['roseola','돌발진','exanthemsubitum','sixth','6번째','제6'],['hhv6','hhv-6','herpesvirus6','헤르페스6','헤르페스바이러스6','herpes6']]},
      {t:'Rubella(German measles, 풍진) → togavirus (genus rubivirus)', w:2, k:[['rubella','풍진','germanmeasles'],['toga','토가','rubivirus','루비']]},
    ],
    model:`
      <div class="tbl"><table>
        <tr><th>질병</th><th>원인 바이러스</th></tr>
        <tr><td><b>Chickenpox</b> (varicella, 수두)</td><td>Herpesvirus — <b>VZV</b> (HHV-3)</td></tr>
        <tr><td><b>Erythema infectiosum</b> (fifth disease, 전염성 홍반)</td><td><b>Parvovirus</b> B19</td></tr>
        <tr><td><b>Measles</b> (rubeola, 홍역)</td><td><b>Paramyxovirus</b> (Morbillivirus)</td></tr>
        <tr><td><b>Roseola</b> (exanthem subitum, 돌발진·sixth disease)</td><td>Herpesvirus — <b>HHV-6</b></td></tr>
        <tr><td><b>Rubella</b> (German measles, 풍진)</td><td><b>Togavirus</b> (genus <i>Rubivirus</i>)</td></tr>
      </table></div>
      <h4>함께 알아두면 좋은 감별점 (Table 10-1)</h4>
      <ul>
        <li><b>Measles</b>: fever, cough, conjunctivitis, <b>Koplik spots</b>, 전신 maculopapular rash. 합병증은 세균 중복감염, encephalitis, SSPE.</li>
        <li><b>Rubella</b>: 미열과 faint macular rash, 성인은 관절염. <b>태아 감염(CRS)</b>을 일으킨다.</li>
        <li><b>Parvovirus B19</b>: naked ssDNA. 경미한 발열 뒤 reticular rash(slapped cheek)가 생기고, chronic hemolytic anemia 환자에서 <b>aplastic crisis</b>, 태아에서 hydrops를 일으킨다.</li>
        <li><b>Roseola (HHV-6)</b>: 잠복 4–7일 → 고열(103–105°F) 약 4일 → <b>열이 내린 뒤 발진</b> → 합병증 없이 회복. 6–24개월 열성 경련의 흔한 원인이다.</li>
      </ul>
      <p class="src">근거: 18강 "The most common childhood viral exanthems include" 슬라이드, HHV-6 슬라이드, Fig. 43.18, 20강 Table 10-1 Comparison of Mumps and Major Exanthems</p>`
  },
  {
    id:'paramyxo', lec:20, lecName:'Orthomyxo·Paramyxo', no:'주1', pts:null,
    stem:'파라믹소 바이러스의 특징을 열거하시오.',
    jokbo:'짤족 · 2023 서5 (2023년과 동일 출제)', tip:'Table 40-1과 Box 48.1을 합쳐 구조 → 유전체 → 단백 → 복제 → 병원성 순으로 열거하면 빠지는 항목이 없어요. Orthomyxovirus와 대조해서 쓰면 더 좋습니다.',
    rubric:[
      {t:'Genome: ssRNA', w:1, k:[['ssrna','단일가닥','singlestrand','single-strand','외가닥']]},
      {t:'Negative sense (noninfectious genome)', w:1.5, k:[['negative','음성','(-)','-sense','마이너스','-ssrna','(−)']]},
      {t:'Linear, nonsegmented (→ reassortment 없음)', w:1.5, k:[['nonsegment','non-segment','비분절','분절되지','분절이없','분절없','unsegment']]},
      {t:'크고(≥150 nm) pleomorphic한 enveloped virion', w:1, k:[['envelope','외피'],['150','large','크','다형','pleomorph']]},
      {t:'Helical nucleocapsid (13 또는 18 nm)', w:0.5, k:[['helical','나선']]},
      {t:'Attachment glycoprotein HN·H·G', w:1, k:[['hn','hemagglutinin-neuraminidase','부착','attachment','g단백','gprotein','glycoprotein']]},
      {t:'Fusion(F) protein → 융합·hemolysis', w:1, k:[['fprotein','f단백','f당단백','fusion','융합','fglyco']]},
      {t:'Cytoplasm에서 복제', w:1.5, k:[['cytoplasm','세포질']]},
      {t:'Plasma membrane에서 budding (세포를 죽이지 않고 방출)', w:0.5, k:[['budding','출아']]},
      {t:'Syncytia(다핵 거대세포) 형성', w:1, k:[['syncyt','합포체','거대세포','giantcell','다핵']]},
      {t:'Antigenically stable → 백신 만들기 유리', w:1.5, k:[['antigenicallystable','항원적으로안정','항원안정','변이가적','변이가없','돌연변이가적','돌연변이없','stable','안정']]},
      {t:'Respiratory droplet으로 전파, 호흡기에서 감염 시작', w:1, k:[['호흡기','respiratory','비말','droplet']]},
      {t:'CMI가 증상 상당수를 유발하지만 조절에 필수', w:0.5, k:[['세포매개','cmi','cellmediated','cell-mediated']]},
      {t:'Particles labile yet highly infectious', w:0.5, k:[['labile','불안정','감염력이높','highlyinfectious','전염성이높','전염력이높','감염성이높']]},
    ],
    model:`
      <ol>
        <li><b>Virion</b>: 크다(≥150 nm, 125–250 nm). Spherical·pleomorphic하고 <b>enveloped</b>이며, 내부에 <b>helical nucleocapsid</b>(13 또는 18 nm)가 있다.</li>
        <li><b>Genome</b>: <b>single-stranded RNA, linear, nonsegmented, negative sense</b>, 약 15 kb. Genome 자체는 noninfectious라서 virion에 RNA-dependent RNA polymerase(L + P)를 싣고 온다.</li>
        <li><b>Envelope glycoproteins</b>
          <ul>
            <li>Attachment protein: <b>HN</b>(parainfluenza·mumps, hemagglutinin + neuraminidase 활성), <b>H</b>(measles, HA만 있음), <b>G</b>(RSV, HA·NA 모두 없음)</li>
            <li><b>F(fusion) protein</b>: 세포막 융합, hemolysis, viral entry</li>
          </ul></li>
        <li><b>복제</b>: <b>cytoplasm</b>에서 복제한다. Plasma membrane과의 fusion으로 들어가고, plasma membrane에서 <b>budding</b>으로 나간다(세포를 죽이지 않음).</li>
        <li><b>Syncytia</b>: cell-to-cell fusion으로 multinucleated giant cell을 만든다.</li>
        <li><b>Antigenically stable</b>: 분절이 없어 reassortment가 없고 항원 변이가 적다 → 백신 제작에 유리하다(MMR 생백신).</li>
        <li>Particles are <b>labile yet highly infectious</b>: 건조·산에 쉽게 불활성화되지만 감염력은 높다.</li>
        <li><b>Respiratory droplet</b>으로 전파되어 호흡기에서 감염이 시작된다. Measles·mumps는 viremia로 전신에 퍼진다.</li>
        <li><b>Cell-mediated immunity</b>가 증상의 상당 부분을 일으키지만 감염 조절에 필수다.</li>
      </ol>
      <h4>Orthomyxovirus와 비교 (Table 56-2)</h4>
      <div class="tbl"><table>
        <tr><th></th><th>Orthomyxo</th><th>Paramyxo</th></tr>
        <tr><td>크기 / nucleocapsid</td><td>작다(80–120 nm) / 9 nm</td><td>크다(125–250 nm) / 18 nm</td></tr>
        <tr><td>Nucleocapsid 위치</td><td>Nucleus</td><td>Cytoplasm</td></tr>
        <tr><td>분절 / 잦은 유전 변이</td><td>+ / +</td><td>− / −</td></tr>
        <tr><td>HA·NA 분리</td><td>+ (별개 단백)</td><td>0 (HN 하나)</td></tr>
        <tr><td>Hemolysin / syncytia</td><td>0 / 0</td><td>+ / +</td></tr>
      </table></div>
      <p class="tipline">구성원: Respirovirus(parainfluenza 1·3), Rubulavirus(mumps, parainfluenza 2·4), Morbillivirus(measles), Henipavirus(Hendra·Nipah), Pneumovirus(RSV), Metapneumovirus</p>
      <p class="src">근거: 20강 Table 40-1 Important Properties of Paramyxoviruses, Box 48.1 Unique Features of Paramyxoviridae, Fig. 48.1, Table 40-2, Table 56-2, Table 48.2</p>`
  },
  {
    id:'influenza', lec:20, lecName:'Orthomyxo·Paramyxo', no:'주2', pts:null,
    stem:'인플루엔자바이러스의 특징 및 증식과정을 설명하시오.',
    jokbo:'짤족 · 2023 서7, 2022 서9 (유사족까지 포함하면 단골 문제)', tip:'"특징"과 "증식과정"을 반드시 나눠 쓰세요. 교수님이 강조한 HA vs NA 비교를 덧붙이면 더 좋습니다.',
    rubric:[
      {t:'Enveloped, (−)ssRNA', w:1, k:[['negative','음성','(-)','-sense','마이너스','-ssrna','(−)']]},
      {t:'8개의 분절(segmented) genome', w:1.5, k:[['8개','8segment','8분절','여덟','eight','8개의']]},
      {t:'분절 → reassortment(shift)로 유전적 다양성 ↑', w:1.5, k:[['reassort','재조합','재배열','재편성','shift','대변이']]},
      {t:'점돌연변이 → antigenic drift', w:0.5, k:[['drift','소변이']]},
      {t:'Genome 전사·복제가 nucleus에서 일어남', w:1.5, k:[['nucleus','핵내','핵에서','핵으로','핵안']]},
      {t:'HA = attachment(sialic acid 수용체) + fusion', w:1, k:[['sialic','시알산','시알릭']]},
      {t:'HA가 중화(보호) 항체 유도', w:0.5, k:[['중화','neutraliz','보호항체']]},
      {t:'A형은 zoonosis(조류·돼지 등), B형은 사람만', w:0.5, k:[['zoono','인수공통','조류','bird','avian']]},
      {t:'Endocytosis → endosome에서 HA 매개 fusion', w:1, k:[['endocyt','세포내이입','엔도솜','endosome','fusion','융합']]},
      {t:'M2 ion channel로 uncoating', w:1, k:[['uncoating','탈피','탈외피','m2']]},
      {t:'Cap-snatching: 숙주 capped mRNA를 primer로 mRNA 합성(cap-mRNA-polyA)', w:1, k:[['cap','캡']]},
      {t:'Polymerase PB1·PB2·PA', w:0.5, k:[['pb1','pb2']]},
      {t:'HA·NA: ER → Golgi → 세포막', w:0.5, k:[['golgi','골지']]},
      {t:'세포막에서 assembly 후 budding', w:1, k:[['budding','출아']]},
      {t:'NA가 sialic acid를 잘라 바이러스 방출', w:1, k:[['neuraminidase','뉴라미니다','뉴라미니데','na가','na는','na에의','na의','na를','na:'],['방출','release','절단','cleave','끊','분리']]},
    ],
    model:`
      <h4>특징 (Box 49.1)</h4>
      <ul>
        <li>Orthomyxoviridae, <b>enveloped</b>, <b>(−) sense ssRNA</b>, helical nucleocapsid(RNP = RNA + NP + polymerase PB1·PB2·PA). 크기 80–120 nm.</li>
        <li>Genome은 <b>8개의 분절(segment)</b>로 되어 있다. 각 분절이 단백을 만든다: PB2, PB1, PA, <b>HA</b>, NP, <b>NA</b>, M1/M2, NS1/NS2.</li>
        <li><b>Hemagglutinin(HA)</b>: viral attachment(숙주 <b>sialic acid</b> 수용체에 결합) 및 fusion protein이며, <b>중화(보호) 항체</b>를 유도한다.</li>
        <li><b>Neuraminidase(NA)</b>: sialic acid를 잘라 바이러스 방출을 돕는다. M2는 ion channel로 uncoating을 돕는다(amantadine 표적, A형만).</li>
        <li>대부분의 RNA 바이러스와 달리 <b>genome 전사·복제가 nucleus에서</b> 일어나고, 조립과 budding은 plasma membrane에서 한다.</li>
        <li>Polymerase가 숙주의 capped mRNA를 primer로 쓴다(<b>cap-snatching</b>; PA endonuclease = <b>baloxavir</b> 표적).</li>
        <li>분절 genome이라 두 strain이 동시 감염되면 <b>reassortment</b>가 일어나 유전적 다양성이 커진다 → <b>antigenic shift</b>(대유행). 점돌연변이는 <b>antigenic drift</b>(유행)를 일으킨다.</li>
        <li>A형은 사람·포유류·조류를 감염시키는 <b>zoonosis</b>(야생 물새가 reservoir, 돼지가 mixing vessel)이고, <b>B형은 사람만</b> 감염되며 drift만 한다.</li>
      </ul>
      <h4>증식 과정 (Fig. 49.2)</h4>
      <ol>
        <li><b>Binding</b>: HA가 기도 상피세포 표면의 sialic acid 수용체에 결합한다.</li>
        <li><b>Endocytosis → fusion</b>: endosome이 산성화되면 HA 구조가 바뀌고 fusion peptide가 드러나 바이러스막과 endosome막이 융합한다. <b>M2</b> ion channel로 H⁺가 들어가 <b>uncoating</b>되고 RNP가 방출된다.</li>
        <li>RNP가 <b>핵으로 이동</b>한다(karyopherin).</li>
        <li><b>Transcription</b>: 핵에서 (−)RNA를 주형으로 <b>cap-mRNA-polyA</b>를 합성한다(cap-snatching). mRNA는 세포질로 나가 번역된다.</li>
        <li><b>Replication</b>: 핵에서 (−)vRNA → (+)cRNA → (−)vRNA 8개를 복제한다.</li>
        <li><b>Protein synthesis</b>: HA·NA·M2는 <b>ER → Golgi</b>를 거쳐 세포막에 삽입된다. NP·polymerase는 다시 핵으로 들어가 RNP를 만들고, M1·NS2(NEP)의 도움으로 핵 밖으로 나온다.</li>
        <li><b>Assembly</b>: M1이 깔린 세포막(HA·NA·M2 포함)에서 RNP 8개가 조립된다.</li>
        <li><b>Budding · release</b>: 세포막에서 budding하고, <b>NA가 sialic acid를 잘라</b> 바이러스를 방출시키고 응집을 막는다. 결국 세포는 죽는다.</li>
      </ol>
      <h4>교수님 강조 — HA vs NA</h4>
      <div class="tbl"><table>
        <tr><th>HA (Hemagglutinin)</th><th>NA (Neuraminidase)</th></tr>
        <tr><td>Viral attachment & fusion. 표적세포 표면 sialic acid에 결합해 바이러스를 붙이고 들여보낸다. 중화 항체의 표적.</td><td>Glycoprotein에서 sialic acid group을 cleave하는 효소. 새 바이러스 방출을 돕는다(oseltamivir·zanamivir·peramivir의 표적).</td></tr>
      </table></div>
      <p class="src">근거: 20강 Box 49.1, Table 49.1 Products of Influenza Gene Segments, Fig. 49.2 Replication of influenza A virus, HA fusion·RNP 핵 수송 그림, Box 49.2, baloxavir 설명 슬라이드</p>`
  },
  {
    id:'rsv', lec:20, lecName:'Orthomyxo·Paramyxo', no:'주3', pts:null,
    stem:'호흡기융합바이러스가 연령별로 일으키는 질병들을 열거하시오.',
    jokbo:'짤족 · 2023 기말 주8, 2022 기말 주10', tip:'Table 48.4의 3줄(영아·소아·큰 소아/성인)에 노인·고위험군 폐렴까지 연령대별로 쓰면 됩니다.',
    rubric:[
      {t:'1세 미만 영아: bronchiolitis(세기관지염)', w:2.5, k:[['영아','1세','infant','신생아','<1','1살','12개월','생후'],['세기관지염','bronchiolitis','모세기관지염']]},
      {t:'영아: pneumonia (또는 둘 다)', w:1, k:[['폐렴','pneumonia']]},
      {t:'영아 증상: fever, cough, dyspnea, cyanosis', w:0.5, k:[['청색증','cyanosis','호흡곤란','dyspnea']]},
      {t:'소아: febrile rhinitis and pharyngitis', w:2, k:[['비염','rhinitis'],['인두염','pharyngitis']]},
      {t:'큰 소아·성인: common cold (재감염, 가벼운 증상)', w:2, k:[['감기','commoncold','cold','coldlike']]},
      {t:'노인: pneumonia', w:1.5, k:[['노인','고령','elderly','older','고연령'],['폐렴','pneumonia']]},
      {t:'만성 심장·폐질환, 면역저하자: pneumonia', w:0.5, k:[['면역저하','immunocompromised','심장','심질환','폐질환','heart','lung','만성']]},
      {t:'자연감염으로 재감염이 막히지 않음', w:0.5, k:[['재감염','reinfection']]},
    ],
    model:`
      <div class="tbl"><table>
        <tr><th>연령군</th><th>질병 (Table 48.4)</th></tr>
        <tr><td><b>1세 미만 영아</b></td><td><b>Bronchiolitis, pneumonia, or both</b>. Fever, cough, dyspnea, cyanosis를 보인다.</td></tr>
        <tr><td><b>소아 (children)</b></td><td><b>Febrile rhinitis and pharyngitis</b>. 경증부터 폐렴까지 다양하다.</td></tr>
        <tr><td><b>큰 소아·성인</b></td><td><b>Common cold</b>. 재감염으로 증상이 가볍다.</td></tr>
        <tr><td><b>노인, 만성 심장·폐질환자, 면역저하자</b></td><td><b>Pneumonia</b> (심각한 질환)</td></tr>
      </table></div>
      <ul>
        <li>영아 하기도 감염의 <b>가장 흔한 원인</b>이다. 영아의 50–70%가 생후 1년 안에 감염되고, 4세까지 거의 모두 1회 이상 감염된다. 미숙아는 중증으로 진행한다.</li>
        <li>영아는 기도가 좁아 바이러스에 의한 병리 변화로 쉽게 막힌다. Bronchiolitis는 숙주 면역반응이 매개하는 것으로 본다. 모체 항체로는 영아를 보호하지 못하고, <b>자연 감염도 재감염을 막지 못한다</b>.</li>
        <li>Viremia나 전신 확산 없이 호흡기에 국한되며, syncytia를 형성한다. 잠복기 2–8일(평균 5일), 10월–3월에 주로 유행한다.</li>
        <li>고위험 영아(기관지폐형성이상증, 선천성 심장질환)는 유행기 동안 <b>palivizumab</b> 15 mg/kg를 매달 1회 근육주사한다. 중증 영아에게는 aerosol ribavirin을 쓴다. 감염관리는 손 씻기, 접촉주의, 질병기간 동안 격리다.</li>
      </ul>
      <p class="src">근거: 20강 Table 48.4 Clinical Consequences of RSV Infection, Box 48.9 Disease Mechanisms of RSV, Box 48.10 Epidemiology of RSV, 질병관리본부 RSV 카드뉴스</p>`
  },
  ];
