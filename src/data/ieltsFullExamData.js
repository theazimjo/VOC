// ============================================================================
// IELTS Academic Practice Test 1 — Full Exam Data
// ============================================================================
// This file contains a complete IELTS Academic exam with:
//   • Listening  — 4 parts, 40 questions, full TTS-ready scripts
//   • Reading    — 3 passages (600-900 words each), 40 questions
//   • Writing    — Task 1 (bar chart) + Task 2 (opinion essay)
//   • Speaking   — 3 parts with prompts and cue card
// ============================================================================

// ---------------------------------------------------------------------------
//  LISTENING — SECTION 1 : Hotel Booking (Daily Conversation)
// ---------------------------------------------------------------------------
const listeningPart1 = {
  id: 'part1',
  title: 'Part 1 — Hotel Room Booking',
  audioFile: '/audio/ielts/part1.mp3',
  speakers: ['Receptionist', 'Guest'],
  script: `[Receptionist]: Good morning, Sunrise Hotel. How can I help you today?

[Guest]: Oh, hello. I'd like to book a room, please, for next month.

[Receptionist]: Of course. Could I start by taking your name?

[Guest]: Yes, my name is David Morrison. That's M-O-R-R-I-S-O-N.

[Receptionist]: Thank you, Mr Morrison. And could I have a contact telephone number?

[Guest]: Sure. It's zero-seven-seven-four-five, double-six, nine-eight-three-one. So that's 07745 669831.

[Receptionist]: 07745 669831. Got it. And what is your email address, please?

[Guest]: It's david.morrison — all one word — at greendale dot co dot UK. That's G-R-E-E-N-D-A-L-E.

[Receptionist]: Lovely. And could I also take your home address for our records?

[Guest]: Yes, it's 48 Lancaster Road, Bristol, BS7 4PQ.

[Receptionist]: 48 Lancaster Road, Bristol. Perfect. Now, what dates were you looking at?

[Guest]: I'd like to check in on the fourteenth of July and check out on the eighteenth. So that's four nights altogether.

[Receptionist]: The fourteenth to the eighteenth of July. Let me see what we have available. We currently have three room types available for those dates. There's a Standard Room at seventy-five pounds per night, a Superior Room at one hundred and ten pounds, and a Deluxe Suite at one hundred and sixty pounds.

[Guest]: Hmm, I think the Superior Room sounds fine. Does it have a balcony?

[Receptionist]: The Superior Room doesn't come with a balcony, I'm afraid, but it does have a lovely garden view. The Deluxe Suite is the only option with a private balcony.

[Guest]: Oh, that's a shame. Actually, you know what, I'll go with the Deluxe Suite then. I really do like having a balcony.

[Receptionist]: Excellent choice. The Deluxe Suite also includes a minibar, a king-size bed, and complimentary breakfast each morning.

[Guest]: That's great. Is the breakfast a buffet or set menu?

[Receptionist]: It's a full buffet breakfast served in the Oak Restaurant on the ground floor, from six-thirty until ten a.m.

[Guest]: Wonderful. And is there parking available? I'll be driving down from Bristol.

[Receptionist]: Yes, we have an underground car park. Parking is free for guests staying in the Deluxe Suite. For other room types, there's a charge of twelve pounds per day.

[Guest]: Oh, that's very convenient. One more thing — I have a slight allergy to feather pillows. Would it be possible to arrange synthetic pillows in the room?

[Receptionist]: Absolutely, I'll make a note of that right now. We keep hypoallergenic bedding available for guests who need it. Is there anything else?

[Guest]: Actually, yes. Could I request a late checkout on the eighteenth? My train back isn't until four in the afternoon.

[Receptionist]: Our standard checkout is eleven a.m., but for Deluxe Suite guests we can extend that to two p.m. at no extra charge. Beyond two p.m., there would be a fee of thirty pounds.

[Guest]: Two p.m. should be perfect. Thank you.

[Receptionist]: Wonderful. So to confirm: Mr David Morrison, checking in on the fourteenth of July, checking out on the eighteenth, four nights in the Deluxe Suite at one hundred and sixty pounds per night. The total comes to six hundred and forty pounds. How would you like to pay?

[Guest]: I'll pay by credit card when I arrive, if that's all right.

[Receptionist]: That's absolutely fine. We'll just need to take a card number to guarantee the reservation. Could I have that now?

[Guest]: Of course. It's four-nine-two-one, seven-zero-three-eight, five-five-one-two, six-six-four-nine.

[Receptionist]: Thank you. Your booking reference number is HB dash seven-four-two-one. Is there anything else I can help you with?

[Guest]: No, that's everything. Thank you very much for your help.

[Receptionist]: You're welcome, Mr Morrison. We look forward to seeing you on the fourteenth of July. Goodbye.

[Guest]: Goodbye.`,

  questions: [
    {
      id: 'L1',
      type: 'gap_fill',
      text: "The guest's surname is ___.",
      answer: 'Morrison'
    },
    {
      id: 'L2',
      type: 'gap_fill',
      text: 'The contact telephone number is ___.',
      answer: '07745 669831'
    },
    {
      id: 'L3',
      type: 'gap_fill',
      text: 'The guest lives at 48 ___ Road, Bristol.',
      answer: 'Lancaster'
    },
    {
      id: 'L4',
      type: 'gap_fill',
      text: 'The guest will check in on the ___ of July.',
      answer: '14th'
    },
    {
      id: 'L5',
      type: 'gap_fill',
      text: 'The guest will stay for ___ nights in total.',
      answer: 'four'
    },
    {
      id: 'L6',
      type: 'choice',
      text: 'Which room type does the guest finally choose?',
      options: ['A. Standard Room', 'B. Superior Room', 'C. Deluxe Suite'],
      answer: 'C'
    },
    {
      id: 'L7',
      type: 'choice',
      text: 'What is the main reason the guest chooses this room?',
      options: [
        'A. It is cheaper than the other options',
        'B. It includes a private balcony',
        'C. It is on the ground floor'
      ],
      answer: 'B'
    },
    {
      id: 'L8',
      type: 'gap_fill',
      text: 'Breakfast is served in the ___ Restaurant.',
      answer: 'Oak'
    },
    {
      id: 'L9',
      type: 'choice',
      text: 'The guest requests synthetic pillows because he is allergic to ___.',
      options: ['A. dust', 'B. feather pillows', 'C. wool blankets'],
      answer: 'B'
    },
    {
      id: 'L10',
      type: 'gap_fill',
      text: 'The total cost of the stay is ___ pounds.',
      answer: '640'
    }
  ]
};

