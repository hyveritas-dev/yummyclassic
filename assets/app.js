// Yummy Classic app (moved out of index.html so the first screen paints before this loads; browsers also cache it)
// Q1 = 2 questions and Q2 = 3 rounds on PC and phones alike
    // A phone counts as a phone even when held sideways (Android reports the wide side as screen.width)
    // or when the browser asks for the desktop site: the screen's short side decides, not the window width.
    const MOBILE = (() => {
      const sw = screen.width || innerWidth, sh = screen.height || innerHeight;
      const shortSide = Math.min(sw, sh, innerWidth);
      const touchPhone = /Android|iPhone|iPod|Mobile/i.test(navigator.userAgent) && Math.min(sw, sh) < 700;
      return shortSide < 700 || touchPhone;
    })();
    // ---------- 1) Translations (English is the default) ----------
    const I18N = {
      en: {
        title: 'Visual Overture — Meet classical music through your eyes first',
        metaDesc: 'No headphones, no search terms. Pick the painting you like more, and a whole era of classical music opens up.',
        navStart: 'Start', navCta: 'Choose a painting',
        eyebrow: 'Neuroaesthetics × Classical Music',
        h1: 'Which one<br /> holds your gaze?',
        sub: "There's no right answer. Trust the one you looked at first.<br />No headphones, no search terms. The paintings read your taste first.",
        aLabel: 'A: The Apotheosis of Homer, Ingres',
        aAlt: 'Ingres, The Apotheosis of Homer (1827)',
        aCap: 'The Apotheosis of Homer',
        aMeta: 'J.-A.-D. Ingres · 1827',
        bLabel: 'B: Liberty Leading the People, Delacroix',
        bAlt: 'Eugène Delacroix, Liberty Leading the People (1830)',
        bCap: 'Liberty Leading the People',
        bMeta: 'Eugène Delacroix · 1830',
        cta: 'This one speaks to me',
        hint: "Don't overthink it. First impressions are the most honest.",
        stepLabel: 'Step {n} of {t}', timeNote: 'About 15 seconds',
        reset: 'Choose again',
        resEyebrow: 'Your result',
        plTitle: 'Recommended pieces',
        plSub: 'A mix of composers, with the movement to start from.',
        plListen: 'Listen', plPlay: 'Listen', plClose: 'Close', plFind: 'Listen', perfBy: 'Recording:', plFail: 'Can’t play here — open on YouTube', plOpenYT: 'Watch on YouTube ↗', plLocal: 'Opened as a local file, so YouTube blocks the in-page player. It opened in a new tab instead.',
        moodLead: 'The mood you chose: ', viaTpl: 'for “{t}”',
        cmpTitle: 'Recommended composers',
        cmpSub: 'Tap a name to see ten of their best-loved pieces. ● marks composers in your list.',
        cdEyebrow: 'Ten pieces by',
        r2Eyebrow: 'Round two',
        r2Title: 'Three sets of eight. Keep the ones you love.',
        r2Sub: 'Look through all 24 paintings in the three sets, then pick at least 4 you like.',
        r2Count0: 'Pick two', r2Count1: 'One more to go', r2Count2: 'Your recommended pieces are below ↓',
        r2SeeAll: 'Nice picks! See the other sets too ({n}/{t} seen) — then your pieces open',
        r2Back: 'Back', r2Go: 'Take me to my pieces ↓', r2Swap: 'See other paintings',
        pairSwap: '↻ Show different paintings', plZoom: '⤢ Enlarge', plShrink: '⤡ Shrink', plStop: '■ Close',
        typeLead: 'Your taste type', readTitle: 'The paintings you chose',
        kGi: 'Your taste', kSeung: 'Why', kJeon: 'Your paintings', kGyeol: 'Your music',
        jeonTpl: 'Your picks, {t}, share one thread: {m}.',
        gyeol: { classic: 'So we picked 10 Baroque & Classical pieces with the same feel. They are right below ↓', romantic: 'So we picked 10 Romantic pieces with the same feel. They are right below ↓' },
        eraTag: { classic: 'Baroque & Classical · 1600–1820', romantic: 'Romantic Era · 1820–1900' },
        belowCue: 'Your recommended pieces are right below', artTpl: 'Artworks: {a}, {b} · Public Domain',
        footerArt: 'Artworks: J.-A.-D. Ingres (1827), E. Delacroix (1830) · Public Domain',
        footerContact: 'Partnership inquiries',
        res: {
          classic: {
            years: 'Baroque & Classical · 1600 – 1820',
            title: 'We recommend Baroque & Classical music',
            desc: 'Clear forms, bright counterpoint and balanced structure take center stage. Follow music built as deliberately as a Vermeer interior or an Ingres canvas.',
          },
          romantic: {
            years: 'Romantic Era · 1820 – 1900',
            title: 'We recommend Romantic music',
            desc: "Free form, intense emotion and sweeping narrative take center stage. Let the music carry you like the crowd surging behind Delacroix's banner.",
          },
        },
      },
      ko: {
        title: 'Visual Overture — 눈으로 먼저 만나는 클래식',
        metaDesc: '이어폰도, 검색어도 필요 없어요. 마음에 더 드는 그림 하나만 고르면 클래식의 시대가 열립니다.',
        navStart: '시작하기', navCta: '그림 고르기',
        eyebrow: '신경미학 × 클래식 음악',
        h1: '어느 그림에<br /> 눈길이 머무나요?',
        sub: '정답은 없어요. 처음 눈길이 닿은 쪽을 믿어 보세요.<br />이어폰도, 검색어도 필요 없이 그림이 취향을 먼저 알아봅니다.',
        aLabel: 'A: 호메로스 예찬, 앵그르',
        aAlt: '앵그르, 호메로스 예찬 (1827)',
        aCap: '호메로스 예찬',
        aMeta: '장 오귀스트 도미니크 앵그르 · 1827',
        bLabel: 'B: 민중을 이끄는 자유, 들라크루아',
        bAlt: '외젠 들라크루아, 민중을 이끄는 자유 (1830)',
        bCap: '민중을 이끄는 자유',
        bMeta: '외젠 들라크루아 · 1830',
        cta: '이 그림이 더 좋아요',
        hint: '오래 고민하지 마세요. 첫인상이 가장 솔직합니다.',
        stepLabel: '{t}단계 중 {n}단계', timeNote: '약 15초',
        reset: '다시 고르기',
        resEyebrow: '당신의 결과',
        plTitle: '추천곡',
        plSub: '작곡가를 섞어 골랐고, 어느 악장부터 들으면 좋은지 함께 적었어요.',
        plListen: '듣기', plPlay: '듣기', plClose: '닫기', plFind: '듣기', perfBy: '연주:', plFail: '여기서는 재생할 수 없어요 — 유튜브에서 열기', plOpenYT: '유튜브에서 보기 ↗', plLocal: '파일을 내 컴퓨터에서 바로 열면 유튜브가 페이지 안 재생을 막아요. 대신 새 탭에서 열었어요.',
        moodLead: '고르신 그림의 결: ', viaTpl: '“{t}”에 어울려요',
        cmpTitle: '추천 작곡가',
        cmpSub: '이름을 누르면 그 작곡가의 대표곡 열 곡을 보여 드려요. ●는 추천곡에 포함된 작곡가예요.',
        cdEyebrow: '추천곡 10선',
        r2Eyebrow: '두 번째 선택',
        r2Title: '여덟 점씩 세 묶음. 마음에 드는 그림을 남겨 보세요.',
        r2Sub: '총 24점의 그림을 세 묶음에 걸쳐 모두 둘러본 뒤, 마음에 드는 그림을 최소 4점 이상 골라 주세요.',
        r2Count0: '두 점을 골라 주세요', r2Count1: '한 점만 더', r2Count2: '추천곡은 아래에 있습니다 ↓',
        r2SeeAll: '좋아요! 다른 그림도 모두 봐 주세요 ({n}/{t} 묶음 확인) — 그다음 추천곡이 열려요',
        r2Back: '뒤로', r2Go: '추천곡 보러 가기 ↓', r2Swap: '다른 그림 보기',
        pairSwap: '↻ 다른 그림들로 보기', plZoom: '⤢ 크게 보기', plShrink: '⤡ 작게 보기', plStop: '■ 닫기',
        typeLead: '당신의 취향 유형은', readTitle: '고르신 그림 이야기',
        kGi: '당신의 취향', kSeung: '왜 그럴까', kJeon: '고른 그림', kGyeol: '추천 음악',
        jeonTpl: '고르신 {t}에는 ‘{m}’의 결이 흐르고 있어요.',
        gyeol: { classic: '그래서 이 결을 닮은 바로크·고전파 음악 10곡을 바로 아래에 골라 두었어요 ↓', romantic: '그래서 이 결을 닮은 낭만파 음악 10곡을 바로 아래에 골라 두었어요 ↓' },
        eraTag: { classic: '바로크·고전주의 · 1600–1820', romantic: '낭만주의 · 1820–1900' },
        belowCue: '당신을 위한 추천곡이 바로 아래에 있어요', artTpl: '작품: {a}, {b} · 퍼블릭 도메인',
        footerArt: '작품: 앵그르(1827), 들라크루아(1830) · 퍼블릭 도메인',
        footerContact: '제휴·협업 문의 · Partnership',
        res: {
          classic: {
            years: 'Baroque & Classical · 바로크와 고전주의 · 1600 – 1820',
            title: '바로크·고전파 음악을 추천드려요',
            desc: '명료한 형식과 또렷한 대위법, 균형 잡힌 구조가 중심입니다. 베르메르의 실내처럼, 앵그르의 화면처럼 단정하게 쌓아 올린 소리를 따라가 보세요.',
          },
          romantic: {
            years: 'Romantic Era · 낭만주의 · 1820 – 1900',
            title: '낭만파 음악을 추천드려요',
            desc: '자유로운 형식과 격렬한 감정, 장대한 서사가 중심입니다. 들라크루아의 깃발 뒤로 물결치는 군중처럼 음악에 몸을 맡겨 보세요.',
          },
        },
      },
    };

    // Yummy Classic copy (brand voice: a friend who spots your taste; food words only at key moments)
    Object.assign(I18N.en, {
      title: 'Yummy Classic — Taste your music',
      metaDesc: 'Find your classical taste through art. Pick a painting and the music comes to you.',
      navCta: 'Find my taste →', navHow: 'How it works', navMap: 'Taste map', navToday: "Today's taste",
      eyebrow: 'Taste test · Art × Classical',
      h1: 'What kind of classical<br /> do you like?',
      sub: "Pick a painting before you hear a note.<br />There are no good or bad paintings. The one you're drawn to is your music taste.",
      q1: '<b>Q1</b>Which painting draws you in?',
      cta: 'This one draws me in',
      hint: "Don't overthink it. First impressions are the most honest.",
      stepLabel: 'Step {n} of {t}', timeNote: 'About 20 seconds',
      r2Eyebrow: 'Taste test · Q2',
      r2Title: '<b>Q2</b>Which ones would you look at longer?',
      r2Sub: 'Browse all 24 paintings across the three walls, then pick at least 4 that draw you in.',
      r2Count2: 'Your menu is ready ↓', r2Go: 'See my Classical Menu ↓', r2Swap: 'Next wall',
      resEyebrow: 'Your music taste is', typeLead: 'More precisely, you are',
      readEyebrow: 'Behind your picks', readTitle: 'Why these paintings?',
      kGi: 'Your taste', kSeung: 'Why', kJeon: 'Your picks', kGyeol: 'Your Menu',
      gyeol: { classic: 'So we set a 10-course classical menu with the same flavour. It is right below ↓', romantic: 'So we set a 10-course classical menu with the same flavour. It is right below ↓' },
      plTitle: 'Your Classical Menu', plSub: 'Ten pieces, grouped by the feeling your paintings share. Tap ▶ to listen right here.', flowKicker: 'YOUR EMOTIONAL LINE', flowSub: 'Listen while you look for that feeling in yourself.',
      courseFirst: 'First bite', courseDessert: 'Dessert',
      belowCue: 'Your Classical Menu is right below',
      cmpTitle: 'Composers you might like', cmpSub: 'Tap a name for ten of their best-loved pieces. ● marks composers already on your menu.',
      reset: 'Taste again with other paintings',
      howTitle: 'Not search.<br />Discovery.',
      how1t: 'Look at a painting', how1d: 'Two famous paintings, side by side. No headphones, no music theory.',
      how2t: 'Pick what draws you', how2d: 'Trust your first look, then keep a few more you love. About 20 seconds.',
      how3t: 'Discover your music', how3d: 'We read your taste from the paintings and serve ten pieces you can play right on the page.',
      mapTitle: 'Every era has<br />its own flavour', mapSub: 'Each style gets one colour and one painting. Your result card wears the colour of your era.',
      mapOn: 'In the test', mapSoon: 'Coming soon',
      todayTitle: "Today's taste", todayLead: 'If this painting draws you in, you might like this music too.',
      finalTitle: 'What does your<br />classical taste like?', finalCta: 'Discover my taste',
      cmpTitle: 'Composers you might like', cmpSub: 'Tap a composer. We will pull out more pieces that suit the paintings you chose.',
      cmpHint: 'Tap me', cmpOnMenu: '{n} on your menu · see more', cmpMore: 'See matching pieces',
      cdEyebrow: 'From the composer', cdLeadTied: 'We put the {n} pieces that suit {t} first.', cdLeadOther: 'Pieces by {n}, each matched to the kind of painting it suits.',
      cdSubLinked: 'Your tastes', cdSubMore: 'Signature works',
      viaMood: 'Suits ‘{m}’ paintings like “{t}”',
    });
    Object.assign(I18N.ko, {
      title: '냠냠클래식 — 음악을 듣기 전에, 취향을 맛보세요',
      metaDesc: '그림을 고르면 당신에게 어울리는 클래식이 찾아옵니다.',
      navCta: '내 취향 알아보기 →', navHow: '이용 방법', navMap: '취향 지도', navToday: '오늘의 취향',
      eyebrow: 'Taste test · 취향 테스트',
      h1: '당신은 어떤 클래식을<br /> 좋아하나요?',
      sub: '음악을 듣기 전에 그림을 골라보세요.<br />좋고 나쁜 그림은 없어요. 당신이 끌리는 그림이 당신의 음악 취향이에요.',
      q1: '<b>Q1</b>둘 중 어떤 그림에 더 끌리나요?',
      cta: '이 그림이 더 끌려요',
      hint: '오래 고민하지 마세요. 첫인상이 가장 솔직해요.',
      stepLabel: '{t}단계 중 {n}단계', timeNote: '약 20초',
      r2Eyebrow: 'Taste test · Q2',
      r2Title: '<b>Q2</b>이 중에 더 오래 보고 싶은 그림은?',
      r2Sub: '총 24점의 그림을 벽 세 곳에 걸쳐 모두 둘러본 뒤, 끌리는 그림을 최소 4점 이상 골라 주세요.',
      r2Count2: '메뉴가 준비됐어요 ↓', r2Go: '내 클래식 메뉴 보기 ↓', r2Swap: '다음 벽 보기',
      r2SeeAll: '좋아요! 다른 벽도 모두 둘러봐 주세요 ({n}/{t}) — 그다음 메뉴가 열려요',
      resEyebrow: '당신의 음악 취향은', typeLead: '그중에서도 당신은',
      readEyebrow: 'Behind your picks', readTitle: '이 그림들에 끌린 이유',
      kGi: '당신의 취향', kSeung: '왜 그럴까', kJeon: '고른 그림', kGyeol: '클래식 메뉴',
      gyeol: { classic: '그래서 이 결을 닮은 곡으로 첫 한입부터 디저트까지, 10곡짜리 클래식 메뉴를 차려 두었어요. 바로 아래에 있어요 ↓', romantic: '그래서 이 결을 닮은 곡으로 첫 한입부터 디저트까지, 10곡짜리 클래식 메뉴를 차려 두었어요. 바로 아래에 있어요 ↓' },
      plTitle: '오늘의 클래식 메뉴', plSub: '고르신 그림과 겹치는 키워드로 열 곡을 감정선별로 묶었어요. ▶를 누르면 이 페이지에서 바로 들을 수 있어요.', flowKicker: 'YOUR EMOTIONAL LINE', flowSub: '곡을 들으면서, 그림으로 알게 된 내 마음의 결을 찾아보세요.',
      courseFirst: 'First bite · 첫 한입', courseDessert: 'Dessert · 디저트',
      belowCue: '당신의 클래식 메뉴가 바로 아래에 있어요',
      cmpTitle: '이 작곡가들도 입맛에 맞을지 몰라요', cmpSub: '이름을 누르면 대표곡 열 곡을 보여 드려요. ●는 메뉴에 이미 들어간 작곡가예요.',
      reset: '다른 그림으로 다시 맛보기',
      howTitle: '검색하지 마세요.<br />발견하세요.',
      how1t: '그림을 보고', how1d: '유명한 그림 두 점이 나란히 놓여 있어요. 이어폰도, 음악 지식도 필요 없어요.',
      how2t: '취향을 고르면', how2d: '첫눈에 끌린 그림을 고르고, 마음에 드는 그림을 몇 점 더 남겨요. 20초면 충분해요.',
      how3t: '음악을 발견합니다', how3d: '그림에서 읽어 낸 취향으로 열 곡을 골라, 페이지 안에서 바로 들려 드려요.',
      mapTitle: '사조마다<br />맛이 달라요', mapSub: '사조마다 색 하나, 그림 하나. 결과 카드는 당신이 고른 사조의 색을 입어요.',
      mapOn: '테스트에 포함', mapSoon: '곧 열려요',
      todayTitle: '오늘의 취향', todayLead: '이 그림에 끌렸다면, 이 음악도 마음에 들지도 몰라요.',
      finalTitle: '당신의 클래식은<br />어떤 맛인가요?', finalCta: '취향 발견하기',
      cmpTitle: '이 작곡가들도 입맛에 맞을지 몰라요', cmpSub: '작곡가를 눌러 보세요. 고르신 그림과 어울리는 곡을 더 꺼내 드려요.',
      cmpHint: '눌러 보세요', cmpOnMenu: '메뉴에 {n}곡 · 더 보기', cmpMore: '어울리는 곡 보기',
      cdEyebrow: '작곡가의 메뉴', cdLeadTied: '고르신 {t}에 어울리는 {n}의 곡부터 담았어요.', cdLeadOther: '{n}의 곡을, 어울리는 그림의 결과 함께 담았어요.',
      cdSubLinked: 'Your tastes · 당신의 취향', cdSubMore: 'Signature works · 대표곡',
      viaMood: '〈{t}〉 같은 ‘{m}’의 그림과 어울려요',
    });


    // ---------- Japanese site: data + swap into the "local language" slots ----------
    Object.assign(I18N.en, {"more": " and {n} more", "restart": "Start over from the beginning", "srcLabel": "source ↗", "shareEyebrow": "Share your taste", "shareTitle": "Send it to a friend", "shareSub": "Your result travels as a link. Whoever opens it sees the same taste card and menu.", "shareCopy": "Copy link", "shareCopied": "Link copied", "shareNative": "Share", "shareImage": "Save image · for Instagram", "shareInsta": "For Instagram, post the saved image to your story or feed.", "shareText": "Today my classical is {era} — “{type}”. Pick a few paintings and Yummy Classic finds yours. Do give it a try.", "kakaoFallback": "Link copied. Paste it into a KakaoTalk chat to send.", "sharedBanner": "A friend sent you their taste card.", "sharedCta": "Try it myself →", "imgKicker": "MY MUSIC TASTE", "imgFirst": "FIRST BITE", "imgMade": "Making your image…"});
    Object.assign(I18N.ko, {"more": " 외 {n}점", "restart": "처음부터 다시 하기", "srcLabel": "근거 ↗", "shareEyebrow": "Share your taste", "shareTitle": "친구에게 전달하기", "shareSub": "결과를 링크로 보낼 수 있어요. 링크를 연 친구에게도 같은 취향 카드와 메뉴가 보여요.", "shareCopy": "링크 복사", "shareCopied": "링크를 복사했어요", "shareNative": "공유하기", "shareImage": "이미지 저장 · 인스타그램용", "shareInsta": "인스타그램에는 저장한 이미지를 스토리나 피드에 올려 주세요.", "shareText": "오늘 나의 클래식은 {era} — ‘{type}’. 그림 몇 장으로 오늘의 클래식을 골라 주는 냠냠클래식, 함께 해 보세요.", "kakaoFallback": "링크를 복사했어요. 카카오톡 대화방에 붙여 넣어 보내 주세요.", "sharedBanner": "친구가 보낸 취향 카드예요.", "sharedCta": "나도 해보기 →", "imgKicker": "MY MUSIC TASTE", "imgFirst": "FIRST BITE", "imgMade": "이미지를 만들고 있어요…"});
    I18N.ja = {"title": "ヤミークラシック — 音楽を聴く前に、好みを味わおう", "metaDesc": "絵を選ぶと、あなたに似合うクラシックがやってきます。", "navStart": "はじめる", "navCta": "私の好みを知る →", "navHow": "使い方", "navMap": "好みの地図", "navToday": "今日の好み", "eyebrow": "Taste test · 好みテスト", "h1": "あなたはどんな<br />クラシックが好き?", "sub": "音楽を聴く前に、絵を選んでみてください。<br />良い絵も悪い絵もありません。惹かれる絵が、あなたの音楽の好みです。", "q1": "<b>Q1</b>どちらの絵に惹かれますか?", "aLabel": "A: ホメロス礼賛、アングル", "aAlt": "アングル、ホメロス礼賛(1827)", "aCap": "ホメロス礼賛", "aMeta": "アングル · 1827", "bLabel": "B: 民衆を導く自由の女神、ドラクロワ", "bAlt": "ドラクロワ、民衆を導く自由の女神(1830)", "bCap": "民衆を導く自由の女神", "bMeta": "ウジェーヌ・ドラクロワ · 1830", "cta": "こちらに惹かれる", "hint": "考えすぎないで。第一印象がいちばん正直です。", "stepLabel": "ステップ {n} / {t}", "timeNote": "約20秒", "reset": "別の絵でもう一度味わう", "resEyebrow": "あなたの音楽の好みは", "plTitle": "今日のクラシック・メニュー", "plSub": "選んだ絵と重なるキーワードで、10曲を感情の流れごとにまとめました。▶を押すとこのページですぐ聴けます。", "flowKicker": "YOUR EMOTIONAL LINE", "flowSub": "曲を聴きながら、絵で知ったあなたの心の質感を探してみてください。", "plListen": "聴く", "plPlay": "聴く", "plClose": "閉じる", "plFind": "聴く", "perfBy": "演奏:", "plFail": "ここでは再生できません — YouTubeで開く", "plOpenYT": "YouTubeで見る ↗", "plLocal": "パソコンのファイルを直接開くと、YouTubeはページ内再生をブロックします。代わりに新しいタブで開きました。", "moodLead": "選んだ絵の味わい: ", "viaTpl": "「{t}」に合う", "cmpTitle": "この作曲家たちも口に合うかも", "cmpSub": "作曲家を押してみてください。選んだ絵に合う曲をもっと取り出します。", "cdEyebrow": "作曲家のメニュー", "r2Eyebrow": "Taste test · Q2", "r2Title": "<b>Q2</b>この中で、もっと長く見ていたい絵は?", "r2Sub": "3つの壁に並ぶ24点の絵をすべて見てから、惹かれる絵を4点以上選んでください。", "r2Count0": "2点選んでください", "r2Count1": "あと1点", "r2Count2": "メニューができました ↓", "r2SeeAll": "いいですね! ほかの壁も見てください({n}/{t})— そのあとメニューが開きます", "r2Back": "戻る", "r2Go": "私のクラシック・メニューを見る ↓", "r2Swap": "次の壁へ", "pairSwap": "↻ 別の絵で見る", "plZoom": "⤢ 大きく見る", "plShrink": "⤡ 小さく見る", "plStop": "■ 閉じる", "typeLead": "なかでもあなたは", "readEyebrow": "Behind your picks", "readTitle": "この絵に惹かれた理由", "kGi": "あなたの好み", "kSeung": "なぜ?", "kJeon": "選んだ絵", "kGyeol": "メニュー", "jeonTpl": "選んだ{t}には、「{m}」の味わいが流れています。", "gyeol": {"classic": "だから、この味わいに似た曲で、ファーストバイトからデザートまで10曲のメニューを用意しました。すぐ下にあります ↓", "romantic": "だから、この味わいに似た曲で、ファーストバイトからデザートまで10曲のメニューを用意しました。すぐ下にあります ↓"}, "eraTag": {"classic": "バロック・古典派 · 1600–1820", "romantic": "ロマン派 · 1820–1900"}, "belowCue": "あなたのクラシック・メニューはすぐ下です", "artTpl": "作品: {a}、{b} · パブリックドメイン", "footerArt": "作品: アングル(1827)、ドラクロワ(1830)· パブリックドメイン", "footerContact": "提携・コラボのお問い合わせ", "res": {"classic": {"years": "", "title": "", "desc": ""}, "romantic": {"years": "", "title": "", "desc": ""}}, "courseFirst": "First bite · ファーストバイト", "courseDessert": "Dessert · デザート", "howTitle": "検索しないで。<br />発見しよう。", "how1t": "絵を見て", "how1d": "有名な絵が2点並んでいます。イヤホンも音楽の知識もいりません。", "how2t": "好みを選ぶと", "how2d": "ひと目で惹かれた絵を選び、気に入った絵をもう少し残します。20秒で十分。", "how3t": "音楽が見つかります", "how3d": "絵から読みとった好みで10曲を選び、ページの中ですぐに聴かせます。", "mapTitle": "流派ごとに<br />味が違います", "mapSub": "流派ごとに色ひとつ、絵ひとつ。結果カードは、あなたの流派の色をまといます。", "mapOn": "テストに含む", "mapSoon": "近日公開", "todayTitle": "今日の好み", "todayLead": "この絵に惹かれたなら、この音楽も気に入るかもしれません。", "finalTitle": "あなたのクラシックは<br />どんな味?", "finalCta": "好みを見つける", "cmpHint": "押してみて", "cmpOnMenu": "メニューに{n}曲 · もっと見る", "cmpMore": "合う曲を見る", "cdLeadTied": "選んだ{t}に合う{n}の曲から入れました。", "cdLeadOther": "{n}の曲を、合う絵の味わいとともに入れました。", "cdSubLinked": "Your tastes · あなたの好み", "cdSubMore": "Signature works · 代表曲", "viaMood": "「{t}」のような「{m}」の絵に合う", "more": " ほか{n}点", "restart": "最初からやり直す", "srcLabel": "出典 ↗", "shareEyebrow": "Share your taste", "shareTitle": "友だちに送る", "shareSub": "この結果をリンクで送れます。開いた人には同じ好みカードとメニューが表示されます。", "shareCopy": "リンクをコピー", "shareCopied": "リンクをコピーしました", "shareNative": "共有する", "shareImage": "画像を保存 · Instagram用", "shareInsta": "Instagramには、保存した画像をストーリーやフィードに載せてください。", "shareText": "今日の私のクラシックは {era} —「{type}」。数枚の絵で今日のクラシックを選ぶヤミークラシック、ぜひ一緒にどうぞ。", "kakaoFallback": "リンクをコピーしました。カカオトークのトークに貼り付けて送ってください。", "sharedBanner": "友だちから届いた好みカードです。", "sharedCta": "私もやってみる →", "imgKicker": "MY MUSIC TASTE", "imgFirst": "FIRST BITE", "imgMade": "画像を作っています…"};
    Object.assign(I18N.en, {"logoSub": "", "cmpTopKicker": "Top pick for you", "cmpTopTpl": "Your top composer is {n}", "cmpTopWhy": "Shares {c} keywords with the paintings you chose: {t}", "cmpTopGo": "See this composer’s picks →", "cmpTopBadge": "★ Top pick", "cmpShared": "{c} shared keywords", "cmpOpera": "Opera composers ({n})", "r2First": "Back to page 1", "h1": "We find your taste<br /> in classical music.", "sub": "Pick the painting that draws you in.", "pairSwap": "Not sure… I’ll choose from other paintings", "r2Sub": "Browse all 24 paintings across the three pages, then pick at least 4 that draw you in. Hover over a painting to see it large (on a phone, press and hold).", "r2Swap": "Next page", "r2SeeAll": "Nice picks! See the other pages too ({n}/{t}) — then your menu opens", "r2Go": "See my Classical Menu (my taste) ↓", "igShareNow": "Share the 3 images →", "igTapAgain": "Images are ready — tap the button once more to share.", "igSaveHint": "Tap an image to save it one by one (on a phone, press and hold).", "imgFail": "Couldn’t make the images. Please try again.", "r2Eyebrow": "", "cdSubLinked": "Your tastes", "cdBadge": "Yummy Classic pick", "cmpTitle": "Get picks for your taste, composer by composer", "cmpSub": "", "shareImage": "Save 3 images · for Instagram", "shareInsta": "Post the 3 images together as one Instagram carousel or story set.", "ig1Kicker": "MY CLASSICAL TASTE TEST", "ig1Title": "These paintings drew me in", "ig1Tease": "So what does my taste in music look like? →", "ig2Kicker": "MY MUSIC TASTE IS", "ig2Picks": "Picked", "ig3Kicker": "MY CLASSICAL MENU", "ig3Cta": "What does your classical taste like?", "ig3Sub": "Two paintings, about 20 seconds."});
    Object.assign(I18N.ko, {"logoSub": "냠냠클래식", "cmpTopKicker": "Top pick for you", "cmpTopTpl": "가장 추천하는 작곡가는 {n}", "cmpTopWhy": "고르신 그림과 키워드 {c}개가 겹쳐요: {t}", "cmpTopGo": "이 작곡가의 추천곡 보기 →", "cmpTopBadge": "★ 가장 추천", "cmpShared": "겹치는 키워드 {c}개", "cmpOpera": "오페라 작곡가 추천 ({n}명)", "r2First": "첫 페이지로 돌아가기", "h1": "당신의 클래식 음악 취향을<br /> 찾아드립니다.", "sub": "끌리는 그림을 선택해 보세요", "pairSwap": "잘 모르겠어요… 다른 그림으로 골라 볼게요", "r2Sub": "총 24점의 그림을 세 페이지에 걸쳐 모두 둘러본 뒤, 끌리는 그림을 최소 4점 이상 골라 주세요. 그림에 마우스를 올리면 크게 보여요 (휴대폰은 길게 누르기).", "r2Swap": "다음 페이지 보기", "r2SeeAll": "좋아요! 다른 페이지도 모두 둘러봐 주세요 ({n}/{t}) — 그다음 메뉴가 열려요", "r2Go": "내 클래식 메뉴(취향) 보기 ↓", "igShareNow": "이미지 3장 공유하기 →", "igTapAgain": "이미지가 준비됐어요. 아래 버튼을 한 번 더 눌러 공유해 주세요.", "igSaveHint": "이미지를 누르면 한 장씩 저장돼요 (휴대폰은 길게 눌러 저장)", "imgFail": "이미지를 만들지 못했어요. 다시 눌러 주세요.", "r2Eyebrow": "", "cdSubLinked": "Your tastes · 당신의 취향", "cdBadge": "Yummy Classic 추천", "cmpTitle": "작곡가별로 내 취향에 맞는 곡도 추천받아 보세요", "cmpSub": "", "shareImage": "이미지 3장 저장 · 인스타그램용", "shareInsta": "이미지 3장을 인스타그램 캐러셀(여러 장 게시물)이나 스토리로 함께 올려 주세요.", "ig1Kicker": "MY CLASSICAL TASTE TEST", "ig1Title": "나는 이 그림들에 끌렸어요", "ig1Tease": "이 그림들로 본 내 음악 취향은? →", "ig2Kicker": "나의 음악 취향은", "ig2Picks": "고른 그림", "ig3Kicker": "MY CLASSICAL MENU", "ig3Cta": "당신의 클래식은 어떤 맛인가요?", "ig3Sub": "그림 두 장, 20초면 알 수 있어요"});
    Object.assign(I18N.ja, {"logoSub": "ヤミークラシック", "cmpTopKicker": "Top pick for you", "cmpTopTpl": "いちばんのおすすめ作曲家は{n}です", "cmpTopWhy": "選んだ絵とキーワードが{c}個重なります: {t}", "cmpTopGo": "この作曲家のおすすめ曲を見る →", "cmpTopBadge": "★ いちばんのおすすめ", "cmpShared": "重なるキーワード {c}個", "cmpOpera": "オペラ作曲家のおすすめ({n}人)", "r2First": "最初のページに戻る", "h1": "あなたのクラシック音楽の<br />好みを見つけます。", "sub": "惹かれる絵を選んでみてください", "pairSwap": "よくわからない… 別の絵で選んでみます", "r2Sub": "3ページ合わせて24点の絵をすべて見てから、惹かれる絵を4点以上選んでください。絵にマウスを重ねると大きく見られます(スマホは長押し)。", "r2Swap": "次のページへ", "r2SeeAll": "いいですね! ほかのページも見てください({n}/{t})— そのあとメニューが開きます", "r2Go": "私のクラシック・メニュー(好み)を見る ↓", "igShareNow": "画像3枚を共有する →", "igTapAgain": "画像の準備ができました。下のボタンをもう一度押して共有してください。", "igSaveHint": "画像を押すと1枚ずつ保存できます(スマホは長押しで保存)", "imgFail": "画像を作れませんでした。もう一度押してください。", "r2Eyebrow": "", "cdSubLinked": "Your tastes · あなたの好み", "cdBadge": "Yummy Classic おすすめ", "cmpTitle": "作曲家ごとに、あなたの好みに合う曲もおすすめします", "cmpSub": "", "shareImage": "画像3枚を保存 · Instagram用", "shareInsta": "3枚の画像をInstagramのカルーセル投稿やストーリーズにまとめて載せてください。", "ig1Kicker": "MY CLASSICAL TASTE TEST", "ig1Title": "私はこの絵に惹かれました", "ig1Tease": "この絵から見えた私の音楽の好みは? →", "ig2Kicker": "私の音楽の好みは", "ig2Picks": "選んだ絵", "ig3Kicker": "MY CLASSICAL MENU", "ig3Cta": "あなたのクラシックはどんな味?", "ig3Sub": "絵を2枚、約20秒でわかります"});
    // Type chemistry (best / opposite type) and the composer taste map
    Object.assign(I18N.en, { chemBest: 'In harmony with you', chemFar: 'Needs a little tuning with you',
      mapMe: 'Your taste', mapFit: 'Taste match', mapGrow: 'Taste stretch', mapFitD: 'Fits the paintings you chose. Closer to the centre = stronger match.', mapGrowD: 'From the other style — a step further to explore.', mapNote: 'Tap a name to hear their pieces.' });
    Object.assign(I18N.ko, { chemBest: '나와 화음이 맞는 유형', chemFar: '나와 조율이 필요한 유형',
      mapMe: '나의 취향', mapFit: '취향 맞춤', mapGrow: '취향 확장', mapFitD: '내 그림과 잘 맞는 작곡가. 가운데에 가까울수록 더 잘 맞아요.', mapGrowD: '다른 시대에서 한 걸음 넓혀 들어 볼 작곡가.', mapNote: '이름을 누르면 대표곡이 나와요.' });
    Object.assign(I18N.ja, { chemBest: '和音が合うタイプ', chemFar: '調律が必要なタイプ',
      mapMe: 'あなたの好み', mapFit: '好みにぴったり', mapGrow: '好みを広げる', mapFitD: '選んだ絵によく合う作曲家。中心に近いほどぴったり。', mapGrowD: 'もう一方の時代から、一歩広げて聴く作曲家。', mapNote: '名前を押すと代表曲が出ます。' });
    Object.assign(I18N.en, {"r2Need": "Pick {n} more (at least 4 of 24)"});
    Object.assign(I18N.ko, {"r2Need": "{n}점 더 골라 주세요 (24점 중 최소 4점)"});
    Object.assign(I18N.ja, {"r2Need": "あと{n}点選んでください(24点中4点以上)"});

    // ---- "Today's classical" concept copy (overrides the dictionaries above) ----
    Object.assign(I18N.en, {
      title: 'Yummy Classic — Today’s classical, picked by a painting',
      metaDesc: 'Pick the painting that draws you today, and today’s classical music finds you.',
      navCta: 'Find today’s classical →', navMap: 'Era map', navToday: 'Painting of the day',
      eyebrow: 'Today · Art × Classical',
      h1: 'Which painting<br /> draws you today?',
      sub: 'Pick a painting before you hear a note.<br />There are no good or bad paintings. The one that draws you today picks today’s classical.',
      q1: '<b>Q1</b>Which painting draws you more today?',
      r2Title: '<b>Q2</b>Which ones would you look at longer today?',
      r2Go: 'See today’s Classical Menu ↓',
      resEyebrow: 'Today you’re drawn to', typeLead: 'More precisely, today you are',
      kGi: 'Today’s mood',
      how2t: 'Pick what draws you today',
      how3d: 'We read today’s mood from the paintings and serve ten pieces you can play right on the page.',
      todayTitle: 'Painting of the day', todayLead: 'If today’s painting draws you in, you might like this music too.',
      finalTitle: 'What does today’s<br />classical taste like?', finalCta: 'Find today’s classical',
      cdSubLinked: 'Matches for today',
      cmpTitle: 'Composers picked through your paintings',
      plTitle: 'Today’s Classical Menu',
      shareEyebrow: 'Share today’s classical',
      shareSub: 'Your result travels as a link. Whoever opens it sees the same card and menu.',
      shareText: 'Today my classical is {era} — “{type}”. Pick a few paintings and Yummy Classic finds yours. Do give it a try.',
      sharedBanner: 'A friend sent you their classical of the day.',
      imgKicker: 'TODAY’S CLASSICAL',
      ig1Tease: 'So what’s my classical today? →', ig2Kicker: 'MY CLASSICAL TODAY',
      ig3Cta: 'What does today’s classical taste like?',
      flowKicker: 'TODAY’S EMOTIONAL LINE', flowSub: 'Listen while you look for today’s feeling in yourself.',
      belowCue: 'Today’s Classical Menu is right below',
    });
    Object.assign(I18N.ko, {
      title: '냠냠클래식 — 오늘 끌리는 그림으로 고르는 오늘의 클래식',
      metaDesc: '오늘 마음이 가는 그림을 고르면, 오늘의 클래식이 찾아옵니다.',
      navCta: '오늘의 클래식 찾기 →', navMap: '사조 지도', navToday: '오늘의 그림',
      eyebrow: 'Today · 오늘의 클래식',
      h1: '오늘은 어떤 그림에<br /> 끌리나요?',
      sub: '음악을 듣기 전에 그림을 골라보세요.<br />좋고 나쁜 그림은 없어요. 오늘 끌리는 그림이 오늘의 클래식을 골라 줘요.',
      q1: '<b>Q1</b>둘 중 오늘 더 끌리는 그림은?',
      r2Title: '<b>Q2</b>이 중에 오늘 더 오래 보고 싶은 그림은?',
      r2Go: '오늘의 클래식 메뉴 보기 ↓',
      resEyebrow: '오늘 당신이 끌린 음악은', typeLead: '그중에서도 오늘의 당신은',
      kGi: '오늘의 기분',
      how2t: '오늘 끌리는 걸 고르면',
      how3d: '그림에서 읽어 낸 오늘의 기분으로 열 곡을 골라, 페이지 안에서 바로 들려 드려요.',
      todayTitle: '오늘의 그림', todayLead: '오늘의 그림에 끌렸다면, 이 음악도 마음에 들지도 몰라요.',
      finalTitle: '오늘의 클래식은<br />어떤 맛일까요?', finalCta: '오늘의 클래식 찾기',
      cdSubLinked: 'Matches for today · 오늘의 어울림',
      cmpTitle: '그림으로 고른 작곡가',
      plTitle: '오늘의 클래식 메뉴',
      shareEyebrow: 'Share today’s classical',
      shareSub: '결과를 링크로 보낼 수 있어요. 링크를 연 친구에게도 같은 카드와 메뉴가 보여요.',
      shareText: '오늘 나의 클래식은 {era} — ‘{type}’. 그림 몇 장으로 오늘의 클래식을 골라 주는 냠냠클래식, 함께 해 보세요.',
      sharedBanner: '소중한 분이 보낸 오늘의 클래식이에요.',
      imgKicker: 'TODAY’S CLASSICAL',
      ig1Tease: '이 그림들로 고른 나의 오늘의 클래식은? →', ig2Kicker: '나의 오늘의 클래식은',
      ig3Cta: '당신의 오늘의 클래식은 어떤 맛인가요?',
      flowKicker: 'TODAY’S EMOTIONAL LINE', flowSub: '곡을 들으면서, 오늘 내 마음의 결을 찾아보세요.',
      belowCue: '오늘의 클래식 메뉴가 바로 아래에 있어요',
    });
    Object.assign(I18N.ja, {
      title: 'ヤミークラシック — 今日惹かれる絵で選ぶ、今日のクラシック',
      metaDesc: '今日心が向かう絵を選ぶと、今日のクラシックが届きます。',
      navCta: '今日のクラシックを探す →', navMap: '流派マップ', navToday: '今日の一枚',
      eyebrow: 'Today · 今日のクラシック',
      h1: '今日は、どの絵に<br />惹かれますか?',
      sub: '音楽を聴く前に、絵を選んでみてください。<br />良い絵も悪い絵もありません。今日惹かれる絵が、今日のクラシックを選びます。',
      q1: '<b>Q1</b>今日はどちらの絵に惹かれますか?',
      r2Title: '<b>Q2</b>この中で、今日もっと長く見ていたい絵は?',
      r2Go: '今日のクラシック・メニューを見る ↓',
      resEyebrow: '今日あなたが惹かれた音楽は', typeLead: 'なかでも今日のあなたは',
      kGi: '今日の気分',
      how2t: '今日惹かれるものを選ぶと',
      how3d: '絵から読みとった今日の気分で10曲を選び、ページの中ですぐに聴かせます。',
      todayTitle: '今日の一枚', todayLead: '今日の一枚に惹かれたなら、この音楽も気に入るかもしれません。',
      finalTitle: '今日のクラシックは<br />どんな味?', finalCta: '今日のクラシックを探す',
      cdSubLinked: 'Matches for today · 今日の相性',
      cmpTitle: '絵で選んだ作曲家',
      plTitle: '今日のクラシック・メニュー',
      shareEyebrow: 'Share today’s classical',
      shareSub: 'この結果をリンクで送れます。開いた人には同じカードとメニューが表示されます。',
      shareText: '今日の私のクラシックは {era} —「{type}」。数枚の絵で今日のクラシックを選ぶヤミークラシック、ぜひ一緒にどうぞ。',
      sharedBanner: '友だちから届いた今日のクラシックです。',
      imgKicker: 'TODAY’S CLASSICAL',
      ig1Tease: 'この絵で選んだ私の今日のクラシックは? →', ig2Kicker: '私の今日のクラシックは',
      ig3Cta: 'あなたの今日のクラシックはどんな味?',
      flowKicker: 'TODAY’S EMOTIONAL LINE', flowSub: '曲を聴きながら、今日の自分の心の質感を探してみてください。',
      belowCue: '今日のクラシック・メニューはすぐ下です',
    });
    // ---- Q2 as rounds: four paintings a round, one pick each ----
    Object.assign(I18N.en, {
      r2Title: '<b>Q2</b>Round by round, just one painting',
      r2Sub: 'Three rounds of four paintings. In each round, pick the one that draws you most today. Hover over a painting to see it large (on a phone, press and hold).',
      rRound: 'Round {n} / {t}', rPickOne: 'Just one of these', rCount: '{n} of {t} picked',
      rPrev: '← Previous round', r2Back: 'Start over',
      rDone: 'Today’s {n} paintings are in!', rDoneSub: 'Tap a painting or a dot to change that round.',
      kMix: 'Today’s mix', mixLean: 'Today leans toward “{g}”.',
      kEra: 'Classic or Romantic', eraLine: 'Classic {c} · Romantic {r}, across all {n} of your picks (buildings, figures and paintings), so today’s music leans {era}.', eraName: { classic: 'classic', romantic: 'romantic' },
      q1Step: '{kind} {n} of {t} · {theme}', q1KindArch: 'Building', q1KindFig: 'Figure',
    });
    Object.assign(I18N.ko, {
      r2Title: '<b>Q2</b>라운드마다, 끌리는 한 장만',
      r2Sub: '4점씩 3라운드예요. 라운드마다 오늘 더 끌리는 그림 한 장만 골라 주세요. 그림에 마우스를 올리면 크게 보여요 (휴대폰은 길게 누르기).',
      rRound: 'Round {n} / {t}', rPickOne: '이 중 한 장만', rCount: '{t}라운드 중 {n}라운드 완료',
      rPrev: '← 이전 라운드', r2Back: '처음으로',
      rDone: '오늘의 그림 {n}점이 모였어요!', rDoneSub: '그림이나 위의 점을 누르면 그 라운드를 다시 고를 수 있어요.',
      kMix: '오늘의 분포', mixLean: '오늘은 ‘{g}’ 쪽으로 기울었어요.',
      kEra: '고전과 낭만', eraLine: '고전 {c} · 낭만 {r}. 건축·인물 그림과 명화를 더한 {n}번의 선택으로, 오늘은 {era} 쪽 음악을 골랐어요.', eraName: { classic: '고전', romantic: '낭만' },
      q1Step: '{kind} {n} / {t} · {theme}', q1KindArch: '건축 그림', q1KindFig: '인물 그림',
    });
    Object.assign(I18N.ja, {
      r2Title: '<b>Q2</b>ラウンドごとに、惹かれる1枚だけ',
      r2Sub: '4枚ずつ3ラウンドです。各ラウンドで、今日いちばん惹かれる絵を1枚だけ選んでください。絵にマウスを重ねると大きく見られます(スマホは長押し)。',
      rRound: 'Round {n} / {t}', rPickOne: 'この中から1枚だけ', rCount: '{t}ラウンド中{n}ラウンド完了',
      rPrev: '← 前のラウンド', r2Back: '最初へ',
      rDone: '今日の{n}枚がそろいました!', rDoneSub: '絵か上の点を押すと、そのラウンドを選び直せます。',
      kMix: '今日のバランス', mixLean: '今日は「{g}」寄りです。',
      kEra: '古典とロマン', eraLine: '古典 {c}・ロマン {r}。建築画・人物画と名画、計{n}回の選択から、今日は{era}寄りの音楽を選びました。', eraName: { classic: '古典', romantic: 'ロマン' },
      q1Step: '{kind} {n} / {t} · {theme}', q1KindArch: '建築画', q1KindFig: '人物画',
    });
    // ---- Start screen ----
    Object.assign(I18N.en, {
      introKicker: 'Today’s classical, chosen by a painting', introH1: 'The painting you choose<br />recommends today’s<br />classical piece',
      introSub: 'Pick a few paintings and get one piece for your mood in about 20 seconds.', introCta: 'Start choosing',
      introMeta: 'About 20 sec · No sign-up · No wrong answers', introExLabel: 'Your result looks like this', introExKick: 'Today’s classical',
      introExPiece: 'Debussy, “Clair de lune”', introExWhy: 'For a day you chose Monet’s Impression, Sunrise',
      introPlayAria: 'Play the sample piece', introPlayMsg: 'This is a sample. Pick a few paintings and in 20 seconds you can play the piece chosen for you.', introPlayGo: 'Start now →',
    });
    Object.assign(I18N.ko, {
      introKicker: '그림으로 고르는 오늘의 클래식', introH1: '당신이 선택한 그림이<br />오늘의 클래식을<br />추천해 줍니다',
      introSub: '그림 몇 장만 고르면, 20초 안에 지금 기분에 맞는 한 곡이 나와요.', introCta: '그림 고르러 가기',
      introMeta: '약 20초 · 회원가입 없음 · 정답 없음', introExLabel: '결과는 이렇게 나와요', introExKick: '오늘의 클래식',
      introExPiece: '드뷔시 「달빛」', introExWhy: '모네 〈인상, 해돋이〉를 고른 날',
      introPlayAria: '예시 곡 재생', introPlayMsg: '이건 예시예요. 그림 몇 장만 고르면, 20초 뒤 나에게 맞는 추천곡을 바로 들을 수 있어요.', introPlayGo: '지금 시작 →',
    });
    Object.assign(I18N.ja, {
      introKicker: '絵で選ぶ、今日のクラシック', introH1: 'あなたが選んだ絵が<br />今日のクラシックを<br />おすすめします',
      introSub: '絵を何枚か選ぶだけで、約20秒で今の気分に合う1曲が届きます。', introCta: '絵を選びに行く',
      introMeta: '約20秒 · 会員登録なし · 正解なし', introExLabel: '結果はこんなふうに届きます', introExKick: '今日のクラシック',
      introExPiece: 'ドビュッシー「月の光」', introExWhy: 'モネ《印象・日の出》を選んだ日に',
      introPlayAria: 'サンプル曲を再生', introPlayMsg: 'これはサンプルです。絵を何枚か選ぶだけで、20秒後にあなたへのおすすめ曲をすぐ聴けます。', introPlayGo: '今すぐ始める →',
    });
    // ---- Today's concerts & exhibitions ----
    Object.assign(I18N.en, { evScopeKr: 'In Korea', evScopeIntl: 'Worldwide', evPeekMore: 'See all ({n})', evPeekOpen: 'See all', evPeekLess: 'Show less', evEyebrow: 'Today’s stage & gallery', evTitle: 'Today’s concerts & exhibitions',
      evMore: 'See more ▼ ({n})', evLess: 'Show less ▲', evFit: 'Matches your taste', evStretch: 'Stretches your taste',
      evSample: 'Sample listings for now · connect the public data APIs and real concerts and exhibitions appear here', evLink: 'Tickets & details ↗',
      evConcert: 'Concert', evExhibit: 'Exhibition', evEmpty: 'No concerts or exhibitions to show right now.', evAll: 'All regions', evColConcert: 'Classical concerts', evColExhibit: 'Exhibitions · museums & special shows', evNoConcert: 'No classical concerts in this region right now.', evNoExhibit: 'No exhibitions in this region right now.', evSpecial: 'Special show', evMuseum: 'Museum', evLoading: 'Loading today’s listings…',
      evSub1: 'Concerts and exhibitions on now that suit the {g} you carry today.', evSub0: 'Concerts and exhibitions on now that suit today’s picks.' });
    Object.assign(I18N.ko, { evScopeKr: '대한민국 공연·전시', evScopeIntl: '글로벌 공연', evPeekMore: '모두 보기 ({n}건)', evPeekOpen: '모두 보기', evPeekLess: '접기', evEyebrow: 'Today’s stage & gallery', evTitle: '오늘의 공연·전시',
      evMore: '더 보기 ▼ ({n})', evLess: '접기 ▲', evFit: '취향 맞춤', evStretch: '취향 확장',
      evSample: '지금은 샘플 목록이에요 · 공공 API를 연결하면 실제 공연·전시로 바뀌어요', evLink: '예매·자세히 ↗',
      evConcert: '공연', evExhibit: '전시', evEmpty: '지금 보여 드릴 공연·전시가 없어요.', evAll: '전체', evColConcert: '클래식 공연', evColExhibit: '전시 · 미술관·특별전', evNoConcert: '이 지역엔 지금 열리는 클래식 공연이 없어요.', evNoExhibit: '이 지역엔 지금 열리는 전시가 없어요.', evSpecial: '특별전', evMuseum: '미술관', evLoading: '오늘의 공연·전시를 불러오는 중이에요…',
      evSub1: '{g} 품은 오늘의 당신에게 어울리는, 지금 열리고 있는 공연과 전시예요.', evSub0: '오늘 고르신 그림과 어울리는, 지금 열리고 있는 공연과 전시예요.' });
    Object.assign(I18N.ja, { evScopeKr: '韓国の公演・展示', evScopeIntl: '世界の公演', evPeekMore: 'すべて見る（{n}件）', evPeekOpen: 'すべて見る', evPeekLess: '閉じる', evEyebrow: 'Today’s stage & gallery', evTitle: '今日の公演・展示',
      evMore: 'もっと見る ▼ ({n})', evLess: '閉じる ▲', evFit: '好みにぴったり', evStretch: '好みを広げる',
      evSample: '現在はサンプルです · 公共APIをつなぐと実際の公演・展示に変わります', evLink: 'チケット・詳細 ↗',
      evConcert: '公演', evExhibit: '展示', evEmpty: '今お見せできる公演・展示はありません。', evAll: 'すべて', evColConcert: 'クラシック公演', evColExhibit: '展示 · 美術館・特別展', evNoConcert: 'この地域では今クラシック公演がありません。', evNoExhibit: 'この地域では今展示がありません。', evSpecial: '特別展', evMuseum: '美術館', evLoading: '今日の公演・展示を読み込んでいます…',
      evSub1: '{g}を抱く今日のあなたに合う、いま開催中の公演と展示です。', evSub0: '今日選んだ絵に合う、いま開催中の公演と展示です。' });
    Object.assign(I18N.en, { intlSub: 'Classical concerts in cities around the world. Dates and times are local.', intlLoading: 'Loading concerts…', intlEmpty: 'No classical concerts listed in this country right now.', intlOff: 'International listings are being prepared. Coming soon.', intlErr: 'Couldn’t load the listings. Please try again in a moment.', intlDates: '+{n} more dates', intlLocal: 'local time', intlCross: 'Crossover', intlBtn: 'Classical Concerts Worldwide', intlBtnSub: 'New York · London · Berlin · Paris · Toronto · Sydney' });
    Object.assign(I18N.ko, { intlSub: '세계 여러 도시의 클래식 공연 일정이에요. 날짜와 시간은 현지 기준입니다.', intlLoading: '공연 정보를 불러오는 중이에요…', intlEmpty: '이 나라엔 지금 등록된 클래식 공연이 없어요.', intlOff: '인터내셔널 공연 정보를 준비하고 있어요. 곧 열립니다.', intlErr: '공연 정보를 불러오지 못했어요. 잠시 뒤 다시 시도해 주세요.', intlDates: '외 {n}회', intlLocal: '현지', intlCross: '크로스오버', intlBtn: '세계의 클래식 공연', intlBtnSub: '뉴욕 · 런던 · 베를린 · 파리 · 토론토 · 시드니' });
    Object.assign(I18N.ja, { intlSub: '世界各地の都市で開かれるクラシック公演の日程です。日時は現地時間です。', intlLoading: '公演情報を読み込んでいます…', intlEmpty: 'この国では今、登録されたクラシック公演がありません。', intlOff: '海外公演情報を準備中です。まもなく公開します。', intlErr: '公演情報を読み込めませんでした。少し経ってから再度お試しください。', intlDates: 'ほか{n}回', intlLocal: '現地', intlCross: 'クロスオーバー', intlBtn: '世界のクラシック公演', intlBtnSub: 'ニューヨーク · ロンドン · ベルリン · パリ · トロント · シドニー' });
    Object.assign(I18N.en, { evSortPop: 'Popular', evSortDate: 'Nearest date', evSoon: 'Closing soon' });
    Object.assign(I18N.ko, { evSortPop: '인기순', evSortDate: '가까운 날짜순', evSoon: '곧 마감' });
    Object.assign(I18N.ja, { evSortPop: '人気順', evSortDate: '日程順', evSoon: 'まもなく終了' });
    // ---- More for today (pilot) ----
    Object.assign(I18N.en, { moreEyebrow: 'More for today', morePilot: 'Pilot', moreTitle: 'Painters & novels for you',
      moreSub: 'Painters and classic novels picked with the same keywords as the paintings you chose today.',
      moreBtn: 'More painters & novels ▾', moreHide: 'Hide ▴', morePainters: 'Painters for you', moreNovels: 'Classic novels for you', moreLink: 'Read more ↗' });
    Object.assign(I18N.ko, { moreEyebrow: 'More for today', morePilot: '파일럿', moreTitle: '추천 화가 및 소설',
      moreSub: '오늘 고르신 그림의 키워드로, 함께 만나면 좋을 서양화가와 고전 소설도 골라 봤어요.',
      moreBtn: '추천 화가·소설 더보기 ▾', moreHide: '접기 ▴', morePainters: '추천 서양화가', moreNovels: '명작 고전 소설', moreLink: '자세히 ↗' });
    Object.assign(I18N.ja, { moreEyebrow: 'More for today', morePilot: 'パイロット', moreTitle: 'おすすめの画家・小説',
      moreSub: '今日選んだ絵のキーワードで、一緒に出会いたい西洋画家と古典小説も選んでみました。',
      moreBtn: 'おすすめの画家・小説をもっと見る ▾', moreHide: '閉じる ▴', morePainters: 'おすすめの西洋画家', moreNovels: '名作古典小説', moreLink: '詳しく ↗' });
    const JA = {"paint": {"pearl": {"ko": "真珠の耳飾りの少女", "byKo": "ヨハネス・フェルメール", "moodKo": "静かな輝き", "tagKo": "オランダ・バロック · 光が主役", "readKo": "振り向く顔、肩越しの視線、光を宿す真珠。この絵に惹かれたなら、静かに澄んで輝く、親密な音楽がお好きなはず。"}, "musiclesson": {"ko": "音楽の稽古", "byKo": "ヨハネス・フェルメール", "moodKo": "静かな部屋の調和", "tagKo": "オランダ・バロック · 室内の音楽", "readKo": "ヴァージナルの前の女性、そばに立つ紳士、顔の一部だけを映す鏡。この絵に惹かれたなら、端正で親密な、少し秘密めいた音楽がお好きなはず。"}, "nightwatch": {"ko": "夜警", "byKo": "レンブラント・ファン・レイン", "moodKo": "祝祭のような壮大さ", "tagKo": "オランダ・バロック · 動き出す集団肖像", "readKo": "市民隊の集団肖像なのに、誰もポーズをとっていません。この絵にわくわくしたなら、壮大でにぎやか、声に満ちた音楽がお好きなはず。"}, "prodigal": {"ko": "放蕩息子の帰還", "byKo": "レンブラント・ファン・レイン", "moodKo": "温かな影の中の慈しみ", "tagKo": "オランダ・バロック · 声を荒げない赦し", "readKo": "ぼろをまとった息子がひざまずき、父の両手がその背に置かれます。この絵に心を動かされたなら、慰めてくれる音楽がお好きなはず。"}, "matthew": {"ko": "聖マタイの召命", "byKo": "カラヴァッジョ", "moodKo": "突然のスポットライト", "tagKo": "イタリア・バロック · テネブリズム", "readKo": "一筋の光が酒場の机を横切り、指がひとりを指し示します。この絵が響いたなら、明暗がくっきりして登場が決然とした音楽がお好きなはず。"}, "meninas": {"ko": "ラス・メニーナス", "byKo": "ディエゴ・ベラスケス", "moodKo": "威厳ある謎", "tagKo": "スペイン・バロック · 誰が誰を見ている?", "readKo": "王女、侍女たち、犬、そしてあなたを描いているような画家自身。この絵に魅了されたなら、威厳があり、隠れた構造が幾重にも重なる音楽がお好きなはず。"}, "cavalier": {"ko": "笑う騎士", "byKo": "フランス・ハルス", "moodKo": "自信たっぷりのきらめき", "tagKo": "オランダ・バロック · 油彩のはったり", "readKo": "実は笑っていません(その呼び名はずっと後のもの)。この絵に頬がゆるんだなら、明るく機知に富み、少し生意気な音楽がお好きなはず。"}, "horatii": {"ko": "ホラティウス兄弟の誓い", "byKo": "ジャック＝ルイ・ダヴィッド", "moodKo": "決意と英雄の気概", "tagKo": "新古典主義 · 幾何学になった義務", "readKo": "三人の兄弟、まっすぐ伸びた三本の腕、迷いはゼロ。この絵に惹かれたなら、骨組みがはっきりして鼓動が決然とした音楽がお好みかも。"}, "socrates": {"ko": "ソクラテスの死", "byKo": "ジャック＝ルイ・ダヴィッド", "moodKo": "厳粛な思索", "tagKo": "新古典主義 · 啓蒙の理想", "readKo": "哲学者は講義を続けながら毒杯へ手を伸ばします。この絵の前で立ち止まったなら、重くても澄んだ音楽、いわば姿勢の正しい悲しみがお好きなはず。"}, "odalisque": {"ko": "グランド・オダリスク", "byKo": "アングル", "moodKo": "優雅な官能", "tagKo": "後期新古典主義 · 色より線", "readKo": "アングルは美しい曲線のために、背骨をこっそり数個描き足しました。この絵が好きなら、なめらかで均整がとれ、少しだけ甘美な旋律がお好きなはず。"}, "sabine": {"ko": "サビニの女たちの仲裁", "byKo": "ジャック＝ルイ・ダヴィッド", "moodKo": "気高い平静", "tagKo": "新古典主義 · 革命後のギリシア的静けさ", "readKo": "女性たちが二つの軍のあいだに歩み出ると、戦いが止まります。この絵に惹かれたなら、対立を優雅にほどく音楽がお好きなはず。"}, "napoleon": {"ko": "アルプス越えのナポレオン", "byKo": "ジャック＝ルイ・ダヴィッド", "moodKo": "運命の行進", "tagKo": "新古典主義 · 油彩の広告ポスター", "readKo": "ナポレオンが後ろ脚で立つ馬でアルプスを越えます(実際はラバでした)。この絵を選んだなら、はっきりした目的で行進する音楽がお好きです。"}, "swing": {"ko": "ぶらんこ", "byKo": "ジャン＝オノレ・フラゴナール", "moodKo": "きらめく遊び心", "tagKo": "ロココ · 革命前夜の最後の宴", "readKo": "ぶらんこの女性が靴を飛ばし、茂みの恋人がそれを見つめます。この絵を選んだなら、きらめいて、からかって、深刻になりすぎない音楽がお好きです。"}, "marie": {"ko": "マリー・アントワネットと子どもたち", "byKo": "エリザベート・ヴィジェ＝ルブラン", "moodKo": "つややかな温もり", "tagKo": "後期ロココ · イメージづくり", "readKo": "王妃は優しく普通の母に見えることを望んでいました。この絵に惹かれたなら、つややかで温かく、真心さえ少し劇的に見せる音楽がお好きなはず。"}, "recamier": {"ko": "レカミエ夫人の肖像", "byKo": "ジャック＝ルイ・ダヴィッド", "moodKo": "端正な簡素さ", "tagKo": "新古典主義 · ミニマルな洗練", "readKo": "ほとんど何もない部屋で、レカミエ夫人がソファにもたれています。この絵が語りかけてきたなら、端正で無駄がなく、急がない音楽がお好きなはず。"}, "psyche": {"ko": "プシュケとアモル", "byKo": "フランソワ・ジェラール", "moodKo": "やさしい理想", "tagKo": "新古典主義 · 頬を染めた神話", "readKo": "目覚めて恋を知るプシュケの額に、アモルがくちづけします。この絵を選んだなら、やさしく繊細で、美しく理想化された音楽がお好きなはず。"}, "endymion": {"ko": "エンデュミオンの眠り", "byKo": "アンヌ＝ルイ・ジロデ", "moodKo": "月光のような夢見心地", "tagKo": "新古典主義 · 月光の仕掛け", "readKo": "月の光が葉のあいだから差し込み、眠る羊飼いをなでます。この絵が目に留まったなら、息をひそめるように淡く輝く、少し夢見がちな音楽がお好きなはず。"}, "thetis": {"ko": "ユピテルとテティス", "byKo": "アングル", "moodKo": "荘厳な落ち着き", "tagKo": "新古典主義 · オリュンポスのドラマ", "readKo": "テティスが息子の助命を願い、玉座のユピテルのあごに触れます。この絵を選んだなら、荘厳で抑制がきき、揺るぎない音楽がお好きなはず。"}, "valpincon": {"ko": "ヴァルパンソンの浴女", "byKo": "アングル", "moodKo": "静かでなめらかな肌理", "tagKo": "新古典主義 · 曲線ひとつで語る背中", "readKo": "顔も物語もなく、背中とターバン、光る曲線だけ。この絵に心を奪われたなら、穏やかでなめらか、静かな自信に満ちた音楽がお好きなはず。"}, "kauffman": {"ko": "「デザイン」に扮した自画像", "byKo": "アンゲリカ・カウフマン", "moodKo": "思慮深い優雅さ", "tagKo": "新古典主義 · ミューズのそばの画家", "readKo": "カウフマンは、詩がささやく霊感に耳を傾ける「デザイン」として自分を描きました。この絵に惹かれたなら、優雅で思慮深く、少し知的な音楽がお好きなはず。"}, "morningwalk": {"ko": "朝の散歩", "byKo": "トマス・ゲインズバラ", "moodKo": "軽やかな優雅さ", "tagKo": "ジョージ王朝の肖像画 · 澄んだ空気の優雅さ", "readKo": "若い夫婦が犬と風の中を歩き、羽毛のような筆致がその空気を包みます。この絵を選んだなら、散歩のように明るく自然で、急がない音楽がお好きなはず。"}, "reader": {"ko": "読書する娘", "byKo": "ジャン＝オノレ・フラゴナール", "moodKo": "ひそやかな温もり", "tagKo": "ロココ · 静かなひととき", "readKo": "黄色いドレスの少女が本に夢中になり、速く軽い筆がその瞬間をとらえました。この絵を選んだなら、温かく、打ち明け話のような音楽がお好きなはず。"}, "kiss": {"ko": "接吻", "byKo": "フランチェスコ・アイエツ", "moodKo": "愛と恋しさ", "tagKo": "ロマン主義 · 感情が主役になる", "readKo": "よく見ると、このキスは別れでもあります。男性の足はもう階段にかかっているから。この絵が心に残ったなら、胸いっぱいの旋律と少しの切なさがお好きなはず。"}, "nightmare": {"ko": "夢魔", "byKo": "ヘンリー・フュースリー", "moodKo": "夢と恐怖のあいだ", "tagKo": "ゴシック前期ロマン主義 · 崇高", "readKo": "眠る女性、その胸にのる小鬼、カーテンからのぞく馬。この絵に身を乗り出したなら、物語と影と少しの寒気、幽霊の気配がある音楽がお好きなはず。"}, "chasseur": {"ko": "突撃する近衛猟騎兵士官", "byKo": "テオドール・ジェリコー", "moodKo": "ためらいのない推進力", "tagKo": "ロマン主義 · 英雄になった馬", "readKo": "突撃中の士官が鞍の上で身をひねり、馬が前脚を高く上げます。この絵に心をつかまれたなら、脚でリズムを感じる、推進力のある音楽がお好きなはず。"}, "algiers": {"ko": "アルジェの女たち", "byKo": "ウジェーヌ・ドラクロワ", "moodKo": "豊かな色彩", "tagKo": "ロマン主義 · オリエントへの憧れ", "readKo": "豊かな文様の室内で女性たちがくつろいでいます。この絵に惹かれたなら、華やかで質感豊か、色の濃い音楽がお好きなはず。"}, "francesca": {"ko": "パオロとフランチェスカ", "byKo": "アリ・シェフェール", "moodKo": "運命の情熱", "tagKo": "ロマン主義 · 文学の中の愛と破滅", "readKo": "地獄の風に永遠に吹かれるダンテの恋人たちが、詩人の前に現れます。この絵を選んだなら、少し燃えるような愛の音楽がお好きなはず。"}, "ophelia": {"ko": "オフィーリア", "byKo": "ジョン・エヴァレット・ミレー", "moodKo": "美しい哀しみ", "tagKo": "ラファエル前派 · 緻密に描いたシェイクスピア", "readKo": "歌いながら、沈みながら、オフィーリアが小川に浮かびます。葉の一枚まで植物学者のように精密に描かれています。この絵に心を動かされたなら、美しくて胸が痛む音楽がお好きなはず。"}, "schubertiade": {"ko": "シューベルティアーデ", "byKo": "モーリッツ・フォン・シュヴィント", "moodKo": "ピアノを囲む友人たち", "tagKo": "ビーダーマイヤー · 家の中の音楽", "readKo": "友人たちがピアノを囲み、シューベルトが歌の伴奏をします。この絵に惹かれたなら、友人との会話のような音楽がお好きなはず。"}, "titania": {"ko": "ティターニアとボトム", "byKo": "ヘンリー・フュースリー", "moodKo": "おとぎ話の奇妙さ", "tagKo": "ゴシック・ロマン主義 · シェイクスピアの妖精王国", "readKo": "魔法にかかった妖精の女王が、ロバ頭の職人に夢中になります。この絵を選んだなら、遊び心があって魔法のようで、少し奇妙な音楽がお好きなはず。"}, "hamlet": {"ko": "墓場のハムレットとホレイショー", "byKo": "ウジェーヌ・ドラクロワ", "moodKo": "深く沈む思索", "tagKo": "ロマン主義 · 髑髏つきのシェイクスピア", "readKo": "ハムレットがヨリックの髑髏を手にし、ホレイショーが見守ります。この絵を選んだなら、思い悩み、思索する音楽がお好きなはず。"}, "derby": {"ko": "エプソムの競馬", "byKo": "テオドール・ジェリコー", "moodKo": "息をのむ速さ", "tagKo": "ロマン主義 · 写真以前のスピード", "readKo": "馬たちが四本の脚をすべて宙に浮かせて疾走します。この絵にわくわくしたなら、駆け抜ける音楽がお好きなはず。"}, "poetspitzweg": {"ko": "貧しい詩人", "byKo": "カール・シュピッツヴェーク", "moodKo": "ほっこりしたユーモア", "tagKo": "ビーダーマイヤー · スリッパを履いたロマン主義", "readKo": "すきま風の屋根裏で詩人が指で音節を数え、ベッドの上には雨漏り用の傘。この絵に笑みがこぼれたなら、やさしくユーモラスで居心地のいい音楽がお好きなはず。"}, "shalott": {"ko": "シャロットの女", "byKo": "ジョン・ウィリアム・ウォーターハウス", "moodKo": "神話的な叙情", "tagKo": "後期ヴィクトリア朝 · ラファエル前派の復活", "readKo": "女性は機を離れて舟に乗り、最後の歌を歌いながらキャメロットへ流れていきます。この絵に惹かれたなら、叙情的で神話的、長く寂しい余韻の音楽がお好きなはず。"}, "seaice": {"ko": "氷の海", "byKo": "カスパー・ダーヴィト・フリードリヒ", "moodKo": "凍りついた絶望", "tagKo": "ロマン主義 · 氷になった崇高", "readKo": "氷の板が崩れた記念碑のように積み重なり、よく見ると押しつぶされた船の船尾が見えます。この絵に引き留められたなら、荒涼として冷たく、静けさの中で胸を打つ音楽がお好きなはず。"}, "monk": {"ko": "海辺の修道士", "byKo": "カスパー・ダーヴィト・フリードリヒ", "moodKo": "果てしない孤独", "tagKo": "ロマン主義 · 無限の前のひとり", "readKo": "小さな人影が、広く空っぽの空と暗い海の前に立っています。この絵に惹かれたなら、広々として孤独で、畏れを感じさせる音楽がお好きなはず。"}, "rugen": {"ko": "リューゲン島の白亜の断崖", "byKo": "カスパー・ダーヴィト・フリードリヒ", "moodKo": "新婚旅行の風景", "tagKo": "ロマン主義 · 断崖の先の愛", "readKo": "フリードリヒが新婚旅行のあとに描いた絵です。この絵に心が温まったなら、やさしくて見晴らしのいい、景色のある愛の音楽がお好きなはず。"}, "temeraire": {"ko": "戦艦テメレール号", "byKo": "J・M・W・ターナー", "moodKo": "金色の別れ", "tagKo": "ロマン主義 · 夕暮れに沈む時代", "readKo": "幽霊のように白い老戦艦が、小さな黒い蒸気船に曳かれて解体場へ向かいます。この絵に心を動かされたなら、別れの光に染まった音楽がお好きなはず。"}, "railspeed": {"ko": "雨、蒸気、スピード", "byKo": "J・M・W・ターナー", "moodKo": "疾走する近代", "tagKo": "ロマン主義 · 嵐になった汽車", "readKo": "蒸気機関車が雨のかすみを突き抜けて橋を渡り、その前を小さな野ウサギが走ります。この絵にわくわくしたなら、前へ押し進み、輪郭がにじむ音楽がお好きなはず。"}, "hannibal": {"ko": "吹雪:アルプスを越えるハンニバル", "byKo": "J・M・W・ターナー", "moodKo": "軍をのみこむ嵐", "tagKo": "ロマン主義 · 英雄に勝つ自然", "readKo": "雪と黒雲の巨大な渦が、ハンニバルの軍をのみこみます。この絵に巻き込まれたなら、圧倒的で渦巻く、巨大な音楽がお好きなはず。"}, "barque": {"ko": "ダンテの小舟", "byKo": "ウジェーヌ・ドラクロワ", "moodKo": "地獄の激流", "tagKo": "ロマン主義 · ドラクロワのデビュー作", "readKo": "ダンテとウェルギリウスが燃える地獄の湖を渡り、亡者たちが舟にしがみつきます。この絵に心をつかまれたなら、暗く激しく、文学的な音楽がお好きなはず。"}, "haywain": {"ko": "干し草車", "byKo": "ジョン・コンスタブル", "moodKo": "なつかしい田園", "tagKo": "ロマン主義 · ふるさとの詩情", "readKo": "干し草車が小屋のそばの浅い川を渡り、その上に大きく動く空が広がります。この絵がふるさとのように感じられたなら、温かく牧歌的で、急がない音楽がお好きなはず。"}, "milkmaid": {"ko": "牛乳を注ぐ女", "byKo": "ヨハネス・フェルメール", "moodKo": "ひと筋の静かな労働", "tagKo": "オランダ・バロック · 台所の光", "readKo": "細い牛乳の流れひとつで、絵全体が静止しています。この絵に惹かれたなら、素朴で澄んだ、急がない音楽がお好きなはず。"}, "delft": {"ko": "デルフト眺望", "byKo": "ヨハネス・フェルメール", "moodKo": "雲の下の澄んだ町", "tagKo": "オランダ・バロック · 光で描いた町", "readKo": "雲の影の下で、いくつかの屋根だけが陽を受けています。この絵が好きなら、広々と落ち着いた、ほのかに輝く音楽が似合います。"}, "balance": {"ko": "天秤を持つ女", "byKo": "ヨハネス・フェルメール", "moodKo": "均衡をはかる沈黙", "tagKo": "オランダ・バロック · 空の天秤", "readKo": "天秤は空で、女性はその空の均衡を見つめています。この絵の前で立ち止まったなら、考える余白のある、ゆっくりと端正な音楽がお好きなはず。"}, "littlestreet": {"ko": "小路", "byKo": "ヨハネス・フェルメール", "moodKo": "路地のありふれた一日", "tagKo": "オランダ・バロック · 静物のような通り", "readKo": "赤いレンガ、白い鎧戸、うつむいて働く隣人たち。この絵が心地よいなら、素朴で繰り返しが気持ちいい音楽がお好みかも。"}, "courtyard": {"ko": "デルフトの家の中庭", "byKo": "ピーテル・デ・ホーホ", "moodKo": "扉の向こうの平穏", "tagKo": "オランダ・バロック · 扉と扉のあいだの光", "readKo": "開いた扉の向こうに、もうひとつの空間が続きます。この絵に惹かれたなら、端正で温かい、家のような音楽がお好きなはず。"}, "bubbles": {"ko": "シャボン玉", "byKo": "ジャン・シメオン・シャルダン", "moodKo": "ふくらむ一瞬", "tagKo": "ロココ · 消える直前の遊び", "readKo": "窓辺の少年が息をこらしてシャボン玉をふくらませます。この絵が好きなら、軽やかで繊細な、すぐに消えてしまいそうな音楽が似合います。"}, "grace": {"ko": "食前の祈り", "byKo": "ジャン・シメオン・シャルダン", "moodKo": "食卓の小さな祈り", "tagKo": "ロココ · 台所の信仰", "readKo": "母は待ち、子どもは両手を合わせます。この絵に心が向いたなら、静かでやさしい室内楽のような音楽がお好きなはず。"}, "magdalene": {"ko": "煙る炎の前のマグダラのマリア", "byKo": "ジョルジュ・ド・ラ・トゥール", "moodKo": "ひとつの蝋燭の瞑想", "tagKo": "フランス・バロック · 闇の中の蝋燭", "readKo": "頭蓋骨に手を置き、炎を見つめる女性。この絵に惹かれたなら、暗く静かで、長くとどまる音楽がお好みかも。"}, "lemons": {"ko": "レモンとオレンジとバラのある静物", "byKo": "フランシスコ・デ・スルバラン", "moodKo": "祭壇のように並ぶ果実", "tagKo": "スペイン・バロック · 祈りになった静物", "readKo": "黒い背景の前に、果実と花が捧げ物のように置かれています。この絵が好きなら、簡素で敬虔な音楽がお好きなはず。"}, "sheba": {"ko": "シバの女王の乗船", "byKo": "クロード・ロラン", "moodKo": "黄金色の船出", "tagKo": "フランス古典主義の風景 · 太陽に向かう港", "readKo": "太陽が正面から港を照らし、船は出発の準備をしています。この絵に惹かれたなら、温かく広がる荘厳な音楽が似合います。"}, "philosopher": {"ko": "瞑想する哲学者", "byKo": "レンブラント・ファン・レイン", "moodKo": "らせん階段の下の思索", "tagKo": "オランダ・バロック · 光と闇の渦", "readKo": "窓の光が老人を包み、階段は闇へと巻き上がっていきます。この絵が好きなら、深くゆっくりと考える音楽がお好きなはず。"}, "chocolate": {"ko": "チョコレートを運ぶ娘", "byKo": "ジャン＝エティエンヌ・リオタール", "moodKo": "慎重な足取り", "tagKo": "ロココのパステル · 澄んだ静けさ", "readKo": "カップが揺れないように歩く少女の横顔。この絵が気に入ったなら、澄んで端正な小品のような音楽が似合います。"}, "paul": {"ko": "聖パウロの回心", "byKo": "カラヴァッジョ", "moodKo": "馬の下に注ぐ光", "tagKo": "イタリア・バロック · 倒れた瞬間", "readKo": "落馬した男が両腕を広げて光を受けます。この絵に惹かれたなら、突然開けるドラマティックな音楽がお好きなはず。"}, "elevation": {"ko": "十字架昇架", "byKo": "ピーテル・パウル・ルーベンス", "moodKo": "全身で押し上げる力", "tagKo": "フランドル・バロック · 対角線の力", "readKo": "大勢が全力で十字架を斜めに起こします。この絵に惹かれたなら、重く押し進む壮大な音楽がお好きなはず。"}, "warconseq": {"ko": "戦争の結果", "byKo": "ピーテル・パウル・ルーベンス", "moodKo": "引き止められない戦争", "tagKo": "フランドル・バロック · 平和を訴える寓意", "readKo": "ヴィーナスが引き止めても、マルスは戦いへ歩み出します。この絵が響いたなら、華やかで悲痛な音楽が似合います。"}, "breda": {"ko": "ブレダの開城", "byKo": "ディエゴ・ベラスケス", "moodKo": "敗者を起こす手", "tagKo": "スペイン・バロック · 槍の森", "readKo": "勝者が、ひざまずこうとする敗将を押しとどめます。この絵に惹かれたなら、威厳と品格のある音楽がお好きなはず。"}, "wolfe": {"ko": "ウルフ将軍の死", "byKo": "ベンジャミン・ウェスト", "moodKo": "勝利の瞬間に倒れる将軍", "tagKo": "新古典主義 · 近代の軍服を着た英雄画", "readKo": "勝利の知らせが届いた瞬間、将軍は息を引き取ります。この絵に惹かれたなら、荘厳で哀悼する行進のような音楽がお好きなはず。"}, "coronation": {"ko": "ナポレオンの戴冠式", "byKo": "ジャック＝ルイ・ダヴィッド", "moodKo": "帝国の儀式", "tagKo": "新古典主義 · 巨大な国家儀式", "readKo": "皇帝みずから皇后に冠を授ける場面です。この絵が好きなら、金管が響く華やかで荘厳な音楽がお好きなはず。"}, "cythera": {"ko": "シテール島への巡礼", "byKo": "アントワーヌ・ヴァトー", "moodKo": "愛の島を去るとき", "tagKo": "ロココ · 雅宴画", "readKo": "恋人たちが名残惜しそうに愛の島から船へ向かいます。この絵が好きなら、優雅で少し名残惜しい音楽がお好きなはず。"}, "pompadour": {"ko": "ポンパドゥール夫人", "byKo": "フランソワ・ブーシェ", "moodKo": "本を手にした女主人", "tagKo": "ロココ · 絹とリボンの肖像", "readKo": "ドレスのバラとリボンのあいだで、手には本があります。この絵に惹かれたなら、華やかで品のある音楽が似合います。"}, "stolenkiss": {"ko": "盗まれた接吻", "byKo": "ジャン・オノレ・フラゴナール", "moodKo": "扉の陰の秘密", "tagKo": "ロココ · 最後のいたずら", "readKo": "隣の部屋に気づかれないよう、扉のそばで盗んだ口づけ。この絵に頬がゆるんだなら、いたずらっぽくきらめく音楽がお好きなはず。"}, "sheridan": {"ko": "シェリダン夫人", "byKo": "トマス・ゲインズバラ", "moodKo": "風の中に座る歌手", "tagKo": "ジョージ王朝の肖像画 · 風景と溶け合う人物", "readKo": "歌手だった女性が、森の風のような筆致で描かれています。この絵が好きなら、流れるようにやわらかな歌のような音楽が似合います。"}, "blueboy": {"ko": "青衣の少年", "byKo": "トマス・ゲインズバラ", "moodKo": "青い絹の自信", "tagKo": "ジョージ王朝の肖像画 · ヴァン・ダイクへのオマージュ", "readKo": "青い繻子の服の少年が堂々と立っています。この絵に惹かれたなら、輝く自信に満ちた音楽がお好きなはず。"}, "pinkie": {"ko": "ピンキー", "byKo": "トマス・ローレンス", "moodKo": "風を受ける少女", "tagKo": "ジョージ王朝の肖像画 · 空を背景に", "readKo": "ピンクのリボンが風になびき、少女が空の前に立っています。この絵が好きなら、軽快で爽やかな音楽が似合います。"}, "strawhat": {"ko": "麦わら帽子の自画像", "byKo": "エリザベート・ヴィジェ＝ルブラン", "moodKo": "陽光の中の画家", "tagKo": "新古典主義の肖像 · ルーベンスへの応答", "readKo": "パレットを持った画家が、野外の光の中で微笑んでいます。この絵に惹かれたなら、明るく澄んだ音楽がお好きなはず。"}, "charleshunt": {"ko": "狩猟場のチャールズ1世", "byKo": "アンソニー・ヴァン・ダイク", "moodKo": "さりげない威厳", "tagKo": "フランドル・バロック · 宮廷肖像の手本", "readKo": "王は馬を降りて無造作に立っているのに、威厳があふれます。この絵が好きなら、抑制された品格の音楽が似合います。"}, "gardenlove": {"ko": "愛の園", "byKo": "ピーテル・パウル・ルーベンス", "moodKo": "庭の祝宴", "tagKo": "フランドル・バロック · キューピッドが飛び交う宴", "readKo": "キューピッドたちが恋人たちのあいだを飛び回る庭。この絵に惹かれたなら、豊かで楽しい音楽がお好きなはず。"}, "oldsing": {"ko": "老いが歌えば若きは笛吹く", "byKo": "ヤン・ステーン", "moodKo": "家族総出のにぎやかな合唱", "tagKo": "オランダ・バロック · 教訓を秘めた風俗画", "readKo": "祖母は歌い、子どもは笛を吹き、家じゅうがにぎやかです。この絵に頬がゆるんだなら、軽快でユーモアのある音楽が似合います。"}, "toilette": {"ko": "ヴィーナスの化粧", "byKo": "フランソワ・ブーシェ", "moodKo": "ピンクの雲の中の女神", "tagKo": "ロココ · 寝室のための神話", "readKo": "鳩とキューピッドに囲まれたヴィーナスが髪を整えています。この絵が好きなら、甘く装飾的な音楽がお好きなはず。"}, "ageinnocence": {"ko": "無垢の時代", "byKo": "ジョシュア・レイノルズ", "moodKo": "手を組む子ども", "tagKo": "ジョージ王朝の肖像画 · 子どもの顔", "readKo": "草の上に座った子どもが手を組み、遠くを見ています。この絵に心が向いたなら、素朴でやさしい旋律がお好きなはず。"}, "arcadia": {"ko": "アルカディアの牧人たち", "byKo": "ニコラ・プッサン", "moodKo": "墓の前の問い", "tagKo": "フランス古典主義 · 楽園にもある死", "readKo": "羊飼いたちが楽園の墓に刻まれた文字を指でたどります。この絵が好きなら、澄んでいながら思索に誘う音楽が似合います。"}, "dancetime": {"ko": "時の音楽のダンス", "byKo": "ニコラ・プッサン", "moodKo": "めぐる季節", "tagKo": "フランス古典主義 · 時の寓意", "readKo": "四人が手を取り、時の竪琴に合わせて回ります。この絵に惹かれたなら、優雅にめぐる舞曲がお好きなはず。"}, "isaac": {"ko": "イサクとリベカの結婚のある風景", "byKo": "クロード・ロラン", "moodKo": "理想郷の午後", "tagKo": "フランス古典主義の風景 · 理想の自然", "readKo": "木と川と陽光が完璧に配された風景の中の小さな宴。この絵が好きなら、広く穏やかな牧歌的音楽が似合います。"}, "paris": {"ko": "パリスの審判", "byKo": "ピーテル・パウル・ルーベンス", "moodKo": "黄金のりんごの選択", "tagKo": "フランドル・バロック · 三人の女神", "readKo": "羊飼いが三人の女神のひとりにりんごを渡そうとしています。この絵に惹かれたなら、豊かで官能的な音楽がお好きなはず。"}, "bacchus": {"ko": "バッコスとアリアドネの凱旋", "byKo": "アンニーバレ・カラッチ", "moodKo": "神々の行列", "tagKo": "イタリア・バロック · ファルネーゼ宮の天井画", "readKo": "神々の車が音楽と踊りを引き連れて通り過ぎます。この絵が好きなら、祝祭のような華やかな音楽が似合います。"}, "atalanta": {"ko": "アタランテとヒッポメネス", "byKo": "グイド・レーニ", "moodKo": "黄金のりんごと競走", "tagKo": "イタリア・バロック · 踊るような競走", "readKo": "走っていた女性が身をかがめて黄金のりんごを拾います。この絵に惹かれたなら、優雅に動く音楽がお好きなはず。"}, "venustriumph": {"ko": "ヴィーナスの勝利", "byKo": "フランソワ・ブーシェ", "moodKo": "海の上のピンクの祝祭", "tagKo": "ロココ · 波と布の渦", "readKo": "海の神々が布を広げてヴィーナスを迎えます。この絵が好きなら、きらめき波打つ音楽が似合います。"}, "graces": {"ko": "三美神", "byKo": "ジャン＝バティスト・ルニョー", "moodKo": "寄り添う三人", "tagKo": "新古典主義 · 彫刻のような優美", "readKo": "三人の女神が互いの肩を抱き、静かに立っています。この絵に惹かれたなら、均整のとれた透明な音楽がお好きなはず。"}, "ossian": {"ko": "フランスの英雄たちの霊を迎えるオシアン", "byKo": "アンヌ＝ルイ・ジロデ", "moodKo": "亡霊たちの宴", "tagKo": "新古典主義 · 夢と伝説", "readKo": "月光の中、戦士たちの霊が伝説の詩人を迎えます。この絵に惹かれたなら、神秘的で壮大な音楽がお好きなはず。"}, "oedipus": {"ko": "オイディプスとスフィンクス", "byKo": "ジャン＝オーギュスト＝ドミニク・アングル", "moodKo": "謎への答え", "tagKo": "新古典主義 · 神話の中の対話", "readKo": "青年がスフィンクスの謎に指で答えます。この絵が好きなら、問いかけるような音楽が似合います。"}, "spinners": {"ko": "織女たち", "byKo": "ディエゴ・ベラスケス", "moodKo": "現実の奥の神話", "tagKo": "スペイン・バロック · 絵の中の絵", "readKo": "手前では糸を紡ぎ、奥の明るい部屋では神話が繰り広げられます。この絵に惹かれたなら、幾重にも隠れた構造の音楽がお好きなはず。"}, "danae": {"ko": "ダナエ", "byKo": "レンブラント・ファン・レイン", "moodKo": "黄金の訪れ", "tagKo": "オランダ・バロック · 光になった神", "readKo": "ベッドの上の女性が、近づく光に手を上げます。この絵が好きなら、温かく官能的な音楽が似合います。"}, "window": {"ko": "窓辺の女", "byKo": "カスパー・ダーヴィト・フリードリヒ", "moodKo": "窓の外を見る後ろ姿", "tagKo": "ドイツ・ロマン主義 · 内と外", "readKo": "暗い部屋から女性が川とマストを見やります。この絵に惹かれたなら、静かに恋しがる音楽がお好きなはず。"}, "moonrise": {"ko": "海辺の月の出", "byKo": "カスパー・ダーヴィト・フリードリヒ", "moodKo": "月を待つ人々", "tagKo": "ドイツ・ロマン主義 · 夕べの敬虔", "readKo": "岩の上の三人が、帰る船と昇る月を見つめます。この絵が好きなら、ほのかな夜の音楽が似合います。"}, "twomen": {"ko": "月を眺めるふたりの男", "byKo": "カスパー・ダーヴィト・フリードリヒ", "moodKo": "言葉のない道連れ", "tagKo": "ドイツ・ロマン主義 · 月と老木", "readKo": "倒れた木のそばで、ふたりが三日月を眺めます。この絵に惹かれたなら、静かで神秘的な夜の音楽がお好きなはず。"}, "wivenhoe": {"ko": "ウィヴンホー・パーク", "byKo": "ジョン・コンスタブル", "moodKo": "晴れた日の領地", "tagKo": "イギリス・ロマン主義 · ありのままの風景", "readKo": "雲、池、牛の群れが真昼の空気の中にあります。この絵が心地よいなら、澄んだ牧歌的音楽が似合います。"}, "cornfield": {"ko": "麦畑", "byKo": "ジョン・コンスタブル", "moodKo": "田舎道の夏", "tagKo": "イギリス・ロマン主義 · 故郷の道", "readKo": "少年が腹ばいになって小川の水を飲む真夏の小道。この絵が好きなら、素朴で郷愁を誘う音楽がお好きなはず。"}, "mortefontaine": {"ko": "モルトフォンテーヌの思い出", "byKo": "カミーユ・コロー", "moodKo": "霧の中の記憶", "tagKo": "フランス・ロマン主義の風景 · 銀色の霧", "readKo": "銀色の霧の中で、子どもたちが枝を引っぱっています。この絵に惹かれたなら、おぼろでやわらかな音楽が似合います。"}, "angelus": {"ko": "晩鐘", "byKo": "ジャン＝フランソワ・ミレー", "moodKo": "夕べの鐘の祈り", "tagKo": "バルビゾン派 · 畑の信仰", "readKo": "夕暮れの畑で、夫婦が鐘の音に頭を垂れます。この絵が心に残ったなら、敬虔で素朴な音楽がお好きなはず。"}, "norham": {"ko": "ノラム城、日の出", "byKo": "J・M・W・ターナー", "moodKo": "光に溶ける城", "tagKo": "イギリス・ロマン主義 · 色だけが残る風景", "readKo": "城と川が朝の光の中にほとんど溶けています。この絵が好きなら、輪郭がにじむ輝く音楽がお好きなはず。"}, "studio": {"ko": "アトリエのフリードリヒ", "byKo": "ゲオルク・フリードリヒ・ケルスティング", "moodKo": "がらんとした部屋の集中", "tagKo": "ビーダーマイヤー · 画家のアトリエ", "readKo": "窓ひとつだけ開いた部屋で、画家が椅子にもたれて絵を見ています。この絵に惹かれたなら、ミニマルで集中した音楽が似合います。"}, "stages": {"ko": "人生の段階", "byKo": "カスパー・ダーヴィト・フリードリヒ", "moodKo": "五隻の船", "tagKo": "ドイツ・ロマン主義 · 人生の終わりを見る風景", "readKo": "浜辺の五人と海の五隻の船が互いに似ています。この絵が響いたなら、温かくも別れの気配がある音楽がお好きなはず。"}, "lonetree": {"ko": "朝の光の村の風景(孤独な木)", "byKo": "カスパー・ダーヴィト・フリードリヒ", "moodKo": "ひとり立つ木", "tagKo": "ドイツ・ロマン主義 · 野の老木", "readKo": "広い野原の真ん中に老木が一本、その下に羊飼い。この絵が好きなら、広く静かな音楽が似合います。"}, "bookworm": {"ko": "本の虫", "byKo": "カール・シュピッツヴェーク", "moodKo": "はしごの上の読書", "tagKo": "ビーダーマイヤー · 書斎のユーモア", "readKo": "はしごの上で本に夢中になり、ほかのことを忘れた老人。この絵に頬がゆるんだなら、機知に富んだやさしい音楽がお好きなはず。"}, "ninthwave": {"ko": "第九の波", "byKo": "イヴァン・アイヴァゾフスキー", "moodKo": "嵐のあとの大波", "tagKo": "ロシア・ロマン主義 · 輝く海", "readKo": "難破した人々がマストにしがみつき、陽の光を受けます。この絵に惹かれたなら、荒れ狂って光で終わる音楽がお好きなはず。"}, "steamboat": {"ko": "吹雪、港口沖の蒸気船", "byKo": "J・M・W・ターナー", "moodKo": "渦の真ん中", "tagKo": "イギリス・ロマン主義 · マストに縛られて見た嵐", "readKo": "一隻の船が雪と波の渦に呑み込まれます。この絵が好きなら、吹き荒れる管弦楽がお好きなはず。"}, "arabhorses": {"ko": "厩舎で闘うアラブ馬", "byKo": "ウジェーヌ・ドラクロワ", "moodKo": "後ろ脚で立つ二頭", "tagKo": "ロマン主義 · 馬と色彩", "readKo": "二頭の馬が厩舎の中でぶつかり合います。この絵にわくわくしたなら、荒々しく力強い音楽が似合います。"}, "shipwreck": {"ko": "難破船", "byKo": "J・M・W・ターナー", "moodKo": "ひっくり返る波", "tagKo": "イギリス・ロマン主義 · 海の崇高", "readKo": "小舟が山のような波のあいだで傾きます。この絵に惹かれたなら、激しく押し寄せる音楽がお好きなはず。"}, "crusaders": {"ko": "十字軍のコンスタンティノープル入城", "byKo": "ウジェーヌ・ドラクロワ", "moodKo": "征服の華やかな悲劇", "tagKo": "ロマン主義 · 歴史画の色彩", "readKo": "騎士たちが町へ入り、足もとで人々が懇願します。この絵が響いたなら、壮大でほろ苦い音楽が似合います。"}, "avalanche": {"ko": "アルプスの雪崩", "byKo": "フィリップ・ジェームズ・ド・ラウザーバーグ", "moodKo": "崩れ落ちる山", "tagKo": "ロマン主義 · 自然の崇高", "readKo": "山から雪と岩が降り注ぎ、人々は逃げまどいます。この絵に惹かれたなら、圧倒的な管弦楽がお好きなはず。"}, "galilee": {"ko": "嵐の中で眠るキリスト", "byKo": "ウジェーヌ・ドラクロワ", "moodKo": "嵐の中の眠り", "tagKo": "ロマン主義 · 揺れる舟", "readKo": "弟子たちは嵐にうろたえ、キリストだけが眠っています。この絵に惹かれたなら、荒々しい音の中の静けさがお好きなはず。"}, "trafalgar": {"ko": "トラファルガーの海戦", "byKo": "J・M・W・ターナー", "moodKo": "煙と帆の戦い", "tagKo": "イギリス・ロマン主義 · 海の歴史画", "readKo": "マストが倒れ、煙が海を覆います。この絵が好きなら、壮大な戦いのような音楽がお好きなはず。"}, "campaign": {"ko": "1814年、フランス戦役", "byKo": "エルネスト・メソニエ", "moodKo": "雪の中を行軍する軍", "tagKo": "ロマン主義の歴史画 · 敗北の行軍", "readKo": "雪の道を皇帝と軍が黙々と進みます。この絵に惹かれたなら、重く前進する行進曲がお好きなはず。"}, "colossus": {"ko": "巨人", "byKo": "フランシスコ・デ・ゴヤ(推定)", "moodKo": "雲の上の巨人", "tagKo": "ロマン主義 · 戦争の恐怖", "readKo": "巨人が雲の上にそびえ、下では人々が散り散りになります。この絵に心をつかまれたなら、迫りくる威圧的な音楽がお好きなはず。"}, "oakwood": {"ko": "樫の森の修道院", "byKo": "カスパー・ダーヴィト・フリードリヒ", "moodKo": "廃墟へ向かう葬列", "tagKo": "ドイツ・ロマン主義 · 冬の廃墟", "readKo": "葉の落ちた樫の木のあいだを、修道士たちが棺を担いで進みます。この絵に惹かれたなら、冷たく敬虔な音楽が似合います。"}, "isledead": {"ko": "死の島", "byKo": "アルノルト・ベックリン", "moodKo": "白い姿を乗せた舟", "tagKo": "後期ロマン主義 · 象徴主義の入口", "readKo": "白い姿を乗せた小舟が糸杉の島へ近づきます。この絵に惹かれたなら、ゆっくりと重い音楽がお好きなはず。"}, "wrath": {"ko": "神の大いなる怒りの日", "byKo": "ジョン・マーティン", "moodKo": "崩れ落ちる世界", "tagKo": "イギリス・ロマン主義 · 終末のパノラマ", "readKo": "山が裂け、都市が深淵へ落ちていきます。この絵に圧倒されたなら、巨大な合唱と管弦楽がお好きなはず。"}, "witches": {"ko": "三人の魔女", "byKo": "ヘンリー・フュースリ", "moodKo": "唇に指を当てた三つの顔", "tagKo": "ゴシック・ロマン主義 · 『マクベス』", "readKo": "三人の魔女がそろって唇に指を当て、同じ方を見ています。この絵が好きなら、謎めいた暗い音楽がお好きなはず。"}, "deluge": {"ko": "大洪水", "byKo": "フランシス・ダンビー", "moodKo": "水に沈む最後の日", "tagKo": "イギリス・ロマン主義 · 聖書の災厄", "readKo": "黒い水が満ち、人々が岩にしがみつきます。この絵に惹かれたなら、悲劇的な大曲がお好きなはず。"}, "princes": {"ko": "ロンドン塔の王子たち", "byKo": "ポール・ドラローシュ", "moodKo": "扉の下の影", "tagKo": "ロマン主義の歴史画 · 悲劇の直前", "readKo": "ふたりの少年が扉の下から漏れる光を見つめています。この絵が響いたなら、静かに締めつけてくる音楽がお好きなはず。"}, "hylas": {"ko": "ヒュラスとニンフたち", "byKo": "ジョン・ウィリアム・ウォーターハウス", "moodKo": "水の中へ誘う手", "tagKo": "ラファエル前派以後 · 池の誘惑", "readKo": "ニンフたちが水辺の青年を静かに引き寄せます。この絵に惹かれたなら、波のように神秘的な音楽がお好きなはず。"}, "huguenot": {"ko": "ユグノー教徒", "byKo": "ジョン・エヴァレット・ミレー", "moodKo": "別れの前の抱擁", "tagKo": "ラファエル前派 · 塀の前の恋人たち", "readKo": "女性が恋人の腕に目印を結ぼうとし、彼はそれを拒みます。この絵が心に残ったなら、切ない旋律がお好きなはず。"}, "proserpine": {"ko": "プロセルピナ", "byKo": "ダンテ・ゲイブリエル・ロセッティ", "moodKo": "ざくろを持つ女神", "tagKo": "ラファエル前派 · 深い緑と赤い果実", "readKo": "ざくろを手にした女神が、地上の光を恋しがって顔をそむけます。この絵に惹かれたなら、濃く恋しい音楽が似合います。"}, "beatrix": {"ko": "ベアタ・ベアトリクス", "byKo": "ダンテ・ゲイブリエル・ロセッティ", "moodKo": "恍惚の閉じた瞳", "tagKo": "ラファエル前派 · ダンテと愛の死", "readKo": "光の中で目を閉じた女性と、ケシをくわえた鳥。この絵が好きなら、夢のような音楽がお好きなはず。"}, "goldenstairs": {"ko": "黄金の階段", "byKo": "エドワード・バーン＝ジョーンズ", "moodKo": "階段を降りる合奏", "tagKo": "ラファエル前派 · 音楽の行列", "readKo": "楽器を手にした女性たちが果てしない階段を降りてきます。この絵に惹かれたなら、やわらかく流れる音楽がお好きなはず。"}, "flamingjune": {"ko": "燃え上がる六月", "byKo": "フレデリック・レイトン", "moodKo": "緋色の昼寝", "tagKo": "ヴィクトリア朝の古典主義 · 真夏の眠り", "readKo": "緋色の布に包まれた女性が、真昼の暑さの中で眠っています。この絵が好きなら、温かくけだるい音楽が似合います。"}, "aprillove": {"ko": "四月の恋", "byKo": "アーサー・ヒューズ", "moodKo": "蔦の下の涙", "tagKo": "ラファエル前派 · 初恋の揺らぎ", "readKo": "紫のドレスの少女が蔦の下で涙をこらえています。この絵に惹かれたなら、繊細ではかない音楽がお好きなはず。"}, "lastengland": {"ko": "イングランドの見納め", "byKo": "フォード・マドックス・ブラウン", "moodKo": "去りゆく船上の夫婦", "tagKo": "ラファエル前派 · 移民の別れ", "readKo": "船の上で夫婦が手を取り、故郷に背を向けます。この絵が響いたなら、別れの歌のような音楽がお好きなはず。"}, "esther": {"ko": "エステルの化粧", "byKo": "テオドール・シャセリオー", "moodKo": "髪をほどく王妃", "tagKo": "ロマン主義 · オリエントの官能", "readKo": "女性が長い髪をほどき、侍女たちが装身具を差し出します。この絵に惹かれたなら、異国的で官能的な音楽が似合います。"}, "atala": {"ko": "アタラの埋葬", "byKo": "アンヌ＝ルイ・ジロデ", "moodKo": "洞窟の中の別れ", "tagKo": "ロマン主義 · シャトーブリアンの小説", "readKo": "恋人と修道士が洞窟で少女を葬ります。この絵に心を動かされたなら、悲しく美しい音楽がお好きなはず。"}, "belledame": {"ko": "つれなき美女", "byKo": "ジョン・ウィリアム・ウォーターハウス", "moodKo": "髪の罠", "tagKo": "ラファエル前派以後 · キーツの詩", "readKo": "森の女性が髪で騎士を引き寄せます。この絵に惹かれたなら、おとぎ話のようで危うい音楽がお好きなはず。"}, "eugenie": {"ko": "侍女たちに囲まれた皇后ウジェニー", "byKo": "フランツ・ヴィンターハルター", "moodKo": "森の中の絹の花園", "tagKo": "第二帝政の宮廷肖像 · ロマンの華やかさ", "readKo": "白いドレスの皇后と侍女たちが、森の中に花のように座っています。この絵が好きなら、華やかで歌うワルツのような音楽がお好きなはず。"}, "athens": {"ko": "アテネの学堂", "byKo": "ラファエロ・サンティ", "moodKo": "思索が集まる広場", "tagKo": "イタリア・ルネサンス · 思索の大聖堂", "readKo": "古代の哲学者たちがアーチの下に集まり語り合います。この絵が好きなら、秩序正しく壮大に積み上げた音楽がお好みかも。"}, "adam": {"ko": "アダムの創造", "byKo": "ミケランジェロ・ブオナローティ", "moodKo": "触れる直前の指先", "tagKo": "イタリア・ルネサンス · 天井に描いた始まり", "readKo": "神とアダムの指先が触れる直前で止まっています。この絵が好きなら、力強く立ち上がる荘厳な音楽がお好みかも。"}, "lastsupper": {"ko": "最後の晩餐", "byKo": "レオナルド・ダ・ヴィンチ", "moodKo": "ひと言が広げた波紋", "tagKo": "イタリア・ルネサンス · 遠近法の食卓", "readKo": "イエスのひと言に弟子たちがざわめき、互いを見交わします。この絵が好きなら、敬虔で緊張感の流れる音楽がお好みかも。"}, "belshazzar": {"ko": "ベルシャザルの酒宴", "byKo": "レンブラント・ファン・レイン", "moodKo": "壁に現れた文字", "tagKo": "オランダ・バロック · 光で書かれた警告", "readKo": "豪華な宴の最中、壁に光る文字が現れ、王が凍りつきます。この絵が好きなら、突然の展開がある劇的な音楽がお好みかも。"}, "emmaus": {"ko": "エマオの晩餐", "byKo": "カラヴァッジョ", "moodKo": "気づいた瞬間", "tagKo": "イタリア・バロック · 食卓の明暗", "readKo": "一緒に食事をしていた見知らぬ人が誰かに気づいた瞬間、弟子たちが驚いて腕を広げます。この絵が好きなら、明暗がくっきりして瞬間が生きている音楽がお好みかも。"}, "arcole": {"ko": "アルコレ橋のボナパルト", "byKo": "アントワーヌ＝ジャン・グロ", "moodKo": "旗を掲げた若き将軍", "tagKo": "新古典主義 · 若き英雄の肖像", "readKo": "二十七歳のナポレオンが旗を手に振り返りながら前へ進みます。この絵が好きなら、力強く前へ進む音楽がお好みかも。"}, "titianbacchus": {"ko": "バッカスとアリアドネ", "byKo": "ティツィアーノ・ヴェチェッリオ", "moodKo": "ひと目で飛び降りた神", "tagKo": "ヴェネツィア・ルネサンス · 色彩の祝祭", "readKo": "アリアドネを見たバッカスが車から飛び降り、仲間たちがにぎやかに続きます。この絵が好きなら、明るく浮き立つ祝祭のような音楽がお好みかも。"}, "babel": {"ko": "バベルの塔", "byKo": "ピーテル・ブリューゲル", "moodKo": "空まで積む野心", "tagKo": "北方ルネサンス · 果てなく積んだ塔", "readKo": "大勢の人が空に届きそうな塔を一層ずつ積み上げています。この絵が好きなら、層を重ねて巨大になっていく音楽がお好みかも。"}, "monalisa": {"ko": "モナ・リザ", "byKo": "レオナルド・ダ・ヴィンチ", "moodKo": "読みきれない微笑み", "tagKo": "イタリア・ルネサンス · 霧のように溶ける輪郭", "readKo": "霧のように柔らかな輪郭の中に、読みきれない微笑みがとどまります。この絵が好きなら、穏やかで余韻の長い音楽がお好みかも。"}, "delaware": {"ko": "デラウェア川を渡るワシントン", "byKo": "エマヌエル・ロイツェ", "moodKo": "氷の川を切り進む舟", "tagKo": "アメリカ・ロマン主義 · 歴史の一場面", "readKo": "荒れる冬の川の氷の間を、ワシントンが舳先に立って進みます。この絵が好きなら、逆境を突き進む英雄的な音楽がお好みかも。"}, "starrynight": {"ko": "星月夜", "byKo": "フィンセント・ファン・ゴッホ", "moodKo": "渦巻く夜空", "tagKo": "ポスト印象派 · うねる筆致", "readKo": "眠る村の上で星と風が渦を巻き、夜空をかき回します。この絵が好きなら、幻想的でうねる音楽がお好みかも。"}, "crows": {"ko": "カラスのいる麦畑", "byKo": "フィンセント・ファン・ゴッホ", "moodKo": "嵐の前の麦畑", "tagKo": "ポスト印象派 · 最後の夏の風景", "readKo": "暗い空の下で麦畑がうねり、カラスの群れが飛び立ちます。この絵が好きなら、不安げに激しく揺れる音楽がお好みかも。"}, "etoile": {"ko": "踊りの花形（エトワール）", "byKo": "エドガー・ドガ", "moodKo": "スポットライトの一回転", "tagKo": "印象派 · 舞台の一瞬", "readKo": "照明を浴びたバレリーナが舞台の前へすべるように舞い上がります。この絵が好きなら、軽やかに回り跳ねる舞曲がお好みかも。"}, "lazare": {"ko": "サン＝ラザール駅", "byKo": "クロード・モネ", "moodKo": "蒸気の中に入る汽車", "tagKo": "印象派 · 蒸気と光", "readKo": "ガラス屋根の下、汽車が白い蒸気を吐きながら駅に入ってきます。この絵が好きなら、走るリズムが生きた音楽がお好みかも。"}, "scream": {"ko": "叫び", "byKo": "エドヴァルド・ムンク", "moodKo": "赤い空の下の叫び", "tagKo": "表現主義 · 心の不安の風景", "readKo": "赤く染まった空の下、橋の上の人物が耳をふさいで叫びます。この絵が好きなら、不安で緊張感のある音楽がお好みかも。"}, "wanderer": {"ko": "雲海の上の旅人", "byKo": "カスパー・ダーヴィト・フリードリヒ", "moodKo": "霧の向こうを見る後ろ姿", "tagKo": "ドイツ・ロマン主義 · 崇高な風景", "readKo": "岩の上に立つひとりの人が、果てしない霧の海を見下ろします。この絵が好きなら、孤独で雄大に広がる音楽がお好みかも。"}, "mother": {"ko": "灰色と黒のアレンジメント第1番（画家の母）", "byKo": "ジェームズ・マクニール・ホイッスラー", "moodKo": "灰色の沈黙", "tagKo": "唯美主義 · 色で組んだ肖像", "readKo": "黒い服の母が灰色の壁の前に横顔で静かに座っています。この絵が好きなら、節度があり静かに沈んだ音楽がお好みかも。"}, "potato": {"ko": "ジャガイモを食べる人々", "byKo": "フィンセント・ファン・ゴッホ", "moodKo": "ランプの下の素朴な夕食", "tagKo": "オランダ写実主義 · 農民たちの肖像", "readKo": "薄暗いランプの下、農家の家族がジャガイモの夕食を分け合います。この絵が好きなら、素朴で重く響く音楽がお好みかも。"}, "sleepreason": {"ko": "理性の眠りは怪物を生む", "byKo": "フランシスコ・デ・ゴヤ", "moodKo": "眠る頭上の羽ばたき", "tagKo": "スペイン・ロマン主義 · 版画集「ロス・カプリチョス」", "readKo": "机に伏して眠る人の背後に、フクロウとコウモリが集まってきます。この絵が好きなら、神秘的で少し不気味な音楽がお好みかも。"}, "burial": {"ko": "オルナンの埋葬", "byKo": "ギュスターヴ・クールベ", "moodKo": "村じゅうが並んだ葬儀", "tagKo": "フランス写実主義 · 普通の人々の歴史画", "readKo": "田舎の村人たちが一列に並び、墓の前に静かに立っています。この絵が好きなら、厳かで淡々とした追悼の音楽がお好みかも。"}}, "types": {"radiant": ["静かな光を集める人", "今日は華やかさより、静かに輝く瞬間に心がひかれる日ですね。", "騒がしい場面より、光が一点にとどまる静けさを先に見つけたから。"], "grand": ["舞台の真ん中の指揮者", "今日は大きく壮大な場面からエネルギーをもらいたい日ですね。", "大勢の人と光がひとつの画面で動く壮大さに、まず目が行ったから。"], "mercy": ["温かな慰めを差し出す人", "今日は心をなでてくれる場面に長くとどまりたい日ですね。", "劇的な事件より、赦しと慰めが交わる瞬間を先に見たから。"], "dramatic": ["明暗を楽しむ演出家", "今日はくっきりした対比と決定的な瞬間に惹かれる日ですね。", "闇に突然差し込む光、その緊張感に惹かれたから。"], "joy": ["きらめくエネルギーの持ち主", "今日は明るく軽やかな空気に、すぐ笑顔になる日ですね。", "重さより、機知と生気にあふれた表情を選んだから。"], "heroic": ["決断のリーダー", "今日は揺るがない意志と秩序から力をもらいたい日ですね。", "まっすぐな線ときっぱりした身ぶりにあふれた場面を選んだから。"], "solemn": ["深く思索する哲学者", "今日は悲しみさえ落ち着いて見つめたい日ですね。", "感情を爆発させるより、節度の中に込めた場面に惹かれたから。"], "elegant": ["優雅を知る目利き", "今日はなめらかで洗練された美しさが目に留まる日ですね。", "線一本、曲線ひとつまで整えられた絵に目が行ったから。"], "calm": ["平穏を守る人", "今日は対立よりバランスと平穏を求めたい日ですね。", "騒ぎが静まり、すべてが収まるべき所に収まる場面を選んだから。"], "galant": ["軽やかにきらめく社交家", "今日は優雅でいて少し茶目っ気のある雰囲気が心地よい日ですね。", "まじめさより、さわやかさとときめきがにじむ場面に惹かれたから。"], "tender": ["やさしい夢想家", "今日は繊細でやさしい感情に心が開かれる日ですね。", "大きな出来事より、静かでやわらかな瞬間を先に見つけたから。"], "love": ["恋に本気のロマンチスト", "今日は愛と恋しさに心が大きく動く日ですね。", "美しい風景より、ふたりのあいだに流れる感情を先に見たから。"], "tragic": ["闇をまっすぐ見つめる人", "今日は痛みのある物語からも目をそらしたくない日ですね。", "心地よい場面より、重く正直な感情がこもった絵を選んだから。"], "opulent": ["嵐を楽しむ探検家", "今日は強烈で圧倒的なものにスリルを感じたい日ですね。", "色と動きがあふれる渦のような場面に惹かれたから。"], "dread": ["夜の語り部", "今日は神秘的でちょっと不気味な物語に耳をそばだてたくなる日ですね。", "明るい場面より、影と謎が宿る絵を選んだから。"], "dash": ["止まらない疾走者", "今日はスピードと推進力で生きている実感を得たい日ですね。", "止まった場面より、前へ駆け出す動きに目が行ったから。"], "fantasy": ["夢と神話の旅人", "今日は現実の向こうの美しい物語に浸りたい日ですね。", "神話やおとぎ話のような幻想的な光の場面を選んだから。"], "intimate": ["温かな居間のあるじ", "今日は素朴で温かな瞬間に幸せを見つけたい日ですね。", "壮大な舞台より、人のぬくもりがある場面に惹かれたから。"]}, "comp": {"bach": ["ヨハン・ゼバスティアン・バッハ", "バッハ"], "handel": ["ゲオルク・フリードリヒ・ヘンデル", "ヘンデル"], "vivaldi": ["アントニオ・ヴィヴァルディ", "ヴィヴァルディ"], "purcell": ["ヘンリー・パーセル", "パーセル"], "scarlatti": ["ドメニコ・スカルラッティ", "スカルラッティ"], "haydn": ["ヨーゼフ・ハイドン", "ハイドン"], "mozart": ["ヴォルフガング・アマデウス・モーツァルト", "モーツァルト"], "beethoven": ["ルートヴィヒ・ヴァン・ベートーヴェン", "ベートーヴェン"], "gluck": ["クリストフ・ヴィリバルト・グルック", "グルック"], "clementi": ["ムツィオ・クレメンティ", "クレメンティ"], "schubert": ["フランツ・シューベルト", "シューベルト"], "chopin": ["フレデリック・ショパン", "ショパン"], "schumann": ["ロベルト・シューマン", "シューマン"], "liszt": ["フランツ・リスト", "リスト"], "brahms": ["ヨハネス・ブラームス", "ブラームス"], "tchaikovsky": ["ピョートル・イリイチ・チャイコフスキー", "チャイコフスキー"], "wagner": ["リヒャルト・ワーグナー", "ワーグナー"], "mendelssohn": ["フェリックス・メンデルスゾーン", "メンデルスゾーン"], "boccherini": ["ルイジ・ボッケリーニ", "ボッケリーニ"], "dvorak": ["アントニン・ドヴォルザーク", "ドヴォルザーク"], "verdi": ["ジュゼッペ・ヴェルディ", "ヴェルディ"], "bizet": ["ジョルジュ・ビゼー", "ビゼー"], "rossini": ["ジョアキーノ・ロッシーニ", "ロッシーニ"], "mascagni": ["ピエトロ・マスカーニ", "マスカーニ"], "leoncavallo": ["ルッジェーロ・レオンカヴァッロ", "レオンカヴァッロ"], "massenet": ["ジュール・マスネ", "マスネ"], "puccini": ["ジャコモ・プッチーニ", "プッチーニ"], "smetana": ["ベドルジハ・スメタナ", "スメタナ"], "grieg": ["エドヴァルド・グリーグ", "グリーグ"], "rachmaninoff": ["セルゲイ・ラフマニノフ", "ラフマニノフ"], "glinka": ["ミハイル・グリンカ", "グリンカ"], "debussy": ["クロード・ドビュッシー", "ドビュッシー"], "ravel": ["モーリス・ラヴェル", "ラヴェル"], "pleyel": ["イグナツ・プレイエル", "プレイエル"]}, "impress": {"Claude Debussy": "クロード・ドビュッシー", "Maurice Ravel": "モーリス・ラヴェル", "Erik Satie": "エリック・サティ", "Gabriel Fauré": "ガブリエル・フォーレ", "Paul Dukas": "ポール・デュカス", "Frederick Delius": "フレデリック・ディーリアス", "Ottorino Respighi": "オットリーノ・レスピーギ", "Charles Tomlinson Griffes": "チャールズ・トムリンソン・グリフス"}, "titles": {"A Midsummer Night’s Dream — Nocturne": "真夏の夜の夢 — 夜想曲", "A Midsummer Night’s Dream — Scherzo, Op. 61": "真夏の夜の夢 — スケルツォ Op. 61", "An die Musik, D. 547": "音楽に寄せて D. 547", "Ave verum corpus, K. 618": "アヴェ・ヴェルム・コルプス K. 618", "Brandenburg Concerto No. 3 in G major, BWV 1048 — I. Allegro": "ブランデンブルク協奏曲第3番 ト長調 BWV 1048 — 第1楽章", "Cantata BWV 147 — “Jesu, Joy of Man’s Desiring”": "カンタータ BWV 147 — 「主よ、人の望みの喜びよ」", "Cello Concerto No. 1 in C major — II. Adagio": "チェロ協奏曲第1番 ハ長調 — 第2楽章 アダージョ", "Cello Suite No. 1 in G major, BWV 1007 — Prélude": "無伴奏チェロ組曲第1番 ト長調 BWV 1007 — 前奏曲", "Clarinet Concerto, K. 622 — II. Adagio": "クラリネット協奏曲 K. 622 — 第2楽章 アダージョ", "Clarinet Quintet in A major, K. 581 — II. Larghetto": "クラリネット五重奏曲 イ長調 K. 581 — 第2楽章 ラルゲット", "Concerto for Two Violins in D minor, BWV 1043 — I. Vivace": "2つのヴァイオリンのための協奏曲 ニ短調 BWV 1043 — 第1楽章", "Concerto for Two Violins in D minor, BWV 1043 — II. Largo ma non troppo": "2つのヴァイオリンのための協奏曲 ニ短調 BWV 1043 — 第2楽章", "Dido and Aeneas — “When I am laid in earth” (Dido’s Lament)": "ディドとエネアス — 「私が土に横たえられるとき」(ディドの嘆き)", "Die Walküre — “Ride of the Valkyries”": "ワルキューレ — 「ワルキューレの騎行」", "Divertimento in D major, K. 136 — I. Allegro": "ディヴェルティメント ニ長調 K. 136 — 第1楽章", "Egmont Overture, Op. 84": "序曲「エグモント」Op. 84", "Eine kleine Nachtmusik, K. 525 — I. Allegro": "アイネ・クライネ・ナハトムジーク K. 525 — 第1楽章", "Erlkönig, D. 328": "魔王 D. 328", "Francesca da Rimini, Op. 32": "フランチェスカ・ダ・リミニ Op. 32", "Funérailles, S. 173 No. 7": "葬送 S. 173 第7曲", "Gloria in D major, RV 589 — I. Gloria in excelsis Deo": "グローリア ニ長調 RV 589 — 第1曲", "Goldberg Variations, BWV 988 — Aria": "ゴルトベルク変奏曲 BWV 988 — アリア", "Götterdämmerung — Siegfried’s Funeral March": "神々の黄昏 — ジークフリートの葬送行進曲", "Horn Concerto No. 4 in E-flat major, K. 495 — III. Rondo: Allegro vivace": "ホルン協奏曲第4番 変ホ長調 K. 495 — 第3楽章 ロンド", "Hungarian Dance No. 5 in G minor": "ハンガリー舞曲第5番 ト短調", "Hungarian Rhapsody No. 2, S. 244": "ハンガリー狂詩曲第2番 S. 244", "Impromptu in G-flat major, D. 899 No. 3": "即興曲 変ト長調 D. 899 第3番", "Intermezzo in A major, Op. 118 No. 2": "間奏曲 イ長調 Op. 118 第2番", "Intermezzo in E-flat minor, Op. 118 No. 6": "間奏曲 変ホ短調 Op. 118 第6番", "Keyboard Sonata in D minor, K. 141": "鍵盤ソナタ ニ短調 K. 141", "Kinderszenen, Op. 15 — No. 7 “Träumerei”": "子供の情景 Op. 15 — 第7曲「トロイメライ」", "Liebesträume No. 3 in A-flat major, S. 541": "愛の夢 第3番 変イ長調 S. 541", "Mephisto Waltz No. 1, S. 514": "メフィスト・ワルツ第1番 S. 514", "Messiah — Hallelujah Chorus": "メサイア — ハレルヤ・コーラス", "Messiah — “I know that my Redeemer liveth”": "メサイア — 「わたしは知る、わが贖い主は生きておられる」", "Music for the Royal Fireworks — Overture, HWV 351": "王宮の花火の音楽 — 序曲 HWV 351", "Nocturne in E-flat major, Op. 9 No. 2": "夜想曲 変ホ長調 Op. 9 第2番", "Orchestral Suite No. 2 in B minor, BWV 1067 — VII. Badinerie": "管弦楽組曲第2番 ロ短調 BWV 1067 — バディネリ", "Orchestral Suite No. 3 in D major, BWV 1068 — II. Air (“Air on the G String”)": "管弦楽組曲第3番 ニ長調 BWV 1068 — エア(「G線上のアリア」)", "Orfeo ed Euridice — Dance of the Blessed Spirits": "オルフェオとエウリディーチェ — 精霊の踊り", "Orfeo ed Euridice — “Che farò senza Euridice?”": "オルフェオとエウリディーチェ — 「エウリディーチェを失って」", "Passacaglia and Fugue in C minor, BWV 582": "パッサカリアとフーガ ハ短調 BWV 582", "Piano Concerto No. 1 in B-flat minor, Op. 23 — I. Allegro non troppo e molto maestoso": "ピアノ協奏曲第1番 変ロ短調 Op. 23 — 第1楽章", "Piano Concerto No. 2, Op. 21 — II. Larghetto": "ピアノ協奏曲第2番 Op. 21 — 第2楽章 ラルゲット", "Piano Concerto No. 21, K. 467 — II. Andante": "ピアノ協奏曲第21番 K. 467 — 第2楽章 アンダンテ", "Piano Concerto No. 23 in A major, K. 488 — II. Adagio": "ピアノ協奏曲第23番 イ長調 K. 488 — 第2楽章 アダージョ", "Piano Sonata No. 11, K. 331 — I. Andante grazioso": "ピアノ・ソナタ第11番 K. 331 — 第1楽章", "Piano Sonata No. 11, K. 331 — III. Rondo alla turca": "ピアノ・ソナタ第11番 K. 331 — 第3楽章「トルコ行進曲」", "Piano Sonata No. 14 “Moonlight”, Op. 27 No. 2 — I. Adagio sostenuto": "ピアノ・ソナタ第14番「月光」Op. 27-2 — 第1楽章", "Piano Sonata No. 16 “Sonata facile”, K. 545 — I. Allegro": "ピアノ・ソナタ第16番 K. 545 — 第1楽章", "Piano Sonata No. 2, Op. 35 — IV. Finale: Presto": "ピアノ・ソナタ第2番 Op. 35 — 第4楽章 フィナーレ", "Piano Sonata No. 8 “Pathétique”, Op. 13 — II. Adagio cantabile": "ピアノ・ソナタ第8番「悲愴」Op. 13 — 第2楽章", "Polonaise in A-flat major “Heroic”, Op. 53": "ポロネーズ 変イ長調「英雄」Op. 53", "Prelude in D-flat major, Op. 28 No. 15 “Raindrop”": "前奏曲 変ニ長調 Op. 28 第15番「雨だれ」", "Requiem, K. 626 — Lacrimosa": "レクイエム K. 626 — ラクリモーサ", "Rinaldo — “Lascia ch’io pianga”": "リナルド — 「私を泣かせてください」", "Romance No. 2 in F major, Op. 50": "ロマンス第2番 ヘ長調 Op. 50", "Romeo and Juliet, Fantasy-Overture": "幻想序曲「ロメオとジュリエット」", "Scherzo No. 2 in B-flat minor, Op. 31": "スケルツォ第2番 変ロ短調 Op. 31", "Serse — “Ombra mai fu”": "セルセ — 「オンブラ・マイ・フ」", "St Matthew Passion, BWV 244 — “Erbarme dich, mein Gott”": "マタイ受難曲 BWV 244 — 「憐れみたまえ、わが神よ」", "String Quartet No. 14 “Death and the Maiden”, D. 810 — I. Allegro": "弦楽四重奏曲第14番「死と乙女」D. 810 — 第1楽章", "String Quartet “Emperor”, Op. 76 No. 3 — II. Poco adagio, cantabile": "弦楽四重奏曲「皇帝」Op. 76-3 — 第2楽章", "String Quintet in E major, G. 275 — III. Minuetto": "弦楽五重奏曲 ホ長調 G. 275 — メヌエット", "Swan Lake — Scene (Act II)": "白鳥の湖 — 情景(第2幕)", "Symphony No. 104 “London” — I. Adagio – Allegro": "交響曲第104番「ロンドン」— 第1楽章", "Symphony No. 4, Op. 98 — IV. Allegro energico e passionato": "交響曲第4番 Op. 98 — 第4楽章", "Symphony No. 40, K. 550 — I. Molto allegro": "交響曲第40番 K. 550 — 第1楽章", "Symphony No. 41 “Jupiter”, K. 551 — IV. Molto allegro": "交響曲第41番「ジュピター」K. 551 — 第4楽章", "Symphony No. 5, Op. 67 — I. Allegro con brio": "交響曲第5番 Op. 67 — 第1楽章", "Symphony No. 6 “Pastoral”, Op. 68 — I. Allegro ma non troppo": "交響曲第6番「田園」Op. 68 — 第1楽章", "Symphony No. 6 “Pathétique”, Op. 74 — IV. Adagio lamentoso": "交響曲第6番「悲愴」Op. 74 — 第4楽章", "Symphony No. 94 “Surprise” — II. Andante": "交響曲第94番「驚愕」— 第2楽章", "The Creation — “The heavens are telling”": "天地創造 — 「もろもろの天は神の栄光を語り」", "The Four Seasons — Spring: I. Allegro": "四季 — 春 第1楽章", "The Four Seasons — Summer: III. Presto": "四季 — 夏 第3楽章", "The Four Seasons — Winter: I. Allegro non molto": "四季 — 冬 第1楽章", "The Marriage of Figaro — Overture, K. 492": "フィガロの結婚 — 序曲 K. 492", "Toccata and Fugue in D minor, BWV 565": "トッカータとフーガ ニ短調 BWV 565", "Totentanz, S. 126": "死の舞踏 S. 126", "Tristan und Isolde — Liebestod": "トリスタンとイゾルデ — 愛の死", "Trumpet Concerto in E-flat major — III. Finale: Allegro": "トランペット協奏曲 変ホ長調 — 第3楽章", "Un sospiro (Three Concert Études, S. 144 No. 3)": "ため息(3つの演奏会用練習曲 S. 144 第3番)", "Violin Concerto in E minor, Op. 64 — III. Allegro molto vivace": "ヴァイオリン協奏曲 ホ短調 Op. 64 — 第3楽章", "Violin Partita No. 2 in D minor, BWV 1004 — V. Chaconne": "無伴奏ヴァイオリン・パルティータ第2番 BWV 1004 — シャコンヌ", "Water Music, Suite No. 2 in D major — Alla Hornpipe": "水上の音楽 組曲第2番 ニ長調 — アラ・ホーンパイプ", "Widmung (Myrthen, Op. 25 No. 1)": "献呈(ミルテの花 Op. 25 第1曲)", "Wiegenlied (Lullaby), Op. 49 No. 4": "子守歌 Op. 49 第4番", "Zadok the Priest, HWV 258": "司祭ザドク HWV 258", "Étude in C minor, Op. 10 No. 12 “Revolutionary”": "練習曲 ハ短調 Op. 10 第12番「革命」", "Trumpet Concerto in E-flat major — III. Finale": "トランペット協奏曲 変ホ長調 — 第3楽章", "Cello Concerto No. 1 in C major — I. Moderato": "チェロ協奏曲第1番 ハ長調 — 第1楽章", "Symphony No. 45 “Farewell” — IV. Finale": "交響曲第45番「告別」— 第4楽章", "Piano Sonata in D major, Hob. XVI:37 — III. Finale": "ピアノ・ソナタ ニ長調 Hob. XVI:37 — 第3楽章", "String Quartet “The Joke”, Op. 33 No. 2 — IV. Finale": "弦楽四重奏曲「冗談」Op. 33-2 — 第4楽章", "Symphony No. 100 “Military” — II. Allegretto": "交響曲第100番「軍隊」— 第2楽章", "The Marriage of Figaro — Overture": "フィガロの結婚 — 序曲", "The Magic Flute — “Der Hölle Rache” (Queen of the Night)": "魔笛 — 夜の女王のアリア「地獄の復讐」", "Symphony No. 9, Op. 125 — IV. “Ode to Joy”": "交響曲第9番 Op. 125 — 第4楽章「歓喜の歌」", "Für Elise, WoO 59": "エリーゼのために WoO 59", "Symphony No. 7, Op. 92 — II. Allegretto": "交響曲第7番 Op. 92 — 第2楽章", "Piano Concerto No. 5 “Emperor”, Op. 73 — II. Adagio un poco mosso": "ピアノ協奏曲第5番「皇帝」Op. 73 — 第2楽章", "Violin Concerto in D major, Op. 61 — I. Allegro ma non troppo": "ヴァイオリン協奏曲 ニ長調 Op. 61 — 第1楽章", "Orfeo ed Euridice — Overture": "オルフェオとエウリディーチェ — 序曲", "Iphigénie en Tauride — Overture": "トーリードのイフィジェニー — 序曲", "Alceste — “Divinités du Styx”": "アルセスト — 「冥府の神々よ」", "Armide — Passacaille": "アルミード — パッサカーユ", "Don Juan (ballet) — Dance of the Furies": "ドン・ジュアン(バレエ)— 復讐の女神の踊り", "Paride ed Elena — “O del mio dolce ardor”": "パリーデとエレーナ — 「ああ、私のいとしい人よ」", "Iphigénie en Aulide — Overture": "オーリードのイフィジェニー — 序曲", "Alceste — Overture": "アルセスト — 序曲", "Brandenburg Concerto No. 5 in D major, BWV 1050": "ブランデンブルク協奏曲第5番 ニ長調 BWV 1050", "Brandenburg Concerto No. 3 in G major, BWV 1048": "ブランデンブルク協奏曲第3番 ト長調 BWV 1048", "Orchestral Suite No. 3 — Air, BWV 1068": "管弦楽組曲第3番 — エア BWV 1068", "Goldberg Variations, BWV 988": "ゴルトベルク変奏曲 BWV 988", "The Well-Tempered Clavier, Book I — Prelude in C major, BWV 846": "平均律クラヴィーア曲集 第1巻 — 前奏曲 ハ長調 BWV 846", "Cello Suite No. 1 in G major, BWV 1007": "無伴奏チェロ組曲第1番 ト長調 BWV 1007", "Violin Partita No. 2 in D minor — Chaconne, BWV 1004": "無伴奏ヴァイオリン・パルティータ第2番 — シャコンヌ BWV 1004", "St Matthew Passion, BWV 244": "マタイ受難曲 BWV 244", "Mass in B minor, BWV 232": "ミサ曲 ロ短調 BWV 232", "Messiah, HWV 56 — Hallelujah Chorus": "メサイア HWV 56 — ハレルヤ・コーラス", "Water Music, HWV 348–350": "水上の音楽 HWV 348–350", "Music for the Royal Fireworks, HWV 351": "王宮の花火の音楽 HWV 351", "Giulio Cesare — “Piangerò la sorte mia”": "ジュリオ・チェーザレ — 「この身の運命を嘆こう」", "Solomon — The Arrival of the Queen of Sheba, HWV 67": "ソロモン — シバの女王の到着 HWV 67", "Concerto Grosso in G minor, Op. 6 No. 6": "合奏協奏曲 ト短調 Op. 6 第6番", "Keyboard Suite No. 5 in E major, HWV 430 — “The Harmonious Blacksmith”": "鍵盤組曲第5番 ホ長調 HWV 430 — 「調子のよい鍛冶屋」", "The Four Seasons — Spring, RV 269": "四季 — 春 RV 269", "The Four Seasons — Summer, RV 315": "四季 — 夏 RV 315", "The Four Seasons — Autumn, RV 293": "四季 — 秋 RV 293", "The Four Seasons — Winter, RV 297": "四季 — 冬 RV 297", "Gloria in D major, RV 589": "グローリア ニ長調 RV 589", "Concerto for Two Violins in A minor, RV 522": "2つのヴァイオリンのための協奏曲 イ短調 RV 522", "Mandolin Concerto in C major, RV 425": "マンドリン協奏曲 ハ長調 RV 425", "Concerto for Four Violins in B minor, RV 580": "4つのヴァイオリンのための協奏曲 ロ短調 RV 580", "Stabat Mater, RV 621": "スターバト・マーテル RV 621", "Flute Concerto in D major “Il gardellino”, RV 428": "フルート協奏曲 ニ長調「ごしきひわ」RV 428", "Dido and Aeneas, Z. 626 — “When I am laid in earth”": "ディドとエネアス Z. 626 — 「私が土に横たえられるとき」", "Dido and Aeneas — Overture": "ディドとエネアス — 序曲", "Abdelazer, Z. 570 — Rondeau": "アブデラザール Z. 570 — ロンド", "Music for the Funeral of Queen Mary, Z. 860": "メアリー女王の葬送音楽 Z. 860", "Come ye Sons of Art, Z. 323": "来たれ、芸術の子らよ Z. 323", "King Arthur, Z. 628 — “What power art thou” (Cold Song)": "アーサー王 Z. 628 — 「汝は何者か」(コールド・ソング)", "The Fairy-Queen, Z. 629 — “The Plaint (O let me weep)”": "妖精の女王 Z. 629 — 「嘆き(ああ、泣かせて)」", "Chacony in G minor, Z. 730": "シャコンヌ ト短調 Z. 730", "Music for a while, Z. 583": "ひとときの音楽 Z. 583", "Fantazia upon one note, Z. 745": "1音によるファンタジア Z. 745", "Keyboard Sonata in B minor, K. 27": "鍵盤ソナタ ロ短調 K. 27", "Keyboard Sonata in E major, K. 380": "鍵盤ソナタ ホ長調 K. 380", "Keyboard Sonata in D minor, K. 9 “Pastorale”": "鍵盤ソナタ ニ短調 K. 9「パストラーレ」", "Keyboard Sonata in C major, K. 159 “The Hunt”": "鍵盤ソナタ ハ長調 K. 159「狩り」", "Keyboard Sonata in F minor, K. 466": "鍵盤ソナタ ヘ短調 K. 466", "Keyboard Sonata in D minor, K. 1": "鍵盤ソナタ ニ短調 K. 1", "Keyboard Sonata in B minor, K. 87": "鍵盤ソナタ ロ短調 K. 87", "Keyboard Sonata in D minor, K. 213": "鍵盤ソナタ ニ短調 K. 213", "Keyboard Sonata in D major, K. 492": "鍵盤ソナタ ニ長調 K. 492", "Sonatina in C major, Op. 36 No. 1": "ソナチネ ハ長調 Op. 36 第1番", "Sonatina in G major, Op. 36 No. 2": "ソナチネ ト長調 Op. 36 第2番", "Sonatina in C major, Op. 36 No. 3": "ソナチネ ハ長調 Op. 36 第3番", "Sonatina in F major, Op. 36 No. 4": "ソナチネ ヘ長調 Op. 36 第4番", "Sonatina in G major, Op. 36 No. 5": "ソナチネ ト長調 Op. 36 第5番", "Sonatina in D major, Op. 36 No. 6": "ソナチネ ニ長調 Op. 36 第6番", "Piano Sonata in G minor, Op. 50 No. 3 “Didone abbandonata”": "ピアノ・ソナタ ト短調 Op. 50-3「捨てられたディドーネ」", "Piano Sonata in F-sharp minor, Op. 25 No. 5": "ピアノ・ソナタ 嬰ヘ短調 Op. 25-5", "Piano Sonata in B minor, Op. 40 No. 2": "ピアノ・ソナタ ロ短調 Op. 40-2", "Symphony No. 1 in C major, WoO 32": "交響曲第1番 ハ長調 WoO 32", "Ave Maria, D. 839": "アヴェ・マリア D. 839", "Symphony No. 8 “Unfinished”, D. 759 — I. Allegro moderato": "交響曲第8番「未完成」D. 759 — 第1楽章", "Piano Quintet “Trout”, D. 667 — IV. Andantino": "ピアノ五重奏曲「ます」D. 667 — 第4楽章", "Impromptu in G-flat major, Op. 90 No. 3, D. 899": "即興曲 変ト長調 Op. 90 第3番 D. 899", "Ständchen (Serenade), D. 957 No. 4": "セレナード D. 957 第4曲", "String Quartet No. 14 “Death and the Maiden”, D. 810 — II. Andante con moto": "弦楽四重奏曲第14番「死と乙女」D. 810 — 第2楽章", "Piano Trio No. 2, D. 929 — II. Andante con moto": "ピアノ三重奏曲第2番 D. 929 — 第2楽章", "Winterreise, D. 911 — “Der Lindenbaum”": "冬の旅 D. 911 — 「菩提樹」", "Symphony No. 9 “The Great”, D. 944 — IV. Allegro vivace": "交響曲第9番「ザ・グレート」D. 944 — 第4楽章", "Moments musicaux, D. 780 — No. 3 in F minor": "楽興の時 D. 780 — 第3番 ヘ短調", "Ballade No. 1 in G minor, Op. 23": "バラード第1番 ト短調 Op. 23", "Étude in E major, Op. 10 No. 3 “Tristesse”": "練習曲 ホ長調 Op. 10 第3番「別れの曲」", "Fantaisie-Impromptu in C-sharp minor, Op. 66": "幻想即興曲 嬰ハ短調 Op. 66", "Waltz in D-flat major, Op. 64 No. 1 “Minute”": "ワルツ 変ニ長調 Op. 64 第1番「子犬のワルツ」", "Polonaise in A-flat major, Op. 53 “Heroic”": "ポロネーズ 変イ長調 Op. 53「英雄」", "Piano Sonata No. 2, Op. 35 — III. Marche funèbre": "ピアノ・ソナタ第2番 Op. 35 — 第3楽章「葬送行進曲」", "Piano Concerto in A minor, Op. 54 — I. Allegro affettuoso": "ピアノ協奏曲 イ短調 Op. 54 — 第1楽章", "Carnaval, Op. 9": "謝肉祭 Op. 9", "Symphony No. 3 “Rhenish”, Op. 97 — IV. Feierlich": "交響曲第3番「ライン」Op. 97 — 第4楽章", "Dichterliebe, Op. 48 — “Im wunderschönen Monat Mai”": "詩人の恋 Op. 48 — 「美しい五月に」", "Fantasiestücke, Op. 12 — “Des Abends”": "幻想小曲集 Op. 12 — 「夕べに」", "Papillons, Op. 2": "パピヨン Op. 2", "Symphonic Etudes, Op. 13": "交響的練習曲 Op. 13", "Kreisleriana, Op. 16": "クライスレリアーナ Op. 16", "La campanella (Grandes études de Paganini, S. 141 No. 3)": "ラ・カンパネッラ(パガニーニによる大練習曲 S. 141 第3番)", "Un sospiro (Trois études de concert, S. 144 No. 3)": "ため息(3つの演奏会用練習曲 S. 144 第3番)", "Consolation No. 3 in D-flat major, S. 172": "コンソレーション第3番 変ニ長調 S. 172", "Piano Sonata in B minor, S. 178": "ピアノ・ソナタ ロ短調 S. 178", "Les préludes, S. 97": "交響詩「前奏曲」S. 97", "Années de pèlerinage — “Au bord d’une source”": "巡礼の年 — 「泉のほとりで」", "Piano Concerto No. 1 in E-flat major, S. 124": "ピアノ協奏曲第1番 変ホ長調 S. 124", "Symphony No. 3, Op. 90 — III. Poco allegretto": "交響曲第3番 Op. 90 — 第3楽章", "Hungarian Dance No. 5": "ハンガリー舞曲第5番", "Piano Concerto No. 2, Op. 83 — III. Andante": "ピアノ協奏曲第2番 Op. 83 — 第3楽章", "Violin Concerto in D major, Op. 77 — II. Adagio": "ヴァイオリン協奏曲 ニ長調 Op. 77 — 第2楽章", "Symphony No. 1, Op. 68 — IV. Adagio – Allegro non troppo, ma con brio": "交響曲第1番 Op. 68 — 第4楽章", "A German Requiem, Op. 45 — “Wie lieblich sind deine Wohnungen”": "ドイツ・レクイエム Op. 45 — 「あなたのすまいはなんと麗しいことか」", "Clarinet Quintet in B minor, Op. 115 — I. Allegro": "クラリネット五重奏曲 ロ短調 Op. 115 — 第1楽章", "Symphony No. 4, Op. 98 — I. Allegro non troppo": "交響曲第4番 Op. 98 — 第1楽章", "Symphony No. 5, Op. 64 — II. Andante cantabile": "交響曲第5番 Op. 64 — 第2楽章", "The Nutcracker — Waltz of the Flowers": "くるみ割り人形 — 花のワルツ", "1812 Overture, Op. 49": "序曲「1812年」Op. 49", "Violin Concerto in D major, Op. 35 — II. Canzonetta": "ヴァイオリン協奏曲 ニ長調 Op. 35 — 第2楽章 カンツォネッタ", "The Sleeping Beauty — Waltz": "眠れる森の美女 — ワルツ", "Serenade for Strings in C major, Op. 48 — II. Waltz": "弦楽セレナード ハ長調 Op. 48 — 第2楽章 ワルツ", "Lohengrin — Bridal Chorus (Act III)": "ローエングリン — 婚礼の合唱(第3幕)", "Tristan und Isolde — Prelude": "トリスタンとイゾルデ — 前奏曲", "Tannhäuser — Overture": "タンホイザー — 序曲", "Der fliegende Holländer — Overture": "さまよえるオランダ人 — 序曲", "Die Meistersinger von Nürnberg — Prelude (Act I)": "ニュルンベルクのマイスタージンガー — 第1幕前奏曲", "Siegfried Idyll": "ジークフリート牧歌", "Parsifal — Prelude (Act I)": "パルジファル — 第1幕前奏曲", "Götterdämmerung — Siegfried’s Rhine Journey": "神々の黄昏 — ジークフリートのラインへの旅", "Violin Concerto in E minor, Op. 64 — I. Allegro molto appassionato": "ヴァイオリン協奏曲 ホ短調 Op. 64 — 第1楽章", "A Midsummer Night’s Dream — Wedding March": "真夏の夜の夢 — 結婚行進曲", "A Midsummer Night’s Dream — Overture, Op. 21": "真夏の夜の夢 — 序曲 Op. 21", "Symphony No. 4 “Italian”, Op. 90 — I. Allegro vivace": "交響曲第4番「イタリア」Op. 90 — 第1楽章", "Songs Without Words, Op. 62 No. 6 “Spring Song”": "無言歌 Op. 62 第6番「春の歌」", "The Hebrides (Fingal’s Cave) Overture, Op. 26": "序曲「フィンガルの洞窟」Op. 26", "Symphony No. 3 “Scottish”, Op. 56 — II. Vivace non troppo": "交響曲第3番「スコットランド」Op. 56 — 第2楽章", "Octet in E-flat major, Op. 20 — I. Allegro moderato ma con fuoco": "八重奏曲 変ホ長調 Op. 20 — 第1楽章", "Piano Trio No. 1 in D minor, Op. 49 — I. Molto allegro ed agitato": "ピアノ三重奏曲第1番 ニ短調 Op. 49 — 第1楽章", "Hear My Prayer — “O for the wings of a dove”": "わが祈りを聞きたまえ — 「鳩のように飛べたなら」", "La traviata — Prelude to Act I": "椿姫 — 第1幕への前奏曲", "La forza del destino — Overture": "運命の力 — 序曲", "La traviata — “Libiamo ne’ lieti calici” (Brindisi)": "椿姫 — 「乾杯の歌」", "Rigoletto — “La donna è mobile”": "リゴレット — 「女心の歌」", "Nabucco — “Va, pensiero” (Chorus of the Hebrew Slaves)": "ナブッコ — 「行け、我が想いよ」", "Aida — Triumphal March": "アイーダ — 凱旋行進曲", "Requiem — Dies irae": "レクイエム — 怒りの日", "Carmen — Prelude (Act I)": "カルメン — 前奏曲", "Carmen — “Habanera”": "カルメン — 「ハバネラ」", "Carmen — Toreador Song": "カルメン — 「闘牛士の歌」", "L’Arlésienne Suite No. 2 — Farandole": "アルルの女 第2組曲 — ファランドール", "The Pearl Fishers — “Au fond du temple saint”": "真珠採り — 「神殿の奥深く」", "Symphony in C — II. Adagio": "交響曲ハ長調 — 第2楽章 アダージョ", "William Tell — Overture": "ウィリアム・テル — 序曲", "The Barber of Seville — Overture": "セビリアの理髪師 — 序曲", "The Barber of Seville — “Largo al factotum”": "セビリアの理髪師 — 「私は町の何でも屋」", "La gazza ladra — Overture": "泥棒かささぎ — 序曲", "Stabat Mater": "スターバト・マーテル", "Petite messe solennelle": "小荘厳ミサ曲", "Cavalleria rusticana — Intermezzo": "カヴァレリア・ルスティカーナ — 間奏曲", "Cavalleria rusticana — Easter Hymn “Regina coeli”": "カヴァレリア・ルスティカーナ — 復活祭の合唱", "L’amico Fritz — Intermezzo": "友人フリッツ — 間奏曲", "Iris — Hymn to the Sun": "イリス — 太陽の讃歌", "Pagliacci — Intermezzo": "道化師 — 間奏曲", "Pagliacci — “Vesti la giubba”": "道化師 — 「衣装をつけろ」", "Pagliacci — Prologue “Si può?”": "道化師 — プロローグ「ちょっと失礼」", "Mattinata": "マッティナータ(朝の歌)", "Thaïs — Méditation": "タイス — 瞑想曲", "Werther — “Pourquoi me réveiller”": "ウェルテル — 「春風よ、なぜ私を目覚めさせるのか」", "Manon — “Adieu, notre petite table”": "マノン — 「さようなら、私たちの小さなテーブル」", "Élégie": "エレジー", "Manon Lescaut — Intermezzo (Act III)": "マノン・レスコー — 第3幕への間奏曲", "La bohème — “Che gelida manina”": "ラ・ボエーム — 「冷たき手を」", "La bohème — “Sì, mi chiamano Mimì”": "ラ・ボエーム — 「私の名はミミ」", "Gianni Schicchi — “O mio babbino caro”": "ジャンニ・スキッキ — 「私のお父さん」", "Turandot — “Nessun dorma”": "トゥーランドット — 「誰も寝てはならぬ」", "Madama Butterfly — “Un bel dì vedremo”": "蝶々夫人 — 「ある晴れた日に」", "Lohengrin — Prelude to Act I": "ローエングリン — 第1幕への前奏曲", "Don Giovanni — Overture, K. 527": "ドン・ジョヴァンニ — 序曲 K. 527", "The Magic Flute — Overture, K. 620": "魔笛 — 序曲 K. 620", "Cello Concerto in B minor, Op. 104 — III. Finale: Allegro moderato": "チェロ協奏曲 ロ短調 Op. 104 — 第3楽章 フィナーレ", "Waltz in A minor, B. 150, Op. posth.": "ワルツ イ短調 B. 150(遺作)", "The Seasons, Op. 37a — October: Autumn Song": "四季 Op. 37a — 10月「秋の歌」", "Vocalise, Op. 34 No. 14": "ヴォカリーズ Op. 34 第14番", "Symphony No. 1 in C minor, Op. 68 — II. Andante sostenuto": "交響曲第1番 ハ短調 Op. 68 — 第2楽章 アンダンテ・ソステヌート", "Nocturne in B major, Op. 32 No. 1": "夜想曲 ロ長調 Op. 32 第1番", "Nocturne in F-sharp major, Op. 15 No. 2": "夜想曲 嬰ヘ長調 Op. 15 第2番", "Cello Sonata No. 5 in D major, Op. 102 No. 2 — I. Allegro con brio": "チェロ・ソナタ第5番 ニ長調 Op. 102 第2番 — 第1楽章", "Serenade for Strings in C major, Op. 48 — I. Pezzo in forma di sonatina": "弦楽セレナード ハ長調 Op. 48 — 第1楽章 ソナチネ形式の小品", "12 Variations on “Ah, vous dirai-je, Maman”, K. 265": "「ああ、お母さん聞いて」による12の変奏曲 K. 265(きらきら星変奏曲)", "Waltz in A-flat major, Op. 34 No. 1": "ワルツ 変イ長調 Op. 34 第1番", "Piano Trio in G minor, Op. 15 — III. Finale: Presto": "ピアノ三重奏曲 ト短調 Op. 15 — 第3楽章 フィナーレ", "Cello Sonata No. 3 in A major, Op. 69 — I. Allegro, ma non tanto": "チェロ・ソナタ第3番 イ長調 Op. 69 — 第1楽章", "Romance for Cello and Piano in F minor (1890)": "チェロとピアノのためのロマンス ヘ短調(1890)", "French Suite No. 1 in D minor, BWV 812 — I. Allemande": "フランス組曲第1番 ニ短調 BWV 812 — アルマンド", "6 Romances, Op. 6 — No. 6 “None but the Lonely Heart”": "6つのロマンス Op. 6 — 第6曲「ただ憧れを知る者だけが」", "Prelude in G minor, Op. 23 No. 5": "前奏曲 ト短調 Op. 23 第5番", "Lyric Pieces, Op. 68 — No. 5 “At the Cradle”": "抒情小曲集 Op. 68 — 第5曲「ゆりかごのそばで」", "Chorale Prelude “Ich ruf zu dir, Herr Jesu Christ”, BWV 639": "コラール前奏曲「主イエス・キリストよ、われ汝に呼ばわる」BWV 639", "Suite bergamasque — III. Clair de lune": "ベルガマスク組曲 — 第3曲「月の光」", "Three Grand Duets for Violin and Viola, Op. 69 No. 1 — II. Rondo: Allegro": "ヴァイオリンとヴィオラのための3つの大二重奏曲 Op. 69 第1番 — 第2楽章 ロンド", "Pavane pour une infante défunte, M. 19": "亡き王女のためのパヴァーヌ M. 19", "String Quartet No. 14 in G major, K. 387 — III. Andante cantabile": "弦楽四重奏曲第14番 ト長調 K. 387 — 第3楽章 アンダンテ・カンタービレ", "Consolation No. 1 in E major, S. 172": "コンソレーション第1番 ホ長調 S. 172", "Rhapsody on a Theme of Paganini, Op. 43 — Variation 18": "パガニーニの主題による狂詩曲 Op. 43 — 第18変奏", "The Lark (arr. Balakirev)": "ひばり(バラキレフ編)", "Flute Sonata in E-flat major, BWV 1031 — II. Siciliano": "フルート・ソナタ 変ホ長調 BWV 1031 — 第2楽章 シチリアーノ", "Waltz in F major, Op. 34 No. 3": "ワルツ ヘ長調 Op. 34 第3番", "Symphony No. 5 in E minor, Op. 64 — IV. Finale: Andante maestoso – Allegro vivace": "交響曲第5番 ホ短調 Op. 64 — 第4楽章 フィナーレ", "Prelude in C-sharp minor, Op. 3 No. 2": "前奏曲 嬰ハ短調 Op. 3 第2番「鐘」", "Piano Concerto No. 2 in C minor, Op. 18 — I. Moderato": "ピアノ協奏曲第2番 ハ短調 Op. 18 — 第1楽章 モデラート", "Piano Concerto No. 2 in C minor, Op. 18 — II. Adagio sostenuto": "ピアノ協奏曲第2番 ハ短調 Op. 18 — 第2楽章 アダージョ・ソステヌート", "Piano Concerto No. 2 in C minor, Op. 18 — III. Allegro scherzando": "ピアノ協奏曲第2番 ハ短調 Op. 18 — 第3楽章 アレグロ・スケルツァンド", "Cello Sonata in G minor, Op. 19 — III. Andante": "チェロ・ソナタ ト短調 Op. 19 — 第3楽章 アンダンテ", "Piano Concerto No. 3 in D minor, Op. 30 — III. Finale: Alla breve": "ピアノ協奏曲第3番 ニ短調 Op. 30 — 第3楽章 フィナーレ"}, "pairs": [["ホメロス礼賛", "ジャン＝オーギュスト＝ドミニク・アングル", "アングル", "民衆を導く自由の女神", "ウジェーヌ・ドラクロワ", "ドラクロワ"], ["牛乳を注ぐ女", "ヨハネス・フェルメール", "フェルメール", "雲海の上の旅人", "カスパー・ダーヴィト・フリードリヒ", "フリードリヒ"], ["ナポレオンの戴冠式", "ジャック＝ルイ・ダヴィッド", "ダヴィッド", "メデューズ号の筏", "テオドール・ジェリコー", "ジェリコー"]], "map": {"baroque": ["バロック", "金色の対位法。濃厚で華やかに輝く最初のひと口。"], "classical": ["古典派", "均整のとれた形式、すっきり端正な後味。"], "romantic": ["ロマン派", "濃い感情、長く残る余韻。"], "impression": ["印象派", "水の色の和音、軽くかすむ香り。"], "contemporary": ["現代", "見知らぬ質感、新しい味の実験。"]}, "eras": {"baroque": "バロック · 1600–1750", "classical": "古典派 · 1750–1820", "romantic": "ロマン派 · 1820–1900"}};
    const isLocal = () => lang !== 'en';           // ko and ja both use the local (".ko") fields
    function localize() {
      const ja = lang === 'ja';
      const keep = (o, k) => { if (!('_' + k in o)) o['_' + k] = o[k]; return o['_' + k]; };
      ['classic', 'romantic'].forEach(era => (SETS[era] || []).forEach(p => {
        const j = JA.paint[p.id];
        ['ko', 'byKo', 'moodKo', 'tagKo', 'readKo'].forEach(k => { const base = keep(p, k); p[k] = ja && j ? j[k] : base; });
      }));
      Object.values(POOLS).forEach(list => list.forEach(pc => { const base = keep(pc, 2); pc[2] = ja ? (JA.titles[pc[1]] || pc[1]) : base; }));
      CAT.forEach(x => { const base = keep(x, 'ko'); x.ko = ja ? (JA.titles[x.en] || x.en) : base; });
      Object.values(WORKS).forEach(list => list.forEach(w => { const base = keep(w, 1); w[1] = ja ? (JA.titles[w[0]] || w[0]) : base; }));
      Object.values(COMPOSERS).forEach(list => list.forEach(n => {
        const base = keep(n, 1);
        n[1] = ja ? ((n[2] && JA.comp[n[2]]) ? JA.comp[n[2]][0] : (JA.impress[n[0]] || n[0])) : base;
      }));
      Object.keys(SHORT).forEach(id => { const base = keep(SHORT[id], 1); SHORT[id][1] = ja && JA.comp[id] ? JA.comp[id][1] : base; });
      Object.keys(TYPES).forEach(m => { const T = TYPES[m], J = JA.types[m];
        [1, 3, 5].forEach((ix, n) => { const base = keep(T, ix); T[ix] = ja && J ? J[n] : base; }); });
      MAP.forEach(m => { const bk = keep(m, 'ko'), bf = keep(m, 'flKo'); const J = JA.map[m.k];
        m.ko = ja && J ? J[0] : bk; m.flKo = ja && J ? J[1] : bf; });
      Object.keys(ERAS).forEach(k => { const b = keep(ERAS[k], 'ko'); ERAS[k].ko = ja ? JA.eras[k] : b; });
      PAIRS.forEach((P, i) => { const J = JA.pairs[i];
        ['a', 'b'].forEach((side, n) => { const d = P[side];
          ['ko', 'byKo', 'sKo'].forEach((k, z) => { const b = keep(d, k); d[k] = ja && J ? J[n * 3 + z] : b; }); }); });
    }
    // ---------- 2) State ----------
    if (MOBILE) {
      Object.assign(I18N.en, { r2Sub: 'Three rounds of four paintings. In each round, pick the one that draws you most today. Press and hold a painting to see it large.' });
      Object.assign(I18N.ko, { r2Sub: '4점씩 3라운드예요. 라운드마다 오늘 더 끌리는 그림 한 장만 골라 주세요. 그림을 길게 누르면 크게 보여요.' });
      Object.assign(I18N.ja, { r2Sub: '4枚ずつ3ラウンドです。各ラウンドで、今日いちばん惹かれる絵を1枚だけ選んでください。絵を長押しすると大きく見られます。' });
    }
    Object.assign(I18N.en, { readOpen: 'Why these paintings? ▼', readClose: 'Close ▲' });
    Object.assign(I18N.ko, { readOpen: '이 그림들에 끌린 이유 보기 ▼', readClose: '접기 ▲' });
    Object.assign(I18N.ja, { readOpen: 'これらの絵に惹かれた理由を見る ▼', readClose: '閉じる ▲' });
    {   // PC and phones alike: "Behind your picks" sits lower and opens on tap (PC since 2026-10-19)
      const wrap = document.getElementById('read-wrap'), body = document.getElementById('r-read'), tg = document.getElementById('read-toggle');
      const foot = document.getElementById('r-reset').parentElement;
      foot.parentElement.insertBefore(wrap, foot);
      wrap.classList.add('more', 'mt-20');
      wrap.querySelector('.eyebrow').classList.remove('mt-20');
      body.style.display = 'none'; tg.hidden = false; tg.style.display = 'inline-flex';
      tg.addEventListener('click', () => {
        const open = body.style.display === 'none'; body.style.display = open ? '' : 'none';
        tg.dataset.i18n = open ? 'readClose' : 'readOpen'; tg.setAttribute('aria-expanded', String(open));
        tg.textContent = I18N[lang][tg.dataset.i18n];
      });
    }
    let lang = 'en';          // default: English
    let currentEra = null;

    function readSavedLang() {
      try {
        const q = new URLSearchParams(location.search).get('lang');
        if (q && I18N[q]) return q;
        const s = localStorage.getItem('vo-lang');
        if (s && I18N[s]) return s;
      } catch (e) { /* storage may be unavailable */ }
      const nav = (navigator.language || '').slice(0, 2);
      return I18N[nav] ? nav : 'en';
    }

    // Composer columns (id links to WORKS). Impressionist names have no id: that route is not reachable yet.
    const COMPOSERS = {
      classic: [
        ['Johann Sebastian Bach', '요한 제바스티안 바흐', 'bach'], ['George Frideric Handel', '게오르크 프리드리히 헨델', 'handel'],
        ['Antonio Vivaldi', '안토니오 비발디', 'vivaldi'], ['Henry Purcell', '헨리 퍼셀', 'purcell'],
        ['Domenico Scarlatti', '도메니코 스카를라티', 'scarlatti'], ['Joseph Haydn', '요제프 하이든', 'haydn'],
        ['Wolfgang Amadeus Mozart', '볼프강 아마데우스 모차르트', 'mozart'], ['Ludwig van Beethoven', '루트비히 판 베토벤', 'beethoven'],
        ['Christoph Willibald Gluck', '크리스토프 빌리발트 글루크', 'gluck'], ['Muzio Clementi', '무치오 클레멘티', 'clementi'],
      ],
      romantic: [
        ['Franz Schubert', '프란츠 슈베르트', 'schubert'], ['Frédéric Chopin', '프레데리크 쇼팽', 'chopin'],
        ['Robert Schumann', '로베르트 슈만', 'schumann'], ['Franz Liszt', '프란츠 리스트', 'liszt'],
        ['Johannes Brahms', '요하네스 브람스', 'brahms'], ['Pyotr Ilyich Tchaikovsky', '표트르 일리치 차이콥스키', 'tchaikovsky'],
        ['Richard Wagner', '리하르트 바그너', 'wagner'], ['Felix Mendelssohn', '펠릭스 멘델스존', 'mendelssohn'],
        ['Giuseppe Verdi', '주세페 베르디', 'verdi'],
        ['Georges Bizet', '조르주 비제', 'bizet'],
        ['Gioachino Rossini', '조아키노 로시니', 'rossini'],
        ['Pietro Mascagni', '피에트로 마스카니', 'mascagni'],
        ['Ruggero Leoncavallo', '루제로 레온카발로', 'leoncavallo'],
        ['Jules Massenet', '쥘 마스네', 'massenet'],
        ['Giacomo Puccini', '자코모 푸치니', 'puccini'],
      ],
      impress: [
        ['Claude Debussy', '클로드 드뷔시'], ['Maurice Ravel', '모리스 라벨'],
        ['Erik Satie', '에릭 사티'], ['Gabriel Fauré', '가브리엘 포레'],
        ['Paul Dukas', '폴 뒤카'], ['Frederick Delius', '프레더릭 딜리어스'],
        ['Ottorino Respighi', '오토리노 레스피기'], ['Charles Tomlinson Griffes', '찰스 톰린슨 그리피스'],
      ],
    };
    let selectedComposer = null;

    // Ten pieces per composer: [English, Korean]
    const WORKS = {
      haydn: [
        ["Symphony No. 94 “Surprise” — II. Andante", "교향곡 94번 “놀람” — 2악장 안단테"],
        ["Symphony No. 104 “London” — I. Adagio – Allegro", "교향곡 104번 “런던” — 1악장 아다지오 – 알레그로"],
        ["String Quartet “Emperor”, Op. 76 No. 3 — II. Poco adagio, cantabile", "현악 사중주 “황제” Op. 76 No. 3 — 2악장 포코 아다지오"],
        ["The Creation — “The heavens are telling”", "천지창조 — “하늘은 하느님의 영광을 전하네”"],
        ["Trumpet Concerto in E-flat major — III. Finale", "트럼펫 협주곡 내림E장조 — 3악장 피날레"],
        ["Cello Concerto No. 1 in C major — I. Moderato", "첼로 협주곡 1번 C장조 — 1악장 모데라토"],
        ["Symphony No. 45 “Farewell” — IV. Finale", "교향곡 45번 “고별” — 4악장 피날레"],
        ["Piano Sonata in D major, Hob. XVI:37 — III. Finale", "피아노 소나타 D장조 Hob. XVI:37 — 3악장 피날레"],
        ["String Quartet “The Joke”, Op. 33 No. 2 — IV. Finale", "현악 사중주 “농담” Op. 33 No. 2 — 4악장 피날레"],
        ["Symphony No. 100 “Military” — II. Allegretto", "교향곡 100번 “군대” — 2악장 알레그레토"],
        ["Trumpet Concerto in E-flat major — III. Finale: Allegro", "트럼펫 협주곡 E♭장조 — 3악장 피날레 알레그로"],
        ["Cello Concerto No. 1 in C major — II. Adagio", "첼로 협주곡 1번 C장조 — 2악장 아다지오"]
      ],
      mozart: [
        ["Don Giovanni — Overture, K. 527", "돈 조반니 — 서곡 K. 527"],
        ["The Magic Flute — Overture, K. 620", "마술피리 — 서곡 K. 620"],
        ["Piano Concerto No. 21, K. 467 — II. Andante", "피아노 협주곡 21번 K. 467 — 2악장 안단테"],
        ["Symphony No. 40, K. 550 — I. Molto allegro", "교향곡 40번 K. 550 — 1악장 몰토 알레그로"],
        ["Eine kleine Nachtmusik, K. 525 — I. Allegro", "아이네 클라이네 나흐트무지크 K. 525 — 1악장 알레그로"],
        ["Clarinet Concerto, K. 622 — II. Adagio", "클라리넷 협주곡 K. 622 — 2악장 아다지오"],
        ["Requiem, K. 626 — Lacrimosa", "레퀴엠 K. 626 — 라크리모사"],
        ["The Marriage of Figaro — Overture", "피가로의 결혼 — 서곡"],
        ["The Magic Flute — “Der Hölle Rache” (Queen of the Night)", "마술피리 — 밤의 여왕 아리아 “지옥의 복수가”"],
        ["Piano Sonata No. 11, K. 331 — III. Rondo alla turca", "피아노 소나타 11번 K. 331 — 3악장 터키 행진곡"],
        ["Symphony No. 41 “Jupiter”, K. 551 — IV. Molto allegro", "교향곡 41번 “주피터” K. 551 — 4악장 몰토 알레그로"],
        ["Ave verum corpus, K. 618", "아베 베룸 코르푸스 K. 618"],
        ["Piano Sonata No. 11, K. 331 — I. Andante grazioso", "피아노 소나타 11번 K. 331 — 1악장 안단테 그라치오소"],
        ["The Marriage of Figaro — Overture, K. 492", "피가로의 결혼 — 서곡 K. 492"],
        ["Symphony No. 25 in G minor, K. 183 — I. Allegro con brio", "교향곡 25번 G단조 K. 183 — 1악장 알레그로 콘 브리오"],
        ["Piano Concerto No. 20 in D minor, K. 466 — I. Allegro", "피아노 협주곡 20번 D단조 K. 466 — 1악장 알레그로"],
        ["Sinfonia Concertante in E-flat major, K. 364 — II. Andante", "신포니아 콘체르탄테 E♭장조 K. 364 — 2악장 안단테"],
        ["Piano Sonata No. 8 in A minor, K. 310 — I. Allegro maestoso", "피아노 소나타 8번 A단조 K. 310 — 1악장 알레그로 마에스토소"],
        ["The Marriage of Figaro — “Sull’aria” (Letter Duet)", "피가로의 결혼 — 편지 이중창 “산들바람에 실려”"],
        ["Requiem, K. 626 — Dies irae", "레퀴엠 K. 626 — 진노의 날"],
        ["Fantasia in D minor, K. 397", "환상곡 D단조 K. 397"],
        ["Symphony No. 39 in E-flat major, K. 543 — III. Menuetto: Allegretto", "교향곡 39번 E♭장조 K. 543 — 3악장 미뉴에트"],
        ["Piano Concerto No. 23 in A major, K. 488 — II. Adagio", "피아노 협주곡 23번 A장조 K. 488 — 2악장 아다지오"],
        ["Clarinet Quintet in A major, K. 581 — II. Larghetto", "클라리넷 오중주 A장조 K. 581 — 2악장 라르게토"],
        ["Horn Concerto No. 4 in E-flat major, K. 495 — III. Rondo: Allegro vivace", "호른 협주곡 4번 E♭장조 K. 495 — 3악장 론도 알레그로 비바체"],
        ["Piano Sonata No. 16 “Sonata facile”, K. 545 — I. Allegro", "피아노 소나타 16번 “쉬운 소나타” K. 545 — 1악장 알레그로"],
        ["Divertimento in D major, K. 136 — I. Allegro", "디베르티멘토 D장조 K. 136 — 1악장 알레그로"],
        ["Piano Concerto No. 19 in F major, K. 459 — II. Allegretto", "피아노 협주곡 19번 F장조 K. 459 — 2악장 알레그레토"],
        ["Piano Concerto No. 22 in E-flat major, K. 482 — II. Andante", "피아노 협주곡 22번 E♭장조 K. 482 — 2악장 안단테"],
        ["Piano Concerto No. 25 in C major, K. 503 — II. Andante", "피아노 협주곡 25번 C장조 K. 503 — 2악장 안단테"],
        ["Piano Concerto No. 27 in B-flat major, K. 595 — II. Larghetto", "피아노 협주곡 27번 B♭장조 K. 595 — 2악장 라르게토"],
        ["String Quartet No. 19 in C major “Dissonance”, K. 465 — I. Adagio – Allegro", "현악 사중주 19번 C장조 “불협화음” K. 465 — 1악장 아다지오 – 알레그로"],
        ["String Quartet No. 17 in B-flat major “Hunt”, K. 458 — I. Allegro vivace assai", "현악 사중주 17번 B♭장조 “사냥” K. 458 — 1악장 알레그로 비바체 아사이"],
        ["String Quartet No. 15 in D minor, K. 421 — I. Allegro moderato", "현악 사중주 15번 D단조 K. 421 — 1악장 알레그로 모데라토"],
        ["12 Variations on “Ah, vous dirai-je, Maman”, K. 265", "“아, 어머니께 말씀드리죠” 주제에 의한 12개의 변주곡 K. 265 (작은 별 변주곡)"],
        ["String Quartet No. 14 in G major, K. 387 — I. Allegro vivace assai", "현악 사중주 14번 G장조 K. 387 — 1악장 알레그로 비바체 아사이"],
        ["String Quartet No. 14 in G major, K. 387 — III. Andante cantabile", "현악 사중주 14번 G장조 K. 387 — 3악장 안단테 칸타빌레"],
        ["Sonata in C major for piano four hands, K. 521", "피아노 4손 소나타 C장조 K. 521"],
        ["Don Giovanni — “Là ci darem la mano”", "돈 조반니 — “그대 손을 잡아요”"]
      ],
      beethoven: [
        ["Symphony No. 5, Op. 67 — I. Allegro con brio", "교향곡 5번 Op. 67 — 1악장 알레그로 콘 브리오"],
        ["Symphony No. 9, Op. 125 — IV. “Ode to Joy”", "교향곡 9번 Op. 125 — 4악장 “환희의 송가”"],
        ["Piano Sonata No. 14 “Moonlight”, Op. 27 No. 2 — I. Adagio sostenuto", "피아노 소나타 14번 “월광” Op. 27 No. 2 — 1악장 아다지오 소스테누토"],
        ["Symphony No. 7, Op. 92 — II. Allegretto", "교향곡 7번 Op. 92 — 2악장 알레그레토"],
        ["Piano Concerto No. 5 “Emperor”, Op. 73 — II. Adagio un poco mosso", "피아노 협주곡 5번 “황제” Op. 73 — 2악장 아다지오 운 포코 모소"],
        ["Violin Concerto in D major, Op. 61 — I. Allegro ma non troppo", "바이올린 협주곡 D장조 Op. 61 — 1악장 알레그로 마 논 트로포"],
        ["Piano Sonata No. 8 “Pathétique”, Op. 13 — II. Adagio cantabile", "피아노 소나타 8번 “비창” Op. 13 — 2악장 아다지오 칸타빌레"],
        ["Symphony No. 6 “Pastoral”, Op. 68 — I. Allegro ma non troppo", "교향곡 6번 “전원” Op. 68 — 1악장 알레그로 마 논 트로포"],
        ["Egmont Overture, Op. 84", "에그몬트 서곡 Op. 84"],
        ["Piano Concerto No. 5 “Emperor”, Op. 73 — I. Allegro", "피아노 협주곡 5번 “황제” Op. 73 — 1악장"],
        ["Symphony No. 5, Op. 67 — II. Andante con moto", "교향곡 5번 Op. 67 — 2악장 안단테 콘 모토"],
        ["Romance No. 2 in F major, Op. 50", "로망스 2번 F장조 Op. 50"],
        ["Piano Sonata No. 23 “Appassionata”, Op. 57 — III. Allegro ma non troppo", "피아노 소나타 23번 “열정” Op. 57 — 3악장 알레그로 마 논 트로포"],
        ["Symphony No. 3 “Eroica”, Op. 55 — II. Marcia funebre: Adagio assai", "교향곡 3번 “영웅” Op. 55 — 2악장 장송 행진곡"],
        ["Violin Concerto in D major, Op. 61 — II. Larghetto", "바이올린 협주곡 D장조 Op. 61 — 2악장 라르게토"],
        ["String Quartet No. 13 in B-flat major, Op. 130 — V. Cavatina", "현악 사중주 13번 B♭장조 Op. 130 — 5악장 카바티나"],
        ["Violin Sonata No. 5 “Spring”, Op. 24 — I. Allegro", "바이올린 소나타 5번 “봄” Op. 24 — 1악장 알레그로"],
        ["Piano Sonata No. 17 “Tempest”, Op. 31 No. 2 — III. Allegretto", "피아노 소나타 17번 “템페스트” Op. 31 No. 2 — 3악장 알레그레토"],
        ["Piano Trio “Archduke”, Op. 97 — III. Andante cantabile", "피아노 삼중주 7번 “대공” Op. 97 — 3악장 안단테 칸타빌레"],
        ["Piano Sonata No. 30 in E major, Op. 109 — I. Vivace ma non troppo – Adagio espressivo", "피아노 소나타 30번 E장조 Op. 109 — 1악장 비바체 마 논 트로포"],
        ["Piano Sonata No. 31 in A-flat major, Op. 110 — I. Moderato cantabile molto espressivo", "피아노 소나타 31번 A♭장조 Op. 110 — 1악장 모데라토 칸타빌레"],
        ["Cello Sonata No. 5 in D major, Op. 102 No. 2 — I. Allegro con brio", "첼로 소나타 5번 D장조 Op. 102 No. 2 — 1악장 알레그로 콘 브리오"],
        ["Cello Sonata No. 3 in A major, Op. 69 — I. Allegro, ma non tanto", "첼로 소나타 3번 A장조 Op. 69 — 1악장 알레그로 마 논 탄토"]
      ],
      gluck: [
        ["Orfeo ed Euridice — Dance of the Blessed Spirits", "오르페오와 에우리디체 — 축복받은 영혼들의 춤"],
        ["Orfeo ed Euridice — “Che farò senza Euridice?”", "오르페오와 에우리디체 — “에우리디체 없이 나는 어찌 살까”"],
        ["Orfeo ed Euridice — Overture", "오르페오와 에우리디체 — 서곡"],
        ["Iphigénie en Tauride — Overture", "타우리스의 이피게네이아 — 서곡"],
        ["Alceste — “Divinités du Styx”", "알체스테 — “저승의 신들이여”"],
        ["Armide — Passacaille", "아르미드 — 파사칼리아"],
        ["Don Juan (ballet) — Dance of the Furies", "돈 후안(발레) — 복수의 여신들의 춤"],
        ["Paride ed Elena — “O del mio dolce ardor”", "파리데와 엘레나 — “오 내 달콤한 열정이여”"],
        ["Iphigénie en Aulide — Overture", "아울리스의 이피게네이아 — 서곡"],
        ["Alceste — Overture", "알체스테 — 서곡"],
      ],
      bach: [
        ["Brandenburg Concerto No. 5 in D major, BWV 1050", "브란덴부르크 협주곡 5번 D장조 BWV 1050"],
        ["Brandenburg Concerto No. 3 in G major, BWV 1048", "브란덴부르크 협주곡 3번 G장조 BWV 1048"],
        ["Orchestral Suite No. 3 — Air, BWV 1068", "관현악 모음곡 3번 — 아리아 BWV 1068"],
        ["Toccata and Fugue in D minor, BWV 565", "토카타와 푸가 D단조 BWV 565"],
        ["Goldberg Variations, BWV 988", "골드베르크 변주곡 BWV 988"],
        ["The Well-Tempered Clavier, Book I — Prelude in C major, BWV 846", "평균율 클라비어 곡집 1권 — 프렐류드 C장조 BWV 846"],
        ["Cello Suite No. 1 in G major, BWV 1007", "무반주 첼로 모음곡 1번 G장조 BWV 1007"],
        ["Violin Partita No. 2 in D minor — Chaconne, BWV 1004", "바이올린 파르티타 2번 D단조 — 샤콘 BWV 1004"],
        ["St Matthew Passion, BWV 244", "마태 수난곡 BWV 244"],
        ["Mass in B minor, BWV 232", "B단조 미사 BWV 232"],
        ["Orchestral Suite No. 3 in D major, BWV 1068 — II. Air (“Air on the G String”)", "관현악 모음곡 3번 D장조 BWV 1068 — 2악장 아리아 (“G선상의 아리아”)"],
        ["Orchestral Suite No. 2 in B minor, BWV 1067 — VII. Badinerie", "관현악 모음곡 2번 B단조 BWV 1067 — 7곡 바디네리"],
        ["Goldberg Variations, BWV 988 — Aria", "골드베르크 변주곡 BWV 988 — 아리아"],
        ["Cello Suite No. 1 in G major, BWV 1007 — Prélude", "무반주 첼로 모음곡 1번 G장조 BWV 1007 — 프렐류드"],
        ["Violin Partita No. 2 in D minor, BWV 1004 — V. Chaconne", "바이올린 파르티타 2번 D단조 BWV 1004 — 5곡 샤콘"],
        ["Passacaglia and Fugue in C minor, BWV 582", "파사칼리아와 푸가 C단조 BWV 582"],
        ["Concerto for Two Violins in D minor, BWV 1043 — I. Vivace", "두 대의 바이올린을 위한 협주곡 D단조 BWV 1043 — 1악장 비바체"],
        ["Concerto for Two Violins in D minor, BWV 1043 — II. Largo ma non troppo", "두 대의 바이올린을 위한 협주곡 D단조 BWV 1043 — 2악장 라르고 마 논 트로포"],
        ["St Matthew Passion, BWV 244 — “Erbarme dich, mein Gott”", "마태 수난곡 BWV 244 — “불쌍히 여기소서, 나의 하느님”"],
        ["Cantata BWV 147 — “Jesu, Joy of Man’s Desiring”", "칸타타 BWV 147 — “예수, 인간 소망의 기쁨”"],
        ["Brandenburg Concerto No. 3 in G major, BWV 1048 — I. Allegro", "브란덴부르크 협주곡 3번 G장조 BWV 1048 — 1악장 알레그로"],
        ["Brandenburg Concerto No. 5 in D major, BWV 1050 — I. Allegro", "브란덴부르크 협주곡 5번 D장조 BWV 1050 — 1악장 알레그로"],
        ["The Well-Tempered Clavier, Book I — Prelude No. 1 in C major, BWV 846", "평균율 클라비어곡집 1권 — 프렐류드 1번 C장조 BWV 846"],
        ["Cello Suite No. 5 in C minor, BWV 1011 — Sarabande", "무반주 첼로 모음곡 5번 C단조 BWV 1011 — 사라방드"],
        ["Violin Concerto in A minor, BWV 1041 — I. Allegro moderato", "바이올린 협주곡 A단조 BWV 1041 — 1악장"],
        ["Keyboard Concerto No. 5 in F minor, BWV 1056 — II. Largo", "건반 협주곡 5번 F단조 BWV 1056 — 2악장 라르고"],
        ["Mass in B minor, BWV 232 — Agnus Dei", "미사 B단조 BWV 232 — 아뉴스 데이"],
        ["St Matthew Passion, BWV 244 — Opening chorus “Kommt, ihr Töchter”", "마태 수난곡 BWV 244 — 첫 합창 “오라, 딸들아”"],
        ["Italian Concerto in F major, BWV 971 — III. Presto", "이탈리아 협주곡 F장조 BWV 971 — 3악장 프레스토"],
        ["Cantata BWV 208 — “Sheep May Safely Graze”", "칸타타 BWV 208 — “양들은 한가로이 풀을 뜯고”"],
        ["French Suite No. 1 in D minor, BWV 812 — I. Allemande", "프랑스 모음곡 1번 D단조 BWV 812 — 1곡 알르망드"],
        ["Chorale Prelude “Ich ruf zu dir, Herr Jesu Christ”, BWV 639", "코랄 전주곡 “주 예수 그리스도여, 당신께 부르짖나이다” BWV 639"],
        ["Flute Sonata in E-flat major, BWV 1031 — II. Siciliano", "플루트 소나타 E♭장조 BWV 1031 — 2악장 시칠리아노"]
      ],
      handel: [
        ["Messiah, HWV 56 — Hallelujah Chorus", "메시아 HWV 56 — 할렐루야 합창"],
        ["Water Music, HWV 348–350", "수상 음악 HWV 348–350"],
        ["Music for the Royal Fireworks, HWV 351", "왕궁의 불꽃놀이 HWV 351"],
        ["Zadok the Priest, HWV 258", "제사장 사독 HWV 258"],
        ["Giulio Cesare — “Piangerò la sorte mia”", "줄리오 체사레 — “내 운명을 한탄하리”"],
        ["Serse — “Ombra mai fu”", "세르세 — “그리운 나무 그늘이여”"],
        ["Rinaldo — “Lascia ch’io pianga”", "리날도 — “울게 하소서”"],
        ["Solomon — The Arrival of the Queen of Sheba, HWV 67", "솔로몬 — 시바 여왕의 도착 HWV 67"],
        ["Concerto Grosso in G minor, Op. 6 No. 6", "합주 협주곡 G단조 Op. 6 No. 6"],
        ["Keyboard Suite No. 5 in E major, HWV 430 — “The Harmonious Blacksmith”", "건반 모음곡 5번 E장조 HWV 430 — “즐거운 대장장이”"],
        ["Minuet in G Minor, HWV 434 No. 4 (Arr. Kempff for Piano)", "미뉴에트 G단조 HWV 434 — 4번"],
        ["Music for the Royal Fireworks — Overture, HWV 351", "왕궁의 불꽃놀이 — 서곡 HWV 351"],
        ["Messiah — Hallelujah Chorus", "메시아 — 할렐루야 합창"],
        ["Messiah — “I know that my Redeemer liveth”", "메시아 — “나는 내 구원자가 살아 계심을 아네”"],
        ["Water Music, Suite No. 2 in D major — Alla Hornpipe", "수상 음악 모음곡 2번 D장조 — 알라 혼파이프"]
      ],
      vivaldi: [
        ["The Four Seasons — Spring, RV 269", "사계 — 봄 RV 269"],
        ["The Four Seasons — Summer, RV 315", "사계 — 여름 RV 315"],
        ["The Four Seasons — Autumn, RV 293", "사계 — 가을 RV 293"],
        ["The Four Seasons — Winter, RV 297", "사계 — 겨울 RV 297"],
        ["Gloria in D major, RV 589", "글로리아 D장조 RV 589"],
        ["Concerto for Two Violins in A minor, RV 522", "두 대의 바이올린을 위한 협주곡 A단조 RV 522"],
        ["Mandolin Concerto in C major, RV 425", "만돌린 협주곡 C장조 RV 425"],
        ["Concerto for Four Violins in B minor, RV 580", "네 대의 바이올린을 위한 협주곡 B단조 RV 580"],
        ["Stabat Mater, RV 621", "스타바트 마테르 RV 621"],
        ["Flute Concerto in D major “Il gardellino”, RV 428", "플루트 협주곡 D장조 “홍방울새” RV 428"],
        ["The Four Seasons — Spring: I. Allegro", "사계 — 봄 1악장 알레그로"],
        ["The Four Seasons — Summer: III. Presto", "사계 — 여름 3악장 프레스토"],
        ["The Four Seasons — Winter: I. Allegro non molto", "사계 — 겨울 1악장 알레그로 논 몰토"],
        ["Gloria in D major, RV 589 — I. Gloria in excelsis Deo", "글로리아 D장조 RV 589 — 1곡 “지극히 높은 곳에서 영광”"]
      ],
      purcell: [
        ["Dido and Aeneas, Z. 626 — “When I am laid in earth”", "디도와 아이네아스 Z. 626 — “내가 땅에 묻힐 때”"],
        ["Dido and Aeneas — Overture", "디도와 아이네아스 — 서곡"],
        ["Abdelazer, Z. 570 — Rondeau", "압델라자르 Z. 570 — 론도"],
        ["Music for the Funeral of Queen Mary, Z. 860", "메리 여왕 장례 음악 Z. 860"],
        ["Come ye Sons of Art, Z. 323", "오라, 예술의 아들들이여 Z. 323"],
        ["King Arthur, Z. 628 — “What power art thou” (Cold Song)", "아서 왕 Z. 628 — “그대는 어떤 힘인가” (냉기의 노래)"],
        ["The Fairy-Queen, Z. 629 — “The Plaint (O let me weep)”", "요정 여왕 Z. 629 — “탄식 (오, 울게 해 주오)”"],
        ["Chacony in G minor, Z. 730", "샤코니 G단조 Z. 730"],
        ["Music for a while, Z. 583", "잠시 동안의 음악 Z. 583"],
        ["Fantazia upon one note, Z. 745", "한 음 위의 판타지아 Z. 745"],
        ["Dido and Aeneas — “When I am laid in earth” (Dido’s Lament)", "디도와 아이네아스 — “내가 땅에 묻힐 때” (디도의 탄식)"]
      ],
      scarlatti: [
        ["Keyboard Sonata in D minor, K. 141", "건반 소나타 D단조 K. 141"],
        ["Keyboard Sonata in B minor, K. 27", "건반 소나타 B단조 K. 27"],
        ["Keyboard Sonata in E major, K. 380", "건반 소나타 E장조 K. 380"],
        ["Keyboard Sonata in D minor, K. 9 “Pastorale”", "건반 소나타 D단조 K. 9 “파스토랄레”"],
        ["Keyboard Sonata in C major, K. 159 “The Hunt”", "건반 소나타 C장조 K. 159 “사냥”"],
        ["Keyboard Sonata in F minor, K. 466", "건반 소나타 F단조 K. 466"],
        ["Keyboard Sonata in D minor, K. 1", "건반 소나타 D단조 K. 1"],
        ["Keyboard Sonata in B minor, K. 87", "건반 소나타 B단조 K. 87"],
        ["Keyboard Sonata in D minor, K. 213", "건반 소나타 D단조 K. 213"],
        ["Keyboard Sonata in D major, K. 492", "건반 소나타 D장조 K. 492"],
      ],
      clementi: [
        ["Sonatina in C major, Op. 36 No. 1", "소나티나 C장조 Op. 36 No. 1"],
        ["Sonatina in G major, Op. 36 No. 2", "소나티나 G장조 Op. 36 No. 2"],
        ["Sonatina in C major, Op. 36 No. 3", "소나티나 C장조 Op. 36 No. 3"],
        ["Sonatina in F major, Op. 36 No. 4", "소나티나 F장조 Op. 36 No. 4"],
        ["Sonatina in G major, Op. 36 No. 5", "소나티나 G장조 Op. 36 No. 5"],
        ["Sonatina in D major, Op. 36 No. 6", "소나티나 D장조 Op. 36 No. 6"],
        ["Piano Sonata in G minor, Op. 50 No. 3 “Didone abbandonata”", "피아노 소나타 G단조 Op. 50 No. 3 “버림받은 디도”"],
        ["Piano Sonata in F-sharp minor, Op. 25 No. 5", "피아노 소나타 올림F단조 Op. 25 No. 5"],
        ["Piano Sonata in B minor, Op. 40 No. 2", "피아노 소나타 B단조 Op. 40 No. 2"],
        ["Symphony No. 1 in C major, WoO 32", "교향곡 1번 C장조 WoO 32"],
      ],
      schubert: [
        ["Ave Maria, D. 839", "아베 마리아 D. 839"],
        ["Symphony No. 8 “Unfinished”, D. 759 — I. Allegro moderato", "교향곡 8번 “미완성” D. 759 — 1악장 알레그로 모데라토"],
        ["Piano Quintet “Trout”, D. 667 — IV. Andantino", "피아노 오중주 “송어” D. 667 — 4악장 안단티노"],
        ["Impromptu in G-flat major, Op. 90 No. 3, D. 899", "즉흥곡 내림G장조 Op. 90 No. 3 D. 899", "LUp2u9wI1fY", "Khatia Buniatishvili, piano"],
        ["Ständchen (Serenade), D. 957 No. 4", "세레나데 D. 957 No. 4"],
        ["String Quartet No. 14 “Death and the Maiden”, D. 810 — II. Andante con moto", "현악 사중주 14번 “죽음과 소녀” D. 810 — 2악장 안단테 콘 모토"],
        ["Piano Trio No. 2, D. 929 — II. Andante con moto", "피아노 삼중주 2번 D. 929 — 2악장 안단테 콘 모토"],
        ["Winterreise, D. 911 — “Der Lindenbaum”", "겨울 나그네 D. 911 — “보리수”"],
        ["Symphony No. 9 “The Great”, D. 944 — IV. Allegro vivace", "교향곡 9번 “그레이트” D. 944 — 4악장 알레그로 비바체"],
        ["Moments musicaux, D. 780 — No. 3 in F minor", "악흥의 순간 D. 780 — 3번 F단조"],
        ["Impromptu in C minor, Op. 90 No. 1, D. 899", "즉흥곡 C단조 Op. 90 No. 1 (D. 899)"],
        ["Impromptu in E-flat major, Op. 90 No. 2, D. 899", "즉흥곡 E♭장조 Op. 90 No. 2 (D. 899)"],
        ["Fantasia in F minor, D. 940 (piano four hands)", "환상곡 F단조 D. 940 (피아노 4손)"],
        ["Arpeggione Sonata in A minor, D. 821 — I. Allegro moderato", "아르페지오네 소나타 A단조 D. 821 — 1악장 알레그로 모데라토"],
        ["Arpeggione Sonata in A minor, D. 821 — II. Adagio", "아르페지오네 소나타 A단조 D. 821 — 2악장 아다지오"],
        ["String Quartet No. 14 “Death and the Maiden”, D. 810 — I. Allegro", "현악 사중주 14번 “죽음과 소녀” D. 810 — 1악장 알레그로"],
        ["String Quintet in C major, D. 956 — II. Adagio", "현악 오중주 C장조 D. 956 — 2악장 아다지오"],
        ["Piano Trio No. 2 in E-flat major, D. 929 — II. Andante con moto", "피아노 삼중주 2번 E♭장조 D. 929 — 2악장 안단테 콘 모토"],
        ["Piano Sonata in B-flat major, D. 960 — I. Molto moderato", "피아노 소나타 B♭장조 D. 960 — 1악장 몰토 모데라토"],
        ["Piano Sonata in A major, D. 664 — III. Allegro", "피아노 소나타 A장조 D. 664 — 3악장 알레그로"],
        ["Piano Sonata in A major, D. 959 — I. Allegro", "피아노 소나타 A장조 D. 959 — 1악장 알레그로"],
        ["Piano Sonata in A major, D. 959 — IV. Rondo: Allegretto", "피아노 소나타 A장조 D. 959 — 4악장 론도: 알레그레토"],
        ["Schwanengesang, D. 957 — “Ständchen” (Serenade)", "백조의 노래 D. 957 — “세레나데”"],
        ["Die Forelle, D. 550", "송어 D. 550"],
        ["Symphony No. 9 “Great”, D. 944 — I. Andante – Allegro ma non troppo", "교향곡 9번 “그레이트” D. 944 — 1악장"],
        ["Erlkönig, D. 328", "마왕 D. 328"],
        ["Impromptu in G-flat major, D. 899 No. 3", "즉흥곡 G♭장조 D. 899 No. 3"],
        ["An die Musik, D. 547", "음악에 부쳐 D. 547"]
      ],
      chopin: [
        ["Nocturne in E-flat major, Op. 9 No. 2", "녹턴 내림E장조 Op. 9 No. 2"],
        ["Ballade No. 1 in G minor, Op. 23", "발라드 1번 G단조 Op. 23"],
        ["Étude in E major, Op. 10 No. 3 “Tristesse”", "에튀드 E장조 Op. 10 No. 3 “이별의 곡”"],
        ["Étude in C minor, Op. 10 No. 12 “Revolutionary”", "에튀드 C단조 Op. 10 No. 12 “혁명”"],
        ["Fantaisie-Impromptu in C-sharp minor, Op. 66", "환상 즉흥곡 올림C단조 Op. 66"],
        ["Waltz in D-flat major, Op. 64 No. 1 “Minute”", "왈츠 내림D장조 Op. 64 No. 1 “강아지”"],
        ["Piano Concerto No. 2, Op. 21 — II. Larghetto", "피아노 협주곡 2번 Op. 21 — 2악장 라르게토"],
        ["Polonaise in A-flat major, Op. 53 “Heroic”", "폴로네이즈 내림A장조 Op. 53 “영웅”"],
        ["Prelude in D-flat major, Op. 28 No. 15 “Raindrop”", "전주곡 내림D장조 Op. 28 No. 15 “빗방울”"],
        ["Piano Sonata No. 2, Op. 35 — III. Marche funèbre", "피아노 소나타 2번 Op. 35 — 3악장 장송 행진곡"],
        ["Nocturne in F minor, Op. 55 No. 1", "녹턴 F단조 Op. 55 No. 1"],
        ["Nocturne No. 20 in C-sharp minor, Op. posth.", "녹턴 20번 C♯단조 (유작)"],
        ["Nocturne in D-flat major, Op. 27 No. 2", "녹턴 D♭장조 Op. 27 No. 2"],
        ["Nocturne in C minor, Op. 48 No. 1", "녹턴 C단조 Op. 48 No. 1"],
        ["Ballade No. 4 in F minor, Op. 52", "발라드 4번 F단조 Op. 52"],
        ["Barcarolle in F-sharp major, Op. 60", "뱃노래 F♯장조 Op. 60"],
        ["Étude in A-flat major, Op. 25 No. 1 “Aeolian Harp”", "에튀드 A♭장조 Op. 25 No. 1 “에올리안 하프”"],
        ["Étude in A minor, Op. 25 No. 11 “Winter Wind”", "에튀드 A단조 Op. 25 No. 11 “겨울바람”"],
        ["Prelude in E minor, Op. 28 No. 4", "프렐류드 E단조 Op. 28 No. 4"],
        ["Piano Concerto No. 1 in E minor, Op. 11 — II. Romance: Larghetto", "피아노 협주곡 1번 E단조 Op. 11 — 2악장 로망스"],
        ["Mazurka in A minor, Op. 17 No. 4", "마주르카 A단조 Op. 17 No. 4"],
        ["Andante spianato et Grande polonaise brillante, Op. 22", "안단테 스피아나토와 화려한 대 폴로네즈 Op. 22"],
        ["Scherzo No. 2 in B-flat minor, Op. 31", "스케르초 2번 B♭단조 Op. 31"],
        ["Piano Sonata No. 2, Op. 35 — IV. Finale: Presto", "피아노 소나타 2번 Op. 35 — 4악장 프레스토"],
        ["Polonaise in A-flat major “Heroic”, Op. 53", "폴로네이즈 A♭장조 “영웅” Op. 53"],
        ["Waltz in A minor, B. 150, Op. posth.", "왈츠 A단조 B. 150 (유작)"],
        ["Nocturne in B major, Op. 32 No. 1", "녹턴 B장조 Op. 32 No. 1"],
        ["Ballade No. 2 in F major, Op. 38", "발라드 2번 F장조 Op. 38"],
        ["Ballade No. 3 in A-flat major, Op. 47", "발라드 3번 A♭장조 Op. 47"],
        ["Nocturne in F-sharp major, Op. 15 No. 2", "녹턴 F♯장조 Op. 15 No. 2"],
        ["Waltz in A-flat major, Op. 34 No. 1", "왈츠 A♭장조 Op. 34 No. 1"],
        ["Waltz in F major, Op. 34 No. 3", "왈츠 F장조 Op. 34 No. 3"]
      ],
      schumann: [
        ["Kinderszenen, Op. 15 — No. 7 “Träumerei”", "어린이의 정경 Op. 15 — 7번 “트로이메라이”"],
        ["Piano Concerto in A minor, Op. 54 — I. Allegro affettuoso", "피아노 협주곡 A단조 Op. 54 — 1악장 알레그로 아페투오소"],
        ["Carnaval, Op. 9", "카니발 Op. 9"],
        ["Symphony No. 3 “Rhenish”, Op. 97 — IV. Feierlich", "교향곡 3번 “라인” Op. 97 — 4악장 장엄하게"],
        ["Dichterliebe, Op. 48 — “Im wunderschönen Monat Mai”", "시인의 사랑 Op. 48 — “아름다운 5월에”"],
        ["Widmung (Myrthen, Op. 25 No. 1)", "헌정 (미르텐 Op. 25 No. 1)"],
        ["Fantasiestücke, Op. 12 — “Des Abends”", "환상 소곡집 Op. 12 — “저녁에”"],
        ["Papillons, Op. 2", "나비 Op. 2"],
        ["Symphonic Etudes, Op. 13", "교향적 연습곡 Op. 13"],
        ["Kreisleriana, Op. 16", "크라이슬레리아나 Op. 16"],
        ["Fantasiestücke, Op. 73 — No. 1 “Zart und mit Ausdruck” (cello and piano)", "환상소곡집 Op. 73 — 1번 “부드럽고 표정 있게”"],
        ["Kinderszenen, Op. 15 — No. 1 “Von fremden Ländern und Menschen”", "어린이의 정경 Op. 15 — 1번 “낯선 나라와 사람들에 대하여”"]
      ],
      liszt: [
        ["Liebesträume No. 3 in A-flat major, S. 541", "사랑의 꿈 3번 내림A장조 S. 541"],
        ["La campanella (Grandes études de Paganini, S. 141 No. 3)", "라 캄파넬라 (파가니니 대연습곡 S. 141 No. 3)"],
        ["Hungarian Rhapsody No. 2, S. 244", "헝가리 광시곡 2번 S. 244"],
        ["Un sospiro (Trois études de concert, S. 144 No. 3)", "탄식 (세 개의 연주회용 연습곡 S. 144 No. 3)"],
        ["Consolation No. 3 in D-flat major, S. 172", "위안 3번 내림D장조 S. 172"],
        ["Piano Sonata in B minor, S. 178", "피아노 소나타 B단조 S. 178"],
        ["Mephisto Waltz No. 1, S. 514", "메피스토 왈츠 1번 S. 514"],
        ["Les préludes, S. 97", "전주곡 S. 97"],
        ["Années de pèlerinage — “Au bord d’une source”", "순례의 해 — “샘가에서”"],
        ["Piano Concerto No. 1 in E-flat major, S. 124", "피아노 협주곡 1번 내림E장조 S. 124"],
        ["Funérailles, S. 173 No. 7", "장송곡 S. 173 No. 7"],
        ["Un sospiro (Three Concert Études, S. 144 No. 3)", "한숨 (세 개의 연주회용 에튀드 S. 144 No. 3)"],
        ["Totentanz, S. 126", "죽음의 무도 S. 126"],
        ["Consolation No. 1 in E major, S. 172", "위안 1번 E장조 S. 172"]
      ],
      brahms: [
        ["Symphony No. 3, Op. 90 — III. Poco allegretto", "교향곡 3번 Op. 90 — 3악장 포코 알레그레토"],
        ["Hungarian Dance No. 5", "헝가리 무곡 5번"],
        ["Wiegenlied (Lullaby), Op. 49 No. 4", "자장가 Op. 49 No. 4"],
        ["Intermezzo in A major, Op. 118 No. 2", "간주곡 A장조 Op. 118 No. 2"],
        ["Piano Concerto No. 2, Op. 83 — III. Andante", "피아노 협주곡 2번 Op. 83 — 3악장 안단테"],
        ["Violin Concerto in D major, Op. 77 — II. Adagio", "바이올린 협주곡 D장조 Op. 77 — 2악장 아다지오"],
        ["Symphony No. 1, Op. 68 — IV. Adagio – Allegro non troppo, ma con brio", "교향곡 1번 Op. 68 — 4악장 아다지오 – 알레그로 논 트로포"],
        ["A German Requiem, Op. 45 — “Wie lieblich sind deine Wohnungen”", "독일 레퀴엠 Op. 45 — “주의 장막이 어찌 그리 사랑스러운지요”"],
        ["Clarinet Quintet in B minor, Op. 115 — I. Allegro", "클라리넷 오중주 B단조 Op. 115 — 1악장 알레그로"],
        ["Symphony No. 4, Op. 98 — I. Allegro non troppo", "교향곡 4번 Op. 98 — 1악장 알레그로 논 트로포"],
        ["Symphony No. 4, Op. 98 — IV. Allegro energico e passionato", "교향곡 4번 Op. 98 — 4악장 알레그로 에네르지코 에 파시오나토"],
        ["Hungarian Dance No. 5 in G minor", "헝가리 무곡 5번 G단조"],
        ["Intermezzo in E-flat minor, Op. 118 No. 6", "간주곡 E♭단조 Op. 118 No. 6"],
        ["Intermezzo in E-flat major, Op. 117 No. 1", "간주곡 E♭장조 Op. 117 No. 1"],
        ["Symphony No. 1 in C minor, Op. 68 — IV. Adagio – Allegro non troppo", "교향곡 1번 C단조 Op. 68 — 4악장"],
        ["Piano Concerto No. 2 in B-flat major, Op. 83 — III. Andante", "피아노 협주곡 2번 B♭장조 Op. 83 — 3악장 안단테"],
        ["Clarinet Quintet in B minor, Op. 115 — II. Adagio", "클라리넷 오중주 B단조 Op. 115 — 2악장 아다지오"],
        ["String Sextet No. 1 in B-flat major, Op. 18 — II. Andante ma moderato", "현악 육중주 1번 B♭장조 Op. 18 — 2악장 안단테 마 모데라토"],
        ["Cello Sonata No. 1 in E minor, Op. 38 — I. Allegro non troppo", "첼로 소나타 1번 E단조 Op. 38 — 1악장"],
        ["Waltz in A-flat major, Op. 39 No. 15", "왈츠 A♭장조 Op. 39 No. 15"],
        ["Symphony No. 2 in D major, Op. 73 — I. Allegro non troppo", "교향곡 2번 D장조 Op. 73 — 1악장"],
        ["Academic Festival Overture, Op. 80", "대학 축전 서곡 Op. 80"],
        ["Rhapsody in G minor, Op. 79 No. 2", "랩소디 G단조 Op. 79 No. 2"],
        ["Symphony No. 1 in C minor, Op. 68 — II. Andante sostenuto", "교향곡 1번 C단조 Op. 68 — 2악장 안단테 소스테누토"]
      ],
      tchaikovsky: [
        ["Swan Lake — Scene (Act II)", "백조의 호수 — 정경 (2막)"],
        ["Piano Concerto No. 1 in B-flat minor, Op. 23 — I. Allegro non troppo e molto maestoso", "피아노 협주곡 1번 내림나단조 Op. 23 — 1악장"],
        ["Symphony No. 5, Op. 64 — II. Andante cantabile", "교향곡 5번 Op. 64 — 2악장 안단테 칸타빌레"],
        ["The Nutcracker — Waltz of the Flowers", "호두까기 인형 — 꽃의 왈츠"],
        ["Romeo and Juliet, Fantasy-Overture", "로미오와 줄리엣 환상 서곡"],
        ["1812 Overture, Op. 49", "1812년 서곡 Op. 49"],
        ["Violin Concerto in D major, Op. 35 — II. Canzonetta", "바이올린 협주곡 D장조 Op. 35 — 2악장 칸초네타"],
        ["Symphony No. 6 “Pathétique”, Op. 74 — IV. Adagio lamentoso", "교향곡 6번 “비창” Op. 74 — 4악장 아다지오 라멘토소"],
        ["The Sleeping Beauty — Waltz", "잠자는 숲속의 미녀 — 왈츠"],
        ["Serenade for Strings in C major, Op. 48 — II. Waltz", "현악 세레나데 C장조 Op. 48 — 2악장 왈츠"],
        ["Francesca da Rimini, Op. 32", "프란체스카 다 리미니 Op. 32"],
        ["Symphony No. 5 in E minor, Op. 64 — IV. Finale: Andante maestoso – Allegro vivace", "교향곡 5번 Op. 64 — 4악장"],
        ["Violin Concerto in D major, Op. 35 — I. Allegro moderato", "바이올린 협주곡 D장조 Op. 35 — 1악장"],
        ["Serenade for Strings in C major, Op. 48 — II. Valse", "현을 위한 세레나데 C장조 Op. 48 — 2악장 왈츠"],
        ["The Seasons, Op. 37a — June: Barcarolle", "사계 Op. 37a — 6월 “뱃노래”"],
        ["String Quartet No. 1 in D major, Op. 11 — II. Andante cantabile", "현악 사중주 1번 D장조 Op. 11 — 2악장 안단테 칸타빌레"],
        ["Symphony No. 4 in F minor, Op. 36 — I. Andante sostenuto – Moderato con anima", "교향곡 4번 F단조 Op. 36 — 1악장"],
        ["Eugene Onegin — Lensky’s Aria “Kuda, kuda”", "예브게니 오네긴 — 렌스키의 아리아 “어디로 가버렸나”"],
        ["The Seasons, Op. 37a — October: Autumn Song", "사계 Op. 37a — 10월 “가을의 노래”"],
        ["Serenade for Strings in C major, Op. 48 — I. Pezzo in forma di sonatina", "현악 세레나데 C장조 Op. 48 — 1악장 소나티네 형식의 소품"],
        ["6 Romances, Op. 6 — No. 6 “None but the Lonely Heart”", "6개의 로망스 Op. 6 — 6번 “그리움을 아는 이만이”"]
      ],
      wagner: [
        ["Lohengrin — Prelude to Act I", "로엔그린 — 1막 전주곡"],
        ["Die Walküre — “Ride of the Valkyries”", "발퀴레 — “발퀴레의 기행”"],
        ["Lohengrin — Bridal Chorus (Act III)", "로엔그린 — 혼례의 합창 (3막)"],
        ["Tristan und Isolde — Prelude", "트리스탄과 이졸데 — 전주곡"],
        ["Tristan und Isolde — Liebestod", "트리스탄과 이졸데 — 사랑의 죽음"],
        ["Tannhäuser — Overture", "탄호이저 — 서곡"],
        ["Der fliegende Holländer — Overture", "방황하는 네덜란드인 — 서곡"],
        ["Die Meistersinger von Nürnberg — Prelude (Act I)", "뉘른베르크의 명가수 — 1막 전주곡"],
        ["Siegfried Idyll", "지크프리트 목가"],
        ["Parsifal — Prelude (Act I)", "파르지팔 — 1막 전주곡"],
        ["Götterdämmerung — Siegfried’s Rhine Journey", "신들의 황혼 — 지크프리트의 라인 여행"],
        ["Götterdämmerung — Siegfried’s Funeral March", "신들의 황혼 — 지크프리트의 장송 행진곡"]
      ],
      verdi: [
        ["La traviata — Prelude to Act I", "라 트라비아타 — 1막 전주곡"],
        ["La forza del destino — Overture", "운명의 힘 — 서곡"],
        ["La traviata — “Libiamo ne’ lieti calici” (Brindisi)", "라 트라비아타 — “축배의 노래”"],
        ["Rigoletto — “La donna è mobile”", "리골레토 — “여자의 마음”"],
        ["Nabucco — “Va, pensiero” (Chorus of the Hebrew Slaves)", "나부코 — “가라, 생각이여” (히브리 노예들의 합창)"],
        ["Aida — Triumphal March", "아이다 — 개선 행진곡"],
        ["Requiem — Dies irae", "레퀴엠 — 진노의 날"],
      ],
      bizet: [
        ["Carmen — Prelude (Act I)", "카르멘 — 전주곡"],
        ["Carmen — “Habanera”", "카르멘 — “하바네라”"],
        ["Carmen — Toreador Song", "카르멘 — “투우사의 노래”"],
        ["L’Arlésienne Suite No. 2 — Farandole", "아를의 여인 모음곡 2번 — 파랑돌"],
        ["The Pearl Fishers — “Au fond du temple saint”", "진주잡이 — “신성한 사원 깊은 곳에서”"],
        ["Symphony in C — II. Adagio", "교향곡 C장조 — 2악장 아다지오"],
      ],
      rossini: [
        ["William Tell — Overture", "윌리엄 텔 — 서곡"],
        ["The Barber of Seville — Overture", "세비야의 이발사 — 서곡"],
        ["The Barber of Seville — “Largo al factotum”", "세비야의 이발사 — “나는 이 거리의 만능 일꾼”"],
        ["La gazza ladra — Overture", "도둑까치 — 서곡"],
        ["Stabat Mater", "스타바트 마테르"],
        ["Petite messe solennelle", "작은 장엄 미사"],
      ],
      mascagni: [
        ["Cavalleria rusticana — Intermezzo", "카발레리아 루스티카나 — 간주곡"],
        ["Cavalleria rusticana — Easter Hymn “Regina coeli”", "카발레리아 루스티카나 — 부활절 찬가"],
        ["L’amico Fritz — Intermezzo", "친구 프리츠 — 간주곡"],
        ["Iris — Hymn to the Sun", "이리스 — 태양의 찬가"],
      ],
      leoncavallo: [
        ["Pagliacci — Intermezzo", "팔리아치 — 간주곡"],
        ["Pagliacci — “Vesti la giubba”", "팔리아치 — “의상을 입어라”"],
        ["Pagliacci — Prologue “Si può?”", "팔리아치 — 프롤로그 “실례합니다”"],
        ["Mattinata", "마티나타 (아침의 노래)"],
      ],
      massenet: [
        ["Thaïs — Méditation", "타이스 — 명상곡"],
        ["Werther — “Pourquoi me réveiller”", "베르테르 — “봄바람이여 왜 나를 깨우는가”"],
        ["Manon — “Adieu, notre petite table”", "마농 — “안녕, 우리의 작은 식탁”"],
        ["Élégie", "엘레지"],
      ],
      puccini: [
        ["Manon Lescaut — Intermezzo (Act III)", "마농 레스코 — 3막 간주곡"],
        ["La bohème — “Che gelida manina”", "라 보엠 — “그대의 찬 손”"],
        ["La bohème — “Sì, mi chiamano Mimì”", "라 보엠 — “내 이름은 미미”"],
        ["Gianni Schicchi — “O mio babbino caro”", "잔니 스키키 — “오 사랑하는 나의 아버지”"],
        ["Turandot — “Nessun dorma”", "투란도트 — “아무도 잠들지 말라”"],
        ["Madama Butterfly — “Un bel dì vedremo”", "나비부인 — “어떤 갠 날”"],
        ["La bohème — “Mi chiamano Mimì”", "라 보엠 — “내 이름은 미미”"]
      ],
      mendelssohn: [
        ["Violin Concerto in E minor, Op. 64 — I. Allegro molto appassionato", "바이올린 협주곡 E단조 Op. 64 — 1악장"],
        ["A Midsummer Night’s Dream — Overture, Op. 21", "한여름 밤의 꿈 — 서곡 Op. 21"],
        ["Symphony No. 4 “Italian”, Op. 90 — I. Allegro vivace", "교향곡 4번 “이탈리아” Op. 90 — 1악장 알레그로 비바체"],
        ["Songs Without Words, Op. 62 No. 6 “Spring Song”", "무언가 Op. 62 No. 6 “봄의 노래”"],
        ["The Hebrides (Fingal’s Cave) Overture, Op. 26", "헤브리디스 서곡 (핑갈의 동굴) Op. 26"],
        ["Symphony No. 3 “Scottish”, Op. 56 — II. Vivace non troppo", "교향곡 3번 “스코틀랜드” Op. 56 — 2악장 비바체 논 트로포"],
        ["Octet in E-flat major, Op. 20 — I. Allegro moderato ma con fuoco", "팔중주 내림E장조 Op. 20 — 1악장"],
        ["Piano Trio No. 1 in D minor, Op. 49 — I. Molto allegro ed agitato", "피아노 삼중주 1번 D단조 Op. 49 — 1악장"],
        ["Hear My Prayer — “O for the wings of a dove”", "내 기도를 들으소서 — “오, 비둘기의 날개가 있다면”"],
        ["A Midsummer Night’s Dream — Scherzo, Op. 61", "한여름 밤의 꿈 — 스케르초 Op. 61"],
        ["A Midsummer Night’s Dream — Nocturne", "한여름 밤의 꿈 — 녹턴"],
        ["Violin Concerto in E minor, Op. 64 — III. Allegro molto vivace", "바이올린 협주곡 E단조 Op. 64 — 3악장 알레그로 몰토 비바체"]
      ],
    };

    let cmpTouched = false;   // until the visitor taps a composer, the top card wears a "tap me" hint
    function openComposer(id) {
      track('composer_open', { composer: id });
      selectedComposer = id; cmpTouched = true;
      renderComposers();
      renderComposerDetail();
      setTimeout(() => document.getElementById('cmp-detail').scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
    }

    // Composer cards, ordered by how well each composer's pieces match the chosen paintings
    const OPERA_COMPOSERS = new Set(['verdi', 'bizet', 'rossini', 'mascagni', 'leoncavallo', 'massenet', 'puccini']);
    let operaOpen = false;
    // Composer portraits — every file is Public Domain on Wikimedia Commons (checked 2026-10-07).
    const PORTRAIT = {
      bach: 'Johann_Sebastian_Bach.jpg',                                                     // Elias Gottlob Haussmann
      handel: 'George_Frideric_Handel_by_Balthasar_Denner.jpg',                              // Balthasar Denner
      vivaldi: 'Vivaldi.jpg',                                                                // unidentified painter
      purcell: 'Portrait_of_Henry_Purcell_(cropped).png',                                    // John Closterman
      scarlatti: 'Retrato_de_Domenico_Scarlatti.jpg',                                        // Domingo Antonio Velasco
      haydn: 'Joseph_Haydn.jpg',                                                             // Thomas Hardy
      mozart: 'The_Mozart_Family_-_Wolfgang_Amadeus_Mozart_headshot.jpg',                    // Johann Nepomuk della Croce
      beethoven: "Joseph_Karl_Stieler's_Beethoven_mit_dem_Manuskript_der_Missa_solemnis.jpg", // Joseph Karl Stieler
      gluck: 'Joseph_Siffred_Duplessis_-_Christoph_Willibald_Gluck_-_Google_Art_Project.jpg', // Joseph-Siffred Duplessis
      clementi: 'Muzio_Clementi.jpeg',                                                       // Thomas Hardy
      schubert: 'Franz_Schubert_by_Wilhelm_August_Rieder_1875.jpg',                          // Wilhelm August Rieder
      chopin: 'Eugène_Delacroix_-_Frédéric_Chopin_-_WGA06194.jpg',                           // Eugène Delacroix
      schumann: 'Robert_Schumann_1839.jpg',                                                  // Josef Kriehuber
      liszt: 'Liszt_(Lehmann_portrait),_cropped.jpg',                                        // Henri Lehmann
      brahms: 'JohannesBrahms_(cropped).jpg',                                                // C. Brasch (photograph)
      tchaikovsky: 'Tchaikovsky_by_Reutlinger_(cropped).jpg',                                // Émile Reutlinger (photograph)
      wagner: '1895_Lenbach_Richard_Wagner_anagoria.JPG',                                    // Franz von Lenbach
      mendelssohn: 'Felix_Mendelssohn_Bartholdy_by_Eduard_Magnus_(1833).jpg',                // Eduard Magnus
      verdi: 'Giuseppe_Verdi_by_Giovanni_Boldini.jpg',                                       // Giovanni Boldini
      bizet: 'Georges_bizet.jpg',                                                            // Étienne Carjat (photograph)
      rossini: 'Rossini-portrait-0.jpg',                                                     // Vincenzo Camuccini
      mascagni: 'Pietro_Mascagni_1.jpg',                                                     // photograph
      leoncavallo: 'Leonkavallo_Postcard-1910.jpg',                                          // photograph
      massenet: 'Jules_Massenet_by_Eugène_Pirou.jpg',                                        // Eugène Pirou (photograph)
      puccini: 'Giacomo_Puccini_LCCN2005685154_(1)_cropped.jpg',                             // photograph
    };
    // Put a composer's portrait into `box`; if it can't load, the box keeps its initial letter.
    function putPortrait(box, id, name, w) {
      const f = PORTRAIT[id]; if (!f) return;
      const im = document.createElement('img');
      im.alt = name; im.referrerPolicy = 'no-referrer'; im.loading = 'lazy'; im.decoding = 'async';
      const letter = box.textContent;
      box.textContent = ''; box.classList.add('face'); box.appendChild(im);
      im.addEventListener('imgfail', () => { im.remove(); if (box.classList.contains('mono')) box.classList.remove('face'); box.textContent = letter; });
      setImgSrc(im, f, w || 120);
    }
    function renderComposers() {
      const ko = isLocal(), t = I18N[lang];
      const ul = document.getElementById('r-composers');
      if (!ul) return;
      ul.innerHTML = '';
      const cnt = {};
      buildRecommendation().forEach(r => { cnt[r.cid] = (cnt[r.cid] || 0) + 1; });
      const sc = composerScores(), sh = composerShared(), shN = id => (sh[id] ? sh[id].size : 0);
      const list = [...(COMPOSERS[currentEra] || [])].filter(n => n[2] && WORKS[n[2]])
        .sort((x, y) => (shN(y[2]) - shN(x[2])) || ((sc[y[2]] || 0) - (sc[x[2]] || 0)));
      const topBox = document.getElementById('cmp-top');
      if (topBox && list.length && shN(list[0][2])) {
        const tid = list[0][2], tnm = (SHORT[tid] || [list[0][0], list[0][1]])[ko ? 1 : 0];
        // the painting's strongest tags first, so the named keywords are the telling ones
        const order = new Map(); selected().forEach(p => { const P = engPrep(currentEra).pv[p.id]; if (P) Object.entries(P.v).forEach(([k, v]) => order.set(k, Math.max(order.get(k) || 0, v))); });
        const tags = [...sh[tid]].sort((a, b) => (order.get(b) || 0) - (order.get(a) || 0));
        topBox.innerHTML = '';
        const k = document.createElement('span'); k.className = 'k'; k.textContent = '★ ' + t.cmpTopKicker;
        const h = document.createElement('p'); h.className = 'h'; h.innerHTML = t.cmpTopTpl.replace('{n}', '<b></b>');
        h.querySelector('b').textContent = tnm;
        if (lang === 'ko') { const c = tnm.charCodeAt(tnm.length - 1); const jong = c >= 0xAC00 && c <= 0xD7A3 && (c - 0xAC00) % 28 !== 0; h.append(jong ? '이에요' : '예요'); }
        const d = document.createElement('p'); d.className = 'd';
        d.textContent = t.cmpTopWhy.replace('{c}', tags.length).replace(tags.length === 1 ? 'keywords' : '\u0000', 'keyword').replace('{t}', tags.slice(0, 5).map(tagLabel).join(' · ') + (tags.length > 5 ? ' …' : ''));
        const go = document.createElement('button'); go.type = 'button'; go.className = 'btn btn-primary btn-sm'; go.textContent = t.cmpTopGo;
        go.addEventListener('click', () => openComposer(tid));
        const face = document.createElement('span'); face.className = 'face'; face.textContent = tnm.charAt(0);
        topBox.append(face, k, h, d, go); topBox.hidden = false;
        putPortrait(face, tid, tnm, 250);
      } else if (topBox) topBox.hidden = true;
      // Opera composers fold away under their own toggle (the top pick always stays visible)
      const isOp = id => OPERA_COMPOSERS.has(id);
      const main = list.filter((n, i) => i === 0 || !isOp(n[2])), ops = list.filter((n, i) => i > 0 && isOp(n[2]));
      if (ops.some(n => n[2] === selectedComposer)) operaOpen = true;
      const cards = main.slice();
      if (ops.length) cards.push('toggle');
      if (ops.length && operaOpen) cards.push(...ops);
      cards.forEach((n, i) => {
        if (n === 'toggle') {
          const li = document.createElement('li'); li.className = 'opera-toggle-li';
          const tb = document.createElement('button'); tb.type = 'button'; tb.className = 'opera-toggle';
          tb.setAttribute('aria-expanded', String(operaOpen));
          tb.textContent = t.cmpOpera.replace('{n}', ops.length) + (operaOpen ? ' ▲' : ' ▼');
          tb.addEventListener('click', () => { operaOpen = !operaOpen; renderComposers(); });
          li.appendChild(tb); ul.appendChild(li); return;
        }
        const id = n[2], nm = (SHORT[id] || [n[0], n[1]])[ko ? 1 : 0];
        const top = composerPieces(id)[0];
        const li = document.createElement('li');
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'cmp-card' + (i === 0 && shN(id) ? ' top' : '') + (!cmpTouched && i === 0 ? ' hint' : '');
        b.dataset.hint = t.cmpHint;
        b.setAttribute('aria-pressed', String(selectedComposer === id));
        b.innerHTML = '<span class="mono"></span><span class="min-w-0"><span class="nm"></span><span class="meta"></span></span><span class="go" aria-hidden="true">→</span>';
        b.querySelector('.mono').textContent = nm.charAt(0);
        putPortrait(b.querySelector('.mono'), id, nm, 120);
        b.querySelector('.nm').textContent = nm;
        const meta = b.querySelector('.meta');
        meta.textContent = shN(id) ? t.cmpShared.replace('{c}', shN(id)).replace('keywords', shN(id) === 1 ? 'keyword' : 'keywords') + (top ? ' · ' + top.why.map(tagLabel).join(' · ') : '') : t.cmpMore;
        if (i === 0 && shN(id)) { const bd = document.createElement('span'); bd.className = 'top-badge'; bd.textContent = t.cmpTopBadge; b.appendChild(bd); }
        if (cnt[id]) meta.classList.add('rec');
        b.setAttribute('aria-label', nm + ' — ' + meta.textContent);
        b.addEventListener('click', () => openComposer(id));
        li.appendChild(b);
        ul.appendChild(li);
      });
    }

    // Composer detail: every catalogued piece by this composer ranked against the chosen paintings, then signature works
    function renderComposerDetail() {
      const det = document.getElementById('cmp-detail');
      const list = document.getElementById('cd-list');
      if (!det || !list) return;
      const id = selectedComposer;
      if (!id || !WORKS[id]) { det.classList.add('hidden'); list.innerHTML = ''; return; }
      if (activeLi && list.contains(activeLi)) stopPlayer();
      const ko = isLocal(), t = I18N[lang], idx = ko ? 1 : 0;
      const nm = (SHORT[id] || ['', ''])[idx];
      document.getElementById('cd-name').textContent = nm;
      const ranked = composerPieces(id);
      const q = x => lang === 'ja' ? '「' + x + '」' : ko ? '〈' + x + '〉' : '“' + x + '”';
      const names = [...new Set(selected().map(x => q(ko ? x.ko : x.en)))].slice(0, 2).join(lang === 'ja' ? '・' : ko ? '·' : ' & ');
      document.getElementById('cd-lead').textContent = ranked.length ? t.cdLeadTied.replace('{n}', nm).replace('{t}', names) : t.cdLeadOther.replace('{n}', nm);
      list.innerHTML = '';
      let num = 0;
      const head = (txt, cls) => { const h = document.createElement('li'); h.className = 'cd-sub' + (cls ? ' ' + cls : ''); h.textContent = txt; list.appendChild(h); return h; };
      const onMenu = new Set(buildRecommendation().filter(r => r.cid === id).map(r => r.en));
      const ranked10 = ranked.slice(0, 10).sort((a, b) => (onMenu.has(b.x.en) ? 1 : 0) - (onMenu.has(a.x.en) ? 1 : 0));
      if (ranked.length) head(t.cdSubLinked);
      ranked10.forEach(rr => {
        const r = { cid: rr.x.c, en: rr.x.en, ko: rr.x.ko, yt: rr.x.yt, who: rr.x.who, via: rr.via, why: rr.why, src: rr.x.s };
        num++;
        const li = document.createElement('li');
        const star = onMenu.has(r.en);
        li.className = (star ? 'special-item ' : 'border-b border-line ') + 'flex flex-wrap items-start gap-x-4 py-3.5';
        if (r.yt) li.dataset.yt = r.yt;
        const n = document.createElement('span');
        n.className = 'w-7 shrink-0 font-serif italic text-xl text-amber-200/70';
        n.textContent = String(num);
        const body = document.createElement('div'); body.className = 'min-w-0 flex-1';
        const tt = document.createElement('span');
        tt.className = 'block font-serif text-lg sm:text-xl leading-snug text-white/90';
        tt.textContent = ko ? r.ko : r.en;
        const why = document.createElement('span'); why.className = 'why-line';
        why.textContent = whyLine(r, t, idx);
        if (r.src) { const sl = document.createElement('a'); sl.className = 'src-link'; sl.href = r.src; sl.target = '_blank'; sl.rel = 'noopener noreferrer'; sl.textContent = t.srcLabel; why.append(' ', sl); }
        if (star) { const bd = document.createElement('span'); bd.className = 'yc-badge'; bd.textContent = '★ ' + t.cdBadge; body.append(bd); }
        body.append(tt, why);
        if (r.who) { const w = document.createElement('span'); w.className = 'block text-xs text-white/60'; w.textContent = t.perfBy + ' ' + r.who; body.appendChild(w); }
        let act;
        if (r.yt) {
          act = document.createElement('button'); act.type = 'button';
          act.className = 'pl-btn shrink-0 border px-3 py-1.5 text-xs transition';
          act.textContent = '▶ ' + t.plPlay;
          act.addEventListener('click', () => openPlayer(li, r));
        } else {
          act = document.createElement('a');
          act.className = 'pl-btn shrink-0 border px-3 py-1.5 text-xs transition';
          act.href = searchUrl(r); act.target = '_blank'; act.rel = 'noopener noreferrer';
          act.textContent = t.plFind + ' ↗';
        }
        li.append(n, body, act);
        list.appendChild(li);
      });
      const norm = x => x.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 22);
      const have = new Set(ranked.map(x => norm(x.x.en)));
      const catNo = x => (x.match(/\b(BWV|HWV|RV|K\.|D\.|S\.|Z\.|Op\.)\s?\d+[a-z]?(\s?No\.\s?\d+)?/) || [''])[0].replace(/\s/g, '');
      const words = x => new Set(x.toLowerCase().replace(/[^a-z\s]/g, ' ').split(/\s+/).filter(w => w.length > 2));
      const sameWork = (a, b) => { const ca = catNo(a); if (!ca || ca !== catNo(b)) return false; const A = words(a), B = words(b); let k = 0; A.forEach(w => { if (B.has(w)) k++; }); return k >= Math.min(A.size, B.size, 3); };
      const rest = WORKS[id].filter(w => !have.has(norm(w[0])) && !ranked.some(r => sameWork(r.x.en, w[0]))).slice(0, Math.max(0, 10 - num));
      if (rest.length) head(t.cdSubMore);
      const full = ((COMPOSERS[currentEra] || []).find(c => c[2] === id) || [nm])[0];
      rest.forEach(w => {
        num++;
        const li = document.createElement('li');
        li.className = 'flex items-start gap-4 py-3.5 border-b border-line';
        const n = document.createElement('span');
        n.className = 'w-7 shrink-0 font-serif italic text-xl text-amber-200/70';
        n.textContent = String(num);
        const tt = document.createElement('span');
        tt.className = 'min-w-0 flex-1 font-serif text-lg sm:text-xl leading-snug text-white/90';
        tt.textContent = w[idx];
        let a;
        if (w[2]) {
          // Verified recording: plays inside the page, same as the pieces above
          li.classList.add('flex-wrap');
          li.dataset.yt = w[2];
          a = document.createElement('button');
          a.type = 'button';
          a.className = 'pl-btn shrink-0 rounded-full border border-line px-3 py-1.5 text-xs text-white/80 transition hover:border-white/40 hover:text-white';
          a.textContent = '▶ ' + t.plPlay;
          a.addEventListener('click', () => openPlayer(li, { yt: w[2], en: w[0], ko: w[1], cid: id }));
        } else {
          a = document.createElement('a');
          a.className = 'shrink-0 border border-line px-3 py-1.5 text-xs text-white/70 transition hover:border-white/40 hover:text-white';
          a.style.borderRadius = 'var(--r)';
          a.href = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(full + ' ' + w[0]);
          a.target = '_blank'; a.rel = 'noopener noreferrer';
          a.textContent = t.plListen + ' ↗';
        }
        li.append(n, tt, a);
        list.appendChild(li);
      });
      det.classList.remove('hidden');
    }

    // Short composer names: [English, Korean]
    const SHORT = {
      haydn: ['Haydn', '하이든'], mozart: ['Mozart', '모차르트'], beethoven: ['Beethoven', '베토벤'],
      gluck: ['Gluck', '글루크'], boccherini: ['Boccherini', '보케리니'],
      schubert: ['Schubert', '슈베르트'], chopin: ['Chopin', '쇼팽'], schumann: ['Schumann', '슈만'],
      liszt: ['Liszt', '리스트'], brahms: ['Brahms', '브람스'], tchaikovsky: ['Tchaikovsky', '차이콥스키'],
      bach: ['Bach', '바흐'], clementi: ['Clementi', '클레멘티'], handel: ['Handel', '헨델'], vivaldi: ['Vivaldi', '비발디'], purcell: ['Purcell', '퍼셀'], scarlatti: ['Scarlatti', '스카를라티'],
      wagner: ['Wagner', '바그너'], dvorak: ['Dvořák', '드보르자크'], mendelssohn: ['Mendelssohn', '멘델스존'],
      verdi: ['Verdi', '베르디'], bizet: ['Bizet', '비제'], rossini: ['Rossini', '로시니'], mascagni: ['Mascagni', '마스카니'], leoncavallo: ['Leoncavallo', '레온카발로'], massenet: ['Massenet', '마스네'], puccini: ['Puccini', '푸치니'],
      smetana: ['Smetana', '스메타나'], grieg: ['Grieg', '그리그'], rachmaninoff: ['Rachmaninoff', '라흐마니노프'], glinka: ['Glinka', '글린카'], debussy: ['Debussy', '드뷔시'], ravel: ['Ravel', '라벨'], pleyel: ['Pleyel', '플레옐'],
    };

    // Each mood opens a pool of five pieces: [composer id, English, Korean, YouTube id, performer]
    const POOLS = {
      heroic: [
        ["mozart", "Symphony No. 41 “Jupiter”, K. 551 — IV. Molto allegro", "교향곡 41번 “주피터” K. 551 — 4악장 몰토 알레그로", "tEwg_AiKC7A", "George Szell · Cleveland Orchestra"],
        ["mozart", "Symphony No. 40, K. 550 — I. Molto allegro", "교향곡 40번 K. 550 — 1악장 몰토 알레그로", "p8bZ7vm4_6M", "Leonard Bernstein"],
        ["haydn", "Symphony No. 104 “London” — I. Adagio – Allegro", "교향곡 104번 “런던” — 1악장 아다지오 – 알레그로", "ooZ0NW3KNXc", "Harnoncourt · Concertgebouw Orchestra"],
        ["beethoven", "Egmont Overture, Op. 84", "에그몬트 서곡 Op. 84", "cXPCOLnOVUo", "Abbado · Berliner Philharmoniker"],
        ["beethoven", "Symphony No. 5, Op. 67 — I. Allegro con brio", "교향곡 5번 Op. 67 — 1악장 알레그로 콘 브리오", "pMHVVeZmm4I", "Carlos Kleiber"],
      ],
      solemn: [
        ["mozart", "Requiem, K. 626 — Lacrimosa", "레퀴엠 K. 626 — 라크리모사", "uy1rSQKWCnw", "Harnoncourt"],
        ["mozart", "Piano Concerto No. 21, K. 467 — II. Andante", "피아노 협주곡 21번 K. 467 — 2악장 안단테", "_3n3AHx6Qtk", "Mitsuko Uchida, piano"],
        ["mozart", "Clarinet Concerto, K. 622 — II. Adagio", "클라리넷 협주곡 K. 622 — 2악장 아다지오", "8f-NDmmpVF4", "Karl Leister · Karajan · Berliner Philharmoniker"],
        ["beethoven", "Piano Sonata No. 8 “Pathétique”, Op. 13 — II. Adagio cantabile", "피아노 소나타 8번 “비창” Op. 13 — 2악장 아다지오 칸타빌레", "ssXsUGXpf_Q", "Wilhelm Kempff, piano"],
        ["gluck", "Orfeo ed Euridice — “Che farò senza Euridice?”", "오르페오와 에우리디체 — “에우리디체 없이 나는 어찌 살까”", "56ed5X0Lv90", "Kathleen Ferrier, contralto"],
      ],
      elegant: [
        ["mozart", "Piano Sonata No. 11, K. 331 — III. Rondo alla turca", "피아노 소나타 11번 K. 331 — 3악장 터키 행진곡", "VKlRJJKRuto", "Vladimir Horowitz, piano"],
        ["gluck", "Orfeo ed Euridice — Dance of the Blessed Spirits", "오르페오와 에우리디체 — 축복받은 영혼들의 춤", "bFWcTqLCbdM", "Karajan · Berliner Philharmoniker"],
        ["boccherini", "String Quintet in E major, G. 275 — III. Minuetto", "현악 오중주 E장조 G. 275 — 3악장 미뉴에트", "4ltezBbyzk0", "I Musici"],
        ["mozart", "Eine kleine Nachtmusik, K. 525 — I. Allegro", "아이네 클라이네 나흐트무지크 K. 525 — 1악장 알레그로", "k5Hr-uiDyP8", "Karl Böhm · Wiener Philharmoniker"],
        ["mozart", "Piano Sonata No. 11, K. 331 — I. Andante grazioso", "피아노 소나타 11번 K. 331 — 1악장 안단테 그라치오소", "FZ1mj9IaczQ", "Daniel Barenboim, piano"],
      ],
      calm: [
        ["mozart", "Ave verum corpus, K. 618", "아베 베룸 코르푸스 K. 618", "Oub5NjO6u4c", "Herbert von Karajan"],
        ["haydn", "The Creation — “The heavens are telling”", "천지창조 — “하늘은 하느님의 영광을 전하네”", "p4lSauxyFWo", "Christopher Hogwood"],
        ["haydn", "Symphony No. 94 “Surprise” — II. Andante", "교향곡 94번 “놀람” — 2악장 안단테", "T0-GaASGt48", "Nikolaus Harnoncourt"],
        ["haydn", "String Quartet “Emperor”, Op. 76 No. 3 — II. Poco adagio, cantabile", "현악 사중주 “황제” Op. 76 No. 3 — 2악장 포코 아다지오", "hjxCmJaALxU", "Kodály Quartet"],
        ["beethoven", "Symphony No. 6 “Pastoral”, Op. 68 — I. Allegro ma non troppo", "교향곡 6번 “전원” Op. 68 — 1악장 알레그로 마 논 트로포", "_zKiDXbwdR0", "Karajan"],
      ],
      love: [
        ["tchaikovsky", "Romeo and Juliet, Fantasy-Overture", "로미오와 줄리엣 환상 서곡", "pdke6TVb2Ns", "Karajan · Wiener Philharmoniker"],
        ["wagner", "Tristan und Isolde — Liebestod", "트리스탄과 이졸데 — 사랑의 죽음", "gQ5k5qcbFkc", "Birgit Nilsson · Knappertsbusch"],
        ["liszt", "Liebesträume No. 3 in A-flat major, S. 541", "사랑의 꿈 3번 내림A장조 S. 541", "YVDm_PG78ig", "Evgeny Kissin, piano"],
        ["schumann", "Widmung (Myrthen, Op. 25 No. 1)", "헌정 (미르텐 Op. 25 No. 1)", "rCP27rIVJBw", "Martha Argerich, piano (Liszt’s transcription)"],
        ["brahms", "Intermezzo in A major, Op. 118 No. 2", "간주곡 A장조 Op. 118 No. 2", "039Ki7ZccnU", "Radu Lupu, piano"],
      ],
      tragic: [
        ["chopin", "Étude in C minor, Op. 10 No. 12 “Revolutionary”", "에튀드 C단조 Op. 10 No. 12 “혁명”", "7VWHBHeNrg4", "Evgeny Kissin, piano"],
        ["liszt", "Funérailles, S. 173 No. 7", "장송곡 S. 173 No. 7", "zpuNjz9JMnE", "Alfred Brendel, piano"],
        ["tchaikovsky", "Symphony No. 6 “Pathétique”, Op. 74 — IV. Adagio lamentoso", "교향곡 6번 “비창” Op. 74 — 4악장 아다지오 라멘토소", "OXf-t0RtDEE", "Karajan · Berliner Philharmoniker"],
        ["schubert", "String Quartet No. 14 “Death and the Maiden”, D. 810 — I. Allegro", "현악 사중주 14번 “죽음과 소녀” D. 810 — 1악장 알레그로", "KMyvgUOOD6Y", "Escher Quartet"],
        ["brahms", "Symphony No. 4, Op. 98 — IV. Allegro energico e passionato", "교향곡 4번 Op. 98 — 4악장 알레그로 에네르지코 에 파시오나토", "y36x66pd1os", "Sergiu Celibidache"],
      ],
      opulent: [
        ["wagner", "Die Walküre — “Ride of the Valkyries”", "발퀴레 — “발퀴레의 기행”", "19uL3qzbwjo", "James Levine · Berliner Philharmoniker"],
        ["liszt", "Mephisto Waltz No. 1, S. 514", "메피스토 왈츠 1번 S. 514", "P5FDtRiN6fY", "Daniil Trifonov, piano"],
        ["tchaikovsky", "Francesca da Rimini, Op. 32", "프란체스카 다 리미니 Op. 32", "IROC2WIKNdU", "Bernstein · New York Philharmonic"],
        ["chopin", "Scherzo No. 2 in B-flat minor, Op. 31", "스케르초 2번 내림나단조 Op. 31", "RQb32EA1bCQ", "Arthur Rubinstein, piano"],
        ["wagner", "Götterdämmerung — Siegfried’s Funeral March", "신들의 황혼 — 지크프리트의 장송 행진곡", "1aXwTS9gKNM", "Dudamel · Berliner Philharmoniker"],
      ],
      dread: [
        ["schubert", "Erlkönig, D. 328", "마왕 D. 328", "a2J9Yn2YjjE", "Dietrich Fischer-Dieskau · Gerald Moore"],
        ["liszt", "Totentanz, S. 126", "죽음의 무도 S. 126", "oWGkem9qoe8", "Martha Argerich, piano"],
        ["mendelssohn", "A Midsummer Night’s Dream — Scherzo, Op. 61", "한여름 밤의 꿈 — 스케르초 Op. 61", "hHTV3GFyHfM", "Gergiev · Mariinsky Orchestra"],
        ["chopin", "Piano Sonata No. 2, Op. 35 — IV. Finale: Presto", "피아노 소나타 2번 Op. 35 — 4악장 프레스토", "JJEQqcw-830", "Maurizio Pollini, piano"],
        ["brahms", "Intermezzo in E-flat minor, Op. 118 No. 6", "간주곡 내림마단조 Op. 118 No. 6", "WMjxw08BFh0", "Glenn Gould, piano"],
      ],
      galant: [
        ["mozart", "The Marriage of Figaro — Overture, K. 492", "피가로의 결혼 — 서곡 K. 492", "yh9OTvIiH_I", "Karajan · Wiener Philharmoniker"],
        ["mozart", "Piano Sonata No. 16 “Sonata facile”, K. 545 — I. Allegro", "피아노 소나타 16번 “쉬운 소나타” K. 545 — 1악장 알레그로", "jPo3uXWJ440", "Friedrich Gulda, piano"],
        ["mozart", "Divertimento in D major, K. 136 — I. Allegro", "디베르티멘토 D장조 K. 136 — 1악장 알레그로", "oq-kqDDxdIE", "Karajan · Berliner Philharmoniker"],
        ["haydn", "Trumpet Concerto in E-flat major — III. Finale: Allegro", "트럼펫 협주곡 내림E장조 — 3악장 피날레 알레그로", "toV7E84OAxI", "Wynton Marsalis, trumpet"],
        ["mozart", "Horn Concerto No. 4 in E-flat major, K. 495 — III. Rondo: Allegro vivace", "호른 협주곡 4번 내림E장조 K. 495 — 3악장 론도 알레그로 비바체", "IcklOuaNZfk", "Dennis Brain · Karajan · Philharmonia"],
      ],
      tender: [
        ["mozart", "Piano Concerto No. 23 in A major, K. 488 — II. Adagio", "피아노 협주곡 23번 A장조 K. 488 — 2악장 아다지오", "Z71Ya9M1WIA", "Maurizio Pollini, piano"],
        ["mozart", "Clarinet Quintet in A major, K. 581 — II. Larghetto", "클라리넷 오중주 A장조 K. 581 — 2악장 라르게토", "sV_GeI9_E_k", "Martin Fröst, clarinet"],
        ["haydn", "Cello Concerto No. 1 in C major — II. Adagio", "첼로 협주곡 1번 C장조 — 2악장 아다지오", "LcpL7qAf1UA", "Mstislav Rostropovich, cello"],
        ["beethoven", "Romance No. 2 in F major, Op. 50", "로망스 2번 F장조 Op. 50", "Gz4JEYQ8ebU", "David Oistrakh, violin"],
        ["beethoven", "Piano Sonata No. 14 “Moonlight”, Op. 27 No. 2 — I. Adagio sostenuto", "피아노 소나타 14번 “월광” Op. 27 No. 2 — 1악장 아다지오 소스테누토", "E10K73GvCKU", "Daniel Barenboim, piano"],
      ],
      dash: [
        ["liszt", "Hungarian Rhapsody No. 2, S. 244", "헝가리 광시곡 2번 S. 244", "Oxxf2t4E4nc", "Lang Lang, piano (Horowitz’s arrangement)"],
        ["tchaikovsky", "Piano Concerto No. 1 in B-flat minor, Op. 23 — I. Allegro non troppo e molto maestoso", "피아노 협주곡 1번 내림나단조 Op. 23 — 1악장", "esK8GgfbRDQ", "Martha Argerich · Abbado · Berliner Philharmoniker"],
        ["chopin", "Polonaise in A-flat major “Heroic”, Op. 53", "폴로네이즈 내림A장조 “영웅” Op. 53", "VEl9zn8JPW8", "Arthur Rubinstein, piano"],
        ["brahms", "Hungarian Dance No. 5 in G minor", "헝가리 무곡 5번 G단조", "6Z0gYhRkRfM", "Abbado · Berliner Philharmoniker"],
        ["mendelssohn", "Violin Concerto in E minor, Op. 64 — III. Allegro molto vivace", "바이올린 협주곡 E단조 Op. 64 — 3악장 알레그로 몰토 비바체", "2xElqIYzzR8", "Hilary Hahn, violin"],
      ],
      fantasy: [
        ["mendelssohn", "A Midsummer Night’s Dream — Nocturne", "한여름 밤의 꿈 — 녹턴", "8cplvzZlSm4", "Dennis Brain, horn"],
        ["chopin", "Nocturne in E-flat major, Op. 9 No. 2", "녹턴 내림E장조 Op. 9 No. 2", "2I1WhzKx3Ks", "Arthur Rubinstein, piano"],
        ["schumann", "Kinderszenen, Op. 15 — No. 7 “Träumerei”", "어린이의 정경 Op. 15 — 7번 “트로이메라이”", "3fhKaAX5dOc", "Vladimir Horowitz, piano"],
        ["liszt", "Un sospiro (Three Concert Études, S. 144 No. 3)", "한숨 (세 개의 연주회용 에튀드 S. 144 No. 3)", "Qe5kTui3nqc", "Lang Lang, piano"],
        ["tchaikovsky", "Swan Lake — Scene (Act II)", "백조의 호수 — 정경 (2막)", "LiGjvEq0QHA", "André Previn · London Symphony Orchestra"],
      ],
      intimate: [
        ["schubert", "Impromptu in G-flat major, D. 899 No. 3", "즉흥곡 내림G장조 D. 899 No. 3", "Ybq6Ea79nZ4", "Evgeny Kissin, piano"],
        ["schubert", "An die Musik, D. 547", "음악에 부쳐 D. 547", "RxsFgJF6XS4", "Dietrich Fischer-Dieskau"],
        ["brahms", "Wiegenlied (Lullaby), Op. 49 No. 4", "자장가 Op. 49 No. 4", "i6o22mJOcYw", "Dietrich Fischer-Dieskau"],
        ["chopin", "Prelude in D-flat major, Op. 28 No. 15 “Raindrop”", "전주곡 내림D장조 Op. 28 No. 15 “빗방울”", "BczgDb9-ctQ", "Maurizio Pollini, piano"],
        ["chopin", "Piano Concerto No. 2, Op. 21 — II. Larghetto", "피아노 협주곡 2번 Op. 21 — 2악장 라르게토", "OEsAM8_V1jk", "Krystian Zimerman, piano"],
      ],
      radiant: [
        ["bach", "Orchestral Suite No. 3 in D major, BWV 1068 — II. Air (“Air on the G String”)", "관현악 모음곡 3번 D장조 BWV 1068 — 2악장 아리아 (“G선상의 아리아”)", "MPia1ap_Wb8", "Karajan · Berliner Philharmoniker"],
        ["bach", "Goldberg Variations, BWV 988 — Aria", "골드베르크 변주곡 BWV 988 — 아리아", "rCuALWK6ZNg", "Glenn Gould, piano"],
        ["bach", "Cello Suite No. 1 in G major, BWV 1007 — Prélude", "무반주 첼로 모음곡 1번 G장조 BWV 1007 — 프렐류드", "1prweT95Mo0", "Yo-Yo Ma, cello"],
        ["purcell", "Dido and Aeneas — “When I am laid in earth” (Dido’s Lament)", "디도와 아이네아스 — “내가 땅에 묻힐 때” (디도의 탄식)", "dl9Mbv5Ag-w", "Janet Baker, mezzo-soprano"],
        ["handel", "Serse — “Ombra mai fu”", "세르세 — “그리운 나무 그늘이여” (옴브라 마이 푸)", "2_1UYs1FxAI", "Cecilia Bartoli, mezzo-soprano"],
      ],
      grand: [
        ["handel", "Zadok the Priest, HWV 258", "제사장 사독 HWV 258", "rjWSgFn7ouA", "John Eliot Gardiner"],
        ["handel", "Messiah — Hallelujah Chorus", "메시아 — 할렐루야 합창", "U69gSDCXw24", "VOCES8"],
        ["handel", "Music for the Royal Fireworks — Overture, HWV 351", "왕궁의 불꽃놀이 — 서곡 HWV 351", "s7yxQHLx1uE", "John Eliot Gardiner · English Baroque Soloists"],
        ["bach", "Toccata and Fugue in D minor, BWV 565", "토카타와 푸가 D단조 BWV 565", "1UQ25tCgCog", "Karl Richter, organ"],
        ["vivaldi", "Gloria in D major, RV 589 — I. Gloria in excelsis Deo", "글로리아 D장조 RV 589 — 1곡 “지극히 높은 곳에서 영광”", "_0zWIJc4U_8", "Tafelmusik Baroque Orchestra"],
      ],
      dramatic: [
        ["vivaldi", "The Four Seasons — Summer: III. Presto", "사계 — 여름 3악장 프레스토", "124NoPUBDvA", "Anne-Sophie Mutter, violin"],
        ["vivaldi", "The Four Seasons — Winter: I. Allegro non molto", "사계 — 겨울 1악장 알레그로 논 몰토", "rBq4ov5Y_84", "Itzhak Perlman, violin"],
        ["bach", "Violin Partita No. 2 in D minor, BWV 1004 — V. Chaconne", "바이올린 파르티타 2번 D단조 BWV 1004 — 5곡 샤콘", "aBQkRzZYN8I", "Itzhak Perlman, violin"],
        ["bach", "Passacaglia and Fugue in C minor, BWV 582", "파사칼리아와 푸가 C단조 BWV 582", "7aTQ3RHDHCY", "Helmut Walcha, organ"],
        ["bach", "Concerto for Two Violins in D minor, BWV 1043 — I. Vivace", "두 대의 바이올린을 위한 협주곡 D단조 BWV 1043 — 1악장 비바체", "CmmpjziKcFU", "Menuhin & Oistrakh, violins"],
      ],
      mercy: [
        ["bach", "St Matthew Passion, BWV 244 — “Erbarme dich, mein Gott”", "마태 수난곡 BWV 244 — “불쌍히 여기소서, 나의 하느님”", "xt2FtlK2gZM", "Janet Baker, mezzo-soprano"],
        ["handel", "Rinaldo — “Lascia ch’io pianga”", "리날도 — “울게 하소서”", "6awzmkHTtrs", "Cecilia Bartoli, mezzo-soprano"],
        ["bach", "Cantata BWV 147 — “Jesu, Joy of Man’s Desiring”", "칸타타 BWV 147 — “예수, 인간 소망의 기쁨”", "GWtoeYznx8E", "Netherlands Bach Society"],
        ["bach", "Concerto for Two Violins in D minor, BWV 1043 — II. Largo ma non troppo", "두 대의 바이올린을 위한 협주곡 D단조 BWV 1043 — 2악장 라르고 마 논 트로포", "zf1X7ppZiIQ", "Menuhin & Oistrakh, violins"],
        ["handel", "Messiah — “I know that my Redeemer liveth”", "메시아 — “나는 내 구원자가 살아 계심을 아네”", "X8Yxr6ED0EU", "Lucy Crowe, soprano"],
      ],
      joy: [
        ["vivaldi", "The Four Seasons — Spring: I. Allegro", "사계 — 봄 1악장 알레그로", "tbwVJVNvMh4", "Gidon Kremer, violin"],
        ["handel", "Water Music, Suite No. 2 in D major — Alla Hornpipe", "수상 음악 모음곡 2번 D장조 — 알라 혼파이프", "96Th_y6PGUg", "Trevor Pinnock · The English Concert"],
        ["bach", "Brandenburg Concerto No. 3 in G major, BWV 1048 — I. Allegro", "브란덴부르크 협주곡 3번 G장조 BWV 1048 — 1악장 알레그로", "GEhc0cqXsYA", "Shunske Sato · Netherlands Bach Society"],
        ["scarlatti", "Keyboard Sonata in D minor, K. 141", "건반 소나타 D단조 K. 141", "wjghYFgt8Zk", "Martha Argerich, piano"],
        ["bach", "Orchestral Suite No. 2 in B minor, BWV 1067 — VII. Badinerie", "관현악 모음곡 2번 B단조 BWV 1067 — 7곡 바디네리", "9aFUuHIdV1o", "Karajan · Berliner Philharmoniker"],
      ],
    };
    const NEI = {"heroic": "calm", "solemn": "tender", "elegant": "galant", "calm": "heroic", "galant": "elegant", "tender": "solemn", "love": "fantasy", "tragic": "dread", "opulent": "dash", "dread": "tragic", "dash": "opulent", "fantasy": "love", "intimate": "love", "radiant": "tender", "grand": "heroic", "dramatic": "solemn", "mercy": "tender", "joy": "galant"};

    const skewOf = id => Array.from(id).reduce((a, c) => a + c.charCodeAt(0), 0) % 5;
    const selected = () => [...picks].map(id => pById(id)).filter(Boolean);


    // Keyword data: tags extracted from English Wikipedia and museum / label / orchestra notes. s = source URL.
    const VOCAB = {"darkness": ["darkness", "어둠", "闇"], "light": ["light", "빛", "光"], "night": ["night", "밤", "夜"], "melancholy": ["melancholy", "우수", "憂い"], "grief": ["mourning", "애도", "嘆き"], "death": ["death", "죽음", "死"], "terror": ["dread", "공포", "恐怖"], "war": ["war & struggle", "전쟁", "戦い"], "storm": ["storm", "폭풍", "嵐"], "speed": ["speed & motion", "질주", "疾走"], "dance": ["dance", "춤", "舞踏"], "joy": ["joy", "기쁨", "喜び"], "humour": ["humour", "유머", "ユーモア"], "love": ["love", "사랑", "愛"], "longing": ["longing", "그리움", "憧れ"], "nostalgia": ["nostalgia", "향수", "郷愁"], "farewell": ["farewell", "작별", "別れ"], "tender": ["tenderness", "다정함", "優しさ"], "intimate": ["intimacy", "친밀함", "親密さ"], "solitude": ["solitude", "고독", "孤独"], "serene": ["serenity", "고요", "静けさ"], "contemplative": ["contemplation", "사색", "思索"], "sacred": ["the sacred", "성스러움", "祈り"], "grandeur": ["grandeur", "장엄", "壮大"], "heroic": ["heroism", "영웅", "英雄"], "elegance": ["elegance", "우아함", "優雅"], "opulence": ["opulence", "화려함", "華やかさ"], "restraint": ["restraint", "절제", "節度"], "order": ["order", "질서", "秩序"], "nature": ["nature", "자연", "自然"], "water": ["water", "물", "水"], "cold": ["cold & winter", "차가움", "冷たさ"], "myth": ["myth & legend", "신화", "神話"], "fantasy": ["enchantment", "환상", "幻想"], "dream": ["dream", "꿈", "夢"], "literature": ["literature", "문학", "文学"], "drama": ["drama", "극적", "劇的"], "exotic": ["exotic", "이국", "異国"], "sensual": ["sensuality", "관능", "官能"], "youth": ["youth & innocence", "젊음", "若さ"], "mystery": ["mystery", "수수께끼", "謎"]};
    const PT = {"pearl": {"intimate": 2, "contemplative": 3, "darkness": 1, "light": 3, "exotic": 2, "mystery": 1, "restraint": 1}, "musiclesson": {"love": 2, "intimate": 3, "darkness": 1, "light": 1, "sacred": 1, "youth": 1}, "nightwatch": {"darkness": 1, "drama": 3, "war": 3, "speed": 1, "grandeur": 2, "order": 1}, "prodigal": {"tender": 2, "sacred": 3, "myth": 1, "serene": 1, "nostalgia": 1, "intimate": 1, "darkness": 1, "light": 1, "grandeur": 1}, "matthew": {"darkness": 2, "drama": 1, "sacred": 2, "light": 2}, "meninas": {"mystery": 2, "light": 2, "grandeur": 2, "contemplative": 1, "order": 1, "darkness": 1}, "cavalier": {"humour": 1, "mystery": 1, "joy": 1, "opulence": 2, "love": 1, "speed": 1, "contemplative": 1}, "horatii": {"restraint": 1, "order": 2, "war": 1, "heroic": 2, "grandeur": 1, "melancholy": 1, "grief": 1, "drama": 2}, "socrates": {"serene": 1, "heroic": 2, "grief": 1, "longing": 1, "restraint": 2, "death": 1, "solitude": 1, "contemplative": 1}, "odalisque": {"elegance": 1, "sensual": 3, "exotic": 1}, "sabine": {"war": 1, "love": 1, "serene": 1, "tender": 1, "grandeur": 1, "restraint": 1}, "napoleon": {"heroic": 1, "speed": 1, "storm": 2, "darkness": 1, "grandeur": 1, "drama": 1}, "swing": {"humour": 2, "love": 3, "speed": 1, "dance": 1, "nature": 1, "joy": 3, "elegance": 2}, "marie": {"tender": 2, "grandeur": 2, "elegance": 1, "restraint": 1, "grief": 1, "intimate": 1, "sacred": 1}, "recamier": {"intimate": 1, "restraint": 3, "solitude": 3, "serene": 1, "elegance": 2, "sensual": 1}, "psyche": {"youth": 1, "love": 2, "sacred": 1, "restraint": 1, "tender": 2, "myth": 2, "serene": 1}, "endymion": {"night": 3, "light": 1, "dream": 2, "elegance": 1, "sensual": 2, "order": 1, "myth": 1, "tender": 1}, "thetis": {"grandeur": 3, "myth": 2, "terror": 2, "restraint": 1}, "valpincon": {"serene": 2, "sensual": 1, "light": 1, "speed": 1, "fantasy": 1, "solitude": 1, "tender": 1, "contemplative": 1, "elegance": 1}, "kauffman": {"youth": 1, "elegance": 2, "contemplative": 1}, "morningwalk": {"love": 2, "nature": 2, "youth": 2, "elegance": 1}, "reader": {"intimate": 2, "serene": 1, "light": 2, "opulence": 2, "solitude": 1, "contemplative": 2}, "kiss": {"love": 2, "drama": 1, "farewell": 1, "darkness": 1, "mystery": 2, "heroic": 1}, "nightmare": {"terror": 3, "love": 1, "sensual": 1, "dream": 3, "fantasy": 1}, "chasseur": {"drama": 1, "speed": 2, "order": 1, "grandeur": 1, "war": 3, "storm": 1, "heroic": 1}, "algiers": {"intimate": 2, "opulence": 3, "exotic": 2, "serene": 1, "solitude": 1}, "ophelia": {"melancholy": 1, "death": 2, "sacred": 1, "nature": 3, "water": 3, "dream": 1, "literature": 1, "love": 1}, "francesca": {"love": 2, "storm": 3, "melancholy": 1, "sensual": 2, "darkness": 1, "grief": 2, "literature": 1}, "titania": {"fantasy": 3, "love": 1, "humour": 2, "night": 1, "dream": 1, "literature": 2, "drama": 1}, "derby": {"speed": 3}, "poetspitzweg": {"humour": 3, "intimate": 3, "cold": 3, "solitude": 1, "tender": 1}, "shalott": {"darkness": 1, "light": 2, "melancholy": 2, "solitude": 1, "fantasy": 2, "grief": 1, "water": 2, "myth": 2}, "seaice": {"melancholy": 1, "cold": 3, "terror": 2, "grandeur": 2, "nature": 1, "sacred": 1}, "monk": {"solitude": 3, "grandeur": 2, "water": 2, "melancholy": 2, "terror": 1, "restraint": 1, "sacred": 1, "longing": 1}, "rugen": {"contemplative": 2, "joy": 1, "love": 3, "serene": 1, "death": 3, "sacred": 2, "water": 2, "nature": 1}, "temeraire": {"nostalgia": 2, "farewell": 2, "light": 3, "water": 3, "fantasy": 1, "melancholy": 1, "heroic": 1, "darkness": 1, "death": 1}, "railspeed": {"speed": 2, "water": 1, "grandeur": 2, "nature": 1, "light": 1, "opulence": 1}, "hannibal": {"darkness": 1, "storm": 3, "grandeur": 2, "war": 2, "nature": 1, "cold": 1}, "barque": {"storm": 3, "water": 1, "terror": 3, "melancholy": 1, "speed": 1, "sacred": 1, "literature": 1}, "haywain": {"nature": 3, "water": 3, "nostalgia": 1, "intimate": 1}, "hamlet": {"death": 3, "terror": 1, "grandeur": 1, "literature": 1, "drama": 1, "melancholy": 1, "contemplative": 2}, "schubertiade": {"intimate": 3, "literature": 1, "nostalgia": 2, "dance": 1}, "milkmaid": {"light": 3, "serene": 2, "intimate": 1, "restraint": 1}, "delft": {"light": 3, "serene": 2, "water": 1, "nature": 1}, "balance": {"contemplative": 3, "serene": 1, "sacred": 1, "light": 1, "restraint": 1}, "littlestreet": {"serene": 2, "intimate": 2, "nostalgia": 1, "order": 1}, "courtyard": {"serene": 2, "intimate": 2, "light": 1, "order": 1}, "bubbles": {"youth": 2, "contemplative": 2, "serene": 1, "light": 1}, "grace": {"intimate": 2, "sacred": 2, "tender": 1, "serene": 1}, "magdalene": {"darkness": 2, "contemplative": 2, "light": 1, "sacred": 1, "solitude": 1}, "lemons": {"sacred": 2, "restraint": 2, "darkness": 1, "order": 1, "serene": 1}, "sheba": {"light": 3, "water": 2, "grandeur": 1, "farewell": 1, "serene": 1}, "philosopher": {"contemplative": 3, "darkness": 2, "solitude": 1, "mystery": 1, "light": 1}, "chocolate": {"serene": 2, "elegance": 1, "restraint": 1, "light": 1}, "paul": {"drama": 3, "light": 2, "sacred": 2, "darkness": 1}, "elevation": {"drama": 3, "grandeur": 2, "sacred": 1, "death": 1, "heroic": 1}, "warconseq": {"war": 3, "drama": 2, "grief": 1, "opulence": 1, "myth": 1}, "breda": {"heroic": 2, "war": 2, "restraint": 1, "grandeur": 1, "tender": 1}, "wolfe": {"heroic": 2, "death": 2, "grief": 1, "war": 1, "grandeur": 1}, "coronation": {"grandeur": 3, "opulence": 2, "order": 1, "sacred": 1}, "cythera": {"love": 2, "elegance": 2, "nostalgia": 1, "farewell": 1, "dream": 1}, "pompadour": {"elegance": 3, "opulence": 2, "literature": 1}, "stolenkiss": {"love": 2, "humour": 1, "youth": 1, "elegance": 1, "mystery": 1}, "sheridan": {"elegance": 2, "nature": 2, "dream": 1, "tender": 1}, "blueboy": {"elegance": 3, "youth": 2, "opulence": 1}, "pinkie": {"youth": 2, "elegance": 2, "light": 1, "nature": 1}, "strawhat": {"elegance": 2, "light": 2, "youth": 1, "joy": 1}, "charleshunt": {"elegance": 3, "grandeur": 1, "nature": 1, "restraint": 1}, "gardenlove": {"love": 2, "joy": 2, "opulence": 1, "dance": 1}, "oldsing": {"joy": 2, "humour": 3, "dance": 1, "intimate": 1}, "toilette": {"elegance": 2, "sensual": 2, "myth": 1, "opulence": 1}, "ageinnocence": {"youth": 3, "tender": 2, "nature": 1}, "arcadia": {"contemplative": 2, "death": 1, "nature": 1, "myth": 1, "serene": 1}, "dancetime": {"dance": 2, "myth": 2, "order": 1, "nostalgia": 1}, "isaac": {"nature": 3, "serene": 2, "light": 1, "dance": 1}, "paris": {"myth": 3, "sensual": 1, "love": 1, "opulence": 1}, "bacchus": {"myth": 2, "joy": 2, "opulence": 1, "dance": 1}, "atalanta": {"myth": 2, "speed": 1, "elegance": 1, "darkness": 1, "dance": 1}, "venustriumph": {"myth": 2, "water": 2, "sensual": 1, "joy": 1}, "graces": {"elegance": 2, "myth": 2, "serene": 1, "restraint": 1}, "ossian": {"dream": 2, "myth": 2, "heroic": 1, "night": 1, "fantasy": 1}, "oedipus": {"mystery": 3, "myth": 2, "restraint": 1, "darkness": 1}, "spinners": {"mystery": 2, "myth": 2, "light": 1, "order": 1}, "danae": {"sensual": 2, "light": 2, "myth": 1, "love": 1}, "window": {"longing": 2, "solitude": 2, "intimate": 1, "water": 1}, "moonrise": {"night": 2, "water": 2, "longing": 1, "serene": 1}, "twomen": {"night": 3, "contemplative": 2, "nature": 1, "mystery": 1}, "wivenhoe": {"nature": 3, "serene": 2, "water": 1, "light": 1}, "cornfield": {"nature": 3, "nostalgia": 2, "serene": 1, "youth": 1}, "mortefontaine": {"nostalgia": 2, "dream": 2, "nature": 1, "serene": 1}, "angelus": {"sacred": 2, "serene": 2, "nature": 1, "restraint": 1}, "norham": {"light": 3, "dream": 2, "water": 1, "serene": 1}, "studio": {"solitude": 2, "contemplative": 2, "restraint": 1, "intimate": 1}, "stages": {"farewell": 2, "nostalgia": 2, "water": 1, "love": 1, "death": 1}, "lonetree": {"solitude": 2, "nature": 2, "light": 1, "serene": 1}, "bookworm": {"humour": 2, "literature": 2, "intimate": 1, "solitude": 1}, "ninthwave": {"storm": 3, "water": 2, "light": 1, "heroic": 1}, "steamboat": {"storm": 3, "water": 2, "speed": 1, "cold": 1}, "arabhorses": {"speed": 2, "storm": 2, "exotic": 1, "drama": 1}, "shipwreck": {"storm": 3, "water": 2, "terror": 1, "drama": 1}, "crusaders": {"war": 2, "opulence": 2, "grief": 1, "exotic": 1, "grandeur": 1}, "avalanche": {"storm": 2, "cold": 2, "terror": 1, "nature": 1, "grandeur": 1}, "galilee": {"storm": 2, "water": 2, "sacred": 1, "serene": 1}, "trafalgar": {"war": 3, "water": 1, "heroic": 1, "grandeur": 1}, "campaign": {"war": 2, "cold": 2, "heroic": 1, "melancholy": 1}, "colossus": {"terror": 3, "war": 2, "darkness": 1, "mystery": 1}, "oakwood": {"death": 2, "cold": 2, "sacred": 1, "darkness": 1, "solitude": 1}, "isledead": {"death": 3, "water": 2, "mystery": 2, "serene": 1}, "wrath": {"terror": 3, "storm": 2, "grandeur": 1, "sacred": 1, "death": 1}, "witches": {"mystery": 3, "terror": 1, "literature": 2, "darkness": 1}, "deluge": {"water": 3, "death": 2, "storm": 1, "terror": 1}, "princes": {"death": 2, "youth": 2, "terror": 1, "darkness": 1}, "hylas": {"water": 3, "sensual": 1, "myth": 1, "fantasy": 1, "mystery": 1}, "huguenot": {"love": 2, "farewell": 2, "tender": 1, "nature": 1}, "proserpine": {"longing": 2, "myth": 2, "sensual": 1, "darkness": 1, "melancholy": 1}, "beatrix": {"dream": 2, "love": 2, "death": 1, "light": 1, "literature": 1}, "goldenstairs": {"dream": 2, "elegance": 2, "youth": 1, "mystery": 1}, "flamingjune": {"dream": 2, "sensual": 2, "light": 1, "serene": 1}, "aprillove": {"love": 2, "youth": 2, "melancholy": 1, "nature": 1}, "lastengland": {"farewell": 3, "love": 1, "cold": 1, "water": 1}, "esther": {"sensual": 2, "exotic": 2, "elegance": 1, "opulence": 1}, "atala": {"love": 2, "death": 2, "grief": 1, "literature": 1, "sacred": 1}, "belledame": {"fantasy": 2, "love": 1, "literature": 2, "mystery": 1}, "eugenie": {"opulence": 2, "elegance": 2, "nature": 1, "love": 1}, "athens": {"contemplative": 3, "grandeur": 2, "order": 2, "light": 1}, "adam": {"sacred": 3, "grandeur": 2, "heroic": 1, "myth": 1}, "lastsupper": {"sacred": 3, "drama": 2, "farewell": 2, "order": 1}, "belshazzar": {"drama": 3, "mystery": 2, "sacred": 1, "opulence": 1, "light": 1}, "emmaus": {"sacred": 2, "drama": 2, "light": 2, "intimate": 1}, "arcole": {"heroic": 3, "youth": 2, "war": 1, "speed": 1}, "titianbacchus": {"myth": 3, "love": 2, "joy": 2, "opulence": 1}, "babel": {"grandeur": 3, "order": 1, "myth": 1, "mystery": 1}, "monalisa": {"mystery": 3, "serene": 2, "intimate": 1, "contemplative": 1}, "delaware": {"heroic": 3, "cold": 2, "water": 1, "storm": 1}, "starrynight": {"night": 3, "dream": 2, "fantasy": 2, "storm": 1, "solitude": 1}, "crows": {"storm": 2, "melancholy": 2, "nature": 2, "solitude": 1, "darkness": 1}, "etoile": {"dance": 3, "light": 2, "elegance": 1, "speed": 1}, "lazare": {"speed": 3, "light": 2, "storm": 1}, "scream": {"terror": 3, "solitude": 2, "darkness": 1, "mystery": 1}, "wanderer": {"solitude": 3, "nature": 2, "contemplative": 2, "grandeur": 1}, "mother": {"restraint": 3, "solitude": 2, "contemplative": 2, "darkness": 1}, "potato": {"darkness": 2, "intimate": 2, "restraint": 1, "nostalgia": 1, "night": 1}, "sleepreason": {"night": 2, "fantasy": 2, "mystery": 2, "terror": 1}, "burial": {"grief": 3, "death": 1, "restraint": 1, "darkness": 1}};
    const PSRC = {"pearl": "https://en.wikipedia.org/wiki/Girl_with_a_Pearl_Earring", "musiclesson": "https://en.wikipedia.org/wiki/The_Music_Lesson", "nightwatch": "https://en.wikipedia.org/wiki/The_Night_Watch", "prodigal": "https://en.wikipedia.org/wiki/The_Return_of_the_Prodigal_Son_(Rembrandt)", "matthew": "https://en.wikipedia.org/wiki/The_Calling_of_Saint_Matthew", "meninas": "https://en.wikipedia.org/wiki/Las_Meninas", "cavalier": "https://en.wikipedia.org/wiki/The_Laughing_Cavalier", "horatii": "https://en.wikipedia.org/wiki/Oath_of_the_Horatii", "socrates": "https://en.wikipedia.org/wiki/The_Death_of_Socrates", "odalisque": "https://en.wikipedia.org/wiki/Grande_Odalisque", "sabine": "https://en.wikipedia.org/wiki/The_Intervention_of_the_Sabine_Women", "napoleon": "https://en.wikipedia.org/wiki/Napoleon_Crossing_the_Alps", "swing": "https://en.wikipedia.org/wiki/The_Swing_(Fragonard)", "marie": "https://en.wikipedia.org/wiki/Marie_Antoinette_and_Her_Children", "recamier": "https://en.wikipedia.org/wiki/Portrait_of_Madame_R%C3%A9camier", "psyche": "https://en.wikipedia.org/wiki/Cupid_and_Psyche_(G%C3%A9rard)", "endymion": "https://smarthistory.org/girodet-the-sleep-of-endymion/", "thetis": "https://en.wikipedia.org/wiki/Jupiter_and_Thetis", "valpincon": "https://en.wikipedia.org/wiki/The_Valpin%C3%A7on_Bather", "kauffman": "https://www.royalacademy.org.uk/art-artists/work-of-art/design", "morningwalk": "https://en.wikipedia.org/wiki/The_Morning_Walk", "reader": "https://www.nga.gov/stories/articles/mysterious-fantasy-fragonard-young-girl-reading", "kiss": "https://en.wikipedia.org/wiki/The_Kiss_(Hayez)", "nightmare": "https://en.wikipedia.org/wiki/The_Nightmare", "chasseur": "https://en.wikipedia.org/wiki/The_Charging_Chasseur", "algiers": "https://en.wikipedia.org/wiki/The_Women_of_Algiers", "ophelia": "https://en.wikipedia.org/wiki/Ophelia_(painting)", "francesca": "https://mydailyartdisplay.uk/2012/05/15/francesca-da-rimini-by-ary-scheffer/", "titania": "https://en.wikipedia.org/wiki/Titania_and_Bottom", "derby": "https://en.wikipedia.org/wiki/The_1821_Derby_at_Epsom", "poetspitzweg": "https://en.wikipedia.org/wiki/The_Poor_Poet", "shalott": "https://en.wikipedia.org/wiki/The_Lady_of_Shalott_(painting)", "seaice": "https://en.wikipedia.org/wiki/The_Sea_of_Ice", "monk": "https://en.wikipedia.org/wiki/The_Monk_by_the_Sea", "rugen": "https://en.wikipedia.org/wiki/Chalk_Cliffs_on_R%C3%BCgen", "temeraire": "https://en.wikipedia.org/wiki/The_Fighting_Temeraire", "railspeed": "https://en.wikipedia.org/wiki/Rain,_Steam_and_Speed_%E2%80%93_The_Great_Western_Railway", "hannibal": "https://en.wikipedia.org/wiki/Snow_Storm:_Hannibal_and_his_Army_Crossing_the_Alps", "barque": "https://en.wikipedia.org/wiki/The_Barque_of_Dante", "haywain": "https://en.wikipedia.org/wiki/The_Hay_Wain", "hamlet": "https://en.wikipedia.org/wiki/Hamlet_and_Horatio_in_the_Graveyard", "schubertiade": "https://en.wikipedia.org/wiki/Schubertiade", "milkmaid": "https://en.wikipedia.org/wiki/The_Milkmaid_(Vermeer)", "delft": "https://en.wikipedia.org/wiki/View_of_Delft", "balance": "https://en.wikipedia.org/wiki/Woman_Holding_a_Balance", "littlestreet": "https://en.wikipedia.org/wiki/The_Little_Street", "courtyard": "https://en.wikipedia.org/wiki/The_Courtyard_of_a_House_in_Delft", "bubbles": "https://en.wikipedia.org/wiki/Soap_Bubbles_(Chardin)", "grace": "https://en.wikipedia.org/wiki/Saying_Grace_(Chardin)", "magdalene": "https://en.wikipedia.org/wiki/Magdalene_with_the_Smoking_Flame", "lemons": "https://en.wikipedia.org/wiki/Still_Life_with_Lemons,_Oranges_and_a_Rose", "sheba": "https://en.wikipedia.org/wiki/The_Embarkation_of_the_Queen_of_Sheba", "philosopher": "https://en.wikipedia.org/wiki/Philosopher_in_Meditation", "chocolate": "https://en.wikipedia.org/wiki/The_Chocolate_Girl", "paul": "https://en.wikipedia.org/wiki/The_Conversion_of_Saint_Paul_(Caravaggio)", "elevation": "https://en.wikipedia.org/wiki/The_Elevation_of_the_Cross_(Rubens)", "warconseq": "https://en.wikipedia.org/wiki/Consequences_of_War", "breda": "https://en.wikipedia.org/wiki/The_Surrender_of_Breda", "wolfe": "https://en.wikipedia.org/wiki/The_Death_of_General_Wolfe", "coronation": "https://en.wikipedia.org/wiki/The_Coronation_of_Napoleon", "cythera": "https://en.wikipedia.org/wiki/The_Embarkation_for_Cythera", "pompadour": "https://en.wikipedia.org/wiki/Madame_de_Pompadour", "stolenkiss": "https://en.wikipedia.org/wiki/The_Stolen_Kiss", "sheridan": "https://en.wikipedia.org/wiki/Mrs._Richard_Brinsley_Sheridan_(painting)", "blueboy": "https://en.wikipedia.org/wiki/The_Blue_Boy", "pinkie": "https://en.wikipedia.org/wiki/Pinkie_(painting)", "strawhat": "https://en.wikipedia.org/wiki/Self-Portrait_in_a_Straw_Hat", "charleshunt": "https://en.wikipedia.org/wiki/Charles_I_at_the_Hunt", "gardenlove": "https://en.wikipedia.org/wiki/The_Garden_of_Love_(Rubens)", "oldsing": "https://en.wikipedia.org/wiki/As_the_Old_Sing,_So_Pipe_the_Young_(Jan_Steen)", "toilette": "https://en.wikipedia.org/wiki/The_Toilet_of_Venus_(Boucher)", "ageinnocence": "https://en.wikipedia.org/wiki/The_Age_of_Innocence_(painting)", "arcadia": "https://en.wikipedia.org/wiki/Et_in_Arcadia_ego_(Poussin)", "dancetime": "https://en.wikipedia.org/wiki/A_Dance_to_the_Music_of_Time_(painting)", "isaac": "https://en.wikipedia.org/wiki/Claude_Lorrain", "paris": "https://en.wikipedia.org/wiki/The_Judgement_of_Paris_(Rubens)", "bacchus": "https://en.wikipedia.org/wiki/The_Loves_of_the_Gods", "atalanta": "https://en.wikipedia.org/wiki/Atalanta_and_Hippomenes", "venustriumph": "https://en.wikipedia.org/wiki/The_Triumph_of_Venus", "graces": "https://en.wikipedia.org/wiki/Jean-Baptiste_Regnault", "ossian": "https://en.wikipedia.org/wiki/Anne-Louis_Girodet_de_Roussy-Trioson", "oedipus": "https://en.wikipedia.org/wiki/Oedipus_and_the_Sphinx_(Ingres)", "spinners": "https://en.wikipedia.org/wiki/Las_Hilanderas", "danae": "https://en.wikipedia.org/wiki/Dana%C3%AB_(Rembrandt)", "window": "https://en.wikipedia.org/wiki/Woman_at_a_Window", "moonrise": "https://en.wikipedia.org/wiki/Moonrise_by_the_Sea", "twomen": "https://en.wikipedia.org/wiki/Two_Men_Contemplating_the_Moon", "wivenhoe": "https://en.wikipedia.org/wiki/Wivenhoe_Park", "cornfield": "https://en.wikipedia.org/wiki/The_Cornfield", "mortefontaine": "https://en.wikipedia.org/wiki/Souvenir_de_Mortefontaine", "angelus": "https://en.wikipedia.org/wiki/The_Angelus_(painting)", "norham": "https://en.wikipedia.org/wiki/Norham_Castle,_Sunrise", "studio": "https://en.wikipedia.org/wiki/Caspar_David_Friedrich_in_his_Studio", "stages": "https://en.wikipedia.org/wiki/The_Stages_of_Life", "lonetree": "https://en.wikipedia.org/wiki/The_Lonely_Tree", "bookworm": "https://en.wikipedia.org/wiki/The_Bookworm_(Spitzweg)", "ninthwave": "https://en.wikipedia.org/wiki/The_Ninth_Wave", "steamboat": "https://en.wikipedia.org/wiki/Snow_Storm:_Steam-Boat_off_a_Harbour's_Mouth", "arabhorses": "https://en.wikipedia.org/wiki/Arab_Horses_Fighting_in_a_Stable", "shipwreck": "https://en.wikipedia.org/wiki/The_Shipwreck_(Turner)", "crusaders": "https://en.wikipedia.org/wiki/Entry_of_the_Crusaders_in_Constantinople", "avalanche": "https://en.wikipedia.org/wiki/Philip_James_de_Loutherbourg", "galilee": "https://en.wikipedia.org/wiki/Christ_Asleep_during_the_Tempest", "trafalgar": "https://en.wikipedia.org/wiki/The_Battle_of_Trafalgar_(Turner)", "campaign": "https://en.wikipedia.org/wiki/French_Campaign,_1814_(Meissonier)", "colossus": "https://en.wikipedia.org/wiki/The_Colossus_(painting)", "oakwood": "https://en.wikipedia.org/wiki/The_Abbey_in_the_Oakwood", "isledead": "https://en.wikipedia.org/wiki/Island_of_the_Dead_(painting)", "wrath": "https://en.wikipedia.org/wiki/The_Great_Day_of_His_Wrath", "witches": "https://en.wikipedia.org/wiki/Three_Witches", "deluge": "https://en.wikipedia.org/wiki/Francis_Danby", "princes": "https://en.wikipedia.org/wiki/Princes_in_the_Tower", "hylas": "https://en.wikipedia.org/wiki/Hylas", "huguenot": "https://en.wikipedia.org/wiki/A_Huguenot,_on_St._Bartholomew's_Day", "proserpine": "https://en.wikipedia.org/wiki/Proserpine_(Rossetti)", "beatrix": "https://en.wikipedia.org/wiki/Beata_Beatrix", "goldenstairs": "https://en.wikipedia.org/wiki/The_Golden_Stairs", "flamingjune": "https://en.wikipedia.org/wiki/Flaming_June", "aprillove": "https://en.wikipedia.org/wiki/April_Love_(painting)", "lastengland": "https://en.wikipedia.org/wiki/The_Last_of_England_(painting)", "esther": "https://en.wikipedia.org/wiki/The_Toilette_of_Esther", "atala": "https://en.wikipedia.org/wiki/The_Burial_of_Atala", "belledame": "https://en.wikipedia.org/wiki/La_Belle_Dame_sans_Merci", "eugenie": "https://en.wikipedia.org/wiki/Empress_Eug%C3%A9nie_Surrounded_by_her_Ladies_in_Waiting", "athens": "https://en.wikipedia.org/wiki/The_School_of_Athens", "adam": "https://en.wikipedia.org/wiki/The_Creation_of_Adam", "lastsupper": "https://en.wikipedia.org/wiki/The_Last_Supper_(Leonardo)", "belshazzar": "https://commons.wikimedia.org/wiki/File:Rembrandt_-_Belshazzar's_Feast_-_WGA19123.jpg", "emmaus": "https://commons.wikimedia.org/wiki/File:Supper_at_Emmaus-Caravaggio_(1601).jpg", "arcole": "https://commons.wikimedia.org/wiki/File:Antoine-Jean_Gros_-_Bonaparte_au_pont_d'Arcole(1796).jpg", "titianbacchus": "https://en.wikipedia.org/wiki/Bacchus_and_Ariadne", "babel": "https://en.wikipedia.org/wiki/The_Tower_of_Babel_(Bruegel)", "monalisa": "https://en.wikipedia.org/wiki/Mona_Lisa", "delaware": "https://en.wikipedia.org/wiki/Washington_Crossing_the_Delaware_(1851_painting)", "starrynight": "https://en.wikipedia.org/wiki/The_Starry_Night", "crows": "https://en.wikipedia.org/wiki/Wheatfield_with_Crows", "etoile": "https://commons.wikimedia.org/wiki/File:Edgar_Germain_Hilaire_Degas_018.jpg", "lazare": "https://commons.wikimedia.org/wiki/File:Claude_Monet_-_The_Saint-Lazare_Station_-_Google_Art_Project.jpg", "scream": "https://en.wikipedia.org/wiki/The_Scream", "wanderer": "https://en.wikipedia.org/wiki/Wanderer_above_the_Sea_of_Fog", "mother": "https://en.wikipedia.org/wiki/Whistler%27s_Mother", "potato": "https://en.wikipedia.org/wiki/The_Potato_Eaters", "sleepreason": "https://en.wikipedia.org/wiki/The_Sleep_of_Reason_Produces_Monsters", "burial": "https://en.wikipedia.org/wiki/A_Burial_at_Ornans"};
    const CAT = [{"e": "classic", "c": "bach", "en": "Orchestral Suite No. 3 in D major, BWV 1068 — II. Air (“Air on the G String”)", "ko": "관현악 모음곡 3번 D장조 BWV 1068 — 2악장 아리아 (“G선상의 아리아”)", "yt": "MPia1ap_Wb8", "who": "Karajan · Berliner Philharmoniker", "t": {"serene": 1, "contemplative": 1}, "s": "https://en.wikipedia.org/wiki/Orchestral_suites_(Bach)"}, {"e": "classic", "c": "bach", "en": "Orchestral Suite No. 2 in B minor, BWV 1067 — VII. Badinerie", "ko": "관현악 모음곡 2번 B단조 BWV 1067 — 7곡 바디네리", "yt": "9aFUuHIdV1o", "who": "Karajan · Berliner Philharmoniker", "t": {"humour": 3, "speed": 1}, "s": "https://en.wikipedia.org/wiki/Orchestral_suites_(Bach)"}, {"e": "classic", "c": "bach", "en": "Goldberg Variations, BWV 988 — Aria", "ko": "골드베르크 변주곡 BWV 988 — 아리아", "yt": "rCuALWK6ZNg", "who": "Glenn Gould, piano", "t": {"dance": 2, "contemplative": 1, "intimate": 1}, "s": "https://en.wikipedia.org/wiki/Goldberg_Variations"}, {"e": "classic", "c": "bach", "en": "Cello Suite No. 1 in G major, BWV 1007 — Prélude", "ko": "무반주 첼로 모음곡 1번 G장조 BWV 1007 — 프렐류드", "yt": "1prweT95Mo0", "who": "Yo-Yo Ma, cello", "t": {"speed": 1, "grandeur": 1}, "s": "https://en.wikipedia.org/wiki/Cello_Suites_(Bach)"}, {"e": "classic", "c": "bach", "en": "Toccata and Fugue in D minor, BWV 565", "ko": "토카타와 푸가 D단조 BWV 565", "yt": "1UQ25tCgCog", "who": "Karl Richter, organ", "t": {"storm": 3, "grandeur": 2, "drama": 1}, "s": "https://en.wikipedia.org/wiki/Toccata_and_Fugue_in_D_minor,_BWV_565"}, {"e": "classic", "c": "bach", "en": "Violin Partita No. 2 in D minor, BWV 1004 — V. Chaconne", "ko": "바이올린 파르티타 2번 D단조 BWV 1004 — 5곡 샤콘", "yt": "aBQkRzZYN8I", "who": "Itzhak Perlman, violin", "t": {"grandeur": 3, "grief": 3, "sacred": 1, "order": 1}, "s": "https://en.wikipedia.org/wiki/Partita_for_Violin_No._2_(Bach)"}, {"e": "classic", "c": "bach", "en": "Passacaglia and Fugue in C minor, BWV 582", "ko": "파사칼리아와 푸가 C단조 BWV 582", "yt": "7aTQ3RHDHCY", "who": "Helmut Walcha, organ", "t": {"order": 2, "longing": 1, "drama": 1, "grandeur": 1, "darkness": 1}, "s": "https://en.wikipedia.org/wiki/Passacaglia_and_Fugue_in_C_minor,_BWV_582"}, {"e": "classic", "c": "bach", "en": "Concerto for Two Violins in D minor, BWV 1043 — I. Vivace", "ko": "두 대의 바이올린을 위한 협주곡 D단조 BWV 1043 — 1악장 비바체", "yt": "CmmpjziKcFU", "who": "Menuhin & Oistrakh, violins", "t": {"speed": 1}, "s": "https://en.wikipedia.org/wiki/Concerto_for_Two_Violins_(Bach)"}, {"e": "classic", "c": "bach", "en": "Concerto for Two Violins in D minor, BWV 1043 — II. Largo ma non troppo", "ko": "두 대의 바이올린을 위한 협주곡 D단조 BWV 1043 — 2악장 라르고 마 논 트로포", "yt": "zf1X7ppZiIQ", "who": "Menuhin & Oistrakh, violins", "t": {"serene": 1, "tender": 1}, "s": "https://en.wikipedia.org/wiki/Concerto_for_Two_Violins_(Bach)"}, {"e": "classic", "c": "bach", "en": "St Matthew Passion, BWV 244 — “Erbarme dich, mein Gott”", "ko": "마태 수난곡 BWV 244 — “불쌍히 여기소서, 나의 하느님”", "yt": "xt2FtlK2gZM", "who": "Janet Baker, mezzo-soprano", "t": {"grief": 3, "sacred": 2, "intimate": 1}, "s": "https://en.wikipedia.org/wiki/St_Matthew_Passion_structure"}, {"e": "classic", "c": "bach", "en": "Cantata BWV 147 — “Jesu, Joy of Man’s Desiring”", "ko": "칸타타 BWV 147 — “예수, 인간 소망의 기쁨”", "yt": "GWtoeYznx8E", "who": "Netherlands Bach Society", "t": {"sacred": 2, "nature": 1, "serene": 1, "joy": 1}, "s": "https://en.wikipedia.org/wiki/Herz_und_Mund_und_Tat_und_Leben,_BWV_147"}, {"e": "classic", "c": "bach", "en": "Brandenburg Concerto No. 3 in G major, BWV 1048 — I. Allegro", "ko": "브란덴부르크 협주곡 3번 G장조 BWV 1048 — 1악장 알레그로", "yt": "GEhc0cqXsYA", "who": "Shunske Sato · Netherlands Bach Society", "t": {"order": 2, "storm": 1, "speed": 1}, "s": "https://en.wikipedia.org/wiki/Brandenburg_Concertos"}, {"e": "classic", "c": "bach", "en": "Brandenburg Concerto No. 5 in D major, BWV 1050 — I. Allegro", "ko": "브란덴부르크 협주곡 5번 D장조 BWV 1050 — 1악장 알레그로", "yt": "xw-H_BpcOPk", "who": "Berliner Philharmoniker", "t": {"order": 2, "joy": 1, "speed": 1, "opulence": 1}, "s": "https://en.wikipedia.org/wiki/Brandenburg_Concertos"}, {"e": "classic", "c": "bach", "en": "The Well-Tempered Clavier, Book I — Prelude No. 1 in C major, BWV 846", "ko": "평균율 클라비어곡집 1권 — 프렐류드 1번 C장조 BWV 846", "yt": "gVah1cr3pU0", "who": "Lang Lang, piano", "t": {"serene": 2, "order": 1, "light": 1, "contemplative": 1}, "s": "https://en.wikipedia.org/wiki/The_Well-Tempered_Clavier"}, {"e": "classic", "c": "bach", "en": "Cello Suite No. 5 in C minor, BWV 1011 — Sarabande", "ko": "무반주 첼로 모음곡 5번 C단조 BWV 1011 — 사라방드", "yt": "gOk5Qtian1w", "who": "Mstislav Rostropovich, cello", "t": {"solitude": 3, "grief": 2, "contemplative": 1, "darkness": 1}, "s": "https://en.wikipedia.org/wiki/Cello_Suites_(Bach)"}, {"e": "classic", "c": "bach", "en": "Violin Concerto in A minor, BWV 1041 — I. Allegro moderato", "ko": "바이올린 협주곡 A단조 BWV 1041 — 1악장", "yt": "Q3-5144TaYg", "who": "Hilary Hahn, violin", "t": {"drama": 1, "order": 1, "melancholy": 1, "speed": 1}, "s": "https://en.wikipedia.org/wiki/Violin_Concerto_in_A_minor_(Bach)"}, {"e": "classic", "c": "bach", "en": "Keyboard Concerto No. 5 in F minor, BWV 1056 — II. Largo", "ko": "건반 협주곡 5번 F단조 BWV 1056 — 2악장 라르고", "yt": "Fe40O80Kmcg", "who": "Beatrice Rana, piano", "t": {"tender": 2, "longing": 1, "intimate": 1, "serene": 1}, "s": "https://en.wikipedia.org/wiki/Keyboard_concertos_by_Johann_Sebastian_Bach"}, {"e": "classic", "c": "bach", "en": "Mass in B minor, BWV 232 — Agnus Dei", "ko": "미사 B단조 BWV 232 — 아뉴스 데이", "yt": "Ug6Wj8rO-iw", "who": "Netherlands Bach Society", "t": {"sacred": 3, "grief": 1, "longing": 1}, "s": "https://en.wikipedia.org/wiki/Mass_in_B_minor"}, {"e": "classic", "c": "bach", "en": "St Matthew Passion, BWV 244 — Opening chorus “Kommt, ihr Töchter”", "ko": "마태 수난곡 BWV 244 — 첫 합창 “오라, 딸들아”", "yt": "RnkSFKJ4rC0", "who": "Netherlands Bach Society", "t": {"sacred": 2, "grandeur": 2, "grief": 2, "drama": 1}, "s": "https://en.wikipedia.org/wiki/St_Matthew_Passion"}, {"e": "classic", "c": "bach", "en": "Italian Concerto in F major, BWV 971 — III. Presto", "ko": "이탈리아 협주곡 F장조 BWV 971 — 3악장 프레스토", "yt": "763rK2flIJc", "who": "Daniel Martyn Lewis", "t": {"speed": 2, "joy": 2, "light": 1}, "s": "https://en.wikipedia.org/wiki/Italian_Concerto_(Bach)"}, {"e": "classic", "c": "bach", "en": "Cantata BWV 208 — “Sheep May Safely Graze”", "ko": "칸타타 BWV 208 — “양들은 한가로이 풀을 뜯고”", "yt": "xt3DEuw0wjM", "who": "Toronto Bach Festival", "t": {"serene": 2, "nature": 2, "tender": 1, "sacred": 1}, "s": "https://en.wikipedia.org/wiki/Was_mir_behagt,_ist_nur_die_muntre_Jagd,_BWV_208"}, {"e": "classic", "c": "bach", "en": "French Suite No. 1 in D minor, BWV 812 — I. Allemande", "ko": "프랑스 모음곡 1번 D단조 BWV 812 — 1곡 알르망드", "yt": "aTnN5rPpdwE", "who": "András Schiff, piano", "t": {"contemplative": 2, "order": 1, "restraint": 1}, "s": "https://en.wikipedia.org/wiki/French_Suites_(Bach)"}, {"e": "classic", "c": "bach", "en": "Chorale Prelude “Ich ruf zu dir, Herr Jesu Christ”, BWV 639", "ko": "코랄 전주곡 “주 예수 그리스도여, 당신께 부르짖나이다” BWV 639", "yt": "fLLEumabTPA", "who": "Leo van Doeselaar, organ · Netherlands Bach Society", "t": {"sacred": 2, "contemplative": 1, "solitude": 1, "longing": 1}, "s": "https://en.wikipedia.org/wiki/Orgelb%C3%BCchlein"}, {"e": "classic", "c": "bach", "en": "Flute Sonata in E-flat major, BWV 1031 — II. Siciliano", "ko": "플루트 소나타 E♭장조 BWV 1031 — 2악장 시칠리아노", "yt": "FHqytGT0lqo", "who": "Lang Lang, piano (arr. Kempff)", "t": {"melancholy": 1, "tender": 1, "serene": 1, "nostalgia": 1}, "s": "https://en.wikipedia.org/wiki/Flute_Sonata_in_E-flat_major,_BWV_1031"}, {"e": "classic", "c": "handel", "en": "Zadok the Priest, HWV 258", "ko": "제사장 사독 HWV 258", "yt": "rjWSgFn7ouA", "who": "John Eliot Gardiner", "t": {"grandeur": 3, "fantasy": 1, "tender": 1, "drama": 1, "dance": 1, "sacred": 1}, "s": "https://en.wikipedia.org/wiki/Zadok_the_Priest"}, {"e": "classic", "c": "handel", "en": "Music for the Royal Fireworks — Overture, HWV 351", "ko": "왕궁의 불꽃놀이 — 서곡 HWV 351", "yt": "s7yxQHLx1uE", "who": "John Eliot Gardiner · English Baroque Soloists", "t": {"grandeur": 3, "war": 2, "storm": 1, "joy": 1, "serene": 1}, "s": "https://en.wikipedia.org/wiki/Music_for_the_Royal_Fireworks"}, {"e": "classic", "c": "handel", "en": "Serse — “Ombra mai fu”", "ko": "세르세 — “그리운 나무 그늘이여” (옴브라 마이 푸)", "yt": "2_1UYs1FxAI", "who": "Cecilia Bartoli, mezzo-soprano", "t": {"nature": 3, "tender": 1, "serene": 1, "sacred": 1}, "s": "https://en.wikipedia.org/wiki/Serse"}, {"e": "classic", "c": "handel", "en": "Messiah — Hallelujah Chorus", "ko": "메시아 — 할렐루야 합창", "yt": "U69gSDCXw24", "who": "VOCES8", "t": {"grandeur": 2, "sacred": 1, "joy": 1}, "s": "https://en.wikipedia.org/wiki/Structure_of_Handel%27s_Messiah"}, {"e": "classic", "c": "handel", "en": "Messiah — “I know that my Redeemer liveth”", "ko": "메시아 — “나는 내 구원자가 살아 계심을 아네”", "yt": "X8Yxr6ED0EU", "who": "Lucy Crowe, soprano", "t": {"sacred": 2, "intimate": 1, "contemplative": 1}, "s": "https://en.wikipedia.org/wiki/Structure_of_Handel%27s_Messiah"}, {"e": "classic", "c": "handel", "en": "Rinaldo — “Lascia ch’io pianga”", "ko": "리날도 — “울게 하소서”", "yt": "6awzmkHTtrs", "who": "Cecilia Bartoli, mezzo-soprano", "t": {"heroic": 3, "solitude": 2, "longing": 2, "grief": 1, "melancholy": 1}, "s": "https://en.wikipedia.org/wiki/Lascia_ch%27io_pianga"}, {"e": "classic", "c": "handel", "en": "Water Music, Suite No. 2 in D major — Alla Hornpipe", "ko": "수상 음악 모음곡 2번 D장조 — 알라 혼파이프", "yt": "96Th_y6PGUg", "who": "Trevor Pinnock · The English Concert", "t": {"water": 2, "dance": 2, "night": 1, "joy": 1, "storm": 1}, "s": "https://en.wikipedia.org/wiki/Water_Music"}, {"e": "classic", "c": "handel", "en": "Giulio Cesare — “Piangerò la sorte mia”", "ko": "줄리오 체사레 — “내 운명을 한탄하리”", "yt": "1v_yhrQkcAw", "who": "Danielle de Niese, soprano", "t": {"drama": 2, "grief": 1, "war": 1, "melancholy": 1}, "s": "https://en.wikipedia.org/wiki/Giulio_Cesare"}, {"e": "classic", "c": "handel", "en": "Solomon — The Arrival of the Queen of Sheba, HWV 67", "ko": "솔로몬 — 시바 여왕의 도착 HWV 67", "yt": "U9FaoRJAgII", "who": "Academy of Ancient Music", "t": {"joy": 2, "grandeur": 1, "myth": 1, "love": 1, "light": 1, "speed": 1}, "s": "https://en.wikipedia.org/wiki/The_Arrival_of_the_Queen_of_Sheba"}, {"e": "classic", "c": "handel", "en": "Keyboard Suite No. 5 in E major, HWV 430 — “The Harmonious Blacksmith”", "ko": "건반 모음곡 5번 E장조 HWV 430 — “즐거운 대장장이”", "yt": "bNzVz5byPqk", "who": "Murray Perahia, piano", "t": {"darkness": 1, "order": 1, "myth": 1, "intimate": 1}, "s": "https://en.wikipedia.org/wiki/The_Harmonious_Blacksmith"}, {"e": "classic", "c": "vivaldi", "en": "The Four Seasons — Spring: I. Allegro", "ko": "사계 — 봄 1악장 알레그로", "yt": "tbwVJVNvMh4", "who": "Gidon Kremer, violin", "t": {"nature": 3, "joy": 3, "water": 1}, "s": "https://en.wikipedia.org/wiki/The_Four_Seasons_(Vivaldi)"}, {"e": "classic", "c": "vivaldi", "en": "The Four Seasons — Summer: III. Presto", "ko": "사계 — 여름 3악장 프레스토", "yt": "124NoPUBDvA", "who": "Anne-Sophie Mutter, violin", "t": {"storm": 3, "sacred": 1, "nature": 1, "speed": 1}, "s": "https://en.wikipedia.org/wiki/The_Four_Seasons_(Vivaldi)"}, {"e": "classic", "c": "vivaldi", "en": "The Four Seasons — Winter: I. Allegro non molto", "ko": "사계 — 겨울 1악장 알레그로 논 몰토", "yt": "rBq4ov5Y_84", "who": "Itzhak Perlman, violin", "t": {"cold": 3, "storm": 1, "nature": 1}, "s": "https://en.wikipedia.org/wiki/The_Four_Seasons_(Vivaldi)"}, {"e": "classic", "c": "vivaldi", "en": "The Four Seasons — Autumn, RV 293", "ko": "사계 — 가을 RV 293", "yt": "yhxC0SWyDEU", "who": "Fabio Biondi · Europa Galante", "t": {"dance": 2, "nature": 1, "dream": 1}, "s": "https://en.wikipedia.org/wiki/The_Four_Seasons_(Vivaldi)"}, {"e": "classic", "c": "vivaldi", "en": "Gloria in D major, RV 589 — I. Gloria in excelsis Deo", "ko": "글로리아 D장조 RV 589 — 1곡 “지극히 높은 곳에서 영광”", "yt": "_0zWIJc4U_8", "who": "Tafelmusik Baroque Orchestra", "t": {"joy": 2, "speed": 1, "grandeur": 1, "light": 1, "sacred": 1}, "s": "https://www.nashvillesymphony.org/classical-program-notes/antonio-vivaldi-gloria-r-589/"}, {"e": "classic", "c": "vivaldi", "en": "Stabat Mater, RV 621", "ko": "스타바트 마테르 RV 621", "yt": "dH54GCdJ_CI", "who": "Philippe Jaroussky, countertenor", "t": {"melancholy": 1, "restraint": 1, "tender": 1, "sacred": 1, "darkness": 1}, "s": "https://en.wikipedia.org/wiki/Stabat_Mater_(Vivaldi)"}, {"e": "classic", "c": "purcell", "en": "Dido and Aeneas — “When I am laid in earth” (Dido’s Lament)", "ko": "디도와 아이네아스 — “내가 땅에 묻힐 때” (디도의 탄식)", "yt": "dl9Mbv5Ag-w", "who": "Janet Baker, mezzo-soprano", "t": {"death": 2, "grief": 1, "drama": 1, "farewell": 1}, "s": "https://en.wikipedia.org/wiki/Dido%27s_Lament"}, {"e": "classic", "c": "purcell", "en": "Music for a while, Z. 583", "ko": "잠시 동안의 음악 Z. 583", "yt": "tRI1Hx0DXmo", "who": "Alfred Deller, countertenor (1949)", "t": {"serene": 1, "melancholy": 1, "intimate": 1}, "s": "https://en.wikipedia.org/wiki/Music_for_a_While"}, {"e": "classic", "c": "purcell", "en": "Abdelazer, Z. 570 — Rondeau", "ko": "압델라자르 Z. 570 — 론도", "yt": "QoX7qiZxhM8", "who": "Academy of Ancient Music", "t": {"dance": 1, "grandeur": 1, "youth": 1, "darkness": 1, "drama": 1, "elegance": 1}, "s": "https://en.wikipedia.org/wiki/Abdelazer"}, {"e": "classic", "c": "purcell", "en": "King Arthur, Z. 628 — “What power art thou” (Cold Song)", "ko": "아서 왕 Z. 628 — “그대는 어떤 힘인가” (냉기의 노래)", "yt": "CkfJOrZHDOA", "who": "Klaus Nomi (1981)", "t": {"cold": 3, "dream": 1, "terror": 1}, "s": "https://en.wikipedia.org/wiki/King_Arthur_(opera)"}, {"e": "classic", "c": "scarlatti", "en": "Keyboard Sonata in D minor, K. 141", "ko": "건반 소나타 D단조 K. 141", "yt": "wjghYFgt8Zk", "who": "Martha Argerich, piano", "t": {"speed": 2, "exotic": 2, "dance": 1}, "s": "https://en.wikipedia.org/wiki/Keyboard_Sonata,_K._141_(Scarlatti)"}, {"e": "classic", "c": "mozart", "en": "Symphony No. 40, K. 550 — I. Molto allegro", "ko": "교향곡 40번 K. 550 — 1악장 몰토 알레그로", "yt": "p8bZ7vm4_6M", "who": "Leonard Bernstein", "t": {"darkness": 1, "grief": 1, "speed": 1, "drama": 1}, "s": "https://en.wikipedia.org/wiki/Symphony_No._40_(Mozart)"}, {"e": "classic", "c": "mozart", "en": "Symphony No. 41 “Jupiter”, K. 551 — IV. Molto allegro", "ko": "교향곡 41번 “주피터” K. 551 — 4악장 몰토 알레그로", "yt": "tEwg_AiKC7A", "who": "George Szell · Cleveland Orchestra", "t": {"order": 3, "grandeur": 1, "myth": 1}, "s": "https://en.wikipedia.org/wiki/Symphony_No._41_(Mozart)"}, {"e": "classic", "c": "mozart", "en": "Requiem, K. 626 — Lacrimosa", "ko": "레퀴엠 K. 626 — 라크리모사", "yt": "uy1rSQKWCnw", "who": "Harnoncourt", "t": {"grief": 3, "sacred": 2, "death": 1}, "s": "https://en.wikipedia.org/wiki/Requiem_(Mozart)"}, {"e": "classic", "c": "mozart", "en": "Piano Concerto No. 21, K. 467 — II. Andante", "ko": "피아노 협주곡 21번 K. 467 — 2악장 안단테", "yt": "_3n3AHx6Qtk", "who": "Mitsuko Uchida, piano", "t": {"dream": 2, "restraint": 1, "water": 1, "love": 1, "tender": 1}, "s": "https://en.wikipedia.org/wiki/Piano_Concerto_No._21_(Mozart)"}, {"e": "classic", "c": "mozart", "en": "Clarinet Concerto, K. 622 — II. Adagio", "ko": "클라리넷 협주곡 K. 622 — 2악장 아다지오", "yt": "8f-NDmmpVF4", "who": "Karl Leister · Karajan · Berliner Philharmoniker", "t": {"serene": 1, "grief": 1, "contemplative": 1}, "s": "https://en.wikipedia.org/wiki/Clarinet_Concerto_(Mozart)"}, {"e": "classic", "c": "mozart", "en": "Eine kleine Nachtmusik, K. 525 — I. Allegro", "ko": "아이네 클라이네 나흐트무지크 K. 525 — 1악장 알레그로", "yt": "k5Hr-uiDyP8", "who": "Karl Böhm · Wiener Philharmoniker", "t": {"night": 2, "speed": 1, "elegance": 1, "order": 1}, "s": "https://en.wikipedia.org/wiki/Eine_kleine_Nachtmusik"}, {"e": "classic", "c": "mozart", "en": "Piano Sonata No. 11, K. 331 — I. Andante grazioso", "ko": "피아노 소나타 11번 K. 331 — 1악장 안단테 그라치오소", "yt": "FZ1mj9IaczQ", "who": "Daniel Barenboim, piano", "t": {"elegance": 1, "dance": 1, "tender": 1, "order": 1}, "s": "https://en.wikipedia.org/wiki/Piano_Sonata_No._11_(Mozart)"}, {"e": "classic", "c": "mozart", "en": "Piano Sonata No. 11, K. 331 — III. Rondo alla turca", "ko": "피아노 소나타 11번 K. 331 — 3악장 터키 행진곡", "yt": "VKlRJJKRuto", "who": "Vladimir Horowitz, piano", "t": {"exotic": 3, "humour": 1}, "s": "https://en.wikipedia.org/wiki/Piano_Sonata_No._11_(Mozart)"}, {"e": "classic", "c": "mozart", "en": "The Marriage of Figaro — Overture, K. 492", "ko": "피가로의 결혼 — 서곡 K. 492", "yt": "yh9OTvIiH_I", "who": "Karajan · Wiener Philharmoniker", "t": {"speed": 2, "humour": 2, "joy": 1}, "s": "https://en.wikipedia.org/wiki/The_Marriage_of_Figaro"}, {"e": "classic", "c": "mozart", "en": "Symphony No. 25 in G minor, K. 183 — I. Allegro con brio", "ko": "교향곡 25번 G단조 K. 183 — 1악장 알레그로 콘 브리오", "yt": "HMtm_P7Z3iM", "who": "Academy of St Martin in the Fields", "t": {"storm": 2, "drama": 2, "youth": 1, "speed": 1}, "s": "https://en.wikipedia.org/wiki/Symphony_No._25_(Mozart)"}, {"e": "classic", "c": "mozart", "en": "Piano Concerto No. 20 in D minor, K. 466 — I. Allegro", "ko": "피아노 협주곡 20번 D단조 K. 466 — 1악장 알레그로", "yt": "W44aZnSW1TU", "who": "조성진 Seong-Jin Cho, piano", "t": {"darkness": 2, "drama": 2, "storm": 1}, "s": "https://en.wikipedia.org/wiki/Piano_Concerto_No._20_(Mozart)"}, {"e": "classic", "c": "mozart", "en": "Sinfonia Concertante in E-flat major, K. 364 — II. Andante", "ko": "신포니아 콘체르탄테 E♭장조 K. 364 — 2악장 안단테", "yt": "OKgS5LoSQPw", "who": "Zagreb Chamber Orchestra", "t": {"grief": 2, "longing": 1, "intimate": 1, "melancholy": 1}, "s": "https://en.wikipedia.org/wiki/Sinfonia_Concertante_for_Violin,_Viola_and_Orchestra_(Mozart)"}, {"e": "classic", "c": "mozart", "en": "Concerto for Flute and Harp in C major, K. 299 — II. Andantino", "ko": "플루트와 하프를 위한 협주곡 C장조 K. 299 — 2악장 안단티노", "yt": "4hIRXX_7gME", "who": "확인 필요", "t": {"elegance": 2, "serene": 1, "tender": 1, "light": 1}, "s": "https://en.wikipedia.org/wiki/Concerto_for_Flute,_Harp,_and_Orchestra_(Mozart)"}, {"e": "classic", "c": "mozart", "en": "Piano Sonata No. 8 in A minor, K. 310 — I. Allegro maestoso", "ko": "피아노 소나타 8번 A단조 K. 310 — 1악장 알레그로 마에스토소", "yt": "ZKs1WpMJ0X8", "who": "Grigory Sokolov, piano", "t": {"drama": 2, "grief": 1, "storm": 1}, "s": "https://en.wikipedia.org/wiki/Piano_Sonata_No._8_(Mozart)"}, {"e": "classic", "c": "mozart", "en": "The Marriage of Figaro — “Sull’aria” (Letter Duet)", "ko": "피가로의 결혼 — 편지 이중창 “산들바람에 실려”", "yt": "q1tmHHpEJWM", "who": "Julie Fuchs · Olga Peretyatko", "t": {"tender": 2, "elegance": 2, "serene": 1, "intimate": 1}, "s": "https://en.wikipedia.org/wiki/The_Marriage_of_Figaro"}, {"e": "classic", "c": "mozart", "en": "Requiem, K. 626 — Dies irae", "ko": "레퀴엠 K. 626 — 진노의 날", "yt": "0T7eMctuJLQ", "who": "Claudio Abbado", "t": {"terror": 3, "storm": 2, "death": 1, "sacred": 1}, "s": "https://en.wikipedia.org/wiki/Requiem_(Mozart)"}, {"e": "classic", "c": "mozart", "en": "Fantasia in D minor, K. 397", "ko": "환상곡 D단조 K. 397", "yt": "Yjkc-pjvxdk", "who": "조성진 Seong-Jin Cho, piano", "t": {"mystery": 2, "melancholy": 1, "fantasy": 1, "drama": 1}, "s": "https://en.wikipedia.org/wiki/Fantasia_No._3_(Mozart)"}, {"e": "classic", "c": "mozart", "en": "Symphony No. 39 in E-flat major, K. 543 — III. Menuetto: Allegretto", "ko": "교향곡 39번 E♭장조 K. 543 — 3악장 미뉴에트", "yt": "y0RwDWqLA1U", "who": "Clarus Ensemble", "t": {"dance": 2, "joy": 1, "elegance": 1, "grandeur": 1}, "s": "https://en.wikipedia.org/wiki/Symphony_No._39_(Mozart)"}, {"e": "classic", "c": "mozart", "en": "Piano Concerto No. 23 in A major, K. 488 — II. Adagio", "ko": "피아노 협주곡 23번 A장조 K. 488 — 2악장 아다지오", "yt": "Z71Ya9M1WIA", "who": "Maurizio Pollini, piano", "t": {"melancholy": 1, "dance": 1, "tender": 1}, "s": "https://en.wikipedia.org/wiki/Piano_Concerto_No._23_(Mozart)"}, {"e": "classic", "c": "mozart", "en": "Clarinet Quintet in A major, K. 581 — II. Larghetto", "ko": "클라리넷 오중주 A장조 K. 581 — 2악장 라르게토", "yt": "sV_GeI9_E_k", "who": "Martin Fröst, clarinet", "t": {"restraint": 2, "intimate": 2, "serene": 1, "light": 1, "tender": 1}, "s": "https://en.wikipedia.org/wiki/Clarinet_Quintet_(Mozart)"}, {"e": "classic", "c": "mozart", "en": "Horn Concerto No. 4 in E-flat major, K. 495 — III. Rondo: Allegro vivace", "ko": "호른 협주곡 4번 내림E장조 K. 495 — 3악장 론도 알레그로 비바체", "yt": "IcklOuaNZfk", "who": "Dennis Brain · Karajan · Philharmonia", "t": {"speed": 1, "storm": 1, "humour": 1}, "s": "https://en.wikipedia.org/wiki/Horn_Concerto_No._4_(Mozart)"}, {"e": "classic", "c": "mozart", "en": "Ave verum corpus, K. 618", "ko": "아베 베룸 코르푸스 K. 618", "yt": "Oub5NjO6u4c", "who": "Herbert von Karajan", "t": {"restraint": 3, "sacred": 3, "order": 1, "serene": 1}, "s": "https://en.wikipedia.org/wiki/Ave_verum_corpus_(Mozart)"}, {"e": "classic", "c": "mozart", "en": "Piano Sonata No. 16 “Sonata facile”, K. 545 — I. Allegro", "ko": "피아노 소나타 16번 “쉬운 소나타” K. 545 — 1악장 알레그로", "yt": "jPo3uXWJ440", "who": "Friedrich Gulda, piano", "t": {"restraint": 1, "youth": 1, "order": 1, "joy": 1, "elegance": 1, "intimate": 1}, "s": "https://en.wikipedia.org/wiki/Piano_Sonata_No._16_(Mozart)"}, {"e": "classic", "c": "mozart", "en": "The Magic Flute — “Der Hölle Rache” (Queen of the Night)", "ko": "마술피리 — 밤의 여왕 아리아 “지옥의 복수가”", "yt": "YuBeBjqKSGQ", "who": "Diana Damrau · The Royal Opera", "t": {"terror": 1, "grandeur": 1, "death": 1, "drama": 1, "night": 1}, "s": "https://en.wikipedia.org/wiki/Der_H%C3%B6lle_Rache_kocht_in_meinem_Herzen"}, {"e": "classic", "c": "mozart", "en": "Divertimento in D major, K. 136 — I. Allegro", "ko": "디베르티멘토 D장조 K. 136 — 1악장 알레그로", "yt": "oq-kqDDxdIE", "who": "Karajan · Berliner Philharmoniker", "t": {"joy": 2, "light": 1, "youth": 1, "speed": 1}, "s": "https://www.westcorkmusic.ie/works/divertimento-in-d-major-k-136/"}, {"e": "classic", "c": "mozart", "en": "Don Giovanni — Overture, K. 527", "ko": "돈 조반니 — 서곡 K. 527", "yt": "G1YS61pu8Rc", "who": "Berliner Philharmoniker", "t": {"terror": 2, "humour": 2, "fantasy": 2, "storm": 1, "mystery": 1, "darkness": 1, "drama": 1}, "s": "https://en.wikipedia.org/wiki/Don_Giovanni"}, {"e": "classic", "c": "mozart", "en": "The Magic Flute — Overture, K. 620", "ko": "마술피리 — 서곡 K. 620", "yt": "uteSoRohdEY", "who": "Berliner Philharmoniker", "t": {"mystery": 1, "joy": 1, "order": 1, "fantasy": 1, "humour": 1, "grandeur": 1}, "s": "https://en.wikipedia.org/wiki/The_Magic_Flute"}, {"e": "classic", "c": "mozart", "en": "Piano Concerto No. 19 in F major, K. 459 — II. Allegretto", "ko": "피아노 협주곡 19번 F장조 K. 459 — 2악장 알레그레토", "yt": "opdmE9wjzis", "who": "Mitsuko Uchida, piano", "t": {"elegance": 2, "humour": 1, "light": 1, "serene": 1}, "s": "https://en.wikipedia.org/wiki/Piano_Concerto_No._19_(Mozart)"}, {"e": "classic", "c": "mozart", "en": "Piano Concerto No. 22 in E-flat major, K. 482 — II. Andante", "ko": "피아노 협주곡 22번 E♭장조 K. 482 — 2악장 안단테", "yt": "tqS33CfF2uM", "who": "London Mozart Players", "t": {"grief": 2, "melancholy": 1, "drama": 1, "intimate": 1}, "s": "https://en.wikipedia.org/wiki/Piano_Concerto_No._22_(Mozart)"}, {"e": "classic", "c": "mozart", "en": "Piano Concerto No. 25 in C major, K. 503 — II. Andante", "ko": "피아노 협주곡 25번 C장조 K. 503 — 2악장 안단테", "yt": "JhU47zsh7is", "who": "Mitsuko Uchida, piano", "t": {"serene": 2, "elegance": 1, "contemplative": 1, "grandeur": 1}, "s": "https://en.wikipedia.org/wiki/Piano_Concerto_No._25_(Mozart)"}, {"e": "classic", "c": "mozart", "en": "Piano Concerto No. 27 in B-flat major, K. 595 — II. Larghetto", "ko": "피아노 협주곡 27번 B♭장조 K. 595 — 2악장 라르게토", "yt": "pSGuzttLMzY", "who": "Emil Gilels, piano", "t": {"serene": 2, "farewell": 1, "tender": 1, "contemplative": 1}, "s": "https://en.wikipedia.org/wiki/Piano_Concerto_No._27_(Mozart)"}, {"e": "classic", "c": "mozart", "en": "String Quartet No. 19 in C major “Dissonance”, K. 465 — I. Adagio – Allegro", "ko": "현악 사중주 19번 C장조 “불협화음” K. 465 — 1악장 아다지오 – 알레그로", "yt": "VarJ-MbdgHg", "who": "Emerson String Quartet", "t": {"mystery": 2, "light": 1, "order": 1, "joy": 1}, "s": "https://en.wikipedia.org/wiki/String_Quartet_No._19_(Mozart)"}, {"e": "classic", "c": "mozart", "en": "String Quartet No. 17 in B-flat major “Hunt”, K. 458 — I. Allegro vivace assai", "ko": "현악 사중주 17번 B♭장조 “사냥” K. 458 — 1악장 알레그로 비바체 아사이", "yt": "4Kq-guc6dP0", "who": "Emerson String Quartet", "t": {"joy": 2, "nature": 1, "speed": 1, "humour": 1}, "s": "https://en.wikipedia.org/wiki/String_Quartet_No._17_(Mozart)"}, {"e": "classic", "c": "mozart", "en": "String Quartet No. 15 in D minor, K. 421 — I. Allegro moderato", "ko": "현악 사중주 15번 D단조 K. 421 — 1악장 알레그로 모데라토", "yt": "p9mujZvjDac", "who": "Emerson String Quartet", "t": {"melancholy": 2, "drama": 1, "longing": 1, "intimate": 1}, "s": "https://en.wikipedia.org/wiki/String_Quartet_No._15_(Mozart)"}, {"e": "classic", "c": "mozart", "en": "12 Variations on “Ah, vous dirai-je, Maman”, K. 265", "ko": "“아, 어머니께 말씀드리죠” 주제에 의한 12개의 변주곡 K. 265 (작은 별 변주곡)", "yt": "VcrvP7KaVoA", "who": "정명훈 Myung-Whun Chung, piano", "t": {"youth": 3, "joy": 1, "humour": 1}, "s": "https://en.wikipedia.org/wiki/Twelve_Variations_on_%22Ah_vous_dirai-je,_Maman%22"}, {"e": "classic", "c": "mozart", "en": "String Quartet No. 14 in G major, K. 387 — III. Andante cantabile", "ko": "현악 사중주 14번 G장조 K. 387 — 3악장 안단테 칸타빌레", "yt": "LMbvdi6tmCA", "who": "Emerson String Quartet", "t": {"tender": 2, "intimate": 1, "serene": 1, "contemplative": 1}, "s": "https://en.wikipedia.org/wiki/String_Quartet_No._14_(Mozart)"}, {"e": "classic", "c": "beethoven", "en": "Symphony No. 5, Op. 67 — I. Allegro con brio", "ko": "교향곡 5번 Op. 67 — 1악장 알레그로 콘 브리오", "yt": "pMHVVeZmm4I", "who": "Carlos Kleiber", "t": {"storm": 2, "heroic": 1, "drama": 1}, "s": "https://en.wikipedia.org/wiki/Symphony_No._5_(Beethoven)"}, {"e": "classic", "c": "beethoven", "en": "Symphony No. 6 “Pastoral”, Op. 68 — I. Allegro ma non troppo", "ko": "교향곡 6번 “전원” Op. 68 — 1악장 알레그로 마 논 트로포", "yt": "_zKiDXbwdR0", "who": "Karajan", "t": {"nature": 2, "joy": 1, "serene": 1}, "s": "https://en.wikipedia.org/wiki/Symphony_No._6_(Beethoven)"}, {"e": "classic", "c": "beethoven", "en": "Egmont Overture, Op. 84", "ko": "에그몬트 서곡 Op. 84", "yt": "cXPCOLnOVUo", "who": "Abbado · Berliner Philharmoniker", "t": {"heroic": 3, "grandeur": 2, "death": 1, "drama": 1}, "s": "https://en.wikipedia.org/wiki/Egmont_(Beethoven)"}, {"e": "classic", "c": "beethoven", "en": "Piano Sonata No. 14 “Moonlight”, Op. 27 No. 2 — I. Adagio sostenuto", "ko": "피아노 소나타 14번 “월광” Op. 27 No. 2 — 1악장 아다지오 소스테누토", "yt": "E10K73GvCKU", "who": "Daniel Barenboim, piano", "t": {"grief": 3, "night": 2, "light": 1, "water": 1, "fantasy": 1, "serene": 1}, "s": "https://en.wikipedia.org/wiki/Piano_Sonata_No._14_(Beethoven)"}, {"e": "classic", "c": "beethoven", "en": "Piano Sonata No. 8 “Pathétique”, Op. 13 — II. Adagio cantabile", "ko": "피아노 소나타 8번 “비창” Op. 13 — 2악장 아다지오 칸타빌레", "yt": "ssXsUGXpf_Q", "who": "Wilhelm Kempff, piano", "t": {"serene": 2}, "s": "https://en.wikipedia.org/wiki/Piano_Sonata_No._8_(Beethoven)"}, {"e": "classic", "c": "beethoven", "en": "Romance No. 2 in F major, Op. 50", "ko": "로망스 2번 F장조 Op. 50", "yt": "Gz4JEYQ8ebU", "who": "David Oistrakh, violin", "t": {"tender": 2, "love": 1, "elegance": 1, "contemplative": 1}, "s": "https://en.wikipedia.org/wiki/Romance_No._2_(Beethoven)"}, {"e": "classic", "c": "beethoven", "en": "Symphony No. 7, Op. 92 — II. Allegretto", "ko": "교향곡 7번 Op. 92 — 2악장 알레그레토", "yt": "VPKAntzmwAw", "who": "Wiener Philharmoniker", "t": {"serene": 2, "grief": 1}, "s": "https://en.wikipedia.org/wiki/Symphony_No._7_(Beethoven)"}, {"e": "classic", "c": "beethoven", "en": "Symphony No. 9, Op. 125 — IV. “Ode to Joy”", "ko": "교향곡 9번 Op. 125 — 4악장 “환희의 송가”", "yt": "02jscWEtHZI", "who": "Leonard Bernstein · Berlin 1989 (Carnegie Hall)", "t": {"joy": 1, "grandeur": 1, "heroic": 1}, "s": "https://en.wikipedia.org/wiki/Ode_to_Joy"}, {"e": "classic", "c": "beethoven", "en": "Piano Concerto No. 5 “Emperor”, Op. 73 — II. Adagio un poco mosso", "ko": "피아노 협주곡 5번 “황제” Op. 73 — 2악장 아다지오 운 포코 모소", "yt": "r58Brg7wew4", "who": "Daniel Barenboim, piano", "t": {"serene": 2, "night": 1, "restraint": 1, "dream": 1, "intimate": 1}, "s": "https://en.wikipedia.org/wiki/Piano_Concerto_No._5_(Beethoven)"}, {"e": "classic", "c": "beethoven", "en": "Piano Sonata No. 23 “Appassionata”, Op. 57 — III. Allegro ma non troppo", "ko": "피아노 소나타 23번 “열정” Op. 57 — 3악장 알레그로 마 논 트로포", "yt": "efA1S8hyBms", "who": "Lang Lang, piano", "t": {"storm": 3, "drama": 2, "speed": 2, "darkness": 1}, "s": "https://en.wikipedia.org/wiki/Piano_Sonata_No._23_(Beethoven)"}, {"e": "classic", "c": "beethoven", "en": "Symphony No. 3 “Eroica”, Op. 55 — II. Marcia funebre: Adagio assai", "ko": "교향곡 3번 “영웅” Op. 55 — 2악장 장송 행진곡", "yt": "MwmupVj_qxg", "who": "Karajan · Berliner Philharmoniker", "t": {"grief": 3, "heroic": 2, "death": 2, "grandeur": 1}, "s": "https://en.wikipedia.org/wiki/Symphony_No._3_(Beethoven)"}, {"e": "classic", "c": "beethoven", "en": "Violin Concerto in D major, Op. 61 — II. Larghetto", "ko": "바이올린 협주곡 D장조 Op. 61 — 2악장 라르게토", "yt": "gOYqZODJuPA", "who": "María Dueñas · Honeck · Wiener Symphoniker", "t": {"serene": 3, "tender": 2, "sacred": 1, "contemplative": 1}, "s": "https://en.wikipedia.org/wiki/Violin_Concerto_(Beethoven)"}, {"e": "classic", "c": "beethoven", "en": "String Quartet No. 13 in B-flat major, Op. 130 — V. Cavatina", "ko": "현악 사중주 13번 B♭장조 Op. 130 — 5악장 카바티나", "yt": "go0QFAc1AF0", "who": "Guarneri Quartet", "t": {"longing": 3, "intimate": 2, "melancholy": 2, "solitude": 1}, "s": "https://en.wikipedia.org/wiki/String_Quartet_No._13_(Beethoven)"}, {"e": "classic", "c": "beethoven", "en": "Violin Sonata No. 5 “Spring”, Op. 24 — I. Allegro", "ko": "바이올린 소나타 5번 “봄” Op. 24 — 1악장 알레그로", "yt": "AcofgtlKdj4", "who": "Itzhak Perlman, violin", "t": {"joy": 3, "nature": 2, "light": 1, "tender": 1, "youth": 1}, "s": "https://en.wikipedia.org/wiki/Violin_Sonata_No._5_(Beethoven)"}, {"e": "classic", "c": "beethoven", "en": "Piano Sonata No. 17 “Tempest”, Op. 31 No. 2 — III. Allegretto", "ko": "피아노 소나타 17번 “템페스트” Op. 31 No. 2 — 3악장 알레그레토", "yt": "efJxHUht0Xc", "who": "백건우 Kunwoo Paik, piano", "t": {"speed": 2, "melancholy": 2, "storm": 1, "mystery": 1, "literature": 1}, "s": "https://en.wikipedia.org/wiki/Piano_Sonata_No._17_(Beethoven)"}, {"e": "classic", "c": "beethoven", "en": "Piano Trio “Archduke”, Op. 97 — III. Andante cantabile", "ko": "피아노 삼중주 7번 “대공” Op. 97 — 3악장 안단테 칸타빌레", "yt": "pB7uTxVRp1g", "who": "ATOS Trio", "t": {"serene": 2, "sacred": 2, "contemplative": 1, "intimate": 1}, "s": "https://en.wikipedia.org/wiki/Piano_Trio,_Op._97_(Beethoven)"}, {"e": "classic", "c": "beethoven", "en": "Piano Sonata No. 30 in E major, Op. 109 — I. Vivace ma non troppo – Adagio espressivo", "ko": "피아노 소나타 30번 E장조 Op. 109 — 1악장 비바체 마 논 트로포", "yt": "6vaKY5ODIRE", "who": "Mitsuko Uchida, piano", "t": {"contemplative": 2, "dream": 1, "tender": 1, "fantasy": 1}, "s": "https://en.wikipedia.org/wiki/Piano_Sonata_No._30_(Beethoven)"}, {"e": "classic", "c": "beethoven", "en": "Piano Sonata No. 31 in A-flat major, Op. 110 — I. Moderato cantabile molto espressivo", "ko": "피아노 소나타 31번 A♭장조 Op. 110 — 1악장 모데라토 칸타빌레", "yt": "uzIZu0JoT2E", "who": "Daniel Barenboim, piano", "t": {"tender": 2, "serene": 1, "sacred": 1, "contemplative": 1}, "s": "https://en.wikipedia.org/wiki/Piano_Sonata_No._31_(Beethoven)"}, {"e": "classic", "c": "beethoven", "en": "Cello Sonata No. 5 in D major, Op. 102 No. 2 — I. Allegro con brio", "ko": "첼로 소나타 5번 D장조 Op. 102 No. 2 — 1악장 알레그로 콘 브리오", "yt": "j05BvP64iT8", "who": "Mischa Maisky · Martha Argerich", "t": {"heroic": 1, "speed": 1, "drama": 1, "joy": 1}, "s": "https://en.wikipedia.org/wiki/Cello_Sonatas_Nos._4_and_5_(Beethoven)"}, {"e": "classic", "c": "beethoven", "en": "Cello Sonata No. 3 in A major, Op. 69 — I. Allegro, ma non tanto", "ko": "첼로 소나타 3번 A장조 Op. 69 — 1악장 알레그로 마 논 탄토", "yt": "FdXpF4xERX4", "who": "Yo-Yo Ma · Emanuel Ax", "t": {"serene": 1, "contemplative": 1, "heroic": 1, "intimate": 1}, "s": "https://en.wikipedia.org/wiki/Cello_Sonata_No._3_(Beethoven)"}, {"e": "classic", "c": "haydn", "en": "Symphony No. 104 “London” — I. Adagio – Allegro", "ko": "교향곡 104번 “런던” — 1악장 아다지오 – 알레그로", "yt": "ooZ0NW3KNXc", "who": "Harnoncourt · Concertgebouw Orchestra", "t": {"grandeur": 2, "darkness": 1, "mystery": 1, "order": 1}, "s": "https://en.wikipedia.org/wiki/Symphony_No._104_(Haydn)"}, {"e": "classic", "c": "haydn", "en": "Symphony No. 94 “Surprise” — II. Andante", "ko": "교향곡 94번 “놀람” — 2악장 안단테", "yt": "T0-GaASGt48", "who": "Nikolaus Harnoncourt", "t": {"humour": 3, "drama": 1, "restraint": 1, "serene": 1, "youth": 1, "storm": 1}, "s": "https://en.wikipedia.org/wiki/Symphony_No._94_(Haydn)"}, {"e": "classic", "c": "haydn", "en": "The Creation — “The heavens are telling”", "ko": "천지창조 — “하늘은 하느님의 영광을 전하네”", "yt": "p4lSauxyFWo", "who": "Christopher Hogwood", "t": {"sacred": 2, "order": 2, "joy": 1, "darkness": 1, "light": 1, "grandeur": 1}, "s": "https://en.wikipedia.org/wiki/The_Creation_(Haydn)"}, {"e": "classic", "c": "haydn", "en": "Trumpet Concerto in E-flat major — III. Finale: Allegro", "ko": "트럼펫 협주곡 내림E장조 — 3악장 피날레 알레그로", "yt": "toV7E84OAxI", "who": "Wynton Marsalis, trumpet", "t": {"joy": 1, "grandeur": 1, "light": 1}, "s": "https://en.wikipedia.org/wiki/Trumpet_Concerto_(Haydn)"}, {"e": "classic", "c": "haydn", "en": "Cello Concerto No. 1 in C major — II. Adagio", "ko": "첼로 협주곡 1번 C장조 — 2악장 아다지오", "yt": "LcpL7qAf1UA", "who": "Mstislav Rostropovich, cello", "t": {"speed": 1, "serene": 1, "tender": 1}, "s": "https://en.wikipedia.org/wiki/Cello_Concerto_No._1_(Haydn)"}, {"e": "classic", "c": "haydn", "en": "Symphony No. 45 “Farewell” — IV. Finale", "ko": "교향곡 45번 “고별” — 4악장 피날레", "yt": "Z_7vDoakACg", "who": "London Symphony Orchestra", "t": {"farewell": 3, "drama": 2, "tender": 1, "humour": 1}, "s": "https://en.wikipedia.org/wiki/Symphony_No._45_(Haydn)"}, {"e": "classic", "c": "haydn", "en": "String Quartet “Emperor”, Op. 76 No. 3 — II. Poco adagio, cantabile", "ko": "현악 사중주 “황제” Op. 76 No. 3 — 2악장 포코 아다지오", "yt": "hjxCmJaALxU", "who": "Kodály Quartet", "t": {"grandeur": 2, "heroic": 1, "order": 1}, "s": "https://en.wikipedia.org/wiki/Kaiserquartett"}, {"e": "classic", "c": "gluck", "en": "Orfeo ed Euridice — “Che farò senza Euridice?”", "ko": "오르페오와 에우리디체 — “에우리디체 없이 나는 어찌 살까”", "yt": "56ed5X0Lv90", "who": "Kathleen Ferrier, contralto", "t": {"grief": 2, "myth": 2, "restraint": 2, "love": 1}, "s": "https://en.wikipedia.org/wiki/Orfeo_ed_Euridice"}, {"e": "classic", "c": "gluck", "en": "Orfeo ed Euridice — Dance of the Blessed Spirits", "ko": "오르페오와 에우리디체 — 축복받은 영혼들의 춤", "yt": "bFWcTqLCbdM", "who": "Karajan · Berliner Philharmoniker", "t": {"sacred": 2, "myth": 2, "dream": 1, "joy": 1, "serene": 1}, "s": "https://en.wikipedia.org/wiki/Orfeo_ed_Euridice"}, {"e": "romantic", "c": "chopin", "en": "Nocturne No. 20 in C-sharp minor, Op. posth.", "ko": "녹턴 20번 C♯단조 (유작)", "yt": "s_ST3hzMsVE", "who": "Bruce Liu, piano", "t": {"longing": 2, "melancholy": 2, "night": 1, "intimate": 1}, "s": "https://en.wikipedia.org/wiki/Nocturnes_(Chopin)"}, {"e": "romantic", "c": "chopin", "en": "Nocturne in C minor, Op. 48 No. 1", "ko": "녹턴 C단조 Op. 48 No. 1", "yt": "tSAwZP8e-zQ", "who": "조성진 Seong-Jin Cho, piano", "t": {"grief": 2, "grandeur": 1, "drama": 1, "night": 1}, "s": "https://en.wikipedia.org/wiki/Nocturnes_(Chopin)"}, {"e": "romantic", "c": "chopin", "en": "Ballade No. 4 in F minor, Op. 52", "ko": "발라드 4번 F단조 Op. 52", "yt": "pe-GrRQz8pk", "who": "Krystian Zimerman, piano", "t": {"literature": 2, "melancholy": 2, "storm": 1, "mystery": 1}, "s": "https://en.wikipedia.org/wiki/Ballade_No._4_(Chopin)"}, {"e": "romantic", "c": "chopin", "en": "Barcarolle in F-sharp major, Op. 60", "ko": "뱃노래 F♯장조 Op. 60", "yt": "crLaBkFzXHo", "who": "Daniil Trifonov, piano", "t": {"water": 3, "love": 1, "light": 1, "serene": 1}, "s": "https://en.wikipedia.org/wiki/Barcarolle_(Chopin)"}, {"e": "romantic", "c": "chopin", "en": "Étude in A-flat major, Op. 25 No. 1 “Aeolian Harp”", "ko": "에튀드 A♭장조 Op. 25 No. 1 “에올리안 하프”", "yt": "rrNE9aHJlzw", "who": "임윤찬 Yunchan Lim, piano", "t": {"light": 2, "nature": 1, "tender": 1, "fantasy": 1}, "s": "https://en.wikipedia.org/wiki/Études_(Chopin)"}, {"e": "romantic", "c": "chopin", "en": "Étude in A minor, Op. 25 No. 11 “Winter Wind”", "ko": "에튀드 A단조 Op. 25 No. 11 “겨울바람”", "yt": "pHlqEvAwdVc", "who": "Hayato Sumino, piano", "t": {"storm": 3, "cold": 2, "speed": 1, "drama": 1}, "s": "https://en.wikipedia.org/wiki/Études_(Chopin)"}, {"e": "romantic", "c": "chopin", "en": "Prelude in E minor, Op. 28 No. 4", "ko": "프렐류드 E단조 Op. 28 No. 4", "yt": "gco_v-jm_68", "who": "Maurizio Pollini, piano", "t": {"grief": 2, "death": 1, "solitude": 1, "melancholy": 1}, "s": "https://en.wikipedia.org/wiki/Preludes_(Chopin)"}, {"e": "romantic", "c": "chopin", "en": "Piano Concerto No. 1 in E minor, Op. 11 — II. Romance: Larghetto", "ko": "피아노 협주곡 1번 E단조 Op. 11 — 2악장 로망스", "yt": "V0gwZxnpYNU", "who": "Krystian Zimerman, piano", "t": {"love": 2, "tender": 2, "nostalgia": 1, "night": 1}, "s": "https://en.wikipedia.org/wiki/Piano_Concerto_No._1_(Chopin)"}, {"e": "romantic", "c": "chopin", "en": "Mazurka in A minor, Op. 17 No. 4", "ko": "마주르카 A단조 Op. 17 No. 4", "yt": "vmLvpJySb50", "who": "Vladimir Horowitz, piano", "t": {"melancholy": 2, "dance": 1, "nostalgia": 1, "mystery": 1}, "s": "https://en.wikipedia.org/wiki/Mazurkas_(Chopin)"}, {"e": "romantic", "c": "chopin", "en": "Andante spianato et Grande polonaise brillante, Op. 22", "ko": "안단테 스피아나토와 화려한 대 폴로네즈 Op. 22", "yt": "AO6k_ipgEsI", "who": "Kate Liu, piano", "t": {"opulence": 2, "serene": 1, "dance": 1, "elegance": 1}, "s": "https://en.wikipedia.org/wiki/Andante_spianato_et_grande_polonaise_brillante"}, {"e": "romantic", "c": "chopin", "en": "Étude in C minor, Op. 10 No. 12 “Revolutionary”", "ko": "에튀드 C단조 Op. 10 No. 12 “혁명”", "yt": "7VWHBHeNrg4", "who": "Evgeny Kissin, piano", "t": {"war": 3, "storm": 3, "speed": 1, "heroic": 1}, "s": "https://en.wikipedia.org/wiki/%C3%89tude_Op._10,_No._12_(Chopin)"}, {"e": "romantic", "c": "chopin", "en": "Scherzo No. 2 in B-flat minor, Op. 31", "ko": "스케르초 2번 내림나단조 Op. 31", "yt": "RQb32EA1bCQ", "who": "Arthur Rubinstein, piano", "t": {"literature": 2, "drama": 2, "darkness": 2, "love": 1, "tender": 1, "mystery": 1, "death": 1}, "s": "https://en.wikipedia.org/wiki/Scherzo_No._2_(Chopin)"}, {"e": "romantic", "c": "chopin", "en": "Piano Sonata No. 2, Op. 35 — IV. Finale: Presto", "ko": "피아노 소나타 2번 Op. 35 — 4악장 프레스토", "yt": "JJEQqcw-830", "who": "Maurizio Pollini, piano", "t": {"speed": 2, "mystery": 1, "death": 1, "storm": 1, "terror": 1}, "s": "https://en.wikipedia.org/wiki/Piano_Sonata_No._2_(Chopin)"}, {"e": "romantic", "c": "chopin", "en": "Piano Sonata No. 2, Op. 35 — III. Marche funèbre", "ko": "피아노 소나타 2번 Op. 35 — 3악장 장송 행진곡", "yt": "ido55uT5U0k", "who": "Arthur Rubinstein, piano", "t": {"grief": 3, "death": 1, "night": 1, "tender": 1, "serene": 1}, "s": "https://en.wikipedia.org/wiki/Piano_Sonata_No._2_(Chopin)"}, {"e": "romantic", "c": "chopin", "en": "Nocturne in E-flat major, Op. 9 No. 2", "ko": "녹턴 내림E장조 Op. 9 No. 2", "yt": "2I1WhzKx3Ks", "who": "Arthur Rubinstein, piano", "t": {"night": 2, "elegance": 1, "speed": 1, "nostalgia": 1, "serene": 1}, "s": "https://en.wikipedia.org/wiki/Nocturnes,_Op._9_(Chopin)"}, {"e": "romantic", "c": "chopin", "en": "Polonaise in A-flat major “Heroic”, Op. 53", "ko": "폴로네이즈 내림A장조 “영웅” Op. 53", "yt": "VEl9zn8JPW8", "who": "Arthur Rubinstein, piano", "t": {"heroic": 2, "dance": 2, "grandeur": 2, "war": 1}, "s": "https://en.wikipedia.org/wiki/Polonaise_in_A-flat_major,_Op._53"}, {"e": "romantic", "c": "chopin", "en": "Prelude in D-flat major, Op. 28 No. 15 “Raindrop”", "ko": "전주곡 내림D장조 Op. 28 No. 15 “빗방울”", "yt": "BczgDb9-ctQ", "who": "Maurizio Pollini, piano", "t": {"sacred": 2, "water": 2, "death": 1, "dream": 1, "darkness": 1, "night": 1, "terror": 1}, "s": "https://en.wikipedia.org/wiki/Prelude,_Op._28,_No._15_(Chopin)"}, {"e": "romantic", "c": "chopin", "en": "Piano Concerto No. 2, Op. 21 — II. Larghetto", "ko": "피아노 협주곡 2번 Op. 21 — 2악장 라르게토", "yt": "OEsAM8_V1jk", "who": "Krystian Zimerman, piano", "t": {"love": 1, "longing": 1, "night": 1, "speed": 1, "tender": 1, "dream": 1}, "s": "https://en.wikipedia.org/wiki/Piano_Concerto_No._2_(Chopin)"}, {"e": "romantic", "c": "chopin", "en": "Ballade No. 1 in G minor, Op. 23", "ko": "발라드 1번 G단조 Op. 23", "yt": "VmFmAvwO1pE", "who": "Krystian Zimerman, piano", "t": {"literature": 1, "speed": 1, "grandeur": 1, "war": 1, "storm": 1}, "s": "https://en.wikipedia.org/wiki/Ballade_No._1_(Chopin)"}, {"e": "romantic", "c": "chopin", "en": "Étude in E major, Op. 10 No. 3 “Tristesse”", "ko": "에튀드 E장조 Op. 10 No. 3 “이별의 곡”", "yt": "JS7KfOyMEIY", "who": "Maurizio Pollini, piano", "t": {"melancholy": 2, "farewell": 2, "longing": 2, "intimate": 2}, "s": "https://en.wikipedia.org/wiki/%C3%89tude_Op._10,_No._3_(Chopin)"}, {"e": "romantic", "c": "chopin", "en": "Fantaisie-Impromptu in C-sharp minor, Op. 66", "ko": "환상 즉흥곡 올림C단조 Op. 66", "yt": "75x6DncZDgI", "who": "Arthur Rubinstein, piano", "t": {"storm": 1, "speed": 1, "dream": 1, "mystery": 1, "fantasy": 1}, "s": "https://en.wikipedia.org/wiki/Fantaisie-Impromptu"}, {"e": "romantic", "c": "chopin", "en": "Waltz in D-flat major, Op. 64 No. 1 “Minute”", "ko": "왈츠 내림D장조 Op. 64 No. 1 “강아지”", "yt": "OoX6ZTUd3Vo", "who": "Arthur Rubinstein, piano", "t": {"humour": 3, "speed": 1, "joy": 1, "dance": 1}, "s": "https://en.wikipedia.org/wiki/Minute_Waltz"}, {"e": "romantic", "c": "chopin", "en": "Waltz in A minor, B. 150, Op. posth.", "ko": "왈츠 A단조 B. 150 (유작)", "yt": "n-voZrgjUVc", "who": "Claudio Arrau, piano", "t": {"melancholy": 2, "dance": 1, "intimate": 1, "youth": 1}, "s": "https://en.wikipedia.org/wiki/Waltzes_(Chopin)"}, {"e": "romantic", "c": "chopin", "en": "Nocturne in B major, Op. 32 No. 1", "ko": "녹턴 B장조 Op. 32 No. 1", "yt": "U92QEmtR63E", "who": "Arthur Rubinstein, piano", "t": {"night": 2, "intimate": 1, "contemplative": 1, "drama": 1}, "s": "https://en.wikipedia.org/wiki/Nocturnes,_Op._32_(Chopin)"}, {"e": "romantic", "c": "chopin", "en": "Nocturne in F-sharp major, Op. 15 No. 2", "ko": "녹턴 F♯장조 Op. 15 No. 2", "yt": "u-vmSSkFdwE", "who": "Arthur Rubinstein, piano", "t": {"night": 2, "dream": 1, "tender": 1, "elegance": 1}, "s": "https://en.wikipedia.org/wiki/Nocturnes,_Op._15_(Chopin)"}, {"e": "romantic", "c": "chopin", "en": "Waltz in A-flat major, Op. 34 No. 1", "ko": "왈츠 A♭장조 Op. 34 No. 1", "yt": "Bc3cKqurmLY", "who": "조성진 Seong-Jin Cho, piano", "t": {"dance": 3, "opulence": 1, "joy": 1}, "s": "https://en.wikipedia.org/wiki/Waltzes,_Op._34_(Chopin)"}, {"e": "romantic", "c": "chopin", "en": "Waltz in F major, Op. 34 No. 3", "ko": "왈츠 F장조 Op. 34 No. 3", "yt": "GTARJm5avDo", "who": "조성진 Seong-Jin Cho, piano", "t": {"speed": 2, "dance": 2, "joy": 1, "humour": 1}, "s": "https://en.wikipedia.org/wiki/Waltzes,_Op._34_(Chopin)"}, {"e": "romantic", "c": "schubert", "en": "String Quartet No. 14 “Death and the Maiden”, D. 810 — I. Allegro", "ko": "현악 사중주 14번 “죽음과 소녀” D. 810 — 1악장 알레그로", "yt": "KMyvgUOOD6Y", "who": "Escher Quartet", "t": {"speed": 2, "death": 2, "terror": 1, "storm": 1, "water": 1}, "s": "https://en.wikipedia.org/wiki/String_Quartet_No._14_(Schubert)"}, {"e": "romantic", "c": "schubert", "en": "Impromptu in A-flat major, D. 935 No. 2", "ko": "즉흥곡 A♭장조 D. 935 No. 2", "yt": "pJXDc6-0EmU", "who": "확인 필요", "t": {"serene": 2, "tender": 1, "nostalgia": 1}, "s": "https://en.wikipedia.org/wiki/Impromptus_(Schubert)"}, {"e": "romantic", "c": "schubert", "en": "Moments musicaux, D. 780 — No. 3 in F minor", "ko": "악흥의 순간 3번 F단조 D. 780", "yt": "Wq5Ks3_r6f0", "who": "David Fray, piano", "t": {"dance": 2, "humour": 1, "exotic": 1}, "s": "https://en.wikipedia.org/wiki/Six_moments_musicaux_(Schubert)"}, {"e": "romantic", "c": "schubert", "en": "String Quintet in C major, D. 956 — II. Adagio", "ko": "현악 오중주 C장조 D. 956 — 2악장 아다지오", "yt": "o_i7R-wahdQ", "who": "Mstislav Rostropovich, cello 외", "t": {"serene": 2, "contemplative": 2, "death": 1, "sacred": 1}, "s": "https://en.wikipedia.org/wiki/String_Quintet_(Schubert)"}, {"e": "romantic", "c": "schubert", "en": "Piano Trio No. 2 in E-flat major, D. 929 — II. Andante con moto", "ko": "피아노 삼중주 2번 E♭장조 D. 929 — 2악장 안단테 콘 모토", "yt": "e52IMaE-3As", "who": "Trio Wanderer", "t": {"melancholy": 2, "solitude": 1, "longing": 1, "cold": 1}, "s": "https://en.wikipedia.org/wiki/Piano_Trio_No._2_(Schubert)"}, {"e": "romantic", "c": "schubert", "en": "Piano Sonata in B-flat major, D. 960 — I. Molto moderato", "ko": "피아노 소나타 B♭장조 D. 960 — 1악장 몰토 모데라토", "yt": "Z1kRFDA7orU", "who": "Krystian Zimerman, piano", "t": {"contemplative": 2, "serene": 1, "farewell": 1, "mystery": 1}, "s": "https://en.wikipedia.org/wiki/Schubert%27s_last_sonatas"}, {"e": "romantic", "c": "schubert", "en": "Schwanengesang, D. 957 — “Ständchen” (Serenade)", "ko": "백조의 노래 D. 957 — “세레나데”", "yt": "LFHHc2Wlpug", "who": "Mischa Maisky, cello (편곡)", "t": {"love": 2, "night": 2, "longing": 1}, "s": "https://en.wikipedia.org/wiki/Schwanengesang"}, {"e": "romantic", "c": "schubert", "en": "Die Forelle, D. 550", "ko": "송어 D. 550", "yt": "JDmfCE57R7Q", "who": "Dietrich Fischer-Dieskau", "t": {"water": 2, "humour": 1, "nature": 1, "joy": 1}, "s": "https://en.wikipedia.org/wiki/Die_Forelle"}, {"e": "romantic", "c": "schubert", "en": "Symphony No. 9 “Great”, D. 944 — I. Andante – Allegro ma non troppo", "ko": "교향곡 9번 “그레이트” D. 944 — 1악장", "yt": "z9RTvJS8F64", "who": "Orozco-Estrada · hr-Sinfonieorchester", "t": {"grandeur": 2, "nature": 1, "heroic": 1, "joy": 1}, "s": "https://en.wikipedia.org/wiki/Symphony_No._9_(Schubert)"}, {"e": "romantic", "c": "schubert", "en": "String Quartet No. 14 “Death and the Maiden”, D. 810 — II. Andante con moto", "ko": "현악 사중주 14번 “죽음과 소녀” D. 810 — 2악장 안단테 콘 모토", "yt": "p-RfRavKCSQ", "who": "Amadeus Quartet", "t": {"death": 2, "order": 1, "water": 1, "dream": 1, "speed": 1, "drama": 1, "serene": 1, "contemplative": 1}, "s": "https://en.wikipedia.org/wiki/String_Quartet_No._14_(Schubert)"}, {"e": "romantic", "c": "schubert", "en": "Erlkönig, D. 328", "ko": "마왕 D. 328", "yt": "a2J9Yn2YjjE", "who": "Dietrich Fischer-Dieskau · Gerald Moore", "t": {"terror": 3, "death": 2, "speed": 1, "fantasy": 1, "youth": 1, "night": 1}, "s": "https://en.wikipedia.org/wiki/Erlk%C3%B6nig_(Schubert)"}, {"e": "romantic", "c": "schubert", "en": "Impromptu in G-flat major, D. 899 No. 3", "ko": "즉흥곡 내림G장조 D. 899 No. 3", "yt": "Ybq6Ea79nZ4", "who": "Evgeny Kissin, piano", "t": {"serene": 2, "contemplative": 1, "intimate": 1}, "s": "https://en.wikipedia.org/wiki/Impromptus_(Schubert)"}, {"e": "romantic", "c": "schubert", "en": "An die Musik, D. 547", "ko": "음악에 부쳐 D. 547", "yt": "RxsFgJF6XS4", "who": "Dietrich Fischer-Dieskau", "t": {"serene": 1, "intimate": 1}, "s": "https://en.wikipedia.org/wiki/An_die_Musik"}, {"e": "romantic", "c": "schubert", "en": "Ave Maria, D. 839", "ko": "아베 마리아 D. 839", "yt": "CM0W98t9KSU", "who": "Barbara Bonney, soprano", "t": {"sacred": 3, "serene": 1, "water": 1, "literature": 1, "fantasy": 1}, "s": "https://en.wikipedia.org/wiki/Ave_Maria_(Schubert)"}, {"e": "romantic", "c": "schubert", "en": "Symphony No. 8 “Unfinished”, D. 759 — I. Allegro moderato", "ko": "교향곡 8번 “미완성” D. 759 — 1악장 알레그로 모데라토", "yt": "I4MxMwLSlM4", "who": "Carlos Kleiber · Wiener Philharmoniker", "t": {"mystery": 2, "drama": 2, "tender": 1, "joy": 1}, "s": "https://en.wikipedia.org/wiki/Symphony_No._8_(Schubert)"}, {"e": "romantic", "c": "schubert", "en": "Piano Quintet “Trout”, D. 667 — IV. Andantino", "ko": "피아노 오중주 “송어” D. 667 — 4악장 안단티노", "yt": "pogdUk0keiw", "who": "András Schiff, piano", "t": {"water": 2, "order": 1, "humour": 1, "light": 1, "intimate": 1}, "s": "https://en.wikipedia.org/wiki/Trout_Quintet"}, {"e": "romantic", "c": "schubert", "en": "Winterreise, D. 911 — “Der Lindenbaum”", "ko": "겨울 나그네 D. 911 — “보리수”", "yt": "3LhO43EEPMg", "who": "Dietrich Fischer-Dieskau · Gerald Moore", "t": {"nostalgia": 3, "solitude": 2, "cold": 2, "nature": 1, "darkness": 1, "love": 1, "death": 1, "longing": 1}, "s": "https://en.wikipedia.org/wiki/Der_Lindenbaum"}, {"e": "romantic", "c": "liszt", "en": "Liebesträume No. 3 in A-flat major, S. 541", "ko": "사랑의 꿈 3번 내림A장조 S. 541", "yt": "YVDm_PG78ig", "who": "Evgeny Kissin, piano", "t": {"love": 3, "literature": 1, "drama": 1, "dream": 1}, "s": "https://en.wikipedia.org/wiki/Liebestr%C3%A4ume"}, {"e": "romantic", "c": "liszt", "en": "Mephisto Waltz No. 1, S. 514", "ko": "메피스토 왈츠 1번 S. 514", "yt": "P5FDtRiN6fY", "who": "Daniil Trifonov, piano", "t": {"dance": 2, "terror": 1, "sensual": 1, "love": 1, "joy": 1, "night": 1, "nature": 1, "literature": 1}, "s": "https://en.wikipedia.org/wiki/Mephisto_Waltzes"}, {"e": "romantic", "c": "liszt", "en": "Funérailles, S. 173 No. 7", "ko": "장송곡 S. 173 No. 7", "yt": "zpuNjz9JMnE", "who": "Alfred Brendel, piano", "t": {"war": 3, "grief": 2, "grandeur": 1, "heroic": 1, "melancholy": 1, "drama": 1}, "s": "https://en.wikipedia.org/wiki/Fun%C3%A9railles"}, {"e": "romantic", "c": "liszt", "en": "Hungarian Rhapsody No. 2, S. 244", "ko": "헝가리 광시곡 2번 S. 244", "yt": "Oxxf2t4E4nc", "who": "Lang Lang, piano (Horowitz’s arrangement)", "t": {"humour": 2, "darkness": 1, "melancholy": 1, "speed": 1, "joy": 1, "exotic": 1}, "s": "https://en.wikipedia.org/wiki/Hungarian_Rhapsody_No._2"}, {"e": "romantic", "c": "liszt", "en": "Un sospiro (Three Concert Études, S. 144 No. 3)", "ko": "한숨 (세 개의 연주회용 에튀드 S. 144 No. 3)", "yt": "Qe5kTui3nqc", "who": "Lang Lang, piano", "t": {"longing": 1, "speed": 1, "tender": 1, "drama": 1, "water": 1}, "s": "https://en.wikipedia.org/wiki/Un_sospiro"}, {"e": "romantic", "c": "liszt", "en": "Totentanz, S. 126", "ko": "죽음의 무도 S. 126", "yt": "oWGkem9qoe8", "who": "Martha Argerich, piano", "t": {"terror": 3, "death": 1, "dance": 1, "humour": 1, "drama": 1}, "s": "https://en.wikipedia.org/wiki/Totentanz_(Liszt)"}, {"e": "romantic", "c": "liszt", "en": "La campanella (Grandes études de Paganini, S. 141 No. 3)", "ko": "라 캄파넬라 (파가니니 대연습곡 S. 141 No. 3)", "yt": "0FbQZCsYXVg", "who": "Evgeny Kissin, piano", "t": {"light": 1, "opulence": 1, "terror": 1}, "s": "https://en.wikipedia.org/wiki/La_campanella"}, {"e": "romantic", "c": "liszt", "en": "Consolation No. 3 in D-flat major, S. 172", "ko": "위안 3번 내림D장조 S. 172", "yt": "MfDmUk7ie6s", "who": "Vladimir Horowitz, piano", "t": {"serene": 2, "night": 1, "contemplative": 1, "tender": 1}, "s": "https://en.wikipedia.org/wiki/Consolations_(Liszt)"}, {"e": "romantic", "c": "liszt", "en": "Années de pèlerinage — “Au bord d’une source”", "ko": "순례의 해 — “샘가에서”", "yt": "QkbaMxFw4Bs", "who": "Lazar Berman, piano", "t": {"nature": 3, "water": 2, "youth": 2, "tender": 1}, "s": "https://en.wikipedia.org/wiki/Ann%C3%A9es_de_p%C3%A8lerinage"}, {"e": "romantic", "c": "liszt", "en": "Consolation No. 1 in E major, S. 172", "ko": "위안 1번 E장조 S. 172", "yt": "8rDTYTGMMaw", "who": "Daniel Barenboim, piano", "t": {"serene": 2, "sacred": 1, "tender": 1}, "s": "https://en.wikipedia.org/wiki/Consolations_(Liszt)"}, {"e": "romantic", "c": "tchaikovsky", "en": "Romeo and Juliet, Fantasy-Overture", "ko": "로미오와 줄리엣 환상 서곡", "yt": "pdke6TVb2Ns", "who": "Karajan · Wiener Philharmoniker", "t": {"love": 3, "war": 2, "longing": 1, "terror": 1, "literature": 1}, "s": "https://en.wikipedia.org/wiki/Romeo_and_Juliet_(Tchaikovsky)"}, {"e": "romantic", "c": "tchaikovsky", "en": "Symphony No. 6 “Pathétique”, Op. 74 — IV. Adagio lamentoso", "ko": "교향곡 6번 “비창” Op. 74 — 4악장 아다지오 라멘토소", "yt": "OXf-t0RtDEE", "who": "Karajan · Berliner Philharmoniker", "t": {"death": 3, "farewell": 2, "grief": 2, "melancholy": 1, "storm": 1, "drama": 1}, "s": "https://en.wikipedia.org/wiki/Symphony_No._6_(Tchaikovsky)"}, {"e": "romantic", "c": "tchaikovsky", "en": "Francesca da Rimini, Op. 32", "ko": "프란체스카 다 리미니 Op. 32", "yt": "IROC2WIKNdU", "who": "Bernstein · New York Philharmonic", "t": {"terror": 3, "storm": 3, "love": 1, "literature": 1}, "s": "https://en.wikipedia.org/wiki/Francesca_da_Rimini_(Tchaikovsky)"}, {"e": "romantic", "c": "tchaikovsky", "en": "Swan Lake — Scene (Act II)", "ko": "백조의 호수 — 정경 (2막)", "yt": "LiGjvEq0QHA", "who": "André Previn · London Symphony Orchestra", "t": {"fantasy": 3, "night": 2, "water": 1, "melancholy": 1, "grief": 1, "tender": 1}, "s": "https://en.wikipedia.org/wiki/Swan_Lake"}, {"e": "romantic", "c": "tchaikovsky", "en": "Piano Concerto No. 1 in B-flat minor, Op. 23 — I. Allegro non troppo e molto maestoso", "ko": "피아노 협주곡 1번 내림나단조 Op. 23 — 1악장", "yt": "esK8GgfbRDQ", "who": "Martha Argerich · Abbado · Berliner Philharmoniker", "t": {"grandeur": 3, "storm": 1, "grief": 1, "love": 1}, "s": "https://en.wikipedia.org/wiki/Piano_Concerto_No._1_(Tchaikovsky)"}, {"e": "romantic", "c": "tchaikovsky", "en": "Symphony No. 5, Op. 64 — II. Andante cantabile", "ko": "교향곡 5번 Op. 64 — 2악장 안단테 칸타빌레", "yt": "RqIquIcFWHY", "who": "Valery Gergiev", "t": {"tender": 2, "melancholy": 1, "light": 1, "serene": 1, "love": 1, "longing": 1}, "s": "https://en.wikipedia.org/wiki/Symphony_No._5_(Tchaikovsky)"}, {"e": "romantic", "c": "tchaikovsky", "en": "1812 Overture, Op. 49", "ko": "1812년 서곡 Op. 49", "yt": "luLnN2vvUYY", "who": "Erich Kunzel · Cincinnati Pops (with cannons)", "t": {"war": 3, "heroic": 2, "cold": 1}, "s": "https://en.wikipedia.org/wiki/1812_Overture"}, {"e": "romantic", "c": "tchaikovsky", "en": "Violin Concerto in D major, Op. 35 — I. Allegro moderato", "ko": "바이올린 협주곡 D장조 Op. 35 — 1악장", "yt": "2Q_DzWUvcL8", "who": "Hilary Hahn · Orozco-Estrada · hr-Sinfonieorchester", "t": {"opulence": 2, "heroic": 1, "love": 1, "joy": 1}, "s": "https://en.wikipedia.org/wiki/Violin_Concerto_(Tchaikovsky)"}, {"e": "romantic", "c": "tchaikovsky", "en": "Serenade for Strings in C major, Op. 48 — II. Valse", "ko": "현을 위한 세레나데 C장조 Op. 48 — 2악장 왈츠", "yt": "0qQcLcjEXss", "who": "Berliner Philharmoniker", "t": {"dance": 2, "elegance": 2, "nostalgia": 1}, "s": "https://en.wikipedia.org/wiki/Serenade_for_Strings_(Tchaikovsky)"}, {"e": "romantic", "c": "tchaikovsky", "en": "The Seasons, Op. 37a — June: Barcarolle", "ko": "사계 Op. 37a — 6월 “뱃노래”", "yt": "pDisuAu2UvM", "who": "Bruce Liu, piano", "t": {"melancholy": 2, "water": 1, "nostalgia": 1, "longing": 1}, "s": "https://en.wikipedia.org/wiki/The_Seasons_(Tchaikovsky)"}, {"e": "romantic", "c": "tchaikovsky", "en": "String Quartet No. 1 in D major, Op. 11 — II. Andante cantabile", "ko": "현악 사중주 1번 D장조 Op. 11 — 2악장 안단테 칸타빌레", "yt": "lDQuWlz37iw", "who": "Kontras Quartet", "t": {"tender": 2, "nostalgia": 2, "intimate": 1}, "s": "https://en.wikipedia.org/wiki/String_Quartet_No._1_(Tchaikovsky)"}, {"e": "romantic", "c": "tchaikovsky", "en": "The Sleeping Beauty — Waltz (Act I)", "ko": "잠자는 숲속의 미녀 — 왈츠 (1막)", "yt": "2Sb8WCPjPDs", "who": "확인 필요", "t": {"dance": 2, "fantasy": 2, "joy": 1, "opulence": 1}, "s": "https://en.wikipedia.org/wiki/The_Sleeping_Beauty_(ballet)"}, {"e": "romantic", "c": "tchaikovsky", "en": "Symphony No. 4 in F minor, Op. 36 — I. Andante sostenuto – Moderato con anima", "ko": "교향곡 4번 F단조 Op. 36 — 1악장", "yt": "Y7G5ithbFys", "who": "Carlos Miguel Prieto · hr-Sinfonieorchester", "t": {"drama": 2, "storm": 2, "terror": 1, "dance": 1}, "s": "https://en.wikipedia.org/wiki/Symphony_No._4_(Tchaikovsky)"}, {"e": "romantic", "c": "tchaikovsky", "en": "The Nutcracker — Waltz of the Flowers", "ko": "호두까기 인형 — 꽃의 왈츠", "yt": "KBWa-XGIsxs", "who": "Daniel Barenboim · Berliner Philharmoniker", "t": {"dance": 2, "grief": 1, "tender": 1, "fantasy": 1, "nature": 1, "joy": 1, "sacred": 1, "grandeur": 1}, "s": "https://en.wikipedia.org/wiki/The_Nutcracker"}, {"e": "romantic", "c": "tchaikovsky", "en": "Eugene Onegin — Lensky’s Aria “Kuda, kuda”", "ko": "예브게니 오네긴 — 렌스키의 아리아 “어디로 가버렸나”", "yt": "XYgT89paO1Q", "who": "The Royal Opera", "t": {"farewell": 2, "melancholy": 2, "death": 1, "literature": 1}, "s": "https://en.wikipedia.org/wiki/Eugene_Onegin_(opera)"}, {"e": "romantic", "c": "tchaikovsky", "en": "The Seasons, Op. 37a — October: Autumn Song", "ko": "사계 Op. 37a — 10월 “가을의 노래”", "yt": "FnQgBOvgg6I", "who": "Bruce Liu, piano", "t": {"melancholy": 2, "nostalgia": 2, "nature": 1, "solitude": 1}, "s": "https://en.wikipedia.org/wiki/The_Seasons_(Tchaikovsky)"}, {"e": "romantic", "c": "tchaikovsky", "en": "Serenade for Strings in C major, Op. 48 — I. Pezzo in forma di sonatina", "ko": "현악 세레나데 C장조 Op. 48 — 1악장 소나티네 형식의 소품", "yt": "2lSwwXNmdkY", "who": "Karajan · Berliner Philharmoniker", "t": {"grandeur": 2, "elegance": 1, "longing": 1, "tender": 1}, "s": "https://en.wikipedia.org/wiki/Serenade_for_Strings_(Tchaikovsky)"}, {"e": "romantic", "c": "tchaikovsky", "en": "6 Romances, Op. 6 — No. 6 “None but the Lonely Heart”", "ko": "6개의 로망스 Op. 6 — 6번 “그리움을 아는 이만이”", "yt": "p_ctDXcO7c8", "who": "Dmitri Hvorostovsky, baritone", "t": {"longing": 3, "solitude": 2, "melancholy": 1}, "s": "https://en.wikipedia.org/wiki/None_but_the_Lonely_Heart_(Tchaikovsky)"}, {"e": "romantic", "c": "tchaikovsky", "en": "Symphony No. 5 in E minor, Op. 64 — IV. Finale: Andante maestoso – Allegro vivace", "ko": "교향곡 5번 Op. 64 — 4악장", "yt": "ksjcewGry04", "who": "Kirill Petrenko · Berliner Philharmoniker", "t": {"heroic": 3, "grandeur": 2, "joy": 1, "speed": 1}, "s": "https://en.wikipedia.org/wiki/Symphony_No._5_(Tchaikovsky)"}, {"e": "romantic", "c": "wagner", "en": "Tristan und Isolde — Liebestod", "ko": "트리스탄과 이졸데 — 사랑의 죽음", "yt": "gQ5k5qcbFkc", "who": "Birgit Nilsson · Knappertsbusch", "t": {"death": 2, "longing": 2, "love": 1, "drama": 1}, "s": "https://en.wikipedia.org/wiki/Liebestod"}, {"e": "romantic", "c": "wagner", "en": "Die Walküre — “Ride of the Valkyries”", "ko": "발퀴레 — “발퀴레의 기행”", "yt": "19uL3qzbwjo", "who": "James Levine · Berliner Philharmoniker", "t": {"war": 3, "myth": 3, "heroic": 1, "speed": 1, "grandeur": 1}, "s": "https://en.wikipedia.org/wiki/Ride_of_the_Valkyries"}, {"e": "romantic", "c": "wagner", "en": "Götterdämmerung — Siegfried’s Funeral March", "ko": "신들의 황혼 — 지크프리트의 장송 행진곡", "yt": "1aXwTS9gKNM", "who": "Dudamel · Berliner Philharmoniker", "t": {"myth": 2, "death": 1, "heroic": 1, "grief": 1, "love": 1, "nostalgia": 1, "grandeur": 1}, "s": "https://en.wikipedia.org/wiki/G%C3%B6tterd%C3%A4mmerung"}, {"e": "romantic", "c": "wagner", "en": "Götterdämmerung — Siegfried’s Rhine Journey", "ko": "신들의 황혼 — 지크프리트의 라인 여행", "yt": "mmMx0zSJxMU", "who": "Simon Rattle · Berliner Philharmoniker", "t": {"heroic": 2, "water": 2, "terror": 1, "myth": 1}, "s": "https://en.wikipedia.org/wiki/G%C3%B6tterd%C3%A4mmerung"}, {"e": "romantic", "c": "wagner", "en": "Tristan und Isolde — Prelude", "ko": "트리스탄과 이졸데 — 전주곡", "yt": "UBgLTQLTIhg", "who": "Karajan · Berliner Philharmoniker", "t": {"love": 2, "sensual": 2, "drama": 1, "speed": 1, "longing": 1}, "s": "https://en.wikipedia.org/wiki/Tristan_und_Isolde"}, {"e": "romantic", "c": "wagner", "en": "Siegfried Idyll", "ko": "지크프리트 목가", "yt": "HqW_Jl3nTeg", "who": "Herbert von Karajan", "t": {"intimate": 3, "love": 1, "nature": 1, "tender": 1}, "s": "https://en.wikipedia.org/wiki/Siegfried_Idyll"}, {"e": "romantic", "c": "wagner", "en": "Lohengrin — Prelude to Act I", "ko": "로엔그린 — 1막 전주곡", "yt": "jn5sqg2tFo0", "who": "Christian Thielemann · Berliner Philharmoniker", "t": {"light": 3, "sacred": 1, "opulence": 1, "dream": 1, "grandeur": 1, "tender": 1, "serene": 1}, "s": "https://daytonperformingarts.org/program-note-wagners-act-i-prelude-from-lohengrin/"}, {"e": "romantic", "c": "wagner", "en": "Tannhäuser — Overture", "ko": "탄호이저 — 서곡", "yt": "aqz3jI0FJyE", "who": "Karajan · Berliner Philharmoniker", "t": {"sacred": 3, "love": 2, "sensual": 1, "myth": 1}, "s": "https://en.wikipedia.org/wiki/Tannh%C3%A4user_(opera)"}, {"e": "romantic", "c": "brahms", "en": "Symphony No. 4, Op. 98 — IV. Allegro energico e passionato", "ko": "교향곡 4번 Op. 98 — 4악장 알레그로 에네르지코 에 파시오나토", "yt": "y36x66pd1os", "who": "Sergiu Celibidache", "t": {"order": 3, "speed": 2, "grandeur": 1}, "s": "https://en.wikipedia.org/wiki/Symphony_No._4_(Brahms)"}, {"e": "romantic", "c": "brahms", "en": "Hungarian Dance No. 5 in G minor", "ko": "헝가리 무곡 5번 G단조", "yt": "6Z0gYhRkRfM", "who": "Abbado · Berliner Philharmoniker", "t": {"dance": 2, "exotic": 1}, "s": "https://en.wikipedia.org/wiki/Hungarian_Dances_(Brahms)"}, {"e": "romantic", "c": "brahms", "en": "Wiegenlied (Lullaby), Op. 49 No. 4", "ko": "자장가 Op. 49 No. 4", "yt": "i6o22mJOcYw", "who": "Dietrich Fischer-Dieskau", "t": {"tender": 3, "restraint": 2, "literature": 1, "dream": 1, "love": 1, "mystery": 1}, "s": "https://en.wikipedia.org/wiki/Wiegenlied_(Brahms)"}, {"e": "romantic", "c": "brahms", "en": "Intermezzo in A major, Op. 118 No. 2", "ko": "간주곡 A장조 Op. 118 No. 2", "yt": "039Ki7ZccnU", "who": "Radu Lupu, piano", "t": {"tender": 2, "melancholy": 1, "intimate": 1, "order": 1, "mystery": 1}, "s": "https://www.hyperion-records.co.uk/dw.asp?dc=W14488_68116"}, {"e": "romantic", "c": "brahms", "en": "Intermezzo in E-flat minor, Op. 118 No. 6", "ko": "간주곡 내림마단조 Op. 118 No. 6", "yt": "WMjxw08BFh0", "who": "Glenn Gould, piano", "t": {"melancholy": 2, "darkness": 2, "drama": 1, "solitude": 1}, "s": "https://www.hyperion-records.co.uk/dw.asp?dc=W14488_68116"}, {"e": "romantic", "c": "brahms", "en": "Symphony No. 3, Op. 90 — III. Poco allegretto", "ko": "교향곡 3번 Op. 90 — 3악장 포코 알레그레토", "yt": "fdBM--ZYxGk", "who": "Karajan · Berliner Philharmoniker", "t": {"drama": 1, "dance": 1, "melancholy": 1, "tender": 1}, "s": "https://en.wikipedia.org/wiki/Symphony_No._3_(Brahms)"}, {"e": "romantic", "c": "brahms", "en": "A German Requiem, Op. 45 — “Wie lieblich sind deine Wohnungen”", "ko": "독일 레퀴엠 Op. 45 — “주의 장막이 어찌 그리 사랑스러운지요”", "yt": "G2iKPYd0cD0", "who": "John Eliot Gardiner", "t": {"sacred": 3, "serene": 2, "love": 1}, "s": "https://en.wikipedia.org/wiki/A_German_Requiem_(Brahms)"}, {"e": "romantic", "c": "brahms", "en": "Symphony No. 1 in C minor, Op. 68 — IV. Adagio – Allegro non troppo", "ko": "교향곡 1번 C단조 Op. 68 — 4악장", "yt": "lfocxOguhcs", "who": "Berliner Philharmoniker", "t": {"heroic": 2, "grandeur": 2, "light": 1, "drama": 1}, "s": "https://en.wikipedia.org/wiki/Symphony_No._1_(Brahms)"}, {"e": "romantic", "c": "brahms", "en": "Violin Concerto in D major, Op. 77 — II. Adagio", "ko": "바이올린 협주곡 D장조 Op. 77 — 2악장 아다지오", "yt": "NybHEWVhZs4", "who": "Hilary Hahn, violin", "t": {"serene": 2, "tender": 2, "nature": 1}, "s": "https://en.wikipedia.org/wiki/Violin_Concerto_(Brahms)"}, {"e": "romantic", "c": "brahms", "en": "Piano Concerto No. 2 in B-flat major, Op. 83 — III. Andante", "ko": "피아노 협주곡 2번 B♭장조 Op. 83 — 3악장 안단테", "yt": "yTd4FioK_RM", "who": "Krystian Zimerman, piano", "t": {"tender": 2, "longing": 2, "intimate": 1, "serene": 1}, "s": "https://en.wikipedia.org/wiki/Piano_Concerto_No._2_(Brahms)"}, {"e": "romantic", "c": "brahms", "en": "Clarinet Quintet in B minor, Op. 115 — II. Adagio", "ko": "클라리넷 오중주 B단조 Op. 115 — 2악장 아다지오", "yt": "EKCHJlWmZcg", "who": "David Shifrin, clarinet", "t": {"nostalgia": 2, "melancholy": 2, "longing": 1, "intimate": 1}, "s": "https://en.wikipedia.org/wiki/Clarinet_Quintet_(Brahms)"}, {"e": "romantic", "c": "brahms", "en": "String Sextet No. 1 in B-flat major, Op. 18 — II. Andante ma moderato", "ko": "현악 육중주 1번 B♭장조 Op. 18 — 2악장 안단테 마 모데라토", "yt": "AW7Z8ct5qMM", "who": "Berliner Philharmoniker 단원", "t": {"grief": 2, "drama": 1, "longing": 1, "darkness": 1}, "s": "https://en.wikipedia.org/wiki/String_Sextet_No._1_(Brahms)"}, {"e": "romantic", "c": "brahms", "en": "Cello Sonata No. 1 in E minor, Op. 38 — I. Allegro non troppo", "ko": "첼로 소나타 1번 E단조 Op. 38 — 1악장", "yt": "fswUjjn6LvQ", "who": "Mstislav Rostropovich, cello", "t": {"melancholy": 2, "darkness": 1, "contemplative": 1, "solitude": 1}, "s": "https://en.wikipedia.org/wiki/Cello_Sonata_No._1_(Brahms)"}, {"e": "romantic", "c": "brahms", "en": "Waltz in A-flat major, Op. 39 No. 15", "ko": "왈츠 A♭장조 Op. 39 No. 15", "yt": "6Oy0w7eLgRk", "who": "György Cziffra, piano", "t": {"tender": 2, "dance": 1, "intimate": 1, "nostalgia": 1}, "s": "https://en.wikipedia.org/wiki/Sixteen_Waltzes,_Op._39_(Brahms)"}, {"e": "romantic", "c": "brahms", "en": "Symphony No. 2 in D major, Op. 73 — I. Allegro non troppo", "ko": "교향곡 2번 D장조 Op. 73 — 1악장", "yt": "ZTCDO6-DnWU", "who": "Berliner Philharmoniker", "t": {"nature": 2, "serene": 1, "light": 1, "joy": 1}, "s": "https://en.wikipedia.org/wiki/Symphony_No._2_(Brahms)"}, {"e": "romantic", "c": "brahms", "en": "Academic Festival Overture, Op. 80", "ko": "대학 축전 서곡 Op. 80", "yt": "AgJhsa-wLNU", "who": "Royal Concertgebouw Orchestra", "t": {"joy": 2, "humour": 2, "youth": 1, "grandeur": 1}, "s": "https://en.wikipedia.org/wiki/Academic_Festival_Overture"}, {"e": "romantic", "c": "brahms", "en": "Rhapsody in G minor, Op. 79 No. 2", "ko": "랩소디 G단조 Op. 79 No. 2", "yt": "Ie4VDv8_7AQ", "who": "Radu Lupu, piano", "t": {"storm": 2, "drama": 2, "heroic": 1, "darkness": 1}, "s": "https://en.wikipedia.org/wiki/Rhapsodies,_Op._79_(Brahms)"}, {"e": "romantic", "c": "brahms", "en": "Symphony No. 1 in C minor, Op. 68 — II. Andante sostenuto", "ko": "교향곡 1번 C단조 Op. 68 — 2악장 안단테 소스테누토", "yt": "Dlp1W4jNGzc", "who": "Claudio Abbado · Berliner Philharmoniker", "t": {"tender": 2, "longing": 1, "serene": 1, "contemplative": 1}, "s": "https://en.wikipedia.org/wiki/Symphony_No._1_(Brahms)"}, {"e": "romantic", "c": "mendelssohn", "en": "A Midsummer Night’s Dream — Scherzo, Op. 61", "ko": "한여름 밤의 꿈 — 스케르초 Op. 61", "yt": "hHTV3GFyHfM", "who": "Gergiev · Mariinsky Orchestra", "t": {"fantasy": 2, "storm": 1, "dance": 1, "joy": 1, "humour": 1, "speed": 1, "nature": 1, "literature": 1}, "s": "https://en.wikipedia.org/wiki/A_Midsummer_Night%27s_Dream_(Mendelssohn)"}, {"e": "romantic", "c": "mendelssohn", "en": "A Midsummer Night’s Dream — Nocturne", "ko": "한여름 밤의 꿈 — 녹턴", "yt": "8cplvzZlSm4", "who": "Dennis Brain, horn", "t": {"serene": 2, "love": 1, "dream": 1, "night": 1, "nature": 1, "literature": 1}, "s": "https://en.wikipedia.org/wiki/A_Midsummer_Night%27s_Dream_(Mendelssohn)"}, {"e": "romantic", "c": "mendelssohn", "en": "Violin Concerto in E minor, Op. 64 — III. Allegro molto vivace", "ko": "바이올린 협주곡 E단조 Op. 64 — 3악장 알레그로 몰토 비바체", "yt": "2xElqIYzzR8", "who": "Hilary Hahn, violin", "t": {"joy": 3, "grandeur": 1, "speed": 1}, "s": "https://en.wikipedia.org/wiki/Violin_Concerto_(Mendelssohn)"}, {"e": "romantic", "c": "mendelssohn", "en": "The Hebrides (Fingal’s Cave) Overture, Op. 26", "ko": "헤브리디스 서곡 (핑갈의 동굴) Op. 26", "yt": "zcogD-hHEYs", "who": "Claudio Abbado", "t": {"water": 3, "solitude": 2, "darkness": 1, "literature": 1, "nature": 1}, "s": "https://en.wikipedia.org/wiki/The_Hebrides_(overture)"}, {"e": "romantic", "c": "mendelssohn", "en": "Symphony No. 4 “Italian”, Op. 90 — I. Allegro vivace", "ko": "교향곡 4번 “이탈리아” Op. 90 — 1악장 알레그로 비바체", "yt": "Z7G4_6dpt30", "who": "Claudio Abbado · London Symphony Orchestra", "t": {"joy": 2, "light": 2, "speed": 1, "exotic": 1}, "s": "https://en.wikipedia.org/wiki/Symphony_No._4_(Mendelssohn)"}, {"e": "romantic", "c": "schumann", "en": "Widmung (Myrthen, Op. 25 No. 1)", "ko": "헌정 (미르텐 Op. 25 No. 1)", "yt": "rCP27rIVJBw", "who": "Martha Argerich, piano (Liszt’s transcription)", "t": {"love": 3, "sacred": 1}, "s": "https://en.wikipedia.org/wiki/Myrthen"}, {"e": "romantic", "c": "schumann", "en": "Kinderszenen, Op. 15 — No. 7 “Träumerei”", "ko": "어린이의 정경 Op. 15 — 7번 “트로이메라이”", "yt": "3fhKaAX5dOc", "who": "Vladimir Horowitz, piano", "t": {"nostalgia": 3, "dream": 2, "contemplative": 1, "youth": 1, "tender": 1, "melancholy": 1, "grief": 1, "intimate": 1}, "s": "https://en.wikipedia.org/wiki/Kinderszenen"}, {"e": "romantic", "c": "schumann", "en": "Piano Concerto in A minor, Op. 54 — I. Allegro affettuoso", "ko": "피아노 협주곡 A단조 Op. 54 — 1악장 알레그로 아페투오소", "yt": "fEQJYMqDfu4", "who": "Martha Argerich, piano", "t": {"war": 1, "storm": 1, "dream": 1, "joy": 1, "love": 1, "longing": 1}, "s": "https://en.wikipedia.org/wiki/Piano_Concerto_(Schumann)"}, {"e": "romantic", "c": "schumann", "en": "Dichterliebe, Op. 48 — “Im wunderschönen Monat Mai”", "ko": "시인의 사랑 Op. 48 — “아름다운 5월에”", "yt": "3PWxLHpSls8", "who": "Dietrich Fischer-Dieskau, baritone", "t": {"nature": 2, "love": 1, "longing": 1, "tender": 1}, "s": "https://en.wikipedia.org/wiki/Dichterliebe"}, {"e": "romantic", "c": "schumann", "en": "Symphony No. 3 “Rhenish”, Op. 97 — IV. Feierlich", "ko": "교향곡 3번 “라인” Op. 97 — 4악장 장엄하게", "yt": "VDPz3Ee2PAQ", "who": "London Symphony Orchestra", "t": {"sacred": 2, "serene": 2, "water": 2, "grandeur": 1, "terror": 1}, "s": "https://en.wikipedia.org/wiki/Symphony_No._3_(Schumann)"}, {"e": "romantic", "c": "rossini", "en": "William Tell — Overture", "ko": "윌리엄 텔 — 서곡", "yt": "tJoDL1cSRjM", "who": "Claudio Abbado · Berliner Philharmoniker", "t": {"storm": 2, "war": 2, "serene": 1, "nature": 1, "speed": 1, "heroic": 1}, "s": "https://en.wikipedia.org/wiki/William_Tell_Overture"}, {"e": "romantic", "c": "rossini", "en": "The Barber of Seville — Overture", "ko": "세비야의 이발사 — 서곡", "yt": "L0HYxNb0-eI", "who": "Berliner Philharmoniker (Waldbühne 1996)", "t": {"humour": 2}, "s": "https://en.wikipedia.org/wiki/The_Barber_of_Seville"}, {"e": "romantic", "c": "verdi", "en": "La traviata — Prelude to Act I", "ko": "라 트라비아타 — 1막 전주곡", "yt": "V2eNaxrKABY", "who": "Carlos Kleiber · Bayerisches Staatsorchester", "t": {"tender": 2, "love": 1, "intimate": 1, "death": 1, "heroic": 1}, "s": "https://en.wikipedia.org/wiki/La_traviata"}, {"e": "romantic", "c": "verdi", "en": "La forza del destino — Overture", "ko": "운명의 힘 — 서곡", "yt": "bmCXWtqDqIA", "who": "Riccardo Muti · Berliner Philharmoniker", "t": {"terror": 1, "death": 1}, "s": "https://en.wikipedia.org/wiki/La_forza_del_destino"}, {"e": "romantic", "c": "puccini", "en": "Manon Lescaut — Intermezzo (Act III)", "ko": "마농 레스코 — 3막 간주곡", "yt": "nFC-z_vOX2U", "who": "Riccardo Muti · Chicago Symphony Orchestra", "t": {"storm": 2, "darkness": 1, "melancholy": 1, "love": 1, "nostalgia": 1, "grief": 1}, "s": "https://serenademagazine.com/puccinis-manon-lescaut-three-powerful-excerpts/"}, {"e": "romantic", "c": "bizet", "en": "Carmen — Prelude (Act I)", "ko": "카르멘 — 전주곡", "yt": "mmazdJN4XRQ", "who": "Berliner Philharmoniker", "t": {"terror": 2, "joy": 1, "drama": 1, "exotic": 1}, "s": "https://en.wikipedia.org/wiki/Carmen"}, {"e": "romantic", "c": "leoncavallo", "en": "Pagliacci — Intermezzo", "ko": "팔리아치 — 간주곡", "yt": "LUVHX80aAos", "who": "Riccardo Muti", "t": {"serene": 1, "humour": 1, "mystery": 1}, "s": "https://usuo.org/explore/2018/03/the-musical-story-of-pagliacci/"}, {"e": "romantic", "c": "massenet", "en": "Thaïs — Méditation", "ko": "타이스 — 명상곡", "yt": "3PzL95uODqA", "who": "Anne-Sophie Mutter, violin", "t": {"contemplative": 2, "love": 2, "sensual": 2, "dream": 2, "sacred": 1}, "s": "https://en.wikipedia.org/wiki/M%C3%A9ditation_(Tha%C3%AFs)"}, {"e": "romantic", "c": "mascagni", "en": "Cavalleria rusticana — Intermezzo", "ko": "카발레리아 루스티카나 — 간주곡", "yt": "eeq38cj_808", "who": "Karajan · Berliner Philharmoniker", "t": {"sacred": 2, "serene": 1}, "s": "https://en.wikipedia.org/wiki/Cavalleria_rusticana"}, {"e": "romantic", "c": "dvorak", "en": "Cello Concerto in B minor, Op. 104 — III. Finale: Allegro moderato", "ko": "첼로 협주곡 B단조 Op. 104 — 3악장 피날레: 알레그로 모데라토", "yt": "SYeu5hQNNwc", "who": "Rostropovich · Karajan · Berliner Philharmoniker", "t": {"nostalgia": 2, "heroic": 1, "longing": 1, "farewell": 1}, "s": "https://en.wikipedia.org/wiki/Cello_Concerto_(Dvo%C5%99%C3%A1k)"}, {"e": "romantic", "c": "rachmaninoff", "en": "Vocalise, Op. 34 No. 14", "ko": "보칼리즈 Op. 34 No. 14", "yt": "hiT_v5DOsUw", "who": "Gautier Capuçon · Nikolai Lugansky (cello & piano)", "t": {"longing": 3, "melancholy": 2, "dream": 1}, "s": "https://en.wikipedia.org/wiki/Vocalise_(Rachmaninoff)"}, {"e": "romantic", "c": "rachmaninoff", "en": "Romance for Cello and Piano in F minor (1890)", "ko": "첼로와 피아노를 위한 로망스 F단조 (1890)", "yt": "quLbOMIIwAg", "who": "Pavel Gomziakov · Andrei Korobeinikov", "t": {"longing": 2, "melancholy": 1, "love": 1}, "s": "https://en.wikipedia.org/wiki/List_of_compositions_by_Sergei_Rachmaninoff"}, {"e": "romantic", "c": "rachmaninoff", "en": "Prelude in G minor, Op. 23 No. 5", "ko": "전주곡 G단조 Op. 23 No. 5", "yt": "GhBXx-2PadM", "who": "Yuja Wang, piano", "t": {"heroic": 2, "war": 1, "longing": 1, "drama": 1}, "s": "https://en.wikipedia.org/wiki/Prelude_in_G_minor_(Rachmaninoff)"}, {"e": "romantic", "c": "rachmaninoff", "en": "Rhapsody on a Theme of Paganini, Op. 43 — Variation 18", "ko": "파가니니 주제에 의한 랩소디 Op. 43 — 18변주", "yt": "ThTU04p3drM", "who": "Daniil Trifonov · Nézet-Séguin · Philadelphia Orchestra", "t": {"love": 3, "longing": 1, "grandeur": 1}, "s": "https://en.wikipedia.org/wiki/Rhapsody_on_a_Theme_of_Paganini"}, {"e": "romantic", "c": "rachmaninoff", "en": "Prelude in C-sharp minor, Op. 3 No. 2", "ko": "전주곡 올림다단조 Op. 3 No. 2", "yt": "qnEfzOHdOXM", "who": "Nikolai Lugansky, piano", "t": {"grandeur": 2, "drama": 2, "darkness": 1}, "s": "https://en.wikipedia.org/wiki/Prelude_in_C-sharp_minor_(Rachmaninoff)"}, {"e": "romantic", "c": "rachmaninoff", "en": "Piano Concerto No. 2 in C minor, Op. 18 — I. Moderato", "ko": "피아노 협주곡 제2번 다단조 Op. 18 — 1악장 Moderato", "yt": "caR7C2SHdFI", "who": "Krystian Zimerman · Seiji Ozawa · Boston Symphony Orchestra", "t": {"heroic": 2, "longing": 2, "storm": 1, "grandeur": 1}, "s": "https://en.wikipedia.org/wiki/Piano_Concerto_No._2_(Rachmaninoff)"}, {"e": "romantic", "c": "rachmaninoff", "en": "Piano Concerto No. 2 in C minor, Op. 18 — II. Adagio sostenuto", "ko": "피아노 협주곡 제2번 다단조 Op. 18 — 2악장 Adagio sostenuto", "yt": "HfPE3cgYyco", "who": "Krystian Zimerman · Seiji Ozawa · Boston Symphony Orchestra", "t": {"love": 2, "tender": 2, "dream": 1, "serene": 1}, "s": "https://en.wikipedia.org/wiki/Piano_Concerto_No._2_(Rachmaninoff)"}, {"e": "romantic", "c": "rachmaninoff", "en": "Piano Concerto No. 2 in C minor, Op. 18 — III. Allegro scherzando", "ko": "피아노 협주곡 제2번 다단조 Op. 18 — 3악장 Allegro scherzando", "yt": "Rq_MTH06-zY", "who": "Krystian Zimerman · Seiji Ozawa · Boston Symphony Orchestra", "t": {"heroic": 2, "joy": 1, "love": 1, "speed": 1, "grandeur": 1}, "s": "https://en.wikipedia.org/wiki/Piano_Concerto_No._2_(Rachmaninoff)"}, {"e": "romantic", "c": "rachmaninoff", "en": "Cello Sonata in G minor, Op. 19 — III. Andante", "ko": "첼로 소나타 사단조 Op. 19 — 3악장 Andante", "yt": "SvoKzdw6wIo", "who": "Jan Vogler · Hélène Grimaud", "t": {"longing": 2, "tender": 2, "love": 1}, "s": "https://en.wikipedia.org/wiki/Cello_Sonata_(Rachmaninoff)"}, {"e": "romantic", "c": "rachmaninoff", "en": "Piano Concerto No. 3 in D minor, Op. 30 — III. Finale: Alla breve", "ko": "피아노 협주곡 제3번 라단조 Op. 30 — 3악장 Alla breve", "yt": "VwKcP92QJYg", "who": "Anna Vinnitskaya, piano", "t": {"heroic": 3, "speed": 2, "grandeur": 1, "drama": 1}, "s": "https://en.wikipedia.org/wiki/Piano_Concerto_No._3_(Rachmaninoff)"}, {"e": "romantic", "c": "rachmaninoff", "en": "Symphony No. 2 in E minor, Op. 27 — III. Adagio", "ko": "교향곡 제2번 마단조 Op. 27 — 3악장 Adagio", "yt": "QNRxHyZDU-Q", "who": "London Symphony Orchestra", "t": {"longing": 3, "tender": 2, "dream": 2, "serene": 1}, "s": "https://en.wikipedia.org/wiki/Symphony_No._2_(Rachmaninoff)"}, {"e": "romantic", "c": "rachmaninoff", "en": "Symphonic Dances, Op. 45 — II. Andante con moto (Tempo di valse)", "ko": "교향적 무곡 Op. 45 — 2악장 안단테 콘 모토 (왈츠 템포)", "yt": "DD5YinzZ21M", "who": "CYSO's Symphony Orchestra · Tinkham", "t": {"dance": 3, "longing": 1, "melancholy": 1, "dream": 1}, "s": "https://en.wikipedia.org/wiki/Symphonic_Dances"}, {"e": "romantic", "c": "rachmaninoff", "en": "Cello Sonata in G minor, Op. 19 — I. Lento. Allegro moderato", "ko": "첼로 소나타 사단조 Op. 19 — 1악장 Lento–Allegro moderato", "yt": "IV0uVpE5W6w", "who": "Brannon Cho, cello · Eric Lu, piano", "t": {"longing": 2, "melancholy": 2, "drama": 1}, "s": "https://en.wikipedia.org/wiki/Cello_Sonata_(Rachmaninoff)"}, {"e": "romantic", "c": "rachmaninoff", "en": "Piano Concerto No. 3 in D minor, Op. 30 — II. Intermezzo: Adagio", "ko": "피아노 협주곡 제3번 라단조 Op. 30 — 2악장 Intermezzo: Adagio", "yt": "D2h-yXLVBWU", "who": "Valentina Lisitsa, piano · London Symphony Orchestra · Michael Francis", "t": {"love": 3, "tender": 2, "dream": 2, "longing": 1}, "s": "https://en.wikipedia.org/wiki/Piano_Concerto_No._3_(Rachmaninoff)"}, {"e": "romantic", "c": "rachmaninoff", "en": "Rhapsody on a Theme of Paganini, Op. 43 — Variation 24", "ko": "파가니니 주제에 의한 랩소디 Op. 43 — 24변주", "yt": "3qBdSeHK33Q", "who": "Beatrice Rana, piano", "t": {"love": 2, "longing": 2, "elegance": 1, "dream": 1}, "s": "https://en.wikipedia.org/wiki/Rhapsody_on_a_Theme_of_Paganini"}, {"e": "romantic", "c": "rachmaninoff", "en": "The Isle of the Dead, Op. 29", "ko": "죽음의 섬 Op. 29", "yt": "5S3pZ87h-FI", "who": "Vladimir Ashkenazy · Royal Concertgebouw Orchestra", "t": {"death": 3, "darkness": 2, "grief": 2, "drama": 1}, "s": "https://en.wikipedia.org/wiki/Isle_of_the_Dead_(Rachmaninoff)"}, {"e": "romantic", "c": "smetana", "en": "Piano Trio in G minor, Op. 15 — III. Finale: Presto", "ko": "피아노 삼중주 G단조 Op. 15 — 3악장 피날레: 프레스토", "yt": "evJg0BTIlQ4", "who": "Beaux Arts Trio", "t": {"grief": 2, "speed": 1, "drama": 1, "farewell": 1}, "s": "https://en.wikipedia.org/wiki/Piano_Trio_(Smetana)"}, {"e": "romantic", "c": "grieg", "en": "Lyric Pieces, Op. 68 — No. 5 “At the Cradle”", "ko": "서정 소품집 Op. 68 — 5번 “요람에서”", "yt": "bF2rbb8hVGU", "who": "Leif Ove Andsnes, piano", "t": {"tender": 3, "serene": 1, "intimate": 1}, "s": "https://en.wikipedia.org/wiki/Lyric_Pieces"}, {"e": "romantic", "c": "debussy", "en": "Suite bergamasque — III. Clair de lune", "ko": "베르가마스크 모음곡 — 3곡 “달빛”", "yt": "AhsLh1iQ_qo", "who": "조성진 Seong-Jin Cho, piano", "t": {"night": 2, "dream": 2, "light": 1, "serene": 1}, "s": "https://en.wikipedia.org/wiki/Clair_de_lune_(Debussy)"}, {"e": "classic", "c": "pleyel", "en": "Three Grand Duets for Violin and Viola, Op. 69 No. 1 — II. Rondo: Allegro", "ko": "바이올린과 비올라를 위한 3개의 대이중주 Op. 69 No. 1 — 2악장 론도: 알레그로", "yt": "Da4Ufn6ehHU", "who": "Emmanuele Baldini · Claudio Cruz", "t": {"joy": 2, "elegance": 1, "dance": 1}, "s": "https://en.wikipedia.org/wiki/Ignaz_Pleyel"}, {"e": "romantic", "c": "ravel", "en": "Pavane pour une infante défunte, M. 19", "ko": "죽은 왕녀를 위한 파반느 M. 19", "yt": "UIXe7H52UkA", "who": "조성진 Seong-Jin Cho, piano", "t": {"nostalgia": 2, "elegance": 1, "grief": 1, "restraint": 1}, "s": "https://en.wikipedia.org/wiki/Pavane_pour_une_infante_d%C3%A9funte"}, {"e": "romantic", "c": "glinka", "en": "The Lark (arr. Balakirev)", "ko": "종달새 (발라키레프 편곡)", "yt": "cxlf-ZmE8JI", "who": "Evgeny Kissin, piano", "t": {"nature": 2, "nostalgia": 1, "longing": 1, "solitude": 1}, "s": "https://en.wikipedia.org/wiki/Mikhail_Glinka"}];
    // ---------- Keyword matching engine ----------
    // Paintings and pieces carry tags from a shared feeling vocabulary, extracted from English sources (see TAG_SRC).
    // Tags common to the era (and to one composer's whole output) are down-weighted, so the match runs on what is distinctive.
    const ENG = {};
    function engPrep(era) {
      if (ENG[era]) return ENG[era];
      const items = CAT.filter(x => x.e === era);
      const N = items.length, df = {};
      items.forEach(x => Object.keys(x.t).forEach(t => { df[t] = (df[t] || 0) + 1; }));
      const idf = t => Math.log((N + 1) / ((df[t] || 0) + 1)) + 0.25;
      const byC = {};
      items.forEach(x => { (byC[x.c] = byC[x.c] || []).push(x); });
      const cshare = (c, t) => { const L = byC[c]; return L.length < 3 ? 0 : L.filter(x => x.t[t]).length / L.length; };
      items.forEach(x => {
        x.v = {}; let n = 0;
        Object.entries(x.t).forEach(([t, w]) => { const v = w * idf(t) * (1 - 0.8 * cshare(x.c, t)); x.v[t] = v; n += v * v; });
        x.n = Math.sqrt(n) || 1;
      });
      const ps = allPaintings(), pdf = {};
      ps.forEach(p => Object.keys(PT[p.id] || {}).forEach(t => { pdf[t] = (pdf[t] || 0) + 1; }));
      const pidf = t => Math.log((ps.length + 1) / ((pdf[t] || 0) + 1)) + 0.3;
      const pv = {};
      ps.forEach(p => {
        const v = {}; let n = 0;
        Object.entries(PT[p.id] || {}).forEach(([t, w]) => { v[t] = w * pidf(t); n += v[t] * v[t]; });
        pv[p.id] = { v, n: Math.sqrt(n) || 1 };
      });
      return (ENG[era] = { items, pv });
    }
    // Ranked pieces for one painting, each with the two tags that carried the match
    function rankFor(era, pid) {
      const E = engPrep(era), P = E.pv[pid];
      if (!P) return [];
      return E.items.map(x => {
        let s = 0; const parts = [];
        Object.keys(P.v).forEach(t => { if (x.v[t]) { const c = P.v[t] * x.v[t]; s += c; parts.push([t, c]); } });
        s = s / (P.n * x.n);
        parts.sort((a, b) => b[1] - a[1]);
        return { x, s, why: parts.slice(0, 2).map(p => p[0]) };
      }).filter(r => r.s > 0).sort((a, b) => b.s - a.s);
    }
    const workKey = en => en.split(' — ')[0].replace(/,? (Op|K|BWV|HWV|RV|D|S|Z|G|WoO)\.? ?[\d:]+.*$/, '');
    function buildRecommendation() {
      const sel = selected();
      if (!sel.length) return [];
      const era = currentEra, n = sel.length, total = 10;
      const lists = sel.map(p => rankFor(era, p.id).map(r => Object.assign({}, r, { s: r.s * (r.x.yt ? 1 : 0.7), via: p })));
      const quota = sel.map((_, k) => Math.floor(total / n) + (k < total % n ? 1 : 0));
      const taken = sel.map(() => 0), ptr = sel.map(() => 0), out = [], used = new Set(), works = new Set(), comp = {};
      const ok = (r, cap) => !used.has(r.x.en) && !works.has(workKey(r.x.en)) && (comp[r.x.c] || 0) < cap;
      const take = r => { used.add(r.x.en); works.add(workKey(r.x.en)); comp[r.x.c] = (comp[r.x.c] || 0) + 1; out.push(r); };
      for (const cap of [2, 3]) {
        let moved = true;
        while (out.length < total && moved) {
          moved = false;
          for (let k = 0; k < n && out.length < total; k++) {
            if (cap === 2 && taken[k] >= quota[k]) continue;
            const L = lists[k];
            while (ptr[k] < L.length && !ok(L[ptr[k]], cap)) ptr[k]++;
            if (ptr[k] >= L.length) continue;
            take(L[ptr[k]++]); taken[k]++; moved = true;
          }
        }
        ptr.fill(0);
      }
      if (out.length < total) [].concat(...lists).sort((a, b) => b.s - a.s).forEach(r => { if (out.length < total && ok(r, 3)) take(r); });
      out.sort((a, b) => b.s - a.s);
      return out.map(r => ({ cid: r.x.c, en: r.x.en, ko: r.x.ko, yt: r.x.yt, who: r.x.who, via: r.via, why: r.why, src: r.x.s, score: r.s }));
    }
    // Composer ranking: the best three matches per composer, summed over the chosen paintings
    function composerScores() {
      const sel = selected(), sc = {};
      sel.forEach(p => {
        const per = {};
        rankFor(currentEra, p.id).forEach(r => { (per[r.x.c] = per[r.x.c] || []).push(r.s); });
        Object.entries(per).forEach(([c, L]) => { sc[c] = (sc[c] || 0) + L.slice(0, 3).reduce((a, b) => a + b, 0); });
      });
      return sc;
    }
    // Keywords each composer shares with the chosen paintings (distinct tags across all their pieces)
    function composerShared() {
      const E = engPrep(currentEra), pt = new Set(), out = {};
      selected().forEach(p => { const P = E.pv[p.id]; if (P) Object.keys(P.v).forEach(t => pt.add(t)); });
      E.items.forEach(x => Object.keys(x.v).forEach(t => { if (pt.has(t)) (out[x.c] = out[x.c] || new Set()).add(t); }));
      return out;
    }
    // All of one composer's pieces, ranked against the chosen paintings
    function composerPieces(cid) {
      const best = {};
      selected().forEach(p => rankFor(currentEra, p.id).forEach(r => {
        if (r.x.c !== cid) return;
        if (!best[r.x.en] || best[r.x.en].s < r.s) best[r.x.en] = Object.assign({}, r, { via: p });
      }));
      return Object.values(best).sort((a, b) => b.s - a.s);
    }

    // ---- In-page player: YouTube IFrame API, one recording at a time, auto-advancing to the next playable piece
    let ytApi = null, activeLi = null, activePlayer = null;
    function loadYT() {
      if (ytApi) return ytApi;
      ytApi = new Promise(resolve => {
        if (window.YT && window.YT.Player) return resolve(true);
        const prev = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = () => { if (typeof prev === 'function') prev(); resolve(true); };
        const s = document.createElement('script');
        s.src = 'https://www.youtube.com/iframe_api'; s.async = true;
        s.onerror = () => resolve(false);
        document.head.appendChild(s);
        setTimeout(() => resolve(!!(window.YT && window.YT.Player)), 9000);
      });
      return ytApi;
    }
    // Load the YouTube API on the visitor's first touch so the first play is usually synchronous
    window.addEventListener('pointerdown', () => { loadYT(); }, { once: true });
    function searchUrl(r) {
      const comp = (SHORT[r.cid] || ['', ''])[0];
      return 'https://www.youtube.com/results?search_query=' + encodeURIComponent(comp + ' ' + r.en + ' famous recording');
    }
    function setBtn(li, open) {
      const b = li.querySelector('.pl-btn');
      if (b) { b.textContent = open ? '■ ' + I18N[lang].plClose : '▶ ' + I18N[lang].plPlay; b.setAttribute('aria-pressed', String(open)); }
    }
    // Enlarge: use the browser's real fullscreen where it exists (sharp, and YouTube switches to a higher
    // quality for the bigger size); phones without element fullscreen (iPhone) get the in-page overlay.
    const fsEl = () => document.fullscreenElement || document.webkitFullscreenElement || null;
    function setZoom(on) {
      if (!activeLi) on = false;
      const box = activeLi && activeLi.querySelector('.pl-player');
      const tools = activeLi && activeLi.querySelector('.pl-tools');
      if (!on && fsEl()) { (document.exitFullscreen || document.webkitExitFullscreen).call(document); }
      if (on && box && !box.classList.contains('pl-fail')) {
        const req = box.requestFullscreen || box.webkitRequestFullscreen;
        if (req) {
          const p = req.call(box);
          if (p && p.catch) p.catch(() => setZoomOverlay(true));
          return;
        }
      }
      setZoomOverlay(on);
    }
    document.addEventListener('fullscreenchange', () => { if (!fsEl()) setZoomOverlay(false); });
    document.addEventListener('webkitfullscreenchange', () => { if (!fsEl()) setZoomOverlay(false); });
    function setZoomOverlay(on) {
      if (!activeLi) on = false;
      const box = activeLi && activeLi.querySelector('.pl-player');
      const tools = activeLi && activeLi.querySelector('.pl-tools');
      if (box) box.classList.toggle('big', on);
      if (tools) tools.classList.toggle('big', on);
      document.getElementById('pl-backdrop').classList.toggle('on', on);
      const z = activeLi && activeLi.querySelector('.pl-zoom');
      if (z) z.textContent = on ? I18N[lang].plShrink : I18N[lang].plZoom;
    }
    document.getElementById('pl-backdrop').addEventListener('click', () => setZoom(false));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') setZoom(false); });
    function stopPlayer() {
      setZoom(false);
      if (activePlayer) { try { activePlayer.destroy(); } catch (e) { /* ignore */ } }
      if (activeLi) {
        const box = activeLi.querySelector('.pl-player');
        if (box) box.remove();
        const tools = activeLi.querySelector('.pl-tools');
        if (tools) tools.remove();
        activeLi.classList.remove('playing');
        setBtn(activeLi, false);
      }
      activePlayer = null; activeLi = null;
    }
    function playNext(li) {
      let n = li.nextElementSibling;
      while (n && !n.dataset.yt) n = n.nextElementSibling;
      if (n) { const b = n.querySelector('.pl-btn'); if (b) b.click(); } else stopPlayer();
    }
    function unavailable(li, r, code) {
      const box = li.querySelector('.pl-player');
      if (!box) return;
      if (activePlayer) { try { activePlayer.destroy(); } catch (e) { /* ignore */ } activePlayer = null; }
      setZoom(false);
      const zt = li.querySelector('.pl-zoom'); if (zt) zt.remove();
      box.className = 'pl-player pl-fail';
      box.innerHTML = '';
      const a = document.createElement('a');
      // 101/150 = the owner does not allow playback on other sites: the video itself is fine on YouTube
      a.href = (code === 101 || code === 150) ? 'https://www.youtube.com/watch?v=' + r.yt : searchUrl(r); a.target = '_blank'; a.rel = 'noopener noreferrer';
      a.textContent = I18N[lang].plFail + ' ↗';
      box.appendChild(a);
    }
    const CAN_EMBED = /^https?:$/.test(location.protocol);
    function openPlayer(li, r) {
      if (activeLi === li) { stopPlayer(); return; }
      stopPlayer();
      track('play_music', { piece: (r.en || '').slice(0, 90), composer: r.cid || '', area: (li.closest('[id]') || {}).id || '' });
      if (!CAN_EMBED) {
        window.open('https://www.youtube.com/watch?v=' + r.yt, '_blank', 'noopener');
        if (!li.querySelector('.pl-note')) {
          const note = document.createElement('p');
          note.className = 'pl-note basis-full mt-2 text-xs text-white/50 sm:ml-11';
          note.textContent = I18N[lang].plLocal;
          li.appendChild(note);
        }
        return;
      }
      const box = document.createElement('div');
      box.className = 'pl-player';
      const holder = document.createElement('div');
      box.appendChild(holder);
      const tools = document.createElement('div');
      tools.className = 'pl-tools';
      const zoom = document.createElement('button');
      zoom.type = 'button'; zoom.className = 'pl-tool pl-zoom'; zoom.textContent = I18N[lang].plZoom;
      zoom.addEventListener('click', () => setZoom(!box.classList.contains('big')));
      const close = document.createElement('button');
      close.type = 'button'; close.className = 'pl-tool'; close.textContent = I18N[lang].plStop;
      close.addEventListener('click', stopPlayer);
      const yt = document.createElement('a');
      yt.className = 'pl-tool'; yt.href = 'https://www.youtube.com/watch?v=' + r.yt;
      yt.target = '_blank'; yt.rel = 'noopener noreferrer'; yt.textContent = I18N[lang].plOpenYT;
      yt.addEventListener('click', () => { try { activePlayer && activePlayer.pauseVideo(); } catch (e) {} });
      tools.append(zoom, yt, close);
      li.append(box, tools);
      li.classList.add('playing');
      activeLi = li;
      setBtn(li, true);
      setTimeout(() => tools.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 60);
      const build = () => {
        if (activeLi !== li) return;
        if (!(window.YT && window.YT.Player)) return unavailable(li, r);
        activePlayer = new window.YT.Player(holder, {
          videoId: r.yt, width: '100%', height: '100%',
          host: 'https://www.youtube.com',
          playerVars: { autoplay: 1, mute: 0, rel: 0, playsinline: 1, modestbranding: 1, origin: location.origin, enablejsapi: 1 },
          events: {
            // In-app browsers (Instagram etc.) let YouTube fall back to muted autoplay: force the sound on
            onReady: e => { try { e.target.unMute(); e.target.setVolume(100); e.target.playVideo(); } catch (err) { /* ignore */ } },
            onError: e => unavailable(li, r, e && e.data),
            onStateChange: e => {
              if (e.data === 1) { try { if (e.target.isMuted()) { e.target.unMute(); e.target.setVolume(100); } } catch (err) { /* ignore */ } }
              if (e.data === 0) playNext(li);
            },
          },
        });
      };
      // API already loaded: create the player right inside the tap so the browser counts it as user-initiated
      if (window.YT && window.YT.Player) build();
      else loadYT().then(build);
    }

    const tagLabel = t => (VOCAB[t] || [t, t, t])[lang === 'ja' ? 2 : lang === 'ko' ? 1 : 0];
    function whyLine(r, t, idx) {
      const q = x => lang === 'ja' ? '「' + x + '」' : idx ? '〈' + x + '〉' : '“' + x + '”';
      return q(idx ? r.via.ko : r.via.en) + ' · ' + (r.why || []).map(tagLabel).join(' · ');
    }

    // ---- Result: pieces grouped by the feeling of the painting that matched them ----
    // Each mood: h = group title (ko, en, ja; {n} = number of pieces), n = feeling noun for the closing line,
    // p = two praise lines (ko, en, ja) used in turn under the pieces of that group.
    const MOODG = {
      radiant: { h: ['고요한 빛을 알아보는 당신의 마음을 비춰줄 {n}곡', '{n} pieces to light up the quiet glow in you', '静かな光に気づくあなたの心を照らす{n}曲'], n: ['고요한 빛', 'quiet light', '静かな光'],
        p: [['화려함보다 조용한 빛을 먼저 알아보는 분이라, 이 곡의 맑은 결이 잘 어울려요.', 'You notice quiet light before flash, so this piece’s clear tone suits you.', '派手さより静かな光に先に気づくあなたに、この曲の澄んだ響きがよく合います。'],
            ['작은 반짝임에도 마음이 머무는 분이에요. 이 곡이 그 순간을 오래 붙잡아 줘요.', 'Your heart lingers on small glimmers; this piece holds that moment a little longer.', '小さなきらめきに心を留めるあなた。この曲がその瞬間を長く留めてくれます。']] },
      grand: { h: ['웅장한 장면에서 힘을 얻는 당신의 가슴을 채워줄 {n}곡', '{n} pieces to fill the grand heart in you', '壮大な場面に力をもらうあなたの胸を満たす{n}曲'], n: ['웅장함', 'grandeur', '壮大さ'],
        p: [['큰 장면에서 에너지를 얻는 분이네요. 이 곡의 스케일이 그 에너지에 응답해 줘요.', 'You draw energy from big scenes; this piece answers with its scale.', '大きな場面からエネルギーを得るあなたに、この曲のスケールが応えます。'],
            ['무대 한가운데가 어울리는 분이라, 이 곡을 들으면 박수 소리까지 상상될 거예요.', 'You belong at the centre of the stage; this piece lets you hear the applause.', '舞台の中央が似合うあなた。この曲は拍手まで想像させてくれます。']] },
      mercy: { h: ['따뜻한 위로를 건네는 당신의 마음을 안아줄 {n}곡', '{n} pieces to hold the gentle, consoling heart in you', '温かな慰めを差し出すあなたの心を包み込む{n}曲'], n: ['따뜻함', 'warmth', '温かさ'],
        p: [['누군가의 아픔 앞에서 먼저 곁에 앉아 주는 분이에요. 이 곡도 그렇게 곁에 있어 줘요.', 'You are the one who sits beside others in their pain; so does this piece.', '誰かの痛みの前で、先にそばに座るあなた。この曲も同じようにそばにいてくれます。'],
            ['용서와 위로를 알아보는 눈이 있는 분이라, 이 곡의 온기가 깊게 닿을 거예요.', 'You see forgiveness and comfort, so this piece’s warmth will reach deep.', '赦しと慰めを見抜く目をもつあなたに、この曲の温もりは深く届くはずです。']] },
      dramatic: { h: ['선명한 대비를 즐기는 당신의 순간을 극적으로 만들어줄 {n}곡', '{n} pieces to give your love of contrast its drama', '鮮やかな対比を楽しむあなたの瞬間をドラマにする{n}曲'], n: ['극적인 순간', 'drama', '劇的な瞬間'],
        p: [['결정적인 순간을 알아보는 눈이 있는 분이에요. 이 곡이 그 한순간을 무대로 만들어 줘요.', 'You have an eye for the decisive moment; this piece turns it into a stage.', '決定的な瞬間を見抜く目をもつあなた。この曲がその一瞬を舞台に変えてくれます。'],
            ['빛과 어둠의 경계에서 마음이 뛰는 분이라, 이 곡의 급한 전환이 짜릿할 거예요.', 'Your pulse quickens where light meets dark, so this piece’s sudden turns will thrill you.', '光と闇の境目で胸が高鳴るあなたに、この曲の急な転換はたまらないはずです。']] },
      joy: { h: ['반짝이는 기운에 금방 웃는 당신의 하루를 들뜨게 해줄 {n}곡', '{n} pieces to put a spring in your day', 'きらめく気配にすぐ笑顔になるあなたの一日を弾ませる{n}曲'], n: ['경쾌함', 'lightness', '軽やかさ'],
        p: [['밝은 기운에 금방 웃음이 나는 분이라, 이 곡이 하루의 리듬을 바꿔 줄 거예요.', 'Bright energy makes you smile at once; this piece will change the rhythm of your day.', '明るい気配にすぐ笑顔になるあなた。この曲が一日のリズムを変えてくれます。'],
            ['무거운 것보다 반짝이는 쪽을 고르는 센스가 있어요. 이 곡이 딱 그 결이에요.', 'You choose sparkle over heaviness, and this piece has exactly that grain.', '重たいものよりきらめきを選ぶセンスがあります。この曲がまさにその質感です。']] },
      heroic: { h: ['흔들림 없는 당신의 의지를 단단하게 키워줄 {n}곡', '{n} pieces to strengthen your steady will', '揺るがないあなたの意志をさらに強くする{n}曲'], n: ['의지', 'resolve', '意志'],
        p: [['곧은 선과 확고한 몸짓에 끌리는 분이네요. 이 곡의 걸음이 당신의 걸음과 닮았어요.', 'You are drawn to straight lines and firm gestures; this piece walks like you do.', 'まっすぐな線と確かな身振りに惹かれるあなた。この曲の歩みはあなたの歩みに似ています。'],
            ['질서와 결단에서 힘을 얻는 분이라, 이 곡이 한 걸음 더 나아갈 용기를 줄 거예요.', 'You gain strength from order and decision; this piece gives you courage for one more step.', '秩序と決断から力を得るあなたに、この曲がもう一歩進む勇気をくれます。']] },
      solemn: { h: ['슬픔도 차분히 바라보는 당신의 사색을 깊게 해줄 {n}곡', '{n} pieces to deepen your calm, reflective mind', '悲しみも静かに見つめるあなたの思索を深める{n}曲'], n: ['사색', 'reflection', '思索'],
        p: [['슬픔도 차분하게 바라볼 줄 아는 분이에요. 이 곡이 그 고요한 깊이와 잘 어울려요.', 'You can look at sorrow calmly; this piece suits that quiet depth.', '悲しみも落ち着いて見つめられるあなた。この曲はその静かな深さによく合います。'],
            ['터뜨리기보다 품는 감정을 아는 분이라, 이 곡의 절제가 오래 남을 거예요.', 'You know feelings held rather than shouted, so this piece’s restraint will stay with you.', '爆発させるより抱える感情を知るあなたに、この曲の抑制は長く心に残るでしょう。']] },
      elegant: { h: ['매끄러운 아름다움을 알아보는 당신의 안목을 채워줄 {n}곡', '{n} pieces to feed your eye for refined beauty', 'なめらかな美しさを見抜くあなたの審美眼を満たす{n}曲'], n: ['우아함', 'grace', '優雅さ'],
        p: [['다듬어진 아름다움을 한눈에 알아보는 분이에요. 이 곡의 선율도 한 줄 한 줄 곱게 다듬어져 있어요.', 'You spot polished beauty at a glance; this melody is finished line by line just as finely.', '磨かれた美しさをひと目で見抜くあなた。この曲の旋律も一行ずつ丁寧に磨かれています。'],
            ['세련된 것의 진짜 가치를 아는 분이라, 이 곡이 취향을 한 번 더 만족시켜 줄 거예요.', 'You know the real value of refinement; this piece will satisfy your taste once more.', '洗練されたものの本当の価値を知るあなたに、この曲が好みをもう一度満たしてくれます。']] },
      calm: { h: ['평온을 지켜내는 당신의 마음을 가라앉혀줄 {n}곡', '{n} pieces to settle the calm you guard', '平穏を守るあなたの心を静める{n}曲'], n: ['평온', 'calm', '平穏'],
        p: [['갈등보다 균형을 사랑하는 분이네요. 이 곡이 소음을 가라앉히고 숨을 고르게 해줘요.', 'You love balance more than conflict; this piece quiets the noise and steadies your breath.', '対立よりバランスを愛するあなた。この曲が雑音を静め、呼吸を整えてくれます。'],
            ['고요함을 지킬 줄 아는 분이라, 이 곡과 함께하는 시간이 쉼표가 될 거예요.', 'You know how to keep stillness, so time with this piece will be a rest mark in your day.', '静けさを守れるあなたに、この曲との時間は一日の休符になるはずです。']] },
      galant: { h: ['산뜻한 장난기를 가진 당신의 기분을 반짝이게 할 {n}곡', '{n} pieces to make your light, playful mood sparkle', '爽やかな遊び心をもつあなたの気分を輝かせる{n}曲'], n: ['산뜻함', 'freshness', '爽やかさ'],
        p: [['우아한데 장난기가 있는 분이라, 이 곡의 가벼운 걸음이 딱 맞아요.', 'Elegant with a touch of mischief, you suit this piece’s light step.', '優雅なのに茶目っ気もあるあなたに、この曲の軽やかな足取りがぴったりです。'],
            ['분위기를 산뜻하게 바꿀 줄 아는 분이에요. 이 곡에도 그런 힘이 있어요.', 'You can freshen up any mood, and so can this piece.', '場の空気を爽やかに変えられるあなた。この曲にも同じ力があります。']] },
      tender: { h: ['섬세한 당신의 마음을 적셔줄 {n}곡', '{n} pieces to soak into your delicate heart', '繊細なあなたの心を潤す{n}曲'], n: ['섬세함', 'tenderness', '繊細さ'],
        p: [['작은 표정 하나에도 마음이 움직이는 섬세함이 있는 분이에요. 이 곡은 그 결을 알아봐요.', 'A small expression can move you, and this piece recognises that fineness.', '小さな表情ひとつにも心が動く繊細さがあるあなた。この曲はその繊細さに気づいてくれます。'],
            ['큰 사건보다 그 직전의 고요를 느끼는 분이라, 이 곡의 여린 떨림이 와닿을 거예요.', 'You feel the hush before the big moment, so this piece’s faint tremble will reach you.', '大きな出来事より、その直前の静けさを感じるあなたに、この曲のかすかな震えが届くでしょう。']] },
      love: { h: ['사랑에 진심인 당신의 마음을 두근거리게 할 {n}곡', '{n} pieces to quicken your wholehearted heart', '愛に真剣なあなたの胸をときめかせる{n}曲'], n: ['사랑', 'love', '愛'],
        p: [['두 사람 사이의 공기를 먼저 읽는 분이네요. 이 곡의 선율이 그 마음을 대신 말해줘요.', 'You read the air between two people first; this melody says what you feel.', '二人の間の空気を先に読むあなた。この曲の旋律がその気持ちを代わりに語ってくれます。'],
            ['그리움 앞에서 솔직해질 수 있는 분이라, 이 곡이 오래 마음에 머물 거예요.', 'You can be honest in front of longing, so this piece will stay with you.', '恋しさの前で素直になれるあなたに、この曲は長く心に留まるでしょう。']] },
      tragic: { h: ['혁명적인 당신의 열정을 키워줄 {n}곡', '{n} pieces to stoke your revolutionary fire', '革命的なあなたの情熱を育てる{n}曲'], n: ['열정', 'passion', '情熱'],
        p: [['아픈 이야기에서도 눈을 돌리지 않는 분이에요. 이 곡의 끓어오르는 힘이 꼭 맞을 거예요.', 'You don’t look away even from painful stories; this piece’s rising force will fit you.', '痛みのある物語からも目をそらさないあなた。この曲の煮えたぎる力がぴったりです。'],
            ['쉽게 꺾이지 않는 마음을 가진 분이네요. 이 곡은 그 마음에 박수를 보내줘요.', 'Your spirit doesn’t bend easily; this piece applauds it.', '簡単には折れない心をもつあなた。この曲はその心に拍手を送ります。']] },
      opulent: { h: ['압도적인 것에서 짜릿함을 느끼는 당신의 모험심을 부풀려줄 {n}곡', '{n} pieces to swell your appetite for the overwhelming', '圧倒的なものにスリルを感じるあなたの冒険心を膨らませる{n}曲'], n: ['모험심', 'adventure', '冒険心'],
        p: [['소용돌이 같은 색과 움직임에 끌리는 분이에요. 이 곡이 그 파도를 함께 타 줄 거예요.', 'You’re pulled into swirls of colour and motion; this piece will ride the wave with you.', '渦のような色と動きに惹かれるあなた。この曲がその波に一緒に乗ってくれます。'],
            ['강렬할수록 살아 있다고 느끼는 분이라, 이 곡의 폭발력이 반가울 거예요.', 'The more intense, the more alive you feel, so you’ll welcome this piece’s force.', '強烈なほど生きていると感じるあなたに、この曲の爆発力は嬉しいはずです。']] },
      dread: { h: ['신비로운 이야기에 귀 기울이는 당신의 밤을 물들여줄 {n}곡', '{n} pieces to colour your nights of mystery', '神秘的な物語に耳を傾けるあなたの夜を染める{n}曲'], n: ['신비', 'mystery', '神秘'],
        p: [['그림자와 수수께끼에 먼저 귀가 쫑긋해지는 분이에요. 이 곡이 밤 이야기를 이어가 줘요.', 'Shadows and riddles make you lean in first; this piece carries the night’s story on.', '影となぞに真っ先に耳をそばだてるあなた。この曲が夜の物語を続けてくれます。'],
            ['밝은 것보다 비밀스러운 쪽에 끌리는 분이라, 이 곡의 어둑한 빛깔이 잘 어울려요.', 'You’re drawn to the secretive over the bright, so this piece’s dusky colour suits you.', '明るいものより秘密めいたものに惹かれるあなたに、この曲の薄暗い色合いがよく合います。']] },
      dash: { h: ['멈추지 않는 당신의 추진력을 달리게 해줄 {n}곡', '{n} pieces to keep your momentum running', '止まらないあなたの推進力を走らせる{n}曲'], n: ['추진력', 'momentum', '推進力'],
        p: [['멈춰 있는 것보다 앞으로 달려 나가는 움직임에 눈이 가는 분이에요. 이 곡의 속도가 딱이에요.', 'Your eye goes to motion charging forward, not stillness; this piece has the speed.', '静止より前へ駆け出す動きに目がいくあなた。この曲の速さがぴったりです。'],
            ['속도와 추진력에서 살아 있음을 느끼는 분이라, 이 곡이 심장 박동을 함께 올려 줄 거예요.', 'Speed makes you feel alive; this piece will raise your heartbeat with it.', 'スピードと推進力に生きている実感を得るあなたに、この曲が鼓動を一緒に高めてくれます。']] },
      fantasy: { h: ['꿈과 신화를 여행하는 당신의 상상을 펼쳐줄 {n}곡', '{n} pieces to unfold your dreams and myths', '夢と神話を旅するあなたの想像を広げる{n}曲'], n: ['상상력', 'imagination', '想像力'],
        p: [['현실 너머의 이야기에 빠져들 줄 아는 분이에요. 이 곡이 그 문을 열어줄 거예요.', 'You can fall into stories beyond reality; this piece opens that door.', '現実の向こうの物語に入り込めるあなた。この曲がその扉を開いてくれます。'],
            ['동화 같은 빛에 끌리는 분이라, 이 곡을 들으면 장면이 눈앞에 그려질 거예요.', 'You love fairy-tale light, so this piece will paint scenes before your eyes.', 'おとぎ話のような光に惹かれるあなたには、この曲を聴くと情景が目に浮かぶでしょう。']] },
      intimate: { h: ['소박한 순간에서 행복을 찾는 당신의 방 안을 채워줄 {n}곡', '{n} pieces to fill the cosy room you love', '素朴な瞬間に幸せを見つけるあなたの部屋を満たす{n}曲'], n: ['다정함', 'warmth at home', '親密さ'],
        p: [['작고 따뜻한 순간에서 행복을 찾는 분이에요. 이 곡이 오늘 방 안의 공기를 데워줄 거예요.', 'You find happiness in small, warm moments; this piece will warm the air of your room tonight.', '小さく温かな瞬間に幸せを見つけるあなた。この曲が今夜、部屋の空気を温めてくれます。'],
            ['큰 무대보다 가까운 사람의 온도를 아는 분이라, 이 곡의 소박함이 편안할 거예요.', 'You know the warmth of the people close to you more than any big stage; this piece’s simplicity will feel like home.', '大きな舞台より身近な人の温度を知るあなたに、この曲の素朴さは心地よく響くでしょう。']] },
    };
    const MOODG_REST = { h: ['또 다른 결로 당신의 취향을 넓혀줄 {n}곡', '{n} more pieces to widen your taste', 'また別の質感であなたの好みを広げる{n}曲'] };
    const L3 = a => a[lang === 'ko' ? 0 : lang === 'ja' ? 2 : 1];
    // Korean "(으)로": no final consonant or ㄹ -> 로
    const roKo = w => { const c = w.charCodeAt(w.length - 1); if (c < 0xAC00 || c > 0xD7A3) return '로'; const j = (c - 0xAC00) % 28; return (j === 0 || j === 8) ? '로' : '으로'; };
    function groupRecs(recs) {
      const groups = [], by = new Map();
      recs.forEach(r => {
        const m = r.via.m; let g = by.get(m);
        if (!g) { g = { m, items: [], vias: [] }; by.set(m, g); groups.push(g); }
        g.items.push(r); if (!g.vias.includes(r.via)) g.vias.push(r.via);
      });
      if (groups.length <= 4) return groups;
      // keep the four biggest feelings; the rest travel together in one closing group
      const keep = groups.map((g, i) => ({ g, i })).sort((a, b) => (b.g.items.length - a.g.items.length) || (a.i - b.i)).slice(0, 4).sort((a, b) => a.i - b.i).map(x => x.g);
      const rest = { m: null, items: [], vias: [] };
      groups.forEach(g => { if (!keep.includes(g)) { rest.items.push(...g.items); g.vias.forEach(v => rest.vias.push(v)); } });
      return keep.concat(rest);
    }
    function renderPlaylist() {
      const idx = isLocal() ? 1 : 0;
      const t = I18N[lang];
      const ol = document.getElementById('pl-list');
      if (!ol) return;
      stopPlayer();
      ol.innerHTML = '';
      loadYT();
      const recs = buildRecommendation(), groups = groupRecs(recs);
      const q = x => lang === 'ja' ? '「' + x + '」' : idx ? '〈' + x + '〉' : '“' + x + '”';
      let i = 0;
      groups.forEach(g => {
        const G = (g.m && MOODG[g.m]) || MOODG_REST;
        const head = document.createElement('li');
        head.className = 'grp-head';
        const k = document.createElement('span'); k.className = 'k';
        if (g.m) {
          const via0 = g.vias[0];
          k.textContent = g.vias.slice(0, 2).map(v => q(idx ? v.ko : v.en)).join(' · ') + ' · ' + (idx ? via0.moodKo : via0.moodEn);
        } else k.textContent = g.vias.slice(0, 2).map(v => q(idx ? v.ko : v.en)).join(' · ');
        const ttl = document.createElement('span'); ttl.className = 'ttl';
        ttl.textContent = L3(G.h).replace('{n}', g.items.length).replace(g.items.length === 1 ? ' pieces' : '\u0000', ' piece');
        head.append(k, ttl); ol.appendChild(head);
        g.items.forEach((r, gi) => {
        const li = document.createElement('li');
        li.className = 'flex flex-wrap items-start gap-x-4 gap-y-0 py-3.5 border-b border-line';
        if (r.yt) li.dataset.yt = r.yt;

        const num = document.createElement('span');
        num.className = 'w-7 shrink-0 font-serif italic text-xl text-amber-200/70';
        num.textContent = String(i + 1);

        const body = document.createElement('div');
        body.className = 'min-w-0 flex-1';
        const title = document.createElement('span');
        title.className = 'block font-serif text-lg sm:text-xl leading-snug text-white/90';
        title.textContent = idx ? r.ko : r.en;
        const by = document.createElement('span');
        by.className = 'mt-0.5 block text-sm text-white/50';
        const comp = SHORT[r.cid] || ['', ''];
        const hasPage = !!WORKS[r.cid];   // composers without a WORKS list have no detail page: plain text, no link
        const cl = document.createElement(hasPage ? 'button' : 'span');
        cl.textContent = comp[idx];
        if (hasPage) {
          cl.type = 'button'; cl.className = 'cmp-link'; cl.title = t.cmpHint;
          cl.addEventListener('click', () => openComposer(r.cid));
        }
        by.append(cl);
        // keyword chips (what the painting and this piece share); the painting is named only when the group mixes several
        const why = document.createElement('span');
        why.className = 'why-line';
        if (g.vias.length > 1) { const pv = document.createElement('span'); pv.className = 'why-via'; pv.textContent = q(idx ? r.via.ko : r.via.en); why.append(pv); }
        (r.why || []).forEach(tg => { const c = document.createElement('span'); c.className = 'why-chip'; c.textContent = tagLabel(tg); why.append(c); });
        if (r.src) {
          const sl = document.createElement('a');
          sl.className = 'src-link'; sl.href = r.src; sl.target = '_blank'; sl.rel = 'noopener noreferrer';
          sl.textContent = t.srcLabel; sl.title = r.src;
          why.append(' ', sl);
        }
        body.append(title, by, why);
        // one line of praise under the piece
        if (g.m && MOODG[g.m]) {
          const pr = document.createElement('span');
          pr.className = 'praise-line';
          pr.textContent = L3(MOODG[g.m].p[gi % 2]);
          body.appendChild(pr);
        }
        if (r.who) {
          const who = document.createElement('span');
          who.className = 'mt-0.5 block text-xs text-amber-200/70';
          who.textContent = t.perfBy + ' ' + r.who;
          body.appendChild(who);
        }

        let act;
        if (r.yt) {
          act = document.createElement('button');
          act.type = 'button';
          act.className = 'pl-btn shrink-0 rounded-full border border-line px-3 py-1.5 text-xs text-white/80 transition hover:border-white/40 hover:text-white';
          act.textContent = '▶ ' + t.plPlay;
          act.setAttribute('aria-label', t.plPlay + ': ' + (idx ? r.ko : r.en));
          act.addEventListener('click', () => openPlayer(li, r));
        } else {
          // No verified recording for this piece: open a YouTube search for it instead
          act = document.createElement('a');
          act.className = 'shrink-0 rounded-full border border-line px-3 py-1.5 text-xs text-white/70 transition hover:border-white/40 hover:text-white';
          act.href = searchUrl(r); act.target = '_blank'; act.rel = 'noopener noreferrer';
          act.textContent = t.plFind + ' ↗';
        }
        li.append(num, body, act);
        ol.appendChild(li);
        i++;
        });
      });
      // the emotional line the choices drew, woven into the menu subtitle (no separate box)
      const flow = document.getElementById('pl-flow');
      if (flow) { flow.innerHTML = ''; flow.hidden = true; }
      const sub = document.getElementById('pl-sub');
      if (sub) {
        const nm = groups.filter(g => g.m && MOODG[g.m]).map(g => L3(MOODG[g.m].n));
        const uniq = nm.filter((x, k) => nm.indexOf(x) === k);
        const x = uniq[0], y = uniq[1];
        let line = '';
        if (x) {
          if (lang === 'ko') line = y ? '오늘의 감정선은 ' + x + '에서 ' + y + roKo(y) + ' 흐르고 있어요.' : '오늘의 감정선은 ' + x + ' 쪽에 닿아 있어요.';
          else if (lang === 'ja') line = y ? '今日の感情の流れは、' + x + 'から' + y + 'へ向かっています。' : '今日の感情は、' + x + 'のそばにあります。';
          else line = y ? 'Today’s emotional line runs from ' + x + ' to ' + y + '.' : 'Today’s emotional line rests close to ' + x + '.';
        }
        sub.textContent = line ? line + ' ' + t.plSub : t.plSub;
      }
    }
    // Psych-test style types: one per mood. [nameEn, nameKo, tasteEn, tasteKo, whyEn, whyKo]
    const TYPES = {
      radiant:  ['The Quiet Light-Catcher', '고요한 빛을 모으는 사람', 'Today you’re drawn to moments that glow quietly rather than shout.', '오늘은 화려함보다 조용히 빛나는 순간에 마음이 가는 날이네요.', 'You noticed the hush where light settles on a single spot before anything else.', '소란스러운 장면보다 빛이 한 점에 머무는 고요를 먼저 알아봤거든요.'],
      grand:    ['The Grand Conductor', '무대 한가운데의 지휘자', 'Today you want energy from big, magnificent scenes.', '오늘은 크고 웅장한 장면에서 에너지를 얻고 싶은 날이네요.', 'Your eye went straight to crowds and light moving together on one stage.', '많은 사람과 빛이 한 화면에서 움직이는 장대함에 눈이 먼저 갔거든요.'],
      mercy:    ['The Gentle Consoler', '따뜻한 위로를 건네는 사람', 'Today you want to linger on scenes that soothe the heart.', '오늘은 마음을 어루만지는 장면에 오래 머물고 싶은 날이네요.', 'You saw forgiveness and comfort before you saw the drama.', '극적인 사건보다 용서와 위로가 오가는 순간을 먼저 봤거든요.'],
      dramatic: ['The Chiaroscuro Director', '명암을 즐기는 연출가', 'Today sharp contrast and the decisive moment pull you in.', '오늘은 선명한 대비와 결정적인 순간이 끌리는 날이네요.', 'You were pulled in by light falling suddenly into darkness.', '어둠 속에 갑자기 떨어지는 빛, 그 긴장감에 끌렸거든요.'],
      joy:      ['The Sparkler', '반짝이는 에너지의 소유자', 'Today bright, lively energy makes you smile right away.', '오늘은 밝고 경쾌한 기운에 금방 웃음이 나는 날이네요.', 'You chose wit and sparkle over heaviness.', '무겁기보다 재치 있고 생기 넘치는 표정을 먼저 골랐거든요.'],
      heroic:   ['The Decisive Leader', '결단의 리더', 'Today you want strength from steady will and clear order.', '오늘은 흔들림 없는 의지와 질서에서 힘을 얻고 싶은 날이네요.', 'You picked scenes full of straight lines and firm gestures.', '곧게 뻗은 선과 단호한 몸짓이 가득한 장면을 골랐거든요.'],
      solemn:   ['The Quiet Philosopher', '깊이 사색하는 철학자', 'Today you feel like looking at sorrow calmly and clearly.', '오늘은 슬픔도 차분하게 바라보고 싶은 날이네요.', 'You preferred feeling held in restraint to feeling that explodes.', '감정을 터뜨리기보다 절제 속에 담아낸 장면에 끌렸거든요.'],
      elegant:  ['The Connoisseur of Grace', '우아함을 아는 감식가', 'Today smooth, refined beauty catches your eye.', '오늘은 매끄럽고 세련된 아름다움이 눈에 들어오는 날이네요.', 'Your eye went to paintings polished down to every line and curve.', '선 하나, 곡선 하나까지 다듬어진 그림에 눈이 갔거든요.'],
      calm:     ['The Keeper of Calm', '평온을 지키는 사람', 'Today you want balance and peace more than conflict.', '오늘은 갈등보다 균형과 평온이 간절한 날이네요.', 'You chose scenes where the noise settles and everything finds its place.', '소란이 가라앉고 모든 것이 제자리를 찾는 장면을 골랐거든요.'],
      galant:   ['The Charming Socialite', '산뜻하게 반짝이는 사교가', 'Today you’re in the mood for something elegant but a little playful.', '오늘은 우아하면서도 장난기 있는 분위기가 좋은 날이네요.', 'Freshness and flutter caught you more than seriousness.', '진지함보다 산뜻함과 설렘이 묻어나는 장면에 끌렸거든요.'],
      tender:   ['The Tender Dreamer', '다정한 몽상가', 'Today delicate, gentle feelings open your heart.', '오늘은 섬세하고 다정한 감정에 마음이 열리는 날이네요.', 'You spotted the quiet, soft moment before any big event.', '큰 사건보다 조용하고 부드러운 순간을 먼저 알아봤거든요.'],
      love:     ['The Wholehearted Romantic', '사랑에 진심인 로맨티스트', 'Today love and longing move you more than anything.', '오늘은 사랑과 그리움 앞에서 마음이 크게 움직이는 날이네요.', 'You saw the feeling between two people before the beauty of the scene.', '아름다운 풍경보다 두 사람 사이에 흐르는 감정을 먼저 봤거든요.'],
      tragic:   ['The One Who Faces the Dark', '어둠을 정면으로 보는 사람', 'Today you don’t want to look away, even from painful stories.', '오늘은 아픈 이야기에서도 눈을 돌리고 싶지 않은 날이네요.', 'You chose heavy, honest feeling over comfort.', '편안한 장면보다 무겁고 솔직한 감정이 담긴 그림을 골랐거든요.'],
      opulent:  ['The Storm Chaser', '폭풍을 즐기는 탐험가', 'Today you want a thrill from intense, overwhelming things.', '오늘은 강렬하고 압도적인 것에서 짜릿함을 느끼고 싶은 날이네요.', 'You were pulled into whirlpools of colour and motion.', '색과 움직임이 넘쳐흐르는 소용돌이 같은 장면에 끌렸거든요.'],
      dread:    ['The Night Storyteller', '밤의 이야기꾼', 'Today mysterious, slightly eerie stories make you lean in.', '오늘은 신비롭고 으스스한 이야기에 귀가 쫑긋해지는 날이네요.', 'You chose shadows and riddles over bright scenes.', '밝은 장면보다 그림자와 수수께끼가 깃든 그림을 골랐거든요.'],
      dash:     ['The Unstoppable Runner', '멈추지 않는 질주자', 'Today speed and momentum make you want to feel alive.', '오늘은 속도와 추진력에서 살아 있음을 느끼고 싶은 날이네요.', 'Your eye went to movement charging forward, not to stillness.', '멈춰 있는 장면보다 앞으로 내달리는 움직임에 눈이 갔거든요.'],
      fantasy:  ['The Dream Traveller', '꿈과 신화의 여행자', 'Today you want to fall into beautiful stories beyond reality.', '오늘은 현실 너머의 아름다운 이야기에 빠져들고 싶은 날이네요.', 'You chose scenes glowing with myth and fairy-tale light.', '신화와 동화처럼 몽환적인 빛이 감도는 장면을 골랐거든요.'],
      intimate: ['The Host of a Cosy Room', '따뜻한 거실의 주인', 'Today you want to find happiness in small, warm moments.', '오늘은 소박하고 따뜻한 순간에서 행복을 찾고 싶은 날이네요.', 'Homely, human scenes appealed to you more than grand stages.', '웅장한 무대보다 사람 냄새 나는 정겨운 장면에 끌렸거든요.'],
    };
    // The mood picked most often decides the type; ties go to the earliest pick
    function dominantMood(sel) {
      const n = {}; let best = null;
      sel.forEach(s => { n[s.m] = (n[s.m] || 0) + 1; if (!best || n[s.m] > n[best]) best = s.m; });
      return best;
    }

    // Era colours from the brief; the result card wears the colour of the visitor's era
    const ERAS = {
      baroque:   { c: '#D7A33D', text: '#8A5E10', en: 'BAROQUE',   ko: '바로크 · 1600–1750' },
      classical: { c: '#6B7A68', text: '#4E5B4B', en: 'CLASSICAL', ko: '고전주의 · 1750–1820' },
      romantic:  { c: '#A01B3C', text: '#A01B3C', en: 'ROMANTIC',  ko: '낭만주의 · 1820–1900' },
    };
    const ERA_EN = { baroque: 'Baroque · 1600–1750', classical: 'Classical · 1750–1820', romantic: 'Romantic · 1820–1900' };
    function eraOf(sel) {
      if (currentEra === 'romantic') return 'romantic';
      const cs = sel.filter(s => eraIdOf(s.id) === 'classic');
      const b = cs.filter(s => /Baroque/.test(s.tagEn)).length;
      return b * 2 >= (cs.length || 1) ? 'baroque' : 'classical';
    }

    // ---------- More for today (pilot): painters & classic novels ----------
    // Each item: [en, ko, ja, years, work/author en, ko, ja, line en, ko, ja, tags (same vocabulary as the paintings)]
    const MORE_PAINTERS = [
      ['Claude Monet', '클로드 모네', 'クロード・モネ', '1840–1926', 'Impression, Sunrise', '인상, 해돋이', '印象・日の出', 'He painted the same pond and haystacks again and again to catch light changing by the hour.', '같은 연못과 건초더미를 몇 번이고 다시 그리며 시시각각 변하는 빛을 붙잡았어요.', '同じ池や積みわらを何度も描き、刻々と変わる光をとらえました。', { light: 3, water: 3, nature: 2, serene: 2, dream: 1 }],
      ['J. M. W. Turner', 'J. M. W. 터너', 'J・M・W・ターナー', '1775–1851', 'Rain, Steam and Speed', '비, 증기, 속도', '雨、蒸気、速度', 'Storms, steam and sunsets turned into blazing light.', '폭풍과 증기, 노을을 타오르는 빛 그 자체로 바꿨어요.', '嵐や蒸気、夕焼けを燃えたつ光そのものに変えました。', { storm: 3, light: 3, water: 2, grandeur: 2, speed: 1, farewell: 1 }],
      ['Vincent van Gogh', '빈센트 반 고흐', 'フィンセント・ファン・ゴッホ', '1853–1890', 'The Starry Night', '별이 빛나는 밤', '星月夜', 'Swirling skies and thick strokes full of longing and loneliness.', '소용돌이치는 하늘과 두꺼운 붓질에 그리움과 외로움을 담았어요.', '渦巻く空と厚い筆致に、憧れと孤独を込めました。', { night: 2, nature: 2, longing: 2, solitude: 2, light: 2, storm: 1 }],
      ['Gustav Klimt', '구스타프 클림트', 'グスタフ・クリムト', '1862–1918', 'The Kiss', '키스', '接吻', 'Gold leaf, patterns and lovers wrapped in a shimmering embrace.', '금박과 문양 속에 연인들을 반짝이는 포옹으로 감쌌어요.', '金箔と文様の中で、恋人たちをきらめく抱擁で包みました。', { love: 3, opulence: 3, sensual: 2, elegance: 1, dream: 1 }],
      ['Vilhelm Hammershøi', '빌헬름 함메르쇠이', 'ヴィルヘルム・ハンマースホイ', '1864–1916', 'Interior with Sunlight on the Floor', '바닥에 햇살이 비치는 실내', '床に陽の差す室内', 'Grey rooms, open doors and a woman seen from behind: silence, painted.', '회색 방, 열린 문, 뒷모습의 여인. 고요를 그렸어요.', '灰色の部屋、開いた扉、後ろ姿の女性。静けさを描きました。', { solitude: 3, serene: 2, light: 2, contemplative: 2, restraint: 2, intimate: 1 }],
      ['Caspar David Friedrich', '카스파르 다비트 프리드리히', 'カスパー・ダーヴィト・フリードリヒ', '1774–1840', 'Wanderer above the Sea of Fog', '안개 바다 위의 방랑자', '雲海の上の旅人', 'Small figures before mountains, seas and mist: the sublime of solitude.', '산과 바다, 안개 앞에 선 작은 인물들로 고독의 숭고를 그렸어요.', '山や海、霧の前に立つ小さな人物で、孤独の崇高さを描きました。', { solitude: 3, nature: 2, sacred: 2, contemplative: 2, cold: 1, grandeur: 1 }],
      ['John William Waterhouse', '존 윌리엄 워터하우스', 'ジョン・ウィリアム・ウォーターハウス', '1849–1917', 'The Lady of Shalott', '샬롯의 여인', 'シャロットの女', 'Legends and poems turned into dreamy, sorrowful heroines.', '전설과 시를 몽환적이고 애잔한 여주인공들로 그려 냈어요.', '伝説や詩を、夢幻的で哀しげなヒロインに描き出しました。', { myth: 3, fantasy: 2, melancholy: 2, literature: 2, love: 1, water: 1 }],
      ['Pierre-Auguste Renoir', '피에르 오귀스트 르누아르', 'ピエール＝オーギュスト・ルノワール', '1841–1919', 'Bal du moulin de la Galette', '물랭 드 라 갈레트의 무도회', 'ムーラン・ド・ラ・ギャレットの舞踏会', 'Sunlit dances and cheerful gatherings in warm, soft light.', '햇살 속 춤과 즐거운 모임을 따뜻하고 부드러운 빛으로 그렸어요.', '陽だまりのダンスや楽しい集いを、温かく柔らかな光で描きました。', { joy: 3, dance: 2, light: 2, intimate: 2, youth: 1 }],
      ['Edgar Degas', '에드가 드가', 'エドガー・ドガ', '1834–1917', 'The Dance Class', '발레 수업', 'バレエのレッスン', 'Ballet dancers backstage: grace caught mid-movement.', '무대 뒤 발레리나들, 움직이는 순간의 우아함을 포착했어요.', '舞台裏のバレリーナたち、動きの一瞬の優雅さをとらえました。', { dance: 3, elegance: 2, intimate: 1, restraint: 1, speed: 1 }],
      ['Johannes Vermeer', '요하네스 베르메르', 'ヨハネス・フェルメール', '1632–1675', 'Girl with a Pearl Earring', '진주 귀걸이를 한 소녀', '真珠の耳飾りの少女', 'Quiet rooms where window light falls on everyday moments.', '창으로 들어온 빛이 일상의 순간에 내려앉는 고요한 방.', '窓からの光が日常の瞬間に降りる、静かな部屋。', { light: 3, intimate: 3, serene: 2, contemplative: 2, restraint: 1 }],
      ['Rembrandt van Rijn', '렘브란트 판 레인', 'レンブラント・ファン・レイン', '1606–1669', 'The Night Watch', '야경', '夜警', 'Faces glowing out of deep shadow, full of human warmth.', '깊은 그늘 속에서 빛나는, 사람의 온기가 가득한 얼굴들.', '深い影から浮かび上がる、人のぬくもりに満ちた顔。', { darkness: 2, light: 2, sacred: 2, tender: 1, contemplative: 1, drama: 1 }],
      ['Caravaggio', '카라바조', 'カラヴァッジョ', '1571–1610', 'The Calling of Saint Matthew', '성 마태의 소명', '聖マタイの召命', 'A spotlight in the dark: raw, dramatic realism.', '어둠 속 스포트라이트, 날것 그대로의 극적인 사실주의.', '闇の中のスポットライト、生々しく劇的な写実。', { darkness: 3, drama: 3, light: 2, sacred: 1, terror: 1 }],
      ['Francisco de Goya', '프란시스코 고야', 'フランシスコ・デ・ゴヤ', '1746–1828', 'The Third of May 1808', '1808년 5월 3일', '1808年5月3日', 'From court portraits to nightmares: the dark side of human nature.', '궁정 초상화에서 악몽까지, 인간 본성의 어두운 얼굴.', '宮廷肖像画から悪夢まで、人間の暗い面。', { terror: 3, darkness: 2, war: 2, death: 2, drama: 1 }],
      ['Eugène Delacroix', '외젠 들라크루아', 'ウジェーヌ・ドラクロワ', '1798–1863', 'Liberty Leading the People', '민중을 이끄는 자유', '民衆を導く自由の女神', 'Colour and movement bursting with passion.', '열정으로 터져 나오는 색채와 움직임.', '情熱であふれ出す色彩と動き。', { opulence: 3, storm: 2, exotic: 2, drama: 2, heroic: 1 }],
      ['Sandro Botticelli', '산드로 보티첼리', 'サンドロ・ボッティチェッリ', '1445–1510', 'The Birth of Venus', '비너스의 탄생', 'ヴィーナスの誕生', 'Graceful goddesses and flowing lines of the Renaissance.', '르네상스의 우아한 여신들과 흐르는 선.', 'ルネサンスの優雅な女神たちと流れる線。', { myth: 3, elegance: 2, love: 2, youth: 1, sacred: 1, fantasy: 1 }],
      ['Jean-Honoré Fragonard', '장 오노레 프라고나르', 'ジャン＝オノレ・フラゴナール', '1732–1806', 'The Swing', '그네', 'ぶらんこ', 'Flirtatious, breezy scenes in pastel colours.', '파스텔 색으로 그린 산뜻하고 설레는 장면들.', 'パステル色で描いた、軽やかでときめく場面。', { joy: 2, love: 2, humour: 2, elegance: 2, youth: 1 }],
      ['Antoine Watteau', '앙투안 바토', 'アントワーヌ・ヴァトー', '1684–1721', 'Pilgrimage to Cythera', '키테라섬으로의 순례', 'シテール島への巡礼', 'Elegant outdoor parties tinged with a gentle sadness.', '우아한 야외 연회에 스민 은은한 쓸쓸함.', '優雅な野外の宴ににじむ、ほのかな寂しさ。', { elegance: 2, love: 2, nostalgia: 2, melancholy: 1, dream: 1 }],
      ['Odilon Redon', '오딜롱 르동', 'オディロン・ルドン', '1840–1916', 'The Cyclops', '키클롭스', 'キュクロプス', 'Floating eyes, flowers and visions straight out of dreams.', '꿈에서 막 건져 올린 듯한 떠다니는 눈과 꽃, 환영.', '夢からすくい上げたような、浮かぶ目と花と幻。', { dream: 3, fantasy: 3, mystery: 3, night: 1 }],
      ['Arnold Böcklin', '아르놀트 뵈클린', 'アルノルト・ベックリン', '1827–1901', 'Isle of the Dead', '죽음의 섬', '死の島', 'A cypress island and a silent boat: the haunting calm of farewell.', '사이프러스 섬과 소리 없는 배, 작별의 서늘한 고요.', '糸杉の島と音のない舟、別れのひそやかな静けさ。', { death: 3, mystery: 2, solitude: 2, farewell: 2, water: 1, myth: 1, darkness: 1 }],
      ['Ivan Aivazovsky', '이반 아이바좁스키', 'イヴァン・アイヴァゾフスキー', '1817–1900', 'The Ninth Wave', '아홉 번째 파도', '第九の波', 'Towering waves and moonlit seas glowing with light.', '치솟는 파도와 달빛 바다가 빛으로 일렁여요.', 'そびえる波と月夜の海が、光に揺らめきます。', { water: 3, storm: 3, grandeur: 2, light: 1, heroic: 1 }],
      ['Jacques-Louis David', '자크 루이 다비드', 'ジャック＝ルイ・ダヴィッド', '1748–1825', 'Oath of the Horatii', '호라티우스 형제의 맹세', 'ホラティウス兄弟の誓い', 'Clean lines and heroic resolve: Neoclassicism at full strength.', '또렷한 선과 영웅적 결의, 신고전주의의 정수.', '明快な線と英雄的な決意、新古典主義の真髄。', { heroic: 3, order: 3, restraint: 2, grandeur: 1, death: 1 }],
      ['J.-A.-D. Ingres', '장 오귀스트 도미니크 앵그르', 'アングル', '1780–1867', 'La Grande Odalisque', '그랑드 오달리스크', 'グランド・オダリスク', 'Perfectly polished curves and cool elegance.', '완벽하게 다듬은 곡선과 서늘한 우아함.', '完璧に磨かれた曲線と、涼やかな優雅さ。', { elegance: 3, sensual: 2, order: 1, exotic: 1, restraint: 1 }],
      ['John Constable', '존 컨스터블', 'ジョン・コンスタブル', '1776–1837', 'The Hay Wain', '건초 마차', '干し草車', 'Rivers, clouds and the countryside he grew up in.', '그가 자란 시골의 강과 구름.', '彼が育った田園の川と雲。', { nature: 3, water: 2, nostalgia: 2, serene: 1, intimate: 1 }],
      ['Henri Rousseau', '앙리 루소', 'アンリ・ルソー', '1844–1910', 'The Sleeping Gypsy', '잠자는 집시', '眠るジプシー女', 'Jungles and moonlit deserts painted like a child’s dream.', '아이의 꿈처럼 그린 정글과 달빛 사막.', '子どもの夢のように描かれたジャングルと月夜の砂漠。', { dream: 3, fantasy: 3, night: 2, exotic: 2, mystery: 1, solitude: 1 }],
    ];
    const MORE_NOVELS = [
      ['Wuthering Heights', '폭풍의 언덕', '嵐が丘', '1847', 'Emily Brontë', '에밀리 브론테', 'エミリー・ブロンテ', 'A wild love on the moors that refuses to die.', '황야에서 끝내 죽지 않는 거친 사랑.', '荒野で決して死なない、激しい愛。', { love: 3, storm: 2, darkness: 2, nature: 2, longing: 2, death: 1 }],
      ['Pride and Prejudice', '오만과 편견', '高慢と偏見', '1813', 'Jane Austen', '제인 오스틴', 'ジェイン・オースティン', 'Wit, misunderstanding and a slow-burning love.', '재치와 오해, 천천히 타오르는 사랑.', '機知と誤解、ゆっくり燃える恋。', { humour: 3, love: 2, elegance: 2, youth: 1, intimate: 1 }],
      ['Jane Eyre', '제인 에어', 'ジェイン・エア', '1847', 'Charlotte Brontë', '샬럿 브론테', 'シャーロット・ブロンテ', 'A plain governess, a house of secrets and an unbending will.', '평범한 가정교사, 비밀을 품은 저택, 꺾이지 않는 의지.', '平凡な家庭教師、秘密を抱えた屋敷、折れない意志。', { solitude: 2, love: 2, mystery: 2, darkness: 1, heroic: 1, restraint: 1 }],
      ['Les Misérables', '레 미제라블', 'レ・ミゼラブル', '1862', 'Victor Hugo', '빅토르 위고', 'ヴィクトル・ユゴー', 'Mercy, revolution and redemption on an epic scale.', '자비와 혁명, 구원을 담은 대서사.', '慈悲と革命、救いを描く大河小説。', { heroic: 3, war: 2, grief: 2, sacred: 2, grandeur: 2 }],
      ['The Count of Monte Cristo', '몬테크리스토 백작', 'モンテ・クリスト伯', '1844', 'Alexandre Dumas', '알렉상드르 뒤마', 'アレクサンドル・デュマ', 'Betrayal, a hidden treasure and the slowest revenge.', '배신, 숨겨진 보물, 그리고 가장 느린 복수.', '裏切り、隠された財宝、そして最も緩やかな復讐。', { drama: 3, heroic: 2, mystery: 2, opulence: 1, exotic: 1, water: 1 }],
      ['Frankenstein', '프랑켄슈타인', 'フランケンシュタイン', '1818', 'Mary Shelley', '메리 셸리', 'メアリー・シェリー', 'A creature born of science, longing for love among the ice.', '과학이 낳은 존재가 얼음 속에서 사랑을 갈망해요.', '科学が生んだ存在が、氷の中で愛を求めます。', { terror: 3, solitude: 2, cold: 2, darkness: 2, longing: 1, death: 1 }],
      ['Anna Karenina', '안나 카레니나', 'アンナ・カレーニナ', '1877', 'Leo Tolstoy', '레프 톨스토이', 'レフ・トルストイ', 'A forbidden love racing toward the station.', '기차역을 향해 내달리는 금지된 사랑.', '駅へと疾走する、禁じられた愛。', { love: 3, drama: 2, death: 2, sensual: 1, speed: 1, grief: 1 }],
      ['Madame Bovary', '보바리 부인', 'ボヴァリー夫人', '1857', 'Gustave Flaubert', '귀스타브 플로베르', 'ギュスターヴ・フローベール', 'Romantic dreams crashing into small-town life.', '낭만적인 꿈이 작은 마을의 일상과 부딪쳐요.', 'ロマンチックな夢が、田舎町の日常とぶつかります。', { longing: 3, melancholy: 2, sensual: 2, dream: 2, death: 1 }],
      ['Crime and Punishment', '죄와 벌', '罪と罰', '1866', 'Fyodor Dostoevsky', '표도르 도스토옙스키', 'フョードル・ドストエフスキー', 'A feverish mind wrestling with guilt in the summer streets.', '한여름 거리에서 죄책감과 씨름하는 열에 들뜬 영혼.', '夏の街で罪悪感と格闘する、熱に浮かされた心。', { contemplative: 3, darkness: 2, terror: 2, sacred: 2, solitude: 1 }],
      ['The Sorrows of Young Werther', '젊은 베르테르의 슬픔', '若きウェルテルの悩み', '1774', 'J. W. von Goethe', '요한 볼프강 폰 괴테', 'ゲーテ', 'Letters from a young heart drowning in an impossible love.', '이룰 수 없는 사랑에 잠겨 가는 젊은 마음의 편지들.', '叶わぬ恋に沈んでいく、若い心の手紙。', { longing: 3, melancholy: 3, love: 2, youth: 2, death: 2, nature: 1 }],
      ['The Hunchback of Notre-Dame', '노트르담의 꼽추', 'ノートルダム・ド・パリ', '1831', 'Victor Hugo', '빅토르 위고', 'ヴィクトル・ユゴー', 'Love and cruelty beneath the towers of a great cathedral.', '거대한 대성당 종탑 아래의 사랑과 잔혹함.', '大聖堂の塔の下の、愛と残酷さ。', { sacred: 2, grandeur: 2, love: 2, drama: 2, darkness: 1, tender: 1 }],
      ['Great Expectations', '위대한 유산', '大いなる遺産', '1861', 'Charles Dickens', '찰스 디킨스', 'チャールズ・ディケンズ', 'A boy, a mysterious fortune and a jilted bride’s stopped clocks.', '소년, 수수께끼의 재산, 그리고 멈춰 버린 신부의 시계.', '少年、謎の財産、止まった花嫁の時計。', { nostalgia: 2, mystery: 2, youth: 2, melancholy: 1, longing: 1 }],
      ['War and Peace', '전쟁과 평화', '戦争と平和', '1869', 'Leo Tolstoy', '레프 톨스토이', 'レフ・トルストイ', 'Ballrooms and battlefields as Napoleon sweeps into Russia.', '나폴레옹이 러시아로 밀려드는 시대의 무도회장과 전쟁터.', 'ナポレオンがロシアに迫る時代の、舞踏会と戦場。', { war: 3, grandeur: 3, dance: 1, love: 1, heroic: 1, contemplative: 1 }],
      ['Moby-Dick', '모비 딕', '白鯨', '1851', 'Herman Melville', '허먼 멜빌', 'ハーマン・メルヴィル', 'An obsessive hunt across the oceans for a white whale.', '흰 고래를 쫓아 대양을 가로지르는 집착의 항해.', '白い鯨を追って大洋を渡る、執念の航海。', { water: 3, storm: 2, mystery: 2, grandeur: 2, heroic: 1, death: 1 }],
      ['Dracula', '드라큘라', 'ドラキュラ', '1897', 'Bram Stoker', '브램 스토커', 'ブラム・ストーカー', 'Letters and diaries tracking a creature of the night.', '밤의 존재를 쫓는 편지와 일기들.', '夜の存在を追う、手紙と日記。', { terror: 3, night: 3, darkness: 2, mystery: 1, sensual: 1 }],
      ['The Phantom of the Opera', '오페라의 유령', 'オペラ座の怪人', '1910', 'Gaston Leroux', '가스통 르루', 'ガストン・ルルー', 'A masked genius haunting the Paris Opera.', '파리 오페라 극장을 떠도는 가면 쓴 천재.', 'パリのオペラ座に潜む、仮面の天才。', { mystery: 3, love: 2, darkness: 2, drama: 2, terror: 1 }],
      ['Alice’s Adventures in Wonderland', '이상한 나라의 앨리스', '不思議の国のアリス', '1865', 'Lewis Carroll', '루이스 캐럴', 'ルイス・キャロル', 'Down the rabbit hole into delightful nonsense.', '토끼굴 아래로, 유쾌한 엉뚱함의 세계로.', 'ウサギの穴の下、愉快なナンセンスの世界へ。', { fantasy: 3, humour: 3, dream: 2, youth: 2 }],
      ['Faust', '파우스트', 'ファウスト', '1808', 'J. W. von Goethe', '요한 볼프강 폰 괴테', 'ゲーテ', 'A scholar bargains his soul for knowledge and love.', '지식과 사랑을 위해 영혼을 건 학자의 거래.', '知と愛のために魂を賭けた学者の取引。', { myth: 2, mystery: 2, contemplative: 2, terror: 1, love: 1, sacred: 1 }],
      ['The Picture of Dorian Gray', '도리언 그레이의 초상', 'ドリアン・グレイの肖像', '1890', 'Oscar Wilde', '오스카 와일드', 'オスカー・ワイルド', 'A portrait ages while its beautiful owner never does.', '아름다운 주인은 늙지 않고 초상화만 늙어 가요.', '美しい持ち主は老いず、肖像画だけが老いていきます。', { youth: 3, sensual: 2, darkness: 2, elegance: 2, mystery: 2 }],
      ['Don Quixote', '돈키호테', 'ドン・キホーテ', '1605', 'Miguel de Cervantes', '미겔 데 세르반테스', 'ミゲル・デ・セルバンテス', 'A dreamer knight charging at windmills.', '풍차를 향해 돌진하는 몽상가 기사.', '風車に突進する夢見る騎士。', { humour: 3, heroic: 2, dream: 2, literature: 2, nostalgia: 1 }],
      ['Tess of the d’Urbervilles', '테스', 'テス', '1891', 'Thomas Hardy', '토머스 하디', 'トマス・ハーディ', 'A country girl crushed between fate and the English countryside.', '운명과 영국 시골 사이에서 짓눌리는 시골 처녀.', '運命とイングランドの田園のあいだで押しつぶされる娘。', { nature: 2, grief: 2, love: 2, youth: 1, death: 1, melancholy: 1 }],
      ['The Great Gatsby', '위대한 개츠비', 'グレート・ギャツビー', '1925', 'F. Scott Fitzgerald', 'F. 스콧 피츠제럴드', 'F・スコット・フィッツジェラルド', 'Glittering parties and a green light across the bay.', '반짝이는 파티와 만 건너편의 초록 불빛.', 'きらめくパーティーと、湾の向こうの緑の灯。', { opulence: 3, longing: 3, nostalgia: 2, dance: 1, water: 1, light: 1 }],
      ['Middlemarch', '미들마치', 'ミドルマーチ', '1871', 'George Eliot', '조지 엘리엇', 'ジョージ・エリオット', 'Quiet lives in a provincial town, seen with deep compassion.', '지방 소도시의 조용한 삶들을 깊은 연민으로 바라봐요.', '地方の町の静かな暮らしを、深い慈しみで見つめます。', { intimate: 2, contemplative: 2, restraint: 2, tender: 1, order: 1 }],
      ['Little Women', '작은 아씨들', '若草物語', '1868', 'Louisa May Alcott', '루이자 메이 올컷', 'ルイーザ・メイ・オルコット', 'Four sisters, one cosy home and growing up together.', '네 자매, 아늑한 집, 함께 자라는 시간.', '四姉妹、温かな家、ともに育つ時間。', { intimate: 3, youth: 2, tender: 2, joy: 1, nostalgia: 1 }],
      ['Peter Pan', '피터 팬', 'ピーター・パン', '1911', 'J. M. Barrie', '제임스 매슈 배리', 'J・M・バリー', 'The boy who never grows up, flying off to Neverland.', '자라지 않는 소년과 함께 네버랜드로 날아가요.', '大人にならない少年と、ネバーランドへ飛んでいきます。', { fantasy: 3, youth: 3, farewell: 1, tender: 1, night: 1, joy: 1 }],
    ];
    const MORE_IMG = {
      'Claude Monet': 'Monet_-_Impression,_Sunrise.jpg',
      'J. M. W. Turner': 'Turner_-_Rain,_Steam_and_Speed_-_National_Gallery_file.jpg',
      'Vincent van Gogh': 'Vincent_van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
      'Gustav Klimt': 'The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg',
      'Vilhelm Hammershøi': 'Vilhelm_Hammershøi_-_Interior_from_Strandgade_with_Sunlight_on_the_Floor.jpg',
      'Caspar David Friedrich': 'Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog.jpg',
      'John William Waterhouse': 'John_William_Waterhouse_-_The_Lady_of_Shalott_-_Google_Art_Project_edit.jpg',
      'Pierre-Auguste Renoir': 'Pierre-Auguste_Renoir,_Le_Moulin_de_la_Galette.jpg',
      'Edgar Degas': 'Edgar_Degas_-_The_Ballet_Class_-_Google_Art_Project.jpg',
      'Johannes Vermeer': 'Johannes_Vermeer_-_Girl_with_a_Pearl_Earring_-_670_-_Mauritshuis.jpg',
      'Rembrandt van Rijn': 'The_Night_Watch_-_HD.jpg',
      'Caravaggio': 'Caravaggio,_Michelangelo_Merisi_da_-_The_Calling_of_Saint_Matthew_-_1599-1600_(hi_res).jpg',
      'Francisco de Goya': 'El_Tres_de_Mayo,_by_Francisco_de_Goya,_from_Prado_thin_black_margin.jpg',
      'Eugène Delacroix': 'Eugène_Delacroix_-_Liberty_Leading_the_People.jpeg',
      'Sandro Botticelli': 'Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg',
      'Jean-Honoré Fragonard': 'Jean-Honoré_Fragonard_-_The_Swing_-_Google_Art_Project.jpg',
      'Antoine Watteau': "L'Embarquement_pour_Cythère,_by_Antoine_Watteau,_from_C2RMF_retouched.jpg",
      'Odilon Redon': 'Odilon_Redon_-_The_Cyclops,_c._1914.jpg',
      'Arnold Böcklin': 'Arnold_Böcklin_-_Die_Toteninsel_III_(Alte_Nationalgalerie,_Berlin).jpg',
      'Ivan Aivazovsky': 'Hovhannes_Aivazovsky_-_The_Ninth_Wave_-_Google_Art_Project.jpg',
      'Jacques-Louis David': 'Jacques-Louis_David_-_Oath_of_the_Horatii_-_Google_Art_Project.jpg',
      'J.-A.-D. Ingres': 'Jean_Auguste_Dominique_Ingres,_La_Grande_Odalisque,_1814.jpg',
      'John Constable': 'John_Constable_The_Hay_Wain.jpg',
      'Henri Rousseau': 'Henri_Rousseau_-_La_Bohémienne_endormie_-_Google_Art_Project.jpg',
      // novels: illustrations from early editions (artist in the comment)
      'Pride and Prejudice': 'PrideandPrejudiceCH3.jpg',                        // Hugh Thomson, 1894
      'Jane Eyre': 'P107b.jpg',                                                // F. H. Townsend, 1897
      'Les Misérables': 'Ebcosette.jpg',                                       // Émile Bayard, 1862
      'The Count of Monte Cristo': "COMC_V1_D107_Château_d'If.jpg",            // 1887 illustrated edition
      'Frankenstein': 'Frankenstein.1831.inside-cover.jpg',                    // Theodor von Holst, 1831
      'Anna Karenina': 'Anna_Karenina_Wrubel.jpg',                             // Mikhail Vrubel
      'Madame Bovary': 'Fourié_-_Madame_Bovary_4.jpeg',                        // Albert Fourié
      'Crime and Punishment': 'Klodt_Michail_Petrovich_-_Raskolnikov_and_Marmeladov.jpg', // Mikhail Klodt
      'The Sorrows of Young Werther': 'WertherLotte.jpg',
      'The Hunchback of Notre-Dame': 'Merson_-_the-hunchback-of-notre-dame-illustration.jpg', // Luc-Olivier Merson
      'Great Expectations': 'Dickens_Great_Expectations_title_page.jpg',
      'War and Peace': 'Ростова_пастернак.jpeg',                               // Leonid Pasternak
      'Moby-Dick': 'Moby_Dick_final_chase.jpg',                                // I. W. Taber, 1902
      'Dracula': 'Dracula1st.jpeg',                                            // first edition, 1897
      'The Phantom of the Opera': 'André_Castaigne_-_The_Phantom_of_the_Opera_-_She_staggered_swooning_(1911).jpg',
      'Alice’s Adventures in Wonderland': 'Alice_par_John_Tenniel_25.png',     // John Tenniel, 1865
      'Faust': 'Eugène_Delacroix_-_Mephistopheles_in_the_Sky_-_Google_Art_Project.jpg', // Delacroix, 1828
      'The Picture of Dorian Gray': 'From_The_Picture_of_Dorian_Gray_by_Eugène_Dété_after_Thiriat.png',
      'Don Quixote': 'Gustav_Dore_-_Don_Quixote.jpg',                          // Gustave Doré, 1863
      'Tess of the d’Urbervilles': "Hardy_-_Tess_d'Urbervilles,_1891_-_3657925F.jpg",
      'The Great Gatsby': 'The_Great_Gatsby_Cover_1925_Retouched.jpg',         // Francis Cugat, 1925
      'Middlemarch': 'Middlemarch_1.jpg',
      'Little Women': 'Little_Women_-_part_2_frontispiece.png',
      'Peter Pan': 'Peter_pan_1911_pipes.jpg',                                 // F. D. Bedford, 1911
    };
    // Each keyword read as a good quality the visitor carries today: [en, ko, ja]
    const MORE_GIFT = {
      darkness: ['depth', '깊이', '深み'], light: ['sparkle', '반짝임', 'きらめき'], night: ['romance', '낭만', 'ロマン'],
      melancholy: ['sensitivity', '섬세함', '繊細さ'], grief: ['compassion', '연민', '思いやり'], death: ['reflection', '성찰', '内省'],
      terror: ['boldness', '담대함', '大胆さ'], war: ['a sense of justice', '정의감', '正義感'], storm: ['energy', '에너지', 'エネルギー'],
      speed: ['drive', '추진력', '推進力'], dance: ['rhythm', '리듬감', 'リズム感'], joy: ['joy', '기쁨', '喜び'],
      humour: ['wit', '재치', 'ユーモア'], love: ['love', '사랑', '愛'], longing: ['longing', '그리움', '憧れ'],
      nostalgia: ['fond memories', '추억', '思い出'], farewell: ['a lingering warmth', '여운', '余韻'], tender: ['tenderness', '다정함', '優しさ'],
      intimate: ['warmth', '따뜻함', 'ぬくもり'], solitude: ['quiet strength', '단단함', '芯の強さ'], serene: ['calm', '평온', '穏やかさ'],
      contemplative: ['thoughtfulness', '사색', '思索'], sacred: ['reverence', '경건함', '敬虔さ'], grandeur: ['big dreams', '포부', '大きな志'],
      heroic: ['courage', '용기', '勇気'], elegance: ['grace', '우아함', '優雅さ'], opulence: ['abundance', '풍요로움', '豊かさ'],
      restraint: ['poise', '절제', '節度'], order: ['balance', '균형감', 'バランス感覚'], nature: ['ease', '여유', 'ゆとり'],
      water: ['flexibility', '유연함', 'しなやかさ'], cold: ['clarity', '투명함', '透明感'], myth: ['wonder', '신비로움', '神秘'],
      fantasy: ['imagination', '상상력', '想像力'], dream: ['dreams', '꿈', '夢'], literature: ['a feel for stories', '감수성', '感受性'],
      drama: ['passion', '열정', '情熱'], exotic: ['curiosity', '호기심', '好奇心'], sensual: ['rich senses', '감각', '感性'],
      youth: ['innocence', '순수함', '純粋さ'], mystery: ['a seeker’s mind', '탐구심', '探究心'],
    };
    // Korean particles that depend on a final consonant (와/과, 을/를)
    const hasJong = w => { const c = w.charCodeAt(w.length - 1); return c >= 0xAC00 && c <= 0xD7A3 && (c - 0xAC00) % 28 !== 0; };
    function moreSubLine(prof) {
      const t = I18N[lang], li3 = lang === 'ja' ? 2 : lang === 'ko' ? 1 : 0, picked = [];
      Object.entries(prof).sort((a, b) => b[1] - a[1]).forEach(([tg]) => {
        const g = MORE_GIFT[tg]; if (g && picked.length < 2 && !picked.includes(g[li3])) picked.push(g[li3]);
      });
      if (!picked.length) return t.moreSub;
      const [a, b] = picked;
      if (lang === 'ko') return b
        ? a + (hasJong(a) ? '과' : '와') + ' ' + b + (hasJong(b) ? '을' : '를') + ' 마음 가득 품은 오늘, 함께 만나면 좋을 서양화가와 고전 소설도 골라 봤어요.'
        : a + (hasJong(a) ? '을' : '를') + ' 마음 가득 품은 오늘, 함께 만나면 좋을 서양화가와 고전 소설도 골라 봤어요.';
      if (lang === 'ja') return (b ? a + 'と' + b : a) + 'で心が満ちている今日に、一緒に出会いたい西洋画家と古典小説も選んでみました。';
      return 'On a day when your heart is full of ' + (b ? a + ' and ' + b : a) + ', here are painters and classic novels to keep you company.';
    }
    let moreOpen = false;

    // ---------- Today's concerts & exhibitions ----------
    // LIVE: point EVENTS_ENDPOINT at the small proxy in events-proxy.js (it holds the API keys and returns
    // [{kind:'concert'|'exhibition', title, start:'YYYY-MM-DD', end, place, area, image, url}]).
    // Empty = clearly-labelled sample listings, so the pilot can be shown before the keys are issued.
    const EVENTS_ENDPOINT = 'https://yummy-events.hyveritas.workers.dev';
    // Keywords read from an event's title: era (for "matches / stretches your taste"), feeling tags, a name for the praise line
    const EV_KW = [
      [/베토벤|beethoven/i, 'classic', { heroic: 2, storm: 2, drama: 1 }, ['Beethoven', '베토벤', 'ベートーヴェン']],
      [/모차르트|mozart/i, 'classic', { elegance: 2, joy: 2, humour: 1 }, ['Mozart', '모차르트', 'モーツァルト']],
      [/하이든|haydn/i, 'classic', { order: 2, joy: 1, humour: 1 }, ['Haydn', '하이든', 'ハイドン']],
      [/바흐|bach/i, 'classic', { order: 2, sacred: 2, contemplative: 1 }, ['Bach', '바흐', 'バッハ']],
      [/헨델|handel/i, 'classic', { grandeur: 2, sacred: 1, joy: 1 }, ['Handel', '헨델', 'ヘンデル']],
      [/비발디|vivaldi/i, 'classic', { nature: 2, joy: 1, storm: 1 }, ['Vivaldi', '비발디', 'ヴィヴァルディ']],
      [/렘브란트|베르메르|페르메이르|카라바조|rembrandt|vermeer|caravaggio/i, 'classic', { light: 2, darkness: 2, intimate: 1 }, ['the Baroque masters', '바로크 거장', 'バロックの巨匠']],
      [/바로크|baroque/i, 'classic', { opulence: 1, order: 1, light: 1 }, ['the Baroque', '바로크', 'バロック']],
      [/신고전|고전주의|고전파|neoclassic/i, 'classic', { order: 2, restraint: 1, heroic: 1 }, ['Classicism', '고전주의', '古典主義']],
      [/쇼팽|chopin/i, 'romantic', { longing: 2, melancholy: 2, tender: 1, night: 1 }, ['Chopin', '쇼팽', 'ショパン']],
      [/슈베르트|schubert/i, 'romantic', { intimate: 2, longing: 2, nostalgia: 1 }, ['Schubert', '슈베르트', 'シューベルト']],
      [/슈만|schumann/i, 'romantic', { love: 2, dream: 1, tender: 1 }, ['Schumann', '슈만', 'シューマン']],
      [/브람스|brahms/i, 'romantic', { melancholy: 1, tender: 1, restraint: 1, grandeur: 1 }, ['Brahms', '브람스', 'ブラームス']],
      [/리스트|liszt/i, 'romantic', { drama: 2, opulence: 1, love: 1 }, ['Liszt', '리스트', 'リスト']],
      [/차이콥스키|차이코프스키|tchaikovsky/i, 'romantic', { drama: 2, love: 2, grief: 1 }, ['Tchaikovsky', '차이콥스키', 'チャイコフスキー']],
      [/라흐마니노프|rachmaninoff/i, 'romantic', { longing: 2, melancholy: 2, grandeur: 1 }, ['Rachmaninoff', '라흐마니노프', 'ラフマニノフ']],
      [/멘델스존|mendelssohn/i, 'romantic', { fantasy: 1, joy: 1, water: 1 }, ['Mendelssohn', '멘델스존', 'メンデルスゾーン']],
      [/오페라|opera/i, 'romantic', { drama: 2, love: 2 }, ['opera', '오페라', 'オペラ']],
      [/낭만|romantic/i, 'romantic', { love: 1, longing: 1, drama: 1 }, ['Romanticism', '낭만주의', 'ロマン主義']],
      [/드뷔시|debussy/i, 'impression', { water: 2, dream: 2, light: 1 }, ['Debussy', '드뷔시', 'ドビュッシー']],
      [/인상주의|인상파|모네|르누아르|monet|renoir|impression/i, 'impression', { light: 3, nature: 2, serene: 1 }, ['Impressionism', '인상주의', '印象派']],
      [/고흐|gogh/i, 'impression', { night: 2, longing: 2, solitude: 1 }, ['Van Gogh', '고흐', 'ゴッホ']],
      [/사랑|love/i, null, { love: 2 }, null], [/밤|녹턴|nocturne|night/i, null, { night: 2, dream: 1 }, null],
      [/봄|spring/i, null, { nature: 2, joy: 1 }, null], [/가을|autumn/i, null, { nostalgia: 2, melancholy: 1 }, null],
      [/겨울|winter/i, null, { cold: 2 }, null], [/바다|sea/i, null, { water: 2 }, null],
      [/레퀴엠|추모|requiem/i, null, { grief: 2, sacred: 1 }, null], [/영웅|hero/i, null, { heroic: 2 }, null],
      [/환상|판타지|fantas/i, null, { fantasy: 2 }, null], [/꿈|dream/i, null, { dream: 2 }, null], [/빛|light/i, null, { light: 2 }, null],
      [/교향|심포니|오케스트라|필하모닉|symphon|orchestra/i, null, { grandeur: 2, heroic: 1 }, ['a full orchestra', '오케스트라의 울림', 'オーケストラの響き']],
      [/리사이틀|독주|recital/i, null, { intimate: 2, contemplative: 1 }, ['a solo recital', '독주 무대', 'ソロ・リサイタル']],
      [/실내악|콰르텟|사중주|트리오|앙상블|quartet|ensemble/i, null, { intimate: 2, elegance: 1 }, ['chamber music', '실내악', '室内楽']],
      [/피아노|piano/i, null, { tender: 1, intimate: 1 }, ['the piano', '피아노', 'ピアノ']],
      [/바이올린|첼로|비올라|violin|cello/i, null, { longing: 1, tender: 1 }, ['strings', '현악기의 노래', '弦の歌']],
      [/합창|성악|가곡|choir|lieder/i, null, { sacred: 1, tender: 1 }, ['the human voice', '사람의 목소리', '人の声']],
      [/특별전|기획전|special/i, null, { opulence: 1, contemplative: 1 }, ['this special exhibition', '이번 특별전', '今回の特別展']],
      [/사진|photo/i, null, { light: 2, nostalgia: 1 }, ['photography', '사진', '写真']],
      [/조각|sculpt/i, null, { order: 1, restraint: 1 }, ['sculpture', '조각', '彫刻']],
      [/한국화|수묵|서예|민화/, null, { serene: 2, restraint: 1, nature: 1 }, ['ink and brush', '먹과 붓의 세계', '墨と筆の世界']],
      [/공예|도자|craft|ceramic/i, null, { intimate: 1, elegance: 1 }, ['craft', '공예', '工芸']],
      [/미디어|디지털|media|digital/i, null, { light: 2, fantasy: 1 }, ['media art', '미디어아트', 'メディアアート']],
      [/근대|modern/i, null, { nostalgia: 2 }, ['modern art', '근대 미술', '近代美術']],
      [/현대미술|contemporary/i, null, { mystery: 1, contemplative: 1 }, ['contemporary art', '현대미술', '現代美術']],
      [/풍경|자연|정원|landscape|garden/i, null, { nature: 2, serene: 1 }, ['landscapes', '풍경', '風景']],
    ];
    // Sample listings (shown only while EVENTS_ENDPOINT is empty; titles say so)
    const EV_SAMPLE = [
      ['concert', '[샘플] 베토벤 교향곡의 밤', 'Sample · Beethoven symphony night', '[サンプル] ベートーヴェン交響曲の夜', 0, 1, 'Jacques-Louis_David_-_Oath_of_the_Horatii_-_Google_Art_Project.jpg'],
      ['exhibition', '[샘플] 인상주의, 빛의 순간', 'Sample · Impressionism: moments of light', '[サンプル] 印象派、光の瞬間', -20, 40, 'Monet_-_Impression,_Sunrise.jpg'],
      ['concert', '[샘플] 쇼팽 녹턴 리사이틀', 'Sample · Chopin nocturnes recital', '[サンプル] ショパン ノクターン・リサイタル', 2, 2, 'John_Everett_Millais_-_Ophelia_-_Google_Art_Project.jpg'],
      ['exhibition', '[샘플] 바로크 거장전 — 빛과 그림자', 'Sample · Baroque masters: light and shadow', '[サンプル] バロックの巨匠展 — 光と影', -10, 50, 'Caravaggio,_Michelangelo_Merisi_da_-_The_Calling_of_Saint_Matthew_-_1599-1600_(hi_res).jpg'],
      ['concert', '[샘플] 모차르트 실내악 시리즈', 'Sample · Mozart chamber series', '[サンプル] モーツァルト室内楽シリーズ', 4, 4, 'Jean-Honoré_Fragonard_-_The_Swing_-_Google_Art_Project.jpg'],
      ['exhibition', '[샘플] 낭만주의 풍경화전', 'Sample · Romantic landscapes', '[サンプル] ロマン主義風景画展', -5, 30, 'Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog.jpg'],
      ['concert', '[샘플] 차이콥스키 & 라흐마니노프의 밤', 'Sample · Tchaikovsky & Rachmaninoff night', '[サンプル] チャイコフスキー＆ラフマニノフの夜', 6, 6, 'Francesco_Hayez_-_The_Kiss_-_WGA11218.jpg'],
      ['exhibition', '[샘플] 고흐, 별이 빛나는 밤', 'Sample · Van Gogh: the starry night', '[サンプル] ゴッホ、星月夜', 0, 60, 'Vincent_van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg'],
      ['concert', '[샘플] 바흐 무반주 첼로 모음곡', 'Sample · Bach cello suites', '[サンプル] バッハ 無伴奏チェロ組曲', 9, 9, 'Johannes_Vermeer_-_Girl_with_a_Pearl_Earring_-_670_-_Mauritshuis.jpg'],
      ['concert', '[샘플] 드뷔시와 라벨, 물의 음악', 'Sample · Debussy & Ravel: music of water', '[サンプル] ドビュッシーとラヴェル、水の音楽', 11, 11, 'Turner_-_Rain,_Steam_and_Speed_-_National_Gallery_file.jpg'],
    ];
    let evData = null, evSample = false, evOpen = false, evLoading = null;
    // Which list comes first: 'kr' (대한민국 공연·전시) or 'intl' (글로벌 공연). Default by page language; a tap is remembered.
    let evScopeSaved = (() => { try { const v = localStorage.getItem('yc-ev-scope'); return v === 'kr' || v === 'intl' ? v : ''; } catch (e) { return ''; } })();
    const evScope = () => evScopeSaved || (lang === 'ko' ? 'kr' : 'intl');
    const peekOpen = { kr: false, intl: false }, peekCount = { kr: 0, intl: 0 };
    const isPeek = k => evScope() !== k && !peekOpen[k];
    function renderScope() {
      const t = I18N[lang], sc = evScope();
      document.querySelectorAll('#ev-scope [data-scope]').forEach(b => b.setAttribute('aria-selected', String(b.dataset.scope === sc)));
      const panes = document.getElementById('ev-panes'), kr = document.getElementById('ev-kr'), it = document.getElementById('intl');
      if (!panes) return;
      const [first, second] = sc === 'kr' ? [kr, it] : [it, kr];
      if (panes.firstElementChild !== first) panes.insertBefore(first, panes.firstElementChild);
      [['kr', kr], ['intl', it]].forEach(([k, el]) => {
        const other = k !== sc;
        el.classList.toggle('peek', isPeek(k));
        el.classList.toggle('ev-other', other);
        const head = el.querySelector('.ev-peek-head'), btn = el.querySelector('.ev-peek-btn');
        head.hidden = !other;
        btn.textContent = peekOpen[k] ? t.evPeekLess : peekCount[k] ? t.evPeekMore.replace('{n}', peekCount[k]) : t.evPeekOpen;
        btn.setAttribute('aria-expanded', String(peekOpen[k]));
      });
      void second;
    }
    document.querySelectorAll('#ev-scope [data-scope]').forEach(b => b.addEventListener('click', () => {
      evScopeSaved = b.dataset.scope; peekOpen.kr = peekOpen.intl = false;
      try { localStorage.setItem('yc-ev-scope', evScopeSaved); } catch (e) {}
      renderEvents(); renderIntl();
    }));
    document.querySelectorAll('.ev-peek-btn').forEach(b => b.addEventListener('click', () => {
      const k = b.dataset.pane; peekOpen[k] = !peekOpen[k];
      if (k === 'kr') renderEvents(); else renderIntl();
    }));
    // Regions: [ko, en, ja, matcher]
    const EV_REGIONS = [
      ['서울', 'Seoul', 'ソウル', /서울|Seoul/], ['경기', 'Gyeonggi', '京畿', /경기/], ['인천', 'Incheon', '仁川', /인천/],
      ['부산', 'Busan', '釜山', /부산/], ['대구', 'Daegu', '大邱', /대구/], ['광주', 'Gwangju', '光州', /광주광역|^광주/],
      ['대전', 'Daejeon', '大田', /대전/], ['울산', 'Ulsan', '蔚山', /울산/], ['세종', 'Sejong', '世宗', /세종/],
      ['강원', 'Gangwon', '江原', /강원/], ['충북', 'Chungbuk', '忠北', /충북|충청북/], ['충남', 'Chungnam', '忠南', /충남|충청남/],
      ['전북', 'Jeonbuk', '全北', /전북|전라북/], ['전남', 'Jeonnam', '全南', /전남|전라남/], ['경북', 'Gyeongbuk', '慶北', /경북|경상북/],
      ['경남', 'Gyeongnam', '慶南', /경남|경상남/], ['제주', 'Jeju', '済州', /제주/],
    ];
    let evRegion = (() => { try { return localStorage.getItem('yc-region') || ''; } catch (e) { return ''; } })();
    // sort: 'pop' = 인기순 (default), 'date' = 가까운 날짜순; the choice is remembered on this device
    let evSort = (() => { try { return localStorage.getItem('yc-ev-sort') === 'date' ? 'date' : 'pop'; } catch (e) { return 'pop'; } })();
    const evAreaText = e => (Array.isArray(e.area) ? e.area[1] : (e.area || '')) + ' ' + (Array.isArray(e.place) ? e.place[1] : (e.place || ''));
    const evRegionOf = e => { const a = evAreaText(e).trim(); const r = EV_REGIONS.find(x => x[3].test(a)); return r ? r[0] : ''; };
    const isoDay = off => new Date(Date.now() + off * 864e5 + 9 * 36e5).toISOString().slice(0, 10);   // Korea time
    function loadEvents() {
      if (evLoading) return evLoading;
      const sample = () => { evSample = true; return EV_SAMPLE.map(x => ({ kind: x[0], title: x[1], titleEn: x[2], titleJa: x[3], start: isoDay(x[4]), end: isoDay(x[5]), place: ['Sample venue', '샘플 공연장·미술관', 'サンプル会場'], area: ['Seoul', '서울', 'ソウル'], file: x[6], url: '' })); };
      const keep = l => { try { localStorage.setItem(EV_STORE, JSON.stringify({ at: Date.now(), items: l })); } catch (e) {} return l; };
      // a phone on a weak signal can stall: give up after 12 s instead of waiting forever
      const timed = (pr, ms) => Promise.race([pr, new Promise((_, no) => setTimeout(() => no('timeout'), ms))]);
      const fresh = !EVENTS_ENDPOINT ? Promise.resolve(sample())
        : timed(fetch(EVENTS_ENDPOINT, { cache: 'no-store' }), 12000).then(r => r.ok ? r.json() : Promise.reject(r.status)).then(j => { const l = (j.items || j || []).filter(e => e && e.title); return l.length ? keep(l) : Promise.reject('empty'); });
      // the list saved on this phone last time (up to 12 hours old) shows at once; the fresh one replaces it when it arrives
      const saved = (() => { try { const o = JSON.parse(localStorage.getItem(EV_STORE) || 'null'); return o && Date.now() - o.at < 12 * 36e5 && o.items && o.items.length ? o.items : null; } catch (e) { return null; } })();
      if (saved && EVENTS_ENDPOINT) {
        fresh.then(l => { evData = l; evSample = false; if (currentEra) renderEvents(); }).catch(() => {});
        evLoading = Promise.resolve(saved);
      } else evLoading = fresh.catch(() => sample());
      return evLoading.then(d => { evData = d; return d; });
    }
    const EV_STORE = 'yc-events-v1';
    // Translations of Korean event titles for the EN/JA pages (site worker /api/translate), kept on this device
    const TR = { en: null, ja: null }, trAsked = { en: new Set(), ja: new Set() };
    const trLoad = l => { if (!TR[l]) { try { TR[l] = JSON.parse(localStorage.getItem('yc-tr-' + l) || '{}') || {}; } catch (e) { TR[l] = {}; } } return TR[l]; };
    const trGet = text => (lang === 'en' || lang === 'ja') ? trLoad(lang)[text] || '' : '';
    function trFetch(texts) {
      const l = lang; if (l !== 'en' && l !== 'ja') return;
      const need = texts.filter(t => !trAsked[l].has(t)).slice(0, 30);
      if (!need.length) return;
      need.forEach(t => trAsked[l].add(t));
      fetch('/api/translate', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ to: l, texts: need }) })
        .then(r => r.ok ? r.json() : Promise.reject(r.status))
        .then(j => {
          const m = j && j.map || {}; if (!Object.keys(m).length) return;
          const store = trLoad(l); Object.assign(store, m);
          try { localStorage.setItem('yc-tr-' + l, JSON.stringify(store)); } catch (e) {}
          if (lang === l && currentEra) renderEvents();
        }).catch(() => {});
    }
    function readEvent(e) {
      const tags = {}; let era = null, hook = null;
      EV_KW.forEach(([re, er, tg, lb]) => {
        if (!re.test(e.title + ' ' + (e.titleEn || ''))) return;
        Object.entries(tg).forEach(([t, w]) => { tags[t] = (tags[t] || 0) + w; });
        if (er && !era) era = er; if (lb && !hook) hook = lb;
      });
      return { tags, era, hook };
    }
    function rankEvents(list, prof, max) {
      max = max || 7;
      const today = isoDay(0);
      const rows = list.filter(e => !e.end || e.end >= today).map(e => {
        const r = readEvent(e); let s = 0; const parts = [];
        Object.entries(r.tags).forEach(([t, w]) => { if (prof[t]) { s += prof[t] * w; parts.push([t, prof[t] * w]); } });
        parts.sort((a, b) => b[1] - a[1]);
        const fit = r.era ? r.era === currentEra : s > 0;
        return Object.assign({ e, s: s + (fit ? 2 : 0) + (e.start <= today ? 0.5 : 0), fit, why: parts.slice(0, 2).map(x => x[0]) }, r);
      });
      const fits = rows.filter(r => r.fit).sort((a, b) => b.s - a.s), stretch = rows.filter(r => !r.fit).sort((a, b) => b.s - a.s);
      const out = [];
      if (fits.length) out.push(fits.shift()); else if (stretch.length) out.push(stretch.shift());
      // the rest alternates "matches" and "stretches" so the list never reads like a sales push
      while (out.length < max && (fits.length || stretch.length)) {
        const wantStretch = out.length % 2 === 0;
        out.push((wantStretch ? stretch : fits).shift() || (wantStretch ? fits : stretch).shift());
      }
      return out;
    }
    // One line of praise per event: a quality from today's picks + what this event offers.
    // Several sentence shapes, chosen by position, so a column never repeats the same line.
    function evPraise(r, gift, k) {
      const ko = lang === 'ko', ja = lang === 'ja', li3 = ja ? 2 : ko ? 1 : 0;
      const ex = r.e.kind === 'exhibition';
      const hook = r.hook ? r.hook[li3] : (ex ? (ko ? '이 전시' : ja ? 'この展示' : 'this exhibition') : (ko ? '이 무대' : ja ? 'この舞台' : 'this concert'));
      k = k || 0;
      if (ko) {
        const g = gift || '오늘 고르신 그림의 결', eul = gift ? (hasJong(gift) ? '을' : '를') : '을', i = gift ? (hasJong(gift) ? '이' : '가') : '이';
        const fit = [
          `${g}${eul} 품은 오늘의 당신에게, ${hook}의 결이 그대로 이어질 거예요.`,
          `오늘 그림에서 ${g}${eul} 먼저 알아본 눈이라면, ${hook}에서도 그걸 금방 찾아낼 거예요.`,
          `${g}${i} 빛나는 오늘, ${hook}${hasJong(hook) ? '이' : '가'} 그 마음에 꼭 맞을 거예요.`,
        ];
        const stretch = [
          `${g}${eul} 알아보는 당신이라면, ${hook}${roKo(hook)} 취향을 한 뼘 넓혀 보기 좋은 날이에요.`,
          `${g}${eul} 가진 사람은 낯선 것에서도 좋은 걸 찾아내요. ${hook}에서 그 감각을 한번 써 보세요.`,
          `오늘의 ${g}${roKo(g)} 보면, ${hook}도 의외로 잘 맞을 거예요.`,
        ];
        return (r.fit ? fit : stretch)[k % 3];
      }
      if (ja) {
        const g = gift || '今日選んだ絵の味わい';
        const fit = [`${g}を抱く今日のあなたに、${hook}の味わいがそのままつながります。`, `絵の中で${g}に先に気づいたあなたなら、${hook}でもすぐに見つけられるはず。`, `${g}が光る今日、${hook}はその気持ちにぴったり寄り添ってくれます。`];
        const stretch = [`${g}に気づけるあなたなら、${hook}で好みを少し広げるのにぴったりの日です。`, `${g}を持つ人は、見慣れないものの中にも良さを見つけます。${hook}でその感覚を試してみて。`, `今日の${g}なら、${hook}も意外とよく合うはずです。`];
        return (r.fit ? fit : stretch)[k % 3];
      }
      const g = gift || 'the feeling of today’s picks';
      const fit = [`With ${g} in your heart today, ${hook} will feel like a natural next step.`, `An eye that found ${g} in today’s paintings will find it in ${hook} too.`, `On a day full of ${g}, ${hook} will meet you right where you are.`];
      const stretch = [`Your eye for ${g} makes today a good day to stretch toward ${hook}.`, `People with ${g} find something good even in the unfamiliar. Try it on ${hook}.`, `With today’s ${g}, ${hook} may suit you better than you expect.`];
      return (r.fit ? fit : stretch)[k % 3];
    }
    function renderEvents() {
      const box = document.getElementById('events');
      if (!box || !currentEra) return;
      if (!evData) {
        // show that the lists are on their way, then draw them when they arrive
        ['ev-concerts', 'ev-exhibits'].forEach(id => { const ul = document.getElementById(id); if (ul && !ul.children.length) ul.innerHTML = '<li class="ev-empty">' + (I18N[lang].evLoading || '…') + '</li>'; });
        loadEvents().then(() => { if (currentEra) renderEvents(); });
        return;
      }
      const t = I18N[lang], ko = lang === 'ko', ja = lang === 'ja', li3 = ja ? 2 : ko ? 1 : 0;
      const prof = todayProfile();
      const gifts = []; Object.entries(prof).sort((a, b) => b[1] - a[1]).forEach(([tg]) => { const g = MORE_GIFT[tg]; if (g && gifts.length < 3 && !gifts.includes(g[li3])) gifts.push(g[li3]); });
      const sub = document.getElementById('ev-sub');
      if (gifts.length) {
        const a = gifts[0], b = gifts[1];
        const g = ko ? (b ? a + (hasJong(a) ? '과' : '와') + ' ' + b + (hasJong(b) ? '을' : '를') : a + (hasJong(a) ? '을' : '를')) : (b ? a + (ja ? 'と' : ' and ') + b : a);
        sub.textContent = t.evSub1.replace('{g}', g);
      } else sub.textContent = t.evSub0;
      const note = document.getElementById('ev-note'); note.hidden = !evSample; note.textContent = t.evSample;
      const today0 = isoDay(0);
      const live = evData.filter(e => !e.end || e.end >= today0);
      // region chips: only regions that have something on, busiest first after "All"
      const counts = {}; live.forEach(e => { const r = evRegionOf(e); if (r) counts[r] = (counts[r] || 0) + 1; });
      if (evRegion && !counts[evRegion]) evRegion = '';
      const areas = document.getElementById('ev-areas'); areas.innerHTML = '';
      const chip = (val, label, n) => {
        const b = document.createElement('button'); b.type = 'button'; b.className = 'ev-area';
        b.setAttribute('aria-pressed', String(evRegion === val)); b.textContent = label;
        if (n) { const sm = document.createElement('small'); sm.textContent = n; b.appendChild(sm); }
        b.addEventListener('click', () => { evRegion = val; evOpen = false; try { localStorage.setItem('yc-region', val); } catch (e) {} renderEvents(); });
        areas.appendChild(b);
      };
      chip('', t.evAll, live.length);
      EV_REGIONS.filter(r => counts[r[0]]).sort((x, y) => counts[y[0]] - counts[x[0]])
        .forEach(r => chip(r[0], r[ja ? 2 : ko ? 0 : 1], counts[r[0]]));
      areas.hidden = Object.keys(counts).length < 2;

      const inRegion = isPeek('kr') ? live : evRegion ? live.filter(e => evRegionOf(e) === evRegion) : live;
      peekCount.kr = live.length; renderScope();
      const SHOW = isPeek('kr') ? 1 : evOpen ? 20 : 4;
      const cols = [
        ['concert', document.getElementById('ev-concerts'), t.evNoConcert],
        ['exhibition', document.getElementById('ev-exhibits'), t.evNoExhibit],
      ];
      let hiddenCount = 0;
      const trWant = new Set();
      cols.forEach(([kind, ul, emptyMsg], ci) => {
        ul.innerHTML = '';
        let ranked = rankEvents(inRegion.filter(e => e.kind === kind), prof, 20);
        // 가까운 날짜순: days until the run starts (0 if already on), then popularity
        if (evSort === 'date') {
          const gap = e => e.start > today0 ? (Date.parse(e.start) - Date.parse(today0)) / 864e5 : 0;
          ranked = ranked.slice().sort((a, b) => (gap(a.e) - gap(b.e)) || (b.s - a.s));
        }
        if (!ranked.length) { const li = document.createElement('li'); li.className = 'ev-empty'; li.textContent = emptyMsg; ul.appendChild(li); return; }
        hiddenCount += Math.max(0, ranked.length - 4);
        ranked.slice(0, SHOW).forEach((r, i) => {
          const e = r.e, li = document.createElement('li');
          li.className = 'more-item';
          const tr = ko ? '' : (ja ? e.titleJa : e.titleEn) || trGet(e.title);
          const title = tr ? e.title + ' (' + tr + ')' : e.title;
          if (!ko && !tr) trWant.add(e.title);
          const mono = document.createElement('span'); mono.className = 'mono'; mono.textContent = e.kind === 'exhibition' ? (ko ? '전' : ja ? '展' : 'E') : (ko ? '공' : ja ? '公' : 'C');
          let lead = mono;
          if (e.file || e.image) {
            const pic = document.createElement('span'); pic.className = 'pic';
            const im = document.createElement('img'); im.alt = title; im.referrerPolicy = 'no-referrer'; im.loading = 'lazy'; im.decoding = 'async';
            if (e.file) { im.addEventListener('imgfail', () => pic.replaceWith(mono)); setImgSrc(im, e.file, 330); }
            else { im.onerror = () => pic.replaceWith(mono); im.src = String(e.image).replace(/^http:/, 'https:'); }
            pic.appendChild(im); lead = pic;
          }
          const body = document.createElement('div'); body.className = 'min-w-0 flex-1';
          const nm = document.createElement('span'); nm.className = 'nm';
          if (e.kind === 'exhibition') {
            const place = Array.isArray(e.place) ? e.place[1] : (e.place || '');
            const sk = /특별전|기획전|special/i.test(e.title) ? t.evSpecial : /미술관|museum|갤러리|gallery/i.test(place) ? t.evMuseum : '';
            if (sk) { const b2 = document.createElement('span'); b2.className = 'ev-sub-kind'; b2.textContent = sk; nm.appendChild(b2); }
          }
          nm.appendChild(document.createTextNode(title));
          // '곧 마감' badge: the run ends within 3 days (shown as a badge, not as a sort)
          if (e.end && Date.parse(e.end) - Date.parse(today0) <= 3 * 864e5 && e.end >= today0) {
            const soon = document.createElement('span'); soon.className = 'ev-soon'; soon.textContent = t.evSoon; nm.appendChild(soon);
          }
          const md = d => d ? d.slice(5).replace('-', '.') : '';
          const sb = document.createElement('span'); sb.className = 'sub';
          sb.textContent = [e.start === e.end ? md(e.start) : md(e.start) + ' – ' + md(e.end), Array.isArray(e.place) ? e.place[li3] : e.place, Array.isArray(e.area) ? e.area[li3] : e.area].filter(Boolean).join(' · ');
          // one line of praise: a quality from today's picks + what this event offers
          const ds = document.createElement('span'); ds.className = 'ds';
          ds.textContent = evPraise(r, gifts.length ? gifts[(i + ci) % gifts.length] : '', i + ci);
          const ch = document.createElement('span'); ch.className = 'chips';
          const fb = document.createElement('span'); fb.className = 'ev-fit' + (r.fit ? '' : ' stretch'); fb.textContent = r.fit ? t.evFit : t.evStretch; ch.appendChild(fb);
          r.why.forEach(w => { const c = document.createElement('span'); c.className = 'why-chip'; c.textContent = tagLabel(w); ch.appendChild(c); });
          if (!evSample) {
            const a = document.createElement('a'); a.className = 'lk'; a.target = '_blank'; a.rel = 'noopener noreferrer';
            const plc = Array.isArray(e.place) ? e.place[1] : (e.place || '');
            a.href = e.url || 'https://search.naver.com/search.naver?query=' + encodeURIComponent(e.title + ' ' + plc);
            a.textContent = t.evLink; ch.appendChild(a);
          }
          body.append(nm, sb, ds, ch);
          li.append(lead, body); ul.appendChild(li);
        });
      });
      document.querySelectorAll('#ev-sorts [data-sort]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.sort === evSort)));
      if (trWant.size) trFetch([...trWant]);
      const tg = document.getElementById('ev-toggle');
      tg.hidden = hiddenCount === 0;
      tg.textContent = evOpen ? t.evLess : t.evMore.replace('{n}', hiddenCount);
      tg.setAttribute('aria-expanded', String(evOpen));
    }
    document.getElementById('ev-toggle').addEventListener('click', () => { evOpen = !evOpen; renderEvents(); });

    // ---------- Int'l Concert Info (Ticketmaster Discovery API via /api/intl-concerts) ----------
    // The same option on every language page; the site worker holds the key and caches each country for 6 hours.
    const INTL_ENDPOINT = '/api/intl-concerts';
    // [code, en, ko, ja]
    const INTL_COUNTRIES = [['US', 'USA', '미국', 'アメリカ'], ['GB', 'UK', '영국', 'イギリス'], ['DE', 'Germany', '독일', 'ドイツ'],
      ['FR', 'France', '프랑스', 'フランス'], ['CA', 'Canada', '캐나다', 'カナダ'], ['AU', 'Australia', '호주', 'オーストラリア']];
    let intlCountry = (() => { try { const c = localStorage.getItem('yc-intl-country'); return INTL_COUNTRIES.some(x => x[0] === c) ? c : 'US'; } catch (e) { return 'US'; } })();
    let intlAll = false;
    // 'pop' = 인기순 (default), 'date' = 가까운 날짜순; remembered on this device
    let intlSort = (() => { try { return localStorage.getItem('yc-intl-sort') === 'date' ? 'date' : 'pop'; } catch (e) { return 'pop'; } })();
    const intlCache = {};   // country -> {state:'ok'|'off'|'err'|'loading', items}
    function loadIntl(c) {
      if (intlCache[c] && intlCache[c].state !== 'err') return;
      intlCache[c] = { state: 'loading', items: [] };
      const timed = (pr, ms) => Promise.race([pr, new Promise((_, no) => setTimeout(() => no('timeout'), ms))]);
      timed(fetch(INTL_ENDPOINT + '?country=' + c), 12000)
        .then(r => r.status === 503 ? { off: true } : r.ok ? r.json() : Promise.reject(r.status))
        .then(j => { intlCache[c] = j.off ? { state: 'off', items: [] } : { state: 'ok', items: (j.items || []).filter(e => e && e.title && e.url) }; })
        .catch(() => { intlCache[c] = { state: 'err', items: [] }; })
        .then(() => { if (currentEra && intlCountry === c) renderIntl(); });
    }
    function renderIntl() {
      const t = I18N[lang], li3 = lang === 'ja' ? 3 : lang === 'ko' ? 2 : 1;
      if (!currentEra) return;
      renderScope();
      document.getElementById('intl-sub').textContent = t.intlSub;
      const cs = document.getElementById('intl-countries'); cs.innerHTML = '';
      INTL_COUNTRIES.forEach(x => {
        const b = document.createElement('button'); b.type = 'button'; b.className = 'ev-area';
        b.setAttribute('aria-pressed', String(intlCountry === x[0])); b.textContent = x[li3];
        b.addEventListener('click', () => { intlCountry = x[0]; intlAll = false; try { localStorage.setItem('yc-intl-country', x[0]); } catch (e) {} renderIntl(); });
        cs.appendChild(b);
      });
      loadIntl(intlCountry);
      const st = intlCache[intlCountry], ul = document.getElementById('intl-list'), more = document.getElementById('intl-more');
      ul.innerHTML = ''; more.hidden = true;
      const msg = m => { const li = document.createElement('li'); li.className = 'ev-empty'; li.textContent = m; ul.appendChild(li); };
      if (st.state === 'loading') return msg(t.intlLoading);
      if (st.state === 'off') return msg(t.intlOff);
      if (st.state === 'err') return msg(t.intlErr);
      if (peekCount.intl !== st.items.length) { peekCount.intl = st.items.length; renderScope(); }
      if (!st.items.length) return msg(t.intlEmpty);
      document.querySelectorAll('#intl-sorts [data-sort]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.sort === intlSort)));
      // 인기순: classical first, then score (more dates, marquee names), then date. 가까운 날짜순: date, classical first on the same day
      const isCl = e => e.cat !== 'crossover' ? 1 : 0;
      const byDate = (a, b) => (a.date + (a.time || '')).localeCompare(b.date + (b.time || ''));
      const list = st.items.slice().sort(intlSort === 'date'
        ? (a, b) => (a.date || '').localeCompare(b.date || '') || (isCl(b) - isCl(a)) || byDate(a, b)
        : (a, b) => (isCl(b) - isCl(a)) || ((b.pop || 0) - (a.pop || 0)) || byDate(a, b));
      const SHOW = isPeek('intl') ? 2 : intlAll ? 60 : 6;
      list.slice(0, SHOW).forEach(e => {
        const li = document.createElement('li'); li.className = 'more-item';
        const mono = document.createElement('span'); mono.className = 'mono'; mono.textContent = '♪';
        let lead = mono;
        if (e.image) {
          const pic = document.createElement('span'); pic.className = 'pic';
          const im = document.createElement('img'); im.alt = e.title; im.loading = 'lazy'; im.decoding = 'async'; im.referrerPolicy = 'no-referrer';
          im.onerror = () => pic.replaceWith(mono); im.src = String(e.image).replace(/^http:/, 'https:');
          pic.appendChild(im); lead = pic;
        }
        const body = document.createElement('div'); body.className = 'min-w-0 flex-1';
        const nm = document.createElement('span'); nm.className = 'nm';
        if (e.cat === 'crossover') { const cb = document.createElement('span'); cb.className = 'ev-sub-kind'; cb.textContent = t.intlCross; nm.appendChild(cb); }
        nm.appendChild(document.createTextNode(e.title));
        if (e.moreDates) { const m = document.createElement('span'); m.className = 'intl-more'; m.textContent = t.intlDates.replace('{n}', e.moreDates); nm.appendChild(m); }
        const sb = document.createElement('span'); sb.className = 'sub';
        const when = (e.date ? e.date.replace(/-/g, '.') : '') + (e.time ? ' ' + e.time + ' (' + t.intlLocal + ')' : '');
        sb.textContent = [when, e.venue, e.city].filter(Boolean).join(' · ');
        const ch = document.createElement('span'); ch.className = 'chips';
        const a = document.createElement('a'); a.className = 'lk'; a.target = '_blank'; a.rel = 'noopener noreferrer'; a.href = e.url; a.textContent = t.evLink; ch.appendChild(a);
        body.append(nm, sb, ch); li.append(lead, body); ul.appendChild(li);
      });
      if (st.items.length > 6 && !isPeek('intl')) { more.hidden = false; more.textContent = intlAll ? t.evLess : t.evMore.replace('{n}', st.items.length - 6); }
    }
    document.getElementById('intl-more').addEventListener('click', () => { intlAll = !intlAll; renderIntl(); });
    document.querySelectorAll('#intl-sorts [data-sort]').forEach(b => b.addEventListener('click', () => {
      intlSort = b.dataset.sort; intlAll = false; try { localStorage.setItem('yc-intl-sort', intlSort); } catch (e) {}
      renderIntl();
    }));
    document.querySelectorAll('#ev-sorts [data-sort]').forEach(b => b.addEventListener('click', () => {
      evSort = b.dataset.sort; try { localStorage.setItem('yc-ev-sort', evSort); } catch (e) {}
      renderEvents();
    }));
    // The day's keyword profile: the chosen paintings' tag vectors, summed
    function todayProfile() {
      const E = engPrep(currentEra), v = {};
      selected().forEach(p => { const P = E.pv[p.id]; if (P) Object.entries(P.v).forEach(([t, w]) => { v[t] = (v[t] || 0) + w; }); });
      return v;
    }
    function rankMore(list, prof, skip) {
      return list.filter(x => !skip || !skip.has(x[0])).map(x => {
        const tags = x[10]; let s = 0, n = 0; const parts = [];
        Object.entries(tags).forEach(([t, w]) => { n += w * w; if (prof[t]) { s += prof[t] * w; parts.push([t, prof[t] * w]); } });
        parts.sort((a, b) => b[1] - a[1]);
        return { x, s: s / Math.sqrt(n || 1), why: parts.slice(0, 3).map(p => p[0]) };
      }).filter(r => r.s > 0).sort((a, b) => b.s - a.s).slice(0, 4);
    }
    function renderMore() {
      const box = document.getElementById('more');
      if (!box || !currentEra) return;
      const t = I18N[lang], li3 = lang === 'ja' ? 2 : lang === 'ko' ? 1 : 0;
      const tg = document.getElementById('more-toggle');
      tg.textContent = moreOpen ? t.moreHide : t.moreBtn;
      tg.setAttribute('aria-expanded', String(moreOpen));
      document.getElementById('more-body').hidden = false;
      const prof = todayProfile();
      document.getElementById('more-sub').textContent = moreSubLine(prof);
      const chosenPainters = new Set(selected().map(p => p.byEn));
      const fill = (ul, rows, novel) => {
        ul.innerHTML = '';
        rows.slice(0, moreOpen ? rows.length : 1).forEach(({ x, why }) => {
          const li = document.createElement('li');
          li.className = 'more-item' + (novel ? ' novel' : '');
          const name = x[li3], sub = novel ? x[4 + li3] + ' · ' + x[3] : x[3] + ' · ' + x[4 + li3];
          const mono = document.createElement('span'); mono.className = 'mono'; mono.textContent = (lang === 'en' ? x[0] : name).replace(/^(The |J\.-A\.-D\. )/, '').charAt(0);
          const file = MORE_IMG[x[0]];
          let lead = mono;
          if (file) {
            const pic = document.createElement('span'); pic.className = 'pic';
            const im = document.createElement('img');
            im.alt = (novel ? name : x[4 + li3]) + (novel ? '' : ' — ' + name);
            im.referrerPolicy = 'no-referrer'; im.loading = 'lazy'; im.decoding = 'async';
            im.addEventListener('imgfail', () => pic.replaceWith(mono));
            setImgSrc(im, file, 330);
            pic.appendChild(im); lead = pic;
          }
          const body = document.createElement('div'); body.className = 'min-w-0 flex-1';
          const nm = document.createElement('span'); nm.className = 'nm'; nm.textContent = name;
          const sb = document.createElement('span'); sb.className = 'sub'; sb.textContent = sub;
          const ds = document.createElement('span'); ds.className = 'ds'; ds.textContent = x[7 + li3];
          const ch = document.createElement('span'); ch.className = 'chips';
          why.forEach(w => { const c = document.createElement('span'); c.className = 'why-chip'; c.textContent = tagLabel(w); ch.appendChild(c); });
          const a = document.createElement('a'); a.className = 'lk'; a.target = '_blank'; a.rel = 'noopener noreferrer';
          a.href = 'https://' + (lang === 'ja' ? 'ja' : lang === 'ko' ? 'ko' : 'en') + '.wikipedia.org/wiki/Special:Search?search=' + encodeURIComponent(name);
          a.textContent = t.moreLink;
          ch.appendChild(a);
          body.append(nm, sb, ds, ch);
          li.append(lead, body);
          ul.appendChild(li);
        });
      };
      fill(document.getElementById('more-painters'), rankMore(MORE_PAINTERS, prof, chosenPainters), false);
      fill(document.getElementById('more-novels'), rankMore(MORE_NOVELS, prof), true);
    }
    document.getElementById('more-toggle').addEventListener('click', () => { moreOpen = !moreOpen; renderMore(); });

    // ---------- Type chemistry (like personality-test sites): the closest and the most different type ----------
    // Each type's keyword profile is the sum of its paintings' keywords; types are compared by cosine similarity.
    let MOOD_VEC = null;
    function moodVecs() {
      if (MOOD_VEC) return MOOD_VEC;
      const EG = engPrep(currentEra || 'classic'), out = {};
      allPaintings().forEach(p => {
        const P = EG.pv[p.id]; if (!P || !p.m || !TYPES[p.m]) return;
        const v = out[p.m] = out[p.m] || {};
        Object.entries(P.v).forEach(([t, x]) => { v[t] = (v[t] || 0) + x; });
      });
      return (MOOD_VEC = out);
    }
    function typeChem(m) {
      const V = moodVecs(), me = V[m];
      if (!me) return null;
      const sim = (a, b) => { let d = 0, na = 0, nb = 0; Object.keys(a).forEach(k => { na += a[k] * a[k]; if (b[k]) d += a[k] * b[k]; }); Object.values(b).forEach(x => { nb += x * x; }); return na && nb ? d / Math.sqrt(na * nb) : 0; };
      const L = Object.keys(V).filter(k => k !== m).map(k => [k, sim(me, V[k])]).sort((a, b) => b[1] - a[1]);
      return L.length >= 2 ? { best: L[0][0], far: L[L.length - 1][0] } : null;
    }
    function renderChem() {
      const box = document.getElementById('type-chem');
      if (!box) return;
      const sel = selected(), m = sel.length ? dominantMood(sel) : '', c = m && typeChem(m);
      if (!c || restored) { box.hidden = true; return; }
      const t = I18N[lang], ko = isLocal();
      box.innerHTML = '';
      const row = document.createElement('div'); row.className = 'chem-row';
      [['best', t.chemBest], ['far', t.chemFar]].forEach(([k, label]) => {
        const id = c[k], T = TYPES[id];
        const card = document.createElement('div'); card.className = 'chem-card chem-' + k;
        const pic = document.createElement('div'); pic.className = 'chem-pic';
        const p = allPaintings().find(x => x.m === id);
        if (p) { const im = document.createElement('img'); im.alt = ko ? p.ko : p.en; im.referrerPolicy = 'no-referrer'; im.loading = 'lazy'; setImgSrc(im, p.f, 240, null, () => im.remove()); pic.appendChild(im); }
        const txt = document.createElement('div'); txt.className = 'chem-txt';
        const kk = document.createElement('p'); kk.className = 'chem-k'; kk.textContent = label;
        const nm = document.createElement('p'); nm.className = 'chem-nm'; nm.textContent = ko ? T[1] : T[0];
        const ln = document.createElement('p'); ln.className = 'chem-ln'; ln.textContent = ko ? T[3] : T[2];
        txt.append(kk, nm, ln);
        card.append(pic, txt);
        row.appendChild(card);
      });
      box.append(row);
      box.hidden = false;
    }

    // ---------- Composer taste map (like music maps): you in the middle, matched composers close, stretch picks further out ----------
    function renderCmpMap() {
      const box = document.getElementById('cmp-map');
      if (!box) return;
      const sel = selected();
      if (!sel.length || !currentEra) { box.hidden = true; return; }
      const t = I18N[lang], ko = isLocal();
      const nameOf = id => { const s = SHORT[id]; if (s) return s[ko ? 1 : 0]; for (const L of Object.values(COMPOSERS)) { const n = L.find(x => x[2] === id); if (n) return n[ko ? 1 : 0]; } return id; };
      // taste match: this style's composers, ranked by how well their pieces fit the chosen paintings
      const sc = composerScores();
      const fit = (COMPOSERS[currentEra] || []).map(n => n[2]).filter(id => id && WORKS[id] && sc[id] > 0)
        .sort((a, b) => sc[b] - sc[a]).slice(0, 5);
      // taste stretch: the other style's composers that share the most keywords with the chosen paintings
      const other = currentEra === 'classic' ? 'romantic' : 'classic';
      let grow = [];
      try {
        const E = engPrep(other), mine = engPrep(currentEra).pv, pt = new Set(), sh = {};
        sel.forEach(p => { const P = mine[p.id]; if (P) Object.keys(P.v).forEach(k => pt.add(k)); });
        E.items.forEach(x => Object.keys(x.v || x.t || {}).forEach(k => { if (pt.has(k)) (sh[x.c] = sh[x.c] || new Set()).add(k); }));
        grow = (COMPOSERS[other] || []).map(n => n[2]).filter(id => id && WORKS[id] && sh[id] && !fit.includes(id))
          .sort((a, b) => sh[b].size - sh[a].size).slice(0, 3);
      } catch (e) { grow = []; }
      if (fit.length < 2) { box.hidden = true; return; }
      box.innerHTML = '';
      const stage = document.createElement('div'); stage.className = 'cm-stage';
      const svgNS = 'http://www.w3.org/2000/svg';
      const svg = document.createElementNS(svgNS, 'svg');
      svg.setAttribute('viewBox', '0 0 100 100'); svg.setAttribute('preserveAspectRatio', 'none'); svg.setAttribute('aria-hidden', 'true');
      stage.appendChild(svg);
      const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
      const narrow = (box.clientWidth || window.innerWidth) < 640;
      const place = (id, x, y, kind, rank) => {
        x = clamp(x, narrow ? 19 : 14, narrow ? 81 : 86); y = clamp(y, 8, 92);
        const ln = document.createElementNS(svgNS, 'line');
        ln.setAttribute('x1', 50); ln.setAttribute('y1', 50); ln.setAttribute('x2', x); ln.setAttribute('y2', y);
        ln.setAttribute('class', 'cm-ln ' + kind); ln.setAttribute('vector-effect', 'non-scaling-stroke');
        svg.appendChild(ln);
        const b = document.createElement('button'); b.type = 'button';
        b.className = 'cm-node ' + kind + (kind === 'fit' && rank === 0 ? ' top' : '');
        b.style.left = x + '%'; b.style.top = y + '%';
        b.textContent = nameOf(id);
        b.setAttribute('aria-label', nameOf(id) + ' · ' + (kind === 'fit' ? t.mapFit : t.mapGrow));
        b.addEventListener('click', () => { track('composer_map', { composer: id, kind }); openComposer(id); });
        stage.appendChild(b);
      };
      // closer = better: the top pick sits nearest the centre
      const nf = fit.length, start = -Math.PI / 2;
      fit.forEach((id, i) => {
        const a = start + i * (2 * Math.PI / nf), r = (narrow ? 0.29 : 0.27) + 0.06 * (i / Math.max(1, nf - 1));
        place(id, 50 + Math.cos(a) * r * 100, 50 + Math.sin(a) * r * (narrow ? 118 : 120), 'fit', i);
      });
      grow.forEach((id, i) => {
        const a = start + (i + 0.5) * (2 * Math.PI / nf) + (nf % 2 ? 0 : 0.35), r = 0.42;
        place(id, 50 + Math.cos(a) * r * 100, 50 + Math.sin(a) * r * 102, 'grow', i);
      });
      const me = document.createElement('div'); me.className = 'cm-me';
      const mk = document.createElement('span'); mk.className = 'k'; mk.textContent = t.mapMe;
      const mt = document.createElement('span'); mt.className = 'nm'; { const T = TYPES[dominantMood(sel)]; mt.textContent = T ? (ko ? T[1] : T[0]) : ''; }
      me.append(mk, mt);
      stage.appendChild(me);
      const legend = document.createElement('ul'); legend.className = 'cm-legend';
      const key = (cls, label, desc) => { const li = document.createElement('li'); li.className = cls; const c = document.createElement('span'); c.className = 'chip'; c.textContent = label; const d = document.createElement('span'); d.className = 'd'; d.textContent = desc; li.append(c, d); legend.appendChild(li); };
      key('fit', t.mapFit, t.mapFitD);
      if (grow.length) key('grow', t.mapGrow, t.mapGrowD);
      const note = document.createElement('p'); note.className = 'cm-note'; note.textContent = t.mapNote;
      box.append(stage, legend, note);
      box.hidden = false;
      // keep every name clear of the centre circle and of the names placed before it
      try {
        const S = stage.getBoundingClientRect(); if (!S.width) return;
        const nodes = [...stage.querySelectorAll('.cm-node')], pad = 6, fixed = [me.getBoundingClientRect()];
        const hit = (A, B) => A.left < B.right + pad && B.left < A.right + pad && A.top < B.bottom + pad && B.top < A.bottom + pad;
        const free = R => !fixed.some(F => hit(R, F)) && R.left >= S.left && R.right <= S.right && R.top >= S.top && R.bottom <= S.bottom;
        const set = (n, x, y) => { n.style.left = x + '%'; n.style.top = y + '%'; return n.getBoundingClientRect(); };
        nodes.forEach((n, i) => {
          const x0 = parseFloat(n.style.left), y0 = parseFloat(n.style.top);
          let R = n.getBoundingClientRect();
          if (!free(R)) {
            const ang = Math.atan2(y0 - 50, x0 - 50), rad = Math.hypot(x0 - 50, y0 - 50);
            let done = false;
            for (const k of [1, 1.12, 0.9, 1.24, 0.8, 1.36]) {
              for (const dA of [0, 12, -12, 24, -24, 36, -36, 50, -50, 65, -65]) {
                const A = ang + dA * Math.PI / 180, x = 50 + Math.cos(A) * rad * k, y = 50 + Math.sin(A) * rad * k;
                R = set(n, x, y);
                if (free(R)) { done = true; break; }
              }
              if (done) break;
            }
            if (!done) R = set(n, x0, y0);
            const ln = svg.children[i]; ln.setAttribute('x2', parseFloat(n.style.left)); ln.setAttribute('y2', parseFloat(n.style.top));
          }
          fixed.push(R);
        });
      } catch (e) {}
    }

    function renderResult() {
      if (!currentEra) return;
      const t = I18N[lang], ko = isLocal();
      const sel = selected();
      if (!sel.length) return;
      const mood = dominantMood(sel), T = TYPES[mood];
      const eraKey = eraOf(sel), E = ERAS[eraKey];
      result.style.setProperty('--era', E.c);
      result.style.setProperty('--era-text', E.text);

      document.getElementById('r-era-big').textContent = E.en;
      document.getElementById('r-era').textContent = ko ? E.ko : ERA_EN[eraKey];
      const ty = document.getElementById('r-type');
      ty.innerHTML = '';
      const sm = document.createElement('small'); sm.textContent = t.typeLead;
      ty.append(sm, document.createTextNode(ko ? T[1] : T[0]));

      // the painting that defined the type is shown large, like a taste card
      const hero = sel.find(x => x.m === mood) || sel[0];
      const art = document.getElementById('r-art');
      art.style.visibility = 'visible';
      setImgSrc(art, hero.f, 1280, null, () => { art.style.visibility = 'hidden'; });
      art.alt = (ko ? hero.ko : hero.en) + ', ' + (ko ? hero.byKo : hero.byEn);
      const cap = document.getElementById('r-art-cap');
      cap.innerHTML = '<b></b><span></span>';
      cap.querySelector('b').textContent = ko ? hero.ko : hero.en;
      cap.querySelector('span').textContent = (ko ? hero.byKo : hero.byEn) + ' · ' + hero.y;

      // 기-승-전-결 in four lines
      const q = x => lang === 'ja' ? '「' + x + '」' : ko ? '〈' + x + '〉' : '“' + x + '”';
      const names = sel.slice(0, 3).map(s => q(ko ? s.ko : s.en)).join(lang === 'ja' ? '・' : ko ? '·' : ', ')
        + (sel.length > 3 ? (lang === 'ja' ? t.more.replace('{n}', sel.length - 3) : ko ? ' 외 ' + (sel.length - 3) + '점' : ' and ' + (sel.length - 3) + ' more') : '');
      const EG = engPrep(currentEra), agg = {};
      sel.forEach(x => { const P = EG.pv[x.id]; if (P) Object.entries(P.v).forEach(([tg, v]) => { agg[tg] = (agg[tg] || 0) + v; }); });
      const moods = Object.entries(agg).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([tg]) => tagLabel(tg)).join(' · ')
        || [...new Set(sel.map(s => ko ? s.moodKo : s.moodEn))].slice(0, 3).join(' · ');
      const lines = [
        [t.kGi, ko ? T[3] : T[2]],
        [t.kSeung, ko ? T[5] : T[4]],
        [t.kJeon, t.jeonTpl.replace('{t}', names).replace('{m}', moods)],
      ];
      // taste mix: how many picks came from each feeling group (e.g. Calm 3 · Passion 2 · Dream 1)
      const cnt = {};
      sel.forEach(x => { const g = groupFor(x.id); if (g) { const nm = groupName(g); cnt[nm] = (cnt[nm] || 0) + 1; } });
      const order = Object.entries(cnt).sort((a, b) => b[1] - a[1]);
      if (order.length) {
        const mix = order.map(([g, c]) => g + ' ' + c).join(' · ');
        const lean = order.length > 1 && order[0][1] > order[1][1] ? ' ' + t.mixLean.replace('{g}', order[0][0]) : '';
        lines.push([t.kMix, mix + lean]);
      }
      { const v = eraVotes();
        if (v.n) lines.push([t.kEra, t.eraLine.replace('{c}', v.c).replace('{r}', v.r).replace('{n}', v.n).replace('{era}', t.eraName[currentEra])]); }
      lines.push([t.kGyeol, t.gyeol[currentEra], true]);
      const story = document.getElementById('r-story');
      story.innerHTML = '';
      // Wrapped-style reveal: the lines appear one by one, once per new result (not on a language switch)
      { const key = currentEra + ':' + [...picks].join(',');
        if (renderResult.revealKey !== key) { renderResult.revealKey = key; story.classList.remove('story-in'); void story.offsetWidth; story.classList.add('story-in'); } }
      lines.forEach(([k, v, end]) => {
        const li = document.createElement('li');
        if (end) li.className = 'end';
        const a = document.createElement('span'); a.className = 'k'; a.textContent = k;
        const b = document.createElement('span'); b.className = 'v'; b.textContent = v;
        if (end) b.addEventListener('click', () => document.getElementById('pieces').scrollIntoView({ behavior: 'smooth', block: 'start' }));
        li.append(a, b);
        story.appendChild(li);
      });

      // One card per chosen painting, with the painting beside the reading
      const read = document.getElementById('r-read');
      read.innerHTML = '';
      sel.forEach(s => {
        const card = document.createElement('article');
        card.className = 'read-card';
        const pic = document.createElement('div');
        pic.className = 'pic';
        const im = document.createElement('img');
        im.alt = (ko ? s.ko : s.en) + ', ' + (ko ? s.byKo : s.byEn);
        im.referrerPolicy = 'no-referrer'; im.loading = 'lazy';
        setImgSrc(im, s.f, 960, null, () => im.remove());
        pic.appendChild(im);
        const txt = document.createElement('div');
        txt.className = 'txt';
        const tag = document.createElement('p');
        tag.className = 'tagline';
        tag.textContent = ko ? s.tagKo : s.tagEn;
        const h = document.createElement('h4');
        h.className = 'mt-2 font-serif text-lg sm:text-xl text-white/95 leading-snug';
        h.textContent = ko ? s.ko : s.en;
        const by = document.createElement('p');
        by.className = 'font-serif italic text-sm text-white/60';
        by.textContent = (ko ? s.byKo : s.byEn) + ' · ' + s.y;
        const p = document.createElement('p');
        p.className = 'mt-3 text-sm leading-relaxed text-white/70';
        p.textContent = ko ? s.readKo : s.readEn;
        txt.append(tag, h, by, p);
        card.append(pic, txt);
        read.appendChild(card);
      });

      renderPlaylist();
      renderEvents();
      renderIntl();
      renderMore();
      renderComposers();
      renderComposerDetail();
      renderCmpMap();
      renderChem();
      if (typeof renderExtras === 'function') renderExtras();
    }

    // ---------- Landing: taste map + today's taste ----------
    const MAP = [
      { k: 'baroque', c: '#D7A33D', en: 'BAROQUE', ko: '바로크', f: 'Johannes_Vermeer_-_Girl_with_a_Pearl_Earring_-_670_-_Mauritshuis.jpg', on: 'classic',
        flEn: 'Golden counterpoint. Rich, ornate and glowing.', flKo: '금빛 대위법. 진하고 화려하게 빛나는 첫맛.' },
      { k: 'classical', c: '#6B7A68', en: 'CLASSICAL', ko: '고전주의', f: 'Jacques-Louis_David_-_Oath_of_the_Horatii_-_Google_Art_Project.jpg', on: 'classic',
        flEn: 'Balanced forms and a clean, neat finish.', flKo: '균형 잡힌 형식, 깔끔하고 단정한 뒷맛.' },
      { k: 'romantic', c: '#A01B3C', en: 'ROMANTIC', ko: '낭만주의', f: 'Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog.jpg', on: 'romantic',
        flEn: 'Deep feeling with a long, lingering finish.', flKo: '진한 감정, 오래 남는 여운.' },
      { k: 'impression', c: '#7FA9A0', en: 'IMPRESSIONISM', ko: '인상주의', f: 'Monet_-_Impression,_Sunrise.jpg',
        flEn: 'Watery harmonies, light and hazy.', flKo: '물빛 화음, 가볍고 흐릿한 향.' },
      { k: 'contemporary', c: '#30343B', en: 'CONTEMPORARY', ko: '현대', f: 'Vassily_Kandinsky,_1913_-_Composition_7.jpg',
        flEn: 'Unfamiliar textures, new flavours.', flKo: '낯선 질감, 새로운 맛의 실험.' },
    ];
    // [era, painting id, mood pool, index in pool] — rotates by day
    const TODAY = [
      ['romantic', 'ophelia', 'fantasy', 1], ['classic', 'pearl', 'radiant', 1], ['classic', 'swing', 'galant', 0],
      ['romantic', 'kiss', 'love', 2], ['classic', 'nightwatch', 'grand', 0], ['romantic', 'schubertiade', 'intimate', 0],
      ['classic', 'reader', 'tender', 4],
    ];
    function renderLanding() {
      const t = I18N[lang], ko = isLocal();
      const grid = document.getElementById('map-grid');
      if (grid) {
        grid.innerHTML = '';
        MAP.forEach(m => {
          const el = document.createElement(m.on ? 'a' : 'div');
          el.className = 'map-item' + (m.on ? '' : ' soon');
          el.id = 'map-' + m.k;
          el.style.setProperty('--c', m.c);
          if (m.on) el.href = '#choose';
          const sw = document.createElement('div'); sw.className = 'sw';
          const art = document.createElement('div'); art.className = 'art';
          const im = document.createElement('img');
          const origin = 'https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(m.f) + '?width=600';
          im.src = THUMB(m.f, 500);
          im.alt = ''; im.loading = 'lazy'; im.referrerPolicy = 'no-referrer';
          im.addEventListener('error', () => { if (im.src !== origin) im.src = origin; else im.remove(); });
          art.appendChild(im);
          const body = document.createElement('div'); body.className = 'body';
          body.innerHTML = '<div class="nm"></div><div class="ko"></div><p class="fl"></p><span class="st"></span>';
          body.querySelector('.nm').textContent = m.en;
          body.querySelector('.ko').textContent = m.ko;
          body.querySelector('.fl').textContent = ko ? m.flKo : m.flEn;
          const st = body.querySelector('.st');
          st.className = 'st ' + (m.on ? 'on' : 'soon');
          st.textContent = m.on ? t.mapOn : t.mapSoon;
          el.append(sw, art, body);
          grid.appendChild(el);
        });
      }
      const li = document.getElementById('td-li');
      if (!li) return;
      const day = Math.floor(Date.now() / 86400000);
      const [era, pid, mood, k] = TODAY[day % TODAY.length];
      const pnt = SETS[era].find(x => x.id === pid);
      const best = (rankFor(era, pid).find(x => x.x.yt) || { x: CAT.find(x => x.e === era) }).x;
      const r = { cid: best.c, en: best.en, ko: best.ko, yt: best.yt || '', who: best.who || '' };
      const img = document.getElementById('td-img');
      img.style.visibility = 'visible';
      setImgSrc(img, pnt.f, 960, null, () => { img.style.visibility = 'hidden'; });
      img.alt = ko ? pnt.ko : pnt.en;
      document.getElementById('td-date').textContent = new Date().toLocaleDateString(lang === 'ja' ? 'ja-JP' : ko ? 'ko-KR' : 'en-GB', { month: 'long', day: 'numeric', weekday: 'long' });
      document.getElementById('td-title').textContent = ko ? pnt.ko : pnt.en;
      document.getElementById('td-by').textContent = (ko ? pnt.byKo : pnt.byEn) + ' · ' + pnt.y;
      if (activeLi === li) stopPlayer();
      li.innerHTML = '';
      const body = document.createElement('div');
      body.className = 'min-w-0 flex-1';
      const tt = document.createElement('span');
      tt.className = 'block font-serif text-xl leading-snug text-white/90';
      tt.textContent = ko ? r.ko : r.en;
      const by = document.createElement('span');
      by.className = 'mt-0.5 block text-sm text-white/50';
      by.textContent = (SHORT[r.cid] || ['', ''])[ko ? 1 : 0] + (r.who ? ' · ' + r.who : '');
      body.append(tt, by);
      li.dataset.yt = r.yt;
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'pl-btn shrink-0 border px-4 py-2 text-sm transition';
      b.textContent = '▶ ' + t.plPlay;
      b.addEventListener('click', () => openPlayer(li, r));
      li.append(body, b);
    }

    function applyLang(next) {
      lang = I18N[next] ? next : 'en';
      if (typeof localize === 'function') localize();
      const t = I18N[lang];
      document.documentElement.lang = lang;
      document.title = t.title;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute('content', t.metaDesc);

      document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t[el.dataset.i18n]; });
      document.querySelectorAll('[data-i18n-html]').forEach(el => { el.innerHTML = t[el.dataset.i18nHtml]; });
      document.querySelectorAll('[data-i18n-aria]').forEach(el => { el.setAttribute('aria-label', t[el.dataset.i18nAria]); });
      document.querySelectorAll('[data-i18n-alt]').forEach(el => { el.setAttribute('alt', t[el.dataset.i18nAlt]); });
      document.querySelectorAll('.lang-btn').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));

      if (typeof renderPair === 'function') renderPair();
      if (typeof renderLanding === 'function' && typeof SETS !== 'undefined') renderLanding();
      renderResult();
      if (typeof renderTiles === 'function') renderTiles();
      updateProgress();
      try { localStorage.setItem('vo-lang', lang); } catch (e) {}
    }

    document.querySelectorAll('.lang-btn').forEach(b => b.addEventListener('click', () => applyLang(b.dataset.lang)));

    // ---------- 3) Scroll reveal ----------
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));

    // ---------- 4) Card spotlight ----------
    document.getElementById('pair').addEventListener('mousemove', (e) => {
      const card = e.target.closest('.card'); if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--x', (e.clientX - r.left) + 'px');
      card.style.setProperty('--y', (e.clientY - r.top) + 'px');
    });

    // ---------- 5) Pick / reset (the era name is only revealed AFTER the choice) ----------
    const pair = document.getElementById('pair');
    let cards = [];   // the four Q1 cards, rebuilt each time they are dealt
    const result = document.getElementById('result');

    // Round two sets: four paintings per style. Image files load from Wikimedia Commons (public domain);
    // if one fails to load, the tile keeps its burgundy fallback with the title, so nothing looks broken.
    // Paintings come through our own domain (/img/ → Cloudflare edge cache of Wikimedia Commons, see src/worker.js).
    // Opening index.html straight from the computer has no worker, so it uses Wikimedia directly.
    const IMG_BASE = /^https?:$/.test(location.protocol) ? '/img/' : 'https://upload.wikimedia.org/wikipedia/commons/';
    const FILE = f => {
      const name = f.replace(/ /g, '_'), h = md5(name);
      return IMG_BASE + h[0] + '/' + h.slice(0, 2) + '/' + encodeURIComponent(name);
    };
    // Resized copy (Wikimedia's standard widths) so huge originals like Goya's Third of May still load on phones.
    // Falls back to the original file if the resized copy is unavailable.
    const STD_W = [120, 250, 330, 500, 960, 1280, 1920];
    const THUMB = (f, w) => {
      w = STD_W.find(x => x >= w * 0.78) || 1920;
      const name = f.replace(/ /g, '_'), h = md5(name), enc = encodeURIComponent(name);
      return IMG_BASE + 'thumb/' + h[0] + '/' + h.slice(0, 2) + '/' + enc + '/' + w + 'px-' + enc;
    };
    // backup: the same copy straight from Wikimedia, if our /img/ route ever fails
    const WM_THUMB = (f, w) => THUMB(f, w).replace(IMG_BASE, 'https://upload.wikimedia.org/wikipedia/commons/');
    // Backup Commons files for paintings whose main file may fail to load (tried only after the main file fails)
    const ALT_FILE = {
      '1813_Schinkel_Gotischer_Dom_am_Wasser_anagoria.JPG': 'Karl_Friedrich_Schinkel_Gotischer_Dom.jpg',
      'Turner_-_Regulus,_1828,_reworked_1837,_N00519.jpg': 'Regulus_Turner_1828.jpg',
      'Joseph_Mallord_William_Turner_(British_-_Modern_Rome-Campo_Vaccino_-_Google_Art_Project.jpg': 'JMW_Turner_-_Modern_Rome_-_Campo_Vacino.jpg',
      'El_Tres_de_Mayo,_by_Francisco_de_Goya,_from_Prado_thin_black_margin.jpg': 'Francisco_de_Goya_y_Lucientes_-_Los_fusilamientos_del_tres_de_mayo_-_1814.jpg'
    };
    function setImgSrc(im, f, w, extra, onFail) {
      let step = 0;
      const alt = ALT_FILE[f], tries = [THUMB(f, w), WM_THUMB(f, w), FILE(f)].concat(alt ? [THUMB(alt, w), WM_THUMB(alt, w)] : [], extra || []);
      im.onerror = () => { step++; if (step < tries.length) im.src = tries[step]; else { if (onFail) onFail(); im.dispatchEvent(new Event('imgfail')); } };
      im.src = tries[0];
    }
    // Sixteen paintings per style, shown eight at a time (two pages); the swap button flips between pages.
    const SETS = {
      classic: [
        { id: "pearl", m: "radiant", f: "Johannes_Vermeer_-_Girl_with_a_Pearl_Earring_-_670_-_Mauritshuis.jpg", y: 1665,
          en: "Girl with a Pearl Earring", ko: "진주 귀걸이를 한 소녀", byEn: "Johannes Vermeer", byKo: "요하네스 베르메르",
          moodEn: "quiet radiance", moodKo: "고요한 광채",
          tagEn: "Dutch Baroque · light as the subject", tagKo: "네덜란드 바로크 · 빛이 주인공",
          readEn: "A turned head, a glance over the shoulder, a pearl catching the light. If it held you, you like music that is still, luminous and quietly intimate.",
          readKo: "돌아보는 고개, 어깨 너머의 시선, 빛을 머금은 진주. 이 그림에 붙들렸다면 고요하고 맑게 빛나며 조용히 친밀한 음악을 좋아하실 거예요." },
        { id: "musiclesson", m: "radiant", f: "Johannes_Vermeer_-_Lady_at_the_Virginal_with_a_Gentleman,_'The_Music_Lesson'_-_Google_Art_Project.jpg", y: 1664,
          en: "The Music Lesson", ko: "음악 수업", byEn: "Johannes Vermeer", byKo: "요하네스 베르메르",
          moodEn: "harmony in a quiet room", moodKo: "조용한 방 안의 조화",
          tagEn: "Dutch Baroque · music indoors", tagKo: "네덜란드 바로크 · 실내의 음악",
          readEn: "A lady at the virginal, a gentleman beside her, and a mirror that shows only part of her face. If it drew you in, you like music that is poised, intimate and a little secretive.",
          readKo: "버지널 앞의 여인, 곁에 선 신사, 그리고 여인의 얼굴 일부만 비추는 거울. 이 그림에 끌렸다면 단정하고 친밀하며 약간은 비밀스러운 음악을 좋아하실 거예요." },
        { id: "nightwatch", m: "grand", f: "The_Night_Watch_-_HD.jpg", y: 1642,
          en: "The Night Watch", ko: "야경", byEn: "Rembrandt van Rijn", byKo: "렘브란트 판 레인",
          moodEn: "festive grandeur", moodKo: "축제 같은 웅장함",
          tagEn: "Dutch Baroque · the group portrait that moves", tagKo: "네덜란드 바로크 · 움직이는 단체 초상",
          readEn: "A civic militia portrait where nobody is posing: drums, muskets, a girl with a chicken and light darting everywhere. If it thrilled you, you like music that is grand, busy and full of voices.",
          readKo: "시민 민병대의 단체 초상인데도 아무도 포즈를 취하지 않습니다. 이 그림에 짜릿했다면 웅장하고 분주하며 목소리가 가득한 음악을 좋아하실 거예요." },
        { id: "prodigal", m: "mercy", f: "Rembrandt_Harmensz_van_Rijn_-_Return_of_the_Prodigal_Son_-_Google_Art_Project.jpg", y: 1669,
          en: "The Return of the Prodigal Son", ko: "탕자의 귀향", byEn: "Rembrandt van Rijn", byKo: "렘브란트 판 레인",
          moodEn: "mercy in warm shadow", moodKo: "따뜻한 그늘 속의 자비",
          tagEn: "Dutch Baroque · forgiveness without a raised voice", tagKo: "네덜란드 바로크 · 목소리를 높이지 않는 용서",
          readEn: "A son kneels in rags while his father’s hands rest on his back, one broad and one slender. If it moved you, you like music that consoles.",
          readKo: "누더기를 걸친 아들이 무릎을 꿇고, 아버지의 두 손이 그의 등에 놓입니다. 이 그림이 마음을 움직였다면 위로해 주는 음악을 좋아하실 거예요." },
        { id: "matthew", m: "dramatic", f: "Caravaggio,_Michelangelo_Merisi_da_-_The_Calling_of_Saint_Matthew_-_1599-1600_(hi_res).jpg", y: 1600,
          en: "The Calling of Saint Matthew", ko: "성 마태의 소명", byEn: "Caravaggio", byKo: "카라바조",
          moodEn: "sudden spotlight", moodKo: "갑작스러운 스포트라이트",
          tagEn: "Italian Baroque · tenebrism", tagKo: "이탈리아 바로크 · 테네브리즘",
          readEn: "A shaft of light falls across a tavern table and a finger points. If it hit you, you like music with sharp contrasts and a decisive entrance.",
          readKo: "한 줄기 빛이 선술집 탁자를 가로지르고, 손가락 하나가 누군가를 가리킵니다. 이 그림이 와닿았다면 대비가 선명하고 등장이 단호한 음악을 좋아하실 거예요." },
        { id: "meninas", m: "grand", f: "Las_Meninas_01.jpg", y: 1656,
          en: "Las Meninas", ko: "시녀들", byEn: "Diego Velázquez", byKo: "디에고 벨라스케스",
          moodEn: "stately intrigue", moodKo: "위엄 있는 수수께끼",
          tagEn: "Spanish Baroque · who is looking at whom?", tagKo: "스페인 바로크 · 누가 누구를 보고 있나?",
          readEn: "The princess, her attendants, a dog and the painter himself, who seems to be painting you. If it fascinated you, you like music that is stately and layered with hidden structure.",
          readKo: "공주, 시녀들, 개, 그리고 마치 당신을 그리고 있는 듯한 화가 자신. 이 그림에 매료되었다면 위엄 있으면서 숨은 구조가 겹겹이 쌓인 음악을 좋아하실 거예요." },
        { id: "cavalier", m: "joy", f: "Frans_Hals_–_The_Laughing_Cavalier.jpg", y: 1624,
          en: "The Laughing Cavalier", ko: "웃는 기사", byEn: "Frans Hals", byKo: "프란스 할스",
          moodEn: "swagger & sparkle", moodKo: "자신만만한 반짝임",
          tagEn: "Dutch Baroque · swagger in oil", tagKo: "네덜란드 바로크 · 유화로 그린 허세",
          readEn: "He is not actually laughing (that nickname came much later), but the smirk, the embroidered sleeves and the confident tilt say everything. If it made you grin, you like music that is bright, quick-witted and a little cocky.",
          readKo: "사실 그는 웃고 있지 않습니다(그 별명은 훨씬 뒤에 붙었죠). 이 그림에 웃음이 났다면 밝고 재치 있으며 살짝 건방진 음악을 좋아하실 거예요." },
        { id: "horatii", m: "heroic", f: "Jacques-Louis_David_-_Oath_of_the_Horatii_-_Google_Art_Project.jpg", y: 1784,
          en: "Oath of the Horatii", ko: "호라티우스 형제의 맹세", byEn: "Jacques-Louis David", byKo: "자크 루이 다비드",
          moodEn: "resolve & heroism", moodKo: "결의와 영웅적 기개",
          tagEn: "Neoclassicism · duty as geometry", tagKo: "신고전주의 · 기하학이 된 의무",
          readEn: "Three brothers, three straight arms, zero doubt. If it grabbed you, you probably like music with a clear skeleton and a decisive pulse.",
          readKo: "세 형제, 곧게 뻗은 세 팔, 망설임은 제로. 이 그림에 끌렸다면 뼈대가 또렷하고 박동이 단호한 음악이 취향일 가능성이 큽니다." },
        { id: "socrates", m: "solemn", f: "Jacques-Louis_David_-_The_Death_of_Socrates_-_WGA6058.jpg", y: 1787,
          en: "The Death of Socrates", ko: "소크라테스의 죽음", byEn: "Jacques-Louis David", byKo: "자크 루이 다비드",
          moodEn: "solemn reflection", moodKo: "엄숙한 사색",
          tagEn: "Neoclassicism · Enlightenment ideals", tagKo: "신고전주의 · 계몽의 이상",
          readEn: "A philosopher reaches for the hemlock while still mid-lecture. If you stopped here, you likely want music that is grave but lucid: sorrow with good posture.",
          readKo: "철학자가 독배를 향해 손을 뻗으면서도 여전히 강의 중입니다. 이 그림 앞에서 멈췄다면 무겁지만 맑은 음악, 말하자면 자세가 바른 슬픔을 좋아하실 거예요." },
        { id: "odalisque", m: "elegant", f: "Jean_Auguste_Dominique_Ingres,_La_Grande_Odalisque,_1814.jpg", y: 1814,
          en: "La Grande Odalisque", ko: "그랑드 오달리스크", byEn: "J.-A.-D. Ingres", byKo: "앵그르",
          moodEn: "graceful elegance", moodKo: "우아한 관능",
          tagEn: "Late Neoclassicism · line over colour", tagKo: "후기 신고전주의 · 색보다 선",
          readEn: "Ingres quietly adds a few extra vertebrae for the sake of a lovelier curve, proof that for him line outranked anatomy. If you like it, you like polish: smooth, balanced melodies that are allowed to be a little indulgent.",
          readKo: "앵그르는 더 아름다운 곡선을 위해 척추뼈를 슬쩍 더 그려 넣었습니다. 이 그림이 좋다면 매끄럽고 균형 잡히되 살짝 탐닉해도 좋은, 윤기 나는 선율을 좋아하실 거예요." },
        { id: "sabine", m: "calm", f: "The_Intervention_of_the_Sabine_Women.jpg", y: 1799,
          en: "The Intervention of the Sabine Women", ko: "사비니 여인들의 중재", byEn: "Jacques-Louis David", byKo: "자크 루이 다비드",
          moodEn: "noble calm", moodKo: "고귀한 평정",
          tagEn: "Neoclassicism · Greek calm after revolution", tagKo: "신고전주의 · 혁명 뒤의 그리스적 평온",
          readEn: "Women step between two armies and the battle simply pauses. If this pulled you in, you enjoy music that resolves things gracefully.",
          readKo: "여인들이 두 군대 사이로 걸어 들어가자 전투가 멈춥니다. 이 그림에 끌렸다면 갈등을 우아하게 풀어내는 음악을 좋아하실 거예요." },
        { id: "napoleon", m: "heroic", f: "Jacques_Louis_David_-_Bonaparte_franchissant_le_Grand_Saint-Bernard,_20_mai_1800_-_Google_Art_ProjectFXD.jpg", y: 1801,
          en: "Napoleon Crossing the Alps", ko: "알프스를 넘는 나폴레옹", byEn: "Jacques-Louis David", byKo: "자크 루이 다비드",
          moodEn: "destiny in motion", moodKo: "운명의 행진",
          tagEn: "Neoclassicism · propaganda in oils", tagKo: "신고전주의 · 유화로 그린 홍보 포스터",
          readEn: "Napoleon rides a rearing horse over the Alps, though in reality he crossed on a mule. If you picked it, you enjoy music that marches with purpose and knows its own importance.",
          readKo: "나폴레옹이 말을 높이 세우고 알프스를 넘습니다. 이 그림을 골랐다면 뚜렷한 목적으로 행진하고 스스로의 위대함을 아는 음악이 취향이에요." },
        { id: "swing", m: "galant", f: "Jean-Honoré_Fragonard_-_The_Swing_-_Google_Art_Project.jpg", y: 1767,
          en: "The Swing", ko: "그네", byEn: "Jean-Honoré Fragonard", byKo: "장 오노레 프라고나르",
          moodEn: "playful sparkle", moodKo: "반짝이는 장난기",
          tagEn: "Rococo · the last party before the Revolution", tagKo: "로코코 · 혁명 직전의 마지막 파티",
          readEn: "A girl on a swing kicks off her shoe while an admirer hides in the bushes: flirtation as choreography. If you chose it, you want music that sparkles, teases and never takes itself too seriously.",
          readKo: "그네를 탄 여인이 구두를 날리고, 덤불 속 연인이 그 모습을 훔쳐봅니다. 이 그림을 골랐다면 반짝이고 장난스럽고, 스스로를 너무 진지하게 여기지 않는 음악이 취향입니다." },
        { id: "marie", m: "galant", f: "Louise_Elisabeth_Vigée-Lebrun_-_Marie-Antoinette_de_Lorraine-Habsbourg,_reine_de_France_et_ses_enfants_-_Google_Art_Project.jpg", y: 1787,
          en: "Marie Antoinette and Her Children", ko: "마리 앙투아네트와 아이들", byEn: "Élisabeth Vigée Le Brun", byKo: "엘리자베트 비제 르브룅",
          moodEn: "polished warmth", moodKo: "윤기 나는 따뜻함",
          tagEn: "Late Rococo · image management", tagKo: "후기 로코코 · 이미지 메이킹",
          readEn: "The queen posed with her children to look like a warm, ordinary mother, because her image badly needed repair. If it drew you in, you like music that is polished, warm and a little theatrical about its own sincerity.",
          readKo: "왕비는 다정하고 평범한 어머니로 보이길 바랐고, 그 이미지가 절실했습니다. 이 그림에 끌렸다면 윤이 나고 따뜻하며, 자신의 진심조차 조금 연극적으로 보여 주는 음악을 좋아하실 거예요." },
        { id: "recamier", m: "calm", f: "Madame_Récamier_painted_by_Jacques-Louis_David_in_1800.jpg", y: 1800,
          en: "Portrait of Madame Récamier", ko: "레카미에 부인의 초상", byEn: "Jacques-Louis David", byKo: "자크 루이 다비드",
          moodEn: "poised simplicity", moodKo: "절제된 우아함",
          tagEn: "Neoclassicism · minimalist chic", tagKo: "신고전주의 · 미니멀 시크",
          readEn: "Madame Récamier reclines on a sofa in a nearly bare room, a barefoot icon of cool simplicity. If it spoke to you, you like music that is poised, spare and elegantly unhurried.",
          readKo: "레카미에 부인이 거의 텅 빈 방의 소파에 기대어 있습니다. 이 그림이 말을 걸었다면 단정하고 군더더기 없으며 서두르지 않는 음악을 좋아하실 거예요." },
        { id: "psyche", m: "tender", f: "Psyché_et_l'Amour_-_François_Gérard_-_Musée_du_Louvre_Peintures_INV_4739_;_L_3778.jpg", y: 1798,
          en: "Psyche and Cupid", ko: "프시케와 에로스", byEn: "François Gérard", byKo: "프랑수아 제라르",
          moodEn: "tender idealism", moodKo: "다정한 이상",
          tagEn: "Neoclassicism · myth with a blush", tagKo: "신고전주의 · 홍조 띤 신화",
          readEn: "Cupid kisses Psyche’s forehead as she wakes into love, all soft modelling and cool marble flesh tones. If you chose it, you like music that is tender, delicate and gently idealised.",
          readKo: "에로스가 잠에서 깨어 사랑에 눈뜨는 프시케의 이마에 입 맞춥니다. 이 그림을 골랐다면 다정하고 섬세하며 곱게 이상화된 음악을 좋아하실 거예요." },
        { id: "endymion", m: "tender", f: "The_Sleep_of_Endymion_-_Girodet_(Louvre_INV_4935).jpg", y: 1791,
          en: "The Sleep of Endymion", ko: "엔디미온의 잠", byEn: "Anne-Louis Girodet", byKo: "안 루이 지로데",
          moodEn: "moonlit dreaminess", moodKo: "달빛 같은 몽환",
          tagEn: "Neoclassicism · moonlight with a twist", tagKo: "신고전주의 · 달빛의 반전",
          readEn: "Moonlight slips through the leaves and caresses a sleeping shepherd. If it caught your eye, you like music that is hushed, luminous and a little dreamy.",
          readKo: "달빛이 나뭇잎 사이로 스며들어 잠든 목동을 어루만집니다. 이 그림이 눈에 들어왔다면 숨죽인 듯 은은하게 빛나는, 조금 몽환적인 음악을 좋아하실 거예요." },
        { id: "thetis", m: "calm", f: "Jupiter_et_Thétis_-_Ingres,_1811.jpg", y: 1811,
          en: "Jupiter and Thetis", ko: "제우스와 테티스", byEn: "J.-A.-D. Ingres", byKo: "앵그르",
          moodEn: "majestic composure", moodKo: "장엄한 침착",
          tagEn: "Neoclassicism · Olympian drama", tagKo: "신고전주의 · 올림포스의 드라마",
          readEn: "Thetis begs Zeus to spare her son, touching his chin while he sits enthroned like a marble monument. If you picked it, you like music that is majestic, controlled and utterly sure of itself.",
          readKo: "테티스가 아들을 살려 달라며 옥좌의 제우스 턱에 손을 댑니다. 이 그림을 골랐다면 장엄하고 절제되어 있으며 스스로를 확신하는 음악을 좋아하실 거예요." },
        { id: "valpincon", m: "elegant", f: "Jean-Auguste-Dominique_Ingres_-_La_Baigneuse_Valpinçon.jpg", y: 1808,
          en: "The Valpinçon Bather", ko: "발팽송의 목욕하는 여인", byEn: "J.-A.-D. Ingres", byKo: "앵그르",
          moodEn: "serene smoothness", moodKo: "고요하고 매끄러운 결",
          tagEn: "Neoclassicism · a back worth a thousand curves", tagKo: "신고전주의 · 곡선 하나로 말하는 뒷모습",
          readEn: "No face, no story, just a back, a turban and a glowing curve of light. If it won you over, you like music that is serene, smooth and almost silent in its confidence.",
          readKo: "얼굴도 이야기도 없이 등과 터번, 그리고 빛나는 곡선만 있습니다. 이 그림에 마음을 빼앗겼다면 평온하고 매끄러우며, 조용한 자신감이 느껴지는 음악을 좋아하실 거예요." },
        { id: "kauffman", m: "tender", f: "The_Artist_in_the_Character_of_Design_Listening_to_the_Inspiration_of_Poetry_by_Angelica_Kauffmann.jpg", y: 1782,
          en: "Self-Portrait as “Design”", ko: "‘디자인’으로 분한 자화상", byEn: "Angelica Kauffman", byKo: "안젤리카 카우프만",
          moodEn: "thoughtful grace", moodKo: "사려 깊은 우아함",
          tagEn: "Neoclassicism · a painter among the muses", tagKo: "신고전주의 · 뮤즈들 곁의 화가",
          readEn: "Kauffman paints herself as Design, listening as Poetry whispers inspiration. If it called to you, you like music that is graceful, thoughtful and a little learned.",
          readKo: "카우프만은 시(詩)가 영감을 속삭이는 소리에 귀 기울이는 ‘디자인’의 모습으로 자신을 그렸습니다. 이 그림이 마음을 끌었다면 우아하고 사려 깊으며 약간은 학구적인 음악을 좋아하실 거예요." },
        { id: "morningwalk", m: "galant", f: "Thomas_Gainsborough_-_Mr_and_Mrs_William_Hallett_('The_Morning_Walk')_-_WGA8418.jpg", y: 1785,
          en: "The Morning Walk", ko: "아침 산책", byEn: "Thomas Gainsborough", byKo: "토머스 게인즈버러",
          moodEn: "breezy grace", moodKo: "산뜻한 우아함",
          tagEn: "Georgian portraiture · fresh-air elegance", tagKo: "조지 왕조 초상화 · 맑은 공기 같은 우아함",
          readEn: "A young couple strolls with their dog in a gust of wind, rendered in Gainsborough’s feathery brushwork. If you picked it, you like music that strolls along: bright, natural and in no hurry.",
          readKo: "젊은 부부가 강아지와 함께 바람 속을 거닐고, 게인즈버러 특유의 깃털 같은 붓질이 그 공기를 담았습니다. 이 그림을 골랐다면 산책하듯 밝고 자연스럽고 서두르지 않는 음악을 좋아하실 거예요." },
        { id: "reader", m: "tender", f: "Fragonard,_The_Reader.jpg", y: 1770,
          en: "The Reader", ko: "책 읽는 소녀", byEn: "Jean-Honoré Fragonard", byKo: "장 오노레 프라고나르",
          moodEn: "private warmth", moodKo: "은밀한 온기",
          tagEn: "Rococo · a quiet moment", tagKo: "로코코 · 조용한 한순간",
          readEn: "A girl in a yellow dress is lost in her book, caught in quick, feathery strokes. If you chose it, you like music that is warm, private and a little confiding.",
          readKo: "노란 드레스를 입은 소녀가 책에 푹 빠져 있고, 빠르고 가벼운 붓질이 그 순간을 붙잡았습니다. 이 그림을 골랐다면 따뜻하고 사적이며 속삭이듯 털어놓는 음악을 좋아하실 거예요." },
        { id: "milkmaid", m: "radiant", f: "Johannes_Vermeer_-_Het_melkmeisje_-_Google_Art_Project.png", y: 1658,
          en: "The Milkmaid", ko: "우유 따르는 여인", byEn: "Johannes Vermeer", byKo: "요하네스 베르메르",
          moodEn: "quiet labour in a single pour", moodKo: "한 줄기 고요한 노동",
          tagEn: "Dutch Baroque · kitchen light", tagKo: "네덜란드 바로크 · 부엌의 빛",
          readEn: "A thin stream of milk holds the whole picture still. If it drew you in, you like music that is plain, clear and unhurried.",
          readKo: "가느다란 우유 줄기 하나에 그림 전체가 멈춰 있습니다. 이 그림에 끌렸다면 소박하고 맑으며 서두르지 않는 음악을 좋아하실 거예요." },
        { id: "delft", m: "radiant", f: "Vermeer-view-of-delft.jpg", y: 1661,
          en: "View of Delft", ko: "델프트 풍경", byEn: "Johannes Vermeer", byKo: "요하네스 베르메르",
          moodEn: "a clear town under clouds", moodKo: "구름 아래 맑은 도시",
          tagEn: "Dutch Baroque · a city painted in light", tagKo: "네덜란드 바로크 · 빛으로 그린 도시",
          readEn: "Under the cloud shadow only a few roofs catch the sun. If you like it, broad, calm, softly glowing music suits you.",
          readKo: "구름 그림자 아래로 지붕 몇 개만 햇빛을 받습니다. 이 그림이 좋다면 넓고 차분하며 은은하게 빛나는 음악이 어울려요." },
        { id: "balance", m: "solemn", f: "Johannes_Vermeer_-_Woman_Holding_a_Balance_-_Google_Art_Project.jpg", y: 1664,
          en: "Woman Holding a Balance", ko: "저울을 든 여인", byEn: "Johannes Vermeer", byKo: "요하네스 베르메르",
          moodEn: "a silence weighing balance", moodKo: "균형을 재는 침묵",
          tagEn: "Dutch Baroque · the empty scales", tagKo: "네덜란드 바로크 · 비어 있는 저울",
          readEn: "The scales are empty and she studies that empty balance. If it stopped you, you like slow, clean music that leaves room to think.",
          readKo: "저울은 비어 있고, 여인은 그 빈 균형을 바라봅니다. 이 그림 앞에서 멈췄다면 생각할 틈을 주는 느리고 정갈한 음악을 좋아하실 거예요." },
        { id: "littlestreet", m: "calm", f: "Johannes_Vermeer_-_Gezicht_op_huizen_in_Delft,_bekend_als_'Het_straatje'_-_Google_Art_Project.jpg", y: 1658,
          en: "The Little Street", ko: "작은 거리", byEn: "Johannes Vermeer", byKo: "요하네스 베르메르",
          moodEn: "an ordinary day in the lane", moodKo: "골목의 평범한 하루",
          tagEn: "Dutch Baroque · a street like a still life", tagKo: "네덜란드 바로크 · 일상의 정물 같은 거리",
          readEn: "Red brick, white shutters, neighbours bent over their work. If it feels easy, you like simple music whose repetitions are a pleasure.",
          readKo: "빨간 벽돌, 하얀 덧창, 고개 숙인 이웃들. 이 그림이 편하다면 소박하고 반복이 기분 좋은 음악이 취향일 거예요." },
        { id: "courtyard", m: "calm", f: "The_Courtyard_of_a_House_in_Delft.jpg", y: 1658,
          en: "The Courtyard of a House in Delft", ko: "델프트 집의 안뜰", byEn: "Pieter de Hooch", byKo: "피터르 더 호흐",
          moodEn: "calm seen through a doorway", moodKo: "문 너머로 보이는 평온",
          tagEn: "Dutch Baroque · light between doors", tagKo: "네덜란드 바로크 · 문과 문 사이의 빛",
          readEn: "Through the open door another space opens beyond. If it drew you in, you like neat, warm, homely music.",
          readKo: "열린 문 너머로 또 하나의 공간이 이어집니다. 이 그림에 끌렸다면 단정하고 따뜻하며 집 같은 음악을 좋아하실 거예요." },
        { id: "bubbles", m: "tender", f: "Soap_Bubbles_MET_DP356133.jpg", y: 1734,
          en: "Soap Bubbles", ko: "비눗방울", byEn: "Jean-Siméon Chardin", byKo: "장 바티스트 시메옹 샤르댕",
          moodEn: "a moment swelling up", moodKo: "부풀어 오르는 한순간",
          tagEn: "Rococo · a game about to vanish", tagKo: "로코코 · 사라지기 직전의 놀이",
          readEn: "A boy at the window holds his breath and grows a bubble. If you like it, light, delicate music that might vanish any second suits you.",
          readKo: "창가의 소년이 숨을 참고 비눗방울을 키웁니다. 이 그림이 좋다면 가볍고 섬세하며 금방 사라질 것 같은 음악이 어울려요." },
        { id: "grace", m: "tender", f: "Le_Bénédicité_de_Jean_Siméon_Chardin_(cropped).jpg", y: 1740,
          en: "Saying Grace", ko: "식사 전 기도", byEn: "Jean-Siméon Chardin", byKo: "장 바티스트 시메옹 샤르댕",
          moodEn: "a small prayer at the table", moodKo: "식탁 위의 작은 기도",
          tagEn: "Rococo · faith in the kitchen", tagKo: "로코코 · 부엌의 신앙",
          readEn: "The mother waits while the child folds her hands. If it touched you, you like quiet, tender, chamber-like music.",
          readKo: "엄마는 기다리고 아이는 두 손을 모읍니다. 이 그림에 마음이 갔다면 조용하고 다정한 실내악 같은 음악을 좋아하실 거예요." },
        { id: "magdalene", m: "solemn", f: "Georges_de_La_Tour_-_Magdalen_of_Night_Light_-_WGA12337.jpg", y: 1640,
          en: "Magdalene with the Smoking Flame", ko: "촛불 앞의 막달라 마리아", byEn: "Georges de La Tour", byKo: "조르주 드 라 투르",
          moodEn: "meditation by one candle", moodKo: "촛불 하나의 명상",
          tagEn: "French Baroque · a candle in the dark", tagKo: "프랑스 바로크 · 어둠 속의 촛불",
          readEn: "A woman rests her hand on a skull and watches the flame. If it held you, you like dark, still music that lingers.",
          readKo: "해골 위에 손을 얹고 촛불을 바라보는 여인. 이 그림에 끌렸다면 어둡고 고요하며 오래 머무는 음악이 취향일 거예요." },
        { id: "lemons", m: "solemn", f: "Francisco_de_Zurbarán_-_Still_Life_with_Lemons,_Oranges_and_a_Rose.jpg", y: 1633,
          en: "Still Life with Lemons, Oranges and a Rose", ko: "레몬, 오렌지와 장미가 있는 정물", byEn: "Francisco de Zurbarán", byKo: "프란시스코 데 수르바란",
          moodEn: "fruit laid out like an altar", moodKo: "제단처럼 놓인 과일",
          tagEn: "Spanish Baroque · a still life turned prayer", tagKo: "스페인 바로크 · 기도가 된 정물",
          readEn: "Fruit and a flower sit like offerings against black. If you like it, simple, devout music suits you.",
          readKo: "검은 배경 앞에 과일과 꽃이 제물처럼 놓였습니다. 이 그림이 좋다면 단순하고 경건한 음악을 좋아하실 거예요." },
        { id: "sheba", m: "radiant", f: "Claude_Lorrain_008.jpg", y: 1648,
          en: "Seaport with the Embarkation of the Queen of Sheba", ko: "시바 여왕의 승선", byEn: "Claude Lorrain", byKo: "클로드 로랭",
          moodEn: "a golden departure", moodKo: "황금빛 출항",
          tagEn: "French classical landscape · a harbour facing the sun", tagKo: "프랑스 고전주의 풍경 · 해를 마주한 항구",
          readEn: "The sun shines straight into the harbour as the ship prepares to leave. If it drew you in, warm, spreading, majestic music suits you.",
          readKo: "해가 정면에서 항구를 비추고 배는 떠날 준비를 합니다. 이 그림에 끌렸다면 따뜻하게 퍼지는 장엄한 음악이 어울려요." },
        { id: "philosopher", m: "solemn", f: "Rembrandt_-_The_Philosopher_in_Meditation.jpg", y: 1632,
          en: "Philosopher in Meditation", ko: "명상하는 철학자", byEn: "Rembrandt van Rijn", byKo: "렘브란트 판 레인",
          moodEn: "thought beneath a spiral stair", moodKo: "나선 계단 아래의 사색",
          tagEn: "Dutch Baroque · a whirl of light and dark", tagKo: "네덜란드 바로크 · 빛과 어둠의 소용돌이",
          readEn: "Window light wraps the old man while the stair curls into darkness. If you like it, deep, slowly thinking music suits you.",
          readKo: "창으로 든 빛이 노인을 감싸고 계단은 어둠으로 말려 올라갑니다. 이 그림이 좋다면 깊고 느리게 생각하는 음악을 좋아하실 거예요." },
        { id: "chocolate", m: "calm", f: "Jean-Etienne_Liotard_-_The_Chocolate_Girl_-_Google_Art_Project.jpg", y: 1744,
          en: "The Chocolate Girl", ko: "초콜릿을 나르는 소녀", byEn: "Jean-Étienne Liotard", byKo: "장 에티엔 리오타르",
          moodEn: "a careful step", moodKo: "조심스러운 걸음",
          tagEn: "Rococo pastel · clear stillness", tagKo: "로코코 파스텔 · 맑은 정적",
          readEn: "A girl in profile walks so the cup will not tremble. If you like it, clear, tidy miniatures suit you.",
          readKo: "잔이 흔들리지 않게 걷는 소녀의 옆모습. 이 그림이 마음에 든다면 맑고 단정한 소품 같은 음악이 어울려요." },
        { id: "paul", m: "dramatic", f: "The_Conversion_of_Saint_Paul-Caravaggio_(c._1600-1).jpg", y: 1601,
          en: "Conversion of Saint Paul", ko: "성 바울의 회심", byEn: "Caravaggio", byKo: "카라바조",
          moodEn: "light pouring under the horse", moodKo: "말 아래로 쏟아진 빛",
          tagEn: "Italian Baroque · the moment of the fall", tagKo: "이탈리아 바로크 · 바닥에 쓰러진 순간",
          readEn: "A man thrown from his horse opens his arms to the light. If it drew you in, you like music that suddenly breaks open.",
          readKo: "말에서 떨어진 사내가 두 팔을 벌려 빛을 받습니다. 이 그림에 끌렸다면 갑자기 열리는 극적인 음악을 좋아하실 거예요." },
        { id: "elevation", m: "dramatic", f: "Peter_Paul_Rubens_-_Raising_of_the_Cross_(Antwerp_Cathedral).JPG", y: 1610,
          en: "The Elevation of the Cross", ko: "십자가를 세움", byEn: "Peter Paul Rubens", byKo: "페테르 파울 루벤스",
          moodEn: "a whole-body push upward", moodKo: "온몸으로 밀어 올리는 힘",
          tagEn: "Flemish Baroque · the force of the diagonal", tagKo: "플랑드르 바로크 · 대각선의 힘",
          readEn: "Many men heave the cross up along a diagonal. If it drew you in, you like weighty, driving, monumental music.",
          readKo: "여러 사람이 온 힘으로 십자가를 대각선으로 일으킵니다. 이 그림에 끌렸다면 묵직하게 밀고 나가는 웅장한 음악을 좋아하실 거예요." },
        { id: "warconseq", m: "grand", f: "Los_horrores_de_la_guerra.jpg", y: 1638,
          en: "The Consequences of War", ko: "전쟁의 결과", byEn: "Peter Paul Rubens", byKo: "페테르 파울 루벤스",
          moodEn: "a war no one can hold back", moodKo: "붙잡을 수 없는 전쟁",
          tagEn: "Flemish Baroque · an allegory pleading for peace", tagKo: "플랑드르 바로크 · 평화를 호소하는 알레고리",
          readEn: "Venus clings to him, yet Mars strides off to war. If it reached you, splendid but grieving music suits you.",
          readKo: "비너스가 붙잡아도 마르스는 전쟁으로 걸어 나갑니다. 이 그림이 와닿았다면 화려하면서 비통한 음악이 어울려요." },
        { id: "breda", m: "heroic", f: "Velazquez-The_Surrender_of_Breda.jpg", y: 1635,
          en: "The Surrender of Breda", ko: "브레다의 항복", byEn: "Diego Velázquez", byKo: "디에고 벨라스케스",
          moodEn: "a hand that raises the defeated", moodKo: "패자를 일으키는 손",
          tagEn: "Spanish Baroque · a forest of lances", tagKo: "스페인 바로크 · 창의 숲",
          readEn: "The victor stops the defeated general from kneeling. If it drew you in, you like dignified, gracious music.",
          readKo: "승자가 무릎 꿇으려는 패장을 붙잡아 세웁니다. 이 그림에 끌렸다면 위엄 있으면서 품격 있는 음악을 좋아하실 거예요." },
        { id: "wolfe", m: "heroic", f: "Benjamin_West_005.jpg", y: 1770,
          en: "The Death of General Wolfe", ko: "울프 장군의 죽음", byEn: "Benjamin West", byKo: "벤저민 웨스트",
          moodEn: "a general falling at the moment of victory", moodKo: "승리의 순간 쓰러진 장군",
          tagEn: "Neoclassicism · a hero in modern uniform", tagKo: "신고전주의 · 근대 군복을 입은 영웅화",
          readEn: "As news of victory arrives, the general dies. If it drew you in, you like solemn, mourning, march-like music.",
          readKo: "승전 소식이 들려오는 순간 장군은 숨을 거둡니다. 이 그림에 끌렸다면 장엄하고 애도하는 행진 같은 음악을 좋아하실 거예요." },
        { id: "coronation", m: "grand", f: "Jacques-Louis_David_-_The_Coronation_of_Napoleon_(1805-1807).jpg", y: 1807,
          en: "The Coronation of Napoleon", ko: "나폴레옹 대관식", byEn: "Jacques-Louis David", byKo: "자크 루이 다비드",
          moodEn: "the rite of empire", moodKo: "제국의 의식",
          tagEn: "Neoclassicism · a vast state ceremony", tagKo: "신고전주의 · 거대한 국가 의식",
          readEn: "The emperor himself crowns the empress. If you like it, splendid, majestic music with ringing brass suits you.",
          readKo: "황제가 직접 황후에게 관을 씌우는 장면입니다. 이 그림이 좋다면 금관이 울리는 화려하고 장엄한 음악을 좋아하실 거예요." },
        { id: "cythera", m: "galant", f: "L'Embarquement_pour_Cythère,_by_Antoine_Watteau,_from_C2RMF_retouched.jpg", y: 1717,
          en: "Pilgrimage to Cythera", ko: "키테라섬의 순례", byEn: "Jean-Antoine Watteau", byKo: "장 앙투안 바토",
          moodEn: "leaving the island of love", moodKo: "사랑의 섬을 떠나며",
          tagEn: "Rococo · fête galante", tagKo: "로코코 · 페트 갈랑트",
          readEn: "Lovers drift reluctantly back to the boat from love's island. If you like it, graceful, slightly wistful music suits you.",
          readKo: "연인들이 사랑의 섬에서 아쉽게 배로 향합니다. 이 그림이 좋다면 우아하면서 살짝 아쉬운 음악을 좋아하실 거예요." },
        { id: "pompadour", m: "elegant", f: "François_Boucher_-_Madame_de_Pompadour,_1759.jpg", y: 1756,
          en: "Madame de Pompadour", ko: "퐁파두르 부인", byEn: "François Boucher", byKo: "프랑수아 부셰",
          moodEn: "a hostess holding a book", moodKo: "책을 든 여주인",
          tagEn: "Rococo · a portrait of silk and ribbons", tagKo: "로코코 · 비단과 리본의 초상",
          readEn: "Among the roses and ribbons of her gown, she holds a book. If it drew you in, opulent but refined music suits you.",
          readKo: "드레스의 장미와 리본 사이로 손에는 책이 있습니다. 이 그림에 끌렸다면 화려하지만 품위 있는 음악이 어울려요." },
        { id: "stolenkiss", m: "galant", f: "The_Stolen_Kiss_(1920)_-_Binney_&_La_Rocque.jpg", y: 1788,
          en: "The Stolen Kiss", ko: "훔친 입맞춤", byEn: "Jean-Honoré Fragonard", byKo: "장 오노레 프라고나르",
          moodEn: "a secret at the door", moodKo: "문틈의 비밀",
          tagEn: "Rococo · the last bit of mischief", tagKo: "로코코 · 마지막 장난",
          readEn: "A kiss stolen by the door before the next room notices. If it made you smile, playful, sparkling music suits you.",
          readKo: "옆방에 들킬세라 문가에서 훔친 입맞춤. 이 그림에 웃음이 났다면 장난스럽고 반짝이는 음악을 좋아하실 거예요." },
        { id: "sheridan", m: "elegant", f: "Thomas_Gainsborough_-_Mrs._Richard_Brinsley_Sheridan_.jpg", y: 1785,
          en: "Mrs. Richard Brinsley Sheridan", ko: "셰리든 부인", byEn: "Thomas Gainsborough", byKo: "토머스 게인즈버러",
          moodEn: "a singer seated in the wind", moodKo: "바람 속에 앉은 가수",
          tagEn: "Georgian portrait · a figure merged with landscape", tagKo: "조지 왕조 초상화 · 풍경과 하나 된 인물",
          readEn: "A singer painted with brushstrokes as loose as the woodland breeze. If you like it, flowing, song-like music suits you.",
          readKo: "가수였던 여인이 숲속 바람과 같은 붓질로 그려졌습니다. 이 그림이 좋다면 흐르듯 부드러운 노래 같은 음악이 어울려요." },
        { id: "blueboy", m: "elegant", f: "The_Blue_Boy.jpg", y: 1770,
          en: "The Blue Boy", ko: "블루 보이", byEn: "Thomas Gainsborough", byKo: "토머스 게인즈버러",
          moodEn: "the confidence of blue silk", moodKo: "푸른 비단의 자신감",
          tagEn: "Georgian portrait · a homage to van Dyck", tagKo: "조지 왕조 초상화 · 반다이크에 대한 오마주",
          readEn: "A boy in blue satin stands tall and sure. If it drew you in, bright, self-assured music suits you.",
          readKo: "푸른 비단옷을 입은 소년이 당당히 서 있습니다. 이 그림에 끌렸다면 반짝이고 자신감 있는 음악을 좋아하실 거예요." },
        { id: "pinkie", m: "elegant", f: "Pinkie_detailed.jpg", y: 1794,
          en: "Pinkie", ko: "핑키", byEn: "Thomas Lawrence", byKo: "토머스 로런스",
          moodEn: "a girl facing the wind", moodKo: "바람을 맞는 소녀",
          tagEn: "Georgian portrait · set against the sky", tagKo: "조지 왕조 초상화 · 하늘을 배경으로",
          readEn: "Pink ribbons flutter as a girl stands against the sky. If you like it, light, fresh music suits you.",
          readKo: "분홍 리본이 바람에 날리는 소녀가 하늘 앞에 서 있습니다. 이 그림이 좋다면 경쾌하고 산뜻한 음악이 어울려요." },
        { id: "strawhat", m: "elegant", f: "Self-portrait_in_a_Straw_Hat_by_Elisabeth-Louise_Vigée-Lebrun.jpg", y: 1782,
          en: "Self-portrait in a Straw Hat", ko: "밀짚모자를 쓴 자화상", byEn: "Élisabeth Vigée Le Brun", byKo: "엘리자베트 비제 르브룅",
          moodEn: "the painter in sunlight", moodKo: "햇살 속의 화가",
          tagEn: "Neoclassical portrait · an answer to Rubens", tagKo: "신고전주의 초상 · 루벤스에 대한 응답",
          readEn: "Palette in hand, the painter smiles in open-air light. If it drew you in, bright, clear music suits you.",
          readKo: "팔레트를 든 화가가 야외의 빛 속에서 웃고 있습니다. 이 그림에 끌렸다면 밝고 맑은 음악을 좋아하실 거예요." },
        { id: "charleshunt", m: "elegant", f: "Portrait_de_Charles_1er,_roi_d'Angleterre,_à_la_chasse_-_Antoon_van_Dyck_-_Musée_du_Louvre_Peintures_INV_1236_;_MR_666.jpg", y: 1635,
          en: "Charles I at the Hunt", ko: "사냥터의 찰스 1세", byEn: "Anthony van Dyck", byKo: "안토니 반 다이크",
          moodEn: "dignity that looks effortless", moodKo: "무심한 듯한 위엄",
          tagEn: "Flemish Baroque · the model court portrait", tagKo: "플랑드르 바로크 · 궁정 초상의 기준",
          readEn: "The king has dismounted and stands casually, yet authority flows from him. If you like it, music of restrained dignity suits you.",
          readKo: "왕이 말에서 내려 무심하게 서 있는데도 위엄이 흐릅니다. 이 그림이 좋다면 절제된 품격의 음악이 어울려요." },
        { id: "gardenlove", m: "joy", f: "El_Jardín_del_Amor_(Rubens).jpg", y: 1633,
          en: "The Garden of Love", ko: "사랑의 정원", byEn: "Peter Paul Rubens", byKo: "페테르 파울 루벤스",
          moodEn: "a festival in the garden", moodKo: "정원의 축제",
          tagEn: "Flemish Baroque · a feast with flying cupids", tagKo: "플랑드르 바로크 · 큐피드가 날아다니는 연회",
          readEn: "Cupids fly among the lovers in the garden. If it drew you in, rich, joyful music suits you.",
          readKo: "큐피드들이 연인들 사이를 날아다니는 정원. 이 그림에 끌렸다면 풍성하고 즐거운 음악을 좋아하실 거예요." },
        { id: "oldsing", m: "joy", f: "Jan_Steen_022_colour_version_01.jpg", y: 1668,
          en: "As the Old Sing, So Pipe the Young", ko: "노인이 노래하면 아이는 피리를 분다", byEn: "Jan Steen", byKo: "얀 스테인",
          moodEn: "the whole family's noisy chorus", moodKo: "온 가족의 소란한 합창",
          tagEn: "Dutch Baroque · a genre scene with a lesson", tagKo: "네덜란드 바로크 · 교훈이 숨은 풍속화",
          readEn: "Grandmother sings, the child pipes, the whole house is loud. If it made you smile, lively, humorous music suits you.",
          readKo: "할머니는 노래하고 아이는 피리를 불고, 온 식구가 떠들썩합니다. 이 그림에 웃음이 났다면 경쾌하고 유머 있는 음악이 어울려요." },
        { id: "toilette", m: "galant", f: "The_Toilet_of_Venus,_by_François_Boucher.jpg", y: 1751,
          en: "The Toilette of Venus", ko: "비너스의 단장", byEn: "François Boucher", byKo: "프랑수아 부셰",
          moodEn: "a goddess in pink clouds", moodKo: "분홍빛 구름 속의 여신",
          tagEn: "Rococo · myth for the bedroom", tagKo: "로코코 · 침실을 위한 신화",
          readEn: "Surrounded by doves and cupids, Venus does her hair. If you like it, sweet, ornamental music suits you.",
          readKo: "비둘기와 큐피드에 둘러싸인 비너스가 머리를 다듬습니다. 이 그림이 좋다면 달콤하고 장식적인 음악을 좋아하실 거예요." },
        { id: "ageinnocence", m: "tender", f: "The_Age_of_Innocence_-_Reynolds.jpg", y: 1788,
          en: "The Age of Innocence", ko: "순수의 시대", byEn: "Joshua Reynolds", byKo: "조슈아 레이놀즈",
          moodEn: "a child with folded hands", moodKo: "두 손을 모은 아이",
          tagEn: "Georgian portrait · a child's face", tagKo: "조지 왕조 초상화 · 아이의 얼굴",
          readEn: "A child sitting in the grass clasps her hands and gazes away. If it touched you, simple, tender melodies suit you.",
          readKo: "풀밭에 앉은 아이가 손을 모으고 먼 곳을 봅니다. 이 그림에 마음이 갔다면 단순하고 다정한 선율을 좋아하실 거예요." },
        { id: "arcadia", m: "calm", f: "Nicolas_Poussin_-_Et_in_Arcadia_ego_(deuxième_version).jpg", y: 1638,
          en: "Et in Arcadia ego", ko: "아르카디아의 목자들", byEn: "Nicolas Poussin", byKo: "니콜라 푸생",
          moodEn: "a question before a tomb", moodKo: "무덤 앞의 질문",
          tagEn: "French classicism · death even in paradise", tagKo: "프랑스 고전주의 · 낙원에도 있는 죽음",
          readEn: "Shepherds trace the words carved on a tomb in paradise. If you like it, clear but thoughtful music suits you.",
          readKo: "목자들이 낙원의 무덤에 새겨진 글자를 짚어 읽습니다. 이 그림이 좋다면 맑지만 생각에 잠기게 하는 음악이 어울려요." },
        { id: "dancetime", m: "grand", f: "The_dance_to_the_music_of_time_c._1640.jpg", y: 1640,
          en: "A Dance to the Music of Time", ko: "시간의 음악에 맞춘 춤", byEn: "Nicolas Poussin", byKo: "니콜라 푸생",
          moodEn: "the turning seasons", moodKo: "돌고 도는 계절",
          tagEn: "French classicism · an allegory of time", tagKo: "프랑스 고전주의 · 시간의 알레고리",
          readEn: "Four figures hold hands and circle to time's harp. If it drew you in, graceful, circling dances suit you.",
          readKo: "네 사람이 손을 잡고 시간의 하프 소리에 맞춰 돕니다. 이 그림에 끌렸다면 우아하게 순환하는 춤곡을 좋아하실 거예요." },
        { id: "isaac", m: "calm", f: "The_Mill,_or_Landscape_with_the_Marriage_of_Isaac_and_Rebecca.jpg", y: 1648,
          en: "Landscape with the Marriage of Isaac and Rebekah", ko: "이삭과 리브가의 결혼", byEn: "Claude Lorrain", byKo: "클로드 로랭",
          moodEn: "an afternoon in an ideal land", moodKo: "이상향의 오후",
          tagEn: "French classical landscape · ideal nature", tagKo: "프랑스 고전주의 풍경 · 이상적인 자연",
          readEn: "A small celebration in a landscape where trees, river and sun are perfectly placed. If you like it, broad, peaceful pastoral music suits you.",
          readKo: "나무와 강과 햇빛이 완벽하게 놓인 풍경 속의 작은 잔치. 이 그림이 좋다면 넓고 평온한 목가적 음악이 어울려요." },
        { id: "paris", m: "tender", f: "Rubens_-_Judgement_of_Paris.jpg", y: 1636,
          en: "The Judgement of Paris", ko: "파리스의 심판", byEn: "Peter Paul Rubens", byKo: "페테르 파울 루벤스",
          moodEn: "the choice of the golden apple", moodKo: "황금 사과의 선택",
          tagEn: "Flemish Baroque · three goddesses", tagKo: "플랑드르 바로크 · 세 여신",
          readEn: "A shepherd is about to hand the apple to one of three goddesses. If it drew you in, rich, sensuous music suits you.",
          readKo: "목동이 세 여신 중 한 명에게 사과를 건네려 합니다. 이 그림에 끌렸다면 풍성하고 감각적인 음악을 좋아하실 거예요." },
        { id: "bacchus", m: "grand", f: "The_Triumph_of_Bacchus_and_Ariadne_-_Annibale_Carracci_-_1597_-_Farnese_Gallery,_RomeFXD.jpg", y: 1600,
          en: "The Triumph of Bacchus and Ariadne", ko: "바쿠스와 아리아드네의 승리", byEn: "Annibale Carracci", byKo: "안니발레 카라치",
          moodEn: "a procession of the gods", moodKo: "신들의 행렬",
          tagEn: "Italian Baroque · the Farnese ceiling", tagKo: "이탈리아 바로크 · 파르네세 궁 천장화",
          readEn: "The gods' chariot rolls past, pulling music and dance with it. If you like it, festive, splendid music suits you.",
          readKo: "신들의 수레가 음악과 춤을 끌고 지나갑니다. 이 그림이 좋다면 축제 같은 화려한 음악이 어울려요." },
        { id: "atalanta", m: "tender", f: "Guido_Reni_-_Atalanta_and_Hippomenes_-_Google_Art_Project.jpg", y: 1620,
          en: "Atalanta and Hippomenes", ko: "아탈란테와 히포메네스", byEn: "Guido Reni", byKo: "귀도 레니",
          moodEn: "a golden apple and a race", moodKo: "황금 사과와 달리기",
          tagEn: "Italian Baroque · a race like a dance", tagKo: "이탈리아 바로크 · 춤추는 듯한 경주",
          readEn: "The runner bends mid-stride to pick up a golden apple. If it drew you in, gracefully moving music suits you.",
          readKo: "달리던 여인이 몸을 굽혀 황금 사과를 줍습니다. 이 그림에 끌렸다면 우아하게 움직이는 음악을 좋아하실 거예요." },
        { id: "venustriumph", m: "tender", f: "The_Triumph_of_Venus,_by_François_Boucher.jpg", y: 1740,
          en: "The Triumph of Venus", ko: "비너스의 승리", byEn: "François Boucher", byKo: "프랑수아 부셰",
          moodEn: "a pink festival on the sea", moodKo: "바다 위의 분홍빛 축제",
          tagEn: "Rococo · a whirl of waves and drapery", tagKo: "로코코 · 물결과 천의 소용돌이",
          readEn: "Sea gods spread a cloth to welcome Venus. If you like it, sparkling, rippling music suits you.",
          readKo: "바다의 신들이 천을 펼쳐 비너스를 맞이합니다. 이 그림이 좋다면 반짝이고 물결치는 음악이 어울려요." },
        { id: "graces", m: "calm", f: "Jean-Baptiste_Regnault_-_The_Three_Graces,_1793.jpg", y: 1797,
          en: "The Three Graces", ko: "삼미신", byEn: "Jean-Baptiste Regnault", byKo: "장 바티스트 르뇨",
          moodEn: "three who hold each other", moodKo: "맞잡은 세 사람",
          tagEn: "Neoclassicism · sculptural grace", tagKo: "신고전주의 · 조각 같은 우아함",
          readEn: "Three goddesses stand quietly, arms around each other's shoulders. If it drew you in, balanced, transparent music suits you.",
          readKo: "세 여신이 서로 어깨를 감싸고 고요히 서 있습니다. 이 그림에 끌렸다면 균형 잡히고 투명한 음악을 좋아하실 거예요." },
        { id: "ossian", m: "grand", f: "Anne-Louis_Girodet_De_Roucy-Trioson_-_Ossian_Receiving_the_Ghosts_of_French_Heroes_-_WGA09512.jpg", y: 1802,
          en: "Ossian Receiving the Ghosts of the French Heroes", ko: "영웅들의 혼을 맞는 오시안", byEn: "Anne-Louis Girodet", byKo: "안 루이 지로데",
          moodEn: "a feast of ghosts", moodKo: "유령들의 연회",
          tagEn: "Neoclassicism · dream and legend", tagKo: "신고전주의 · 꿈과 전설",
          readEn: "In the moonlight the ghosts of warriors greet the legendary bard. If it drew you in, mysterious, grand music suits you.",
          readKo: "달빛 속에서 전사들의 유령이 전설의 시인을 맞습니다. 이 그림에 끌렸다면 신비롭고 웅장한 음악을 좋아하실 거예요." },
        { id: "oedipus", m: "calm", f: "Œdipe_explique_l'énigme_du_sphinx_-_Jean-Auguste_Dominique_Ingres_-_Musée_du_Louvre_Peintures_RF_218.jpg", y: 1808,
          en: "Oedipus and the Sphinx", ko: "오이디푸스와 스핑크스", byEn: "J.-A.-D. Ingres", byKo: "장 오귀스트 도미니크 앵그르",
          moodEn: "an answer to the riddle", moodKo: "수수께끼 앞의 대답",
          tagEn: "Neoclassicism · a dialogue in myth", tagKo: "신고전주의 · 신화 속의 대화",
          readEn: "A young man answers the Sphinx's riddle with a pointing finger. If you like it, music that seems to ask a question suits you.",
          readKo: "청년이 스핑크스의 수수께끼에 손가락으로 답합니다. 이 그림이 좋다면 질문을 던지는 듯한 음악이 어울려요." },
        { id: "spinners", m: "grand", f: "Velazquez-las_hilanderas.jpg", y: 1657,
          en: "Las Hilanderas", ko: "실 잣는 여인들", byEn: "Diego Velázquez", byKo: "디에고 벨라스케스",
          moodEn: "myth behind the everyday", moodKo: "현실 뒤의 신화",
          tagEn: "Spanish Baroque · a picture within a picture", tagKo: "스페인 바로크 · 그림 속의 그림",
          readEn: "Women spin in front while a myth unfolds in the bright room behind. If it drew you in, music with hidden layers suits you.",
          readKo: "앞에서는 실을 잣고, 뒤의 밝은 방에서는 신화가 펼쳐집니다. 이 그림에 끌렸다면 겹겹이 숨은 구조의 음악을 좋아하실 거예요." },
        { id: "danae", m: "tender", f: "Rembrandt_Harmensz._van_Rijn_026.jpg", y: 1636,
          en: "Danaë", ko: "다나에", byEn: "Rembrandt van Rijn", byKo: "렘브란트 판 레인",
          moodEn: "a golden visit", moodKo: "황금빛 방문",
          tagEn: "Dutch Baroque · a god become light", tagKo: "네덜란드 바로크 · 빛이 된 신",
          readEn: "On the bed a woman raises her hand toward the approaching light. If you like it, warm, sensuous music suits you.",
          readKo: "침대 위의 여인이 다가오는 빛을 향해 손을 듭니다. 이 그림이 좋다면 따뜻하고 감각적인 음악이 어울려요." },
        { id: "athens", m: "grand", f: "Raphael_School_of_Athens.jpg", y: 1511,
          en: "The School of Athens", ko: "아테네 학당", byEn: "Raphael", byKo: "라파엘로 산치오",
          moodEn: "a square full of ideas", moodKo: "생각이 모이는 광장",
          tagEn: "Italian Renaissance · a cathedral of thought", tagKo: "이탈리아 르네상스 · 생각의 대성당",
          readEn: "Ancient philosophers gather and argue beneath great arches. If you like it, grand, orderly music built in layers suits you.",
          readKo: "아치 아래 고대의 철학자들이 한자리에 모여 토론합니다. 이 그림이 좋다면 질서 있고 웅장하게 쌓아 올린 음악을 좋아하실 거예요." },
        { id: "adam", m: "heroic", f: "Michelangelo_-_Creation_of_Adam_(cropped).jpg", y: 1512,
          en: "The Creation of Adam", ko: "아담의 창조", byEn: "Michelangelo", byKo: "미켈란젤로 부오나로티",
          moodEn: "a fingertip before touch", moodKo: "닿기 직전의 손끝",
          tagEn: "Italian Renaissance · the beginning painted on a ceiling", tagKo: "이탈리아 르네상스 · 천장에 그린 시작",
          readEn: "God and Adam's fingertips stop just short of touching. If you like it, powerful, soaring, majestic music suits you.",
          readKo: "신과 아담의 손끝이 닿기 직전에 멈춰 있습니다. 이 그림이 좋다면 힘차게 솟아오르는 장엄한 음악을 좋아하실 거예요." },
        { id: "lastsupper", m: "dramatic", f: "Leonardo_da_Vinci_-_The_Last_Supper_high_res.jpg", y: 1498,
          en: "The Last Supper", ko: "최후의 만찬", byEn: "Leonardo da Vinci", byKo: "레오나르도 다 빈치",
          moodEn: "the ripple of one sentence", moodKo: "한마디가 일으킨 파문",
          tagEn: "Italian Renaissance · a table in perfect perspective", tagKo: "이탈리아 르네상스 · 원근법의 식탁",
          readEn: "At one sentence from Jesus, the disciples stir and turn to one another. If you like it, devout music with an undercurrent of tension suits you.",
          readKo: "예수의 한마디에 제자들이 술렁이며 서로를 돌아봅니다. 이 그림이 좋다면 경건하면서 긴장이 흐르는 음악을 좋아하실 거예요." },
        { id: "belshazzar", m: "dramatic", f: "Rembrandt_-_Belshazzar's_Feast_-_WGA19123.jpg", y: 1635,
          en: "Belshazzar's Feast", ko: "벨사살 왕의 연회", byEn: "Rembrandt van Rijn", byKo: "렘브란트 판 레인",
          moodEn: "the writing on the wall", moodKo: "벽에 나타난 글씨",
          tagEn: "Dutch Baroque · a warning written in light", tagKo: "네덜란드 바로크 · 빛으로 쓴 경고",
          readEn: "In the middle of a lavish feast, glowing letters appear on the wall and the king freezes. If you like it, dramatic music with sudden turns suits you.",
          readKo: "화려한 연회 도중 벽에 빛나는 글씨가 나타나 왕이 얼어붙습니다. 이 그림이 좋다면 갑작스러운 반전이 있는 극적인 음악을 좋아하실 거예요." },
        { id: "emmaus", m: "dramatic", f: "Supper_at_Emmaus-Caravaggio_(1601).jpg", y: 1601,
          en: "Supper at Emmaus", ko: "엠마오의 저녁 식사", byEn: "Caravaggio", byKo: "카라바조",
          moodEn: "the moment of recognition", moodKo: "알아보는 순간",
          tagEn: "Italian Baroque · light and shadow at the table", tagKo: "이탈리아 바로크 · 식탁 위의 명암",
          readEn: "The disciples throw out their arms the moment they realise who the stranger at supper is. If you like it, music of sharp light and shade, alive in the moment, suits you.",
          readKo: "함께 식사하던 낯선 이가 누구인지 깨닫는 순간, 제자들이 놀라 팔을 벌립니다. 이 그림이 좋다면 명암이 또렷하고 순간이 살아 있는 음악을 좋아하실 거예요." },
        { id: "arcole", m: "heroic", f: "Antoine-Jean_Gros_-_Bonaparte_au_pont_d'Arcole(1796).jpg", y: 1796,
          en: "Bonaparte at the Pont d'Arcole", ko: "아르콜레 다리의 보나파르트", byEn: "Antoine-Jean Gros", byKo: "앙투안 장 그로",
          moodEn: "a young general with the flag", moodKo: "깃발을 든 젊은 장군",
          tagEn: "Neoclassicism · portrait of a young hero", tagKo: "신고전주의 · 젊은 영웅의 초상",
          readEn: "The 27-year-old Napoleon looks back, flag in hand, as he charges forward. If you like it, music that drives boldly forward suits you.",
          readKo: "스물일곱 살의 나폴레옹이 깃발을 들고 뒤를 돌아보며 앞으로 나아갑니다. 이 그림이 좋다면 힘차게 앞으로 나아가는 음악을 좋아하실 거예요." },
        { id: "titianbacchus", m: "joy", f: "Titian_Bacchus_and_Ariadne.jpg", y: 1523,
          en: "Bacchus and Ariadne", ko: "바쿠스와 아리아드네", byEn: "Titian", byKo: "티치아노 베첼리오",
          moodEn: "a god leaping at first sight", moodKo: "첫눈에 뛰어내린 신",
          tagEn: "Venetian Renaissance · a festival of colour", tagKo: "베네치아 르네상스 · 색채의 축제",
          readEn: "Seeing Ariadne, Bacchus leaps from his chariot as his noisy followers tumble after. If you like it, bright, festive, exhilarating music suits you.",
          readKo: "아리아드네를 본 바쿠스가 마차에서 뛰어내리고 일행이 떠들썩하게 뒤따릅니다. 이 그림이 좋다면 밝고 들뜬 축제 같은 음악을 좋아하실 거예요." },
        { id: "babel", m: "grand", f: "Pieter_Bruegel_the_Elder_-_The_Tower_of_Babel_(Vienna)_-_Google_Art_Project_-_edited.jpg", y: 1563,
          en: "The Tower of Babel", ko: "바벨탑", byEn: "Pieter Bruegel the Elder", byKo: "피터르 브뤼헐",
          moodEn: "an ambition built to the sky", moodKo: "하늘까지 쌓는 욕심",
          tagEn: "Northern Renaissance · a tower without end", tagKo: "북유럽 르네상스 · 끝없이 쌓은 탑",
          readEn: "Countless people build a tower layer by layer, as if to reach the sky. If you like it, music that grows huge layer by layer suits you.",
          readKo: "수많은 사람이 하늘에 닿을 듯한 탑을 층층이 쌓아 올리고 있습니다. 이 그림이 좋다면 층층이 쌓여 거대해지는 음악을 좋아하실 거예요." },
        { id: "monalisa", m: "radiant", f: "Mona_Lisa,_by_Leonardo_da_Vinci,_from_C2RMF_retouched.jpg", y: 1503,
          en: "Mona Lisa", ko: "모나리자", byEn: "Leonardo da Vinci", byKo: "레오나르도 다 빈치",
          moodEn: "an unreadable smile", moodKo: "알 수 없는 미소",
          tagEn: "Italian Renaissance · outlines that melt like mist", tagKo: "이탈리아 르네상스 · 안개처럼 번지는 윤곽",
          readEn: "In outlines soft as mist, a smile you can never quite read lingers. If you like it, quiet music with a long afterglow suits you.",
          readKo: "안개처럼 부드러운 윤곽 속에서 알 듯 모를 듯한 미소가 머뭅니다. 이 그림이 좋다면 잔잔하고 여운이 긴 음악을 좋아하실 거예요." },
      ],
      romantic: [
        { id: "kiss", m: "love", f: "Francesco_Hayez_-_The_Kiss_-_WGA11218.jpg", y: 1859,
          en: "The Kiss", ko: "키스", byEn: "Francesco Hayez", byKo: "프란체스코 하예즈",
          moodEn: "love & longing", moodKo: "사랑과 그리움",
          tagEn: "Romanticism · feeling takes centre stage", tagKo: "낭만주의 · 감정이 주인공이 되다",
          readEn: "Look closely: this kiss is also a goodbye, since his foot is already on the stair. If it got you, you want big-hearted melody with a little ache.",
          readKo: "자세히 보면 이 키스는 이별이기도 해요. 남자의 발이 이미 계단에 올라 있거든요. 이 그림이 마음에 남았다면 가슴 벅찬 선율과 약간의 아픔을 원하시는 거예요." },
        { id: "nightmare", m: "dread", f: "John_Henry_Fuseli_-_The_Nightmare.JPG", y: 1781,
          en: "The Nightmare", ko: "악몽", byEn: "Henry Fuseli", byKo: "헨리 푸젤리",
          moodEn: "dream & dread", moodKo: "꿈과 공포 사이",
          tagEn: "Gothic pre-Romanticism · the Sublime", tagKo: "고딕 전기 낭만주의 · 숭고",
          readEn: "A sleeper, a goblin on her chest, and a horse peeking through the curtains. If you leaned in, you like music with ghosts in it, with stories, shadows and a little shiver.",
          readKo: "잠든 여인, 가슴 위에 올라앉은 도깨비, 커튼 사이로 엿보는 말. 이 그림에 몸이 기울었다면 이야기와 그림자, 약간의 오싹함, 즉 유령이 깃든 음악을 좋아하실 거예요." },
        { id: "chasseur", m: "dash", f: "Géricault_-_Officier_de_chasseur_à_cheval_de_la_garde_impériale_chargeant,_Inv.76.jpg", y: 1812,
          en: "The Charging Chasseur", ko: "돌격하는 기병 장교", byEn: "Théodore Géricault", byKo: "테오도르 제리코",
          moodEn: "fearless momentum", moodKo: "거침없는 추진력",
          tagEn: "Romanticism · the horse as hero", tagKo: "낭만주의 · 영웅이 된 말",
          readEn: "A cavalry officer twists in the saddle mid-charge while his horse rears beneath him. If it grabbed you, you like music with drive: rhythm you can feel in your legs.",
          readKo: "기병 장교가 돌격 중에 안장 위에서 몸을 비틀고, 말은 그 아래서 앞발을 들어 올립니다. 이 그림이 마음을 사로잡았다면 다리로 리듬이 느껴지는, 추진력 있는 음악을 좋아하실 거예요." },
        { id: "algiers", m: "opulent", f: "Eugène_Delacroix_-_Les_Femmes_d'Alger_dans_leur_appartement,_1834.jpg", y: 1834,
          en: "Women of Algiers", ko: "알제의 여인들", byEn: "Eugène Delacroix", byKo: "외젠 들라크루아",
          moodEn: "sumptuous colour", moodKo: "풍성한 색채",
          tagEn: "Romanticism · the lure of the Orient", tagKo: "낭만주의 · 오리엔트를 향한 동경",
          readEn: "Women lounge in a richly patterned interior, painted after Delacroix’s trip to North Africa, and Picasso loved it enough to remake it. If it drew you in, you like music that is sumptuous, textured and rich in colour.",
          readKo: "풍성한 무늬의 실내에서 여인들이 쉬고 있습니다. 이 그림에 끌렸다면 호화롭고 질감이 풍부하며 색채가 짙은 음악을 좋아하실 거예요." },
        { id: "francesca", m: "love", f: "1835_Ary_Scheffer_-_The_Ghosts_of_Paolo_and_Francesca_Appear_to_Dante_and_Virgil.jpg", y: 1835,
          en: "Paolo and Francesca", ko: "파올로와 프란체스카", byEn: "Ary Scheffer", byKo: "아리 셰페르",
          moodEn: "doomed passion", moodKo: "운명적인 열정",
          tagEn: "Romanticism · literary love and doom", tagKo: "낭만주의 · 문학 속 사랑과 파멸",
          readEn: "Dante’s lovers, swept along forever on the winds of Hell, appear before the poet. If you chose it, you like love music that burns a little.",
          readKo: "지옥의 바람에 영원히 휩쓸리는 단테 속 연인들이 시인 앞에 나타납니다. 이 그림을 골랐다면 조금 타오르는 사랑의 음악을 좋아하실 거예요." },
        { id: "ophelia", m: "fantasy", f: "John_Everett_Millais_-_Ophelia_-_Google_Art_Project.jpg", y: 1852,
          en: "Ophelia", ko: "오필리아", byEn: "John Everett Millais", byKo: "존 에버렛 밀레이",
          moodEn: "beautiful sorrow", moodKo: "아름다운 비애",
          tagEn: "Pre-Raphaelite · Shakespeare in painstaking detail", tagKo: "라파엘 전파 · 공들인 디테일로 그린 셰익스피어",
          readEn: "Ophelia floats in a stream, half song and half drowning, every leaf painted with botanical care. If it moved you, you like music that is beautiful and heartbreaking at the same time.",
          readKo: "오필리아가 반쯤은 노래하며 반쯤은 가라앉은 채 시냇물에 떠 있고, 잎사귀 하나하나가 식물학자처럼 정밀하게 그려졌습니다. 이 그림이 마음을 움직였다면 아름답고 동시에 가슴 아픈 음악을 좋아하실 거예요." },
        { id: "schubertiade", m: "intimate", f: "Moritz_von_Schwind_Schubertiade_large.jpg", y: 1868,
          en: "A Schubert Evening", ko: "슈베르티아데", byEn: "Moritz von Schwind", byKo: "모리츠 폰 슈빈트",
          moodEn: "friends around the piano", moodKo: "피아노 둘레의 벗들",
          tagEn: "Biedermeier Romanticism · music at home", tagKo: "비더마이어 낭만 · 집 안의 음악",
          readEn: "Friends gather around a piano while Schubert accompanies a singer: the famous Schubertiade, drawn decades later by Schwind, who knew the circle. If it appealed to you, you like music that feels like a conversation among friends.",
          readKo: "친구들이 피아노 곁에 모여 있고 슈베르트가 가수의 반주를 맡습니다. 이 그림이 끌렸다면 친구들과 나누는 대화처럼 느껴지는 음악을 좋아하실 거예요." },
        { id: "titania", m: "fantasy", f: "Henry_Fuseli_-_Titania_and_Bottom_-_Google_Art_Project.jpg", y: 1790,
          en: "Titania and Bottom", ko: "티타니아와 보텀", byEn: "Henry Fuseli", byKo: "헨리 푸젤리",
          moodEn: "fairy-tale strangeness", moodKo: "동화 같은 기묘함",
          tagEn: "Gothic Romanticism · Shakespeare’s fairy kingdom", tagKo: "고딕 낭만주의 · 셰익스피어의 요정 왕국",
          readEn: "The fairy queen, enchanted, adores a weaver with a donkey’s head. If you picked it, you like music that is playful, magical and just a little strange.",
          readKo: "마법에 걸린 요정 여왕이 나귀 머리를 한 직공을 열렬히 사랑합니다. 이 그림을 골랐다면 장난스럽고 마법 같으며 약간 기묘한 음악을 좋아하실 거예요." },
        { id: "hamlet", m: "dread", f: "Eugène_Delacroix_-_Hamlet_and_Horatio_in_the_Graveyard_-_WGA6199.jpg", y: 1839,
          en: "Hamlet and Horatio in the Graveyard", ko: "묘지의 햄릿과 호레이쇼", byEn: "Eugène Delacroix", byKo: "외젠 들라크루아",
          moodEn: "brooding thought", moodKo: "깊이 파고드는 사색",
          tagEn: "Romanticism · Shakespeare, skull and all", tagKo: "낭만주의 · 해골까지 포함한 셰익스피어",
          readEn: "Hamlet holds Yorick’s skull while Horatio looks on, one of Delacroix’s many Shakespeare scenes. If you chose it, you like music that broods and philosophises.",
          readKo: "햄릿이 요릭의 해골을 들고 있고 호레이쇼가 곁에서 지켜봅니다. 이 그림을 골랐다면 곱씹고 사색하는 음악을 좋아하실 거예요." },
        { id: "derby", m: "dash", f: "Théodore_Géricault_-_The_Epsom_Derby_-_WGA08637.jpg", y: 1821,
          en: "The Derby at Epsom", ko: "엡섬의 경마", byEn: "Théodore Géricault", byKo: "테오도르 제리코",
          moodEn: "breakneck speed", moodKo: "숨 가쁜 속도감",
          tagEn: "Romanticism · speed before photography", tagKo: "낭만주의 · 사진 이전의 속도",
          readEn: "Horses fly at full stretch with all four legs in the air, a convention that high-speed photography later disproved. If it thrilled you, you like music that gallops.",
          readKo: "말들이 네 다리를 모두 공중에 띄운 채 전속력으로 달립니다. 이 그림에 짜릿했다면 말처럼 질주하는 음악을 좋아하실 거예요." },
        { id: "poetspitzweg", m: "intimate", f: "The_Poor_Poet_Carl_Spitzweg_1839.jpg", y: 1839,
          en: "The Poor Poet", ko: "가난한 시인", byEn: "Carl Spitzweg", byKo: "카를 슈피츠베크",
          moodEn: "cosy humour", moodKo: "포근한 유머",
          tagEn: "Biedermeier · Romanticism in slippers", tagKo: "비더마이어 · 슬리퍼를 신은 낭만주의",
          readEn: "A poet in a draughty attic counts syllables on his fingers, with an umbrella hung over the bed to catch the leaks. If it made you smile, you like music that is tender, humorous and homey.",
          readKo: "바람 새는 다락방의 시인이 손가락으로 음절을 세고, 침대 위에는 비 새는 걸 막으려는 우산이 걸려 있습니다. 이 그림에 미소가 나왔다면 다정하고 유머러스하며 아늑한 음악을 좋아하실 거예요." },
        { id: "shalott", m: "fantasy", f: "John_William_Waterhouse_-_The_Lady_of_Shalott_-_Google_Art_Project_edit.jpg", y: 1888,
          en: "The Lady of Shalott", ko: "샬롯의 여인", byEn: "John William Waterhouse", byKo: "존 윌리엄 워터하우스",
          moodEn: "mythic lyricism", moodKo: "신화적 서정",
          tagEn: "Late Victorian · Pre-Raphaelite revival", tagKo: "후기 빅토리아 · 라파엘 전파의 부활",
          readEn: "The lady leaves her loom, steps into a boat and drifts toward Camelot, singing her last song. If it called to you, you like music that is lyrical, mythic and trails a long, sad tail.",
          readKo: "여인은 베틀을 떠나 배에 올라 마지막 노래를 부르며 카멜롯으로 흘러갑니다. 이 그림이 마음을 끌었다면 서정적이고 신화적이며 길고 쓸쓸한 여운을 남기는 음악을 좋아하실 거예요." },
        { id: "seaice", m: "tragic", f: "Caspar_David_Friedrich_-_Das_Eismeer_-_Hamburger_Kunsthalle_-_02.jpg", y: 1824,
          en: "The Sea of Ice", ko: "얼음 바다", byEn: "Caspar David Friedrich", byKo: "카스파르 다비트 프리드리히",
          moodEn: "frozen despair", moodKo: "얼어붙은 절망",
          tagEn: "Romanticism · the Sublime turned to ice", tagKo: "낭만주의 · 얼음이 된 숭고",
          readEn: "Slabs of ice pile up like a broken monument, and only on a second look do you spot the stern of a crushed ship. If it held you, you like music that is stark, cold and devastating in its stillness.",
          readKo: "얼음 판들이 무너진 기념비처럼 쌓여 있고, 다시 보아야 부서진 배의 선미가 눈에 들어옵니다. 이 그림에 붙들렸다면 황량하고 차가우며 고요함 속에서 무너뜨리는 음악을 좋아하실 거예요." },
        { id: "monk", m: "dread", f: "Caspar_David_Friedrich_-_Der_Mönch_am_Meer_-_Google_Art_Project.jpg", y: 1810,
          en: "The Monk by the Sea", ko: "바닷가의 수도사", byEn: "Caspar David Friedrich", byKo: "카스파르 다비트 프리드리히",
          moodEn: "vast solitude", moodKo: "광막한 고독",
          tagEn: "Romanticism · one person against infinity", tagKo: "낭만주의 · 무한 앞의 한 사람",
          readEn: "A tiny figure stands before a huge, empty sky and dark sea. If it drew you in, you like music that is spacious, solitary and a little awe-struck.",
          readKo: "아주 작은 인물이 거대하고 텅 빈 하늘과 어두운 바다 앞에 서 있습니다. 이 그림에 끌렸다면 넓게 트이고 고독하며 경외감이 감도는 음악을 좋아하실 거예요." },
        { id: "rugen", m: "love", f: "Caspar_David_Friedrich_-_Kreidefelsen_auf_Rügen_(ca.1825).jpg", y: 1818,
          en: "Chalk Cliffs on Rügen", ko: "뤼겐섬의 백악 절벽", byEn: "Caspar David Friedrich", byKo: "카스파르 다비트 프리드리히",
          moodEn: "a honeymoon view", moodKo: "신혼여행의 풍경",
          tagEn: "Romanticism · love on the edge of a cliff", tagKo: "낭만주의 · 절벽 끝의 사랑",
          readEn: "Painted after Friedrich’s honeymoon: three figures peer over white cliffs toward a glowing sea, framed by trees like a heart. If it warmed you, you like music that is tender yet wide-open, love with a view.",
          readKo: "프리드리히가 신혼여행 뒤에 그린 그림입니다. 이 그림에 마음이 따뜻해졌다면 다정하면서도 탁 트인, 풍경이 있는 사랑의 음악을 좋아하실 거예요." },
        { id: "temeraire", m: "fantasy", f: "The_Fighting_Temeraire,_JMW_Turner,_National_Gallery.jpg", y: 1839,
          en: "The Fighting Temeraire", ko: "전함 테메레르", byEn: "J. M. W. Turner", byKo: "J. M. W. 터너",
          moodEn: "golden farewell", moodKo: "황금빛 작별",
          tagEn: "Romanticism · the end of an era at sunset", tagKo: "낭만주의 · 해 질 녘에 저무는 한 시대",
          readEn: "A ghostly old warship is towed to the breakers by a small black steam tug while the sun blazes and sets. If it moved you, you like music that glows with farewell.",
          readKo: "유령처럼 창백한 옛 전함이 작고 검은 증기 예인선에 끌려 해체장으로 갑니다. 이 그림이 마음을 움직였다면 작별의 빛으로 물든 음악을 좋아하실 거예요." },
        { id: "railspeed", m: "dash", f: "Turner_-_Rain,_Steam_and_Speed_-_National_Gallery_file.jpg", y: 1844,
          en: "Rain, Steam and Speed", ko: "비, 증기, 속도", byEn: "J. M. W. Turner", byKo: "J. M. W. 터너",
          moodEn: "rushing modernity", moodKo: "질주하는 근대",
          tagEn: "Romanticism · the train as a storm", tagKo: "낭만주의 · 폭풍이 된 기차",
          readEn: "A steam train charges out of a blur of rain across a bridge, and a tiny hare runs ahead of it. If it thrilled you, you like music that surges forward and blurs at the edges.",
          readKo: "증기 기관차가 빗속의 흐릿함을 뚫고 다리 위로 돌진하고, 그 앞을 작은 산토끼가 달립니다. 이 그림에 짜릿했다면 앞으로 밀고 나가며 가장자리가 번지는 음악을 좋아하실 거예요." },
        { id: "hannibal", m: "opulent", f: "Joseph_Mallord_William_Turner_-_Snow_Storm,_Hannibal_and_his_Army_Crossing_the_Alps_-_WGA23167.jpg", y: 1812,
          en: "Snow Storm: Hannibal Crossing the Alps", ko: "눈보라: 알프스를 넘는 한니발", byEn: "J. M. W. Turner", byKo: "J. M. W. 터너",
          moodEn: "a storm that swallows armies", moodKo: "군대를 삼키는 폭풍",
          tagEn: "Romanticism · nature beats heroes", tagKo: "낭만주의 · 영웅을 이기는 자연",
          readEn: "A vast vortex of snow and dark cloud swallows Hannibal’s army. If it swept you up, you like music that is overwhelming, swirling and enormous.",
          readKo: "눈과 먹구름의 거대한 소용돌이가 한니발의 군대를 삼킵니다. 이 그림에 휩쓸렸다면 압도적이고 소용돌이치며 거대한 음악을 좋아하실 거예요." },
        { id: "barque", m: "tragic", f: "Eugène_Delacroix_-_The_Barque_of_Dante.jpg", y: 1822,
          en: "The Barque of Dante", ko: "단테의 조각배", byEn: "Eugène Delacroix", byKo: "외젠 들라크루아",
          moodEn: "infernal turbulence", moodKo: "지옥의 격랑",
          tagEn: "Romanticism · Delacroix’s debut", tagKo: "낭만주의 · 들라크루아의 데뷔작",
          readEn: "Dante and Virgil cross a burning lake of Hell while the damned claw at the boat. If it gripped you, you like music that is dark, turbulent and literary.",
          readKo: "단테와 베르길리우스가 불타는 지옥의 호수를 건너고, 저주받은 영혼들이 배에 매달립니다. 이 그림에 사로잡혔다면 어둡고 격렬하며 문학적인 음악을 좋아하실 거예요." },
        { id: "haywain", m: "intimate", f: "John_Constable_The_Hay_Wain.jpg", y: 1821,
          en: "The Hay Wain", ko: "건초 마차", byEn: "John Constable", byKo: "존 컨스터블",
          moodEn: "homely countryside", moodKo: "정겨운 시골",
          tagEn: "Romanticism · the poetry of home ground", tagKo: "낭만주의 · 고향 땅의 시정",
          readEn: "A hay cart wades through a shallow river beside a cottage under a big, moving sky. If it felt like home, you like music that is warm, pastoral and unhurried.",
          readKo: "건초 마차가 오두막 옆 얕은 강을 건너고, 그 위로 크고 움직이는 하늘이 펼쳐집니다. 이 그림이 고향처럼 느껴졌다면 따뜻하고 전원적이며 서두르지 않는 음악을 좋아하실 거예요." },
        { id: "window", m: "intimate", f: "C._D._Friedrich_-_Woman_at_a_window.jpg", y: 1822,
          en: "Woman at a Window", ko: "창가의 여인", byEn: "Caspar David Friedrich", byKo: "카스파르 다비트 프리드리히",
          moodEn: "a figure looking out", moodKo: "창밖을 보는 뒷모습",
          tagEn: "German Romanticism · inside and out", tagKo: "독일 낭만주의 · 안과 밖",
          readEn: "From a dark room a woman looks out at the river and the masts. If it drew you in, quietly longing music suits you.",
          readKo: "어두운 방에서 여인이 강과 돛대를 내다봅니다. 이 그림에 끌렸다면 조용히 그리워하는 음악을 좋아하실 거예요." },
        { id: "moonrise", m: "fantasy", f: "Caspar_David_Friedrich_-_Mondaufgang_am_Meer_-_Google_Art_Project.jpg", y: 1822,
          en: "Moonrise over the Sea", ko: "바다 위로 뜨는 달", byEn: "Caspar David Friedrich", byKo: "카스파르 다비트 프리드리히",
          moodEn: "waiting for the moon", moodKo: "달을 기다리는 사람들",
          tagEn: "German Romanticism · evening devotion", tagKo: "독일 낭만주의 · 저녁의 경건함",
          readEn: "Three people on the rocks watch the returning boats and the rising moon. If you like it, softly glowing night music suits you.",
          readKo: "바위 위의 세 사람이 돌아오는 배와 떠오르는 달을 바라봅니다. 이 그림이 좋다면 은은한 밤의 음악이 어울려요." },
        { id: "twomen", m: "dread", f: "Caspar_David_Friedrich_-_Two_Men_Contemplating_the_Moon_-_Google_Art_Project.jpg", y: 1819,
          en: "Two Men Contemplating the Moon", ko: "달을 바라보는 두 남자", byEn: "Caspar David Friedrich", byKo: "카스파르 다비트 프리드리히",
          moodEn: "a wordless companionship", moodKo: "말 없는 동행",
          tagEn: "German Romanticism · moon and old tree", tagKo: "독일 낭만주의 · 달과 고목",
          readEn: "Beside a fallen tree two men watch the crescent moon. If it drew you in, quiet, mysterious night music suits you.",
          readKo: "쓰러진 나무 곁에서 두 사람이 초승달을 봅니다. 이 그림에 끌렸다면 고요하고 신비로운 밤의 음악을 좋아하실 거예요." },
        { id: "wivenhoe", m: "intimate", f: "John_Constable_-_Wivenhoe_Park,_Essex_-_Google_Art_Project.jpg", y: 1816,
          en: "Wivenhoe Park", ko: "위븐호 공원", byEn: "John Constable", byKo: "존 컨스터블",
          moodEn: "an estate on a clear day", moodKo: "맑은 날의 영지",
          tagEn: "English Romanticism · landscape as it is", tagKo: "영국 낭만주의 · 있는 그대로의 풍경",
          readEn: "Clouds, a pond and cattle in the midday air. If it feels easy, clear pastoral music suits you.",
          readKo: "구름, 연못, 소 떼가 한낮의 공기 속에 있습니다. 이 그림이 편하다면 맑고 목가적인 음악이 어울려요." },
        { id: "cornfield", m: "intimate", f: "Constable_-_The_Cornfield.jpg", y: 1826,
          en: "The Cornfield", ko: "옥수수밭", byEn: "John Constable", byKo: "존 컨스터블",
          moodEn: "summer on a country lane", moodKo: "시골길의 여름",
          tagEn: "English Romanticism · the road home", tagKo: "영국 낭만주의 · 고향의 길",
          readEn: "A boy lies flat to drink from a stream on a midsummer path. If you like it, simple, nostalgic music suits you.",
          readKo: "소년이 엎드려 냇물을 마시는 한여름의 오솔길. 이 그림이 좋다면 소박하고 향수 어린 음악을 좋아하실 거예요." },
        { id: "mortefontaine", m: "fantasy", f: "Souvenir_de_Mortefontaine_-_Jean-Baptiste_Camille_Corot_-_Musée_du_Louvre_Peintures_MI_692_bis_-_photo_2.jpg", y: 1864,
          en: "Souvenir de Mortefontaine", ko: "모르트퐁텐의 추억", byEn: "Camille Corot", byKo: "카미유 코로",
          moodEn: "a memory in mist", moodKo: "안개 속의 기억",
          tagEn: "French Romantic landscape · silver haze", tagKo: "프랑스 낭만주의 풍경 · 은빛 안개",
          readEn: "In a silver haze children pull at a branch. If it drew you in, hazy, gentle music suits you.",
          readKo: "은빛 안개 속에서 아이들이 나뭇가지를 잡아당깁니다. 이 그림에 끌렸다면 몽롱하고 부드러운 음악이 어울려요." },
        { id: "angelus", m: "intimate", f: "JEAN-FRANÇOIS_MILLET_-_El_Ángelus_(Museo_de_Orsay,_1857-1859._Óleo_sobre_lienzo,_55.5_x_66_cm).jpg", y: 1859,
          en: "The Angelus", ko: "만종", byEn: "Jean-François Millet", byKo: "장 프랑수아 밀레",
          moodEn: "a prayer at the evening bell", moodKo: "저녁 종소리의 기도",
          tagEn: "Barbizon school · faith in the fields", tagKo: "바르비종파 · 들판의 신앙",
          readEn: "At dusk a couple bows their heads at the sound of the bell. If it stayed with you, devout, simple music suits you.",
          readKo: "해 질 녘 들판에서 부부가 종소리에 고개를 숙입니다. 이 그림이 마음에 남았다면 경건하고 소박한 음악을 좋아하실 거예요." },
        { id: "norham", m: "fantasy", f: "Joseph_Mallord_William_Turner_-_Norham_Castle,_Sunrise_-_WGA23182.jpg", y: 1845,
          en: "Norham Castle, Sunrise", ko: "노럼성의 해돋이", byEn: "J. M. W. Turner", byKo: "J. M. W. 터너",
          moodEn: "a castle melting into light", moodKo: "빛에 녹아드는 성",
          tagEn: "English Romanticism · landscape left as colour", tagKo: "영국 낭만주의 · 색으로만 남은 풍경",
          readEn: "Castle and river have almost dissolved in morning light. If you like it, blurred, glowing music suits you.",
          readKo: "성과 강이 아침 빛 속에 거의 녹아 있습니다. 이 그림이 좋다면 윤곽이 흐릿하고 빛나는 음악을 좋아하실 거예요." },
        { id: "studio", m: "intimate", f: "Georg_Friedrich_Kersting_-_Caspar_David_Friedrich_in_seinem_Atelier_(um_1812).jpg", y: 1819,
          en: "Caspar David Friedrich in his Studio", ko: "작업실의 프리드리히", byEn: "Georg Friedrich Kersting", byKo: "게오르크 프리드리히 케르스팅",
          moodEn: "focus in an empty room", moodKo: "텅 빈 방의 집중",
          tagEn: "Biedermeier · the painter's studio", tagKo: "비더마이어 · 화가의 작업실",
          readEn: "In a bare room with one open window, the painter leans on a chair to study his canvas. If it drew you in, minimal, focused music suits you.",
          readKo: "창 하나만 열린 빈 방에서 화가가 의자에 기대 그림을 봅니다. 이 그림에 끌렸다면 미니멀하고 집중된 음악이 어울려요." },
        { id: "stages", m: "love", f: "Caspar_David_Friedrich_-_Die_Lebensstufen_(ca._1834).jpg", y: 1835,
          en: "The Stages of Life", ko: "인생의 단계", byEn: "Caspar David Friedrich", byKo: "카스파르 다비트 프리드리히",
          moodEn: "five ships", moodKo: "다섯 척의 배",
          tagEn: "German Romanticism · a landscape facing life's end", tagKo: "독일 낭만주의 · 삶의 끝을 보는 풍경",
          readEn: "Five people on the shore mirror five ships at sea. If it reached you, warm music with a touch of farewell suits you.",
          readKo: "해변의 다섯 사람과 바다의 다섯 척의 배가 서로를 닮았습니다. 이 그림이 와닿았다면 따뜻하면서 작별의 기운이 있는 음악을 좋아하실 거예요." },
        { id: "lonetree", m: "intimate", f: "Caspar_David_Friedrich_-_Der_einsame_Baum_-_Google_Art_Project.jpg", y: 1822,
          en: "Village Landscape in Morning Light (The Lone Tree)", ko: "아침 빛 속의 마을 풍경", byEn: "Caspar David Friedrich", byKo: "카스파르 다비트 프리드리히",
          moodEn: "a tree standing alone", moodKo: "홀로 선 나무",
          tagEn: "German Romanticism · the old tree in the field", tagKo: "독일 낭만주의 · 들판의 고목",
          readEn: "One old tree in the middle of a wide field, a shepherd beneath it. If you like it, wide, quiet music suits you.",
          readKo: "넓은 들판 가운데 고목 한 그루와 그 아래 양치기. 이 그림이 좋다면 넓고 고요한 음악이 어울려요." },
        { id: "bookworm", m: "intimate", f: "Carl_Spitzweg_-_\"The_Bookworm\".jpg", y: 1850,
          en: "The Bookworm", ko: "책벌레", byEn: "Carl Spitzweg", byKo: "카를 슈피츠베크",
          moodEn: "reading on a ladder", moodKo: "사다리 위의 독서",
          tagEn: "Biedermeier · humour in the library", tagKo: "비더마이어 · 서재의 유머",
          readEn: "An old man on a ladder, so lost in a book he forgets all else. If it made you smile, witty, kindly music suits you.",
          readKo: "사다리 위에서 책을 읽느라 다른 건 다 잊은 노인. 이 그림에 웃음이 났다면 재치 있고 다정한 음악을 좋아하실 거예요." },
        { id: "ninthwave", m: "dash", f: "Hovhannes_Aivazovsky_-_The_Ninth_Wave_-_Google_Art_Project.jpg", y: 1850,
          en: "The Ninth Wave", ko: "아홉 번째 파도", byEn: "Ivan Aivazovsky", byKo: "이반 아이바좁스키",
          moodEn: "the great wave after the storm", moodKo: "폭풍 뒤의 거대한 파도",
          tagEn: "Russian Romanticism · a glowing sea", tagKo: "러시아 낭만주의 · 빛나는 바다",
          readEn: "Shipwrecked men cling to a mast as the sun breaks through. If it drew you in, music that rages and ends in light suits you.",
          readKo: "난파한 사람들이 돛대에 매달린 채 해를 맞습니다. 이 그림에 끌렸다면 몰아치다가 빛으로 끝나는 음악을 좋아하실 거예요." },
        { id: "steamboat", m: "dash", f: "Joseph_Mallord_William_Turner_-_Snow_Storm_-_Steam-Boat_off_a_Harbour's_Mouth_-_WGA23178.jpg", y: 1842,
          en: "Snow Storm: Steam-Boat off a Harbour's Mouth", ko: "눈보라 속의 증기선", byEn: "J. M. W. Turner", byKo: "J. M. W. 터너",
          moodEn: "in the heart of the vortex", moodKo: "소용돌이 한가운데",
          tagEn: "English Romanticism · a storm seen lashed to the mast", tagKo: "영국 낭만주의 · 돛대에 묶여 본 폭풍",
          readEn: "A single ship is swallowed by a vortex of snow and waves. If you like it, swirling orchestral music suits you.",
          readKo: "배 한 척이 눈과 파도의 소용돌이에 삼켜집니다. 이 그림이 좋다면 휘몰아치는 관현악을 좋아하실 거예요." },
        { id: "arabhorses", m: "opulent", f: "Eugène_Delacroix_-_Arab_Horses_Fighting_in_a_Stable_-_WGA6227.jpg", y: 1860,
          en: "Arab Horses Fighting in a Stable", ko: "마구간에서 싸우는 아랍 말", byEn: "Eugène Delacroix", byKo: "외젠 들라크루아",
          moodEn: "two horses rearing", moodKo: "뒷발로 선 두 마리",
          tagEn: "Romanticism · horses and colour", tagKo: "낭만주의 · 말과 색채",
          readEn: "Two horses clash inside the stable. If it thrilled you, rough, powerful music suits you.",
          readKo: "두 마리 말이 마구간 안에서 맞붙습니다. 이 그림에 짜릿했다면 거칠고 힘찬 음악이 어울려요." },
        { id: "shipwreck", m: "dash", f: "Joseph_Mallord_William_Turner_-_The_Shipwreck_-_Google_Art_Project.jpg", y: 1805,
          en: "The Shipwreck", ko: "난파선", byEn: "J. M. W. Turner", byKo: "J. M. W. 터너",
          moodEn: "waves turned over", moodKo: "뒤집힌 파도",
          tagEn: "English Romanticism · the sublime sea", tagKo: "영국 낭만주의 · 바다의 숭고",
          readEn: "Small boats tilt between mountainous waves. If it drew you in, violently surging music suits you.",
          readKo: "작은 배들이 산 같은 파도 사이에서 기울어집니다. 이 그림에 끌렸다면 거세게 몰아치는 음악을 좋아하실 거예요." },
        { id: "crusaders", m: "opulent", f: "Prise_de_Constantinople_par_les_croisés_(12_avril_1204)_-_Eugène_Delacroix_-_Musée_du_Louvre_Peintures_INV_3821_;_LP_4674_-_après_restauration_2026.jpg", y: 1840,
          en: "The Entry of the Crusaders into Constantinople", ko: "십자군의 콘스탄티노플 입성", byEn: "Eugène Delacroix", byKo: "외젠 들라크루아",
          moodEn: "the splendid tragedy of conquest", moodKo: "정복의 화려한 비극",
          tagEn: "Romanticism · the colour of history painting", tagKo: "낭만주의 · 역사화의 색채",
          readEn: "Knights ride into the city as people plead at their feet. If it reached you, grand yet bitter music suits you.",
          readKo: "말 탄 기사들이 도시로 들어오고 발아래 사람들은 애원합니다. 이 그림이 와닿았다면 웅장하면서 씁쓸한 음악이 어울려요." },
        { id: "avalanche", m: "dash", f: "Gainsborough,_Thomas_-_Philippe_Jacques_de_Loutherbourg_-_Google_Art_Project_(cropped).jpg", y: 1803,
          en: "An Avalanche in the Alps", ko: "알프스의 눈사태", byEn: "Philip James de Loutherbourg", byKo: "필리프 자크 드 루테르부르",
          moodEn: "a mountain coming down", moodKo: "무너져 내리는 산",
          tagEn: "Romanticism · the sublime in nature", tagKo: "낭만주의 · 자연의 숭고",
          readEn: "Snow and rock pour down as people flee. If it drew you in, overwhelming orchestral music suits you.",
          readKo: "산에서 눈과 바위가 쏟아지고 사람들은 달아납니다. 이 그림에 끌렸다면 압도적인 관현악을 좋아하실 거예요." },
        { id: "galilee", m: "dash", f: "Le_Christ_sur_le_lac_de_Génésareth_-_Delacroix_-_MET_-_c._1853_-_without_border.jpg", y: 1853,
          en: "Christ Asleep during the Tempest", ko: "폭풍 속에 잠든 그리스도", byEn: "Eugène Delacroix", byKo: "외젠 들라크루아",
          moodEn: "asleep in the storm", moodKo: "폭풍 속의 잠",
          tagEn: "Romanticism · a tossing boat", tagKo: "낭만주의 · 흔들리는 배",
          readEn: "The disciples panic in the storm while Christ alone sleeps. If it drew you in, you like calm at the centre of rough sound.",
          readKo: "제자들은 폭풍에 허둥대고 그리스도만 잠들어 있습니다. 이 그림에 끌렸다면 거친 소리 속의 고요를 좋아하실 거예요." },
        { id: "trafalgar", m: "opulent", f: "Turner,_The_Battle_of_Trafalgar_(1822).jpg", y: 1824,
          en: "The Battle of Trafalgar", ko: "트라팔가르 해전", byEn: "J. M. W. Turner", byKo: "J. M. W. 터너",
          moodEn: "a battle of smoke and sails", moodKo: "연기와 돛의 전투",
          tagEn: "English Romanticism · history painted at sea", tagKo: "영국 낭만주의 · 바다 위의 역사화",
          readEn: "Masts fall and smoke covers the sea. If you like it, vast, battle-like music suits you.",
          readKo: "돛대가 쓰러지고 연기가 바다를 덮습니다. 이 그림이 좋다면 장대한 전투 같은 음악을 좋아하실 거예요." },
        { id: "campaign", m: "dash", f: "Jean-Louis-Ernest_Meissonier-Campagne_de_France.jpg", y: 1864,
          en: "The French Campaign, 1814", ko: "1814년, 프랑스 전역", byEn: "Ernest Meissonier", byKo: "장 루이 에르네스트 메소니에",
          moodEn: "an army marching through snow", moodKo: "눈 속을 행군하는 군대",
          tagEn: "Romantic history painting · the march of defeat", tagKo: "낭만주의 역사화 · 패배의 행군",
          readEn: "The emperor and his army press on in silence along a snowy road. If it drew you in, heavy, advancing marches suit you.",
          readKo: "눈 덮인 길을 황제와 군대가 말없이 나아갑니다. 이 그림에 끌렸다면 무겁게 전진하는 행진곡을 좋아하실 거예요." },
        { id: "colossus", m: "dread", f: "El_coloso.jpg", y: 1810,
          en: "The Colossus", ko: "거인", byEn: "Francisco de Goya (attr.)", byKo: "프란시스코 고야(추정)",
          moodEn: "a giant above the clouds", moodKo: "구름 위의 거인",
          tagEn: "Romanticism · the terror of war", tagKo: "낭만주의 · 전쟁의 공포",
          readEn: "A giant rises above the clouds while people scatter below. If it held you, music that advances like a threat suits you.",
          readKo: "거인이 구름 위로 솟고 아래에서는 사람들이 흩어집니다. 이 그림에 붙들렸다면 위협적으로 다가오는 음악을 좋아하실 거예요." },
        { id: "oakwood", m: "dread", f: "Caspar_David_Friedrich_-_Abtei_im_Eichwald_-_Google_Art_Project.jpg", y: 1810,
          en: "The Abbey in the Oakwood", ko: "떡갈나무 숲의 수도원", byEn: "Caspar David Friedrich", byKo: "카스파르 다비트 프리드리히",
          moodEn: "a funeral toward the ruin", moodKo: "폐허로 향하는 장례 행렬",
          tagEn: "German Romanticism · a winter ruin", tagKo: "독일 낭만주의 · 겨울의 폐허",
          readEn: "Monks carry a coffin through bare oaks. If it drew you in, cold, devout music suits you.",
          readKo: "앙상한 떡갈나무 사이로 수도사들이 관을 메고 갑니다. 이 그림에 끌렸다면 차갑고 경건한 음악이 어울려요." },
        { id: "isledead", m: "dread", f: "Arnold_Böcklin_-_Die_Toteninsel_I_(Basel,_Kunstmuseum).jpg", y: 1880,
          en: "Isle of the Dead", ko: "죽음의 섬", byEn: "Arnold Böcklin", byKo: "아르놀트 뵈클린",
          moodEn: "a boat carrying a white figure", moodKo: "흰 형체를 태운 배",
          tagEn: "Late Romanticism · on the edge of Symbolism", tagKo: "후기 낭만주의 · 상징주의의 문턱",
          readEn: "A small boat with a white figure approaches an island of cypresses. If it drew you in, slow, heavy music suits you.",
          readKo: "하얀 형체를 태운 작은 배가 사이프러스 섬으로 다가갑니다. 이 그림에 끌렸다면 느리고 무거운 음악을 좋아하실 거예요." },
        { id: "wrath", m: "tragic", f: "John_Martin_-_The_Great_Day_of_His_Wrath_-_Google_Art_Project.jpg", y: 1853,
          en: "The Great Day of His Wrath", ko: "진노의 날", byEn: "John Martin", byKo: "존 마틴",
          moodEn: "a world collapsing", moodKo: "무너지는 세계",
          tagEn: "English Romanticism · a panorama of the end", tagKo: "영국 낭만주의 · 종말의 파노라마",
          readEn: "Mountains split and cities fall into the abyss. If it overwhelmed you, huge choral and orchestral music suits you.",
          readKo: "산이 쪼개지고 도시가 심연으로 떨어집니다. 이 그림에 압도됐다면 거대한 합창과 관현악을 좋아하실 거예요." },
        { id: "witches", m: "dread", f: "Fuseli_-_The_Three_Witches,_ca._1785,_2014.15.jpeg", y: 1785,
          en: "The Three Witches", ko: "세 마녀", byEn: "Henry Fuseli", byKo: "헨리 푸젤리",
          moodEn: "three faces with a finger to the lips", moodKo: "손가락을 입에 댄 세 얼굴",
          tagEn: "Gothic Romanticism · Macbeth", tagKo: "고딕 낭만주의 · 「맥베스」",
          readEn: "Three witches, fingers to their lips, all look the same way. If you like it, riddling, dark music suits you.",
          readKo: "세 마녀가 똑같이 손가락을 입술에 대고 한쪽을 봅니다. 이 그림이 좋다면 수수께끼 같은 어두운 음악을 좋아하실 거예요." },
        { id: "deluge", m: "tragic", f: "Francis_Danby_-_The_Deluge_-_Google_Art_Project.jpg", y: 1840,
          en: "The Deluge", ko: "대홍수", byEn: "Francis Danby", byKo: "프랜시스 댄비",
          moodEn: "the last day under water", moodKo: "물에 잠기는 마지막 날",
          tagEn: "English Romanticism · a biblical catastrophe", tagKo: "영국 낭만주의 · 성서의 재앙",
          readEn: "Black water rises as people cling to the rocks. If it drew you in, tragic large-scale works suit you.",
          readKo: "검은 물이 차오르고 사람들이 바위에 매달립니다. 이 그림에 끌렸다면 비극적인 대곡을 좋아하실 거예요." },
        { id: "princes", m: "tragic", f: "Paul_Delaroche_(1797-1856)_-_The_Princes_in_the_Tower_(Edward_V_and_the_Duke_of_York)_-_3003004_-_Tower_of_London.jpg", y: 1830,
          en: "The Princes in the Tower", ko: "런던탑의 왕자들", byEn: "Paul Delaroche", byKo: "폴 들라로슈",
          moodEn: "a shadow under the door", moodKo: "문틈의 그림자",
          tagEn: "Romantic history painting · just before the tragedy", tagKo: "낭만주의 역사화 · 비극 직전의 순간",
          readEn: "Two boys watch the light leaking under the door. If it reached you, quietly tightening music suits you.",
          readKo: "두 소년이 문 아래로 새어 드는 빛을 바라봅니다. 이 그림이 와닿았다면 조용히 조여 오는 음악을 좋아하실 거예요." },
        { id: "hylas", m: "fantasy", f: "John_William_Waterhouse_-_Hylas_and_the_Nymphs.jpg", y: 1896,
          en: "Hylas and the Nymphs", ko: "힐라스와 님프들", byEn: "John William Waterhouse", byKo: "존 윌리엄 워터하우스",
          moodEn: "hands that draw you under", moodKo: "물속으로 이끄는 손",
          tagEn: "After the Pre-Raphaelites · the lure of the pond", tagKo: "라파엘 전파 이후 · 연못의 유혹",
          readEn: "Nymphs quietly pull the young man at the water's edge. If it drew you in, mysterious, rippling music suits you.",
          readKo: "님프들이 물가의 청년을 조용히 끌어당깁니다. 이 그림에 끌렸다면 물결 같은 신비로운 음악을 좋아하실 거예요." },
        { id: "huguenot", m: "love", f: "Huguenot_lovers_on_St._Bartholomew's_Day.jpg", y: 1852,
          en: "A Huguenot, on St. Bartholomew's Day", ko: "위그노", byEn: "John Everett Millais", byKo: "존 에버렛 밀레이",
          moodEn: "an embrace before parting", moodKo: "작별 앞의 포옹",
          tagEn: "Pre-Raphaelite · lovers by the wall", tagKo: "라파엘 전파 · 담장 앞의 연인",
          readEn: "She tries to tie the badge to his arm; he refuses. If it stayed with you, aching melodies suit you.",
          readKo: "여인이 연인의 팔에 표식을 묶으려 하고 그는 거절합니다. 이 그림이 마음에 남았다면 애틋한 선율을 좋아하실 거예요." },
        { id: "proserpine", m: "love", f: "Dante_Gabriel_Rossetti_-_Proserpine_-_Google_Art_Project.jpg", y: 1874,
          en: "Proserpine", ko: "프로세르피나", byEn: "Dante Gabriel Rossetti", byKo: "단테 가브리엘 로세티",
          moodEn: "a goddess holding a pomegranate", moodKo: "석류를 든 여신",
          tagEn: "Pre-Raphaelite · deep green and red fruit", tagKo: "라파엘 전파 · 깊은 초록과 붉은 과일",
          readEn: "Holding the pomegranate, the goddess turns, longing for the light above. If it drew you in, deep, yearning music suits you.",
          readKo: "석류를 든 여신이 지상의 빛을 그리워하며 고개를 돌립니다. 이 그림에 끌렸다면 짙고 그리운 음악이 어울려요." },
        { id: "beatrix", m: "fantasy", f: "Dante_Gabriel_Rossetti_-_Beata_Beatrix,_1864-1870.jpg", y: 1870,
          en: "Beata Beatrix", ko: "베아타 베아트릭스", byEn: "Dante Gabriel Rossetti", byKo: "단테 가브리엘 로세티",
          moodEn: "eyes closed in rapture", moodKo: "황홀한 눈감음",
          tagEn: "Pre-Raphaelite · Dante and love's death", tagKo: "라파엘 전파 · 단테와 사랑의 죽음",
          readEn: "A woman with closed eyes in the light, and a bird bearing a poppy. If you like it, dreamlike music suits you.",
          readKo: "빛 속에서 눈을 감은 여인과 양귀비를 문 새. 이 그림이 좋다면 꿈결 같은 음악을 좋아하실 거예요." },
        { id: "goldenstairs", m: "fantasy", f: "Edward_Burne-Jones_The_Golden_Stairs.jpg", y: 1880,
          en: "The Golden Stairs", ko: "황금 계단", byEn: "Edward Burne-Jones", byKo: "에드워드 번존스",
          moodEn: "an ensemble coming down the stairs", moodKo: "계단을 내려오는 합주",
          tagEn: "Pre-Raphaelite · a procession of music", tagKo: "라파엘 전파 · 음악의 행렬",
          readEn: "Women carrying instruments descend an endless stair. If it drew you in, softly flowing music suits you.",
          readKo: "악기를 든 여인들이 끝없이 계단을 내려옵니다. 이 그림에 끌렸다면 부드럽게 흐르는 음악을 좋아하실 거예요." },
        { id: "flamingjune", m: "opulent", f: "Flaming_June,_by_Frederic_Lord_Leighton_(1830-1896).jpg", y: 1895,
          en: "Flaming June", ko: "타오르는 6월", byEn: "Frederic Leighton", byKo: "프레더릭 레이턴",
          moodEn: "a scarlet siesta", moodKo: "주홍빛 낮잠",
          tagEn: "Victorian classicism · midsummer sleep", tagKo: "빅토리아 고전주의 · 한여름의 잠",
          readEn: "Wrapped in orange cloth, a woman sleeps in the midday heat. If you like it, warm, languid music suits you.",
          readKo: "주홍빛 천에 싸인 여인이 한낮의 열기 속에 잠들어 있습니다. 이 그림이 좋다면 따뜻하고 나른한 음악이 어울려요." },
        { id: "aprillove", m: "love", f: "Arthur_Hughes_-_April_Love_-_Google_Art_Project.jpg", y: 1856,
          en: "April Love", ko: "4월의 사랑", byEn: "Arthur Hughes", byKo: "아서 휴스",
          moodEn: "tears under the ivy", moodKo: "덩굴 아래의 눈물",
          tagEn: "Pre-Raphaelite · the tremor of first love", tagKo: "라파엘 전파 · 첫사랑의 흔들림",
          readEn: "A girl in violet holds back tears beneath the ivy. If it drew you in, delicate, fragile music suits you.",
          readKo: "보라색 드레스의 소녀가 덩굴 아래에서 눈물을 참습니다. 이 그림에 끌렸다면 섬세하고 여린 음악을 좋아하실 거예요." },
        { id: "lastengland", m: "love", f: "Ford_Madox_Brown_-_The_Last_of_England_-_Google_Art_Project.jpg", y: 1855,
          en: "The Last of England", ko: "영국이여 안녕", byEn: "Ford Madox Brown", byKo: "포드 매덕스 브라운",
          moodEn: "a couple on a departing ship", moodKo: "떠나는 배 위의 부부",
          tagEn: "Pre-Raphaelite · an emigrants' farewell", tagKo: "라파엘 전파 · 이민자의 작별",
          readEn: "On deck a couple hold hands and turn their backs on home. If it reached you, music like a farewell song suits you.",
          readKo: "배 위에서 부부가 손을 잡고 고향을 등집니다. 이 그림이 와닿았다면 작별의 노래 같은 음악을 좋아하실 거예요." },
        { id: "esther", m: "opulent", f: "Esther_se_parant_pour_être_présentée_au_roi_Assuérus,_dit_aussi_La_toilette_d'Esther_-_Théodore_Chassériau_-_Musée_du_Louvre_Peintures_RF_3900.jpg", y: 1841,
          en: "The Toilette of Esther", ko: "에스더의 단장", byEn: "Théodore Chassériau", byKo: "테오도르 샤세리오",
          moodEn: "a queen letting down her hair", moodKo: "머리를 푸는 왕비",
          tagEn: "Romanticism · Oriental sensuality", tagKo: "낭만주의 · 오리엔트의 관능",
          readEn: "She lets down her long hair as maids hand her jewels. If it drew you in, exotic, sensuous music suits you.",
          readKo: "여인이 긴 머리를 풀고 시녀들이 장신구를 건넵니다. 이 그림에 끌렸다면 이국적이고 감각적인 음악이 어울려요." },
        { id: "atala", m: "love", f: "Atala_au_tombeau_-_Anne-Louis_Girodet_-_Musée_du_Louvre_Peintures_INV_4958,_louvre_1.jpg", y: 1808,
          en: "The Burial of Atala", ko: "아탈라의 매장", byEn: "Anne-Louis Girodet", byKo: "안 루이 지로데",
          moodEn: "a farewell in the cave", moodKo: "동굴 속의 작별",
          tagEn: "Romanticism · Chateaubriand's novel", tagKo: "낭만주의 · 샤토브리앙의 소설",
          readEn: "Her lover and a monk bury the girl in a cave. If it moved you, sad and beautiful music suits you.",
          readKo: "연인과 수도사가 동굴에서 소녀를 묻습니다. 이 그림이 마음을 울렸다면 슬프고 아름다운 음악을 좋아하실 거예요." },
        { id: "belledame", m: "fantasy", f: "John_William_Waterhouse_-_La_Belle_Dame_sans_Merci_(1893).jpg", y: 1893,
          en: "La Belle Dame sans Merci", ko: "무정한 미인", byEn: "John William Waterhouse", byKo: "존 윌리엄 워터하우스",
          moodEn: "a snare of hair", moodKo: "머리카락의 덫",
          tagEn: "After the Pre-Raphaelites · Keats's poem", tagKo: "라파엘 전파 이후 · 키츠의 시",
          readEn: "A woman in the forest draws the knight in with her hair. If it drew you in, fairy-tale but dangerous music suits you.",
          readKo: "숲속 여인이 머리카락으로 기사를 끌어당깁니다. 이 그림에 끌렸다면 동화 같으면서 위험한 음악을 좋아하실 거예요." },
        { id: "eugenie", m: "opulent", f: "Winterhalter_Franz_Xavier_The_Empress_Eugenie_Surrounded_by_her_Ladies_in_Waiting.jpg", y: 1855,
          en: "Empress Eugénie Surrounded by her Ladies in Waiting", ko: "시녀들에 둘러싸인 외제니 황후", byEn: "Franz Xaver Winterhalter", byKo: "프란츠 크사버 빈터할터",
          moodEn: "a silk garden in the woods", moodKo: "숲속의 비단 꽃밭",
          tagEn: "Second Empire court portrait · Romantic splendour", tagKo: "제2제정 궁정 초상 · 낭만의 화려함",
          readEn: "The empress in white and her ladies sit like flowers in the woods. If you like it, bright, singing, waltz-like music suits you.",
          readKo: "흰 드레스의 황후와 시녀들이 숲속에 꽃처럼 둘러앉아 있습니다. 이 그림이 좋다면 화사하고 노래하는 왈츠 같은 음악을 좋아하실 거예요." },
        { id: "delaware", m: "opulent", f: "Washington_Crossing_the_Delaware_by_Emanuel_Leutze,_MMA-NYC,_1851.jpg", y: 1851,
          en: "Washington Crossing the Delaware", ko: "델라웨어강을 건너는 워싱턴", byEn: "Emanuel Leutze", byKo: "에마누엘 로이체",
          moodEn: "a boat cutting through the ice", moodKo: "얼음 강을 가르는 배",
          tagEn: "American Romanticism · a scene from history", tagKo: "미국 낭만주의 · 역사의 한 장면",
          readEn: "Washington stands at the bow as the boat pushes through ice on a raging winter river. If you like it, heroic music that marches through hardship suits you.",
          readKo: "성난 겨울 강의 얼음 사이로 워싱턴이 뱃머리에 서서 나아갑니다. 이 그림이 좋다면 역경을 뚫고 행진하는 영웅적인 음악을 좋아하실 거예요." },
        { id: "starrynight", m: "fantasy", f: "Vincent_van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg", y: 1889,
          en: "The Starry Night", ko: "별이 빛나는 밤", byEn: "Vincent van Gogh", byKo: "빈센트 반 고흐",
          moodEn: "a swirling night sky", moodKo: "소용돌이치는 밤하늘",
          tagEn: "Post-Impressionism · brushstrokes that move", tagKo: "후기인상주의 · 꿈틀대는 붓질",
          readEn: "Above a sleeping village, stars and wind whirl across the night sky. If you like it, fantastical, surging music suits you.",
          readKo: "잠든 마을 위로 별과 바람이 소용돌이치며 밤하늘을 휘젓습니다. 이 그림이 좋다면 환상적이고 굽이치는 음악을 좋아하실 거예요." },
        { id: "crows", m: "tragic", f: "Vincent_Van_Gogh_-_Wheatfield_with_Crows.jpg", y: 1890,
          en: "Wheatfield with Crows", ko: "까마귀가 나는 밀밭", byEn: "Vincent van Gogh", byKo: "빈센트 반 고흐",
          moodEn: "a wheatfield before the storm", moodKo: "폭풍 전의 밀밭",
          tagEn: "Post-Impressionism · a landscape of a last summer", tagKo: "후기인상주의 · 마지막 여름의 풍경",
          readEn: "Under a darkening sky the wheat heaves and a flock of crows takes off. If you like it, restless, violently surging music suits you.",
          readKo: "어두운 하늘 아래 밀밭이 출렁이고 까마귀 떼가 날아오릅니다. 이 그림이 좋다면 불안하고 격렬하게 흔들리는 음악을 좋아하실 거예요." },
        { id: "etoile", m: "dash", f: "Edgar_Germain_Hilaire_Degas_018.jpg", y: 1878,
          en: "The Star (Dancer on Stage)", ko: "무대 위의 무희(에투알)", byEn: "Edgar Degas", byKo: "에드가 드가",
          moodEn: "one turn in the spotlight", moodKo: "스포트라이트 속 한 바퀴",
          tagEn: "Impressionism · a moment on stage", tagKo: "인상주의 · 무대의 순간",
          readEn: "A ballerina in the footlights glides and lifts toward the front of the stage. If you like it, light, spinning, leaping dance music suits you.",
          readKo: "조명을 받은 발레리나가 무대 앞으로 미끄러지듯 날아오릅니다. 이 그림이 좋다면 가볍게 돌고 뛰어오르는 춤곡을 좋아하실 거예요." },
        { id: "lazare", m: "dash", f: "Claude_Monet_-_The_Saint-Lazare_Station_-_Google_Art_Project.jpg", y: 1877,
          en: "The Saint-Lazare Station", ko: "생라자르역", byEn: "Claude Monet", byKo: "클로드 모네",
          moodEn: "a train arriving in steam", moodKo: "증기 속으로 들어오는 기차",
          tagEn: "Impressionism · steam and light", tagKo: "인상주의 · 증기와 빛",
          readEn: "Beneath the glass roof a train pulls in, breathing out white steam. If you like it, music with a running rhythm suits you.",
          readKo: "유리 지붕 아래 기차가 하얀 증기를 내뿜으며 역으로 들어옵니다. 이 그림이 좋다면 달리는 리듬이 살아 있는 음악을 좋아하실 거예요." },
        { id: "scream", m: "dread", f: "Edvard_Munch,_1893,_The_Scream,_oil,_tempera_and_pastel_on_cardboard,_91_x_73_cm,_National_Gallery_of_Norway.jpg", y: 1893,
          en: "The Scream", ko: "절규", byEn: "Edvard Munch", byKo: "에드바르 뭉크",
          moodEn: "a cry under a red sky", moodKo: "붉은 하늘 아래의 외침",
          tagEn: "Expressionism · a landscape of inner anxiety", tagKo: "표현주의 · 마음속 불안의 풍경",
          readEn: "Beneath a sky streaked red, a figure on a bridge covers its ears and cries out. If you like it, uneasy, tense music suits you.",
          readKo: "붉게 물든 하늘 아래, 다리 위의 사람이 귀를 막고 외칩니다. 이 그림이 좋다면 불안하고 긴장감 있는 음악을 좋아하실 거예요." },
        { id: "wanderer", m: "opulent", f: "Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog.jpg", y: 1818,
          en: "Wanderer above the Sea of Fog", ko: "안개 바다 위의 방랑자", byEn: "Caspar David Friedrich", byKo: "카스파르 다비트 프리드리히",
          moodEn: "a back turned to the fog", moodKo: "안개 너머를 보는 뒷모습",
          tagEn: "German Romanticism · the sublime landscape", tagKo: "독일 낭만주의 · 숭고한 풍경",
          readEn: "A lone figure on a rock gazes over an endless sea of fog. If you like it, solitary, vast, sweeping music suits you.",
          readKo: "바위 위에 선 한 사람이 끝없이 펼쳐진 안개 바다를 내려다봅니다. 이 그림이 좋다면 고독하고 장대하게 펼쳐지는 음악을 좋아하실 거예요." },
        { id: "mother", m: "tragic", f: "Whistlers_Mother_high_res.jpg", y: 1871,
          en: "Arrangement in Grey and Black No. 1 (Whistler's Mother)", ko: "회색과 검은색의 배열 1번(화가의 어머니)", byEn: "James McNeill Whistler", byKo: "제임스 맥닐 휘슬러",
          moodEn: "a grey silence", moodKo: "회색빛 침묵",
          tagEn: "Aestheticism · a portrait composed in colour", tagKo: "탐미주의 · 색으로 쓴 초상",
          readEn: "In black, the artist's mother sits in quiet profile before a grey wall. If you like it, restrained, quietly subdued music suits you.",
          readKo: "검은 옷의 어머니가 회색 벽 앞에 옆모습으로 조용히 앉아 있습니다. 이 그림이 좋다면 절제되고 차분하게 가라앉은 음악을 좋아하실 거예요." },
        { id: "potato", m: "tragic", f: "Vincent_van_Gogh_-_The_potato_eaters_-_Google_Art_Project.jpg", y: 1885,
          en: "The Potato Eaters", ko: "감자 먹는 사람들", byEn: "Vincent van Gogh", byKo: "빈센트 반 고흐",
          moodEn: "a humble supper under the lamp", moodKo: "등불 아래의 소박한 저녁",
          tagEn: "Dutch Realism · a portrait of peasants", tagKo: "네덜란드 사실주의 · 농부들의 초상",
          readEn: "Under a dim lamp a peasant family shares a supper of potatoes. If you like it, plain, deeply resonant music suits you.",
          readKo: "희미한 등불 아래 농부 가족이 감자로 저녁을 나눕니다. 이 그림이 좋다면 소박하고 묵직하게 울리는 음악을 좋아하실 거예요." },
        { id: "sleepreason", m: "dread", f: "Goya-Capricho-43.jpg", y: 1799,
          en: "The Sleep of Reason Produces Monsters", ko: "이성이 잠들면 괴물이 깨어난다", byEn: "Francisco de Goya", byKo: "프란시스코 고야",
          moodEn: "wings over a sleeping head", moodKo: "잠든 머리 위의 날갯짓",
          tagEn: "Spanish Romanticism · from the Caprichos prints", tagKo: "스페인 낭만주의 · 판화집 「변덕」",
          readEn: "Owls and bats swarm behind a man asleep at his desk. If you like it, mysterious, slightly eerie music suits you.",
          readKo: "책상에 엎드려 잠든 사람 뒤로 올빼미와 박쥐가 몰려듭니다. 이 그림이 좋다면 신비롭고 조금 으스스한 음악을 좋아하실 거예요." },
        { id: "burial", m: "tragic", f: "Gustave_Courbet_-_A_Burial_at_Ornans_-_Google_Art_Project_2.jpg", y: 1850,
          en: "A Burial at Ornans", ko: "오르낭의 매장", byEn: "Gustave Courbet", byKo: "귀스타브 쿠르베",
          moodEn: "a whole village at the graveside", moodKo: "마을 전체가 선 장례",
          tagEn: "French Realism · history painting of ordinary people", tagKo: "프랑스 사실주의 · 평범한 사람들의 역사화",
          readEn: "Villagers stand quietly in a long line beside an open grave. If you like it, solemn, composed music of mourning suits you.",
          readKo: "시골 마을 사람들이 한 줄로 늘어서 무덤 앞에 조용히 서 있습니다. 이 그림이 좋다면 엄숙하고 담담한 애도의 음악을 좋아하실 거예요." },
      ],
    };

    // Both styles' paintings in one list (Q2 rounds and the result mix them)
    function allPaintings() { return (SETS.classic || []).concat(SETS.romantic || []); }
    function pById(id) { return allPaintings().find(p => p.id === id); }
    function eraIdOf(id) { return (SETS.classic || []).some(p => p.id === id) ? 'classic' : (SETS.romantic || []).some(p => p.id === id) ? 'romantic' : null; }
    const round2 = document.getElementById('round2');
    const r2Grid = document.getElementById('r2-grid');
    const r2Go = document.getElementById('r2-go');
    const r2Swap = document.getElementById('r2-swap');
    // ---------- Q2: round-based picking ----------
    // The 24 paintings of a style sit in 4 groups of 6 (different feelings). Each round shows one painting
    // from every group, so all 4 tiles in a round always differ in feeling; the order is shuffled every visit.
    const GROUPS = {
      classic: [
        { en: 'Calm', ko: '고요', ja: '静けさ', ids: ['pearl', 'musiclesson', 'prodigal', 'recamier', 'reader', 'socrates', 'milkmaid', 'delft', 'balance', 'littlestreet', 'courtyard', 'bubbles', 'grace', 'magdalene', 'lemons', 'sheba', 'philosopher', 'chocolate', 'monalisa'] },
        { en: 'Passion', ko: '열정', ja: '情熱', ids: ['nightwatch', 'matthew', 'horatii', 'napoleon', 'paul', 'elevation', 'warconseq', 'breda', 'wolfe', 'coronation', 'athens', 'adam', 'lastsupper', 'belshazzar', 'emmaus', 'arcole', 'titianbacchus', 'babel'] },
        { en: 'Grace', ko: '우아', ja: '優雅', ids: ['odalisque', 'valpincon', 'swing', 'marie', 'morningwalk', 'cavalier', 'cythera', 'pompadour', 'stolenkiss', 'sheridan', 'blueboy', 'pinkie', 'strawhat', 'charleshunt', 'gardenlove', 'oldsing', 'toilette', 'ageinnocence'] },
        { en: 'Myth & dream', ko: '몽환', ja: '夢幻', ids: ['psyche', 'endymion', 'kauffman', 'meninas', 'thetis', 'sabine', 'arcadia', 'dancetime', 'isaac', 'paris', 'bacchus', 'atalanta', 'venustriumph', 'graces', 'ossian', 'oedipus', 'spinners', 'danae'] },
      ],
      romantic: [
        { en: 'Calm', ko: '고요', ja: '静けさ', ids: ['schubertiade', 'poetspitzweg', 'haywain', 'monk', 'rugen', 'temeraire', 'window', 'moonrise', 'twomen', 'wivenhoe', 'cornfield', 'mortefontaine', 'angelus', 'norham', 'studio', 'stages', 'lonetree', 'bookworm'] },
        { en: 'Storm', ko: '격정', ja: '激情', ids: ['chasseur', 'derby', 'railspeed', 'hannibal', 'ninthwave', 'steamboat', 'arabhorses', 'shipwreck', 'crusaders', 'avalanche', 'galilee', 'trafalgar', 'campaign', 'delaware', 'starrynight', 'crows', 'etoile', 'lazare'] },
        { en: 'Darkness', ko: '어둠', ja: '闇', ids: ['seaice', 'barque', 'nightmare', 'hamlet', 'colossus', 'oakwood', 'isledead', 'wrath', 'witches', 'deluge', 'princes', 'scream', 'wanderer', 'mother', 'potato', 'sleepreason', 'burial'] },
        { en: 'Love & dream', ko: '사랑·몽환', ja: '愛と夢', ids: ['kiss', 'francesca', 'ophelia', 'titania', 'shalott', 'algiers', 'hylas', 'huguenot', 'proserpine', 'beatrix', 'goldenstairs', 'flamingjune', 'aprillove', 'lastengland', 'esther', 'atala', 'belledame', 'eugenie'] },
      ],
    };
    const ROUNDS = 3;   // PC and phones alike (PC was 6 until 2026-10-19)
    const groupName = g => g[lang === 'ja' ? 'ja' : lang === 'ko' ? 'ko' : 'en'];
    const groupFor = id => { for (const era of ['classic', 'romantic']) { const g = (GROUPS[era] || []).find(g => g.ids.includes(id)); if (g) return g; } return null; };
    // Mixed rounds: every round shows two classic-style and two romantic-style paintings, from two different
    // feeling groups of each style, so neither
    // style is favoured; the final style is counted from these picks together with the Q1 buildings.
    const GROUP_PAIRS = [[0, 1], [2, 3], [0, 2], [1, 3], [0, 3], [1, 2]];
    function buildRounds() {
      const G = era => GROUPS[era].map(g => g.ids.map(id => pById(id)).filter(Boolean));
      const gc = G('classic'), gr = G('romantic');
      let best = null, bestClash = Infinity;
      for (let tries = 0; tries < 400 && bestClash > 0; tries++) {
        const pc = sample(GROUP_PAIRS, ROUNDS), pr = sample(GROUP_PAIRS, ROUNDS);
        const sc = gc.map(g => sample(g, g.length)), sr = gr.map(g => sample(g, g.length));
        const ic = [0, 0, 0, 0], ir = [0, 0, 0, 0];
        const rounds = pc.map((P, r) => {
          const R = pr[r];
          return [sc[P[0]][ic[P[0]]++], sc[P[1]][ic[P[1]]++], sr[R[0]][ir[R[0]]++], sr[R[1]][ir[R[1]]++]].filter(Boolean);
        });
        const clash = rounds.reduce((n, R) => n + (R.length - new Set(R.map(p => p.byEn)).size), 0);
        if (clash < bestClash) { bestClash = clash; best = rounds; }
      }
      return best.map(R => sample(R, R.length));
    }
    // Final style: Q1 votes (2 buildings + 2 figures) + Q2 painting picks, one vote each (4 + 6 = 10; a tie falls back to Q1)
    function eraVotes() {
      const all = q1Votes.concat(selected().map(p => eraIdOf(p.id)));
      const c = all.filter(e => e === 'classic').length, r = all.length - c;
      return { c, r, n: all.length };
    }
    function finalEra() {
      const v = eraVotes();
      if (v.c !== v.r) return v.c > v.r ? 'classic' : 'romantic';
      return q1Era() || currentEra || 'classic';
    }
    let picks = new Set();   // chosen painting ids, in round order
    let rounds = [];         // ROUNDS arrays of four paintings
    let roundPicks = [];     // the id chosen in each round (or null)
    let roundIdx = 0;        // the round on screen; -1 = all rounds done
    let restored = false;    // opened from a shared link
    const filled = () => roundPicks.filter(Boolean).length;
    const ready = () => restored ? picks.size >= 2 : (rounds.length > 0 && filled() === rounds.length);
    function syncPicks() { picks = new Set(roundPicks.filter(Boolean)); }
    function nextOpenRound(from) {
      for (let i = from + 1; i < rounds.length; i++) if (!roundPicks[i]) return i;
      for (let i = 0; i < rounds.length; i++) if (!roundPicks[i]) return i;
      return -1;
    }

    // Progress bar + "Step n of t · about 15 seconds"
    function updateProgress() {
      const t = I18N[lang];
      const step = currentEra ? 2 : 1;
      const _sl = document.getElementById('step-label'); if (_sl) _sl.textContent =
        t.stepLabel.replace('{n}', step).replace('{t}', 2) + ' · ' + t.timeNote;
      let pct = 0;
      if (result.classList.contains('open')) pct = 100;
      else if (currentEra) pct = 50 + Math.round(filled() / (rounds.length || ROUNDS) * 49);
      else pct = Math.round(q1Votes.length / Q1_N * 45);
      document.getElementById('progress-bar').style.width = pct + '%';
    }

    function updateCount() {
      const t = I18N[lang], ok = ready(), total = rounds.length || ROUNDS;
      const el = document.getElementById('r2-count');
      el.textContent = ok ? t.r2Count2 : t.rCount.replace('{n}', filled()).replace('{t}', total);
      el.classList.toggle('r2-ready', ok);
      r2Go.disabled = !ok;
      r2Go.classList.toggle('r2-bounce', ok);
      // "previous round" button
      r2Swap.textContent = t.rPrev;
      r2Swap.disabled = restored || roundIdx === 0;
      r2Swap.style.visibility = restored ? 'hidden' : '';
      // round header
      const head = document.getElementById('r-round');
      if (head) {
        head.innerHTML = '';
        if (roundIdx >= 0 && !restored) {
          const k = document.createElement('span'); k.className = 'rr-k';
          k.textContent = t.rRound.replace('{n}', roundIdx + 1).replace('{t}', total);
          const s = document.createElement('span'); s.className = 'rr-s'; s.textContent = t.rPickOne;
          head.append(k, s);
        }
      }
      // one dot per round: tap a finished round to change it
      const dots = document.getElementById('r2-dots');
      dots.innerHTML = '';
      if (!restored) for (let i = 0; i < total; i++) {
        const d = document.createElement('button');
        d.type = 'button';
        d.className = (roundPicks[i] ? 'done' : '') + (i === roundIdx ? ' cur' : '');
        d.setAttribute('aria-label', t.rRound.replace('{n}', i + 1).replace('{t}', total));
        if (i === roundIdx) d.setAttribute('aria-current', 'step');
        d.disabled = !roundPicks[i] && i !== nextOpenRound(-1);
        d.addEventListener('click', () => goRound(i));
        dots.appendChild(d);
      }
      updateProgress();
    }
    function goRound(i) {
      if (i === roundIdx) return;
      hideZoom();
      r2Grid.classList.add('swapping');
      setTimeout(() => { roundIdx = i; renderTiles(); r2Grid.classList.remove('swapping'); }, 200);
    }

    // The recommendation is ready as soon as two paintings are kept; it appears right below, no jump
    function syncResult() {
      if (ready()) {
        if (!restored) currentEra = finalEra(); renderResult(); result.classList.add('open');
        if (!syncResult.done) { syncResult.done = true; track(restored ? 'shared_result_open' : 'test_complete', { era: currentEra, picks: picks.size, type: dominantMood(selected()) }); onComplete(); }
      }
      else result.classList.remove('open');
      updateCount();
      if (typeof syncShare === 'function') syncShare();
      { const td = document.getElementById('today'); if (td) td.hidden = !ready(); }
      if (ready()) { clearTimeout(syncResult.t); syncResult.t = setTimeout(() => { try { prepareImages(); } catch (e) {} }, 1500); }
    }
    function goResult() {
      if (!ready()) return;
      result.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Deal the rounds of a style on first hover/touch and preload round one, so step 2 appears instantly
    const preloaded = new Set(), roundsCache = {};
    function preloadEra() {
      if (preloaded.has('mix')) return;
      preloaded.add('mix');
      roundsCache.mix = roundsCache.mix || buildRounds();
      roundsCache.mix[0].forEach(p => { const im = new Image(); im.referrerPolicy = 'no-referrer'; im.src = THUMB(p.f, 500); });
    }
    ['pointerover', 'touchstart', 'focusin'].forEach(ev => pair.addEventListener(ev, (e) => {
      const c = e.target.closest && e.target.closest('.card'); if (c && q1Votes.length >= Q1_N - 2) preloadEra();
    }, { passive: true }));

    // Hover (or long-press on phones) shows the painting large next to the tile
    const zoomPv = (() => {
      const el = document.createElement('div'); el.id = 'zoom-pv'; el.className = 'zoom-pv'; el.hidden = true; el.setAttribute('aria-hidden', 'true');
      el.innerHTML = '<img alt="" referrerpolicy="no-referrer" /><div class="zc"><b></b><span></span></div>';
      document.body.appendChild(el); return el;
    })();
    let zoomTimer = 0, zoomFor = null;
    function showZoom(tile, p, title, by) {
      zoomFor = tile;
      const im = zoomPv.querySelector('img');
      setImgSrc(im, p.f, 500);
      const hi = new Image(); hi.referrerPolicy = 'no-referrer';
      hi.onload = () => { if (zoomFor === tile) im.src = hi.src; };
      hi.src = THUMB(p.f, 1280);
      zoomPv.querySelector('b').textContent = title;
      zoomPv.querySelector('span').textContent = by + ' · ' + p.y;
      zoomPv.hidden = false;
      const place = () => {
        if (zoomFor !== tile) return;
        const r = tile.getBoundingClientRect(), vw = innerWidth, vh = innerHeight, gap = 16;
        const w = Math.min(640, Math.max(260, Math.max(r.left, vw - r.right) - gap * 2), vw - 24);
        zoomPv.style.width = w + 'px';
        const h = zoomPv.offsetHeight;
        let x = (vw - r.right >= r.left) ? r.right + gap : r.left - gap - w;
        if (x < 12 || x + w > vw - 12) x = Math.max(12, (vw - w) / 2);
        let y = r.top + r.height / 2 - h / 2;
        y = Math.max(76, Math.min(y, vh - h - 12));
        zoomPv.style.left = x + 'px'; zoomPv.style.top = y + 'px';
        requestAnimationFrame(() => zoomPv.classList.add('on'));
      };
      place(); im.onload = place;
    }
    function hideZoom() { clearTimeout(zoomTimer); zoomFor = null; zoomPv.classList.remove('on'); zoomPv.hidden = true; }
    function attachZoom(tile, p, title, by) {
      const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
      if (fine) {
        tile.addEventListener('mouseenter', () => { clearTimeout(zoomTimer); zoomTimer = setTimeout(() => showZoom(tile, p, title, by), 160); });
        tile.addEventListener('mouseleave', hideZoom);
      } else {
        let lp = 0;
        tile.addEventListener('touchstart', () => { lp = setTimeout(() => { tile._longPressed = true; showZoom(tile, p, title, by); }, 420); }, { passive: true });
        const end = () => { clearTimeout(lp); if (zoomFor === tile) setTimeout(hideZoom, 60); };
        tile.addEventListener('touchend', end); tile.addEventListener('touchcancel', end); tile.addEventListener('touchmove', () => clearTimeout(lp), { passive: true });
        tile.addEventListener('contextmenu', e => { if (tile._longPressed) e.preventDefault(); });
      }
    }
    addEventListener('scroll', () => { if (zoomFor) hideZoom(); }, { passive: true });
    // All rounds done: the day's paintings in a row, each one jumps back to its round
    function renderDone() {
      const t = I18N[lang], ko = isLocal();
      r2Grid.innerHTML = '';
      const box = document.createElement('div');
      box.className = 'r-done';
      const h = document.createElement('p'); h.className = 'r-done-h'; h.textContent = t.rDone.replace('{n}', picks.size);
      const s = document.createElement('p'); s.className = 'r-done-s'; s.textContent = restored ? '' : t.rDoneSub;
      const row = document.createElement('div'); row.className = 'r-done-row';
      selected().forEach(p => {
        const b = document.createElement('button');
        b.type = 'button'; b.className = 'r-done-item';
        const title = ko ? p.ko : p.en;
        b.title = title; b.setAttribute('aria-label', title);
        const im = document.createElement('img');
        im.alt = ''; im.referrerPolicy = 'no-referrer'; im.decoding = 'async';
        im.addEventListener('imgfail', () => im.remove());
        setImgSrc(im, p.f, 250);
        const cap = document.createElement('span'); cap.textContent = title;
        b.append(im, cap);
        const ri = roundPicks.indexOf(p.id);
        if (restored || ri < 0) b.disabled = true; else b.addEventListener('click', () => goRound(ri));
        row.appendChild(b);
      });
      box.append(h, s, row);
      r2Grid.appendChild(box);
    }
    function choose(id) {
      track('round_pick', { round_no: roundIdx + 1, round_total: rounds.length, painting: id, changed: roundPicks[roundIdx] ? 1 : 0 });
      roundPicks[roundIdx] = id;
      syncPicks();
      [...r2Grid.querySelectorAll('.tile')].forEach(x => x.setAttribute('aria-pressed', String(x.dataset.id === id)));
      r2Grid.classList.add('has-pick');
      updateCount();
      hideZoom();
      clearTimeout(choose.t);
      choose.t = setTimeout(() => {
        r2Grid.classList.add('swapping');
        setTimeout(() => {
          roundIdx = nextOpenRound(roundIdx);
          renderTiles();
          r2Grid.classList.remove('swapping');
          syncResult();
        }, 220);
      }, 380);
    }
    function renderTiles() {
      if (!currentEra) return;
      r2Grid.classList.remove('has-pick');
      if (roundIdx < 0 || restored) { renderDone(); updateCount(); return; }
      r2Grid.innerHTML = '';
      (rounds[roundIdx] || []).forEach(p => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'tile';
        b.dataset.id = p.id;
        b.setAttribute('aria-pressed', String(roundPicks[roundIdx] === p.id));
        const title = isLocal() ? p.ko : p.en;
        const by = isLocal() ? p.byKo : p.byEn;
        b.setAttribute('aria-label', title + ', ' + by);

        // The whole painting sits inside a 4:3 frame (nothing is cropped)
        const frame = document.createElement('span');
        frame.className = 'frame';
        const img = document.createElement('img');
        img.referrerPolicy = 'no-referrer'; img.decoding = 'async'; img.alt = '';
        img.addEventListener('imgfail', () => img.remove());
        setImgSrc(img, p.f, 500);
        frame.style.setProperty('--bg', 'url("' + THUMB(p.f, 500) + '")');   // same file as the picture: one download, not two
        const badge = document.createElement('span');
        badge.className = 'badge';
        badge.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-10"/></svg>';
        frame.append(img, badge);

        const cap = document.createElement('span');
        cap.className = 'block px-2.5 py-2 sm:px-3 sm:py-2.5';
        const t = document.createElement('span');
        t.className = 'block font-serif text-[13px] leading-snug sm:text-base font-semibold line-clamp-2';
        t.textContent = title;
        const m = document.createElement('span');
        m.className = 'mt-0.5 block text-[11px] sm:text-xs opacity-70 truncate';
        m.textContent = by + ' · ' + p.y;
        cap.append(t, m);

        b.append(frame, cap);
        attachZoom(b, p, title, by);
        b.addEventListener('click', () => {
          if (b._longPressed) { b._longPressed = false; return; }
          choose(p.id);
        });
        r2Grid.appendChild(b);
      });
      updateCount();
      // while this round is on screen, quietly fetch the next round's four pictures
      const nxt = rounds[roundIdx + 1];
      if (nxt) (window.requestIdleCallback || (f => setTimeout(f, 400)))(() => nxt.forEach(p => { const im = new Image(); im.referrerPolicy = 'no-referrer'; im.src = THUMB(p.f, 500); }));
    }

    // Step 1: first choice -> round two (the style name is still not revealed)
    function pick(era, chosen) {
      currentEra = era;
      cmpTouched = false;
      selectedComposer = null;
      restored = false;
      rounds = roundsCache.mix || buildRounds();
      delete roundsCache.mix; preloaded.delete('mix');   // the next visit gets a fresh deal
      roundPicks = rounds.map(() => null);
      roundIdx = 0;
      picks = new Set();
      cards.forEach(c => {
        const on = chosen ? c === chosen : false;
        c.classList.toggle('picked', on);
        c.setAttribute('aria-pressed', on);
      });
      pair.classList.add('has-pick');
      result.classList.remove('open');
      stopPlayer();
      renderTiles();
      round2.classList.remove('hidden');
      setTimeout(() => round2.scrollIntoView({ behavior: 'smooth', block: 'start' }), 250);
    }

    function reset(noScroll) {
      const sb = document.getElementById('shared-banner'); if (sb) sb.classList.add('hidden');
      try { history.replaceState(null, '', location.pathname + '?lang=' + lang); } catch (e) {}
      stopPlayer();
      currentEra = null;
      selectedComposer = null;
      operaOpen = false;
      picks = new Set();
      rounds = []; roundPicks = []; roundIdx = 0; restored = false; syncResult.done = false;
      q1Votes = []; q1Idx = 0; pairDirty = true; if (q1.length) renderPair();
      cards.forEach(c => { c.classList.remove('picked'); c.setAttribute('aria-pressed', false); });
      pair.classList.remove('has-pick');
      result.classList.remove('open');
      { const td = document.getElementById('today'); if (td) td.hidden = true; }
      round2.classList.add('hidden');
      r2Grid.innerHTML = '';
      updateProgress();
      if (noScroll !== true) document.getElementById('choose').scrollIntoView({ behavior: 'smooth' });
    }

    // "Show other paintings": same artists' sister works and kindred artists, picks are kept
    // "Previous round": step back (from the finished view, back to the last round)
    r2Swap.addEventListener('click', () => {
      if (restored) return;
      if (roundIdx < 0) goRound(rounds.length - 1);
      else if (roundIdx > 0) goRound(roundIdx - 1);
    });
    r2Go.addEventListener('click', goResult);
    document.getElementById('r2-back').addEventListener('click', () => reset());

    pair.addEventListener('click', (e) => { const c = e.target.closest('.card'); if (c) q1Choose(c); });
    pair.addEventListener('keydown', (e) => {
      const c = e.target.closest('.card');
      if (c && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); q1Choose(c); }
    });
    document.getElementById('r-reset').addEventListener('click', () => { reset(); redeal(); });
    document.querySelectorAll('.go-pieces').forEach(b => b.addEventListener('click', () =>
      document.getElementById('pieces').scrollIntoView({ behavior: 'smooth', block: 'start' })));

    // ---------- Main pair: plan B / plan C (famous works of each style) ----------
    const BIG = f => 'https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(f) + '?width=1400';
    const PAIRS = [
      { a: { src: document.getElementById('src-apotheosis').getAttribute('src'), pos: '50% 40%', en: 'The Apotheosis of Homer', ko: '호메로스 예찬', byEn: 'J.-A.-D. Ingres', byKo: '장 오귀스트 도미니크 앵그르', sEn: 'Ingres', sKo: '앵그르', y: 1827 },
        b: { src: BIG('Eugène_Delacroix_-_Liberty_Leading_the_People.jpeg'), pos: '50% 50%', en: 'Liberty Leading the People', ko: '민중을 이끄는 자유', byEn: 'Eugène Delacroix', byKo: '외젠 들라크루아', sEn: 'E. Delacroix', sKo: '들라크루아', y: 1830 } },
      { a: { src: BIG('Johannes_Vermeer_-_Het_melkmeisje_-_Google_Art_Project.jpg'), pos: '50% 35%', en: 'The Milkmaid', ko: '우유 따르는 여인', byEn: 'Johannes Vermeer', byKo: '요하네스 베르메르', sEn: 'J. Vermeer', sKo: '베르메르', y: 1658 },
        b: { src: BIG('Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog.jpg'), pos: '50% 30%', en: 'Wanderer above the Sea of Fog', ko: '안개 바다 위의 방랑자', byEn: 'Caspar David Friedrich', byKo: '카스파르 다비트 프리드리히', sEn: 'C. D. Friedrich', sKo: '프리드리히', y: 1818 } },
      { a: { src: BIG('Jacques-Louis_David_-_The_Coronation_of_Napoleon_(1805-1807).jpg'), pos: '58% 50%', en: 'The Coronation of Napoleon', ko: '나폴레옹 대관식', byEn: 'Jacques-Louis David', byKo: '자크 루이 다비드', sEn: 'J.-L. David', sKo: '다비드', y: 1807 },
        b: { src: BIG('JEAN_LOUIS_THÉODORE_GÉRICAULT_-_La_Balsa_de_la_Medusa_(Museo_del_Louvre,_1818-19).jpg'), pos: '45% 50%', en: 'The Raft of the Medusa', ko: '메두사호의 뗏목', byEn: 'Théodore Géricault', byKo: '테오도르 제리코', sEn: 'T. Géricault', sKo: '제리코', y: 1819 } },
    ];
    // ---------- Main page: a two-way choice (one painting per style), dealt at random every visit ----------
    const FEATURED = { classic: PAIRS.map(P => P.a), romantic: PAIRS.map(P => P.b) };
    const sample = (arr, n) => {
      const a = arr.slice();
      for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
      return a.slice(0, n);
    };
    // ---------- Q1: four pairs — two of buildings, two of figures (classical order vs romantic feeling) ----------
    // Every pair shows the SAME subject from the same kind of viewpoint (church interior vs church interior,
    // harbour vs harbour, the same cathedral, the same city), so only the feeling differs, not the subject.
    // 10 building pairs + 10 figure pairs (5× each kind's 2 questions); each visit deals 2 of each from different subject groups (cat),
    // the sides are shuffled and the style is never named.
    const B = (en, ko, ja) => [en, ko, ja];
    const ARCH = [
      { cat: 'church-in', theme: B('Inside a church', '성당 내부', '聖堂の内部'),
        classic: { f: "Saenredam,_Pieter_Jansz._-_The_Interior_of_St._Bavo,_Haarlem_-_Google_Art_Project.jpg", pos: '50% 50%',
          t: B('The Interior of St Bavo, Haarlem', '하를럼 성 바보 성당 내부', 'ハールレムの聖バーフ教会内部'),
          by: B('Pieter Saenredam', '피터르 산레담', 'ピーテル・サーンレダム'), y: '1648' },
        romantic: { f: 'François_Marius_Granet_-_Le_Choeur_de_la_Chapelle_des_Capucins_à_Rome.jpg', pos: '50% 50%',
          t: B('The Choir of the Capuchin Church in Rome', '로마 카푸친 성당의 성가대석', 'ローマのカプチン会聖堂の聖歌隊席'),
          by: B('François-Marius Granet', '프랑수아 마리위스 그라네', 'フランソワ＝マリウス・グラネ'), y: B('c. 1815', '1815년경', '1815年頃') } },
      { cat: 'church-in', theme: B('Inside a Gothic church', '고딕 성당 내부', 'ゴシック聖堂の内部'),
        classic: { f: 'Emanuel_de_Witte_(c.1615-1617-1692)_-_The_Interior_of_the_Oude_Kerk,_Amsterdam,_during_a_Sermon_-_NG1053_-_National_Gallery.jpg', pos: '50% 50%',
          t: B('The Interior of the Oude Kerk, Amsterdam', '암스테르담 아우더 교회 내부', 'アムステルダム旧教会の内部'),
          by: B('Emanuel de Witte', '에마뉘엘 더 비터', 'エマニュエル・デ・ウィッテ'), y: B('c. 1660', '1660년경', '1660年頃') },
        romantic: { f: 'Carl_Blechen_-_Gothic_Church_Ruins_-_Google_Art_Project.jpg', pos: '50% 50%',
          t: B('Gothic Church Ruins', '무너진 고딕 성당', 'ゴシック聖堂の廃墟'),
          by: B('Carl Blechen', '카를 블레헨', 'カール・ブレッヒェン'), y: '1826' } },
      { cat: 'church-out', theme: B('A Gothic church outside', '고딕 성당 외관', 'ゴシック聖堂の外観'),
        classic: { f: 'Pieter_Saenredam_-_The_Mariaplaats_with_the_Mariakerk_in_Utrecht_-_974_-_Mauritshuis.jpg', pos: '50% 50%',
          t: B('The Mariaplaats with the Mariakerk, Utrecht', '위트레흐트 마리아 교회와 광장', 'ユトレヒトのマリア教会と広場'),
          by: B('Pieter Saenredam', '피터르 산레담', 'ピーテル・サーンレダム'), y: '1662' },
        romantic: { f: '1813_Schinkel_Gotischer_Dom_am_Wasser_anagoria.JPG', pos: '50% 50%',
          t: B('Gothic Cathedral by the Water', '물가의 고딕 대성당', '水辺のゴシック大聖堂'),
          by: B('Karl Friedrich Schinkel', '카를 프리드리히 싱켈', 'カール・フリードリヒ・シンケル'), y: '1813' } },
      { cat: 'church-out', theme: B('Salisbury Cathedral', '솔즈베리 대성당', 'ソールズベリー大聖堂'),
        classic: { f: "John_Constable_-_Salisbury_Cathedral_from_the_Bishop's_Grounds_-_WGA5200.jpg", pos: '50% 50%',
          t: B("Salisbury Cathedral from the Bishop's Grounds", '주교의 정원에서 본 솔즈베리 대성당', '司教の庭から見たソールズベリー大聖堂'),
          by: B('John Constable', '존 컨스터블', 'ジョン・コンスタブル'), y: '1823' },
        romantic: { f: 'John_Constable_-_Salisbury_Cathedral_from_the_Meadows_-_Google_Art_Project.jpg', pos: '50% 50%',
          t: B('Salisbury Cathedral from the Meadows', '초원에서 본 솔즈베리 대성당', '草地から見たソールズベリー大聖堂'),
          by: B('John Constable', '존 컨스터블', 'ジョン・コンスタブル'), y: '1831' } },
      { cat: 'ruins', theme: B('The Colosseum, Rome', '로마 콜로세움', 'ローマのコロッセオ'),
        classic: { f: 'Giovanni_Paolo_Panini_-_Roman_Capriccio,_The_Colosseum_and_Other_Monuments_-_50.6_-_Indianapolis_Museum_of_Art.jpg', pos: '50% 50%',
          t: B('Roman Capriccio: The Colosseum and Other Monuments', '로마 기상화: 콜로세움과 기념물들', 'ローマのカプリッチョ：コロッセオと記念建造物'),
          by: B('Giovanni Paolo Panini', '조반니 파올로 판니니', 'ジョヴァンニ・パオロ・パニーニ'), y: '1735' },
        romantic: { f: 'Cole_Thomas_Interior_of_the_Colosseum_Rome_1832.jpg', pos: '50% 50%',
          t: B('Interior of the Colosseum, Rome', '로마 콜로세움 내부', 'ローマ、コロッセオの内部'),
          by: B('Thomas Cole', '토머스 콜', 'トマス・コール'), y: '1832' } },
      { cat: 'gallery', theme: B('The Louvre’s Grand Gallery', '루브르 대회랑', 'ルーヴルの大回廊'),
        classic: { f: 'Hubert_Robert_-_The_Grande_Galerie_-_WGA19594.jpg', pos: '50% 50%',
          t: B('The Grande Galerie of the Louvre', '루브르 대회랑', 'ルーヴルの大回廊'),
          by: B('Hubert Robert', '위베르 로베르', 'ユベール・ロベール'), y: B('c. 1795', '1795년경', '1795年頃') },
        romantic: { f: 'Hubert_Robert_-_Imaginary_View_of_the_Grande_Galerie_in_the_Louvre_in_Ruins_-_WGA19589.jpg', pos: '50% 50%',
          t: B('The Grande Galerie of the Louvre in Ruins', '폐허가 된 루브르 대회랑', '廃墟となったルーヴルの大回廊'),
          by: B('Hubert Robert', '위베르 로베르', 'ユベール・ロベール'), y: '1796' } },
      { cat: 'london', theme: B('Westminster on the Thames', '템스강의 웨스트민스터', 'テムズ河畔のウェストミンスター'),
        classic: { f: "Canaletto_-_Westminster_Bridge,_with_the_Lord_Mayor's_Procession_on_the_Thames_-_Google_Art_Project.jpg", pos: '50% 50%',
          t: B("Westminster Bridge, Lord Mayor's Day", '시장 취임일의 웨스트민스터 다리', '市長就任日のウェストミンスター橋'),
          by: B('Canaletto', '카날레토', 'カナレット'), y: '1747' },
        romantic: { f: 'Joseph_Mallord_William_Turner,_English_-_The_Burning_of_the_Houses_of_Lords_and_Commons,_October_16,_1834_-_Google_Art_Project.jpg', pos: '50% 50%',
          t: B('The Burning of the Houses of Lords and Commons', '불타는 영국 국회의사당', '国会議事堂の火災'),
          by: B('J. M. W. Turner', '윌리엄 터너', 'ウィリアム・ターナー'), y: '1835' } },
      { cat: 'dresden', theme: B('Dresden on the Elbe', '엘베강의 드레스덴', 'エルベ河畔のドレスデン'),
        classic: { f: 'Canaletto_-_Dresden_seen_from_the_Right_Bank_of_the_Elbe,_beneath_the_Augusts_Bridge_-_Google_Art_Project.jpg', pos: '50% 50%',
          t: B('Dresden from the Right Bank of the Elbe', '엘베강 오른쪽 기슭에서 본 드레스덴', 'エルベ右岸から見たドレスデン'),
          by: B('Bernardo Bellotto', '베르나르도 벨로토', 'ベルナルド・ベッロット'), y: '1748' },
        romantic: { f: 'Johan_Christian_Dahl_-_View_of_Dresden_by_Moonlight_-_Google_Art_Project.jpg', pos: '50% 50%',
          t: B('View of Dresden by Moonlight', '달빛 속의 드레스덴', '月明かりのドレスデン'),
          by: B('J. C. Dahl', '요한 크리스티안 달', 'ヨハン・クリスチャン・ダール'), y: '1839' } },
      { cat: 'harbour', theme: B('A harbour town', '항구 도시', '港町'),
        classic: { f: "Claude-Joseph_Verne_-_L'entrée_du_port_de_Marseille_(1754).jpg", pos: '50% 50%',
          t: B('The Entrance to the Port of Marseille', '마르세유 항구 입구', 'マルセイユ港の入口'),
          by: B('Claude-Joseph Vernet', '클로드 조제프 베르네', 'クロード＝ジョゼフ・ヴェルネ'), y: '1754' },
        romantic: { f: 'C._D._Friedrich_-_Greifswald_Harbour.jpg', pos: '50% 50%',
          t: B('Greifswald Harbour', '그라이프스발트 항구', 'グライフスヴァルトの港'),
          by: B('Caspar David Friedrich', '카스파르 다비트 프리드리히', 'カスパー・ダーヴィト・フリードリヒ'), y: B('c. 1820', '1820년경', '1820年頃') } },
      { cat: 'naples', theme: B('The Bay of Naples', '나폴리만', 'ナポリ湾'),
        classic: { f: 'Caspar_van_Wittel_-_View_of_Naples_-_WGA25833.jpg', pos: '50% 50%',
          t: B('View of Naples', '나폴리 풍경', 'ナポリの眺め'),
          by: B('Gaspar van Wittel', '가스파르 반 비텔', 'ガスパール・ファン・ウィッテル'), y: B('c. 1700', '1700년경', '1700年頃') },
        romantic: { f: 'Joseph_Wright_of_Derby_-_Vesuvius_in_Eruption,_with_a_View_over_the_Islands_in_the_Bay_of_Naples_-_Google_Art_Project.jpg', pos: '50% 50%',
          t: B('Vesuvius in Eruption over the Bay of Naples', '나폴리만 위로 분화하는 베수비오', 'ナポリ湾に噴火するヴェスヴィオ'),
          by: B('Joseph Wright of Derby', '조지프 라이트 오브 더비', 'ジョセフ・ライト・オブ・ダービー'), y: B('c. 1776', '1776년경', '1776年頃') } },
      { cat: 'bridge', theme: B('A bridge on the Thames', '템스강의 다리', 'テムズ川の橋'),
        classic: { f: 'Canaletto-waltonbridge.jpg', pos: '50% 50%',
          t: B('Old Walton Bridge', '월턴 다리', 'ウォルトン橋'),
          by: B('Canaletto', '카날레토', 'カナレット'), y: '1754' },
        romantic: { f: 'James Abbot McNeill Whistler 006.jpg', pos: '50% 50%',
          t: B('Nocturne: Blue and Gold – Old Battersea Bridge', '녹턴: 파랑과 금색 – 올드 배터시 다리', 'ノクターン：青と金―オールド・バタシー・ブリッジ'),
          by: B('James McNeill Whistler', '제임스 맥닐 휘슬러', 'ジェームズ・マクニール・ホイッスラー'), y: B('c. 1872–75', '1872~1875년경', '1872〜75年頃') } },
      { cat: 'church-out', theme: B('A Gothic church in the city', '도시의 고딕 성당', '街のゴシック聖堂'),
        classic: { f: 'Gerrit Berckheyde - The Market Place and the Grote Kerk at Haarlem.jpg', pos: '50% 50%',
          t: B('The Market Place and the Grote Kerk at Haarlem', '하를럼 광장과 성 바보 교회', 'ハールレムの広場と聖バーフ教会'),
          by: B('Gerrit Berckheyde', '헤릿 베르크헤이더', 'ヘリット・ベルクヘイデ'), y: '1674' },
        romantic: { f: 'Claude Monet - Rouen Cathedral Façade and Tour d\'Albane (Morning Effect) - Google Art Project.jpg', pos: '50% 50%',
          t: B('Rouen Cathedral, Morning Effect', '루앙 대성당, 아침', 'ルーアン大聖堂（朝）'),
          by: B('Claude Monet', '클로드 모네', 'クロード・モネ'), y: '1894' } },
      { cat: 'london', theme: B('London on the Thames', '템스강의 런던', 'テムズ河畔のロンドン'),
        classic: { f: 'Giovanni Antonio Canal, il Canaletto - London - the Thames and the City of London from the Terrace of Richmond House - WGA03988.jpg', pos: '50% 50%',
          t: B('The Thames and the City from Richmond House', '리치먼드 하우스에서 본 템스강과 런던', 'リッチモンド・ハウスから見たテムズとロンドン'),
          by: B('Canaletto', '카날레토', 'カナレット'), y: '1747' },
        romantic: { f: 'Claude Monet, The Houses of Parliament, Sunset, 1903, NGA 46523.jpg', pos: '50% 50%',
          t: B('The Houses of Parliament, Sunset', '국회의사당, 해 질 녘', '国会議事堂、日没'),
          by: B('Claude Monet', '클로드 모네', 'クロード・モネ'), y: '1903' } },
      { cat: 'venice', theme: B('San Giorgio Maggiore, Venice', '베네치아의 산 조르조 마조레', 'ヴェネツィアのサン・ジョルジョ・マッジョーレ'),
        classic: { f: 'Canaletto - San Giorgio Maggiore from the Bacino di San Marco.jpg', pos: '50% 50%',
          t: B('San Giorgio Maggiore from the Bacino', '바치노에서 본 산 조르조 마조레', 'バチーノから見たサン・ジョルジョ・マッジョーレ'),
          by: B('Canaletto', '카날레토', 'カナレット'), y: B('c. 1726', '1726년경', '1726年頃') },
        romantic: { f: 'Claude Monet, Saint-Georges majeur au crépuscule.jpg', pos: '50% 50%',
          t: B('San Giorgio Maggiore at Dusk', '해 질 녘의 산 조르조 마조레', '黄昏のサン・ジョルジョ・マッジョーレ'),
          by: B('Claude Monet', '클로드 모네', 'クロード・モネ'), y: B('1908–12', '1908~1912', '1908〜12') } },
      { cat: 'harbour', theme: B('The sun over the harbour', '항구의 해', '港の太陽'),
        classic: { f: 'Claude Lorrain - Seaport with the Embarkation of the Queen of Sheba - WGA05002.jpg', pos: '50% 50%',
          t: B('Seaport with the Embarkation of the Queen of Sheba', '시바 여왕이 배에 오르는 항구', 'シバの女王の船出'),
          by: B('Claude Lorrain', '클로드 로랭', 'クロード・ロラン'), y: '1648' },
        romantic: { f: 'Monet - Impression, Sunrise.jpg', pos: '50% 50%',
          t: B('Impression, Sunrise', '인상, 해돋이', '印象・日の出'),
          by: B('Claude Monet', '클로드 모네', 'クロード・モネ'), y: '1872' } },
      { cat: 'bridge', theme: B('A bridge in the landscape', '풍경 속의 다리', '風景の中の橋'),
        classic: { f: 'Le pont du Gard - Hubert Robert - Musée du Louvre Peintures INV 7650.jpg', pos: '50% 50%',
          t: B('The Pont du Gard', '퐁 뒤 가르', 'ポン・デュ・ガール'),
          by: B('Hubert Robert', '위베르 로베르', 'ユベール・ロベール'), y: '1787' },
        romantic: { f: 'Bridge over a Pond of Water Lilies MET DT1854.jpg', pos: '50% 50%',
          t: B('Bridge over a Pond of Water Lilies', '수련 연못 위의 다리', '睡蓮の池にかかる橋'),
          by: B('Claude Monet', '클로드 모네', 'クロード・モネ'), y: '1899' } },
      { cat: 'street', theme: B('A city boulevard', '도시의 큰길', '都会の大通り'),
        classic: { f: 'Bellotto Cracow Suburb as seen from the Cracow Gate.jpg', pos: '50% 50%',
          t: B('Krakowskie Przedmieście from the Cracow Gate', '크라쿠프 문에서 본 크라쿠프 교외 거리', 'クラクフ門から見たクラクフ郊外通り'),
          by: B('Bernardo Bellotto', '베르나르도 벨로토', 'ベルナルド・ベッロット'), y: '1768' },
        romantic: { f: 'Claude Monet - Boulevard des Capucines - Google Art Project.jpg', pos: '50% 50%',
          t: B('Boulevard des Capucines', '카퓌신 대로', 'キャピュシーヌ大通り'),
          by: B('Claude Monet', '클로드 모네', 'クロード・モネ'), y: '1873' } },
    ];
    // Figure paintings: the same subject painted with neoclassical calm (David, Ingres …)
    // vs romantic feeling (Delacroix, Géricault, Friedrich …). 10 pairs (5× the 2 figure questions). All Public Domain.
    const FIG = [
      { cat: 'napoleon', theme: B('Napoleon crossing the Alps', '알프스를 넘는 나폴레옹', 'アルプスを越えるナポレオン'),
        classic: { f: 'David_-_Napoleon_crossing_the_Alps_-_Malmaison2.jpg', pos: '50% 30%',
          t: B('Napoleon Crossing the Alps', '알프스를 넘는 나폴레옹', 'アルプス越えのナポレオン'),
          by: B('Jacques-Louis David', '자크 루이 다비드', 'ジャック＝ルイ・ダヴィッド'), y: '1801' },
        romantic: { f: 'Paul_Delaroche_-_Napoleon_Crossing_the_Alps_-_Google_Art_Project_2.jpg', pos: '50% 35%',
          t: B('Bonaparte Crossing the Alps', '알프스를 넘는 보나파르트', 'アルプスを越えるボナパルト'),
          by: B('Paul Delaroche', '폴 들라로슈', 'ポール・ドラローシュ'), y: '1850' } },
      { cat: 'napoleon', theme: B('Napoleon the emperor', '황제 나폴레옹', '皇帝ナポレオン'),
        classic: { f: 'Ingres,_Napoleon_on_his_Imperial_throne.jpg', pos: '50% 25%',
          t: B('Napoleon on his Imperial Throne', '옥좌의 나폴레옹 1세', '玉座のナポレオン1世'),
          by: B('Jean-Auguste-Dominique Ingres', '장 오귀스트 도미니크 앵그르', 'ドミニク・アングル'), y: '1806' },
        romantic: { f: 'Hippolyte Paul Delaroche (1797-1856) - Napoleon at Fontainebleau, 31 March 1814 - RCIN 405838 - Royal Collection.jpg', pos: '50% 40%',
          t: B('Napoleon at Fontainebleau, 31 March 1814', '퐁텐블로의 나폴레옹, 1814년 3월 31일', 'フォンテーヌブローのナポレオン'),
          by: B('Paul Delaroche', '폴 들라로슈', 'ポール・ドラローシュ'), y: '1845' } },
      { cat: 'last', theme: B('The last moment', '마지막 순간', '最期のとき'),
        classic: { f: 'David_-_The_Death_of_Socrates.jpg', pos: '45% 50%',
          t: B('The Death of Socrates', '소크라테스의 죽음', 'ソクラテスの死'),
          by: B('Jacques-Louis David', '자크 루이 다비드', 'ジャック＝ルイ・ダヴィッド'), y: '1787' },
        romantic: { f: 'PAUL_DELAROCHE_-_Ejecución_de_Lady_Jane_Grey_(National_Gallery_de_Londres,_1834).jpg', pos: '45% 50%',
          t: B('The Execution of Lady Jane Grey', '레이디 제인 그레이의 처형', 'レディ・ジェーン・グレイの処刑'),
          by: B('Paul Delaroche', '폴 들라로슈', 'ポール・ドラローシュ'), y: '1833' } },
      { cat: 'horse', theme: B('A horse', '말', '馬'),
        classic: { f: 'Whistlejacket_by_George_Stubbs_edit.jpg', pos: '50% 45%',
          t: B('Whistlejacket', '휘슬재킷', 'ホイッスルジャケット'),
          by: B('George Stubbs', '조지 스터브스', 'ジョージ・スタッブス'), y: B('c. 1762', '1762년경', '1762年頃') },
        romantic: { f: 'Jean Louis Théodore Géricault 011.jpg', pos: '50% 50%',
          t: B('A Horse Frightened by Lightning', '번개에 놀란 말', '稲妻に怯える馬'),
          by: B('Théodore Géricault', '테오도르 제리코', 'テオドール・ジェリコー'), y: B('c. 1814', '1814년경', '1814年頃') } },
      { cat: 'wanderer', theme: B('A traveller in the landscape', '풍경 속의 여행자', '風景の中の旅人'),
        classic: { f: 'Johann_Heinrich_Wilhelm_Tischbein_-_Goethe_in_the_Roman_Campagna_-_Google_Art_Project.jpg', pos: '45% 50%',
          t: B('Goethe in the Roman Campagna', '로마 평원의 괴테', 'ローマ近郊のゲーテ'),
          by: B('J. H. W. Tischbein', '요한 하인리히 빌헬름 티슈바인', 'ティシュバイン'), y: '1787' },
        romantic: { f: 'Caspar_David_Friedrich_-_Wanderer_above_the_Sea_of_Fog.jpeg', pos: '50% 35%',
          t: B('Wanderer above the Sea of Fog', '안개 바다 위의 방랑자', '雲海の上の旅人'),
          by: B('Caspar David Friedrich', '카스파르 다비트 프리드리히', 'カスパー・ダーヴィト・フリードリヒ'), y: B('c. 1818', '1818년경', '1818年頃') } },
      { cat: 'self', theme: B('A young painter’s self-portrait', '젊은 화가의 자화상', '若い画家の自画像'),
        classic: { f: 'Jean-Auguste-Dominique Ingres - Autoportrait à vingt-quatre ans - Google Art Project.jpg', pos: '50% 30%',
          t: B('Self-Portrait at Twenty-Four', '스물네 살의 자화상', '24歳の自画像'),
          by: B('Jean-Auguste-Dominique Ingres', '장 오귀스트 도미니크 앵그르', 'ドミニク・アングル'), y: '1804' },
        romantic: { f: 'Gustave Courbet - Le Désespéré (1843).jpg', pos: '50% 45%',
          t: B('The Desperate Man', '절망한 남자', '絶望した男'),
          by: B('Gustave Courbet', '귀스타브 쿠르베', 'ギュスターヴ・クールベ'), y: B('c. 1843', '1843년경', '1843年頃') } },
      { cat: 'lady', theme: B('Portrait of a young woman', '젊은 여인의 초상', '若い女性の肖像'),
        classic: { f: 'Jean_Auguste_Dominique_Ingres_-_Mademoiselle_Caroline_Rivière_-_WGA11837.jpg', pos: '50% 30%',
          t: B('Mademoiselle Caroline Rivière', '카롤린 리비에르 양', 'カロリーヌ・リヴィエール嬢'),
          by: B('Jean-Auguste-Dominique Ingres', '장 오귀스트 도미니크 앵그르', 'ドミニク・アングル'), y: '1806' },
        romantic: { f: 'Francisco de Goya y Lucientes - Doña Isabel de Porcel - WGA10050.jpg', pos: '50% 30%',
          t: B('Doña Isabel de Porcel', '도냐 이사벨 데 포르셀', 'イサベル・デ・ポルセル夫人'),
          by: B('Francisco de Goya', '프란시스코 고야', 'フランシスコ・デ・ゴヤ'), y: B('c. 1805', '1805년경', '1805年頃') } },
      { cat: 'resolve', theme: B('A call to arms', '함께 일어서는 순간', '立ち上がる瞬間'),
        classic: { f: 'Le_Serment_des_Horaces_-_Jacques-Louis_David_-_Musée_du_Louvre_Peintures_INV_3692_;_MR_1432.jpg', pos: '35% 50%',
          t: B('Oath of the Horatii', '호라티우스 형제의 맹세', 'ホラティウス兄弟の誓い'),
          by: B('Jacques-Louis David', '자크 루이 다비드', 'ジャック＝ルイ・ダヴィッド'), y: '1784' },
        romantic: { f: 'La_Liberté_guidant_le_peuple_-_Eugène_Delacroix_-_Musée_du_Louvre_Peintures_RF_129_-_après_restauration_2024.jpg', pos: '48% 25%',
          t: B('Liberty Leading the People', '민중을 이끄는 자유의 여신', '民衆を導く自由の女神'),
          by: B('Eugène Delacroix', '외젠 들라크루아', 'ウジェーヌ・ドラクロワ'), y: '1830' } },
      { cat: 'couple', theme: B('Two people', '두 사람', 'ふたり'),
        classic: { f: 'Thomas_Gainsborough_-_Mr_and_Mrs_Andrews.jpg', pos: '15% 50%',
          t: B('Mr and Mrs Andrews', '앤드루스 부부', 'アンドリューズ夫妻'),
          by: B('Thomas Gainsborough', '토머스 게인즈버러', 'トマス・ゲインズバラ'), y: B('c. 1750', '1750년경', '1750年頃') },
        romantic: { f: 'El_Beso_(Pinacoteca_de_Brera,_Milán,_1859).jpg', pos: '50% 35%',
          t: B('The Kiss', '입맞춤', '接吻'),
          by: B('Francesco Hayez', '프란체스코 아예즈', 'フランチェスコ・アイエツ'), y: '1859' } },
      { cat: 'musician', theme: B('Portrait of a musician', '음악가의 초상', '音楽家の肖像'),
        classic: { f: 'Joseph_Siffred_Duplessis_-_Christoph_Willibald_Gluck_-_Google_Art_Project.jpg', pos: '50% 30%',
          t: B('Christoph Willibald Gluck at the Spinet', '스피넷 앞의 글루크', 'スピネットを弾くグルック'),
          by: B('Joseph-Siffred Duplessis', '조제프 시프레드 뒤플레시', 'ジョゼフ＝シフレッド・デュプレシ'), y: '1775' },
        romantic: { f: 'Ferdinand-Victor-Eugène Delacroix - Paganini - Google Art Project.jpg', pos: '50% 35%',
          t: B('Paganini', '파가니니', 'パガニーニ'),
          by: B('Eugène Delacroix', '외젠 들라크루아', 'ウジェーヌ・ドラクロワ'), y: '1831' } },
      { cat: 'jesus', theme: B('Jesus Christ', '예수그리스도', 'イエス・キリスト'),
        classic: { f: 'Head_of_Christ_by_Rembrandt_(Philadelphia_panel).jpg', pos: '50% 35%',
          t: B('Head of Christ', '그리스도의 얼굴', 'キリストの頭部'),
          by: B('Rembrandt van Rijn', '렘브란트 판 레인', 'レンブラント・ファン・レイン'), y: '1648' },
        romantic: { f: 'Ary_Scheffer_-_Christus_Consolator_-_Google_Art_Project.jpg', pos: '50% 40%',
          t: B('Christus Consolator', '위로하는 그리스도', '慰めるキリスト'),
          by: B('Ary Scheffer', '아리 셰페르', 'アリ・シェフェール'), y: '1837' } },
      { cat: 'dance', theme: B('Dancing together', '함께 추는 춤', '輪になって踊る'),
        classic: { f: 'Nicolas Poussin - Dance to the Music of Time - WGA18303.jpg', pos: '50% 30%',
          t: B('A Dance to the Music of Time', '인생의 춤', '人生の踊り'),
          by: B('Nicolas Poussin', '니콜라 푸생', 'ニコラ・プッサン'), y: B('c. 1634–36', '1634~1636년경', '1634〜36年頃') },
        romantic: { f: 'Auguste Renoir - Dance at Le Moulin de la Galette - Google Art Project.jpg', pos: '50% 30%',
          t: B('Dance at Le Moulin de la Galette', '물랭 드 라 갈레트의 무도회', 'ムーラン・ド・ラ・ギャレットの舞踏会'),
          by: B('Pierre-Auguste Renoir', '피에르 오귀스트 르누아르', 'ピエール＝オーギュスト・ルノワール'), y: '1876' } },
      { cat: 'dance', theme: B('Dancing couples', '춤추는 연인', '踊る恋人たち'),
        classic: { f: 'Jean-Antoine Watteau - Fêtes Venitiennes - Google Art Project.jpg', pos: '50% 30%',
          t: B('Fêtes vénitiennes', '베네치아의 축제', 'ヴェネツィアの祝宴'),
          by: B('Antoine Watteau', '앙투안 바토', 'アントワーヌ・ヴァトー'), y: B('c. 1718–19', '1718~1719년경', '1718〜19年頃') },
        romantic: { f: 'Pierre-Auguste Renoir - Suzanne Valadon - Dance at Bougival.jpg', pos: '50% 30%',
          t: B('Dance at Bougival', '부지발의 무도회', 'ブージヴァルのダンス'),
          by: B('Pierre-Auguste Renoir', '피에르 오귀스트 르누아르', 'ピエール＝オーギュスト・ルノワール'), y: '1883' } },
      { cat: 'meal', theme: B('A meal outdoors', '야외의 식사', '野外の食事'),
        classic: { f: 'Troy - Un déjeuner de chasse (1737).jpg', pos: '50% 30%',
          t: B('A Hunt Breakfast', '사냥 중의 식사', '狩りの食事'),
          by: B('Jean-François de Troy', '장 프랑수아 드 트루아', 'ジャン＝フランソワ・ド・トロワ'), y: '1737' },
        romantic: { f: 'Pierre-Auguste Renoir - Luncheon of the Boating Party - Google Art Project.jpg', pos: '50% 30%',
          t: B('Luncheon of the Boating Party', '뱃놀이 일행의 점심', '舟遊びの昼食'),
          by: B('Pierre-Auguste Renoir', '피에르 오귀스트 르누아르', 'ピエール＝オーギュスト・ルノワール'), y: '1881' } },
      { cat: 'piano', theme: B('At the keyboard', '건반 앞에서', '鍵盤の前で'),
        classic: { f: 'Johannes Vermeer - Lady at the Virginal with a Gentleman, \'The Music Lesson\' - Google Art Project.jpg', pos: '50% 30%',
          t: B('The Music Lesson', '음악 수업', '音楽の稽古'),
          by: B('Johannes Vermeer', '요하네스 페르메이르', 'ヨハネス・フェルメール'), y: B('c. 1662–65', '1662~1665년경', '1662〜65年頃') },
        romantic: { f: 'Renoir - Young Girls at the Piano, 1892.jpg', pos: '50% 30%',
          t: B('Young Girls at the Piano', '피아노 치는 소녀들', 'ピアノに寄る少女たち'),
          by: B('Pierre-Auguste Renoir', '피에르 오귀스트 르누아르', 'ピエール＝オーギュスト・ルノワール'), y: '1892' } },
      { cat: 'swing', theme: B('On a swing', '그네', 'ぶらんこ'),
        classic: { f: 'Joean Honoré Fragonard - The Swing.jpg', pos: '50% 30%',
          t: B('The Swing', '그네', 'ぶらんこ'),
          by: B('Jean-Honoré Fragonard', '장 오노레 프라고나르', 'ジャン・オノレ・フラゴナール'), y: '1767' },
        romantic: { f: 'Auguste Renoir - The Swing - Google Art Project.jpg', pos: '50% 30%',
          t: B('The Swing', '그네', 'ぶらんこ'),
          by: B('Pierre-Auguste Renoir', '피에르 오귀스트 르누아르', 'ピエール＝オーギュスト・ルノワール'), y: '1876' } },
      { cat: 'child', theme: B('Portrait of a little girl', '어린 소녀의 초상', '少女の肖像'),
        classic: { f: 'The Age of Innocence - Reynolds.jpg', pos: '50% 30%',
          t: B('The Age of Innocence', '순수의 시대', '無垢の時代'),
          by: B('Joshua Reynolds', '조슈아 레이놀즈', 'ジョシュア・レノルズ'), y: '1788' },
        romantic: { f: 'Pierre-Auguste Renoir - Irène Cahen d\'Anvers (La Petite Irène) - 90 - Foundation E.G. Bührle Collection.jpg', pos: '50% 30%',
          t: B('Mademoiselle Irène Cahen d\'Anvers', '이렌 캉 당베르 양', 'イレーヌ・カーン・ダンヴェール嬢'),
          by: B('Pierre-Auguste Renoir', '피에르 오귀스트 르누아르', 'ピエール＝オーギュスト・ルノワール'), y: '1880' } },
      { cat: 'sisters', theme: B('Two sisters', '두 자매', 'ふたりの姉妹'),
        classic: { f: 'Gainsborough - The Painters Daughters Chasing a Butterfly.jpg', pos: '50% 30%',
          t: B('The Painter\'s Daughters Chasing a Butterfly', '나비를 쫓는 화가의 딸들', '蝶を追う画家の娘たち'),
          by: B('Thomas Gainsborough', '토머스 게인즈버러', 'トマス・ゲインズバラ'), y: B('c. 1756', '1756년경', '1756年頃') },
        romantic: { f: 'Pierre-Auguste Renoir - Two Sisters (On the Terrace) - Google Art Project.jpg', pos: '50% 30%',
          t: B('Two Sisters (On the Terrace)', '두 자매(테라스에서)', '二人の姉妹（テラスにて）'),
          by: B('Pierre-Auguste Renoir', '피에르 오귀스트 르누아르', 'ピエール＝オーギュスト・ルノワール'), y: '1881' } },
      { cat: 'mother', theme: B('A mother and her children', '어머니와 아이들', '母と子どもたち'),
        classic: { f: 'Louise Elisabeth Vigée-Lebrun - Marie-Antoinette de Lorraine-Habsbourg, reine de France et ses enfants - Google Art Project.jpg', pos: '50% 30%',
          t: B('Marie Antoinette and Her Children', '마리 앙투아네트와 아이들', 'マリー・アントワネットと子どもたち'),
          by: B('Élisabeth Vigée Le Brun', '엘리자베트 비제 르브룅', 'エリザベート・ヴィジェ＝ル・ブラン'), y: '1787' },
        romantic: { f: 'Renoir - Madame Georges Charpentier et ses enfants.jpg', pos: '50% 30%',
          t: B('Madame Georges Charpentier and Her Children', '샤르팡티에 부인과 아이들', 'シャルパンティエ夫人と子どもたち'),
          by: B('Pierre-Auguste Renoir', '피에르 오귀스트 르누아르', 'ピエール＝オーギュスト・ルノワール'), y: '1878' } },
      { cat: 'reading', theme: B('A woman reading', '책 읽는 여인', '本を読む女性'),
        classic: { f: 'Jean Honoré Fragonard, Young Girl Reading, c. 1769, NGA 46303.jpg', pos: '50% 30%',
          t: B('Young Girl Reading', '책 읽는 소녀', '読書する娘'),
          by: B('Jean-Honoré Fragonard', '장 오노레 프라고나르', 'ジャン・オノレ・フラゴナール'), y: B('c. 1769', '1769년경', '1769年頃') },
        romantic: { f: 'Auguste Renoir La Liseuse.jpg', pos: '50% 30%',
          t: B('The Reader', '책 읽는 여인', '読書する女'),
          by: B('Pierre-Auguste Renoir', '피에르 오귀스트 르누아르', 'ピエール＝オーギュスト・ルノワール'), y: B('c. 1874–76', '1874~1876년경', '1874〜76年頃') } },
      { cat: 'salon', theme: B('A lady of Paris', '파리 사교계의 여인', 'パリ社交界の女性'),
        classic: { f: 'Madame Récamier, née Julie (dite Juliette) Bernard - Jacques-Louis David - Musée duLouvre Peintures INV 3708.jpg', pos: '50% 30%',
          t: B('Madame Récamier', '레카미에 부인', 'レカミエ夫人'),
          by: B('Jacques-Louis David', '자크 루이 다비드', 'ジャック＝ルイ・ダヴィッド'), y: '1800' },
        romantic: { f: 'Pierre-Auguste Renoir 096.jpg', pos: '50% 30%',
          t: B('Portrait of Jeanne Samary', '잔 사마리의 초상', 'ジャンヌ・サマリーの肖像'),
          by: B('Pierre-Auguste Renoir', '피에르 오귀스트 르누아르', 'ピエール＝オーギュスト・ルノワール'), y: '1877' } },
      { cat: 'stroll', theme: B('A woman in the open air', '바람 부는 들판의 여인', '野に立つ女性'),
        classic: { f: 'Thomas Gainsborough, Mrs. Richard Brinsley Sheridan, 1785-1787, NGA 99.jpg', pos: '50% 30%',
          t: B('Mrs. Richard Brinsley Sheridan', '셰리든 부인', 'シェリダン夫人'),
          by: B('Thomas Gainsborough', '토머스 게인즈버러', 'トマス・ゲインズバラ'), y: B('1785–87', '1785~1787', '1785〜87') },
        romantic: { f: 'Claude Monet - Woman with a Parasol - Madame Monet and Her Son - Google Art Project.jpg', pos: '50% 30%',
          t: B('Woman with a Parasol', '양산을 든 여인', '日傘をさす女'),
          by: B('Claude Monet', '클로드 모네', 'クロード・モネ'), y: '1875' } },
      { cat: 'stroll', theme: B('A walk in the garden', '정원 산책', '庭の散歩'),
        classic: { f: 'Thomas Gainsborough - Mr and Mrs William Hallett (\'The Morning Walk\') - WGA8418.jpg', pos: '50% 30%',
          t: B('The Morning Walk', '아침 산책', '朝の散歩'),
          by: B('Thomas Gainsborough', '토머스 게인즈버러', 'トマス・ゲインズバラ'), y: '1785' },
        romantic: { f: 'Claude Monet 024.jpg', pos: '50% 30%',
          t: B('Women in the Garden', '정원의 여인들', '庭の女たち'),
          by: B('Claude Monet', '클로드 모네', 'クロード・モネ'), y: '1866' } },
      { cat: 'lady', theme: B('A lady in a silk dress', '비단 드레스의 여인', '絹のドレスの女性'),
        classic: { f: 'Jean-Auguste-Dominique Ingres - Comtesse d\'Haussonville - Google Art Project.jpg', pos: '50% 30%',
          t: B('Comtesse d\'Haussonville', '오송빌 백작부인', 'ドーソンヴィル伯爵夫人'),
          by: B('Jean-Auguste-Dominique Ingres', '장 오귀스트 도미니크 앵그르', 'ドミニク・アングル'), y: '1845' },
        romantic: { f: 'Claude Monet - Camille.JPG', pos: '50% 30%',
          t: B('Camille (The Woman in the Green Dress)', '카미유(초록 드레스의 여인)', 'カミーユ（緑衣の女）'),
          by: B('Claude Monet', '클로드 모네', 'クロード・モネ'), y: '1866' } },
      { cat: 'dress', theme: B('A woman in splendid dress', '화려한 옷의 여인', '華やかな装いの女性'),
        classic: { f: 'François Boucher - Portrait of Marquise de Pompadour - WGA2911.jpg', pos: '50% 30%',
          t: B('Madame de Pompadour', '퐁파두르 부인', 'ポンパドゥール夫人'),
          by: B('François Boucher', '프랑수아 부셰', 'フランソワ・ブーシェ'), y: '1756' },
        romantic: { f: 'Claude Monet-Madame Monet en costume japonais.jpg', pos: '50% 30%',
          t: B('La Japonaise', '일본 옷을 입은 카미유', 'ラ・ジャポネーズ'),
          by: B('Claude Monet', '클로드 모네', 'クロード・モネ'), y: '1876' } },
    ];
    ARCH.forEach(P => { P.kind = 'arch'; }); FIG.forEach(P => { P.kind = 'fig'; });
    const Q1_PER = 1;   // questions per kind: 1 building + 1 figure, PC and phones alike (PC was 2 + 2 until 2026-10-19)
    const Q1_N = Q1_PER * 2;
    const AL = a => Array.isArray(a) ? a[lang === 'ja' ? 2 : lang === 'ko' ? 1 : 0] : a;   // [en, ko, ja] → current language
    let q1 = [], pairDirty = true, q1Votes = [], q1Idx = 0, q1Lock = false;
    // Q1 alone only gives a first lean; the final style also counts the six Q2 picks (see finalEra)
    function q1Era() {
      if (!q1Votes.length) return null;
      const c = q1Votes.filter(e => e === 'classic').length, r = q1Votes.length - c;
      if (c === r) return q1Votes[q1Votes.length - 1];   // 2 : 2 → the latest pick breaks the tie
      return c > r ? 'classic' : 'romantic';
    }
    function dealQ1() {
      // per kind, one pair per subject group (so two church-interior or two Napoleon pairs never meet in one visit);
      // then building and figure questions alternate, starting with either kind
      const dealKind = POOL => {
        const byCat = {}; POOL.forEach(P => (byCat[P.cat] = byCat[P.cat] || []).push(P));
        return sample(Object.keys(byCat), Q1_PER).map(c => sample(byCat[c], 1)[0]);
      };
      const a = dealKind(ARCH), f = dealKind(FIG), [x, y] = Math.random() < 0.5 ? [a, f] : [f, a], order = [];
      for (let i = 0; i < Q1_PER; i++) order.push(x[i], y[i]);
      q1 = order.map(P => sample([{ era: 'classic', d: P.classic, theme: P.theme, kind: P.kind }, { era: 'romantic', d: P.romantic, theme: P.theme, kind: P.kind }], 2));
      q1Votes = []; q1Idx = 0; q1Lock = false;
      pairDirty = true;
    }
    // Phones get 500px copies (about a quarter of the bytes of 960px); big screens keep 960px
    const Q1W = () => (Math.min(screen.width || innerWidth, innerWidth) < 700 ? 500 : 960);
    // Fetch the pictures of the later Q1 pairs in the background, so each next pair appears at once
    function prefetchQ1() {
      const urls = (q1[q1Idx + 1] || []).map(c => THUMB(c.d.f, Q1W()));
      const go = () => urls.forEach(u => { const im = new Image(); im.referrerPolicy = 'no-referrer'; im.decoding = 'async'; im.src = u; });
      (window.requestIdleCallback || (f => setTimeout(f, 600)))(go);
    }
    function buildPair() {
      pair.innerHTML = ''; cards = [];
      (q1[q1Idx] || []).forEach((c, i) => {
        const d = c.d, card = document.createElement('article');
        card.className = 'card h-[46vh] min-h-[280px] max-h-[460px] sm:max-h-none sm:h-[540px] lg:h-[640px]';
        card.tabIndex = 0; card.setAttribute('role', 'button'); card.setAttribute('aria-pressed', 'false');
        const tone = 'text-amber-100/70';
        card.innerHTML = '<div class="media bg-a"><img class="photo" alt="" loading="eager" referrerpolicy="no-referrer" /></div>'
          + '<div class="veil"></div><div class="spot"></div>'
          + '<span class="absolute top-3 left-3 sm:top-8 sm:left-8 w-7 h-7 sm:w-9 sm:h-9 ab-badge text-xs sm:text-sm">' + 'AB'[i] + '</span>'
          + '<div class="absolute inset-x-0 bottom-0 p-3.5 sm:p-7 lg:p-10"><h2 class="font-serif text-[1.15rem] sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight"></h2>'
          + '<p class="mt-1.5 sm:mt-3 font-serif italic text-[11px] sm:text-base lg:text-lg ' + tone + '"></p>'
          + '<div class="cta mt-6 hidden sm:inline-flex items-center gap-2 text-sm font-medium text-amber-100"><span></span>'
          + '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></div></div>';
        const img = card.querySelector('img.photo');
        img.style.objectPosition = d.pos || '50% 50%';
        img.addEventListener('imgfail', () => { img.style.visibility = 'hidden'; });
        img.fetchPriority = 'high';
        setImgSrc(img, d.f, Q1W());
        card.querySelector('.media').style.setProperty('--bg', 'url("' + THUMB(d.f, Q1W()) + '")');   // blurred copy fills the gaps around the whole painting (phones)
        pair.appendChild(card); cards.push(card);
      });
      pairDirty = false;
      prefetchQ1();
    }
    function renderPair() {
      if (!q1.length) dealQ1();
      if (pairDirty) buildPair();
      const t = I18N[lang], cur = q1[q1Idx] || [], names = [];
      cards.forEach((card, i) => {
        const d = cur[i].d, title = AL(d.t), by = AL(d.by), y = AL(d.y);
        card.querySelector('img.photo').alt = by + ', ' + title + ' (' + y + ')';
        card.querySelector('h2').textContent = title;
        card.querySelector('h2 + p').textContent = by + ' · ' + y;
        card.querySelector('.cta span').textContent = t.cta;
        card.setAttribute('aria-label', 'AB'[i] + ': ' + title + ', ' + by);
        names.push(by + ' (' + y + ')');
      });
      const st = document.getElementById('q1-step');
      if (st && cur[0]) st.textContent = (t.q1Step || '{n} / {t}').replace('{n}', q1Idx + 1).replace('{t}', Q1_N).replace('{theme}', AL(cur[0].theme))
        .replace('{kind}', cur[0].kind === 'fig' ? t.q1KindFig : t.q1KindArch);
      document.getElementById('footer-art').textContent = t.artTpl
        .replace('{a}', names[0] || '').replace('{b}', names[1] || '');
      document.getElementById('pair-swap').textContent = '↻ ' + t.pairSwap;
    }
    // A pick in Q1: record the vote, then the next pair; after the third pair, on to Q2.
    // Once Q1 is done, tapping the other card of the last pair just changes that vote (Q2 picks are kept).
    function q1Choose(card) {
      if (q1Lock) return;
      const i = cards.indexOf(card), c = (q1[q1Idx] || [])[i];
      if (!c) return;
      const mark = () => cards.forEach(x => { const on = x === card; x.classList.toggle('picked', on); x.setAttribute('aria-pressed', on); });
      if (q1Votes.length >= Q1_N) {
        q1Votes[Q1_N - 1] = c.era; mark();
        if (ready()) syncResult(); else currentEra = q1Era();
        return;
      }
      q1Votes.push(c.era); mark();
      if (q1Votes.length === 1) track('test_start');
      track('q1_answer', { q_no: q1Votes.length, q_total: Q1_N, era: c.era });
      pair.classList.add('has-pick');
      updateProgress();
      q1Lock = true;
      setTimeout(() => {
        if (q1Votes.length < Q1_N) {
          pair.classList.add('swapping');
          setTimeout(() => { q1Idx++; pairDirty = true; renderPair(); pair.classList.remove('has-pick', 'swapping'); q1Lock = false; }, 240);
        } else { q1Lock = false; pick(q1Era(), card); }
      }, 380);
    }
    function balanceAll() { preloaded.clear(); Object.keys(roundsCache).forEach(k => delete roundsCache[k]); }
    function redeal() { balanceAll(); dealQ1(); renderPair(); }
    const pairSwapBtn = document.getElementById('pair-swap');
    pairSwapBtn.addEventListener('click', () => {
      if (currentEra) reset(true);
      pair.classList.add('swapping');
      setTimeout(() => { redeal(); pair.classList.remove('swapping'); }, 260);
    });


    // ---------- Share: taste URL + friends ----------
    const KAKAO_JS_KEY = '';   // ← paste your Kakao JavaScript key here to send rich KakaoTalk cards
    const baseUrl = () => location.href.split('#')[0].split('?')[0];
    // shared links go through /s, where the site worker writes a link preview for the shared type
    const shareBase = () => /^https?:$/.test(location.protocol) && !/^(localhost|127\.)/.test(location.hostname) ? location.origin + '/s' : baseUrl();
    function tasteUrl() {
      const q = new URLSearchParams();
      q.set('e', currentEra); q.set('p', [...picks].join(',')); q.set('a', q1Votes.map(e => e[0]).join('')); q.set('lang', lang);
      { const sel = selected(); if (sel.length) q.set('t', dominantMood(sel)); }
      return shareBase() + '?' + q.toString();
    }
    function tasteSummary() {
      const sel = selected(); if (!sel.length) return { era: '', type: '' };
      const ek = eraOf(sel), T = TYPES[dominantMood(sel)];
      return { era: ERAS[ek].en, type: isLocal() ? T[1] : T[0], ek, sel };
    }
    // Short links: /s?… is stored by the site worker as /s/<code>; the long link is used until the short one is ready
    const shortCache = {};
    function shorten(url) {
      if (shortCache[url]) return shortCache[url];
      const i = url.indexOf('/s?');
      if (i < 0) return Promise.resolve(url);
      shortCache[url] = fetch('/api/short', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ q: url.slice(i + 3) }) })
        .then(r => r.ok ? r.json() : null).then(d => (d && d.url) ? (shortCache[url + '#short'] = d.url) : url).catch(() => url);
      return shortCache[url];
    }
    const shortNow = url => shortCache[url + '#short'] || url;
    function syncShare() {
      const box = document.getElementById('share-url');
      if (!box) return;
      if (!ready()) { box.value = ''; return; }
      const url = tasteUrl();
      box.value = shortNow(url);
      shorten(url).then(su => { if (box.value === url) box.value = su; });
      try { history.replaceState(null, '', location.pathname + url.slice(url.indexOf('?'))); } catch (e) {}
    }
    // every share action answers with a message that floats at the bottom of the screen, wherever the button was
    function toast(msg, good) {
      const el = document.getElementById('sh-toast');
      if (el) { el.textContent = msg; el.classList.add('on'); }
      const ft = document.getElementById('yc-toast');
      if (ft) {
        ft.innerHTML = ''; ft.classList.toggle('good', !!good);
        if (good) { const c = document.createElement('span'); c.className = 'yc-check'; c.textContent = '✓'; ft.appendChild(c); }
        const m = document.createElement('span'); m.textContent = msg; ft.appendChild(m);
        ft.classList.remove('on'); void ft.offsetWidth; ft.classList.add('on');
      }
      clearTimeout(toast._t); toast._t = setTimeout(() => { if (el) el.classList.remove('on'); if (ft) ft.classList.remove('on'); }, 3400);
    }
    // copy that works even where the clipboard API is blocked (in-app browsers, http)
    function copySync(text) {
      try {
        const ta = document.createElement('textarea'); ta.value = text; ta.setAttribute('readonly', '');
        ta.style.cssText = 'position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;'; document.body.appendChild(ta);
        const prev = document.activeElement;
        ta.focus(); ta.select(); ta.setSelectionRange(0, text.length);
        const ok = document.execCommand('copy'); ta.remove(); try { prev && prev.focus && prev.focus({ preventScroll: true }); } catch (e) {}
        return !!ok;
      } catch (e) { return false; }
    }
    // the clipboard API can wait forever (permission prompt, window not focused), so it gets 1.2 seconds at most
    async function copyText(text) {
      if (copySync(text)) return true;
      if (!navigator.clipboard) return false;
      return Promise.race([navigator.clipboard.writeText(text).then(() => true, () => false), new Promise(r => setTimeout(() => r(false), 1200))]);
    }
    // the pressed button itself says it worked, for a moment
    function flashBtn(btn, msg) {
      if (!btn) return;
      let tag = btn.querySelector('.btn-done');
      if (!tag) { tag = document.createElement('span'); tag.className = 'btn-done'; btn.appendChild(tag); }
      tag.textContent = '✓ ' + msg; btn.classList.add('is-done');
      clearTimeout(btn._flash); btn._flash = setTimeout(() => btn.classList.remove('is-done'), 2600);
    }
    document.addEventListener('click', e => {
      const b = e.target.closest && e.target.closest('.sh-btn, .btn-match, #sh-copy, #story-top, .fb-btn');
      if (!b) return;
      b.classList.remove('tap-pop'); void b.offsetWidth; b.classList.add('tap-pop');
    }, true);
    async function copyLink() {
      const url = shortNow(tasteUrl());
      copyLink.ok = await copyText(url);
      if (!copyLink.ok) { const b = document.getElementById('share-url'); if (b) { b.focus(); b.select(); } }
      return url;
    }
    function shareText() { const s = tasteSummary(); return I18N[lang].shareText.replace('{era}', s.era).replace('{type}', s.type); }
    function loadKakao() {
      if (!KAKAO_JS_KEY) return Promise.resolve(false);
      if (window.Kakao && window.Kakao.isInitialized && window.Kakao.isInitialized()) return Promise.resolve(true);
      return new Promise(res => {
        const sc = document.createElement('script');
        sc.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js';
        sc.onload = () => { try { window.Kakao.init(KAKAO_JS_KEY); res(true); } catch (e) { res(false); } };
        sc.onerror = () => res(false);
        document.head.appendChild(sc);
      });
    }
    // Instagram has no web share link, so we draw the taste card as an image to post
    function loadCors(src) {
      return new Promise(res => { const im = new Image(); im.crossOrigin = 'anonymous'; im.onload = () => res(im); im.onerror = () => res(null); im.src = src; });
    }

    // Direct Wikimedia file URLs (upload.wikimedia.org sends CORS headers; the Special:FilePath redirect does not)
    function md5(str) {
      const k = [], r = [7,12,17,22,7,12,17,22,7,12,17,22,7,12,17,22,5,9,14,20,5,9,14,20,5,9,14,20,5,9,14,20,4,11,16,23,4,11,16,23,4,11,16,23,4,11,16,23,6,10,15,21,6,10,15,21,6,10,15,21,6,10,15,21];
      for (let i = 0; i < 64; i++) k[i] = Math.floor(Math.abs(Math.sin(i + 1)) * 4294967296) | 0;
      const bytes = Array.from(new TextEncoder().encode(str)), bl = bytes.length * 8;
      bytes.push(0x80); while (bytes.length % 64 !== 56) bytes.push(0);
      for (let i = 0; i < 8; i++) bytes.push(i < 4 ? (bl >>> (8 * i)) & 255 : 0);
      let a0 = 0x67452301, b0 = 0xefcdab89 | 0, c0 = 0x98badcfe | 0, d0 = 0x10325476;
      for (let o = 0; o < bytes.length; o += 64) {
        const m = []; for (let i = 0; i < 16; i++) m[i] = bytes[o + i * 4] | (bytes[o + i * 4 + 1] << 8) | (bytes[o + i * 4 + 2] << 16) | (bytes[o + i * 4 + 3] << 24);
        let a = a0, b = b0, c = c0, d = d0;
        for (let i = 0; i < 64; i++) {
          let f, g;
          if (i < 16) { f = (b & c) | (~b & d); g = i; } else if (i < 32) { f = (d & b) | (~d & c); g = (5 * i + 1) % 16; }
          else if (i < 48) { f = b ^ c ^ d; g = (3 * i + 5) % 16; } else { f = c ^ (b | ~d); g = (7 * i) % 16; }
          const tmp = d; d = c; c = b;
          const x = (a + f + k[i] + m[g]) | 0; b = (b + ((x << r[i]) | (x >>> (32 - r[i])))) | 0; a = tmp;
        }
        a0 = (a0 + a) | 0; b0 = (b0 + b) | 0; c0 = (c0 + c) | 0; d0 = (d0 + d) | 0;
      }
      return [a0, b0, c0, d0].map(v => { let h = ''; for (let i = 0; i < 4; i++) h += ((v >>> (8 * i)) & 255).toString(16).padStart(2, '0'); return h; }).join('');
    }
    function uploadUrls(f, w) {
      const name = f.replace(/ /g, '_'), h = md5(name), base = 'https://upload.wikimedia.org/wikipedia/commons/' + h[0] + '/' + h.slice(0, 2) + '/';
      const enc = encodeURIComponent(name);
      return [THUMB(f, w), base.replace('/commons/', '/commons/thumb/') + enc + '/' + w + 'px-' + enc, base + enc];
    }
    async function loadPainting(f) {
      for (const u of uploadUrls(f, 960)) { const im = await loadCors(u); if (im) return im; }
      return null;
    }
    // Instagram: three pages that tell the story — what I picked, what it says about me, what I should listen to
    const SITE = 'yummyclassic.co.kr';
    function wrapLines(g, text, maxW, maxLines) {
      const words = /[぀-ヿ一-鿿]/.test(text) && !/\s/.test(text) ? [...text] : text.split(/(\s+)/);
      const lines = []; let cur = '';
      words.forEach(w => {
        const test = cur + w;
        if (g.measureText(test).width > maxW && cur.trim()) { lines.push(cur.trim()); cur = w.trimStart(); } else cur = test;
      });
      if (cur.trim()) lines.push(cur.trim());
      if (lines.length > maxLines) { lines.length = maxLines; lines[maxLines - 1] = lines[maxLines - 1].replace(/.{1}$/, '…'); }
      return lines;
    }
    function rr(g, x, y, w, h, r) { g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); }
    function drawCover(g, im, x, y, w, h) {
      g.save(); rr(g, x, y, w, h, 10); g.clip();
      g.fillStyle = '#3B0A14'; g.fillRect(x, y, w, h);
      if (im) {
        const r = Math.max(w / im.width, h / im.height), iw = im.width * r, ih = im.height * r;
        try { g.drawImage(im, x + (w - iw) / 2, y + (h - ih) / 2, iw, ih); } catch (e) {}
      }
      g.restore();
    }
    async function tasteImages() {
      try { await document.fonts.ready; } catch (e) {}
      const S = tasteSummary(), sel = S.sel, t = I18N[lang], L = isLocal();
      const E = ERAS[S.ek], mood = dominantMood(sel), T = TYPES[mood];
      const serif = (lang === 'ja' ? '"Noto Serif JP"' : lang === 'en' ? '"Noto Serif", "Noto Serif KR"' : '"Noto Serif KR"') + ', "Playfair Display", Georgia, serif';
      const sans = (lang === 'ja' ? '"Noto Sans JP"' : '"Pretendard Variable", Pretendard') + ', Inter, sans-serif';
      const W = 1080, H = 1350, PAD = 56, IN = 110;
      const imgs = await Promise.all(sel.slice(0, 4).map(x => loadPainting(x.f)));
      const frame = (g, n) => {
        g.fillStyle = '#7A0F2A'; g.fillRect(0, 0, W, H);
        g.fillStyle = '#F4E9D0'; rr(g, PAD, PAD, W - PAD * 2, H - PAD * 2, 18); g.fill();
        g.fillStyle = E.c; g.fillRect(PAD + 18, PAD, W - PAD * 2 - 36, 10);
        g.textBaseline = 'alphabetic';
        { // LP-plate + fork mark (viewBox -10..250) at 60px
          const k = 60 / 260; g.save(); g.translate(IN - 6 + 10 * k, 106 + 10 * k); g.scale(k, k);
          g.fillStyle = '#2A1A1E'; g.beginPath(); g.arc(120, 120, 110, 0, Math.PI * 2); g.fill();
          g.strokeStyle = 'rgba(244,233,208,.5)'; g.lineWidth = 3; g.beginPath(); g.arc(120, 120, 97, 0, Math.PI * 2); g.stroke();
          g.fillStyle = '#F4E9D0'; g.beginPath(); g.arc(120, 120, 34, 0, Math.PI * 2); g.fill();
          g.fillStyle = '#2A1A1E'; g.beginPath(); g.arc(120, 120, 5, 0, Math.PI * 2); g.fill();
          g.translate(120, 120); g.rotate(-135 * Math.PI / 180); g.scale(.62, .62); g.translate(-48, 10); g.fillStyle = '#E8753D';
          [[22, 6], [43.5, 6], [65, 6]].forEach(([x, y]) => { rr(g, x, y, 9, 62, 4.5); g.fill(); });
          g.fill(new Path2D('M22 60 H74 C 74 88, 60 98, 53 102 V 196 H 43 V 102 C 36 98, 22 88, 22 60 Z'));
          g.beginPath(); g.ellipse(32, 208, 22, 16, -22 * Math.PI / 180, 0, Math.PI * 2); g.fill(); g.restore();
        }
        g.fillStyle = '#7A0F2A'; g.font = '400 36px "DM Serif Display", "Playfair Display", Georgia, serif'; g.textAlign = 'left'; g.fillText('Yummy Classic', IN + 70, 146);
        if (t.logoSub) { g.fillStyle = '#C95C26'; g.font = '700 15px ' + sans; g.fillText(t.logoSub.split('').join(String.fromCharCode(8202)), IN + 71, 170); }
        g.textAlign = 'right'; g.font = '700 30px Inter, sans-serif'; g.fillStyle = '#C95C26'; g.fillText(n + ' / 3', W - IN, 150);
        for (let i = 0; i < 3; i++) { g.fillStyle = i + 1 === n ? '#C95C26' : 'rgba(122,15,42,.25)'; rr(g, W / 2 - 54 + i * 40, H - PAD - 46, 28, 8, 4); g.fill(); }
        g.textAlign = 'left';
      };
      const pages = [];
      // 1 / 3 — what I picked
      { const c = document.createElement('canvas'); c.width = W; c.height = H; const g = c.getContext('2d'); frame(g, 1);
        g.fillStyle = '#C95C26'; g.font = '700 26px Inter, sans-serif'; g.fillText(t.ig1Kicker, IN, 235);
        g.fillStyle = '#4D0A1A'; g.font = '700 62px ' + serif; wrapLines(g, t.ig1Title, W - IN * 2, 2).forEach((l, i) => g.fillText(l, IN, 315 + i * 76));
        const n = Math.min(sel.length, 4), top = 400, area = { x: IN, y: top, w: W - IN * 2, h: 720 };
        const cells = n === 2 ? [[0, 0, .5, 1], [.5, 0, .5, 1]] : n === 3 ? [[0, 0, .58, 1], [.58, 0, .42, .5], [.58, .5, .42, .5]] : [[0, 0, .5, .5], [.5, 0, .5, .5], [0, .5, .5, .5], [.5, .5, .5, .5]];
        cells.slice(0, n).forEach((cl, i) => {
          const gap = 12, x = area.x + cl[0] * area.w + (cl[0] ? gap / 2 : 0), y = area.y + cl[1] * area.h + (cl[1] ? gap / 2 : 0);
          const w = cl[2] * area.w - (cl[0] || cl[0] + cl[2] < 1 ? gap / 2 : 0), h = cl[3] * area.h - (cl[1] || cl[1] + cl[3] < 1 ? gap / 2 : 0);
          drawCover(g, imgs[i], x, y, w, h);
          const grd = g.createLinearGradient(0, y + h - 120, 0, y + h); grd.addColorStop(0, 'rgba(42,8,16,0)'); grd.addColorStop(1, 'rgba(42,8,16,.85)');
          g.save(); rr(g, x, y, w, h, 10); g.clip(); g.fillStyle = grd; g.fillRect(x, y + h - 120, w, 120); g.restore();
          g.fillStyle = '#F4E9D0'; g.font = '700 28px ' + serif;
          const ttl = wrapLines(g, L ? sel[i].ko : sel[i].en, w - 36, 1)[0] || '';
          g.fillText(ttl, x + 18, y + h - 22);
        });
        if (sel.length > 4) { g.fillStyle = 'rgba(42,26,30,.7)'; g.font = '500 24px ' + sans; g.fillText(t.more.replace('{n}', sel.length - 4).trim(), IN, area.y + area.h + 40); }
        g.fillStyle = '#7A0F2A'; g.font = '700 36px ' + sans; g.fillText(t.ig1Tease, IN, 1200);
        pages.push(c); }
      // 2 / 3 — what it says about me
      { const c = document.createElement('canvas'); c.width = W; c.height = H; const g = c.getContext('2d'); frame(g, 2);
        g.fillStyle = 'rgba(42,26,30,.7)'; g.font = '600 30px ' + sans; g.fillText(t.ig2Kicker, IN, 250);
        g.fillStyle = E.text; g.font = '800 120px "Playfair Display", serif'; g.fillText(E.en, IN - 6, 375);
        g.fillStyle = E.text; g.font = '500 30px ' + sans; g.fillText(L ? E.ko : ERA_EN[S.ek], IN, 425);
        g.fillStyle = '#4D0A1A'; g.font = '700 58px ' + serif; wrapLines(g, L ? T[1] : T[0], W - IN * 2, 2).forEach((l, i) => g.fillText(l, IN, 525 + i * 70));
        const EG = engPrep(currentEra), agg = {};
        sel.forEach(x => { const P = EG.pv[x.id]; if (P) Object.entries(P.v).forEach(([tg, v]) => { agg[tg] = (agg[tg] || 0) + v; }); });
        let cx = IN; const ty = 640;
        Object.entries(agg).sort((a, b) => b[1] - a[1]).slice(0, 3).forEach(([tg]) => {
          const lb = '# ' + tagLabel(tg); g.font = '700 30px ' + sans; const w = g.measureText(lb).width + 40;
          g.fillStyle = 'rgba(232,117,61,.18)'; rr(g, cx, ty, w, 56, 10); g.fill(); g.fillStyle = '#8A3A16'; g.fillText(lb, cx + 20, ty + 38); cx += w + 14;
        });
        g.fillStyle = 'rgba(122,15,42,.3)'; g.fillRect(IN, 740, W - IN * 2, 2);
        const lines = [L ? T[3] : T[2], L ? T[5] : T[4]];
        let y = 815; g.fillStyle = '#2A1A1E'; g.font = '500 34px ' + sans;
        lines.forEach(tx => { wrapLines(g, tx, W - IN * 2, 3).forEach(l => { g.fillText(l, IN, y); y += 50; }); y += 24; });
        const thumbs = imgs.slice(0, 4), tw = 120; let tx = IN;
        g.fillStyle = 'rgba(42,26,30,.65)'; g.font = '600 24px ' + sans; g.fillText(t.ig2Picks, IN, 1075);
        thumbs.forEach(im => { drawCover(g, im, tx, 1092, tw, tw); tx += tw + 14; });
        pages.push(c); }
      // 3 / 3 — what I should listen to, and where you can try it
      { const c = document.createElement('canvas'); c.width = W; c.height = H; const g = c.getContext('2d'); frame(g, 3);
        g.fillStyle = '#C95C26'; g.font = '700 26px Inter, sans-serif'; g.fillText(t.ig3Kicker, IN, 235);
        const recs = buildRecommendation().slice(0, 5); let y = 300;
        recs.forEach((r, i) => {
          g.font = '700 34px ' + serif;
          const ln = wrapLines(g, L ? r.ko : r.en, W - IN * 2 - 70, 2);
          if (y + 34 + ln.length * 44 + 20 > 975) return;
          g.fillStyle = '#C95C26'; g.font = 'italic 700 40px "Playfair Display", serif'; g.fillText(String(i + 1), IN, y + 34);
          g.fillStyle = '#2A1A1E'; g.font = '700 34px ' + serif;
          ln.forEach((l, k) => g.fillText(l, IN + 70, y + 34 + k * 44));
          const sub = (SHORT[r.cid] || ['', ''])[L ? 1 : 0] + '  ·  ' + (r.why || []).map(tagLabel).join(' · ');
          g.fillStyle = 'rgba(42,26,30,.62)'; g.font = '500 25px ' + sans; g.fillText(wrapLines(g, sub, W - IN * 2 - 70, 1)[0] || '', IN + 70, y + 34 + ln.length * 44 + 6);
          y += 34 + ln.length * 44 + 52;
        });
        const by = 1000; g.fillStyle = '#7A0F2A'; rr(g, IN - 20, by, W - (IN - 20) * 2, 210, 16); g.fill();
        g.fillStyle = '#F4E9D0'; g.font = '700 38px ' + serif; g.fillText(wrapLines(g, t.ig3Cta, W - IN * 2, 1)[0], IN + 10, by + 66);
        g.fillStyle = '#F3A77B'; g.font = '800 58px Inter, sans-serif'; g.fillText(SITE, IN + 10, by + 140);
        g.fillStyle = 'rgba(244,233,208,.8)'; g.font = '500 26px ' + sans; g.fillText(t.ig3Sub, IN + 10, by + 186);
        pages.push(c); }
      return Promise.all(pages.map(c => new Promise(res => {
        try { c.toBlob(b => res(b), 'image/png'); }
        catch (e) { res(null); }
      })));
    }
    async function doShare(kind) {
      if (!ready()) return;
      if (kind === 'story') return shareStory();
      track('share', { method: kind });
      const url = shortNow(tasteUrl()), text = shareText(), t = I18N[lang];
      const open = u => { window.open(u, '_blank', 'noopener,width=620,height=640'); toast(t.shOpened.replace('{n}', (t.shNames || {})[kind] || kind)); };
      if (kind === 'facebook') open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url));
      else if (kind === 'x') open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(text) + '&url=' + encodeURIComponent(url));
      else if (kind === 'whatsapp') open('https://wa.me/?text=' + encodeURIComponent(text + '\n' + url));
      else if (kind === 'line') open('https://social-plugins.line.me/lineit/share?url=' + encodeURIComponent(url) + '&text=' + encodeURIComponent(text));
      else if (kind === 'native') { try { await navigator.share({ title: 'Yummy Classic', text, url }); toast(t.shDone, true); } catch (e) {} }
      else if (kind === 'kakao') {
        if (await loadKakao()) {
          const S = tasteSummary(), hero = S.sel[0];
          window.Kakao.Share.sendDefault({ objectType: 'feed',
            content: { title: S.era + ' · ' + S.type, description: text, imageUrl: new URL(THUMB(hero.f, 960), location.href).href, link: { mobileWebUrl: url, webUrl: url } },
            buttons: [{ title: t.sharedCta.replace(' →', ''), link: { mobileWebUrl: url, webUrl: url } }] });
        } else if (navigator.share && /Mobi|Android|iPhone/i.test(navigator.userAgent)) {
          try { await navigator.share({ title: 'Yummy Classic', text, url }); toast(t.shDone, true); } catch (e) {}
        } else { await copyLink(); toast(copyLink.ok ? t.shCopiedKakao : t.shCopyFail, copyLink.ok); if (copyLink.ok) flashBtn(document.querySelector('.sh-kakao'), t.shCopiedShort); }
      } else if (kind === 'image') {
        const ready3 = imgCache.key === shareKey() && imgCache.files;
        const files = ready3 ? imgCache.files : (toast(t.imgMade), await prepareImages());
        if (!files || !files.length) { toast(t.imgFail); return; }
        showPreview(files);
        if (isMobile() && navigator.canShare && navigator.canShare({ files })) {
          if (ready3) { try { await navigator.share({ files }); toast(t.shareInsta); return; } catch (e) { if (e && e.name === 'AbortError') return; } }
          // The click's permission expired while the images were drawn — one more tap shares them
          document.getElementById('sh-go').hidden = false; toast(t.igTapAgain); return;
        }
        files.forEach((f, i) => setTimeout(() => saveFile(f), i * 600));
        toast(t.shareInsta);
      }
    }
    // Share images are drawn ahead of time, so the share sheet opens straight from the tap (browsers drop the tap's permission after a few seconds)
    const imgCache = { key: '', files: null, p: null };
    const isMobile = () => /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) || (navigator.maxTouchPoints > 1 && /Mac/.test(navigator.userAgent));
    function shareKey() { try { const S = tasteSummary(); return lang + '|' + S.ek + '|' + S.sel.map(x => x.id).join(','); } catch (e) { return ''; } }
    function prepareImages() {
      const k = shareKey(); if (!k || !ready()) return Promise.resolve(null);
      if (imgCache.key === k && imgCache.p) return imgCache.p;
      imgCache.key = k; imgCache.files = null;
      imgCache.p = tasteImages().then(bs => {
        const files = (bs || []).filter(Boolean).map((b, i) => new File([b], 'yummy-classic-' + (i + 1) + 'of3.png', { type: 'image/png' }));
        if (imgCache.key === k) imgCache.files = files.length ? files : null;
        if (!files.length && imgCache.key === k) imgCache.p = null;
        return files;
      }).catch(() => { if (imgCache.key === k) imgCache.p = null; return null; });
      return imgCache.p;
    }
    function saveFile(f) {
      const a = document.createElement('a'); a.href = URL.createObjectURL(f); a.download = f.name;
      document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    }
    function showPreview(files) {
      const pv = document.getElementById('sh-preview');
      pv.innerHTML = '';
      files.forEach(f => {
        const b = document.createElement('button'); b.type = 'button'; b.className = 'sh-pv-item'; b.title = f.name;
        const im = document.createElement('img'); im.src = URL.createObjectURL(f); im.alt = f.name;
        b.appendChild(im); b.addEventListener('click', () => saveFile(f)); pv.appendChild(b);
      });
      const hint = document.createElement('p'); hint.className = 'sh-pv-hint'; hint.textContent = I18N[lang].igSaveHint; pv.appendChild(hint);
      pv.hidden = false;
    }
    document.getElementById('sh-go').addEventListener('click', async () => {
      const files = imgCache.files; if (!files) return;
      try { await navigator.share({ files }); document.getElementById('sh-go').hidden = true; toast(I18N[lang].shareInsta); }
      catch (e) { if (!e || e.name !== 'AbortError') files.forEach((f, i) => setTimeout(() => saveFile(f), i * 600)); }
    });
    const shSec = document.getElementById('sh-toast').closest('section') || document.getElementById('sh-toast').parentElement;
    if ('IntersectionObserver' in window) new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { prepareImages(); try { prepareStory(); } catch (e) {} } }, { rootMargin: '600px 0px' }).observe(shSec);
    document.querySelectorAll('.sh-btn').forEach(b => b.addEventListener('click', () => doShare(b.dataset.sh)));
    document.getElementById('sh-copy').addEventListener('click', async () => { track('share', { method: 'copy_link' }); await copyLink(); toast(copyLink.ok ? I18N[lang].shareCopied : I18N[lang].shCopyFail, copyLink.ok); });
    if (navigator.share) document.querySelector('.sh-native').classList.remove('hidden');

    // Opening a shared taste link rebuilds the same result
    function restoreFromUrl() {
      const q = new URLSearchParams(location.search);
      const e = q.get('e'), ids = (q.get('p') || '').split(',').filter(Boolean);
      if (!e || !SETS[e]) return;
      const valid = ids.filter(id => pById(id));
      if (valid.length < 2) return;
      pick(e);
      q1Votes = (q.get('a') || '').split('').map(ch => ch === 'c' ? 'classic' : ch === 'r' ? 'romantic' : null).filter(Boolean).slice(0, Q1_N);
      q1Idx = Q1_N - 1;
      picks = new Set(valid);
      restored = true; roundIdx = -1;
      renderTiles(); syncResult();
      document.getElementById('shared-banner').classList.remove('hidden');
      setTimeout(() => result.scrollIntoView({ behavior: 'auto', block: 'start' }), 700);
    }
    document.getElementById('shared-try').addEventListener('click', () => reset());
    document.getElementById('restart').addEventListener('click', () => {
      reset(true);
      redeal();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });


    // ---------- Viral loop: feedback, "same type %", friend match, story image ----------
    Object.assign(I18N.ko, {
      fbQ: '이 결과, 나랑 맞나요?', fbOpt: '선택', fbYes: '👍 맞아요', fbNo: '👎 아니에요',
      fbPhYes: '어떤 점이 맞았는지 한 줄 남겨 주세요 (선택)', fbPhNo: '어떤 점이 달랐는지 한 줄 남겨 주세요 (선택)',
      fbSend: '보내기', fbThanks: '고마워요! 남겨 주신 의견으로 더 잘 맞게 고칠게요.', fbThanksVote: '고마워요!', fbAdd: '한 줄 더 남기기',
      pctLine: '나와 같은 유형은 전체의 {p}% · 지금까지 {n}명이 해봤어요',
      vsTop: '소중한 사람과 냠냠클래식 궁합 확인하기', storyTop: '인스타그램 스토리에 올리기',
      vsInviteT: '소중한 사람과 나, 냠냠클래식 궁합은 몇%일까요?', vsInviteS: '링크를 받은 분이 그림을 고르면, 두 분의 냠냠클래식 궁합이 바로 나와요.',
      vsSend: '냠냠클래식 궁합 확인 링크 보내기', vsShareText: '소중한 사람과 나, 냠냠클래식 궁합은 몇%일까요? 그림 몇 장만 골라 주세요.',
      vsBanner: '‘{t}’ 유형의 소중한 분이 당신과의 냠냠클래식 궁합을 궁금해해요', vsBannerSub: '그림 몇 장만 고르면, 두 분의 냠냠클래식 궁합이 바로 나와요.\n오늘 당신의 마음은 어떤 그림에 머물까요?',
      vsKick: '소중한 사람과 나의 냠냠클래식 궁합', vsFriend: '보낸 분', vsMe: '나', vsShared: '둘 다 고른 그림 {n}점',
      vsSendBack: '궁합 결과 보내기', vsBackText: '소중한 사람과 나, 냠냠클래식 궁합은 {p}% — {l}. 우리 둘의 궁합 결과를 보내요.',
      vsPairKick: '두 분의 냠냠클래식 궁합 결과', vsPairA: '처음 링크를 보낸 분', vsPairB: '그림을 고른 분', vsPairTry: '나도 소중한 사람과 냠냠클래식 궁합 확인하기',
      vsPairBanner: '두 분의 냠냠클래식 궁합 결과가 도착했어요.',
      vsLabels: ['천생연분 · 같은 그림 앞에서 멈춰 서는 사이', '찰떡궁합 · 취향이 잘 어울리는 사이', '오랜 벗 · 서로의 곡이 궁금한 사이', '달라서 재미있는 사이 · 그래서 더 풍성한 사이'],
      vsCopied: '냠냠클래식 궁합 확인 링크를 복사했어요. 카카오톡이나 문자 창에 붙여 넣어 보내 주세요.',
      shCopiedShort: '링크를 복사했어요', shOpened: '{n} 공유 창을 열었어요. 이어서 보내 주세요.', shDone: '전달했어요. 고마워요!', shCopyFail: '복사가 안 됐어요. 주소 칸을 길게 눌러 복사해 주세요.',
      shCopiedKakao: '결과 링크를 복사했어요. 카카오톡 대화방에 붙여 넣어 보내 주세요.', shStoryMade: '스토리 이미지를 만들고 있어요…',
      shNames: { line: '라인', whatsapp: '왓츠앱', facebook: '페이스북', x: 'X' },
      shKakao: '카카오톡', shLine: '라인', shWa: '왓츠앱', shFb: '페이스북', shX: 'X (트위터)',
      shareImage: '인스타 피드', shareNative: '다른 앱',
      shareStory: '인스타 스토리', storyKick: '나의 오늘 그림 유형', storyListen: '오늘 들을 곡',
      storyCta: '소중한 사람과 나의 냠냠클래식 궁합은 몇%일까요?', storyTap: '이미지가 준비됐어요. 한 번 더 누르면 바로 공유돼요.',
      storySaved: '이미지를 저장했어요. 인스타 스토리에 올려 보세요!',
    });
    Object.assign(I18N.en, {
      fbQ: 'Does this result feel like you?', fbOpt: 'optional', fbYes: '👍 That’s me', fbNo: '👎 Not really',
      fbPhYes: 'What felt right? One line (optional)', fbPhNo: 'What felt off? One line (optional)',
      fbSend: 'Send', fbThanks: 'Thank you! We’ll use this to make the result fit better.', fbThanksVote: 'Thanks!', fbAdd: 'Add a line',
      pctLine: '{p}% of people share your type · {n} people so far',
      vsTop: 'Check your taste chemistry with someone special', storyTop: 'Post to Instagram Story',
      vsInviteT: 'You and someone special: what % harmony do your paintings show?', vsInviteS: 'When they pick their paintings, you’ll both see your harmony and its rate.',
      vsSend: 'Send a harmony-test link', vsShareText: 'You and me: what % harmony do our paintings show? Pick a few paintings.',
      vsBanner: 'Someone special (“{t}”) is curious about your harmony', vsBannerSub: 'Pick a few paintings and see your harmony rate right away.\nWhich painting will hold your eye today?',
      vsKick: 'Your harmony rate', vsFriend: 'Sender', vsMe: 'Me', vsShared: '{n} painting(s) you both picked',
      vsPairKick: 'Your harmony report', vsPairA: 'Sent the link', vsPairB: 'Picked the paintings', vsPairTry: 'See my harmony with someone special',
      vsPairBanner: 'A harmony report for the two of you has arrived.',
      vsSendBack: 'Send this harmony report', vsBackText: 'Our harmony, found through paintings: {p}% — {l}. I’d love to see ours too.',
      vsLabels: ['Perfect harmony', 'Beautiful harmony', 'Gentle harmony', 'Two different melodies, richer together'],
      vsCopied: 'Harmony-test link copied. Paste it into a chat or text to send.',
      shCopiedShort: 'Link copied', shOpened: 'The {n} share window is open. Finish sending there.', shDone: 'Sent. Thank you!', shCopyFail: 'Couldn’t copy. Press and hold the address box to copy it.',
      shCopiedKakao: 'Result link copied. Paste it into a KakaoTalk chat to send.', shStoryMade: 'Making your story image…',
      shNames: { line: 'LINE', whatsapp: 'WhatsApp', facebook: 'Facebook', x: 'X' },
      shKakao: 'KakaoTalk', shLine: 'LINE', shWa: 'WhatsApp', shFb: 'Facebook', shX: 'X',
      shareImage: 'Instagram feed', shareNative: 'More apps',
      shareStory: 'Instagram story', storyKick: 'MY PAINTING TYPE TODAY', storyListen: 'Today’s listening',
      storyCta: 'You and me: what % harmony?', storyTap: 'Your image is ready. Tap once more to share.',
      storySaved: 'Image saved. Post it to your story!',
    });
    Object.assign(I18N.ja, {
      fbQ: 'この結果、自分に合っていますか?', fbOpt: '任意', fbYes: '👍 合ってる', fbNo: '👎 ちがうかも',
      fbPhYes: 'どこが合っていたか一言どうぞ(任意)', fbPhNo: 'どこがちがったか一言どうぞ(任意)',
      fbSend: '送る', fbThanks: 'ありがとうございます!いただいた声で、もっと合うように直します。', fbThanksVote: 'ありがとう!', fbAdd: '一言そえる',
      pctLine: '同じタイプは全体の{p}% · これまで{n}人が参加',
      vsTop: '大切な人との好みの相性をチェック', storyTop: 'Instagramのストーリーに載せる',
      vsInviteT: '大切な人と私、絵でわかる和音は何%?', vsInviteS: 'リンクを受け取った方が絵を選ぶと、ふたりの和音と和音率が出ます。',
      vsSend: '和音を測るリンクを送る', vsShareText: '大切な人と私、絵でわかる和音は何%?絵を数枚選んでください。',
      vsBanner: '「{t}」タイプの大切な方が、あなたとの和音を知りたがっています', vsBannerSub: '絵を数枚選ぶだけで、ふたりの和音率がすぐにわかります。\n今日、あなたの心はどの絵にとまるでしょう?',
      vsKick: '大切な人と私の和音率', vsFriend: '送った方', vsMe: '私', vsShared: 'ふたりとも選んだ絵 {n}点',
      vsPairKick: 'ふたりの和音レポート', vsPairA: 'リンクを送った方', vsPairB: '絵を選んだ方', vsPairTry: '私も大切な人と和音を見る',
      vsPairBanner: 'ふたりが絵で見つけた和音レポートが届きました。',
      vsSendBack: 'この和音レポートを送る', vsBackText: '大切な人と私、絵でわかる和音は{p}% — {l}。あなたとの和音も知りたいです。',
      vsLabels: ['完全な和音', '美しい和音', 'やさしいハーモニー', 'ちがう二つの旋律、だから豊か'],
      vsCopied: '和音を測るリンクをコピーしました。トークやメッセージに貼り付けて送ってください。',
      shCopiedShort: 'リンクをコピーしました', shOpened: '{n}のシェア画面を開きました。続けて送ってください。', shDone: '送りました。ありがとうございます!', shCopyFail: 'コピーできませんでした。アドレス欄を長押ししてコピーしてください。',
      shCopiedKakao: '結果のリンクをコピーしました。カカオトークに貼り付けて送ってください。', shStoryMade: 'ストーリー画像を作っています…',
      shNames: { line: 'LINE', whatsapp: 'WhatsApp', facebook: 'Facebook', x: 'X' },
      shKakao: 'カカオトーク', shLine: 'LINE', shWa: 'WhatsApp', shFb: 'Facebook', shX: 'X',
      shareImage: 'インスタのフィード', shareNative: 'ほかのアプリ',
      shareStory: 'インスタのストーリー', storyKick: '今日の私の絵のタイプ', storyListen: '今日聴く曲',
      storyCta: '大切な人と私の和音は何%?', storyTap: '画像の準備ができました。もう一度押すと共有できます。',
      storySaved: '画像を保存しました。ストーリーに載せてみて!',
    });
    const YC_MATCH_ICON = '<svg class="yc-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="6.3"/><circle cx="12" cy="12" r="2"/><g transform="translate(3.6 5.6) rotate(-8)"><path d="M-1.6 0v3.2M0 0v3.2M1.6 0v3.2M-1.6 3.2c0 1.8 3.2 1.8 3.2 0M0 4.6V12"/></g><g transform="translate(20.4 5.6) rotate(8)"><path d="M-1.6 0v3.2M0 0v3.2M1.6 0v3.2M-1.6 3.2c0 1.8 3.2 1.8 3.2 0M0 4.6V12"/></g></svg>';
    const devOf = () => (window.matchMedia && matchMedia('(max-width: 639px)').matches) ? 'mobile' : 'pc';
    const typeName = m => TYPES[m] ? (isLocal() ? TYPES[m][1] : TYPES[m][0]) : '';
    const myMood = () => { const sel = selected(); return sel.length ? dominantMood(sel) : ''; };

    // A friend's match link: ?vm=<type>&ve=<classic|romantic>&vp=<painting ids>
    const VS = (() => {
      try {
        const q = new URLSearchParams(location.search), m = q.get('vm');
        if (!m || !TYPES[m]) return null;
        const ids = (q.get('vp') || '').split(',').filter(id => pById(id)).slice(0, 12);
        return { m, e: q.get('ve') === 'romantic' ? 'romantic' : 'classic', ids };
      } catch (e) { return null; }
    })();
    // pair link (화음 결과지): my result + the person I answered, so whoever opens it sees both and the 화음률
    const PAIR = (() => { try { return new URLSearchParams(location.search).get('pr') === '1'; } catch (e) { return false; } })();
    function pairUrl() {
      const q = new URLSearchParams(tasteUrl().split('?')[1] || '');
      q.set('vm', VS.m); q.set('ve', VS.e); q.set('vp', VS.ids.join(',')); q.set('pr', '1');
      return shareBase() + '?' + q.toString();
    }
    function vsUrl() {
      const q = new URLSearchParams();
      q.set('vm', myMood()); q.set('ve', currentEra || 'classic'); q.set('vp', [...picks].join(',')); q.set('lang', lang);
      return shareBase() + '?' + q.toString();
    }
    function groupVec(ids) { const v = {}; ids.forEach(id => { const g = groupFor(id); if (g) v[g.en] = (v[g.en] || 0) + 1; }); return v; }
    function tagVec(ids) {
      const v = {}; let EG; try { EG = engPrep(currentEra); } catch (e) { return v; }
      ids.forEach(id => { const P = EG && EG.pv && EG.pv[id]; if (P) Object.entries(P.v).forEach(([t, x]) => { v[t] = (v[t] || 0) + x; }); });
      return v;
    }
    function cosine(a, b) {
      let d = 0, na = 0, nb = 0;
      Object.keys(a).forEach(k => { na += a[k] * a[k]; if (b[k]) d += a[k] * b[k]; });
      Object.values(b).forEach(x => { nb += x * x; });
      return na && nb ? d / Math.sqrt(na * nb) : 0;
    }
    function matchScore(fr) {
      const mine = [...picks], shared = mine.filter(id => fr.ids.includes(id)).length;
      let s = 40;
      if (fr.e === currentEra) s += 16;
      if (fr.m === myMood()) s += 14;
      s += 22 * cosine(groupVec(mine), groupVec(fr.ids));
      s += 12 * cosine(tagVec(mine), tagVec(fr.ids));
      s += Math.min(shared, 3) * 4;
      return { pct: Math.max(41, Math.min(99, Math.round(s))), shared };
    }
    function matchLabel(p) { const L = I18N[lang].vsLabels; return p >= 90 ? L[0] : p >= 75 ? L[1] : p >= 60 ? L[2] : L[3]; }

    async function sendLink(url, text, method) {
      url = shortNow(url);
      track('share', { method });
      if (navigator.share && isMobile()) { try { await navigator.share({ title: 'Yummy Classic', text, url }); toast(I18N[lang].shDone, true); return; } catch (e) { if (e && e.name === 'AbortError') return; } }
      const ok = await copyText(text + ' ' + url);
      toast(ok ? I18N[lang].vsCopied : I18N[lang].shCopyFail, ok);
      if (ok) flashBtn(sendLink.btn, I18N[lang].shCopiedShort);
    }
    function sendVs(e) { if (!ready() || restored) return; sendLink.btn = e && e.currentTarget; sendLink(vsUrl(), I18N[lang].vsShareText, 'match_invite'); }

    function renderVsBanner() {
      const el = document.getElementById('vs-banner');
      if (!el) return;
      if (!VS || ready()) { el.hidden = true; return; }
      const t = I18N[lang]; el.innerHTML = '';
      const h = document.createElement('strong'); h.textContent = t.vsBanner.replace('{t}', typeName(VS.m));
      const sub = document.createElement('span'); sub.textContent = t.vsBannerSub || '';
      el.append(h, sub);
      el.hidden = false;
    }
    function renderVsCard() {
      const box = document.getElementById('vs-card');
      if (!box) return;
      if (!VS || !ready() || (restored && !PAIR)) { box.hidden = true; return; }
      const t = I18N[lang], r = matchScore(VS), label = matchLabel(r.pct);
      box.innerHTML = '';
      const k = document.createElement('p'); k.className = 'vs-kick'; k.textContent = PAIR ? t.vsPairKick : t.vsKick;
      const p = document.createElement('p'); p.className = 'vs-pct'; p.textContent = r.pct + '%';
      const l = document.createElement('p'); l.className = 'vs-label'; l.textContent = label;
      const pair = document.createElement('div'); pair.className = 'vs-pair';
      [[PAIR ? t.vsPairA : t.vsFriend, typeName(VS.m)], [PAIR ? t.vsPairB : t.vsMe, typeName(myMood())]].forEach(([who, nm]) => {
        const d = document.createElement('div'); const s = document.createElement('small'); s.textContent = who;
        d.append(s, document.createTextNode(nm)); pair.appendChild(d);
      });
      box.append(k, p, l, pair);
      if (r.shared) { const sh = document.createElement('p'); sh.className = 'vs-shared'; sh.textContent = t.vsShared.replace('{n}', r.shared); box.appendChild(sh); }
      const b = document.createElement('button'); b.type = 'button'; b.className = 'btn btn-primary btn-match'; b.innerHTML = '<span class="yc-badge">' + YC_MATCH_ICON + '</span>';
      if (PAIR) {
        // the receiver of a 결과지: start their own test (keeps nothing from this pair)
        b.append(t.vsPairTry);
        b.addEventListener('click', () => { track('pair_try'); location.href = location.pathname + '?lang=' + lang; });
      } else {
        b.append(t.vsSendBack);
        b.addEventListener('click', e => { sendLink.btn = e.currentTarget; sendLink(pairUrl(), t.vsBackText.replace('{p}', r.pct).replace('{l}', label), 'match_result'); });
      }
      box.appendChild(b);
      box.hidden = false;
      if (PAIR) { if (!renderVsCard.seen) { renderVsCard.seen = true; track('pair_result_open', { score: r.pct }); setTimeout(() => box.scrollIntoView({ behavior: 'smooth', block: 'start' }), 900); } return; }
      if (renderVsCard.sent !== r.pct) {
        renderVsCard.sent = r.pct;
        track('match_complete', { score: r.pct, friend_type: VS.m, my_type: myMood() });
        postJSON('/api/stat', { m: myMood(), k: 'match' });
      }
    }

    // "같은 유형 N%": counted once per finished test, shown once enough people have taken it
    const STAT_MIN = 30;
    let statData = null;
    function postJSON(u, body) { try { return fetch(u, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body), keepalive: true }).catch(() => null); } catch (e) { return Promise.resolve(null); } }
    function loadStats() {
      return fetch('/api/stat').then(r => r.ok ? r.json() : null).then(d => { if (d && typeof d.all === 'number') statData = d; renderPct(); }).catch(() => {});
    }
    function renderPct() {
      const el = document.getElementById('r-pct');
      if (!el) return;
      const m = myMood(), d = statData;
      if (!ready() || restored || !m || !d || d.all < STAT_MIN) { el.hidden = true; return; }
      const p = Math.max(1, Math.round(((d.m && d.m[m]) || 1) / d.all * 100));
      el.textContent = I18N[lang].pctLine.replace('{p}', p).replace('{n}', d.all.toLocaleString(lang === 'ko' ? 'ko-KR' : lang === 'ja' ? 'ja-JP' : 'en-US'));
      el.hidden = false;
    }
    function onComplete() {
      if (restored) return;
      const m = myMood(), key = 'yc-done:' + currentEra + ':' + [...picks].sort().join(',');
      let seen = false; try { seen = sessionStorage.getItem(key) === '1'; sessionStorage.setItem(key, '1'); } catch (e) {}
      (seen ? Promise.resolve() : postJSON('/api/stat', { m, k: 'done' })).then(() => setTimeout(loadStats, 400));
      fbReset();
      setTimeout(() => { try { prepareStory(); } catch (e) {} }, 2500);
    }

    // One-tap feedback on the result: the vote is saved on tap; a one-line comment is optional
    let fbVote = 0, fbId = 0, fbP = Promise.resolve(0);
    function fbReset() {
      fbVote = 0; fbId = 0; fbP = Promise.resolve(0);
      const box = document.getElementById('fb'); if (!box) return;
      box.querySelectorAll('.fb-btn').forEach(b => b.setAttribute('aria-pressed', 'false'));
      box.querySelector('.fb-more').hidden = true; box.querySelector('.fb-thanks').hidden = true;
      box.querySelector('.fb-add').hidden = false;
      box.querySelector('.fb-thx').textContent = I18N[lang].fbThanksVote;
      box.querySelector('.fb-row').hidden = false; box.querySelector('textarea').value = '';
    }
    (function wireFb() {
      const box = document.getElementById('fb'); if (!box) return;
      const ta = box.querySelector('textarea');
      box.querySelectorAll('.fb-btn').forEach(b => b.addEventListener('click', () => {
        if (fbVote) return;
        fbVote = Number(b.dataset.v);
        b.setAttribute('aria-pressed', 'true');
        const p = postJSON('/api/fb', { v: fbVote, c: '', m: myMood(), e: currentEra, lang, dev: devOf() });
        fbP = Promise.resolve(p).then(r => r && r.ok ? r.json() : null).then(d => { if (d && d.id) fbId = d.id; return fbId; }).catch(() => 0);
        track('result_feedback', { vote: fbVote > 0 ? 'fits' : 'not_me', type: myMood() });
        box.querySelector('.fb-row').hidden = true;
        box.querySelector('.fb-thanks').hidden = false;
      }));
      box.querySelector('.fb-add').addEventListener('click', () => {
        box.querySelector('.fb-add').hidden = true;
        ta.placeholder = I18N[lang][fbVote > 0 ? 'fbPhYes' : 'fbPhNo'];
        box.querySelector('.fb-more').hidden = false;
        ta.focus({ preventScroll: true });
      });
      box.querySelector('#fb-send').addEventListener('click', () => {
        const c = ta.value.trim();
        if (c) fbP.then(id => { if (id) postJSON('/api/fb', { id, c }); });
        if (c) track('result_feedback_comment', { vote: fbVote > 0 ? 'fits' : 'not_me' });
        box.querySelector('.fb-more').hidden = true;
        box.querySelector('.fb-thx').textContent = I18N[lang][c ? 'fbThanks' : 'fbThanksVote'];
      });
    })();

    // 9:16 story image: type, the painting that defined it, three pieces, and the match hook
    const storyCache = { key: '', file: null, p: null };
    async function storyImage() {
      try { await document.fonts.ready; } catch (e) {}
      const S = tasteSummary(), sel = S.sel, t = I18N[lang], L = isLocal();
      const E = ERAS[S.ek], mood = dominantMood(sel), T = TYPES[mood];
      const hero = sel.find(x => x.m === mood) || sel[0];
      const serif = (lang === 'ja' ? '"Noto Serif JP"' : lang === 'en' ? '"Noto Serif", "Noto Serif KR"' : '"Noto Serif KR"') + ', "Playfair Display", Georgia, serif';
      const sans = (lang === 'ja' ? '"Noto Sans JP"' : '"Pretendard Variable", Pretendard') + ', Inter, sans-serif';
      const W = 1080, H = 1920, P = 48, IN = 110;
      const im = await loadPainting(hero.f);
      const c = document.createElement('canvas'); c.width = W; c.height = H; const g = c.getContext('2d');
      g.fillStyle = '#7A0F2A'; g.fillRect(0, 0, W, H);
      g.fillStyle = '#F4E9D0'; rr(g, P, P, W - P * 2, H - P * 2, 22); g.fill();
      g.fillStyle = E.c; g.fillRect(P + 22, P, W - P * 2 - 44, 12);
      g.textBaseline = 'alphabetic'; g.textAlign = 'left';
      g.fillStyle = '#7A0F2A'; g.font = '400 40px "DM Serif Display", "Playfair Display", Georgia, serif'; g.fillText('Yummy Classic', IN, 175);
      g.fillStyle = '#C95C26'; g.font = '700 32px ' + sans; g.fillText(t.storyKick, IN, 262);
      g.fillStyle = E.text; g.font = '800 92px "Playfair Display", serif'; g.fillText(E.en, IN - 4, 372);
      g.fillStyle = '#4D0A1A'; g.font = '700 70px ' + serif;
      const tl = wrapLines(g, L ? T[1] : T[0], W - IN * 2, 2);
      tl.forEach((l, i) => g.fillText(l, IN, 472 + i * 86));
      const top = 472 + tl.length * 86 - 20, ah = 680;
      drawCover(g, im, IN, top, W - IN * 2, ah);
      g.fillStyle = 'rgba(42,26,30,.7)'; g.font = '600 28px ' + sans;
      g.fillText(wrapLines(g, (L ? hero.ko : hero.en) + ' · ' + (L ? hero.byKo : hero.byEn), W - IN * 2, 1)[0] || '', IN, top + ah + 48);
      let y = top + ah + 120;
      g.fillStyle = '#C95C26'; g.font = '700 28px ' + sans; g.fillText(t.storyListen, IN, y); y += 58;
      buildRecommendation().slice(0, 3).forEach((r, i) => {
        if (y > H - 330) return;
        g.fillStyle = '#C95C26'; g.font = 'italic 700 40px "Playfair Display", serif'; g.fillText(String(i + 1), IN, y);
        g.fillStyle = '#2A1A1E'; g.font = '700 34px ' + serif;
        g.fillText(wrapLines(g, L ? r.ko : r.en, W - IN * 2 - 64, 1)[0] || '', IN + 60, y);
        g.fillStyle = 'rgba(42,26,30,.6)'; g.font = '500 26px ' + sans;
        g.fillText((SHORT[r.cid] || ['', ''])[L ? 1 : 0], IN + 60, y + 38); y += 96;
      });
      const by = H - P - 230; g.fillStyle = '#7A0F2A'; rr(g, IN - 30, by, W - (IN - 30) * 2, 170, 18); g.fill();
      g.fillStyle = '#F4E9D0'; g.font = '700 42px ' + serif; g.fillText(wrapLines(g, t.storyCta, W - IN * 2, 1)[0], IN, by + 70);
      g.fillStyle = '#F3A77B'; g.font = '800 54px Inter, sans-serif'; g.fillText(SITE, IN, by + 138);
      return new Promise(res => { try { c.toBlob(b => res(b), 'image/png'); } catch (e) { res(null); } });
    }
    function prepareStory() {
      const k = shareKey(); if (!k || !ready()) return Promise.resolve(null);
      if (storyCache.key === k && storyCache.p) return storyCache.p;
      storyCache.key = k; storyCache.file = null;
      storyCache.p = storyImage().then(b => {
        const f = b ? new File([b], 'yummy-classic-story.png', { type: 'image/png' }) : null;
        if (storyCache.key === k) storyCache.file = f;
        if (!f && storyCache.key === k) storyCache.p = null;
        return f;
      }).catch(() => { if (storyCache.key === k) storyCache.p = null; return null; });
      return storyCache.p;
    }
    async function shareStory() {
      if (!ready()) return;
      track('share', { method: 'story' });
      const t = I18N[lang], have = storyCache.key === shareKey() && storyCache.file;
      const f = have ? storyCache.file : (toast(t.shStoryMade), await prepareStory());
      if (!f) { toast(t.imgFail); return; }
      if (isMobile() && navigator.canShare && navigator.canShare({ files: [f] })) {
        if (have) { try { await navigator.share({ files: [f] }); return; } catch (e) { if (e && e.name === 'AbortError') return; } }
        else { toast(t.storyTap); return; }
      }
      showPreview([f]); saveFile(f); toast(t.storySaved);
    }

    function renderExtras() {
      if (ready() && !restored) { shorten(tasteUrl()); shorten(vsUrl()); }
      renderVsBanner(); renderVsCard(); renderPct();
      const ta = document.querySelector('#fb textarea');
      if (ta) ta.placeholder = I18N[lang][fbVote < 0 ? 'fbPhNo' : 'fbPhYes'];
      const vt = document.getElementById('vs-top'); if (vt) vt.hidden = true;   // match invite kept out of the result's first screen (share section only)
      const ask = document.getElementById('r-ask'); if (ask) ask.hidden = true;
      const fb = document.getElementById('fb'); if (fb) fb.hidden = !!restored;
    }
    document.getElementById('vs-top').addEventListener('click', sendVs);
    document.getElementById('vs-send').addEventListener('click', sendVs);
    document.getElementById('story-top').addEventListener('click', shareStory);
    if (VS) track('match_link_open', { friend_type: VS.m });

    // ---------- 6) Init ----------
    balanceAll(); dealQ1();
    // start fetching today's concerts & exhibitions now, so they are ready by the time the result opens
    (window.requestIdleCallback || (f => setTimeout(f, 1500)))(() => loadEvents());
    applyLang(readSavedLang());
    renderLanding();
    restoreFromUrl();
    // Start screen: example painting, then the button (or any link to the test) opens Q1
    (function () {
      const root = document.documentElement, img = document.getElementById('intro-img');
      if (restored || VS || PAIR) root.classList.remove('intro-on');
      if (!root.classList.contains('intro-on')) return;
      const f = 'Monet_-_Impression,_Sunrise.jpg';
      if (img && !img.getAttribute('src')) { img.onerror = () => { img.onerror = null; img.src = WM_THUMB(f, 500); }; img.src = THUMB(f, MOBILE ? 500 : 1280); }
      track('intro_view');
      const start = (how) => {
        if (!root.classList.contains('intro-on')) return;
        root.classList.remove('intro-on');
        try { sessionStorage.setItem('yc-started', '1'); } catch (e) {}
        scrollTo(0, 0);
        track('intro_start', { via: how });
      };
      document.getElementById('intro-go').addEventListener('click', () => start('button'));
      // play on the sample: no audio yet, a nudge that the real piece is 20 seconds away
      const play = document.getElementById('intro-play'), msg = document.getElementById('intro-msg');
      play.addEventListener('click', () => {
        msg.hidden = false;
        play.classList.remove('ping'); void play.offsetWidth; play.classList.add('ping');
        track('intro_play_tap');
      });
      msg.addEventListener('click', () => start('play_msg'));
      document.querySelectorAll('a[href="#choose"]').forEach(a => a.addEventListener('click', () => start('link')));
    })();
    renderVsBanner();
    if (PAIR && restored) { const sb = document.getElementById('shared-banner'); const sp = sb && sb.querySelector('span'); if (sp) sp.textContent = I18N[lang].vsPairBanner; renderVsCard(); }