// ---------------------------------------------------------------------------
//  LISTENING — SECTION 2 : City Museum Tour (Monologue)
// ---------------------------------------------------------------------------
const listeningPart2 = {
  id: 'part2',
  title: 'Part 2 — Riverside City Museum Tour',
  audioFile: '/audio/ielts/part2.mp3',
  speakers: ['Tour Guide'],
  script: `[Tour Guide]: Good afternoon, everyone, and welcome to the Riverside City Museum. My name is Sarah, and I'll be your guide for the next hour or so. Before we begin, let me give you a quick overview of the museum and what you can expect to see today.

The Riverside City Museum was originally founded in eighteen ninety-seven by a local philanthropist named George Whitfield. At that time, it was housed in a small building on Market Street, but in nineteen fifty-two the collection was moved here to its current location on Victoria Embankment, right beside the river. The building itself is a fine example of Victorian architecture and is actually a Grade Two listed structure, so it's a historical treasure in its own right.

Now, the museum is spread across three floors. On the ground floor, where we are now, you'll find the Natural History Gallery. This is one of our most popular sections, particularly with families. It contains over two thousand specimens, including a full-size replica of a Tyrannosaurus Rex skeleton, which stands just over twelve metres tall. Children absolutely love it, and I must say, it's quite impressive even for adults.

If you head through to the east wing on this floor, you'll reach the Geology Room. This was actually renovated last year and now features an interactive exhibit where visitors can handle real rock samples and learn about the formation of different minerals. It's very hands-on, and we've had fantastic feedback from schools who bring their students here on field trips.

Moving up to the first floor, you'll find our Art and Culture section. This includes a permanent collection of paintings from the seventeenth and eighteenth centuries, mostly by regional artists who were influenced by the Romantic movement. We also have a rotating exhibition space, and this month's special exhibition is called "Light and Shadow." It showcases the work of contemporary photographer Elena Marchetti, who spent three years documenting life in rural villages across Southern Europe. Her photographs are absolutely stunning, and I highly recommend spending some time in that gallery.

Also on the first floor is our World Cultures Hall. This room contains artefacts from ancient civilisations, including Egyptian, Greek, and Chinese collections. One of the highlights is a set of terracotta figures dating back to approximately three hundred BC. They were donated to the museum in nineteen eighty-six by a private collector and they remain some of the finest examples outside of China.

Now, on the second floor, we have the Science and Innovation Wing. This is our newest addition, opened just two years ago. It focuses on the history of scientific discovery, from early astronomy right through to modern-day space exploration. There's a planetarium up there as well, which runs shows every forty-five minutes. Today's show is about the moons of Jupiter, and the next screening is at three fifteen, so do try to catch that if you can.

Right, a few practical points before we set off. The museum café is located on the ground floor, next to the gift shop. It serves hot and cold drinks, sandwiches, and a selection of homemade cakes. The toilets are on every floor, clearly signposted. Photography is allowed in all galleries except the special exhibition on the first floor — that's Elena Marchetti's photography show — because of copyright restrictions.

The museum closes at five thirty today, and last entry to the planetarium is at four forty-five. If you'd like to purchase any souvenirs, the gift shop stays open until five forty-five, so fifteen minutes after the museum closes.

Right then, let's begin our tour in the Natural History Gallery. If you'd like to follow me this way, please.`,

  questions: [
    {
      id: 'L11',
      type: 'gap_fill',
      text: 'The museum was originally founded in the year ___.',
      answer: '1897'
    },
    {
      id: 'L12',
      type: 'gap_fill',
      text: 'The museum was founded by a local philanthropist named George ___.',
      answer: 'Whitfield'
    },
    {
      id: 'L13',
      type: 'choice',
      text: 'When was the museum moved to its current location?',
      options: ['A. 1897', 'B. 1932', 'C. 1952', 'D. 1986'],
      answer: 'C'
    },
    {
      id: 'L14',
      type: 'gap_fill',
      text: 'The Natural History Gallery contains over ___ specimens.',
      answer: '2,000'
    },
    {
      id: 'L15',
      type: 'choice',
      text: 'What special feature does the Geology Room now offer?',
      options: [
        'A. A virtual reality experience',
        'B. An interactive exhibit with real rock samples',
        'C. A guided underground tour',
        'D. A fossil-digging activity'
      ],
      answer: 'B'
    },
    {
      id: 'L16',
      type: 'gap_fill',
      text: "This month's special exhibition is called \"___\".",
      answer: 'Light and Shadow'
    },
    {
      id: 'L17',
      type: 'gap_fill',
      text: 'The terracotta figures date back to approximately ___ BC.',
      answer: '300'
    },
    {
      id: 'L18',
      type: 'choice',
      text: "What is today's planetarium show about?",
      options: [
        'A. The history of astronomy',
        'B. The moons of Jupiter',
        'C. The surface of Mars',
        'D. The Milky Way galaxy'
      ],
      answer: 'B'
    },
    {
      id: 'L19',
      type: 'choice',
      text: 'In which area is photography NOT allowed?',
      options: [
        'A. The Natural History Gallery',
        'B. The World Cultures Hall',
        'C. The special exhibition on the first floor',
        'D. The Science and Innovation Wing'
      ],
      answer: 'C'
    },
    {
      id: 'L20',
      type: 'gap_fill',
      text: 'The gift shop stays open until ___.',
      answer: '5:45'
    }
  ]
};

// ---------------------------------------------------------------------------
//  LISTENING — SECTION 3 : Renewable Energy Research (Academic Discussion)
// ---------------------------------------------------------------------------
const listeningPart3 = {
  id: 'part3',
  title: 'Part 3 — Renewable Energy Research Project',
  audioFile: '/audio/ielts/part3.mp3',
  speakers: ['Professor Clarke', 'Anna', 'Mark'],
  script: `[Professor Clarke]: Right, Anna and Mark, thanks for coming in today. I wanted to have a chat about your joint research project on renewable energy before the deadline next month. How's it going so far?

[Anna]: Pretty well, I think, Professor Clarke. We've done quite a lot of background reading, and we've started to narrow down our focus.

[Mark]: Yes, we were originally thinking about covering all forms of renewable energy, but that seemed far too broad. So we've decided to concentrate on three main types: solar, wind, and hydroelectric power.

[Professor Clarke]: That sounds sensible. Covering everything would have been unmanageable. Now, have you thought about the structure of the paper?

[Anna]: We have, actually. I suggested that we begin with solar panels, because there's been a really dramatic increase in their efficiency over the last decade, and I think that makes a compelling opening section.

[Professor Clarke]: I agree. Solar technology has advanced remarkably. And what about wind energy? Who's taking the lead on that?

[Mark]: That's my section. I've been looking at offshore wind farms in particular. There's been a huge investment in the North Sea recently, and I've found some excellent case studies from Denmark and the United Kingdom.

[Professor Clarke]: Good. Denmark is a great example — they generate nearly half their electricity from wind now. Make sure you include the latest statistics. What about the hydroelectric section?

[Anna]: Mark and I are going to co-write that part together, because it overlaps with both geography and engineering, and we thought it would benefit from both our perspectives.

[Professor Clarke]: That makes sense. Now, I did want to raise one concern. In your proposal, you mentioned that renewable energy is always cheaper than fossil fuels. That's actually an oversimplification. Have you looked at the initial infrastructure costs?

[Mark]: Yes, that's a fair point. I came across a report by the International Energy Agency that breaks down the lifetime costs versus the upfront investment. The upfront costs for wind and solar are still quite high, even though the running costs are very low.

[Professor Clarke]: Exactly. You need to present a balanced picture. It's not enough to say renewables are better in every way — your analysis should acknowledge the economic challenges as well as the benefits.

[Anna]: We'll make sure to address that. Actually, Professor Clarke, I also wanted to ask about the methodology section. Should we use qualitative or quantitative methods, or a combination?

[Professor Clarke]: For a project like this, I'd recommend a mixed-methods approach. Use quantitative data — statistics, percentages, cost comparisons — for the factual analysis, and then bring in qualitative data from interviews or case studies to add depth. Mark, I believe you mentioned you had a contact at a wind farm?

[Mark]: That's right. My uncle works at the Thornton Bank wind farm in Belgium. He's agreed to answer some questions about the day-to-day operations and maintenance challenges.

[Professor Clarke]: That's an excellent primary source. Make sure you record the interview and transcribe it properly. Anna, do you have any similar contacts for the solar section?

[Anna]: Not a personal contact, no, but I've reached out to a research team at Imperial College London who published a paper on next-generation photovoltaic cells. They've agreed to respond to some emailed questions.

[Professor Clarke]: Wonderful. That adds real academic credibility. Now, one final thing — the presentation. You'll need to give a twenty-minute presentation to the class after you submit the paper. Have you thought about how you'll divide that up?

[Mark]: We were thinking Anna could handle the introduction and the solar section, I'd cover wind and hydro, and then we'd both take questions at the end.

[Anna]: Actually, I was wondering if we should include a short video clip — maybe some footage of a wind farm or a solar installation — just to make it more engaging for the audience.

[Professor Clarke]: That's a great idea, as long as it doesn't eat into your speaking time too much. Keep any video clips to under two minutes. All right, I think you're both on the right track. Let's schedule another meeting in two weeks to review your first draft. Does the fourth of November work for both of you?

[Anna]: That works for me.

[Mark]: Same here. Thank you, Professor Clarke.

[Professor Clarke]: My pleasure. Keep up the good work.`,

  questions: [
    {
      id: 'L21',
      type: 'matching',
      text: 'Who suggested starting the paper with solar panels?',
      options: ['Anna', 'Mark', 'Professor Clarke'],
      answer: 'Anna'
    },
    {
      id: 'L22',
      type: 'matching',
      text: 'Who is taking the lead on the wind energy section?',
      options: ['Anna', 'Mark', 'Professor Clarke'],
      answer: 'Mark'
    },
    {
      id: 'L23',
      type: 'matching',
      text: 'Who pointed out that the cost claim was an oversimplification?',
      options: ['Anna', 'Mark', 'Professor Clarke'],
      answer: 'Professor Clarke'
    },
    {
      id: 'L24',
      type: 'choice',
      text: 'How will the hydroelectric section be written?',
      options: [
        'A. Anna will write it alone',
        'B. Mark will write it alone',
        'C. Anna and Mark will co-write it',
        'D. Professor Clarke will write it'
      ],
      answer: 'C'
    },
    {
      id: 'L25',
      type: 'matching',
      text: 'Who has a contact at a wind farm in Belgium?',
      options: ['Anna', 'Mark', 'Professor Clarke'],
      answer: 'Mark'
    },
    {
      id: 'L26',
      type: 'choice',
      text: 'What methodology does Professor Clarke recommend?',
      options: [
        'A. Qualitative only',
        'B. Quantitative only',
        'C. A mixed-methods approach',
        'D. Experimental research'
      ],
      answer: 'C'
    },
    {
      id: 'L27',
      type: 'matching',
      text: 'Who contacted a research team at Imperial College London?',
      options: ['Anna', 'Mark', 'Professor Clarke'],
      answer: 'Anna'
    },
    {
      id: 'L28',
      type: 'choice',
      text: 'How long will the class presentation be?',
      options: [
        'A. Ten minutes',
        'B. Fifteen minutes',
        'C. Twenty minutes',
        'D. Thirty minutes'
      ],
      answer: 'C'
    },
    {
      id: 'L29',
      type: 'matching',
      text: 'Who suggested including a video clip in the presentation?',
      options: ['Anna', 'Mark', 'Professor Clarke'],
      answer: 'Anna'
    },
    {
      id: 'L30',
      type: 'choice',
      text: 'When is the next meeting scheduled?',
      options: [
        'A. The first of November',
        'B. The fourth of November',
        'C. The fourteenth of November',
        'D. The end of November'
      ],
      answer: 'B'
    }
  ]
};

// ---------------------------------------------------------------------------
//  LISTENING — SECTION 4 : Deforestation & Biodiversity (University Lecture)
// ---------------------------------------------------------------------------
const listeningPart4 = {
  id: 'part4',
  title: 'Part 4 — Deforestation and Biodiversity',
  audioFile: '/audio/ielts/part4.mp3',
  speakers: ['Lecturer'],
  script: `[Lecturer]: Good afternoon. Today's lecture focuses on one of the most pressing environmental issues of our time — the impact of deforestation on global biodiversity. This is a topic that spans ecology, economics, and ethics, and I hope by the end of the session you'll have a more nuanced understanding of the complex relationships involved.

Let's begin with some definitions. Deforestation refers to the permanent removal of forest cover, typically to convert the land for other uses such as agriculture, cattle ranching, or urban development. It is important to distinguish deforestation from forest degradation, which involves a reduction in the quality of a forest rather than its complete removal. Both processes are damaging, but deforestation is far more immediately destructive to ecosystems.

Now, the scale of deforestation is truly staggering. According to the United Nations Food and Agriculture Organisation — often referred to by its abbreviation, the FAO — approximately ten million hectares of forest are lost every single year. To put that into perspective, that's roughly equivalent to the size of Portugal being stripped of its forests annually. The largest losses are occurring in tropical regions, with the Amazon Basin, the Congo Basin, and Southeast Asia being the most severely affected areas.

So, why does deforestation matter for biodiversity? Well, forests — particularly tropical rainforests — are the most biologically diverse ecosystems on Earth. Although tropical forests cover only about six percent of the planet's land surface, they are home to more than half of all known terrestrial species. That includes an estimated fifty thousand species of trees, roughly seventeen hundred species of birds, and countless insects, many of which have yet to be formally identified and classified by scientists.

When forests are cleared, the habitats of these species are destroyed. Some animals and plants can migrate to adjacent forested areas, but many cannot. Species with very small geographic ranges — we call these endemic species — are especially vulnerable. For example, the golden poison frog, which is found only in a tiny area of Colombian rainforest, would face almost certain extinction if its habitat were destroyed. And it's not just individual species that are at risk. Entire ecological communities — the intricate webs of predator-prey relationships, pollination networks, and nutrient cycles — are disrupted when forests disappear.

There's another dimension to this that's often overlooked, and that's the genetic diversity within species. When populations become fragmented due to forest loss, the remaining groups become smaller and more isolated. Over time, this leads to what biologists call genetic bottlenecks — a reduction in genetic variation that makes populations less resilient to disease, climate change, and other environmental stresses. This is a slow, insidious process, and its effects may not be visible for several generations.

Now, let's consider some of the main drivers. Agriculture is by far the leading cause of deforestation globally. In South America, vast areas of forest have been cleared for soybean plantations and cattle grazing. In Southeast Asia, the primary driver is the expansion of palm oil production. Logging — both legal and illegal — is another significant factor, as is the extraction of minerals and fossil fuels. In some regions, infrastructure projects such as roads and dams also contribute to forest loss, because they open up previously inaccessible areas to human activity.

What can be done? There are several approaches. One is the establishment and enforcement of protected areas — national parks, nature reserves, and wildlife corridors that connect fragmented habitats. Another strategy is reforestation, the process of replanting trees in areas that have been cleared. However, it's crucial to understand that a replanted forest is not ecologically equivalent to an old-growth forest. It can take hundreds of years for a reforested area to develop the same level of biodiversity as the original forest.

Finally, there is the question of economic incentives. Programmes such as REDD Plus — which stands for Reducing Emissions from Deforestation and Forest Degradation — aim to make forests more valuable standing than cut down, by providing financial compensation to communities and governments that protect their forests. This kind of market-based mechanism is still in its early stages, but it represents a promising avenue for conservation.

To summarise, deforestation is not simply an environmental problem. It is a biodiversity crisis that threatens the stability of ecosystems worldwide. Addressing it will require coordinated action at the local, national, and international levels. In our next lecture, we'll look at specific case studies of conservation success stories and examine what lessons they offer for the future. Thank you.`,

  questions: [
    {
      id: 'L31',
      type: 'gap_fill',
      text: 'Forest degradation involves a reduction in the ___ of a forest rather than its complete removal.',
      answer: 'quality'
    },
    {
      id: 'L32',
      type: 'gap_fill',
      text: 'Approximately ___ million hectares of forest are lost every year.',
      answer: '10'
    },
    {
      id: 'L33',
      type: 'choice',
      text: 'According to the lecture, tropical rainforests cover approximately what percentage of the planet\'s land surface?',
      options: ['A. 2%', 'B. 6%', 'C. 12%', 'D. 20%'],
      answer: 'B'
    },
    {
      id: 'L34',
      type: 'gap_fill',
      text: 'Species with very small geographic ranges are called ___ species.',
      answer: 'endemic'
    },
    {
      id: 'L35',
      type: 'choice',
      text: 'The golden poison frog is used as an example of a species that is ___.',
      options: [
        'A. already extinct',
        'B. highly adaptable',
        'C. especially vulnerable to habitat loss',
        'D. commonly found across South America'
      ],
      answer: 'C'
    },
    {
      id: 'L36',
      type: 'gap_fill',
      text: 'A reduction in genetic variation within isolated populations is called a genetic ___.',
      answer: 'bottleneck'
    },
    {
      id: 'L37',
      type: 'choice',
      text: 'What is the leading cause of deforestation globally?',
      options: [
        'A. Logging',
        'B. Mining',
        'C. Agriculture',
        'D. Urban development'
      ],
      answer: 'C'
    },
    {
      id: 'L38',
      type: 'gap_fill',
      text: 'In Southeast Asia, the primary driver of deforestation is the expansion of ___ oil production.',
      answer: 'palm'
    },
    {
      id: 'L39',
      type: 'choice',
      text: 'According to the lecturer, a replanted forest ___.',
      options: [
        'A. quickly matches the biodiversity of old-growth forest',
        'B. is ecologically equivalent to an old-growth forest',
        'C. can take hundreds of years to match the biodiversity of the original',
        'D. never recovers any biodiversity'
      ],
      answer: 'C'
    },
    {
      id: 'L40',
      type: 'gap_fill',
      text: 'REDD Plus stands for Reducing Emissions from Deforestation and Forest ___.',
      answer: 'Degradation'
    }
  ]
};

// ---------------------------------------------------------------------------
//  READING — PASSAGE 1 : The History of Chocolate
// ---------------------------------------------------------------------------
const readingPassage1 = {
  id: 'passage1',
  title: 'The History of Chocolate',
  text: `Chocolate is one of the most widely consumed foods in the world today, enjoyed in countless forms ranging from beverages to confectionery. Yet few people who unwrap a chocolate bar give much thought to the product's long and remarkable history — a story that stretches back thousands of years to the ancient civilisations of Central America.

The cacao tree, Theobroma cacao, is native to the tropical lowlands of Mesoamerica, the region that encompasses present-day southern Mexico, Guatemala, Belize, and Honduras. Archaeological evidence suggests that the earliest use of cacao dates to around 1900 BC, when the Mokaya people of what is now the Soconusco region of Mexico began fermenting cacao pulp to produce an alcoholic drink. This is significant because it tells us that chocolate was first consumed as a drink rather than as a solid food — a form it would retain for the vast majority of its history.

The Maya civilisation, which flourished between approximately 250 and 900 AD, elevated cacao to a position of great cultural and spiritual importance. The Maya prepared a bitter, frothy beverage by roasting and grinding cacao beans, then mixing the resulting paste with water, chilli peppers, and cornmeal. This drink was consumed during religious ceremonies, marriage celebrations, and other significant social events. Cacao beans were so highly valued that they were also used as a form of currency: historical records indicate that a single turkey could be purchased for one hundred cacao beans, while a ripe avocado cost roughly three.

When the Aztec Empire rose to power in the fourteenth century, it inherited and expanded the Mesoamerican tradition of cacao consumption. The Aztecs called their chocolate drink "xocolatl," a word from which the modern English term "chocolate" is believed to derive. Unlike the Maya, who consumed chocolate across all social classes, the Aztecs largely restricted its use to the elite — warriors, priests, and members of the nobility. The emperor Montezuma II was reportedly so fond of the beverage that he consumed as many as fifty cups a day, served in golden goblets.

The arrival of Europeans in the Americas in the early sixteenth century marked a turning point in the history of chocolate. The Spanish conquistador Hernán Cortés is often credited with introducing cacao to Europe after his encounters with the Aztec court in 1519, though some historians argue that Christopher Columbus was the first European to encounter cacao beans, during his fourth voyage in 1502. Regardless of who deserves the credit, it was the Spanish who first adapted the bitter Mesoamerican drink to European tastes by adding cane sugar and vanilla. The sweetened version quickly became fashionable among the Spanish aristocracy, and from Spain, chocolate drinking spread to France, Italy, and the rest of Europe throughout the seventeenth century.

For nearly three centuries after its introduction to Europe, chocolate remained exclusively a drink. The transformation into solid form did not occur until 1828, when a Dutch chemist named Coenraad van Houten invented a hydraulic press that could separate cocoa butter from roasted cacao beans, leaving behind a dry cake that could be ground into a fine powder — what we now call cocoa powder. This invention was revolutionary because it made chocolate cheaper and easier to produce, and it laid the groundwork for the creation of the first modern chocolate bar.

That milestone came in 1847, when the British company J.S. Fry and Sons combined cocoa powder, sugar, and melted cocoa butter to create a mouldable paste that could be shaped into bars. For the first time, chocolate could be eaten rather than drunk. Within a few decades, other companies followed suit. In 1875, the Swiss chocolatier Daniel Peter, working with his neighbour Henri Nestlé, developed milk chocolate by adding condensed milk to the mixture. A few years later, another Swiss innovator, Rodolphe Lindt, invented the conching machine, a device that refined chocolate to give it the smooth, velvety texture that consumers expect today.

The twentieth century saw chocolate evolve from a luxury product into an everyday commodity. Advances in mass production and global supply chains made chocolate affordable to people of virtually all income levels in industrialised nations. Today, the global chocolate industry is worth an estimated one hundred and thirty billion US dollars annually. The largest consumers of chocolate per capita are the Swiss, followed by the Germans and the Austrians, while the largest cacao-producing nations are Côte d'Ivoire, Ghana, and Indonesia.

However, the modern chocolate industry also faces significant ethical and environmental challenges. Concerns about child labour on cacao farms in West Africa, the environmental impact of cacao cultivation — including deforestation and soil degradation — and the economic vulnerability of smallholder farmers have prompted calls for greater sustainability and fairer trade practices. Certification schemes such as Fairtrade and Rainforest Alliance have sought to address these issues, though critics argue that much more needs to be done to ensure that the benefits of the global chocolate trade are shared more equitably.`,

  questions: [
    // T/F/NG — 6 questions
    {
      id: 'R1',
      type: 'tfng',
      statement: 'The cacao tree is originally from South America.',
      answer: 'FALSE'
    },
    {
      id: 'R2',
      type: 'tfng',
      statement: 'The earliest known use of cacao involved producing an alcoholic drink.',
      answer: 'TRUE'
    },
    {
      id: 'R3',
      type: 'tfng',
      statement: 'The Maya used cacao beans as a form of currency.',
      answer: 'TRUE'
    },
    {
      id: 'R4',
      type: 'tfng',
      statement: 'All social classes in Aztec society were permitted to drink chocolate.',
      answer: 'FALSE'
    },
    {
      id: 'R5',
      type: 'tfng',
      statement: 'Christopher Columbus brought cacao beans back to Europe on his first voyage.',
      answer: 'NOT GIVEN'
    },
    {
      id: 'R6',
      type: 'tfng',
      statement: 'The Swiss consume more chocolate per person than any other nationality.',
      answer: 'TRUE'
    },
    // Gap fill — 4 questions
    {
      id: 'R7',
      type: 'gap_fill',
      text: 'Chocolate was first consumed as a ___.',
      answer: 'drink'
    },
    {
      id: 'R8',
      type: 'gap_fill',
      text: 'The Aztec word for their chocolate drink was "___".',
      answer: 'xocolatl'
    },
    {
      id: 'R9',
      type: 'gap_fill',
      text: 'Coenraad van Houten was a Dutch ___ who invented a hydraulic press for cacao processing.',
      answer: 'chemist'
    },
    {
      id: 'R10',
      type: 'gap_fill',
      text: 'Daniel Peter developed milk chocolate by adding condensed ___ to the mixture.',
      answer: 'milk'
    },
    // Multiple choice — 3 questions
    {
      id: 'R11',
      type: 'choice',
      text: 'What did the Spanish add to the Mesoamerican chocolate drink to suit European tastes?',
      options: [
        'A. Honey and cinnamon',
        'B. Cane sugar and vanilla',
        'C. Milk and cream',
        'D. Chilli and cornmeal'
      ],
      answer: 'B'
    },
    {
      id: 'R12',
      type: 'choice',
      text: 'When was the first modern chocolate bar created?',
      options: ['A. 1828', 'B. 1839', 'C. 1847', 'D. 1875'],
      answer: 'C'
    },
    {
      id: 'R13',
      type: 'choice',
      text: 'Which of the following is NOT mentioned as a challenge facing the modern chocolate industry?',
      options: [
        'A. Child labour on cacao farms',
        'B. Deforestation caused by cacao cultivation',
        'C. Declining global demand for chocolate',
        'D. Economic vulnerability of smallholder farmers'
      ],
      answer: 'C'
    }
  ]
};

// ---------------------------------------------------------------------------
//  READING — PASSAGE 2 : Urban Planning and Sustainable Cities
// ---------------------------------------------------------------------------
const readingPassage2 = {
  id: 'passage2',
  title: 'Urban Planning and Sustainable Cities',
  text: `A
As the global population continues to urbanise at an unprecedented rate, the concept of the sustainable city has moved from the margins of academic debate to the centre of policy-making worldwide. The United Nations estimates that by 2050, nearly seventy percent of the world's population will live in urban areas, up from approximately fifty-six percent in 2020. This rapid urbanisation presents both enormous opportunities and formidable challenges. If managed well, cities can be engines of economic growth, social inclusion, and innovation. If managed poorly, they risk becoming sources of pollution, inequality, and social fragmentation.

B
The origins of modern urban planning can be traced to the nineteenth century, when the industrial revolution triggered a massive migration from rural areas to cities across Europe and North America. The resulting overcrowding, poor sanitation, and social unrest prompted reformers such as Ebenezer Howard in Britain and Daniel Burnham in the United States to propose new models for organising urban space. Howard's "Garden City" concept, published in 1898, envisioned self-contained communities surrounded by greenbelts, combining the best features of urban and rural life. While few true garden cities were ever built, Howard's ideas profoundly influenced the development of suburban planning and zoning regulations throughout the twentieth century.

C
Today, the principles of sustainable urban planning extend far beyond the physical layout of streets and buildings. A truly sustainable city must address at least four interconnected dimensions: environmental sustainability, which involves reducing carbon emissions, managing waste, and preserving natural habitats; economic sustainability, which requires creating diverse employment opportunities and fostering innovation; social sustainability, which encompasses affordable housing, accessible public services, and inclusive governance; and cultural sustainability, which involves protecting heritage sites and supporting the arts. Achieving progress across all four dimensions simultaneously is extraordinarily difficult, and trade-offs are often unavoidable. For example, a decision to build new housing to meet rising demand may conflict with the goal of preserving green spaces.

D
One of the most critical aspects of sustainable urban development is transportation. Cities that are designed around private car use tend to suffer from traffic congestion, air pollution, and social isolation, as residential areas become separated from commercial and recreational zones. In contrast, cities that prioritise public transportation, cycling, and walking — sometimes referred to as "transit-oriented development" — tend to be more compact, more connected, and more environmentally friendly. Copenhagen, often cited as a model of sustainable urban transport, has invested heavily in cycling infrastructure over the past four decades. Today, more than sixty percent of Copenhagen's residents commute by bicycle, resulting in significantly lower per capita carbon emissions compared to other European capitals.

E
Energy systems represent another key area of focus. Many cities are transitioning from fossil-fuel-based energy grids to renewable energy sources such as solar, wind, and geothermal power. Freiburg, a mid-sized city in southwestern Germany, has become a global reference point for urban sustainability by requiring all new buildings to meet strict energy-efficiency standards. The city's Vauban district, a former military barracks that was redeveloped in the 1990s, features solar-powered homes, car-free streets, and a community-owned combined heat and power plant. Residents of Vauban use approximately fifty percent less energy than the average German household.

F
Water management is an increasingly urgent concern as climate change intensifies the frequency and severity of both droughts and floods. Singapore, a densely populated island city-state with virtually no natural freshwater resources, has developed one of the world's most advanced water management systems. Its "Four National Taps" strategy combines imported water, local catchment water, reclaimed water branded as NEWater, and desalinated water to ensure a diversified and resilient supply. The approach has been so successful that Singapore now recycles approximately forty percent of its used water.

G
Despite these encouraging examples, the transition to sustainable cities faces significant obstacles. In many developing countries, rapid and unplanned urbanisation has outpaced the capacity of governments to provide basic infrastructure such as clean water, sanitation, electricity, and paved roads. Informal settlements — often called slums — are home to an estimated one billion people worldwide, and their residents frequently lack access to the services that are essential for a decent quality of life. Addressing these disparities requires not only financial investment but also institutional reform, community participation, and political will. International frameworks such as the United Nations Sustainable Development Goal 11 — which aims to make cities inclusive, safe, resilient, and sustainable — provide a shared vision, but translating that vision into reality remains an immense and ongoing challenge.`,

  questions: [
    // Matching Headings — 5 questions
    {
      id: 'R14',
      type: 'matching_headings',
      paragraph: 'B',
      headings: [
        'i. The four pillars of urban sustainability',
        'ii. Water scarcity and innovative solutions',
        'iii. The historical roots of urban planning',
        'iv. Barriers to sustainable development in poorer nations',
        'v. Rethinking urban transportation',
        'vi. The scale of global urbanisation',
        'vii. Energy innovation in European cities',
        'viii. Community-driven urban renewal'
      ],
      answer: 'iii'
    },
    {
      id: 'R15',
      type: 'matching_headings',
      paragraph: 'C',
      headings: [
        'i. The four pillars of urban sustainability',
        'ii. Water scarcity and innovative solutions',
        'iii. The historical roots of urban planning',
        'iv. Barriers to sustainable development in poorer nations',
        'v. Rethinking urban transportation',
        'vi. The scale of global urbanisation',
        'vii. Energy innovation in European cities',
        'viii. Community-driven urban renewal'
      ],
      answer: 'i'
    },
    {
      id: 'R16',
      type: 'matching_headings',
      paragraph: 'D',
      headings: [
        'i. The four pillars of urban sustainability',
        'ii. Water scarcity and innovative solutions',
        'iii. The historical roots of urban planning',
        'iv. Barriers to sustainable development in poorer nations',
        'v. Rethinking urban transportation',
        'vi. The scale of global urbanisation',
        'vii. Energy innovation in European cities',
        'viii. Community-driven urban renewal'
      ],
      answer: 'v'
    },
    {
      id: 'R17',
      type: 'matching_headings',
      paragraph: 'E',
      headings: [
        'i. The four pillars of urban sustainability',
        'ii. Water scarcity and innovative solutions',
        'iii. The historical roots of urban planning',
        'iv. Barriers to sustainable development in poorer nations',
        'v. Rethinking urban transportation',
        'vi. The scale of global urbanisation',
        'vii. Energy innovation in European cities',
        'viii. Community-driven urban renewal'
      ],
      answer: 'vii'
    },
    {
      id: 'R18',
      type: 'matching_headings',
      paragraph: 'F',
      headings: [
        'i. The four pillars of urban sustainability',
        'ii. Water scarcity and innovative solutions',
        'iii. The historical roots of urban planning',
        'iv. Barriers to sustainable development in poorer nations',
        'v. Rethinking urban transportation',
        'vi. The scale of global urbanisation',
        'vii. Energy innovation in European cities',
        'viii. Community-driven urban renewal'
      ],
      answer: 'ii'
    },
    // Multiple choice — 4 questions
    {
      id: 'R19',
      type: 'choice',
      text: 'According to the passage, what percentage of the global population is expected to live in urban areas by 2050?',
      options: ['A. 50%', 'B. 56%', 'C. 70%', 'D. 80%'],
      answer: 'C'
    },
    {
      id: 'R20',
      type: 'choice',
      text: "Ebenezer Howard's 'Garden City' concept proposed ___.",
      options: [
        'A. high-rise apartment complexes in city centres',
        'B. self-contained communities surrounded by greenbelts',
        'C. underground transportation networks',
        'D. the abolition of private property'
      ],
      answer: 'B'
    },
    {
      id: 'R21',
      type: 'choice',
      text: 'How do the residents of the Vauban district compare to the average German household in energy use?',
      options: [
        'A. They use approximately the same amount of energy',
        'B. They use approximately 25% less energy',
        'C. They use approximately 50% less energy',
        'D. They use approximately 75% less energy'
      ],
      answer: 'C'
    },
    {
      id: 'R22',
      type: 'choice',
      text: 'What does Singapore\'s "Four National Taps" strategy refer to?',
      options: [
        'A. Four types of renewable energy',
        'B. Four diversified water sources',
        'C. Four public transportation systems',
        'D. Four phases of urban redevelopment'
      ],
      answer: 'B'
    },
    // T/F/NG — 4 questions
    {
      id: 'R23',
      type: 'tfng',
      statement: 'Daniel Burnham was a British urban planner.',
      answer: 'FALSE'
    },
    {
      id: 'R24',
      type: 'tfng',
      statement: 'More than sixty percent of Copenhagen\'s residents commute by bicycle.',
      answer: 'TRUE'
    },
    {
      id: 'R25',
      type: 'tfng',
      statement: 'Singapore exports its reclaimed water technology to neighbouring countries.',
      answer: 'NOT GIVEN'
    },
    {
      id: 'R26',
      type: 'tfng',
      statement: 'Approximately two billion people worldwide live in informal settlements.',
      answer: 'FALSE'
    }
  ]
};

// ---------------------------------------------------------------------------
//  READING — PASSAGE 3 : Artificial Intelligence and the Future of Work
// ---------------------------------------------------------------------------
const readingPassage3 = {
  id: 'passage3',
  title: 'Artificial Intelligence and the Future of Work',
  text: `The rapid advancement of artificial intelligence has sparked a vigorous and sometimes anxious global debate about the future of human employment. From factory floors to financial trading desks, from hospital diagnostic rooms to legal offices, AI systems are increasingly capable of performing tasks that were once the exclusive domain of human workers. The central question facing economists, policymakers, and workers alike is whether this technological revolution will ultimately create more jobs than it destroys — or whether it heralds an era of mass unemployment and widening inequality.

At the heart of modern AI is machine learning, a branch of computer science in which algorithms are designed to identify patterns in large datasets and improve their performance over time without being explicitly programmed for each specific task. Deep learning, a subset of machine learning that uses artificial neural networks modelled loosely on the structure of the human brain, has been responsible for many of the most dramatic breakthroughs of the past decade, including advances in image recognition, natural language processing, and autonomous vehicle navigation. These technologies are not confined to research laboratories; they are already being deployed at scale in industries ranging from manufacturing and logistics to healthcare and finance.

Optimists argue that AI, like previous waves of technological innovation, will generate far more employment than it eliminates. They point to the historical precedent of the Industrial Revolution, which displaced millions of agricultural and craft workers but ultimately created entirely new categories of employment that could not have been imagined beforehand — from railway engineers to telephone operators, from automobile mechanics to software developers. According to this view, AI will automate routine, repetitive tasks, freeing human workers to focus on creative, interpersonal, and strategic activities that machines cannot easily replicate. A 2020 report by the World Economic Forum estimated that while AI and automation could displace seventy-five million jobs globally by 2025, they would simultaneously create one hundred and thirty-three million new roles, resulting in a net gain of fifty-eight million jobs.

Pessimists, however, contend that this time may genuinely be different. Unlike the mechanical technologies of the Industrial Revolution, which primarily replaced physical labour, AI has the potential to automate cognitive tasks — analysis, decision-making, even certain forms of creativity. If both manual and intellectual work can be performed by machines, the argument goes, there may be far fewer occupational niches left for human workers to fill. Moreover, the pace of change is accelerating. Whereas the transition from agricultural to industrial economies took place over more than a century, the AI revolution is unfolding over decades, giving workers and educational institutions far less time to adapt.

A more nuanced perspective, advocated by many labour economists, rejects both the extreme optimism and the extreme pessimism. These scholars argue that the impact of AI on employment will depend not on the technology itself but on the policy choices that governments and societies make. If governments invest heavily in education, retraining programmes, and social safety nets, the transition to an AI-augmented economy could be managed in a way that is broadly beneficial. If, on the other hand, these investments are neglected, the benefits of AI are likely to accrue disproportionately to the owners of capital and highly skilled workers, while low- and middle-skilled workers bear the brunt of displacement.

One area where the impact of AI is already clearly visible is in the nature of work itself. The traditional model of full-time, permanent employment with a single employer is giving way to more fragmented arrangements: gig work, short-term contracts, and portfolio careers in which individuals juggle multiple roles simultaneously. Platforms such as ride-sharing services, freelance marketplaces, and delivery applications exemplify this trend. While some workers welcome the flexibility that these arrangements offer, others find themselves trapped in precarious, low-paid positions with few benefits and little job security. The challenge for policymakers is to design regulatory frameworks that protect workers' rights without stifling the innovation that drives economic growth.

Another critical dimension is the geographical distribution of AI's effects. Advanced economies with strong technology sectors — such as the United States, China, and several European nations — are best positioned to capture the economic benefits of AI. Developing countries, which often lack the digital infrastructure, educational systems, and capital needed to participate in the AI revolution, risk being left further behind. This raises the prospect of a widening global digital divide, in which the economic gains from AI are concentrated in a handful of wealthy nations while poorer countries experience minimal benefit or even net harm.

The ethical implications of AI in the workplace also demand attention. Algorithmic bias — the tendency of AI systems to reflect and even amplify the prejudices present in their training data — poses a serious risk to fairness in hiring, promotion, and performance evaluation. If an AI recruitment tool is trained on historical data from a company that has discriminated against certain demographic groups, it may perpetuate those same biases, albeit in a less visible and therefore potentially more insidious form. Ensuring transparency, accountability, and fairness in AI-driven employment decisions is an urgent priority that requires collaboration between technologists, ethicists, regulators, and civil society organisations.

In conclusion, artificial intelligence is neither an unqualified blessing nor an inevitable curse for the future of work. Its impact will be shaped by the choices that individuals, organisations, and governments make in the years ahead. What is certain is that the nature of work is changing rapidly, and those societies that invest proactively in education, infrastructure, and inclusive governance will be best placed to navigate the transition successfully.`,

  questions: [
    // T/F/NG — 5 questions
    {
      id: 'R27',
      type: 'tfng',
      statement: 'Machine learning algorithms must be explicitly programmed for every specific task they perform.',
      answer: 'FALSE'
    },
    {
      id: 'R28',
      type: 'tfng',
      statement: 'The World Economic Forum report predicted a net loss of jobs due to AI by 2025.',
      answer: 'FALSE'
    },
    {
      id: 'R29',
      type: 'tfng',
      statement: 'The transition from agricultural to industrial economies took more than a century.',
      answer: 'TRUE'
    },
    {
      id: 'R30',
      type: 'tfng',
      statement: 'All gig workers prefer flexible working arrangements over traditional employment.',
      answer: 'FALSE'
    },
    {
      id: 'R31',
      type: 'tfng',
      statement: 'China has banned the use of AI in recruitment processes.',
      answer: 'NOT GIVEN'
    },
    // Multiple choice — 5 questions
    {
      id: 'R32',
      type: 'choice',
      text: 'Deep learning is described in the passage as ___.',
      options: [
        'A. a subset of machine learning that uses artificial neural networks',
        'B. a programming language designed for AI applications',
        'C. an outdated approach to artificial intelligence',
        'D. a method that requires manual data entry'
      ],
      answer: 'A'
    },
    {
      id: 'R33',
      type: 'choice',
      text: 'According to the optimists, AI will allow human workers to focus on ___.',
      options: [
        'A. routine, repetitive tasks',
        'B. physical labour in factories',
        'C. creative, interpersonal, and strategic activities',
        'D. data entry and administrative work'
      ],
      answer: 'C'
    },
    {
      id: 'R34',
      type: 'choice',
      text: 'What do pessimists argue makes AI different from Industrial Revolution technologies?',
      options: [
        'A. AI is much more expensive to develop',
        'B. AI can automate cognitive tasks, not just physical labour',
        'C. AI is only useful in the technology sector',
        'D. AI has no impact on developing countries'
      ],
      answer: 'B'
    },
    {
      id: 'R35',
      type: 'choice',
      text: 'Labour economists advocate for a nuanced perspective that emphasises the importance of ___.',
      options: [
        'A. banning AI in certain industries',
        'B. allowing markets to self-regulate without intervention',
        'C. policy choices made by governments and societies',
        'D. returning to pre-industrial economic models'
      ],
      answer: 'C'
    },
    {
      id: 'R36',
      type: 'choice',
      text: 'Algorithmic bias in AI recruitment tools is problematic because ___.',
      options: [
        'A. it makes the hiring process slower',
        'B. it can perpetuate existing prejudices in a less visible form',
        'C. it always favours younger candidates',
        'D. it is too expensive for most companies to implement'
      ],
      answer: 'B'
    },
    // Summary completion — 4 questions
    {
      id: 'R37',
      type: 'summary_completion',
      text: 'Modern AI relies on machine learning, where ___ identify patterns in large datasets.',
      answer: 'algorithms'
    },
    {
      id: 'R38',
      type: 'summary_completion',
      text: 'Deep learning uses artificial ___ networks modelled on the human brain.',
      answer: 'neural'
    },
    {
      id: 'R39',
      type: 'summary_completion',
      text: 'The WEF report estimated that AI would create a net gain of ___ million new jobs.',
      answer: '58'
    },
    {
      id: 'R40',
      type: 'summary_completion',
      text: 'Developing countries risk falling behind due to a widening global digital ___.',
      answer: 'divide'
    }
  ]
};

// ---------------------------------------------------------------------------
//  WRITING — Task 1 & Task 2
// ---------------------------------------------------------------------------
const writingSection = {
  task1: {
    type: 'bar_chart',
    title: 'Water consumption in different sectors (2000 vs 2020)',
    prompt:
      'The bar chart below shows water consumption in four sectors in a particular country in the years 2000 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
    minWords: 150,
    timeRecommendation: 20,
    chartData: {
      categories: ['Agriculture', 'Industry', 'Domestic', 'Energy'],
      series: [
        { label: '2000', values: [70, 15, 10, 5] },
        { label: '2020', values: [55, 20, 15, 10] }
      ],
      unit: 'percentage (%)',
      yAxisLabel: 'Water Usage (%)',
      xAxisLabel: 'Sector'
    }
  },
  task2: {
    type: 'opinion_essay',
    title: 'Technology and Education',
    prompt:
      'Some people believe that technology has made education more accessible and effective, while others argue that it has created new problems such as digital addiction and reduced face-to-face interaction. Discuss both views and give your own opinion.',
    fullPrompt:
      'Some people believe that technology has made education more accessible and effective, while others argue that it has created new problems such as digital addiction and reduced face-to-face interaction. Discuss both views and give your own opinion.',
    minWords: 250,
    timeRecommendation: 40
  }
};

// ---------------------------------------------------------------------------
//  SPEAKING — Parts 1, 2, 3
// ---------------------------------------------------------------------------
const speakingSection = {
  part1: {
    title: 'Introduction and Interview',
    duration: 300,
    questions: [
      'What is your full name?',
      'Where are you from?',
      'Do you work or study?',
      'What do you enjoy most about your work/studies?',
      'How do you usually spend your weekends?'
    ]
  },
  part2: {
    title: 'Individual Long Turn',
    duration: 240,
    prepTime: 60,
    speakTime: 120,
    cueCard: {
      topic: 'Describe a memorable journey you have taken',
      points: [
        'Where you went',
        'When you went there',
        'Who you went with',
        'And explain why it was memorable'
      ]
    },
    followUp: 'Did you take any photos during this journey?'
  },
  part3: {
    title: 'Two-way Discussion',
    duration: 300,
    questions: [
      'Why do you think people enjoy travelling?',
      'How has tourism changed in your country over the years?',
      'What impact does tourism have on local communities?',
      'Do you think sustainable tourism is possible?',
      'How might travel change in the next 20 years?'
    ]
  }
};

// ============================================================================
//  MAIN EXPORT
// ============================================================================

export const IELTS_FULL_EXAM = {
  id: 'ielts_full_1',
  title: 'IELTS Academic Practice Test 1',

  // ---- Listening (30 min, 40 questions) ----
  listening: {
    totalTime: 1800,
    totalQuestions: 40,
    parts: [listeningPart1, listeningPart2, listeningPart3, listeningPart4]
  },

  // ---- Reading (60 min, 40 questions) ----
  reading: {
    totalTime: 3600,
    totalQuestions: 40,
    passages: [readingPassage1, readingPassage2, readingPassage3]
  },

  // ---- Writing (60 min, 2 tasks) ----
  writing: writingSection,

  // ---- Speaking (11-14 min, 3 parts) ----
  speaking: speakingSection
};
